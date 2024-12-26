from django.db import models

class Item(models.Model):
    sku = models.CharField(max_length=50, unique=True)  
    name = models.CharField(max_length=255)  
    tags = models.CharField(max_length=100)
    category = models.CharField(max_length=255)  
    in_stock = models.IntegerField()  
    available_stock = models.IntegerField()  

    def __str__(self):
        return self.sku  # Choose a field to represent the object
    
    class Meta:
        db_table = 'item'

from django.db import models

class Build(models.Model):
    STATUS_CHOICES = [
        ('complete', 'Complete'),
        ('pending', 'Pending'),
        ('cancelled', 'Cancelled'),
    ]
    
    reference = models.CharField(max_length=50, unique=True)  
    item_group = models.CharField(max_length=255)  
    quantity = models.IntegerField()  
    cost = models.FloatField()  
    linked_sales_order_group = models.CharField(max_length=255)  
    creation_date_group = models.DateField()  
    completion_date_group = models.DateField(null=True, blank=True)  # Allow NULL values and empty values
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    


    def __str__(self):
        return self.reference  # Choose a field to represent the object

    class Meta:
        db_table = 'build'


class ItemInDetail(models.Model):
    sku = models.ForeignKey(Item, on_delete=models.CASCADE)
    total_allocated = models.CharField(max_length=255)
    allocated_to_builds = models.CharField(max_length=255)
    allocated_to_sales = models.CharField(max_length=255)
    incoming_stock = models.CharField(max_length=255)
    on_build_order = models.CharField(max_length=255)
    net_stock = models.CharField(max_length=255)
    can_build = models.CharField(max_length=255)
    cost = models.FloatField()
   
    def __str__(self):
        return self.name  # Choose a field to represent the object

    class Meta:
        db_table = 'item_details'
