// React import not required with JSX transform
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TechGrid from './TechGrid'

export default function About() {
    // default to full intro as requested
    const [showFull, setShowFull] = useState(true)
    const [toast, setToast] = useState<string | null>(null)

    // auto-hide toast after 1.2s
    useEffect(() => {
        if (!toast) return
        const t = setTimeout(() => setToast(null), 1200)
        return () => clearTimeout(t)
    }, [toast])

    // We'll render the full intro as JSX so we can inline company links where they're mentioned

    const shortIntro = `final year cs student at Lahore garrison univeristy. junior backend dev at smart computings. i build software end-to-end — backend, web, mobile, and ml.`

    return (
        <section id="about" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(3,6,6,0.6),rgba(2,4,4,0.8))]">
            {/* subtle ghost grid background instead of HackerRain for visual variety */}
            <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-6 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
                    <h2 className="text-2xl font-bold mb-2">About / What I do</h2>
                </div>

                {/* Intro + Image side-by-side (intro comes first; TechGrid moved below) */}
                <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-[#b7f5d9] font-mono">
                    <div className="md:col-span-2 text-sm space-y-4">
                        <div className="prose prose-invert text-sm relative">
                            {/* toast */}
                            <AnimatePresence>
                                {toast && (
                                    <motion.div
                                        key="toast"
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.28 }}
                                        className="absolute -top-8 left-0 text-xs text-gray-300"
                                    >
                                        {toast}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* content */}
                            <AnimatePresence mode="wait">
                                {showFull ? (
                                    <motion.div
                                        key="full"
                                        initial={{ opacity: 0, y: 6, scale: 0.995 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.995 }}
                                        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                                    >
                                        <p className="text-gray-200">
                                            i’m ghulam mustafa — a final year cs student at{' '}
                                            <a href="https://lgu.edu.pk/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">Lahore Garrison University</a>{' '}
                                            and currently working as a part-time junior backend developer at{' '}
                                            <a href="https://smartcomputings.com/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">Smart Computings</a>.
                                            {' '}over the past few years i’ve worked across multiple companies and internships including{' '}
                                            <a href="https://salvopvt.com/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">Salvo Integrated Solutions</a>,{' '}
                                            <a href="https://gcspvt.com/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">GCS Pvt Ltd.</a>,{' '}
                                            <a href="https://chelan.cc/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">Chelan Tech</a>, and{' '}
                                            <a href="https://smartcomputings.com/" target="_blank" rel="noreferrer" className="text-[#9ff1c9] underline">Smart Computings</a>.
                                            {' '}i’ve built stuff from low-level systems and apis to full web platforms and ml pipelines. most of my work sits at the intersection of backend engineering, web apps, and ai — but i’m not limited to that, i’ve touched mobile dev, databases, and even computer vision.
                                        </p>

                                        <p className="text-gray-200 whitespace-pre-line">
                                            outside code i’m into reading (tech + philosophy + classics), gym, ricing my linux setup, and living on chai/coffee. i’m not about hustle culture or grindset — i prefer consistency, focus, and just building things that actually work. sometimes for clients sometimes coz im bored.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="tldr"
                                        initial={{ opacity: 0, y: 6, scale: 0.995 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.995 }}
                                        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                                    >
                                        <p className="text-gray-200">{shortIntro}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (!showFull) setToast('Oh — you want the full story? Here it comes...')
                                        setShowFull(true)
                                    }}
                                    className={`text-xs px-3 py-1 rounded ${showFull ? 'bg-[#0b6b4a] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                                >
                                    Full
                                </button>

                                <button
                                    onClick={() => {
                                        if (showFull) setToast("Oh no — long reads can be boring. TL;DR time.")
                                        setShowFull(false)
                                    }}
                                    className={`text-xs px-3 py-1 rounded ${!showFull ? 'bg-[#0b6b4a] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                                >
                                    TL;DR
                                </button>
                            </div>

                            {/* company links moved inline into the paragraph above */}
                        </div>
                    </div>

                    {/* Placeholder image / avatar */}
                    <div className="flex justify-center md:justify-end">
                       <img
                            src="/me.jpeg"
                            alt="Ghulam Mustafa"
                            onError={(e) => {
                                // if image fails to load, replace with a fallback grey box
                                const target = e.currentTarget as HTMLImageElement
                                target.replaceWith(document.createElement('div'))
                            }}
                            className="w-44 h-44 rounded-lg border border-gray-600 object-cover shadow-sm"
                        />
                    </div>
                </div>

                <div className="mt-6 max-w-3xl mx-auto text-[#b7f5d9] font-mono text-sm space-y-4">
                    <div>
                        <div className="font-semibold"> Core Development</div>
                        <div className="text-xs text-gray-300 mt-1">
                            C · C++ · CSharp · Python · JavaScript (ES6+) · TypeScript · Bash · Assembly
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
                            TensorFlow · ScikitLearn · OpenCV · Pandas · NumPy · Matplotlib
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
                    </div>
                </div>
                {/* Technologies / TechGrid placed after intro as requested */}
                <div className="mt-8">
                    <TechGrid radius={3.2} speed={0.14} />
                </div>



            </div>
        </section>
    )
}
