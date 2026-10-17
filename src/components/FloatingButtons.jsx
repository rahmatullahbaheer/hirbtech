'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle, X, Send, ChevronRight } from 'lucide-react';

// ─── CONFIG ────────────────────────────────────────────────────────────────────
// Replace with your actual WhatsApp number (international format, no + or spaces)
const WHATSAPP_NUMBER = '923435185993'; // Pakistan +92 343 5185993
const WHATSAPP_DISPLAY = '+92 343 5185993';

// Quick-reply suggestions shown inside the modal
const QUICK_REPLIES = [
  '👋 Hi! I\'d like to discuss a project.',
  '💡 Can you help me with a website?',
  '📱 I need a mobile app.',
  '💰 What are your pricing plans?',
  '📞 Please call me back.',
];
// ───────────────────────────────────────────────────────────────────────────────

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      from: 'rb',
      text: "👋 Hello! Welcome to **RB-Tech**. How can we help you today?\n\nFeel free to type your message or pick a quick reply below.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);
  const chatEndRef = useRef(null);

  // ── Show/hide scroll-to-top based on scroll position ──
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Auto-scroll chat to bottom on new messages ──
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // ── Auto-focus textarea when modal opens ──
  useEffect(() => {
    if (showModal) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [showModal]);

  // ── Lock body scroll when modal is open ──
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendToWhatsApp = (text) => {
    const trimmed = (text || message).trim();
    if (!trimmed) return;

    const userMsg = {
      from: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setMessage('');
    setIsSending(true);

    // Simulate a brief "sending" state then open WhatsApp
    setTimeout(() => {
      setIsSending(false);

      // Auto reply in chat
      setChatHistory((prev) => [
        ...prev,
        {
          from: 'rb',
          text: "✅ Great! Opening WhatsApp so we can continue this conversation there...",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // Open WhatsApp deep link
      const encoded = encodeURIComponent(trimmed);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendToWhatsApp();
    }
  };

  const handleQuickReply = (text) => {
    sendToWhatsApp(text);
  };

  // ── Render chat bubble text (simple **bold** support) ──
  const renderBubbleText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── WhatsApp Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '24px',
              width: 'min(380px, calc(100vw - 32px))',
              zIndex: 9999,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}>
              {/* Avatar */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
                border: '2px solid rgba(255,255,255,0.4)',
              }}>💬</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>RB-Tech Support</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                  Online · Typically replies instantly
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{WHATSAPP_DISPLAY}</span>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  aria-label="Close WhatsApp chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              background: '#0d1117',
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(37,211,102,0.04) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(18,140,126,0.04) 0%, transparent 50%)
              `,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 200,
            }}>
              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: 8,
                  }}
                >
                  {msg.from === 'rb' && (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: '#25D366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, flexShrink: 0,
                    }}>💬</div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg, #25D366, #128C7E)'
                      : 'rgba(255,255,255,0.07)',
                    border: msg.from === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {renderBubbleText(msg.text)}
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, textAlign: 'right' }}>
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isSending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: '#25D366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                    }}>💬</div>
                    <div style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px 16px 16px 4px',
                      padding: '12px 16px',
                      display: 'flex', gap: 4, alignItems: 'center',
                    }}>
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366', display: 'block' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div style={{
              background: '#0d1117',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 12px',
              display: 'flex',
              gap: 6,
              flexWrap: 'nowrap',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              flexShrink: 0,
            }}>
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(reply)}
                  style={{
                    background: 'rgba(37,211,102,0.08)',
                    border: '1px solid rgba(37,211,102,0.2)',
                    borderRadius: 20,
                    padding: '5px 12px',
                    color: '#25D366',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(37,211,102,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)';
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div style={{
              background: '#111827',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              flexShrink: 0,
            }}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: 13.5,
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                  maxHeight: 100,
                  overflowY: 'auto',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(37,211,102,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                }}
              />
              <button
                onClick={() => sendToWhatsApp()}
                disabled={!message.trim() || isSending}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: message.trim() && !isSending
                    ? 'linear-gradient(135deg, #25D366, #128C7E)'
                    : 'rgba(255,255,255,0.08)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: message.trim() && !isSending ? 'pointer' : 'not-allowed',
                  color: '#fff',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  boxShadow: message.trim() && !isSending
                    ? '0 4px 15px rgba(37,211,102,0.3)'
                    : 'none',
                }}
                aria-label="Send message to WhatsApp"
              >
                <Send size={17} />
              </button>
            </div>

            {/* WhatsApp branding footer */}
            <div style={{
              background: '#0d1117',
              padding: '8px',
              textAlign: 'center',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              flexShrink: 0,
            }}>
              Powered by <span style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp</span> · Messages go directly to our team
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Buttons ── */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9997,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              title="Scroll to top"
              aria-label="Scroll to top"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 25px rgba(59,130,246,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(!showModal)}
          title="Chat on WhatsApp"
          aria-label="Open WhatsApp chat"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: showModal
              ? 'linear-gradient(135deg, #128C7E, #075E54)'
              : 'linear-gradient(135deg, #25D366, #128C7E)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: showModal
              ? '0 8px 25px rgba(18,140,126,0.5), 0 0 0 1px rgba(255,255,255,0.08)'
              : '0 8px 25px rgba(37,211,102,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          <AnimatePresence mode="wait">
            {showModal ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {/* WhatsApp SVG icon */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse ring animation on WhatsApp button */}
        {!showModal && (
          <motion.div
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 0,
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '2px solid #25D366',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </>
  );
}
