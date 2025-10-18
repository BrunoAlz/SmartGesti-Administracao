import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CreditCard,
  Smartphone,
  Mail,
  Calendar,
  FileText,
  Database,
  Wifi,
  Shield,
  Zap,
  Globe,
  Settings,
  CheckCircle,
  Lock,
  Cloud,
  Plug,
  ArrowRight,
} from "lucide-react";

export default function IntegrationsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const integrations = [
    {
      category: "Pagamentos",
      icon: CreditCard,
      color: "from-green-500 to-emerald-600",
      items: [
        { name: "PIX", logo: "💸", status: "Ativo" },
        { name: "Mercado Pago", logo: "💳", status: "Ativo" },
        { name: "PagSeguro", logo: "🏦", status: "Ativo" },
        { name: "PayPal", logo: "💰", status: "Ativo" },
      ],
    },
    {
      category: "Comunicação",
      icon: Mail,
      color: "from-blue-500 to-cyan-600",
      items: [
        { name: "WhatsApp Business", logo: "📱", status: "Ativo" },
        { name: "SMS", logo: "💬", status: "Ativo" },
        { name: "Email", logo: "✉️", status: "Ativo" },
        { name: "Push Notifications", logo: "🔔", status: "Ativo" },
      ],
    },
    {
      category: "Agenda & Calendário",
      icon: Calendar,
      color: "from-purple-500 to-violet-600",
      items: [
        { name: "Google Calendar", logo: "📅", status: "Ativo" },
        { name: "Outlook", logo: "🗓️", status: "Ativo" },
        { name: "Apple Calendar", logo: "📆", status: "Ativo" },
        { name: "CalDAV", logo: "⏰", status: "Ativo" },
      ],
    },
    {
      category: "Prontuários & Laudos",
      icon: FileText,
      color: "from-orange-500 to-red-600",
      items: [
        { name: "TISS", logo: "🏥", status: "Ativo" },
        { name: "HL7", logo: "📋", status: "Ativo" },
        { name: "FHIR", logo: "🔗", status: "Ativo" },
        { name: "PDF Digital", logo: "📄", status: "Ativo" },
      ],
    },
  ];

  const features = [
    {
      icon: Plug,
      title: "API Aberta",
      description:
        "Conecte facilmente com qualquer sistema através da nossa API RESTful completa.",
    },
    {
      icon: Shield,
      title: "Segurança Certificada",
      description:
        "Todas as integrações seguem protocolos de segurança LGPD e ISO 27001.",
    },
    {
      icon: Zap,
      title: "Sincronização em Tempo Real",
      description:
        "Dados sempre atualizados entre todos os sistemas conectados.",
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Integrações robustas que funcionam 24/7 sem interrupções.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>

        {/* Floating connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${100 + i * 300},100 Q${300 + i * 200},200 ${500 + i * 100},300`}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </svg>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 rounded-full text-sm font-semibold mb-6 border border-blue-200"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Plug className="w-4 h-4" />
            Integrações Poderosas
            <Settings className="w-4 h-4" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">Conecte com</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
              Tudo que você usa
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Integre facilmente com seus sistemas favoritos. APIs abertas,
            sincronização em tempo real e segurança certificada.
          </p>
        </motion.div>

        {/* Integration Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {integrations.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * categoryIndex, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              {/* Header */}
              <div
                className={`h-32 bg-gradient-to-br ${category.color} p-6 flex flex-col justify-center items-center text-white relative overflow-hidden`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <category.icon className="w-8 h-8 mb-2 relative z-10" />
                <h3 className="text-lg font-bold text-center relative z-10">
                  {category.category}
                </h3>
              </div>

              {/* Integration Items */}
              <div className="p-6 space-y-3">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + itemIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.logo}</span>
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-semibold text-green-600">
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Row */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Background Effect */}
          <motion.div
            className="absolute inset-0 bg-white/5"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Precisa de uma integração específica?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nossa equipe de desenvolvedores pode criar integrações
              personalizadas para suas necessidades específicas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                Ver Documentação da API
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Smartphone className="w-5 h-5" />
                Solicitar Integração
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
