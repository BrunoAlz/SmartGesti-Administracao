import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star,
  Quote,
  TrendingUp,
  Clock,
  Users,
  Heart,
  Award,
  CheckCircle,
  Play,
  ArrowRight,
} from "lucide-react";

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Dra. Marina Santos",
      specialty: "Odontologia Estética",
      clinic: "Clínica Sorriso Perfeito",
      location: "São Paulo, SP",
      rating: 5,
      image: "👩‍⚕️",
      quote:
        "Em 6 meses economizei 4 horas por dia com a automação. O Doutor IA sugere tratamentos que eu nem havia considerado, aumentando minha taxa de sucesso em 35%.",
      results: [
        { metric: "Tempo economizado", value: "4h/dia" },
        { metric: "Taxa de sucesso", value: "+35%" },
        { metric: "Satisfação pacientes", value: "98%" },
      ],
      featured: true,
    },
    {
      name: "Dr. Roberto Lima",
      specialty: "Cardiologia",
      clinic: "CardioCenter",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      image: "👨‍⚕️",
      quote:
        "A integração com meus equipamentos foi perfeita. Os relatórios automáticos me dão insights que transformaram minha prática médica.",
      results: [
        { metric: "Precisão diagnóstica", value: "+28%" },
        { metric: "Pacientes atendidos", value: "+50%" },
        { metric: "ROI", value: "420%" },
      ],
    },
    {
      name: "Dra. Ana Costa",
      specialty: "Dermatologia",
      clinic: "DermaClínica Premium",
      location: "Belo Horizonte, MG",
      rating: 5,
      image: "👩‍🔬",
      quote:
        "Migrei de 3 sistemas diferentes para este. Agora tudo funciona em harmonia. Meus pacientes adoram o agendamento automático via WhatsApp.",
      results: [
        { metric: "Sistemas unificados", value: "3→1" },
        { metric: "Agendamentos", value: "+67%" },
        { metric: "No-show", value: "-78%" },
      ],
    },
    {
      name: "Dr. Carlos Mendes",
      specialty: "Ortopedia",
      clinic: "OrthoSport",
      location: "Brasília, DF",
      rating: 5,
      image: "👨‍⚕️",
      quote:
        "A gestão de múltiplas clínicas ficou incrivelmente simples. O dashboard me mostra tudo que preciso em tempo real.",
      results: [
        { metric: "Clínicas gerenciadas", value: "5" },
        { metric: "Visibilidade", value: "100%" },
        { metric: "Eficiência admin", value: "+89%" },
      ],
    },
  ];

  const stats = [
    {
      icon: Users,
      number: "1.200+",
      label: "Profissionais de Saúde",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Avaliação Média",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Recomendam o Sistema",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Clock,
      number: "3.2h",
      label: "Tempo Médio Economizado/Dia",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50"></div>

        {/* Floating testimonial elements */}
        {["💬", "⭐", "❤️", "👍", "🎯", "🚀"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-10"
            style={{
              left: `${5 + i * 18}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {emoji}
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 rounded-full text-sm font-semibold mb-6 border border-green-200"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Heart className="w-4 h-4" />
            Depoimentos Reais
            <Award className="w-4 h-4" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">O que dizem nossos</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-purple-600">
              profissionais de saúde
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Histórias reais de transformação. Veja como médicos e dentistas
            estão revolucionando suas práticas com nossa tecnologia.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <motion.div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                whileHover={{ rotate: 5 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Featured Testimonial */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Background Effect */}
            <motion.div
              className="absolute inset-0 bg-white/5"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <Quote className="w-12 h-12 text-cyan-200 mb-6" />

                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    "{testimonials[0].quote}"
                  </blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {testimonials[0].results.map((result, index) => (
                      <motion.div
                        key={result.metric}
                        className="text-center p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <div className="text-2xl font-bold text-cyan-200 mb-1">
                          {result.value}
                        </div>
                        <div className="text-sm text-blue-100">
                          {result.metric}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-4xl mb-4">
                    {testimonials[0].image}
                  </div>

                  <div className="mb-3">
                    <div className="font-bold text-lg">
                      {testimonials[0].name}
                    </div>
                    <div className="text-cyan-200">
                      {testimonials[0].specialty}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {testimonials[0].clinic}
                    </div>
                    <div className="text-blue-200 text-xs">
                      {testimonials[0].location}
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <motion.button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur text-white text-sm font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-4 h-4" />
                    Ver Vídeo
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Testimonials */}
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 + index * 0.2, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                  {testimonial.image}
                </div>

                <div className="flex-1">
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600 text-sm">
                    {testimonial.specialty}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.clinic} • {testimonial.location}
                  </div>

                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Quote className="w-8 h-8 text-gray-300 mb-4" />

              <blockquote className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              <div className="grid grid-cols-3 gap-2">
                {testimonial.results.map((result, resultIndex) => (
                  <div
                    key={result.metric}
                    className="text-center p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="text-lg font-bold text-blue-600">
                      {result.value}
                    </div>
                    <div className="text-xs text-gray-600">{result.metric}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <p className="text-gray-600 mb-6">
            Junte-se a mais de 1.200 profissionais que já transformaram suas
            práticas
          </p>

          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5" />
            Começar Minha Transformação
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
