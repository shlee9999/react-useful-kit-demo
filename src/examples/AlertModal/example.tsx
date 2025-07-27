import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
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
      <Title title={title} icon={icon} />
      <Description description={description} />

      {/* 테스트 섹션 */}
      <Section>
        <Section.Title icon="🎮">테스트</Section.Title>
        <div className="grid grid-cols-2 gap-4">
          <DemoButton onClick={handleSimpleAlert} icon="💬" children="간단한 알림" variant="blue" />
          <DemoButton onClick={handleConfirmAlert} icon="❓" children="확인/취소 알림" variant="amber" />
          <DemoButton onClick={handleCustomAlert} icon="🎨" children="커스텀 버튼 텍스트" variant="purple" />
          <DemoButton onClick={handleJSXAlert} icon="⚛️" children="JSX 메시지" variant="emerald" />
        </div>
      </Section>

      {/* 이벤트 로그 섹션 */}
      <Section>
        <Section.Title icon="📝">이벤트 로그</Section.Title>
        <Section.LogContainer logs={log} clearLog={clearLog} />
      </Section>

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
