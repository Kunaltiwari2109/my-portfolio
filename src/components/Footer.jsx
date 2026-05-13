const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-white/10 overflow-hidden">
      {/* Background soft gradient */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neonPurple/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-textSecondary text-sm flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-white font-medium">DEV<span className="text-electricBlue">.CORE</span></span>
          <span>All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-textSecondary">
          <a href="#home" className="hover:text-electricBlue transition-colors">Back to Top</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
