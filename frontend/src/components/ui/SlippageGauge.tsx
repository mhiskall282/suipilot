import { cn } from '../../utils/cn';

interface SlippageGaugeProps {
  current: number;
  max: number;
  className?: string;
}

export function SlippageGauge({ current, max, className }: SlippageGaugeProps) {
  const percentage = (current / max) * 100;
  const isWarning = percentage > 70;
  const isDanger = percentage > 90;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Slippage</span>
        <span className="font-mono font-semibold">
          {current.toFixed(2)}% / {max.toFixed(2)}%
        </span>
      </div>
      
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 rounded-full',
            isDanger ? 'bg-danger-500' : isWarning ? 'bg-warning-500' : 'bg-safety-500'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>{max.toFixed(2)}%</span>
      </div>
    </div>
  );
}