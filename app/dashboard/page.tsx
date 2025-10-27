'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import VIPSpin from '@/components/vip/VIPSpin'
import VideoChat from '@/components/vip/VideoChat'
import { Sparkles, User, Settings, Crown, Gift, MessageCircle } from 'lucide-react'

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<'spin' | 'chat' | 'connections'>('spin')
  const [matchedUser, setMatchedUser] = useState<any>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [connections, setConnections] = useState([
    {
      id: '1',
      name: 'Sarah',
      lastMessage: 'Hey! How was your day?',
      time: '2m ago',
      unread: 2,
      image: '/placeholder-avatar.jpg'
    },
    {
      id: '2',
      name: 'Mike',
      lastMessage: 'Thanks for the great conversation!',
      time: '1h ago',
      unread: 0,
      image: '/placeholder-avatar.jpg'
    }
  ])

  const handleMatch = (user: any) => {
    setMatchedUser(user)
    setCurrentView('chat')
  }

  const handleConnect = () => {
    // Add to connections
    const newConnection = {
      id: Date.now().toString(),
      name: matchedUser.name,
      lastMessage: 'Connected!',
      time: 'now',
      unread: 0,
      image: '/placeholder-avatar.jpg'
    }
    setConnections(prev => [newConnection, ...prev])
    setCurrentView('connections')
  }

  const handleSpinAgain = () => {
    setMatchedUser(null)
    setCurrentView('spin')
  }

  const handleEndCall = () => {
    setMatchedUser(null)
    setCurrentView('spin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vip-50 to-primary-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-vip-500 to-vip-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">VIP 2.0</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('spin')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'spin' ? 'bg-vip-100 text-vip-700' : 'text-gray-600 hover:text-vip-600'
                }`}
              >
                VIP Spin
              </button>
              <button
                onClick={() => setCurrentView('connections')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'connections' ? 'bg-vip-100 text-vip-700' : 'text-gray-600 hover:text-vip-600'
                }`}
              >
                Connections
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* VIP Status */}
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white px-3 py-1 rounded-full text-sm">
                <Crown className="w-4 h-4" />
                <span>VIP</span>
              </div>

              {/* Spins Counter */}
              <div className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-sm">
                <Sparkles className="w-4 h-4 text-vip-500" />
                <span className="font-semibold">5</span>
                <span className="text-gray-500">spins</span>
              </div>

              {/* Profile */}
              <button className="w-8 h-8 bg-gradient-to-r from-vip-400 to-vip-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {currentView === 'spin' && (
          <VIPSpin
            onMatch={handleMatch}
            onConnect={handleConnect}
            onSpinAgain={handleSpinAgain}
            isSpinning={isSpinning}
            matchedUser={matchedUser}
          />
        )}

        {currentView === 'chat' && matchedUser && (
          <VideoChat
            matchedUser={matchedUser}
            onEndCall={handleEndCall}
            onConnect={handleConnect}
          />
        )}

        {currentView === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Connections</h1>
              <p className="text-gray-600">People you've connected with through VIP Spin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.map((connection) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-vip-400 to-vip-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{connection.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                      <p className="text-sm text-gray-500">{connection.time}</p>
                    </div>
                    {connection.unread > 0 && (
                      <div className="w-6 h-6 bg-vip-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {connection.unread}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{connection.lastMessage}</p>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-vip-500 text-white py-2 px-4 rounded-lg hover:bg-vip-600 transition-colors text-sm flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                      <Gift className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {connections.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No connections yet</h3>
                <p className="text-gray-600 mb-6">Start spinning to meet amazing people!</p>
                <button
                  onClick={() => setCurrentView('spin')}
                  className="btn-primary"
                >
                  Start VIP Spin
                </button>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex">
          <button
            onClick={() => setCurrentView('spin')}
            className={`flex-1 flex flex-col items-center py-3 ${
              currentView === 'spin' ? 'text-vip-600' : 'text-gray-500'
            }`}
          >
            <Sparkles className="w-6 h-6 mb-1" />
            <span className="text-xs">Spin</span>
          </button>
          <button
            onClick={() => setCurrentView('connections')}
            className={`flex-1 flex flex-col items-center py-3 ${
              currentView === 'connections' ? 'text-vip-600' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex-1 flex flex-col items-center py-3 text-gray-500">
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
