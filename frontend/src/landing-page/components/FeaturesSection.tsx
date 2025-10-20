import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Brain,
  CreditCard,
  Bell,
  BarChart3,
  Users,
  Zap,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description:
        "Sistema de agendamento automatizado com IA que otimiza sua agenda e reduz faltas.",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Redução de 80% nas faltas",
        "Agenda otimizada automaticamente",
        "Confirmações automáticas",
      ],
    },
    {
      icon: Brain,
      title: "Doutor IA Integrada",
      description:
        "Assistente de IA que auxilia em diagnósticos, sugestões de tratamento e análise de prontuários.",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Suporte em diagnósticos",
        "Análise de histórico",
        "Sugestões de tratamento",
      ],
    },
    {
      icon: CreditCard,
      title: "Pagamentos Facilitados",
      description:
        "Integração com múltiplas formas de pagamento, PIX, cartões e parcelamentos automáticos.",
      color: "from-green-500 to-emerald-500",
      benefits: [
        "PIX instantâneo",
        "Parcelamento automático",
        "Conciliação bancária",
      ],
    },
    {
      icon: Bell,
      title: "Notificações Inteligentes",
      description:
        "Sistema de comunicação automatizada via WhatsApp, SMS e e-mail para pacientes.",
      color: "from-orange-500 to-yellow-500",
      benefits: [
        "WhatsApp Business",
        "Lembretes automáticos",
        "Marketing personalizado",
      ],
    },
    {
      icon: BarChart3,
      title: "Relatórios Avançados",
      description:
        "Dashboards em tempo real com insights de performance, faturamento e crescimento.",
      color: "from-indigo-500 to-blue-500",
      benefits: [
        "Métricas em tempo real",
        "Análise de tendências",
        "Relatórios personalizados",
      ],
    },
    {
      icon: Users,
      title: "Gestão de Pacientes",
      description:
        "Prontuários digitais completos, histórico médico e acompanhamento personalizado.",
      color: "from-teal-500 to-cyan-500",
      benefits: [
        "Prontuários digitais",
        "Histórico completo",
        "Fotos e anexos",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da seção */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Zap className="w-4 h-4" />
            Recursos Principais
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tudo que você precisa para
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              modernizar sua prática
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma completa que integra todas as necessidades do seu
            consultório em um só lugar, com tecnologia de ponta e facilidade de
            uso.
          </p>
        </motion.div>

        {/* Grid de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              {/* Ícone com gradiente */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <feature.icon className="w-full h-full text-white" />
              </motion.div>

              {/* Conteúdo */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefícios */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`}
                    />
                    {benefit}
                  </motion.li>
                ))}
              </ul>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                layoutId={`hover-${index}`}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA da seção */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
            Ver Todos os Recursos
            <TrendingUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
