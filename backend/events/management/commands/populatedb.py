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
        DUMP_DIR = Path(options['dirpath'])
        if not DUMP_DIR.is_dir():
            raise FileNotFoundError()

        schools = []
        for file_ in DUMP_DIR.glob('*.json'):
            with file_.open() as fh:
                schools.append(json.load(fh))

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
                        # print(e)
                        pass
