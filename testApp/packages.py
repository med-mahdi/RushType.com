from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import redirect
from .models import Records , BestScore
from django.contrib.auth.decorators import login_required
import json
import requests
