// c:\taksclean-portfolio\frontend-web\src\components\StatusCard.jsx
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { BiLoaderCircle } from "react-icons/bi";
import { GiBroom, GiPadlock } from "react-icons/gi";
import './StatusCard.css'; // Importa o novo arquivo CSS

function StatusCard({ title, count, percentage, type }) {
  // Mapear ícones por tipo
  const getIcon = (type) => {
    const iconMap = {
      'clean': FaCheck,
      'in_progress': BiLoaderCircle,
      'dirty': GiBroom,
      'blocked': GiPadlock,
    };
    // Usa um ícone padrão caso o tipo não seja encontrado
    return iconMap[type] || FaCheck; 
  };

  const IconComponent = getIcon(type);
  
  // Extrai o valor numérico da porcentagem para o estilo inline da barra
  const percentageValue = percentage ? parseInt(percentage.replace('%', '')) : 0;

  return (
    <div 
      className="status-card"
      data-type={type} // Usa data-attribute para o tema do CSS
    >
      <div className="status-card-content">
        <div className="status-card-icon-container">
          <IconComponent className="status-card-icon" />
        </div>
        <div className="status-card-count">{count}</div>
        <div className="status-card-title">{title}</div>
      </div>
      
      {/* Barra de progresso com porcentagem sempre no centro */}
      <div className="status-card-progress-container">
        <div 
          className="status-card-progress-bar" 
          style={{ width: `${percentageValue}%` }} // Este estilo inline é aceitável para valores dinâmicos
        ></div>
        {percentage && <span className="status-card-percentage-text">{percentage}</span>}
      </div>
    </div>
  );
}

export default StatusCard;
