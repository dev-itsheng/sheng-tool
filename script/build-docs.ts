import { Application, TSConfigReader, TypeDocReader } from 'typedoc';
import fs from 'fs';

const app = new Application();
app.options.addReader(new TSConfigReader());
app.options.addReader(new TypeDocReader());
app.bootstrap({
    // typedoc options here
    entryPoints: ["./src/array.ts"],
    theme: 'minimal'
});

const project = app.convert()!;


const categoryMap = {
    'array.ts': '数组相关方法',
    'browser.ts': '浏览器相关方法',
    'color.ts': '颜色相关方法',
    'date.ts': '日期相关方法',
}

for (const item of project!.children!) {
    const signatures = item.signatures?.[0];

    if (!signatures) {
        continue;
    }

    // console.log(signatures);

    if (/browser/.test(signatures.sources![0].fileName)) {
        continue;
    }
    const { name, comment } = signatures;

    if (!comment) {
        continue;
    }

    console.log(signatures);

    const example = comment.tags.find(x => x.tagName === 'example');

    if (!example) {
        continue;
    }

    const code = example.text.replace(/\n+```typescript\n|\n```\n+/g, '').split('\n');
    const a = code.map(x => x.split(/\s+\/\/\s+/));
}

app.generateDocs(project, 'docs');
