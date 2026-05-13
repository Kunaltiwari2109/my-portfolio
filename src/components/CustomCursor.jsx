import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-electricBlue rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-neonPurple rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_#8B5CF6]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.4 }}
      />
      {/* Background ambient glow attached to cursor */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-neonPurple/5 rounded-full pointer-events-none z-0 blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
