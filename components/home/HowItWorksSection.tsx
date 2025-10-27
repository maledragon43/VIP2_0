'use client'

import { motion } from 'framer-motion'
import { Play, Users, Heart, RotateCcw } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Play,
    title: 'Tap the VIP Spin',
    description: 'Tap the glowing sphere to start your spin and begin the matching process.',
    color: 'from-vip-500 to-vip-600'
  },
  {
    step: 2,
    icon: Users,
    title: 'Get Matched Instantly',
    description: 'Our algorithm pairs you with another active user based on preferences and location.',
    color: 'from-primary-500 to-primary-600'
  },
  {
    step: 3,
    icon: Heart,
    title: 'Start Video Chat',
    description: 'A live video call opens immediately - talk, laugh, and get to know each other.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    step: 4,
    icon: RotateCcw,
    title: 'Choose Your Next Move',
    description: 'VIP Connect to stay in touch, or Spin Again to meet someone new.',
    color: 'from-gold-500 to-gold-600'
  }
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-vip-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">VIP Spin</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to meet amazing people and build real connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-vip-200 to-transparent z-0" />
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-vip-100">
                  <span className="text-2xl font-bold gradient-text">{step.step}</span>
                </div>
                
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already making meaningful connections through VIP 2.0.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Started Free</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
