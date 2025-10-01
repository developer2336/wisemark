import { EvaluationRequest, EvaluationResult } from '../types';

// Use the currently supported Gemini model
const GEMINI_MODEL = 'gemini-2.0-flash-exp';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const evaluateAnswer = async (request: EvaluationRequest): Promise<EvaluationResult> => {
  const apiKey = "AIzaSyBqN9hRjfX8lPhARFr6n8MoolSUqcl6WHc";

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemContext = request.useAdvancedRubric
    ? `You are a SUPER INTELLIGENT academic evaluator and teacher assistant with PhD-level expertise across all subjects. Your job is to:
    1. FIRST analyze if the provided "ideal answer" is actually correct
    2. If the ideal answer is wrong, provide the correct answer and alert the teacher
    3. Then evaluate the student's answer against the CORRECT answer (not the potentially wrong ideal answer)
    4. Use advanced rubric criteria: accuracy, depth, clarity, structure, and critical thinking
    5. Be extremely thorough and catch any errors in the teacher's provided materials`
    : `You are a SUPER INTELLIGENT teacher assistant with expertise across all academic subjects. Your primary responsibilities:
    1. CRITICALLY EXAMINE the provided "ideal answer" for accuracy and correctness
    2. If you detect the ideal answer is incorrect, immediately flag this and provide the correct answer
    3. Evaluate the student's answer against the ACTUALLY CORRECT answer
    4. Provide constructive, intelligent feedback that helps both student and teacher
    5. Act as a quality control system to prevent propagation of incorrect information`;

  const evaluationPrompt = `
${systemContext}

CRITICAL INSTRUCTION: You are a SUPER INTELLIGENT AI that must verify the correctness of the teacher's "ideal answer" before evaluating the student.

---

Question: ${request.question}

Teacher's Provided "Ideal Answer": ${request.idealAnswer}

Student's Answer: ${request.studentAnswer}

---

EVALUATION PROCESS:
1. FIRST: Analyze if the teacher's "ideal answer" is factually correct for the given question
2. If the ideal answer is WRONG, flag it and provide the correct answer
3. Then evaluate the student's answer against the CORRECT answer (not the wrong ideal answer)
4. Provide comprehensive feedback

RESPOND STRICTLY IN THIS JSON FORMAT (no code blocks, no extra text):

{
  "idealAnswerCorrection": {
    "isIncorrect": true/false,
    "suggestedCorrection": "correct answer if ideal answer is wrong, empty string if correct",
    "explanation": "explanation of why ideal answer is wrong, empty string if correct"
  },
  "teacherAlert": "alert message for teacher if ideal answer is wrong, empty string if correct",
  "score": 0-10,
  "feedback": "comprehensive 2-3 sentence feedback based on CORRECT answer",
  "mistakes": ["mistake 1", "mistake 2", "mistake 3"],
  "strengths": ["strength 1", "strength 2", "strength 3"]
}

EXAMPLES OF SUPER INTELLIGENT BEHAVIOR:
- If question is "1+1?" and ideal answer is "4" but student says "2", you should flag ideal answer as wrong and give student full marks
- If question is "Capital of France?" and ideal answer is "London" but student says "Paris", flag ideal answer and give student full marks
- If question is "What is H2O?" and ideal answer is "Carbon Dioxide" but student says "Water", flag ideal answer and give student full marks
- Always prioritize factual accuracy over blind adherence to provided "ideal" answers

BE EXTREMELY THOROUGH AND INTELLIGENT. CATCH ALL ERRORS.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: evaluationPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.1, // Lower temperature for more consistent, factual responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048, // Increased for detailed analysis
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Gemini API error: ${errorMessage}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!rawText) {
      throw new Error('Gemini returned no content.');
    }

    // Extract JSON object from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Super Intelligent Analysis Failed: No valid JSON found in Gemini API response.');
    }

    let result;
    try {
      result = JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('Super Intelligent Analysis Failed: JSON parsing failed.');
    }

    // Ensure all required fields exist with proper defaults
    const evaluationResult: EvaluationResult = {
      score: Math.round((result.score || 0) * 10) / 10,
      feedback: result.feedback || 'No feedback provided.',
      mistakes: Array.isArray(result.mistakes) ? result.mistakes.filter(m => m && m.trim()) : [],
      strengths: Array.isArray(result.strengths) ? result.strengths.filter(s => s && s.trim()) : [],
    };

    // Add ideal answer correction if present
    if (result.idealAnswerCorrection) {
      evaluationResult.idealAnswerCorrection = {
        isIncorrect: result.idealAnswerCorrection.isIncorrect || false,
        suggestedCorrection: result.idealAnswerCorrection.suggestedCorrection || '',
        explanation: result.idealAnswerCorrection.explanation || ''
      };
    }

    // Add teacher alert if present
    if (result.teacherAlert && result.teacherAlert.trim()) {
      evaluationResult.teacherAlert = result.teacherAlert.trim();
    }

    return evaluationResult;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid Gemini API key. Please check your .env file.');
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Try again later.');
      }
      if (error.message.includes('BLOCKED')) {
        throw new Error('Gemini blocked the content. Rephrase your input.');
      }
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred during super intelligent analysis.');
  }
};