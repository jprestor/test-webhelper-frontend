import { Loader } from './Loader';
import { cn } from '@/lib';

export function Button({
  loading,
  disabled,
  type = 'button',
  onClick,
  children,
  className,
}: {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        'relative inline-flex justify-center items-center px-5 min-h-[55px] w-fit text-base text-ContentBlack bg-MainYellow rounded cursor-pointer outline-0 transition border-2 border-MainYellow hover:bg-transparent hover:text-ContentBlack',
        disabled && 'opacity-50',
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[40px] bg-[rgba(32,32,39,.7)]">
          <Loader />
        </div>
      )}
    </button>
  );
}
