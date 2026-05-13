import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'py-4 glassmorphism shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="#home"
          className="text-2xl font-bold tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white">DEV</span>
          <span className="text-electricBlue text-glow">.CORE</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-textSecondary hover:text-white transition-colors text-sm uppercase tracking-widest relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-electricBlue transition-all group-hover:w-full shadow-[0_0_8px_#00F5FF]"></span>
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-backgroundPrimary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-white font-medium hover:text-electricBlue hover:text-glow transition-all"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
