'use strict';

const fs = require('fs');
const { JSDOM } = require('jsdom');

class SpecGroupItem {
  constructor(name) {
    this.name = name;
    this.functions = [];
  }

  hasFunctions() {
    return this.functions.length > 0;
  }

  hasFunction(functionName) {
    return this.getFunction(functionName) !== undefined;
  }

  addFunction(functionName) {
    if (!this.hasFunction(functionName)) {
      this.functions.push(new SpecFunctionItem(functionName, this));
    }
  }

  getFunction(functionName) {
    return this.functions.find(func => func.name === functionName);
  }

  persist() {
    return {
      name: this.name,
      functions: this.functions.map(func => func.persist()).filter(func => func.files.length > 0)
    };
  }
}

class SpecFunctionItem {
  constructor(name, parent) {
    this.name = name;
    this.examples = [];
    this._parent = parent;
  }

  hasExamples() {
    return this.examples.length > 0;
  }

  addExample(content) {
    this.examples.push(new SpecItem(content, this));
  }

  persist() {
    fs.mkdirSync(this.getFolderName(), { recursive: true });
    return {
      name: this.name,
      files: this.examples.filter(example => example.hasContent())
        .map((example, index) => example.persist(index + 1))
    };
  }

  getFolderName() {
    return `./examples/${this._parent.name}/${this.name}`;
  }
}

class SpecItem {
  constructor(content, parent) {
    this.content = content;
    this._parent = parent;
  }

  hasContent() {
    return this.content !== '';
  }

  persist(name) {
    const filePath = `${this._parent.getFolderName()}/${name}.txt`;
    fs.writeFileSync(
      filePath,
      this.content,
      { encoding: 'utf8' }
    );

    return filePath;
  }
}

class ExampleStore {
  constructor() {
    this._currentGroup = '';
    this._currentFunction = '';
    this.groups = [];
  }

  addGroup(name) {
    if (!name) {
      return;
    }

    this.groups.push(new SpecGroupItem(name));
    this.currentGroup = name;
  };

  addFunctionToGroup(name, groupName) {
    if (!name) {
      return;
    }

    if (!groupName) {
      return;
    }
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }

    this.currentFunction = name;
    group.addFunction(name);
  };

  addExampleToFunction(content, functionName, groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    const func = group.getFunction(functionName);
    if (!func) {
      return;
    }
    func.addExample(content);
  };

  persist() {
    return this.groups.map(group => group.persist()).filter(group => group.functions.length > 0);
  }

  getGroup(groupName) {
    return this.groups.find(group => group.name === groupName);
  }

  set currentGroup(name) {
    this._currentGroup = name;
    this._currentFunction = null;
  }

  get currentGroup() {
    return this._currentGroup;
  }

  set currentFunction(name) {
    this._currentFunction = name;
  }

  get currentFunction() {
    return this._currentFunction;
  }
}

const RESULT_TABLE_SEARCH = /\n(\+---)/;
const extractExampleContent = function(dom) {
  let exampleContent = '--SQL--\n';

  dom.querySelectorAll('span').forEach(span => {
    if (span.childNodes.length > 0) {
      span.childNodes.forEach(child => {
        if (child.tagName === 'BR') {
          exampleContent += '\n';
        } else {
          exampleContent += child.textContent.replace(/ /g, ' ');
        }
      });
    }
  });

  if (RESULT_TABLE_SEARCH.exec(exampleContent) === null) {
    return '';
  }

  return exampleContent
    .replace(RESULT_TABLE_SEARCH, '\n--RESULT--\n$1')
    .replace(/FORMAT\("%T", /g, 'TO_JSON_STRING(');
};

const examples = new ExampleStore();
const dom = new JSDOM(fs.readFileSync('./onepage.html', 'utf8'));
dom.window.document.querySelector('h2').parentElement
  .querySelectorAll('h2, h3, devsite-code pre.lang-sql code')
  .forEach(item => {
    switch (item.tagName.toUpperCase()) {
      case 'H2':
        examples.addGroup(item.id);
        return;

      case 'H3':
        examples.addFunctionToGroup(item.id, examples.currentGroup);
        return;

      default:
        const exampleContent = extractExampleContent(item);
        if (exampleContent) {
          examples.addExampleToFunction(exampleContent, examples.currentFunction, examples.currentGroup);
        }
    }
  });

const spec = [];
examples.persist()
  .forEach(group => {
    spec.push(`  context('${group.name} functions', function() {`);
    group.functions.forEach(func => {
      spec.push(`    describe('${func.name.toUpperCase()}', function() {`);
      func.files.forEach((file, index) => {
        spec.push(`      it('example-${index + 1}', runTestCase('${file}'));`);
      });
      spec.push('    });');
    });
    spec.push('  });');
  });

const template = fs.readFileSync(`${__dirname}/template.txt`).toString('utf8');
const content = template.replace('[[CONTENT]]', spec.join('\n'));
fs.writeFileSync('index-generated.spec.js', content, { encoding: 'utf8' });
