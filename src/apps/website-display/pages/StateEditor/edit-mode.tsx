import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Card, CardContent, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const EditableWhiteboard = ({ components, setComponents }) => {
  const [editingComponent, setEditingComponent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDragStop = (id, d) => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id ? { ...comp, x: d.x, y: d.y } : comp
      )
    );
  };

  const handleResize = (id, ref, position) => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id
          ? { ...comp, width: ref.offsetWidth, height: ref.offsetHeight, x: position.x, y: position.y }
          : comp
      )
    );
  };

  const addComponent = (type) => {
    const newId = Math.max(...components.map(c => c.id), 0) + 1;
    const newComponent = {
      id: newId,
      type,
      x: 50,
      y: 50,
      width: type === 'card' ? 250 : 200,
      height: type === 'card' ? 200 : (type === 'button' ? 50 : 56),
      content: type === 'button' ? 'New Button' : ''
    };
    setComponents([...components, newComponent]);
  };

  const removeComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    setIsDialogOpen(false);
  };

  const openEditDialog = (component) => {
    setEditingComponent(component);
    setIsDialogOpen(true);
  };

  const handleContentChange = (event) => {
    setEditingComponent({ ...editingComponent, content: event.target.value });
  };

  const saveChanges = () => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === editingComponent.id ? { ...comp, content: editingComponent.content } : comp
      )
    );
    setIsDialogOpen(false);
  };

  const handleTextFieldChange = (id, newContent) => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id ? { ...comp, content: newContent } : comp
      )
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
      {components.map((comp) => (
        <Rnd
          key={comp.id}
          default={{
            x: comp.x,
            y: comp.y,
            width: comp.width,
            height: comp.height,
          }}
          minWidth={100}
          minHeight={comp.type === 'textfield' ? 56 : 50}
          bounds="parent"
          onDragStop={(e, d) => handleDragStop(comp.id, d)}
          onResize={(e, direction, ref, delta, position) => handleResize(comp.id, ref, position)}
          enableUserSelectHack={false}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {comp.type !== 'textfield' && (
              <IconButton
                size="small"
                style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                onClick={() => openEditDialog(comp)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {comp.type === 'card' && (
              <Card style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <CardContent>
                  <Typography variant="body1">{comp.content}</Typography>
                </CardContent>
              </Card>
            )}
            {comp.type === 'button' && (
              <Button variant="contained" color="secondary" style={{ width: '100%', height: '100%' }}>
                {comp.content}
              </Button>
            )}
            {comp.type === 'textfield' && (
              <TextField
                variant="outlined"
                fullWidth
                value={comp.content}
                onChange={(e) => handleTextFieldChange(comp.id, e.target.value)}
                placeholder="Type your answer here"
                style={{ height: '100%' }}
              />
            )}
          </div>
        </Rnd>
      ))}
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <IconButton color="primary" onClick={() => addComponent('card')} style={{ marginRight: 10 }}>
          <AddIcon />
          <Typography variant="button" style={{ marginLeft: 5 }}>Card</Typography>
        </IconButton>
        <IconButton color="secondary" onClick={() => addComponent('button')} style={{ marginRight: 10 }}>
          <AddIcon />
          <Typography variant="button" style={{ marginLeft: 5 }}>Button</Typography>
        </IconButton>
        <IconButton color="default" onClick={() => addComponent('textfield')}>
          <TextFieldsIcon />
          <Typography variant="button" style={{ marginLeft: 5 }}>TextField</Typography>
        </IconButton>
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{editingComponent?.type === 'card' ? 'Edit Card' : 'Edit Button'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the content below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={4}
            value={editingComponent?.content || ''}
            onChange={handleContentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeComponent(editingComponent?.id)} color="secondary">
            Delete
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditableWhiteboard;