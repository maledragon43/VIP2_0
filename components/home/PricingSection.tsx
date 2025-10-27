'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out VIP 2.0',
    features: [
      '5 free spins per day',
      'Basic video chat',
      'Text messaging',
      'Basic profile',
      'Community support'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'btn-secondary',
    popular: false
  },
  {
    name: 'VIP',
    price: '$9.99',
    period: 'per month',
    description: 'Most popular for regular users',
    features: [
      'Unlimited spins',
      'Premium video quality',
      'Advanced filters',
      'Priority matching',
      'Ad-free experience',
      'VIP badge',
      'Priority support'
    ],
    buttonText: 'Go VIP',
    buttonStyle: 'btn-primary',
    popular: true
  },
  {
    name: 'VIP Pro',
    price: '$19.99',
    period: 'per month',
    description: 'For power users and influencers',
    features: [
      'Everything in VIP',
      'Exclusive VIP rooms',
      'Advanced analytics',
      'Custom themes',
      'Gift credits included',
      'Early access to features',
      'Dedicated support'
    ],
    buttonText: 'Go Pro',
    buttonStyle: 'btn-primary',
    popular: false
  }
]

export default function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">VIP Level</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade anytime. All plans include our core VIP Spin experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative card p-8 ${plan.popular ? 'ring-2 ring-vip-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-vip-500 to-vip-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full ${plan.buttonStyle} ${plan.popular ? 'animate-pulse-glow' : ''}`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Zap className="w-12 h-12 text-vip-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Instant Access</h4>
                <p className="text-gray-600">Start connecting immediately after signup</p>
              </div>
              <div className="text-center">
                <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Cancel Anytime</h4>
                <p className="text-gray-600">No long-term commitments or hidden fees</p>
              </div>
              <div className="text-center">
                <Crown className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">VIP Benefits</h4>
                <p className="text-gray-600">Unlock premium features and priority matching</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
