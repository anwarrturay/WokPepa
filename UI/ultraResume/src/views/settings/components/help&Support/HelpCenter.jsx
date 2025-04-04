import React from 'react'

const HelpCenter = () => {
  return (
    <section className="m-3 p-4 bg-gray-100 rounded-lg flex flex-col">
      <h2 className="text-2xl text-center font-semibold mb-2">Help Center</h2>
      <p className="text-sm text-gray-600 mb-3">
        Find answers to common questions and get support for using UltraResume.
      </p>
      {/* FAQ Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
        <ul className="text-sm text-gray-700 space-y-4">
          <li>
            <strong>Question: </strong> How do I create a resume? <br /> 
            <strong>Answer: </strong> Click on "New Resume", choose a template, and start filling in your details.
          </li>

          <li>
            <strong>Question: </strong> Can I edit my resume later? <br /> 
            <strong>Answer: </strong> Yes, go to "My Resumes" and select the one you want to edit.
          </li>

          <li>
            <strong>Question: </strong> How can I download my resume? <br /> 
            <strong>Answer: </strong> Click on "Download" after finalizing your resume to save it as a PDF.
          </li>

          <li>
            <strong>Question:</strong> Can I customize the template design? <br /> 
            <strong>Answer:</strong> No, UltraResume has limited features for now but shortly some of those features will be added.
          </li>

          <li>
            <strong>Question:</strong> Is UltraResume free to use? <br /> 
            <strong>Answer:</strong> Yes, basic resume building is free, but premium templates require a subscription.
          </li>
        </ul>
      </div>
      
      {/* Troubleshooting Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Troubleshooting</h3>
        <div className="text-sm text-gray-700">
          If you're experiencing issues:
          <ul className="list-disc ml-6">
            <li>Ensure your browser is updated.</li>
            <li>Try clearing cache and refreshing the page.</li>
            <li>If errors persist, contact support below.</li>
          </ul>
        </div>
      </div>
      
      {/* Contact Support */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Need More Help?</h3>
        <p className="text-sm text-gray-700">
          📧 Email: <a href="mailto:anwarrturay03@gmail.com" className="text-blue-500">support@ultraresume.com</a>
        </p>
        <p className="text-sm text-gray-700">
          💬 Live Chat: Available during business hours in the app.
        </p>
      </div>
    </section>
  )
}

export default HelpCenter