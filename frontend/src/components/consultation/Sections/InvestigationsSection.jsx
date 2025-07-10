import React from 'react';
import { FaTrash } from 'react-icons/fa';
import DraggableSection from '../DraggableSection';

const InvestigationsSection = ({ formData, setFormData, isConfigMode }) => {
  const handleChange = (type, value, index) => {
    const updated = [...formData[type]];
    updated[index] = value;

    const otherType = type === 'tests' ? 'testNotes' : 'tests';
    const otherValue = formData[otherType][index] || '';
    const isLast = index === formData.tests.length - 1;
    const isAnyFilled = value.trim() !== '' || otherValue.trim() !== '';

    // Add a new empty row if last row has any content
    if (isLast && isAnyFilled) {
      const newFormData = {
        ...formData,
        tests: [...(type === 'tests' ? updated : formData.tests), ''],
        testNotes: [...(type === 'testNotes' ? updated : formData.testNotes), ''],
      };
      setFormData(newFormData);
    } else {
      setFormData({ ...formData, [type]: updated });
    }
  };

  const handleDelete = (index) => {
    const updatedTests = [...formData.tests];
    const updatedNotes = [...formData.testNotes];

    updatedTests.splice(index, 1);
    updatedNotes.splice(index, 1);

    // Ensure at least one row remains
    if (updatedTests.length === 0) {
      updatedTests.push('');
      updatedNotes.push('');
    }

    setFormData({
      ...formData,
      tests: updatedTests,
      testNotes: updatedNotes,
    });
  };

  return (
    <DraggableSection key="investigations" id="investigations" enabled={isConfigMode}>
      <h2 className="font-semibold mb-4 text-[22px]">Investigations & Lab Advice</h2>
      <div className="flex flex-col gap-4">
        {formData.tests.map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              <label className="mb-1 font-medium block">Test {i + 1}</label>
              <input
                value={formData.tests[i]}
                onChange={(e) => handleChange('tests', e.target.value, i)}
                placeholder="Enter Test"
                className="w-full border p-2 rounded bg-gray-100 placeholder-[#69578F]"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 font-medium block">Test Note {i + 1}</label>
              <input
                value={formData.testNotes[i]}
                onChange={(e) => handleChange('testNotes', e.target.value, i)}
                placeholder="Note for Lab"
                className="w-full border p-2 rounded bg-gray-100 placeholder-[#69578F]"
              />
            </div>
            {formData.tests.length > 1 && (
              <button
                className="mt-[30px] text-red-500"
                onClick={() => handleDelete(i)}
                title="Delete row"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
    </DraggableSection>
  );
};

export default InvestigationsSection;
