import {
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isNull,
    isUndefined,
    isArray,
    isDate,
    isRegExp,
    isError,
    isSymbol,
    isPromise,
    isSet,
    isMap,
    isWeakSet,
    isWeakMap,
    isArguments,
    isNodeList,
    isHTMLCollection,
    isBuffer,
    isStream
} from '../src';

import {JSDOM} from 'jsdom';
import * as fs from 'fs';

test('isString', () => {
    expect(isString('Hello World')).toBe(true);
});

test('isNumber', () => {
    expect(isNumber(42)).toBe(true);
});

test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
});

test('isFunction', () => {
    expect(isFunction(console.log)).toBe(true);
});

test('isNull', () => {
    expect(isNull(null)).toBe(true);
});

test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true);
});

test('isArray', () => {
    expect(isArray([1, 2, 3])).toBe(true);
});

test('isDate', () => {
    expect(isDate(new Date())).toBe(true);
});

test('isRegExp', () => {
    expect(isRegExp(/HelloWorld/)).toBe(true);
});

test('isError', () => {
    expect(isError(new TypeError())).toBe(true);
});

test('isSymbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
});

test('isPromise', () => {
    expect(isPromise(new Promise<number>(resolve => resolve(1)))).toBe(true);
});

test('isSet', () => {
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
});

test('isMap', () => {
    expect(isMap(new Map())).toBe(true);
});

test('isWeakSet', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
});

test('isWeakMap', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
});

test('isArguments', () => {
    (function() {
        expect(isArguments(arguments)).toBe(true);
    })();
});

test('isNodeList', () => {
    const dom = new JSDOM('<div></div>');

    const nodeList = dom.window.document.querySelectorAll('div');

    expect(isNodeList(nodeList)).toBe(true);
});

test('isHTMLCollection', () => {
    const dom = new JSDOM('<div></div>');

    const htmlCollection = dom.window.document.getElementsByTagName('div');

    expect(isHTMLCollection(htmlCollection)).toBe(true);
});

test('isBuffer', () => {
    expect(isBuffer(Buffer.from('hello world', 'utf-8'))).toBe(true);
});

test('isStream', () => {
    expect(isStream(fs.createReadStream('./tsconfig.json'))).toBe(true);
});
