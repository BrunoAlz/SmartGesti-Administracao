import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  Settings,
  Brain,
  BarChart3,
  Star,
  Shield,
  Home,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SmartGestiNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Detectar seção ativa
      const sections = [
        "hero",
        "features",
        "ai",
        "integrations",
        "testimonials",
        "pricing",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", href: "#hero", icon: Home, id: "hero" },
    { name: "Recursos", href: "#features", icon: Zap, id: "features" },
    { name: "IA Avançada", href: "#ai", icon: Brain, id: "ai" },
    {
      name: "Integrações",
      href: "#integrations",
      icon: BarChart3,
      id: "integrations",
    },
    {
      name: "Depoimentos",
      href: "#testimonials",
      icon: Star,
      id: "testimonials",
    },
    { name: "Preços", href: "#pricing", icon: Shield, id: "pricing" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const offset = 80; // Altura da navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className={`relative transition-all duration-500 ${
              scrolled
                ? "bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-2xl"
                : "bg-transparent backdrop-blur-none border-none shadow-none"
            }`}
          >
            {/* Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
              style={{ scaleX, originX: 0 }}
            />

            <div className="flex justify-between items-center h-16 lg:h-18 px-6">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => scrollToSection("#hero")}
              >
                <div className="relative cursor-pointer">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Settings className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 border-2 border-cyan-300 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
                <div
                  className={`transition-colors duration-500 cursor-pointer ${
                    scrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  <motion.h1
                    className="text-xl font-bold"
                    animate={{
                      background: [
                        "linear-gradient(to right, #3B82F6, #8B5CF6)",
                        "linear-gradient(to right, #06B6D4, #3B82F6)",
                        "linear-gradient(to right, #8B5CF6, #06B6D4)",
                        "linear-gradient(to right, #3B82F6, #8B5CF6)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    SmartGesTI
                  </motion.h1>
                  <p className={`text-xs opacity-75 flex items-center gap-1 ${
                    scrolled ? "text-gray-600" : "text-white"
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    Sistema Administrativo Inteligente
                  </p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                        isActive
                          ? scrolled
                            ? "text-blue-600 bg-blue-50"
                            : "text-cyan-200 bg-white/20"
                          : scrolled
                            ? "text-gray-700 hover:text-blue-600"
                            : "text-white hover:text-cyan-200"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: isActive ? 360 : 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="w-4 h-4" />
                        </motion.div>
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                          />
                        )}
                      </span>

                      {/* Background Hover Effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ${
                          scrolled
                            ? "bg-gradient-to-r from-blue-50 to-purple-50"
                            : "bg-gradient-to-r from-white/20 to-cyan-300/20"
                        }`}
                        whileHover={{ scale: 1 }}
                      />

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* CTA Button */}
                <motion.button
                  onClick={() => scrollToSection("#pricing")}
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Acessar Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    scrolled
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: isOpen ? 1 : 0.95,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 flex items-center space-x-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : -20,
                    }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  onClick={() => scrollToSection("#pricing")}
                  className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : 20,
                  }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield className="w-5 h-5" />
                  <span>Acessar Painel Admin</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer para evitar que o conteúdo fique por trás da navbar */}
      <div className="h-24"></div>
    </>
  );
}
