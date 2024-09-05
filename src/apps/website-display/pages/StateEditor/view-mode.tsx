import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const ViewingWhiteboard = ({ components }) => {
  const [textFieldValues, setTextFieldValues] = useState(
    components.reduce((acc, comp) => {
      if (comp.type === 'textfield') {
        acc[comp.id] = comp.content;
      }
      return acc;
    }, {})
  );
  const [scale, setScale] = useState(1);
  const boardRef = useRef(null);
  const containerRef = useRef(null);

  const handleTextFieldChange = (id, newContent) => {
    setTextFieldValues(prev => ({ ...prev, [id]: newContent }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current && containerRef.current) {
        const boardHeight = Math.max(...components.map(comp => comp.y + comp.height), 900);
        const windowHeight = window.innerHeight;

        const newScale = windowHeight / boardHeight;

        setScale(newScale);
        boardRef.current.style.transform = `scale(${newScale})`;
        boardRef.current.style.transformOrigin = 'top left';
        boardRef.current.style.height = `${boardHeight}px`;

        // Set the container width to accommodate the scaled board width
        const boardWidth = Math.max(...components.map(comp => comp.x + comp.width));
        containerRef.current.style.width = `${boardWidth * newScale}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [components]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#f0f0f0' }}>
      <div ref={containerRef} style={{ height: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        <div ref={boardRef} style={{ position: 'relative', transformOrigin: 'top left' }}>
          {components.map((comp) => (
            <div
              key={comp.id}
              style={{
                position: 'absolute',
                left: comp.x,
                top: comp.y,
                width: comp.width,
                height: comp.height,
              }}
            >
              {comp.type === 'card' && (
                <Card style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                  <CardContent>
                    <Typography variant="body1">{comp.content}</Typography>
                  </CardContent>
                </Card>
              )}
              {comp.type === 'button' && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => alert(`Button clicked: ${comp.content}`)}
                >
                  {comp.content}
                </Button>
              )}
              {comp.type === 'textfield' && (
                <TextField
                  variant="outlined"
                  fullWidth
                  value={textFieldValues[comp.id]}
                  onChange={(e) => handleTextFieldChange(comp.id, e.target.value)}
                  placeholder="Type your answer here"
                  style={{ height: '100%' }}
                  inputProps={{ style: { transform: `scale(${1 / scale})`, transformOrigin: 'top left', width: `${100 * scale}%` } }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewingWhiteboard;