import { Nodes, Edges, Layouts, defineConfigs } from "v-network-graph";

const nodes: Nodes = {
  node1: { name: "City A" },
  node2: { name: "City F" },
  node3: { name: "City C" },
  node4: { name: "City D" },
  node5: { name: "City B" },
};

const edges: Edges = {
  edge1: { source: "node1", target: "node2" },
  edge2: { source: "node1", target: "node3" },
  edge3: { source: "node1", target: "node4" },
  edge4: { source: "node1", target: "node5" },
  edge5: { source: "node2", target: "node3" },
  edge6: { source: "node2", target: "node4" },
  edge7: { source: "node2", target: "node5" },
  edge8: { source: "node3", target: "node4" },
  edge9: { source: "node3", target: "node5" },
  edge10: { source: "node4", target: "node5" },
};

const layouts: Layouts = {
  nodes: {
    node1: { x: 365, y: 29 },
    node2: { x: 642, y: 131 },
    node3: { x: 802, y: 250 },
    node4: { x: 513, y: 270 },
    node5: { x: 809, y: 55 },
  },
};

const configs = defineConfigs({
  node: {
    draggable: false,
    normal: {
      type: "circle",
      radius: 8,
      color: "#4466cc",
    },
    label: {
      visible: true,
    },
  },
});

export default {
  nodes,
  edges,
  layouts,
  configs,
};
