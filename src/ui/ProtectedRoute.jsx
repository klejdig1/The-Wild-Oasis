import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";



const FullPage=styled.div`
    height: 100vh;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;

`;

function ProtectedRoute({children}){
    const navigate=useNavigate();


    // 1. Load the authenticated user
    const {isLoading,isAuthenticated}=useUser()



    // 2. If there is no authenticated redirect to the /login page

    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated,navigate,isLoading]);


    // 3. While is happening show a spinner
    if (isLoading) return<FullPage><Spinner/></FullPage>;




    // 4. If there is authenticated direct to the /dashboard page (render app)

   if (isAuthenticated) return children;
}


export default ProtectedRoute;