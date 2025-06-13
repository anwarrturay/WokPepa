import React from 'react';
import { useNavigate } from 'react-router';
import {
  FilePlus,
  Pencil,
  Download,
  Palette,
  BadgeCheck,
  LifeBuoy,
  Mail
} from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How do I create a resume?',
      answer: 'Click on "New Resume", choose a template, and start filling in your details.',
      route: '/create-new-resume',
      icon: <FilePlus size={20} className="text-blue-600" />,
    },
    {
      question: 'Can I edit my resume later?',
      answer: 'Yes, go to "My Resumes" and select the one you want to edit.',
      route: '/my-resumes',
      icon: <Pencil size={20} className="text-green-600" />,
    },
    {
      question: 'How can I download my resume?',
      answer: 'Click on "Download" after finalizing your resume to save it as a PDF.',
      route: '/my-resumes',
      icon: <Download size={20} className="text-indigo-600" />,
    },
    {
      question: 'Can I customize the template design?',
      answer: 'No, WokPepa has limited features for now but shortly some of those features will be added.',
      route: '/templates',
      icon: <Palette size={20} className="text-purple-600" />,
    },
    {
      question: 'Is WokPepa free to use?',
      answer: 'Yes, basic resume building is free, but premium templates require a subscription.',
      route: '/pricing',
      icon: <BadgeCheck size={20} className="text-yellow-600" />,
    },
  ];

  return (
    <section className="m-4 p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-3">Help Center</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Find answers to common questions and get support for using WokPepa.
      </p>

      {/* FAQ Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <LifeBuoy className="text-blue-500" size={18} />
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => navigate(faq.route)}
              className="cursor-pointer p-4 border border-[#ccc] rounded-lg bg-gray-50 hover:bg-gray-100 transition flex items-start gap-3"
            >
              <div className="mt-1">{faq.icon}</div>
              <div>
                <p className="font-medium text-gray-800 mb-1">{faq.question}</p>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-3">Troubleshooting</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
          <li>Ensure your browser is updated.</li>
          <li>Try clearing cache and refreshing the page.</li>
          <li>If errors persist, contact support below.</li>
        </ul>
      </div>

      {/* Contact Support */}
      <div>
        <h3 className="text-md font-medium mb-3">Need More Help?</h3>
        <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
          <Mail size={16} /> 
          Email: <a href="mailto:support@ultraresume.com" className="text-blue-500 underline">info@wokpepa.com</a>
        </p>
      </div>
    </section>
  );
};

export default HelpCenter;
