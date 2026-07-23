'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { TimerPreset } from '@/store/useTimerStore';

interface EditPresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  presets: TimerPreset[];
  onSave: (newPresets: TimerPreset[]) => void;
}

interface DraftPresetRow {
  id: string;
  name: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function EditPresetsModal({ isOpen, onClose, presets, onSave }: EditPresetsModalProps) {
  const [drafts, setDrafts] = useState<DraftPresetRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Initialize draft rows when modal opens or presets change
  useEffect(() => {
    if (isOpen) {
      const initialDrafts: DraftPresetRow[] = presets.map((p) => {
        const h = Math.floor(p.duration / 3600);
        const m = Math.floor((p.duration % 3600) / 60);
        const s = p.duration % 60;
        return {
          id: p.id,
          name: p.name,
          hours: h.toString(),
          minutes: m.toString(),
          seconds: s.toString(),
        };
      });
      setDrafts(initialDrafts);
      setErrorMsg('');
    }
  }, [isOpen, presets]);

  if (!isOpen) return null;

  const handleAddPreset = () => {
    const newId = `preset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newRow: DraftPresetRow = {
      id: newId,
      name: `Preset ${drafts.length + 1}`,
      hours: '0',
      minutes: '10',
      seconds: '0',
    };
    setDrafts([...drafts, newRow]);
    setErrorMsg('');
  };

  const handleRemovePreset = (id: string) => {
    if (drafts.length <= 1) return;
    setDrafts(drafts.filter((d) => d.id !== id));
    setErrorMsg('');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newDrafts = [...drafts];
    const temp = newDrafts[index - 1];
    newDrafts[index - 1] = newDrafts[index];
    newDrafts[index] = temp;
    setDrafts(newDrafts);
    setErrorMsg('');
  };

  const handleMoveDown = (index: number) => {
    if (index === drafts.length - 1) return;
    const newDrafts = [...drafts];
    const temp = newDrafts[index + 1];
    newDrafts[index + 1] = newDrafts[index];
    newDrafts[index] = temp;
    setDrafts(newDrafts);
    setErrorMsg('');
  };

  const handleChangeRow = (id: string, field: keyof DraftPresetRow, value: string) => {
    setDrafts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    setErrorMsg('');
  };

  const handleSave = () => {
    setErrorMsg('');

    // Validation checks
    const seenNames = new Set<string>();

    const validatedPresets: TimerPreset[] = [];

    for (let i = 0; i < drafts.length; i++) {
      const row = drafts[i];
      const trimmedName = row.name.trim();

      if (!trimmedName) {
        setErrorMsg(`Preset #${i + 1} name cannot be empty.`);
        return;
      }

      const lowerName = trimmedName.toLowerCase();
      if (seenNames.has(lowerName)) {
        setErrorMsg(`Duplicate preset name "${trimmedName}". Preset names must be unique.`);
        return;
      }
      seenNames.add(lowerName);

      const h = parseInt(row.hours || '0', 10);
      const m = parseInt(row.minutes || '0', 10);
      const s = parseInt(row.seconds || '0', 10);

      if (isNaN(h) || isNaN(m) || isNaN(s) || h < 0 || m < 0 || s < 0) {
        setErrorMsg(`Preset "${trimmedName}" has invalid duration numbers.`);
        return;
      }

      const totalSecs = h * 3600 + m * 60 + s;
      if (totalSecs <= 0) {
        setErrorMsg(`Preset "${trimmedName}" duration must be greater than 0 seconds.`);
        return;
      }

      validatedPresets.push({
        id: row.id,
        name: trimmedName,
        duration: totalSecs,
      });
    }

    onSave(validatedPresets);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-card border border-border-default rounded-2xl shadow-light-xl dark:shadow-dark-default w-full max-w-2xl z-10 overflow-hidden my-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-default/50">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Edit Timer Presets</h2>
              <p className="text-xs text-text-secondary mt-0.5">Customize, reorder, add, or remove preset durations.</p>
            </div>
            <IconButton variant="ghost" ariaLabel="Close Modal" onClick={onClose}>
              <X className="w-5 h-5 text-text-secondary" />
            </IconButton>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {errorMsg && (
              <div className="flex items-center space-x-2 bg-error/10 border border-error/20 text-error p-3.5 rounded-xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-3">
              {drafts.map((row, index) => (
                <div
                  key={row.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 bg-bg-secondary border border-border-default/50 rounded-xl transition-all"
                >
                  {/* Reorder Buttons */}
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === drafts.length - 1}
                      className="p-1 text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Preset Name */}
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-[10px] text-text-muted font-medium mb-1">Preset Label</label>
                    <input
                      type="text"
                      value={row.name}
                      maxLength={20}
                      onChange={(e) => handleChangeRow(row.id, 'name', e.target.value)}
                      placeholder="e.g. 15m"
                      className="w-full h-10 bg-card text-text-primary rounded-lg border border-border-default px-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Duration Controls (Hours, Mins, Secs) */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <div className="w-16">
                      <label className="block text-[10px] text-text-muted font-medium mb-1">Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={row.hours}
                        onChange={(e) => handleChangeRow(row.id, 'hours', e.target.value)}
                        className="w-full h-10 bg-card text-text-primary rounded-lg border border-border-default px-1 text-center font-mono text-xs font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <span className="text-text-muted pt-4 font-bold text-xs">:</span>
                    <div className="w-16">
                      <label className="block text-[10px] text-text-muted font-medium mb-1">Mins</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={row.minutes}
                        onChange={(e) => handleChangeRow(row.id, 'minutes', e.target.value)}
                        className="w-full h-10 bg-card text-text-primary rounded-lg border border-border-default px-1 text-center font-mono text-xs font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <span className="text-text-muted pt-4 font-bold text-xs">:</span>
                    <div className="w-16">
                      <label className="block text-[10px] text-text-muted font-medium mb-1">Secs</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={row.seconds}
                        onChange={(e) => handleChangeRow(row.id, 'seconds', e.target.value)}
                        className="w-full h-10 bg-card text-text-primary rounded-lg border border-border-default px-1 text-center font-mono text-xs font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-center justify-end shrink-0 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => handleRemovePreset(row.id)}
                      disabled={drafts.length <= 1}
                      className="p-2 text-error hover:bg-error/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Delete Preset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Preset Button */}
            <button
              type="button"
              onClick={handleAddPreset}
              className="w-full py-3 border-2 border-dashed border-border-default hover:border-primary/50 hover:bg-card-hover text-text-primary text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Plus className="w-4 h-4 text-primary" />
              <span>Add New Preset</span>
            </button>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border-default/50 bg-bg-secondary/40">
            <Button variant="secondary" onClick={onClose} className="px-5 h-10 text-xs">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="px-6 h-10 text-xs font-semibold">
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
