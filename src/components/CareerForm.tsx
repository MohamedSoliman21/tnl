"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CareerFormProps {
  career?: Record<string, unknown>;
  onSave: (career: Record<string, unknown>) => void;
  onCancel: () => void;
}

export default function CareerForm({ career, onSave, onCancel }: CareerFormProps) {
  const [formData, setFormData] = useState({
    title: career?.title || '',
    department: career?.department || '',
    location: career?.location || '',
    type: career?.type || 'full-time',
    description: career?.description || '',
    requirements: career?.requirements || [],
    responsibilities: career?.responsibilities || [],
    benefits: career?.benefits || [],
    salary: {
      min: (career as any)?.salary?.min || '',
      max: (career as any)?.salary?.max || '',
      currency: (career as any)?.salary?.currency || 'USD',
      period: (career as any)?.salary?.period || 'yearly'
    },
    experience: {
      min: (career as any)?.experience?.min || 0,
      max: (career as any)?.experience?.max || ''
    },
    skills: career?.skills || [],
    isActive: career?.isActive ?? true,
    isFeatured: career?.isFeatured ?? false,
    applicationDeadline: career?.applicationDeadline || ''
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string arrays to proper format
    const processedData = {
      ...formData,
      salary: {
        ...formData.salary,
        min: formData.salary.min ? Number(formData.salary.min) : undefined,
        max: formData.salary.max ? Number(formData.salary.max) : undefined
      },
      experience: {
        ...formData.experience,
        min: Number(formData.experience.min),
        max: formData.experience.max ? Number(formData.experience.max) : undefined
      },
      applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline as string).toISOString() : undefined
    };

    onSave(processedData);
  };

  const addToList = (list: string[], setList: (list: string[]) => void, newItem: string, setNewItem: (item: string) => void) => {
    if (newItem.trim()) {
      setList([...list, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeFromList = (list: string[], setList: (list: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {career ? 'Edit Career' : 'Add New Career'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title as string}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  required
                  value={formData.department as string}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location as string}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  required
                  value={formData.type as string}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description as string}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
              />
            </div>

            {/* Salary Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Salary
                </label>
                <input
                  type="number"
                  value={formData.salary.min as string}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    salary: { ...formData.salary, min: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Salary
                </label>
                <input
                  type="number"
                  value={formData.salary.max as string}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    salary: { ...formData.salary, max: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.salary.currency as string}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    salary: { ...formData.salary, currency: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <select
                  value={formData.salary.period as string}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    salary: { ...formData.salary, period: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                >
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Experience (years) *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.experience.min as number}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    experience: { ...formData.experience, min: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Experience (years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience.max as string}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    experience: { ...formData.experience, max: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add requirement..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
                <button
                  type="button"
                  onClick={() => addToList(formData.requirements as string[], (list) => setFormData({ ...formData, requirements: list }), newRequirement, setNewRequirement)}
                  className="px-4 py-2 bg-[#F58906] text-white rounded-md hover:bg-orange-500"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {(formData.requirements as string[]).map((req, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{req}</span>
                    <button
                      type="button"
                      onClick={() => removeFromList(formData.requirements as string[], (list) => setFormData({ ...formData, requirements: list }), index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsibilities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  placeholder="Add responsibility..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
                <button
                  type="button"
                  onClick={() => addToList(formData.responsibilities as string[], (list) => setFormData({ ...formData, responsibilities: list }), newResponsibility, setNewResponsibility)}
                  className="px-4 py-2 bg-[#F58906] text-white rounded-md hover:bg-orange-500"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {(formData.responsibilities as string[]).map((resp, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{resp}</span>
                    <button
                      type="button"
                      onClick={() => removeFromList(formData.responsibilities as string[], (list) => setFormData({ ...formData, responsibilities: list }), index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add benefit..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
                <button
                  type="button"
                  onClick={() => addToList(formData.benefits as string[], (list) => setFormData({ ...formData, benefits: list }), newBenefit, setNewBenefit)}
                  className="px-4 py-2 bg-[#F58906] text-white rounded-md hover:bg-orange-500"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {(formData.benefits as string[]).map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeFromList(formData.benefits as string[], (list) => setFormData({ ...formData, benefits: list }), index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
                />
                <button
                  type="button"
                  onClick={() => addToList(formData.skills as string[], (list) => setFormData({ ...formData, skills: list }), newSkill, setNewSkill)}
                  className="px-4 py-2 bg-[#F58906] text-white rounded-md hover:bg-orange-500"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {(formData.skills as string[]).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeFromList(formData.skills as string[], (list) => setFormData({ ...formData, skills: list }), index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                type="datetime-local"
                value={formData.applicationDeadline as string}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F58906]"
              />
            </div>

            {/* Status Options */}
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive as boolean}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured as boolean}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#F58906] text-white rounded-md hover:bg-orange-500"
              >
                {career ? 'Update Career' : 'Create Career'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
