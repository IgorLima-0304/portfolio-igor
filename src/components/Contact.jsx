import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();

  const colors = {
    blue: '#00d2ff',
    purple: '#9d50bb',
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        alert("Mensagem enviada com sucesso!");
        form.current.reset();
      }, (error) => {

        console.log("Erro detalhado:", error);
        alert("Falha no envio. Verifique o console.");
      });
  };
  return (
    <section id="contact" style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Entre em <span style={{ color: colors.blue }}>Contato</span>
        </h2>
        <p style={{ color: '#888', marginTop: '10px', marginBottom: '30px' }}>
          Fale Comigo!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <motion.a href="https://github.com/IgorLima-0304" target="_blank" whileHover={{ scale: 1.2, color: colors.blue }} style={{ color: 'white', fontSize: '1.8rem' }}><FaGithub /></motion.a>
          <motion.a href="https://www.linkedin.com/in/igor-lima-579981289/" target="_blank" whileHover={{ scale: 1.2, color: colors.blue }} style={{ color: 'white', fontSize: '1.8rem' }}><FaLinkedin /></motion.a>
          <motion.a href="https://www.instagram.com/igorlma.dev/" target="_blank" whileHover={{ scale: 1.2, color: colors.blue }} style={{ color: 'white', fontSize: '1.8rem' }}><FaInstagram /></motion.a>
        </div>
      </motion.div>

      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            name="from_name"
            placeholder="Seu Nome"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="reply_to"
            placeholder="Seu E-mail"
            required
            style={inputStyle}
          />
        </div>
        <textarea
          name="message"
          placeholder="Sua Mensagem ou História"
          rows="5"
          required
          style={inputStyle}
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${colors.blue}` }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          style={{
            padding: '15px',
            border: 'none',
            borderRadius: '8px',
            background: `linear-gradient(to right, ${colors.blue}, ${colors.purple})`,
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          Enviar Mensagem
        </motion.button>
      </form>
    </section>
  );
};

const inputStyle = {
  flex: 1,
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  fontSize: '1rem',
  minWidth: '280px'
};

export default Contact;