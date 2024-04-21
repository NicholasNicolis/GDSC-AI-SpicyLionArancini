from django.urls import path
from .views import ItemCreateView
from .views import ItemCreateViewForm
from .views import Example  
from .views import Journey

urlpatterns = [
    path('items/', ItemCreateView.as_view(), name='item-create'),
    path('items/form/', ItemCreateViewForm.as_view(), name='item-create-form'),
    path('examples/', Example.as_view(), name='example'),
    path('journey/', Journey.as_view(), name='journey'),
    path('exercise/', Exercise.as_view(), name='exercise'),


]