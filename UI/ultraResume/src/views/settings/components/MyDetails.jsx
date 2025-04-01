import React, { useEffect, useState} from 'react'
import Failure from "../../../utils/Failure";
import Success from '../../../utils/Success';
import { v4 as uuidv4 } from 'uuid';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../../../utils/UpdateDetailsSchema';

const MyDetails = () => {
    const [success, setSuccess] = useState(false);
     const { setIsLoading } = useAuth();
    const [errMsg, setErrMsg] = useState("");
    const imageURL = "http://localhost:3500";

    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();
    const userId = auth?.userId;

    // User details
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstname: "",
            lastname: "",
            telephone: "",
            profession: "",
            image: null,
        },
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            setIsLoading(true);
            try {
                const res = await axiosPrivate.get(`/users/${userId}`);
                Object.keys(res.data).forEach(key => setValue(key, res.data[key] || ""));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }finally{
                setIsLoading(false); 
            }
        };
        if (userId) fetchUser();
    }, [userId, setValue, axiosPrivate]);


    const handleUpdateProfile = async (data) => {
        console.log("Submitting form: ", data);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== "image" || value) {
                formData.append(key, value);
            }
        });

        console.log("form data: ", formData)

        try {
            const response = await axiosPrivate.patch(`/users/profile/${userId}`, 
                formData, 
                {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log("Updated data: ", response.data);
            setSuccess(true);
        } catch (err) {
            console.error("Update failed:", err);
            setErrMsg(err.response?.data?.message || "An error occurred");
        }
    };
    const test = () => {
        console.log(test);
    }

  return (
        <>
            <form onSubmit={handleSubmit(test)} className='mt-4'
            >
                {/* Image section */}
                <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
                    {success ? <Success /> : <Failure errMsg={errMsg} />}
                </div>
                <div className='flex flex-col xl:flex-row items-center space-x-4 mb-7'>
                    <img 
                    src={watch("image") instanceof File ? URL.createObjectURL(watch("image")) : `${imageURL}${watch("image")}`} 
                        alt="Profile" 
                        className='w-24 h-24 rounded-full border object-cover'
                    />
                    <div className="flex flex-col">
                        <div className="text-2xl font-medium m-2 text-center">{watch("firstname")} {watch("lastname")}</div>
                        <label className='py-2.5 bg-[#2A5D9E] text-white rounded cursor-pointer text-center w-[280px] xl:w-[220px]'>
                            Change Image
                            <input 
                                type="file" 
                                accept="image/*" 
                                className='hidden' 
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>
                {['firstname', 'lastname', 'telephone', 'profession'].map((field) => (
                    <div className="relative mt-2" key={uuidv4()}>
                        <input type="text" {...register(field)} className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full"/>
                        <label className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
        
                    </div>
                ))}
                <button type="submit" className='submit-btn'>Save changes</button>
            </form>
        </>
  )
}

export default MyDetails