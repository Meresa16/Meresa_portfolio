import { motion } from 'framer-motion';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';

export default function Resume() {

  const fileId = "1AutxMwrtUzdEOluS3X0sh-6ZB6Q91rWW";

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

  return (
    <div className="pt-24 h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Toolbar / Header for Resume */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col md:flex-row justify-between items-center z-10"
      >
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">My Resume</h1>
          <p className="text-xl text-gray-900 dark:text-gray-400 text-center">Cyber Data Analyst | Data Scientist | Data Warehouse & Analytics | Software & Database Development</p>
        </div>

        <div className="flex space-x-4">
          {/* Open in Drive Button */}
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            <ExternalLink size={18} className="mr-2" /> Open Drive
          </a>

         
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            <Download size={18} className="mr-2" /> Download / Print
          </a>
        </div>
      </motion.div>

      {/* PDF Viewer Area */}
      <div className="flex-grow relative w-full h-full overflow-hidden bg-gray-200 dark:bg-gray-950 flex justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl h-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden relative"
        >
          {/* Fallback text if browser loads slowly */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 z-0">
            <AlertCircle size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
            <p>Loading Resume from Google Drive...</p>
            <p className="text-sm mt-2">If it doesn't appear, please use the button above.</p>
          </div>

          {/* The Google Drive Embed Iframe */}
          <iframe
            src={embedUrl}
            className="relative z-10 w-full h-full border-none"
            title="Meresa Gidey Resume"
            allow="autoplay"
          />
        </motion.div>
      </div>
    </div>
  );
}