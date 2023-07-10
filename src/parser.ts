import * as path from 'path';
import { Tree } from './types/Tree';
import { getNonce } from './getNonce';
import * as babelParser from '@babel/parser';
import * as fs from 'fs';
import { File } from '@babel/types';
import { ImportObj } from './types/ImportObj';
import { type } from 'os';
import { isPropertyAssignment } from 'typescript';
import * as vueTemplateCompiler from 'vue-template-compiler';
import * as vueCompiler from '@vue/compiler-sfc';
// import traverseNode from '@vue/compiler-sfc/dist/compiler-sfc.cjs';
const traverse = require('@babel/traverse').default;
// import { parse }from '@vue/compiler-sfc';
// import { compile } from 'vue-template-compiler';

// ----FILE PATH OF TEST PROJECT ----
  // ROOT: /Users/chrispark/MultiComponentVue/src/App.vue
    // CHILD 1: /Users/chrispark/MultiComponentVue/src/components1/HelloWorld.vue
    // CHILD 2: /Users/chrispark/MultiComponentVue/src/components1/TheWelcome.vue
      // CHILD OF CHILD 2: /Users/chrispark/MultiComponentVue/src/components1/WelcomeItem.vue

export class Parser {
  entryFile: string;
  tree: Tree | undefined;
  constructor(filePath: string) {
    // mac
    this.entryFile = filePath;    // conditionals checking if OS is windows

    // windows
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

  public entryFileParse() {
    const root = {
      id: '1',
      name: path.basename(this.entryFile).replace(/\.vue?$/, ''), // log = App
      fileName: path.basename(this.entryFile), // log = App.vue
      filePath: this.entryFile, // log = /Users/chrispark/MultiComponentVue/src/App.vue
      fileDirname: path.dirname(this.entryFile), ///Users/chrispark/MultiComponentVue/src/
      importPath: '/',
      parentList: [],
      children: [],
      props: {
        oneWay: [],
        twoWay: []
      },
      allVariables: [],
      error: ''
    };
    this.tree = root;
		// store AST that parser function creates (Array of Objects) in AST variable to send to panel.ts 
    const AST = this.parser(root);
    return this.tree;
  }

	// DON'T FORGET TO CHANGE TYPES LATER AFTER TESTING IS DONE
  private parser(root: Tree): void {
    const { fileName, fileDirname } = root;
    // get the filePath
		const queue = [root];
    let id = root.id;
		// iterate through tree 
		while(queue.length !== 0) {
			let curr: any = queue.shift();
			let sourceCode: string = fs.readFileSync(path.resolve(curr.filePath)).toString();

      const { descriptor } = vueCompiler.parse(sourceCode);

      const template = descriptor.template;
      console.log(`${curr} template:` , template);

      const templateAst = template.ast;
      console.log(`${curr} template:`, templateAst);

			const arrOfChildren = this.getChildren(sourceCode, curr.fileName, id);
      // iterate through array of child components and instantiate a new ChildNode class
      arrOfChildren.forEach((child) => {
        id = `${+id + 1}`;
        const path = fileDirname + '/components/' + `${child}.vue`;
        const childNode = {
          id: id,
          name: child, // log = App
          fileName: `${child}.vue`, // log = App.vue
          filePath: path, // log = /Users/chrispark/MultiComponentVue/src/App.vue
          fileDirname: fileDirname, // log = /Users/chrispark/MultiComponentVue/src
          importPath: '/',
          parentList: [],
          children: [],
          props: {
            oneWay: [],
            twoWay: []
          },
          allVariables: [],
          error: ''
        };
        curr.children.push(childNode);
        queue.push(childNode);
      });
		}
    const traverseTest = vueCompiler.traverseNode(root);
    console.log('testing traverseNode on root: ', traverseTest);
  };

  public getTree(): Tree{
    return this.tree!;
  }

  // helper function to grab child elements
  public getChildren(sourceCode: string, filename: string, id: string): any {
    const arrOfChildren = vueCompiler.compileTemplate({ source: sourceCode, filename, id }).ast.components;
    return arrOfChildren;
  }
  // private getScriptVariables(scriptAst: babelParser.ParseResult<File>): string[]{
  //     const vars = [];
  //     traverse(scriptAst, {
  //       VariableDeclarator(path) {
  //         if (path.node.id.type === 'Identifier') {
  //           const varName = path.node.id.name;
  //           vars.push(varName);
  //         }
  //       },
  //     });
  //     return vars;
  //   }
  
}
