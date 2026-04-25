import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CARDS = [
  {
    icon: '🌙',
    bg: 'bg-blush',
    title: 'Real-Time Mood Detection',
    desc: "Instantly identifies hunger, fatigue, discomfort, and contentment from your baby's cues.",
  },
  {
    icon: '✦',
    bg: 'bg-lavender',
    title: 'One & Only',
    desc: 'The only dedicated mood identifier built exclusively for the first months of life.',
  },
  {
    icon: '🌿',
    bg: 'bg-sage',
    title: 'Peace of Mind',
    desc: 'Less guessing, less anxiety. More presence, more connection with your newborn.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        <div className="inline-block bg-lavender text-muted text-[0.72rem] font-medium tracking-[0.14em] uppercase px-[18px] py-[6px] rounded-full mb-9">
          Newborn Intelligence
        </div>

        <h1 className="font-serif leading-[1.12] max-w-[700px] mb-6 text-[clamp(2.6rem,6vw,4.4rem)]">
          Your baby speaks.<br />
          <em className="italic text-accent">We translate.</em>
        </h1>

        <p className="text-[1.05rem] font-light text-muted max-w-[440px] leading-[1.75] mb-[52px]">
          Avio is the world's first baby mood identifier — giving new parents
          the clarity and confidence to understand exactly what their newborn needs,
          the moment they need it.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-20 max-sm:flex-col max-sm:items-center">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-[20px] p-8 w-[210px] text-left shadow-[0_2px_16px_rgba(0,0,0,0.04)] max-sm:w-full max-sm:max-w-xs"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-[1.3rem] mb-4 ${card.bg}`}>
                {card.icon}
              </div>
              <h3 className="text-[0.88rem] font-medium mb-2 tracking-[0.01em]">{card.title}</h3>
              <p className="text-[0.8rem] text-muted leading-[1.65] font-light">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-12 h-px bg-accent opacity-50 mb-[60px]" />

        <div className="text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-muted mb-5">
            Get in touch
          </p>
          <a
            href="tel:+919820699574"
            className="font-serif text-[2rem] text-avio-text no-underline inline-block mb-3 hover:text-accent transition-colors"
          >
            +91 98206 99574
          </a>
          <p className="text-[0.82rem] text-muted font-light">
            We're here every day, just like parenting.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
