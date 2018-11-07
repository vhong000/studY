from django.core.management.base import BaseCommand
from events.models import School
import json
from pathlib import Path


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--dirpath',
            type=str,
            help='./backend/manage.py populatedb --dirpath ./backend/events/data',
        )

    def handle(self, *args, **options):
        schools = load_from_disk(options['dirpath'])

        for sch in schools:
            new_school, created = School.objects.get_or_create(name=sch['name'],
                                                               code=sch['code'])
            if 'courses' not in sch:
                continue
            for dept, courses in sch['courses'].items():
                for course in courses:
                    try:
                        new_school.courses.get_or_create(name=course[0],
                                                         number=''.join(
                                                                filter(lambda c: c.isdigit(), courses[1])),
                                                         dept=dept)
                    except Exception as e:
                        pass


def load_from_disk(dirpath):
    DUMP_DIR = Path(dirpath)
    if not DUMP_DIR.is_dir():
        raise FileNotFoundError()

    school_list = []
    for file_ in DUMP_DIR.glob('*.json'):
        with file_.open() as fh:
            school_list.append(json.load(fh))

    return school_list
