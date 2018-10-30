#!/usr/bin/env python
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
import pathlib

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

    def scrape_courses(self):
        for idx, sch in enumerate(self.schools):
            logging.info(f'fetching course list for {sch["name"]}')

            sch['courses'] = defaultdict(list)
            for ch in range(ord('a'), ord('z')+1):
                logging.info(f'enumerating {chr(ch)}...')
                url = sch['url'] + f'#subj={chr(ch)}'
                self.browser.get(url)
                self.browser.refresh()
                while True:
                    try:
                        more_button = WebDriverWait(self.browser, 4)\
                            .until(EC.presence_of_element_located((By.ID, "moreButton")))
                        more_button.click()

                    except TimeoutException as e:
                        # logging.exception(str(e), exc_info=False)
                        break

                    except Exception as e:
                        logging.debug(e.__class__.__name__)
                        self.browser.execute_script(
                            "window.scrollTo(0, document.body.scrollHeight);")

                try:
                    divs = [el for el in self.browser.find_elements_by_xpath(
                        '//div[@class="courseName"]/..')]
                    self.extract_courses(divs, sch['courses'])

                except Exception as e:
                    logging.exception(f'{e.__class__.__name__}: {str(e)}')
                    continue

            filename = DATA_DIR.joinpath(f'{sch["code"].lower()}_courses.json')
            self.dump_data(filename, sch)

    @staticmethod
    def extract_courses(divs, courses):
        dupes = set()
        for div in divs:
            try:
                cnumber, cname = div.text.splitlines()
                cnumber, dept = cnumber.split('-')[0].split()[::-1]
                if cname not in dupes:
                    dupes.add(cname)
                    courses[dept].append(Course(cname, cnumber))
            except Exception as e:
                continue

    def dump_data(self, file_path, obj):
        with open(file_path, mode='w') as fd:
            json.dump(obj, fd)

    @staticmethod
    def get_browser(headless):
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('headless')
        return webdriver.Chrome(chrome_options=options)

    def run(self):
        self.get_cuny_schools()
        self.scrape_courses()
        self.browser.quit()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='%(message)s')

    DATA_DIR = pathlib.Path(__file__).parent.joinpath('data')
    if not DATA_DIR.is_dir():
        DATA_DIR.mkdir()

    scraper = Scraper(headless=True)
    scraper.run()
