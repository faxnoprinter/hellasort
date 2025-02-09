import { sleep } from './utils';

interface Animations {
  compare: (i: number, j: number) => void;
  swap: (i: number, j: number) => void;
  updateArray: (array: number[]) => void;
}

export async function bubbleSort(arr: number[], animations: Animations, delay: number) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.compare(j, j + 1);
      await sleep(delay);
      
      if (arr[j] > arr[j + 1]) {
        animations.swap(j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        animations.updateArray(arr);
      }
    }
  }
  
  return arr;
}

export async function selectionSort(arr: number[], animations: Animations, delay: number) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      animations.compare(minIdx, j);
      await sleep(delay);
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      animations.swap(i, minIdx);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      animations.updateArray(arr);
    }
  }
  
  return arr;
}

export async function insertionSort(arr: number[], animations: Animations, delay: number) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0) {
      animations.compare(j, j + 1);
      await sleep(delay);
      
      if (arr[j] > key) {
        animations.swap(j, j + 1);
        arr[j + 1] = arr[j];
        animations.updateArray(arr);
        j--;
      } else {
        break;
      }
    }
    
    arr[j + 1] = key;
    animations.updateArray(arr);
  }
  
  return arr;
}

export async function quickSort(arr: number[], animations: Animations, delay: number) {
  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      animations.compare(j, high);
      await sleep(delay);
      
      if (arr[j] < pivot) {
        i++;
        animations.swap(i, j);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        animations.updateArray(arr);
      }
    }
    
    animations.swap(i + 1, high);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.updateArray(arr);
    
    return i + 1;
  }
  
  async function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  }
  
  await quickSortHelper(0, arr.length - 1);
  return arr;
}

export async function mergeSort(arr: number[], animations: Animations, delay: number) {
  async function merge(left: number, middle: number, right: number) {
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
      animations.compare(left + i, middle + 1 + j);
      await sleep(delay);
      
      if (leftArray[i] <= rightArray[j]) {
        animations.swap(k, left + i);
        arr[k] = leftArray[i];
        i++;
      } else {
        animations.swap(k, middle + 1 + j);
        arr[k] = rightArray[j];
        j++;
      }
      
      animations.updateArray(arr);
      k++;
    }
    
    while (i < leftArray.length) {
      animations.swap(k, left + i);
      arr[k] = leftArray[i];
      animations.updateArray(arr);
      i++;
      k++;
    }
    
    while (j < rightArray.length) {
      animations.swap(k, middle + 1 + j);
      arr[k] = rightArray[j];
      animations.updateArray(arr);
      j++;
      k++;
    }
  }
  
  async function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSortHelper(left, middle);
      await mergeSortHelper(middle + 1, right);
      await merge(left, middle, right);
    }
  }
  
  await mergeSortHelper(0, arr.length - 1);
  return arr;
}

export async function heapSort(arr: number[], animations: Animations, delay: number) {
  async function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      animations.compare(largest, left);
      await sleep(delay);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      animations.compare(largest, right);
      await sleep(delay);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      animations.swap(i, largest);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      animations.updateArray(arr);
      await sleep(delay);
      await heapify(n, largest);
    }
  }
  
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    await heapify(arr.length, i);
  }
  
  for (let i = arr.length - 1; i > 0; i--) {
    animations.swap(0, i);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    animations.updateArray(arr);
    await sleep(delay);
    await heapify(i, 0);
  }
  
  return arr;
}

export async function shellSort(arr: number[], animations: Animations, delay: number) {
  const n = arr.length;
  
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      for (j = i; j >= gap; j -= gap) {
        animations.compare(j, j - gap);
        await sleep(delay);
        
        if (arr[j - gap] > temp) {
          animations.swap(j, j - gap);
          arr[j] = arr[j - gap];
          animations.updateArray(arr);
          await sleep(delay);
        } else {
          break;
        }
      }
      
      arr[j] = temp;
      animations.updateArray(arr);
    }
  }
  
  return arr;
}

export async function radixSort(arr: number[], animations: Animations, delay: number) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < arr.length; i++) {
      animations.compare(i, i);
      await sleep(delay);
      count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    
    for (let i = 0; i < arr.length; i++) {
      animations.swap(i, i);
      arr[i] = output[i];
      animations.updateArray(arr);
      await sleep(delay);
    }
  }
  
  return arr;
}