from rest_framework import serializers
from .models import Producto, Categoria

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