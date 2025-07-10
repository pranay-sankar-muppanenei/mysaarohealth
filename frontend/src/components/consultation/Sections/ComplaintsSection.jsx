import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableComplaintInput from '../SortableComplaintInput';
import DraggableSection from '../DraggableSection';

const ComplaintsSection = ({ formData, setFormData, isConfigMode, enabled }) => {
  const handleChange = (val, i) => {
    const updated = [...formData.complaints];
    updated[i] = { ...updated[i], text: val };
    if (i === updated.length - 1 && val.trim() !== '') {
      updated.push({ id: crypto.randomUUID(), text: '' });
    }
    setFormData({ ...formData, complaints: updated });
  };

  const handleDelete = (id) => {
    const filtered = formData.complaints.filter((c) => c.id !== id);
    if (filtered.length > 0) {
      setFormData({ ...formData, complaints: filtered });
    }
  };

  return (
    <DraggableSection id="complaints" enabled={isConfigMode}>
      <div>
        <h2 className="font-semibold mb-4 text-[22px]">Chief Complaints</h2>

        {enabled ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (!over) return;
              if (active.id !== over.id) {
                const oldIndex = formData.complaints.findIndex((c) => c.id === active.id);
                const newIndex = formData.complaints.findIndex((c) => c.id === over.id);
                const newList = arrayMove(formData.complaints, oldIndex, newIndex);
                setFormData({ ...formData, complaints: newList });
              }
            }}
          >
            <SortableContext
              items={formData.complaints.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {formData.complaints.map((complaint, i) => (
                <SortableComplaintInput
                  key={complaint.id}
                  id={complaint.id}
                  index={i}
                  label="Complaint"
                  value={complaint.text}
                  enabled={true} // ✅ Show drag icon when dragging is enabled
                  onChange={(val) => handleChange(val, i)}
                  onDelete={handleDelete}
                  disableDelete={formData.complaints.length === 1}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <>
            {formData.complaints.map((complaint, i) => (
              <SortableComplaintInput
                key={complaint.id}
                id={complaint.id}
                index={i}
                label="Complaint"
                value={complaint.text}
                enabled={false} // ✅ Hide drag icon when dragging is disabled
                onChange={(val) => handleChange(val, i)}
                onDelete={handleDelete}
                disableDelete={formData.complaints.length === 1}
              />
            ))}
          </>
        )}
      </div>
    </DraggableSection>
  );
};

export default ComplaintsSection;
