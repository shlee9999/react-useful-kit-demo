import { lazy, createElement, type ReactNode } from 'react';

export type ExampleMeta = {
  title: ReactNode;
  description: ReactNode;
  buttonText: ReactNode;
  icon: ReactNode;
};

type ExampleComponentProps = ExampleMeta & Record<string, unknown>;

const exampleMetas = import.meta.glob('./*/meta.ts', { eager: true }) as Record<string, { default: ExampleMeta }>;
const exampleComponents = import.meta.glob('./*/example.tsx') as Record<
  string,
  () => Promise<{ default: React.ComponentType<ExampleComponentProps> }>
>;

const examples: Record<
  string,
  ExampleMeta & { component: React.LazyExoticComponent<React.ComponentType<ExampleComponentProps>> }
> = {};

// meta 파일들 처리
Object.entries(exampleMetas).forEach(([key, value]) => {
  const exampleName = key.replace('./', '').replace('/meta.ts', '');
  const componentPath = key.replace('/meta.ts', '/example.tsx');

  if (exampleComponents[componentPath]) {
    const LazyComponent = lazy(() =>
      exampleComponents[componentPath]().then((module) => ({
        default: (props: ExampleComponentProps) => {
          const Component = module.default;
          return createElement(Component, { ...value.default, ...props });
        },
      }))
    );

    examples[exampleName] = {
      ...value.default,
      component: LazyComponent,
    };
  }
});

export default examples;
