import {
    isEmail,
    isMobile,
    isPhone,
    isURL
} from '../src';

test('isEmail', () => {
    expect(isEmail('453491931@qq.com')).toBe(true);
});

test('isMobile', () => {
    expect(isMobile('18801053830')).toBe(true);
});

describe('isPhone', () => {
    test('3 + 8', () => {
        expect(isPhone('010-88802786')).toBe(true);
    });

    test('4 + 6', () => {
        expect(isPhone('0455-6233455')).toBe(true);
    });
})


test('isURL', () => {
    expect(isURL('https://www.baidu.com')).toBe(true);
});

