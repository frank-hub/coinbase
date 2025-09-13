import React from 'react';
import { ArrowLeft, MessageCircle, Send, Mail } from 'lucide-react';
import { router } from '@inertiajs/react';

interface ContactMethod {
  id: string;
  name: string;
  handle: string;
  availability: string;
  responseTime: string;
  icon: React.ReactNode;
  bgColor: string;
  link: string;
}

export default function HelpSupport() {
  const contactMethods: ContactMethod[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      handle: '+254116278378',
      availability: 'Available: 24/7',
      responseTime: 'Response: Within 5 minutes',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      bgColor: 'bg-green-500',
      link: 'https://wa.me/254116278378'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      handle: '@cryptomine_pro',
      availability: 'Available: 24/7',
      responseTime: 'Response: Within 10 minutes',
      icon: <Send className="w-6 h-6 text-white" />,
      bgColor: 'bg-blue-500',
      link: 'https://t.me/cryptomine_pro'
    },
    {
      id: 'email',
      name: 'Email Support',
      handle: 'support@minershub.pro',
      availability: 'Available: 24/7',
      responseTime: 'Response: Within 2 hours',
      icon: <Mail className="w-6 h-6 text-white" />,
      bgColor: 'bg-gray-500',
      link: 'mailto:support@minershub.pro'
    }
  ];

  const handleBack = () => {
    router.get('/dashboard');
  };

const handleTabClick = (tab: string) => {
  if (tab === 'faq') {
    router.get('/faq');
  } else if (tab === 'submit-ticket') {
    router.get('/submit-ticket'); // This should now work
  }
};

  const handleContactClick = (method: ContactMethod) => {
    window.open(method.link, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-xl font-semibold text-white">Help & Support</h1>

        <div className="w-16"></div> {/* Spacer for center alignment */}
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-800 border-b border-slate-700">
        <button
          onClick={() => handleTabClick('faq')}
          className="flex-1 py-4 px-6 text-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-orange-500"
        >
          <span className="font-medium">FAQ</span>
        </button>

        <button
          className="flex-1 py-4 px-6 text-center text-white bg-orange-500 font-medium"
        >
          Contact Us
        </button>

        <button
          onClick={() => handleTabClick('submit-ticket')}
          className="flex-1 py-4 px-6 text-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-orange-500"
        >
          <span className="font-medium">Submit Ticket</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Get in Touch Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Need help? Don't hesitate to contact us. Our customer care team is available 24/7 to assist you with any questions, concerns, or feedback.
          </p>

          <p className="text-gray-400 leading-relaxed">
            We respond to all enquiries promptly and ensure you get the support you need, anytime, anywhere. Your satisfaction is our top priority.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-lg ${method.bgColor} flex items-center justify-center flex-shrink-0`}>
                    {method.icon}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {method.name}
                    </h3>
                    <p className="text-gray-300 font-medium mb-2">
                      {method.handle}
                    </p>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-400">
                        {method.availability}
                      </p>
                      <p className="text-gray-400">
                        {method.responseTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => handleContactClick(method)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex-shrink-0"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Support Tips
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              For fastest response, use WhatsApp or Telegram
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Include your account details when contacting support
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Check our FAQ section for common questions
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Email support for detailed technical issues
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
