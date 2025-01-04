export function configMerger<T>(complete: T, incomplete: Partial<T>): T {
  for (const key in complete) {
    if (Array.isArray(complete[key]) && !(key in incomplete)) {
      incomplete[key] = complete[key].slice() as T[Extract<keyof T, string>];
    } else if (typeof complete[key] === 'object' && complete[key] !== null) {
      if (!(key in incomplete) || typeof incomplete[key] !== 'object') {
        incomplete[key] = {} as T[Extract<keyof T, string>];
      }
      configMerger(complete[key], incomplete[key] as Partial<T[Extract<keyof T, string>] & object>);
    } else if (!(key in incomplete)) {
      incomplete[key] = complete[key];
    }
  }
  return incomplete as T;
}