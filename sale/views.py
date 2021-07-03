# from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import Group

from .models import Sale
from .serializers import SaleSerializer
# Create your views here.

class SaleView(APIView):
	def get(self, request):
		sales = Sale.objects.all()
		serializer = SaleSerializer(sales, many=True)
		print('request user:', request.user.is_authenticated)
		print('request auth:', request.auth)
		return Response({'sales': serializer.data})

	def post(self, request):
		sale = request.data.get("sale")

		#create a sale from the above data
		serializer = SaleSerializer(data = sale)
		if serializer.is_valid(raise_exception=True):
			sale_saved = serializer.save()
		return Response({"success": "Sale '{}' created successfully".format(sale_saved.title)})

	def put(self, request, pk):
		sale_saved = get_object_or_404(Sale.objects.all(), pk=pk)
		data = request.data.get("sale")
		serializer = SaleSerializer(instance=sale_saved, data=data, partial=True)

		if serializer.is_valid(raise_exception=True):
			sale_saved = serializer.save()

		return Response({
			"success": "Sale '{}' updated successfully".format(sale_saved.title)
		})

	def delete(self, request, pk):
		sale = get_object_or_404(Sale.objects.all(), pk=pk)
		sale.delete()
		return Response({
			"message": "Article with id '{}' has benn deleted".format(pk)
			}, status=204)

class AuthView(APIView):
  def post(self, request):
      username =  request.data.get("username")
      password = request.data.get("password")
      loggedUser = authenticate(username=username, password=password)

      if loggedUser is not None:
        if loggedUser.is_active:
          login(request, loggedUser)

          if loggedUser.groups.filter(name='member').exists():
             return Response({
                "user": {
                  "firstName": loggedUser.first_name,
                  "last_name": loggedUser.last_name,
                  "email": loggedUser.email,
                },
                "role": "member",
              })
          elif loggedUser.groups.filter(name='staff').exists():
             return Response({
                "user": {
                  "firstName": loggedUser.first_name,
                  "last_name": loggedUser.last_name,
                  "email": loggedUser.email,
                },
                "role": "staff",
              })
          else:
            return Response({
              "user": {
                  "firstName": loggedUser.first_name,
                  "last_name": loggedUser.last_name,
                  "email": loggedUser.email,
                },
               "role": "administrator",
             })
        else:
          return Response({
                  "error": "disabled account"
          })
      else:
        return Response({
        "error": "invalid login or password"
        })

class RegistrationView(APIView):
  def post(self, request):
    user = User.objects.create(
      username=request.data.get('email'),
      email=request.data.get('email'),
      first_name=request.data.get('firstName'),
      last_name=request.data.get('lastName')
    )

    user.set_password(str(request.data.get('password')))
    user.save()

    group = Group.objects.get(name='member')
    group.user_set.add(user)

    return Response({
      "user": {
          "firstName": request.data.get('lastName'),
          "last_name": request.data.get('firstName'),
          "email": request.data.get('email'),
        },
       "role": "member",
    }, status=status.HTTP_201_CREATED)

class UserView(APIView):
  def get(self, request):
   if request.user.groups.filter(name='member').exists():
       return Response({
         "isAuth": request.user.is_authenticated,
         "user": {
           "firstName": request.user.first_name,
           "lastName": request.user.last_name,
           "email": request.user.email,
         },
         "role": "member",
       })
   elif request.user.groups.filter(name='staff').exists():
     return Response({
       "isAuth": request.user.is_authenticated,
       "user": {
         "firstName": request.user.first_name,
         "lastName": request.user.last_name,
         "email": request.user.email,
       },
       "role": "staff",
     })
   else:
      return Response({
          "isAuth": request.user.is_authenticated,
          "user": {
            "firstName": request.user.first_name,
            "lastName": request.user.last_name,
            "email": request.user.email,
          },
          "role": "administrator",
        })

class LogoutView(APIView):
  def post(self, request):
      logout(request)
      return Response({"status":"success"})
