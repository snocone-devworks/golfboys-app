export const baseUrl: string = 'https://api.sleeper.app/v1';


export const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      return Promise.reject(`${response.status}: ${response.statusText}`);
    }

    let body = await response.json();
    return Promise.resolve(body);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const combinedPoints = (integer: number | undefined, decimal: number | undefined): number => {
  let fixedInteger: number = integer ?? 0;
  let fixedDecimal: number = decimal ? parseFloat(`0.${decimal}`) : 0;

  return fixedInteger + fixedDecimal;
}

export const isDefined = (values: any[]): boolean => {
  values.forEach(v => {
    if (v === null || v === undefined) return false;
  });

  return true;
}

export const sumArray = (data: number[]) => {
  let sum: number = 0;
  data.forEach(value => sum += value);
  return sum;
}

export const averageArray = (data: number[]) => {
  let sum: number = sumArray(data);
  if (sum !== 0 && data.length > 0) return sum / data.length;
  return 0;
}

export const minArray = (data: number[]) => {
  if (data.length === 0) return 0;
  let min: number = Number.MAX_SAFE_INTEGER;

  data.forEach(n => {
    if (n < min) min = n;
  });

  if (min === Number.MAX_SAFE_INTEGER) return 0;
  return min;
}

export const maxArray = (data: number[]) => {
  if (data.length === 0) return 0;
  let max: number = Number.MIN_SAFE_INTEGER;

  data.forEach(n => {
    if (n > max) max = n;
  });

  if (max === Number.MAX_SAFE_INTEGER) return 0;
  return max;
}

export const streak = (record: string | undefined, type: 'wins' | 'losses'): number => {
  if (!record) return 0;

  let char: string = type === 'wins' ? 'w' : 'l';
  let parts = record.toLowerCase().split('');
  let max: number = 0;

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === char) {
      let count: number = 1;
      let next = i + 1;

      while (next < parts.length && parts[next] === char) {
        count++;
        next++;
      }

      if (count > max) max = count;
    }
  }

  return max;
}

export const rankByNumber = (value: number, data: number[], dir: 'asc' | 'desc' = 'desc') => {
  let sortedData = [...data];

  sortedData.sort((a, b) => {
    if (dir === 'desc') {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;  
    }

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let index = sortedData.findIndex(p => p === value);
  if (dir === 'desc') {
    return index === -1 ? data.length : index + 1;
  }

  return index === -1 ? 0 : index + 1;
}

