import React from 'react';

const TermsConditions = () => {
  return (
    <main className="m-3 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Terms and Conditions</h2>
        <p className="text-sm text-gray-600 mb-4">
          Read our terms and conditions to understand how UltraResume operates.
        </p>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold">1. Acceptance of Terms</h3>
          <p>By using UltraResume, you agree to comply with and be bound by these Terms. If you do not agree, please do not use the app.</p>
        </div>

        <div>
          <h3 className="font-semibold">2. Use of the App</h3>
          <ul className="list-disc ml-6">
            <li>You must be at least 13 years old to use UltraResume.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>You agree not to misuse the platform or attempt unauthorized access.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">3. Account and Data</h3>
          <p>We collect basic information such as your name, email, and resume details. For more details on data handling, please refer to our Privacy Policy.</p>
        </div>

        <div>
          <h3 className="font-semibold">4. Content Ownership</h3>
          <p>All resume content created by you belongs to you. Templates, designs, and features on UltraResume are the property of UltraResume and cannot be reused or redistributed without permission.</p>
        </div>

        <div>
          <h3 className="font-semibold">5. Prohibited Activities</h3>
          <ul className="list-disc ml-6">
            <li>Upload harmful or illegal content.</li>
            <li>Attempt to reverse-engineer the app.</li>
            <li>Distribute or commercialize any part of UltraResume without our consent.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">6. Subscription and Payments</h3>
          <p>Some features may require payment or a subscription. Payments are securely processed through third-party providers. No refunds will be issued after a resume is downloaded.</p>
        </div>

        <div>
          <h3 className="font-semibold">7. Disclaimer</h3>
          <p>UltraResume provides tools and templates to help users create resumes. We do not guarantee job placement or employment outcomes.</p>
        </div>

        <div>
          <h3 className="font-semibold">8. Termination</h3>
          <p>We may suspend or terminate your access if you violate these Terms.</p>
        </div>

        <div>
          <h3 className="font-semibold">9. Modifications</h3>
          <p>We reserve the right to change these Terms at any time. We will notify you of any significant updates.</p>
        </div>

        <div>
          <h3 className="font-semibold">10. Contact Us</h3>
          <p>📧 Email: <a href="mailto:support@ultraresume.com" className="text-blue-500">support@ultraresume.com</a></p>
        </div>
      </div>
    </main>
  )
}

export default TermsConditions