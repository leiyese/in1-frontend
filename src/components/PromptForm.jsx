import React, { useState } from 'react';
import styles from '../styles/PromptForm.module.css';
import AdvTextInput from './AdvTextInput';
import Button from './Button';

const PromptForm = ({ onSubmit, isLoading, selectedModel }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <AdvTextInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Message ${selectedModel}...`}
        disabled={isLoading}
        multiline
        rows={1}
        className={styles.input}
      />
      <Button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        variant="primary"
        className={styles.button}
      >
        {isLoading ? (
          <span className={styles.loadingText}>Sending...</span>
        ) : (
          'Send'
        )}
      </Button>
    </form>
  );
};

export default PromptForm;