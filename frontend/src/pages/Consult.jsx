import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/SideBar';
import Header from '../components/layout/Header';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FiSettings } from 'react-icons/fi';

import DraggableSection from '../components/consultation/DraggableSection';
import SortableComplaintInput from '../components/consultation/SortableComplaintInput';
import VitalsGrid from '../components/consultation/VitalsGrid';
import Modal from '../components/ui/Modal';

import {
  ComplaintsSection,
  HistorySection,
  ExaminationSection,
  DiagnosisSection,
  InvestigationsSection,
  MedicationSection,
  AdviceSection,
  FollowUpSection
} from '../components/consultation/Sections';

import { rxData } from '../data/RxDummyData';

const DEFAULT_SECTION_ORDER = [
  'complaints',
  'history',
  'examination',
  'diagnosis',
  'investigations',
  'medication',
  'advice',
  'followUp'
];

const STORAGE_KEY = 'consult-section-order';

const ConsultationForm = () => {
  const { id } = useParams();
  const patient = rxData.find((p) => p.uid === id);

  const [isConfigMode, setIsConfigMode] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [customSections, setCustomSections] = useState(() => {
    const saved = localStorage.getItem('customSections');
    return saved ? JSON.parse(saved) : [];
  });

  const [showNewSectionForm, setShowNewSectionForm] = useState(false);
  const [newSectionData, setNewSectionData] = useState({ heading: '', label: '', type: '', options: '' });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSectionOrder(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customSections', JSON.stringify(customSections));
  }, [customSections]);

  const updateSectionOrder = (newOrder) => {
    setSectionOrder(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder));
  };

  const handleAddCustomSection = () => {
    const { heading, label, type, options } = newSectionData;
    if (!heading.trim() || !label.trim() || !type.trim()) return;
    const newSection = {
      id: crypto.randomUUID(),
      heading,
      fields: [{
        label,
        type,
        options: type === 'dropdown' ? options.split(',').map(opt => opt.trim()) : [],
        values: [{ id: crypto.randomUUID(), value: '' }]
      }]
    };
    setCustomSections([...customSections, newSection]);
    setNewSectionData({ heading: '', label: '', type: '', options: '' });
    setShowNewSectionForm(false);
  };

  const handleDeleteCustomSection = (id) => {
    setCustomSections(customSections.filter((s) => s.id !== id));
  };

  const handleInputChange = (sectionId, fieldIdx, inputIdx, newValue) => {
    setCustomSections(prev => prev.map(section => {
      if (section.id !== sectionId) return section;
      const field = section.fields[fieldIdx];
      const updatedValues = [...field.values];
      updatedValues[inputIdx].value = newValue;
      if (inputIdx === updatedValues.length - 1 && newValue.trim()) {
        updatedValues.push({ id: crypto.randomUUID(), value: '' });
      }
      section.fields[fieldIdx].values = updatedValues;
      return { ...section };
    }));
  };

  const handleDeleteInput = (sectionId, fieldIdx, inputId) => {
    setCustomSections(prev => prev.map(section => {
      if (section.id !== sectionId) return section;
      const field = section.fields[fieldIdx];
      const filtered = field.values.filter(v => v.id !== inputId);
      if (filtered.length > 0) {
        section.fields[fieldIdx].values = filtered;
      }
      return { ...section };
    }));
  };

  const [formData, setFormData] = useState({
    vitals: {
      bp: '', pulse: '', height: '', weight: '', temperature: '', spo2: '', rbs: ''
    },
    complaints: [{ id: crypto.randomUUID(), text: '' }],
    medication: [
      {
        id: crypto.randomUUID(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: ''
      }
    ],
    pastHistory: [{ id: crypto.randomUUID(), value: '' }],
    surgicalHistory: [{ id: crypto.randomUUID(), value: '' }],
    drugAllergy: [{ id: crypto.randomUUID(), value: '' }],
    physicalExamination: [{ id: crypto.randomUUID(), text: '' }],
    diagnosis: {
      provisional: [{ id: crypto.randomUUID(), value: '' }],
      final: [{ id: crypto.randomUUID(), value: '' }]
    },
    tests: [{ id: crypto.randomUUID(), value: '' }],
    testNotes: [{ id: crypto.randomUUID(), value: '' }],
    advice: '',
    followUp: ['', '']
  });

  const sections = useMemo(() => ({
    complaints: <ComplaintsSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} enabled={!isConfigMode} />,
    history: <HistorySection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />,
    examination: <ExaminationSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} enabled={!isConfigMode} />,
    diagnosis: <DiagnosisSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />,
    investigations: <InvestigationsSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />,
    medication: <MedicationSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />,
    advice: <AdviceSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />,
    followUp: <FollowUpSection isConfigMode={isConfigMode} formData={formData} setFormData={setFormData} />
  }), [formData, isConfigMode]);
  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="max-w-6xl mx-auto space-y-6 font-sans text-sm">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Consultation for {patient?.name || 'Unknown'}</h1>
                <div className="flex gap-2">
                  <button onClick={() => setIsConfigMode(!isConfigMode)} className="bg-[#7047d1] flex items-center text-white px-3 py-2 rounded-xl">
                    <FiSettings className="mr-1" />
                    {isConfigMode ? 'Done' : 'Configure'}
                  </button>
                  {isConfigMode && (
                    <>
                      <button onClick={() => setShowNewSectionForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-xl">+ Add Section</button>
                      <Modal isOpen={showNewSectionForm} onClose={() => setShowNewSectionForm(false)} title="Add New Section">
                        <div className="space-y-2">
                          <input type="text" className="w-full border p-2 rounded" placeholder="Section Heading" value={newSectionData.heading} onChange={(e) => setNewSectionData({ ...newSectionData, heading: e.target.value })} />
                          <input type="text" className="w-full border p-2 rounded" placeholder="Subheading Label" value={newSectionData.label} onChange={(e) => setNewSectionData({ ...newSectionData, label: e.target.value })} />
                          <select className="w-full border p-2 rounded" value={newSectionData.type} onChange={(e) => setNewSectionData({ ...newSectionData, type: e.target.value })}>
                            <option value="">Select Input Type</option>
                            <option value="input">Input</option>
                            <option value="textarea">Textarea</option>
                            <option value="date">Date</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="checkbox">Checkbox</option>
                          </select>
                          {newSectionData.type === 'dropdown' && (
                            <input type="text" className="w-full border p-2 rounded" placeholder="Comma-separated options" value={newSectionData.options} onChange={(e) => setNewSectionData({ ...newSectionData, options: e.target.value })} />
                          )}
                          <div className="flex justify-end gap-2">
                            <button className="px-4 py-1 bg-gray-300 rounded" onClick={() => setShowNewSectionForm(false)}>Cancel</button>
                            <button className="px-4 py-1 bg-[#7047d1] text-white rounded" onClick={handleAddCustomSection}>Add</button>
                          </div>
                        </div>
                      </Modal>
                    </>
                  )}
                  <button className="bg-[#7047d1] text-white px-4 py-2 rounded-xl">Load Template</button>
                </div>
              </div>
              <p className="text-sm text-[#69578F]">UID: {patient?.uid || "N/A"} | Age: {patient?.age || "N/A"}</p>
              <img src={patient?.img || "/Ava Evans.png"} alt="Patient" className="h-[160px] w-[300px] object-cover rounded" />

              <VitalsGrid vitals={formData.vitals} setFormData={setFormData} />

              <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                if (active.id !== over?.id) {
                  const oldIndex = sectionOrder.indexOf(active.id);
                  const newIndex = sectionOrder.indexOf(over.id);
                  const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
                  updateSectionOrder(newOrder);
                }
              }}>
                <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                  {sectionOrder.map((sectionKey) => (
                    <React.Fragment key={sectionKey}>
                      {sections[sectionKey]}
                    </React.Fragment>
                  ))}
                </SortableContext>

              </DndContext>

              {customSections.map((section) => (
                <DraggableSection key={section.id} id={section.id} enabled={isConfigMode}>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{section.heading}</h3>
                      {isConfigMode && (
                        <button onClick={() => handleDeleteCustomSection(section.id)} className="text-red-500 text-sm">Delete</button>
                      )}
                    </div>
                    {section.fields.map((field, i) => (
                      <div key={i} className="space-y-2">
                        <label className="block mb-1 font-medium">{field.label}</label>
                        {field.type === 'input' && field.values.map((val, idx) => (
                          <div key={val.id} className="flex items-center gap-2">
                            <input value={val.value} onChange={(e) => handleInputChange(section.id, i, idx, e.target.value)} className="w-full border rounded p-2" />
                            {field.values.length > 1 && (
                              <button onClick={() => handleDeleteInput(section.id, i, val.id)} className="text-red-500">Delete</button>
                            )}
                          </div>
                        ))}
                        {field.type === 'textarea' && <textarea className="w-full border rounded p-2" />}
                        {field.type === 'date' && <input type="date" className="w-full border rounded p-2" />}
                        {field.type === 'dropdown' && (
                          <select className="w-full border rounded p-2">
                            {(field.options || []).map((opt, idx) => (
                              <option key={idx}>{opt}</option>
                            ))}
                          </select>
                        )}
                        {field.type === 'checkbox' && <input type="checkbox" />}
                      </div>
                    ))}
                  </div>
                </DraggableSection>
              ))}

              <div className="flex gap-4 mt-4">
                <button className="bg-[#7047d1] text-white px-4 py-2 rounded-2xl">Save & Finalize</button>
                <button className="bg-gray-200 px-4 py-2 rounded">Print Prescription</button>
                <button className="bg-[#7047d1] text-white px-4 py-2 rounded-2xl ml-auto">Send via WhatsApp</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultationForm;
