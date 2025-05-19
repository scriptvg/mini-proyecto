# FILEPATH: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/backend/api/middleware.py
import time
from .models import APILog
from django.http import FileResponse

class APILogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        end_time = time.time()

        if request.user.is_authenticated:
            user = request.user
        else:
            user = None

        # Only log request body for non-GET requests
        if request.method != 'GET':
            request_data = request.body.decode('utf-8', errors='replace') if hasattr(request, '_body') else ''
        else:
            request_data = ''

        # Handle FileResponse instances
        if isinstance(response, FileResponse):
            response_data = 'Binary data not logged'
        else:
            try:
                response_data = response.content.decode('utf-8', errors='replace') if response.content else ''
            except UnicodeDecodeError:
                response_data = 'Binary data not logged'

        APILog.objects.create(
            endpoint=request.path,
            method=request.method,
            status_code=response.status_code,
            response_time=end_time - start_time,
            user=user,
            request_data=request_data,
            response_data=response_data
        )

        return response