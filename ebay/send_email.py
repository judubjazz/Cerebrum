# -*- coding: utf-8 -*-

import smtplib
import email

from string import Template


MY_ADDRESS = 'julienguite3@hotmail.com'
PASSWORD = 'GUIJUL22'


def read_template(filename):
    """
    Returns a Template object comprising the contents of the
    file specified by filename.
    """

    with open(filename, 'r') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)


def send_email(element_a_envoye):

    message_template = read_template('message.txt')

    # add in the actual person name to the message template
    message = message_template.substitute(PERSON_NAME="julien",ITEM=element_a_envoye)

    # Prints out the message body for our sake
    print(message)

    # setup the parameters of the message
    msg = email.message_from_string(message)
    msg['From'] = MY_ADDRESS
    msg['To'] = 'julienguite3@hotmail.com'
    msg['Subject'] = "This is TEST"

    # set up the SMTP server
    s = smtplib.SMTP(host='smtp-mail.outlook.com', port=587)
    s.ehlo()  # Hostname to send for this command defaults to the fully qualified domain name of the local host.
    s.starttls()
    s.ehlo()  # Hostname to send for this command defaults to the fully qualified domain name of the local host.
    s.login(MY_ADDRESS, PASSWORD)

    # send the message via the server set up earlier.
    s.sendmail(MY_ADDRESS, MY_ADDRESS, msg.as_string())
    # s.send_message(msg)
    del msg

    # Terminate the SMTP session and close the connection
    s.quit()
    print "email envoyé"


if __name__ == '__main__':
    send_email()