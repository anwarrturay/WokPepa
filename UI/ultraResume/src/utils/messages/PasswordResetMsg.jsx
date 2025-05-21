import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const PasswordResetMsg = () => {

  return (
    <section>
        <div className="flex items-center gap-4 bg-[#00ff9570] rounded-sm w-[300px] xs:w-[330px] sm:w-[360px] p-2 mb-2">
            <Check className='m-2 text-green-800' size={28} strokeWidth={3}/>
            <div className="flex text-base text-green-800 font-medium">
                <p className='text-wrap'>
                    Password reset successfully.
                    <Link to={'/'} className='ml-1 text-blue-500 font-medium gap-4 hover:underline'>Login here</Link>
                </p> 
            </div>
        </div>
    </section>
  )
}

export default PasswordResetMsg;