import { cn } from '@/utils/cn';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { HiCheck, HiPencil, HiClipboardCopy, HiChevronUp, HiChevronDown, HiCheckCircle } from 'react-icons/hi';

export const ToolbarButtons = ({
  isExpanded,
  isEditable,
  isCopied,
  handleCopy,
  codeRef,
  setIsEditable,
  setIsExpanded,
}: ToolbarButtonsProps) => (
  <div className={cn('absolute right-2 -bottom-6 z-10 flex items-center gap-2')}>
    <EditButton
      isEditable={isEditable}
      isExpanded={isExpanded}
      toggleEdit={() => setIsEditable((prev) => !prev)}
      codeRef={codeRef}
    />

    <CopyButton isExpanded={isExpanded} isCopied={isCopied} handleCopy={handleCopy} />

    <CollapseButton isExpanded={isExpanded} toggleIsExpanded={() => setIsExpanded((prev) => !prev)} />
  </div>
);

const toolbarButtonStyle = 'text-sm text-gray-700 hover:text-gray-800 transition-all';

const EditButton = ({
  isEditable,
  isExpanded,
  toggleEdit,
}: {
  isEditable: boolean;
  isExpanded: boolean;
  toggleEdit: () => void;
  codeRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <>
      <button
        onClick={toggleEdit}
        className={cn(toolbarButtonStyle, isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0')}
        data-tooltip-id="edit-button"
        data-tooltip-content={isEditable ? '수정 완료' : '실시간 수정'}
      >
        {isEditable ? <HiCheck size={16} /> : <HiPencil size={16} />}
      </button>
      {/* <Tooltip id="edit-button" /> */}
    </>
  );
};

const CopyButton = ({
  isExpanded,
  isCopied,
  handleCopy,
}: {
  isExpanded: boolean;
  isCopied: boolean;
  handleCopy: () => void;
}) => (
  <button
    onClick={handleCopy}
    className={cn(toolbarButtonStyle, isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0')}
    // data-tooltip-id="copy-button"
    // data-tooltip-content="원본 코드 복사"
  >
    {isCopied ? <HiCheckCircle size={16} /> : <HiClipboardCopy size={16} />}
  </button>
  // <Toast
  //   message="원본 코드가 복사되었습니다"
  //   triggerComponent={
  //     <div className="relative">
  //       <button
  //         onClick={handleCopy}
  //         className={cn(toolbarButtonStyle, isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0')}
  //         // data-tooltip-id="copy-button"
  //         // data-tooltip-content="원본 코드 복사"
  //       >
  //         {isCopied ? <CopyCheck size={16} /> : <Copy size={16} />}
  //       </button>
  //       {/* <Tooltip id="copy-button" /> */}
  //     </div>
  //   }
  // />
);

const CollapseButton = ({ isExpanded, toggleIsExpanded }: { isExpanded: boolean; toggleIsExpanded: () => void }) => (
  <button className={cn(toolbarButtonStyle, isExpanded)} onClick={toggleIsExpanded}>
    {isExpanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
  </button>
);

interface ToolbarButtonsProps {
  isExpanded: boolean;
  isEditable: boolean;
  isCopied: boolean;
  handleCopy: () => void;
  codeRef: RefObject<HTMLDivElement>;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}
