// frontend-web/src/components/StatusCard.jsx
import React from 'react';

function StatusCard({ title, count, color = '#fff' }) {
  const styles = {
    card: {
      backgroundColor: color,
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      flex: 1, // Para que todos os cards tenham o mesmo tamanho
      textAlign: 'center',
    },
    count: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: 0,
    },
    title: {
      fontSize: '16px',
      color: '#555',
      margin: 0,
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.count}>{count}</h2>
      <p style={styles.title}>{title}</p>
    </div>
  );
}

export default StatusCard;