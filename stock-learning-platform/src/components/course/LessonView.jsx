import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MODULE_1_CONTENT } from '../../data/module1';
import { FaDownload } from 'react-icons/fa';
import ProfitabilityWaterfall from './visuals/ProfitabilityWaterfall';
import MarginCharts from './visuals/MarginCharts';

const LessonView = ({ onCompleteSection, completedSections }) => {
    // Scroll observation for "read" tracking could go here, 
    // for now we'll just require clicking "Mark Complete" or automatically marking when viewed.

    // Let's create a simple ref based intersection observer to auto-mark as read
    const observer = useRef(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section-id');
                    if (sectionId) {
                        // onCompleteSection(sectionId); // Auto-complete on view?
                        // User probably prefers manual or "bottom of section" trigger.
                        // Let's stick to manual checkboxes for clarity as per requirements.
                    }
                }
            });
        }, { threshold: 0.5 });

        // Cleanup
        return () => observer.current?.disconnect();
    }, [onCompleteSection]);

    const handleDownloadMarkdown = () => {
        const fullText = MODULE_1_CONTENT.sections.map(s => `# ${s.title}\n\n${s.content}`).join('\n\n---\n\n');
        const blob = new Blob([fullText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Income_Statement_Course.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-16">
            <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{MODULE_1_CONTENT.title}</h1>
                    <p className="text-gray-600">Master the language of business profitability.</p>
                </div>
                <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <FaDownload /> Download Notes
                </button>
            </div>

            {MODULE_1_CONTENT.sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    data-section-id={section.id}
                    className="scroll-mt-24"
                >
                    <div className="prose prose-blue max-w-none hover:prose-a:text-blue-600">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
                            {section.title}
                            <label className="flex items-center gap-2 text-sm font-normal text-gray-500 cursor-pointer bg-gray-50 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={completedSections.includes(section.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) onCompleteSection(section.id);
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Mark as Done
                            </label>
                        </h2>

                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => <span className="font-semibold text-blue-900 bg-blue-50 px-1 py-0.5 rounded" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic bg-gray-50 my-4 rounded-r-lg" {...props} />,
                                p: ({ node, children, ...props }) => {
                                    const text = Array.isArray(children) ? children[0] : children;
                                    if (typeof text === 'string') {
                                        if (text.includes("[WATERFALL_CHART]")) return <ProfitabilityWaterfall />;
                                        if (text.includes("[MARGIN_CHART]")) return <MarginCharts data={{ cogsPercent: 54, opexPercent: 14, taxPercent: 5, profitPercent: 27 }} />;
                                    }
                                    return <p className="mb-4 leading-relaxed text-gray-700" {...props}>{children}</p>
                                }
                            }}
                        >
                            {section.content}
                        </ReactMarkdown>
                    </div>
                    {/* Divider */}
                    {index < MODULE_1_CONTENT.sections.length - 1 && (
                        <hr className="my-12 border-gray-100" />
                    )}
                </section>
            ))}

            <div className="bg-blue-50 p-8 rounded-xl text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🎉 You've reached the end of the lesson!</h3>
                <p className="text-gray-600 mb-6">Review your progress and verify you've marked all sections as complete.</p>
            </div>
        </div>
    );
};

export default LessonView;
