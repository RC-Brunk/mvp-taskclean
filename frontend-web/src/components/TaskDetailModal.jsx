import React from 'react';

function TaskDetailModal({ unit, task, isLoading, onClose }) {
  if (!unit) return null;

  const styles = { /* ... (estilos continuam os mesmos) ... */ };

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando detalhes da tarefa...</p>;
    }
    if (task) {
      return (
        <div>
          <p><strong>Camareira:</strong> {task.cleaner?.fullName || 'Não atribuída'}</p>
          <p><strong>Status da Tarefa:</strong> {task.status}</p>
          <p><strong>Tipo de Limpeza:</strong> {task.type}</p>
          {/* No futuro, aqui renderizaremos o checklist, as fotos, etc. */}
        </div>
      );
    }
    return <p>Nenhuma tarefa de limpeza ativa para este apartamento.</p>;
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>&times;</button>
        <div style={styles.header}>
          <h2>Apartamento {unit.name}</h2>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
export default TaskDetailModal;