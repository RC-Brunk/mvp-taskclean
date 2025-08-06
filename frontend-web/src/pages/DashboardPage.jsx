// frontend-web/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StatusCard from '../components/StatusCard';
import UnitCard from '../components/UnitCard';
import TaskDetailModal from '../components/TaskDetailModal';
import MaintenanceAlert from '../components/MaintenanceAlert'; // 1. Importa o novo componente de alerta
import './DashboardPage.css';
import bannerImage from '../assets/HotelAtlantico.png'; // 2. Importa a imagem do banner


function DashboardPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/units', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUnits(response.data);
      } catch (err) {
        setError('Falha ao buscar unidades.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const handleUnitClick = async (unit) => {
    setSelectedUnit(unit);
    setIsModalLoading(true);
    setActiveTask(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.get(`/units/${unit.id}/active-task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveTask(response.data);
    } catch (error) {
      console.log(`Nenhuma tarefa ativa para a unidade ${unit.name}.`);
      setActiveTask(null);
    } finally {
      setIsModalLoading(false);
    }
  };

  const statusCounts = {
  clean: units.filter(unit => unit.status === 'clean').length,
  dirty: units.filter(unit => unit.status === 'dirty').length,
  in_progress: units.filter(unit => unit.status === 'in_progress').length,
  blocked: units.filter(unit => unit.status === 'blocked').length,
};

// Calcular o total de apartamentos
const totalUnits = units.length;

// Função para calcular porcentagem
const calculatePercentage = (count) => {
  if (totalUnits === 0) return '0%';
  return `${Math.round((count / totalUnits) * 100)}%`;
};

  // Lógica para verificar se há alguma unidade com necessidade de manutenção
  // Por enquanto, simulamos que 'blocked' significa manutenção.
  const needsMaintenance = units.some(unit => unit.status === 'blocked');

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // Estilos para o botão principal
  const styles = {
    mainButton: {
        backgroundColor: '#d9534f', // Um tom de vermelho
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    }
  }

  
  return (
  <div className="dashboard-container">
    {/* Banner com imagem de fundo - SEM título */}
    <div className="banner-hero" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="banner-content">     {/* Botão Vermelho */}
        <button className="banner-action-button">
          Liberar apartamentos para limpeza
        </button>
      </div>
    </div>

    <div className="page-title-section">
      <h1>Sistema Camareiras</h1>
    </div>

    <div className="status-cards-container">
      <StatusCard 
        title="aptos arrumados" 
        count={statusCounts.clean} 
        color="#e6f7ff" 
        type="clean"
        percentage={calculatePercentage(statusCounts.clean)}
      />
      <StatusCard 
        title="aptos em arrumação" 
        count={statusCounts.in_progress} 
        color="#fffbe6" 
        type="in_progress"
        percentage={calculatePercentage(statusCounts.in_progress)}
      />
      <StatusCard 
        title="aptos para arrumar" 
        count={statusCounts.dirty} 
        color="#fff1f0" 
        type="dirty"
        percentage={calculatePercentage(statusCounts.dirty)}
      />
      <StatusCard 
        title="aptos bloqueados" 
        count={statusCounts.blocked} 
        color="#f6f6f6" 
        type="blocked"
        percentage={calculatePercentage(statusCounts.blocked)}
      />
    </div>

    {needsMaintenance && (
      <div className="maintenance-alert">
        <MaintenanceAlert />
      </div>
    )}

    <div className="units-section">
      <h3>Apartamentos</h3>
      <div className="units-grid-container">
        {units.map(unit => (
          <div key={unit.id} onClick={() => handleUnitClick(unit)}>
            <UnitCard unit={unit} />
          </div>
        ))}
      </div>
    </div>
    
    <TaskDetailModal 
      unit={selectedUnit}
      task={activeTask}
      isLoading={isModalLoading}
      onClose={() => setSelectedUnit(null)} 
    />
  </div>
);
}


export default DashboardPage;