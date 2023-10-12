from django.shortcuts import render

# Create ur views here.

def algorithm_view(request):
    return render(request, "algorithms.html")

def algorithm_bubblesort(request):
    return render(request, "sorting/bubblesort.html")
