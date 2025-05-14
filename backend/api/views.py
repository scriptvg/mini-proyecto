from rest_framework import mixins
from rest_framework import generics
from .models import Producto
from .serializers import ProductoSerializer

# Vista para crear un producto
class CrearProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista para listar productos
class ListarProductos(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

# Vista para actualizar un producto
class ActualizarProducto(generics.GenericAPIView, mixins.UpdateModelMixin):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

# Vista para eliminar un producto
class EliminarProducto(generics.GenericAPIView, mixins.DestroyModelMixin):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
