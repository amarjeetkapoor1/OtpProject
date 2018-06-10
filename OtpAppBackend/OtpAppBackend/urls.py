"""OtpAppBackend URL Configuration """

from django.conf.urls import url,include
from django.contrib import admin
from otpApp import views


urlpatterns = [
    url(r'^', include('otpApp.urls')),
    url(r'^admin/', admin.site.urls),
]
