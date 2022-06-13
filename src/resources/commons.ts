
export const splitString = (str: string, separator: string, limint: number): string[] =>
    str.split(separator, limint);

export const convertToInteger = (value: string): number =>
    parseInt(value);

export const isNotEmpty = (str: string, value: number): boolean =>
    str.length > value;