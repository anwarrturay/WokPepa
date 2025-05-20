const Summary = ({ formData, handleChange, setStep }) => {
  return (
    <section className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-lg font-bold ml-2">Summary</h1>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center">
          <textarea
            id="summary_text"
            placeholder="Enter a short professional summary"
            value={formData.summary || ""}
            onChange={(e) => handleChange("summary", null, e.target.value)}
            className="resume-field h-24 w-[300px] sm:w-[400px] md:w-[500px]"
          ></textarea>
        </div>

        <div className="flex flex-col justify-between mt-4 w-full max-w-[500px] px-4">
          <button
            type="button"
            className="back-btn bg-gray-300 text-black px-4 py-2 rounded-md"
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            type="button"
            className="next-btn bg-[#2A5D9E] text-white px-4 py-2 rounded-md"
            onClick={() => setStep(3)}
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default Summary;
