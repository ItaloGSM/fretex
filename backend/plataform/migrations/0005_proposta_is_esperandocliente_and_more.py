# Generated by Django 4.1.5 on 2023-01-24 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plataform', '0004_proposta_is_contraproposta'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposta',
            name='is_esperandoCliente',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='proposta',
            name='is_esperandoFreteiro',
            field=models.BooleanField(default=True),
        ),
    ]
