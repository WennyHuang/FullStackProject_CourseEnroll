import axios from 'axios';

export default axios.create({
    baseURL: 'http://course-enroll-20-ALB-1762183014.us-west-2.elb.amazonaws.com:8000/',
});

// call 要在 component did mount/update 之后；或者 use-effect使用
// api call 不能放在render里; 