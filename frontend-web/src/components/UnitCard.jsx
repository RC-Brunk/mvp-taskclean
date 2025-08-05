// frontend-web/src/components/UnitCard.jsx
import React from 'react';
import './UnitCard.css'; // Importa nosso novo arquivo de estilo
// Importa os ícones que vamos usar
import { FaBed, FaCheckCircle, FaExclamationTriangle, FaLock, FaSyncAlt } from 'react-icons/fa';

function UnitCard({ unit }) {
  // Mapeia o status do backend para cores, texto e agora ÍCONES
  const statusInfo = {
    dirty: { text: 'Para Arrumar', color: '#fff1f0', borderColor: '#ffa39e', Icon: FaBed },
    in_progress: { text: 'Em Arrumação', color: '#fffbe6', borderColor: '#ffe58f', Icon: FaSyncAlt },
    clean: { text: 'Arrumado', color: '#e6f7ff', borderColor: '#91d5ff', Icon: FaCheckCircle },
    blocked: { text: 'Bloqueado', color: '#f6f6f6', borderColor: '#d9d9d9', Icon: FaLock },
  };

  const currentStatus = statusInfo[unit.status] || { text: unit.status, color: '#fff', borderColor: '#ccc', Icon: FaExclamationTriangle };

  const formatUnitName = (name) => {
    const numbers = name.match(/\d+/g);
    if (numbers) return `Apto. ${numbers.join('')}`;
    return name;
  };

  // Estilos dinâmicos que dependem do status (cores)
  const cardStyle = {
    borderColor: currentStatus.borderColor,
    backgroundColor: currentStatus.color,
  };

  return (
    <div className="unit-card" style={cardStyle}>
      <div className="unit-card-icon">
        <currentStatus.Icon size={24} color="#555" />
      </div>
      <div className="unit-card-name">{formatUnitName(unit.name)}</div>
      <div className="unit-card-status">{currentStatus.text}</div>
    </div>
  );
}

export default UnitCard;