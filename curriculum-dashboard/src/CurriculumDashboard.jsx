import { useState } from "react";

const MODULES = [
  {
    id: "positionality",
    domain: "foundation",
    pill: "Do first",
    pillColor: "#FCEBEB",
    pillText: "#A32D2D",
    title: "Positionality piece",
    sub: "Why you, for this community — the artifact every audience reads first",
    time: "60 min sprint",
    exits: "Public post",
    urgent: true,
    steps: [
      "20 min — Write one honest paragraph: your relationship to the founders/builders and communities your marketplace serves. Not a pitch. Not credentials. Your actual proximity to this problem.",
      "20 min — Address the implicit question directly: why are you building this, for these people, at this moment? What have you witnessed that others haven't?",
      "20 min — Publish it. Somewhere public. This is the piece that makes every other artifact credible to community participants who have seen extractive research before.",
    ],
    academic: "Your own experience as primary source · Positionality frameworks from Harvard GSD qualitative methods",
    adhd: "Personal narrative is the highest-engagement encoding mode. You already know this story — the sprint is just making it legible.",
    advisors: [
      { type: "outsider", label: "Outsider: would a skeptical community member trust this?", urgent: true },
      { type: "contrarian", label: "Contrarian: are you being honest or strategic?", urgent: true },
    ],
    prompt: "Help me write my positionality piece — why I am building this marketplace, for these communities, at this moment. Make it honest, not a pitch. I will publish it.",
    testPrompt: "Act as a community participant who has experienced extractive research. Read my positionality piece and tell me if you would trust it. Be direct.",
  },
  {
    id: "taxonomy",
    domain: "foundation",
    pill: "Your framework",
    pillColor: "#E1F5EE",
    pillText: "#085041",
    title: "Pain taxonomy — published",
    sub: "Your known/unknown/unknown unknown construct, documented and public",
    time: "90 min sprint",
    exits: "LinkedIn post + 1-pager",
    steps: [
      "30 min — Write clean, public-facing definitions of all three pain types with real examples from a domain you know. No jargon.",
      "20 min — Find where existing frameworks (JTBD, Kano) overlap or fall short. Cite them as stress tests, not authorities.",
      "20 min — Write a 250-word LinkedIn post explaining the taxonomy to someone who has never heard of it. Ship it.",
      "20 min — Executor debrief: what exists in the world now that didn't this morning?",
    ],
    academic: "JTBD (Christensen) as stress test · Kano model · Harvard contextual inquiry — all used to pressure-test your construct, not replace it",
    adhd: "Concrete before abstract. Real examples first, theory second. Publishing creates external accountability stronger than any checklist.",
    advisors: [
      { type: "outsider", label: "Outsider: is this clear to a stranger?", urgent: true },
      { type: "contrarian", label: "Contrarian: is the construct real or invented?", urgent: true },
      { type: "firstprinciples", label: "First principles: what is pain classification actually for?" },
    ],
    prompt: "Help me write a public-facing definition of the three pain types from my practitioner framework: known pain, known unknown, unknown unknown. Use real examples. I will publish this.",
    testPrompt: "Act as the outsider advisor. Read my pain taxonomy post as someone who knows nothing about me or my field. Tell me what is unclear or unconvincing.",
  },
  {
    id: "stakeholder",
    domain: "foundation",
    pill: "Missing artifact",
    pillColor: "#FAEEDA",
    pillText: "#633806",
    title: "Stakeholder impact standard",
    sub: "Evaluating whether a fix for one side harms the other — gold for funders",
    time: "75 min sprint",
    exits: "Published 1-pager",
    steps: [
      "25 min — Pull the stakeholder impact standard from your practitioner doc. Expand it into a decision framework: what questions do you ask, in what order, before shipping any feature?",
      "25 min — Apply it to one real decision you have already made in your build. Document what it changed or confirmed.",
      "25 min — Publish it as a 1-pager. This is what a mission-aligned funder looks for and cannot currently find in your body of work.",
    ],
    academic: "Wharton two-sided market design · Harvard Social Enterprise stakeholder theory · your practitioner doc as primary source",
    adhd: "You've already done the thinking. This sprint is just making it legible. The hardest part is already complete.",
    advisors: [
      { type: "contrarian", label: "Contrarian: does this standard have real teeth?", urgent: true },
      { type: "outsider", label: "Outsider: would a funder find this credible?" },
      { type: "expansionist", label: "Expansionist: who else needs this framework?" },
    ],
    prompt: "Help me expand my stakeholder impact standard into a published decision framework. I need to show funders how I evaluate whether a decision that helps founders also considers impact on the communities being served.",
    testPrompt: "Act as a mission-aligned funder at a CDFI. Read my stakeholder impact standard. Would you find this credible? What is missing?",
  },
  {
    id: "datastory",
    domain: "proof",
    pill: "Data storytelling",
    pillColor: "#EEEDFE",
    pillText: "#3C3489",
    title: "First data story — published",
    sub: "Numbers connected to human behavior, in public",
    time: "90 min sprint",
    exits: "Published data story + one chart",
    steps: [
      "20 min — Find one publicly available dataset about a community or market you understand. Name what every column means in plain English before touching anything.",
      "25 min — Apply SCR: Situation this data describes, Complication it reveals, Resolution it points toward.",
      "20 min — Build one chart in Datawrapper. Title it as a finding, not a label.",
      "25 min — Write 200 words around that chart and publish it somewhere public.",
    ],
    academic: "Columbia Storytelling with Data · HBS case method SCR frame · Wharton visual analytics",
    adhd: "Narrative before syntax. Real community data before abstract datasets. Publishing creates consequence — stronger encoding than private notes.",
    advisors: [
      { type: "outsider", label: "Outsider: does the story land without context?", urgent: true },
      { type: "expansionist", label: "Expansionist: what could this data story become?" },
      { type: "executor", label: "Executor: what actually shipped today?" },
    ],
    prompt: "Help me find a publicly available dataset about a community or market I understand. I want to write my first data story using Situation-Complication-Resolution and publish it.",
    testPrompt: "I have written my first data story. Act as the outsider: read it as someone who knows nothing about me and tell me if the story lands without context.",
  },
  {
    id: "research",
    domain: "proof",
    pill: "Research ops",
    pillColor: "#FAECE7",
    pillText: "#712B13",
    title: "Real research op — participant-validated brief",
    sub: "One real participant, one real finding, returned and published",
    time: "2-session sprint",
    exits: "Participant-validated research brief",
    steps: [
      "Session 1 — Recruit one real person from your target segment using your own outreach. Not someone you already know well. Run a 30-min contextual inquiry. Record it.",
      "Session 1 — Synthesize: what was named, what was sensed but unnamed, what emerged as unknown unknown? Apply your pain taxonomy.",
      "Session 2 — Write a 1-page brief. Send it back to the participant. Ask if it captures their reality. That response is your validation signal.",
      "Session 2 — Publish a sanitized version. This is your first externally-validated research artifact.",
    ],
    academic: "Harvard GSD contextual inquiry · Stanford d.school synthesis methods · your practitioner framework as evaluative lens",
    adhd: "Real interview creates episodic memory — the strongest encoding type. Unexpected answers are high-salience anchors you will not forget.",
    advisors: [
      { type: "contrarian", label: "Contrarian: did you find what you expected?", urgent: true },
      { type: "outsider", label: "Outsider: would you respond to this outreach?", urgent: true },
      { type: "firstprinciples", label: "First principles: what was this interview actually for?" },
    ],
    prompt: "Help me design a contextual inquiry for one real participant from my marketplace segment. I need a 5-question guide applying my known/unknown/unknown unknown pain taxonomy.",
    testPrompt: "Help me write the outreach message to recruit a real participant. Then act as the outsider and tell me if you would respond to it.",
  },
  {
    id: "checklist",
    domain: "proof",
    pill: "Framework assessment",
    pillColor: "#FAEEDA",
    pillText: "#633806",
    title: "AI evaluation checklist — shareable tool",
    sub: "The artifact that makes your practitioner edge visible to operators",
    time: "90 min sprint",
    exits: "Published shareable tool",
    steps: [
      "20 min — Pull three real AI-synthesized research outputs from public sources. Find one where the framework was misapplied.",
      "30 min — Build your checklist: 6–8 questions a practitioner should ask before accepting any AI-classified finding. Grounded in your doc.",
      "20 min — Run the checklist against the misapplied output. Document what it catches.",
      "20 min — Publish as a shareable resource. This is what makes your framework evaluation skill visible to someone who has never met you.",
    ],
    academic: "Chicago Booth epistemics · Columbia decision science · your practitioner framework as primary source",
    adhd: "Building a usable tool is productive output — creates something real, not just notes. The checklist becomes a retrieval artifact you will actually use.",
    advisors: [
      { type: "contrarian", label: "Contrarian: what does your checklist miss?", urgent: true },
      { type: "expansionist", label: "Expansionist: who else needs this tool?" },
      { type: "outsider", label: "Outsider: would I actually use this?" },
    ],
    prompt: "Help me build an AI output evaluation checklist grounded in my practitioner framework. I need 6-8 questions that catch misapplied frameworks in AI-synthesized research. Start by finding a real example of a misapplied framework in a public AI research output.",
    testPrompt: "Act as an early-stage product leader at a mission-driven marketplace. Read my AI evaluation checklist. Would you hand this to your team? What is missing?",
  },
  {
    id: "automation",
    domain: "stakes",
    pill: "Missing artifact",
    pillColor: "#FCEBEB",
    pillText: "#A32D2D",
    title: "Automation artifact — research ops workflow",
    sub: "Your low/no-code edge, made visible to operators who would hire you",
    time: "2-session sprint",
    exits: "Published documented workflow",
    steps: [
      "Session 1 — Design a research operations workflow that uses automation to do something a researcher would otherwise do manually: outreach sequences, synthesis pipelines, participant tracking.",
      "Session 1 — Build it in your tool of choice (Langflow, Make, n8n). Doesn't need to be perfect — needs to run.",
      "Session 2 — Document it clearly: what it does, what it replaced, what it produced. One screenshot walkthrough.",
      "Session 2 — Publish the documentation. This is the artifact that separates you from every researcher who can only describe the process.",
    ],
    academic: "Your growth ecosystem framework · Langflow orchestration patterns · no-code research ops emerging practice",
    adhd: "Building activates a different learning channel than reading. A running workflow is a retrieval artifact — you will remember what you built far better than what you read.",
    advisors: [
      { type: "expansionist", label: "Expansionist: what is the bigger automation play?", urgent: true },
      { type: "contrarian", label: "Contrarian: does this actually save time or just look impressive?" },
      { type: "executor", label: "Executor: did it run? What did it produce?" },
    ],
    prompt: "Help me design a research operations automation workflow using my low/no-code tools. It should do something a researcher would otherwise do manually and produce a real output I can document and publish.",
    testPrompt: "Act as a head of product at an early-stage mission-driven marketplace. Read my automation workflow documentation. Would this make you want to bring me in?",
  },
  {
    id: "codesign",
    domain: "stakes",
    pill: "Community trust",
    pillColor: "#E1F5EE",
    pillText: "#085041",
    title: "Co-design session — documented change",
    sub: "What participants built with you, and what changed in your product because of it",
    time: "2-session sprint",
    exits: "Co-design artifact + documented build change",
    steps: [
      "Session 1 — Recruit 2–3 participants from your marketplace (both sides). Structure a 45-min co-design session: show them something unfinished, ask them to break it, rebuild it with them.",
      "Session 1 — Document the session: what they changed, what they rejected, what surprised you.",
      "Session 2 — Make one real change to your build based on what you heard. Document what changed and why.",
      "Session 2 — Publish a short account of the session and the change. This is what makes your co-design commitment visible rather than claimed.",
    ],
    academic: "Harvard Social Enterprise participatory design · Stanford d.school co-creation methods · your practitioner doc co-designer framing",
    adhd: "Live session with real people creates the strongest possible episodic memory. The surprise moments — what they reject that you expected them to love — are the highest-signal learning events.",
    advisors: [
      { type: "contrarian", label: "Contrarian: did you actually let them change anything?", urgent: true },
      { type: "outsider", label: "Outsider: does this read as genuine co-design or staged feedback?" },
      { type: "firstprinciples", label: "First principles: what is co-design actually for?" },
    ],
    prompt: "Help me design a co-design session for 2-3 participants from my marketplace. I need a structure that produces a documented artifact showing what changed in my build because of what participants told me.",
    testPrompt: "Act as a community participant who has experienced extractive research before. Read my co-design session documentation. Does this feel like genuine co-design or just consultation?",
  },
];

