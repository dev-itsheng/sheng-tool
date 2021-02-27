// rollup.config.js
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.min.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.esm.min.js',
            format: 'es'
        },
        {
            file: 'dist/index.iife.min.js',
            format: 'iife'
        }
    ],
    plugins: [
        // babel(),
        typescript(),
        nodeResolve(),
    ]
};
