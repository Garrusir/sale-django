# from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Sale
from .serializers import SaleSerializer
# Create your views here.

class SaleView(APIView):
	def get(self, request):
		sales = Sale.objects.all()
		serializer = SaleSerializer(sales, many=True)
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

