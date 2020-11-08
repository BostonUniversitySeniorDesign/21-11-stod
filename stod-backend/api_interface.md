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
