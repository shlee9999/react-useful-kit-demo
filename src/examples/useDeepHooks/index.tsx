import DemoButton from '@/components/DemoButton';
import Description from '@/components/Description';
import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ExampleMeta } from '@/examples';
import { useDeepCallback, useDeepMemo } from 'react-useful-kit';
import { useCallback, useMemo, useState } from 'react';

interface User {
  name: string;
  age: number;
  preferences: {
    theme: string;
    language: string;
  };
}

interface Item {
  id: number;
  name: string;
  category: string;
}

/**
 * useDeepMemo와 useDeepCallback 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function UseDeepHooksExample({ title, description, icon }: ExampleMeta) {
  const [user, setUser] = useState<User>({
    name: 'John',
    age: 30,
    preferences: {
      theme: 'dark',
      language: 'ko',
    },
  });

  const [items] = useState<Item[]>([
    { id: 1, name: 'Apple', category: 'fruit' },
    { id: 2, name: 'Banana', category: 'fruit' },
    { id: 3, name: 'Carrot', category: 'vegetable' },
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    price: { min: 0, max: 1000 },
  });

  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // 일반 useMemo와 useDeepMemo 비교
  const expensiveValueNormal = useMemo(() => {
    const message = '🔄 일반 useMemo - 복잡한 계산 실행됨';
    console.log(message);
    addLog(message);
    return user.name.toUpperCase() + '_' + user.age;
  }, [user]); // user 객체 참조가 바뀔 때마다 재계산

  const expensiveValueDeep = useDeepMemo(() => {
    const message = '✅ useDeepMemo - 복잡한 계산 실행됨';
    console.log(message);
    addLog(message);
    return user.name.toUpperCase() + '_' + user.age;
  }, [user]); // user 객체의 실제 값이 변경될 때만 재계산

  // 일반 useCallback과 useDeepCallback 비교
  const handleSubmitNormal = useCallback(
    (data: string) => {
      const message = `🔄 일반 useCallback - 함수 재생성됨: ${data}`;
      console.log(message, user);
      addLog(message);
    },
    [user]
  ); // user 객체 참조가 바뀔 때마다 새 함수 생성

  const handleSubmitDeep = useDeepCallback(
    (data: string) => {
      const message = `✅ useDeepCallback - 함수 재생성됨: ${data}`;
      console.log(message, user);
      addLog(message);
    },
    [user]
  ); // user 객체의 실제 값이 변경될 때만 새 함수 생성

  // 필터링된 아이템들 (useDeepMemo 사용)
  const filteredItems = useDeepMemo(() => {
    const message = '📦 필터링 계산 실행됨';
    console.log(message);
    addLog(message);
    if (filters.category === 'all') return items;
    return items.filter((item) => item.category === filters.category);
  }, [items, filters]);

  // 참조만 변경 (값은 동일)
  const changeUserReference = () => {
    setUser({ ...user }); // 같은 값으로 새 객체 생성
  };

  // 실제 값 변경
  const changeUserValue = () => {
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  // 필터 참조만 변경
  const changeFiltersReference = () => {
    setFilters({ ...filters }); // 같은 값으로 새 객체 생성
  };

  // 필터 값 변경
  const changeFiltersValue = () => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === 'all' ? 'fruit' : 'all',
    }));
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <>
      <Title title={title} icon={icon} />
      <Description description={description} />

      <Section>
        <Section.Title icon="👤">사용자 정보</Section.Title>
        <div className="space-y-2 text-slate-600">
          <p>이름: {user.name}</p>
          <p>나이: {user.age}</p>
          <p>테마: {user.preferences.theme}</p>
          <p>언어: {user.preferences.language}</p>
        </div>
      </Section>

      <Section>
        <Section.Title icon="💰">계산된 값들</Section.Title>
        <div className="space-y-2 text-slate-600">
          <p>
            일반 useMemo 결과: <span className="rounded bg-slate-100 px-2 py-1 font-mono">{expensiveValueNormal}</span>
          </p>
          <p>
            useDeepMemo 결과: <span className="rounded bg-slate-100 px-2 py-1 font-mono">{expensiveValueDeep}</span>
          </p>
        </div>
      </Section>

      <Section>
        <Section.Title icon="📋">필터링된 아이템 ({filteredItems.length}개)</Section.Title>
        <div className="space-y-2">
          <p className="text-slate-600">
            현재 필터: <span className="font-semibold">{filters.category}</span>
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-sm text-slate-500">({item.category})</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Section.Title icon="🎮">테스트</Section.Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoButton onClick={changeUserReference} icon="👤" children="사용자 참조만 변경" variant="blue" />
          <DemoButton onClick={changeUserValue} icon="👤" children="사용자 나이 +1" variant="amber" />
          <DemoButton onClick={changeFiltersReference} icon="🔍" children="필터 참조만 변경" variant="purple" />
          <DemoButton onClick={changeFiltersValue} icon="🔍" children="필터 값 변경" variant="emerald" />
          <DemoButton
            onClick={() => handleSubmitNormal('테스트 데이터')}
            icon="📤"
            children="일반 콜백 실행"
            variant="red"
          />
          <DemoButton
            onClick={() => handleSubmitDeep('테스트 데이터')}
            icon="📤"
            children="Deep 콜백 실행"
            variant="blue"
          />
        </div>
      </Section>

      <Section>
        <Section.Title icon="📝">실행 로그</Section.Title>
        <Section.LogContainer logs={log} clearLog={clearLog} />
      </Section>

      <Section>
        <Section.Title icon="💡">사용법 안내</Section.Title>
        <ul className="ml-4 list-disc space-y-2 text-slate-600">
          <li>
            <strong>"참조만 변경"</strong> 버튼: 같은 값으로 새 객체를 만듭니다. useDeepMemo/useDeepCallback은 실행되지
            않습니다.
          </li>
          <li>
            <strong>"실제 값 변경"</strong> 버튼: 객체의 실제 내용을 변경합니다. Deep 훅들이 실행됩니다.
          </li>
          <li>일반 useMemo/useCallback은 참조 변경만으로도 실행되지만, Deep 버전은 실제 값 변경에만 반응합니다.</li>
          <li>브라우저 개발자 도구의 콘솔 탭에서도 실행 로그를 확인할 수 있습니다.</li>
        </ul>
      </Section>
    </>
  );
}
