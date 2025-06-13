import { useEffect, useState } from 'react';
import UpdatedMsg from '../../../utils/messages/UpdatedMsg';
import FailedMsg from '../../../utils/messages/FailedMsg';
import { LoaderCircle } from 'lucide-react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateSchema } from '../../../utils/schemas/UpdateDetailsSchema';

const MyDetails = () => {
  const [success, setSuccess] = useState(false);
  const { setIsLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      telephone: '',
      profession: '',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const res = await axiosPrivate.get(`/users/${userId}`);
        const { firstname, lastname, telephone, profession } = res.data || {};
        setValue('firstname', firstname || '');
        setValue('lastname', lastname || '');
        setValue('telephone', telephone || '');
        setValue('profession', profession || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, setIsLoading, setValue, axiosPrivate]);

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('profession', data.profession);
    formData.append('telephone', data.telephone);

    try {
      const response = await axiosPrivate.patch(`/users/profile/${userId}`, formData);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full';

  const labelClasses =
    'absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600';

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)} className="mt-4">
      {success ? <UpdatedMsg /> : errMsg && <FailedMsg errMsg={errMsg} setErrMsg={setErrMsg} />}

      {['firstname', 'lastname', 'profession'].map((field) => (
        <div className="relative mt-2" key={field}>
          <input
            type="text"
            placeholder=" "
            id={`label_${field}`}
            autoComplete="off"
            {...register(field)}
            className={`${inputClasses} ${errors[field] ? 'border-red-500' : ''}`}
          />
          <label htmlFor={`label_${field}`} className={labelClasses}>
            {field}
          </label>
          {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>}
        </div>
      ))}

      <div className="relative mt-2">
        <input
          type="tel"
          placeholder=" "
          id="label_telephone"
          autoComplete="tel"
          {...register('telephone')}
          className={`${inputClasses} ${errors.telephone ? 'border-red-500' : ''}`}
        />
        <label htmlFor="label_telephone" className={labelClasses}>
          telephone
        </label>
        {errors.telephone && (
          <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>
        )}
      </div>

      <button type="submit" className="submit-btn mt-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          'Save changes'
        )}
      </button>
    </form>
  );
};

export default MyDetails;
