<script lang="ts">
interface NodePosition {
  x: number;
  y: number;
}

interface Positions {
  lastNode: number;
  [nodeId: number]: NodePosition;
}

interface Data {
  oneway: string[];
  twoway: string[];
}

interface Node {
  id: string;
  type: string;
  label: string;
  position: NodePosition;
  parentId: string;
  data: Data;
  class: string;
}

export { NodePosition, Positions, Data, Node };
</script>
