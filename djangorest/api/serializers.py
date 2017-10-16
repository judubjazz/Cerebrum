from rest_framework import serializers
from .models import Bucketlist

class BucketlistSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Bucketlist
        fields = ('id', 'name', 'keywords', 'condition', 'sort_order', 'min_price', 'max_price', 'currency', 'date_created')



    

