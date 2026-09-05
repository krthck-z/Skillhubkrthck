import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Share2,
  FolderGit2,
  Briefcase,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MoreVertical,
  ChevronRight,
  Smile,
  X,
  FileText,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConversationType, ChatConversation, ChatMessageAttachment } from '../types';

export const MessagesView: React.FC = () => {
  const {
    chatConversations,
    activeConversationId,
    setActiveConversationId,
    sendChatMessage,
    markConversationAsRead,
    hubProjects,
    opportunities,
    setActiveTab,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [inputText, setInputText] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isShareOppModalOpen, setIsShareOppModalOpen] = useState(false);
  const [isAttachFileModalOpen, setIsAttachFileModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active conversation object
  const activeConversation = useMemo(() => {
    return chatConversations.find((c) => c.id === activeConversationId) || chatConversations[0] || null;
  }, [chatConversations, activeConversationId]);

  // Mark as read when active conversation changes
  useEffect(() => {
    if (activeConversation && activeConversation.unreadCount > 0) {
      markConversationAsRead(activeConversation.id);
    }
  }, [activeConversationId, activeConversation?.unreadCount]);

  // Scroll to bottom of message stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  // Filtered conversation list
  const filteredConversations = useMemo(() => {
    return chatConversations.filter((c) => {
      if (filterType !== 'ALL') {
        if (filterType === 'STUDENT' && c.type !== 'STUDENT_STUDENT') return false;
        if (filterType === 'COMPANY' && c.type !== 'STUDENT_COMPANY') return false;
        if (filterType === 'MENTOR' && c.type !== 'STUDENT_MENTOR') return false;
        if (filterType === 'INSTITUTION' && c.type !== 'STUDENT_INSTITUTION') return false;
        if (filterType === 'TEAM' && c.type !== 'PROJECT_TEAM' && c.type !== 'STARTUP_TEAM') return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.participantName.toLowerCase().includes(q) ||
          c.participantRole.toLowerCase().includes(q) ||
          c.participantOrg.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [chatConversations, filterType, searchQuery]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendChatMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const handleSendProjectInvite = (projectTitle: string) => {
    if (!activeConversation) return;
    sendChatMessage(
      activeConversation.id,
      `I would like to invite you to collaborate on our project: ${projectTitle}`,
      {
        type: 'PROJECT_INVITE',
        title: projectTitle,
        subtitle: 'Official SkillBridge Project Collaboration',
        linkTab: 'projects'
      }
    );
    setIsInviteModalOpen(false);
    showToast(`Project invitation sent!`);
  };

  const handleShareOpportunity = (oppTitle: string, compName: string) => {
    if (!activeConversation) return;
    sendChatMessage(
      activeConversation.id,
      `Check out this verified opening at ${compName}: ${oppTitle}`,
      {
        type: 'OPPORTUNITY_SHARE',
        title: oppTitle,
        subtitle: `${compName} • Sourced via SkillBridge`,
        linkTab: 'opportunities'
      }
    );
    setIsShareOppModalOpen(false);
    showToast(`Opportunity shared in chat!`);
  };

  const handleAttachDocument = (docName: string) => {
    if (!activeConversation) return;
    sendChatMessage(activeConversation.id, `Shared document: ${docName}`, {
      type: 'DOCUMENT',
      title: docName,
      subtitle: 'Verified Skill & Project Artifact'
    });
    setIsAttachFileModalOpen(false);
    showToast(`Document attached!`);
  };

  const getConversationBadge = (type: ConversationType) => {
    switch (type) {
      case 'STUDENT_STUDENT':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Peer</span>;
      case 'STUDENT_COMPANY':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Recruiter</span>;
      case 'STUDENT_MENTOR':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Mentor</span>;
      case 'STUDENT_INSTITUTION':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Institution</span>;
      case 'PROJECT_TEAM':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Project Team</span>;
      case 'STARTUP_TEAM':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Startup Team</span>;
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Top Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Direct Messages & Real-Time Chat
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Instant peer-to-peer and stakeholder collaboration. Connect directly with students, recruiters, faculty mentors, institutional placement coordinators, and hackathon project teammates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('mailbox')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Switch to Formal Mailbox</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Layout Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Conversation Directory */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          
          {/* Search Box */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations, peers, mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-0.5 no-scrollbar text-xs">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'STUDENT', label: 'Students' },
                { id: 'COMPANY', label: 'Companies' },
                { id: 'MENTOR', label: 'Mentors' },
                { id: 'INSTITUTION', label: 'Colleges' },
                { id: 'TEAM', label: 'Teams' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterType(pill.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filterType === pill.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations Scroll List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[580px]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">No active conversations found</p>
                <p className="text-[11px] text-slate-400">Discover peers or companies to start chatting.</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = activeConversation?.id === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-3.5 transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-white shadow-xs border-l-4 border-indigo-600'
                        : 'hover:bg-slate-100/70'
                    }`}
                  >
                    {/* Avatar & Online Dot */}
                    <div className="relative shrink-0">
                      <img
                        src={conv.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={conv.participantName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <span
                        className={`w-2.5 h-2.5 rounded-full ring-2 ring-white absolute -bottom-0.5 -right-0.5 ${
                          conv.onlineStatus === 'ONLINE'
                            ? 'bg-emerald-500'
                            : conv.onlineStatus === 'AWAY'
                            ? 'bg-amber-500'
                            : 'bg-slate-300'
                        }`}
                        title={conv.onlineStatus}
                      />
                    </div>

                    {/* Meta & snippet */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate">
                          {conv.participantName}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getConversationBadge(conv.type)}
                        <span className="text-[11px] text-slate-500 truncate">
                          {conv.participantOrg}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 truncate leading-tight">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread Pill */}
                    {conv.unreadCount > 0 && (
                      <span className="shrink-0 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation Stream & Composer */}
        <div className="lg:col-span-8 flex flex-col h-full bg-slate-50/20">
          
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 px-6 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeConversation.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={activeConversation.participantName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full ring-2 ring-white absolute -bottom-0.5 -right-0.5 ${
                        activeConversation.onlineStatus === 'ONLINE'
                          ? 'bg-emerald-500'
                          : activeConversation.onlineStatus === 'AWAY'
                          ? 'bg-amber-500'
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900">
                        {activeConversation.participantName}
                      </h3>
                      {getConversationBadge(activeConversation.type)}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {activeConversation.participantRole} • <span className="font-semibold">{activeConversation.participantOrg}</span>
                    </p>
                  </div>
                </div>

                {/* Header Action Shortcuts */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Invite to Project</span>
                  </button>

                  <button
                    onClick={() => setIsShareOppModalOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    <span>Share Opportunity</span>
                  </button>
                </div>
              </div>

              {/* Message History Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/40">
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-slate-200/70 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Official SkillBridge Direct Channel
                  </span>
                </div>

                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
                      {!msg.isMe && (
                        <img
                          src={activeConversation.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                          alt={msg.senderName}
                          className="w-6 h-6 rounded-lg object-cover mb-1 shrink-0"
                        />
                      )}

                      <div
                        className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                          msg.isMe
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Interactive Attachments */}
                        {msg.attachment && (
                          <div
                            className={`mt-2.5 p-3 rounded-xl border text-xs space-y-1.5 ${
                              msg.isMe
                                ? 'bg-indigo-700/60 border-indigo-500 text-white'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 font-bold">
                              {msg.attachment.type === 'PROJECT_INVITE' ? (
                                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                              ) : msg.attachment.type === 'OPPORTUNITY_SHARE' ? (
                                <Briefcase className="w-4 h-4 text-purple-400" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-400" />
                              )}
                              <span>{msg.attachment.title}</span>
                            </div>

                            {msg.attachment.subtitle && (
                              <p className={`text-[11px] ${msg.isMe ? 'text-indigo-100' : 'text-slate-500'}`}>
                                {msg.attachment.subtitle}
                              </p>
                            )}

                            {msg.attachment.linkTab && (
                              <button
                                onClick={() => setActiveTab(msg.attachment!.linkTab!)}
                                className={`inline-flex items-center gap-1 text-[11px] font-bold underline pt-1 ${
                                  msg.isMe ? 'text-white hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-700'
                                }`}
                              >
                                <span>Open in {msg.attachment.linkTab}</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[9px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer Footer */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Attachment trigger */}
                    <button
                      type="button"
                      onClick={() => setIsAttachFileModalOpen(true)}
                      className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Attach Document or Artifact"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsInviteModalOpen(true)}
                      className="sm:hidden p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Invite to Project"
                    >
                      <FolderGit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsShareOppModalOpen(true)}
                      className="sm:hidden p-2.5 rounded-xl text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                      title="Share Opportunity"
                    >
                      <Briefcase className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder={`Message ${activeConversation.participantName}...`}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                    <span>Press Enter to send • Local prototype state maintained</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>SkillBridge Protected Messaging</span>
                    </span>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Select a conversation</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Choose a peer, mentor, or company from the left panel to review messages and collaborate.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: Invite to Project */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Invite to Project Hub</h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select one of your active projects to send an official invitation card to <strong className="text-slate-900">{activeConversation?.participantName}</strong>:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {hubProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSendProjectInvite(p.title)}
                  className="p-3 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl cursor-pointer transition-all space-y-1"
                >
                  <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</p>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-600 font-semibold pt-1">
                    <span>{p.category}</span>
                    <span>•</span>
                    <span>{p.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Share Opportunity */}
      {isShareOppModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Share Verified Opportunity</h3>
              </div>
              <button
                onClick={() => setIsShareOppModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select a recommended job or internship to share with <strong className="text-slate-900">{activeConversation?.participantName}</strong>:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {opportunities.slice(0, 5).map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => handleShareOpportunity(opp.title, opp.company)}
                  className="p-3 bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 rounded-2xl cursor-pointer transition-all space-y-1"
                >
                  <h4 className="text-xs font-bold text-slate-900">{opp.title}</h4>
                  <p className="text-[11px] text-slate-500">{opp.company} • {opp.location}</p>
                  <div className="flex items-center gap-2 text-[10px] text-purple-600 font-semibold pt-1">
                    <span>{opp.stipendOrSalary}</span>
                    <span>•</span>
                    <span>{opp.workMode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Attach File / Document */}
      {isAttachFileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Attach Verified Credential / Artifact</h3>
              </div>
              <button
                onClick={() => setIsAttachFileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Karthik_Peetla_Skill_Passport.pdf', desc: 'Verified proctored scorecards & Git defenses' },
                { name: 'React_Component_State_Viva_Defense.mp4', desc: 'Recorded code walk-through' },
                { name: 'Kisan_Mitra_Telugu_Voice_Model_Specs.pdf', desc: 'Architecture & latency benchmarks' },
                { name: 'SSBN_Official_Semester_Marksheet.pdf', desc: 'Autonomous grade transcripts' }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAttachDocument(doc.name)}
                  className="p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-2xl cursor-pointer transition-all space-y-1"
                >
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
