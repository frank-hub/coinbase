import React, { useState } from 'react';
import { usePage, router } from "@inertiajs/react";
import {
  Home,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  HelpCircle,
  User,
  Share2,
  Wallet,
  CreditCard,
  Smartphone,
} from "lucide-react";

type WithdrawMethod = 'mpesa' | 'bank_transfer' | 'crypto';

interface FormData {
  phoneNumber: string;
  withdraw_method: WithdrawMethod;
  account_details: string;
  amount: string;
}

interface Errors {
  general?: string;
  phoneNumber?: string;
  withdraw_method?: string;
  account_details?: string;
  amount?: string;
}

export default function WithdrawMethod() {
  // Mock data - replace with actual props/API calls
  const {
    availableBalance,
    totalDeposits,
    totalWithdraws,
    pendingWithdraws,
    recentWithdraws,
  } = usePage().props as unknown as {
    availableBalance: number;
    totalDeposits: number;
    totalWithdraws: number;
    pendingWithdraws: number;
    recentWithdraws: {
      id: number;
      transaction_ref: string;
      amount: number;
      status: string;
      created_at: string;
    }[];
  };

  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    withdraw_method: 'mpesa',
    account_details: '',
    amount: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingBalance] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const getMethodIcon = (method: WithdrawMethod) => {
    switch (method) {
      case 'mpesa':
        return <Smartphone className="w-4 h-4" />;
      case 'bank_transfer':
        return <CreditCard className="w-4 h-4" />;
      case 'crypto':
        return <Wallet className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const getAccountPlaceholder = (method: WithdrawMethod) => {
    switch (method) {
      case 'mpesa':
        return 'Enter M-Pesa number';
      case 'bank_transfer':
        return 'Enter bank account number';
      case 'crypto':
        return 'Enter wallet address';
      default:
        return 'Enter account details';
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return 'KES 0.00';
    return `KES ${num.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Kenyan phone number';
    }

    if (!formData.account_details.trim()) {
      newErrors.account_details = 'Account details are required';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount < 10) {
        newErrors.amount = 'Minimum withdrawal amount is KES 10';
      } else if (amount > 1000000) {
        newErrors.amount = 'Maximum withdrawal amount is KES 1,000,000';
      } else if (amount > availableBalance) {
        newErrors.amount = 'Insufficient balance';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return formData.phoneNumber.trim() &&
           formData.account_details.trim() &&
           formData.amount.trim() &&
           parseFloat(formData.amount) >= 10 &&
           parseFloat(formData.amount) <= availableBalance &&
           Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Use Inertia router to submit the form
      await router.post('/withdraw-submit', {
        phoneNumber: formData.phoneNumber,
        withdraw_method: formData.withdraw_method,
        account_details: formData.account_details,
        amount: formData.amount,
      });

      // Reset form on success (this might not execute if there's a redirect)
      setFormData({
        phoneNumber: '',
        withdraw_method: 'mpesa',
        account_details: '',
        amount: '',
      });

    } catch (error) {
      setErrors({ general: 'Failed to process withdrawal. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      phoneNumber: '',
      withdraw_method: 'mpesa',
      account_details: '',
      amount: '',
    });
    setErrors({});
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

      {/* Withdraw Banner */}
      <div className="mx-4 mt-4 bg-orange-500 rounded-lg py-4 text-center">
        <h2 className="text-lg font-bold text-white">WITHDRAW NOW</h2>
      </div>

      {/* Balance Display */}
      <div className="mx-4 mt-4 bg-slate-800 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-400 mb-1">Available Balance</p>
        {isLoadingBalance ? (
          <div className="animate-pulse">
            <div className="h-6 bg-slate-600 rounded w-32 mx-auto"></div>
          </div>
        ) : (
          <p className="text-xl font-bold text-green-400">
            KES {availableBalance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </p>
        )}
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
                Phone Number
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
            </div>

            {/* Withdrawal Method Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                Withdrawal Method
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {(['mpesa', 'bank_transfer', 'crypto'] as WithdrawMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, withdraw_method: method, account_details: '' }))}
                    className={`p-3 rounded-lg border-2 transition-colors flex flex-col items-center space-y-1 ${
                      formData.withdraw_method === method
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                        : 'border-slate-600 bg-slate-700 text-gray-400 hover:border-slate-500'
                    }`}
                    disabled={isSubmitting}
                  >
                    {getMethodIcon(method)}
                    <span className="text-xs">
                      {method === 'mpesa' ? 'M-Pesa' : method === 'bank_transfer' ? 'Bank' : 'Crypto'}
                    </span>
                  </button>
                ))}
              </div>
              {errors.withdraw_method && (
                <p className="text-red-400 text-xs">{errors.withdraw_method}</p>
              )}
            </div>

            {/* Account Details Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                Account Details
              </label>
              <input
                type="text"
                name="account_details"
                placeholder={getAccountPlaceholder(formData.withdraw_method)}
                value={formData.account_details}
                onChange={handleInputChange}
                className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg border ${
                  errors.account_details ? 'border-red-500' : 'border-slate-600'
                } focus:border-orange-500 focus:outline-none transition-colors`}
                disabled={isSubmitting}
                autoComplete="off"
              />
              {errors.account_details && (
                <p className="text-red-400 text-xs mt-1">{errors.account_details}</p>
              )}
            </div>

            {/* Amount Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                Enter Amount (KSh)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount i.e 50"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min={10}
                  max={1000000}
                  step={0.01}
                  className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-2 ${
                    errors.amount ? 'border-red-500' : 'border-orange-500'
                  } focus:border-orange-400 focus:outline-none pr-12`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded px-2 py-1">
                  <div className="flex flex-col">
                    <div className="w-2 h-1 bg-gray-400 mb-1"></div>
                    <div className="w-2 h-1 bg-gray-400 mb-1"></div>
                    <div className="w-2 h-1 bg-gray-400"></div>
                  </div>
                </div>
              </div>
              {errors.amount && (
                <p className="text-red-400 text-xs mt-1">{errors.amount}</p>
              )}
              <div className="flex justify-between mt-3 text-xs text-gray-400">
                <span>Min: <span className="text-white font-medium">KES 10.00</span></span>
                <span>Max: <span className="text-white font-medium">KES 1,000,000.00</span></span>
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
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
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
                  'WITHDRAW NOW'
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
}
