import React, { useEffect, useState } from 'react';
import Failure from '../../../utils/Failure';
import Success from '../../../utils/Success';
import { v4 as uuidv4 } from 'uuid';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateSchema } from '../../../utils/schemas/UpdateDetailsSchema';

const MyDetails = () => {
    const [success, setSuccess] = useState(false);
    const { setIsLoading } = useAuth();
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const userId = auth?.userId;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(updateSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            telephone: "",
            profession: "",
        },
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            setIsLoading(true);
            try {
                const res = await axiosPrivate.get(`/users/${userId}`);
                if (res.data) {
                    if (res.data.firstname !== watch("firstname")) {
                        setValue("firstname", res.data.firstname || "");
                    }
                    if (res.data.lastname !== watch("lastname")) {
                        setValue("lastname", res.data.lastname || "");
                    }
                    if (res.data.telephone !== watch("telephone")) {
                        setValue("telephone", res.data.telephone || "");
                    }
                    if (res.data.profession !== watch("profession")) {
                        setValue("profession", res.data.profession || "");
                    }    
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (userId) fetchUser();
    }, [userId, setValue, axiosPrivate, watch]);


    const handleUpdateProfile = async (data) => {
        console.log("changes: ", data);

        const formData = new FormData();
        formData.append("firstname", data.firstname)
        formData.append("lastname", data.lastname)
        formData.append("profession", data.profession)
        formData.append("telephone", data.telephone)

        try {
            const response = await axiosPrivate.patch(
                `/users/profile/${userId}`, 
                formData
            );
            console.log("Response Data: ", response.data)
            if(response.status === 200){
                setSuccess(true);
                alert("changes saved successfully")
            }
        } catch (err) {
            setErrMsg(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateProfile)} className='mt-4'>
                <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
                    {success ? <Success /> : <Failure errMsg={errMsg} />}
                </div>
                {["firstname", "lastname", "profession"].map((field) => (
                    <div className="relative mt-2" key={uuidv4()}>
                        <input
                            type="text"
                            id={`label_${field}`}
                            autoComplete="off"
                            value={watch(field)} 
                            onChange={(e) => setValue(field, e.target.value)}
                            className={`block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full ${errors[field] ? 'border-red-500' : ''}`}
                        />
                        <label
                            htmlFor={`label_${field}`}
                            className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600">
                            {field}
                        </label>
                        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>}
                    </div>
                ))}

                <div className="relative mt-2" key={uuidv4()}>
                    <input 
                        type="number" 
                        id='label_telephone'
                        autoComplete="tel"
                        {...register("telephone", { valueAsNumber: true })} 
                        className={`block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full ${errors.telephone ? 'border-red-500' : ''}`}
                    />
                    <label 
                        htmlFor='label_telephone'
                        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600">
                        telephone
                    </label>
                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>}
                </div>

                <button type="submit" className='submit-btn'>Save changes</button>
            </form>
        </>
    );
};

export default MyDetails;
