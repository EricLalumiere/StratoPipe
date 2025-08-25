-------------------------------------------------------------
                     StratoPipe Project Testing Guide
-------------------------------------------------------------
# StratoPipe Project Testing Guide

### Apply Django migrations:

- Check pending migrations
- Create migration files (if needed)
- Apply to the database

``` Bash
  python manage.py showmigrations
  python manage.py makemigrations
  python manage.py migrate
```

### Start Celery worker in one terminal:
```Bash
  celery -A stratopipe worker -l info
  ```

### In another terminal, launch Django Channels/ASGI:
- `python manage.py runserver 0.0.0.0:8000`

### Start your React app:
``` Bash
  cd frontend
  npm start
 ```

# 1. Local Environment Setup
Clone your repo and cd into StratoPipe.
Create & activate a Python virtualenv:
- `python3 -m venv .venv`
- `source .venv/bin/activate`

Install back-end deps:
- `pip install -r requirements.txt`


In a new shell, cd into frontend and install front-end deps:
``` Bash
  cd frontend
  npm install
  cd ..
```
Copy .env.example → .env (or export env vars) with at least:
```
DJANGO_SECRET_KEY=yourkey
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

# 2. Run Migrations & Start Services
Apply Django migrations:
- `python manage.py migrate`

Start Celery worker in one terminal:
``` Bash
  celery -A stratopipe worker -l info
```

In another terminal, launch Django Channels/ASGI:
- `python manage.py runserver`

Start your React app:
``` Bash
  cd frontend
  npm start
```

# 3. Back-End Automated Tests
· Run all Django tests:
- `python manage.py test`

This covers your authentication, projects, assets, tasks, and collaboration apps.
· Inspect output for failures. Note any missing coverage (e.g., task views, serializers, AI-task error handling).

# 4. Front-End Automated Tests
· In frontend/, run:
``` Bash
  npm test
```

This executes any Jest/React Testing Library specs you’ve written (if none exist, it’ll scaffold an example test).
· Quick check: even one passing test confirms your harness works. If zero tests, go ahead and add a smoke test for <Login /> or <AssetList />.

# 5. Manual API Smoke Tests (via cURL or Postman)
Register & Login

``` Bash
  curl -X POST http://localhost:8000/api/auth/register/ \
    -H "Content-Type: application/json" \
    -d '{"username":"eric","email":"e@x.com","password":"test1234"}'
  curl -X POST http://localhost:8000/api/auth/login/ \
    -H "Content-Type: application/json" \
    -d '{"username":"eric","password":"test1234"}'
```
 Expect 200 OK and a JSON token.
Project CRUD


- Create: POST /api/projects/ with auth header
- List: GET /api/projects/
- Detail/Delete: GET/DELETE /api/projects/{id}/
- Asset Upload & List

Use Postman’s “form-data” to 
- POST /api/assets/upload/ a small image or geometry file
- GET /api/assets/—expect your asset in the array 

Comments
- POST /api/collaboration/comments/ with { asset: <id>, content: "hello" }
- GET /api/collaboration/comments/?asset=<id>

# 6. Celery & AI Task Validation
- Watch your Celery worker logs when you upload a geometry file or image—confirm render_asset and process_asset_ai tasks fire.
- After a few seconds, inspect in the Django Admin or via python manage.py shell:
```
from assets.models import Asset
a = Asset.objects.last()
print(a.is_rendered, a.thumbnail, a.categories, a.ai_enhanced)
```
 You should see flags flipped and media fields populated.

# 7. Real-Time WebSocket Checks
- Open your browser’s console on the React front end.
- On a page where NotificationHandler is mounted, force a render event (e.g., re-upload geometry).
- Look for "WebSocket connected" and incoming messages in the console.
- If it disconnects, confirm your Channels routing in routing.py aligns with your front-end URL.

# 8. End-to-End Flow in the UI
- Register a new user on /register.
- Log in on /login.
- Create a project.
- Upload an asset.
- Click its thumbnail—observe the “Rendering in progress…” text, then the high-res image when done.
- Add a comment in the asset detail view; verify it appears in real time on another browser tab.

# 9. Coverage & Quality Metrics
· Back-end coverage:
``` Bash
  coverage run --source=. manage.py test && coverage report
```

Aim for >80% coverage in each app.
· Linting:
flake8 .
``` Bash
    npm run lint
```

# 10. Next Steps After Testing
- Collate failing tests and manual broken flows into a prioritized backlog.
- Tackle missing UI pieces (e.g., register/login forms, comment thread).
- Bridge API gaps you uncovered in smoke tests.
- By following these steps you’ll map out exactly which features work end-to-end and which ones still need wiring or tests.
-------------------------------------------------------------