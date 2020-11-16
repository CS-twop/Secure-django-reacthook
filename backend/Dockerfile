FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
# CMD ["python3", "manage.py", "makemigrations"]
# CMD ["python3", "manage.py", "migrate"]
# CMD ["python3", "manage.py", "createsuperuser", "--noinput"]
# CMD ["python3", "manage.py", "runserver"]
# RUN python3 manage.py migrate
# RUN python3 manage.py createsuperuser --noinput