const ADVISORS = [
  { id: "contrarian", icon: "ti-sword", color: "#A32D2D", bg: "#FCEBEB", name: "The contrarian", role: "Hunts the fatal flaw", prompt: "Contrarian advisor: assume my current work has a fatal flaw. Hunt it down specifically. Do not soften it." },
  { id: "firstprinciples", icon: "ti-atom", color: "#185FA5", bg: "#E6F1FB", name: "First principles", role: "Asks the harder question", prompt: "First principles advisor: strip everything away. Am I solving the right problem? What is the actual question I should be asking?" },
  { id: "expansionist", icon: "ti-telescope", color: "#0F6E56", bg: "#E1F5EE", name: "The expansionist", role: "Finds the bigger play", prompt: "Expansionist advisor: what is the bigger play I am too close to see right now?" },
  { id: "outsider", icon: "ti-eye-off", color: "#5F5E5A", bg: "#F1EFE8", name: "The outsider", role: "Cannot flatter you", prompt: "Outsider advisor: you know nothing about me. Evaluate my current work with completely fresh eyes. What is unclear, unproven, or unconvincing?" },
  { id: "executor", icon: "ti-checklist", color: "#854F0B", bg: "#FAEEDA", name: "The executor", role: "Did you actually do it?", prompt: "Executor advisor: what did I actually produce today? Walk me through a structured debrief. Ask me specific questions about what exists in the world now." },
];

