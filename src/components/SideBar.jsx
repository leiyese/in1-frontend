import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import styles from '../styles/SideBar.module.css';
import Button from './Button';

const SideBar = ({ onModelSelect }) => {
  const [activeModel, setActiveModel] = useState('gpt-4');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    checkIsMobile();
    
    // Add event listener for resizes
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
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
    // On mobile, close sidebar after selection
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar when clicking outside on mobile only
  useEffect(() => {
    if (!isMobile) return; // Skip this for desktop
    
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(`.${styles.sidebar}`);
      const toggleButton = document.querySelector(`.${styles.toggleButton}`);
      
      if (sidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          toggleButton && 
          !toggleButton.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, styles.sidebar, styles.toggleButton, isMobile]);

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={clsx(styles.toggleButton, sidebarOpen && styles.active)} 
        onClick={toggleSidebar}
        aria-label="Toggle AI Models sidebar"
      >
        <span className={styles.toggleIcon}></span>
        <span className={styles.toggleText}>AI Models</span>
      </button>
      
      {/* Sidebar Overlay - only shown on mobile */}
      {isMobile && (
        <div 
          className={clsx(
            styles.sidebarOverlay, 
            sidebarOpen && styles.overlayVisible
          )}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={clsx(
          styles.sidebar, 
          sidebarOpen ? styles.sidebarVisible : styles.sidebarHidden
        )}
      >
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
        
        <div className={styles.sidebarFooter}>
          Powered by In1 AI Technology
        </div>
      </aside>
    </>
  );
};

export default SideBar;