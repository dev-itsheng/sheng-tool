import { Application, TSConfigReader, TypeDocReader } from 'typedoc';
import fs from 'fs';

const app = new Application();
app.options.addReader(new TSConfigReader());
app.options.addReader(new TypeDocReader());
app.bootstrap({
    // typedoc options here
    entryPoints: ["./src/array.ts"],
});

const project = app.convert();

let text = '';

for (const item of project!.children!) {
    const signatures = item.signatures![0];
    const name = signatures.name;
    const example = signatures.comment!.tags.find(x => x.tagName === 'example')!.text;
    // console.log(name, example);
    const code = example.replace(/\n+```typescript\n|\n```\n+/g, '').split('\n');
    const a = code.map(x => x.split(/\s+\/\/\s+/));


    text += `
import { ${name} } from '../src';
        
test('${name}', () => {
    ${a.map(([expression, result]) => `expect(${expression}).toEqual(${result});`).join('\n    ')}
});
`;
}

fs.writeFileSync('./test/bundle.test.ts', text);
