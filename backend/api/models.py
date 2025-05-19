from django.db import models
from django.dispatch import receiver
import os
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    def __str__(self):
        return self.user.username

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
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
  
class APILog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    endpoint = models.CharField(max_length=255)
    method = models.CharField(max_length=10)
    status_code = models.IntegerField()
    response_time = models.FloatField()
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)
    request_data = models.TextField(null=True, blank=True)
    response_data = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.timestamp} - {self.endpoint} - {self.method} - {self.status_code}"
 
