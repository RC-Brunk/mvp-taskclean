import React, { useState, useMemo } from 'react';
import './UnitDetailModal.css';
import { 
  FaTimes, FaUser, FaCalendarAlt, FaClock, FaBed, FaCheck, 
  FaSearchPlus, FaFlag, FaExclamationTriangle 
} from 'react-icons/fa';
import { GiTowel } from "react-icons/gi";
import { MdOutlineLocalDrink } from "react-icons/md";

function UnitDetailModal({ unit, task, isLoading, onClose, onNotifyMaintenance, onReleaseUnit }) {
  const [activeTab, setActiveTab] = useState(0);

  // Simulação de dados de checklist e abas, pois ainda não vêm do backend.
  // No futuro, isso virá da `task.checklists`.
  const tabs = useMemo(() => [
    { name: 'Troca de toalhas', icon: GiTowel, content: {
      quarto: [
        { id: 'q1', text: 'Desligar aparelhos eletrônicos', completed: true },
        { id: 'q2', text: 'Conferir o funcionamento dos aparelhos', completed: true },
        { id: 'q3', text: 'Recolher todo lixo do banheiro e do UH', completed: true },
        { id: 'q4', text: 'Recolher Enxoval e Toalha', completed: true },
      ],
      banheiro: [],
    }},
    { name: 'Troca de roupa de cama', icon: FaBed, content: { quarto: [], banheiro: [] } },
    { name: 'Abastecimento de amenities', icon: MdOutlineLocalDrink, content: { quarto: [], banheiro: [] } },
  ], []);

  // Simulação de imagens
  const images = [
    'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Foto+1',
    'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Foto+2'
  ];

  if (!unit) return null;

  const renderContent = () => {
    if (isLoading) {
      return <p style={{ padding: '20px' }}>Carregando detalhes...</p>;
    }

    const activeTabData = tabs[activeTab].content;

    return (
      <>
        <div className="unit-modal-header">
          <button className="unit-modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2>Apartamento {unit.name}</h2>
          <div className="unit-modal-meta">
            <div className="meta-item">
              <FaUser />
              <span>Camareira: {task?.cleaner?.fullName || 'Não atribuída'}</span>
            </div>
            <div className="meta-item">
              <FaCalendarAlt />
              <span>Data: {task ? new Date(task.startedAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>Tempo de arrumação: 20min</span> {/* Valor simulado */}
            </div>
          </div>
        </div>

        <div className="unit-modal-tabs">
          {tabs.map((tab, index) => (
            <div 
              key={index} 
              className={`tab-item ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <tab.icon size={24} />
              <span>{tab.name}</span>
            </div>
          ))}
        </div>

        <div className="unit-modal-body">
          {/* Coluna Esquerda */}
          <div className="left-column">
            <div className="checklist-section">
              <h3><FaBed /> Quarto:</h3>
              <ul className="checklist">
                {activeTabData.quarto.map(item => (
                  <li key={item.id} className="checklist-item">
                    <FaCheck className="icon-check" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="image-gallery">
              {images.map((img, index) => (
                <div key={index} className="image-thumbnail">
                  <img src={img} alt={`Prova ${index + 1}`} />
                  <div className="overlay"><FaSearchPlus size={24} /></div>
                </div>
              ))}
            </div>

            <div className="checklist-section">
              <h3><FaFlag /> Banheiro:</h3>
              {/* Lista de tarefas do banheiro aqui, se houver */}
            </div>
          </div>

          <div className="divider"></div>

          {/* Coluna Direita */}
          <div className="right-column">
            {task?.maintenance_required && (
              <>
                <div className="maintenance-box">
                  <div className="maintenance-header">
                    <FaExclamationTriangle />
                    <span>Manutenção necessária!</span>
                  </div>
                  <p className="maintenance-description">
                    {task.maintenance_notes || 'Nenhuma observação fornecida.'}
                  </p>
                </div>
                <button className="maintenance-button" onClick={() => onNotifyMaintenance(unit, task)}>
                  Notificar equipe de manutenção
                </button>
              </>
            )}
          </div>
        </div>

        {/* Renderiza o rodapé apenas se houver uma tarefa para ser liberada */}
        {task && (
          <div className="unit-modal-footer" onClick={() => onReleaseUnit(unit, task)}>
            Liberar Apartamento
          </div>
        )}
      </>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="unit-modal-content" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
}

export default UnitDetailModal;
