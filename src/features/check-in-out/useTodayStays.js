import {useQuery} from "@tanstack/react-query";
import {getStaysTodayActivity} from "../../services/apiBookings.js";


export function useTodayStays(){

    const {data:todayStay,isLoading}=useQuery({
        queryFn:getStaysTodayActivity,
        queryKey:['today-activity']
    })



    return{todayStay,isLoading}
}
