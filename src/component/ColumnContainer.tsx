import { useState } from 'react';
import DeleteIcons from '../icons/DeleteIcons';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const ColumnContainer = (props:any) => {
  const [editMode,setEditMode] = useState(false);
  const { column,deleteColumn,updateColumnTitle } = props;
  const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
    id:column.id,
    data:{
      type:'column',
      column
    },
    disabled:editMode
  })

  const style = {
    transition,
    transform : CSS.Transform.toString(transform),
  }

  if(isDragging){
    return (
      <div
      ref={setNodeRef}
      style={style}
      className="bg-purple-200 border-dotted border border-purple-900 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      </div>
    )
  }




  return (
    <div 
    ref={setNodeRef}
    style={style}
    onClick={() => setEditMode(true)}
    className="bg-gray-900 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div 
       {...attributes}
       {...listeners}
      className="bg-gray-800 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-950 border-4 text-white">
        <div 
        className="flex gap-2 justify-between">
          <div className="flex justify-center items-center bg-gray-950 px-2 py-1 text-sm">
          
          {!editMode && column.title}
          {editMode && <input onChange={(e) => updateColumnTitle(column.id,e.target.value)}
           defaultValue={column.title} 
           onKeyDown={(e) =>{
            if(e.key !== 'Enter') return;
            setEditMode(false); 
           }}
           className="bg-gray-950 text-white outline-none"/>}
          </div>
          <button
        onClick={() => deleteColumn(column.id)}
        className='stroke-gray-500 hover:stroke-white hover:bg-gray-900
          rounded px-1 py-2
          '>
            <DeleteIcons />
          </button>
        </div>
      </div>
      {/* Column Content */}
      <div className="flex flex-grow"></div>
    </div>
  );
};

export default ColumnContainer;
