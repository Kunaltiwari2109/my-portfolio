import { motion } from 'framer-motion';
import { Download, Terminal } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      
      {/* Background ambient lighting specific to hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electricBlue/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeIn('up')} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6">
            <span className="w-2 h-2 rounded-full bg-electricBlue animate-pulse"></span>
            <span className="text-sm font-medium text-electricBlue tracking-wider">SYSTEM ONLINE // STATUS: OPTIMAL</span>
          </motion.div>

          {/* INSERT YOUR NAME HERE */}
          <motion.h1 variants={fadeIn('up')} className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-neonPurple">
              Kunal
            </span>
          </motion.h1>

          <motion.div variants={fadeIn('up')} className="h-12 mb-6">
            {/* Typing roles using pure CSS or simple logic. For cinematic feel, a static text with glow works well, or a simple animation */}
            <h2 className="text-2xl md:text-3xl font-light text-textSecondary border-l-4 border-neonPurple pl-4">
              Creative Full Stack Developer
            </h2>
          </motion.div>

          <motion.p variants={fadeIn('up')} className="text-lg text-textSecondary max-w-lg mb-10 leading-relaxed">
            {/* INSERT YOUR TAGLINE HERE */}
            I build immersive digital experiences, bridging the gap between design and deep technical engineering. MERN stack learner, UI motion enthusiast.
          </motion.p>

          <motion.div variants={fadeIn('up')} className="flex flex-wrap gap-6">
            <a href="#projects" className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-lg">
              <div className="absolute inset-0 w-0 bg-electricBlue transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-electricBlue group-hover:text-backgroundPrimary font-semibold tracking-wide flex items-center gap-2 border border-electricBlue rounded-lg px-8 py-4 absolute inset-0">
                <Terminal size={20} />
                Explore Projects
              </span>
            </a>
            
            <a href={`${new URL('Kunal-Resume.pdf', import.meta.env.BASE_URL).href}`} target="_blank" rel="noreferrer" className="group relative px-8 py-4 rounded-lg glassmorphism border-glow hover:bg-white/10 transition-colors flex items-center gap-2 text-white font-semibold tracking-wide">
              <Download size={20} className="group-hover:text-neonPurple transition-colors" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Showcase Component / Image */}
        <motion.div
          variants={fadeIn('left', 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-80 md:w-72 md:h-[380px] rounded-2xl glassmorphism border-glow p-2 transform transition-transform duration-500 hover:rotate-2 hover:scale-[1.02]">
            <div className="absolute -inset-1 bg-gradient-to-r from-electricBlue to-neonPurple rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full w-full bg-backgroundSecondary rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              <img src={`${import.meta.env.BASE_URL}profile-pic.png`} alt="Kunal" className="object-cover w-full h-full transition-all duration-700 hover:scale-105" />
            </div>
          </div>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest text-textSecondary uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-electricBlue to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
