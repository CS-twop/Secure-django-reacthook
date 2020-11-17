# Secure-django-reacthook

In order to run this:

1. cd to project folder

2. run: docker-compose up

3. wait until all containers are up.

4. run: docker exec -it backend python3 manage.py migrate

5. run: docker exec -it backend python3 manage.py loaddata ./secure_backend/seed/db_1.json

6. you can now access the website at http://localhost:3000/

Here is a list of user in our system for you (<username>: <password>):
    User:
        - testoman: Wrw=XMHd5Q=eT6q8Asd_qYPW^
        - testoboi: f9AwM%CwzAWA6LNAS$Mxfj2hx
    Moderator:
        - modkun: XS+3%xa2mL6z_qR$mkJ7V*^dS


Please be kind, we are new in web development field.