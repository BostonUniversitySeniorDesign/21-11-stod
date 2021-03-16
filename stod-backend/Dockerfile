# pull official base image
FROM python:3.7-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libc-dev libffi-dev openssl-dev
# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
RUN find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
RUN find . -path "*/migrations/*.pyc"  -delete
# RUN python /usr/src/app/stod/manage.py makemigrations
# RUN python /usr/src/app/stod/manage.py migrate

# copy project
COPY . .