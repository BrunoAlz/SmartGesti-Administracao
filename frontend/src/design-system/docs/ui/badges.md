# Sistema de Badges

## Visão Geral

O sistema de badges oferece uma forma consistente e semântica de exibir status, categorias, tags e informações contextuais na interface. Inclui tanto um componente dedicado `Badge` quanto o hook legacy `useBadgeClasses` para máxima flexibilidade.

## Componentes Principais

### Badge
Componente principal com funcionalidades avançadas:
- ✅ **Props declarativas** para maior legibilidade
- 🎯 **Funcionalidades integradas** (removível, clicável, ícones, dots)
- 🎨 **Variantes visuais** (outlined, diferentes formatos)
- 📏 **Múltiplos tamanhos** (sm, md, lg)

### BadgeGroup
Container para organizar múltiplos badges:
- 🔄 **Espaçamento consistente** (tight, normal, loose)
- 📱 **Layout responsivo** com wrap automático
- 🎯 **Agrupamento semântico** para contextos relacionados

### useBadgeClasses (Legacy)
Hook para aplicação direta de classes:
- 🔙 **Compatibilidade** com código existente
- ⚡ **Performance** para casos simples
- 🛠️ **Flexibilidade** para customizações específicas

## Variantes de Status

### Cores Semânticas
- **Success** (Verde): Sucesso, aprovado, ativo, concluído
- **Warning** (Amarelo): Aviso, pendente, atenção necessária
- **Error** (Vermelho): Erro, rejeitado, falhou, crítico
- **Info** (Azul): Informação, novo, padrão, neutro contextual
- **Purple** (Roxo): Premium, especial, destaque, VIP
- **Neutral** (Cinza): Neutro, desabilitado, secundário

### Implementação
```tsx
// Componente Badge (Recomendado)
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Falhou</Badge>
<Badge variant="info">Novo</Badge>
<Badge variant="purple">Premium</Badge>
<Badge variant="neutral">Neutro</Badge>

// Hook Legacy (Compatibilidade)
const successBadge = useBadgeClasses("success", "sm");
<span className={successBadge}>Ativo</span>
```

## Funcionalidades Avançadas

### Badges com Ícones
Melhoram o reconhecimento visual e comunicação:
```tsx
<Badge variant="success" icon={<CheckCircle />}>Aprovado</Badge>
<Badge variant="warning" icon={<Clock />}>Pendente</Badge>
<Badge variant="error" icon={<XCircle />}>Rejeitado</Badge>
<Badge variant="info" icon={<Info />}>Novo</Badge>
```

### Badges com Dots
Indicadores discretos para status sutil:
```tsx
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Ocupado</Badge>
<Badge variant="error" dot>Offline</Badge>

// Combinação dot + ícone
<Badge variant="success" dot icon={<Zap />}>Ativo</Badge>
```

### Badges Removíveis (Tags)
Ideais para filtros, seleções múltiplas e tags:
```tsx
const [tags, setTags] = useState(['React', 'TypeScript']);

{tags.map((tag, index) => (
  <Badge 
    key={index}
    variant="info" 
    removable 
    onRemove={() => removeTag(index)}
  >
    {tag}
  </Badge>
))}
```

### Badges Interativos
Badges clicáveis para ações e navegação:
```tsx
<Badge 
  variant="info" 
  onClick={() => handleAction()}
  icon={<Info />}
>
  Clique aqui
</Badge>
```

### Badges Outlined
Para fundos coloridos ou menor destaque visual:
```tsx
<Badge variant="success" outlined>Aprovado</Badge>
<Badge variant="warning" outlined>Pendente</Badge>
```

## Tamanhos e Formatos

### Tamanhos Disponíveis
- **SM**: Listas compactas, tags pequenas, contadores
- **MD**: Uso geral em cards, forms, navegação
- **LG**: Destaques, CTAs, headers importantes

### Formatos de Borda
- **Full**: Rounded completo (padrão) - mais amigável
- **MD**: Rounded médio - mais formal
- **LG**: Rounded grande - mais moderno

```tsx
<Badge variant="info" size="sm" rounded="full">Pequeno</Badge>
<Badge variant="info" size="md" rounded="md">Médio</Badge>
<Badge variant="info" size="lg" rounded="lg">Grande</Badge>
```

## Agrupamento com BadgeGroup

### Espaçamentos
```tsx
<BadgeGroup spacing="tight">
  {/* Badges próximos */}
</BadgeGroup>

<BadgeGroup spacing="normal">
  {/* Espaçamento padrão */}
</BadgeGroup>

<BadgeGroup spacing="loose">
  {/* Badges espaçados */}
</BadgeGroup>
```

