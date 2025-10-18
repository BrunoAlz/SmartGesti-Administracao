import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  Brain,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import AdminAuthApiService, {
  type AdminLoginRequest,
} from "../../../services/auth/AdminAuthApiService";

// ================================
// TIPOS E INTERFACES
// ================================

interface AdminLoginForm {
  email: string;
  password: string;
  remember_me: boolean;
}

// ================================
// COMPONENTE DE TEXTO DIGITADO
// ================================

const TypingText: React.FC = () => {
  const phrases = [
    "Transformando a gestão com tecnologia avançada",
    "Revolucionando o atendimento odontológico inteligente",
    "Conectando profissionais através de soluções inovadoras",
    "Otimizando processos clínicos com inteligência artificial",
    "Construindo o futuro da saúde digital personalizada",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = phrases[currentPhrase];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < currentText.length) {
          // Digitando
          setDisplayedText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else if (isDeleting && charIndex > 0) {
          // Apagando
          setDisplayedText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else if (!isDeleting && charIndex === currentText.length) {
          // Pausar antes de apagar
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
          // Mudar para próxima frase
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }
      },
      isDeleting ? 50 : 80
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhrase, phrases]);

  return (
    <motion.p
      className="text-xl text-blue-100 mb-8 h-16 flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        textShadow:
          "0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(59, 130, 246, 0.2)",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
      }}
    >
      {displayedText}
      <motion.span
        className="ml-1 text-cyan-300"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.p>
  );
};

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<AdminLoginForm>({
    email: "",
    password: "",
    remember_me: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionamento após login
  const from = (location.state as any)?.from?.pathname || "/admin";

  // ================================
  // HANDLERS
  // ================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const credentials: AdminLoginRequest = {
        email: form.email,
        password: form.password,
        remember_me: form.remember_me,
      };

      const response = await AdminAuthApiService.login(credentials);

      toast.success("Login administrativo realizado com sucesso!");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Erro no login administrativo:", error);
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
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

      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Lado esquerdo - Informações da empresa */}
        <motion.div
          className="hidden lg:flex flex-col text-white space-y-8 flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent relative"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1.05,
                rotateX: 5,
                rotateY: -3,
              }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              whileHover={{
                scale: 1.08,
                rotateX: 8,
                rotateY: -5,
                transition: { duration: 0.3 },
              }}
              style={{
                filter:
                  "drop-shadow(0 8px 16px rgba(59, 130, 246, 0.6)) drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))",
                letterSpacing: "0.05em",
                textShadow:
                  "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              SmartGesTI
            </motion.h1>
            <TypingText />
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              {
                icon: Brain,
                title: "IA Avançada",
                desc: "Sistema inteligente para otimização de processos",
              },
              {
                icon: Users,
                title: "Multi-Tenant",
                desc: "Gestão completa de múltiplos clientes",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                desc: "Relatórios detalhados e insights em tempo real",
              },
              {
                icon: Settings,
                title: "Administração",
                desc: "Controle total do sistema e configurações",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center backdrop-blur-sm border border-blue-400/20">
                  <feature.icon className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-blue-200">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Lado direito - Formulário de login */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShieldCheck className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Painel Administrativo
            </h1>
            <p className="text-blue-200">
              Acesso exclusivo para administradores do SmartGesTI
            </p>
          </motion.div>

          {/* Card de Login */}
          <motion.div
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Administrativo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-400"
                  placeholder="Bruno6821@gmail.com"
                  required
                />
              </motion.div>

              {/* Senha */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-blue-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Lembrar de mim */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <input
                  type="checkbox"
                  id="remember_me"
                  name="remember_me"
                  checked={form.remember_me}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 text-sm text-slate-700"
                >
                  Manter-me conectado
                </label>
              </motion.div>

              {/* Botão de Login */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar no Sistema"
                )}
              </motion.button>
            </form>

            {/* Links auxiliares */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <button
                type="button"
                onClick={() =>
                  toast("Funcionalidade em desenvolvimento", { icon: "ℹ️" })
                }
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Esqueceu sua senha?
              </button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <p className="text-sm text-blue-200">
              © 2024 SmartGesTI. Todos os direitos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
