import React from 'react';
import './UnitCard.css';
import { FaCheckCircle, FaExclamationTriangle, FaLock, FaSyncAlt } from 'react-icons/fa';
import { IoIosBed } from "react-icons/io";
import { GiBroom, GiPadlock } from 'react-icons/gi'; // Importa o ícone da vassoura
import { BiLoaderCircle } from "react-icons/bi"; // Importa o ícone do carregamento
import { FaCheck } from 'react-icons/fa';


function UnitCard({ unit }) {
  const statusInfo = {
    dirty: { 
      text: 'Para Arrumar', 
      color: '#fff1f0', 
      borderColor: '#ffccc7', 
      Icon: IoIosBed 
    },
    in_progress: { 
      text: 'Em Arrumação', 
      color: '#fffbe6', 
      borderColor: '#ffe58f', 
      Icon: FaSyncAlt 
    },
    clean: { 
      text: 'Arrumado', 
      color: '#e6f7ff', 
      borderColor: '#91d5ff', 
      Icon: FaCheckCircle 
    },
    blocked: { 
      text: 'Bloqueado', 
      color: '#f6f6f6', 
      borderColor: '#d9d9d9', 
      Icon: FaLock 
    },
  };

  const currentStatus = statusInfo[unit.status] || { text: unit.status, color: '#fff', borderColor: '#ccc', Icon: FaExclamationTriangle };

  const formatUnitName = (name) => {
    const numbers = name.match(/\d+/g);
    if (numbers) return `Apto. ${numbers.join('')}`;
    return name;
  };

  const cardStyle = {
    borderColor: currentStatus.borderColor,
    backgroundColor: currentStatus.color,
  };

  return (
    <div className="unit-card" style={cardStyle}>
      <div className="unit-card-icon">
        <currentStatus.Icon size={24} color="#555" />
      </div>
      {unit.status === 'dirty' && (
        <div className="unit-card-broom-icon">
          <GiBroom size={35} color="#000000ff" />
        </div>
      )}

      {unit.status === 'in_progress' && (
        <div className="unit-card-broom-icon">
          <BiLoaderCircle size={35} color="#595959ff" />
        </div>
      )}
      
        
      <div className="unit-card-name">{formatUnitName(unit.name)}</div>
      <div className="unit-card-status">{currentStatus.text}</div>
    </div>
  );
}

export default UnitCard;
