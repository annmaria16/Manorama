import { SourceInputData } from '../types';

export interface SampleStory {
  id: string;
  label: string;
  sourceType: SourceInputData['sourceType'];
  data: SourceInputData;
}

export const SAMPLE_STORIES: SampleStory[] = [
  {
    id: 'isro-transcript',
    label: 'ISRO Chief Interview (English Transcript)',
    sourceType: 'transcript',
    data: {
      title: "Exclusive Interview with ISRO Chairman S. Somanath on Moon Sample Return & Gaganyaan",
      sourceType: 'transcript',
      sourceLanguage: 'English',
      targetLanguages: ['en', 'ml', 'hi', 'ta', 'te'],
      articleStyle: 'standard',
      editorialInstructions: "Focus on the 2028 timeline, docking technique, and Gaganyaan test updates. Adhere to professional regional broadsheet editorial conventions.",
      content: `INTERVIEW TRANSCRIPT
Location: Vikram Sarabhai Space Centre (VSSC), Thiruvananthapuram
Date: October 24
Interviewer: Manorama Science Bureau
Subject: S. Somanath, Chairman, Indian Space Research Organisation (ISRO)

Q: Chairman Sir, following the historic achievement of Chandrayaan-3, what is the roadmap for Chandrayaan-4?
S. Somanath: "Chandrayaan-4 is in advanced planning stages. We are aiming for a 2028 launch date. This mission is far more challenging than Chandrayaan-3 because it is a sample-return mission. We are not just landing; we have to drill into lunar regolith, collect physical rock and soil samples, seal them in a return capsule, and bring them back safely across cis-lunar space to Earth."

Q: What are the engineering challenges involved?
S. Somanath: "Because of payload weight limitations, Chandrayaan-4 cannot be launched on a single rocket. We will launch components on two separate launch vehicles and perform space docking in Earth orbit. The spacecraft will have five distinct modules: propulsion, descender, ascender, transfer module, and re-entry module. Docking in space is a critical technological capability India will demonstrate."

Q: What is the status of the Gaganyaan human spaceflight mission?
S. Somanath: "For Gaganyaan, safety of our vyomanauts is our highest priority. The uncrewed test flight with Vyommitra humanoid robot is scheduled for early next year, followed by crewed orbital flights targeted by late 2025. All four astronaut candidates have completed primary training, and system tests are ongoing at VSSC and Bengaluru."

Q: What about the proposed space station?
S. Somanath: "The Bharatiya Antariksha Station (BAS) first module will be deployed by 2035. Our ultimate target, directed by the Prime Minister, is landing an Indian on the Moon by 2040. We are building the foundational infrastructure step-by-step."`
    }
  },
  {
    id: 'wayanad-notes',
    label: 'Wayanad Rehabilitation (Malayalam Notes)',
    sourceType: 'notes',
    data: {
      title: "വയനാട് ഉരുൾപൊട്ടൽ സമഗ്ര പുനരധിവാസ പദ്ധതി - അവലോകന യോഗം",
      sourceType: 'notes',
      sourceLanguage: 'Malayalam',
      targetLanguages: ['en', 'ml', 'hi', 'ta', 'te'],
      articleStyle: 'formal',
      editorialInstructions: "Structure into formal news reports. Preserve financial figures, land area in hectares, and committee recommendations accurately.",
      content: `റിപ്പോർട്ടർ കുറിപ്പുകൾ: വയനാട് ദുരന്തബാധിത പുനരധിവാസം
വേദി: തിരുവനന്തപുരം സെക്രട്ടേറിയറ്റ് കോൺഫറൻസ് ഹാൾ
തീയതി: നവംബർ 4
പങ്കെടുത്തവർ: റവന്യൂ മന്ത്രി കെ. രാജൻ, ചീഫ് സെക്രട്ടറി, ദുരന്തനിവാരണ അതോറിറ്റി ഉദ്യോഗസ്ഥർ

പ്രധാന വിവരങ്ങൾ:
- ചൂരൽമല, മുണ്ടക്കൈ ഉരുൾപൊട്ടൽ ദുരന്തത്തിൽ വീടുകൾ നഷ്ടപ്പെട്ട 1,200 കുടുംബങ്ങൾക്കായി ആദ്യഘട്ട ടൗൺഷിപ്പ് നിർമ്മാണം.
- മേപ്പാടി പഞ്ചായത്തിലെ നെടുമ്പാല എസ്റ്റേറ്റിൽ കണ്ടെത്തിയ 64 ഹെക്ടർ ഭൂമിയിൽ പരിസ്ഥിതി സൗഹൃദ മാതൃകാ ടൗൺഷിപ്പ് ഒരുക്കും.
- പദ്ധതിക്കായി മുഖ്യമന്ത്രിയുടെ ദുരിതാശ്വാസ നിധിയിൽ നിന്നും കേന്ദ്രസഹായത്തിൽ നിന്നുമായി 750 കോടി രൂപയുടെ പ്രാഥമിക പാക്കേജ് തയാറാക്കി.
- ഓരോ കുടുംബത്തിനും 10 സെന്റ് സ്ഥലവും 1,000 ചതുരശ്ര അടി വിസ്തീർണ്ണമുള്ള ഒറ്റനില വീടും നൽകും. കുടിവെള്ളം, സ്കൂൾ, പ്രാഥമിക ആരോഗ്യകേന്ദ്രം, കമ്മ്യൂണിറ്റി ഹാൾ എന്നിവ സമുച്ചയത്തിൽ ഉണ്ടാകും.
- ആദ്യഘട്ട വീടുകളുടെ തറക്കല്ലിടൽ 2025 ജനുവരിയിൽ നടക്കും. ഒരു വർഷത്തിനകം നിർമ്മാണം പൂർത്തിയാക്കാനാണ് ലക്ഷ്യം.
- റവന്യൂ മന്ത്രി കെ. രാജന്റെ വാക്കുകൾ: "ദുരന്തബാധിതരെ കേവലം പുനരധിവസിപ്പിക്കുക മാത്രമല്ല, അവരുടെ ഉപജീവനവും സംസ്കാരവും നിലനിർത്തുന്ന സുരക്ഷിതമായ പുതിയ തുടക്കമാണ് ലക്ഷ്യമിടുന്നത്."
- പ്രതിപക്ഷ പ്രതിനിധികളും വ്യാപാരി വ്യവസായി ഏകോപന സമിതിയുമായും അടുത്തയാഴ്ച കൽപ്പറ്റയിൽ പ്രത്യേക ചർച്ച നടത്തും.`
    }
  },
  {
    id: 'kochi-metro-brief',
    label: 'Kochi Water Metro Expansion (English Brief)',
    sourceType: 'brief',
    data: {
      title: "Kochi Water Metro Expands Operations to Infopark and Fort Kochi",
      sourceType: 'brief',
      sourceLanguage: 'English',
      targetLanguages: ['en', 'ml', 'hi', 'ta', 'te'],
      articleStyle: 'standard',
      editorialInstructions: "Highlight passenger milestones, electric vessel fleet additions, and environmental benefits.",
      content: `NEWS BRIEF:
Kochi Water Metro, the country's first integrated water transport network, marked a new milestone on Tuesday with the induction of four new battery-electric hybrid vessels built by Cochin Shipyard Limited (CSL).

Key Facts:
- Total fleet strength now reaches 16 air-conditioned catamaran electric boats.
- New terminal connecting High Court to Infopark Kakkanad to open for commercial operations next Monday, cutting commute time for IT professionals from 70 minutes by road to 28 minutes by water.
- Over 2.5 million passengers transported since commercial launch in April 2023.
- Ticket fares kept affordable between Rs 20 and Rs 40.
- KMRL Managing Director Loknath Behera announced that solar-powered charging infrastructure at all 10 operational terminals has reduced carbon emissions by an estimated 1,400 tonnes annually.
- Expansion to Mattancherry, Kumbalangi, and Willingdon Island slated for completion by mid-2025.`
    }
  },
  {
    id: 'kerala-ai-draft',
    label: 'Kerala AI & Startup Draft (English Draft)',
    sourceType: 'draft',
    data: {
      title: "Kerala Unveils Draft AI & DeepTech Mission with Rs 500 Cr Seed Fund",
      sourceType: 'draft',
      sourceLanguage: 'English',
      targetLanguages: ['en', 'ml', 'hi', 'ta', 'te'],
      articleStyle: 'feature',
      editorialInstructions: "Highlight technological transformation, compute access for students, and regional language AI.",
      content: `DRAFT ARTICLE:
Kerala is gearing up for a significant digital transformation with the release of the draft Kerala AI Mission Policy 2025-2030. Announced at the Technopark campus in Thiruvananthapuram, the initiative seeks to establish the state as India's premier hub for ethical artificial intelligence and applied generative technology.

The policy proposes a dedicated Rs 500-crore DeepTech seed fund to nurture 250 AI-focused homegrown startups over the next five years. Jointly spearheaded by the Kerala Startup Mission (KSUM) and Digital University Kerala, the mission will build high-performance computing clusters with 1,000 GPU nodes accessible to student entrepreneurs and researchers at subsidized rates.

Industries Minister P. Rajeeve stated that the policy places high priority on local language technologies, climate resilience modelling for the Western Ghats, and healthcare diagnostics. "We are committed to building an ecosystem where technological breakthroughs directly uplift local communities," Rajeeve observed during the policy round-table.`
    }
  }
];
