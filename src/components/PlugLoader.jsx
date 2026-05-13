import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Power } from 'lucide-react';

const PlugLoader = ({ onPowerOn }) => {
  const [isPlugged, setIsPlugged] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  
  const plugRef = useRef(null);
  const socketRef = useRef(null);
  const controls = useAnimation();
  const wrapperControls = useAnimation();
  
  const x = useMotionValue(-150); // Start slightly left
  const y = useMotionValue(0);
  
  const [wirePath, setWirePath] = useState('');
  const [rightWirePath, setRightWirePath] = useState('');

  useEffect(() => {
    controls.start({ x: -100, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } });
  }, [controls]);

  const updateWire = () => {
    if (plugRef.current) {
      const rect = plugRef.current.getBoundingClientRect();
      
      // Left Wire (Male Plug)
      const startX = -50; 
      const startY = window.innerHeight / 2;
      const endX = rect.left;
      const endY = rect.top + rect.height / 2;
      
      const waveAmplitude = 150; // S-curve height
      
      const midX1 = startX + (endX - startX) * 0.3;
      const midX2 = startX + (endX - startX) * 0.7;
      
      setWirePath(`M ${startX} ${startY} C ${midX1} ${startY + waveAmplitude}, ${midX2} ${endY - waveAmplitude}, ${endX} ${endY}`);

      // Right Wire (Female Plug)
      if (socketRef.current) {
        const socketRect = socketRef.current.getBoundingClientRect();
        const rStartX = socketRect.right;
        const rStartY = socketRect.top + socketRect.height / 2;
        const rEndX = window.innerWidth + 50;
        const rEndY = window.innerHeight / 2;

        const rMidX1 = rStartX + (rEndX - rStartX) * 0.3;
        const rMidX2 = rStartX + (rEndX - rStartX) * 0.7;

        setRightWirePath(`M ${rStartX} ${rStartY} C ${rMidX1} ${rStartY - waveAmplitude}, ${rMidX2} ${rEndY + waveAmplitude}, ${rEndX} ${rEndY}`);
      }
    }
  };

  useEffect(() => {
    updateWire();
    window.addEventListener('resize', updateWire);
    
    let animationFrameId;
    const loop = () => {
      updateWire();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', updateWire);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDragEnd = (e, info) => {
    if (!socketRef.current || !plugRef.current) return;
    
    const socketRect = socketRef.current.getBoundingClientRect();
    const plugRect = plugRef.current.getBoundingClientRect();

    const socketCenterX = socketRect.left + socketRect.width / 2;
    const socketCenterY = socketRect.top + socketRect.height / 2;
    const plugCenterX = plugRect.left + plugRect.width / 2;
    const plugCenterY = plugRect.top + plugRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(socketCenterX - plugCenterX, 2) + Math.pow(socketCenterY - plugCenterY, 2)
    );

    // Snap horizontally!
    if (distance < 150) {
      setIsPlugged(true);
      
      // Target alignment: 
      // Male plug body has h-16 (64px). Female body has h-20 (80px).
      // Center difference is 8px.
      const targetY = socketRect.top + 8;
      
      // Prongs are w-12 (48px). So right edge of male plug body touches left edge of female socket.
      const targetX = socketRect.left - plugRect.width + 50; 
      
      const deltaX = targetX - plugRect.left;
      const deltaY = targetY - plugRect.top;
      
      controls.start({ 
        x: x.get() + deltaX, 
        y: y.get() + deltaY, 
        transition: { type: 'spring', stiffness: 400, damping: 25 } 
      });
    } else {
      controls.start({ x: -100, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } });
    }
  };

  const handlePowerClick = () => {
    setIsPowered(true);
    setShowSparks(true);
    
    // Wait for sparks, then gravity drop
    setTimeout(() => {
      setShowSparks(false);
      wrapperControls.start({
        y: window.innerHeight + 500,
        rotate: 15,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
      
      // Tell App.jsx to render website
      setTimeout(() => {
        onPowerOn();
      }, 800);
    }, 1000); 
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#02050A] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Title */}
      <motion.div 
        animate={wrapperControls}
        className="absolute top-20 text-center z-10 pointer-events-none w-full"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-neonPurple tracking-tighter mb-4"
        >
          SYSTEM OFFLINE
        </motion.h1>
        <p className="text-textSecondary text-sm md:text-base tracking-widest uppercase">
          {isPlugged ? "Power source connected. Initialize system." : "Connect power source to proceed."}
        </p>
      </motion.div>

      {/* Wrapping Container for Physics Drop */}
      <motion.div 
        animate={wrapperControls} 
        className="absolute inset-0 flex items-center justify-center"
      >
        
        {/* The Dynamic SVG Wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          {/* Left Wire */}
          <path
            d={wirePath}
            fill="none"
            stroke={isPowered ? "#00F5FF" : "#475569"}
            strokeWidth="8"
            strokeLinecap="round"
            className={`transition-colors duration-500 ${isPowered ? 'drop-shadow-[0_0_15px_#00F5FF]' : ''}`}
          />
          {/* Right Wire */}
          <path
            d={rightWirePath}
            fill="none"
            stroke={isPowered ? "#00F5FF" : "#475569"}
            strokeWidth="8"
            strokeLinecap="round"
            className={`transition-colors duration-500 ${isPowered ? 'drop-shadow-[0_0_15px_#00F5FF]' : ''}`}
          />
          {isPowered && (
            <>
             <circle r="6" fill="#fff" className="drop-shadow-[0_0_15px_#fff]">
               <animateMotion dur="0.4s" repeatCount="3" path={wirePath} />
             </circle>
             <circle r="6" fill="#fff" className="drop-shadow-[0_0_15px_#fff]">
               <animateMotion dur="0.4s" repeatCount="3" path={rightWirePath} />
             </circle>
            </>
          )}
        </svg>

        {/* The Male Plug (Draggable, Left) */}
        <motion.div
          ref={plugRef}
          drag={!isPlugged}
          dragConstraints={{ left: -400, right: 100, top: -300, bottom: 300 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={false}
          style={{ x, y, touchAction: 'none' }}
          whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
          className={`absolute z-20 h-16 flex flex-row items-center justify-start ${!isPlugged ? 'cursor-grab' : ''}`}
        >
          {/* Wire nub (Left) */}
          <div className="w-8 h-4 bg-slate-700 rounded-l-sm mr-[-2px] z-0 shadow-inner"></div>
          
          {/* Male Plug Body */}
          <div className="w-24 h-16 bg-slate-800 rounded-l-3xl rounded-r-md border-2 border-slate-600 flex flex-col items-center justify-center shadow-[-10px_0_20px_rgba(0,0,0,0.5)] z-10 relative overflow-hidden">
            <div className="w-8 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${isPowered ? 'bg-electricBlue drop-shadow-[0_0_10px_#00F5FF]' : isPlugged ? 'bg-yellow-500 drop-shadow-[0_0_10px_#EAB308]' : 'bg-red-500'}`}></div>
            </div>
            {/* Grip lines */}
            <div className="absolute right-2 top-2 bottom-2 w-4 flex flex-col justify-between py-1 opacity-20">
               <div className="w-full h-1 bg-white rounded-full"></div>
               <div className="w-full h-1 bg-white rounded-full"></div>
               <div className="w-full h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Prongs (Right) */}
          <div className="flex flex-col gap-3 ml-[-2px] z-0">
            <div className={`w-12 h-2.5 rounded-r-sm ${isPlugged ? 'bg-electricBlue drop-shadow-[0_0_8px_#00F5FF]' : 'bg-slate-400'}`}></div>
            <div className={`w-12 h-2.5 rounded-r-sm ${isPlugged ? 'bg-electricBlue drop-shadow-[0_0_8px_#00F5FF]' : 'bg-slate-400'}`}></div>
          </div>
        </motion.div>

        {/* The Female Plug Socket (Fixed, Right) */}
        <div 
          ref={socketRef}
          className={`ml-48 z-30 flex flex-row items-center justify-start transition-all duration-500 relative`}
        >
          {/* Female Body */}
          <div className={`w-28 h-20 rounded-r-3xl rounded-l-md border-2 flex items-center justify-start relative overflow-hidden shadow-[10px_0_20px_rgba(0,0,0,0.5)] ${isPlugged ? 'border-electricBlue bg-slate-800' : 'border-slate-600 bg-slate-800'}`}>
             {/* Dark depth shadow inside to give it a recessed look */}
             <div className="absolute inset-0 shadow-[inset_15px_0_20px_rgba(0,0,0,0.9)] pointer-events-none z-30"></div>

             {/* Grip lines */}
             <div className="absolute left-20 top-2 bottom-2 w-4 flex flex-col justify-between py-2 opacity-20 z-40">
               <div className="w-full h-1 bg-white rounded-full"></div>
               <div className="w-full h-1 bg-white rounded-full"></div>
               <div className="w-full h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Wire nub (Right) */}
          <div className="w-8 h-4 bg-slate-700 rounded-r-sm ml-[-2px] z-0 shadow-inner"></div>

          {/* Highly Realistic Electric Spark Explosion (Anchored to socket entrance) */}
          {showSparks && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-[100] w-1 h-1 pointer-events-none overflow-visible">
              
              {/* Intense Core Flash */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 4, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.3 }}
                className="absolute -top-16 -left-16 w-32 h-32 bg-white rounded-full mix-blend-screen blur-xl"
              />
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 8, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute -top-32 -left-32 w-64 h-64 bg-electricBlue rounded-full mix-blend-screen blur-2xl opacity-50"
              />

              {/* Lightning Arcs (ZigZags) */}
              {[...Array(6)].map((_, i) => (
                <motion.svg
                  key={`lightning-${i}`}
                  className="absolute top-0 left-0 overflow-visible"
                  initial={{ opacity: 0, scale: 0, rotate: i * 60 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    scale: [0.5, 1.5, 2, 2],
                  }}
                  transition={{ duration: 0.2 + Math.random() * 0.2, times: [0, 0.2, 0.8, 1] }}
                >
                  <path
                    d={`M 0 0 L ${15 + Math.random()*30} ${-15 - Math.random()*30} L ${40 + Math.random()*30} ${15 + Math.random()*30} L ${80 + Math.random()*80} ${-30 - Math.random()*60}`}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_10px_#00F5FF]"
                  />
                </motion.svg>
              ))}

              {/* Falling Hot Sparks (Embers with Gravity) */}
              {[...Array(40)].map((_, i) => {
                 const angle = (Math.random() - 0.5) * Math.PI * 1.5; // Spread mostly left/up/down
                 const velocity = 200 + Math.random() * 400;
                 const targetX = Math.cos(angle) * velocity * (Math.random() > 0.3 ? -1 : 1); // Prefer leftwards blast
                 const targetY = Math.sin(angle) * velocity;
                 
                 return (
                  <motion.div
                    key={`ember-${i}`}
                    initial={{ x: 0, y: 0, scale: Math.random() * 1.5 + 0.5, opacity: 1 }}
                    animate={{ 
                      x: targetX, 
                      // Gravity effect: shoots out then curves sharply down
                      y: [0, targetY - 150, targetY + 800], 
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 0.6 + Math.random() * 0.5, ease: "easeIn" }}
                    className="absolute w-2 h-2 bg-yellow-100 rounded-full shadow-[0_0_12px_#EAB308]"
                  />
                )
              })}
            </div>
          )}
        </div>

      </motion.div>

      {/* The Power Switch */}
      {isPlugged && (
        <motion.div 
          animate={wrapperControls}
          className="absolute bottom-20 z-40"
        >
          <motion.button 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.3 }}
            onClick={handlePowerClick}
            disabled={isPowered}
            className={`group relative px-8 py-4 rounded-full flex items-center gap-3 overflow-hidden transition-all duration-300 ${isPowered ? 'scale-95 bg-electricBlue/20' : 'hover:scale-105 bg-gray-900 border border-gray-700 hover:border-electricBlue'}`}
          >
            {isPowered && <div className="absolute inset-0 bg-electricBlue animate-pulse"></div>}
            <Power className={`relative z-10 ${isPowered ? 'text-white' : 'text-electricBlue group-hover:drop-shadow-[0_0_8px_#00F5FF]'}`} size={24} />
            <span className={`relative z-10 font-bold tracking-widest ${isPowered ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
              {isPowered ? 'INITIATING...' : 'SYSTEM START'}
            </span>
          </motion.button>
        </motion.div>
      )}

    </div>
  );
};

export default PlugLoader;
