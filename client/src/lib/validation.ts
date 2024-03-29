import {z} from 'zod'

export const RoomSchema = z.object({
    username: z.string().trim(),
    roomId: z.string().min(1,{
                message: "Please Enter Valid RoomID"
            }).max(6,{
                message: "RoomID can't be more than 6 characters"
            }).refine((data)=>{
                console.log('dataaa',data);
                return data.trim();
            })
})

