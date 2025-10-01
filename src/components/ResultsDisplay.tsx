import { CheckCircle, XCircle, Star, TrendingUp, AlertTriangle, BookOpen, Award, Brain,Sparkles } from 'lucide-react';
import { EvaluationResult } from '../types';

interface Props {
  result: EvaluationResult;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <Award className="h-6 w-6 text-green-600" />;
    if (score >= 6) return <Star className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl blur-lg opacity-20 scale-105"></div>
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden card-3d">
          <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white flex items-center mb-4">
            <Brain className="h-6 w-6 mr-3" />
            Super Intelligence Analysis Complete
          </h2>
              <p className="text-green-200 text-lg">PhD-level AI evaluation with factual accuracy verification</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">✅ Analysis Complete</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">🎯 Factual Accuracy Verified</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">📊 Detailed Feedback</span>
              </div>
            </div>
        </div>

        <div className="p-10">
          {/* SUPER PROMINENT IDEAL ANSWER CORRECTION - Show at the very top */}
          {result.idealAnswerCorrection?.isIncorrect && (
            <div className="mb-10 scale-in">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl shadow-2xl border-l-8 border-red-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-orange-600/80"></div>
                <div className="relative z-10">
                <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-4 mr-6 pulse-glow">
                      <AlertTriangle className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                      <h3 className="text-3xl font-black mb-4 flex items-center">
                        🚨 TEACHER ALERT: IDEAL ANSWER IS FACTUALLY WRONG!
                    </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-700 bg-opacity-60 rounded-xl p-6 border border-red-500">
                          <h4 className="font-black text-white mb-3 text-lg">❌ Factually Incorrect Ideal Answer</h4>
                          <p className="text-red-100">Super AI detected factual errors in teacher's provided answer</p>
                      </div>
                        <div className="bg-green-600 bg-opacity-60 rounded-xl p-6 border border-green-400">
                          <h4 className="font-black text-white mb-3 text-lg">✅ Factually Correct Answer</h4>
                          <p className="text-green-100 font-semibold text-lg">
                          {result.idealAnswerCorrection.suggestedCorrection}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Ideal Answer Correction Section */}
          {result.idealAnswerCorrection?.isIncorrect && (
            <div className="mb-10 slide-up delay-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                Detailed Correction Analysis
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-blue-900 mb-3 text-lg">📚 Factually Correct Answer:</h4>
                    <p className="text-blue-800 bg-blue-100 p-4 rounded-xl font-semibold text-lg">
                      {result.idealAnswerCorrection.suggestedCorrection}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-3 text-lg">🔍 Detailed Explanation:</h4>
                    <p className="text-blue-800 text-lg leading-relaxed">{result.idealAnswerCorrection.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Alert Section */}
          {result.teacherAlert && (
            <div className="mb-10 slide-up delay-300">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-8 border-orange-500 p-8 rounded-r-2xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900 mb-3">
                      📢 Important Notice for Teacher
                    </h3>
                    <p className="text-orange-800 font-semibold text-lg leading-relaxed">{result.teacherAlert}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Score Section */}
          <div className="mb-10 slide-up delay-400">
            <div className={`inline-flex items-center px-8 py-6 rounded-2xl border-2 shadow-xl ${getScoreColor(result.score)}`}>
              {getScoreIcon(result.score)}
              <div className="ml-6">
                <div className="text-lg font-semibold opacity-80">
                  Super AI Analysis Score
                </div>
                <div className="text-5xl font-black">{result.score}/10</div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mb-10 slide-up delay-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
              Super Intelligence Feedback
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-8 border-blue-500 p-8 rounded-r-2xl shadow-lg">
              <p className="text-gray-800 leading-relaxed text-lg font-medium">{result.feedback}</p>
            </div>
          </div>

          {/* Mistakes Section */}
          {result.mistakes.length > 0 && (
            <div className="mb-10 slide-up delay-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <XCircle className="h-6 w-6 text-red-600 mr-3" />
                Areas for Improvement
              </h3>
              <div className="space-y-4">
                {result.mistakes.map((mistake, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                        <span className="text-red-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-red-800 font-medium text-lg leading-relaxed">{mistake}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths Section */}
          {result.strengths.length > 0 && (
            <div className="mb-10 slide-up delay-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="h-6 w-6 text-green-600 mr-3" />
                Strengths Identified
              </h3>
              <div className="space-y-4">
                {result.strengths.map((strength, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-green-800 font-medium text-lg leading-relaxed">{strength}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-10 border-t-2 border-gray-200 scale-in delay-800">
            <button
              onClick={onReset}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-105 shadow-2xl gradient-shift neon-glow flex items-center justify-center"
            >
              <Brain className="h-6 w-6 mr-3" />
              Analyze Another Answer
              <Sparkles className="h-6 w-6 ml-3" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
