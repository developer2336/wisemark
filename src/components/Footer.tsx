import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 py-16 mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/10 p-3 rounded-full mr-3 pulse-glow">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white">MarkWise</h3>
        </div>

        <p className="text-white text-lg font-semibold">
          Powered by <span className="text-blue-400 font-bold">IT Atmoz</span>
        </p>
      </div>
    </footer>
  );
}
