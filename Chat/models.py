from django.db import models


class ChatMessage(models.Model):
    room = models.TextField()
    message = models.TextField()
    post_date = models.DateTimeField()
