import React from 'react'

const Summary = ({ formData, handleChange, setStep}) => {
  return (
    <section className="flex flex-col items-center justify-center mt-5">
    <h1 className="text-lg font-bold ml-2">Summary</h1>
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center">
        <textarea
            type="text"
            placeholder="summary"
            value={formData.summary}
            onChange={(e) =>
                handleChange("summary", e.target.value)
            }
            className="resume-field h-24" 
        ></textarea>

        <div className="flex ">
            <button
                type="button"
                className="back-btn"
                onClick={() => setStep(1)}
            >
            Back
            </button>
            <button
                type="button"
                className="m-2 next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
                onClick={() => setStep(3)}
            >
            Next
            </button>
        </div>
    </form>
    </section>
  )
}

export default Summary;