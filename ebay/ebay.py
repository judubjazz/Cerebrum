from ebaysdk import finding
from ebaysdk.finding import Connection as finding
import send_email
import threading


def hello_world():
    threading.Timer(10.0, hello_world).start() # called every minute
    print("Hello, World!")


def search_ebay(data):

    email = data['email']
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

    # a_thread = threading.Timer(60.0, search_ebay).start()  # called every minute

    api = finding(siteid='EBAY-US', appid='juliengu-carte-PRD-fec73a437-365ab89a')

    api.execute('findItemsAdvanced', json_request)

    dictstr = api.response.dict()

    print dictstr['ack']
    ack = dictstr['ack']

    if ack != 'Failure':
        element_a_envoye = dictstr['searchResult']['item'][1]['title']
        item_url = dictstr['searchResult']['item'][1]['viewItemURL']
        print dictstr['searchResult']['item'][1]
        send_email.send_email(element_a_envoye,item_url, email)
        # a_thread.cancel()

