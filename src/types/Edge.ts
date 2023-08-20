interface Edge {
  id: string;
  label: string;
  source: string;
  target: string;
  style: string;
  animated: boolean;
}

interface Style {
  stroke: string, 
  strokeWidth: string
}

export {
  Edge,
  Style,
};