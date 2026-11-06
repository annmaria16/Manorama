import { SourceAnalysisResult, GeneratedArticle, FactCheckResult } from '../types.js';

export const MOCK_ANALYSIS_ML: SourceAnalysisResult = {
  mainEvent: "ചന്ദ്രയാൻ-4, ഗഗൻയാൻ ദൗത്യങ്ങളുടെ പുരോഗതിയും വിക്ഷേപണ സമയക്രമവും ഐഎസ്ആർഒ ചെയർമാൻ വ്യക്തമാക്കി.",
  mainSubject: "ഇന്ത്യൻ ബഹിരാകാശ ഗവേഷണ പദ്ധതികളും ഭാവി ദൗത്യങ്ങളും",
  fiveWs: {
    who: "എസ്. സോമനാഥ് (ഐഎസ്ആർഒ ചെയർമാൻ)",
    what: "ചന്ദ്രയാൻ-4 ചന്ദ്രനിൽ നിന്നുള്ള സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കും; ഗഗൻയാൻ ആളില്ലാ പരീക്ഷണം ഈ വർഷം നടക്കും",
    when: "2028-ൽ ചന്ദ്രയാൻ-4 വിക്ഷേപണം; 2025 അവസാനത്തോടെ ഗഗൻയാൻ മനുഷ്യദൗത്യം",
    where: "തിരുവനന്തപുരം, വിക്രം സാരാഭായ് സ്പേസ് സെന്റർ (വിഎസ്എസ്സി)",
    why: "ചന്ദ്രനിലെ ജലസാന്നിധ്യവും ധാതുസമ്പത്തും കൂടുതൽ അടുത്തറിയാനും തദ്ദേശീയ മനുഷ്യ ബഹിരാകാശ യാത്രാ ശേഷി തെളിയിക്കാനും",
    how: "രണ്ട് വ്യത്യസ്ത റോക്കറ്റുകളിൽ മൊഡ്യൂളുകൾ വിക്ഷേപിച്ച് ബഹിരാകാശത്ത് സംയോജിപ്പിക്കുന്ന ഡോക്കിങ് സാങ്കേതികവിദ്യ വഴി"
  },
  entities: {
    names: ["എസ്. സോമനാഥ്", "ഡോ. ഉണ്ണികൃഷ്ണൻ നായർ"],
    places: ["തിരുവനന്തപുരം", "ശ്രീഹരിക്കോട്ട", "ബെംഗളൂരു"],
    organizations: ["ഐഎസ്ആർഒ (ISRO)", "വിഎസ്എസ്സി (VSSC)"],
    dates: ["2028", "2025 ഡിസംബർ", "2040"],
    numbersAndStats: ["4 ഘട്ടങ്ങളുള്ള ദൗത്യം", "350 കിലോ ഭാരമുള്ള പേലോഡ്", "2 തവണയായി വിക്ഷേപണം"],
    directQuotes: [
      "\"ചന്ദ്രനിൽ നിന്ന് സാമ്പിളുകൾ സുരക്ഷിതമായി ഭൂമിയിലെത്തിക്കുക എന്നതാണ് ചന്ദ്രയാൻ-4ന്റെ പ്രധാന ലക്ഷ്യം.\"",
      "\"ഗഗൻയാൻ ദൗത്യത്തിന്റെ ആദ്യ ആളില്ലാ പരീക്ഷണ പറക്കൽ ഉടൻ നടക്കും.\""
    ],
    supportingDetails: [
      "ചന്ദ്രനിലേക്ക് വീണ്ടും മനുഷ്യനെ എത്തിക്കാനുള്ള ഇന്ത്യൻ ലൂണാർ മിഷന്റെ മുന്നോടിയാണിത്.",
      "ഭാരതീയ അന്തരീക്ഷ സ്റ്റേഷൻ (BAS) 2035-ഓടെ പൂർത്തിയാക്കും."
    ],
    unclearOrMissing: [
      "പദ്ധതിയുടെ ആകെ അടങ്കൽ തുക സംബന്ധിച്ച അന്തിമ കണക്കുകൾ വെളിപ്പെടുത്തിയിട്ടില്ല.",
      "വിദേശ സഹകരണത്തെക്കുറിച്ചുള്ള വിവരങ്ങൾ ലഭ്യമല്ല."
    ]
  },
  summaryPointCount: 5
};

