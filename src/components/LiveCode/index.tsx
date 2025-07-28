import { cn } from '@/utils/cn';
import { themes } from 'prism-react-renderer';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import '@/styles/react-live.css';
import { ToolbarButtons } from './ToolbarButtons';
import { useLiveCode } from './useLiveCode';
import { RefObject } from 'react';

interface LiveCodeProps {
  code: string;
  scope: Record<string, unknown>;
  containerClassName?: string;
}

export const LiveCode = ({ code, scope, containerClassName }: LiveCodeProps) => {
  const {
    isExpanded,
    isEditable,
    isCopied,
    currentCode,
    handleCopy,
    handleCodeChange,
    DefaultContainer,
    codeRef,
    setIsExpanded,
    setIsEditable,
    maxHeight,
    setCodeRef,
  } = useLiveCode({ code, containerClassName });

  return (
    <LiveProvider
      scope={scope}
      code={currentCode}
      language="tsx"
      theme={{
        ...themes.vsLight,
        plain: {
          ...themes.vsLight.plain,
          backgroundColor: '#F7F6F3',
        },
      }}
      disabled={!isEditable}
      transformCode={(code) => (code.trim().startsWith('<') ? `<>\n${code}\n</>` : `() => {${code}};`)}
    >
      <div className="live-code">
        {/* 미리보기 영역 */}
        <div className={cn('relative flex items-center justify-center rounded-t-lg bg-[#FFE8CC] p-10')}>
          <LivePreview Component={DefaultContainer} />
          <ToolbarButtons
            isExpanded={isExpanded}
            isEditable={isEditable}
            isCopied={isCopied}
            handleCopy={handleCopy}
            codeRef={codeRef as RefObject<HTMLDivElement>}
            setIsEditable={setIsEditable}
            setIsExpanded={setIsExpanded}
          />
        </div>
        <LiveError />

        {/* 코드 영역 */}
        <div
          ref={setCodeRef}
          className={cn(
            'relative overflow-hidden rounded-b-lg transition-all duration-300',
            !isExpanded && 'code-hidden'
          )}
          style={{
            maxHeight,
          }}
        >
          <LiveEditor onChange={handleCodeChange} />
        </div>
      </div>
    </LiveProvider>
  );
};
