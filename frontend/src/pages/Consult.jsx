
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

  {/*const [formData, setFormData] = useState({
    vitals: {
      bp: '', pulse: '', height: '', weight: '', temperature: '', spo2: '', rbs: ''
    },
    complaints: [{ id: crypto.randomUUID(), text: '' }],
    medication: [{ id: crypto.randomUUID(), name: '', dosage: '', frequency: '', duration: '', notes: '' }],
    pastHistory: ['',],
    surgicalHistory: ['',],
    drugAllergy: ['',],
    physicalExamination: [{ id: crypto.randomUUID(), text: '' }],
    diagnosis: {
      provisional: ['',],
      final: ['',]
    },
    tests: ['', ],
    testNotes: ['',],
    advice: '',
    followUp: ['', '']
  });*/}
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
  followUp: ['', ''],
});


  // Load saved section order
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSectionOrder(parsed);
      } catch {}
    }
  }, []);

  const updateSectionOrder = (newOrder) => {
    setSectionOrder(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder));
  };

  const sections = useMemo(() => ({
    complaints: (
      <ComplaintsSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
        enabled={!isConfigMode}
      />
    ),
    history: (
      <HistorySection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    examination: (
      <ExaminationSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
        enabled={!isConfigMode}
      />
    ),
    diagnosis: (
      <DiagnosisSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    investigations: (
      <InvestigationsSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    medication: (
      <MedicationSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    advice: (
      <AdviceSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    ),
    followUp: (
      <FollowUpSection
        isConfigMode={isConfigMode}
        formData={formData}
        setFormData={setFormData}
      />
    )
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
                  <button
                    onClick={() => setIsConfigMode(!isConfigMode)}
                    className="bg-[#7047d1] flex items-center text-white px-3 py-2 rounded-xl"
                  >
                    <FiSettings className="mr-1" />
                    {isConfigMode ? 'Done' : 'Configure'}
                  </button>
                  <button className="bg-[#7047d1] text-white px-4 py-2 rounded-xl">
                    Load Template
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#69578F]">
                UID: {patient?.uid || "N/A"} | Age: {patient?.age || "N/A"}
              </p>
              <img
                src={patient?.img || "/Ava Evans.png"}
                alt="Patient"
                className="h-[160px] w-[300px] object-cover rounded"
              />

              <VitalsGrid vitals={formData.vitals} setFormData={setFormData} />

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (active.id !== over?.id) {
                    const oldIndex = sectionOrder.indexOf(active.id);
                    const newIndex = sectionOrder.indexOf(over.id);
                    const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
                    updateSectionOrder(newOrder);
                  }
                }}
              >
                <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                  {sectionOrder.map((sectionKey) => sections[sectionKey])}
                </SortableContext>
              </DndContext>

              <div className="flex gap-4 mt-4">
                <button className="bg-[#7047d1] text-white px-4 py-2 rounded-2xl">
                  Save & Finalize
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded">
                  Print Prescription
                </button>
                <button className="bg-[#7047d1] text-white px-4 py-2 rounded-2xl ml-auto">
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultationForm;
