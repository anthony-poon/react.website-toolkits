import React, { useEffect, useState } from 'react';
import _ from 'lodash';
export const makeFormData = <T extends Record<string, unknown>>(init: T) => {
  return (update?: T) => {
    const [formData, setFormData] = useState<T>(init);
    const hasChange = _.isEqual(init, formData);

    useEffect(() => {
      if (!update) {
        return;
      }
      setFormData(update);
    }, [update]);

    const handleFormChange = (evtOrName: React.ChangeEvent<HTMLInputElement> | string, value?: string) => {
      if (typeof evtOrName === 'string') {
        if (!(evtOrName in init)) {
          return;
        }
        setFormData(prev => ({ ...prev, [evtOrName]: value }));
      } else {
        const { name, value } = evtOrName.target;
        if (!(name in init)) {
          return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    const resetFormData = () => {
      setFormData(init);
    }

    const setFormValue = <K extends keyof T>(key: K, value: T[K]) => {
      if (key in init) {
        setFormData(prev => ({ ...prev, [key]: value }));
      }
    };

    return { formData, handleFormChange, resetFormData, hasChange, setFormValue }
  }
}