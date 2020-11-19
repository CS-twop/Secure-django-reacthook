#!/bin/bash

sleep 5
python manage.py migrate
python manage.py loaddata ./secure_backend/seed/db_1.json
python manage.py runserver 0.0.0.0:8000