# Generated by Django 3.2.6 on 2022-03-05 23:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('loginSystem', '0002_delete_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(blank=True, max_length=50, null=True)),
                ('positon_x', models.CharField(blank=True, max_length=50, null=True)),
                ('positon_y', models.CharField(blank=True, max_length=50, null=True)),
                ('profile_img', models.URLField(max_length=100)),
                ('flagCountry', models.URLField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
