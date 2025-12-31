'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, Cpu, Zap, Maximize2, MousePointer2 } from 'lucide-react';

const ARRAY_SIZE = 60; // Optimized for visual clarity
const ANIMATION_SPEED_MS = 10;

type AnimationStep =
    | { type: 'compare', indices: [number, number] }
    | { type: 'swap', indices: [number, number], values: [number, number] }
    | { type: 'overwrite', index: number, value: number };

type SortAlgorithm = 'bubble' | 'quick' | 'merge' | 'heap' | 'insertion' | 'bucket';

const ALGO_DETAILS: Record<SortAlgorithm, { name: string; complexity: string; description: string; code: string; highlightLines: (step: AnimationStep) => number[] }> = {
    bubble: {
        name: 'Bubble Sort',
        complexity: 'O(n²)',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        code: `function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false; // Reset flag
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}`,
        highlightLines: (step) => step.type === 'compare' ? [7] : [8, 9]
    },
    quick: {
        name: 'Quick Sort',
        complexity: 'O(n log n)',
        description: 'Divides the array into sub-arrays by selecting a "pivot" element and sorting elements around it.',
        code: `function quickSort(arr, low, high) {
  if (low < high) {
    // Partition array
    let pi = partition(arr, low, high);
    
    // Sort sub-arrays
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
        highlightLines: (step) => step.type === 'compare' ? [8] : [4, 9]
    },
    merge: {
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        description: 'Divides the array into halves, sorts them, and then merges the sorted halves.',
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`,
        highlightLines: (step) => step.type === 'overwrite' ? [9] : [5, 6]
    },
    heap: {
        name: 'Heap Sort',
        complexity: 'O(n log n)',
        description: 'Converts the array into a heap structure, then repeatedly extracts the max element.',
        code: `function heapSort(arr) {
  // Build Max Heap
  for (let i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
    
  // Extract max element
  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }
}`,
        highlightLines: (step) => step.type === 'swap' ? [8] : [9]
    },
    insertion: {
        name: 'Insertion Sort',
        complexity: 'O(n²)',
        description: 'Builds the final sorted array one item at a time by comparisons.',
        code: `function insertionSort(arr) {
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
        highlightLines: (step) => step.type === 'compare' ? [7] : [8, 11]
    },
    bucket: {
        name: 'Bucket Sort',
        complexity: 'O(n + k)',
        description: 'Distributes elements into a number of buckets, then sorts each bucket individually.',
        code: `function bucketSort(arr) {
  const buckets = createBuckets(10);
  
  // Distribute
  for (let val of arr) {
    buckets[getIdx(val)].push(val);
  }
  
  // Sort & Merge
  return buckets.flatMap(b => b.sort());
}`,
        highlightLines: (step) => step.type === 'compare' ? [6] : [10]
    }
};

export const SortingVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [comparisons, setComparisons] = useState(0);
    const [accesses, setAccesses] = useState(0);
    const [algorithm, setAlgorithm] = useState<SortAlgorithm>('quick');
    const [activeLine, setActiveLine] = useState<number | null>(null);

    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        resetArray();
        return () => clearTimeouts();
    }, []);

    const clearTimeouts = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    };

    const resetArray = () => {
        clearTimeouts();
        setIsSorting(false);
        setComparisons(0);
        setAccesses(0);
        setActiveLine(null);
        const newArray = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            newArray.push(randomIntFromInterval(10, 100));
        }
        setArray(newArray);

        if (containerRef.current) {
            const bars = containerRef.current.getElementsByClassName('array-bar');
            for (let i = 0; i < bars.length; i++) {
                (bars[i] as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                (bars[i] as HTMLElement).style.boxShadow = 'none';
                (bars[i] as HTMLElement).style.transform = 'scaleY(1)';
            }
        }
    };

    const runSorting = () => {
        if (isSorting) return;
        setIsSorting(true);
        setComparisons(0);
        setAccesses(0);

        let animations: AnimationStep[] = [];
        const arrayCopy = [...array];

        switch (algorithm) {
            case 'bubble': animations = getBubbleSortAnimations(arrayCopy); break;
            case 'quick': animations = getQuickSortAnimations(arrayCopy); break;
            case 'merge': animations = getMergeSortAnimations(arrayCopy); break;
            case 'heap': animations = getHeapSortAnimations(arrayCopy); break;
            case 'insertion': animations = getInsertionSortAnimations(arrayCopy); break;
            case 'bucket': animations = getBucketSortAnimations(arrayCopy); break;
        }

        animate(animations);
    };

    const animate = (animations: AnimationStep[]) => {
        const bars = containerRef.current?.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
        if (!bars) return;

        animations.forEach((step, i) => {
            const timeoutId = setTimeout(() => {
                const lines = ALGO_DETAILS[algorithm].highlightLines(step);
                setActiveLine(lines[0]);

                if (step.type === 'compare') {
                    const [idx1, idx2] = step.indices;
                    // Comparison Highlight (Primary/Accent)
                    if (bars[idx1]) bars[idx1].style.backgroundColor = 'var(--primary)';
                    if (bars[idx2]) bars[idx2].style.backgroundColor = 'var(--primary)';

                    setTimeout(() => {
                        if (bars[idx1]) bars[idx1].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        if (bars[idx2]) bars[idx2].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }, ANIMATION_SPEED_MS * 4);

                    setComparisons(c => c + 1);
                } else if (step.type === 'swap') {
                    const [idx1, idx2] = step.indices;
                    const [valI, valJ] = step.values;

                    if (bars[idx1]) {
                        bars[idx1].style.height = `${valI}%`;
                        bars[idx1].style.backgroundColor = 'var(--secondary)';
                        bars[idx1].style.boxShadow = '0 0 10px var(--secondary)';
                    }
                    if (bars[idx2]) {
                        bars[idx2].style.height = `${valJ}%`;
                        bars[idx2].style.backgroundColor = 'var(--secondary)';
                        bars[idx2].style.boxShadow = '0 0 10px var(--secondary)';
                    }

                    setTimeout(() => {
                        if (bars[idx1]) {
                            bars[idx1].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            bars[idx1].style.boxShadow = 'none';
                        }
                        if (bars[idx2]) {
                            bars[idx2].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            bars[idx2].style.boxShadow = 'none';
                        }
                    }, ANIMATION_SPEED_MS * 4);

                    setAccesses(a => a + 2);
                } else if (step.type === 'overwrite') {
                    const { index, value } = step;
                    if (bars[index]) {
                        bars[index].style.height = `${value}%`;
                        bars[index].style.backgroundColor = 'var(--accent)';

                        setTimeout(() => {
                            if (bars[index]) bars[index].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }, ANIMATION_SPEED_MS * 4);
                        setAccesses(a => a + 1);
                    }
                }
            }, i * ANIMATION_SPEED_MS);
            timeoutsRef.current.push(timeoutId);
        });

        const endTime = animations.length * ANIMATION_SPEED_MS;
        const finalTimeout = setTimeout(() => {
            setIsSorting(false);
            setActiveLine(null);
            // Finish Animation (Wave)
            for (let i = 0; i < bars.length; i++) {
                setTimeout(() => {
                    bars[i].style.backgroundColor = 'var(--primary)';
                    bars[i].style.boxShadow = '0 0 15px var(--primary)';
                }, i * 10);
                setTimeout(() => {
                    bars[i].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    bars[i].style.boxShadow = 'none';
                }, i * 10 + 500);
            }
        }, endTime + 100);
        timeoutsRef.current.push(finalTimeout);
    };

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-background-dark/50 rounded-[40px] overflow-hidden shadow-2xl border border-white/5">

            {/* LEFT PANEL: Code & Logic (The "Terminal") */}
            <div className="w-full md:w-[40%] bg-black/40 flex flex-col border-r border-white/5 relative">
                {/* Traffic Lights */}
                <div className="flex gap-2 p-6 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                    <div className="ml-auto text-[10px] font-mono text-white/30 flex items-center gap-2">
                        <Terminal size={10} /> source.exe
                    </div>
                </div>

                {/* Algo Stats Overlay */}
                <div className="p-8 space-y-8">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                {ALGO_DETAILS[algorithm].name}
                            </h3>
                            <div className="px-2 py-1 rounded bg-primary/10 border border-primary/20">
                                <span className="text-[10px] font-black font-mono text-primary whitespace-nowrap">
                                    {ALGO_DETAILS[algorithm].complexity}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-light">
                            {ALGO_DETAILS[algorithm].description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                            <div className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mb-2">Comparisons</div>
                            <div className="text-2xl font-black font-mono text-primary">{comparisons.toLocaleString()}</div>
                        </div>
                        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                            <div className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mb-2">Array Access</div>
                            <div className="text-2xl font-black font-mono text-secondary">{accesses.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Code Viewer (IDE Style) */}
                <div className="flex-1 overflow-hidden relative border-t border-white/5 bg-black/20 flex flex-col">
                    <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 text-[9px] text-white/20 font-black uppercase tracking-widest flex justify-between shrink-0">
                        <span>main.kt</span>
                        <span>Read_Only</span>
                    </div>
                    <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                        <div className="font-mono text-[11px] leading-7 text-white/30">
                            {ALGO_DETAILS[algorithm].code.split('\n').map((line, idx) => (
                                <div
                                    key={idx}
                                    className={`flex px-2 rounded-sm transition-colors duration-75 ${(activeLine && idx === activeLine - 1) ? 'bg-primary/20 text-white' : ''
                                        }`}
                                >
                                    <span className="w-6 text-white/10 select-none text-right mr-6 shrink-0 font-black">{idx + 1}</span>
                                    <span className="whitespace-pre">{line}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Visualization (The "Screen") */}
            <div className="flex-1 bg-gradient-to-b from-background-dark/50 to-black/40 relative flex flex-col group min-h-[500px]">

                {/* Header Actions */}
                <div className="p-6 flex items-center justify-between z-20">
                    <div className="flex items-center gap-3">
                        <Cpu size={16} className="text-secondary animate-pulse" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Engine.Visualizing</span>
                    </div>
                    <button onClick={isSorting ? resetArray : runSorting} className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white transition-all hover:scale-110 active:scale-95 shadow-xl">
                        {isSorting ? <RotateCcw size={20} /> : <Play size={20} fill="currentColor" className="text-primary" />}
                    </button>
                </div>

                {/* Bars Container */}
                <div ref={containerRef} className="flex-1 flex items-end justify-center px-12 pb-8 gap-[2px] relative z-10">
                    {array.map((value, idx) => (
                        <div
                            key={idx}
                            className="array-bar flex-1 rounded-t-lg transition-none"
                            style={{
                                height: `${value}%`,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }}
                        />
                    ))}

                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5 p-12">
                        {[...Array(8)].map((_, i) => <div key={i} className="w-full h-px bg-white border-dashed"></div>)}
                    </div>
                </div>

                {/* Algorithm Selector Footer */}
                <div className="p-6 bg-black/40 border-t border-white/5 overflow-x-auto">
                    <div className="flex gap-3 justify-center min-w-max">
                        {(Object.keys(ALGO_DETAILS) as SortAlgorithm[]).map((algo) => (
                            <button
                                key={algo}
                                onClick={() => {
                                    setAlgorithm(algo);
                                    resetArray();
                                }}
                                disabled={isSorting}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border
                                    ${algorithm === algo
                                        ? 'border-primary bg-primary/10 text-white shadow-lg shadow-primary/5'
                                        : 'border-white/5 text-white/30 hover:text-white hover:bg-white/5 hover:border-white/10'}`}
                            >
                                {ALGO_DETAILS[algo].name.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- ALGORITHMS HELPERS ---
function randomIntFromInterval(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1) + min); }

