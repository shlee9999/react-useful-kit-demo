import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ExampleMeta } from '@/examples';
import { useState } from 'react';
import { Modal } from 'react-useful-kit';

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

      {/* 현재 상태 섹션 */}
      <Section>
        <Section.Title icon="📊">현재 상태</Section.Title>
        <div className="text-slate-600">
          <p>
            카운터: <span className="rounded bg-slate-100 px-2 py-1 font-mono">{count}</span>
          </p>
        </div>
      </Section>

      {/* 모달 예제들 섹션 */}
      <Section>
        <Section.Title icon="🎮">모달 예제들</Section.Title>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* 기본 모달 */}
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-700">기본 모달</h4>
            <p className="mb-4 text-slate-600">가장 간단한 형태의 모달입니다.</p>
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
          </div>

          {/* 커스텀 닫기 버튼 */}
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-700">커스텀 닫기</h4>
            <p className="mb-4 text-slate-600">커스텀 닫기 버튼을 사용한 모달입니다.</p>
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
                    <DemoButton
                      onClick={() => addLog('커스텀 모달 완료')}
                      icon="✅"
                      children="완료"
                      variant="emerald"
                    />
                  </Modal.Close>
                </div>
              </Modal.Content>
            </Modal>
          </div>

          {/* 이벤트 통합 */}
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-700">이벤트 통합</h4>
            <p className="mb-4 text-slate-600">기존 onClick 이벤트와 자연스럽게 통합됩니다.</p>
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
          </div>

          {/* 오버레이 없는 모달 */}
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-700">오버레이 없음</h4>
            <p className="mb-4 text-slate-600">배경 오버레이 없이 모달만 표시합니다.</p>
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
        </div>
      </Section>

      {/* 이벤트 로그 섹션 */}
      <Section>
        <Section.Title icon="📝">이벤트 로그</Section.Title>
        <Section.LogContainer logs={log} />
        <DemoButton
          onClick={clearLog}
          icon="🗑️"
          children="로그 지우기"
          variant="red"
          className="absolute top-2 right-2"
        />
      </Section>

      {/* 사용 방법 섹션 */}
      <Section>
        <Section.Title icon="📋">사용 방법</Section.Title>
        <div className="rounded-lg bg-slate-900 p-6">
          <pre className="overflow-x-auto text-sm text-slate-200">
            <code>{`import { Modal } from 'react-useful-kit'

function App() {
  return (
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
  )
}`}</code>
          </pre>
        </div>
      </Section>

      {/* CSS 커스터마이징 섹션 */}
      <Section>
        <Section.Title icon="🎨">CSS 커스터마이징</Section.Title>
        <div className="rounded-lg bg-slate-900 p-6">
          <pre className="overflow-x-auto text-sm text-slate-200">
            <code>{`.react-useful-kit-modal-overlay {
  /* 오버레이 스타일 */
}
.react-useful-kit-modal-content {
  /* 모달 콘텐츠 스타일 */
}
.react-useful-kit-modal-close {
  /* 닫기 버튼 스타일 */
}`}</code>
          </pre>
        </div>
      </Section>
    </>
  );
}
