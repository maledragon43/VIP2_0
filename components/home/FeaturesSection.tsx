'use client'

import { motion } from 'framer-motion'
import { Video, MessageCircle, Users, Gift, Crown, Zap } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'Live Video Chat',
    description: 'Connect instantly through high-quality video calls with real people from around the world.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: MessageCircle,
    title: 'Real-time Messaging',
    description: 'Chat with text messages during video calls and continue conversations after connecting.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Users,
    title: 'Group Video Rooms',
    description: 'Join or create video rooms with 3-6 people for community building and group interactions.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Gift,
    title: 'Virtual Gifts',
    description: 'Send animated emojis and virtual gifts during live chats to express yourself.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Crown,
    title: 'VIP Subscription',
    description: 'Unlimited spins, premium filters, and ad-free experience with VIP membership.',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Our VIP Spin algorithm matches you with compatible people in seconds.',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function FeaturesSection() {
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
            <span className="gradient-text">Amazing Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to meet new people and build meaningful connections through live video chat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
