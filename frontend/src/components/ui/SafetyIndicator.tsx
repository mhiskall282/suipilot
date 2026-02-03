import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { SafetyCheck } from '../../types';
import { cn } from '../../utils/cn';

interface SafetyIndicatorProps {
  check: SafetyCheck;
}

export function SafetyIndicator({ check }: SafetyIndicatorProps) {
  const icons = {
    pass: CheckCircle,
    warn: AlertTriangle,
    fail: XCircle,
  };

  const colors = {
    pass: 'text-safety-600 bg-safety-50 border-safety-200',
    warn: 'text-warning-600 bg-warning-50 border-warning-200',
    fail: 'text-danger-600 bg-danger-50 border-danger-200',
  };

  const Icon = icons[check.status];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border',
        colors[check.status]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-medium text-sm">{check.name}</div>
        <div className="text-xs mt-1 opacity-90">{check.message}</div>
      </div>
    </div>
  );
}