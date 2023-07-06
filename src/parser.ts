import * as path from 'path';
import { Tree, ChildNode } from './types/Tree';
import { getNonce } from './getNonce';
import * as babelParser from '@babel/parser';
import * as fs from 'fs';
import { File } from '@babel/types';
import { ImportObj } from './types/ImportObj';
import { type } from 'os';
import { isPropertyAssignment } from 'typescript';
import * as vueTemplateCompiler from 'vue-template-compiler';
import * as vueCompiler from '@vue/compiler-sfc';
const traverse = require('@babel/traverse').default;
// import { parse }from '@vue/compiler-sfc';
// import { compile } from 'vue-template-compiler';

export class Parser {
  entryFile: string;
  tree: Tree | undefined;

  constructor(filePath: string) {
    this.entryFile = filePath;    // conditionals checking if OS is windows
    if (process.platform === 'linux' && this.entryFile.includes('wsl$')){
      // string manipulation to make sure the entryFile matches what we need for when we reference it in the
      // root definition in the parse method
      this.entryFile = path.resolve(filePath.split(path.win32.sep).join(path.posix.sep));
      this.entryFile = '/' + this.entryFile.split('/').slice(3).join('/');
    } else if (process.platform === 'linux' && /[a-zA-Z]/.test(this.entryFile[0])) {
      const root = `/mnt/${this.entryFile[0].toLowerCase()}`;
      this.entryFile = path.join(root, filePath.split(path.win32.sep).slice(1).join(path.posix.sep));
    }
    // (?) cleaning this.tree and re-setting it to undefined
    this.tree = undefined;
  }

  public parse() {
    const root = {
      id: getNonce(),
      name: path.basename(this.entryFile).replace(/\.vue?$/, ''),
      fileName: path.basename(this.entryFile),
      filePath: this.entryFile,
      importPath: '/',
      expanded: false,
      depth: 0,
      count: 1,
      thirdParty: false,
      children: [],
      parentList: [],
      props: {
        oneWay: [],
        twoWay: []
      },
      allVariables: [],
      error: ''
    };
    // console.log('ROOT: ', root);
    this.tree = root;
    this.parser(root);
    return this.tree;
  }

  private parser(componentTree: Tree): Tree | undefined {
    const fileName = this.getFileName(componentTree);
    // Check to see if there is a file that has been passed in by user
    if (!fileName) {
      componentTree.error = 'File not found';
      return;
    }
    if (componentTree.parentList.includes(componentTree.filePath)) {
      return;
    }
    
    // store source code of rootfile in a variable
      // may need to convert to string
    let fileContent: string = fs.readFileSync(path.resolve(componentTree.filePath)).toString();
    // console.log("result from calling fs.readFileSync method: ", fileContent);
    const { descriptor } = vueCompiler.parse(fileContent);

    const templateASTtokens = descriptor.template.ast;
    console.log("Template AST TOKENS: ", templateASTtokens);

    // const scriptSetupASTtokens = descriptor.script.scriptSetupAst;    
    // console.log("SCRIPTSETUPASTTOKEN :", scriptSetupASTtokens)

    const script = descriptor.scriptSetup.content;
    // console.log("SCRIPTASTTOKEN :", scriptASTtokens);
    const scriptAST = babelParser.parse(script, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    console.log("scriptAST: ", scriptAST);

    const scriptVariables = this.getScriptVariables(scriptAST);
    console.log("scriptVariables: ", scriptVariables);

    // push script variables
    componentTree.allVariables.push(...scriptVariables);

    // run templateCompile method from @vue/compiler-sfc to compile template
    let template = vueCompiler.compileTemplate({
      source: fileContent,
      filename: componentTree.fileName,
      id: componentTree.id
    });
    // console.log("result from calling compileTemplate method: ", template);

    let ast = template.ast;
    console.log("ast: ", ast);
    //We need to populate componentTree children array with tree objects for each child
    componentTree.children.forEach((child) => this.parser(child));
    
    return componentTree;
  };
  
  public getTree(): Tree{
    return this.tree!;
  }

  private getScriptVariables(scriptAst: babelParser.ParseResult<File>): string[]{
    const vars = [];
    traverse(scriptAst, {
      VariableDeclarator(path) {
        if (path.node.id.type === 'Identifier') {
          const varName = path.node.id.name;
          vars.push(varName);
        }
      },
    });
    return vars;
  }
  
  private getFileName(componentTree: Tree): string | undefined {
    const ext = path.extname(componentTree.filePath);
    let fileName: string | undefined = componentTree.fileName;
    if (!ext){
      const fileArray = fs.readdirSync(path.dirname(componentTree.filePath));
      const regEx = new RegExp(`${componentTree.fileName}.(j|t)sx?$`);
      fileName = fileArray.find((fileStr) => fileStr.match(regEx));
      fileName ? (componentTree.filePath += path.extname(fileName)) : null;
    }
    return fileName;
  }
  
  
}





// const traverse = require('@babel/traverse').default;

// const variables = [];

// traverse(scriptAst, {
//   VariableDeclarator(path) {
//     if (path.node.id.type === 'Identifier') {
//       const variableName = path.node.id.name;
//       variables.push(variableName);
//     }
//   },
// });
// console.log(variables);