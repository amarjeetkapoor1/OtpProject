from django.urls import path
from . import views

urlpatterns = [
        path('', views.getContacts, name='getContacts'),
        path('sendMsg/', views.sendMsg, name='sendMsg'),
        path('getListOfMsg/', views.getListOfMsg, name = 'getListOfMsg'),
]
