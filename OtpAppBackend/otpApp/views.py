from django.shortcuts import render
from django.http import HttpResponse
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from django.conf import settings 
from json.decoder import JSONDecodeError
import re
import json

"""
    Functions used to send Msgs
    Parmetere: request Object which should contain the msg and number
        in request body.
    return HttpResponse with Object containing error and status.
"""
def sendMsg(request):
    response = {}
    try:
        #data Will contain msg to be send and number.
        data = json.loads(str(request.body, 'utf-8'))
        account_sid = settings.ACCOUNT_SID
        auth_token = settings.AUTH_TOKEN
        client = Client(account_sid, auth_token)
        message = client.messages.create(
                        body = data['msg'],
                        from_ = settings.FROM_NUMBER,
                        to = data['number']
                    )
        response = { "status": message.status, "error": message.error_message}
        print(message.error_message)
        print(data['number'])
    except(KeyError, JSONDecodeError):
        response = { 'status': 'failed', 'error': 'Incorrect params'}
    except TwilioRestException:
        response = { 'status': 'failed', 'error': 'Number not Verified'}
    except:
        response = { 'status': 'failed', 'error': 'Server Error'}
    finally:
        return  HttpResponse(json.dumps(response))

"""
    Function used to get All the Contacts
    Param: request Object
    Return: HttpResponse with list of all the Contacts in JSON 
"""
def getContacts(request):
    return HttpResponse(json.dumps(getContactsJSON()))

"""
    Function used to get List of All the Messages sent
    Param: request Object
    Return: HttpResponse with list of all the All the Messages sent in JSON
        in descending order based on datatime of message. 
"""
def getListOfMsg(request):
    messages = []
    try:
        account_sid = settings.ACCOUNT_SID
        auth_token = settings.AUTH_TOKEN
        client = Client(account_sid, auth_token)
        messages = client.messages.list()
    except:
        return HttpResponse(json.dumps(messages))
    else:
        return HttpResponse(getJSONListOfMsg(messages))

"""
    Function used to get JSON formatted data 
    Param: messages (List of messages sent)
    Return: list of all the All the Messages sent in JSON
        in descending order based on datatime of message. 
"""
def getJSONListOfMsg(messages):
    listOfMsg = []
    try:
        sorted(messages, key=lambda message: message.date_sent, reverse=True)
        contacts = {}
        for contact in getContactsJSON():
            contacts[contact['number']] = contact['firstName'] + ' ' + contact['lastName']
        otpPattern = re.compile('[0-9]{6}')
        for msg in messages:
            otp = otpPattern.findall(msg.body)
            if (len(otp)>0):
                msgObj = {}
                msgObj['to'] = msg.to
                msgObj['name'] = contacts[msg.to]
                msgObj['date'] = msg.date_sent.strftime('%m/%d/%Y')
                msgObj['time'] = msg.date_sent.strftime('%H:%M:%S')
                msgObj['otp'] = otp[0]
                listOfMsg.append(msgObj)
    except:
        listOfMsg = []
    finally:
        return json.dumps(listOfMsg)

def getContactsJSON(): 
    with open('data.json') as f:
        data = json.load(f)
    return data
