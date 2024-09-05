import React, { useState } from 'react';
import EditableWhiteboard from './edit-mode';
import ViewingWhiteboard from './view-mode';

const WhiteboardApp = () => {
  const [components, setComponents] = useState([
    // Your initial components here
  ]);
  const [isEditing, setIsEditing] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <button
        onClick={() => setIsEditing(!isEditing)}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
      >
        {isEditing ? 'Switch to View Mode' : 'Switch to Edit Mode'}
      </button>
      {isEditing ? (
        <EditableWhiteboard components={components} setComponents={setComponents} />
      ) : (
        <ViewingWhiteboard components={components} />
      )}
    </div>
  );
};

export default WhiteboardApp;