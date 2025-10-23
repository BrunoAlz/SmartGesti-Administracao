import React from 'react';
import { ComponentShowcase } from './components/ComponentShowcase';

import { Tabs, Tab } from '@/design-system/components/Tabs';
import { 
  Home,
  User,
  Settings
} from 'lucide-react';

const DefaultExample = () => (
  <Tabs variant="default" color="primary">
    <Tab label="Início" icon={<Home className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Início</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Conteúdo da aba de início. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="Perfil" icon={<User className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Perfil</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Conteúdo da aba de perfil. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="Configurações" icon={<Settings className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Configurações</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Conteúdo da aba de configurações. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
  </Tabs>
);

const PillsExample = () => (
  <Tabs variant="pills" color="success">
    <Tab label="Início" icon={<Home className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Início</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Exemplo de tabs em estilo pills. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="Perfil" icon={<User className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Perfil</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Conteúdo do perfil em pills. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="Configurações" icon={<Settings className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Configurações</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Configurações em pills. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
  </Tabs>
);

const GradientExample = () => (
  <Tabs variant="gradient" color="primary">
    <Tab label="Início" icon={<Home className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Início</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Exemplo com gradiente. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="Perfil" icon={<User className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Perfil</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Perfil com gradiente. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
  </Tabs>
);

const IconOnlyExample = () => (
  <Tabs variant="pills" color="purple" className="w-fit">
    <Tab label="" icon={<Home className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Início</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tab apenas com ícone. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="" icon={<User className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Perfil</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Perfil apenas com ícone. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
    <Tab label="" icon={<Settings className="w-5 h-5" />}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Configurações</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Configurações apenas com ícone. Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Tab>
  </Tabs>
);

const codeExample = `import { Tabs, Tab } from '@/design-system';
import { Home, User, Settings } from 'lucide-react';

// Exemplo Básico
<Tabs variant="default" color="primary">
  <Tab label="Início" icon={<Home className="w-5 h-5" />}>
    Conteúdo da aba
  </Tab>
  <Tab label="Perfil" icon={<User className="w-5 h-5" />}>
    Conteúdo da aba
  </Tab>
  <Tab label="Configurações" icon={<Settings className="w-5 h-5" />}>
    Conteúdo da aba
  </Tab>
</Tabs>

// Variantes
variant: "default" | "underline" | "pills" | "boxed" | "gradient"

// Cores
color: "primary" | "secondary" | "info" | "success" | 
       "warning" | "danger" | "purple" | "pink" | 
       "indigo" | "teal"

// Tamanhos
size: "sm" | "md" | "lg"`;

export function TabsUIKit() {
  return (
    <>
      <ComponentShowcase
        title="Tabs - Estilo Padrão"
        description="Exemplo de tabs no estilo padrão com ícones"
        component={<DefaultExample />}
        code={codeExample}
      />

      <ComponentShowcase
        title="Tabs - Estilo Pills"
        description="Exemplo de tabs no estilo pills com cores diferentes"
        component={<PillsExample />}
        code={codeExample}
      />

      <ComponentShowcase
        title="Tabs - Estilo Gradiente"
        description="Exemplo de tabs com gradientes coloridos"
        component={<GradientExample />}
        code={codeExample}
      />

      <ComponentShowcase
        title="Tabs - Apenas Ícones"
        description="Exemplo de tabs usando apenas ícones"
        component={<IconOnlyExample />}
        code={codeExample}
      />
    </>
  );
}