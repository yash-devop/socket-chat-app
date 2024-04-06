import {z} from 'zod'

const MAX_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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
            }),
    profileImage: z.any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})

