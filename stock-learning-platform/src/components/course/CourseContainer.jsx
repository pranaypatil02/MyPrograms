import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import LessonView from './LessonView';
import QuizView from './QuizView';
import { FaGraduationCap, FaArrowLeft } from 'react-icons/fa';

const CourseContainer = ({ onBack, moduleData, moduleId }) => {
    const [completedSections, setCompletedSections] = useState([]);
    const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' or 'quiz'

    // Load progress from localStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem(`${moduleId}_progress`);
        if (savedProgress) {
            setCompletedSections(JSON.parse(savedProgress));
        }
    }, []);

    const handleCompleteSection = (sectionId) => {
        if (!completedSections.includes(sectionId)) {
            const newProgress = [...completedSections, sectionId];
            setCompletedSections(newProgress);
            localStorage.setItem(`${moduleId}_progress`, JSON.stringify(newProgress));
        }
    };

    const styles = {
        container: "flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden",
        mainContent: "flex-1 overflow-y-auto h-full scroll-smooth",
        header: "lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center"
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.container}>
            {/* Mobile Header */}
            <div className={styles.header}>
                <button onClick={onBack} className="text-gray-600"><FaArrowLeft /></button>
                <div className="font-bold flex items-center gap-2">
                    <FaGraduationCap className="text-blue-600" />
                    <span>{moduleData?.title || 'Tutorial'}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                {/* Course Navigation Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
                    <button onClick={onBack} className="hidden lg:flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-semibold transition-colors">
                        <FaArrowLeft /> Back to Dashboard
                    </button>

                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('lesson')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'lesson' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Lesson
                        </button>
                        <button
                            onClick={() => setActiveTab('quiz')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'quiz' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Quiz
                        </button>
                    </div>
                </div>

                {activeTab === 'lesson' ? (
                    <LessonView
                        moduleData={moduleData}
                        onCompleteSection={handleCompleteSection}
                        completedSections={completedSections}
                    />
                ) : (
                    <QuizView
                        moduleData={moduleData}
                        moduleId={moduleId}
                        onCompleteQuiz={(score) => console.log('Quiz completed with:', score)}
                    />
                )}
            </main>

            {/* Sidebar (Right side on desktop) */}
            {activeTab === 'lesson' && (
                <aside className="hidden lg:block h-full z-20 shadow-xl">
                    <Sidebar
                        moduleData={moduleData}
                        completedSections={completedSections}
                        activeSection={null}
                        onNavigate={scrollToSection}
                    />
                </aside>
            )}
        </div>
    );
};

export default CourseContainer;
