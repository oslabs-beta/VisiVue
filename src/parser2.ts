import * as path from 'path';
import { Tree } from './types/Tree';
import { readFileSync } from 'fs';
import * as vueCompiler from '@vue/compiler-sfc';
import { parse, transform } from '@vue/compiler-dom';


// ITERATIVE METHOD THAT CREATES AST IN AN ARRAY OF OBJECTS IN 'parser' method

export class Parser {
  entryFile: string;
  tree: Tree | undefined;
  constructor(filePath: string) {
    // default for mac users
    this.entryFile = filePath;    
    // conditionals checking if OS is windows
    // check to see if it is a windows platform
    if (process.platform === 'linux' && this.entryFile.includes('wsl$')){
      // string manipulation to make sure the entryFile matches what we need for when we reference it in the
      // root definition in the parse method
      this.entryFile = path.resolve(filePath.split(path.win32.sep).join(path.posix.sep));
      this.entryFile = '/' + this.entryFile.split('/').slice(3).join('/');
    } else if (process.platform === 'linux' && /[a-zA-Z]/.test(this.entryFile[0])) {
      const root = `/mnt/${this.entryFile[0].toLowerCase()}`;
      this.entryFile = path.join(root, filePath.split(path.win32.sep).slice(1).join(path.posix.sep));
    }
    // cleaning this.tree and re-setting it to undefined
    this.tree = undefined;
  }
  // This is called in panel.ts to initiate the building of the AST. parser() is then called to initiate iteration over 
  // the user's component hierarchy to build out the AST that we will eventually send to App.vue where they will modify
  // such that the tree is compatible with Vue Flow.
  public entryFileParse() {
    const root = {
      id: '1',
      name: path.basename(this.entryFile).replace(/\.vue?$/, ''),
      fileName: path.basename(this.entryFile),
      filePath: this.entryFile,
      fileDirname: path.dirname(this.entryFile),
      importPath: '/',
      parentList: [],
      children: [],
      props: {
        oneWay: [],
        twoWay: []
      },
      error: ''
    };
    this.tree = root;
		// store AST that parser function creates (Array of Objects) in AST variable to send to panel.ts 
    this.parser(this.tree);
    return this.tree;
  }

	// DON'T FORGET TO CHANGE TYPES LATER AFTER TESTING IS DONE
  private parser(root: Tree): void {
    const arrayOfNodes: {}[] = [];
    console.log(arrayOfNodes);
		const queue: (Tree | string)[] = [root];
    let id = root.id;
		// iterate through tree 
		while(queue.length !== 0) {
			let curr: any = queue.shift();
      // A check to see if the current node shifted out of the queue is one we want to iterate over or not.
      if (curr === 'dead') {continue;}
			let sourceCode: string = readFileSync(path.resolve(curr.filePath)).toString();
      // getChildren() is a helper function. Check below in the code for more details.
			const arrOfChildren = this.getChildren(sourceCode, curr.fileName, id); 
      // getImports() is a helper function. Check below in the code for more details.
      const imports = this.getImports(sourceCode, curr.fileName, id); 
      // Iterate through array of child components and instantiate a new ChildNode object.
      // Because App.vue is expecting to receive a nested object,
      // we are building a single object with children components nested
      for (let i = 0; i < arrOfChildren.length; i++) {
        let goodToCreateNode = false;
        // extractVariabes is a helper function. Check below in the code for more details.
        const objOfVariables = this.extractVariables(sourceCode, arrOfChildren[i]);
        id = `${+id + 1}`;
        let filePath = curr.fileDirname;
        for (let j = 0; j < imports.length; j++) {
          if (imports[j].local === arrOfChildren[i]) {
            // Check to see if the source of the import for the given file is from a user created file or from Vue.
            if (imports[j].source[0] !== '@') {
              if (imports[j].source.includes('.vue')) {
                filePath += imports[j].source.slice(1);
              } else {
                filePath += imports[j].source.slice(1) + '.vue';
              }
              goodToCreateNode = true;
              break;
            }
          }
        }
        if (goodToCreateNode) {
          const newFileDirname = path.dirname(filePath);
          const childSourceCode = readFileSync(path.resolve(filePath)).toString();
          // Handles edge cases for components that have no script tag, but have template tags (icons, etc.)
          if (!childSourceCode.includes('script' || 'script setup')) {break;};
          const childNode = {
            id,
            name: arrOfChildren[i],
            fileName: `${arrOfChildren[i]}.vue`,
            filePath,
            fileDirname: newFileDirname,
            importPath: '/',
            parentList: [],
            children: [],
            props: {
              oneWay: [],
              twoWay: []
            },
            error: ''
          };
          // Access object that stores oneway and twoway data bound variables and push to proper arrays of the newly created node.
          objOfVariables.twoway.forEach(el => {
            childNode.props.twoWay.push(el);
          });
          objOfVariables.oneway.forEach(el => {
            childNode.props.oneWay.push(el);
          });
          // Here is where the tree is being built out by populating the 'children' array.
          curr.children.push(childNode);
          queue.push(childNode);
          arrayOfNodes.push(curr);
        } else {
          queue.push('dead');
        }
      }
		}
  };

  public getTree(): Tree{
    return this.tree!;
  }

  // Helper function to grab child elements. * Consider console logging vueCompiler.compileTemplate({source: sourceCode, filename, id}) to see what properties it has. *
  public getChildren(sourceCode: string, filename: string, id: string): any {
    const arrOfChildren = vueCompiler.compileTemplate({ source: sourceCode, filename, id }).ast.components;
    return arrOfChildren;
  }
  // Helper function to extract variables when iterating through the components.
  // 'parse' is imported from @vue/compiler-dom on line 5.
  public extractVariables(template: string, component: string): any {
    const variables = {
      oneway: [],
      twoway: []
    };
    const ast = parse(template);
    transform(ast, {
      nodeTransforms: [
        (node) => {
          // Refer to vueCompilerTypes.txt at the root level to understand what each type refers to.
          if (node.hasOwnProperty('tag') && node['tag'] === component) {
            if (node.type === 1 && node.props.some((prop) => prop.type === 7 && prop.name === 'model')) {
              const twoWayDirective = node.props.find((prop) => prop.type === 7 && prop.name === 'model');
              try {
                variables.twoway.push(twoWayDirective['arg'].content);
              } catch(error){
              }
            } else if (node.type === 1 && node.props.some((prop) => prop.type === 7 && prop.name !== 'model')){
              const oneWayDirective = node.props.find((prop) => prop.type === 7 && prop.name !== 'model');
              try {
                variables.oneway.push(oneWayDirective['arg'].content);
              } catch(error){
              }
            }
          }
        }
      ]
    });
    return variables;
  }
  // Call parse method from vueCompiler on current component. It will return an object of type SFCParseResult
  // Deconstruct result in 'descriptor'. 'descriptor' is of type SFCDescriptor, which is important because that is the only type that
    // vueCompiler.compileScript takes as its first argument.
  // Second argument is an options object with the only required property being 'id'.
  // This will return an object of type SFCScriptBlock that has an imports property.
  // Store the values array of the object and return it.
    // Here, the values will be objects that have a 'source' property that we will be able to grab the import path for later use.
      // (Will be used for dynamically creating the correct file path)
  public getImports(template: string, filename: string, id: string): any {
    if (!template.includes('script' || 'script setup')) {return [];}
    const { descriptor } = vueCompiler.parse(template, {filename}); // return object type SFCParseResult with descriptor property
    const { imports } = vueCompiler.compileScript(descriptor, {id}); // return object type SFCScriptBlock with imports property
    const result = Object.values(imports);
    return result;
  }
}

