# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings


# This code is triggered whenever a new user has been created and saved to the database
@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        print Token.objects.values()


class Snippet(models.Model):

    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    highlighted = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    email = models.TextField()
    keywords = models.CharField(max_length=100, unique=True, blank=False, null=False)
    condition = models.TextField(blank=True)
    sort_order = models.TextField(blank=True)
    min_price = models.TextField(blank=True)
    max_price = models.TextField(blank=True)
    currency = models.TextField(blank=True)

    # def save(self, *args, **kwargs):
    #     """
    #     Use the `pygments` library to create a highlighted HTML
    #     representation of the code snippet.
    #     """
    #     lexer = get_lexer_by_name(self.language)
    #     linenos = self.linenos and 'table' or False
    #     options = self.title and {'title': self.title} or {}
    #     formatter = HtmlFormatter(style=self.style, linenos=linenos,
    #                               full=True, **options)
    #     self.highlighted = highlight(self.code, lexer, formatter)
    #     super(Snippet, self).save(*args, **kwargs)


    class Meta:
        ordering = ('created',)


