import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/animations';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with MERN stack. Features user authentication, payment integration, and a dynamic admin dashboard.',
    image: '/project1.jpg', // PLACEHOLDER
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: '#', // PLACEHOLDER
    demo: '#' // PLACEHOLDER
  },
  {
    title: 'AI Image Generator',
    description: 'A SaaS application that generates unique images using OpenAI API. Includes a credit system, user gallery, and premium subscription model.',
    image: '/project2.jpg', // PLACEHOLDER
    tech: ['React', 'Express', 'OpenAI', 'Framer Motion'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Task Management Hub',
    description: 'A beautiful, drag-and-drop task management tool focusing on smooth UI interactions and real-time database updates.',
    image: '/project3.jpg', // PLACEHOLDER
    tech: ['Vite', 'React', 'Firebase', 'Tailwind'],
    github: '#',
    demo: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn('up')}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-electricBlue">Digital Lab</span>
          </h2>
          <p className="text-textSecondary uppercase tracking-widest text-sm">Recent Inventions</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden glassmorphism border border-white/10 hover:border-neonPurple/50 transition-all duration-500"
            >
              {/* Image Container with Hover Tilt Effect */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-backgroundPrimary/20 group-hover:bg-transparent transition-colors z-10"></div>
                
                {/* Placeholder graphic if no image is present */}
                <div className="w-full h-full bg-backgroundSecondary flex flex-col items-center justify-center border-b border-white/10 group-hover:scale-110 transition-transform duration-700">
                  <div className="text-electricBlue/30 mb-2">IMAGE PLACEHOLDER</div>
                  <code className="text-xs text-textSecondary">{project.image}</code>
                </div>

                {/* Animated Light Sweep */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] group-hover:animate-[sweep_1.5s_ease-in-out] z-20 pointer-events-none"></div>
              </div>

              {/* Content */}
              <div className="p-8 relative z-20 bg-gradient-to-b from-transparent to-backgroundPrimary">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electricBlue transition-colors">{project.title}</h3>
                <p className="text-textSecondary mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-electricBlue border border-electricBlue/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-textPrimary hover:text-white transition-colors">
                    <Github size={18} />
                    <span>Source</span>
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-electricBlue hover:text-white transition-colors ml-auto">
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
