import React, { useState, useEffect} from "react";
import CourseTable from "../Components/CourseTable";
import { CourseService} from '../service/courseService';
import cookie from 'react-cookies'; 
import {JWT_TOKEN_COOKIE} from '../constants'
import CourseActionAlert from "../Components/alert/CourseActionAlert";

function AllCourse() {
    //声明state
    const [course, setCourses] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('info'); 


    const enrollCourse =(courseName) => {
      //call user/course/{course_name} api (xhr)
      //1.SUCCESSFUL - ALERT SUCCESSFUL
      //2.FAILED - ALERT FAILURE
      const token = cookie.load(JWT_TOKEN_COOKIE);
      CourseService.enrollCourse(token, courseName)
      .then(()=>{
        setAlertOpen(true);
        setAlertColor('success'); 
        setAlertMessage(`Successfully Enrolled Course <${courseName}>`);
        //alert(`Successfully Enrolled Course <${courseName}>`);
      }) // response is empty
      .catch((error) => {
        setAlertOpen(true);
        setAlertColor('error'); 
        setAlertMessage(`Failed to Enrolled Course <${courseName}> - ${error.response.data.detail}`);
        //alert(`Failed to Enrolled Course <${courseName}> - ${error.response.data.detail}`);
      })
    };
    const closeAlert = () => {
      setAlertOpen(false);
    }

    useEffect(()=>{
        CourseService.getAllCourse() // return promise
            .then((response)=>{
                setCourses(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
      <div>
        <CourseTable courses={course} actionLabel="Enroll" onActionButtonClick={enrollCourse}/>
        <CourseActionAlert 
          alertOpen = {alertOpen}
          closeAlert = {closeAlert}
          alertMessage = {alertMessage}
          color = {alertColor}
        />     
      </div>
    );
  }

export default AllCourse;