from django.urls import path

from . import views

urlpatterns = [
    path("", views.algorithm_view),
    path("/bubblesort", views.algorithm_bubblesort),
]
