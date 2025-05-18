import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/apiAuth.js";


export function useUpdateUser(){

    const queryClient=useQueryClient();

    const {mutate:updateUser,isLoading}=useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:(user)=>{
            toast.success('User account successfully updated');
            queryClient.setQueryDefaults(['user'],user);

            queryClient.invalidateQueries({
                queryKey:['user']})

        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })


    return{updateUser,isLoading}
};