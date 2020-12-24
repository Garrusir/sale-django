from django.urls import path

from .views import SaleView

app_name = 'sales'

urlpatterns = [
	path('sales/', SaleView.as_view()),
	path('sales/<int:pk>', SaleView.as_view())
]