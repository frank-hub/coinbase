// resources/js/Pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
            <Head title="Sign In - CryptoMine Pro" />

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                {/* Login Card */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h1
                            className="text-2xl font-bold text-white mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Sign In
                        </motion.h1>

                        {/* Logo */}
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold text-white">₿</span>
                                </div>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                    <div className="text-xs font-semibold text-yellow-400 bg-gray-800 px-2 py-1 rounded">
                                        CRYPTO
                                    </div>
                                    <div className="text-xs font-semibold text-orange-400 bg-gray-800 px-2 py-1 rounded -mt-1">
                                        MINE PRO
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Sign in to your CryptoMine Pro account</p>
                        </motion.div>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <motion.div
                            className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm text-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {status}
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Email Address"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                                    placeholder="Enter password ********"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                            )}
                        </motion.div>

                        {/* Forgot Password */}
                        {canResetPassword && (
                            <motion.div
                                className="text-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <span className="text-gray-400 text-sm">Forgot Your Password? </span>
                                <Link
                                    href="/forgot-password"
                                    className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                                >
                                    Reset Now
                                </Link>
                            </motion.div>
                        )}

                        {/* Sign In Button */}
                        <motion.button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                            whileHover={{ scale: processing ? 1 : 1.02 }}
                            whileTap={{ scale: processing ? 1 : 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                            ) : null}
                            Sign In
                        </motion.button>

                        {/* Sign Up Link */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <span className="text-gray-400 text-sm">Don't have an account? </span>
                            <Link
                                href="/register"
                                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
