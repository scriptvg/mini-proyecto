from django.db import models
from django.dispatch import receiver
import os

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    precio = models.IntegerField()
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, null=True, blank=True)  # ID de la categoría por defecto
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)
    stock = models.IntegerField(default=0)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

@receiver(models.signals.post_delete, sender=Producto)
def eliminar_archivo_imagen(sender, instance, **kwargs):
  if os.path.isfile(instance.imagen.path):
    os.remove(instance.imagen.path)

      
class Categoria(models.Model):
  nombre = models.CharField(max_length=50, null=True, blank=True)
  
  def __str__(self):
    return self.nombre
 
