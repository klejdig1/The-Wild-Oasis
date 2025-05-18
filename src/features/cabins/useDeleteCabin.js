import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";


export function useDeleteCabin(){

const queryClient=useQueryClient()

const {isLoading,mutate:deleteCabin}=useMutation({
    mutationFn: deleteCabinApi,
    onSuccess:()=>{
        toast.success('Cabin successfully deleted')
        queryClient.invalidateQueries({
            queryKey:['cabins'],
        })
    },
    onError: error => toast.error(error.message)
})

    return{isLoading,deleteCabin}
}