from django.urls import path
from .views import CrearProducto, ListarProductos, ActualizarProducto, EliminarProducto

urlpatterns = [
    path('productos/', ListarProductos.as_view(), name='listar_productos'),
    path('productos/crear/', CrearProducto.as_view(), name='crear_producto'),
    path('productos/<int:pk>/actualizar/', ActualizarProducto.as_view(), name='actualizar_producto'),
    path('productos/<int:pk>/eliminar/', EliminarProducto.as_view(), name='eliminar_producto'),
]
