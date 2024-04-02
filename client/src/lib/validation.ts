import {z} from 'zod'

export const RoomSchema = z.object({
    username: z.string().min(8,{
        message: "Username can't be more than 8 characters"
    }).max(8,{
        message: "Username can't be more than 8 characters"
    }).trim(),
    roomId: z.string().min(6,{
                message: "Please Enter Valid RoomID"
            }).max(6,{
                message: "RoomID can't be more than 6 characters"
            }).refine((data)=>{
                console.log('dataaa',data);
                return data.trim();
            })
})

