import { format } from "date-fns";
export const FormatDate = (date:string):string=>{
    if(!date){
        throw new Error("Provide a date");
    }
    const newDate = new Date(date);
    return format(newDate, "hh:mm a")
}