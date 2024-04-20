# your_app_name/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer