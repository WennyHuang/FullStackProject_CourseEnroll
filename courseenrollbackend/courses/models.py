from django.db import models
from django.contrib.auth.models import User


class Course(models.Model):
    course_name = models.CharField(
        max_length=100,
        unique=True,
        null=False,
        blank=False,
    )
    course_location = models.CharField(
        max_length=30,
        null=False,
        blank=False,
    )
    course_content = models.CharField(
        max_length=200,
        null=False,
        blank=False,
    )
    teacher_id = models.IntegerField(
        null=False,
        blank=False,
    )
    users = models.ManyToManyField(
        User, 
        related_name='courses',
    )
