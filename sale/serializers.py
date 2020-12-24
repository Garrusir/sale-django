from rest_framework import serializers
from .models import Sale

class SaleSerializer(serializers.ModelSerializer):
	# title = serializers.CharField(max_length=120)
	# description = serializers.CharField()
	class Meta:
		model = Sale
		fields = '__all__'

	# def update(self, instance, validated_data):
	# 	instance.title = validated_data.get('title', instance.title)
	# 	instance.description = validated_data.get('description',)
