# -*- coding: utf-8 -*-

import smtplib
import email

from django.core.mail import send_mail
from string import Template

MY_ADDRESS = 'julienguite3@hotmail.com'

def read_template(filename):
    """
    Returns a Template object comprising the contents of the
    file specified by filename.
    """
    with open(filename, 'r') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)


def send_email(element_a_envoye,url,destination):

    message_template = read_template('ebay/message.txt')

    # add in the actual person name to the message template
    message = message_template.substitute(PERSON_NAME="julien",ITEM=element_a_envoye, URL = url)

    send_mail('EBAY WATCHER ALERT', message,MY_ADDRESS,[destination],fail_silently=False,)
    print "email envoyé"