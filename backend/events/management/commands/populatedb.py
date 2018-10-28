from django.core.management.base import BaseCommand
from events.models import School
import json


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--filepath',
            type=str,
            help='path/to/data_dump.json',
        )

    def handle(self, *args, **options):
        with open(options['filepath'], mode='r') as fh:
            schools = json.load(fh)
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
