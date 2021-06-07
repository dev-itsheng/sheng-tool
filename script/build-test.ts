import { Application, TSConfigReader, TypeDocReader } from 'typedoc';
import fs from 'fs';

const app = new Application();
app.options.addReader(new TSConfigReader());
app.options.addReader(new TypeDocReader());
app.bootstrap({
    // typedoc options here
    entryPoints: ['./src/index.ts'],
});

const project = app.convert();

let text = '';

for (const item of project!.children!) {
    const signatures = item.signatures?.[0];

    if (!signatures) {
        continue;
    }

    if (/browser/.test(signatures.sources![0].fileName)) {
        continue;
    }

    console.log(signatures);
    const { name, comment } = signatures;

    if (!comment) {
        continue;
    }

    const example = comment.tags.find(x => x.tagName === 'example');

    if (!example) {
        continue;
    }

    const code = example.text.replace(/\n+```typescript\n|\n```\n+/g, '').split('\n');
    const a = code.map(x => x.split(/\s+\/\/\s+/));

    text += `
import { ${name} } from '../src';
    
test('${name}', () => {
    ${a.map(([expression, result]) => `expect(${expression}).toEqual(${result});`).join('\n    ')}
});
    `;
}

fs.writeFileSync('./test/bundle.test.ts', text);
