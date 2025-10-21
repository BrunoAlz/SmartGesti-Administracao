import React, { useState } from "react";
import { 
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ConfirmModal,
  AlertModal,
  SidebarModal,
  DrawerModal,
  useModal,
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardContent
} from "../../../design-system";
import { useThemeClasses } from "../../../design-system/hooks";
import { cn } from "../../../design-system/theme-classes";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  User, 
  Mail, 
  Phone,
  Info,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// ================================
// EXEMPLO DE USO DOS MODAIS
// ================================

export const ModalExamples: React.FC = () => {
  const { get } = useThemeClasses();
  
  // Estados dos modais
  const basicModal = useModal();
  const confirmModal = useModal();
  const alertModal = useModal();
  const sidebarModal = useModal();
  const drawerModal = useModal();
  const formModal = useModal();
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    formModal.close();
    alertModal.open();
  };

  const handleDelete = () => {
    console.log("Item deleted");
    confirmModal.close();
    alertModal.open();
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Modal Components
        </h1>
        <p className={get("text.secondary")}>
          Exemplos de uso dos componentes de modal do Design System
        </p>
      </div>

      {/* Botões de Ação */}
      <Card>
        <CardHeader title="Tipos de Modal">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Diferentes tipos de modais disponíveis
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button onClick={basicModal.open} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Modal Básico
            </Button>
            
            <Button onClick={confirmModal.open} variant="secondary">
              <Trash2 className="w-4 h-4 mr-2" />
              Modal de Confirmação
            </Button>
            
            <Button onClick={alertModal.open} variant="secondary">
              <Info className="w-4 h-4 mr-2" />
              Modal de Alerta
            </Button>
            
            <Button onClick={sidebarModal.open} variant="secondary">
              <Settings className="w-4 h-4 mr-2" />
              Sidebar Modal
            </Button>
            
            <Button onClick={drawerModal.open} variant="secondary">
              <Edit className="w-4 h-4 mr-2" />
              Drawer Modal
            </Button>
            
            <Button onClick={formModal.open} variant="primary">
              <User className="w-4 h-4 mr-2" />
              Modal com Formulário
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Básico */}
      <Modal
        isOpen={basicModal.isOpen}
        onClose={basicModal.close}
        size="md"
      >
        <ModalHeader onClose={basicModal.close}>
          Modal Básico
        </ModalHeader>
        <ModalContent>
          <p className={cn("text-sm mb-4", get("text.secondary"))}>
            Este é um exemplo de modal básico. Você pode usar este componente para exibir qualquer conteúdo.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 Dica: Clique fora do modal ou pressione ESC para fechar.
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-500/20 rounded-md">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ O modal bloqueia o scroll da página automaticamente.
              </p>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="secondary" onClick={basicModal.close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={basicModal.close}>
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />

      {/* Modal de Alerta */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={alertModal.close}
        variant="success"
        title="Operação Concluída"
        width="md"
      >
        A operação foi realizada com sucesso!
      </AlertModal>

      {/* Sidebar Modal */}
      <SidebarModal
        isOpen={sidebarModal.isOpen}
        onClose={sidebarModal.close}
        title="Configurações"
        size="md"
      >
        <div className="p-6 space-y-6">
          <div>
            <h3 className={cn("text-sm font-medium mb-3", get("text.primary"))}>
              Configurações Gerais
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Notificações por email</span>
                <input type="checkbox" className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Notificações push</span>
                <input type="checkbox" className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Modo escuro</span>
                <input type="checkbox" className="rounded" />
              </label>
            </div>
          </div>
          
          <div>
            <h3 className={cn("text-sm font-medium mb-3", get("text.primary"))}>
              Privacidade
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Perfil público</span>
                <input type="checkbox" className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Compartilhar dados</span>
                <input type="checkbox" className="rounded" />
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-white/10">
            <Button variant="primary" className="w-full">
              Salvar Configurações
            </Button>
          </div>
        </div>
      </SidebarModal>

      {/* Drawer Modal */}
      <DrawerModal
        isOpen={drawerModal.isOpen}
        onClose={drawerModal.close}
        title="Detalhes do Item"
        position="right"
        size="md"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className={cn("font-medium", get("text.primary"))}>
                João Silva
              </h3>
              <p className={cn("text-sm", get("text.secondary"))}>
                Desenvolvedor Frontend
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm">joao@exemplo.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">(11) 99999-9999</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-white/10">
            <h4 className={cn("text-sm font-medium mb-2", get("text.primary"))}>
              Observações
            </h4>
            <p className={cn("text-sm", get("text.secondary"))}>
              Desenvolvedor experiente com foco em React e TypeScript. 
              Trabalha na empresa há 2 anos e tem excelente performance.
            </p>
          </div>
        </div>
      </DrawerModal>

      {/* Modal com Formulário */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        size="lg"
      >
        <ModalHeader onClose={formModal.close}>
          Novo Contato
        </ModalHeader>
        <ModalContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome"
                placeholder="Digite o nome"
                value={formData.name}
                onChange={handleInputChange("name")}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              
              <Input
                label="Email"
                type="email"
                placeholder="Digite o email"
                value={formData.email}
                onChange={handleInputChange("email")}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              
              <Input
                label="Telefone"
                placeholder="Digite o telefone"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                leftIcon={<Phone className="w-4 h-4" />}
              />
            </div>
            
            <Textarea
              label="Mensagem"
              placeholder="Digite uma mensagem (opcional)"
              value={formData.message}
              onChange={handleInputChange("message")}
              rows={3}
            />
          </form>
        </ModalContent>
        <ModalFooter>
          <Button variant="secondary" onClick={formModal.close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Contato
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExamples;
