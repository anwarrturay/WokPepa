import React, {useState} from 'react'
import SubmitReport from './SubmitReport';
const ChannelReports = () => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <main className={`${isHidden === false ? "hidden" : "flex flex-col"} m-3 bg-gray-100 rounded-lg`}>
        <h2 className="text-lg font-semibold mb-2 text-center">Channel Reports</h2>
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Overview</h3>
          <p className="text-sm text-gray-700">
            Here you can track and manage reports related to UltraResume. This includes issue tracking,
            user feedback, and system performance insights.
          </p>
        </div>
        
        {/* Report Categories */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Report Categories</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>📌 <strong>Bug Reports:</strong> Users can report technical issues for resolution.</li>
            <li>📌 <strong>User Feedback:</strong> Review suggestions and improvement requests.</li>
            <li>📌 <strong>System Performance:</strong> Monitor uptime and server status.</li>
            <li>📌 <strong>Feature Requests:</strong> Track requested features from users.</li>
            <li>📌 <strong>Security Issues:</strong> Reports on potential security vulnerabilities.</li>
          </ul>
        </div>
        
        {/* Submit a Report */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Submit a Report</h3>
          <p className="text-sm text-gray-700">
            Encountered an issue? Help us improve UltraResume by submitting a report.
          </p>
          <button onClick={()=> setIsHidden(false)} className="mt-3 bg-[#2A5D9E] text-white py-2 px-4 rounded-md text-sm">Submit a Report</button>
        </div>

      </main>
      {/* Submit report form */}
      <div className={`${isHidden === true ? "hidden" : "flex flex-col"}`}>
        <SubmitReport />
      </div>
    </>
  )
}

export default ChannelReports