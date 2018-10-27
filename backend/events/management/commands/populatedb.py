from django.core.management.base import BaseCommand
from events.models import School,Course
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
                new_school = School.objects.get_or_create(name=sch['name'],
                                                   code=sch['code'])
                for dept, courses in sch['courses'].items():
                    for course in courses:
                        Course.objects.get_or_create(name=course[0],
                                                  number=course[1],
                                                  dept=dept)

