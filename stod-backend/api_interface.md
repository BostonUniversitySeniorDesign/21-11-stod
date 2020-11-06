# Accounts API 

## api/auth/register/

POST request
```json
{
    "id": string,
    "username": string,
    "email": string,
    "password": string
}
```
Response
```json
{
    "user": {
        "id": string,
        "username": string,
        "email": string
    },
    "token": string
}
```

## api/auth/login/

POST request
```json
{
    "email": string,
    "password": string
}
```
Response
```json
{
    "user": {
        "id": string,
        "username": string,
        "email": string
    },
    "token": string
}
```

## api/auth/user/

GET request
Response
```json
{
    "id": string,
    "username": string,
    "email": string
}
```

## api/auth/logout/
Logout is a view provided by the knox library.

## api/auth/request-reset-email/
POST request
```json
{
    "email": string
}
```
Response
```json
{
    "success": "We have sent you a link to reset your password"
}
```

## api/auth/password-reset/\<uidb64>/\<token>/
React would grab the uidb64 and token and send a request to
api/auth/password-reset-complete/ 

## api/auth/password-reset-complete/
POST request
```json
{
    "password": string, 
    "token": string, 
    "uidb64": string
}
```
Response (on success)
```json
{
    "success": True, 
    "message": "Password reset success"
}
```