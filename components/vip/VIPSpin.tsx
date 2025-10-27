'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Heart, MessageCircle, X } from 'lucide-react'

interface VIPSpinProps {
  onMatch: (matchedUser: any) => void
  onConnect: () => void
  onSpinAgain: () => void
  isSpinning: boolean
  matchedUser?: any
}

export default function VIPSpin({ onMatch, onConnect, onSpinAgain, isSpinning, matchedUser }: VIPSpinProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showMatch, setShowMatch] = useState(false)
  const spinRef = useRef<HTMLDivElement>(null)

  const handleSpin = async () => {
    if (isSpinning) return
    
    setIsAnimating(true)
    
    // Simulate spin animation
    setTimeout(() => {
      setIsAnimating(false)
      setShowMatch(true)
      // Simulate finding a match
      const mockUser = {
        id: '1',
        name: 'Alex',
        age: 25,
        image: '/placeholder-avatar.jpg',
        bio: 'Love traveling and meeting new people!',
        interests: ['Travel', 'Music', 'Photography']
      }
      onMatch(mockUser)
    }, 3000)
  }

  const handleConnect = () => {
    setShowMatch(false)
    onConnect()
  }

  const handleSpinAgain = () => {
    setShowMatch(false)
    onSpinAgain()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-vip-50 to-primary-50 p-4">
      {/* VIP Spin Wheel */}
      <div className="relative mb-8">
        <motion.div
          ref={spinRef}
          className="w-80 h-80 rounded-full bg-gradient-to-br from-vip-400 via-vip-500 to-vip-600 shadow-2xl flex items-center justify-center relative overflow-hidden"
          animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {/* Spin Pattern */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${i * 45}deg)` }}
              >
                <div className="w-full h-1 bg-white/30 origin-left transform translate-x-40" />
              </div>
            ))}
          </div>
          
          {/* Center Content */}
          <div className="relative z-10 text-center text-white">
            <motion.div
              animate={isAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
            >
              <Play className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">VIP Spin</h3>
              <p className="text-lg opacity-90">Tap to Connect</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Spin Button */}
        <motion.button
          onClick={handleSpin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-8 h-8 text-vip-600" />
        </motion.button>
      </div>

      {/* Match Result Modal */}
      <AnimatePresence>
        {showMatch && matchedUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-vip-400 to-vip-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {matchedUser.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  You matched with {matchedUser.name}!
                </h3>
                <p className="text-gray-600 mb-4">{matchedUser.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {matchedUser.interests.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-vip-100 text-vip-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleConnect}
                  className="btn-primary flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  VIP Connect
                </button>
                <button
                  onClick={handleSpinAgain}
                  className="btn-secondary flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Spin Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Ready to Connect?</h2>
        <p className="text-gray-600 mb-6">
          Tap the VIP Spin to instantly match with someone new. 
          Start a video chat and see where the conversation takes you!
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <MessageCircle className="w-4 h-4 mr-2 text-vip-500" />
            Live Video Chat
          </div>
          <div className="flex items-center text-gray-600">
            <Heart className="w-4 h-4 mr-2 text-vip-500" />
            Real Connections
          </div>
        </div>
      </div>
    </div>
  )
}
