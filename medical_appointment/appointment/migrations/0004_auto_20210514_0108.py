# Generated by Django 3.1 on 2021-05-14 06:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0003_remove_appointmentassign_specialty'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='appointment',
            options={'ordering': ['time']},
        ),
    ]
