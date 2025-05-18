import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking(){
    const queryClient=useQueryClient();

    const {mutate:deleteBookingItem,isLoading:isDeleting}=useMutation({
        mutationFn:deleteBooking,
        onSuccess:()=>{
            toast.success('Booking deleted successfully');
            queryClient.invalidateQueries({
                queryKey:['bookings'],
            })
        },
        onError:()=>{
            toast.error('There was a problem in deleting please try later')
        }
    });

    return{deleteBookingItem,isDeleting}
}
