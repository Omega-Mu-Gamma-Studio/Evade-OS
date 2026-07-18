// src/pages/HubMap.jsx
// Section 1: central hub. Single-zone realms (I, II, V) -> transition -> first
// lesson. Dual-zone realms (III, IV) -> transition -> ZoneMap.jsx. Mode toggle
// lives in Settings, not here; hub reflects current mode passively via
// Kernel-ka's portrait (RapportPanel: neutral/no rim-light in Normal Mode).
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HubMapCanvas from '../components/hub/HubMap.jsx';
import RealmEntryTransition from '../components/hub/RealmEntryTransition.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import RapportPanel from '../components/companion/RapportPanel.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import { getUnit, getLessonsForRealm, realmHasZones } from '../utils/dataService.js';
import { useProgressStore } from '../store/progressStore.js';

export default function HubMap() {
  const navigate = useNavigate();
  const mode = useProgressStore((s) => s.mode);
  const [transitionRealm, setTransitionRealm] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const paletteStyle = useRealmPalette(null);

  const handleSelectRealm = (realmNum) => setTransitionRealm(realmNum);

  const handleTransitionComplete = () => {
    const realmNum = transitionRealm;
    setTransitionRealm(null);
    if (realmHasZones(realmNum)) {
      navigate(`/zone/${realmNum}`);
    } else {
      const first = getLessonsForRealm(realmNum)[0];
      if (first) navigate(`/lesson/${first.id}`);
    }
  };

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Kernel-ka's Bunker \u2014 Core Terminal Room" showExit={false} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
          <HubMapCanvas onSelectRealm={handleSelectRealm} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75em', opacity: 0.9 }}>
            <RapportPanel size={56} />
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
              {mode === 'normal' ? 'Kernel-ka is present, inert.' : 'Kernel-ka is watching.'}
            </span>
          </div>
        </div>
      </div>

      {transitionRealm && (() => {
        const unit = getUnit(transitionRealm);
        const accent = unit?.accent ?? Object.values(unit?.zones ?? {})[0]?.accent ?? { primary: '#FFFFFF', secondary: '#FFFFFF' };
        return (
          <RealmEntryTransition
            realmNum={transitionRealm}
            name={unit?.realm ?? `Realm ${transitionRealm}`}
            accent={accent}
            onComplete={handleTransitionComplete}
          />
        );
      })()}
    </div>
  );
}
