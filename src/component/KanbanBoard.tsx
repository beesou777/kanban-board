import { useMemo, useState } from 'react';
import PlusIcons from '../icons/PlusIcons';
import { v4 as generateId } from 'uuid';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Array<{ id: Number; title: string }>>([]);
  const [activeColumn, setActiveColumn] = useState<any>(null);

  const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const createNewColumn = () => {
    const columnToAdd = {
      id: Number(generateId()),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (columnId:Number) => {
    const filteredColumns = columns.filter((column) => column.id !== columnId);
    setColumns(filteredColumns);
  };

  const onDragStart = (event: any) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId);
      const overColumnIndex = columns.findIndex((column) => column.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const updateColumnTitle = (columnId:Number, title:string) => {
    setColumns((columns:any) =>
      columns.map((column:any) => {
        if (column.id === columnId) {
          return {
            ...column,
            title,
          };
        }
        return column;
      }),
    );
  };

  return (
    <div className="mx-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId as number[]}>
              {columns.map((column) => (
                <ColumnContainer key={column?.id} column={column} deleteColumn={(column:Number) => deleteColumn(column)} 
                updateColumnTitle ={updateColumnTitle}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewColumn()}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-gray-900 border-2 p-4 ring-purple-500 hover:ring-2 flex gap-2"
          >
            <PlusIcons />
            <span className="ml-4 text-white">Add Column</span>
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
