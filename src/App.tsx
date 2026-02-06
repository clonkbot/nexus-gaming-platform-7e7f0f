import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Users, Sparkles, Zap, Globe, Star, Play, Search, Menu, X, TrendingUp, Clock, Crown } from 'lucide-react'

// Fake game data
const games = [
  { id: 1, name: 'NEON OBBY EXTREME', players: 847293, likes: 2400000, thumbnail: 'game1', category: 'Adventure', creator: 'NeonMaster' },
  { id: 2, name: 'MEGA TYCOON 3000', players: 623841, likes: 1800000, thumbnail: 'game2', category: 'Tycoon', creator: 'TycoonKing' },
  { id: 3, name: 'CYBER BLADE PVP', players: 412938, likes: 3200000, thumbnail: 'game3', category: 'Fighting', creator: 'BladeRunner' },
  { id: 4, name: 'RACING INFINITY', players: 298472, likes: 980000, thumbnail: 'game4', category: 'Racing', creator: 'SpeedDemon' },
  { id: 5, name: 'TOWER DEFENSE Z', players: 189374, likes: 1500000, thumbnail: 'game5', category: 'Strategy', creator: 'ZedMaster' },
  { id: 6, name: 'ADOPT ME ULTRA', players: 1293847, likes: 5600000, thumbnail: 'game6', category: 'Roleplay', creator: 'PetLover' },
  { id: 7, name: 'MURDER MYSTERY X', players: 567823, likes: 2100000, thumbnail: 'game7', category: 'Horror', creator: 'DarkSoul' },
  { id: 8, name: 'SIMULATOR MANIA', players: 334928, likes: 890000, thumbnail: 'game8', category: 'Simulator', creator: 'SimGod' },
]

const categories = ['All', 'Adventure', 'Tycoon', 'Fighting', 'Racing', 'Strategy', 'Roleplay', 'Horror', 'Simulator']

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function GameCard({ game, index }: { game: typeof games[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [liveCount, setLiveCount] = useState(game.players)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 200) - 100)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const gradients = [
    'from-fuchsia-500 via-purple-600 to-cyan-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-cyan-400 via-blue-500 to-purple-600',
    'from-green-400 via-emerald-500 to-teal-600',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-pink-400 via-rose-500 to-red-500',
    'from-indigo-400 via-purple-500 to-pink-500',
    'from-teal-400 via-cyan-500 to-blue-500',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`}
        animate={{ scale: isHovered ? 1.02 : 1 }}
      />

      {/* Card */}
      <motion.div
        className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Thumbnail */}
        <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${gradients[index % gradients.length]} overflow-hidden`}>
          {/* Scan lines overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none" />

          {/* Game icon placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-white/30" />
          </div>

          {/* Live badge */}
          <motion.div
            className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-sm px-2 sm:px-2.5 py-1 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-green-400">{formatNumber(liveCount)} LIVE</span>
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded-full">
            <span className="text-[10px] sm:text-xs font-semibold text-white">{game.category}</span>
          </div>

          {/* Play overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          >
            <motion.button
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 ml-1" fill="currentColor" />
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-black text-sm sm:text-base text-white truncate tracking-tight">{game.name}</h3>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">by {game.creator}</p>
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" />
              <span className="text-[10px] sm:text-xs text-gray-300">{formatNumber(game.likes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs text-gray-300">{formatNumber(game.players)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Users; label: string; value: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 overflow-hidden group`}
    >
      <div className={`absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${color} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`} />
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mb-2 sm:mb-3 ${color.includes('cyan') ? 'text-cyan-400' : color.includes('fuchsia') ? 'text-fuchsia-400' : color.includes('yellow') ? 'text-yellow-400' : 'text-green-400'}`} />
      <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{value}</p>
      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-0.5 sm:mt-1">{label}</p>
    </motion.div>
  )
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [totalPlayers, setTotalPlayers] = useState(12847293)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPlayers(prev => prev + Math.floor(Math.random() * 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,0,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,128,0.1),transparent_50%)]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-xl blur-lg opacity-50 -z-10" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                  NEXUS
                </h1>
                <p className="text-[8px] sm:text-[10px] text-gray-500 font-semibold tracking-widest -mt-0.5 sm:-mt-1">UNLIMITED WORLDS</p>
              </div>
            </motion.div>

            {/* Search - Desktop */}
            <motion.div
              className="hidden md:flex flex-1 max-w-md mx-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search infinite worlds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                />
              </div>
            </motion.div>

            {/* Nav - Desktop */}
            <motion.nav
              className="hidden lg:flex items-center gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Discover</a>
              <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Create</a>
              <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Avatar</a>
              <motion.button
                className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl font-bold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Free
              </motion.button>
            </motion.nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search worlds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/80 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col p-4 gap-2">
                <a href="#" className="px-4 py-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">Discover</a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">Create</a>
                <a href="#" className="px-4 py-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">Avatar</a>
                <button className="mt-2 px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl font-bold text-sm">
                  Sign Up Free
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            {/* Live counter */}
            <motion.div
              className="inline-flex items-center gap-2 sm:gap-3 bg-gray-900/80 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-500/30 mb-4 sm:mb-6 lg:mb-8"
              animate={{ boxShadow: ['0 0 20px rgba(34,197,94,0.2)', '0 0 40px rgba(34,197,94,0.4)', '0 0 20px rgba(34,197,94,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-green-400">
                {totalPlayers.toLocaleString()} PLAYERS ONLINE NOW
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent">INFINITE</span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">POSSIBILITIES</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Create, play, and share experiences with millions of players worldwide.
              Your imagination is the only limit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" fill="currentColor" />
                PLAY NOW
              </motion.button>
              <motion.button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                CREATE WORLD
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <StatCard icon={Users} label="Active Players" value="12M+" color="from-cyan-500 to-blue-500" />
            <StatCard icon={Globe} label="Worlds Created" value="50M+" color="from-fuchsia-500 to-purple-500" />
            <StatCard icon={TrendingUp} label="Daily Visits" value="100M+" color="from-yellow-500 to-orange-500" />
            <StatCard icon={Crown} label="Creators" value="5M+" color="from-green-500 to-emerald-500" />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />
                <span className="text-xs sm:text-sm font-bold text-fuchsia-400 tracking-wider">TRENDING NOW</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black">Popular Experiences</h3>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Updated live</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white'
                    : 'bg-gray-900/80 text-gray-400 hover:text-white border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Games Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGames.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-20"
            >
              <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">No games found. Try a different search!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-fuchsia-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,255,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,255,0.3),transparent_50%)]" />

            <div className="relative text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-3 sm:mb-4 lg:mb-6">Ready to Create?</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto">
                Join millions of creators building the next generation of experiences.
                No coding required to get started.
              </p>
              <motion.button
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white text-gray-900 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base lg:text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Creating Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs text-gray-600">
            Requested by @SquaredCubeRBX · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  )
}
