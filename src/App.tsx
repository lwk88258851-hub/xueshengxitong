import React, { useState, useEffect, useRef } from 'react';
import { Star, Flame, Gem, Shield, Zap, Crown } from 'lucide-react';
import './index.css';

const STUDENTS = [
  "张伟", "王芳", "李娜", "刘洋", "陈杰", "赵强", "黄勇", "周平", "吴艳", "徐磊", "孙涛", "朱宇",
  "李明", "王磊", "张勇", "刘杰", "陈刚", "杨洋", "赵敏", "黄洁", "周涛", "吴军", "徐静", "孙鹏",
  "马强", "朱莉", "胡军", "郭涛", "何静", "高磊", "林杰", "罗勇", "梁伟", "宋刚", "郑洁", "谢涛",
  "韩军", "唐静", "冯磊", "于杰", "董勇", "萧伟", "程刚", "曹洁", "袁涛", "邓军", "许静", "傅磊",
  "沈杰", "曾勇", "彭伟", "吕刚", "苏洁", "卢涛", "蒋军", "蔡静", "贾磊", "丁杰", "魏勇", "薛伟"
];

const CornerDeco = ({ className, level = 1 }: { className?: string; level?: number }) => {
  const levelColors: Record<number, string> = {
    1: '#8B4513',
    2: '#cd7f32',
    3: '#94a3b8',
    4: '#10b981',
    5: '#6366f1',
    6: '#fbbf24'
  };
  const color = levelColors[level] || levelColors[1];
  
  return (
    <svg className={`absolute w-12 h-12 ${className}`} style={{ color: color }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={level >= 4 ? 4 : 3}>
      {/* Base Corner */}
      <path d="M10,10 L90,10 M10,10 L10,90" opacity={0.6} />
      
      {/* Level 1-2: Simple Arc */}
      {level <= 2 && (
        <>
          <path d="M10,10 L40,10 A 30 30 0 0 1 10 40 Z" fill="currentColor" opacity="0.1" />
          <path d="M20,20 L50,20 A 30 30 0 0 1 20 50 Z" stroke={color} strokeWidth="2" />
          <circle cx="25" cy="25" r="3" fill={color} />
        </>
      )}

      {/* Level 3-4: Double Arc + Gem */}
      {level >= 3 && level <= 4 && (
        <>
          <path d="M10,10 L60,10 A 50 50 0 0 1 10 60 Z" fill="currentColor" opacity="0.15" />
          <path d="M20,20 L70,20 A 50 50 0 0 1 20 70 Z" stroke={color} strokeWidth="3" />
          <path d="M30,30 L60,30 A 30 30 0 0 1 30 60 Z" stroke={color} strokeWidth="1.5" opacity="0.6" />
          <rect x="22" y="22" width="10" height="10" transform="rotate(45 27 27)" fill={color} />
        </>
      )}

      {/* Level 5-6: Ornate Gothic/Runic Corner */}
      {level >= 5 && (
        <>
          <path d="M10,10 L80,10 A 70 70 0 0 1 10 80 Z" fill="currentColor" opacity="0.2" />
          <path d="M15,15 L85,15 L85,30 M15,15 L15,85 L30,85" stroke={color} strokeWidth="4" />
          <path d="M25,25 L75,25 A 50 50 0 0 1 25 75 Z" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
          <path d="M35,35 L65,35 A 30 30 0 0 1 35 65 Z" stroke={color} strokeWidth="1" />
          <circle cx="25" cy="25" r="6" fill={color} />
          <circle cx="25" cy="25" r="10" stroke={color} strokeWidth="1" opacity="0.5" />
          {level === 6 && (
            <path d="M10,10 L90,90 M90,10 L10,90" stroke={color} strokeWidth="0.5" opacity="0.3" />
          )}
        </>
      )}
    </svg>
  );
};

const MagicCircle = ({ level = 1 }: { level?: number }) => {
  const levelColors: Record<number, string> = {
    1: '#8B4513',
    2: '#cd7f32',
    3: '#94a3b8',
    4: '#10b981',
    5: '#6366f1',
    6: '#fbbf24'
  };
  const color = levelColors[level] || levelColors[1];
  const opacity = 0.4 + (level * 0.1);

  // Different geometric patterns for each level
  const renderPattern = () => {
    switch(level) {
      case 1: // Triangle
        return <polygon points="100,30 160,140 40,140" strokeWidth="4" />;
      case 2: // Square
        return <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" strokeWidth="4" />;
      case 3: // Pentagram
        return <path d="M100,25 L118,78 L175,78 L128,112 L146,165 L100,132 L54,165 L72,112 L25,78 L82,78 Z" strokeWidth="4" />;
      case 4: // Hexagram (Star of David style)
        return (
          <>
            <polygon points="100,25 165,138 35,138" strokeWidth="4" />
            <polygon points="100,175 35,62 165,62" strokeWidth="4" />
          </>
        );
      case 5: // Heptagram (7 points)
        return <path d="M100,20 L118,65 L165,65 L128,95 L145,140 L100,115 L55,140 L72,95 L35,65 L82,65 Z" strokeWidth="5" />;
      case 6: // Complex Fractal/Celestial
        return (
          <>
            <circle cx="100" cy="100" r="60" strokeWidth="2" strokeDasharray="2 2" />
            <path d="M100,10 L120,80 L190,100 L120,120 L100,190 L80,120 L10,100 L80,80 Z" strokeWidth="4" />
            <circle cx="100" cy="100" r="30" strokeWidth="8" opacity="0.3" />
            <path d="M40,40 L160,160 M40,160 L160,40" strokeWidth="1" opacity="0.5" />
          </>
        );
      default:
        return <circle cx="100" cy="100" r="70" strokeWidth="4" />;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 magic-circle">
      <div className="magic-aura-wave w-56 h-56" style={{ borderColor: `${color}99` }}></div>
      <div className="magic-aura-wave w-56 h-56" style={{ borderColor: `${color}66`, animationDelay: '1.5s' }}></div>
      <div className="magic-aura-wave w-56 h-56" style={{ borderColor: `${color}33`, animationDelay: '3s' }}></div>
      <svg className="w-52 h-52 magic-circle-spin" style={{ color: color, opacity: opacity }} viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="90" strokeWidth={level >= 5 ? 8 : 6} strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="80" strokeWidth={level >= 3 ? 4 : 3} />
        {renderPattern()}
        <path d="M100,10 L100,190 M10,100 L190,100" strokeWidth="1" opacity="0.3" />
      </svg>
      <svg className="absolute w-44 h-44 magic-circle-spin-reverse" style={{ color: color, opacity: opacity - 0.2 }} viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="75" strokeDasharray="10 5" strokeWidth="3" />
        <circle cx="100" cy="100" r="60" strokeWidth={level >= 3 ? 3 : 2} />
        {level >= 4 && <circle cx="100" cy="100" r="45" strokeWidth="1" strokeDasharray="2 2" />}
      </svg>
    </div>
  );
};

const Crest = ({ level = 1 }: { level?: number }) => {
  const levelColors: Record<number, string> = {
    1: '#8B4513',
    2: '#cd7f32',
    3: '#94a3b8',
    4: '#10b981',
    5: '#6366f1',
    6: '#fbbf24'
  };
  const color = levelColors[level] || levelColors[1];
  
  return (
    <div className="absolute top-4 flex flex-col items-center z-10 drop-shadow-2xl">
      <div className="relative w-24 h-20 flex items-center justify-center">
        {/* Dynamic Wings based on level */}
        <svg className="absolute w-32 h-20" style={{ color: color }} viewBox="0 0 200 100" fill="currentColor">
          {/* Base Wings */}
          <path d="M100,50 C80,20 40,10 10,30 C30,40 50,60 70,80 C80,60 90,55 100,50 Z" opacity={0.6} />
          <path d="M100,50 C120,20 160,10 190,30 C170,40 150,60 130,80 C120,60 110,55 100,50 Z" opacity={0.6} />
          
          {/* Level 3+: Secondary Feathers */}
          {level >= 3 && (
            <>
              <path d="M90,60 C70,40 30,30 5,50 C25,60 45,75 65,90 C75,75 85,70 90,60 Z" opacity="0.4" />
              <path d="M110,60 C130,40 170,30 195,50 C175,60 155,75 135,90 C125,75 115,70 110,60 Z" opacity="0.4" />
            </>
          )}

          {/* Level 5+: Divine Aura Wings */}
          {level >= 5 && (
            <>
              <path d="M100,45 C85,10 50,0 20,20 C40,30 60,50 80,70 Z" opacity="0.2" />
              <path d="M100,45 C115,10 150,0 180,20 C160,30 140,50 120,70 Z" opacity="0.2" />
            </>
          )}
        </svg>

        {/* Central Icon Container */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#4a3728] to-[#1a1410] rounded-lg rotate-45 border border-[#8B4513]/30 shadow-xl"></div>
          <div className="absolute inset-1 bg-gradient-to-b from-[#8B4513] to-[#4a3728] rounded-lg rotate-45 flex items-center justify-center shadow-inner" style={{ background: `linear-gradient(to bottom, ${color}, #4a3728)` }}>
            <div className="rotate-[-45deg] scale-110 text-white">
              {level >= 6 ? <Crown size={24} strokeWidth={2} /> : 
               level >= 5 ? <Zap size={24} strokeWidth={2} /> :
               level >= 4 ? <Shield size={24} strokeWidth={2} /> :
               level >= 3 ? <Gem size={24} strokeWidth={2} /> :
               level >= 2 ? <Flame size={24} strokeWidth={2} /> :
               <Star size={24} strokeWidth={2} />}
            </div>
          </div>
        </div>
      </div>

      {/* Level Indicators */}
      <div className="flex gap-1 -mt-2">
        {[...Array(level)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  );
};


const GodRays = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    <div className="god-ray absolute top-[-30%] left-[10%] w-[60%] h-[160%] rotate-[10deg]"></div>
    <div className="god-ray absolute top-[-30%] left-[35%] w-[30%] h-[160%] rotate-[-5deg]" style={{ animationDelay: '4s' }}></div>
    <div className="god-ray absolute top-[-30%] left-[65%] w-[50%] h-[160%] rotate-[15deg]" style={{ animationDelay: '8s' }}></div>
  </div>
);

const Mist = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="mist absolute inset-0"></div>
  </div>
);

const SanctuaryBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#fdfaf5]">
    {/* Floor */}
    <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-[#f5f0e6] to-transparent opacity-60"></div>
    
    {/* Columns */}
    <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40 filter blur-[1px]">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-28 h-full bg-gradient-to-b from-[#fffefc] via-[#f5f0e6] to-[#e8e0d0] border-x border-amber-200/30"></div>
      ))}
    </div>

    {/* Alcoves/Niches */}
    <div className="absolute top-[15%] w-full flex justify-around opacity-40 filter blur-[2px]">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-56 h-[500px] bg-[#fdfaf5] rounded-t-full border-t-2 border-x-2 border-amber-100/50 shadow-[inset_0_0_100px_rgba(255,255,255,1)]"></div>
      ))}
    </div>

    {/* Floating Artifacts */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="artifact-float absolute top-[30%] left-[15%] opacity-30 filter blur-[2px]">
        <svg className="w-16 h-16 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
        </svg>
      </div>
      <div className="artifact-float absolute top-[50%] right-[10%] opacity-25 filter blur-[3px]" style={{ animationDelay: '3s' }}>
        <svg className="w-20 h-20 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      </div>
    </div>
  </div>
);

