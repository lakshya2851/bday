import React, { useState, useEffect } from 'react';

export default function FloatingNav({ lenisRef }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  const navItems = [
    { id: 'hero', label: '♡ Home' },
    { id: 'memories', label: '♡ Memories' },
    { id: 'lovecards', label: '♡ Things I Love' },
    { id: 'letter', label: '♡ Letter' },
    { id: 'surprise', label: '♡ Surprise' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Check active section
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(el, { offset: -40, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!visible) return null;

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-[92vw]">
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full glass-pill shadow-romantic border border-blush/40 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-rose text-white shadow-sm scale-105'
                  : 'text-burgundy/80 hover:text-burgundy hover:bg-rose/10'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
