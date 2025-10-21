import React, { useState } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  Bell,
  Mail,
  Shield,
  Zap,
  Download,
  ExternalLink
} from "lucide-react";
import { 
  useThemeClasses, 
  Alert,
  AlertBanner,
  Button,
  useModal,
  useNotification,
  cn 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA ALERTS UI KIT
// ================================

export const AlertsUIKit: React.FC = () => {
  const { get } = useThemeClasses();
  const { notify, state, dismissModal, dismissBanner } = useNotification();
  const modal = useModal();
  
  // Estados para exemplos interativos
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [showBannerTop, setShowBannerTop] = useState(false);
  const [showBannerBottom, setShowBannerBottom] = useState(false);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Alerts & Notificações
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Sistema completo de alertas, modais e notificações toast
        </p>
      </div>

      {/* Alert Básico */}
      <ComponentSection
        title="Alert Básico"
        description="Alertas inline para feedback e informações importantes"
      >
        <ComponentShowcase
          title="Variantes de Alert"
          description="Diferentes tipos de alertas com ícones e estilos únicos"
          component={
            <div className="space-y-4">
              {/* Alerts de diferentes variantes */}
              <Alert variant="success" dismissible>
                <strong>Sucesso!</strong> Sua operação foi concluída com êxito.
              </Alert>
              
              <Alert variant="error" dismissible>
                <strong>Erro!</strong> Ocorreu um problema ao processar sua solicitação.
              </Alert>
              
              <Alert variant="warning" dismissible>
                <strong>Atenção!</strong> Esta ação não pode ser desfeita.
              </Alert>
              
              <Alert variant="info" dismissible>
                <strong>Informação:</strong> Uma nova versão está disponível.
              </Alert>
            </div>
          }
          code={`<Alert variant="success" dismissible>
  <strong>Sucesso!</strong> Sua operação foi concluída com êxito.
</Alert>

<Alert variant="error" dismissible>
  <strong>Erro!</strong> Ocorreu um problema ao processar sua solicitação.
</Alert>

<Alert variant="warning" dismissible>
  <strong>Atenção!</strong> Esta ação não pode ser desfeita.
</Alert>

<Alert variant="info" dismissible>
  <strong>Informação:</strong> Uma nova versão está disponível.
</Alert>`}
        />

        <ComponentShowcase
          title="Alert com Título e Ações"
          description="Alertas mais complexos com títulos e botões de ação"
          component={
            <div className="space-y-4">
              <Alert 
                variant="success" 
                title="Backup Concluído"
                dismissible
                actions={
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="success">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver Arquivo
                    </Button>
                  </div>
                }
              >
                Seus dados foram salvos com sucesso. O arquivo de backup está disponível para download.
              </Alert>
              
              <Alert 
                variant="warning" 
                title="Atualização Disponível"
                dismissible
                actions={
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      Mais tarde
                    </Button>
                    <Button size="sm" variant="warning">
                      Atualizar agora
                    </Button>
                  </div>
                }
              >
                Uma nova versão do sistema está disponível com correções importantes de segurança.
              </Alert>
            </div>
          }
          code={`<Alert 
  variant="success" 
  title="Backup Concluído"
  dismissible
  actions={
    <div className="flex space-x-2">
      <Button size="sm" variant="ghost">
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      <Button size="sm" variant="success">
        <ExternalLink className="w-4 h-4 mr-1" />
        Ver Arquivo
      </Button>
    </div>
  }
>
  Seus dados foram salvos com sucesso. O arquivo de backup está disponível para download.
</Alert>`}
        />

        <ComponentShowcase
          title="Tamanhos de Alert"
          description="Alertas em diferentes tamanhos (sm, md, lg)"
          component={
            <div className="space-y-4">
              <Alert variant="info" size="sm">
                Alert pequeno para informações breves
              </Alert>
              <Alert variant="info" size="md">
                Alert médio (padrão) para a maioria dos casos de uso
              </Alert>
              <Alert variant="info" size="lg">
                Alert grande para informações mais detalhadas e importantes que precisam de maior destaque visual
              </Alert>
            </div>
          }
          code={`<Alert variant="info" size="sm">
  Alert pequeno para informações breves
</Alert>

<Alert variant="info" size="md">
  Alert médio (padrão) para a maioria dos casos de uso
</Alert>

<Alert variant="info" size="lg">
  Alert grande para informações mais detalhadas e importantes
</Alert>`}
        />
      </ComponentSection>

      {/* Toast Notifications */}
      <ComponentSection
        title="Toast Notifications"
        description="Notificações pequenas e temporárias no canto da tela"
      >
        <ComponentShowcase
          title="Toasts Básicos"
          description="Notificações toast com diferentes variantes"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={() => notify.toast.success("Operação realizada com sucesso!")}
                >
                  Success Toast
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => notify.toast.error("Erro ao processar solicitação")}
                >
                  Error Toast
                </Button>
                <Button 
                  variant="warning" 
                  size="sm"
                  onClick={() => notify.toast.warning("Atenção! Verifique os dados")}
                >
                  Warning Toast
                </Button>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => notify.toast.info("Nova atualização disponível")}
                >
                  Info Toast
                </Button>
              </div>
            </div>
          }
          code={`const { notify } = useNotification();

// Toast de sucesso
notify.toast.success("Operação realizada com sucesso!");

// Toast de erro
notify.toast.error("Erro ao processar solicitação");

// Toast de aviso
notify.toast.warning("Atenção! Verifique os dados");

// Toast de informação
notify.toast.info("Nova atualização disponível");`}
        />

        <ComponentShowcase
          title="Toasts com Título e Ação"
          description="Notificações toast mais complexas com títulos e ações"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  variant="primary"
                  onClick={() => notify.toast.success("Arquivo enviado com sucesso!", {
                    title: "Upload Concluído",
                    action: {
                      label: "Ver arquivo",
                      onClick: () => console.log("Abrindo arquivo...")
                    }
                  })}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Toast com Ação
                </Button>
                
                <Button 
                  variant="warning"
                  onClick={() => notify.toast.warning("Sua sessão expirará em 5 minutos", {
                    title: "Sessão Expirando",
                    duration: 8000,
                    action: {
                      label: "Estender",
                      onClick: () => console.log("Estendendo sessão...")
                    }
                  })}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Toast Longo
                </Button>
              </div>
            </div>
          }
          code={`// Toast com título e ação
notify.toast.success("Arquivo enviado com sucesso!", {
  title: "Upload Concluído",
  action: {
    label: "Ver arquivo",
    onClick: () => console.log("Abrindo arquivo...")
  }
});

// Toast com duração customizada
notify.toast.warning("Sua sessão expirará em 5 minutos", {
  title: "Sessão Expirando",
  duration: 8000,
  action: {
    label: "Estender",
    onClick: () => console.log("Estendendo sessão...")
  }
});`}
        />
      </ComponentSection>

      {/* Modal Alerts */}
      <ComponentSection
        title="Modal Alerts"
        description="Alertas centralizados para informações importantes"
      >
        <ComponentShowcase
          title="Modais de Alert"
          description="Alertas em modal para capturar atenção total do usuário"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="success"
                  size="sm"
                  onClick={() => modal.success("Bem-vindo!", "Sua conta foi criada com sucesso! Você já pode fazer login.")}
                >
                  Success Modal
                </Button>
                
                <Button 
                  variant="danger"
                  size="sm"
                  onClick={() => modal.error("Erro de Conexão", "Falha na conexão com o servidor. Tente novamente em alguns instantes.")}
                >
                  Error Modal
                </Button>
                
                <Button 
                  variant="warning"
                  size="sm"
                  onClick={() => modal.alert({
                    title: "Confirmar Exclusão",
                    text: "Esta ação irá remover permanentemente todos os dados. Tem certeza?",
                    variant: "warning"
                  })}
                >
                  Warning Modal
                </Button>
                
                <Button 
                  variant="info"
                  size="sm"
                  onClick={() => modal.alert({
                    title: "Atualização Disponível",
                    text: "Uma nova versão está disponível com melhorias de performance e novos recursos.",
                    variant: "info"
                  })}
                >
                  Info Modal
                </Button>
              </div>
            </div>
          }
          code={`const modal = useModal();

// Modal de sucesso
modal.success("Bem-vindo!", "Sua conta foi criada com sucesso!");

// Modal de erro
modal.error("Erro de Conexão", "Falha na conexão com o servidor.");

// Modal de aviso
modal.alert({
  title: "Confirmar Exclusão",
  text: "Esta ação irá remover permanentemente todos os dados.",
  variant: "warning"
});

// Modal de informação
modal.alert({
  title: "Atualização Disponível",
  text: "Uma nova versão está disponível.",
  variant: "info"
});`}
        />

        <ComponentShowcase
          title="Modal de Confirmação"
          description="Sistema de confirmação com Promise para decisões do usuário"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  variant="danger"
                  onClick={async () => {
                    const result = await modal.confirm({
                      title: "Excluir Conta",
                      text: "Esta ação não pode ser desfeita. Todos os dados serão perdidos permanentemente.",
                      confirmButtonText: "Sim, excluir",
                      cancelButtonText: "Cancelar",
                      dangerMode: true,
                      onConfirm: () => {
                        notify.toast.success("Conta excluída com sucesso");
                      }
                    });
                    
                    if (result.isDismissed) {
                      notify.toast.info("Ação cancelada");
                    }
                  }}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Confirmar Exclusão
                </Button>
                
                <Button 
                  variant="primary"
                  onClick={async () => {
                    const result = await modal.confirm({
                      title: "Salvar Alterações",
                      text: "Deseja salvar as alterações antes de sair?",
                      confirmButtonText: "Salvar e Sair",
                      cancelButtonText: "Sair sem Salvar",
                      variant: "info",
                      onConfirm: () => {
                        notify.toast.success("Alterações salvas!");
                      }
                    });
                    
                    if (result.isDismissed) {
                      notify.toast.warning("Saindo sem salvar...");
                    }
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Salvar & Sair
                </Button>
              </div>
            </div>
          }
          code={`const modal = useModal();

// Confirmação de exclusão
const result = await modal.confirm({
  title: "Excluir Conta",
  text: "Esta ação não pode ser desfeita. Todos os dados serão perdidos.",
  confirmButtonText: "Sim, excluir",
  cancelButtonText: "Cancelar",
  dangerMode: true,
  onConfirm: () => {
    // Ação ao confirmar
    notify.toast.success("Conta excluída");
  }
});

if (result.isDismissed) {
  // Ação ao cancelar
  notify.toast.info("Ação cancelada");
}

// Método simplificado para exclusão
await modal.confirmDelete("Confirmar Exclusão", "Esta ação não pode ser desfeita!");`}
        />
      </ComponentSection>

      {/* Banner Alerts */}
      <ComponentSection
        title="Banner Alerts"
        description="Alertas em banner para informações persistentes"
      >
        <ComponentShowcase
          title="Banners de Página"
          description="Alertas que aparecem no topo ou rodapé da página"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button 
                  variant="info"
                  onClick={() => setShowBannerTop(true)}
                  disabled={showBannerTop}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Banner Topo
                </Button>
                
                <Button 
                  variant="warning"
                  onClick={() => setShowBannerBottom(true)}
                  disabled={showBannerBottom}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Banner Rodapé
                </Button>
                
                <Button 
                  variant="success"
                  onClick={() => notify.banner.success("Banner de sucesso foi criado!", {
                    title: "Operação Concluída",
                    position: "top",
                    dismissible: true
                  })}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Banner Dinâmico
                </Button>
              </div>
              
              {/* Banner Exemplo Topo */}
              {showBannerTop && (
                <AlertBanner
                  variant="info"
                  title="Manutenção Programada"
                  position="top"
                  dismissible
                  onDismiss={() => setShowBannerTop(false)}
                  actions={
                    <button className="text-sky-800 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 hover:underline text-sm font-medium transition-colors">
                      Saiba mais
                    </button>
                  }
                >
                  O sistema ficará indisponível das 2h às 4h para manutenção programada.
                </AlertBanner>
              )}
              
              {/* Banner Exemplo Rodapé */}
              {showBannerBottom && (
                <AlertBanner
                  variant="warning"
                  title="Cookies"
                  position="bottom"
                  dismissible
                  onDismiss={() => setShowBannerBottom(false)}
                  actions={
                    <div className="flex space-x-2">
                      <button className="text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline text-sm transition-colors">
                        Configurar
                      </button>
                      <button className="text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline text-sm font-medium transition-colors">
                        Aceitar
                      </button>
                    </div>
                  }
                >
                  Usamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa política.
                </AlertBanner>
              )}
            </div>
          }
          code={`// Banner no topo
<AlertBanner
  variant="info"
  title="Manutenção Programada"
  position="top"
  dismissible
  onDismiss={() => setShowBanner(false)}
  actions={
    <button className="text-sky-600 hover:text-sky-800 hover:underline">
      Saiba mais
    </button>
  }
>
  Sistema ficará indisponível das 2h às 4h para manutenção.
</AlertBanner>

// Banner dinâmico via hook
notify.banner.success("Operação concluída!", {
  title: "Sucesso",
  position: "top",
  dismissible: true
});`}
        />
      </ComponentSection>

      {/* Render dos banners ativos */}
      {state.banners.map((banner: any) => (
        <AlertBanner
          key={banner.id}
          variant={banner.variant}
          title={banner.title}
          position={banner.options.position}
          fullWidth={banner.options.fullWidth}
          sticky={banner.options.sticky}
          dismissible={true}
          onDismiss={() => dismissBanner(banner.id)}
        >
          {banner.message}
        </AlertBanner>
      ))}
    </div>
  );
};

export default AlertsUIKit;