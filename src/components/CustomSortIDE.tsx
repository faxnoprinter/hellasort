import React, { useState } from 'react';
import { X, Play } from 'lucide-react';

interface CustomSortIDEProps {
  onClose: () => void;
}

export function CustomSortIDE({ onClose }: CustomSortIDEProps) {
  const [code, setCode] = useState(`// Write your custom sorting algorithm here
// Example:
function customSort(arr) {
  // Your sorting logic here
  return arr;
}
`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRun = () => {
    try {
      // Clear previous output and errors
      setOutput('');
      setError('');

      // Create a test array
      const testArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      
      // Execute the code
      const customSort = new Function('arr', code + '\nreturn customSort(arr);');
      const result = customSort([...testArray]);

      // Validate the result
      if (!Array.isArray(result)) {
        throw new Error('Function must return an array');
      }

      if (result.length !== testArray.length) {
        throw new Error('Returned array must have the same length as input array');
      }

      // Check if the array is sorted
      const isSorted = result.every((val, idx) => idx === 0 || result[idx - 1] <= val);
      
      setOutput(`Input: [${testArray.join(', ')}]\nOutput: [${result.join(', ')}]\nSorted: ${isSorted ? 'Yes' : 'No'}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2C2C2C] p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#61AFEF]">Custom Sort</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#3C3C3C] rounded">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">
            Write your custom sorting algorithm. The function should:
            <br />- Take an array as input
            <br />- Return the sorted array
            <br />- Not modify the original array
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-[#1E1E1E] p-4 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#61AFEF]"
            />
            <button
              onClick={handleRun}
              className="absolute top-2 right-2 p-2 bg-[#61AFEF] rounded hover:bg-[#4C9EDE]"
            >
              <Play size={16} />
            </button>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-20 p-4 rounded">
              <p className="text-red-400 font-mono text-sm">{error}</p>
            </div>
          )}

          {output && (
            <div className="bg-[#1E1E1E] p-4 rounded">
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}