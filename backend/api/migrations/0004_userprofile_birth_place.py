# Generated by Django 5.1.6 on 2025-02-24 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_neptundata_userprofile_authenticated_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='birth_place',
            field=models.DateField(blank=True, null=True),
        ),
    ]
