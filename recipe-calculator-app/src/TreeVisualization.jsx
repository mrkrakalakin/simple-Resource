import React from 'react';

const TreeNode = ({ node }) => {
  if (typeof node === 'string') {
    return <div className="tree-node">{node}</div>;
  }

  const { recipeName, desiredRate, ...subNodes } = node;

  return (
    <div className="tree-node">
      <div className="tree-node-header">
        {recipeName} ({desiredRate})
      </div>
      <div className="tree-node-children">
        {Object.keys(subNodes).map(subNodeName => (
          <TreeNode key={subNodeName} node={subNodes[subNodeName]} />
        ))}
      </div>
    </div>
  );
};

const TreeVisualization = ({ data }) => {
  return (
    <div className="tree-container">
      <TreeNode node={data} />
    </div>
  );
};

export default TreeVisualization;
