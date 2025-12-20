
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// const roles = [
//   "Cyber Data Analyst and Engineer",
//   "Data Scientist"
// ];

// export default function Home() {
//   const [text, setText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [loopNum, setLoopNum] = useState(0);
//   const [typingSpeed, setTypingSpeed] = useState(150);

//   useEffect(() => {
//     const handleType = () => {
//       const i = loopNum % roles.length;
//       const fullText = roles[i];

//       setText(isDeleting
//         ? fullText.substring(0, text.length - 1)
//         : fullText.substring(0, text.length + 1)
//       );

//       // Typing Speed Logic
//       setTypingSpeed(isDeleting ? 50 : 150);

//       if (!isDeleting && text === fullText) {
//         // Finished typing word, pause before deleting
//         setTimeout(() => setIsDeleting(true), 1500);
//       } else if (isDeleting && text === '') {
//         // Finished deleting, move to next word
//         setIsDeleting(false);
//         setLoopNum(loopNum + 1);
//       }
//     };

//     const timer = setTimeout(handleType, typingSpeed);
//     return () => clearTimeout(timer);
//   }, [text, isDeleting, loopNum, typingSpeed]);

//   return (
//     <div
//       className=" h-screen bg-cover bg-center  bg-no-repeat"
//       style={{ backgroundImage: "url('/public/image.png')" }}

//     >
//       <div className="absolute inset-0 bg-black/50" />
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

//         {/* Name Animation */}
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
//         >
//           Meresa Gidey
//         </motion.h1>

//         {/* Typewriter Role Animation */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="h-16 md:h-20 mb-2 flex items-center justify-center"
//         >
//           <span className="text-2xl md:text-5xl font-semibold text-indigo-300 mr-2">I am a</span>
//           <span className="text-3xl md:text-5xl font-bold text-white min-w-[10px]">
//             {text}
//           </span>
//           <motion.span
//             animate={{ opacity: [0, 1, 0] }}
//             transition={{ repeat: Infinity, duration: 0.8 }}
//             className="w-1 h-8 md:h-12 bg-indigo-400 ml-1 inline-block"
//           />
//         </motion.div>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
//           className="max-w-3xl text-lg md:text-2xl text-indigo-200 break-words md:break-normal mx-auto bg-transparent mb-8 leading-relaxed mt-4 text-center"
//         >
//           Specializing in SQL, ETL pipelines, predictive modeling, and business intelligence to drive data-driven strategies.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }} // Changed scale:0.8 to y:20 for a smoother entrance
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
//           className="mt-8 text-center" // Add text-center if these buttons are centered on the page
//         >
//           {/* NEW: Container for buttons to manage spacing */}
//           <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">

//             {/* PRIMARY BUTTON: Live Demo (Stronger focus on the main project) */}
//             <Link
//               to="/projects"
//               className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-[1.02] text-lg whitespace-nowrap"
//             >
//               Live Crypto Market Intelligence <ArrowRight className="ml-2" size={20} />
//             </Link>

//             {/* SECONDARY BUTTON: View Experience (More subtle styling) */}
//             <Link
//               to="/experience"
//               className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:text-indigo-400 dark:hover:text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-[1.02] text-lg whitespace-nowrap"
//             >
//               View My Experience <ArrowRight className="ml-2" size={20} />
//             </Link>
//           </div>

//         </motion.div>
//       </div>
//     </div>
//   );
// }


















import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// --- FINAL FIX: Use 'as const' outside of the component ---
// This tells TypeScript: "This array is immutable and has exactly 4 numbers, which IS the custom Easing Bezier type."
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const; 

const roles = [
  "Cyber Data Analyst and Engineer",
  "Data Scientist"
];

export default function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      // Typing Speed Logic
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        // Finished typing word, pause before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Define transition objects inline or outside. Since we use EASE_IN_OUT, let's keep them clean.
  
  return (
    <div
      className=" h-screen bg-cover bg-center  bg-no-repeat"
      style={{ backgroundImage: "url('/image.png')" }} 
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        {/* Name Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }} 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Meresa Gidey
        </motion.h1>

        {/* Typewriter Role Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-16 md:h-20 mb-2 flex items-center justify-center"
        >
          <span className="text-2xl md:text-5xl font-semibold text-indigo-300 mr-2">I am a</span>
          <span className="text-3xl md:text-5xl font-bold text-white min-w-[10px]">
            {text}
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1 h-8 md:h-12 bg-indigo-400 ml-1 inline-block"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_IN_OUT }}
          className="max-w-3xl text-lg md:text-2xl text-indigo-200 break-words md:break-normal mx-auto bg-transparent mb-8 leading-relaxed mt-4 text-center"
        >
          Specializing in SQL, ETL pipelines, predictive modeling, and business intelligence to drive data-driven strategies.
        </motion.p>

        {/* CTA Button Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE_IN_OUT }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">

            {/* PRIMARY BUTTON: Live Demo */}
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-[1.02] text-lg whitespace-nowrap"
            >
              Live Crypto Market Intelligence <ArrowRight className="ml-2" size={20} />
            </Link>

            {/* SECONDARY BUTTON: View Experience */}
            <Link
              to="/experience"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:text-indigo-400 dark:hover:text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-[1.02] text-lg whitespace-nowrap"
            >
              View My Experience <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}