// resources/js/Pages/Auth/Register.tsx
import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, ArrowLeft, Check } from 'lucide-react';
import InputError from '../../components/InputError';



interface RegisterFormData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    terms: boolean;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            
        });
    };

    return (
        <>
            <Head title="Create Account - CryptoMine Pro" />

            <div className="min-h-screen bg-gradient-to-br from-[#0f1623] to-[#1a2332] flex items-center justify-center p-4">
                <div className="w-full max-width-[500px] animate-fadeIn">
                    {/* Back Button */}
                    <Link
                        href={('welcome')}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </Link>

                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            ₿
                        </div>
                        <span className="text-orange-500 text-2xl font-semibold">CryptoMine Pro</span>
                    </div>

                    {/* Form Container */}
                    <div className="bg-[#1a2332]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
                        <h1 className="text-white text-3xl font-semibold text-center mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-center mb-8">
                            Join CryptoMine Pro and start earning
                        </p>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                        First Name
                                    </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                        placeholder="Your First name"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                        placeholder="Your Last name"
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={e => setData('username', e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    placeholder="Your Username"
                                    required
                                />
                                <InputError message={errors.username} className="mt-2" />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    placeholder="your.email@example.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    placeholder="Your Phone Number i.e 0711111111"
                                    required
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all pr-12"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1623]/80 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:bg-[#0f1623] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all pr-12"
                                        placeholder="Confirm Your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors p-1"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={data.terms}
                                    onChange={e => setData('terms', e.target.checked)}
                                    className="mt-1 w-4 h-4 bg-[#0f1623]/80 border border-white/10 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
                                    required
                                />
                                <label htmlFor="terms" className="text-gray-400 text-sm">
                                    I agree to the{' '}
                                    <Link href={('terms')} className="text-orange-500 hover:text-orange-400 transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href={('privacy')} className="text-orange-500 hover:text-orange-400 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.terms && <InputError message={errors.terms} className="mt-2" />}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                            >
                                {processing && <LoaderCircle className="w-5 h-5 animate-spin" />}
                                Create Account
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link href={('login')} className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>

                        </form>
<p className="text-center text-gray-400 text-sm">
                               Dashboard Client?{' '}
                                <a href='/dashboard/index' className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                                    Sign in
                                </a>
                            </p>
                        {/* Features Section */}
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <h3 className="text-white font-medium mb-5 text-center">
                                Why Choose CryptoMine Pro?
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Up to 35% ROI on investments',
                                    '10% referral commission',
                                    'Automated mining systems',
                                    '24/7 customer support'
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-400 text-sm">
                                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
