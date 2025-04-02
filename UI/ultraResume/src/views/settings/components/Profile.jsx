import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { imageSchema } from '../../../utils/schemas/imageSchema';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const Profile = () => {
  const { setIsLoading } = useAuth();
  const imageURL = "http://localhost:3500";
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;

  const [previewImage, setPreviewImage] = useState(null);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(imageSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      image: ""
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await axiosPrivate.get(`/users/${userId}`);
        if (res.data) {
          if (res.data.firstname !== watch("firstname")) {
            setValue("firstname", res.data.firstname || "");
          }
          if (res.data.lastname !== watch("lastname")) {
            setValue("lastname", res.data.lastname || "");
          }
          if (res.data.image !== watch("image")) {
            setValue("image", res.data.image || "");
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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosPrivate.patch(`/users/profile/${userId}`, formData);
      if (response.status === 200) {
        alert("Image changed successfully");
        setValue("image", response.data.image);
        setPreviewImage(`${imageURL}${response.data.image}`);
      }
    } catch (err) {
      console.error("Error updating image:", err);
    }
  };

  return (
    <div className='flex flex-col xl:flex-row items-center space-x-4 mb-7'>
      <img 
        src={previewImage || (watch("image") instanceof File ? URL.createObjectURL(watch("image")) : `${imageURL}${watch("image")}`)} 
        alt="Profile" 
        className="w-24 h-24 rounded-full border object-cover"
      />
      <div className="flex flex-col">
        <div className="text-2xl font-medium m-2 text-center">
          {watch("firstname")} {watch("lastname")}
        </div>
        <label className='py-2.5 bg-[#2A5D9E] text-white rounded cursor-pointer text-center w-[280px] xl:w-[220px]'>
          Change Profile
          <input 
            type="file" 
            accept="image/*" 
            className='hidden' 
            {...register("image")}
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Profile;
