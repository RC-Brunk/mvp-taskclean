// frontend-web/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StatusCard from '../components/StatusCard';
import UnitCard from '../components/UnitCard';
import TaskDetailModal from '../components/TaskDetailModal'; // 1. Importe o novo componente Modal

function DashboardPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null); // 2. Novo estado para controlar a unidade selecionada

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

  const statusCounts = {
    clean: units.filter(unit => unit.status === 'clean').length,
    dirty: units.filter(unit => unit.status === 'dirty').length,
    in_progress: units.filter(unit => unit.status === 'in_progress').length,
    blocked: units.filter(unit => unit.status === 'blocked').length,
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Visão geral dos apartamentos.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <StatusCard title="Aptos Arrumados" count={statusCounts.clean} color="#e6f7ff" />
        <StatusCard title="Aptos para Arrumar" count={statusCounts.dirty} color="#fff1f0" />
        <StatusCard title="Aptos em Arrumação" count={statusCounts.in_progress} color="#fffbe6" />
        <StatusCard title="Aptos Bloqueados" count={statusCounts.blocked} color="#f6f6f6" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Apartamentos</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px', 
          marginTop: '16px' 
        }}>
          {units.map(unit => (
            // 3. Adiciona o evento onClick a cada card
            <div key={unit.id} onClick={() => setSelectedUnit(unit)}>
              <UnitCard unit={unit} />
            </div>
          ))}
        </div>
      </div>
      
      {/* 4. Renderiza o Modal condicionalmente */}
      <TaskDetailModal 
        unit={selectedUnit} 
        onClose={() => setSelectedUnit(null)} 
      />
    </div>
  );
}

export default DashboardPage;