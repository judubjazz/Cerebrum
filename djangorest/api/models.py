from django.db import models

class Bucketlist(models.Model):
    """This class represents the bucketlist model."""
    name = models.CharField(max_length=255, blank=False, unique=True)
    keywords = models.TextField()
    condition = models.TextField()
    sort_order = models.TextField()
    min_price = models.TextField()
    max_price = models.TextField()
    currency = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.name)
