// rollup.config.js
// import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'es'
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'shengTool'
        },
        {
            file: 'dist/index.umd.min.js',
            format: 'umd',
            plugins: [terser()],
            name: 'shengTool'
        }
    ],
    plugins: [
        // babel(),
        typescript(),
        nodeResolve(),
    ]
};
