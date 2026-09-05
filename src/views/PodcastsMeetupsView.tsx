import React, { useState } from 'react';
import {
  Mic,
  Calendar,
  Play,
  Pause,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Ticket,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  Radio,
  Bookmark,
  Award,
  Volume2,
  VolumeX,
  FileText,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PodcastEpisode, OfflineMeetup, LiveInteractionSession } from '../types';

export const PodcastsMeetupsView: React.FC = () => {
  const {
    podcasts,
    offlineMeetups,
    liveSessions,
    registerMeetup,
    registerLiveSession,
    submitLiveQuestion,
    setActiveTab,
    showToast
  } = useApp();

  // Active Sub Tab
  const [activeView, setActiveView] = useState<'PODCASTS' | 'MEETUPS' | 'LIVE'>('PODCASTS');

  // Podcast Player State
  const [playingEpisodeId, setPlayingEpisodeId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(25);
  const [selectedPodcastModal, setSelectedPodcastModal] = useState<PodcastEpisode | null>(null);

  // Live Q&A Question Input
  const [selectedLiveSession, setSelectedLiveSession] = useState<LiveInteractionSession | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');

  const activeEpisode = podcasts.find((p) => p.id === playingEpisodeId) || podcasts[0];

  const handleTogglePlay = (episodeId: string) => {
    if (playingEpisodeId === episodeId) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingEpisodeId(episodeId);
      setIsPlaying(true);
      setPlayerProgress(10);
      showToast(`Playing "${podcasts.find((p) => p.id === episodeId)?.title}"`);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLiveSession || !newQuestionText.trim()) return;
    submitLiveQuestion(selectedLiveSession.id, newQuestionText.trim());
    setNewQuestionText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-600 text-white rounded-xl shadow-xs">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Podcasts, Success Meetups & Live AMAs
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Real Tech Stories
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Learn how alumni cracked tier-1 startups, join local offline network meetups, and ask live questions to mentors
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveView('PODCASTS')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeView === 'PODCASTS'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Podcasts ({podcasts.length})</span>
          </button>
          <button
            onClick={() => setActiveView('MEETUPS')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeView === 'MEETUPS'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Offline Meetups ({offlineMeetups.length})</span>
          </button>
          <button
            onClick={() => setActiveView('LIVE')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeView === 'LIVE'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live AMAs ({liveSessions.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: PODCASTS SECTION */}
      {activeView === 'PODCASTS' && (
        <div className="space-y-6">
          {/* Featured Audio Player Bar */}
          {activeEpisode && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => handleTogglePlay(activeEpisode.id)}
                  className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0 cursor-pointer"
                >
                  {isPlaying && playingEpisodeId === activeEpisode.id ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                    Now Playing • {activeEpisode.category}
                  </span>
                  <h3 className="font-extrabold text-sm truncate">{activeEpisode.title}</h3>
                  <p className="text-xs text-slate-400 truncate">
                    {activeEpisode.guest} ({activeEpisode.guestRole})
                  </p>
                </div>
              </div>

              {/* Progress & Timing Bar */}
              <div className="w-full md:max-w-md space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>08:42</span>
                  <span>{activeEpisode.duration}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${playerProgress}%` }}
                  />
                </div>
              </div>

              {/* Player Controls & Transcript */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setSelectedPodcastModal(activeEpisode)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Key Takeaways</span>
                </button>
              </div>
            </div>
          )}

          {/* Episode Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {podcasts.map((ep) => {
              const isCurrent = playingEpisodeId === ep.id && isPlaying;

              return (
                <div
                  key={ep.id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                    isCurrent ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Top: Duration, Category, Play Button */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                        {ep.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ep.duration}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 mb-2 leading-snug">
                      {ep.title}
                    </h3>

                    {/* Guest Box */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                        {ep.guest.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{ep.guest}</p>
                        <p className="text-[11px] text-slate-500 truncate">{ep.guestRole}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {ep.description}
                    </p>

                    {/* Related Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(ep.skillsDiscussed || ep.relatedCareers || []).map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedPodcastModal(ep)}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-800 cursor-pointer"
                    >
                      View Notes & Highlights →
                    </button>
                    <button
                      onClick={() => handleTogglePlay(ep.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-700'
                      }`}
                    >
                      {isCurrent ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isCurrent ? 'Pause' : 'Listen'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: OFFLINE MEETUPS */}
      {activeView === 'MEETUPS' && (
        <div className="space-y-6">
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 text-white rounded-xl">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">SkillBridge Offline Passes</h3>
                <p className="text-[11px] text-slate-600">
                  RSVP to secure a seat at student-founder mixers. Confirmed entry passes are delivered automatically to your internal Mailbox.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('mailbox')}
              className="px-4 py-2 bg-white text-purple-700 hover:bg-purple-50 text-xs font-bold rounded-xl border border-purple-200 shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              Open Mailbox Tickets →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offlineMeetups.map((meetup) => (
              <div
                key={meetup.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & City */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                      {meetup.category}
                    </span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      {meetup.city}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 mb-2 leading-snug">
                    {meetup.title}
                  </h3>

                  {/* Guest & Venue Box */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-800">Speaker: {meetup.guest}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600">{meetup.date} • {meetup.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600 truncate">{meetup.venue}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {meetup.description}
                  </p>
                </div>

                {/* Seat Count & RSVP Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-purple-700">{meetup.seatsRemaining}</span>
                    <span className="text-slate-500"> seats left</span>
                  </div>

                  <button
                    onClick={() => registerMeetup(meetup.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      meetup.registered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{meetup.registered ? 'Pass Confirmed' : 'Book Free Seat'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: LIVE SESSIONS & Q&A */}
      {activeView === 'LIVE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase flex items-center gap-1 w-fit mb-2">
                      <Radio className="w-3 h-3 animate-pulse text-rose-600" /> Scheduled Live AMA
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{session.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Host: <span className="font-bold text-slate-800">{session.speaker}</span> ({session.speakerRole})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-500 block">{session.scheduledTime}</span>
                    <span className="text-[10px] text-purple-600 font-bold">{session.registeredAttendees} Registered</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {session.topic}
                </p>

                {/* Submitted Questions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                    Student Submitted Questions ({session.questionsSubmitted.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {session.questionsSubmitted.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-start justify-between gap-2"
                      >
                        <div>
                          <p className="text-slate-800 font-medium">{q.question}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">Asked by {q.studentName}</span>
                        </div>
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <ThumbsUp className="w-3 h-3" /> {q.votes}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit New Question */}
                <form
                  onSubmit={(e) => {
                    setSelectedLiveSession(session);
                    handleQuestionSubmit(e);
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-slate-100"
                >
                  <input
                    type="text"
                    placeholder="Submit a question for the speaker..."
                    value={selectedLiveSession?.id === session.id ? newQuestionText : ''}
                    onFocus={() => setSelectedLiveSession(session)}
                    onChange={(e) => {
                      setSelectedLiveSession(session);
                      setNewQuestionText(e.target.value);
                    }}
                    className="flex-1 p-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={selectedLiveSession?.id === session.id && !newQuestionText.trim()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask</span>
                  </button>
                </form>

                {/* RSVP Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Live stream link will appear in your Mailbox.</span>
                  <button
                    type="button"
                    onClick={() => registerLiveSession(session.id)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      session.registered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-900 text-white hover:bg-purple-600'
                    }`}
                  >
                    {session.registered ? 'Registered ✓' : 'Register for Session'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PODCAST TAKEAWAYS MODAL */}
      {selectedPodcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Episode Takeaways & Transcript Notes
                </h3>
              </div>
              <button
                onClick={() => setSelectedPodcastModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{selectedPodcastModal.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Guest: {selectedPodcastModal.guest} ({selectedPodcastModal.guestRole})
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Key Insights
                </h5>
                <ul className="space-y-2">
                  {selectedPodcastModal.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Transcript Highlight
                </h5>
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-slate-700 italic leading-relaxed">
                  "{selectedPodcastModal.transcriptSnippet}"
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPodcastModal(null)}
                  className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
                >
                  Close Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
