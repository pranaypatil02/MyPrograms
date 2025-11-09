import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Fundamentals from './pages/Fundamentals';
import Valuation from './pages/Valuation';
import Sectors from './pages/Sectors';
import Glossary from './pages/Glossary';
import LearningPaths from './pages/LearningPaths';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundamentals" element={<Fundamentals />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
