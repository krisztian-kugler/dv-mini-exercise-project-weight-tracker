function partition(arr: number[], start = 0, end = arr.length - 1): number {
  const pivot = arr[start];
  let swaps = 0;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      swaps++;
      [arr[start + swaps], arr[i]] = [arr[i], arr[start + swaps]];
    }
  }

  [arr[start], arr[start + swaps]] = [arr[start + swaps], arr[start]];

  return start + swaps;
}

export function quicksort(arr: number[], start = 0, end = arr.length - 1): number[] {
  if (start < end) {
    const splitIndex = partition(arr, start, end);

    quicksort(arr, start, splitIndex - 1);
    quicksort(arr, splitIndex + 1, end);
  }

  return arr;
}
