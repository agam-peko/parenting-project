export default function SleepingBaby({ className = '' }) {
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">

      {/* Sparkles */}
      <span style={{ position:'absolute', top:'10px',  left:'18px',  color:'#c9a99a', fontSize:'1.1rem',  animation:'twinkle 2.5s ease-in-out infinite',                       }}>✦</span>
      <span style={{ position:'absolute', top:'30px',  right:'22px', color:'#c9a99a', fontSize:'0.85rem', animation:'twinkle 2.5s ease-in-out infinite', animationDelay:'0.9s'  }}>✦</span>
      <span style={{ position:'absolute', top:'6px',   right:'48px', color:'#8a817a', fontSize:'0.7rem',  animation:'twinkle 3s   ease-in-out infinite', animationDelay:'1.6s'  }}>✧</span>
      <span style={{ position:'absolute', bottom:'42px', left:'8px', color:'#c9a99a', fontSize:'0.75rem', animation:'twinkle 3s   ease-in-out infinite', animationDelay:'0.5s'  }}>★</span>
      <span style={{ position:'absolute', bottom:'50px', right:'12px',color:'#8a817a',fontSize:'0.65rem', animation:'twinkle 2.8s ease-in-out infinite', animationDelay:'1.2s'  }}>✦</span>

      {/* Floating Zs */}
      <span style={{ position:'absolute', top:'22px', right:'60px', color:'#8a817a', fontSize:'0.9rem',  fontFamily:'DM Serif Display, serif', opacity:0.5,  animation:'floatZ 3.5s ease-in-out infinite',                      }}>z</span>
      <span style={{ position:'absolute', top:'10px', right:'48px', color:'#8a817a', fontSize:'0.65rem', fontFamily:'DM Serif Display, serif', opacity:0.35, animation:'floatZ 3.5s ease-in-out infinite', animationDelay:'1.3s' }}>z</span>

      {/* Baby — gentle float */}
      <div style={{ animation: 'float 3.5s ease-in-out infinite' }}>
        <svg
          viewBox="0 0 200 230"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width:'100%', filter:'drop-shadow(0 8px 18px rgba(0,0,0,0.07))' }}
        >
          {/* Soft background glow */}
          <ellipse cx="100" cy="196" rx="82" ry="36" fill="#f5e6e0" opacity="0.55"/>

          {/* Blanket – back layer */}
          <path d="M42 156 Q38 186 38 206 Q38 228 100 228 Q162 228 162 206 Q162 186 158 156 Q138 145 100 143 Q62 145 42 156Z" fill="#e8e4f0"/>
          {/* Blanket – inner lighter fold */}
          <path d="M57 163 Q54 188 54 206 Q54 222 100 222 Q146 222 146 206 Q146 188 143 163 Q126 154 100 152 Q74 154 57 163Z" fill="#f0ecf8"/>
          {/* Blanket – top crease */}
          <path d="M63 159 Q80 151 100 149 Q120 151 137 159 Q128 166 100 163 Q72 166 63 159Z" fill="#ddd8ee"/>

          {/* Neck */}
          <ellipse cx="100" cy="150" rx="24" ry="8" fill="#fce0b8"/>

          {/* Head */}
          <circle cx="100" cy="93" r="53" fill="#fce4c0"/>

          {/* Ears */}
          <circle cx="49"  cy="98" r="13" fill="#fce4c0"/>
          <circle cx="49"  cy="98" r="8"  fill="#f5ca9a"/>
          <circle cx="151" cy="98" r="13" fill="#fce4c0"/>
          <circle cx="151" cy="98" r="8"  fill="#f5ca9a"/>

          {/* Hair tufts */}
          <ellipse cx="83"  cy="45" rx="8"   ry="13" fill="#8B5E40" transform="rotate(-18 83 45)"/>
          <ellipse cx="100" cy="41" rx="7.5" ry="13" fill="#7a4f3a"/>
          <ellipse cx="117" cy="45" rx="8"   ry="13" fill="#8B5E40" transform="rotate(18 117 45)"/>

          {/* Eyebrows – very subtle */}
          <path d="M78 81 Q87 77 96 80"   fill="none" stroke="#9a7060" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M104 80 Q113 77 122 81" fill="none" stroke="#9a7060" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

          {/* Eyes – sleeping (downward arcs = closed lids) */}
          <path d="M78 95 Q87 102 96 95"   fill="none" stroke="#4a2e1e" strokeWidth="2.8" strokeLinecap="round"/>
          <path d="M104 95 Q113 102 122 95" fill="none" stroke="#4a2e1e" strokeWidth="2.8" strokeLinecap="round"/>

          {/* Eyelashes */}
          <line x1="78"  y1="95"  x2="75"  y2="91" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="87"  y1="102" x2="87"  y2="97" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="96"  y1="95"  x2="99"  y2="91" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="104" y1="95"  x2="101" y2="91" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="113" y1="102" x2="113" y2="97" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="122" y1="95"  x2="125" y2="91" stroke="#4a2e1e" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Nose */}
          <ellipse cx="100" cy="111" rx="5" ry="4" fill="#f0a870" opacity="0.75"/>

          {/* Mouth – gentle smile */}
          <path d="M89 123 Q100 131 111 123" fill="none" stroke="#c9a99a" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Cheeks */}
          <ellipse cx="72"  cy="113" rx="15" ry="10" fill="#f0a89a" opacity="0.3"/>
          <ellipse cx="128" cy="113" rx="15" ry="10" fill="#f0a89a" opacity="0.3"/>

          {/* Arms peeking from blanket */}
          <ellipse cx="56"  cy="170" rx="13" ry="8" fill="#fce4c0" transform="rotate(-22 56 170)"/>
          <circle  cx="47"  cy="164" r="7"           fill="#fce4c0"/>
          <ellipse cx="144" cy="170" rx="13" ry="8" fill="#fce4c0" transform="rotate(22 144 170)"/>
          <circle  cx="153" cy="164" r="7"           fill="#fce4c0"/>
        </svg>
      </div>
    </div>
  );
}
