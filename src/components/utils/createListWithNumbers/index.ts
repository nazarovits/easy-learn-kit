
interface Options {
    start?: number;
    end?: number;
}

export const createListWithNumbers = (length: number, options?: Options) => {
    const { start = 1, end = length } = options || {};
    const list = [];

    for (let i = start; i <= end; i++) {
        list.push(i);
    }

    return list;
}