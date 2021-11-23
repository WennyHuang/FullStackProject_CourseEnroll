import axios from '../axios';
// ../返回上一级的folder

export const CourseService = {
    getAllCourse: function(){
        return axios.get('/courses'); //已经在axios/index.js里面定义过baseUrl, 只需要相对路径
    },
    getEnrolledCourse: function(token){
        return axios.get('/user/courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }, 
    enrollCourse: function(token, courseName){
        //POST user/course/<course_name>/ --- use `` to connect the string with coursename
        return axios.post(`user/course/${courseName}/`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    },
    deleteCourse: function(token, courseName){
        //DELETE user/course/<course_name>/
        // delete and get dont have body
        return axios.delete(`user/course/${courseName}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }
}

