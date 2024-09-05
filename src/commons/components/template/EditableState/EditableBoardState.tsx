import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';

const EditableBoardState = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [widgets, setComponents] = useState<WidgetType[]>([]);

  useEffect(() => {
    if (paper) {
      setComponents(paper.widgets)
    }
  }, [paper])

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

  return (
    <div style={{ width: 800, height: '100vh', background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
      {widgets?.map((widget) => (
        <Rnd
          key={widget.id}
          default={{
            x: widget.x || 100,
            y: widget.y || 100,
            width: widget.width || 200,
            height: widget.height || 200,
          }}
          style={{ border: 'solid' }}
          bounds="parent"
          onDragStop={(e, d) => handleDragStop(widget.id, d)}
          onResize={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
          enableUserSelectHack={false}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Widget coveredWithPaper={false} widget={widget} paperId={fsmStateId} mode={WidgetModes.Edit} />
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default EditableBoardState;