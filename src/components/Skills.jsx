import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiFramer } from 'react-icons/si';

const skills = [
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26', level: 90 },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', level: 85 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 80 },
  { name: 'React', icon: FaReact, color: '#61DAFB', level: 75 },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 70 },
  { name: 'Express', icon: SiExpress, color: '#FFFFFF', level: 70 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 65 },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 60 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 85 },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', level: 60 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Network Lines Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #00F5FF 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn('up')}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-white">Power Grid</span>
          </h2>
          <p className="text-textSecondary uppercase tracking-widest text-sm">System Capabilities & Technologies</p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={fadeIn('up', index * 0.05)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glassmorphism rounded-xl p-6 flex flex-col items-center justify-center gap-4 relative group overflow-hidden border border-white/5 hover:border-electricBlue/50 transition-all duration-300"
              >
                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-t from-electricBlue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                
                <Icon 
                  size={48} 
                  style={{ color: skill.color }} 
                  className="group-hover:scale-110 transition-transform duration-300 filter group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_currentColor]" 
                />
                
                <span className="font-medium text-textPrimary group-hover:text-white transition-colors">
                  {skill.name}
                </span>

                {/* Animated Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neonPurple to-electricBlue"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
