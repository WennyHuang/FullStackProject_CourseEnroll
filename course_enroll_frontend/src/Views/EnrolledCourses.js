import React from "react";
import { useRouteMatch } from "react-router";
import CourseTable from "../Components/CourseTable";
import { CourseService } from '../service/courseService';
import cookie from 'react-cookies';
import {JWT_TOKEN_COOKIE} from '../constants';
import CourseActionAlert from "../Components/alert/CourseActionAlert";

class EnrolledCourses extends React.Component{
    //default course state
    state = {
        courses: [],
        alertOpen: false,
        alertMessage: '',
        color: 'info',
    };
    withdrawCourse = (courseName) => {
        //use this.withdrawCourse in class based function
        // call delete course API {xhr}
        // 1. successful -- alert success
        // 2. failed -- alert failure
        const token = cookie.load(JWT_TOKEN_COOKIE)
        CourseService.deleteCourse(token, courseName)
        .then(()=>{
            //1st option: filter (more efficient); 2nd option: call the database again
            const updatedEnrolledCourses = this.state.courses.filter((course)=>{
                return course.course_name !== courseName;
            }); // filter out course_name equals to courseName; keep the other courses. 
            this.setState({
                courses: updatedEnrolledCourses, 
                alertOpen: true,
                alertMessage: `Successfully deleted course <${courseName}>`,
                alertColor: 'success',
            }); //alert(`Successfully deleted course <${courseName}>`)
        })
        .catch((error)=>{
            this.setState({
                alertOpen: true,
                alertMessage: `Failed deleted course <${courseName}> - ${error.response.data.detail}`,
                alertColor: 'error',
            }); //alert(`Failed deleted course <${courseName}> - ${error.response.data.detail}`);
        })
    }; 

    closeAlert = () => {
        this.setState({
            alertOpen: false,
        });
    }

    render() {
        return (
        <div>
            <CourseTable courses ={this.state.courses} actionLabel = "Withdraw" onActionButtonClick = {this.withdrawCourse}/>
            <CourseActionAlert
            alertOpen = {this.state.alertOpen}
            closeAlert = {this.closeAlert}
            alertMessage = {this.state.alertMessage}
            color = {this.state.alertColor}
            />
            </div>
        );
    }
    componentDidMount(){
        // xhr request call -  call backend API to get data,
        // setState to trigger re-render
        const token = cookie.load(JWT_TOKEN_COOKIE)

        CourseService.getEnrolledCourse(token)
            //return a promise -- 异步call 不能直接返回值，而返回promise
            .then((responses) => {
                this.setState({
                    courses: responses.data,
                });
            })
            .catch(error=>console.log(error))
    }
}

// functional based componets
//function EnrolledCourses() {
    //return (
     //<div>
        //<h2>Enrolled Courses</h2>
      //</div>
   // );
 // }

export default EnrolledCourses;