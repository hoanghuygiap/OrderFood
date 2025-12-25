from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view ,parser_classes
from rest_framework.response import Response

from .serializers import CategorySerializer

from .models import * 
# Create your views here.
@api_view(['POST'])
def admin_login_api(request):
     username = request.data.get('username')
     password = request.data.get('password')

     user = authenticate(username=username, password=password)

     if user is not None and user.is_staff:
          return Response({"message": "Login successful","username": username}, status=200)
     return Response({"message": "Invalid credentials"}, status=401)

@api_view(['POST'])
def add_category(request):
     category_name = request.data.get('category_name')

     Category.objects.create(category_name = category_name)

     return Response({"message": "Category has been created"}, status=201)


@api_view(['GET'])
def list_categories(request):
     categories = Category.objects.all()
     serializer = CategorySerializer(categories, many=True)
     return Response(serializer.data)


from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import FoodSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def add_food_item(request):
     serializer = FoodSerializer(data= request.data)
     if serializer.is_valid():
          serializer.save()
          return Response({"message": "Food item has been added"}, status=201)
     return Response({"message":"Something went wrong"},status=400)


@api_view(['GET'])
def list_foods(request):
     foods = Food.objects.all()
     serializer = FoodSerializer(foods, many=True)
     return Response(serializer.data)