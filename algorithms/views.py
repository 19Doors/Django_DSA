from django.http import HttpResponse
from django.shortcuts import render

# Create ur views here.

def algorithm_view(request):
    return HttpResponse('This is the algorithm page.')
