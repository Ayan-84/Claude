# Langflow Component Reference

Practical reference for building flows in Langflow with Ollama. Organized by
the stage of the TRIGGER → INGEST → PROCESS → FORMAT → OUTPUT pipeline where
each component is most commonly used.

## Table of Contents

1. Core Concepts
2. Trigger Stage Components
3. Ingest Stage Components
4. Process Stage Components
5. Format Stage Components
6. Output Stage Components
7. Utility Components
8. Flow Patterns
9. Ollama Configuration
10. Troubleshooting

---

## 1. Core Concepts

**Components** are the building blocks. Each has input handles (left side)
and output handles (right side). Data flows left to right.

**Handles are typed.** Connect output ports to input ports of the same type
(color). If types don't match, use a Type Convert component.

**Each component is a separate execution.** An Ollama component = one LLM
call. You cannot route multiple prompts through a single Ollama node. For
fan-out with 9 platforms, you need 9 Ollama instances.

**Flows are automatically API endpoints.** Every saved flow gets an endpoint:
`POST http://localhost:7860/api/v1/run/{flow-id}`. No extra configuration
needed for basic webhook behavior.

**Variables in prompts.** The Prompt component auto-detects `{variable_name}`
placeholders and creates corresponding input handles.

**Langflow version note:** Component names and locations may differ between
versions. The architecture patterns remain the same regardless of version.

---

## 2. Trigger Stage Components

### Text Input
- **Use:** Manual triggering, prototyping, human-in-the-loop
- **Location:** Inputs section in sidebar
- **Output type:** Message (text + metadata)
- **No input handles** — this is a source node (leftmost in flow)
- **When to use:** Always start here when building a new flow. Switch to
  webhook after logic is tested.

### Webhook Component
- **Use:** HTTP-triggered flows
- **Location:** Inputs or Helpers section
- **Output type:** Data (JSON payload)
- **Configuration:** HTTP method (POST), path, authentication
- **Auth (v1.7+):** Set `LANGFLOW_WEBHOOK_AUTH_ENABLE=True`, then use
  x-api-key header or URL parameter
- **Note:** For simple cases, the built-in Flow API endpoint may be
  sufficient without a dedicated Webhook component

### Flow API Endpoint (built-in)
- **Not a component** — every flow automatically has this
- **URL:** `POST http://localhost:7860/api/v1/run/{flow-id}`
- **Body:** `{"input_value": "your text here"}`
- **API key:** Configure in Langflow Settings
- **When to use:** Simplest webhook approach. Use dedicated Webhook
  component only when you need more control over payload parsing.

---

## 3. Ingest Stage Components

### Parse Data / JSON Parser
- **Use:** Extract specific fields from JSON payloads
- **When needed:** When webhook payload has nested structure and you need
  to extract the "content" field from `{"content": "...", "title": "..."}`
- **Alternative:** Code component with simple field extraction

### URL Component
- **Use:** Fetch content from a URL (RSS feeds, web pages)
- **When to use:** Ch4 (Social Listening), Ch8 (Competitor Monitoring)
- **Output:** Raw fetched content

### Code Component
- **Use:** Custom data transformation, parsing, normalization
- **Language:** Python
- **When to use:** When you need logic that doesn't fit a standard component
  (deduplication, complex field mapping, data merging)

---

## 4. Process Stage Components

### Prompt Component
- **Use:** Template for LLM instructions
- **Key feature:** Auto-detects `{variable}` placeholders → creates input handles
- **Configuration:** Paste prompt template into the Template field
- **Output:** Formatted prompt text (connects to LLM component)
- **Best practice:** Name clearly: "Content Analysis Prompt," "Sentiment
  Classification Prompt," etc.

### Ollama Component
- **Use:** Local LLM inference via Ollama
- **Location:** Models or LLMs section
- **Key settings:**
  - Model Name: e.g., `llama3.1:8b`, `mistral:7b`
  - Base URL: `http://localhost:11434`
  - Temperature: varies by task (see Temperature Guide in SKILL.md)
- **Prerequisite:** Ollama must be running (`ollama serve` in terminal)
  and model must be pulled (`ollama pull llama3.1:8b`)
- **One instance per LLM call.** Fan-out to 9 platforms = 9 Ollama components.

### Language Model Component (v1.6+)
- **Use:** Centralized model component supporting multiple providers
- **Supports:** Ollama, OpenAI, Anthropic, and others from one component
- **When to use:** If you want to easily swap between local (Ollama) and
  cloud (OpenAI/Anthropic) models without rebuilding the flow

---

## 5. Format Stage Components

Format stage typically reuses Prompt + Ollama pairs. Each platform branch is:
`[Format Prompt] → [Ollama at 0.7] → [Output]`

No special format-stage-only components. The intelligence is in the prompts,
not the component types.

---

## 6. Output Stage Components

### Text Output
- **Use:** Display results on canvas during testing
- **When to use:** After each Ollama component to inspect output quality
- **Best practice:** Add individual outputs per platform during testing,
  then optionally consolidate for production

