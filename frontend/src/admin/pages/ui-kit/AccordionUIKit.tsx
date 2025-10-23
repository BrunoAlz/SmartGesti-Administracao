import React from "react";
import { Settings, ShieldCheck, CreditCard, HelpCircle, FileText, Mail } from "lucide-react";
import { 
  Accordion, 
  Card, 
  useThemeClasses,
  cn
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA ACCORDION UI KIT
// ================================

const AccordionUIKit: React.FC = () => {
  const { get } = useThemeClasses();

  // Exemplos de uso do Accordion
  const faqItems = [
    {
      id: "faq-1",
      title: "Como alterar minha senha?",
      content: (
        <div className="space-y-2">
          <p>Para alterar sua senha, siga os passos abaixo:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Acesse as configurações da sua conta</li>
            <li>Navegue até a seção "Segurança"</li>
            <li>Clique em "Alterar senha"</li>
            <li>Insira sua senha atual e a nova senha</li>
            <li>Confirme a nova senha e salve as alterações</li>
          </ol>
        </div>
      ),
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: "faq-2",
      title: "A plataforma é segura?",
      content: (
        <div className="space-y-2">
          <p>Sim, a segurança é nossa prioridade. Implementamos as seguintes medidas:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Criptografia de ponta a ponta para todas as transações</li>
            <li>Autenticação de dois fatores</li>
            <li>Monitoramento constante contra ameaças</li>
            <li>Conformidade com LGPD e outras regulamentações</li>
          </ul>
        </div>
      ),
      icon: <ShieldCheck className="w-4 h-4" />
    },
    {
      id: "faq-3",
      title: "Como funcionam os pagamentos?",
      content: (
        <p>
          Aceitamos diversos métodos de pagamento, incluindo cartões de crédito, 
          débito e boleto bancário. Todas as transações são processadas de forma 
          segura através de gateways de pagamento certificados.
        </p>
      ),
      icon: <CreditCard className="w-4 h-4" />
    }
  ];

  // Exemplo de código para o componente básico
  const basicAccordionCode = `import { Accordion } from '@/design-system';

const items = [
  {
    id: "item-1",
    title: "Título do primeiro item",
    content: <p>Conteúdo do primeiro item do accordion</p>
  },
  {
    id: "item-2",
    title: "Título do segundo item",
    content: <p>Conteúdo do segundo item do accordion</p>
  },
  {
    id: "item-3",
    title: "Título do terceiro item",
    content: <p>Conteúdo do terceiro item do accordion</p>
  }
];

// Accordion básico
<Accordion items={items} />

// Com múltiplos painéis abertos
<Accordion items={items} allowMultiple={true} />

// Com painéis pré-abertos
<Accordion items={items} defaultOpen={["item-1"]} />`;

  // Exemplo de código para variantes
  const variantsAccordionCode = `import { Accordion } from '@/design-system';

// Variante default (padrão)
<Accordion items={items} variant="default" />

// Variante bordered
<Accordion items={items} variant="bordered" />

// Variante ghost
<Accordion items={items} variant="ghost" />

// Variante elevated
<Accordion items={items} variant="elevated" />`;

  // Exemplo de código para uso com ícones
  const iconsAccordionCode = `import { Accordion } from '@/design-system';
import { Settings, ShieldCheck, CreditCard } from 'lucide-react';

const items = [
  {
    id: "item-1",
    title: "Configurações",
    content: <p>Configurações do sistema</p>,
    icon: <Settings className="w-4 h-4" />
  },
  {
    id: "item-2",
    title: "Segurança",
    content: <p>Configurações de segurança</p>,
    icon: <ShieldCheck className="w-4 h-4" />
  },
  {
    id: "item-3",
    title: "Pagamentos",
    content: <p>Métodos de pagamento</p>,
    icon: <CreditCard className="w-4 h-4" />
  }
];

<Accordion items={items} />`;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Accordion
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Componente para exibir conteúdo expansível em seções colapsáveis
        </p>
      </div>

      {/* Accordion Básico */}
      <ComponentSection
        title="Accordion Básico"
        description="Componente padrão com funcionalidade de expansão e colapso"
      >
        <ComponentShowcase
          title="Exemplo Básico"
          description="Accordion simples com itens colapsáveis"
          code={basicAccordionCode}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          }
        />
      </ComponentSection>

      {/* Variantes */}
      <ComponentSection
        title="Variantes"
        description="Diferentes estilos visuais para o componente accordion"
      >
        <ComponentShowcase
          title="Default"
          description="Estilo padrão com bordas inferiores"
          code={`<Accordion items={items} variant="default" />`}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion 
                items={[
                  {
                    id: "default-1",
                    title: "Accordion padrão",
                    content: <p>Este é o estilo padrão do accordion com bordas inferiores</p>
                  },
                  {
                    id: "default-2",
                    title: "Segundo item",
                    content: <p>Conteúdo do segundo item do accordion</p>
                  }
                ]} 
                variant="default"
                defaultOpen={["default-1"]}
              />
            </div>
          }
        />

        <ComponentShowcase
          title="Bordered"
          description="Estilo com bordas completas e cantos arredondados"
          code={`<Accordion items={items} variant="bordered" />`}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion 
                items={[
                  {
                    id: "bordered-1",
                    title: "Accordion com borda",
                    content: <p>Este estilo tem bordas completas e cantos arredondados</p>,
                    icon: <FileText className="w-4 h-4" />
                  },
                  {
                    id: "bordered-2",
                    title: "Segundo item",
                    content: <p>Conteúdo do segundo item do accordion</p>,
                    icon: <HelpCircle className="w-4 h-4" />
                  }
                ]} 
                variant="bordered"
                defaultOpen={["bordered-1"]}
              />
            </div>
          }
        />

        <ComponentShowcase
          title="Ghost"
          description="Estilo sem bordas com hover sutil"
          code={`<Accordion items={items} variant="ghost" />`}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion 
                items={[
                  {
                    id: "ghost-1",
                    title: "Accordion ghost",
                    content: <p>Este estilo é minimalista sem bordas com efeito hover sutil</p>
                  },
                  {
                    id: "ghost-2",
                    title: "Segundo item",
                    content: <p>Conteúdo do segundo item do accordion</p>
                  }
                ]} 
                variant="ghost"
                defaultOpen={["ghost-1"]}
              />
            </div>
          }
        />

        <ComponentShowcase
          title="Elevated"
          description="Estilo com elevação e sombra"
          code={`<Accordion items={items} variant="elevated" />`}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion 
                items={[
                  {
                    id: "elevated-1",
                    title: "Accordion elevated",
                    content: <p>Este estilo possui elevação com sombras e cantos arredondados</p>
                  },
                  {
                    id: "elevated-2",
                    title: "Segundo item",
                    content: <p>Conteúdo do segundo item do accordion</p>
                  }
                ]} 
                variant="elevated"
                defaultOpen={["elevated-1"]}
              />
            </div>
          }
        />
      </ComponentSection>

      {/* Com ícones */}
      <ComponentSection
        title="Accordion com Ícones"
        description="Utilize ícones para melhorar a experiência visual"
      >
        <ComponentShowcase
          title="Ícones nos itens"
          description="Adicione ícones aos títulos dos itens para melhor identificação"
          code={iconsAccordionCode}
          component={
            <div className="w-full max-w-2xl mx-auto">
              <Accordion 
                items={[
                  {
                    id: "icon-1",
                    title: "Configurações",
                    content: <p>Gerencie as configurações do sistema</p>,
                    icon: <Settings className="w-4 h-4" />
                  },
                  {
                    id: "icon-2",
                    title: "Segurança",
                    content: <p>Configure opções de segurança</p>,
                    icon: <ShieldCheck className="w-4 h-4" />
                  },
                  {
                    id: "icon-3",
                    title: "Pagamentos",
                    content: <p>Gerencie seus métodos de pagamento</p>,
                    icon: <CreditCard className="w-4 h-4" />
                  }
                ]} 
                variant="bordered"
              />
            </div>
          }
        />
      </ComponentSection>

      {/* Casos de uso */}
      <ComponentSection
        title="Casos de Uso"
        description="Exemplos práticos de utilização do componente accordion"
      >
        <ComponentShowcase
          title="FAQ"
          description="Perguntas frequentes em formato de accordion"
          code={`<Accordion items={faqItems} variant="bordered" />`}
          component={
            <Card className="w-full max-w-2xl mx-auto">
              <div className="p-6">
                <h2 className={cn("text-xl font-bold mb-4", get("text.primary"))}>
                  Perguntas Frequentes
                </h2>
                <Accordion 
                  items={faqItems} 
                  variant="bordered"
                  className="mt-2"
                />
              </div>
            </Card>
          }
        />

        <ComponentShowcase
          title="Menu de Suporte"
          description="Menu de suporte com categorias expansíveis"
          code={`<Accordion items={supportItems} variant="ghost" />`}
          component={
            <Card className="w-full max-w-2xl mx-auto">
              <div className="p-6">
                <h2 className={cn("text-xl font-bold mb-4", get("text.primary"))}>
                  Central de Suporte
                </h2>
                <Accordion 
                  items={[
                    {
                      id: "suporte-1",
                      title: "Documentação",
                      content: (
                        <div className="space-y-2">
                          <p>Acesse nossa documentação completa:</p>
                          <ul className="space-y-1 pl-5 list-disc">
                            <li><a href="#" className={get("text.link")}>Manual do usuário</a></li>
                            <li><a href="#" className={get("text.link")}>Guias de início rápido</a></li>
                            <li><a href="#" className={get("text.link")}>Tutoriais em vídeo</a></li>
                          </ul>
                        </div>
                      ),
                      icon: <FileText className="w-4 h-4" />
                    },
                    {
                      id: "suporte-2",
                      title: "Contato",
                      content: (
                        <div className="space-y-2">
                          <p>Entre em contato com nossa equipe:</p>
                          <ul className="space-y-1 pl-5 list-disc">
                            <li>Email: suporte@smartgesti.com</li>
                            <li>Telefone: (11) 1234-5678</li>
                            <li>Horário: Segunda a Sexta, das 9h às 18h</li>
                          </ul>
                        </div>
                      ),
                      icon: <Mail className="w-4 h-4" />
                    },
                    {
                      id: "suporte-3",
                      title: "Perguntas Frequentes",
                      content: (
                        <div className="space-y-2">
                          <p>Confira nossas perguntas mais frequentes:</p>
                          <ul className="space-y-1 pl-5 list-disc">
                            <li><a href="#" className={get("text.link")}>Problemas de acesso</a></li>
                            <li><a href="#" className={get("text.link")}>Configurações de conta</a></li>
                            <li><a href="#" className={get("text.link")}>Cobrança e pagamentos</a></li>
                          </ul>
                        </div>
                      ),
                      icon: <HelpCircle className="w-4 h-4" />
                    }
                  ]} 
                  variant="ghost"
                />
              </div>
            </Card>
          }
        />
      </ComponentSection>
    </div>
  );
};

export default AccordionUIKit;