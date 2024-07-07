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
    className="bg-[#f5f5f5] w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div 
       {...attributes}
       {...listeners}
      className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 text-gray-900">
        <div 
        className="flex gap-2 justify-between">
          <div className="flex justify-center items-center px-2 py-1 text-sm relative after:content-[''] after:absolute after:h-[10px] after:w-[10px] after:bg-gray-900 after:left-0 after:top-[50%] after:translate-y-[-50%] after:rounded-full ">
          
         <span  onClick={() => setEditMode(true)} className='pl-3'> {!editMode && column.title}</span>
          {editMode && <input onChange={(e) => updateColumnTitle(column.id,e.target.value)}
           defaultValue={column.title} 
           onKeyDown={(e) =>{
            if(e.key !== 'Enter') return;
            setEditMode(false); 
           }}
           className="text-gray-900 font-bold outline-none pl-2"/>}
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
