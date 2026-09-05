import React from 'react';
import { AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { EcosystemMapItem } from '../../types';
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Users,
  MapPin,
  ExternalLink,
  DollarSign,
  Clock,
  Star,
  CheckCircle2
} from 'lucide-react';

interface EcosystemMarkerProps {
  item: EcosystemMapItem;
  isSelected: boolean;
  onSelect: (item: EcosystemMapItem) => void;
  onClose: () => void;
  onAction?: (item: EcosystemMapItem) => void;
}

export const EcosystemMarker: React.FC<EcosystemMarkerProps> = ({
  item,
  isSelected,
  onSelect,
  onClose,
  onAction
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const getCategoryConfig = (category: EcosystemMapItem['category']) => {
    switch (category) {
      case 'LOCAL_JOB':
        return {
          background: '#059669', // Emerald 600
          borderColor: '#064e3b', // Emerald 900
          glyphColor: '#ffffff',
          icon: Briefcase,
          label: 'Local Job'
        };
      case 'INSTITUTION':
        return {
          background: '#4f46e5', // Indigo 600
          borderColor: '#312e81', // Indigo 900
          glyphColor: '#ffffff',
          icon: GraduationCap,
          label: 'Institution'
        };
      case 'STARTUP':
        return {
          background: '#7c3aed', // Violet 600
          borderColor: '#4c1d95', // Violet 900
          glyphColor: '#ffffff',
          icon: Rocket,
          label: 'Startup'
        };
      case 'MEETUP_HUB':
        return {
          background: '#e11d48', // Rose 600
          borderColor: '#881337', // Rose 900
          glyphColor: '#ffffff',
          icon: Users,
          label: 'Meetup Hub'
        };
      default:
        return {
          background: '#2563eb',
          borderColor: '#1e3a8a',
          glyphColor: '#ffffff',
          icon: MapPin,
          label: 'Location'
        };
    }
  };

  const config = getCategoryConfig(item.category);
  const Icon = config.icon;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={item.coordinates}
        title={`${item.title} (${item.subtitle})`}
        onClick={() => onSelect(item)}
      >
        <Pin
          background={config.background}
          borderColor={config.borderColor}
          glyphColor={config.glyphColor}
          scale={isSelected ? 1.35 : 1.15}
        >
          <div className="flex items-center justify-center p-0.5 text-white">
            <Icon className="w-3.5 h-3.5" />
          </div>
        </Pin>
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onClose}
          headerContent={
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 pr-2">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: config.background }}
              />
              <span className="truncate">{item.title}</span>
            </div>
          }
        >
          <div className="text-slate-800 text-xs max-w-xs space-y-2 pt-1 font-sans">
            <p className="text-[11px] text-slate-500 font-medium">{item.subtitle}</p>

            <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="font-semibold">{item.distanceKm === 0 ? 'Home Campus' : `${item.distanceKm} km away`}</span>
              </div>
              {item.rating && (
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{item.rating}</span>
                </div>
              )}
            </div>

            {item.compensationOrType && (
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md text-[11px]">
                <DollarSign className="w-3 h-3 shrink-0 text-emerald-600" />
                <span>{item.compensationOrType}</span>
              </div>
            )}

            {item.hoursOrTiming && (
              <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                <span>{item.hoursOrTiming}</span>
              </div>
            )}

            <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Directions</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              {onAction && (
                <button
                  type="button"
                  onClick={() => onAction(item)}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md text-[11px] transition-colors cursor-pointer"
                >
                  {item.actionText}
                </button>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
