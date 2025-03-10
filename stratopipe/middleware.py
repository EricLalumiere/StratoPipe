""" Middleware for logging incoming HTTP requests and outgoing responses. """

import logging

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware:
    """
    Middleware that logs incoming HTTP requests and outgoing responses.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log request method and full path
        logger.info(f"Incoming request: {request.method} {request.get_full_path()}")
        response = self.get_response(request)
        # Log response status code
        logger.info(f"Response status: {response.status_code}")
        return response
