from django.db import models

# Create your models here.

class Item(models.Model):
    age = models.IntegerField()
    school = models.TextField()
    studyDescription = models.TextField()
    methodPreferences = models.TextField()
    studyGoal = models.TextField()

    def _str_(self):
        return self.age