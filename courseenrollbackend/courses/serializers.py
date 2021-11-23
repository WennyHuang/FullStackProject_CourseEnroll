from rest_framework import serializers
from courses.models import Course

# class CourseSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only = True)
#     course_name = serializers.CharField(required = True, allow_blank=False, max_length = 100)
#     course_location = serializers.CharField(required = True, allow_blank=False, max_length = 30)
#     course_content= serializers.CharField(required = True, allow_blank=False, max_length = 200)
#     teacher_id = serializers.IntegerField(required = True, allow_blank=False)

#     def create(self, validated_data):
#         """
#         Create and return a new Course instance, given a validated_data dict
#         """
#         return Course.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         """
#         Update and return a new Course instance, give a Course object
#         adnd a validated_data dict
#         """
#         instance.course_name = validated_data.get('course_name', instance.course_name)
#         instance.course_location = validated_data.get('course_location', instance.course_location)
#         instance.course_constent = validated_data.get('course_constent', instance.course_constent)
#         instance.teacher_id = validated_data.get('teacher_id', instance.teacher_id)
#         instance.save()
#         return instance

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_name', 'course_location', 'course_content', 'teacher_id'] #中括号