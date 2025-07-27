import { cn } from '@/utils/cn';

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        'mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6',
        className
      )}
    >
      {children}
    </section>
  );
}
