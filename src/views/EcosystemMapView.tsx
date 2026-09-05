import React, { useState, useMemo } from 'react';
import { initialEcosystemMapLocations } from '../data/mapLocationsData';
import { EcosystemMapItem } from '../types';
import { EcosystemGoogleMap } from '../components/maps/EcosystemGoogleMap';
import { useGoogleMaps } from '../components/maps/GoogleMapsContext';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Search,
  Filter,
  Briefcase,
  GraduationCap,
  Rocket,
  Users,
  Key,
  ExternalLink,
  Navigation,
  Star,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Building,
  Radio,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const EcosystemMapView: React.FC = () => {
  const { isKeyConfigured, setIsConfigModalOpen } = useGoogleMaps();
  const { setActiveTab, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<EcosystemMapItem | null>(null);

  // Filtered locations based on search and category
  const filteredLocations = useMemo(() => {
    return initialEcosystemMapLocations.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.compensationOrType && item.compensationOrType.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const categoryStats = useMemo(() => {
    const counts = {
      ALL: initialEcosystemMapLocations.length,
      LOCAL_JOB: initialEcosystemMapLocations.filter((i) => i.category === 'LOCAL_JOB').length,
      INSTITUTION: initialEcosystemMapLocations.filter((i) => i.category === 'INSTITUTION').length,
      STARTUP: initialEcosystemMapLocations.filter((i) => i.category === 'STARTUP').length,
      MEETUP_HUB: initialEcosystemMapLocations.filter((i) => i.category === 'MEETUP_HUB').length
    };
    return counts;
  }, []);

  const handleAction = (item: EcosystemMapItem) => {
    if (item.category === 'LOCAL_JOB') {
      showToast(`Selected job "${item.title}". Navigating to Local Jobs Hub...`);
      setActiveTab('local-jobs');
    } else if (item.category === 'INSTITUTION') {
      showToast(`Viewing academic profile for "${item.title}"...`);
      setActiveTab('institutions');
    } else if (item.category === 'STARTUP') {
      showToast(`Opening startup connection for "${item.title}"...`);
      setActiveTab('startups');
    } else if (item.category === 'MEETUP_HUB') {
      showToast(`Opening Meetup RSVP for "${item.title}"...`);
      setActiveTab('podcasts');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Google Maps Platform
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                Rayalaseema & Anantapur Cluster
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Ecosystem & Campus Map
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Geospatial directory mapping local student jobs, evening gigs, partner colleges, research labs, incubated startups, and weekend developer meetups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(true)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
                isKeyConfigured
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>{isKeyConfigured ? 'Maps API: Active' : 'Setup Maps API Key'}</span>
            </button>
            <a
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Get Demo Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Locations ({categoryStats.ALL})
            </button>
            <button
              onClick={() => setSelectedCategory('LOCAL_JOB')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'LOCAL_JOB'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Local Jobs ({categoryStats.LOCAL_JOB})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('INSTITUTION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'INSTITUTION'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Institutions & Labs ({categoryStats.INSTITUTION})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('STARTUP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'STARTUP'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Startups ({categoryStats.STARTUP})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('MEETUP_HUB')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'MEETUP_HUB'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Meetups ({categoryStats.MEETUP_HUB})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search map places, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: Directory List & Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Location Cards List (5 columns) */}
        <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
            <span>Showing {filteredLocations.length} locations</span>
            <span className="text-slate-400">Click card to focus on map</span>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredLocations.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No locations found</p>
                <p className="text-[11px] text-slate-500 mt-1">Try broadening your search query or filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                  className="mt-3 text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredLocations.map((item) => {
                const isSelected = selectedLocation?.id === item.id;

                let categoryBadgeClass = 'bg-slate-100 text-slate-700';
                if (item.category === 'LOCAL_JOB') categoryBadgeClass = 'bg-emerald-100 text-emerald-800';
                if (item.category === 'INSTITUTION') categoryBadgeClass = 'bg-indigo-100 text-indigo-800';
                if (item.category === 'STARTUP') categoryBadgeClass = 'bg-purple-100 text-purple-800';
                if (item.category === 'MEETUP_HUB') categoryBadgeClass = 'bg-rose-100 text-rose-800';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedLocation(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-400 shadow-xs ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${categoryBadgeClass}`}>
                            {item.category.replace('_', ' ')}
                          </span>
                          {item.statusBadge && (
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {item.statusBadge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
                          {item.distanceKm === 0 ? 'Home Campus' : `${item.distanceKm} km`}
                        </span>
                        {item.rating && (
                          <div className="flex items-center justify-end gap-1 text-xs text-amber-600 font-bold mt-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>

                    {item.compensationOrType && (
                      <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.compensationOrType}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {(item.tags || []).slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 p-1"
                          title="Open Google Maps Directions"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(item);
                          }}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>{item.actionText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Interactive Google Map (7 columns) */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 sticky top-28">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Google Maps View</span>
            </div>
            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-indigo-600 hover:text-indigo-800 text-xs font-medium cursor-pointer"
              >
                Reset Map Focus
              </button>
            )}
          </div>

          <div className="shadow-xs rounded-2xl overflow-hidden border border-slate-200">
            <EcosystemGoogleMap
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              height="620px"
              onAction={handleAction}
            />
          </div>

          {/* Map Legend */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                <span>Local Jobs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
                <span>Colleges & Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                <span>Startups</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
                <span>Meetup Hubs</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              Powered by Google Maps Platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
