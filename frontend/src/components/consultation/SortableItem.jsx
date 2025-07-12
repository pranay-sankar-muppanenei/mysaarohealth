// src/components/consultation/SortableItem.js

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RxDragHandleDots2 } from 'react-icons/rx';

export function SortableItem({ id, disabled, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2"
    >
      {!disabled && (
        <div {...attributes} {...listeners} className="cursor-grab text-gray-500">
          <RxDragHandleDots2 size={18} />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
