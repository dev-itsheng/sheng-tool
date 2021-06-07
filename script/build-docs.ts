import { Application, TSConfigReader, TypeDocReader } from 'typedoc';

const app = new Application();
app.options.addReader(new TSConfigReader());
app.options.addReader(new TypeDocReader());
app.bootstrap({
    // typedoc options here
    entryPoints: ["./src/index.ts"],
    theme: 'minimal'
});

const project = app.convert()!;

const categoryMap = {
    'array.ts': '数组相关方法',
    'browser.ts': '浏览器相关方法',
    'browser-type-validation.ts': '浏览器类型判断相关方法',
    'color.ts': '颜色相关方法',
    'date.ts': '日期相关方法',
    'extra.ts': '额外方法',
    'format-validation.ts': '数据格式判断相关方法',
    'number.ts': '数字相关方法',
    'object.ts': '对象相关方法',
    'statistics.ts': '统计相关方法',
    'string.ts': '字符串相关方法',
};

// @ts-ignore
project.groups[0].categories = Object.values(categoryMap).map(title => 1 && { title, children: [] });

for (const item of project!.children!) {
    const signatures = item.signatures?.[0];

    if (!signatures) {
        continue;
    }

    const { fileName } = signatures.sources![0];

    // @ts-ignore
    const cat = categoryMap[fileName];

    // @ts-ignore
    project.groups[0].categories.find(category => category.title === cat).children.push(item);

}
app.generateDocs(project, 'docs');
