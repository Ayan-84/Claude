# Social Connections & Growth Orchestration

## What This Project Is

This is an event-based automation system for growing awareness, shaping narrative,
and nurturing community. It is built on **Langflow** (visual flow builder, open source)
and **Ollama** (local LLM runtime, zero API cost).

The project consists of a learn-by-doing guide with 13 chapters. Each chapter builds
a working automation from scratch. Chapters 1-2 are complete. Chapters 3-13 are in
development.

## Architecture Pattern

Every automation follows this core pattern:

```
TRIGGER → INGEST → PROCESS → FORMAT → OUTPUT
```

- **Trigger:** The event that starts the flow (webhook, RSS, cron, manual input)
- **Ingest:** Normalize raw data into a clean schema
- **Process:** LLM-powered analysis, classification, or extraction
- **Format:** Shape output for destinations (fan-out branching to multiple platforms)
- **Output:** Deliver formatted content (APIs, files, review queues)

## Design Principles

1. **Trigger-Logic Decoupling** — Triggers are swappable without changing processing logic
2. **Separation of Comprehension and Generation** — Analysis (low temp 0.2-0.4) then Format (higher temp 0.6-0.8) as separate LLM calls
3. **Structured Intermediate Representations** — Each LLM stage outputs predictable structure as a contract for downstream stages
4. **Fan-Out Branching** — One analysis feeds multiple platform-specific format branches
5. **Logic First, Triggers Second** — Build and test with manual trigger, then swap to production trigger
6. **Payload Design** — Every webhook flow has a documented JSON schema

## Target Platforms (10)

LinkedIn, Twitter/X, Bluesky, Instagram, Email, Substack, Reddit,
Facebook Communities, GitHub Communities, Low/No-Code Dev Communities

## Repo Structure

```
guide/           → The learn-by-doing guide document (chapters 1-13)
prompts/         → LLM prompt templates (one per file, easy to iterate)
  analysis.md    → Stage 2: Content analysis prompt (temp 0.2-0.4)
  linkedin.md    → Platform format prompts (temp 0.6-0.8)
  twitter.md
  bluesky.md
  instagram.md
  email.md
  substack.md
  reddit.md
  facebook.md
  github.md
  dev-communities.md
flows/           → Exported Langflow flow JSON files
scripts/         → Helper scripts (curl test commands, setup scripts)
skill/           → Claude skill for this project (growth-flow-architect)
```

## How to Help

When I ask for help with this project, here is what I typically need:

- **"Build chapter X"** → Design the full Langflow flow architecture following the
  TRIGGER → INGEST → PROCESS → FORMAT → OUTPUT pattern. Write the LLM prompts.
  Document it in guide chapter format.
- **"Fix/improve the [platform] prompt"** → Diagnose whether the issue is in analysis
  or formatting. Refine the prompt with platform-specific constraints.
- **"Add a new platform"** → Analyze the platform's structural conventions, audience
  psychology, and content culture. Write a format prompt following the existing pattern.
- **"Design a flow for [use case]"** → Map it to the architecture pattern, specify
  Langflow components, write prompts, define payload schemas.

## Langflow Specifics

- Runs locally at http://localhost:7860
- Each LLM call needs its own Ollama component instance
- Fan-out = multiple connections from one output handle
- Prompt components auto-detect {variable} placeholders
- Every flow is automatically an API endpoint
- Current version: 1.7.1+ (important for webhook auth support)

## Ollama Specifics

- Runs locally at http://localhost:11434
- Default model: llama3.1:8b (start here, upgrade later)
- Larger models (70B+) produce better platform-native voice
- Model swap is a one-click operation per Ollama component in Langflow

## Use Case Roadmap

| Ch | Use Case | Status |
|----|----------|--------|
| 1 | Content Atomization (manual trigger) | COMPLETE |
| 2 | Content Atomization (webhook trigger) | COMPLETE |
| 3 | COPE (Create Once, Publish Everywhere) | TODO |
| 4 | Digital / Social Listening | TODO |
| 5 | Engagement Routing | TODO |
| 6 | Sentiment-Triggered Escalation | TODO |
| 7 | UGC Curation | TODO |
| 8 | Competitor & Trend Monitoring | TODO |
| 9 | Influencer / Advocate Identification | TODO |
| 10 | Content Performance Feedback Loop | TODO |
| 11 | Social Proof Aggregation | TODO |
| 12 | Engagement-to-Nurture Handoff | TODO |
| 13 | Community Health Scoring | TODO |
