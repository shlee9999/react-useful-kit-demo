import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ExampleMeta } from '@/examples';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-useful-kit';

/**
 * useUpdateEffect 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function UseUpdateEffectExample({ title, description, icon }: ExampleMeta) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [log, setLog] = useState<string[]>([]);

  // 일반 useEffect - 첫 렌더링과 업데이트 시 모두 실행됨
  useEffect(() => {
    const message = `일반 useEffect 실행 - count: ${count}`;
    console.log(message);
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  }, [count]);

  // useUpdateEffect - 첫 렌더링 시에는 실행되지 않고, 업데이트 시에만 실행됨
  useUpdateEffect(() => {
    const message = `useUpdateEffect 실행 - count: ${count}`;
    console.log(message);
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  }, [count]);

  // name 변경에 대한 useUpdateEffect 예제
  useUpdateEffect(() => {
    if (name.trim()) {
      const message = `이름이 변경됨: ${name}`;
      console.log(message);
      setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
    }
  }, [name]);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    setCount((prev) => prev - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <>
      <Title title={title} icon={icon} />
      <Description description={description} />

      <Section>
        <Section.Title icon="📊">현재 상태</Section.Title>
        <div className="space-y-2 text-slate-600">
          <p>카운트: {count}</p>
          <p>이름: {name || '(입력되지 않음)'}</p>
        </div>
      </Section>

      <Section>
        <Section.Title icon="🎮">카운터 테스트</Section.Title>
        <div className="grid grid-cols-3 gap-2">
          <DemoButton onClick={incrementCount} children="카운트 증가" variant="blue" className="w-full" />
          <DemoButton onClick={decrementCount} children="카운트 감소" variant="amber" className="w-full" />
          <DemoButton onClick={resetCount} children="카운트 리셋" variant="emerald" className="w-full" />
        </div>
      </Section>

      <Section>
        <Section.Title icon="✏️">이름 입력 테스트</Section.Title>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </Section>

      <Section>
        <Section.Title icon="📝">실행 로그</Section.Title>
        <Section.LogContainer logs={log} clearLog={clearLog} />
      </Section>

      <Section>
        <Section.Title icon="💡">사용법 안내</Section.Title>
        <ul className="ml-4 list-disc space-y-1">
          <li>
            <strong>일반 useEffect</strong>: 컴포넌트가 처음 마운트될 때와 count가 변경될 때마다 실행됩니다.
          </li>
          <li>
            <strong>useUpdateEffect</strong>: 첫 렌더링 시에는 실행되지 않고, count가 변경될 때만 실행됩니다.
          </li>
          <li>페이지를 새로고침하면 useEffect만 실행되고, useUpdateEffect는 실행되지 않는 것을 확인할 수 있습니다.</li>
          <li>이름을 입력할 때도 useUpdateEffect가 초기값이 아닌 변경 시에만 실행되는 것을 확인할 수 있습니다.</li>
        </ul>
      </Section>
    </>
  );
}
