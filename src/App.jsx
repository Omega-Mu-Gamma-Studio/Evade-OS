import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import HubMap from './pages/HubMap.jsx';
import RealmScene from './pages/RealmScene.jsx';
import LessonPage from './pages/LessonPage.jsx';
import Settings from './pages/Settings.jsx';
import Ending from './pages/Ending.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hub" element={<HubMap />} />
      <Route path="/realm/:realmNum" element={<RealmScene />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/ending" element={<Ending />} />
    </Routes>
  );
}
