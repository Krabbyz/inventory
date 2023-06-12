from django.db import models

# Create your models here.
class GCItem(models.Model):
    key = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    amount_per_box = models.IntegerField()
    amount = models.IntegerField()
    sku = models.CharField(max_length=200)
    image_url = models.CharField(max_length=200)