export const range = (start: number, end: number): number[] => {
    const ret = [];
    for (let i = start; i <= end; i++) {
        ret.push(i);
    }
    return ret;
}