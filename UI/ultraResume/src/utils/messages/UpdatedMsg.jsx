import {useState} from 'react'
import { Check, X } from 'lucide-react'
const UpdatedMsg = () => {
    const [isVisible, setIsVisible] = useState(true);

  return (
        <section>
            {isVisible && (
                <div className="flex items-center justify-between bg-[#00ff9570] rounded-sm w-[300px] xs:w-[312px] sm:w-[385px] mb-3">
                    <Check className='m-2 text-green-800' size={28}/>
                    <div className="text-sm text-green-800 font-medium">
                        changes Saved Successfully
                    </div>
                    <X onClick={()=> setIsVisible(false)} className='m-2 text-green-800 cursor-pointer' size={28} strokeWidth={3}/>
                </div>
            )}
        </section>
  )
}

export default UpdatedMsg