const DOMAIN_LABELS = { foundation: "Foundation", proof: "Proof points", stakes: "Real stakes" };
const DOMAIN_COLORS = { foundation: "#E1F5EE", proof: "#EEEDFE", stakes: "#FAECE7" };
const DOMAIN_TEXT = { foundation: "#085041", proof: "#3C3489", stakes: "#712B13" };

export default function CurriculumDashboard() {
  const [activeTab, setActiveTab] = useState("modules");
  const [activeDomain, setActiveDomain] = useState("all");
  const [expandedModule, setExpandedModule] = useState(null);
  const [sessions, setSessions] = useState([false, false, false, false, false, false, false]);
  const [expandedLeg, setExpandedLeg] = useState(null);

  const filtered = activeDomain === "all" ? MODULES : MODULES.filter(m => m.domain === activeDomain);
  const sessionCount = sessions.filter(Boolean).length;

  const openInChat = (prompt) => {
    window.parent?.postMessage({ type: "send-prompt", prompt }, "*");
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "0 auto", padding: "0 16px 80px", minHeight: "100vh", background: "#fafafa", color: "#1a1a1a" }}>

      {/* Header */}
      <div style={{ padding: "20px 0 12px", borderBottom: "0.5px solid #e0e0e0" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#888", letterSpacing: ".06em", marginBottom: 4 }}>Product research curriculum</div>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>Your body of work</h1>
        <p style={{ fontSize: 13, color: "#666", margin: "4px 0 0", lineHeight: 1.6 }}>8 proof points · 3 audiences · 5 advisors · everything exits into the world</p>
      </div>

      {/* Streak */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "0.5px solid #e0e0e0" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {sessions.map((done, i) => (
            <div key={i} onClick={() => setSessions(s => s.map((v, j) => j === i ? !v : v))}
              style={{ width: 10, height: 10, borderRadius: "50%", background: done ? "#1D9E75" : "#ddd", cursor: "pointer", transition: "background .15s" }} />
          ))}
        </div>
        <span style={{ fontSize: 12, color: "#888" }}>Sessions this week</span>
        <span style={{ fontSize: 13, fontWeight: 500, marginLeft: "auto" }}>{sessionCount} of 7</span>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 4, padding: "12px 0", borderBottom: "0.5px solid #e0e0e0" }}>
        {["modules", "legibility", "advisors"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ fontSize: 13, padding: "6px 14px", borderRadius: 20, border: "0.5px solid", borderColor: activeTab === tab ? "#1a1a1a" : "#ccc", background: activeTab === tab ? "#1a1a1a" : "transparent", color: activeTab === tab ? "#fff" : "#555", cursor: "pointer", transition: "all .15s", fontWeight: activeTab === tab ? 500 : 400 }}>
            {tab === "modules" ? "Modules" : tab === "legibility" ? "Legibility map" : "Advisors"}
          </button>
        ))}
      </div>

      {/* MODULES TAB */}
      {activeTab === "modules" && (
        <div style={{ paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["all", "foundation", "proof", "stakes"].map(d => (
              <button key={d} onClick={() => setActiveDomain(d)}
                style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "0.5px solid", borderColor: activeDomain === d ? "#1a1a1a" : "#ccc", background: activeDomain === d ? "#1a1a1a" : "transparent", color: activeDomain === d ? "#fff" : "#666", cursor: "pointer" }}>
                {d === "all" ? "All" : DOMAIN_LABELS[d]}
              </button>
            ))}
          </div>

          {filtered.map(mod => (
            <div key={mod.id} style={{ background: "#fff", border: `0.5px solid ${expandedModule === mod.id ? "#aaa" : "#e0e0e0"}`, borderRadius: 12, marginBottom: 10, overflow: "hidden", transition: "border-color .15s" }}>
              <div onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                style={{ padding: "14px 16px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 20, background: mod.pillColor, color: mod.pillText, whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>{mod.pill}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, display: "flex", alignItems: "center", gap: 8 }}>
                      {mod.title}
                      {mod.urgent && <span style={{ fontSize: 10, fontWeight: 600, background: "#FCEBEB", color: "#A32D2D", padding: "2px 7px", borderRadius: 20 }}>Urgent</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{mod.sub}</div>
                  </div>
                  <span style={{ fontSize: 18, color: "#bbb", flexShrink: 0 }}>{expandedModule === mod.id ? "−" : "+"}</span>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#999" }}>⏱ {mod.time}</span>
                  <span style={{ fontSize: 11, color: "#999" }}>→ {mod.exits}</span>
                  <span style={{ fontSize: 11, color: "#999", background: DOMAIN_COLORS[mod.domain], color: DOMAIN_TEXT[mod.domain], padding: "1px 7px", borderRadius: 20 }}>{DOMAIN_LABELS[mod.domain]}</span>
                </div>
              </div>

              {expandedModule === mod.id && (
                <div style={{ borderTop: "0.5px solid #eee", padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "#999", letterSpacing: ".04em", marginBottom: 8 }}>Sprint steps</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                    {mod.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", color: "#fff", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[["Academic anchor", mod.academic], ["ADHD encoding", mod.adhd]].map(([label, text]) => (
                      <div key={label} style={{ background: "#f7f7f5", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, fontWeight: 500, color: "#999", marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{text}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 500, color: "#999", letterSpacing: ".04em", marginBottom: 8 }}>Advisors flagged for this sprint</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                    {mod.advisors.map(adv => (
                      <span key={adv.type} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `0.5px solid ${adv.urgent ? "#E24B4A" : "#ccc"}`, background: adv.urgent ? "#FCEBEB" : "transparent", color: adv.urgent ? "#A32D2D" : "#666", cursor: "default" }}>
                        {adv.label}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => openInChat(mod.prompt)}
                      style={{ fontSize: 12, padding: "7px 14px", borderRadius: 8, border: "0.5px solid #ccc", background: "#1a1a1a", color: "#fff", cursor: "pointer" }}>
                      Begin sprint in chat ↗
                    </button>
                    <button onClick={() => openInChat(mod.testPrompt)}
                      style={{ fontSize: 12, padding: "7px 14px", borderRadius: 8, border: "0.5px solid #ccc", background: "transparent", color: "#555", cursor: "pointer" }}>
                      Test me ↗
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* LEGIBILITY TAB */}
      {activeTab === "legibility" && (
        <div style={{ paddingTop: 16 }}>
          <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>Three audiences. What each needs to see. Which proof points close which gap.</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            {[["#1D9E75", "Closes the gap"], ["#EF9F27", "Partially closes"], ["#E24B4A", "Gap not yet closed"]].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                {label}
              </div>
            ))}
          </div>

          {[
            {
              id: "funders",
              icon: "🏛",
              name: "Mission-aligned funders",
              who: "CDFI officers, impact investors, foundation program directors funding pre-product community infrastructure in underserved markets.",
              criterion: "They need evidence you understand the market failure — not just the opportunity. Proof you've been in direct contact with the communities before building.",
              skeptical: "Founders who build for underserved communities without being in relationship with them.",
              items: [
                { status: "green", name: "Research brief — participant-validated", why: "Your strongest artifact for this audience. A brief a real participant signed off on is direct evidence of relationship-based research." },
                { status: "green", name: "Pain taxonomy post", why: "Naming pain the market hasn't named yet is exactly what a funder wants to see from a pre-product founder." },
                { status: "amber", name: "Data story — marketplace finding", why: "Only useful if the data directly shows your actual market, not a proxy dataset." },
                { status: "red", name: "Gap: stakeholder impact standard not yet published", why: "Your practitioner doc describes it. Funders need to find it. This is a missing artifact." },
              ],
              prompt: "Help me write a stakeholder impact standard document for my marketplace — showing how I evaluate whether a decision that helps founders also considers impact on the communities being served. Make it publishable.",
            },
            {
              id: "operators",
              icon: "⚙️",
              name: "Early-stage operators and product leaders",
              who: "Heads of product or research at mission-driven two-sided marketplaces — civic tech, community finance, workforce development — who would hire or collaborate based on demonstrated capability.",
              criterion: "Someone who can do the work, not just describe it. A real research output, a functional tool, evidence you can translate findings into decisions.",
              skeptical: "People who talk about research methodology without showing a research artifact. Low/no-code practitioners who can't demonstrate what the output actually does.",
              items: [
                { status: "green", name: "AI evaluation checklist — shareable tool", why: "A published usable tool a product leader could hand to their team earns operational credibility immediately." },
                { status: "green", name: "Research brief — participant-validated", why: "A real output with a real participant validates you can run the process, not just describe it." },
                { status: "amber", name: "Pain taxonomy post", why: "Useful as a signal of thinking quality, but needs a companion artifact showing the taxonomy applied to a real decision." },
                { status: "red", name: "Gap: no automation artifact yet", why: "Your low/no-code background is your differentiation for this audience — but nothing shows it yet. A documented workflow would close this gap entirely." },
              ],
              prompt: "Help me design a simple automation artifact I can publish that shows my low/no-code research operations capability. It should connect to my marketplace context and produce something a product team would find useful.",
            },
            {
              id: "community",
              icon: "🤝",
              name: "Founding community participants",
              who: "Founders and builders who are resource-constrained and skeptical of platforms claiming to serve them. Service providers already working in underserved communities who have seen extractive tech before.",
              criterion: "Proof that you listened before you built, and that what you heard shaped what you're building. Not a pitch. Not a product demo.",
              skeptical: "Another platform built by someone outside the experience, for people inside it. Research that extracts their story without giving anything back.",
              items: [
                { status: "green", name: "Pain taxonomy — the unknown unknown layer specifically", why: "When you name something they felt but couldn't articulate, trust activates immediately. This is your highest-leverage artifact for this audience." },
                { status: "green", name: "Research brief — returned to participant", why: "Sending the brief back is the act that distinguishes you from extractive research. The gesture matters as much as the artifact." },
                { status: "red", name: "Gap: no positionality piece", why: "This audience will ask — implicitly — why you. That absence is loud to people who have been researched by outsiders before." },
                { status: "red", name: "Gap: no co-design artifact", why: "Your practitioner doc commits to co-design. Nothing in your proof points shows it happened yet." },
              ],
              prompt: "Help me write a short, honest public piece about my positionality relative to the communities my marketplace serves. For founders and service providers who have experienced extractive research.",
            },
          ].map(aud => (
            <div key={aud.id} style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
              <div onClick={() => setExpandedLeg(expandedLeg === aud.id ? null : aud.id)}
                style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{aud.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{aud.name}</div>
                  <div style={{ fontSize: 12, color: "#777", marginTop: 3, lineHeight: 1.5 }}>{aud.who}</div>
                </div>
                <span style={{ fontSize: 18, color: "#bbb", flexShrink: 0 }}>{expandedLeg === aud.id ? "−" : "+"}</span>
              </div>

              {expandedLeg === aud.id && (
                <div style={{ borderTop: "0.5px solid #eee", padding: "14px 16px" }}>
                  <div style={{ background: "#f7f7f5", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#999", marginBottom: 4 }}>They take you seriously when they see</div>
                    <div style={{ fontSize: 13, color: "#333", fontStyle: "italic", lineHeight: 1.6 }}>"{aud.criterion}"</div>
                  </div>
                  <div style={{ background: "#FCEBEB", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#A32D2D", marginBottom: 4 }}>What they're skeptical of</div>
                    <div style={{ fontSize: 12, color: "#712B13", lineHeight: 1.6 }}>{aud.skeptical}</div>
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 500, color: "#999", marginBottom: 8 }}>Proof points mapped</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                    {aud.items.map((item, i) => {
                      const colors = { green: { border: "#1D9E75", bg: "#E1F5EE", dot: "#1D9E75", text: "#085041" }, amber: { border: "#EF9F27", bg: "#FAEEDA", dot: "#EF9F27", text: "#633806" }, red: { border: "#E24B4A", bg: "#FCEBEB", dot: "#E24B4A", text: "#A32D2D" } };
                      const c = colors[item.status];
                      return (
                        <div key={i} style={{ display: "flex", gap: 10, padding: "8px 10px", borderRadius: 8, border: `0.5px solid ${c.border}`, background: c.bg }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 5 }} />
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: c.text }}>{item.name}</div>
                            <div style={{ fontSize: 11, color: "#555", marginTop: 2, lineHeight: 1.5 }}>{item.why}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={() => openInChat(aud.prompt)}
                    style={{ fontSize: 12, padding: "7px 14px", borderRadius: 8, border: "0.5px solid #ccc", background: "#1a1a1a", color: "#fff", cursor: "pointer" }}>
                    Build missing artifact in chat ↗
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADVISORS TAB */}
      {activeTab === "advisors" && (
        <div style={{ paddingTop: 16 }}>
          <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>Summon any advisor directly into your chat at any point. They operate on your real work — not practice scenarios.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ADVISORS.map(adv => (
              <div key={adv.id} style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: adv.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${adv.icon}`} style={{ fontSize: 20, color: adv.color }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{adv.name}</div>
                    <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{adv.role}</div>
                    <div style={{ fontSize: 12, color: "#555", marginTop: 8, lineHeight: 1.6, background: "#f7f7f5", borderRadius: 8, padding: "8px 12px", fontStyle: "italic" }}>"{adv.prompt}"</div>
                  </div>
                </div>
                <button onClick={() => openInChat(adv.prompt)}
                  style={{ marginTop: 12, fontSize: 12, padding: "7px 14px", borderRadius: 8, border: "0.5px solid #ccc", background: "transparent", color: "#555", cursor: "pointer", width: "100%" }}>
                  Summon in chat ↗
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
