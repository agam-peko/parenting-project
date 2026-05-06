import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rows = [
  { mainCardId: 10001, dayNumber: 1,  weekNumber: 1, title: 'Looks swollen & sleepy', body: 'The face, eyes, or head may look a little puffy after birth. Baby may sleep a lot and feed in small amounts. Hands and feet may feel cooler than the body.' },
  { mainCardId: 10002, dayNumber: 2,  weekNumber: 1, title: 'Feeding feels confusing', body: 'Baby may want to feed very often. This is common, especially while feeding patterns are still settling.' },
  { mainCardId: 10003, dayNumber: 3,  weekNumber: 1, title: 'Mild jaundice may appear', body: 'Some babies develop yellowish skin or eyes in the first few days. Mild jaundice is common but should be monitored by a doctor.' },
  { mainCardId: 10004, dayNumber: 4,  weekNumber: 1, title: 'Diaper/nappy counting', body: 'Wet and dirty diapers or nappies are one of the simplest ways to know whether feeding is going well. Should be 6+' },
  { mainCardId: 10005, dayNumber: 5,  weekNumber: 1, title: 'May lose some birth weight', body: 'Many newborns lose a little weight in the first few days due to fluid changes after birth. Your pediatrician will track this. Loss of upto 10% of birth weight is fine.' },
  { mainCardId: 10006, dayNumber: 6,  weekNumber: 1, title: 'Cluster feeding may happen', body: 'Baby may feed again and again in short gaps, especially in the evening or night. This can feel exhausting but is common.' },
  { mainCardId: 10007, dayNumber: 7,  weekNumber: 1, title: 'Sleep will be irregular', body: 'Baby does not know day and night yet. Short sleep cycles and frequent waking are normal.' },
  { mainCardId: 10008, dayNumber: 8,  weekNumber: 2, title: 'Poop may change', body: 'Stool may change from dark/blackish to greenish and then yellowish or mustard-like, especially in breastfed babies. This indicates better gut health.' },
  { mainCardId: 10009, dayNumber: 9,  weekNumber: 2, title: 'Crying increases', body: "Crying may mean hunger, gas, discomfort, sleepiness, overstimulation, or simply needing comfort. Don't worry about increased crying. Consult your doctor if concerned." },
  { mainCardId: 10010, dayNumber: 10, weekNumber: 2, title: 'May briefly focus on your face', body: 'Newborn vision is blurry, but baby may stare at faces from close range. This is first sign of recognition and very rewarding. Make sure not to miss it :)' },
  { mainCardId: 10011, dayNumber: 11, weekNumber: 2, title: 'Umbilical cord starts drying', body: 'The stump usually dries and falls off within the first couple of weeks. Once the stump falls, use dry cotton to keep it clean and dry. Slight blackishness is okay.' },
  { mainCardId: 10012, dayNumber: 12, weekNumber: 2, title: 'More awake windows may appear', body: 'Baby may still sleep a lot but may have short periods of open eyes and quiet observation. Slight tap on head and chest makes them go back to sleep.' },
  { mainCardId: 10013, dayNumber: 13, weekNumber: 2, title: 'Movements may look jerky', body: 'Sudden arm and leg movements are common. Newborn movements gradually become smoother. Startling is normal.' },
  { mainCardId: 10014, dayNumber: 14, weekNumber: 2, title: 'Jaundice starts improving', body: 'For many babies, jaundice improves by around two weeks, especially if feeding well.' },
  { mainCardId: 10015, dayNumber: 15, weekNumber: 3, title: 'Recognizes familiar voices', body: 'Baby may calm down when hearing a familiar voice or may slightly turn toward sounds. Constantly talking to them and keeping them engaged goes a long way. They start finding comfort in your voice.' },
  { mainCardId: 10016, dayNumber: 16, weekNumber: 3, title: 'Gas/tummy discomfort shows up', body: 'Squirming, grunting, or pulling legs up can happen because digestion is still immature. Its part of the growing process. This might get very overwhelming. Consult your doctor if needed.' },
  { mainCardId: 10017, dayNumber: 17, weekNumber: 3, title: 'Prefers contact naps', body: "Many newborns sleep better when held because touch, warmth, and smell feel safe. This is good for the baby, don't worry about early bad habits." },
  { mainCardId: 10018, dayNumber: 18, weekNumber: 3, title: 'Skin may peel or look dry', body: 'Newborn skin can peel in the first few weeks. Usually, it settles on its own. Specially around lips.' },
  { mainCardId: 10019, dayNumber: 19, weekNumber: 3, title: 'Brings hands near their mouth', body: "This is an early sign of self-soothing and body awareness. Do not stop it. It's a good sign." },
  { mainCardId: 10020, dayNumber: 20, weekNumber: 3, title: 'Different cries get noticeable', body: 'Slowly, you may start identifying hunger cry, sleepy cry, discomfort cry, or "hold me" cry. This will help you sooth your child better and develop a greater connect.' },
  { mainCardId: 10021, dayNumber: 21, weekNumber: 3, title: 'A growth-spurt phase happens', body: 'Baby may feed more, fuss more, or sleep unpredictably for a short period. This is because a lot of changes are happening within them. Its a tough time to manage but try to bear with them.' },
  { mainCardId: 10022, dayNumber: 22, weekNumber: 4, title: 'Gentle tummy time can begin', body: "Short, supervised tummy time while awake can help build neck and shoulder strength. Methods on giving tummy time should properly be consulted with your doctor. Don't refer Youtube." },
  { mainCardId: 10023, dayNumber: 23, weekNumber: 4, title: 'Briefly lifts/turns the head', body: 'During tummy time or while lying on your chest, baby may try small head movements. Head support is still needed. This means they are developing head control. Congratulations :)' },
  { mainCardId: 10024, dayNumber: 24, weekNumber: 4, title: 'Becomes more alert', body: 'Baby may look around, respond to light, sound, or your face for a few minutes. They may feel more distracted while feeding and pull on your nipples. Handle with care.' },
  { mainCardId: 10025, dayNumber: 25, weekNumber: 4, title: 'Predictable feeding patterns', body: 'You may start noticing a rough rhythm: feed, burp, diaper, sleep, repeat. This simplifies a lot of things for the mother as well.' },
  { mainCardId: 10026, dayNumber: 26, weekNumber: 4, title: 'Starts calming with routines', body: 'A soft voice, dim lights, gentle rocking, or a repeated lullaby may start feeling familiar. This helps in developing predictable sleep patterns.' },
  { mainCardId: 10027, dayNumber: 27, weekNumber: 4, title: 'Responds more clearly to touch', body: 'Baby may relax when held, cuddled, stroked gently, or kept skin-to-skin. Skin to skin is very important, specially with a mother.' },
  { mainCardId: 10028, dayNumber: 28, weekNumber: 4, title: 'Tiny personality signs appear', body: 'Some babies are more alert, some are calmer, some cry more, and some sleep more. These differences are normal. Do not worry about them. These traits keep changing.' },
  { mainCardId: 10029, dayNumber: 29, weekNumber: 5, title: 'Movements become smoother', body: 'Compared with the first week, arm and leg movements may start looking a little less random and more smooth. This signals control.' },
  { mainCardId: 10030, dayNumber: 30, weekNumber: 5, title: 'Baby may feel more present', body: 'By around one month, baby may seem more alert, responsive, and connected to familiar people.' },
  { mainCardId: 10031, dayNumber: 31, weekNumber: 5, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10032, dayNumber: 32, weekNumber: 5, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10033, dayNumber: 33, weekNumber: 5, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10034, dayNumber: 34, weekNumber: 5, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10035, dayNumber: 35, weekNumber: 5, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10036, dayNumber: 36, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10037, dayNumber: 37, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10038, dayNumber: 38, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10039, dayNumber: 39, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10040, dayNumber: 40, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10041, dayNumber: 41, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10042, dayNumber: 42, weekNumber: 6, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10043, dayNumber: 43, weekNumber: 7, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10044, dayNumber: 44, weekNumber: 7, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
  { mainCardId: 10045, dayNumber: 45, weekNumber: 7, title: 'This is it for now!', body: 'We will be adding tips for post 30-day journey very soon :)' },
];

async function main() {
  const result = await prisma.contentMainCard.createMany({ data: rows, skipDuplicates: true });
  console.log(`Inserted ${result.count} rows into content_main_card`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
