#!/bin/bash

python manage.py migrate
python manage.py loaddata ./secure_backend/seed/db_1.json