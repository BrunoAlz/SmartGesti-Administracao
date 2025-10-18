import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  BarChart3,
  Sparkles,
  Bot,
  Lightbulb,
  Activity,
} from "lucide-react";

export default function AISection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const aiFeatures = [
    {
      icon: Brain,
      title: "Análise Inteligente de Prontuários",
      description:
        "IA analisa histórico completo e sugere padrões importantes para diagnósticos mais precisos.",
      stats: "94% de precisão",
    },
    {
      icon: Target,
      title: "Sugestões de Tratamento",
      description:
        "Baseado em milhares de casos similares, nossa IA sugere os melhores protocolos de tratamento.",
      stats: "85% de assertividade",
    },
    {
      icon: MessageSquare,
      title: "Atendimento Automatizado",
      description:
        "Chatbot inteligente que responde pacientes 24/7 e agenda consultas automaticamente.",
      stats: "90% de satisfação",
    },
    {
      icon: TrendingUp,
      title: "Previsão de Demanda",
      description:
        "Prevê picos de demanda e sugere otimizações na agenda para maximizar seus resultados.",
      stats: "78% mais eficiência",
    },
  ];

  const benefits = [
    "Diagnósticos mais precisos com análise de padrões",
    "Redução de 60% no tempo de análise de prontuários",
    "Sugestões baseadas em 100.000+ casos reais",
    "Alertas automáticos para follow-ups importantes",
    "Análise preditiva de riscos e complicações",
    "Otimização automática de protocolos de atendimento",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        {/* Floating AI elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-6 border border-cyan-500/30"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Inteligência Artificial Revolucionária
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-4 h-4" />
            </motion.div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="block">Doutor IA: O Futuro da</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Medicina está aqui
            </span>
          </h2>

          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Nossa inteligência artificial revolucionária analisa dados médicos,
            sugere diagnósticos e otimiza tratamentos com precisão científica.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lado esquerdo - Features da IA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex gap-4 group"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-cyan-100 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lado direito - Visual da IA + Benefits */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Brain Visual */}
            <div className="relative">
              <motion.div
                className="w-full max-w-md mx-auto h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden border border-cyan-500/30"
                whileHover={{ scale: 1.02 }}
              >
                {/* Central Brain */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Brain className="w-24 h-24 text-cyan-300" />
                </motion.div>

                {/* Orbiting Elements */}
                {[FileText, Calendar, BarChart3, Activity].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                    style={{
                      left: "50%",
                      top: "50%",
                      transformOrigin: "50% 80px",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 2,
                      ease: "linear",
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                ))}

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-purple-400/10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Benefits List */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Benefícios da IA
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-cyan-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <span className="leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="w-5 h-5" />
            Testar Doutor IA Gratuitamente
            <Zap className="w-5 h-5" />
          </motion.button>

          <p className="text-cyan-200 text-sm mt-3">
            Experimente 14 dias grátis • Sem cartão de crédito
          </p>
        </motion.div>
      </div>
    </section>
  );
}
