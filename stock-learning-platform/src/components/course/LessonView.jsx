import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaDownload } from 'react-icons/fa';
import ProfitabilityWaterfall from './visuals/ProfitabilityWaterfall';
import MarginCharts from './visuals/MarginCharts';

const LessonView = ({ moduleData, onCompleteSection, completedSections }) => {
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
        const fullText = moduleData.sections.map(s => `# ${s.title}\n\n${s.content}`).join('\n\n---\n\n');
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
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">{moduleData.title}</h1>
                    <p className="text-lg text-slate-600 font-medium">Master the language of business profitability.</p>
                </div>
                <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <FaDownload /> Download Notes
                </button>
            </div>

            {moduleData.sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    data-section-id={section.id}
                    className="scroll-mt-24"
                >
                    <div className="prose prose-indigo max-w-none hover:prose-a:text-indigo-600 font-serif text-lg leading-loose text-slate-800">
                        <h2 className="text-3xl font-bold font-sans text-slate-900 mb-8 flex items-center gap-4">
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
                                strong: ({ node, ...props }) => <strong className="font-semibold text-indigo-900 bg-indigo-50/80 px-1.5 py-0.5 rounded-md border border-indigo-100/50" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-6 py-3 italic bg-slate-50 my-6 rounded-r-xl shadow-sm font-medium text-slate-700 font-sans" {...props} />,
                                p: ({ node, children, ...props }) => {
                                    const text = Array.isArray(children) ? children[0] : children;
                                    if (typeof text === 'string') {
                                        if (text.includes("[WATERFALL_CHART]")) return <ProfitabilityWaterfall />;
                                        if (text.includes("[MARGIN_CHART]")) return <MarginCharts data={{ cogsPercent: 54, opexPercent: 14, taxPercent: 5, profitPercent: 27 }} />;
                                    }
                                    return <p className="mb-6 font-serif" {...props}>{children}</p>
                                }
                            }}
                        >
                            {section.content}
                        </ReactMarkdown>
                    </div>
                    {/* Divider */}
                    {index < moduleData.sections.length - 1 && (
                        <hr className="my-12 border-gray-100" />
                    )}
                </section>
            ))}

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 rounded-2xl text-center border border-indigo-100 shadow-sm mt-12">
                <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-900 mb-3">🎉 You've reached the end of the lesson!</h3>
                <p className="text-slate-600 mb-8 font-sans font-medium text-lg">Review your progress and verify you've marked all sections as complete.</p>
            </div>
        </div>
    );
};

export default LessonView;
