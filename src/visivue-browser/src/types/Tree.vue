<script lang="ts">
export type Tree = {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  fileDirname: string;
  importPath: string;
  children: Tree[];
  parentList: string[];
  props: {
    oneWay: string[];
    twoWay: string[];
  };
  error: string;
  parentId?: string;
};
</script>
