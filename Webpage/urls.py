from django.urls import include,path
from . import views

urlpatterns = [
    path("",views.index, name="index"),
    path("contact",views.contact, name="contact"),
    path("about",views.about, name="about"),
 #   path("datastructures",views.data_structure, name="data_structure"),
 #   path("algorithms",views.algorithms, name="algorithms")
]
