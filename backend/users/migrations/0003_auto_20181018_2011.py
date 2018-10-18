# Generated by Django 2.1.2 on 2018-10-18 20:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20181018_0617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='school',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='student',
            name='user_profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_profile', to=settings.AUTH_USER_MODEL),
        ),
    ]
