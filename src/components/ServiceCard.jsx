import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ServiceCard = ({ service, index, onContact, highlighted, cardRef }) => {
  const Icon = service.icon;
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Enhanced color palette with gradients and transparency layers
  const colorPalette = {
    tours: {
      primary: "#2D5A27",
      secondary: "#4CAF50",
      accent: "#8BC34A",
      background: "#F8FFF7",
      border: "#E8F5E9",
      gradient: "linear-gradient(135deg, #2D5A27 0%, #4CAF50 50%, #8BC34A 100%)",
      abstractColor: "rgba(139, 195, 74, 0.08)",
      patternColor: "rgba(45, 90, 39, 0.04)"
    },
    "car-rentals": {
      primary: "#1976D2",
      secondary: "#2196F3",
      accent: "#42A5F5",
      background: "#F5FAFF",
      border: "#E3F2FD",
      gradient: "linear-gradient(135deg, #1976D2 0%, #2196F3 50%, #42A5F5 100%)",
      abstractColor: "rgba(66, 165, 245, 0.08)",
      patternColor: "rgba(25, 118, 210, 0.04)"
    },
    "airport-transfers": {
      primary: "#FF9800",
      secondary: "#FFB74D",
      accent: "#FFCC80",
      background: "#FFF8F0",
      border: "#FFF3E0",
      gradient: "linear-gradient(135deg, #FF9800 0%, #FFB74D 50%, #FFCC80 100%)",
      abstractColor: "rgba(255, 204, 128, 0.08)",
      patternColor: "rgba(255, 152, 0, 0.04)"
    },
    taxi: {
      primary: "#9C27B0",
      secondary: "#BA68C8",
      accent: "#CE93D8",
      background: "#FAF5FF",
      border: "#F3E5F5",
      gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 50%, #CE93D8 100%)",
      abstractColor: "rgba(206, 147, 216, 0.08)",
      patternColor: "rgba(156, 39, 176, 0.04)"
    },
    hotels: {
      primary: "#3F51B5",
      secondary: "#5C6BC0",
      accent: "#7986CB",
      background: "#F5F7FF",
      border: "#E8EAF6",
      gradient: "linear-gradient(135deg, #3F51B5 0%, #5C6BC0 50%, #7986CB 100%)",
      abstractColor: "rgba(121, 134, 203, 0.08)",
      patternColor: "rgba(63, 81, 181, 0.04)"
    },
    visa: {
      primary: "#795548",
      secondary: "#8D6E63",
      accent: "#A1887F",
      background: "#FDF6F0",
      border: "#EFEBE9",
      gradient: "linear-gradient(135deg, #795548 0%, #8D6E63 50%, #A1887F 100%)",
      abstractColor: "rgba(161, 136, 127, 0.08)",
      patternColor: "rgba(121, 85, 72, 0.04)"
    }
  };

  const colors = colorPalette[service.id] || colorPalette.tours;

  return (
    <div 
      className="svc-card-wrap" 
      style={{ 
        animationDelay: `${index * 0.06}s`,
        position: 'relative'
      }} 
      ref={cardRef}
    >
      <div
        className={`svc-card-inner${service.isPrimary ? " primary" : ""}`}
        style={{
          position: 'relative',
          zIndex: 1,
          borderColor: highlighted ? colors.accent : colors.border,
          backgroundColor: colors.background,
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1.5px solid ${highlighted ? colors.accent : colors.border}`,
          boxShadow: highlighted 
            ? `0 8px 32px ${colors.accent}20` 
            : '0 4px 24px rgba(0,0,0,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Layer 1: African-inspired geometric pattern background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}>
          {/* Asymmetric diamond pattern - inspired by African textile designs */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <pattern id={`diamond-${service.id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" 
                  fill="none" 
                  stroke={colors.patternColor} 
                  strokeWidth="1"
                  strokeDasharray="2,4"
                />
                <circle cx="30" cy="30" r="2" fill={colors.accent} opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#diamond-${service.id})`} />
          </svg>
        </div>

        {/* Layer 2: Organic abstract shapes - inspired by African landscapes */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {/* Large organic circle - top right */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '45%',
            height: '45%',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            background: `radial-gradient(circle at 30% 30%, ${colors.abstractColor}, transparent)`,
            filter: 'blur(30px)',
            transform: 'rotate(-15deg)',
          }} />
          
          {/* Medium organic blob - bottom left */}
          <div style={{
            position: 'absolute',
            bottom: '-5%',
            left: '-8%',
            width: '35%',
            height: '40%',
            borderRadius: '42% 58% 65% 35% / 40% 45% 55% 60%',
            background: `radial-gradient(circle at 70% 70%, ${colors.abstractColor}, transparent)`,
            filter: 'blur(25px)',
            transform: 'rotate(10deg)',
          }} />

          {/* Small accent blob - bottom right */}
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '-3%',
            width: '20%',
            height: '25%',
            borderRadius: '60% 40% 35% 65% / 45% 55% 45% 55%',
            background: `radial-gradient(circle at 40% 60%, ${colors.accent}15, transparent)`,
            filter: 'blur(20px)',
          }} />
        </div>

        {/* Layer 3: African architectural geometric lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.4
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Top-left corner architectural lines */}
            <g transform="translate(20, 20)" opacity="0.3">
              <line x1="0" y1="0" x2="40" y2="0" stroke={colors.primary} strokeWidth="1.5"/>
              <line x1="0" y1="0" x2="0" y2="40" stroke={colors.primary} strokeWidth="1.5"/>
              <line x1="40" y1="0" x2="20" y2="20" stroke={colors.accent} strokeWidth="1"/>
              <line x1="0" y1="40" x2="20" y2="20" stroke={colors.accent} strokeWidth="1"/>
              <circle cx="20" cy="20" r="3" fill={colors.accent} opacity="0.5"/>
            </g>

            {/* Bottom-right stepped pattern (like African art) */}
            <g transform="translate(85%, 85%)" opacity="0.25">
              <path d="M-30,10 L-20,10 L-20,0 L-10,0 L-10,-10 L0,-10" 
                fill="none" stroke={colors.secondary} strokeWidth="1.5"/>
              <path d="M-30,20 L-15,20 L-15,10 L-5,10 L-5,0 L0,0" 
                fill="none" stroke={colors.accent} strokeWidth="1"/>
            </g>

            {/* Asymmetric diagonal lines - inspired by African modern art */}
            <g opacity="0.2">
              <line x1="80%" y1="0" x2="100%" y2="30%" stroke={colors.primary} strokeWidth="1"/>
              <line x1="75%" y1="0" x2="100%" y2="40%" stroke={colors.accent} strokeWidth="0.8" strokeDasharray="4,6"/>
              <line x1="0" y1="70%" x2="30%" y2="100%" stroke={colors.secondary} strokeWidth="1"/>
              <line x1="5%" y1="65%" x2="25%" y2="100%" stroke={colors.accent} strokeWidth="0.8" strokeDasharray="3,5"/>
            </g>
          </svg>
        </div>

        {/* Content wrapper with z-index to appear above backgrounds */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Icon and Name section */}
          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 18, cursor: 'pointer' }}
            onClick={toggleExpanded}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                flexShrink: 0,
                background: service.isPrimary 
                  ? `${colors.gradient}` 
                  : `linear-gradient(135deg, ${colors.background}, ${colors.background})`,
                border: `2px solid ${service.isPrimary ? 'transparent' : colors.accent}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: service.isPrimary 
                  ? `0 4px 16px ${colors.accent}40`
                  : `0 2px 8px rgba(0,0,0,0.04)`,
                backdropFilter: 'blur(4px)',
              }}
            >
              <Icon 
                aria-hidden="true" 
                style={{ 
                  width: 26, 
                  height: 26, 
                  color: service.isPrimary ? '#ffffff' : colors.primary,
                  filter: service.isPrimary ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
                }} 
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: service.isPrimary ? colors.primary : "#2D3748",
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.name}
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  fontFamily: "'Dancing Script', cursive",
                  color: service.isPrimary ? colors.accent : colors.secondary,
                  background: `linear-gradient(90deg, ${colors.accent}20, transparent)`,
                  padding: '2px 12px 2px 0',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                {service.tagline}
              </div>
            </div>
          </div>

          {/* Description with subtle text treatment */}
          <p
            style={{
              fontSize: 14.5,
              color: "#4A5568",
              lineHeight: 1.6,
              fontWeight: 400,
              margin: "0 0 16px",
              position: 'relative',
              paddingLeft: '12px',
              borderLeft: `2px solid ${colors.accent}40`,
            }}
          >
            {service.description}
          </p>

          {/* Expand/Collapse indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 8,
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              style={{
                background: `${colors.accent}10`,
                border: `1px solid ${colors.accent}20`,
                borderRadius: '20px',
                cursor: 'pointer',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: colors.primary,
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              aria-label={expanded ? "Collapse details" : "Expand details"}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${colors.accent}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${colors.accent}10`;
              }}
            >
              {expanded ? 'Show Less' : 'Show More'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {expanded ? (
                  <path d="M18 15l-6-6-6 6" />
                ) : (
                  <path d="M6 9l6 6 6-6" />
                )}
              </svg>
            </button>
          </div>

          {/* Highlights with enhanced design */}
          <div
            style={{
              display: expanded ? 'flex' : 'none',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 24,
              padding: '16px',
              background: `${colors.accent}08`,
              borderRadius: '12px',
              border: `1px solid ${colors.accent}15`,
            }}
          >
            {service.highlights && service.highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 10,
                  animation: expanded ? `slideIn 0.3s ease ${idx * 0.05}s both` : 'none'
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '6px',
                  background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                </div>
                <span style={{ 
                  fontSize: '13.5px', 
                  color: '#4A5568',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}>
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button with gradient treatment */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '8px',
          }}>
            <button
              onClick={() => onContact(service.id)}
              className="svc-card-cta"
              style={{
                background: service.isPrimary 
                  ? colors.gradient
                  : 'transparent',
                color: service.isPrimary ? "#fff" : colors.primary,
                border: service.isPrimary 
                  ? 'none'
                  : `1.5px solid ${colors.accent}40`,
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                maxWidth: '240px',
                margin: '0 auto',
                display: 'block',
                boxShadow: service.isPrimary 
                  ? `0 4px 16px ${colors.primary}30`
                  : '0 2px 8px rgba(0,0,0,0.04)',
                letterSpacing: '0.02em',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (service.isPrimary) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 6px 24px ${colors.primary}40`;
                } else {
                  e.target.style.background = `${colors.accent}10`;
                  e.target.style.borderColor = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (service.isPrimary) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = `0 4px 16px ${colors.primary}30`;
                } else {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = `${colors.accent}40`;
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Subtle shimmer effect overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s ease',
              }} className="shimmer-overlay" />
              {service.isPrimary ? "Book Your Tour" : "Contact Us"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onContact: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
  cardRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ServiceCard;