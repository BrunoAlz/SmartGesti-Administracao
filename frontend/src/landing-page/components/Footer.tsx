import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Shield,
  Lock,
  Award,
  Clock,
  ArrowRight,
  Stethoscope,
  Brain,
  Calendar,
  CreditCard,
  FileText,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Agendamento Online", icon: Calendar },
    { name: "Doutor IA", icon: Brain },
    { name: "Prontuário Eletrônico", icon: FileText },
    { name: "Gestão de Pacientes", icon: Users },
    { name: "Relatórios", icon: BarChart3 },
    { name: "Notificações", icon: Bell },
    { name: "Pagamentos", icon: CreditCard },
    { name: "Integrações", icon: Shield },
  ];

  const companyLinks = [
    "Sobre Nós",
    "Nossa História",
    "Equipe",
    "Carreiras",
    "Imprensa",
    "Blog",
    "Parceiros",
    "Contato",
  ];

  const resourcesLinks = [
    "Central de Ajuda",
    "Documentação API",
    "Guias e Tutoriais",
    "Webinars",
    "Status do Sistema",
    "Changelog",
    "Comunidade",
    "Suporte",
  ];

  const legalLinks = [
    "Termos de Uso",
    "Política de Privacidade",
    "LGPD Compliance",
    "Segurança",
    "Certificações",
    "SLA",
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "hover:text-pink-500",
    },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:text-blue-400" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "hover:text-blue-600",
    },
    { name: "YouTube", icon: Youtube, url: "#", color: "hover:text-red-500" },
  ];

  const certifications = [
    { name: "LGPD", desc: "Compliance", icon: Shield },
    { name: "ISO 27001", desc: "Segurança", icon: Lock },
    { name: "ANVISA", desc: "Aprovado", icon: Award },
    { name: "24/7", desc: "Suporte", icon: Clock },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        {/* Floating medical icons */}
        {[Stethoscope, Heart, Brain, Shield].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            <Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="py-12 border-b border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Fique por dentro das novidades da saúde digital
            </h3>
            <p className="text-cyan-200 mb-8 max-w-2xl mx-auto">
              Receba dicas exclusivas, casos de sucesso e as últimas tendências
              em tecnologia médica diretamente no seu email.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <motion.input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Assinar
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <p className="text-cyan-300 text-sm mt-4">
              📧 Newsletter semanal • 🚫 Sem spam • ✅ Cancele quando quiser
            </p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Stethoscope className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Odonto Premium</h3>
                <p className="text-cyan-300 text-sm">
                  Saúde Digital Inteligente
                </p>
              </div>
            </div>

            <p className="text-cyan-100 leading-relaxed mb-6">
              Transformando a prática médica e odontológica com tecnologia de
              ponta, inteligência artificial e soluções que realmente funcionam.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-cyan-200">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@odontopremium.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-200">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-200">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className={`w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-lg flex items-center justify-center text-cyan-200 transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Produtos</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href="#"
                    className="flex items-center gap-2 text-cyan-200 hover:text-white transition-colors text-sm group"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-cyan-200 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Recursos</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-cyan-200 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-cyan-200 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <cert.icon className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {cert.name}
                  </div>
                  <div className="text-cyan-300 text-xs">{cert.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-cyan-200 text-sm mb-4 md:mb-0">
            <span>© 2024 Odonto Premium. Todos os direitos reservados.</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>Feito com amor no Brasil</span>
          </div>

          <div className="text-cyan-300 text-sm">
            Versão 2.1.4 • Última atualização: Janeiro 2024
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
