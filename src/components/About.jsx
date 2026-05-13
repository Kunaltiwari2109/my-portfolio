import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/animations';
import { Code2, Cpu, Sparkles, Layers } from 'lucide-react';

const chips = [
  { icon: Code2, label: 'Problem Solver' },
  { icon: Layers, label: 'MERN Learner' },
  { icon: Sparkles, label: 'Creative Developer' },
  { icon: Cpu, label: 'UI Explorer' },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn('up')}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-textSecondary">Who I Am</span>
          </h2>
          <div className="w-24 h-1 bg-electricBlue mx-auto rounded-full shadow-[0_0_10px_#00F5FF]"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonPurple/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Left: Text & Story */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* WRITE YOUR ABOUT TEXT HERE */}
            <motion.p variants={fadeIn('up')} className="text-xl text-textPrimary font-light leading-relaxed">
              I'm an aspiring developer focused on building interactive, high-performance web applications that don't just look good, but feel <span className="text-electricBlue text-glow font-medium">alive</span>.
            </motion.p>
            
            <motion.p variants={fadeIn('up')} className="text-textSecondary leading-relaxed">
              My journey began with a curiosity for how things work on the internet. Since then, I've dived deep into modern web technologies, specifically the MERN stack. I believe that a great user interface is the bridge between complex logic and human intuition.
            </motion.p>

            <motion.p variants={fadeIn('up')} className="text-textSecondary leading-relaxed">
              When I'm not coding, I'm usually exploring new design trends, learning advanced animation libraries, or tinkering with open-source projects.
            </motion.p>
          </motion.div>

          {/* Right: Floating Highlight Cards */}
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {chips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeIn('left', index * 0.1)}
                  className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-electricBlue/50 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/0 to-electricBlue/5 group-hover:to-electricBlue/20 transition-all"></div>
                  <Icon className="text-electricBlue mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h3 className="text-lg font-medium text-white">{chip.label}</h3>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
