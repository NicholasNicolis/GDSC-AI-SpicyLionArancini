from django.db import models

# Create your models here.

class Item(models.Model):
    age = models.IntegerField(default=18)
    school = models.TextField(default="")
    studyDescription = models.TextField(default="")
    methodPreferences = models.TextField(default="")
    studyGoal = models.TextField(default="")

    def _str_(self):
        return self.age