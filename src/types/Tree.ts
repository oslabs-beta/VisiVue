export type Tree = {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  importPath: string;
  expanded: boolean;
  depth: number;
  count: number;
  thirdParty: boolean;
  children: Tree[];
  parentList: string[];
  props: {
    oneWay: string[];
    twoWay: string[];
  };
  allVariables: string[];
  error: string;
};

export class ChildNode<Tree> {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  importPath: string;
  expanded: boolean;
  depth: number;
  count: number;
  thirdParty: boolean;
  children: Tree[];
  parentList: string[];
  props: {
    oneWay: string[];
    twoWay: string[];
  };
  allVariables: string[];
  error: string;
}
