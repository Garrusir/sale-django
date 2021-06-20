from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from .views import SaleView
from .views import AuthView
from .views import RegistrationView

app_name = 'sales'

urlpatterns = [
  path('sales/', SaleView.as_view()),
	path('sales/<int:pk>', SaleView.as_view()),
	path('auth/', csrf_exempt(AuthView.as_view())),
	path('registration/', csrf_exempt(RegistrationView.as_view())),
	path('graphql/', GraphQLView.as_view(graphiql=True)),
]