export default function App() {
  const [mode, setMode] = useState<'carousel' | 'pk'>('carousel');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  
  // PK Mode State
  const [pkStudents, setPkStudents] = useState<[string, string]>(['', '']);
  const [pkWinner, setPkWinner] = useState<number | null>(null);
  const [isAnnihilating, setIsAnnihilating] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [beamActive, setBeamActive] = useState(false);
  const [cracked, setCracked] = useState(false);
  const [shuddering, setShuddering] = useState(false);
  const [dissolved, setDissolved] = useState(false);
  const [isVictoryShaking, setIsVictoryShaking] = useState(false);
  
  // PK Draw Sequence State
  const [pkDrawStage, setPkDrawStage] = useState<'idle' | 'spinning' | 'winners' | 'transition'>('idle');
  const [pkWinnerIndices, setPkWinnerIndices] = useState<number[]>([]);

  // Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pkParticlesRef = useRef<any[]>([]);

  const numCards = STUDENTS.length;
  const anglePerCard = 360 / numCards;
  const radius = Math.max(700, numCards * 45); // Dynamic radius based on card count

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSpinning || pkDrawStage !== 'idle' || mode === 'pk') return;
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isSpinning || pkDrawStage !== 'idle' || mode === 'pk') return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    // Sensitivity: 0.2 degrees per pixel
    const newRotation = startRotation + (deltaX * 0.2);
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleSpin = () => {
    if (isSpinning || pkDrawStage !== 'idle') return;
    
    setIsSpinning(true);
    setShowWinner(false);
    setWinnerIndex(null);

    const targetIndex = Math.floor(Math.random() * numCards);
    
    const spins = 6; // 6 full rotations
    const baseRotation = rotation - (rotation % 360);
    const targetRotation = baseRotation - (spins * 360) - (targetIndex * anglePerCard);

    setRotation(targetRotation);

    // Spin takes 8 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setWinnerIndex(targetIndex);
      setShowWinner(true);
      triggerParticles();
    }, 8000);
  };

  const startPK = () => {
    if (isSpinning || pkDrawStage !== 'idle') return;
    
    // Select two random distinct indices
    const indices: number[] = [];
    while (indices.length < 2) {
      const r = Math.floor(Math.random() * numCards);
      if (!indices.includes(r)) indices.push(r);
    }
    setPkWinnerIndices(indices);
    setPkStudents([STUDENTS[indices[0]], STUDENTS[indices[1]]]);
    
    // Start sequence
    setPkDrawStage('spinning');
    setIsSpinning(true);
    setShowWinner(false);
    
    const spins = 8;
    const baseRotation = rotation - (rotation % 360);
    // Target the midpoint or just spin fast
    const targetRotation = baseRotation - (spins * 360);
    setRotation(targetRotation);

    // Simultaneous fly out as it slows down
    setTimeout(() => {
      setPkDrawStage('winners');
      setWinnerIndex(null); // No single winner
      setShowWinner(true); // Both glow
      
      setTimeout(() => {
        setPkDrawStage('transition');
        setIsSpinning(false);
        
        setTimeout(() => {
          setMode('pk');
          setPkWinner(null);
          setIsAnnihilating(false);
          setShowReset(false);
          setBeamActive(false);
          setCracked(false);
          setShuddering(false);
          setDissolved(false);
          setPkDrawStage('idle');
        }, 1000);
      }, 1500);
    }, 6500); // Trigger fly out before full stop
  };

  const declareWinner = (index: number) => {
    if (pkWinner !== null || isAnnihilating) return;
    
    setPkWinner(index);
    setIsAnnihilating(true);
    
    // Sequence
    setTimeout(() => setBeamActive(true), 500);
    setTimeout(() => setShuddering(true), 600);
    
    // Incineration
    setTimeout(() => {
      setCracked(true);
      triggerPKAnnihilation(index === 0 ? 1 : 0);
    }, 1200);

    setTimeout(() => {
      setDissolved(true);
      setIsVictoryShaking(true);
      setTimeout(() => setIsVictoryShaking(false), 800);
    }, 1700);

    setTimeout(() => {
      setBeamActive(false);
      setShuddering(false);
      setShowReset(true);
    }, 3500);
  };

  const triggerPKAnnihilation = (loserIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const cardX = loserIndex === 0 ? centerX - 200 : centerX + 200;
    
    let particles: any[] = [];
    const colors = ['#ffcc33', '#ff9900', '#daa520', '#ffffff', '#b8860b'];

    // High density particles blown away
    const createParticles = () => {
      for (let i = 0; i < 2000; i++) {
        const direction = loserIndex === 0 ? -1 : 1; // Direction of the beam
        particles.push({
          x: cardX + (Math.random() - 0.5) * 256,
          y: centerY + (Math.random() - 0.5) * 384,
          vx: (Math.random() * 15 + 5) * direction, // Blown away horizontally
          vy: (Math.random() - 0.5) * 10, // Slight vertical spread
          life: 1,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          scale: 1
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p, i) => {
        if (p.life > 0) {
          active = true;
          p.x += p.vx;
          p.y += p.vy;
          
          // Simulate blowing into background
          p.scale *= 0.98;
          p.size *= 0.98;
          p.life -= 0.01;
          p.vx *= 1.02; // Accelerate away
          
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (active) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  const resetToCarousel = () => {
    setMode('carousel');
    setPkWinner(null);
    setIsAnnihilating(false);
    setShowReset(false);
  };

  const triggerParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const colors = ['#fdfcf0', '#fff9e6', '#fef3c7', '#fde68a', '#ffffff'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 300,
        y: canvas.height / 2 - 150,
        vx: (Math.random() - 0.5) * 1,
        vy: Math.random() * 1.5 + 0.5,
        life: Math.random() * 2 + 1,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * 0.03,
        wobbleSpeed: Math.random() * 0.05
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach(p => {
        if (p.life > 0) {
          active = true;
          p.x += p.vx + Math.sin(p.life * 3 * p.wobbleSpeed) * p.wobble * 15;
          p.y += p.vy;
          p.vy += 0.01; // extremely light gravity
          p.life -= 0.003;
          p.size *= 0.995;
          
          ctx.globalAlpha = Math.max(0, p.life * 0.5);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      if (active) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div 
      className={`relative w-full h-screen bg-[#fffefc] overflow-hidden flex flex-col items-center justify-center font-sans ${isDragging ? 'cursor-grabbing' : 'cursor-default'} ${isVictoryShaking ? 'victory-shake' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
    >
      <SanctuaryBackground />
      <GodRays />
      <Mist />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-50"
      />

      {mode === 'carousel' ? (
        <div className={pkDrawStage === 'transition' ? 'fade-out-carousel' : ''}>
          <div className="scene relative w-full h-[600px] flex items-center justify-center mt-10">
            <div 
              className="carousel absolute w-64 h-96"
              style={{ transform: `translateZ(-${radius}px) rotateY(${rotation}deg)` }}
            >
              {STUDENTS.map((student, i) => {
                const angle = i * anglePerCard;
                const isWinner = (showWinner && winnerIndex === i) || (pkDrawStage === 'winners' && pkWinnerIndices.includes(i));
                const level = (i % 6) + 1;
                
                let flyClass = '';
                if (pkDrawStage === 'winners' && i === pkWinnerIndices[0]) flyClass = 'fly-left';
                if (pkDrawStage === 'winners' && i === pkWinnerIndices[1]) flyClass = 'fly-right';
                if (pkDrawStage === 'transition' && pkWinnerIndices.includes(i)) flyClass = 'hidden';

                return (
                  <div 
                    key={i}
                    className={`card-container absolute top-0 left-0 w-full h-full ${flyClass}`}
                    style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
                  >
                    <div className={`card-wrapper w-full h-full ${isWinner ? 'winner-active' : ''} card-level-${level}`}>
                      <div className="card w-full h-full">
                        <div className="card-inner">
                          <CornerDeco className="top-0 left-0" level={level} />
                          <CornerDeco className="top-0 right-0 rotate-90" level={level} />
                          <CornerDeco className="bottom-0 right-0 rotate-180" level={level} />
                          <CornerDeco className="bottom-0 left-0 -rotate-90" level={level} />
                          
                          <MagicCircle level={level} />
                          <Crest level={level} />
                          
                          <h2 
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-serif font-medium tracking-[0.2em] z-10 ${
                              isWinner 
                                ? 'winner-text-glow' 
                                : 'text-[#3E2723]'
                            }`}
                            style={isWinner ? {} : { textShadow: '0px 1px 0px rgba(255,255,255,0.8), 0px -1px 1px rgba(0,0,0,0.2)' }}
                          >
                            {student}
                          </h2>
                          
                          <div className="absolute bottom-8 left-0 w-full flex justify-center z-10">
                            <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#4a3728] to-transparent opacity-50"></div>
                          </div>
                          <div className="absolute bottom-4 text-[#4a3728] text-[8px] font-mono tracking-[0.5em] uppercase z-10 font-bold opacity-80">
                            编号: {String(i + 1).padStart(3, '0')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-6 mt-16 z-50">
            <button 
              onClick={handleSpin}
              disabled={isSpinning || pkDrawStage !== 'idle'}
              className="relative px-16 py-5 bg-[#1a1410] rounded-full border border-[#4a3728] text-[#daa520] font-bold text-2xl tracking-[0.2em] uppercase overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-105 hover:border-[#b8860b] hover:shadow-[0_0_60px_rgba(184,134,11,0.4)]"
            >
              <span className="relative z-10 drop-shadow-lg">开始抽取</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/0 via-[#daa520]/20 to-[#b8860b]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
            </button>

            <button 
              onClick={startPK}
              disabled={isSpinning || pkDrawStage !== 'idle'}
              className="relative px-16 py-5 bg-[#1a1410] rounded-full border border-[#4a3728] text-[#daa520] font-bold text-2xl tracking-[0.2em] uppercase overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-105 hover:border-[#b8860b] hover:shadow-[0_0_60px_rgba(184,134,11,0.4)]"
            >
              <span className="relative z-10 drop-shadow-lg">PK 对决</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/0 via-[#daa520]/20 to-[#b8860b]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="arena-floor"></div>
          
          <div className="flex gap-[400px] items-center justify-center relative">
            {/* Duel Beam */}
            {beamActive && pkWinner !== null && (
              <div 
                className={`beam-container ${pkWinner === 1 ? 'rotate-180' : ''}`}
                style={{ 
                  left: pkWinner === 0 ? 'calc(50% - 200px)' : 'calc(50% + 200px)', 
                  top: '50%', // Centered vertically on the card
                  width: '400px'
                }}
              >
                <div className="volumetric-beam active"></div>
              </div>
            )}

            {pkStudents.map((student, i) => {
              const isWinner = pkWinner === i;
              const isLoser = pkWinner !== null && pkWinner !== i;
              const isAnnihilated = isLoser && dissolved;
              const studentIndex = STUDENTS.indexOf(student);
              const level = (studentIndex % 6) + 1;
              
              if (isAnnihilated) return <div key={i} className="w-64 h-96"></div>;

              return (
                <div key={i} className={`flex flex-col items-center gap-8 ${pkWinner === null ? (i === 0 ? 'arena-in-left' : 'arena-in-right') : ''}`}>
                  <div 
                    className={`relative w-64 h-96 transition-all duration-1000 card-level-${level} ${
                      isWinner ? 'scale-110 winner-pulse-violent z-20' : ''
                    } ${isLoser && shuddering ? 'shudder' : ''} ${isLoser && cracked ? 'card-cracked shatter-active' : ''}`}
                  >
                    <div className="card w-full h-full">
                      <div className="card-inner">
                        <CornerDeco className="top-0 left-0" />
                        <CornerDeco className="top-0 right-0 rotate-90" />
                        <CornerDeco className="bottom-0 right-0 rotate-180" />
                        <CornerDeco className="bottom-0 left-0 -rotate-90" />
                        <MagicCircle level={level} />
                        <Crest level={level} />
                        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-serif font-medium tracking-[0.2em] z-10 text-[#3E2723]">
                          {student}
                        </h2>
                        <div className="absolute bottom-8 left-0 w-full flex justify-center z-10">
                          <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#4a3728] to-transparent opacity-50"></div>
                        </div>
                        <div className="absolute bottom-4 text-[#4a3728] text-[8px] font-mono tracking-[0.5em] uppercase z-10 font-bold opacity-80">
                          编号: {String(STUDENTS.indexOf(student) + 1).padStart(3, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!isAnnihilating && (
                    <button 
                      onClick={() => declareWinner(i)}
                      className="px-8 py-3 bg-[#1a1410] rounded-full border border-[#4a3728] text-[#daa520] font-bold text-sm tracking-[0.1em] uppercase hover:scale-105 transition-all animate-fade-in"
                    >
                      宣判获胜
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {showReset && (
            <button 
              onClick={resetToCarousel}
              className="absolute bottom-20 px-12 py-4 bg-[#1a1410] rounded-full border border-[#4a3728] text-[#daa520] font-bold text-xl tracking-[0.2em] uppercase animate-fade-in z-50"
            >
              返回转盘
            </button>
          )}
        </div>
      )}
    </div>
  );
}
