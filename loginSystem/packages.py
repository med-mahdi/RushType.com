


#____________________ Import Form Views.py File ___________________
from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login , logout
from django.shortcuts import redirect
from .decorators import alreadyLoggedIn
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.contrib import messages



# _________________ Imports For Models.py File ____________________
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *
import json