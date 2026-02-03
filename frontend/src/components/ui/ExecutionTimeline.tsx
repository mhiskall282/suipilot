import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExecutionTimelineProps {
  currentStep: 'input' | 'parse' | 'safety' | 'quote' | 'execute' | 'receipt';
}

const steps = [
  { id: 'input', label: 'Input' },
  { id: 'parse', label: 'Parse' },
  { id: 'safety', label: 'Safety' },
  { id: 'quote', label: 'Quote' },
  { id: 'execute', label: 'Execute' },
  { id: 'receipt', label: 'Receipt' },
];

export function ExecutionTimeline({ currentStep }: ExecutionTimelineProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                  isComplete
                    ? 'bg-safety-500 border-safety-500 text-white'
                    : isCurrent
                    ? 'bg-sui-blue border-sui-blue text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium',
                  isComplete || isCurrent ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  isComplete ? 'bg-safety-500' : 'bg-gray-300'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}