# Generated by Django 4.2.19 on 2025-02-27 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_userprofile_birth_place'),
    ]

    operations = [
        migrations.AddField(
            model_name='neptundata',
            name='birth_place',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
