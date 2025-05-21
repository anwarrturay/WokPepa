import React, {useState} from 'react'
import { Send, X } from 'lucide-react'
const VerificationLinkMsg = () => {
    const [isVisible, setIsVisible] = useState(true);

  return (
        <section className='flex items-center justify-center'>
            {isVisible && (
                <div className="flex items-center justify-center bg-[#00ff9570] rounded-sm w-[300px] xs:w-[312px] sm:w-[385px] mb-2">
                    <Send className='m-2 text-green-800' size={28}/>
                    <div className="text-sm text-green-800 font-medium">
                        We've sent a verification link to your email.
                    </div>
                    <X onClick={()=> setIsVisible(false)} className='m-2 text-green-800 cursor-pointer' size={28} strokeWidth={3}/>
                </div>
            )}
        </section>
  )
}

export default VerificationLinkMsg