# Generated by Django 3.1.4 on 2020-12-24 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sale', '0002_auto_20201224_1204'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shop',
            old_name='cinty',
            new_name='city',
        ),
        migrations.AddField(
            model_name='author',
            name='name',
            field=models.CharField(default='default name', max_length=150),
        ),
    ]
