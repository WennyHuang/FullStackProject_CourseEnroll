from django.shortcuts import render
from rest_framework import serializers, viewsets, status
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from courses.models import Course
from django.contrib.auth import authenticate
from courses.serializers import CourseSerializer
#from getpass import getpass
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException


# Create your views here.
class UserCourseViewSet(viewsets.ViewSet):
    # in order to use request.user
    permissions_classes = (IsAuthenticated, ) 
    # display selected courses
    # 1.http method (CRUD): GET
    # 2.URL: user/courses/
    # 3.userinput
    # 4.response data/response code
    @action(methods=['GET'], detail=False)
    def courses(self, request):
        user = request.user
        courses = user.courses
        serializer = CourseSerializer(courses, many = True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    # add one courses into enrolled courses
    # 1.http method (CRUD): create: POST; many to many relation database
    # 2.URL: user/course/ -> add one course
    # 3.userinput: course name where? in url -> regex101
    # 4.response data/response code

    # delete one courses into enrolled courses
    # 1.http method (CRUD): delete: DELETE; many to many relation database
    # 2.URL: user/course/ -> delete one course
    # 3.userinput: course name where? in url -> regex101
    # 4.response data/response code
    @action(methods=['POST', 'DELETE'], detail=False, url_path='course/(?P<course_name>[\w\s]+)')
    def course(self, request, **kwargs): #**kwargs similar to JS ...
        course_name = kwargs['course_name']
        if request.method == 'POST':
            #connect db to enroll a course
            course = Course.objects.filter(
                course_name = course_name
            ).first()
            if course is None:
                raise APIException('Course not existed!')
            user = request.user
            if user in course.users.all():
                raise APIException('Course already enrolled')
            course.users.add(user)

            return Response({},status.HTTP_204_NO_CONTENT)
        if request.method == 'DELETE':
             #connect db to dete a course
            course = Course.objects.filter(
                course_name = course_name
            ).first()
            if course is None:
                raise APIException('Course not existed!')
            user = request.user

            if user not in course.users.all():
                raise APIException('Course not enrolled')
            course.users.remove(user)

            return Response('Deleted course %s'%course_name, status.HTTP_204_NO_CONTENT)
        raise Exception("Method Not Allowed")

class CoursesViewSet(viewsets.ViewSet):
    # display all courses
    # 1.http method (CRUD): GET
    # 2.URL: courses/
    # 3.userinput: no input
    # 4.response data/response code
    @action(methods=['GET'], detail=False) # use function name as url
    def courses(self, request):
        # TODO: read all courses from db
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many = True)
        return Response(serializer.data, status.HTTP_200_OK)

class UserInfoViewSet(viewsets.ViewSet):
    # update users info; one student one phone number
    # 1.http method (CRUD): PUT: one to one relation
    # 2.URL: user/phone_number
    # 3.userinput: phone number
    # a) http method support which data transfer method?-> request body or urls.py
    # b) personal info or public info? -> request body
    # 4.response data/response code: phone number/204
    # PUT http://127.0.0.1:8000/user/phone_number/
    @action(methods=['PUT'], detail=False) # use function name as url
    def phone_number(self, request):
        # read request body -> only use request.POST.get('')
        phone_number = request.POST.get('phone_number')
        # TODO: update user phone number field in db
        return Response('Updated phone number %s'%phone_number, status.HTTP_204_NO_CONTENT)

    



