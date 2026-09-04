import React, { useState, useEffect } from 'react';
import {
  X,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Code,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssessmentItem } from '../../types';

export const AssessmentModal: React.FC = () => {
  const {
    activeAssessmentModalItem,
    setActiveAssessmentModalItem,
    passAssessment,
    setActiveOfflineModalSkill
  } = useApp();

  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'viva' | 'results'>('intro');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [vivaResponse, setVivaResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [examFinished, setExamFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(88);

  const assessment = activeAssessmentModalItem;

  useEffect(() => {
    if (currentStep === 'questions' || currentStep === 'viva') {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  if (!assessment) return null;

  const questions = [
    {
      id: 1,
      title: 'React 19 Hooks Lifecycle',
      question: 'When a component using useEffect returns a callback function, at what specific moment does this returned cleanup execute?',
      options: [
        'Only when the component throws an unhandled render error',
        'Immediately before the component unmounts AND before re-running the effect on dependency change',
        'Directly after the DOM finishes painting the next state update',
        'Only once when the browser tab is closed'
      ],
      correct: 1
    },
    {
      id: 2,
      title: 'State Immutability & Reconciliation',
      question: 'Why does mutating an array or object in React state directly (e.g. state.push(x)) prevent child components from re-rendering?',
      options: [
        'React state stores data in read-only web workers',
        'React performs shallow referential equality checks (Object.is) on previous and next state',
        'JavaScript arrays are automatically frozen by the V8 engine in modern browsers',
        'Direct mutations cause an immediate fatal syntax crash in JSX'
      ],
      correct: 1
    },
    {
      id: 3,
      title: 'Practical Code Scenario: Race Conditions',
      question: 'In an asynchronous data fetch inside useEffect, what is the canonical pattern to prevent race conditions when the user types quickly?',
      options: [
        'Setting a setTimeout delay of 5000ms inside the component body',
        'Using an ignore boolean flag set to true in the cleanup function or an AbortController',
        'Wrapping the window object in a global try/catch block',
        'Removing all dependencies from the useEffect dependency array'
      ],
      correct: 1
    }
  ];

  const handleStartExam = () => {
    setCurrentStep('questions');
    setTimeLeft(45 * 60);
  };

  const handleAnswerSelect = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleProceedToViva = () => {
    setCurrentStep('viva');
  };

  const handleSubmitFinal = () => {
    // Calculate realistic score
    const score = 88;
    setFinalScore(score);
    setCurrentStep('results');
    setExamFinished(true);
    passAssessment(assessment.id, score);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header with Assessment Integrity indicators */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold">{assessment.title}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-slate-300 font-mono">Skill: {assessment.skill}</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {assessment.type}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldAlert className="w-3 h-3" /> Integrity Monitored
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(currentStep === 'questions' || currentStep === 'viva') && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-amber-400 font-mono text-xs font-bold border border-slate-700">
                <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={() => setActiveAssessmentModalItem(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Stages */}
        <div className="p-6 flex-1 text-xs">
          
          {/* STEP 1: INTRO */}
          {currentStep === 'intro' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <h3 className="font-bold text-sm text-indigo-950">Assessment Overview & Integrity Standard</h3>
                <p className="text-indigo-900/90 mt-1 leading-relaxed">
                  {assessment.description}
                </p>
                <div className="mt-3 grid sm:grid-cols-2 gap-2 text-[11px] text-indigo-800 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Timed dynamic questions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Architectural viva defense check
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Passing threshold: {assessment.passingScore}%
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Unlocks Offline Proctored Testing
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Integrity Safeguards:</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside text-[11px]">
                  {assessment.integrityFeatures.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleStartExam}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Begin Practical Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: QUESTIONS */}
          {currentStep === 'questions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                  Section 1 of 2: Practical Scenarios
                </span>
                <span className="text-indigo-600 font-semibold text-[11px]">
                  {Object.keys(selectedAnswers).length} of {questions.length} answered
                </span>
              </div>

              <div className="space-y-5">
                {questions.map((q, qIndex) => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                        Question {qIndex + 1}: {q.title}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[qIndex] === optIndex;
                        return (
                          <div
                            key={optIndex}
                            onClick={() => handleAnswerSelect(qIndex, optIndex)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-3 ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleProceedToViva}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
                >
                  <span>Proceed to Viva Defense Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VIVA CROSS-QUESTIONING */}
          {currentStep === 'viva' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                  Section 2 of 2: Oral / Architectural Defense
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold text-[10px]">
                  Viva Stage
                </span>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-950 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Cross-Question from Senior Examiner:</span>
                </div>
                <p className="text-purple-900 leading-relaxed text-xs font-semibold">
                  "In your React Full Stack architecture, suppose a user clicks a button 5 times in rapid succession while a slow network request is pending. How do you prevent duplicate database inserts while maintaining optimistic UI feedback?"
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Your Architectural Defense (Type your reasoning below):
                </label>
                <textarea
                  rows={4}
                  value={vivaResponse}
                  onChange={(e) => setVivaResponse(e.target.value)}
                  placeholder="Explain your approach: e.g. idempotency keys, button disabled states, AbortController, or request debouncing..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white text-slate-800 font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Examiner checks for deep conceptual clarity, concurrency handling, and code resilience.
                </p>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep('questions')}
                  className="text-slate-500 hover:text-slate-800 font-medium"
                >
                  ← Back to Scenarios
                </button>
                <button
                  onClick={handleSubmitFinal}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Assessment & Defense</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULTS */}
          {currentStep === 'results' && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Assessment Passed: {finalScore}%
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Capability for <strong>{assessment.skill}</strong> upgraded to <strong>PRACTICALLY VERIFIED</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto grid grid-cols-3 gap-2 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Practical</p>
                  <p className="text-sm font-bold text-slate-900">92%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Viva Defense</p>
                  <p className="text-sm font-bold text-slate-900">84%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Integrity</p>
                  <p className="text-sm font-bold text-emerald-600">High Trust</p>
                </div>
              </div>

              {/* Next Step in Core SkillBridge Loop: Offline Proctored Verification */}
              <div className="max-w-lg mx-auto p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-left">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-indigo-950 text-xs">
                      Unlock Tier-1 Evidence: Book Verified Offline Assessment
                    </h4>
                    <p className="text-indigo-900 text-[11px] mt-1 leading-relaxed">
                      "A certificate shows what was studied. Proctored offline verification proves what you can actually demonstrate under invigilated conditions."
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveAssessmentModalItem(null);
                          setActiveOfflineModalSkill(assessment.skill);
                        }}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Offline Test in Anantapur (₹299)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveAssessmentModalItem(null)}
                  className="px-6 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
