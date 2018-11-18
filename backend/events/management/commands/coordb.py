from django.core.management.base import BaseCommand
from events.models import School
import json
from pathlib import Path
import sys
from itertools import chain

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--dirpath',
            type=str,
            help='./backend/manage.py topicsdb --dirpath ./backend/events/data/topics',
        )

    def handle(self, *args, **options):
        file = sys.argv[-1]
        with open(file) as fh:
            coordinate= json.load(fh)

        for code, obj in coordinate.items():
            lat = obj[0]
            long = obj[1]
            school= School.objects.get(code=code)

            school.lat=lat
            school.long=long
            school.save()
