from django.urls import path
from .views import *

urlpatterns = [
  #Productos
    path('productos/', ListarProductos.as_view(), name='listar-productos'),
    path('productos/<int:pk>/', ListarProductos.as_view(), name='detalle-producto'),
    path('productos/crear/', CrearProducto.as_view(), name='crear-producto'),
    path('productos/<int:pk>/actualizar/', ActualizarProducto.as_view(), name='actualizar-producto'),
    path('productos/<int:pk>/eliminar/', EliminarProducto.as_view(), name='eliminar-producto'),
    
  # Categorias
    path('categorias/', ListarCategorias.as_view(), name='listar-categorias'),
    path('categorias/<int:pk>/', ListarCategorias.as_view(), name='detalle-categoria'),
    path('categorias/crear/', CrearCategoria.as_view(), name='crear-categoria'),
    path('categorias/<int:pk>/actualizar/', ActualizarCategoria.as_view(), name='actualizar-categoria'),
    path('categorias/<int:pk>/eliminar/', EliminarCategoria.as_view(), name='eliminar-categoria'),
  
]
