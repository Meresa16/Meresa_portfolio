import { motion } from 'framer-motion';
import { Code, Database, Server, Terminal } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Data Analysis & Visualization",
      icon: <Database size={24} />,
      skills: [ "SQL","Python", "Excel", ]
    },
    {
      title: "Data Engineering & Big Data",
      icon: <Server size={24} />,
      skills: ["ETL Pipelines", "Data Warehousing", "Apache Spark", "Apache Kafka", "Apache Nifi", "Oracle", "MongoDB"]
    },
    {
      title: " Data Science & ML",
      icon: <Code size={24} />,
      skills: ["TensorFlow", "Scikit-learn", "Predictive Modeling"]
    },
    {
      title: "Programming ",
      icon: <Terminal size={24} />,
      skills: ["JavaScript", "Docker", "Git" ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-6 py-12 pt-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Technical Skills</h1>
        <p className="text-gray-600 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed text-lg">
         Leveraging a diverse and powerful toolkit to tackle complex data challenges, build robust systems, and drive impactful insights.

        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto bg-gray-200 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        {skillCategories.map((cat, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg mr-4">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{cat.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}








