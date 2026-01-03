from rest_framework import serializers

from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','creation_date'] 

class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.category_name',read_only = True)
    image = serializers.ImageField(required=False)
    is_available = serializers.BooleanField(required = False,default=True)

    
    class Meta:
        model = Food
        fields = ['id','category','category_name','item_name','item_price','item_description','item_quantity','image','is_available']

class CartOrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer()
    class Meta:
        model = Order
        fields = ['id','food','quantity'] 