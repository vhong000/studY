from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from collections import defaultdict, namedtuple
import logging
import json
import requests
from lxml import html
# from selenium.webdriver.common.keys import Keys

Course = namedtuple('Course', ['title', 'num'])


class Scraper:
    def __init__(self, headless=False):
        self.URL = 'https://www.coursicle.com/'
        self.browser = self.get_browser(headless)
        self.schools = []

    def get_cuny_schools(self):
        logging.info('fetching school list..\n')
        dom_tree = html.fromstring(requests.get(self.URL).content)
        school_list = dom_tree.xpath("//option[contains(text(), 'CUNY')]")
        dupes = set()
        for item in school_list:
            try:
                if item.text_content() not in dupes:
                    dupes.add(item.text_content())
                    name, code = item.text_content().replace('(CUNY)', '').split(chr(8211))
                    self.schools.append(
                        {'name': name.strip(), 'code': code.strip(), 'url': item.get('value')})
            except Exception as e:
                print(e, item.text_content())

    def scrape_courses(self, depts):
        for sch in self.schools:
            logging.info(f'fetching course list for {sch["name"]}')

            sch['courses'] = defaultdict(list)
            for subject in depts:
                logging.info(f'\tdept => {subject}')

                url = sch['url'] + f'#subj={subject}'
                self.browser.get(url)
                while True:
                    try:
                        more_button = WebDriverWait(self.browser, 5)\
                            .until(EC.presence_of_element_located((By.ID, "moreButton")))
                        more_button.click()

                    except TimeoutException as e:
                        # logging.exception(str(e), exc_info=False)
                        break

                    except Exception as e:
                        logging.debug(e.__class__.__name__)
                        self.browser.execute_script(
                            "window.scrollTo(0, document.body.scrollHeight);")

                divs = [el for el in self.browser.find_elements_by_xpath(
                    '//div[@class="courseName"]/..')]

                sch['courses'][subject] = self.extract_courses(divs)
                logging.info(f'\tprocessed {len(sch["courses"][subject])} courses\n')

    @staticmethod
    def extract_courses(divs):
        dupes = set()
        course_list = []
        for div in divs:
            try:
                cnumber, cname = div.text.splitlines()
                cnumber = cnumber.split('-')[0].split()[::-1][0]
                if cname not in dupes:
                    dupes.add(cname)
                    course_list.append(Course(cname, cnumber))
            except Exception as e:
                continue

        return course_list

    def dump_data(self, file_path):
        with open(file_path, mode='w') as fd:
            json.dump(self.schools, fd,indent=4)

    @staticmethod
    def get_browser(headless):
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('headless')
        return webdriver.Chrome(chrome_options=options)

    def run(self, subjects, out_file):
        self.get_cuny_schools()
        self.scrape_courses(subjects)
        self.dump_data(out_file)
        self.browser.quit()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='%(message)s')

    SUBJECTS = ['csc']
    file = SUBJECTS[0]
    scraper = Scraper(headless=True)
    for subj in SUBJECTS:
        scraper.run(SUBJECTS, file+'.json')
