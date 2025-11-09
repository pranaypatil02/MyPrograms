import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import Fundamentals from './pages/Fundamentals';
import Valuation from './pages/Valuation';
import Sectors from './pages/Sectors';
import Glossary from './pages/Glossary';
import LearningPaths from './pages/LearningPaths';
import Community from './pages/Community';
import PortfolioSimulator from './pages/PortfolioSimulator';
import ComparisonTool from './pages/ComparisonTool';
import SectorHeatmap from './pages/SectorHeatmap';

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
          <Route path="/portfolio-simulator" element={<PortfolioSimulator />} />
          <Route path="/comparison-tool" element={<ComparisonTool />} />
          <Route path="/sector-heatmap" element={<SectorHeatmap />} />
        </Routes>
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;
