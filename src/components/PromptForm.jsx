import React from 'react';
import styles from '../styles/PromptForm.module.css';
import AdvTextInput from './AdvTextInput';
import Button from './Button';


const PromptForm = ({
  selectedModel,
  prompt,
  setPrompt,
  isLoading,
  handleSubmit,
  response
}) => {
  return (
    <div className={styles.promptContainer}>
      <h2 className={styles.title}>AI Assistant ({selectedModel})</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <AdvTextInput
          name="prompt"
          label="Enter your prompt:"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.textarea}
          as="textarea"
          rows={4}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
          variant="primary"
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </Button>
      </form>
      
      {response && (
        <div className={styles.responseContainer}>
          <h3 className={styles.responseTitle}>Response:</h3>
          <div className={styles.responseText}>{response}</div>
        </div>
      )}
    </div>
  );
};

export default PromptForm;