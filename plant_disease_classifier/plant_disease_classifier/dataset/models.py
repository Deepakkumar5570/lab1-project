from django.db import models

# Create your models here.
# dataset/models.py

from django.db import models

class PlantLeaf(models.Model):
    image = models.ImageField(upload_to='plant_leaves/')
    file_number = models.IntegerField(default=1)
    
    def __str__(self):
        return f"Plant Leaf - File {self.file_number}"
