from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=120)
    date = models.DateField(blank=True)
    time = models.TimeField(blank=True)
    location = models.CharField(max_length=120)

    def _str_(self):
        return self.title
