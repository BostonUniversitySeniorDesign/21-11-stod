from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage
from django.contrib.staticfiles import finders
from file_link_server import settings
from functools import lru_cache

def send_email(data):
    message = EmailMultiAlternatives(
        subject=data['email_subject'],
        body="hello",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[data['to_email']]
    )
    message.mixed_subtype = 'related'
    message.attach_alternative(data['email_body'], "text/html")
    message.attach(logo_data())

    message.send(fail_silently=False)

@lru_cache()
def logo_data():
    with open(finders.find(settings.BASE_DIR + '/static/accounts_api/file_link_logo.png'), 'rb') as f:
        logo_data = f.read()
    logo = MIMEImage(logo_data)
    logo.add_header('Content-ID', '<logo>')
    return logo