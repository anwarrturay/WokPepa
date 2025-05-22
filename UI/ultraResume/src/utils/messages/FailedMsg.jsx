import React, { useState } from 'react';

const Failure = ({ errMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(()=>{
    setIsVisible(false);
  }, 5000);

  return (
    <section className='flex items-center justify-center'>
      {isVisible && (
        <div className="bg-[#eea7a7] flex flex-col items-center justify-center rounded-sm font-Montserrat w-[280px] xs:w-[312px] sm:w-[385px] py-2.5 relative my-2">
          <div className="text-[#fa3a50] font-medium flex">
            {errMsg}.
          </div>
        </div>
      )}
    </section>
  );
};

export default Failure;