export const MOCK_ARTICLE_ML: GeneratedArticle = {
  headline: "ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ; ഗഗൻയാൻ പരീക്ഷണങ്ങൾ അന്തിമഘട്ടത്തിലെന്ന് ഐഎസ്ആർഒ",
  alternativeHeadlines: [
    "ചന്ദ്രനിൽ നിന്ന് സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കാൻ ചന്ദ്രയാൻ-4: എസ്. സോമനാഥ്",
    "ബഹിരാകാശത്ത് ചരിത്രമെഴുതാൻ ഇന്ത്യ; ഗഗൻയാൻ, ചന്ദ്രയാൻ–4 സമയക്രമം പ്രഖ്യാപിച്ചു",
    "ഇന്ത്യൻ ബഹിരാകാശ കുതിപ്പ്: ചന്ദ്രയാൻ-4 വിക്ഷേപണം 2028-ൽ"
  ],
  summary: "ചന്ദ്രനിൽ നിന്നുള്ള സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കുന്ന ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ വിക്ഷേപിക്കുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് വ്യക്തമാക്കി. ഗഗൻയാൻ മനുഷ്യദൗത്യത്തിന്റെ മുന്നോടിയായുള്ള ആദ്യ ആളില്ലാ പരീക്ഷണ വിക്ഷേപണം ഈ വർഷം അവസാനത്തോടെ നടക്കും.",
  leadParagraph: "തിരുവനന്തപുരം: ചരിത്രവിജയം കുറിച്ച ചന്ദ്രയാൻ–3 ദൗത്യത്തിന് പിന്നാലെ, ചന്ദ്രന്റെ ഉപരിതലത്തിൽ നിന്ന് സാമ്പിളുകൾ ശേഖരിച്ച് ഭൂമിയിലെത്തിക്കുന്ന നിർണായകമായ ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ യാഥാർഥ്യമാകുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് അറിയിച്ചു. തിരുവനന്തപുരത്ത് മാധ്യമങ്ങളോട് സംസാരിക്കുകയായിരുന്നു അദ്ദേഹം. ഇന്ത്യയുടെ അഭിമാന പദ്ധതിയായ ഗഗൻയാൻ ദൗത്യത്തിന്റെ തയ്യാറെടുപ്പുകൾ ദ്രുതഗതിയിൽ പുരോഗമിക്കുകയാണെന്നും ആദ്യ ആളില്ലാ പരീക്ഷണ വിക്ഷേപണം ഉടൻ നടക്കുമെന്നും അദ്ദേഹം വ്യക്തമാക്കി.",
  bodyParagraphs: [
    "ചന്ദ്രയാൻ–4 ദൗത്യം സങ്കീർണ്ണമായ മൾട്ടിપൾ മൊഡ്യൂൾ രീതിയിലാണ് വിഭാവനം ചെയ്തിരിക്കുന്നത്. രണ്ടു വ്യത്യസ്ത റോക്കറ്റുകളിലായി വിക്ഷേപിക്കുന്ന പേലോഡുകൾ ബഹിരാകാശത്ത് വെച്ച് സംയോജിപ്പിക്കുന്ന (സ്‌പേസ് ഡോക്കിങ്) അത്യാധുനിക സാങ്കേതികവിദ്യ ഇതിലൂടെ പരീക്ഷിക്കും. ചന്ദ്രനിലിറങ്ങി മണ്ണും പാറക്കഷണങ്ങളും ശേഖരിച്ച് തിരികെ ഭൂമിയിലേക്ക് സുരക്ഷിതമായി തിരിച്ചെത്തിക്കുകയാണ് ദൗത്യത്തിന്റെ പ്രധാന ലക്ഷ്യം.",
    "\"ചന്ദ്രയാൻ–3 ചന്ദ്രന്റെ ദക്ഷിണധ്രുവത്തിൽ സോഫ്റ്റ് ലാൻഡിങ് നടത്തി ചരിത്രം സൃഷ്ടിച്ചെങ്കിൽ, സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കുക എന്ന ഇതിലും വലിയ വെല്ലുവിളിയാണ് ചന്ദ്രയാൻ–4 ഏറ്റെടുക്കുന്നത്. ഇതിനായുള്ള ശാസ്ത്രീയ രൂപരേഖയും എഞ്ചിനീയറിങ് മാതൃകകളും പൂർത്തിയായിക്കഴിഞ്ഞു,\" എന്ന് എസ്. സോമനാഥ് പറഞ്ഞു.",
    "ഇന്ത്യ തദ്ദേശീയമായി നിർമ്മിക്കുന്ന ഭാരതീയ അന്തരീക്ഷ സ്റ്റേഷൻ (BAS) 2035 ഓടെ ഭ്രമണപഥത്തിൽ സ്ഥാപിക്കുമെന്നും 2040–ഓടെ ഒരു ഇന്ത്യക്കാരനെ ചന്ദ്രനിലിറക്കുകയാണ് ലക്ഷ്യമെന്നും ചെയർമാൻ കൂട്ടിച്ചേർത്തു. ഗഗൻയാൻ ദൗത്യത്തിനായുള്ള നാല് യാത്രികരുടെ പരിശീലനവും പേടകത്തിന്റെ സുരക്ഷാ പരീക്ഷണങ്ങളും വിജയകരമായി പൂർത്തിയായി വരികയാണ്."
  ],
  closingParagraph: "ഇന്ത്യൻ ബഹിരാകാശ ഏജൻസിയുടെ തുടർച്ചയായ വിജയങ്ങൾ ആഗോള തലത്തിൽ ഇന്ത്യയുടെ യശസ്സ് ഉയർത്തിയതായും വരും വർഷങ്ങളിൽ വിദേശ ഉപഗ്രഹ വിക്ഷേപണ രംഗത്തും നിർണായക നേട്ടങ്ങൾ കൈവരിക്കുമെന്നും അദ്ദേഹം പ്രത്യാശ പ്രകടിപ്പിച്ചു.",
  keywords: ["ഐഎസ്ആർഒ", "ചന്ദ്രയാൻ-4", "ഗഗൻയാൻ", "എസ്. സോമനാഥ്", "ബഹിരാകാശം", "ശാസ്ത്രം"],
  style: "standard",
  targetLanguage: "ml",
  generatedAt: new Date().toISOString(),
  wordCount: 265,
  readingTimeMinutes: 2
};

