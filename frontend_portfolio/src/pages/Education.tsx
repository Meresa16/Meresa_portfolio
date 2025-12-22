


import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

export default function Education() {
  const certifications = [
    { 
      title: "CompTIA CySA+ (Cybersecurity Analyst)", 
      issuer: "Apptech Learning Center",
      link: "" // Add URL if you have one
    },
    { 
      title: "Data Analysis Fandamentals", 
      issuer: "Udacity (Ethiopian Gov Supported)",
      link: "https://learn.udacity.com/view-certificate/nd002-gc-251" 
    },
    { 
      title: "Power BI Certificate of Achievement", 
      issuer: "365 Data Science",
      // specific link added here
      link: "https://learn.365financialanalyst.com/certificates/CC-37AF3DC2A1/" 
    },
    { 
      title: "Introduction to Data & Data Science", 
      issuer: "365 Data Science",
      link: "https://learn.365datascience.com/c/30fbcfc48a" 
    },
    { 
      title: "Introduction to Data Science", 
      issuer: "Cisco Networking Academy",
      link: "https://www.credly.com/badges/5d708d94-ebe4-4bba-89fc-8f6516142140/public_url" 
    },
       { 
      title: "Certificate of completion - SQL", 
      issuer: "365 Data Science",
      link: "https://learn.365datascience.com/c/bfb4a3ec89" 
    },
    { 
      title: "Short-term Training on Data Science", 
      issuer: "Emerald International College",
      link: "" 
    }
  ];

  return (
    <div className="container bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 mx-auto px-6 py-12 pt-24 min-h-screen transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Education & Certifications</h1>
        <p className="text-gray-600 dark:text-gray-400">My academic background and professional qualifications.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Academic Degrees */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <GraduationCap className="mr-3 text-indigo-600 dark:text-indigo-400" /> Academic Degrees
          </h2>
          <div className="space-y-6">
            {/* Masters */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">MSc in Data Science</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">Emerald International College</p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                <Calendar size={14} className="mr-2" /> 2023 – 2025
              </div>
            </div>

            {/* Bachelors */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">BSc in Information Systems</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">Mekelle University</p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                <Calendar size={14} className="mr-2" /> 2013 – 2017
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Award className="mr-3 text-indigo-600 dark:text-indigo-400" /> Certifications
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <ul className="space-y-5">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start group">
                  <CheckCircle size={20} className="mr-3 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <div className="flex-1">
                    {cert.link ? (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-200"
                      >
                        {cert.title}
                        <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <span className="block font-medium text-gray-800 dark:text-gray-200">
                        {cert.title}
                      </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mt-1">{cert.issuer}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}