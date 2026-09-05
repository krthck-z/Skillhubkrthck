import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { EcosystemMapItem } from '../../types';
import { EcosystemMarker } from './EcosystemMarker';
import { useGoogleMaps } from './GoogleMapsContext';
import {
  MapPin,
  Sparkles,
  Key,
  ExternalLink,
  Layers,
  Compass,
  Building,
  Briefcase,
  Rocket,
  Users,
  GraduationCap
} from 'lucide-react';

interface EcosystemGoogleMapProps {
  locations: EcosystemMapItem[];
  selectedLocation: EcosystemMapItem | null;
  onSelectLocation: (item: EcosystemMapItem | null) => void;
  height?: string;
  onAction?: (item: EcosystemMapItem) => void;
  interactiveFlyButtons?: boolean;
}

// Sub-component to handle smooth pan and zoom when a card is selected
const MapPanController: React.FC<{ targetCoords?: { lat: number; lng: number } | null }> = ({
  targetCoords
}) => {
  const map = useMap();
  useEffect(() => {
    if (map && targetCoords) {
      map.panTo(targetCoords);
      map.setZoom(15);
    }
  }, [map, targetCoords]);
  return null;
};

export const EcosystemGoogleMap: React.FC<EcosystemGoogleMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  height = '620px',
  onAction,
  interactiveFlyButtons = true
}) => {
  const { apiKey, isKeyConfigured, setIsConfigModalOpen } = useGoogleMaps();
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const defaultCenter = { lat: 14.6750, lng: 77.6000 }; // SSBN College Campus, Anantapur

  // Fallback UI when no API Key is provided yet
  if (!isKeyConfigured) {
    return (
      <div
        id="google-maps-empty-state-container"
        style={{ height }}
        className="w-full relative rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col items-center justify-center p-6 text-center"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-lg space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 mb-1 shadow-lg shadow-indigo-950">
            <Compass className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            Google Maps Platform Integration Ready
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            SkillBridge AI is pre-architected with modern <code className="text-indigo-300 font-mono">@vis.gl/react-google-maps</code>, <code className="text-indigo-300 font-mono">AdvancedMarkerElement</code>, and high-contrast spatial clustering.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free Prototyping with Maps Demo Key</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              No credit card or Cloud billing required! Grab a free demo key from Google to test the live interactive map immediately.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-300 hover:text-amber-200 underline font-semibold inline-flex items-center gap-1"
              >
                <span>Generate Free Maps Demo Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Enter API Key / Demo Key</span>
            </button>
            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              <span>Google Cloud Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> {locations.length} Mapped Local Sites
            </span>
            <span>•</span>
            <span>Zero Legacy APIs</span>
            <span>•</span>
            <span>AdvancedMarkerElement</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="google-maps-live-wrapper"
      style={{ height, width: '100%' }}
      className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs"
    >
      <APIProvider apiKey={apiKey}>
        <Map
          id="skillbridge-ecosystem-map"
          // CRITICAL: Required Prop for internal tracking (overridden with gmp_mcp_codeassist_v1_aistudio)
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          // CRITICAL: DEMO_MAP_ID required for AdvancedMarkerElement
          mapId="DEMO_MAP_ID"
          defaultCenter={defaultCenter}
          defaultZoom={13}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapTypeId={mapType}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Pan controller to handle smooth camera centering */}
          <MapPanController targetCoords={selectedLocation ? selectedLocation.coordinates : null} />

          {/* Render modern AdvancedMarkers */}
          {locations.map((item) => (
            <EcosystemMarker
              key={item.id}
              item={item}
              isSelected={selectedLocation?.id === item.id}
              onSelect={(loc) => onSelectLocation(loc)}
              onClose={() => onSelectLocation(null)}
              onAction={onAction}
            />
          ))}
        </Map>

        {/* Top Overlay Controls */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <button
            type="button"
            onClick={() => setMapType('roadmap')}
            className={`px-2.5 py-1 font-semibold rounded-lg transition-colors cursor-pointer ${
              mapType === 'roadmap' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 font-semibold rounded-lg transition-colors cursor-pointer ${
              mapType === 'satellite' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setMapType('hybrid')}
            className={`px-2.5 py-1 font-semibold rounded-lg transition-colors cursor-pointer ${
              mapType === 'hybrid' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hybrid
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            onClick={() => setIsConfigModalOpen(true)}
            className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 rounded-lg transition-colors cursor-pointer"
            title="Configure Maps API Key"
          >
            <Key className="w-3.5 h-3.5 text-indigo-500" />
            <span>Key</span>
          </button>
        </div>

        {/* Floating Quick Fly Preset Bar */}
        {interactiveFlyButtons && (
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-2 rounded-xl border border-slate-200 shadow-md text-[11px]">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mr-1">
              Focus:
            </span>
            <button
              type="button"
              onClick={() => {
                const ssbn = locations.find((l) => l.id === 'map-inst-ssbn');
                if (ssbn) onSelectLocation(ssbn);
              }}
              className="px-2 py-1 font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3 text-indigo-600" />
              <span>SSBN Campus</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const job = locations.find((l) => l.category === 'LOCAL_JOB');
                if (job) onSelectLocation(job);
              }}
              className="px-2 py-1 font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
            >
              <Briefcase className="w-3 h-3 text-emerald-600" />
              <span>Local Jobs Hub</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const startup = locations.find((l) => l.category === 'STARTUP');
                if (startup) onSelectLocation(startup);
              }}
              className="px-2 py-1 font-medium bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
            >
              <Rocket className="w-3 h-3 text-purple-600" />
              <span>SKU Incubator</span>
            </button>
          </div>
        )}
      </APIProvider>
    </div>
  );
};
