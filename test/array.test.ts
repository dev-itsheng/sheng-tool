import {
    countOccurrences,
    everyNth
} from '../src';

test('countOccurrences', () => {
    expect(countOccurrences([1, 2, 3, 1], 1)).toBe(2);
});

test('everyNth', () => {
    expect(everyNth([1, 2, 3, 4, 5, 6], 2)).toEqual([2, 4, 6])
});
