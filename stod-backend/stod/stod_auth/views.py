from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import hashlib

SALT = "abcdefghijklmnop_test_salt123"


@csrf_exempt
def createAccount(request):
    """
    Endpoint to create new account.
    Accepts JSON request with format:
    {
        email: string
        password: string
    }
    We then concatenate password with some salt, hash it, and store the hash and the email.
    """
    if request.method != "POST":
        return HttpResponse(status=404)

    userInfo = json.loads(request.body)
    if "email" not in userInfo.keys() or "password" not in userInfo.keys():
        return HttpResponse(status=400)

    email = userInfo["email"]
    password = userInfo["password"]
    # Check if email is valid email
    # Check if password matches some constraints

    stored_password = hashlib.sha256((password + SALT).encode())
    stored_password = stored_password.hexdigest()

    print("User email: " + email)
    print("Password to save: " + stored_password)
    return HttpResponse(status=200)
