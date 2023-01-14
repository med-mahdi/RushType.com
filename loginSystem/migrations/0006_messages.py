# Generated by Django 3.2.6 on 2022-03-25 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginSystem', '0005_delete_messages'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=200)),
                ('message', models.TextField(max_length=1000)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]