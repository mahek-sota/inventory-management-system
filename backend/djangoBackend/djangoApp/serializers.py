from rest_framework import serializers
from .models import *

class ItemSerializers(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'
        

class ItemDetailsSerializer(serializers.ModelSerializer):
    sku = serializers.CharField(source='sku.sku')  # Use source to specify the field name to serialize
    
    class Meta:
        model = ItemInDetail
        fields = ['id', 'total_allocated', 'allocated_to_builds', 'allocated_to_sales', 'incoming_stock', 
                  'on_build_order', 'net_stock', 'can_build', 'cost', 'sku']


class BuildSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Build
        fields = '__all__'