import React, { useState, useMemo } from 'react';
import {
  Users,
  ShieldCheck,
  Search,
  CheckCircle2,
  Mail,
  UserPlus,
  Lock,
  Building,
  MapPin,
  ExternalLink,
  Clock,
  Sparkles,
  Award,
  Filter,
  Check,
  X,
  Send,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SkillBridgeContact } from '../types';

export const ContactsNetworkView: React.FC = () => {
  const {
    contacts,
    requestContact,
    updateContactStatus,
    sendMail,
    setActiveTab,
    showToast,
    profile
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedContactModal, setSelectedContactModal] = useState<SkillBridgeContact | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [quickMsgSubject, setQuickMsgSubject] = useState('');
  const [quickMsgBody, setQuickMsgBody] = useState('');

  // Filtered Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (roleFilter !== 'ALL' && c.role !== roleFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchHandle = c.handle.toLowerCase().includes(q);
        const matchOrg = c.organization.toLowerCase().includes(q);
        const matchSkills = c.skills.some((s) => s.toLowerCase().includes(q));
        const matchBio = c.bio.toLowerCase().includes(q);
        return matchName || matchHandle || matchOrg || matchSkills || matchBio;
      }
      return true;
    });
  }, [contacts, roleFilter, searchQuery]);

  const handleOpenConnectModal = (contact: SkillBridgeContact) => {
    setSelectedContactModal(contact);
    setRequestMessage(
      `Hello ${contact.name},\n\nI am Karthik Patel, an aspiring ${profile.targetCareer} with verified skills in Python and React on SkillBridge. I would love to connect with you regarding ${contact.organization} insights.`
    );
  };

  const handleConfirmConnect = () => {
    if (!selectedContactModal) return;
    requestContact(selectedContactModal.id, requestMessage);
    setSelectedContactModal(null);
  };

  const handleOpenQuickMessage = (contact: SkillBridgeContact) => {
    setSelectedContactModal(contact);
    setQuickMsgSubject(`Inquiry: Connecting with ${contact.name}`);
    setQuickMsgBody(
      `Hi ${contact.name},\n\nI am reaching out via SkillBridge internal messaging regarding opportunities and guidance at ${contact.organization}.`
    );
    setIsMessageModalOpen(true);
  };

  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContactModal || !quickMsgSubject || !quickMsgBody) return;

    sendMail({
      recipient: selectedContactModal.name,
      recipientRole: selectedContactModal.role,
      recipientHandle: selectedContactModal.handle,
      subject: quickMsgSubject,
      body: quickMsgBody,
      category: 'MENTORSHIP',
      priority: 'NORMAL'
    });

    setIsMessageModalOpen(false);
    showToast(`Message sent to ${selectedContactModal.name} via internal mailbox!`);
    setActiveTab('mailbox');
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                SkillBridge Privacy-Preserving Network
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Identity Guard
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Connect directly with industry mentors, verified recruiters, and peers using SkillBridge handles without leaking private contact information
              </p>
            </div>
          </div>
        </div>

        {/* Student Handle Badge */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
            KP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">Your Secure Handle:</span>
              <span className="text-xs font-mono font-bold text-indigo-600">@karthik.patel</span>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> External Phone & Email Hidden
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, @handle, role, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'All People' },
              { id: 'Mentor', label: 'Mentors' },
              { id: 'Recruiter', label: 'Recruiters' },
              { id: 'Startup Founder', label: 'Founders' },
              { id: 'Peer Student', label: 'Peers' },
              { id: 'Alumni', label: 'Alumni' }
            ].map((rf) => (
              <button
                key={rf.id}
                onClick={() => setRoleFilter(rf.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  roleFilter === rf.id
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Network Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContacts.map((contact) => {
          const isPending = contact.status === 'PENDING';
          const isConnected = contact.status === 'ACCEPTED';

          return (
            <div
              key={contact.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Verified, Handle */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-indigo-700 font-extrabold text-base flex items-center justify-center border border-slate-200 shrink-0">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm text-slate-900">{contact.name}</h3>
                        {contact.isVerified && (
                          <span
                            title="Verified on SkillBridge"
                            className="text-emerald-600"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-semibold text-indigo-600">
                        {contact.handle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                    {contact.role}
                  </span>
                </div>

                {/* Organization & Location */}
                <div className="space-y-1 mb-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{contact.organization}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{contact.location}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {contact.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {contact.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Internal only</span>
                </div>

                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <button
                      onClick={() => handleOpenQuickMessage(contact)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  ) : isPending ? (
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold rounded-xl">
                      <Clock className="w-3 h-3" />
                      <span>Request Pending</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenConnectModal(contact)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONNECT REQUEST MODAL */}
      {selectedContactModal && !isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Send SkillBridge Connection Request
                </h3>
              </div>
              <button
                onClick={() => setSelectedContactModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                  {selectedContactModal.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{selectedContactModal.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{selectedContactModal.handle} • {selectedContactModal.role}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Introductory Note
                </label>
                <textarea
                  rows={4}
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full p-3 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-900 leading-relaxed">
                  Your request is securely delivered to their SkillBridge Mailbox. They will see your verified Skill Passport credentials and can accept or reply without either party revealing private phone numbers or personal email.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedContactModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmConnect}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT MESSAGE MODAL */}
      {selectedContactModal && isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Message {selectedContactModal.name} ({selectedContactModal.handle})
                </h3>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendQuickMessage} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={quickMsgSubject}
                  onChange={(e) => setQuickMsgSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Body
                </label>
                <textarea
                  rows={5}
                  required
                  value={quickMsgBody}
                  onChange={(e) => setQuickMsgBody(e.target.value)}
                  className="w-full p-3 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Mailbox</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
