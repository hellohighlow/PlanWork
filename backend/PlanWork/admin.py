from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'location')

# Register your models here.

admin.site.register(Event, EventAdmin)
