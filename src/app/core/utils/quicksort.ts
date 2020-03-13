type Order = "ascending" | "descending";

function partition(arr: any[], prop: string, order: Order = "ascending", start: number = 0, end: number = arr.length - 1): number {
  const pivot = arr[start];
  let swaps = 0;

  for (let i = start + 1; i <= end; i++) {
    if (order === "ascending" ? arr[i][prop] < pivot[prop] : arr[i][prop] > pivot[prop]) {
      swaps++;
      [arr[start + swaps], arr[i]] = [arr[i], arr[start + swaps]];
    }
  }

  [arr[start], arr[start + swaps]] = [arr[start + swaps], arr[start]];

  return start + swaps;
}

export function quicksort(arr: any[], prop: string, order: Order = "ascending", start: number = 0, end: number = arr.length - 1): any[] {
  if (start < end) {
    const splitIndex = partition(arr, prop, order, start, end);

    quicksort(arr, prop, order, start, splitIndex - 1);
    quicksort(arr, prop, order, splitIndex + 1, end);
  }

  return arr;
}
