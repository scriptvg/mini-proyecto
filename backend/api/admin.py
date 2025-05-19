from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *

# Unregister the original User model
admin.site.unregister(User)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'stock')
    
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_image')
    
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'is_superuser', 'first_name', 'last_name')
    exclude = ('password',)
    
# FILEPATH: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/backend/api/admin.py

from django.contrib import admin
from .models import APILog

@admin.register(APILog)
class APILogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'endpoint', 'method', 'status_code', 'response_time', 'user')
    search_fields = ('endpoint', 'method', 'status_code', 'user__username')
    list_filter = ('timestamp', 'method', 'status_code')