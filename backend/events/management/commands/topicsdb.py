from django.core.management.base import BaseCommand
from events.models import Category
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
            categories = json.load(fh)

        for cat, obj in categories.items():
            category, created = Category.objects.get_or_create(name=cat)
            topics = list(chain.from_iterable(obj.values()))

            for topic in topics:
                category.topics.get_or_create(name=topic)

