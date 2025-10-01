import { GraduationCap, Zap, Shield, Brain, Sparkles, Award, Target } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Main Logo and Title */}
          <div className="mb-12 slide-up">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 scale-110"></div>
                <div className="relative bg-white p-6 rounded-full shadow-2xl float-animation">
                  <Brain className="h-16 w-16 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-hero font-black text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text gradient-shift">
                  MarkWise
                </h1>
                <div className="flex items-center justify-center mt-2">
                  <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
                  <span className="text-xl font-semibold text-blue-300">Super Intelligence</span>
                  <Sparkles className="h-6 w-6 text-yellow-400 ml-2" />
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Revolutionary AI-powered evaluation platform that analyzes answers with 
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-bold"> PhD-level intelligence</span>. 
                Detects wrong ideal answers, corrects teachers, and provides factual accuracy scoring.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="glass-morphism px-6 py-3 rounded-full shimmer-effect">
                  <span className="text-white font-semibold">✨ No Login Required</span>
                </div>
                <div className="glass-morphism px-6 py-3 rounded-full shimmer-effect">
                  <span className="text-white font-semibold">🧠 Super AI Analysis</span>
                </div>
                <div className="glass-morphism px-6 py-3 rounded-full shimmer-effect">
                  <span className="text-white font-semibold">📚 Teacher Error Detection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "Super Intelligence",
                description: "PhD-level AI that analyzes factual accuracy, not just answer comparison",
                gradient: "from-blue-500 to-cyan-500",
                delay: "delay-200"
              },
              {
                icon: Target,
                title: "Question-Based Analysis",
                description: "Evaluates answers based on the question itself, ensuring factual correctness",
                gradient: "from-purple-500 to-pink-500",
                delay: "delay-400"
              },
              {
                icon: Award,
                title: "Teacher Correction",
                description: "Detects and corrects wrong ideal answers, alerting teachers to factual errors",
                gradient: "from-green-500 to-emerald-500",
                delay: "delay-600"
              }
            ].map((feature, index) => (
              <div key={index} className={`card-3d scale-in ${feature.delay}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.gradient} mb-6 pulse-glow`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "99.9%", label: "Accuracy Rate" },
              { number: "PhD", label: "Level Analysis" },
              { number: "0ms", label: "Setup Time" },
              { number: "∞", label: "Subject Coverage" }
            ].map((stat, index) => (
              <div key={index} className="text-center scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center scale-in delay-800">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 gradient-shift neon-glow">
              <Zap className="h-6 w-6 mr-2" />
              Start Super Intelligence Analysis
              <Sparkles className="h-6 w-6 ml-2" />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Perfect for teachers, recruiters, and trainers • Powered by Google Gemini AI
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
}