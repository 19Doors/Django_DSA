from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def data_structure_view(request):
    return HttpResponse('Data structures page')
