import { Lock, LockOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PrivacyBadgeProps {
  encrypted: boolean;
  className?: string;
}

export function PrivacyBadge({ encrypted, className }: PrivacyBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        encrypted
          ? 'bg-privacy-100 text-privacy-700 border border-privacy-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200',
        className
      )}
    >
      {encrypted ? (
        <Lock className="w-3 h-3" />
      ) : (
        <LockOpen className="w-3 h-3" />
      )}
      <span>{encrypted ? 'Encrypted' : 'Not Encrypted'}</span>
    </div>
  );
}