### HTTP Request Component
- **Use:** Send data to external APIs (social platforms, CRMs, webhooks)
- **Configuration:** URL, method, headers (auth tokens), body mapping
- **When to use:** Ch3 (COPE), Ch12 (CRM handoff), any flow that publishes
  or sends data externally

### API Request Component
- **Use:** Call other Langflow flows or external APIs
- **When to use:** Webhook chaining (Ch5, Ch6) — one flow calling another

---

## 7. Utility Components

### Conditional Router / If-Else
- **Use:** Route data down different paths based on conditions
- **When to use:** Ch5 (Engagement Routing), Ch6 (Sentiment Escalation)
- **Connects to:** Different downstream branches based on classification

### Loop / Iterator
- **Use:** Process multiple items sequentially
- **When to use:** Batch processing (multiple feed items, multiple UGC entries)

### Type Convert
- **Use:** Convert between data types when handles don't match
- **When to use:** When connecting components with incompatible output/input types

### Group Components
- **Use:** Combine related components into a single visual group
- **When to use:** Complex flows with 20+ components. Group each platform
  branch (Prompt + Ollama + Output) for cleaner canvas.
- **How:** Shift+click+drag to select, then click Group

---

## 8. Flow Patterns

### Linear Pipeline
```
[Input] → [Prompt] → [Ollama] → [Output]
```
Simplest pattern. One input, one processing step, one output.

### Two-Stage Processing
```
[Input] → [Analysis Prompt] → [Ollama 0.3] → [Format Prompt] → [Ollama 0.7] → [Output]
```
Separation of comprehension and generation. Analysis feeds format.

### Fan-Out
```
                        ┌→ [Prompt A] → [Ollama] → [Output A]
[Input] → [Process] ───┼→ [Prompt B] → [Ollama] → [Output B]
                        └→ [Prompt C] → [Ollama] → [Output C]
```
One output feeds multiple downstream branches. Each branch is independent.

### Classification + Routing
```
[Input] → [Classify Prompt] → [Ollama 0.1] → [Router]
                                                ├→ Type A → [Handler A]
                                                ├→ Type B → [Handler B]
                                                └→ Type C → [Handler C]
```
LLM classifies, then conditional routing sends to appropriate handler.

### Webhook Chain
```
Flow A: [Webhook] → [Process] → [HTTP Request to Flow B endpoint]
Flow B: [Webhook] → [Process] → [Output]
```
One flow's output triggers another flow. Enables modular automation architecture.

### Feedback Loop (Conceptual)
```
Flow A (Atomize) → publishes → analytics accumulate
Flow B (Analyze Performance) → reads analytics → recommends prompt changes
Human applies changes to Flow A prompts
```
Not a direct loop in Langflow (no circular connections). Implemented as
separate flows with a human or scheduled step closing the loop.

---

## 9. Ollama Configuration

### Recommended Models
| Model | VRAM/RAM | Best For |
|-------|----------|----------|
| Llama 3.1 8B | 8–16 GB | Default starting point. Good analysis, decent formatting. |
| Mistral 7B / Nemo 12B | 8–16 GB | Strong structured output. Good formatting consistency. |
| Llama 3.1 70B / Qwen2.5 72B | 32 GB+ VRAM or 64 GB+ unified | Better tone adaptation. Use if hardware supports it. |

### Setup Checklist
1. Install Ollama from https://ollama.ai
2. Pull model: `ollama pull llama3.1:8b`
3. Start server: `ollama serve` (runs on http://localhost:11434)
4. Verify: `ollama list` shows your model

### Swapping Models
Changing models is a one-click operation per Ollama component in Langflow.
Build the entire flow with a small model first, verify it works, then
upgrade to a larger model to see quality improvement. This is especially
true for format-stage components where model size has the biggest impact
on platform-native voice quality.

---

## 10. Troubleshooting

**Ollama not showing in Langflow sidebar:**
Ensure Ollama is running (`ollama serve`) and model is pulled.

**"Connection refused" errors:**
Check Base URL is `http://localhost:11434`. Check Ollama is running.

**Prompt variable not detected:**
Ensure variable uses `{curly_braces}` syntax. Check for typos.

**Output is unstructured despite structured prompt:**
Try a larger model (structured output adherence improves with model size).
Simplify the prompt by removing 1-2 extraction targets.

**Fan-out branches produce identical output:**
Each branch needs its OWN Ollama instance. Verify all 9 Prompt→Ollama
connections are correct and not accidentally sharing an Ollama node.

**Flow runs slowly with many branches:**
Fan-out branches execute in parallel, but each Ollama call takes time.
With 9 branches on an 8B model, expect 30-90 seconds total depending
on hardware. Larger models take proportionally longer.

**Webhook returns empty response:**
Check that the flow has been saved and the endpoint URL matches.
Use Langflow's Playground to test before using curl.
