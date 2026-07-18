// src/pages/LessonPage.jsx
// Loads the lesson by :lessonId, sets the realm/zone palette (Section 5), and
// mounts PhaseContainer. On lesson complete: 5.7 (final lesson) routes to the
// Ending; otherwise back to ZoneMap (dual-zone realms) or Hub (single-zone).
import { useNavigate, useParams } from 'react-router-dom';
import PhaseContainer from '../components/lesson/PhaseContainer.jsx';
import { useRealmPalette } from '../hooks/useRealmPalette.js';
import { getLesson, realmHasZones } from '../utils/dataService.js';

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = getLesson(lessonId);
  const paletteStyle = useRealmPalette(lesson?.unit ?? null, lesson?.zone ?? null);

  if (!lesson) {
    return <div style={{ padding: '2rem' }}>Lesson '{lessonId}' not found.</div>;
  }

  const handleLessonComplete = () => {
    if (lesson.id === '5.7') {
      navigate('/ending');
    } else if (realmHasZones(lesson.unit)) {
      navigate(`/zone/${lesson.unit}`);
    } else {
      navigate('/hub');
    }
  };

  return (
    <div style={paletteStyle}>
      <PhaseContainer lesson={lesson} onLessonComplete={handleLessonComplete} />
    </div>
  );
}
