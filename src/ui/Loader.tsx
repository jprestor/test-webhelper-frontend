import { cn } from '@/lib';

export function Loader({
  className,
  spinnerClassName,
}: {
  className?: string;
  spinnerClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex w-fit animate-spin items-center justify-center',
        className,
      )}
    >
      <div
        className={cn(
          'border-t-ErrorRed h-7 w-7 rounded-full border-2 border-white',
          spinnerClassName,
        )}
      />
    </div>
  );
}
