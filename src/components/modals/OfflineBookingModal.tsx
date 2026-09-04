import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, X, CreditCard, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBookingModal: React.FC = () => {
  const {
    activeOfflineModalSkill,
    setActiveOfflineModalSkill,
    bookOfflineAssessment,
    profile
  } = useApp();

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1); // 18 Sept default

  if (!activeOfflineModalSkill) return null;

  const skillName = activeOfflineModalSkill;

  const slots = [
    {
      date: '12 September 2026',
      time: '10:00 AM',
      seatsRemaining: 8,
      venue: 'SkillBridge Assessment Centre, Court Road',
      city: 'Anantapur'
    },
    {
      date: '18 September 2026',
      time: '10:00 AM',
      seatsRemaining: 18,
      venue: 'SkillBridge Assessment Centre, Court Road',
      city: 'Anantapur'
    },
    {
      date: '25 September 2026',
      time: '02:00 PM',
      seatsRemaining: 14,
      venue: 'SkillBridge Assessment Centre, Court Road',
      city: 'Anantapur'
    }
  ];

  const selectedSlot = slots[selectedSlotIndex];

  const handleConfirmBooking = () => {
    bookOfflineAssessment({
      assessmentId: `off-${skillName.toLowerCase()}`,
      skillName: skillName,
      date: selectedSlot.date,
      time: selectedSlot.time,
      venue: selectedSlot.venue,
      city: selectedSlot.city,
      fee: '₹299 (Subsidized Test Fee)',
      duration: '90 Minutes',
      candidateName: profile.name,
      instructions: [
        'Proctored closed-terminal testing environment with anti-cheating hardware monitor',
        'Practical coding challenge (60 mins) + Oral Architectural Viva defense with certified examiner (30 mins)',
        'Passing score required: 80% to achieve OFFLINE VERIFIED credential with HIGH evidence confidence'
      ],
      whatToBring: [
        'Original College Photo ID card (Sri Sai Baba National Degree College)',
        'Government Issued Photo ID (Aadhaar Card / Voter ID)',
        'SkillBridge Booking Confirmation QR (available in your Mailbox)'
      ]
    });
    setActiveOfflineModalSkill(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">Book Verified Offline Assessment</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Tier-1 Trust
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Physical proctored exam to elevate evidence confidence from Medium to <strong className="text-white">HIGH</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveOfflineModalSkill(null)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core explanation */}
        <div className="p-5 space-y-4 text-xs">
          
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">Why Offline Verification Matters:</p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                "Offline verification provides the strongest evidence of demonstrated capability. Employers recognize in-person proctored testing as immune to automated shortcuts, granting immediate direct interview eligibility."
              </p>
            </div>
          </div>

          {/* Assessment Target Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Subject Skill</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{skillName}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Duration</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">90 Minutes</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Exam Fee</p>
              <p className="text-xs font-bold text-indigo-600 mt-0.5">₹299</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Eligibility</p>
              <p className="text-xs font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Online Complete
              </p>
            </div>
          </div>

          {/* Available Dates & Time Slots */}
          <div>
            <label className="font-bold text-slate-900 block mb-2">
              Select Proctored Testing Date & Session:
            </label>
            <div className="space-y-2">
              {slots.map((slot, index) => {
                const isSelected = selectedSlotIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedSlotIndex(index)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-indigo-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{slot.date}</span>
                          <span className="text-slate-500 font-medium">at {slot.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" /> {slot.venue}, {slot.city}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {slot.seatsRemaining} seats left
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions & Requirements */}
          <div className="border-t border-slate-200 pt-3 grid sm:grid-cols-2 gap-3">
            <div>
              <p className="font-bold text-slate-800 mb-1">What to Bring:</p>
              <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                <li>Original College Photo ID (SSBN College)</li>
                <li>Government ID (Aadhaar or Driving License)</li>
                <li>Digital Booking confirmation from SkillBridge Mailbox</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">Proctored Environment:</p>
              <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                <li>Isolated Linux/Windows workstation provided</li>
                <li>In-person senior examiner oral cross-questioning</li>
                <li>Instant scorecard authenticated to blockchain hash</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-500">Candidate: </span>
            <span className="font-bold text-slate-900">{profile.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveOfflineModalSkill(null)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Confirm Booking & Send Ticket</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
