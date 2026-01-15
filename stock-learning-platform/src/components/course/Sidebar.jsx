import { useState } from 'react';
import { MODULE_1_CONTENT } from '../../data/module1';
import { FaCheckCircle, FaCircle, FaSearch, FaBookOpen } from 'react-icons/fa';

const Sidebar = ({ completedSections, activeSection, onNavigate, onSearchGlossary }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('progress'); // 'progress' or 'glossary'

    const filteredGlossary = MODULE_1_CONTENT.glossary.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const progressPercent = Math.round((completedSections.length / MODULE_1_CONTENT.sections.length) * 100);

    return (
        <div className="w-full lg:w-80 bg-white border-l border-gray-200 h-full flex flex-col sticky top-0 max-h-screen overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('progress')}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FaCheckCircle /> Progress
                </button>
                <button
                    onClick={() => setActiveTab('glossary')}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === 'glossary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FaBookOpen /> Glossary
                </button>
            </div>

            {/* Progress Tab */}
            {activeTab === 'progress' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <div className="flex justify-between text-sm font-medium mb-2 text-gray-700">
                            <span>Module Completion</span>
                            <span>{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sections</h4>
                        {MODULE_1_CONTENT.sections.map((section, idx) => {
                            const isCompleted = completedSections.includes(section.id);
                            const isActive = activeSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => onNavigate(section.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-start gap-3 ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="mt-0.5 flex-shrink-0">
                                        {isCompleted ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaCircle className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-300'}`} />
                                        )}
                                    </div>
                                    <span className="line-clamp-2">{section.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Glossary Tab */}
            {activeTab === 'glossary' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search terms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredGlossary.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.term}</h4>
                                <p className="text-xs text-gray-600 mb-2">{item.definition}</p>
                                {item.formula && (
                                    <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200 block w-fit text-blue-600 font-mono">
                                        {item.formula}
                                    </code>
                                )}
                            </div>
                        ))}
                        {filteredGlossary.length === 0 && (
                            <p className="text-center text-sm text-gray-500 py-4">No terms found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
