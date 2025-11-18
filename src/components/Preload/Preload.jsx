import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './Preload.css';
import Header from '../Header/Header';

const Preload = () => {
  const [stage, setStage] = useState('typing');
  const [dotCount, setDotCount] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (stage === 'responding') {
      const interval = setInterval(() => {
        setDotCount((prev) => {
          if (prev === 3) return 1;
          return prev + 1;
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'responding') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onLoadComplete(), 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleTypingComplete = () => {
    setTimeout(() => {
      setStage('sending');
      setTimeout(() => {
        setStage('responding');
      }, 600);
    }, 500);
  };

  return (
    <div className={`preloader ${!isVisible ? 'preloader--hidden' : ''}`}>
    <Header />
      <div className="chat-container">
        <div className="chat-panel">
          <div className={stage === 'typing' ? "chat-messages" : "chat-messages chat-messages--visible"}>
            {stage !== 'typing' && (
              <div className="message message--user">
                <div className="message-bubble">
                  Who is Ibrahim Alharthi?
                </div>
              </div>
            )}

            {stage === 'responding' && (
              <div className="message message--ai">
                <div className="message-bubble message-bubble--ai">
                  <span className="dots">
                    {'.'.repeat(dotCount)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <div className={`chat-input ${stage === 'sending' ? 'chat-input--sending' : ''}`}>
              {stage === 'typing' ? (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(80)
                      .typeString('Who is Ibrahim Alharthi?')
                      .callFunction(() => {
                        handleTypingComplete();
                      })
                      .start();
                  }}
                  options={{
                    cursor: '',
                  }}
                />
              ) : null}
            </div>
            <button 
              className={`send-button ${stage === 'sending' ? 'send-button--active' : ''}`}
              disabled={stage === 'typing'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preload;