from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=255)
    amountPerBox = models.IntegerField()
    amount = models.IntegerField()
    sku = models.CharField(max_length=255)
    imageUrl = models.URLField()

    def __str__(self):
        return self.name