export const MOCK_FACTCHECK_ML: FactCheckResult = {
  summary: {
    totalChecked: 7,
    supportedCount: 6,
    needsVerificationCount: 1,
    unsupportedCount: 0,
    missingDetailsCount: 0,
    overallIntegrityScore: 94
  },
  items: [
    {
      id: "fact-ml-1",
      category: "name",
      statement: "ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ്",
      sourceReference: "എസ്. സോമനാഥ് (ഐഎസ്ആർഒ ചെയർമാൻ അഭിമുഖം)",
      status: "supported",
      explanation: "ഐഎസ്ആർഒ ചെയർമാന്റെ പേരും പദവിയും ഉറവിടത്തിൽ വ്യക്തമായി പരാമർശിച്ചിട്ടുണ്ട്."
    },
    {
      id: "fact-ml-2",
      category: "date",
      statement: "ചന്ദ്രയാൻ–4 വിക്ഷേപണം 2028–ൽ",
      sourceReference: "2028-ൽ ചന്ദ്രയാൻ-4 വിക്ഷേപിക്കും",
      status: "supported",
      explanation: "വിക്ഷേപണ വർഷം ഉറവിടത്തിലെ തീയതിയുമായി കൃത്യമായി ഒത്തുപോകുന്നു."
    },
    {
      id: "fact-ml-3",
      category: "location",
      statement: "തിരുവനന്തപുരത്ത് വെച്ച് നടത്തിയ പ്രസ്താവന",
      sourceReference: "തിരുവനന്തപുരം വിഎസ്എസ്സി കേന്ദ്രത്തിൽ നടന്ന കൂടിക്കാഴ്ച",
      status: "supported",
      explanation: "പത്രസമ്മേളന വേദി തിരുവനന്തപുരമാണെന്ന് ഉറവിടത്തിൽ സ്ഥിരീകരിച്ചിട്ടുണ്ട്."
    },
    {
      id: "fact-ml-4",
      category: "claim",
      statement: "ബഹിരാകാശത്തെ ഡോക്കിങ് സാങ്കേതികവിദ്യ പരീക്ഷിക്കും",
      sourceReference: "രണ്ട് മൊഡ്യൂളുകൾ ബഹിരാകാശത്ത് സംയോജിപ്പിക്കുന്ന ഡോക്കിങ് രീതി",
      status: "supported",
      explanation: "സാങ്കേതിക പ്രക്രിയ ഉറവിട വിവരണത്തിന് അനുസൃതമാണ്."
    },
    {
      id: "fact-ml-5",
      category: "date",
      statement: "ഭാരതീയ അന്തരീക്ഷ സ്റ്റേഷൻ 2035-ഓടെ സ്ഥാപിക്കും",
      sourceReference: "2035-ഓടെ BAS പൂർത്തിയാക്കും",
      status: "supported",
      explanation: "ഭാവി സ്റ്റേഷൻ പൂർത്തീകരണ ലക്ഷ്യ തീയതി ശരിയാണ്."
    },
    {
      id: "fact-ml-6",
      category: "quote",
      statement: "\"ചന്ദ്രനിൽ നിന്ന് സാമ്പിളുകൾ സുരക്ഷിതമായി ഭൂമിയിലെത്തിക്കുക പ്രധാന ലക്ഷ്യം\"",
      sourceReference: "എസ്. സോമനാഥിന്റെ വാക്കുകൾ",
      status: "supported",
      explanation: "അഭിമുഖത്തിലെ പ്രസ്താവന അതേപടി ഉദ്ധരിച്ചിരിക്കുന്നു."
    },
    {
      id: "fact-ml-7",
      category: "number",
      statement: "2040–ഓടെ ഇന്ത്യക്കാരനെ ചന്ദ്രനിലിറക്കും",
      sourceReference: "2040 ലൂണാർ ഹ്യൂമൻ ലാൻഡിങ് ലക്ഷ്യം",
      status: "needs_verification",
      explanation: "ഉറവിടത്തിൽ സൂചനയുണ്ടെങ്കിലും അന്തിമ കാബിനറ്റ് അംഗീകാരത്തിന്റെ തീയതി സ്ഥിരീകരിച്ചിട്ടില്ല."
    }
  ],
  checkedAt: new Date().toISOString()
};

