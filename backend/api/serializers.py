from rest_framework import serializers
from .models import Producto, Categoria, UserProfile
from django.contrib.auth.models import User

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']
        

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    imagen = serializers.ImageField(required=False)

    class Meta:
        model = Producto
        fields = '__all__'

    def create(self, validated_data):
        # Extraer la categoría utilizando solo su ID
        categoria = validated_data.pop('categoria')
        producto = Producto.objects.create(categoria=categoria, **validated_data)
        return producto

    def update(self, instance, validated_data):
        categoria = validated_data.pop('categoria', None)  # Solo actualizar la categoría si la pasas
        if categoria:
            instance.categoria = categoria

        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.precio = validated_data.get('precio', instance.precio)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.estado = validated_data.get('estado', instance.estado)
        
        if 'imagen' in validated_data:
            instance.imagen = validated_data.get('imagen', instance.imagen)
        
        instance.save()
        return instance
    
class UserRegisterSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    role = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role', 'profile_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role', None)
        profile_image = validated_data.pop('profile_image', None)
        user = User.objects.create_user(**validated_data)
        
        # Create UserProfile without profile_image
        user_profile = UserProfile.objects.create(user=user)
        
        # Set profile_image if provided
        if profile_image:
            user_profile.profile_image = profile_image
            user_profile.save()
        
        return user

class UserLoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)