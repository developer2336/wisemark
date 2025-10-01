import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle, BookOpen, User, HelpCircle } from 'lucide-react';
import { EvaluationRequest } from '../types';
import { extractTextFromPDF, isValidPDF } from '../utils/pdfExtractor';

interface Props {
  onSubmit: (request: EvaluationRequest) => void;
  isLoading: boolean;
  error: string | null;
}

export default function EvaluationForm({ onSubmit, isLoading, error }: Props) {
  const [formData, setFormData] = useState({
    question: '',
    idealAnswer: '',
    studentAnswer: '',
    useAdvancedRubric: false,
  });
  
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: string}>({});
  
  const questionFileRef = useRef<HTMLInputElement>(null);
  const idealAnswerFileRef = useRef<HTMLInputElement>(null);
  const studentAnswerFileRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File, field: 'question' | 'idealAnswer' | 'studentAnswer') => {
    if (!isValidPDF(file)) {
      setUploadStatus(prev => ({ ...prev, [field]: 'Please upload a valid PDF file (max 10MB)' }));
      return;
    }

    setUploadStatus(prev => ({ ...prev, [field]: 'Processing PDF...' }));
    try {
      const extractedText = await extractTextFromPDF(file);
      handleInputChange(field, extractedText);
      setUploadStatus(prev => ({ ...prev, [field]: 'PDF processed successfully' }));
      setTimeout(() => {
        setUploadStatus(prev => ({ ...prev, [field]: '' }));
      }, 3000);
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [field]: 'Failed to process PDF. Please try again.' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.idealAnswer.trim() || !formData.studentAnswer.trim()) {
      return;
    }

    onSubmit(formData);
  };

  const isFormValid = formData.question.trim() && formData.idealAnswer.trim() && formData.studentAnswer.trim();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-20 scale-105"></div>
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden card-3d">
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-white/10 p-3 rounded-full mr-4 pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Super Intelligence Analysis</h2>
                  <p className="text-blue-200 mt-1">PhD-level AI that detects wrong ideal answers and corrects teachers</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">🎯 Question-Based Analysis</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">📚 Teacher Error Detection</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">✨ Factual Accuracy</span>
              </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 flex items-start shadow-lg scale-in">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-red-700 mt-1">{error}</p>
                {error.includes('API key') && (
                  <p className="text-red-600 text-sm mt-2">
                    Please ensure your VITE_GEMINI_API_KEY is properly configured in your .env file.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4 slide-up">
            <label htmlFor="question" className="block text-lg font-bold text-gray-900 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-600" />
              Question <span className="text-red-500 ml-1">*</span>
            </label>
            
            <div className="space-y-6">
              <textarea
                id="question"
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-y text-lg bg-gray-50/50 hover:bg-white"
                placeholder="Enter the question that was asked..."
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                required
              />

              <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-300 bg-blue-50/30 hover:bg-blue-50/50">
                <input
                  ref={questionFileRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'question');
                  }}
                  className="hidden"
                />
                
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Optional: Upload PDF for question
                </p>
                <button
                  type="button"
                  onClick={() => questionFileRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose PDF
                </button>
                
                {uploadStatus.question && (
                  <p className="mt-3 text-sm text-blue-600 font-medium">{uploadStatus.question}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 slide-up delay-200">
            <label htmlFor="idealAnswer" className="block text-lg font-bold text-gray-900 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
              Ideal Answer (Teacher's Answer) <span className="text-red-500 ml-1">*</span>
            </label>
            
            <div className="space-y-6">
              <textarea
                id="idealAnswer"
                rows={5}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-y text-lg bg-gray-50/50 hover:bg-white"
                placeholder="Enter the ideal/expected answer..."
                value={formData.idealAnswer}
                onChange={(e) => handleInputChange('idealAnswer', e.target.value)}
                required
              />

              <div className="border-2 border-dashed border-green-200 rounded-xl p-6 text-center hover:border-green-400 transition-all duration-300 bg-green-50/30 hover:bg-green-50/50">
                <input
                  ref={idealAnswerFileRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'idealAnswer');
                  }}
                  className="hidden"
                />
                
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Optional: Upload PDF for ideal answer (teacher's answer)
                </p>
                <button
                  type="button"
                  onClick={() => idealAnswerFileRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose PDF
                </button>
                
                {uploadStatus.idealAnswer && (
                  <p className="mt-3 text-sm text-green-600 font-medium">{uploadStatus.idealAnswer}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 slide-up delay-400">
            <label htmlFor="studentAnswer" className="block text-lg font-bold text-gray-900 flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Student Answer <span className="text-red-500 ml-1">*</span>
            </label>
            
            <div className="space-y-6">
              <textarea
                id="studentAnswer"
                rows={5}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-y text-lg bg-gray-50/50 hover:bg-white"
                placeholder="Enter the student's answer..."
                value={formData.studentAnswer}
                onChange={(e) => handleInputChange('studentAnswer', e.target.value)}
                required
              />

              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition-all duration-300 bg-purple-50/30 hover:bg-purple-50/50">
                <input
                  ref={studentAnswerFileRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'studentAnswer');
                  }}
                  className="hidden"
                />
                
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Optional: Upload PDF for student answer
                </p>
                <button
                  type="button"
                  onClick={() => studentAnswerFileRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose PDF
                </button>
                
                {uploadStatus.studentAnswer && (
                  <p className="mt-3 text-sm text-purple-600 font-medium">{uploadStatus.studentAnswer}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 slide-up delay-600">
            <input
              id="useAdvancedRubric"
              type="checkbox"
              checked={formData.useAdvancedRubric}
              onChange={(e) => handleInputChange('useAdvancedRubric', e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
            />
            <label htmlFor="useAdvancedRubric" className="ml-4 text-lg font-semibold text-gray-800">
              🎓 Use super advanced marking logic (PhD-level analysis with detailed rubric criteria)
            </label>
          </div>

          <div className="pt-8 scale-in delay-800">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-2xl gradient-shift neon-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-6 w-6 mr-3" />
                  🧠 Super AI Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-6 w-6 mr-3" />
                  🚀 Analyze with Super Intelligence
                  <Sparkles className="h-6 w-6 ml-3" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}