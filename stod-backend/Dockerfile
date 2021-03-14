FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN apt-get -y update && apt-get install -y libzbar-dev
RUN pip install -r requirements.txt
ADD ./ /code/
CMD ["python", "stod/manage.py", "runserver", "0.0.0.0:8000"]