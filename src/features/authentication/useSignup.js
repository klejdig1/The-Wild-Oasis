import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";


export function UseSignup(){

    const {mutate:signup,isLoading}=useMutation({
        mutationFn:signupApi,


        onSuccess:(user)=>{

            toast.success("Account successfully created! Please verify the new account form the user's email address");
        }
    })

    return {signup,isLoading}
}