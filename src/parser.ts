import * as vueCompiler from 'vue-template-compiler';
import * as path from 'path';
import { Tree } from './types/Tree';
import { getNonce } from './getNonce'

export class Parser {
  entryFile: string;
  tree: Tree | undefined;

  constructor(filePath: string) {
    this.entryFile = filePath;
    // console.log('this.entryFile: ', this.entryFile);
    // conditionals checking if OS is windows
    // console.log("filePath: ", filePath);
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
      props: {},
      error: ''
    };
    console.log(root)
    this.tree = root;
    // this.parser(root);
    return this.tree;
  }

  public getTree(): Tree{
    // console.log("from getTree() (should be undefined): ", this.tree);
    return this.tree!;
  }
}