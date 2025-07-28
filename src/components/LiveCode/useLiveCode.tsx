import { cn } from '@/utils/cn';
import { useState, useRef, PropsWithChildren, useEffect } from 'react';

interface LiveCodeProps {
  code: string;
  containerClassName?: string;
}

const MAX_HEIGHT_COLLAPSED = 27;

export const useLiveCode = ({ code, containerClassName }: LiveCodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [maxHeight, setMaxHeight] = useState('unset');
  const [currentCode, setCurrentCode] = useState(code.trim());

  const codeRef = useRef<HTMLDivElement | null>(null);

  /**
   * LiveCode의 배치를 위한 컴포넌트
   *
   */
  const DefaultContainer = ({ children, ...props }: PropsWithChildren) => (
    <div
      className={cn('relative', !containerClassName && 'flex items-center justify-center gap-4', containerClassName)}
      {...props}
    >
      {children}
    </div>
  );

  const handleCopy = async () => {
    try {
      const codeToClipboard = currentCode;
      await navigator.clipboard.writeText(codeToClipboard);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
  };

  /**
   * Editable 상태일 때 코드 포커스 처리
   */
  const setCodeRef = (node: HTMLDivElement | null) => {
    if (node) {
      codeRef.current = node;
      if (isEditable) (node.querySelector('.prism-code') as HTMLPreElement).focus();
    }
  };

  useEffect(
    function calculateMaxHeight() {
      if (codeRef.current) {
        setMaxHeight(
          isExpanded ? `${(codeRef.current as HTMLDivElement).scrollHeight}px` : MAX_HEIGHT_COLLAPSED + 'px'
        );
      }
    },
    [isExpanded, currentCode]
  );

  return {
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
  };
};
