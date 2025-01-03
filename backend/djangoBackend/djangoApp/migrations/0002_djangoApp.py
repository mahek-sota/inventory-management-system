# Generated by Django 5.0.2 on 2024-02-11 20:01

from django.db import migrations

def create_data(apps, schema_editor):
    Item = apps.get_model('djangoApp', 'Item')
    item = Item.objects.create(sku="BZW123", name="beezwax", tags="22342342", category="Something", in_stock=100, available_stock=200)

    ItemInDetail = apps.get_model('djangoApp', 'ItemInDetail')
    ItemInDetail.objects.create(sku=item, total_allocated='100', allocated_to_builds='90', allocated_to_sales='60', incoming_stock='800', on_build_order='200', net_stock='777', can_build='999', cost=11.11)

    build = apps.get_model('djangoApp', 'Build')
    build.objects.create(reference='CC100', item_group='999', quantity='222', cost=88.88, linked_sales_order_group='S1 000', creation_date_group='2024-02-02', completion_date_group='None', status='pending')

    
    
class Migration(migrations.Migration):
    dependencies = [
        ('djangoApp', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
