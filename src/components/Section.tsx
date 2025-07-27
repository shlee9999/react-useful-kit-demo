import { cn } from '@/utils/cn';
import { useRef, useEffect } from 'react';
import { useAlertModal } from 'react-useful-kit';

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        'relative mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6',
        className
      )}
    >
      {children}
    </section>
  );
}

Section.Title = function Title({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center text-xl font-semibold text-slate-700">
      <span className="mr-1">{icon}</span>
      {children}
    </h3>
  );
};

Section.Description = function Description({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 text-center text-lg whitespace-pre-line text-slate-600">{children}</p>;
};

Section.Button = function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95">
      {children}
    </button>
  );
};

Section.LogContainer = function LogContainer({
  className,
  logs,
  clearLog,
}: {
  className?: string;
  logs: string[];
  clearLog: () => void;
}) {
  const { alert } = useAlertModal();
  const handleClearLog = () => {
    alert({
      title: '로그 삭제',
      message: '로그를 전부 삭제하시겠습니까?',
      onConfirm: clearLog,
    });
  };
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={logContainerRef}
      className={cn(
        'max-h-72 overflow-y-auto rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-inner',
        className
      )}
    >
      {logs.length === 0 ? (
        <p className="text-slate-500">아직 로그가 없습니다. 버튼을 클릭해보세요!</p>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            className="mb-1 rounded-md border-l-4 border-indigo-400 bg-white/5 p-3 font-mono text-sm text-slate-200 backdrop-blur-sm"
          >
            {log}
          </div>
        ))
      )}
      <button onClick={handleClearLog} className="absolute top-6 right-6">
        로그 삭제
      </button>
    </div>
  );
};
