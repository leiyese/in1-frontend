import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '../styles/SideBar.module.css';
import Button from './Button';

const SideBar = ({ onModelSelect }) => {
  const [activeModel, setActiveModel] = useState('gpt-4');
  
  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model for complex tasks' },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and cost-effective for simpler tasks' },
    { id: 'huggingface', name: 'Huggingface', description: 'Balanced for creative and analytical tasks' },
    { id: 'gemini', name: 'Gemini-2-flash', description: 'Multimodal model' },
    { id: 'bard', name: 'Bard', description: 'Google\'s conversational AI' },
  ];

  const handleModelClick = (modelId) => {
    setActiveModel(modelId);
    onModelSelect(modelId);
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>AI Models</h2>
      <ul className={styles.modelList}>
        {models.map((model) => (
          <li key={model.id} className={styles.modelItem}>
            <Button
              onClick={() => handleModelClick(model.id)}
              className={clsx(
                styles.modelButton,
                activeModel === model.id && styles.activeModel
              )}
              variant="text"
            >
              <div className={styles.modelName}>{model.name}</div>
              <div className={styles.modelDescription}>{model.description}</div>
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;