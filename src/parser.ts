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
    console.log("CURRENT FUNCTION: PARSE");
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
      props: {},
      error: ''
    };
    console.log('ROOT: ', root);
    this.tree = root;
    this.parser(root);
    return this.tree;
  }

  private parser(componentTree: Tree): Tree | undefined {
    //DON'T KNOW IF NEEDED YET
    // Might need if we want to incorporate vue router

    // if (!['\\', '/', '.'].includes(componentTree.importPath[0])) {
    //   componentTree.thirdParty = true;
    //   if (
    //     componentTree.fileName === 'react-router-dom' ||
    //     componentTree.fileName === 'react-router'
    //   ) {
    //     componentTree.reactRouter = true;
    //   }
    //   return;
    // }

    const fileName = this.getFileName(componentTree);
    console.log("IN FUNCTION: PARSER()");
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
    
    // run templateCompile method from @vue/compiler-sfc to compile template
    let template = vueCompiler.compileTemplate({
      source: fileContent,
      filename: componentTree.fileName,
      id: componentTree.id
    });
    console.log("result from calling compileTemplate method: ", template);

    let ast = template.ast;
    console.log("ast: ", ast);
    
    
    
    
    // let ast: babelParser.ParseResult<File>;
    // try {
    //   ast = babelParser.parse(
    //     fs.readFileSync(path.resolve(componentTree.filePath), 'utf-8'),
    //     {
    //      sourceType: 'module',
    //      tokens: true,
    //      plugins: ['jsx', 'typescript'],
    //     }
    //   );
    //   console.log("ast: ", ast);
    // } catch (err) {
    //   componentTree.error = 'Error while processing this file/node';
    //   return componentTree;
    // }

    // const imports = this.getImports(ast.program.body);
    // if (ast.tokens) {
    //   componentTree.children = this.getJSXChildren(
    //     ast.tokens,
    //     imports,
    //     componentTree
    //   );
    // }

    componentTree.children.forEach((child) => this.parser(child));
    
    return componentTree;
  };
  
  public getTree(): Tree{
    return this.tree!;
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
  
  private getImports(body: { [key:string]: any}[]): ImportObj {
    const bodyImports = body.filter((item) => item.type === 'ImportDeclaration' || 'VariableDeclaration');
    return bodyImports.reduce((acc, curr) => {
      if (curr.type === 'ImportDeclaration') {
        curr.specifiers.forEach((i: {local: { name: string | number }; imported: { name: any }}) => {
          acc[i.local.name] = {
            importPath: curr.source.value,
            importName: i.imported ? i.imported.name : i.local.name
          };
        });
      }
      if (curr.type === 'VariableDeclaration') {
        const importPath = this.findVarDecImports(curr.declarations[0]);
        if (importPath) {
          const importName = curr.declarations[0].id.name;
          acc[curr.declarations[0].id.name] = {
            importPath,
            importName
          };
        }
      }
      return acc;
    }, {});
  }

  private findVarDecImports(ast: { [key: string]: any }): string | boolean {
    if (ast.hasOwnproperty('callee') && ast.callee.type === 'Import') {
      return ast.arguments[0].value;
    }

    for (let key in ast) {
      if (ast.hasOwnproperty(key) && typeof ast[key] === 'object' && ast[key]) {
        const importPath = this.findVarDecImports(ast[key]);
        if (importPath) {
          return importPath;
        }
      }
    }
    
    return false;
  }

  private getJSXChildren(
    astTokens: any[],
    importsObj: ImportObj,
    parentNode: Tree
  ): Tree[] {
    let childNodes: { [key: string] : Tree } = {};
    let props: { [key: string] : boolean } = {};
    let token: { [key: string]: any };
    for (let i = 0; i < astTokens.length; i++){
      if (
        astTokens[i].type.label === 'jsxTagStart' &&
        astTokens[i + 1].type.label === 'jsxName' &&
        importsObj[astTokens[i + 1].value]
      ) {
        token = astTokens[i + 1];
        props = this.getJSXProps(astTokens, i + 2);
        childNodes = this.getChildNodes(
          importsObj,
          token,
          props,
          parentNode,
          childNodes
        );
      } else if (
        astTokens[i].type.label === 'jsxName' &&
        (astTokens[i].value === 'component' ||
        astTokens[i].value === 'children') &&
        importsObj[astTokens[i + 3].value]
      ) {
        token = astTokens[i + 3];
        childNodes =  this.getChildNodes(
          importsObj,
          token,
          props,
          parentNode,
          childNodes
        );
      }
    }
    
    return Object.values(childNodes);
  }

  private getJSXProps(astTokens: { [key: string]: any }[],
    j: number
    ): { [key: string]: boolean} {
      const props: any = {};
      while (astTokens[j].type.label !== 'jsxTagEnd') {
        if (
          astTokens[j].type.label === 'jsxName' &&
          astTokens[j + 1].value === '='
        ) {
          props[astTokens[j].value] = true;
        }
        j += 1;
      }
      return props;
  }
  
  private getChildNodes(imports: ImportObj,
    astToken: { [key: string]: any },
    props: { [key: string]: boolean },
    parent: Tree,
    children: { [key: string]: Tree }
    ): { [key: string]: Tree } {
      if (children[astToken.value]) {
        children[astToken.value].count += 1;
        children[astToken.value].props = {
          ...children[astToken.value].props,
          ...props,
        };
      } else {
        children[astToken.value] = {
          id: getNonce(),
          name: children[astToken.value]['importName'],
          fileName: path.basename(imports[astToken.value]['importPath']),
          filePath: path.resolve(
            path.dirname(parent.filePath),
            imports[astToken.value]['importPath']
          ),
          importPath: imports[astToken.value]['importPath'],
          expanded: false,
          depth: parent.depth + 1,
          thirdParty: false,
          count: 1,
          props: props,
          children: [],
          parentList: [parent.filePath].concat(parent.parentList),
          error: '',
        };
      }
      return children;
  }
}