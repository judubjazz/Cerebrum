import ebaysdk
from ebaysdk import finding
from ebaysdk.finding import Connection as finding
from ebaysdk.trading import Connection as trading
import json
import urllib2
import send_email
import threading
from django.contrib.auth.models import User


def hello_world():
    threading.Timer(10.0, hello_world).start() # called every minute
    print("Hello, World!")


def search_ebay():
    data = json.load(urllib2.urlopen('https://xoxoxo.localtunnel.me/bucketlists/2.json'))

    try:
        user = User.objects.get(username=data.get('username'))
    except User.DoesNotExist:
        user = User()




    keywords = data['keywords']
    min_price = data['min_price']
    max_price = data['max_price']
    currency = data['currency']
    sort_order = data['sort_order']
    condition = data['condition']

    json_request = {
        'keywords': keywords,
        'itemFilter': [
            {'name': 'Condition', 'value': condition},
            {'name': 'MinPrice', 'value': min_price, 'paramName': 'Currency', 'paramValue': currency},
            {'name': 'MaxPrice', 'value': max_price, 'paramName': 'Currency', 'paramValue': currency}
        ],
        'sortOrder': sort_order
    }

    json_request2 = {
        'keywords': 'hockey card'
    }

    # a_thread = threading.Timer(60.0, search_ebay).start()  # called every minute
    api = finding(siteid='EBAY-US', appid='juliengu-carte-PRD-fec73a437-365ab89a')

    api.execute('findItemsAdvanced', json_request)

    dictstr = api.response.dict()

    # test = trading(siteid='0', appid='juliengu-carte-PRD-fec73a437-365ab89a')
    # test3 = test.execute('GetCategories', {'CategorySiteID':'0'})
    # test2 = 1
    #
    # import urllib, json
    # url = "https://urlkxbawcm.localtunnel.me/bucketlists/8.json"
    # response = urllib.urlopen(url)
    # data = json.loads(response.read())
    # print data

    for item in dictstr['searchResult']['item']:
        print "ItemID: %s" % item['itemId']
        print "Title: %s" % item['title']
        print "CurrentPrice: %s" % item['sellingStatus']['currentPrice']['value']
        print "CategoryID: %s" % item['primaryCategory']['categoryId'] + '\n'

    if len (dictstr['searchResult']) > 1:
        element_a_envoye = dictstr['searchResult']['item'][1]['title']
        send_email.send_email(element_a_envoye)
        # a_thread.cancel()

