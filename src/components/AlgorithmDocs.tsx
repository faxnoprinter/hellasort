import React from 'react';
import { X } from 'lucide-react';

interface AlgorithmDocsProps {
  onClose: () => void;
}

export function AlgorithmDocs({ onClose }: AlgorithmDocsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2C2C2C] p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#61AFEF]">Sorting Algorithms</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#3C3C3C] rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-2">Bubble Sort</h3>
            <p className="mb-2">A simple comparison sort that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
            <p>Time Complexity: O(n²)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Selection Sort</h3>
            <p className="mb-2">Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.</p>
            <p>Time Complexity: O(n²)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Insertion Sort</h3>
            <p className="mb-2">Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.</p>
            <p>Time Complexity: O(n²)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Quick Sort</h3>
            <p className="mb-2">A divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it.</p>
            <p>Time Complexity: O(n log n) average, O(n²) worst case</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Merge Sort</h3>
            <p className="mb-2">A divide-and-conquer algorithm that recursively divides the input array into two halves, sorts them, and then merges the sorted halves.</p>
            <p>Time Complexity: O(n log n)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Heap Sort</h3>
            <p className="mb-2">Uses a binary heap data structure to sort elements, building a max-heap and repeatedly extracting the maximum element.</p>
            <p>Time Complexity: O(n log n)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Shell Sort</h3>
            <p className="mb-2">An optimization of insertion sort that allows the exchange of items that are far apart, reducing the number of swaps required.</p>
            <p>Time Complexity: O(n log n) to O(n²)</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Radix Sort</h3>
            <p className="mb-2">A non-comparative sorting algorithm that sorts numbers by processing each digit position, starting from the least significant digit.</p>
            <p>Time Complexity: O(nk) where k is the number of digits</p>
          </section>
        </div>
      </div>
    </div>
  );
}