## Casos de Uso Comuns

### 1. Status de Projetos
```tsx
<div className="project-card">
  <div className="flex justify-between items-center">
    <h3>Projeto Alpha</h3>
    <Badge variant="success" icon={<CheckCircle />}>Ativo</Badge>
  </div>
  <div className="tech-stack">
    <Badge variant="info" size="sm">React</Badge>
    <Badge variant="neutral" size="sm">TypeScript</Badge>
    <Badge variant="purple" size="sm">Premium</Badge>
  </div>
</div>
```

### 2. Dashboard e Métricas
```tsx
<div className="metrics">
  <div className="metric">
    <span>API Status</span>
    <Badge variant="success" dot size="sm">99.9%</Badge>
  </div>
  <div className="metric">
    <span>Notificações</span>
    <Badge variant="error" removable>3</Badge>
  </div>
</div>
```

### 3. Filtros e Seleções
```tsx
<div className="filters">
  <label>Tecnologias Selecionadas:</label>
  <BadgeGroup>
    <Badge variant="info" removable>React</Badge>
    <Badge variant="info" removable>Vue</Badge>
    <Badge variant="info" removable>Angular</Badge>
  </BadgeGroup>
</div>
```

### 4. Estados de Usuário
```tsx
<div className="user-status">
  <Avatar src={user.avatar} />
  <div>
    <span>{user.name}</span>
    <Badge variant="success" dot size="sm">Online</Badge>
  </div>
</div>
```

## Boas Práticas

### ✅ Faça
- Use cores semânticas consistentes (verde = sucesso, vermelho = erro)
- Prefira o componente `Badge` para funcionalidades avançadas
- Use ícones para melhorar reconhecimento visual
- Mantenha textos concisos (1-2 palavras)
- Agrupe badges relacionados com `BadgeGroup`
- Use `outlined` em fundos coloridos
- Utilize `removable` para filtros e tags
- Aplique `dot` para status discretos

### ❌ Evite
- Muitas cores diferentes na mesma interface
- Badges muito grandes que dominam o layout
- Cores arbitrárias que não seguem semântica
- Textos longos que quebram o design
- Misturar estilos diferentes sem propósito
- Badges interativos sem feedback visual claro

## Acessibilidade

### Suporte Nativo
- ✅ **Cores semânticas** com significado universal
- ✅ **Contraste adequado** em light/dark mode
- ✅ **Ícones descritivos** para melhor compreensão
- ✅ **Estados interativos** com feedback visual
- ✅ **Texto legível** em todos os tamanhos

### Melhorias Recomendadas
```tsx
// Para badges importantes, adicione aria-label
<Badge 
  variant="error" 
  aria-label="3 notificações críticas"
  removable
>
  3
</Badge>

// Para badges interativos, use papel semântico
<Badge 
  variant="info" 
  onClick={handleClick}
  role="button"
  tabIndex={0}
>
  Executar ação
</Badge>
```

## Performance

### Otimizações Implementadas
- ✅ **Memoização** de classes CSS
- ✅ **Lazy loading** de ícones
- ✅ **Reutilização** de estilos base
- ✅ **Tree shaking** para imports não utilizados

### Dicas de Uso
- Use `BadgeGroup` para renderização otimizada
- Prefira badges estáticos para listas grandes
- Considere virtualização para milhares de badges
- Reutilize variantes ao invés de criar customizações

## Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Temas
- ✅ **Light Mode**: Cores otimizadas para fundos claros
- ✅ **Dark Mode**: Contraste adequado para fundos escuros
- ✅ **Alto Contraste**: Suporte para acessibilidade
- ✅ **Responsivo**: Adapta-se a diferentes tamanhos de tela

## Migração

### De useBadgeClasses para Badge
```tsx
// Antes (Hook)
const statusBadge = useBadgeClasses("success", "sm");
<span className={cn(statusBadge, "flex items-center gap-1")}>
  <CheckCircle className="w-3 h-3" />
  Ativo
</span>

// Depois (Componente)
<Badge variant="success" size="sm" icon={<CheckCircle />}>
  Ativo
</Badge>
```

### Benefícios da Migração
- 🎯 **Código mais limpo** e declarativo
- 🛠️ **Funcionalidades prontas** (removível, clicável)
- 🎨 **Consistência visual** automática
- 📚 **Melhor documentação** e tipagem
- 🔄 **Fácil manutenção** e evolução