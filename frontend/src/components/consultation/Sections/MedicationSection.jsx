import React from 'react';
import DraggableSection from '../DraggableSection';
import { MdDeleteOutline } from 'react-icons/md';

const MedicationSection = ({ formData, setFormData, isConfigMode }) => {
  const handleChange = (val, index, field) => {
    const updated = [...formData.medication];
    updated[index] = { ...updated[index], [field]: val };

    const isLast = index === updated.length - 1;
    const hasText = val.trim() !== '';

    if (isLast && hasText) {
      updated.push({
        id: crypto.randomUUID(),
        name: '', dosage: '', frequency: '', duration: '', notes: ''
      });
    }

    setFormData({ ...formData, medication: updated });
  };

  const handleDelete = (index) => {
    if (formData.medication.length === 1) return;
    const updated = [...formData.medication];
    updated.splice(index, 1);
    setFormData({ ...formData, medication: updated });
  };

  return (
    <DraggableSection key="medication" id="medication" enabled={isConfigMode}>
      <div>
        <div className="font-semibold mb-4 text-[22px]">Medication / Prescription</div>

        <div className="space-y-4">
          {formData.medication.map((med, index) => (
            <div key={med.id} className="flex flex-wrap gap-2 items-start">
              {['name', 'dosage', 'frequency', 'duration', 'notes'].map((field) => (
                <input
                  key={field}
                  className="flex-1 min-w-[120px] p-2 rounded bg-gray-100 placeholder-[#69578F]"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={med[field]}
                  onChange={(e) => handleChange(e.target.value, index, field)}
                />
              ))}

              {formData.medication.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-red-500 mt-1"
                  title="Delete"
                >
                  <MdDeleteOutline size={22} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DraggableSection>
  );
};

export default MedicationSection;
