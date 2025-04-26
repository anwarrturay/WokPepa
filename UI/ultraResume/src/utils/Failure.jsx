import React, { useState } from 'react';

const Failure = ({ errMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(()=>{
    setIsVisible(false);
  }, 3000);

  return (
    <>
      {isVisible && (
        <div className="bg-[#eea7a7] flex-col items-center justify-center rounded-sm font-Montserrat w-[280px] xs:w-[312px] sm:w-[385px] py-2.5 relative flex">
          <div className="text-[#fa3a50] font-bold flex">
            {errMsg}.
          </div>
        </div>
      )}
    </>
  );
};

export default Failure;
