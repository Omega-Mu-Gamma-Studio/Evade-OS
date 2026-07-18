import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import HubMap from './pages/HubMap.jsx';
import ZoneMap from './pages/ZoneMap.jsx';
import LessonPage from './pages/LessonPage.jsx';
import Settings from './pages/Settings.jsx';
import Ending from './pages/Ending.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hub" element={<HubMap />} />
      <Route path="/zone/:zoneId" element={<ZoneMap />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/ending" element={<Ending />} />
    </Routes>
  );
}
