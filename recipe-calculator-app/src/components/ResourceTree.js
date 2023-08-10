// components/ResourceTree.js
import React from 'react';

const ResourceTree = ({ resources }) => {
  const renderResourceTree = (resource, indent = 0) => {
    if (typeof resource === 'string') {
      return <div style={{ marginLeft: `${indent * 20}px` }}>{resource}</div>;
    }

    return (
      <div style={{ marginLeft: `${indent * 20}px` }}>
        <div>
          {resource.recipeName} ({resource.desiredRate})
        </div>
        {Object.keys(resource).map(subResourceName => (
          subResourceName !== 'recipeName' && subResourceName !== 'desiredRate' && (
            <div key={subResourceName}>
              {renderResourceTree(resource[subResourceName], indent + 1)}
            </div>
          )
        ))}
      </div>
    );
  };

  return <div>{renderResourceTree(resources)}</div>;
};

export default ResourceTree;
