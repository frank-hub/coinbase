import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { router } from '@inertiajs/react';

interface FormData {
  priority: string;
  subject: string;
  message: string;
}

interface FormErrors {
  priority?: string;
  subject?: string;
  message?: string;
}

export default function SubmitTicket() {
  const [formData, setFormData] = useState<FormData>({
    priority: 'low',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityOptions = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'medium', label: 'Medium - Account issue' },
    { value: 'high', label: 'High - Payment problem' },
    { value: 'urgent', label: 'Urgent - Security concern' }
  ];

  const handleBack = () => {
    router.get('/help');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Detailed message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (minimum 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      router.post('/support/tickets', { ...formData }, {
        onSuccess: () => {
          console.log('Ticket submitted successfully');
        },
        onError: (errors) => {
          setErrors(errors as FormErrors);
        },
        onFinish: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setIsSubmitting(false);
    }
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

        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Submit Support Ticket</h2>
          <p className="text-gray-300 leading-relaxed">
            Can't find what you're looking for? Submit a detailed support ticket and our team will get back to you.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Priority Level */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Priority Level
            </label>
            <div className="relative">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-white px-4 py-4 rounded-lg border border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors appearance-none cursor-pointer"
                disabled={isSubmitting}
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.priority && (
              <p className="text-red-400 text-sm mt-2">{errors.priority}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your issue"
              className={`w-full bg-slate-700 text-white px-4 py-4 rounded-lg border ${
                errors.subject ? 'border-red-500' : 'border-slate-600'
              } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors placeholder-gray-400`}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-red-400 text-sm mt-2">{errors.subject}</p>
            )}
          </div>

          {/* Detailed Message */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Detailed Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please provide as much detail as possible about your issue..."
              rows={8}
              className={`w-full bg-slate-700 text-white px-4 py-4 rounded-lg border ${
                errors.message ? 'border-red-500' : 'border-slate-600'
              } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-colors placeholder-gray-400 resize-none`}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.message ? (
                <p className="text-red-400 text-sm">{errors.message}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  {formData.message.length}/500 characters
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">
            Before Submitting
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Check our FAQ section for common solutions
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Include your account email or username
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Describe steps you've already tried
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Include screenshots if helpful
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              We typically respond within 24 hours
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
