'use client'

import { motion } from 'framer-motion'
import { Play, Sparkles, Users, Heart } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-vip-50 via-primary-50 to-gold-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-vip-200/30 rounded-full blur-xl"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-primary-200/30 rounded-full blur-xl"
        animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 bg-gold-200/30 rounded-full blur-xl"
        animate={{ y: [0, -15, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-vip-500 mr-3" />
            <span className="text-vip-600 font-semibold text-lg">VIP 2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Instant</span>{' '}
            <span className="text-gray-900">Video</span>{' '}
            <span className="gradient-text">Connections</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Meet new people instantly through live video chat. Our fun{' '}
            <span className="font-semibold text-vip-600">VIP Spin</span> mechanic 
            connects you with real people for meaningful conversations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Start Spinning Now
          </Link>
          <Link href="/demo" className="btn-secondary text-lg px-8 py-4">
            Watch Demo
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-vip-500 mr-2" />
              <span className="text-3xl font-bold text-gray-900">10K+</span>
            </div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-8 h-8 text-vip-500 mr-2" />
              <span className="text-3xl font-bold text-gray-900">50K+</span>
            </div>
            <p className="text-gray-600">Connections Made</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-vip-500 mr-2" />
              <span className="text-3xl font-bold text-gray-900">95%</span>
            </div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* VIP Spin Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16"
        >
          <div className="spin-container vip-glow">
            <div className="spin-wheel flex items-center justify-center">
              <div className="text-center text-white">
                <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse-glow" />
                <h3 className="text-2xl font-bold mb-2">VIP Spin</h3>
                <p className="text-lg opacity-90">Tap to Connect</p>
              </div>
            </div>
            <div className="spin-button hover:scale-110">
              <Play className="w-8 h-8 text-vip-600" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
