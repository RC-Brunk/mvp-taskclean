// frontend-web/src/components/TaskDetailModal.jsx
import React from 'react';

// O modal recebe a unidade selecionada e uma função para fechá-lo
function TaskDetailModal({ unit, onClose }) {
  if (!unit) return null; // Não renderiza nada se nenhuma unidade for selecionada

  // Estilos para o modal
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      width: '800px', // Largura inspirada no PDF
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
    },
    header: {
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}> {/* Impede que o clique dentro do modal o feche */}
        <button style={styles.closeButton} onClick={onClose}>&times;</button>
        <div style={styles.header}>
          <h2>Apartamento {unit.name}</h2>
          <p>Detalhes da tarefa serão exibidos aqui.</p>
        </div>
        {/* O conteúdo detalhado da tarefa (checklist, fotos, etc.) virá aqui */}
      </div>
    </div>
  );
}

export default TaskDetailModal;