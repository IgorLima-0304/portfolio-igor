import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    const colors = {
        blue: '#00d2ff',
        purple: '#9d50bb',
        textGray: '#888888',
        darkBg: '#05070a',
    };

    useEffect(() => {
        const q = query(collection(db, 'certificados'), orderBy('ano', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCertificates(data);
            setLoading(false);
        }, (error) => {
            console.error('Erro ao sincronizar certificados:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{
                textAlign: 'center',
                color: colors.blue,
                padding: '100px 20px',
                fontFamily: 'monospace',
                backgroundColor: colors.darkBg,
            }}>
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    CARREGANDO_CREDENCIAIS...
                </motion.span>
            </div>
        );
    }

    if (certificates.length === 0) return null;

    return (
        <section id="certificates" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '80px' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '2.5rem',
                        letterSpacing: '8px',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}
                >
                    Meus{' '}
                    <span style={{ color: colors.blue, textShadow: `0 0 10px ${colors.blue}` }}>
                        Certificados
                    </span>
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                        height: '4px',
                        background: `linear-gradient(to right, ${colors.blue}, ${colors.purple})`,
                        margin: '20px auto',
                    }}
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                        color: colors.textGray,
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        letterSpacing: '2px',
                    }}
                >
                    [ CREDENCIAIS_VALIDADAS // PROTOCOLO_DE_CERTIFICAÇÃO ]
                </motion.p>
            </header>

            {/* Grid de Certificados */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                }}
            >
                {certificates.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -8,
                            borderColor: colors.blue,
                            boxShadow: `0 0 25px ${colors.blue}22, 0 20px 40px rgba(0,0,0,0.5)`,
                        }}
                        style={{
                            background: 'rgba(255,255,255,0.02)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'border-color 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header do Card */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                            <div
                                style={{
                                    fontSize: '1.6rem',
                                    color: colors.blue,
                                    filter: `drop-shadow(0 0 6px ${colors.blue})`,
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}
                            >
                                <FaCertificate />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4
                                    style={{
                                        color: '#fff',
                                        margin: '0 0 4px 0',
                                        fontSize: '1.15rem',
                                        fontWeight: '700',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {cert.titulo}
                                </h4>
                                <span
                                    style={{
                                        fontSize: '0.8rem',
                                        fontFamily: 'monospace',
                                        color: colors.blue,
                                        letterSpacing: '1px',
                                    }}
                                >
                                    {cert.instituicao?.toUpperCase()} // {cert.ano}
                                </span>
                            </div>
                        </div>

                        {/* Descrição */}
                        <p
                            style={{
                                color: colors.textGray,
                                fontSize: '0.9rem',
                                lineHeight: '1.7',
                                marginBottom: '20px',
                                flex: 1,
                            }}
                        >
                            {cert.descricao}
                        </p>

                        {/* Footer do Card */}
                        {cert.link && (
                            <div
                                style={{
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    paddingTop: '15px',
                                    marginTop: 'auto',
                                }}
                            >
                                <motion.a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ color: colors.blue, x: 3 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: colors.textGray,
                                        textDecoration: 'none',
                                        fontSize: '0.8rem',
                                        fontFamily: 'monospace',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.3s',
                                    }}
                                >
                                    <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                                    Verificar Credencial
                                </motion.a>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Rodapé da seção */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                style={{
                    textAlign: 'center',
                    marginTop: '60px',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    color: `${colors.blue}88`,
                    letterSpacing: '3px',
                }}
            >
                [ {certificates.length} CREDENCIAIS_REGISTRADAS // STATUS: ATIVO ]
            </motion.div>
        </section>
    );
};

export default Certificates;
