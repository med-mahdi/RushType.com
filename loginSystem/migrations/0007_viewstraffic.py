# Generated by Django 3.2.6 on 2022-04-06 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginSystem', '0006_messages'),
    ]

    operations = [
        migrations.CreateModel(
            name='viewsTraffic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('traffic', models.IntegerField(blank=True, default=0, null=True)),
                ('pageName', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]
