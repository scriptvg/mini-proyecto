from rest_framework import generics
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer

# Vista para crear un producto
class CrearProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista para listar productos
class ListarProductos(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista para actualizar un producto
class ActualizarProducto(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista para eliminar un producto
class EliminarProducto(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    

# Vista para crear una categoría
class CrearCategoria(generics.CreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
# Vista para listar categorías
class ListarCategorias(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
      
# Vista para actualizar una categoría
class ActualizarCategoria(generics.UpdateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

# Vista para eliminar una categoría
class EliminarCategoria(generics.DestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer