import React, {useState} from 'react'
import { Send, X } from 'lucide-react'
const updateMsg = () => {
    const [isVisible, setIsVisible] = useState(true);

  return (
        <section>
            {isVisible && (
                <div className="flex items-center bg-[#00ff9570] rounded-sm w-[300px] xs:w-[312px] sm:w-[360px] mb-2">
                    <Send className='m-2 text-green-800' size={28}/>
                    <div className="text-sm text-green-800 font-medium">
                        changes Saved Successfully
                    </div>
                    <X onClick={()=> setIsVisible(false)} className='m-2 text-green-800 cursor-pointer' size={28} strokeWidth={3}/>
                </div>
            )}
        </section>
  )
}

export default updateMsg