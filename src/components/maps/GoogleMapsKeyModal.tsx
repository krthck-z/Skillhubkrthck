import React, { useState } from 'react';
import { Key, ExternalLink, Check, ShieldCheck, X, Sparkles, HelpCircle, AlertCircle } from 'lucide-react';
import { useGoogleMaps } from './GoogleMapsContext';

export const GoogleMapsKeyModal: React.FC = () => {
  const { apiKey, setApiKey, isConfigModalOpen, setIsConfigModalOpen, isKeyConfigured } = useGoogleMaps();
  const [inputVal, setInputVal] = useState(apiKey);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isConfigModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputVal);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsConfigModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsConfigModalOpen(false)}
            className="absolute top-4 right-4 text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-white">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Google Maps Platform Setup</h3>
              <p className="text-xs text-indigo-200">Configure your API Key or free Maps Demo Key</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Demo Key Callout */}
          <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-950 space-y-1">
                <span className="font-semibold block text-indigo-900">Zero-Billing Maps Demo Key Available</span>
                <p className="text-slate-600 leading-relaxed">
                  For quick prototyping without setting up a Google Cloud billing account, you can generate a free Maps Demo Key in seconds:
                </p>
                <a
                  href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-800 underline mt-1"
                >
                  <span>Get Free Maps Demo Key</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="gmp-key-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Maps API Key
              </label>
              <div className="relative">
                <input
                  id="gmp-key-input"
                  type="password"
                  placeholder="AIzaSy..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                You can also permanently declare <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">VITE_GOOGLE_MAPS_API_KEY</code> in your <code className="font-mono">.env</code> file.
              </p>
            </div>

            {/* Production Instructions */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Production Security Recommendations</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                For production deployments, restrict your key to HTTP referrers (e.g., your domain or Cloud Run service URL) and designate only the required APIs (Maps JavaScript API, Places API, Routes API) in the{' '}
                <a
                  href="https://console.cloud.google.com/google/maps-apis/credentials?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                >
                  Cloud Console Credentials
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>{isKeyConfigured ? 'Update API Key' : 'Activate Google Maps'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
