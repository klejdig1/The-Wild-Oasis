import {useQuery} from "@tanstack/react-query";
import {getBookingsAfterDate} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";

 function useRecentBookings(){

     const [searchParams]=useSearchParams();

     const numDays=!searchParams.get('last') ?  7 : Number(searchParams.get('last'));
     const queryDate= subDays(new Date(),numDays).toISOString();




    const {data:bookings,isLoading}=useQuery({
        queryFn:()=>getBookingsAfterDate(queryDate),
        queryKey:['bookings',`last-${numDays}`],
    })


     return{bookings: bookings ?? [],isLoading}

}


export default useRecentBookings;