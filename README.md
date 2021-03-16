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
