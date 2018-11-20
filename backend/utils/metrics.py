import requests
import json
from collections import Counter
from datetime import datetime
import os
import matplotlib.pyplot as plt
from matplotlib.dates import date2num

HEADERS = {'Authorization': 'bearer %s' % os.getenv('GITHUB_TOKEN')}
SEARCH_URL = 'https://api.github.com/search/issues?q=repo:csc59939/studY+type:pr+is:merged+'
FILTERS = 'created:{start_date}..{end_date}&per_page=100&order=created'
START_DATE = '2018-10-01'
END_DATE = '2018-11-07'


def search_issues():
    return requests.get((SEARCH_URL+FILTERS).format(start_date=START_DATE, end_date=END_DATE)).json()['items']


def parse_datetime(s):
    return datetime.strptime(s, '%Y-%m-%dT%H:%M:%SZ')


def get_frequency(items):
    ret = Counter(map(lambda pr: parse_datetime(
        pr['closed_at']).strftime('%Y-%m-%d'), items))

    with open('pr_cnt.json', mode='w') as fp:
        json.dump(ret, fp)
    return ret


def load_freqs():
    with open('pr_cnt.json', mode='r') as fp:
        ret = json.load(fp)
    return ret


def get_build_stats(items):
    urls = [el['pull_request']['url'] for el in items]
    pr_stats = []
    try:
        for res in [requests.get(url, headers=HEADERS).json() for url in urls]:
            pr_stats.append({
                'num': res['number'],
                'status_url': res['statuses_url'],
                'statuses': requests.get(res['statuses_url'], headers=HEADERS).json()
            })

    except Exception as e:
        print(e)

    with open('pr-stats.json', mode='w') as fp:
        json.dump(pr_stats, fp)

    return pr_stats


def load_stats(filepath):
    with open(filepath) as fp:
        pr_stats = json.load(fp)

    return pr_stats


def get_failed_builds(prs):
    failed_builds = []
    for pr in prs:
        for event in pr['statuses']:
            if event['state'] == 'error':
                break
        else:
            continue

        failed_builds.append(pr)

    return failed_builds


def calc_delta(events):
    updated = parse_datetime(events[-1]['created_at'])
    created = parse_datetime(events[0]['created_at'])
    return (updated-created).total_seconds()//60


def get_avg_time(prs):
    avgs = []
    for pr in prs:
        sorted_events = sorted(
            pr['statuses'], key=lambda d: parse_datetime(d['created_at']))

        avgs.append({
            'num': pr['num'],
            'time': calc_delta(sorted_events),
            'fixed': sorted_events[-1]['state'] != 'error'
        })

    return avgs


def plot_daily_prs():
    cnts = load_freqs()
    dates = []
    vals = []
    for date, cnt in cnts.items():
        dates.append(datetime.strptime(date, '%Y-%m-%d'))
        vals.append(cnt)
    dates = date2num(dates)
    plt.title('Daily PRs')
    plt.xlabel('date')
    plt.ylabel('# of PRs')
    plt.plot_date(dates, vals, fmt='-')
    plt.show()


def plot_build_time():
    stats = load_stats('./pr-stats.json')
    failed_builds = get_failed_builds(stats)
    avg_times = get_avg_time(failed_builds)
    print(avg_times)
    x = []
    y = []
    for i, build in enumerate(avg_times):
        x.append(build['num'])
        y.append(build['time'])

    x_pos = [i for i, _ in enumerate(x)]
    plt.bar(x_pos, y, align='center')
    plt.xticks(x_pos, x)

    plt.title('Average Time')
    plt.xlabel('PR #')
    plt.ylabel('Time (mins)')
    plt.show()


# prs = search_issues()
# daily_prs = get_frequency(prs)
# build_stats = get_build_stats(prs)


plot_daily_prs()
plot_build_time()
