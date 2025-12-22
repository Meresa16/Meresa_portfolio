











import { motion, Variants } from 'framer-motion';
import { User, ShieldCheck, ExternalLink, Database, Shield, BarChart3 } from 'lucide-react';

const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const; 

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_IN_OUT } } 
};

const profileImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.7, 
      ease: EASE_IN_OUT, // FIX: Ensured this is an array constant
      delay: 0.2 
    }
  }
};

const profileTextVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: EASE_IN_OUT, // FIX: Ensured this is an array constant
      delay: 0.3 
    } 
  }
};

const credentialsVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: EASE_IN_OUT, // FIX: Ensured this is an array constant
      delay: 0.4 
    }
  }
};

export default function About() {
  // Structured data for better UI rendering
  const specialties = [
    {
      title: "Cyber Data Analytics",
      description: "Build ETL pipelines and developing rule-based for financial fraud detection.",
      icon: <Shield className="text-purple-500 w-5 h-5" />
    },
    {
      title: "Data Engineering",
      description: "Designing data warehouses model and ETL pipelines.",
      icon: <Database className="text-blue-500 w-5 h-5" />
    },
    {
      title: "Business Intelligence",
      description: "Crafting interactive dashboards that translate complex datasets into clear strategic roadmaps.",
      icon: <BarChart3 className="text-indigo-500 w-5 h-5" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 min-h-screen py-24 px-6">
      
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="animate"
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-gray-900 dark:text-white tracking-tight leading-tight">
          About Meresa Gidey
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          
          {/* Variants must be correctly defined */}
          <motion.div variants={profileImageVariants} initial="hidden" animate="animate" className="flex-shrink-0">
            <motion.img
              src="/profile.jpg" 
              alt="Meresa Gidey"
              className="w-64 h-64 rounded-full object-cover shadow-xl border-8 border-white/50 dark:border-gray-800/50 bg-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              whileHover={{ rotate: 2, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>

          <motion.div
            variants={profileTextVariants}
            initial="hidden"
            animate="animate"
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-5 flex items-center justify-center md:justify-start">
              <User className="mr-3 size-8" /> Data Professional 
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
              With over seven years of hands-on experience, 
              I specialize in the full data lifecycle from building ETL pipelines to deploying predictive models. 
              My background spans across three core pillars:
            </p>

            {/* Structured Specialties List */}
            <ul className="space-y-4">
              {specialties.map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-white/30 dark:bg-white/5 p-3 rounded-xl border border-white/20">
                  <span className="mt-1">{item.icon}</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">{item.title}:</strong> {item.description}
                  </p>
                </li>
              ))}
            </ul>
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