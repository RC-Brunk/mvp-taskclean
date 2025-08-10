// c:\taksclean-portfolio\frontend-web\src\components\UnitCard.jsx
import React from 'react';
import './UnitCard.css';
import { FaCheckCircle, FaLock, FaSyncAlt } from 'react-icons/fa';
import { IoIosBed } from "react-icons/io";
import { GiBroom } from 'react-icons/gi';
import { BiLoaderCircle } from "react-icons/bi";

// Mapeamento de ícones fora do componente para melhor organização
const mainIconMap = {
  dirty: IoIosBed,
  in_progress: FaSyncAlt,
  clean: FaCheckCircle,
  blocked: FaLock,
};

const statusIconMap = {
  dirty: GiBroom,
  in_progress: BiLoaderCircle,
};

function UnitCard({ unit }) {
  // Seleciona os componentes de ícone com base no status da unidade
  const MainIcon = mainIconMap[unit.status];
  const StatusIcon = statusIconMap[unit.status];

  // Formata o nome da unidade
  const formatUnitName = (name) => {
    const numbers = name.match(/\d+/g);
    if (numbers) return `Apto. ${numbers.join('')}`;
    return name;
  };

  return (
    <div className="unit-card" data-status={unit.status}>
      {/* Renderiza o ícone de status (vassoura, etc.) se existir */}
      {StatusIcon && (
        <div className="unit-card-status-icon">
          <StatusIcon size={24} />
        </div>
      )}

      {/* Renderiza o ícone principal (cama, check, etc.) */}
      <div className="unit-card-main-icon">
        {MainIcon && <MainIcon size={50} />}
      </div>
      
      <div className="unit-card-name">{formatUnitName(unit.name)}</div>
    </div>
  );
}

export default UnitCard;
