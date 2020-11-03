from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError as DJValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from rest_framework.exceptions import (
    AuthenticationFailed as DFRAuthenticationFailed,
    ValidationError as DRFValidationError,
)

# User serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# Register serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        user = User(**data)

        password = data.get("password")
        username = data.get("username")
        email = data.get("email")

        """ Validate Email """
        try:
            validate_email(email)
        except DJValidationError as e:
            raise DRFValidationError(e.messages)

        if User.objects.filter(email=email).exists():
            raise DRFValidationError({"email": ["Email already exists"]})

        """ Validate Password """
        try:
            validate_password(password=password, user=user)

        except DJValidationError as e:
            raise DRFValidationError(e.messages)

        return super(RegisterSerializer, self).validate(data)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


# Login serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError({"login": ["Incorrect credentials"]})


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):

        email = data.get("email")

        """ Validate Email """
        try:
            validate_email(email)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": ["Email does not exist"]})

        return super(RegisterSerializer, self).validate(data)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise DFRAuthenticationFailed("The reset link is invalid", 401)

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise DFRAuthenticationFailed("The reset link is invalid", 401)
        return super().validate(attrs)
