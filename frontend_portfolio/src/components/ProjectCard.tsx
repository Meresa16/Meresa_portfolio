

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Github, Building2, Calendar, Maximize } from 'lucide-react';
import { Project } from '../pages/Projects'; 

// New Interface for the Card Props
interface ProjectCardProps {
  project: Project;
  onImageClick: () => void; // Added click handler prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageClick }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Image Section - Now Clickable for Zoom */}
      <div className="relative cursor-pointer group" onClick={onImageClick}>
        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
        {/* Overlay for Visual Cue */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize className="text-white" size={32} />
        </div>
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
          {project.type}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{project.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
             <span className="flex items-center"><Building2 size={14} className="mr-1"/> {project.company}</span>
             <span className="flex items-center"><Calendar size={14} className="mr-1"/> {project.year}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
          
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium border border-gray-200 dark:border-gray-600">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex space-x-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors flex items-center text-sm font-medium">
                <Globe size={18} className="mr-1" /> Live Demo
              </a>
            )}
            {project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 transition-colors flex items-center text-sm font-medium">
                <Github size={18} className="mr-1" /> Source Code
              </a>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;