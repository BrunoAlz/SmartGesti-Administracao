# Alerts & Notificações

Sistema completo de alertas, notificações e feedbacks visuais para o usuário.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Componentes](#componentes)
  - [Alert Básico](#alert-básico)
  - [Alert Modal](#alert-modal)  
  - [Alert Banner](#alert-banner)
  - [Toast Notifications](#toast-notifications)
- [Hook useNotification](#hook-usenotification)
- [Configuração](#configuração)
- [Exemplos de Uso](#exemplos-de-uso)

## 🎯 Visão Geral

O sistema de alertas oferece múltiplas formas de apresentar feedbacks ao usuário:

- **Alert Básico**: Alertas inline para informações contextuais
- **Alert Modal**: Alertas centralizados que requerem atenção total
- **Alert Banner**: Alertas persistentes no topo/rodapé da página  
- **Toast**: Notificações pequenas e temporárias no canto da tela

Todos os componentes suportam:
- ✅ **4 variantes**: success, error, warning, info
- ✅ **Tema claro/escuro** automático
- ✅ **Acessibilidade completa** (WCAG)
- ✅ **Animações suaves**
- ✅ **Ações customizáveis**

## 🧩 Componentes

### Alert Básico

Alertas inline para feedback contextual e informações importantes.

#### Importação
```tsx
import { Alert } from '@/design-system';
```

#### Props
```tsx
interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}
```

#### Exemplos

**Alert básico:**
```tsx
<Alert variant="success" dismissible>
  <strong>Sucesso!</strong> Sua operação foi concluída com êxito.
</Alert>
```

**Alert com título e ações:**
```tsx
<Alert 
  variant="warning" 
  title="Atualização Disponível"
  dismissible
  actions={
    <div className="flex space-x-2">
      <Button size="sm" variant="ghost">Mais tarde</Button>
      <Button size="sm" variant="warning">Atualizar agora</Button>
    </div>
  }
>
  Uma nova versão está disponível com correções importantes.
</Alert>
```

**Diferentes tamanhos:**
```tsx
<Alert variant="info" size="sm">Alert pequeno</Alert>
<Alert variant="info" size="md">Alert médio (padrão)</Alert>
<Alert variant="info" size="lg">Alert grande</Alert>
```

### Alert Modal

Alertas centralizados para capturar atenção total do usuário.

#### Importação
```tsx
import { AlertModal } from '@/design-system';
```

#### Props
```tsx
interface AlertModalProps extends Omit<AlertProps, 'dismissible'> {
  isOpen: boolean;
  onClose: () => void;
  width?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}
```

#### Exemplos

**Modal básico:**
```tsx
const [showModal, setShowModal] = useState(false);

<AlertModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  variant="success"
  title="Operação Concluída"
  width="md"
>
  Sua conta foi criada com sucesso! Você já pode fazer login.
</AlertModal>
```

**Modal com ações:**
```tsx
<AlertModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  variant="error"
  title="Confirmar Exclusão"
  width="lg"
  actions={
    <div className="flex space-x-3">
      <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
        Cancelar
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Excluir
      </Button>
    </div>
  }
>
  Esta ação não pode ser desfeita. Todos os dados serão perdidos permanentemente.
</AlertModal>
```

### Alert Banner

Alertas persistentes para informações importantes da aplicação.

#### Importação
```tsx
import { AlertBanner } from '@/design-system';
```

#### Props
```tsx
interface AlertBannerProps extends Omit<AlertProps, 'size'> {
  position?: "top" | "bottom";
  fullWidth?: boolean;
  sticky?: boolean;
}
```

#### Exemplos

**Banner no topo:**
```tsx
<AlertBanner
  variant="info"
  title="Manutenção Programada"
  position="top"
  sticky
  dismissible
  onDismiss={() => setBannerVisible(false)}
  actions={
    <button className="text-blue-600 hover:underline">
      Saiba mais
    </button>
  }
>
  O sistema ficará indisponível das 2h às 4h para manutenção.
</AlertBanner>
```

**Banner de cookies:**
```tsx
<AlertBanner
  variant="warning"
  title="Cookies"
  position="bottom"
  fullWidth
  dismissible
  actions={
    <div className="flex space-x-2">
      <button className="text-yellow-600 hover:underline">Configurar</button>
      <button className="text-yellow-600 hover:underline font-medium">Aceitar</button>
    </div>
  }
>
  Usamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa política.
</AlertBanner>
```

### Toast Notifications

Notificações pequenas e temporárias no canto da tela.

#### Configuração

**1. Adicionar ToastContainer no App.tsx:**
```tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* Seu app */}
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
```

#### Uso Básico

**Hook useToast:**
```tsx
import { useToast } from '@/design-system';

function MyComponent() {
  const toast = useToast();
  
  const handleSuccess = () => {
    toast.success("Operação realizada com sucesso!");
  };
  
  const handleError = () => {
    toast.error("Erro ao processar solicitação");
  };
  
  const handleWarning = () => {
    toast.warning("Atenção! Verifique os dados");
  };
  
  const handleInfo = () => {
    toast.info("Nova atualização disponível");
  };
}
```

**Toast com título e ação:**
```tsx
toast.success("Arquivo enviado com sucesso!", {
  title: "Upload Concluído",
  action: {
    label: "Ver arquivo",
    onClick: () => console.log("Abrindo arquivo...")
  }
});

toast.warning("Sua sessão expirará em 5 minutos", {
  title: "Sessão Expirando", 
  duration: 8000,
  action: {
    label: "Estender",
    onClick: () => console.log("Estendendo sessão...")
  }
});
```

## 🔧 Hook useNotification

Hook unificado que gerencia todos os tipos de notificações com uma API consistente.

### Importação
```tsx
import { useNotification } from '@/design-system';
```

### API Completa

```tsx
function MyComponent() {
  const { notify, state, dismissModal, dismissBanner } = useNotification();
  
  // Toast notifications
  notify.toast.success("Mensagem de sucesso");
  notify.toast.error("Mensagem de erro");
  notify.toast.warning("Mensagem de aviso");
  notify.toast.info("Mensagem informativa");
  
  // Modal notifications
  notify.modal.success("Modal de sucesso", {
    title: "Título",
    width: "md"
  });
  
  // Banner notifications
  notify.banner.warning("Banner de aviso", {
    title: "Atenção",
    position: "top",
    sticky: true
  });
  
  // Confirmação com Promise
  const confirmed = await notify.confirm(
    "Tem certeza que deseja excluir?",
    {
      title: "Confirmar Exclusão",
      confirmText: "Sim, excluir",
      cancelText: "Cancelar",
      variant: "error"
    }
  );
  
  if (confirmed) {
    // Usuário confirmou
  }
}
```

### Exemplos Avançados

**Sistema de confirmação:**
```tsx
const handleDelete = async () => {
  const confirmed = await notify.confirm(
    "Esta ação não pode ser desfeita. Todos os dados serão perdidos permanentemente.",
    {
      title: "Excluir Conta",
      confirmText: "Sim, excluir",
      cancelText: "Cancelar", 
      variant: "error"
    }
  );
  
  if (confirmed) {
    try {
      await deleteAccount();
      notify.toast.success("Conta excluída com sucesso");
    } catch (error) {
      notify.toast.error("Erro ao excluir conta");
    }
  } else {
    notify.toast.info("Ação cancelada");
  }
};
```

**Workflow completo:**
```tsx
const handleUpload = async (file: File) => {
  // Toast de início
  const toastId = notify.toast.info("Iniciando upload...", { duration: false });
  
  try {
    await uploadFile(file);
    
    // Dismiss toast anterior e mostrar sucesso
    notify.dismiss.toast(toastId);
    notify.toast.success("Upload concluído!", {
      title: "Arquivo Enviado",
      action: {
        label: "Ver arquivo", 
        onClick: () => openFile(file.name)
      }
    });
    
    // Banner de confirmação
    notify.banner.success("Arquivo disponível para visualização", {
      title: "Upload Concluído",
      position: "top",
      dismissible: true
    });
    
  } catch (error) {
    notify.dismiss.toast(toastId);
    
    // Modal de erro detalhado
    notify.modal.error(
      "Falha no upload. Verifique sua conexão e tente novamente.",
      {
        title: "Erro no Upload",
        width: "md",
        actions: (
          <Button onClick={() => handleUpload(file)} variant="primary">
            Tentar Novamente
          </Button>
        )
      }
    );
  }
};
```

## ⚙️ Configuração

### Tema Automático

Os alertas se adaptam automaticamente ao tema (claro/escuro) através do `useThemeClasses()`:

```tsx
const { get, isDark } = useThemeClasses();

// Classes são aplicadas automaticamente baseadas no tema
const alertClasses = cn(
  "border rounded-lg",
  isDark ? "bg-green-950/50 border-green-800" : "bg-green-50 border-green-200"
);
```

### Customização de Cores

As variantes seguem o sistema de design tokens:

```tsx
const alertVariants = {
  success: {
    light: "bg-green-50 border-green-200 text-green-800",
    dark: "bg-green-950/50 border-green-800 text-green-200"
  },
  error: {
    light: "bg-red-50 border-red-200 text-red-800", 
    dark: "bg-red-950/50 border-red-800 text-red-200"
  },
  warning: {
    light: "bg-yellow-50 border-yellow-200 text-yellow-800",
    dark: "bg-yellow-950/50 border-yellow-800 text-yellow-200"
  },
  info: {
    light: "bg-blue-50 border-blue-200 text-blue-800",
    dark: "bg-blue-950/50 border-blue-800 text-blue-200"
  }
};
```

### CSS Customizado

Para sobrescrever estilos específicos:

```css
/* alert-overrides.css */
.custom-alert {
  @apply shadow-lg border-2;
}

.custom-alert.success {
  @apply border-green-400 bg-green-100;
}
```

## 🎨 Exemplos de Uso

### Formulário com Validação

```tsx
function ContactForm() {
  const { notify } = useNotification();
  const [errors, setErrors] = useState({});
  
  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      
      // Toast de sucesso
      notify.toast.success("Mensagem enviada com sucesso!");
      
      // Banner de confirmação
      notify.banner.success("Entraremos em contato em breve", {
        title: "Mensagem Recebida",
        position: "top",
        dismissible: true
      });
      
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
        
        // Alert inline para cada erro
        Object.entries(error.validationErrors).forEach(([field, message]) => (
          <Alert variant="error" size="sm" dismissible>
            <strong>{field}:</strong> {message}
          </Alert>
        ));
      } else {
        // Modal de erro geral
        notify.modal.error("Erro interno do servidor", {
          title: "Erro no Envio",
          width: "md"
        });
      }
    }
  };
}
```

### Dashboard com Notificações

```tsx
function Dashboard() {
  const { notify } = useNotification();
  
  useEffect(() => {
    // Banner de boas-vindas
    notify.banner.info("Bem-vindo de volta! Você tem 3 tarefas pendentes.", {
      title: "Dashboard",
      position: "top",
      dismissible: true,
      actions: (
        <button className="text-blue-600 hover:underline">
          Ver tarefas
        </button>
      )
    });
    
    // Verificar atualizações
    checkForUpdates().then(hasUpdates => {
      if (hasUpdates) {
        notify.toast.info("Nova versão disponível", {
          title: "Atualização",
          action: {
            label: "Atualizar",
            onClick: () => window.location.reload()
          }
        });
      }
    });
  }, []);
}
```

### Sistema de Autenticação

```tsx
function AuthFlow() {
  const { notify } = useNotification();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      notify.toast.success("Login realizado com sucesso!");
      
    } catch (error) {
      if (error.code === 'INVALID_CREDENTIALS') {
        notify.modal.error("Credenciais inválidas", {
          title: "Erro de Login",
          width: "sm"
        });
      } else if (error.code === 'ACCOUNT_LOCKED') {
        notify.modal.warning(
          "Sua conta foi temporariamente bloqueada devido a múltiplas tentativas de login. Tente novamente em 15 minutos.",
          {
            title: "Conta Bloqueada",
            width: "md"
          }
        );
      }
    }
  };
  
  const handleLogout = async () => {
    const confirmed = await notify.confirm(
      "Tem certeza que deseja sair?",
      {
        title: "Confirmar Logout",
        confirmText: "Sim, sair",
        cancelText: "Cancelar"
      }
    );
    
    if (confirmed) {
      await logout();
      notify.toast.info("Logout realizado com sucesso");
    }
  };
}
```

## 📱 Responsividade

Todos os componentes são responsivos por padrão:

- **Mobile**: Alertas ocupam largura total, modais se ajustam à tela
- **Tablet**: Layout adaptado para toque
- **Desktop**: Posicionamento otimizado

## ♿ Acessibilidade

- **ARIA labels** adequados em todos os componentes
- **Navegação por teclado** completa
- **Screen reader** friendly
- **Cores com contraste** adequado WCAG AA
- **Focus trap** em modais
- **Escape key** para fechar modais

## 🔗 Integração

O sistema está totalmente integrado com:
- ✅ **Design System** centralizado
- ✅ **Tema claro/escuro** automático  
- ✅ **TypeScript** com tipos completos
- ✅ **React 18** com hooks modernos
- ✅ **Tailwind CSS** para styling
- ✅ **React Router** para navegação