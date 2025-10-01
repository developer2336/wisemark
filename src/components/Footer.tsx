export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 py-16 mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/10 p-3 rounded-full mr-3 pulse-glow">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white">MarkWise</h3>
            </div>
            <p className="text-blue-200 text-lg font-medium">
              Super Intelligent AI-Powered Auto-Evaluation Platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Super Intelligence</h4>
              <p className="text-gray-300 text-sm">PhD-level AI analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Factual Accuracy</h4>
              <p className="text-gray-300 text-sm">Question-based evaluation</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Teacher Correction</h4>
              <p className="text-gray-300 text-sm">Detects wrong ideal answers</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-gray-300 text-lg mb-4">
              Powered by <span className="font-bold text-white">IT Atmoz</span> • 
              <span className="text-blue-300 font-semibold">Super Intelligent Google Gemini AI</span>
          </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">MarkWise Beta - Revolutionary AI Education Technology</p>
              <p>© 2025 markwise.itatmoz.com • Built with ❤️ for educators worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}