// components/ResourceTree.js
import React from 'react';

const ResourceTree = ({ resources }) => {
  return (
    <div className="resource-tree">
      <pre>{JSON.stringify(resources, null, 2)}</pre>
    </div>
  );
};

export default ResourceTree;
