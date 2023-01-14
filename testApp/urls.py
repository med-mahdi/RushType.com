

from django.urls import path
from .views import testPage , profileDataApi , testArea

urlpatterns = [
    path('',testPage, name="testPage"),
    path('data/api',profileDataApi, name="profileDataApi"),
    #*!> This is Just A Test View 
    path('testArea/',testArea, name="testArea"),
]