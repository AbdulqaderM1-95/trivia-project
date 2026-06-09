export const ALL_QUESTIONS = {
  easy: [
    { q: "What is Harry Potter's owl's name?",
      options: ["Errol", "Hedwig", "Pigwidgeon"], correct: 1 },
    { q: "Which Hogwarts house is Harry Potter sorted into?",
      options: ["Slytherin", "Hufflepuff", "Gryffindor"], correct: 2 },
    { q: "What magical sport is played on broomsticks at Hogwarts?",
      options: ["Quodpot", "Quidditch", "Broomsball"], correct: 1 },
    { q: "What is the name of Hagrid's three-headed dog?",
      options: ["Fang", "Fluffy", "Norbert"], correct: 1 },
    { q: 'What does the spell "Expelliarmus" do?',
      options: ["Creates a blinding light", "Disarms an opponent", "Locks a door"], correct: 1 },
    { q: "What is the name of Voldemort's snake?",
      options: ["Basilisk", "Norberta", "Nagini"], correct: 2 },
    { q: "What is Harry Potter's godfather's name?",
      options: ["Remus Lupin", "Sirius Black", "Albus Dumbledore"], correct: 1 },
    { q: "What colour is the Hogwarts Express?",
      options: ["Midnight blue", "Scarlet red", "Jet black"], correct: 1 },
    { q: "Who teaches Potions when Harry first arrives at Hogwarts?",
      options: ["Professor Dumbledore", "Professor Snape", "Professor McGonagall"], correct: 1 },
    { q: "What is the name of the magical village near Hogwarts?",
      options: ["Hogsmeade", "Godric's Hollow", "Diagon Alley"], correct: 0 },
  ],
  medium: [
    { q: "What are the core materials of Harry Potter's wand?",
      options: ["Oak and dragon heartstring", "Holly and phoenix feather", "Willow and unicorn hair"], correct: 1 },
    { q: "Which house did the Sorting Hat seriously consider placing Harry in?",
      options: ["Hufflepuff", "Ravenclaw", "Slytherin"], correct: 2 },
    { q: "Who is revealed to be the Half-Blood Prince?",
      options: ["Lord Voldemort", "Sirius Black", "Severus Snape"], correct: 2 },
    { q: "What animal does Harry's Patronus take the form of?",
      options: ["A wolf", "A phoenix", "A stag"], correct: 2 },
    { q: "What is the name of the Weasley family's home?",
      options: ["The Hollow", "The Nest", "The Burrow"], correct: 2 },
    { q: 'Which creature is known as the "King of Serpents"?',
      options: ["Manticore", "Basilisk", "Nundu"], correct: 1 },
    { q: "How many Horcruxes did Voldemort intentionally create?",
      options: ["5", "6", "8"], correct: 1 },
    { q: "What is the name of the goblin-run bank in Diagon Alley?",
      options: ["Ollivanders", "Gringotts", "Borgin and Burkes"], correct: 1 },
    { q: "What form does Hermione Granger's Boggart take?",
      options: ["Professor McGonagall telling her she failed", "A giant spider", "Lord Voldemort"], correct: 0 },
    { q: 'What does the incantation "Lumos" do?',
      options: ["Opens locked doors", "Produces light from the wand tip", "Disarms an opponent"], correct: 1 },
  ],
  hard: [
    { q: "What is Dumbledore's full name?",
      options: ["Albus Wulfric Brian Percival", "Albus Percival Wulfric Brian", "Albus Brian Percival Wulfric"], correct: 1 },
    { q: "Which Gringotts vault number holds the Philosopher's Stone?",
      options: ["Vault 317", "Vault 666", "Vault 713"], correct: 2 },
    { q: "What is the name of the Ravenclaw house ghost?",
      options: ["The Bloody Baron", "The Grey Lady", "Nearly Headless Nick"], correct: 1 },
    { q: "What type of creature is Hagrid's pet Aragog?",
      options: ["A Basilisk", "An Acromantula", "A Hippogriff"], correct: 1 },
    { q: "What is the incantation that reveals a wand's recent magical history?",
      options: ["Homenum Revelio", "Priori Incantatem", "Expecto Patronum"], correct: 1 },
    { q: "What is the core material of Voldemort's wand?",
      options: ["Dragon heartstring", "Unicorn hair", "Phoenix feather"], correct: 2 },
    { q: "What are the names of the three Peverell brothers?",
      options: ["Antioch, Cadmus and Ignotus", "Godric, Salazar and Ignotus", "Merlin, Cadmus and Antioch"], correct: 0 },
    { q: "What is the name of the luck potion Harry uses in his sixth year?",
      options: ["Veritaserum", "Felix Felicis", "Polyjuice Potion"], correct: 1 },
    { q: "Which dark wizard did Dumbledore defeat in 1945?",
      options: ["Herpo the Foul", "Emeric the Evil", "Gellert Grindelwald"], correct: 2 },
    { q: "What position does Oliver Wood play on the Gryffindor Quidditch team?",
      options: ["Chaser", "Beater", "Keeper"], correct: 2 },
  ],
}

export const NAGINI_CORRECT = [
  'Yesss… the Dark Lord is pleased 🐍',
  'Well done, servant… 🐍',
  'Nagini approves of thisss…',
  'The Dark Lord smiles upon you 🐍',
  'Correct… you may yet survive 🐍',
]

export const NAGINI_WRONG = [
  'Nagini is… displeased 🐍',
  'The Dark Lord is disappointed…',
  'Wrong… Nagini remembers thisss.',
  'Foolish… even Nagini knew that 🐍',
  'Sssilly creature… wrong answer 🐍',
]

export const DIFF_LABELS = { easy: 'Initiate', medium: 'Death Eater', hard: 'Dark Lord' }
export const HOUSE_ICONS  = { g: '🦁', s: '🐍', r: '🦅', h: '🦡' }

export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
