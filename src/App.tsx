import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, StopCircle, BookOpen, Code } from 'lucide-react';
import { generateArray, sleep } from './utils';
import { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort, shellSort, radixSort } from './algorithms';
import { CustomSortIDE } from './components/CustomSortIDE';
import { AlgorithmDocs } from './components/AlgorithmDocs';

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [showDocs, setShowDocs] = useState(false);
  const [showCustomSort, setShowCustomSort] = useState(false);
  const sortingRef = useRef<boolean>(false);
  const pauseRef = useRef<boolean>(false);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateArray(arraySize));
      setComparing([]);
      setSwapping([]);
      setIsPaused(false);
      pauseRef.current = false;
    }
  };

  const stopSorting = () => {
    sortingRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
    pauseRef.current = false;
    setComparing([]);
    setSwapping([]);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    pauseRef.current = !pauseRef.current;
  };

  const handleSort = async () => {
    if (isPaused) {
      togglePause();
      return;
    }

    setIsSorting(true);
    sortingRef.current = true;
    const delay = 200 - speed * 2;

    const animations = {
      compare: (i: number, j: number) => {
        if (!sortingRef.current) return;
        setComparing([i, j]);
      },
      swap: (i: number, j: number) => {
        if (!sortingRef.current) return;
        setSwapping([i, j]);
      },
      updateArray: (newArray: number[]) => {
        if (!sortingRef.current) return;
        setArray([...newArray]);
      }
    };

    const waitForResume = async () => {
      while (pauseRef.current) {
        await sleep(100);
      }
    };

    try {
      const arrayCopy = [...array];
      switch (selectedAlgorithm) {
        case 'bubble':
          await bubbleSort(arrayCopy, animations, delay);
          break;
        case 'selection':
          await selectionSort(arrayCopy, animations, delay);
          break;
        case 'insertion':
          await insertionSort(arrayCopy, animations, delay);
          break;
        case 'quick':
          await quickSort(arrayCopy, animations, delay);
          break;
        case 'merge':
          await mergeSort(arrayCopy, animations, delay);
          break;
        case 'heap':
          await heapSort(arrayCopy, animations, delay);
          break;
        case 'shell':
          await shellSort(arrayCopy, animations, delay);
          break;
        case 'radix':
          await radixSort(arrayCopy, animations, delay);
          break;
      }
    } finally {
      if (sortingRef.current) {
        setIsSorting(false);
        setIsPaused(false);
        pauseRef.current = false;
        setComparing([]);
        setSwapping([]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#F0F0F0] p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#61AFEF]">Hellasort</h1>
          <div className="flex items-center gap-4">
            <select
              className="bg-[#2C2C2C] px-4 py-2 rounded border border-[#61AFEF] focus:outline-none text-lg"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              disabled={isSorting}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="heap">Heap Sort</option>
              <option value="shell">Shell Sort</option>
              <option value="radix">Radix Sort</option>
            </select>
            <div className="flex items-center gap-2 text-lg">
              <label>Size:</label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isSorting}
                className="w-24"
              />
            </div>
            <div className="flex items-center gap-2 text-lg">
              <label>Speed:</label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isSorting}
                className="w-24"
              />
            </div>
            <button
              onClick={resetArray}
              disabled={isSorting}
              className="p-2 bg-[#2C2C2C] rounded hover:bg-[#3C3C3C] disabled:opacity-50 border border-[#61AFEF]"
              title="Reset Array"
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={handleSort}
              disabled={isSorting && !isPaused}
              className="p-2 bg-[#61AFEF] rounded hover:bg-[#4C9EDE] disabled:opacity-50"
              title={isPaused ? "Resume Sorting" : "Start Sorting"}
            >
              {isPaused ? <Play size={24} /> : <Pause size={24} />}
            </button>
            {isSorting && (
              <button
                onClick={stopSorting}
                className="p-2 bg-red-500 rounded hover:bg-red-600"
                title="Stop Sorting"
              >
                <StopCircle size={24} />
              </button>
            )}
            <button
              onClick={() => setShowDocs(!showDocs)}
              className="p-2 bg-[#2C2C2C] rounded hover:bg-[#3C3C3C] border border-[#61AFEF]"
              title="Algorithm Documentation"
            >
              <BookOpen size={24} />
            </button>
            <button
              onClick={() => setShowCustomSort(!showCustomSort)}
              className="p-2 bg-[#2C2C2C] rounded hover:bg-[#3C3C3C] border border-[#61AFEF]"
              title="Custom Sort"
            >
              <Code size={24} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-lg mb-2">
            <span className="inline-block w-4 h-4 bg-yellow-300 mr-2"></span>
            Comparing
            <span className="inline-block w-4 h-4 bg-green-300 mx-2"></span>
            Swapping
            <span className="inline-block w-4 h-4 bg-[#61AFEF] ml-2"></span>
            Default
          </div>
        </div>

        <div className="h-[400px] flex items-end justify-center gap-1">
          {array.map((value, idx) => (
            <div
              key={idx}
              style={{ height: `${value}%` }}
              className={`w-full transition-all duration-100 ${
                comparing.includes(idx)
                  ? 'bg-yellow-300'
                  : swapping.includes(idx)
                  ? 'bg-green-300'
                  : 'bg-[#61AFEF]'
              }`}
            />
          ))}
        </div>

        {showDocs && <AlgorithmDocs onClose={() => setShowDocs(false)} />}
        {showCustomSort && <CustomSortIDE onClose={() => setShowCustomSort(false)} />}

        <div className="mt-8 flex justify-center">
          <img 
            src="https://i.redd.it/gqva4mnc33521.png"
            alt="Sorting algorithms meme"
            className="max-w-[500px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;