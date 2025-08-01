// frontend-web/src/components/UnitCard.jsx
import React from 'react';

function UnitCard({ unit }) {
  // Mapeia o status do backend para cores e texto
  const statusInfo = {
    dirty: { text: 'Para Arrumar', color: '#fff1f0', borderColor: '#ffa39e' },
    in_progress: { text: 'Em Arrumação', color: '#fffbe6', borderColor: '#ffe58f' },
    clean: { text: 'Arrumado', color: '#e6f7ff', borderColor: '#91d5ff' },
    blocked: { text: 'Bloqueado', color: '#f6f6f6', borderColor: '#d9d9d9' },
  };

  // --- NOVA FUNÇÃO ---
  // Extrai apenas os números do nome da unidade para formatar a exibição
  const formatUnitName = (name) => {
    const numbers = name.match(/\d+/g); // Encontra todos os números no nome
    if (numbers) {
      return `Apto. ${numbers.join('')}`; // Retorna "Apto." seguido do número
    }
    return name; // Se não encontrar números, retorna o nome original
  };
  // --- FIM DA NOVA FUNÇÃO ---

  const styles = {
    card: {
      border: `1px solid ${statusInfo[unit.status]?.borderColor || '#ccc'}`,
      backgroundColor: statusInfo[unit.status]?.color || '#fff',
      padding: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
    name: {
      fontWeight: 'bold',
      fontSize: '18px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    status: {
      fontSize: '14px',
      marginTop: '5px',
    }
  };

  const handleMouseEnter = (e) => { e.currentTarget.style.transform = 'scale(1.03)'; };
  const handleMouseLeave = (e) => { e.currentTarget.style.transform = 'scale(1)'; };

  return (
    <div 
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Usa a nova função para formatar o nome */}
      <div style={styles.name}>{formatUnitName(unit.name)}</div>
      <div style={styles.status}>{statusInfo[unit.status]?.text || unit.status}</div>
    </div>
  );
}

export default UnitCard;