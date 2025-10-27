'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, VideoOff, Mic, MicOff, Phone, MessageCircle, Gift, Settings } from 'lucide-react'

interface VideoChatProps {
  matchedUser: any
  onEndCall: () => void
  onConnect: () => void
}

export default function VideoChat({ matchedUser, onEndCall, onConnect }: VideoChatProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isConnecting, setIsConnecting] = useState(true)
  const [showGifts, setShowGifts] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'me' | 'them', timestamp: Date}>>([])
  
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false)
    }, 2000)
  }, [])

  const sendMessage = () => {
    if (!message.trim()) return
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me' as const,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setMessage('')
    
    // Simulate response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        text: "That's awesome! Tell me more about that.",
        sender: 'them' as const,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const gifts = [
    { id: 1, name: 'Heart', emoji: '❤️', price: 1 },
    { id: 2, name: 'Rose', emoji: '🌹', price: 2 },
    { id: 3, name: 'Kiss', emoji: '💋', price: 3 },
    { id: 4, name: 'Diamond', emoji: '💎', price: 5 },
    { id: 5, name: 'Crown', emoji: '👑', price: 10 },
  ]

  const sendGift = (gift: any) => {
    // Handle gift sending
    console.log('Sending gift:', gift)
    setShowGifts(false)
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Video Container */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <div className="absolute inset-0">
          {isConnecting ? (
            <div className="w-full h-full bg-gradient-to-br from-vip-500 to-vip-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connecting...</h3>
                <p className="text-vip-100">Setting up your video call with {matchedUser.name}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gradient-to-r from-vip-400 to-vip-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">{matchedUser.name.charAt(0)}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{matchedUser.name}</h3>
                <p className="text-gray-300">{matchedUser.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Local Video */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white font-bold">You</span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
            <span className="text-sm">00:05:23</span>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMicOn ? 'bg-white text-gray-900' : 'bg-red-500 text-white'
            }`}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>
          
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoOn ? 'bg-white text-gray-900' : 'bg-red-500 text-white'
            }`}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>
          
          <button
            onClick={() => setShowGifts(!showGifts)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-white flex items-center justify-center"
          >
            <Gift className="w-6 h-6" />
          </button>
          
          <button className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </button>
          
          <button
            onClick={onEndCall}
            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center"
          >
            <Phone className="w-6 h-6 rotate-180" />
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className="absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 flex flex-col"
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-vip-400 to-vip-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{matchedUser.name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{matchedUser.name}</h4>
              <p className="text-sm text-gray-500">Online now</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-vip-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vip-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-vip-500 text-white rounded-lg hover:bg-vip-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Gifts Modal */}
      {showGifts && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Send a Gift</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {gifts.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => sendGift(gift)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-vip-300 hover:bg-vip-50 transition-colors"
                >
                  <div className="text-2xl mb-2">{gift.emoji}</div>
                  <div className="text-sm font-medium">{gift.name}</div>
                  <div className="text-xs text-gray-500">${gift.price}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGifts(false)}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Connection Actions */}
      {!isConnecting && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4">
            <button
              onClick={onConnect}
              className="btn-primary flex items-center"
            >
              <Heart className="w-5 h-5 mr-2" />
              VIP Connect
            </button>
            <button
              onClick={onEndCall}
              className="btn-secondary flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
