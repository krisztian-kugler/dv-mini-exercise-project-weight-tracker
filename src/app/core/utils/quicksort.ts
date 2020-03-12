export function pivotHelper(arr: number[], pivotIndex = 0): number {
  const pivot = arr[pivotIndex];

  let swaps = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      swaps++;
      [arr[swaps], arr[i]] = [arr[i], arr[swaps]];
    }
  }

  [arr[0], arr[swaps]] = [arr[swaps], arr[0]];

  return swaps;
}

export function quicksort() {}
