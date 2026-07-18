// src/pages/Ending.jsx
// Final scene placeholder, reached after lesson 5.7. Real script/art is a
// content-phase task (PRD Section 10.3) — this proves the route/trigger works.
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';

export default function Ending() {
  const navigate = useNavigate();
  const paletteStyle = useRealmPalette(5, null);

  return (
    <div style={{ ...paletteStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '2rem' }}>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '1.8rem', letterSpacing: '0.1em' }}
      >
        SYSTEM RESTORED
      </motion.h1>
      <p style={{ opacity: 0.7, maxWidth: 480 }}>
        Ending narrative TBD (PRD Section 10.3). The bunker holds. Kernel-ka's story concludes here.
      </p>
      <Button onClick={() => navigate('/')}>Return to Start</Button>
    </div>
  );
}
