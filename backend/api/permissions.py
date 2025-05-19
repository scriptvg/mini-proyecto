# FILEPATH: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/backend/api/permissions.py

from django.db.models import Q
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication

class IsAuthenticatedAdmin(BasePermission):
    def has_permission(self, request, view):
        auth_result = JWTAuthentication().authenticate(request)
        if auth_result is None:
            return False
        
        user, _ = auth_result
        request.user = user

        return user.is_authenticated and user.groups.filter(name='admin').exists()


class IsAuthenticatedUserRole(BasePermission):
    authentication_classes = [JWTAuthentication]

    def has_permission(self, request, view):
        auth_result = JWTAuthentication().authenticate(request)
        if auth_result is None:
            return False
        
        user, _ = auth_result
        request.user = user

        return user.is_authenticated and user.groups.filter(
            Q(name='admin') | Q(name='gerente') | Q(name='cliente') | Q(name='proveedor') | Q(name='recepcionista') | Q(name='almacenista') | Q(name='vendedor')
        ).exists()

    def has_object_permission(self, request, view, obj):
        auth_result = JWTAuthentication().authenticate(request)
        if auth_result is None:
            return False
        
        user, _ = auth_result
        request.user = user

        if request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return user.groups.filter(
                Q(name='admin') | Q(name='cliente') | Q(name='proveedor') | Q(name='gerente') | Q(name='recepcionista') | Q(name='almacenista') | Q(name='vendedor')
            ).exists()
        
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return user.groups.filter(
                Q(name='admin') | Q(name='cliente') | Q(name='proveedor') | Q(name='gerente') | Q(name='recepcionista') | Q(name='almacenista') | Q(name='vendedor')
            ).exists()
        
        return False