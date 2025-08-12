import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnitCard from '../components/UnitCard';
import UnitDetailModal from '../components/UnitDetailModal';
import './UnitsPage.css';

const API_URL = 'http://localhost:3001/api'; 

function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Efeito para buscar todas as unidades quando o componente é montado
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_URL}/units`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUnits(response.data);
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
        // Adicionar tratamento de erro para o usuário, se necessário
      }
    };
    fetchUnits();
  }, []);

  // Função chamada ao clicar em um card de unidade
  const handleCardClick = async (unit) => {
    setSelectedUnit(unit);
    setIsModalLoading(true);
    setTaskDetail(null); // Limpa detalhes da tarefa anterior

    try {
      const token = localStorage.getItem('authToken');
      // Busca a tarefa ativa para a unidade selecionada
      const response = await axios.get(`${API_URL}/tasks/unit/${unit.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaskDetail(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // É normal não encontrar uma tarefa, então apenas logamos isso.
        console.log(`Nenhuma tarefa ativa para a unidade ${unit.name}`);
      } else {
        console.error("Erro ao buscar detalhes da tarefa:", error);
      }
    } finally {
      setIsModalLoading(false);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedUnit(null);
    setTaskDetail(null);
  };

  // Funções de placeholder para as ações do modal
  const handleNotifyMaintenance = (unit, task) => {
    alert(`Notificar manutenção para o Apto ${unit.name}. Tarefa ID: ${task.id}`);
  };

  const handleReleaseUnit = (unit, task) => {
    alert(`Liberar o Apto ${unit.name}. Tarefa ID: ${task.id}`);
    handleCloseModal();
  };

  return (
    <div className="units-page-container">
      <h1 className="page-title">Todas as Unidades</h1>
      <div className="units-grid">
        {units.map(unit => (
          <UnitCard key={unit.id} unit={unit} onClick={() => handleCardClick(unit)} />
        ))}
      </div>

      {selectedUnit && (
        <UnitDetailModal unit={selectedUnit} task={taskDetail} isLoading={isModalLoading} onClose={handleCloseModal} onNotifyMaintenance={handleNotifyMaintenance} onReleaseUnit={handleReleaseUnit} />
      )}
    </div>
  );
}

export default UnitsPage;

