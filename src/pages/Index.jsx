import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MessageDisplay from '../components/MessageDisplay';
import PromptForm from '../components/PromptForm';
import SideBar from '../components/SideBar';
import { fetchAiResponse } from '../services/aiApi';
import { logout } from '../services/authApi';
import styles from '../styles/Index.module.css';

const Index = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const navigate = useNavigate();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleProfileClick = () => {
    navigate('/profile-page');
  };

  const handleSubcriptionClick = () => {
    navigate('/subscription');
    const userId = localStorage.getItem('userId') || 'unknown'; 
    console.log('Current user id:', userId);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
  };

  const handleSubmit = async (promptText) => {
    if (!promptText.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: promptText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const systemRole = "You are a helpful AI assistant that speaks baby language.";
      const aiResponse = await fetchAiResponse(selectedModel, promptText, systemRole);
      
      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = { role: 'assistant', content: "Error: Failed to get response from AI" };
      setMessages(prev => [...prev, errorMessage]);
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
        <SideBar onModelSelect={handleModelSelect} />
        
        <main className={styles.main}>
          <div className={styles.chatContainer}>
            {/* Message display area */}
            <div className={styles.messagesWrapper}>
              {messages.length === 0 ? (
                <div className={styles.welcomeMessage}>
                  <h2>Welcome to AI Assistant ({selectedModel})</h2>
                  <p>Start by typing a message below</p>
                </div>
              ) : (
                <MessageDisplay messages={messages} />
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Fixed prompt input at bottom */}
            <div className={styles.promptWrapper}>
              <PromptForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                selectedModel={selectedModel}
              />
              <div className={styles.disclaimer}>
                AI Assistant may produce inaccurate information
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;