import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model
from accounts.models import Account
from events import serializers
from events.models import School, Event, Topic
from .helpers import get_cuny_schools
# from accounts.serializers import Account


class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()
        django_get_or_create = ('email',)

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    username = factory.Faker('user_name')
    password = factory.Faker('password')


class AccountFactory(DjangoModelFactory):
    class Meta:
        model = Account
        django_get_or_create = ('owner',)

    owner = factory.SubFactory(UserFactory)
    school = factory.Iterator(School.objects.all())


class EventFactory(DjangoModelFactory):
    class Meta:
        model = Event

    name = factory.Faker('sentence', nb_words=4,
                         variable_nb_words=True)
    description = factory.Faker('paragraph', nb_sentences=4,
                                variable_nb_sentences=True)
    time = factory.Faker('iso8601')
    capacity = factory.Faker('random_int', min=0, max=50)
    campus = factory.Iterator(School.objects.all())
    organizer = factory.Iterator(Account.objects.all())

    @factory.post_generation
    def attendees(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for user in extracted:
                self.attendees.add(user)


class SchoolFactory:
    class SchoolIterator:
        def __init__(self, num):
            self.schools = get_cuny_schools()[:num]
            self.idx = 0

        def __next__(self):
            try:
                ret = self.schools[self.idx]
            except IndexError:
                raise StopIteration

            self.idx += 1
            return ret['name'], ret['code']

        def __iter__(self):
            return self

    def create(self, num=20):
        ret = []
        for name, code in self.SchoolIterator(num):
            obj, created = School.objects.get_or_create(name=name, code=code)
            if created:
                ret.append(obj.__dict__)

        return ret
