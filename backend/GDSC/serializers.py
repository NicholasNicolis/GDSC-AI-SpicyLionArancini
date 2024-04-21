from rest_framework import serializers
from .models import Item, Example

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('age', 'schoolOrJob', 'studyDescription', 'methodPreference', 'studyGoal')


class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = ('field')
