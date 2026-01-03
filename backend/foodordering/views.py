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
          return Response({"message": "Món ăn đã được thêm vào."}, status=201)
     return Response({"message":"Đã xảy ra lỗi"},status=400)


@api_view(['GET'])
def list_foods(request):
     foods = Food.objects.all()
     serializer = FoodSerializer(foods, many=True)
     return Response(serializer.data)


@api_view(['GET'])
def food_search(request):
     query = request.GET.get('q','')
     foods = Food.objects.filter(item_name__icontains=query)
     serializer = FoodSerializer(foods, many=True)
     return Response(serializer.data)

import random 
@api_view(['GET'])
def random_foods(request):
     foods = list(Food.objects.all())
     random.shuffle(foods)
     limited_foods = foods[0:9]
     serializer = FoodSerializer(limited_foods, many=True)
     return Response(serializer.data)

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register_user(request):
     first_name = request.data.get('firstname')
     last_name = request.data.get('lastname')
     mobile = request.data.get('mobilenumber')
     email = request.data.get('email')
     password = request.data.get('password')
    
     if User.objects.filter(email=email).exists() or User.objects.filter(mobile=mobile).exists():
          return Response({"message":"Email hoặc số điện thoại đã được đăng ký"},status =400 )
     User.objects.create(first_name = first_name,last_name = last_name,mobile = mobile,email = email,password = make_password(password))
     return Response({"message":"Đăng ký thành công"},status = 201)


#login
from django.db.models import Q
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User

@api_view(['POST'])
def login_user(request):
    identifier = request.data.get('emailcont')
    password = request.data.get('password')

    if not identifier or not password:
        return Response(
            {"message": "Vui lòng nhập đầy đủ thông tin"},
            status=400
        )

    try:
        user = User.objects.get(
            Q(email=identifier) | Q(mobile=identifier)
        )

        if not check_password(password, user.password):
            return Response(
                {"message": "Mật khẩu không chính xác"},
                status=400
            )

        # LOGIN THÀNH CÔNG
        return Response(
            {
                "message": "Đăng nhập thành công",
                "userId": user.id,
                "userName": user.first_name,
                "email": user.email,
                "mobile": user.mobile
            },
            status=200
        )

    except User.DoesNotExist:
        return Response(
            {"message": "Email hoặc số điện thoại không tồn tại"},
            status=400
        )
    
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def food_detail(request, id):
    # food = Food.objects.get(id=id)
    food = get_object_or_404(Food, id=id)
    serializer = FoodSerializer(food)
    return Response(serializer.data)


@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get('userId')
    food_id = request.data.get('foodId')
    try:
         #if Order.objects.filter(user = user,food=food,is_order_placed=False).exists()
         user = User.objects.get(id = user_id)
         food = Food.objects.get(id= food_id)
         order,created = Order.objects.get_or_create(
              user = user,
              food = food,
              is_order_placed = False,
              #quantity = 1,
              defaults = {'quantity' : 1}
         )
         if not created:
              order.quantity += 1
              order.save()
         return Response({"message":"Food added to cart successfully"},status=200)
    except:
         return Response({"message": "Something went wrong"},status=404)


from .serializers import CartOrderSerializer 
@api_view(['GET'])
def get_cart_items(request,user_id):
     orders = Order.objects.filter(user_id = user_id,is_order_placed= False).select_related('food')
     serializer = CartOrderSerializer(orders,many = True)
     return Response(serializer.data)

@api_view(['PUT'])
def update_cart_quantity(request):
    order_id = request.data.get('orderId')
    quantity = request.data.get('quantity')
    try:
         #if Order.objects.filter(user = user,food=food,is_order_placed=False).exists()
         order = Order.objects.get(id = order_id, is_order_placed = False)
         order.quantity = quantity
         order.save()

         return Response({"message":"quantity updated successfully"},status=200)
    except:
         return Response({"message": "Something went wrong"},status=404)
    

@api_view(['DELETE'])
def delete_cart_item(request,order_id):
    #order_id = request.data.get('orderId')
    try:
        
         order = Order.objects.get(id = order_id, is_order_placed = False)
         order.delete()

         return Response({"message":"Item deleted from cart"},status=200)
    except:
         return Response({"message": "Something went wrong"},status=404)
