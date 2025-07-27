import { cn } from '@/utils/cn';

export default function DemoButton({
  onClick,
  icon,
  children,
  variant,
  className,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant: keyof typeof variants;
  className?: string;
}) {
  const variantClass = variants[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95',
        variantClass,
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

const variants = {
  blue: 'rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95',
  amber:
    'rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl active:scale-95',
  purple:
    'rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl active:scale-95',
  emerald:
    'rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl active:scale-95',
  red: 'rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-red-600 hover:to-rose-700 hover:shadow-xl active:scale-95',
};
