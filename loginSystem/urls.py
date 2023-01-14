from django.urls import path
from .views import heroPage , aboutPage , loginPage , registerPage , logoutPage  
from testApp.views import ranking , profilePage

urlpatterns = [
    path('',heroPage, name="heroPage"),
    path('home/',heroPage, name="heroPage"),
    path('about/',aboutPage, name="aboutPage"),
    path('login/',loginPage, name="loginPage"),
    path('register/',registerPage, name="registerPage"),
    path('logout/',logoutPage, name="logoutPage"),
    path('ranking/',ranking, name="ranking"),
    path('profile/',profilePage, name="profilePage")
]