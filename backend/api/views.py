from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from .serializers import UserRegisterSerializer, UserLoginSerializer, ProductoSerializer, CategoriaSerializer
from .models import UserProfile, Producto, Categoria
from .permissions import IsAuthenticatedAdmin, IsAuthenticatedUserRole
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
import logging


# Vista para crear un producto
class CrearProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]
    

# Vista para listar productos
class ListarProductos(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

# Vista para actualizar un producto
class ActualizarProducto(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

# Vista para eliminar un producto
class EliminarProducto(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]
    

# Vista para crear una categoría
class CrearCategoria(generics.CreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    
# Vista para listar categorías
class ListarCategorias(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
      
# Vista para actualizar una categoría
class ActualizarCategoria(generics.UpdateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

# Vista para eliminar una categoría
class EliminarCategoria(generics.DestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        role = serializer.validated_data.get('role', 'cliente')
        profile_image = serializer.validated_data.get('profile_image')

        if username == 'kromm' and email == 'velezalan34@gmail.com':
            if role not in ['admin', 'cliente', 'proveedor', 'gerente', 'recepcionista', 'almacenista', 'vendedor']:
                return Response({'error': 'Invalid role for kromm'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            role = 'cliente'

        user = serializer.save()
        
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        # Check if UserProfile already exists
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        
        # Set profile_image if provided and UserProfile was created
        if profile_image and created:
            user_profile.profile_image = profile_image
            user_profile.save()

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'role': role,
            'profile_image': user_profile.profile_image.url if user_profile.profile_image else None
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            roles = user.groups.values_list('name', flat=True)
            if not roles:
                return Response({'error': 'No role assigned to the user'}, status=status.HTTP_401_UNAUTHORIZED)
            
            role = roles[0]

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
                'role': role,
                'profile_image': user.userprofile.profile_image.url if user.userprofile.profile_image else None
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutView(generics.GenericAPIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
     
logger = logging.getLogger(__name__)
        
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    logger.info(f'login_view: received username={username}, password={password}')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        logger.info(f'login_view: user authenticated, username={username}')
        return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)})
    logger.warning(f'login_view: authentication failed, username={username}')
    return JsonResponse({'error': 'Invalid credentials'}, status=401)

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    logger.info(f'register_view: received username={username}, password={password}')
    user = User.objects.create_user(username=username, password=password)
    refresh = RefreshToken.for_user(user)
    logger.info(f'register_view: user registered, username={username}')
    return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)})

@api_view(['POST'])
def logout_view(request):
    logger.info('logout_view: logout request received')
    logout(request)
    logger.info('logout_view: user logged out')
    return JsonResponse({'message': 'Logged out successfully'})