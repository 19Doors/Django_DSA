from django.urls import include,path
from . import views
from algorithms import views as algoviews
from data_structure import views as datastrucviews

urlpatterns = [
    path("",views.index, name="index"),
    path("algorithms",include('algorithms.urls')), 
    path("algorithms", algoviews.algorithm_view, name="algorithms"),
    path("datastructures", datastrucviews.data_structure_view, name="data_structures"),
    path("contact",views.contact, name="contact"),
    path("about",views.about, name="about"),
 #   path("datastructures",views.data_structure, name="data_structure"),
 #   path("algorithms",views.algorithms, name="algorithms")
]
