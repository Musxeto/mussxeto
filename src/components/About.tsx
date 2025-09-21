// React import not required with JSX transform
import TechGrid from './TechGrid'

export default function About() {
    return (
        <section id="about" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(3,6,6,0.6),rgba(2,4,4,0.8))]">
            {/* subtle ghost grid background instead of HackerRain for visual variety */}
            <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-6 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
                    <h2 className="text-2xl font-bold mb-2">About / What I do</h2>
                    <p className="text-sm text-gray-300 mb-6">
                        I write code across the stack — from bare-metal C and Bash scripts to modern web apps,
                        AI systems, and automation pipelines. My work spans fullstack development, machine learning,
                        and tooling for real-world use. This section highlights the languages, frameworks, and
                        platforms I build with daily.
                    </p>
                </div>


                <div className="mt-8">
                    <TechGrid radius={3.2} speed={0.14} />
                </div>

                <div className="mt-8 max-w-3xl mx-auto text-[#b7f5d9] font-mono text-sm space-y-4">
                    <div>
                        <div className="font-semibold"> Core Development</div>
                        <div className="text-xs text-gray-300 mt-1">
                            C · C++ · C# · Python · JavaScript (ES6+) · TypeScript · Bash · Assembly
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Web & Mobile → React.js · React Native · Django · Flask · FastAPI · Tailwind · HTML5 · CSS3
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Databases → SQL · MySQL · MongoDB · Firebase
                        </div>
                    </div>

                    <div>
                        <div className="font-semibold"> AI & Data</div>
                        <div className="text-xs text-gray-300 mt-1">
                            TensorFlow · Keras · OpenCV · Pandas · NumPy · Matplotlib
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Areas → Machine Learning · Deep Learning · Computer Vision · Data Analysis
                        </div>
                    </div>

                    <div>
                        <div className="font-semibold"> Tools & Workflow</div>
                        <div className="text-xs text-gray-300 mt-1">
                            Git · Docker · Linux (Mint/Ubuntu) · VSCode · CLI-first workflows
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Agile / Scrum (RMA internship experience)
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
