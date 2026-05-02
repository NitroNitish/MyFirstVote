export type Category = "basics" | "documents" | "process" | "evm" | "rights" | "myths";

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const categoryLabels: Record<Category, { label: string; emoji: string; color: string }> = {
  basics:    { label: "Basics",       emoji: "📋", color: "bg-saffron text-white" },
  documents: { label: "Documents",    emoji: "📄", color: "bg-sky text-white" },
  process:   { label: "Process",      emoji: "🎯", color: "bg-india-green text-white" },
  evm:       { label: "EVM Usage",    emoji: "🗳️", color: "bg-navy text-white" },
  rights:    { label: "Rights & Rules", emoji: "⚖️", color: "bg-saffron text-white" },
  myths:     { label: "Common Myths", emoji: "💡", color: "bg-sky text-white" },
};

export const QUESTIONS: Question[] = [
  { id: 1, category: "basics", question: "What is the minimum age to vote in India?", options: ["16 years", "18 years", "21 years", "25 years"], correct: 1, explanation: "18 years is the minimum voting age in India as per the 61st Constitutional Amendment (1988)." },
  { id: 2, category: "basics", question: "Who conducts elections in India?", options: ["Parliament", "Supreme Court", "Election Commission of India", "President"], correct: 2, explanation: "The Election Commission of India (ECI) is the constitutional body that conducts free and fair elections." },
  { id: 3, category: "basics", question: "What does NOTA stand for?", options: ["No Other Than Acceptable", "None Of The Above", "Not Open To All", "New Option To Add"], correct: 1, explanation: "NOTA means 'None of the Above'. Use it if you don't support any candidate." },
  { id: 4, category: "basics", question: "Polling hours on election day are usually:", options: ["6 AM to 4 PM", "7 AM to 6 PM", "8 AM to 8 PM", "9 AM to 5 PM"], correct: 1, explanation: "Polling typically runs from 7 AM to 6 PM, though this can vary by constituency." },
  { id: 5, category: "basics", question: "Can NRIs vote in Indian elections?", options: ["No, never", "Yes, online", "Yes, in person at their constituency", "Only by post"], correct: 2, explanation: "NRIs can vote in person at the constituency where they are registered." },
  { id: 6, category: "basics", question: "What is the term length of a Lok Sabha?", options: ["3 years", "4 years", "5 years", "6 years"], correct: 2, explanation: "The Lok Sabha has a term of 5 years from its first sitting." },
  { id: 7, category: "documents", question: "What is EPIC?", options: ["Election Photo Identity Card", "Electoral Public ID Card", "Eligible Person ID Card", "Elector's Permanent ID Code"], correct: 0, explanation: "EPIC stands for Election Photo Identity Card — your voter ID." },
  { id: 8, category: "documents", question: "How many alternative IDs are accepted at polling booths?", options: ["6", "8", "10", "12"], correct: 3, explanation: "ECI accepts 12 alternative photo IDs including Aadhaar, Passport, Driving License and more." },
  { id: 9, category: "documents", question: "Is Aadhaar mandatory for voting?", options: ["Yes, compulsory", "No, it's optional", "Only for first-timers", "Only in some states"], correct: 1, explanation: "Aadhaar is one accepted ID, but not mandatory. Many alternatives work." },
  { id: 10, category: "documents", question: "Which of these is NOT accepted as voter ID?", options: ["Passport", "Driving License", "School/College ID", "PAN Card"], correct: 2, explanation: "School or College IDs are not accepted. Bring a government-issued photo ID." },
  { id: 11, category: "documents", question: "What is Form 6 used for?", options: ["Vote transfer", "New voter registration", "Postal ballot", "Complaint filing"], correct: 1, explanation: "Form 6 is used to register as a new voter at voters.eci.gov.in." },
  { id: 12, category: "documents", question: "Are photocopies of ID accepted at the booth?", options: ["Yes, always", "No, originals only", "Only attested copies", "Only for senior citizens"], correct: 1, explanation: "You must bring the original document — photocopies are not accepted." },
  { id: 13, category: "process", question: "Where do you register as a new voter online?", options: ["mygov.in", "voters.eci.gov.in", "indiavotes.com", "aadhaar.gov.in"], correct: 1, explanation: "Register at the official ECI portal: voters.eci.gov.in." },
  { id: 14, category: "process", question: "How can you find your polling booth?", options: ["Call 1800-111-950", "Visit nvsp.in", "Use Voter Helpline app", "All of the above"], correct: 3, explanation: "All three methods work. The Voter Helpline app is fastest." },
  { id: 15, category: "process", question: "When does voter registration close before elections?", options: ["1 week before", "10 days before", "30 days before nomination", "3 months before"], correct: 2, explanation: "Registration usually closes ~30 days before the last date of nomination." },
  { id: 16, category: "process", question: "What is the purpose of indelible ink?", options: ["Decoration", "Prevent duplicate voting", "Hygiene", "Identification"], correct: 1, explanation: "The ink mark on your finger prevents anyone from voting twice." },
  { id: 17, category: "process", question: "On which finger is the indelible ink applied?", options: ["Right thumb", "Left index finger", "Right index finger", "Left thumb"], correct: 1, explanation: "Ink is applied on the left index finger and lasts 2-3 days." },
  { id: 18, category: "process", question: "Can someone else vote on your behalf?", options: ["Yes, with a letter", "Yes, family members can", "No, proxies are not allowed", "Only with notarized form"], correct: 2, explanation: "Personal voting is mandatory. Proxy voting is only allowed for armed forces personnel." },
  { id: 19, category: "evm", question: "EVM stands for:", options: ["Electronic Voting Machine", "Electoral Vote Marker", "Election Validation Module", "Electronic Vote Manager"], correct: 0, explanation: "EVM = Electronic Voting Machine. Used since 2004 nationwide." },
  { id: 20, category: "evm", question: "What happens after you press the EVM button?", options: ["Nothing visible", "Red LED blinks + beep", "Green light only", "Buzzer for 10 seconds"], correct: 1, explanation: "A red LED blinks and a beep sounds confirming your vote was recorded." },
  { id: 21, category: "evm", question: "What is VVPAT?", options: ["Voter Verifiable Paper Audit Trail", "Verified Voting Public Access Tool", "Vote Validation Process", "Voter Verification Public Audit Trust"], correct: 0, explanation: "VVPAT prints a slip showing your vote for 7 seconds before dropping into a sealed box." },
  { id: 22, category: "evm", question: "Are EVMs connected to the internet?", options: ["Yes, always", "No, they are stand-alone", "Only during counting", "Only at central booth"], correct: 1, explanation: "EVMs are stand-alone devices with no internet or network — they cannot be hacked remotely." },
  { id: 23, category: "evm", question: "How many candidates can one EVM ballot unit handle?", options: ["8", "16", "Up to 16, extendable to 64+", "Unlimited"], correct: 2, explanation: "One ballot unit lists 16 candidates. Multiple units chain together for more." },
  { id: 24, category: "rights", question: "Can you take photos inside the voting booth?", options: ["Yes, for memories", "No, it's strictly prohibited", "Only of the EVM", "Only with permission"], correct: 1, explanation: "Photography inside the polling booth is strictly prohibited and punishable." },
  { id: 25, category: "rights", question: "Can you carry a mobile phone inside the booth?", options: ["Yes", "No, leave it outside", "Only if switched off", "Only smartphones"], correct: 1, explanation: "Mobile phones are not allowed inside polling booths — leave them outside." },
  { id: 26, category: "rights", question: "If you have a disability, you can:", options: ["Skip voting", "Get help from a companion", "Vote from home automatically", "Vote next day"], correct: 1, explanation: "Persons with disabilities can bring a companion (18+) to assist them inside." },
  { id: 27, category: "rights", question: "Voting day in India is declared a:", options: ["Working day", "Paid public holiday", "Half day", "Optional leave"], correct: 1, explanation: "Election day is a paid public holiday so everyone can vote." },
  { id: 28, category: "rights", question: "Can you change your vote after pressing EVM button?", options: ["Yes, within 10 seconds", "Yes, ask the officer", "No, it is final", "Only with VVPAT"], correct: 2, explanation: "Once you press the button, your vote is final. Choose carefully!" },
  { id: 29, category: "myths", question: "Myth or Fact: 'My one vote doesn't matter.'", options: ["Fact", "Myth - every vote counts", "Sometimes true", "Depends on state"], correct: 1, explanation: "Many elections in India have been decided by just a few votes. Every vote counts." },
  { id: 30, category: "myths", question: "Myth or Fact: 'You need Aadhaar to vote.'", options: ["Fact - it's compulsory", "Myth - 12 IDs are accepted", "Only for new voters", "Only above age 21"], correct: 1, explanation: "Myth! Aadhaar is just one of 12 accepted IDs. EPIC, Passport, etc., all work." },
  { id: 31, category: "myths", question: "Myth or Fact: 'EVMs can be hacked over WiFi.'", options: ["Fact", "Myth - EVMs have no network", "Only old EVMs", "Only abroad"], correct: 1, explanation: "EVMs are stand-alone with no WiFi/Bluetooth/internet. Cannot be remotely hacked." },
  { id: 32, category: "myths", question: "Myth or Fact: 'I can't vote if I lost my voter ID.'", options: ["Fact", "Myth - 11 alternative IDs work", "True for first-timers", "True after 30 years"], correct: 1, explanation: "Myth! You can vote with any of 11 alternative photo IDs like Aadhaar or Passport." },
  { id: 33, category: "process", question: "What's the first step at the polling booth?", options: ["Press EVM button", "Get inked", "Show ID to officer", "Sign register"], correct: 2, explanation: "Show your ID to the polling officer who verifies your name in the electoral roll." },
  { id: 34, category: "basics", question: "Which Article of the Constitution gives Right to Vote?", options: ["Article 324", "Article 326", "Article 19", "Article 14"], correct: 1, explanation: "Article 326 grants universal adult franchise to all citizens 18+." },
  { id: 35, category: "basics", question: "What is a 'constituency'?", options: ["A city", "A geographic voting area", "A political party", "A polling booth"], correct: 1, explanation: "A constituency is a geographic area whose voters elect one representative." },
  { id: 36, category: "documents", question: "Which document proves your age for registration?", options: ["Birth certificate", "Class 10 marksheet", "Passport", "Any of the above"], correct: 3, explanation: "Birth certificate, Class 10 marksheet, Passport, Aadhaar — all are valid age proofs." },
  { id: 37, category: "evm", question: "What does the green button on EVM (Control Unit) do?", options: ["Cancels vote", "Releases ballot for next voter", "Counts votes", "Shuts off"], correct: 1, explanation: "The polling officer presses it to release the ballot unit for the next voter." },
  { id: 38, category: "rights", question: "Can you wear party-symbol clothing inside the booth?", options: ["Yes", "No, it's not allowed", "Only T-shirts", "Only badges"], correct: 1, explanation: "No campaigning material or party symbols allowed inside the booth." },
  { id: 39, category: "myths", question: "Myth or Fact: 'NOTA changes the election outcome.'", options: ["Fact - if NOTA wins, re-election", "Myth - NOTA is symbolic", "Sometimes", "Only in panchayat polls"], correct: 1, explanation: "Even if NOTA gets most votes, the next-highest candidate wins. NOTA is symbolic." },
  { id: 40, category: "process", question: "Best time to vote to avoid crowds?", options: ["7-8 AM rush", "8-10 AM", "12-3 PM (lunch dip)", "5-6 PM rush"], correct: 2, explanation: "Mid-day (12-3 PM) and 8-9 AM tend to have shorter queues." },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
