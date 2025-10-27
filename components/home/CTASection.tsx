'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Smartphone } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-vip-500 via-vip-600 to-vip-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Meet{' '}
            <span className="text-gold-300">Amazing People?</span>
          </h2>
          <p className="text-xl md:text-2xl text-vip-100 mb-12 max-w-3xl mx-auto">
            Join thousands of users who are already making meaningful connections through VIP 2.0. 
            Start your journey today!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <button className="bg-white text-vip-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
            <Smartphone className="w-6 h-6 mr-2" />
            Download App
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="bg-vip-800 hover:bg-vip-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
            <Download className="w-6 h-6 mr-2" />
            Start Web Version
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-vip-200">Daily Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-vip-200">Connections Made</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9★</div>
            <div className="text-vip-200">App Store Rating</div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-vip-200 text-sm mb-4">Trusted by users worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-white font-semibold">🔒 Secure</div>
            <div className="text-white font-semibold">⚡ Fast</div>
            <div className="text-white font-semibold">🌍 Global</div>
            <div className="text-white font-semibold">💎 Premium</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
