import * as path from 'path';
import { Tree } from './types/Tree';
import { readFileSync } from 'fs';
import * as vueCompiler from '@vue/compiler-sfc';
import { parse, transform } from '@vue/compiler-dom';


// ITERATIVE METHOD THAT CREATES AST IN AN ARRAY OF OBJECTS IN 'parser' method

export default function Parser(entryFile: string): {}[] {

  return [{}]
}

function entryFileParse(entryFile: string): Tree {
  const root = {
    id: "1",
    name: path.basename(this.entryFile).replace(/\.vue?$/, ""), // --> App
    fileName: path.basename(this.entryFile), // --> App.vue
    filePath: this.entryFile, // /Users/chrispark/src/components/App.vue
    fileDirname: path.dirname(this.entryFile), // /Users/chrispark/src/components
    importPath: "/",
    parentList: [],
    children: [],
    props: {
      oneWay: [],
      twoWay: [],
    },
    error: "",
  };
  return root;
}

function mainParse(root: Tree): void {
  const queue: (Tree | string)[] = [];
  let id: string = root.id;

  while(queue.length) {
    const curr: Tree | string = queue.shift();
    if (curr === "dead") {continue;}
    const sourceCode: string = readFileSync(path.resolve(curr.filePath)).toString();
  }
}

function getChildren(sourceCode: string, filename: string, id: string): any {
  const arrOfChildren = vueCompiler.compileTemplate({
    source: sourceCode,
    filename,
    id,
  }).ast.components;
  return arrOfChildren; 
}

function extractVariables(template: string, component: string): any {
  const variables = {
    oneway: [],
    twoway: [],
  };
  const ast = parse(template);
  transform(ast, {
    nodeTransforms: [
      (node) => {
        // Refer to vueCompilerTypes.txt at the root level to understand what each type refers to.
        if (node.hasOwnProperty("tag") && node["tag"] === component) {
          if (
            node.type === 1 &&
            node.props.some(
              (prop) => prop.type === 7 && prop.name === "model"
            )
          ) {
            const twoWayDirective = node.props.find(
              (prop) => prop.type === 7 && prop.name === "model"
            );
            try {
              variables.twoway.push(twoWayDirective["arg"].content);
            } catch (error) {}
          } else if (
            node.type === 1 &&
            node.props.some(
              (prop) => prop.type === 7 && prop.name !== "model"
            )
          ) {
            const oneWayDirective = node.props.find(
              (prop) => prop.type === 7 && prop.name !== "model"
            );
            try {
              variables.oneway.push(oneWayDirective["arg"].content);
            } catch (error) {}
          }
        }
      },
    ],
  });
  return variables;
}

function getImports(template: string, filename: string, id: string): any {
  if (!template.includes("script" || "script setup")) {
    return [];
  }
  const { descriptor } = vueCompiler.parse(template, { filename }); // return object type SFCParseResult with descriptor property
  const { imports } = vueCompiler.compileScript(descriptor, { id }); // return object type SFCScriptBlock with imports property
  const result = Object.values(imports);
  return result;
}

// After everything is done, make sure to double check getTree() method and how that is called in panel.ts
