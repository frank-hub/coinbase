import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      category: 'Mining',
      question: 'How does crypto mining work on your platform?',
      answer: 'Our platform provides cloud-based cryptocurrency mining services. You can start mining without purchasing expensive hardware. Simply choose your mining package, and our advanced mining rigs will start generating cryptocurrency for you.'
    },
    {
      id: '2',
      category: 'Mining',
      question: 'What cryptocurrencies can I mine?',
      answer: 'We support mining for major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and other popular altcoins. The available options may vary based on market conditions and mining profitability.'
    },
    {
      id: '3',
      category: 'Mining',
      question: 'How much can I earn from mining?',
      answer: 'Mining earnings depend on various factors including the mining package you choose, current market prices, network difficulty, and mining duration. We provide real-time profitability calculators to help you estimate potential earnings.'
    },
    {
      id: '4',
      category: 'Account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple. Click on "Sign Up" on our homepage, provide your email address, create a secure password, and verify your email. Once verified, you can start exploring our mining packages.'
    },
    {
      id: '5',
      category: 'Account',
      question: 'How do I verify my account?',
      answer: 'Account verification involves providing valid identification documents. Go to your profile settings, upload a government-issued ID, and wait for our team to review it. Verification typically takes 24-48 hours.'
    },
    {
      id: '6',
      category: 'Account',
      question: 'Can I change my account information?',
      answer: 'Yes, you can update most account information in your profile settings. However, some details like your registered email may require additional verification for security purposes.'
    },
    {
      id: '7',
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including bank transfers, credit/debit cards, and major cryptocurrencies like Bitcoin, Ethereum, and USDT. All transactions are processed securely.'
    },
    {
      id: '8',
      category: 'Payments',
      question: 'How long do withdrawals take?',
      answer: 'Cryptocurrency withdrawals are typically processed within 24 hours. Bank transfers may take 3-5 business days depending on your bank and location. We process all withdrawal requests promptly.'
    },
    {
      id: '9',
      category: 'Payments',
      question: 'Are there any fees for deposits or withdrawals?',
      answer: 'We charge minimal network fees for cryptocurrency transactions. Bank transfer fees may apply based on your bank\'s policies. All fees are clearly displayed before you confirm any transaction.'
    },
    {
      id: '10',
      category: 'Security',
      question: 'How secure is my account?',
      answer: 'We implement bank-level security measures including 2FA authentication, SSL encryption, and cold storage for cryptocurrencies. Your funds and personal information are protected with advanced security protocols.'
    },
    {
      id: '11',
      category: 'Security',
      question: 'What should I do if I suspect unauthorized access?',
      answer: 'If you suspect unauthorized access, immediately change your password, enable 2FA if not already active, and contact our support team. We monitor all accounts for suspicious activity 24/7.'
    },
    {
      id: '12',
      category: 'Technical',
      question: 'Why is my mining not showing results?',
      answer: 'Mining results may take time to appear depending on the cryptocurrency and network conditions. Check your mining dashboard for real-time status. If issues persist, contact our technical support team.'
    },
    {
      id: '13',
      category: 'Technical',
      question: 'Can I mine from mobile devices?',
      answer: 'Our platform is fully responsive and works on mobile devices. However, actual mining is performed on our cloud infrastructure, so you don\'t need powerful hardware on your device.'
    }
  ];

  const categories = ['all', 'Mining', 'Account', 'Payments', 'Security', 'Technical'];

  const handleBack = () => {
    router.get('/dashboard');
  };

  const handleTabClick = (tab: string) => {
    if (tab === 'contact') {
      router.get('/help');
    } else if (tab === 'submit-ticket') {
      router.get('/submit-ticket');
    }
  };

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = selectedCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

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
          className="flex-1 py-4 px-6 text-center text-white bg-orange-500 font-medium"
        >
          FAQ
        </button>

        <button
          onClick={() => handleTabClick('contact')}
          className="flex-1 py-4 px-6 text-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-orange-500"
        >
          <span className="font-medium">Contact Us</span>
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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Find answers to the most common questions about our crypto mining platform.
            If you can't find what you're looking for, don't hesitate to contact our support team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-relaxed">
                    {item.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {openItems.has(item.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">
            Still Need Help?
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleTabClick('contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => handleTabClick('submit-ticket')}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Submit a Ticket
            </button>
          </div>
        </div>

        {/* Search Tip */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            <span className="font-medium">💡 Tip:</span> Use Ctrl+F (or Cmd+F on Mac) to quickly search for keywords on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
