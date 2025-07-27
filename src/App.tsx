import Button from '@/components/Button';
import ExampleCard from '@/components/ExampleCard';
import { useState } from 'react';
import examples from './examples';
import { cn } from '@/utils/cn';

type TabType = 'overview' | keyof typeof examples;

const tabs = [
  {
    id: 'overview',
    label: (
      <div className="flex items-center gap-2 text-lg">
        <span>🏠</span>
        <span>Overview</span>
      </div>
    ),
    component: null,
  },
  ...Object.entries(examples).map(([key, example]) => ({
    id: key,
    label: (
      <div className="flex items-center gap-2 text-lg">
        <span>{example.icon}</span>
        <span>{example.title}</span>
      </div>
    ),
    component: example.component,
  })),
] as const;

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderActiveComponent = () => {
    if (activeTab === 'overview') return null;

    const example = examples[activeTab];
    return example?.component ? <example.component /> : null;
  };

  return (
    <>
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float bg-primary-100 absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-40 blur-3xl"></div>
        <div
          className="animate-float bg-secondary-100 absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-20 text-center">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-40 w-40 animate-pulse rounded-full bg-white/20 blur-xl"></div>
          <div
            className="absolute -right-20 -bottom-20 h-60 w-60 animate-pulse rounded-full bg-white/10 blur-2xl"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white/15 blur-xl"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative mx-auto max-w-4xl">
          <div className="animate-fade-in mb-6">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <span className="mr-2 text-lg">🚀</span>
              개발자를 위한 필수 도구
            </div>
          </div>

          <h1 className="font-display animate-fade-in mb-6 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
            React Useful Kit
          </h1>

          <p
            className="animate-fade-in mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-indigo-100 md:text-2xl"
            style={{ animationDelay: '0.2s' }}
          >
            React용 유용한 훅과 컴포넌트 모음집 ✨
          </p>

          <div
            className="animate-fade-in flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              onClick={() => setActiveTab('overview')}
              icon={<span className="text-lg transition-all duration-300">📚</span>}
            >
              시작하기
            </Button>
            <Button
              onClick={() => window.open('https://github.com/shlee9999/react-useful-kit', '_blank')}
              variant="github"
            >
              GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative mb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="shadow-soft rounded-2xl border border-white bg-white p-2">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    'transform rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105',
                    activeTab === tab.id
                      ? 'bg-primary-600 shadow-colored text-white'
                      : 'hover:bg-primary-100 hover:text-primary-700 text-slate-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          {activeTab === 'overview' && (
            <div className="space-y-16">
              {/* Overview Header */}
              <div className="animate-slide-up text-center">
                <h2 className="font-display mb-6 flex items-center justify-center gap-3 text-4xl font-bold text-slate-800">
                  <span className="animate-bounce-gentle text-5xl">🚀</span>
                  환영합니다!
                </h2>
                <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
                  React 개발을 더욱 편리하게 만들어주는 유용한 도구들을 모았습니다.
                  <br />
                  <span className="text-primary-600 font-semibold">각 탭을 클릭하여 실제 동작을 확인해보세요!</span>
                </p>
              </div>

              {/* Feature Cards */}
              <div
                className="animate-slide-up grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                style={{ animationDelay: '0.3s' }}
              >
                {Object.entries(examples).map(([key, example], index) => (
                  <div key={key} className="animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <ExampleCard {...example} onClick={() => setActiveTab(key as TabType)} />
                  </div>
                ))}
              </div>

              {/* Installation Section */}
              <div
                className="animate-slide-up shadow-soft-lg rounded-3xl bg-slate-800 p-8 text-center md:p-12"
                style={{ animationDelay: '0.6s' }}
              >
                <h3 className="font-display mb-6 flex items-center justify-center gap-3 text-3xl font-bold text-white">
                  <span className="text-4xl">📦</span> 설치 방법
                </h3>
                <div className="inline-block rounded-xl bg-slate-900 p-6">
                  <code className="text-primary-300 font-mono text-lg">npm install react-useful-kit</code>
                </div>
                <p className="mt-4 text-lg text-slate-300">한 번의 설치로 모든 유용한 도구들을 사용하세요! 🎉</p>
              </div>

              {/* Features Grid */}
              <div
                className="animate-slide-up grid grid-cols-1 gap-8 md:grid-cols-3"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <div className="mb-4 text-4xl">⚡</div>
                  <h4 className="mb-2 text-xl font-bold text-slate-800">빠른 개발</h4>
                  <p className="text-slate-600">즉시 사용 가능한 컴포넌트와 훅들</p>
                </div>
                <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <div className="mb-4 text-4xl">🛡️</div>
                  <h4 className="mb-2 text-xl font-bold text-slate-800">TypeScript</h4>
                  <p className="text-slate-600">완벽한 타입 안정성과 IntelliSense</p>
                </div>
                <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <div className="mb-4 text-4xl">🎨</div>
                  <h4 className="mb-2 text-xl font-bold text-slate-800">커스터마이징</h4>
                  <p className="text-slate-600">프로젝트에 맞게 자유롭게 수정 가능</p>
                </div>
              </div>
            </div>
          )}

          {/* Example Component Container */}
          {activeTab !== 'overview' && (
            <div className="shadow-soft animate-fade-in mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 backdrop-blur-lg md:p-10">
              {renderActiveComponent()}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-6 py-12 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-lg font-medium text-slate-700">
              Made with <span className="animate-pulse text-red-500">❤️</span> for React developers
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
              <span>Powered by</span>
              <span className="text-primary-600 font-semibold">React Useful Kit</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
