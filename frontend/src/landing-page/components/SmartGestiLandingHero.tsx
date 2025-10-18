import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import {
  Play,
  Star,
  Users,
  BarChart3,
  Shield,
  Brain,
  Settings,
  Zap,
  ChevronRight,
} from "lucide-react";

interface SmartGestiLandingHeroProps {
  systemName?: string;
  description?: string;
}

export default function SmartGestiLandingHero({
  systemName = "SmartGesTI",
  description = "Sistema Administrativo Inteligente",
}: SmartGestiLandingHeroProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Partículas flutuantes
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      {/* Background animado */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-cyan-900/50"></div>

        {/* Partículas flutuantes */}
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [
                null,
                -100,
                (typeof window !== "undefined" ? window.innerHeight : 800) +
                  100,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Ondas de fundo */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-40 text-white/5"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      {/* Elementos Flutuantes de Tecnologia */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-fluid px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center min-h-screen">
          {/* Conteúdo centralizado */}
          <motion.div
            className="text-center space-y-8 max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            {/* Badge de SAAS */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-800 rounded-full text-base font-semibold border-2 border-cyan-200 shadow-lg relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Settings className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10">
                  🚀 Sistema Administrativo Inteligente 🚀
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-200/50 to-blue-200/50"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Título principal */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className="block">Transforme sua</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  <TypeAnimation
                    sequence={[
                      "Gestão Administrativa!",
                      2000,
                      "Controle de Processos!",
                      2000,
                      "Análise de Dados!",
                      2000,
                      "Automação Inteligente!",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </motion.h1>

              {/* Texto descritivo */}
              <motion.div
                className="space-y-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <p className="text-xl md:text-2xl text-cyan-100 leading-relaxed font-medium">
                  A plataforma completa de{" "}
                  <span className="font-bold text-cyan-300 relative">
                    administração inteligente
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ delay: 2, duration: 0.8 }}
                    />
                  </span>{" "}
                  para empresas que desejam{" "}
                  <span className="text-blue-200">otimizar seus processos</span>.
                </p>

                <motion.p
                  className="text-lg text-cyan-200 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  Dashboard avançado, relatórios em tempo real, IA integrada,
                  automação de processos, análise de dados e muito mais em uma
                  única plataforma administrativa.
                </motion.p>
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                <motion.button
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Começar Gratuitamente</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>

                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Assistir Demo</span>
                </motion.button>
              </motion.div>

              {/* Prova social */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-cyan-200 font-medium">
                    4.9/5 (500+ avaliações)
                  </span>
                </div>

                <div className="w-px h-6 bg-white/20 hidden sm:block" />

                <div className="flex items-center gap-2 text-cyan-200">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">
                    1.200+ profissionais ativos
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Estatísticas impressionantes */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  98%
                </motion.div>
                <div className="text-cyan-200">
                  Redução no tempo de agendamento
                </div>
              </div>

              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-blue-300 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Brain className="w-10 h-10 mx-auto" />
                </motion.div>
                <div className="text-cyan-200">IA Integrada</div>
              </div>

              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-purple-300 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Shield className="w-10 h-10 mx-auto" />
                </motion.div>
                <div className="text-cyan-200">100% Seguro LGPD</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
