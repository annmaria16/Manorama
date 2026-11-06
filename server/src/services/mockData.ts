import { SourceAnalysisResult, GeneratedArticle, FactCheckResult } from '../types.js';

export const MOCK_ANALYSIS_COMMON: SourceAnalysisResult = {
  mainEvent: "ISRO Chairman S. Somanath outlines timeline and objectives for Chandrayaan-4 and Gaganyaan missions.",
  mainSubject: "India's Lunar Exploration and Human Spaceflight Roadmap",
  fiveWs: {
    who: "S. Somanath (Chairman, Indian Space Research Organisation)",
    what: "Announced Chandrayaan-4 lunar sample return mission slated for 2028; Gaganyaan uncrewed test flight scheduled for late 2025",
    when: "Press interaction at Thiruvananthapuram; targets 2028 and 2035 milestones",
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

export const MOCK_ARTICLE_ML: GeneratedArticle = {
  headline: "ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ; ഗഗൻയാൻ പരീക്ഷണങ്ങൾ അന്തിമഘട്ടത്തിലെന്ന് ഐഎസ്ആർഒ",
  alternativeHeadlines: [
    "ചന്ദ്രനിൽ നിന്ന് സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കാൻ ചന്ദ്രയാൻ-4: എസ്. സോമനാഥ്",
    "ബഹിരാകാശത്ത് ചരിത്രമെഴുതാൻ ഇന്ത്യ; ഗഗൻയാൻ, ചന്ദ്രയാൻ–4 സമയക്രമം പ്രഖ്യാപിച്ചു",
    "ഇന്ത്യൻ ബഹിരാകാശ കുതിപ്പ്: ചന്ദ്രയാൻ-4 വിക്ഷേപണം 2028-ൽ"
  ],
  summary: "ചന്ദ്രനിൽ നിന്നുള്ള സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കുന്ന ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ വിക്ഷേപിക്കുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് വ്യക്തമാക്കി. ഗഗൻയാൻ മനുഷ്യദൗത്യത്തിന്റെ മുന്നോടിയായുള്ള ആദ്യ ആളില്ലാ പരീക്ഷണ വിക്ഷേപണം ഈ വർഷം അവസാനത്തോടെ നടക്കും.",
  leadParagraph: "തിരുവനന്തപുരം: ചരിത്രവിജയം കുറിച്ച ചന്ദ്രയാൻ–3 ദൗത്യത്തിന് പിന്നാലെ, ചന്ദ്രന്റെ ഉപരിതലത്തിൽ നിന്ന് സാമ്പിളുകൾ ശേഖരിച്ച് ഭൂമിയിലെത്തിക്കുന്ന നിർണായകമായ ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ യാഥാർഥ്യമാകുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് അറിയിച്ചു. തിരുവനന്തപുരത്ത് വിഎസ്എസ്സിയിൽ മാധ്യമങ്ങളോട് സംസാരിക്കുകയായിരുന്നു അദ്ദേഹം. ഇന്ത്യയുടെ അഭിമാന പദ്ധതിയായ ഗഗൻയാൻ ദൗത്യത്തിന്റെ തയ്യാറെടുപ്പുകൾ ദ്രുതഗതിയിൽ പുരോഗമിക്കുകയാണെന്നും ആദ്യ ആളില്ലാ പരീക്ഷണ വിക്ഷേപണം ഉടൻ നടക്കുമെന്നും അദ്ദേഹം വ്യക്തമാക്കി.",
  bodyParagraphs: [
    "ചന്ദ്രയാൻ–4 ദൗത്യം സങ്കീർണ്ണമായ മൾട്ടിപൾ മൊഡ്യൂൾ രീതിയിലാണ് വിഭാവനം ചെയ്തിരിക്കുന്നത്. രണ്ടു വ്യത്യസ്ത റോക്കറ്റുകളിലായി വിക്ഷേപിക്കുന്ന പേലോഡുകൾ ബഹിരാകാശത്ത് വെച്ച് സംയോജിപ്പിക്കുന്ന (സ്‌പേസ് ഡോക്കിങ്) അത്യാധുനിക സാങ്കേതികവിദ്യ ഇതിലൂടെ പരീക്ഷിക്കും. ചന്ദ്രനിലിറങ്ങി മണ്ണും പാറക്കഷണങ്ങളും ശേഖരിച്ച് തിരികെ ഭൂമിയിലേക്ക് സുരക്ഷിതമായി തിരിച്ചെത്തിക്കുകയാണ് ദൗത്യത്തിന്റെ പ്രധാന ലക്ഷ്യം.",
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

export const MOCK_ARTICLE_HI: GeneratedArticle = {
  headline: "चंद्रयान-4 मिशन 2028 में होगा लॉन्च, गगनयान परीक्षण अंतिम चरण में: इसरो प्रमुख",
  alternativeHeadlines: [
    "चांद से नमूने वापस लाएगा चंद्रयान-4: इसरो प्रमुख एस. सोमनाथ की घोषणा",
    "भारतीय अंतरिक्ष अभियान: 2028 में चंद्रयान-4 और 2035 तक अंतरिक्ष स्टेशन का लक्ष्य",
    "इसरो का नया इतिहास: अंतरिक्ष डॉकिंग तकनीक के साथ जाएगा चंद्रयान-4"
  ],
  summary: "भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) के अध्यक्ष एस. सोमनाथ ने घोषणा की है कि चंद्रयान-4 चंद्र नमूना वापसी मिशन 2028 में प्रक्षेपित किया जाएगा। वहीं गगनयान मानव अंतरिक्ष मिशन के मानव रहित परीक्षण भी अंतिम चरण में हैं।",
  leadParagraph: "तिरुवनंतपुरम: चंद्रयान-3 की ऐतिहासिक सफलता के बाद, इसरो अब चंद्रमा से मिट्टी और चट्टानों के नमूने धरती पर वापस लाने के महत्वाकांक्षी चंद्रयान-4 मिशन की दिशा में तेजी से आगे बढ़ रहा है। इसरो अध्यक्ष एस. सोमनाथ ने विक्रम साराभाई अंतरिक्ष केंद्र (VSSC) में पत्रकारों से बात करते हुए बताया कि चंद्रयान-4 को 2028 में लॉन्च करने का लक्ष्य निर्धारित किया गया है।",
  bodyParagraphs: [
    "सोमनाथ ने बताया कि चंद्रयान-4 एक बेहद जटिल अभियान होगा। इसे दो अलग-अलग रॉकेटों के जरिए अंतरिक्ष में भेजा जाएगा और पृथ्वी की कक्षा में दोनों हिस्सों को जोड़ने (स्पेस डॉकिंग) की उन्नत तकनीक का इस्तेमाल किया जाएगा। अंतरिक्ष यान में पांच मुख्य मॉड्यूल शामिल होंगे।",
    "\"चंद्रयान-3 ने जहां चंद्रमा के दक्षिणी ध्रुव पर सफल सॉफ्ट लैंडिंग की, वहीं चंद्रयान-4 चांद से सतह के नमूने एकत्र कर सुरक्षित रूप से वापस लाने का जटिल कार्य पूरा करेगा,\" इसरो प्रमुख ने कहा।",
    "उन्होंने यह भी स्पष्ट किया कि गगनयान मिशन के लिए भारतीय अंतरिक्ष यात्रियों का प्राथमिक प्रशिक्षण पूरा हो चुका है। इसके साथ ही भारत 2035 तक अपना अंतरिक्ष स्टेशन 'भारतीय अंतरिक्ष स्टेशन' स्थापित करेगा और 2040 तक भारतीय को चांद पर उतारने का लक्ष्य है।"
  ],
  closingParagraph: "इसरो प्रमुख ने विश्वास जताया कि भारत का स्वदेशी अंतरिक्ष कार्यक्रम भविष्य में वैश्विक अंतरिक्ष विज्ञान के क्षेत्र में नए प्रतिमान स्थापित करेगा।",
  keywords: ["इसरो", "चंद्रयान-4", "गगनयान", "एस. सोमनाथ", "अंतरिक्ष विज्ञान"],
  style: "standard",
  targetLanguage: "hi",
  generatedAt: new Date().toISOString(),
  wordCount: 248,
  readingTimeMinutes: 2
};

export const MOCK_ARTICLE_TA: GeneratedArticle = {
  headline: "சந்திரயான்-4 விண்கலம் 2028-ல் விண்ணில் பாயும்; ககன்யான் சோதனை இறுதிக்கட்டம்: இஸ்ரோ தலைவர்",
  alternativeHeadlines: [
    "நிலவிலிருந்து மண் மாதிரிகளை கொண்டுவர சந்திரயான்-4 திட்டம்: எஸ். சோம்நாத்",
    "விண்வெளியில் இந்தியா புதிய சாதனை; சந்திரயான்-4 மற்றும் ககன்யான் கால அட்டவணை வெளியீடு",
    "இஸ்ரோவின் அடுத்த பிரம்மாண்ட பாய்ச்சல்: 2028-ல் சந்திரயான்-4 ஏவுதல்"
  ],
  summary: "நிலவின் மேற்பரப்பிலிருந்து மாதிரிகளை பூமிக்கு கொண்டுவரும் சந்திரயான்-4 விண்கலம் 2028-ல் விண்ணில் செலுத்தப்படும் என்று இஸ்ரோ தலைவர் எஸ். சோம்நாத் திருவனந்தபுரத்தில் தெரிவித்துள்ளார். ககன்யான் மனித விண்வெளி பயணத்தின் சோதனைகளும் இறுதிக்கட்டத்தை எட்டியுள்ளன.",
  leadParagraph: "திருவனந்தபுரம்: சந்திரயான்-3 விண்கலத்தின் வரலாற்று சிறப்புமிக்க வெற்றிக்கு பிறகு, நிலவிலிருந்து மண் மற்றும் பாறை மாதிரிகளை பூமிக்கு கொண்டுவரும் சந்திரயான்-4 திட்டம் 2028-ல் செயல்படுத்தப்படும் என்று இஸ்ரோ தலைவர் எஸ். சோம்நாத் அறிவித்துள்ளார். திருவனந்தபுரத்தில் உள்ள விக்ரம் சாராபாய் விண்வெளி மையத்தில் (VSSC) செய்தியாளர்களிடம் அவர் பேசினார்.",
  bodyParagraphs: [
    "சந்திரயான்-4 திட்டம் முந்தைய திட்டங்களை விட மிகுந்த தொழில்நுட்ப சவால்களை கொண்டது. இருவேறு ராக்கெட்டுகள் மூலம் விண்கல பாகங்கள் ஏவப்பட்டு, விண்வெளியில் அவை ஒன்றிணைக்கப்படும் (ஸ்பேஸ் டாக்கிங்) அதிநவீன தொழில்நுட்பம் இதில் சோதிக்கப்படும்.",
    "\"சந்திரயான்-3 நிலவின் தென் துருவத்தில் வெற்றிகரமாக தரை இறங்கியது. ஆனால் சந்திரயான்-4 அங்குள்ள மாதிரிகளை பாதுகாப்பாக பூமிக்கு கொண்டுவரும் பெரும் சவாலை நிறைவேற்றும்,\" என்று சோம்நாத் தெரிவித்தார்.",
    "மேலும், இந்தியாவின் சொந்த விண்வெளி நிலையமான 'பாரதிய அந்தரிக்ஷ ஸ்டேஷன்' 2035-க்குள் நிறுவப்படும் என்றும், 2040-க்குள் இந்தியரை நிலவில் தரையிறக்க இலக்கு நிர்ணயிக்கப்பட்டுள்ளதாகவும் அவர் தெரிவித்தார்."
  ],
  closingParagraph: "இஸ்ரோவின் தொடர் வெற்றிகள் சர்வதேச அளவில் இந்தியாவின் பெருமையை உயர்த்தியுள்ளதாக அவர் பெருமிதத்துடன் கூறினார்.",
  keywords: ["இஸ்ரோ", "சந்திரயான்-4", "ககன்யான்", "எஸ். சோம்நாத்", "விண்வெளி"],
  style: "standard",
  targetLanguage: "ta",
  generatedAt: new Date().toISOString(),
  wordCount: 232,
  readingTimeMinutes: 2
};

export const MOCK_ARTICLE_TE: GeneratedArticle = {
  headline: "2028లో చంద్రయాన్-4 ప్రయోగం; గగన్‌యాన్ పరీక్షలు ముమ్మరం: ఇస్రో ఛైర్మన్ ఎస్. సోమనాథ్",
  alternativeHeadlines: [
    "చంద్రుడిపై నుంచి నమూనాలు తీసుకురానున్న చంద్రయాన్-4: ఇస్రో వెల్లడి",
    "అంతరిక్షంలో సరికొత్త చరిత్రకు భారత్ నాంది; చంద్రయాన్-4 కాలపట్టిక ఖరారు",
    "భారత అంతరిక్ష పరిశోధన: 2028లో చంద్రయాన్-4 లూనార్ మిషన్"
  ],
  summary: "చంద్రుని ఉపరితలం నుంచి మట్టి, రాతి నమూనాలను భూమికి చేర్చే చంద్రయాన్-4 ప్రాజెక్టును 2028లో ప్రయోగించనున్నట్లు ఇస్రో ఛైర్మన్ ఎస్. సోమనాథ్ ప్రకటించారు. గగన్‌యాన్ మానవ సహిత యాత్ర సన్నాహాలు కూడా ముమ్మరంగా సాగుతున్నాయి.",
  leadParagraph: "తిరువనంతపురం: చంద్రయాన్-3 అద్భుత విజయంతో ప్రపంచ దృష్టిని ఆకర్షించిన భారత అంతరిక్ష పరిశోధనా సంస్థ (ఇస్రో), తదుపరి ప్రతిష్టాత్మక ప్రాజెక్ట్ చంద్రయాన్-4 ప్రయోగానికి రంగం సిద్ధం చేస్తోంది. చంద్రయాన్-4 మిషన్‌ను 2028లో ప్రయోగించనున్నట్లు ఇస్రో ఛైర్మన్ ఎస్. సోమనాథ్ తిరువనంతపురంలోని విక్రమ్ సారాభాయ్ స్పేస్ సెంటర్‌లో వెల్లడించారు.",
  bodyParagraphs: [
    "చంద్రయాన్-4 ప్రాజెక్ట్ ఎంతో సంక్లిష్టమైనదని ఆయన తెలిపారు. రెండు వేర్వేరు రాకెట్ల ద్వారా మాడ్యూళ్లను నింగిలోకి పంపి, అంతరిక్షంలో వాటిని అనుసంధానించే (స్పేస్ డాకింగ్) అత్యాధునిక సాంకేతికతను ఇందులో పరీక్షించనున్నారు.",
    "\"చంద్రయాన్-3 చంద్రుని దక్షిణ ధ్రువంపై విజయవంతంగా దిగితే, అక్కడి నమూనాలను భద్రంగా భూమికి చేర్చడమే చంద్రయాన్-4 ప్రధాన లక్ష్యం,\" అని సోమనాథ్ వివరించారు.",
    "భారత్ స్వదేశీ పరిజ్ఞానంతో నిర్మించతలపెట్టిన 'భారతీయ అంతరిక్ష స్టేషన్'ను 2035 నాటికి సిద్ధం చేస్తామని, 2040 నాటికి భారత వ్యోమగామిని చంద్రుడిపైకి పంపే ప్రణాళికలు పురోగతిలో ఉన్నాయని పేర్కొన్నారు."
  ],
  closingParagraph: "ఇస్రో చేపడుతున్న వరుస ప్రయోగాలు శాస్త్ర సాంకేతిక రంగాల్లో దేశ ప్రతిష్టను మరింత పెంచుతాయని ఛైర్మన్ విశ్వాసం వ్యక్తం చేశారు.",
  keywords: ["ఇస్రో", "చంద్రయాన్-4", "గగన్‌యాన్", "ఎస్. సోమనాథ్", "అంతరిక్షం"],
  style: "standard",
  targetLanguage: "te",
  generatedAt: new Date().toISOString(),
  wordCount: 228,
  readingTimeMinutes: 2
};

export const MOCK_FACTCHECK_COMMON: FactCheckResult = {
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
      id: "fact-1",
      category: "name",
      statement: "ISRO Chairman S. Somanath announcement",
      sourceReference: "S. Somanath, Chairman, ISRO interview transcript",
      status: "supported",
      explanation: "Designation and name match the official transcript record."
    },
    {
      id: "fact-2",
      category: "date",
      statement: "Chandrayaan-4 target launch year is 2028",
      sourceReference: "Target 2028 launch timeline",
      status: "supported",
      explanation: "Directly matches the timeline stated by the agency chief."
    },
    {
      id: "fact-3",
      category: "location",
      statement: "Announcement made at VSSC, Thiruvananthapuram",
      sourceReference: "Vikram Sarabhai Space Centre (VSSC), Thiruvananthapuram",
      status: "supported",
      explanation: "Location verified against the briefing header."
    },
    {
      id: "fact-4",
      category: "claim",
      statement: "Space-docking architecture using dual rocket launches",
      sourceReference: "Launch components on two separate launch vehicles and perform space docking",
      status: "supported",
      explanation: "Engineering mechanism is faithful to the source transcript."
    },
    {
      id: "fact-5",
      category: "date",
      statement: "Bharatiya Antariksha Station deployment by 2035",
      sourceReference: "BAS first module deployed by 2035",
      status: "supported",
      explanation: "Milestone date accurately transcribed."
    },
    {
      id: "fact-6",
      category: "quote",
      statement: "\"Bringing lunar samples safely back to Earth is the principal objective\"",
      sourceReference: "Direct quote from Chairman S. Somanath",
      status: "supported",
      explanation: "Verbatim quotation preserved."
    },
    {
      id: "fact-7",
      category: "number",
      statement: "Crewed lunar landing targeted for 2040",
      sourceReference: "Landing an Indian on the Moon by 2040",
      status: "needs_verification",
      explanation: "Long-term directional target discussed; formal cabinet sanction pending in source."
    }
  ],
  checkedAt: new Date().toISOString()
};

export const MOCK_ARTICLES_BY_LANG: Record<string, GeneratedArticle> = {
  en: MOCK_ARTICLE_EN,
  ml: MOCK_ARTICLE_ML,
  hi: MOCK_ARTICLE_HI,
  ta: MOCK_ARTICLE_TA,
  te: MOCK_ARTICLE_TE
};
