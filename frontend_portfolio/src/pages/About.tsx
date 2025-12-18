

import { motion } from 'framer-motion';
import { User, ShieldCheck, ExternalLink } from 'lucide-react';

// --- Animation Variants ---
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const profileImageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 }
  }
};

const profileTextVariants = {
  hidden: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 } }
};

const credentialsVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 }
  }
};

export default function About() {
  // Use the refined summary text for the profile description
  const profileSummary =
    `A Cyber Data Analyst and Data Warehouse professional with over seven years of hands-on experience in data analysis, database management, application development, and business intelligence. I excel at predictive modeling, ETL pipeline development, and crafting interactive dashboards that translate complex data into strategic insights. My technical proficiencies include Python, SQL, Apache Kafka, Apache Spark, and a range of modern data engineering tools. I am known for delivering scalable, high-quality solutions and a proactive approach to adopting new technologies.`
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 min-h-screen py-24 px-6"> {/* Vibrant gradient background */}

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="animate"
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-6xl font-extrabold text-center mb-16 text-gray-900 dark:text-white tracking-tight leading-tight">
          About Meresa Gidey
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20"> {/* Increased gap */}

          <motion.div variants={profileImageVariants} initial="hidden" animate="animate" className="flex-shrink-0">
            <motion.img
              src="/profile.jpg" // Ensure profile.jpg is in your public folder
              alt="Meresa Gidey"
              className="w-64 h-64 rounded-full object-cover shadow-xl border-8 border-white/50 dark:border-gray-800/50 bg-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              whileHover={{ rotate: 2, scale: 1.03 }} // Subtle hover effect
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
          <motion.div
            variants={profileTextVariants}
            initial="hidden"
            animate="animate"
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-5 flex items-center justify-center md:justify-start">
              <User className="mr-5 size-30" /> Cyber Data Analyst | Data Scientist | Data Warehouse & Analytics | Software & Database Development
            </h2>
            {/* This paragraph now correctly displays the refined summary */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {profileSummary}
            </p>
          </motion.div>
        </div>

        {/* Verified Digital Presence Section */}
        <motion.div
          variants={credentialsVariants}
          initial="hidden"
          animate="animate"
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg dark:backdrop-blur-xl p-12 rounded-3xl border border-indigo-200 dark:border-indigo-800 text-center shadow-lg"
        >
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-indigo-400 to-blue-500 text-white p-5 rounded-xl shadow-lg mb-7 flex items-center justify-center">
              <ShieldCheck className="w-14 h-14" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verified Digital Credentials</h3>

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed text-base">
              Explore my verified certifications and badges showcasing expertise in Data Science, Cybersecurity, and Analytics.
            </p>

            {/* Credly Link Button */}
            <motion.a
              href="https://www.credly.com/users/meresa-gidey/badges"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(90, 50, 200, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-out"
            >
              View My Credly Badges <ExternalLink size={20} className="ml-3" />
            </motion.a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}