import { Github } from '@/assets/icons/core';
import { cn } from '@/utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'github';
  className?: string;
}

export default function Button({ children, onClick, icon, variant = 'default', className }: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'github':
        icon = <Github />;
        return 'group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#24292e] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#1b1f23] hover:shadow-lg';
      // case 'primary':
      // return 'group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-black backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary-900/30 bg-primary-900';
      default:
        return 'group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30';
    }
  };

  return (
    <div className={cn(getVariantStyles(), className)} onClick={onClick}>
      {icon && <span className="text-lg transition-all duration-300">{icon}</span>}
      {children}
    </div>
  );
}
