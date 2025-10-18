import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  Calendar,
  Brain,
  CreditCard,
  Smartphone,
  ArrowRight,
  Sparkles,
  Trophy,
  Rocket,
} from "lucide-react";

export default function PricingPreviewSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Ideal para consultórios pequenos",
      icon: Rocket,
      monthlyPrice: 297,
      annualPrice: 247,
      popular: false,
      color: "from-blue-500 to-cyan-600",
      features: [
        "Até 3 profissionais",
        "500 agendamentos/mês",
        "Prontuário eletrônico",
        "Agenda online",
        "Notificações básicas",
        "Relatórios essenciais",
        "Suporte via chat",
        "LGPD compliance",
      ],
    },
    {
      name: "Professional",
      description: "Para clínicas em crescimento",
      icon: Star,
      monthlyPrice: 497,
      annualPrice: 397,
      popular: true,
      color: "from-purple-500 to-pink-600",
      features: [
        "Até 10 profissionais",
        "Agendamentos ilimitados",
        "Doutor IA avançado",
        "Multi-unidades",
        "WhatsApp Business",
        "Relatórios avançados",
        "API completa",
        "Integrações premium",
        "Suporte prioritário",
        "Backup automático",
      ],
    },
    {
      name: "Enterprise",
      description: "Para grandes redes de saúde",
      icon: Crown,
      monthlyPrice: 897,
      annualPrice: 697,
      popular: false,
      color: "from-amber-500 to-orange-600",
      features: [
        "Profissionais ilimitados",
        "Tudo do Professional",
        "IA personalizada",
        "Dashboard executivo",
        "Integração customizada",
        "Treinamento dedicado",
        "Gerente de conta",
        "SLA garantido",
        "White label",
        "Auditoria completa",
      ],
    },
  ];

  const savings = isAnnual ? "Economize até 20%" : "Teste grátis 14 dias";

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        {/* Floating currency symbols */}
        {["💰", "💎", "⭐", "🚀", "💳", "📈"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.div>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 rounded-full text-sm font-semibold mb-6 border border-amber-500/30"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Trophy className="w-4 h-4" />
            Planos Especiais de Lançamento
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="block">Escolha o plano ideal</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              para seu consultório
            </span>
          </h2>

          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Transforme sua prática médica com tecnologia de ponta. Teste grátis
            por 14 dias, sem compromisso.
          </p>

          {/* Toggle Anual/Mensal */}
          <motion.div
            className="inline-flex items-center bg-white/10 backdrop-blur rounded-2xl p-2 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isAnnual
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:text-cyan-300"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Mensal
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isAnnual
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                  : "text-white hover:text-cyan-300"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Anual
              {isAnnual && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full"
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  -20%
                </motion.div>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-sm rounded-3xl border overflow-hidden ${
                plan.popular
                  ? "border-purple-400/50 scale-105 shadow-2xl shadow-purple-500/25"
                  : "border-white/10 hover:border-white/20"
              } transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  ⭐ Mais Popular
                </motion.div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-cyan-200 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-cyan-200 text-lg">R$</span>
                    <motion.span
                      className="text-4xl font-bold text-white"
                      key={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </motion.span>
                    <span className="text-cyan-200 text-lg">/mês</span>
                  </div>

                  {isAnnual && (
                    <motion.div
                      className="text-sm text-cyan-300 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      R$ {plan.annualPrice * 12}/ano • Economize R${" "}
                      {(plan.monthlyPrice - plan.annualPrice) * 12}
                    </motion.div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-cyan-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + featureIndex * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl hover:shadow-2xl"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.popular ? (
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Começar Agora
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  ) : (
                    "Teste Grátis 14 dias"
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-cyan-200 mb-6 max-w-2xl mx-auto">
            Todos os planos incluem 14 dias de teste gratuito, suporte dedicado
            e todas as atualizações. Sem taxas de setup ou contratos longos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-5 h-5" />
              Ver Todos os Planos
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-5 h-5" />
              Falar com Consultor
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
