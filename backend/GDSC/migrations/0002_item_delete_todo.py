# Generated by Django 5.0.4 on 2024-04-20 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GDSC', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
