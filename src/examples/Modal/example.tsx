import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ExampleMeta } from '@/examples';
import { useState } from 'react';
import { Modal } from 'react-useful-kit';
import { LiveCode } from '@/components/LiveCode';

/**
 * Modal 컴포넌트의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function ModalExample({ title, description, icon }: ExampleMeta) {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <>
      <Title title={title} icon={icon} />
      <Description description={description} />

      {/* 사용 방법 섹션 */}
      <Section>
        <Section.Title icon="📋">사용 방법</Section.Title>
        <LiveCode
          code={`
<Modal>
  <Modal.Trigger>
    <button>모달 열기</button>
  </Modal.Trigger>
  <Modal.Content>
    <h2>모달 제목</h2>
    <p>모달 내용입니다!</p>
    <Modal.Close />
  </Modal.Content>
</Modal>

`}
          scope={{ Modal }}
        />
      </Section>
      {/* 특징 섹션 */}
      <Section>
        <Section.Title icon="✨">특징</Section.Title>
        <ul className="ml-4 list-disc space-y-2 text-slate-600">
          <li>합성 컴포넌트 패턴으로 직관적인 API 제공</li>
          <li>기존 onClick 이벤트와 자연스럽게 통합</li>
          <li>Portal을 사용한 body 레벨 렌더링</li>
          <li>CSS 클래스를 통한 완전한 커스터마이징 지원</li>
        </ul>
      </Section>

      {/* 모달 예제들 섹션 */}
      <Section>
        <Section.Title icon="🎮">테스트</Section.Title>
        <div className="grid grid-cols-2 gap-2">
          {/* 기본 모달 */}

          <Modal>
            <Modal.Trigger>
              <DemoButton
                onClick={() => addLog('기본 모달 열기 버튼 클릭')}
                icon="🚪"
                children="기본 모달 열기"
                variant="blue"
              />
            </Modal.Trigger>
            <Modal.Content>
              <div className="rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-slate-800">안녕하세요! 👋</h2>
                <p className="mb-6 text-slate-600">이것은 React Useful Kit의 Modal 컴포넌트입니다.</p>
                <Modal.Close>
                  <DemoButton onClick={() => addLog('기본 모달 닫기')} icon="❌" children="닫기" variant="red" />
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal>

          {/* 커스텀 닫기 버튼 */}
          <Modal>
            <Modal.Trigger>
              <DemoButton
                onClick={() => addLog('커스텀 모달 열기 버튼 클릭')}
                icon="🎨"
                children="커스텀 모달 열기"
                variant="amber"
              />
            </Modal.Trigger>
            <Modal.Content>
              <div className="rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-slate-800">커스텀 모달 🎨</h2>
                <p className="mb-6 text-slate-600">닫기 버튼을 커스터마이징할 수 있습니다.</p>
                <Modal.Close>
                  <DemoButton onClick={() => addLog('커스텀 모달 완료')} icon="✅" children="완료" variant="emerald" />
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal>

          {/* 이벤트 통합 */}
          <Modal>
            <Modal.Trigger>
              <DemoButton
                onClick={() => {
                  setCount((prev) => prev + 1);
                  addLog('카운터 증가 & 모달 열기');
                }}
                icon="📊"
                children="카운터 증가 & 모달 열기"
                variant="purple"
              />
            </Modal.Trigger>
            <Modal.Content>
              <div className="rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-slate-800">카운터 모달 📊</h2>
                <p className="mb-4 text-slate-600">
                  현재 카운터: <span className="rounded bg-slate-100 px-2 py-1 font-mono font-bold">{count}</span>
                </p>
                <p className="mb-6 text-slate-600">버튼을 클릭하면 카운터가 증가하고 모달이 열립니다.</p>
                <div className="flex gap-2">
                  <Modal.Close>
                    <DemoButton
                      onClick={() => addLog('카운터 모달 확인')}
                      icon="✅"
                      children="확인"
                      variant="emerald"
                    />
                  </Modal.Close>
                  <DemoButton
                    onClick={() => {
                      setCount(0);
                      addLog('카운터 리셋');
                    }}
                    icon="🔄"
                    children="리셋"
                    variant="red"
                  />
                </div>
              </div>
            </Modal.Content>
          </Modal>

          {/* 오버레이 없는 모달 */}
          <Modal>
            <Modal.Trigger>
              <DemoButton
                onClick={() => addLog('오버레이 없는 모달 열기')}
                icon="🎯"
                children="오버레이 없는 모달"
                variant="blue"
              />
            </Modal.Trigger>
            <Modal.Content overlay={false}>
              <div className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 border-cyan-500 bg-white p-6 shadow-2xl">
                <h2 className="mb-4 text-xl font-bold text-slate-800">오버레이 없는 모달 🎯</h2>
                <p className="mb-6 text-slate-600">배경이 어둡지 않습니다!</p>
                <Modal.Close>
                  <DemoButton
                    onClick={() => addLog('오버레이 없는 모달 닫기')}
                    icon="❌"
                    children="닫기"
                    variant="red"
                  />
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </Section>

      {/* 이벤트 로그 섹션 */}
      <Section>
        <Section.Title icon="📝">이벤트 로그</Section.Title>
        <Section.LogContainer logs={log} clearLog={clearLog} />
      </Section>
    </>
  );
}
