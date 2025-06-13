import React from 'react';

const TermsConditions = () => {
  return (
    <main className="max-w-3xl mx-auto my-8 p-6 shadow-sm border border-[#ccc]">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Terms and Conditions</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Please read the following terms carefully to understand how WokPepa operates.
        </p>
      </header>

      <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="font-semibold text-base text-gray-800">1. Acceptance of Terms</h2>
          <p>By using WokPepa, you agree to these Terms. If you do not agree, please discontinue using the app.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">2. Use of the App</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>You must be at least 13 years old to use WokPepa.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Unauthorized access, abuse, or misuse of the platform is prohibited.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">3. Account and Data</h2>
          <p>
            We collect personal information such as your name, email, and resume content.
            Please refer to our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for more details.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">4. Content Ownership</h2>
          <p>
            Your created resume content belongs to you. WokPepa templates and design assets remain the property of WokPepa and may not be reused or redistributed.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">5. Prohibited Activities</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Uploading harmful, offensive, or illegal content.</li>
            <li>Reverse-engineering or tampering with the app.</li>
            <li>Reselling or commercializing WokPepa features without consent.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">6. Disclaimer</h2>
          <p>
            WokPepa offers resume-building tools and templates. We do not guarantee job offers or employment success.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to WokPepa for violations of these Terms.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">8. Modifications</h2>
          <p>
            These Terms may be updated from time to time. You will be notified of significant changes through the platform.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-base text-gray-800">10. Contact Us</h2>
          <p>
            📧 Email: <a href="mailto:info@wokpepa.com" className="text-blue-600 hover:underline">info@wokpepa.com</a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
