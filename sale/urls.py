from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from .views import SaleView
from .views import AuthView
from .views import UserView
from .views import LogoutView
from .views import RegistrationView

app_name = 'sales'

urlpatterns = [
  path('sales/', SaleView.as_view()),
	path('sales/<int:pk>', SaleView.as_view()),
	path('auth/', csrf_exempt(AuthView.as_view())),
	path('register/', csrf_exempt(RegistrationView.as_view())),
	path('graphql/', GraphQLView.as_view(graphiql=True)),
	path('user/', csrf_exempt(UserView.as_view())),
  path('logout/', csrf_exempt(LogoutView.as_view()))
]
