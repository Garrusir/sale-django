# Generated by Django 3.1.4 on 2020-12-24 09:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sale', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='StoreType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=300)),
            ],
        ),
        migrations.AddField(
            model_name='sale',
            name='price_new',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
        migrations.AddField(
            model_name='sale',
            name='price_old',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
        migrations.CreateModel(
            name='SpecialOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=300)),
                ('date_start', models.DateTimeField()),
                ('date_end', models.DateTimeField()),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialOffers', to='sale.store')),
            ],
        ),
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=300)),
                ('cinty', models.CharField(max_length=150)),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shops', to='sale.store')),
                ('storeType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shops', to='sale.storetype')),
            ],
        ),
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=300)),
                ('date_start', models.DateTimeField()),
                ('date_end', models.DateTimeField()),
                ('code', models.CharField(max_length=100)),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='promoCodes', to='sale.store')),
            ],
        ),
        migrations.CreateModel(
            name='CommentSpecialOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=300)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentSpecialOffers', to='sale.author')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentSpecialOffers', to='sale.specialoffer')),
            ],
        ),
        migrations.CreateModel(
            name='CommentSale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=300)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentSales', to='sale.author')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentSales', to='sale.sale')),
            ],
        ),
        migrations.CreateModel(
            name='CommentPromoCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=300)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentPromoCodes', to='sale.author')),
                ('code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentPromoCodes', to='sale.promocode')),
            ],
        ),
        migrations.AddField(
            model_name='store',
            name='storeType',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='stores', to='sale.storetype'),
        ),
    ]
