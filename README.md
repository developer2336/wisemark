# MarkWise - AI-Powered Auto-Evaluation Platform

A professional, world-class web platform for teachers, recruiters, and trainers to analyze student or candidate answers using Super Intelligent Google Gemini AI that can detect and correct wrong ideal answers.

## 🚀 Features

- **Clean, Professional UI**: White background, modern design, fully mobile responsive
- **No Login Required**: Start evaluating immediately without registration
- **Super Intelligent AI Analysis**: Uses Google Gemini AI that analyzes answers based on factual accuracy, not just ideal answer comparison
- **Comprehensive Feedback**: Provides scores out of 10, detailed feedback, mistakes, and strengths
- **Question-Based Analysis**: AI judges answers based on the question itself, ensuring factual accuracy
- **Teacher Error Detection**: AI alerts teachers when their ideal answers are factually incorrect  
- **Ideal Answer Correction**: Provides factually correct answers when teacher's ideal answer is wrong
- **Advanced PDF Support**: Upload PDF files for questions, ideal answers, and student answers with text extraction
- **Advanced Rubric**: Optional advanced marking logic for detailed evaluation
- **Mobile-First Design**: Optimized for all device sizes with excellent UX

## 🛠️ Setup Instructions

### 1. Get Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## 🧠 How It Works

1. **Input**: Users provide a question, ideal answer, and student answer (text or PDF)
2. **Super Intelligent Analysis**: 
   - AI analyzes the question to understand what the factually correct answer should be
   - Verifies if the teacher's ideal answer is factually correct
   - If ideal answer is wrong, AI alerts the teacher and provides the factually correct answer
   - Evaluates student's answer based on factual accuracy, not just comparison with ideal answer
3. **Results**: Platform displays score, feedback, mistakes, strengths, and any ideal answer corrections
4. **Reset**: Users can evaluate new answers (no data persistence)

## 🤖 Super Intelligence Examples

- **Math Analysis**: Question "1+1?" - AI knows answer is "2". If teacher puts "4" as ideal but student says "2", AI flags teacher error and gives student full marks
- **Geography Intelligence**: Question "Capital of France?" - AI knows answer is "Paris". If teacher puts "London" but student says "Paris", AI corrects teacher and rewards student
- **Science Knowledge**: Question "What is H2O?" - AI knows answer is "Water". If teacher puts "Carbon Dioxide" but student says "Water", AI detects teacher error and gives student full credit
- **Critical Thinking**: AI doesn't just compare answers - it understands the question and evaluates based on factual accuracy
- **Universal Knowledge**: Works across all subjects with PhD-level expertise to catch any factual errors

## 🎯 Use Cases

- **Teachers**: Grade student assignments with factual accuracy, get feedback, and receive corrections for their own mistakes
- **Recruiters**: Evaluate candidate responses in assessments
- **Trainers**: Assess trainee understanding and knowledge retention

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Pro API
- **Icons**: Lucide React
- **File Processing**: Advanced PDF text extraction for questions, ideal answers, and student responses

## 📱 Responsive Design

- Mobile-first approach with breakpoints for all screen sizes
- Clean typography with proper contrast ratios
- Generous spacing using 8px grid system
- Professional color scheme with accessibility in mind

## 🔒 Privacy & Security

- No user data storage or persistence
- Temporary evaluation results (cleared on refresh)
- Secure API communication with Google Gemini
- No login or personal information required

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

```bash
npm run build
```

## 📄 License

© 2025 markwise.itatmoz.com - Powered by IT Atmoz