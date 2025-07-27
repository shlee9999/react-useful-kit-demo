import type { ExampleMeta } from '@/examples';
import { useState } from 'react';
import { useAlertModal } from 'react-useful-kit';

/**
 * useAlertModal 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function AlertModalExample({ title, description, icon }: ExampleMeta) {
  const { alert } = useAlertModal();
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const handleSimpleAlert = () => {
    alert('간단한 알림 메시지입니다!');
    addLog('간단한 알림 호출');
  };

  const handleConfirmAlert = () => {
    alert({
      title: '확인 필요',
      message: '정말로 이 작업을 수행하시겠습니까?',
      showCancel: true,
      onConfirm: () => addLog('확인 버튼 클릭'),
      onCancel: () => addLog('취소 버튼 클릭'),
    });
  };

  const handleCustomAlert = () => {
    alert({
      title: '사용자 정의 알림',
      message: '버튼 텍스트를 커스터마이징할 수 있습니다.',
      confirmText: '동의합니다',
      cancelText: '거부합니다',
      showCancel: true,
      onConfirm: () => addLog('동의 버튼 클릭'),
      onCancel: () => addLog('거부 버튼 클릭'),
    });
  };

  const handleJSXAlert = () => {
    alert({
      title: 'JSX 지원',
      message: (
        <div>
          <p>
            메시지에 <strong>JSX</strong>를 사용할 수 있습니다!
          </p>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li>리스트 아이템 1</li>
            <li>리스트 아이템 2</li>
          </ul>
        </div>
      ),
      confirmText: '멋지네요!',
      onConfirm: () => addLog('JSX 알림 확인'),
    });
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <>
      <h2 className="mb-10 flex items-center justify-center gap-2 text-center text-3xl font-bold tracking-tight md:text-4xl">
        <span className="text-4xl">{icon}</span>
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{title}</span>
      </h2>
      <p className="mb-8 text-center text-lg whitespace-pre-line text-slate-600">{description}</p>

      {/* 테스트 버튼 섹션 */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-700">🎮 테스트 버튼들</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={handleSimpleAlert}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95"
          >
            💬 간단한 알림
          </button>
          <button
            onClick={handleConfirmAlert}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl active:scale-95"
          >
            ❓ 확인/취소 알림
          </button>
          <button
            onClick={handleCustomAlert}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl active:scale-95"
          >
            🎨 커스텀 버튼 텍스트
          </button>
          <button
            onClick={handleJSXAlert}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl active:scale-95"
          >
            ⚛️ JSX 메시지
          </button>
          <button
            onClick={clearLog}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-red-600 hover:to-rose-700 hover:shadow-xl active:scale-95 sm:col-span-2 lg:col-span-1"
          >
            🗑️ 로그 지우기
          </button>
        </div>
      </div>

      {/* 이벤트 로그 섹션 */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-700">📝 이벤트 로그</h3>
        <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-inner">
          {log.length === 0 ? (
            <div className="py-5 text-center text-slate-400 italic">
              아직 로그가 없습니다. 위의 버튼들을 클릭해보세요! 🚀
            </div>
          ) : (
            <div className="space-y-2">
              {log.map((entry, index) => (
                <div
                  key={index}
                  className="rounded-lg border-l-4 border-indigo-400 bg-white/5 p-3 font-mono text-sm text-slate-200 backdrop-blur-sm"
                >
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 사용법 안내 섹션 */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100 p-6">
        <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-800">💡 사용법 안내</h4>
        <ul className="space-y-2 pl-5 text-emerald-700">
          <li className="leading-relaxed">
            <strong>간단한 사용:</strong>{' '}
            <code className="rounded bg-white/70 px-2 py-1 font-mono text-sm">alert('메시지')</code>
          </li>
          <li className="leading-relaxed">
            <strong>옵션 사용:</strong> 제목, 버튼 텍스트, 콜백 함수 등을 커스터마이징
          </li>
          <li className="leading-relaxed">
            <strong>JSX 지원:</strong> 메시지에 React 컴포넌트를 전달 가능
          </li>
          <li className="leading-relaxed">
            <strong>함수형 호출:</strong> 상태 관리 없이 함수만 호출하면 모달 표시
          </li>
        </ul>
      </div>
    </>
  );
}
