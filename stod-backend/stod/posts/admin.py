from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'comment', 'created_on')
    list_filter = ('created_on',)
    search_fields = ('name', 'email', 'comment')

