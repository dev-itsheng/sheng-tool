// rollup.config.js
// import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const output = [];

for (const moduleType of ['cjs', 'esm', 'umd']) {
    output.push({
        file: `dist/index.${moduleType}.min.js`,
        format: moduleType,
        plugins: [terser()],
        name: 'shengTool',
    });
    output.push({
        file: `dist/index.${moduleType}.js`,
        format: moduleType,
        name: 'shengTool'
    });
}

export default {
    input: 'src/index.ts',
    output,
    plugins: [
        // babel(),
        typescript(),
        nodeResolve(),
    ]
};
