# Secure-django-reacthook

## Run

1. cd to project folder

2. run this command to build images and up all containers.

```bash
docker-compose up --build
```

3. wait until all containers are up.

4. run this command for backend migration.

```bash
docker exec -it backend python3 manage.py migrate
```

5. run this command to set all init data.

```bash
docker exec -it backend python3 manage.py loaddata ./secure_backend/seed/db_1.json
```

6. you can now access the website at http://localhost:3000/

## Useful Information

Here is a list of user in our system for you (username: password):

    User:
    
        - testoman: Wrw=XMHd5Q=eT6q8Asd_qYPW^
        
        - testoboi: f9AwM%CwzAWA6LNAS$Mxfj2hx
        
    Moderator:
    
        - modkun: XS+3%xa2mL6z_qR$mkJ7V*^dS


Please be kind!
