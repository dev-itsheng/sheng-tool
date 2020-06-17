import {
    unique,
    union,
    intersect,
    diff,
    shuffle,
    countOccurrences,
    everyNth
} from '../src';

test('unique', () => {
    expect(unique([1, 1, 2, 3])).toEqual([1, 2, 3]);
});

test('union', () => {
    expect(union([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test('intersect', () => {
    expect(intersect([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
});

test('diff', () => {
    expect(diff([1, 2, 3], [2])).toEqual([1, 3]);
});

test('shuffle', () => {
    const arr = [1, 2, 3];

    expect(shuffle([1, 2, 3]).sort((a, b) => a - b)).toEqual([1, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
});

test('countOccurrences', () => {
    expect(countOccurrences([1, 2, 3, 1], 1)).toBe(2);
});

test('everyNth', () => {
    expect(everyNth([1, 2, 3, 4, 5, 6], 2)).toEqual([2, 4, 6])
});
