// frontend-web/src/components/MaintenanceAlert.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Usando um ícone de alerta

function MaintenanceAlert() {
  const styles = {
    alertBox: {
      backgroundColor: '#fffbe6',
      border: '1px solid #ffe58f',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#d46b08',
      fontWeight: 'bold',
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.alertBox}>
      <FaExclamationTriangle />
      <span>Atenção: alguns apartamentos necessitam de manutenção</span>
    </div>
  );
}

export default MaintenanceAlert;