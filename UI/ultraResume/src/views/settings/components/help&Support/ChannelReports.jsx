import React, { useState } from 'react';
import SubmitReport from './SubmitReport';

const ChannelReports = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="m-4 p-6 shadow-sm border border-[#ccb] max-w-3xl mx-auto">
      {!showForm ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-4">Channel Reports</h2>

          {/* Overview Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Overview</h3>
            <p className="text-sm text-gray-600">
              Track and manage reports related to UltraResume. This includes bug tracking, user suggestions, performance monitoring, and more.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Report Categories</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-inside list-disc ml-3">
              <li><strong>Bug Reports:</strong> Users can report technical issues.</li>
              <li><strong>User Feedback:</strong> Suggestions and improvements.</li>
              <li><strong>System Performance:</strong> Monitor uptime and metrics.</li>
              <li><strong>Feature Requests:</strong> Ideas for new features.</li>
              <li><strong>Security Issues:</strong> Vulnerability reporting.</li>
            </ul>
          </div>

          {/* CTA to Submit */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Submit a Report</h3>
            <p className="text-sm text-gray-600">
              Found something that needs attention? Help us improve by submitting a report.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-[#2A5D9E] hover:bg-[#2a5c9ecf] text-white px-4 py-2 rounded-md text-sm transition cursor-pointer"
            >
              Submit a Report
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <button
            onClick={() => setShowForm(false)}
            className="self-start text-blue-600 hover:underline text-sm mb-4"
          >
            ← Back to Channel Reports
          </button>
          <SubmitReport />
        </div>
      )}
    </section>
  );
};

export default ChannelReports;
