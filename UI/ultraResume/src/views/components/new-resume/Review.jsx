import React from 'react'

const Review = ({handleSubmit, setStep}) => {
  return (
    <section className="flex flex-col items-center justify-center mt-5">
		<h1 className="text-lg font-bold ml-2">Review & Submit</h1>
		<p className="text-sm text-gray-600 ml-2 text-center">
			Please review your details before submitting.
		</p>
		<div className="flex flex-col">
			<button
				type="button"
				className="back-btn"
				onClick={() => setStep(4)}
			>
				Back
			</button>
			<button
				type="button"
				className="submit-btn"
				onClick={handleSubmit}
			>
				Create Resume
			</button>
		</div>
	</section>
  )
}

export default Review