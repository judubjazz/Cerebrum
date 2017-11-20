from rest_framework import serializers
from snippets.models import Snippet
from django.contrib.auth.models import User


class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'id', 'highlight', 'owner','email',
                  'keywords', 'condition', 'sort_order', 'min_price', 'max_price', 'currency')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.email = validated_data.get('keywords', instance.keywords)
        instance.keywords = validated_data.get('keywords', instance.keywords)
        instance.condition = validated_data.get('condition', instance.condition)
        instance.sort_order = validated_data.get('sort_order', instance.sort_order)
        instance.min_price = validated_data.get('min_price', instance.min_price)
        instance.max_price = validated_data.get('max_price', instance.max_price)
        instance.currency = validated_data.get('currency', instance.currency)
        instance.save()
        return instance


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username','password', 'email', 'snippets')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)