const isType = (input: any, type: string) => Object.prototype.toString.call(input).slice(8, -1) === type;

// 基本类型
export const isString               = (input: any) => isType(input, 'String');
export const isNumber               = (input: any) => isType(input, 'Number');
export const isBoolean              = (input: any) => isType(input, 'Boolean');
export const isPureFunction         = (input: any) => isType(input, 'Function');
export const isGeneratorFunction    = (input: any) => isType(input, 'GeneratorFunction');
export const isAsyncFunction        = (input: any) => isType(input, 'AsyncFunction');
export const isProxy                = (input: any) => isType(input, 'Proxy');
export const isNull                 = (input: any) => isType(input, 'Null');
export const isUndefined            = (input: any) => isType(input, 'Undefined');
export const isObject               = (input: any) => isType(input, 'Object');
export const isArray                = (input: any) => isType(input, 'Array');
export const isDate                 = (input: any) => isType(input, 'Date');
export const isRegExp               = (input: any) => isType(input, 'RegExp');
export const isError                = (input: any) => isType(input, 'Error');
export const isSymbol               = (input: any) => isType(input, 'Symbol');
export const isPromise              = (input: any) => isType(input, 'Promise');
export const isSet                  = (input: any) => isType(input, 'Set');
export const isMap                  = (input: any) => isType(input, 'Map');
export const isWeakSet              = (input: any) => isType(input, 'WeakSet');
export const isWeakMap              = (input: any) => isType(input, 'WeakMap');

// BOM
export const isArguments            = (input: any) => isType(input, 'Arguments');
export const isBlob                 = (input: any) => isType(input, 'Blob');

// DOM
export const isNodeList             = (input: any) => isType(input, 'NodeList');
export const isHTMLCollection       = (input: any) => isType(input, 'HTMLCollection');
export const isCanvas               = (input: any) => isType(input, 'Canvas');

// ArrayBuffer
export const isArrayBuffer          = (input: any) => isType(input, 'ArrayBuffer');
export const isDataView             = (input: any) => isType(input, 'DataView');
export const isInt8Array            = (input: any) => isType(input, 'Int8Array');
export const isInt16Array           = (input: any) => isType(input, 'Int16Array');
export const isInt32Array           = (input: any) => isType(input, 'Int32Array');
export const isUint8Array           = (input: any) => isType(input, 'Uint8Array');
export const isUint8ClampedArray    = (input: any) => isType(input, 'Uint8ClampedArray');
export const isUint16Array          = (input: any) => isType(input, 'Uint16Array');
export const isUint32Array          = (input: any) => isType(input, 'Uint32Array');
export const isFloat32Array         = (input: any) => isType(input, 'Float32Array');
export const isFloat64Array         = (input: any) => isType(input, 'Float64Array');

// Node.js
export const isStream               = (input: any) => isObject(input) && isPureFunction(input.pipe);
export const isBuffer               = (input: any) => Buffer.isBuffer(input);

// 扩展类型
export const isFunction             = (input: any) => isPureFunction(input) || isGeneratorFunction(input) || isAsyncFunction(input) || isProxy(input);
export const isTypedArray           = (input: any) => isInt8Array(input) || isInt16Array(input) || isInt32Array(input) || isUint8Array(input) || isUint8ClampedArray(input) || isUint16Array(input) || isUint32Array(input) || isFloat32Array(input) || isFloat64Array(input);
export const isPlainObject          = (input: any) => isObject(input) && Object.getPrototypeOf(input) === Object.prototype;
export const isThenable             = (input: any) => isObject(input) && isPureFunction(input.then);
export const isIterable             = (input: any) => isArray(input) || isMap(input) || isSet(input) || isString(input) || isNodeList(input) || isTypedArray(input) || isPureFunction(input[Symbol.iterator]);
