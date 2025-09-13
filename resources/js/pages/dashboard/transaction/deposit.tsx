import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Home, Zap, DollarSign, TrendingUp, Users, HelpCircle, User, Share2 } from 'lucide-react';

// Type definitions
interface ValidationErrors {
  phoneNumber?: string;
  amount?: string;
  general?: string;
}

interface DepositFormData {
  phoneNumber: string;
  amount: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: ValidationErrors;
}

interface LaravelValidationError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

const WovekDepositForm: React.FC = () => {
  const [formData, setFormData] = useState<DepositFormData>({
    phoneNumber: '',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Handle input changes with proper typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form data
  const validateForm = (data: DepositFormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!data.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!data.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amountNum = parseFloat(data.amount);
      if (isNaN(amountNum)) {
        newErrors.amount = 'Please enter a valid amount';
      } else if (amountNum < 50) {
        newErrors.amount = 'Minimum amount is KES 50';
      } else if (amountNum > 500000) {
        newErrors.amount = 'Maximum amount is KES 500,000';
      }
    }

    return newErrors;
  };

  // Get CSRF token from meta tag
  const getCsrfToken = (): string | null => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || null;
  };

  // Handle form submission
  const handleSubmit = async (e?: FormEvent<HTMLButtonElement>): Promise<void> => {
    if (e) e.preventDefault();

    setIsSubmitting(true);
    setErrors({});

    // Client-side validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const csrfToken = getCsrfToken();

      if (!csrfToken) {
        throw new Error('CSRF token not found. Please refresh the page.');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('_token', csrfToken);

      const response = await fetch('/deposit-submit', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
        },
      });

      const responseData: ApiResponse | LaravelValidationError = await response.json();

      if (response.ok && 'success' in responseData && responseData.success) {
        alert('Deposit submitted successfully!');
        // Reset form
        setFormData({ phoneNumber: '', amount: '' });
        // Optionally redirect
        window.location.href = '/deposit';
      } else if (response.status === 422 && 'errors' in responseData) {
        // Handle Laravel validation errors
        const laravelErrors: ValidationErrors = {};
        if (responseData.errors) {
          Object.entries(responseData.errors).forEach(([field, messages]) => {
            laravelErrors[field as keyof ValidationErrors] = messages[0];
          });
        }
        setErrors(laravelErrors);
      } else {
        const errorMessage = 'message' in responseData ? responseData.message : 'An error occurred. Please try again.';
        setErrors({ general: errorMessage });
      }
    } catch (error: unknown) {
      console.error('Submit error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please check your connection and try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel action
  const handleCancel = (): void => {
    setFormData({ phoneNumber: '', amount: '' });
    setErrors({});
  };

  // Format amount for display
  const formatAmount = (amount: string): string => {
    const num = parseFloat(amount);
    return isNaN(num) ? amount : num.toLocaleString('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    });
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    return formData.phoneNumber.trim() !== '' &&
           formData.amount.trim() !== '' &&
           Object.keys(errors).length === 0;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-orange-500">wovek</h1>
            <p className="text-xs text-gray-400">CM#8606Tra-Pro</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-gray-400" />
          <Share2 className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Deposit Banner */}
      <div className="mx-4 mt-4 bg-orange-500 rounded-lg py-4 text-center">
        <h2 className="text-lg font-bold text-white">DEPOSIT NOW</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-lg p-6">
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            {/* Phone Number Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                Please Enter Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-slate-600'
                } focus:border-orange-500 focus:outline-none transition-colors`}
                disabled={isSubmitting}
                autoComplete="tel"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
              )}
              <div className="flex space-x-4 mt-3">
                <span className="text-xs text-gray-400">0701</span>
                <span className="text-xs text-gray-400">0722******</span>
                <span className="text-xs text-gray-400">0123******</span>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                Please Enter Amount (KES)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount i.e 50"
                value={formData.amount}
                onChange={handleInputChange}
                min={50}
                max={500000}
                step={0.01}
                className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg border ${
                  errors.amount ? 'border-red-500' : 'border-slate-600'
                } focus:border-orange-500 focus:outline-none transition-colors`}
                disabled={isSubmitting}
                autoComplete="off"
              />
              {errors.amount && (
                <p className="text-red-400 text-xs mt-1">{errors.amount}</p>
              )}
              <div className="flex justify-between mt-3 text-xs text-gray-400">
                <span>Min: <span className="text-white font-medium">KES 50.00</span></span>
                <span>Max: <span className="text-white font-medium">KES 500,000.00</span></span>
              </div>
              {formData.amount && !errors.amount && (
                <div className="mt-2 text-sm text-green-400">
                  Amount: {formatAmount(formData.amount)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-500 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                  isFormValid() && !isSubmitting
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
                disabled={isSubmitting || !isFormValid()}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'DEPOSIT'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around py-2">
          <a href='/dashboard' className="flex flex-col items-center p-2 text-orange-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </a>
          <a href='/active-engine' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <Zap className="w-6 h-6 mb-1" />
            <span className="text-xs">Active Engine</span>
          </a>
          <a href='/mining_engines' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <DollarSign className="w-6 h-6 mb-1" />
            <span className="text-xs">Mine</span>
          </a>
          <a href='/earnings' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <TrendingUp className="w-6 h-6 mb-1" />
            <span className="text-xs">Earnings</span>
          </a>
          <a href='/network' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Network</span>
          </a>
          <a href='/help' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Help</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default WovekDepositForm;
