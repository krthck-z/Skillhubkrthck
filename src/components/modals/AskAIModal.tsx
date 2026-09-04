import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, HelpCircle, BookOpen, Lightbulb, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  category?: string;
}

export const AskAIModal: React.FC = () => {
  const { isAskAIOpen, setIsAskAIOpen, profile, skills } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${profile.name}! I am your SkillBridge AI Career & Doubt Mentor.\n\nI can explain complex programming concepts, guide you through React or Node.js skill gaps, provide Viva preparation questions, or analyze your readiness for Full Stack Developer roles.\n\nHow can I help your learning journey today?`,
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isAskAIOpen) return null;

  const quickPrompts = [
    'Explain React useEffect cleanup with an example',
    'What are the key differences between SQL & NoSQL for full stack?',
    'How do I answer viva questions on Git merge conflicts?',
    'Why is my career readiness 72% and how do I improve it?',
    'What should I bring to the Anantapur Offline Assessment?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Generate intelligent educational response
    setTimeout(() => {
      let responseText = '';
      const lower = q.toLowerCase();

      if (lower.includes('useeffect') || lower.includes('cleanup')) {
        responseText = `### Understanding React useEffect Cleanup Functions\n\nWhen a component mounts or dependencies update, your \`useEffect\` callback runs. If your effect sets up subscriptions, timers, or event listeners, failing to clean them up causes memory leaks and stale state updates.\n\n**Pattern Example:**\n\`\`\`javascript\nuseEffect(() => {\n  const timer = setInterval(() => console.log('Ping'), 1000);\n  \n  // Cleanup function returned here:\n  return () => clearInterval(timer);\n}, []);\n\`\`\`\n\n**Viva Defense Tip:** When asked why React 19 runs effects twice in StrictMode development, explain that React intentionally simulates mount-unmount-remount to ensure your cleanup function is 100% resilient!`;
      } else if (lower.includes('sql') || lower.includes('nosql')) {
        responseText = `### SQL vs NoSQL: Practical Full Stack Tradeoffs\n\n1. **SQL (Relational - PostgreSQL/MySQL):**\n   - ACID transactions, strict schemas, foreign keys, normalized relationships.\n   - Best for e-commerce orders, user permissions, banking, and data where integrity is paramount.\n\n2. **NoSQL (Document - MongoDB):**\n   - Flexible schemas, horizontal scaling, rapid nested JSON querying.\n   - Best for fast prototyping, telemetry logs, or content management systems.\n\n**For Full Stack Developer Target:** Mastering PostgreSQL joins, indexing strategies (B-Trees), and transactions gives you the highest industry capability score in technical assessments.`;
      } else if (lower.includes('viva') || lower.includes('conflict') || lower.includes('git')) {
        responseText = `### How to Defend Git Merge Conflicts in a Viva\n\n1. **Acknowledge the Root Cause:** "A merge conflict occurs when two different branches have modified the exact same lines in a file, or one deleted a file that another modified."\n2. **State the Resolution Procedure:**\n   - Identify conflicted files via \`git status\`.\n   - Open files, inspect the conflict markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`).\n   - Communicate with the collaborating author, synthesize correct code.\n   - Stage changes via \`git add <file>\` and finalize with \`git commit\`.\n3. **Senior Insight:** Mention you test branch builds before pushing and prefer interactive rebase (\`git rebase -i\`) for a linear history.`;
      } else if (lower.includes('readiness') || lower.includes('score') || lower.includes('72%')) {
        responseText = `### Career Readiness Diagnostic for ${profile.name}\n\nYour target role is **Full Stack Developer** (Current: **72%**):\n\n- **Skills Score (75%):** Python & SQL are proven, but React has a 35% gap and Node.js has an 80% gap.\n- **Assessment Score (80%):** You scored 92% on offline Python. Passing the online React Assessment will raise this.\n- **Practical Proof (65%):** You need 1 more end-to-end full stack project repository.\n- **Experience (55%):** Joining a student startup (like AI Agriculture Assistant) will boost this by +25 points!\n\n**Next Best Action:** Complete the React Practical Coding assessment or book the proctored test at Anantapur Centre.`;
      } else if (lower.includes('offline') || lower.includes('anantapur') || lower.includes('bring')) {
        responseText = `### SkillBridge Assessment Centre Anantapur Guide\n\n- **Location:** Court Road, Anantapur, Andhra Pradesh.\n- **Format:** 90-minute closed-environment physical terminal test + 10-minute oral viva.\n- **What to bring:**\n  1. College Photo ID (SSBN College) or Govt ID (Aadhaar)\n  2. Assessment Booking confirmation (from your SkillBridge Mailbox)\n  3. Blue/black ballpoint pen for scratch algorithms\n\n*Note:* Offline proctored assessments provide the strongest evidence confidence (HIGH) for direct employer hiring.`;
      } else {
        responseText = `### AI Educational Guidance: ${q}\n\nTo build proven capability around this concept:\n\n1. **Core Concept:** Break the problem down into primitives before writing code.\n2. **Practical Defense:** What are the edge cases? (e.g. network latency, null pointers, state drift).\n3. **Industry Alignment:** Employers look for how well you can articulate the tradeoffs you made.\n\nWould you like me to recommend a learning module or test your knowledge with a mock viva question?`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl h-[620px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Ask AI: Doubt Resolution & Viva Coach</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Concept Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Helps you understand & defend skills • Never generates copy-paste answers during tests
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAskAIOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl p-3.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs whitespace-pre-wrap'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                  KP
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-500 italic text-xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span>Analyzing concept and synthesizing structured explanation...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-200 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> Suggestions:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-full whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a technical concept, code question, or viva defense inquiry..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-100/90 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white text-slate-800"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>

      </div>
    </div>
  );
};
