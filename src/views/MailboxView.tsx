import React, { useState, useMemo } from 'react';
import {
  Mail,
  Inbox,
  Send,
  Star,
  Archive,
  Trash2,
  FileText,
  Paperclip,
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Reply,
  Forward,
  AlertCircle,
  Tag,
  ShieldCheck,
  UserCheck,
  Plus,
  RefreshCw,
  Download,
  ExternalLink,
  Eye,
  Bookmark,
  Sparkles,
  X,
  FileCheck,
  CornerDownRight,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MailMessage } from '../types';

type MailFolder = 'inbox' | 'sent' | 'drafts' | 'starred' | 'important' | 'archived' | 'trash';

export const MailboxView: React.FC = () => {
  const {
    role,
    mailMessages,
    markMailAsRead,
    markMailUnread,
    toggleStarMail,
    toggleImportantMail,
    archiveMail,
    trashMail,
    restoreMail,
    emptyTrash,
    deleteMail,
    sendMail,
    replyMail,
    forwardMail,
    contacts,
    mentors,
    setActiveTab,
    showToast
  } = useApp();

  // State
  const [activeFolder, setActiveFolder] = useState<MailFolder>('inbox');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeRecipient, setComposeRecipient] = useState('');
  const [composeRecipientRole, setComposeRecipientRole] = useState('');
  const [composeRecipientHandle, setComposeRecipientHandle] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeCategory, setComposeCategory] = useState<MailMessage['category']>('SYSTEM');
  const [composePriority, setComposePriority] = useState<'NORMAL' | 'HIGH' | 'URGENT'>('NORMAL');
  const [composeAttachments, setComposeAttachments] = useState<{ name: string; size: string; type: string }[]>([]);

  // Reply Box State
  const [replyText, setReplyText] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);
  const [forwardRecipient, setForwardRecipient] = useState('');
  const [forwardNote, setForwardNote] = useState('');

  // Selected Mail item
  const selectedMail = useMemo(() => {
    return mailMessages.find((m) => m.id === selectedMailId) || null;
  }, [mailMessages, selectedMailId]);

  // Counts
  const counts = useMemo(() => {
    const unreadInbox = mailMessages.filter((m) => (m.folder || 'inbox') === 'inbox' && !m.isRead).length;
    const totalInbox = mailMessages.filter((m) => (m.folder || 'inbox') === 'inbox').length;
    const starred = mailMessages.filter((m) => m.isStarred && m.folder !== 'trash').length;
    const important = mailMessages.filter((m) => m.isImportant && m.folder !== 'trash').length;
    const sent = mailMessages.filter((m) => m.folder === 'sent').length;
    const archived = mailMessages.filter((m) => m.folder === 'archived').length;
    const trash = mailMessages.filter((m) => m.folder === 'trash').length;
    return { unreadInbox, totalInbox, starred, important, sent, archived, trash };
  }, [mailMessages]);

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return mailMessages.filter((mail) => {
      // Folder filtering
      const folder = mail.folder || 'inbox';
      if (activeFolder === 'inbox') {
        if (folder !== 'inbox') return false;
      } else if (activeFolder === 'sent') {
        if (folder !== 'sent') return false;
      } else if (activeFolder === 'starred') {
        if (!mail.isStarred || folder === 'trash') return false;
      } else if (activeFolder === 'important') {
        if (!mail.isImportant || folder === 'trash') return false;
      } else if (activeFolder === 'archived') {
        if (folder !== 'archived') return false;
      } else if (activeFolder === 'trash') {
        if (folder !== 'trash') return false;
      } else if (activeFolder === 'drafts') {
        if (folder !== 'drafts') return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && mail.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSender = mail.sender.toLowerCase().includes(q);
        const matchHandle = mail.senderHandle?.toLowerCase().includes(q);
        const matchRecipient = mail.recipient?.toLowerCase().includes(q);
        const matchSubject = mail.subject.toLowerCase().includes(q);
        const matchBody = mail.body.toLowerCase().includes(q);
        return matchSender || matchHandle || matchRecipient || matchSubject || matchBody;
      }

      return true;
    });
  }, [mailMessages, activeFolder, selectedCategory, searchQuery]);

  // Handlers
  const handleOpenMail = (mail: MailMessage) => {
    setSelectedMailId(mail.id);
    if (!mail.isRead) {
      markMailAsRead(mail.id);
    }
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeRecipient || !composeSubject || !composeBody) {
      showToast('Please fill in recipient, subject, and message body.');
      return;
    }

    sendMail({
      recipient: composeRecipient,
      recipientRole: composeRecipientRole || 'SkillBridge Contact',
      recipientHandle: composeRecipientHandle || `@${composeRecipient.toLowerCase().replace(/\s+/g, '.')}`,
      subject: composeSubject,
      body: composeBody,
      category: composeCategory,
      priority: composePriority,
      attachments: composeAttachments
    });

    setIsComposeOpen(false);
    setComposeRecipient('');
    setComposeRecipientRole('');
    setComposeRecipientHandle('');
    setComposeSubject('');
    setComposeBody('');
    setComposeAttachments([]);
  };

  const handleSendReply = () => {
    if (!selectedMailId || !replyText.trim()) return;
    replyMail(selectedMailId, replyText.trim());
    setReplyText('');
  };

  const handleSendForward = () => {
    if (!selectedMailId || !forwardRecipient.trim()) return;
    forwardMail(selectedMailId, forwardRecipient.trim(), forwardNote.trim());
    setIsForwarding(false);
    setForwardRecipient('');
    setForwardNote('');
  };

  const handleAddSampleAttachment = () => {
    const sampleFiles = [
      { name: 'Karthik_SkillPassport_Verification.pdf', size: '310 KB', type: 'application/pdf' },
      { name: 'FullStack_Capstone_Architecture.png', size: '1.2 MB', type: 'image/png' },
      { name: 'Offline_Viva_Defense_Certificate.pdf', size: '185 KB', type: 'application/pdf' }
    ];
    const pick = sampleFiles[composeAttachments.length % sampleFiles.length];
    setComposeAttachments((prev) => [...prev, pick]);
    showToast(`Attached ${pick.name}`);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'OPPORTUNITY':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'MENTORSHIP':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'LOCAL_JOB':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'VERIFICATION':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PODCAST':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Context Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                SkillBridge Mailbox
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Encrypted Internal Mesh
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Direct, privacy-preserving communications with mentors, campus hiring leads, and startup teams
              </p>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          {role === 'industry' && (
            <button
              onClick={() => setActiveTab('industry')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>← Back to Industry Portal</span>
            </button>
          )}
          {role === 'institute' && (
            <button
              onClick={() => setActiveTab('academia')}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-200" />
              <span>← Back to Academia Portal</span>
            </button>
          )}
          <button
            id="refresh-mailbox-btn"
            onClick={() => showToast('Mailbox synced with SkillBridge network.')}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            id="compose-mail-btn"
            onClick={() => setIsComposeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-200 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Compose Message</span>
          </button>
        </div>
      </div>

      {/* Main Mailbox Grid Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* Left Sidebar Folders & Categories (3 cols on md+) */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="mail-search-input"
                type="text"
                placeholder="Search mail by subject, sender..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Folder Navigation */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Mailboxes
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'inbox', label: 'Inbox', icon: Inbox, count: counts.unreadInbox, total: counts.totalInbox },
                  { id: 'starred', label: 'Starred', icon: Star, count: counts.starred },
                  { id: 'important', label: 'Important', icon: Bookmark, count: counts.important },
                  { id: 'sent', label: 'Sent', icon: Send, count: counts.sent },
                  { id: 'drafts', label: 'Drafts', icon: FileText, count: 0 },
                  { id: 'archived', label: 'Archived', icon: Archive, count: counts.archived },
                  { id: 'trash', label: 'Trash', icon: Trash2, count: counts.trash }
                ].map((folder) => {
                  const Icon = folder.icon;
                  const isActive = activeFolder === folder.id;
                  return (
                    <button
                      key={folder.id}
                      id={`folder-tab-${folder.id}`}
                      onClick={() => {
                        setActiveFolder(folder.id as MailFolder);
                        setSelectedMailId(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{folder.label}</span>
                      </div>
                      {Boolean(folder.count && folder.count > 0) && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : folder.id === 'inbox'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {folder.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Categories Filter */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Filter by Category
              </p>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Categories' },
                  { id: 'OPPORTUNITY', label: 'Hiring & Internships' },
                  { id: 'MENTORSHIP', label: 'Mentors & Vivas' },
                  { id: 'LOCAL_JOB', label: 'Local Part-Time Gigs' },
                  { id: 'VERIFICATION', label: 'Assessments & Centers' },
                  { id: 'PODCAST', label: 'Meetups & Passes' },
                  { id: 'SYSTEM', label: 'System Announcements' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{cat.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy & Handle Footer Card */}
          <div className="mt-6 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5 text-slate-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Identity Guard Active</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
              Your public ID is <span className="font-mono font-bold text-indigo-600">@karthik.patel</span>. Phone numbers and private emails are never exposed.
            </p>
            <button
              onClick={() => setActiveTab('profile')}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Manage privacy settings →
            </button>
          </div>
        </div>

        {/* Right Area: Message List OR Conversation View (9 cols on md+) */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-white">
          {selectedMail ? (
            /* CONVERSATION / THREAD VIEW */
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
              {/* Top Action Bar */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <button
                    id="back-to-mail-list-btn"
                    onClick={() => setSelectedMailId(null)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getCategoryColor(selectedMail.category)}`}>
                    {selectedMail.category}
                  </span>
                  {selectedMail.priority === 'HIGH' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> High Priority
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStarMail(selectedMail.id)}
                    className="p-2 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                    title={selectedMail.isStarred ? 'Unstar' : 'Star'}
                  >
                    <Star className={`w-4 h-4 ${selectedMail.isStarred ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => toggleImportantMail(selectedMail.id)}
                    className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                    title={selectedMail.isImportant ? 'Mark Unimportant' : 'Mark Important'}
                  >
                    <Bookmark className={`w-4 h-4 ${selectedMail.isImportant ? 'text-indigo-600 fill-indigo-600' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      markMailUnread(selectedMail.id);
                      setSelectedMailId(null);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Mark as Unread"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  {selectedMail.folder !== 'archived' && (
                    <button
                      onClick={() => {
                        archiveMail(selectedMail.id);
                        setSelectedMailId(null);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                  {selectedMail.folder !== 'trash' ? (
                    <button
                      onClick={() => {
                        trashMail(selectedMail.id);
                        setSelectedMailId(null);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="Move to Trash"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          restoreMail(selectedMail.id);
                          setSelectedMailId(null);
                        }}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        Restore to Inbox
                      </button>
                      <button
                        onClick={() => {
                          deleteMail(selectedMail.id);
                          setSelectedMailId(null);
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thread Content */}
              <div className="p-6 space-y-6 flex-1">
                {/* Subject Header */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                    {selectedMail.subject}
                  </h2>

                  {/* Sender Profile Header Box */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center border border-indigo-200 shrink-0">
                        {selectedMail.sender.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {selectedMail.sender}
                          </span>
                          {selectedMail.senderVerified && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                          <span className="text-xs font-mono text-indigo-600 font-medium">
                            {selectedMail.senderHandle || '@internal.user'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {selectedMail.senderRole || 'SkillBridge Member'} • to{' '}
                          <span className="font-medium text-slate-700">{selectedMail.recipient || 'Karthik Patel'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-mono sm:justify-end">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMail.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Message Body */}
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-white p-5 rounded-xl border border-slate-100 shadow-2xs font-normal">
                  {selectedMail.body}
                </div>

                {/* Interactive Action Card if mail has actionLabel */}
                {selectedMail.actionLabel && selectedMail.actionView && (
                  <div className="p-4 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 rounded-xl border border-indigo-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-600 text-white rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Related Action</h4>
                        <p className="text-[11px] text-slate-600">
                          This communication is attached to an active module in your ecosystem.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab(selectedMail.actionView!)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-200 transition-all shrink-0 cursor-pointer"
                    >
                      {selectedMail.actionLabel} →
                    </button>
                  </div>
                )}

                {/* Attachments Section */}
                {selectedMail.attachments && selectedMail.attachments.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                      Attachments ({selectedMail.attachments.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedMail.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-600 shrink-0">
                              <FileCheck className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-slate-800 truncate">{att.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{att.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => showToast(`Downloaded ${att.name} to local device.`)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Download Attachment"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Threaded Replies */}
                {selectedMail.replies && selectedMail.replies.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Thread Replies ({selectedMail.replies.length})
                    </h4>
                    {selectedMail.replies.map((rep) => (
                      <div key={rep.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CornerDownRight className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="font-bold text-xs text-slate-900">{rep.sender}</span>
                            <span className="text-[11px] font-mono text-indigo-600">{rep.senderHandle}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{rep.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-700 whitespace-pre-line pl-5">{rep.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Reply & Forward Composer */}
                <div className="pt-4 border-t border-slate-200">
                  {!isForwarding ? (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Reply className="w-3.5 h-3.5 text-indigo-600" />
                          Reply to {selectedMail.sender}
                        </span>
                        <button
                          onClick={() => setIsForwarding(true)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Forward className="w-3.5 h-3.5" />
                          Forward
                        </button>
                      </div>

                      {/* Quick Canned Responses */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {[
                          'Thank you, I will prepare the viva presentation!',
                          'My verified Skill Passport has been shared.',
                          'Confirmed, looking forward to the schedule.',
                          'Could we connect on SkillBridge next Tuesday?'
                        ].map((canned, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setReplyText(canned)}
                            className="text-[11px] px-2.5 py-1 bg-white hover:bg-slate-100 rounded-full border border-slate-200 text-slate-700 whitespace-nowrap font-medium transition-colors cursor-pointer"
                          >
                            {canned}
                          </button>
                        ))}
                      </div>

                      <textarea
                        id="reply-textarea"
                        rows={3}
                        placeholder="Type your response through SkillBridge encrypted messaging..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                      />

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleAddSampleAttachment}
                          className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          Attach Skill Passport PDF
                        </button>
                        <button
                          id="send-reply-btn"
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Reply</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Forwarding Composer */
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Forward className="w-3.5 h-3.5 text-indigo-600" />
                          Forward this Message
                        </span>
                        <button
                          onClick={() => setIsForwarding(false)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Recipient handle or name (e.g. @ananya.sharma or Dr. Rajesh)"
                        value={forwardRecipient}
                        onChange={(e) => setForwardRecipient(e.target.value)}
                        className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Add an optional forward note..."
                        value={forwardNote}
                        onChange={(e) => setForwardNote(e.target.value)}
                        className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />

                      <div className="flex justify-end">
                        <button
                          onClick={handleSendForward}
                          disabled={!forwardRecipient.trim()}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Forward
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MESSAGE LIST VIEW */
            <div className="flex-1 flex flex-col h-full">
              {/* Folder Header & Sub-toolbar */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 capitalize">
                    {activeFolder}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    ({filteredMessages.length} {filteredMessages.length === 1 ? 'message' : 'messages'})
                  </span>
                </div>

                {activeFolder === 'trash' && filteredMessages.length > 0 && (
                  <button
                    onClick={emptyTrash}
                    className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Empty Trash
                  </button>
                )}
              </div>

              {/* Messages Container */}
              <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="py-20 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-700 mb-1">
                      No messages found in {activeFolder}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {searchQuery
                        ? `No results match "${searchQuery}". Try clearing search filters.`
                        : 'Your internal messages, responses from mentors, and test defense alerts will appear here.'}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((mail) => {
                    const isUnread = !mail.isRead;
                    return (
                      <div
                        key={mail.id}
                        id={`mail-item-${mail.id}`}
                        onClick={() => handleOpenMail(mail)}
                        className={`p-4 transition-all cursor-pointer flex items-start sm:items-center justify-between gap-3 group ${
                          isUnread
                            ? 'bg-indigo-50/40 hover:bg-indigo-50/80 font-semibold text-slate-900'
                            : 'hover:bg-slate-50/90 text-slate-700'
                        }`}
                      >
                        {/* Left: Star, Indicator & Sender */}
                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                          {/* Star Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStarMail(mail.id);
                            }}
                            className="p-1 text-slate-300 hover:text-amber-500 rounded transition-colors cursor-pointer shrink-0 mt-0.5 sm:mt-0"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                mail.isStarred ? 'text-amber-500 fill-amber-500' : ''
                              }`}
                            />
                          </button>

                          {/* Unread dot */}
                          <div className="w-2 h-2 rounded-full shrink-0 mt-2 sm:mt-0">
                            {isUnread && <span className="block w-2 h-2 rounded-full bg-indigo-600" />}
                          </div>

                          {/* Sender & Handle */}
                          <div className="w-36 sm:w-44 shrink-0 truncate">
                            <span className={`text-xs truncate block ${isUnread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                              {mail.sender}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 block truncate">
                              {mail.senderHandle || '@user'}
                            </span>
                          </div>

                          {/* Subject & Preview */}
                          <div className="min-w-0 flex-1 pr-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs truncate ${isUnread ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-800'}`}>
                                {mail.subject}
                              </span>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold border hidden lg:inline-block shrink-0 ${getCategoryColor(mail.category)}`}>
                                {mail.category}
                              </span>
                              {mail.attachments && mail.attachments.length > 0 && (
                                <Paperclip className="w-3 h-3 text-slate-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                              {mail.preview}
                            </p>
                          </div>
                        </div>

                        {/* Right: Timestamp & Hover Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Hover action bar */}
                          <div className="hidden group-hover:flex items-center gap-1 mr-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (mail.isRead) markMailUnread(mail.id);
                                else markMailAsRead(mail.id);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                              title={mail.isRead ? 'Mark as Unread' : 'Mark as Read'}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                archiveMail(mail.id);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                              title="Archive"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                trashMail(mail.id);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {mail.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COMPOSE MODAL */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  New SkillBridge Message
                </h3>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSendCompose} className="p-5 space-y-4">
              {/* Recipient Field with Quick Suggestions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient (Name or @handle)
                </label>
                <input
                  id="compose-recipient-input"
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Verma, @ananya.mentor, TechNova HR"
                  value={composeRecipient}
                  onChange={(e) => {
                    setComposeRecipient(e.target.value);
                    // Match mentor or contact
                    const matched = contacts.find(
                      (c) =>
                        c.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        c.handle.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    if (matched) {
                      setComposeRecipientRole(matched.role);
                      setComposeRecipientHandle(matched.handle);
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />

                {/* Quick Recipient Chips */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">Quick Select:</span>
                  {(contacts || []).slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setComposeRecipient(c.name);
                        setComposeRecipientRole(c.role);
                        setComposeRecipientHandle(c.handle);
                      }}
                      className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md font-mono transition-colors shrink-0"
                    >
                      {c.handle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  id="compose-subject-input"
                  type="text"
                  required
                  placeholder="e.g. Inquiry regarding Python Mentor slot / Full-Stack Viva Defense"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Category & Priority Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={composeCategory}
                    onChange={(e) => setComposeCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="MENTORSHIP">Mentorship</option>
                    <option value="OPPORTUNITY">Hiring & Opportunities</option>
                    <option value="LOCAL_JOB">Local Part-Time Gig</option>
                    <option value="VERIFICATION">Assessment & Centers</option>
                    <option value="SYSTEM">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={composePriority}
                    onChange={(e) => setComposePriority(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High Priority</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="compose-body-textarea"
                  rows={6}
                  required
                  placeholder="Compose your SkillBridge communication. Keep it professional and reference your verified skills or assessment credentials."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Attachments Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                    Attachments ({composeAttachments.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSampleAttachment}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    + Attach Verified Credential
                  </button>
                </div>

                {composeAttachments.length > 0 && (
                  <div className="space-y-1.5">
                    {composeAttachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-mono text-slate-700 truncate">{att.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{att.size}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setComposeAttachments((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Privacy protected by SkillBridge ID</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposeOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-compose-btn"
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-200 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
