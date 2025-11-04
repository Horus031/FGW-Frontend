// Get the Set with unique value from array
export const uniqueSet = <T>(arr: T[]): Set<T> => new Set(arr);

export const getCurrentYear = () => new Date().getFullYear();