import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ExampleMeta } from '@/examples';
import { useEffect, useState } from 'react';
import { useDeepEffect } from 'react-useful-kit';

interface User {
  name: string;
  age: number;
  preferences: {
    theme: string;
    language: string;
  };
}

/**
 * useDeepEffect 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function DeepEffectExample({ title, description, icon }: ExampleMeta) {
  const [user, setUser] = useState<User>({
    name: 'John',
    age: 30,
    preferences: {
      theme: 'dark',
      language: 'ko',
    },
  });

  const [items, setItems] = useState([1, 2, 3]);
  const [log, setLog] = useState<string[]>([]);

  // 일반 useEffect 비교용 - 참조가 바뀔 때마다 실행됨
  useEffect(() => {
    console.log('일반 useEffect - user 객체 참조 변경:', user);
  }, [user]);

  // useDeepEffect - 실제 값이 변경될 때만 실행됨
  useDeepEffect(() => {
    const message = `사용자 정보 변경: ${user.name}, ${user.age}세, 테마: ${user.preferences.theme}`;
    console.log(message);
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  }, [user]);

  // 배열에 대한 깊은 비교
  useDeepEffect(() => {
    const message = `아이템 목록 변경: [${items.join(', ')}]`;
    console.log(message);
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  }, [items]);

  const updateUserReference = () => {
    // 같은 값으로 새 객체 생성 (참조만 변경, 값은 동일)
    setUser({ ...user });
  };

  const updateUserValue = () => {
    // 실제 값 변경
    setUser((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  const updateItemsReference = () => {
    // 같은 값으로 새 배열 생성 (참조만 변경, 값은 동일)
    setItems([...items]);
  };

  const updateItemsValue = () => {
    // 실제 값 변경
    setItems((prev) => [...prev, prev.length + 1]);
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
        <div>
          <div className="space-y-2 text-slate-600">
            <p>이름: {user.name}</p>
            <p>나이: {user.age}</p>
            <p>테마: {user.preferences.theme}</p>
            <p>언어: {user.preferences.language}</p>
            <p>아이템: {items.join(', ')}</p>
          </div>
        </div>
      </Section>

      <Section>
        <Section.Title icon="🎮">테스트</Section.Title>
        <div className="grid grid-cols-2 gap-2">
          <DemoButton
            onClick={updateUserReference}
            children="사용자 참조만 변경 (깊은 비교 → 실행 안됨)"
            variant="blue"
            className="w-full"
          />
          <DemoButton
            onClick={updateUserValue}
            children="사용자 실제 값 변경 (깊은 비교 → 실행됨)"
            variant="amber"
            className="w-full"
          />
          <DemoButton
            onClick={updateItemsReference}
            children="아이템 참조만 변경 (깊은 비교 → 실행 안됨)"
            variant="emerald"
            className="w-full"
          />
          <DemoButton
            onClick={updateItemsValue}
            children="아이템 실제 값 변경 (깊은 비교 → 실행됨)"
            variant="purple"
            className="w-full"
          />
        </div>
      </Section>

      <Section>
        <Section.Title icon="📝">useDeepEffect 실행 로그</Section.Title>
        <Section.LogContainer logs={log} clearLog={clearLog} />
      </Section>

      <Section>
        <Section.Title icon="💡">사용법 안내</Section.Title>
        <ul className="ml-4 list-disc">
          <li>
            <strong>"참조만 변경"</strong> 버튼: 같은 값으로 새 객체/배열을 만듭니다. useDeepEffect는 실행되지 않습니다.
          </li>
          <li>
            <strong>"실제 값 변경"</strong> 버튼: 객체/배열의 실제 내용을 변경합니다. useDeepEffect가 실행됩니다.
          </li>
          <li>일반 useEffect라면 참조 변경만으로도 실행되지만, useDeepEffect는 실제 값 변경에만 반응합니다.</li>
        </ul>
      </Section>
    </>
  );
}
