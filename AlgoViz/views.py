from django.http import HttpResponse

def data_structure_view(request):
    return HttpResponse('Data structures page')


def algorithm_view(request):
    return HttpResponse('This is the algorithm page.')
