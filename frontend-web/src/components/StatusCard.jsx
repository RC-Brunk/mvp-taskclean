// frontend-web/src/components/StatusCard.jsx
import React from 'react';
import { FaCheck, FaClock, FaExclamationTriangle, } from 'react-icons/fa';
import { BiLoaderCircle } from "react-icons/bi";
import { GiBroom, GiPadlock } from "react-icons/gi";


function StatusCard({ title, count, color = '#fff', percentage, type }) {
  // Cores específicas baseadas no PDF
  const getCardColors = (color) => {
    const colorMap = {
      '#e6f7ff': { bg: '#ffffffff', border: '#bdbdbdff', text: '#07aa2bff', progress: '#07aa2bff' }, // Verde
      '#fffbe6': { bg: '#ffffffff', border: '#bdbdbdff', text: '#595959ff', progress: '#595959ff' }, // Cinza
      '#fff1f0': { bg: '#ffffffff', border: '#bdbdbdff', text: '#000000ff', progress: '#000000ff' }, // Preto
      '#f6f6f6': { bg: '#ffffffff', border: '#bdbdbdff', text: '#ffae00ff', progress: '#ffae00ff' }, // Laranja
    };
    return colorMap[color] || { bg: color, border: '#ccc', text: '#333', progress: '#333' };
  };

  // Mapear ícones por tipo
  const getIcon = (type) => {
    const iconMap = {
      'clean': FaCheck,        // Check para arrumados
      'in_progress': BiLoaderCircle,        // Relógio para em arrumação
      'dirty': GiBroom, // Alerta para arrumar
      'blocked': GiPadlock,              // Cadeado para bloqueados
    };
    return iconMap[type] || FaCheckCircle;
  };

  const colors = getCardColors(color);
  const IconComponent = getIcon(type);
  
  // Extrair o valor numérico da porcentagem
  const percentageValue = percentage ? parseInt(percentage.replace('%', '')) : 0;

  const styles = {
    card: {
      backgroundColor: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px 20px 0 20px',
      textAlign: 'center',
      position: 'relative',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: '15px',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    icon: {
      fontSize: '24px',
      color: colors.text,
    },
    count: {
      fontSize: '35px',
      fontWeight: '700',
      margin: '0 0 8px 0',
      color: colors.text,
      lineHeight: '1',
    },
    title: {
      fontSize: '20px',
      color: colors.text,
      margin: 0,
      fontWeight: '800',
      textTransform: 'lowercase',
    },
    progressContainer: {
      position: 'relative',
      height: '15px',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.progress,
      width: `${percentageValue}%`,
      transition: 'width 0.8s ease-in-out',
      borderRadius: '12px',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
    },
    percentageText: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '12px',
      color: 'white',
      fontWeight: '700',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
      zIndex: 2,
      textAlign: 'center',
      width: '100%',
      
    }
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }}
    >
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <IconComponent style={styles.icon} />
        </div>
        <div style={styles.count}>{count}</div>
        <div style={styles.title}>{title}</div>
      </div>
      
      {/* Barra de progresso com porcentagem sempre no centro */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}></div>
          {percentage && <span style={styles.percentageText}>{percentage}</span>}
      </div>
    </div>
  );
}
export default StatusCard;

      

