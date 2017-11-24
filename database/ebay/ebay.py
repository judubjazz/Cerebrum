from ebaysdk import finding
from ebaysdk.finding import Connection as finding
import send_email
from threading import Event, Thread
import time


class RepeatedTimer:

    """Repeat `function` every `interval` seconds."""

    def __init__(self, interval, function, *args, **kwargs):
        self.interval = interval
        self.function = function
        self.args = args
        self.kwargs = kwargs
        self.start = time.time()
        self.event = Event()
        self.thread = Thread(target=self._target)
        self.thread.start()

    def _target(self):
        while not self.event.wait(self._time):
            self.function(*self.args, **self.kwargs)

    @property
    def _time(self):
        return self.interval - ((time.time() - self.start) % self.interval)

    def stop(self):
        self.event.set()
        self.thread.join()


def search_ebay(data):

    print data
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

    # called every minute
    timer = RepeatedTimer(30.0, search_ebay, data)

    api = finding(siteid='EBAY-US', appid='juliengu-carte-PRD-fec73a437-365ab89a')

    api.execute('findItemsAdvanced', json_request)

    response = api.response.dict()

    print response
    print response['ack']

    ack = response['ack']

    if ack == 'Success':

        if response['searchResult']['_count'] != '0':

            timer.stop()
            element_a_envoye = response['searchResult']['item'][1]['title']
            item_url = response['searchResult']['item'][1]['viewItemURL']
            print response['searchResult']['item'][1]
            send_email.send_email(element_a_envoye,item_url, email)


