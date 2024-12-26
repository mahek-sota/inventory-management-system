from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
# from django.shortcuts import render
from django.db.models import Count

from .models import *
from .serializers import *

#get, put, delete and post methods
@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializers(items, many=True)
        print('get method')
        print(items)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def item_detail(request, sku):
    try:
        item = Item.objects.get(sku=sku)
    except Items.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ItemSerializers(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#query total and category count
@api_view(['GET'])
def get_counts(request):
    unique_categories_count = Item.objects.values('category').distinct().count()
    total_rows_count = Item.objects.count()
    return JsonResponse({'unique_categories_count': unique_categories_count, 'total_rows_count': total_rows_count})
    
#get item_details by passing name

@api_view(['GET'])
def get_item_details(request, sku):
    if request.method == 'GET':
        try:
            # Retrieve the ItemInDetail objects based on the provided sku
            items_in_detail = ItemInDetail.objects.filter(sku__sku=sku)
            
            # Serialize the data
            serializer = ItemDetailsSerializer(items_in_detail, many=True)
            
            return Response(serializer.data)
        except ItemInDetail.DoesNotExist:
            return Response({'error': 'Item details not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def build_list(request):
    if request.method == 'GET':
        builds = Build.objects.all()  
        print(builds)
        serializer = BuildSerializers(builds, many=True)
        print(serializer.data)  
        return Response(serializer.data)