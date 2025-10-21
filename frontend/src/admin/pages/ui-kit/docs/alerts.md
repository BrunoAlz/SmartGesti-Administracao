# Alerts & Notificações - UI Kit

Esta página demonstra o sistema completo de alertas e notificações do SmartGesTI.

## 🎯 O que você encontrará aqui

### 🔔 Alert Básico
- Alertas inline para feedback contextual
- 4 variantes: success, error, warning, info
- 3 tamanhos: sm, md, lg
- Suporte a títulos, ações e dismiss

### 🎪 Toast Notifications  
- Notificações temporárias no canto da tela
- Integração com react-toastify
- Títulos e ações customizáveis
- Tema automático claro/escuro

### 📱 Modal Alerts
- Alertas centralizados para atenção total
- Diferentes larguras e posicionamento
- Sistema de confirmação com Promise
- Ações customizáveis

### 📢 Banner Alerts
- Alertas persistentes no topo/rodapé
- Ideal para informações importantes
- Posicionamento fixo ou relativo
- Ações inline

## 🔧 Como usar

1. **Toast rápido**: Use `notify.toast.success("Mensagem")`
2. **Modal importante**: Use `notify.modal.error("Erro crítico")`
3. **Banner persistente**: Use `notify.banner.info("Info importante")`
4. **Confirmação**: Use `await notify.confirm("Tem certeza?")`

## 🎨 Sistema Unificado

Todos os alertas seguem o mesmo padrão:
- ✅ Tema claro/escuro automático
- ✅ Variantes consistentes (success, error, warning, info)
- ✅ Acessibilidade completa
- ✅ Animações suaves
- ✅ API unificada via `useNotification()`

## 📚 Documentação Completa

Para detalhes técnicos, exemplos de código e guias de implementação, consulte:
- `/frontend/src/design-system/docs/ui/alerts.md`

## 🚀 Teste Interativo

Use os botões nesta página para testar todas as funcionalidades em tempo real!