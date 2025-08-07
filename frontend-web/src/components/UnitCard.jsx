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
       
      color: '#ffffffff', 
      
      Icon: IoIosBed 
    },
    in_progress: { 
       
      color: '#ffffffff', 
      
      Icon: FaSyncAlt 
    },
    clean: { 
       
      color: '#ffffffff', 
      
      Icon: FaCheckCircle 
    },
    blocked: { 
      
      color: '#ffffffff', 
      
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
        <currentStatus.Icon size={60} color="#555" />
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
