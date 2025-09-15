// resources/js/components/LandingPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // icons

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle }) => (
  <motion.div
    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-400 text-sm">{subtitle}</p>
  </motion.div>
);

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    {icon}
    <span className="text-gray-300">{text}</span>
  </div>
);

const LandingPage: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <span className="text-white text-xl font-bold">CoinMiner</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#plans" className="text-gray-300 hover:text-white transition-colors">
            Plans
          </a>
          <a
            href="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-gray-900/95 backdrop-blur-lg px-6 py-6 space-y-4 absolute top-16 left-0 right-0 z-40 rounded-b-2xl border-b border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#plans"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Plans
          </a>
          <a
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors text-center"
          >
            Login
          </a>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
              <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Smart </span>
                <span className="text-orange-500">Crypto</span>
                <br />
                <span className="text-orange-500">Mining</span>
                <br />
                <span className="text-white">With Guaranteed</span>
                <br />
                <span className="text-white">Returns</span>
              </h1>

              <p className="text-gray-300 text-lg max-w-md">
                Grow your cryptocurrency assets with our automated trading algorithms
                and mining packages. Earn up to 100% monthly returns.
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <FeatureItem
                icon={<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>}
                text="Bank-level Security"
              />
              <FeatureItem
                icon={<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👥</span>
                </div>}
                text="10,000+ Users"
              />
              <FeatureItem
                icon={<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📜</span>
                </div>}
                text="Licensed Platform"
              />
            </div>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              {/* ROI Badge */}
              <div className="flex justify-end mb-6">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  +25% ROI
                </span>
              </div>

              {/* 3D Cube Animation */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative w-32 h-32"
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl transform-gpu">
                    {/* Floating dots */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-3 -left-3 w-2 h-2 bg-green-400 rounded-full"
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-1/2 -right-4 w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <StatsCard
                  title="Success Rate"
                  value="78%"
                  subtitle="Success Rate"
                />
                <StatsCard
                  title="Automated"
                  value="24/7"
                  subtitle="Automated"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose CoinMiner Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose CoinMiner ?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the future of cryptocurrency mining with our advanced platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Automated Mining */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl font-bold">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Automated Mining</h3>
            <p className="text-gray-300 leading-relaxed">
              Advanced algorithms handle all the technical aspects while you earn passively
            </p>
          </motion.div>

          {/* High Returns */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/50 hover:border-green-400 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">High Returns</h3>
            <p className="text-gray-300 leading-relaxed">
              Earn up to 100% monthly returns with our proven mining strategies
            </p>
          </motion.div>

          {/* Secure Platform */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Secure Platform</h3>
            <p className="text-gray-300 leading-relaxed">
              Bank-level encryption and security measures protect your investments
            </p>
          </motion.div>

          {/* Community Driven */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">👥</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Community Driven</h3>
            <p className="text-gray-300 leading-relaxed">
              Join thousands of successful miners in our growing community
            </p>
          </motion.div>

          {/* Easy to Start */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">▶️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Easy to Start</h3>
            <p className="text-gray-300 leading-relaxed">
              Get started in minutes with our user-friendly interface
            </p>
          </motion.div>

          {/* Proven Results */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Proven Results</h3>
            <p className="text-gray-300 leading-relaxed">
              Track record of consistent profits and satisfied users
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-gray-300 text-lg">
            Start earning in just 3 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {/* Step 1: Sign Up */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              1
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Sign Up</h3>
            <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
              Create your account and verify your email in under 2 minutes
            </p>
          </motion.div>

          {/* Step 2: Choose Plan */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              2
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Choose Plan</h3>
            <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
              Select a mining package that fits your investment goals
            </p>
          </motion.div>

          {/* Step 3: Start Earning */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              3
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">Start Earning</h3>
            <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
              Watch your profits grow with automated daily returns
            </p>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <motion.h2
                className="text-3xl lg:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Start Mining?
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands of users who are already earning daily profits with CoinMiner
              </motion.p>
              <motion.button
                className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Get Started Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 max-w-7xl mx-auto border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="text-white text-xl font-bold">CoinMiner</span>
          </div>

          <p className="text-gray-400 text-sm">
            © 2025 CoinMiner. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default LandingPage;
