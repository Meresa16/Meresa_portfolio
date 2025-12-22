
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import CryptoDashboard from '../components/CryptoDashboard'; 

// --- 1. Project Interface (Must be defined here for type safety) ---
export interface Project {
  title: string;
  company: string;
  year: string;
  type: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  sourceUrl: string;
  embedUrl: string | null;
  liveUrl: string | null;
}

// --- 2. Data Array (Used for the lower grid) ---
const projects: Project[] = [
  // IMPORTANT: The Crypto Monitor project is NOT here, as it's the main featured element.
  {
    title: 'Financial Fraud Detection System',
    company: 'Wegagen Bank S.C',
    year: '2025 - Present',
    type: 'Data Science',
    description: 'Developed and deployed a hybrid Financial Fraud Monitoring System utilizing Rule-Based Logic and Statistical Analysis to identify and mitigate financial fraud risks.',
    techStack: ['SQL', 'Statistical Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    sourceUrl: '',
    embedUrl: null,
    liveUrl: null,
  },
{
    title: 'App Lifecycle Management System',
    company: 'INSA',
    year: '2019 - 2022',
    type: 'Software Dev',
    description: 'Managed the full software development life cycle (SDLC). Developed scalable software solutions using the MERN stack.',
    techStack: ['ExpressJS', 'NextJS', 'MongoDB', 'Docker', 'Git'],
    imageUrl: '/task mgt.png',
    liveUrl: 'https://task-mogndb.vercel.app/login',
    sourceUrl: '',
    embedUrl: null,
  },
];

// Animation Variants (Kept for consistency)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleCardImageClick = (project: Project) => {
    setZoomedImage(project.imageUrl);
  };
  
  // Featured Project Tech Stack (For the descriptive card)
  const featuredStack = ['NodeJS', 'ExpressJS', 'BigQuery', 'dbt', 'NextJS', 'Recharts'];

  return (
    <div className="container mx-auto px-6 py-20 relative">

      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">Technical Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
          From Data Engineering pipelines to Full-Stack applications.
          Below is a <strong>Live Demo</strong> of my BigQuery integration.
        </p>
      </motion.div>

      {/* --- LIVE BIGQUERY DASHBOARD + DESCRIPTION (FEATURED SECTION) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-6">
            <div>
              {/* H2 Title */}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Real-Time API Data Pipeline
              </h2>
              
              {/* CORRECTED ARCHITECTURE FLOW DESCRIPTION */}
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Data is continuously extracted from the <strong>Source API</strong>, transformed by <strong>dbt</strong> into a clean <strong>BigQuery</strong> warehouse, and served to the browser via a <strong>Node.js/Express</strong> backend.
              </p>
            </div>
            
            {/* ARCHITECTURE BADGES */}
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2 justify-end">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                ELT: dbt / BigQuery
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200">
                API: Node.js (Express)
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                Frontend: React
              </span>
            </div>
          </div>
          
          <CryptoDashboard />
          
          {/* --- PROJECT DETAILS PANEL (Below Dashboard) --- */}
          <div className="mt-6">

            
            {/* Source Link Footer for the Dashboard */}
            {/* <div className="mt-4 text-sm text-center">
                <a 
                    href="https://github.com/Meresa16/crypto-etl" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                >
                    View Complete Pipeline Source Code
                </a>
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* --- PROJECT GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {projects.map((project, index) => (
          <div key={index} className="relative">
            <ProjectCard
              project={project}
              onImageClick={() => handleCardImageClick(project)}
            />
          </div>
        ))}
      </motion.div>

      {/* --- MODAL FOR IMAGE ZOOM (NEW) --- */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-full overflow-hidden"
            >
              <button 
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img src={zoomedImage} alt="Zoomed Project View" className="w-full h-auto object-contain rounded-lg shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL FOR EMBEDDED IFRAMES (Existing - remains the same) --- */}
      <AnimatePresence>
        {selectedProject && selectedProject.embedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-white dark:bg-gray-900 w-full h-[85vh] max-w-6xl rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold dark:text-white">{selectedProject.title}</h3>
                <div className="flex gap-2">
                   {selectedProject.sourceUrl && (
                     <a href={selectedProject.sourceUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                       <Github size={20} className="dark:text-white"/>
                     </a>
                   )}
                   <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full">
                     <X size={24} />
                   </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-black">
                <iframe
                  src={selectedProject.embedUrl}
                  title="Project Demo"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
