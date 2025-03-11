-------------------------------------------------------------
                     StratoPipe Project
-------------------------------------------------------------
Overview:
  StratoPipe is an integrated animation asset processing and 
  collaboration platform built using Django (with Django REST,
  Channels, and Celery) on the backend and React on the frontend.
  This proof of concept (PoC) focuses on implementing core 
  functionalities to demonstrate the platform's potential.
  
  This early-stage implementation demonstrates:
    - A Django backend with user authentication, project management,
      asset processing (including simulated rendering, thumbnail
      generation, and AI analysis).
    - Asynchronous background task processing via Celery (with a 
      simulated Redis broker).
    - Real-time collaboration capabilities using Django Channels and
      WebSocket-based notifications.
    - A modular React frontend for listing assets, displaying detailed
      asset views, and receiving live notifications.

Current Features:
  1. User Management:
     - Custom user model (extends Django’s AbstractUser) with profile
       features.
     - REST API endpoints for user profile management.

  2. Project & Asset Management:
     - Projects can be created and managed via REST endpoints.
     - Assets include fields for uploaded files, thumbnails, rendering
       results, AI analysis data, and a processing status.
     - Assets trigger background tasks for:
         * Rendering simulation (with status updates).
         * Thumbnail generation.
         * AI processing simulation.

  3. Real-time Collaboration:
     - WebSocket connection (via Channels) for collaborative
       notifications and message broadcasting.
     - A basic Comment model for collaborative asset discussion.

  4. Frontend:
     - A React-based frontend listing assets with thumbnail previews.
     - A modal detail view to display asset details, render results,
       and AI analysis.
     - A notifications component listening to WebSocket messages.

Getting Started:
  ----------------
  1. Python Environment Setup:
     - Create and activate a virtual environment:
         $ python -m venv venv
         (On Windows: venv\Scripts\activate)
         (On macOS/Linux: source venv/bin/activate)
     - Install dependencies:
         $ pip install django djangorestframework channels celery 
           django-celery-results redis

  2. Django Backend Setup:
     - Run migrations:
         $ python manage.py migrate
     - (Optional) Create a superuser for admin access:
         $ python manage.py createsuperuser
     - Start the Django development server:
         $ python manage.py runserver
     - Launch the Celery worker in another terminal (with virtual env activated):
         $ celery -A stratopipe worker --loglevel=info

  3. Frontend Setup:
     - Navigate to the "frontend" folder:
         $ cd frontend
     - Install Node dependencies:
         $ npm install
     - Start the React development server:
         $ npm start
     - (Optional) To build for production:
         $ npm run build

Integration & Testing:
  ----------------------
  - Access the Django app at: 
      http://localhost:8000
  - The admin interface is available at:
      http://localhost:8000/admin
  - The React frontend runs (by default) on:
      http://localhost:3000
  - API Endpoints:
      * Authentication: http://localhost:8000/api/auth/
      * Projects:       http://localhost:8000/api/projects/
      * Assets:         http://localhost:8000/api/assets/
      * Collaboration:  http://localhost:8000/api/collaboration/

Troubleshooting:
  ----------------
  - Ensure Redis (or your selected broker) is running for Celery tasks.
  - Check your virtual environment is activated when running Django and Celery.
  - Review browser console or server logs for errors; adjust CORS or proxy settings 
    if React cannot reach the backend.
  - For WebSocket issues, verify the URL in the frontend (NotificationHandler.js) matches 
    your backend configuration.

Next Steps:
  ----------
  - Replace simulated processing logic in tasks with production-grade code.
  - Refine error-handling and logging across asynchronous processes.
  - Enhance security and performance configurations for production deployment.
  - Implement further collaborative features and real-time interactivity.
  - Expand unit and integration tests.

This README documents the current integration stage of StratoPipe,
and we welcome feedback and planned improvements as development evolves!

-------------------------------------------------------------

