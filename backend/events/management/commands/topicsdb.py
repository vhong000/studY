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
            topics = obj.get("titles")
            image_topic = obj.get("image_topic")
            image = obj.get("image")
            if(len(image_topic)==0):
                for i in range(len(topics)):
                    image_topic.append("")
            category, created = Category.objects.get_or_create(name=cat,
                                                image=image)
            # topics = list(chain.from_iterable(obj.values()))

            for topic,image in zip(topics,image_topic):
                category.topics.get_or_create(name=topic,image=image)

