import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PromptForm from '../components/PromptForm';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Index.module.css';
import { logout } from '../services/authApi';
import { useNavigate } from 'react-router-dom';


const Index = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile-page');
    console.log('Profile clicked');
  };

  const handleSubcriptionClick = () => {
    navigate('/subscription');
    console.log('Subscription clicked');
    const userId = localStorage.getItem('userId') || 'unknown'; 
    console.log('Current user id:', userId);
  }

  
  const handleLogoutClick = async () => {
    try {
      await logout();
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      const mockApiResponse = `This is a mock response from ${selectedModel} for: "${prompt}"`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(mockApiResponse);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setResponse('Error: Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header 
        onProfileClick={handleProfileClick} 
        onLogoutClick={handleLogoutClick} 
        onSubcriptionClick={handleSubcriptionClick}
      />
      
      <div className={styles.content}>
        <Sidebar onModelSelect={handleModelSelect} />
        
        <main className={styles.main}>
          <PromptForm
            selectedModel={selectedModel}
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            response={response}
          />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;