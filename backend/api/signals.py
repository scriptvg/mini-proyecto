from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from .models import APILog
import time

@receiver(post_save, sender=APILog)
def log_api_request(sender, instance, **kwargs):
    # Calcula el tiempo de respuesta
    response_time = (now() - instance.timestamp).total_seconds()
    
    # Actualiza el campo response_time en la instancia
    instance.response_time = response_time
    instance.save()