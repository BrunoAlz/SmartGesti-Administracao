import React, { useState } from "react";
import { 
  CustomModal,
  useModal,
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardContent
} from "../../../design-system";
import { useThemeClasses } from "@/design-system";
import { cn } from "@/design-system";
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
  const modal = useModal();
  const [showCustomModal, setShowCustomModal] = useState(false);
  
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
    setShowCustomModal(false);
    modal.success("Formulário enviado!", "Dados foram salvos com sucesso!");
  };

  const handleDelete = () => {
    console.log("Item deleted");
    modal.success("Item excluído!", "O item foi removido com sucesso!");
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
            <Button onClick={() => modal.alert({
              title: "Modal Básico",
              text: "Este é um exemplo de modal básico com SweetAlert2!",
              variant: "info"
            })} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Modal Básico
            </Button>
            
            <Button onClick={() => modal.confirm({
              title: "Confirmar Ação",
              text: "Tem certeza que deseja realizar esta ação?",
              confirmButtonText: "Sim, confirmar",
              cancelButtonText: "Cancelar",
              onConfirm: handleDelete
            })} variant="secondary">
              <Trash2 className="w-4 h-4 mr-2" />
              Modal de Confirmação
            </Button>
            
            <Button onClick={() => modal.error("Erro de Validação", "Alguns campos estão inválidos. Verifique e tente novamente.")} variant="danger">
              <Info className="w-4 h-4 mr-2" />
              Modal de Erro
            </Button>
            
            <Button onClick={() => modal.success("Operação Realizada", "A operação foi concluída com sucesso!")} variant="success">
              <CheckCircle className="w-4 h-4 mr-2" />
              Modal de Sucesso
            </Button>
            
            <Button onClick={() => modal.confirmDelete("Confirmar Exclusão", "Esta ação não pode ser desfeita!")} variant="warning">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Modal de Exclusão
            </Button>
            
            <Button onClick={() => setShowCustomModal(true)} variant="primary">
              <User className="w-4 h-4 mr-2" />
              Modal Customizado
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Customizado usando CustomModal */}
      <CustomModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        title="Formulário de Contato"
        width="lg"
        actions={
          <>
            <Button variant="secondary" onClick={() => setShowCustomModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Salvar Contato
            </Button>
          </>
        }
      >
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
      </CustomModal>
    </div>
  );
};