export const MOCK_ANALYSIS_EN: SourceAnalysisResult = {
  mainEvent: "ISRO Chairman S. Somanath outlines timeline and objectives for Chandrayaan-4 and Gaganyaan missions.",
  mainSubject: "India's Lunar Exploration and Human Spaceflight Roadmap",
  fiveWs: {
    who: "S. Somanath (Chairman, Indian Space Research Organisation)",
    what: "Announced Chandrayaan-4 lunar sample return mission slated for 2028; Gaganyaan uncrewed test flight scheduled for late 2025",
    when: "Press interaction in Thiruvananthapuram; targets 2028 and 2035 milestones",
    where: "Vikram Sarabhai Space Centre (VSSC), Thiruvananthapuram, Kerala",
    why: "To bring lunar soil samples to Earth and establish independent human spaceflight capabilities",
    how: "Using space-docking technology to assemble dual modules launched via two separate launch vehicles"
  },
  entities: {
    names: ["S. Somanath", "Dr. S. Unnikrishnan Nair"],
    places: ["Thiruvananthapuram", "Sriharikota", "Bengaluru"],
    organizations: ["ISRO", "VSSC"],
    dates: ["2028", "Late 2025", "2035", "2040"],
    numbersAndStats: ["4-part mission architecture", "2 separate rocket launches", "350 kg return module"],
    directQuotes: [
      "\"Bringing lunar samples safely back to Earth is the principal objective of Chandrayaan-4.\"",
      "\"The initial uncrewed test flight for Gaganyaan will be launched shortly.\""
    ],
    supportingDetails: [
      "Follows the historic success of Chandrayaan-3 soft-landing near the lunar south pole.",
      "Bharatiya Antariksha Station planned for deployment by 2035."
    ],
    unclearOrMissing: [
      "Total estimated budgetary allocation not officially disclosed in the source.",
      "Specific international tracking ground-station partnerships not detailed."
    ]
  },
  summaryPointCount: 5
};