// Sort Implementations
function getBubbleSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            animations.push({ type: 'compare', indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                const temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                animations.push({ type: 'swap', indices: [i, i + 1], values: [array[i], array[i + 1]] });
                swapped = true;
            }
        }
    } while (swapped);
    return animations;
}

function getQuickSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}
function quickSortHelper(arr: number[], low: number, high: number, animations: AnimationStep[]) {
    if (low < high) {
        const pi = partition(arr, low, high, animations);
        quickSortHelper(arr, low, pi - 1, animations);
        quickSortHelper(arr, pi + 1, high, animations);
    }
}
function partition(arr: number[], low: number, high: number, animations: AnimationStep[]): number {
    const pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        animations.push({ type: 'compare', indices: [j, high] });
        if (arr[j] < pivot) {
            i++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            animations.push({ type: 'swap', indices: [i, j], values: [arr[i], arr[j]] });
        }
    }
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    animations.push({ type: 'swap', indices: [i + 1, high], values: [arr[i + 1], arr[high]] });
    return i + 1;
}

function getMergeSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
function mergeSortHelper(mainArray: number[], startIdx: number, endIdx: number, auxiliaryArray: number[], animations: AnimationStep[]) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
function doMerge(mainArray: number[], startIdx: number, middleIdx: number, endIdx: number, auxiliaryArray: number[], animations: AnimationStep[]) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push({ type: 'compare', indices: [i, j] });
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i] });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j] });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push({ type: 'compare', indices: [i, i] });
        animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i] });
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push({ type: 'compare', indices: [j, j] });
        animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j] });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

function getInsertionSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push({ type: 'compare', indices: [j, j - 1] });
            const temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            animations.push({ type: 'swap', indices: [j, j - 1], values: [array[j], array[j - 1]] });
            j--;
        }
    }
    return animations;
}

function getHeapSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(array, n, i, animations);
    for (let i = n - 1; i > 0; i--) {
        animations.push({ type: 'compare', indices: [0, i] });
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        animations.push({ type: 'swap', indices: [0, i], values: [array[0], array[i]] });
        heapify(array, i, 0, animations);
    }
    return animations;
}
function heapify(arr: number[], n: number, i: number, animations: AnimationStep[]) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
        animations.push({ type: 'compare', indices: [largest, left] });
        if (arr[left] > arr[largest]) largest = left;
    }
    if (right < n) {
        animations.push({ type: 'compare', indices: [largest, right] });
        if (arr[right] > arr[largest]) largest = right;
    }
    if (largest !== i) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        animations.push({ type: 'swap', indices: [i, largest], values: [arr[i], arr[largest]] });
        heapify(arr, n, largest, animations);
    }
}

function getBucketSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    if (array.length === 0) return animations;
    const min = 0;
    const max = 100;
    const bucketCount = 10;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
    for (let i = 0; i < array.length; i++) {
        animations.push({ type: 'compare', indices: [i, i] });
        const bucketIndex = Math.floor(((array[i] - min) / (max - min + 1)) * bucketCount);
        const idx = Math.max(0, Math.min(bucketIndex, bucketCount - 1));
        buckets[idx].push(array[i]);
    }
    buckets.forEach(bucket => {
        bucket.sort((a, b) => a - b);
    });
    let k = 0;
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            animations.push({ type: 'overwrite', index: k, value: buckets[i][j] });
            k++;
        }
    }
    return animations;
}
