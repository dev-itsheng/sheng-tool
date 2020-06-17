import {partial, curry} from '../src';

test('partial', () => {
    const test = (a: number, b: number, c: number, d: number) => `a = ${a} b = ${b} c = ${c} d = ${d}`;

    const fn = partial(test, 1, undefined, 2, undefined);

    expect(fn(44, 55)).toBe('a = 1 b = 44 c = 2 d = 55');
});

test('curry', () => {
    const stringJoin = (x: string, y: string, z: string, w: string) => x + y + z + w;

    expect(curry(stringJoin)('a')('b')('c')('d')).toBe('abcd');
    expect(curry(stringJoin)('a')()('b', 'c')()('d')).toBe('abcd');
});
