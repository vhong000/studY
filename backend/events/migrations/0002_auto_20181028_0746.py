# Generated by Django 2.1.2 on 2018-10-28 07:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='created_at',
            new_name='created',
        ),
    ]