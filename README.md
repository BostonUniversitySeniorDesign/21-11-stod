To install React packages:

```
cd stod-frontend/
yarn
```

To install Python packages:

Create a virtual environment within stod-backend (https://docs.python-guide.org/dev/virtualenvs/)

Then:

```
source venv/bin/activate
pip install -r requirements.txt
```

Remeber to do:

```
pip freeze > requirements.txt
```

After installing a python package

## Docker Instructions

To start

#### Delete all migrations and pycache folder in each backend app if running for the first time
(For good measure, run restart.db.sh afterwards as well)

cd into chat-server/ and run:

```
docker-compose up --build
```

cd into stod-backend/ and run:

```
docker-compose up --build
```

You only need to use `--build` once or if python requirements change, otherwise run it without the flag (faster to start). You can also use `-d` like this:

```
docker-compose up -d --build
```

or

```
docker-compose up -d
```

which will run the container in detached mode as a background process.

#### To drop the database, run:
```
docker-compose down --volumes
```

## Postgres Instructions

Interact with postgres through terminal:

```
psql -h localhost -p 5433 -d hello_django_dev -U hello_django
```

Or through GUI:
Get pgAdmin for your machine: https://www.pgadmin.org/download/

Click add new server and use these credentials:

- Name: hello_django_dev
- Host: localhost
- Port: 5433
- Username: hello_django
- Password: hello_django


## Production Environment:
The backend server is running on ip: 159.89.88.112 and on domain "stod.backend.app" (no www). 
Backend is accessed through port 443 and the chat server sockets are accessed through port 4000, both using HTTPS.
Postgress/Django environment variables are stored in .env.prod and added to the .gitignore. 
Docker compose files are stored as docker-compose.prod.yml. 
SSL certificates are stored in a local path and added to docker volumes.

To allow for local development, all backend-production code is stored in branch "backend-prod".

Build docker containers on server:

To reset the database, run in chat-server and stod-backend:

```
docker-compose down -v
```

Chat server should always be run first. Cd into chat server and run:

```
docker-compose -f docker-compose.prod.yml up --build
```

Then cd into stod-backend and run:

```
docker-compose -f docker-compose.prod.yml up --build
```

Use ```-it``` to run in shell and ```-d``` to run in background

Front end is running on Netlify server using the "prod" branch. Simply push to prod branch to build and deploy front end. Domain is running on "www.stod.app".

To add an admin user, enter docker container by running:
```
docker exec -it [stodbackend_web ID] /bin/sh
```
Enter /stod/ and run:
```
python3 manage.py createsuperuser
```



# Accounts API

## accounts/register/

POST request

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

## accounts/login/

POST request

```json
{
  "email": "string",
  "password": "string"
}
```

Response

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

## accounts/user/

GET request

Must provide Token header.

Response

```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

## accounts/logout/

Logout is a view provided by the knox library.

## accounts/request-reset-email/

POST request

```json
{
  "email": "string"
}
```

Response

```json
{
  "success": "We have sent you a link to reset your password"
}
```

## accounts/password-reset/\<uidb64>/\<token>/

React would grab the uidb64 and token and send a request to
accounts/password-reset-complete/

## accounts/password-reset-complete/

POST request

```json
{
  "password": "string",
  "token": "string",
  "uidb64": "string"
}
```

Response (on success)

```json
{
  "success": "True",
  "message": "Password reset success"
}
```
