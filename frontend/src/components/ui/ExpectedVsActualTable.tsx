import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ExpectedVsActualTableProps {
  expected: {
    output: string;
    slippage: string;
    price: string;
    gas: string;
  };
  actual: {
    output: string;
    slippage: string;
    price: string;
    gas: string;
  };
}

export function ExpectedVsActualTable({ expected, actual }: ExpectedVsActualTableProps) {
  const compareValues = (expectedVal: string, actualVal: string, metric: string) => {
    const exp = parseFloat(expectedVal.replace(/[^0-9.]/g, ''));
    const act = parseFloat(actualVal.replace(/[^0-9.]/g, ''));
    
    if (metric === 'output') return act > exp;
    if (metric === 'slippage') return act < exp;
    if (metric === 'gas') return act < exp;
    return act < exp;
  };

  const renderComparison = (expectedVal: string, actualVal: string, metric: string) => {
    const isBetter = compareValues(expectedVal, actualVal, metric);
    const isDifferent = expectedVal !== actualVal;

    return (
      <div className="flex items-center gap-2">
        <span className={isBetter && isDifferent ? 'text-safety-600 font-semibold' : ''}>
          {actualVal}
        </span>
        {isDifferent && (
          <>
            {isBetter ? (
              <TrendingUp className="w-4 h-4 text-safety-600" />
            ) : (
              <Minus className="w-4 h-4 text-gray-400" />
            )}
          </>
        )}
      </div>
    );
  };

  const outputDiff = parseFloat(actual.output) - parseFloat(expected.output);
  const outputDiffPercent = ((outputDiff / parseFloat(expected.output)) * 100).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Output
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {expected.output} SUI
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                {renderComparison(expected.output, actual.output, 'output')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Slippage
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {expected.slippage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                {renderComparison(expected.slippage, actual.slippage, 'slippage')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Price
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                ${expected.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                {renderComparison(expected.price, actual.price, 'price')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Gas
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                {expected.gas} SUI
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                {renderComparison(expected.gas, actual.gas, 'gas')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {outputDiff > 0 && (
        <div className="bg-safety-50 border border-safety-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-safety-700">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">
              You got {outputDiffPercent}% MORE than expected! 🎉
            </span>
          </div>
        </div>
      )}
    </div>
  );
}