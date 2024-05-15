import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state?.user?.user)
    console.log(user)


    if (user) {
        return children;
    }


    return <Navigate to={'/'} ></Navigate>
};

export default PrivateRoute;