export const MOCK_ARTICLE_EN: GeneratedArticle = {
  headline: "Chandrayaan-4 Scheduled for 2028 Launch, Gaganyaan Tests in Final Phase: ISRO Chief",
  alternativeHeadlines: [
    "India to Retrieve Lunar Soil Samples with Chandrayaan-4 in 2028: S. Somanath",
    "ISRO Unveils Next Big Leap: Chandrayaan-4 and Human Spaceflight Milestones",
    "Space Exploration Roadmap: India Targets 2028 for Moon Sample Return"
  ],
  summary: "ISRO Chairman S. Somanath has confirmed that the ambitious Chandrayaan-4 lunar sample-return mission will be launched in 2028. Meanwhile, preliminary uncrewed test flights for the flagship Gaganyaan human space mission are entering their final stages.",
  leadParagraph: "THIRUVANANTHAPURAM: Building on the historic touchdown of Chandrayaan-3, the Indian Space Research Organisation (ISRO) is advancing towards its next major lunar milestone — the Chandrayaan-4 sample return mission, slated for launch in 2028, ISRO Chairman S. Somanath announced here on Wednesday. Speaking to journalists at the Vikram Sarabhai Space Centre, he noted that key design parameters have been finalised and tests for the Gaganyaan crewed mission are progressing at a brisk pace.",
  bodyParagraphs: [
    "Chandrayaan-4 represents a substantial technological jump over its predecessor. Unlike single-stack missions, it will involve launching modular components across two distinct rockets and executing an intricate docking manoeuvre in space before heading towards lunar orbit. Once on the Moon, a dedicated robotic arm will harvest core soil and rock samples before initiating an ascent burn to return them safely to Earth.",
    "\"While Chandrayaan-3 demonstrated our capability for precision soft-landing near the south pole, bringing physical samples back across cis-lunar space is a far more complex undertaking,\" Somanath explained. \"Our engineering teams have completed the preliminary architectural designs, and the mission protocols are firmly on track.\"",
    "The space agency chief also reaffirmed India's long-term roadmap, which includes deploying the first module of the indigenous Bharatiya Antariksha Station (BAS) by 2035 and achieving a crewed lunar landing by 2040. Astronaut training for the designated Gaganyaan crew members is nearing completion with rigorous safety trials underway."
  ],
  closingParagraph: "Somanath expressed confidence that India's steady cadence of indigenous space missions will bolster scientific discovery while expanding the country's footprint in the global commercial aerospace arena.",
  keywords: ["ISRO", "Chandrayaan-4", "Gaganyaan", "S. Somanath", "Space Exploration", "Science"],
  style: "standard",
  targetLanguage: "en",
  generatedAt: new Date().toISOString(),
  wordCount: 295,
  readingTimeMinutes: 2
};

export const MOCK_FACTCHECK_EN: FactCheckResult = {
  summary: {
    totalChecked: 7,
    supportedCount: 6,
    needsVerificationCount: 1,
    unsupportedCount: 0,
    missingDetailsCount: 0,
    overallIntegrityScore: 94
  },
  items: [
    {
      id: "fact-en-1",
      category: "name",
      statement: "ISRO Chairman S. Somanath",
      sourceReference: "S. Somanath, ISRO Chairman transcript",
      status: "supported",
      explanation: "Designation and name match the source document exactly."
    },
    {
      id: "fact-en-2",
      category: "date",
      statement: "Chandrayaan-4 target launch year is 2028",
      sourceReference: "Chandrayaan-4 target year 2028",
      status: "supported",
      explanation: "Directly matches the timeline quoted by the agency chief."
    },
    {
      id: "fact-en-3",
      category: "location",
      statement: "Announcement made in Thiruvananthapuram (VSSC)",
      sourceReference: "Press conference at VSSC Thiruvananthapuram",
      status: "supported",
      explanation: "Location of the briefing verified against the source text."
    },
    {
      id: "fact-en-4",
      category: "claim",
      statement: "Dual-rocket launch and space docking architecture",
      sourceReference: "Two launches with space docking for modular assembly",
      status: "supported",
      explanation: "Technical architecture is faithful to the source interview."
    },
    {
      id: "fact-en-5",
      category: "date",
      statement: "Bharatiya Antariksha Station scheduled for 2035",
      sourceReference: "BAS planned for 2035",
      status: "supported",
      explanation: "Date matches stated target."
    },
    {
      id: "fact-en-6",
      category: "quote",
      statement: "\"Bringing lunar samples safely back to Earth is the principal objective...\"",
      sourceReference: "Direct transcript quote from Chairman Somanath",
      status: "supported",
      explanation: "Attributed quotation matches verbatim notes."
    },
    {
      id: "fact-en-7",
      category: "number",
      statement: "Crewed lunar landing targeted for 2040",
      sourceReference: "Target 2040 for Indian astronaut on Moon",
      status: "needs_verification",
      explanation: "Aspirational target mentioned in discussion; detailed funding approval not confirmed in source."
    }
  ],
  checkedAt: new Date().toISOString()
};
