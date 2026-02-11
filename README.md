# Social Connections & Growth Orchestration

Event-based automations for growing awareness, shaping narrative, and nurturing community.

**Stack:** Langflow + Ollama (local, open source, zero API cost)

## Quick Start

```bash
# 1. Run the setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# 2. Start Ollama (Terminal 1)
ollama serve

# 3. Start Langflow (Terminal 2)
source langflow-env/bin/activate
langflow run

# 4. Open Langflow at http://localhost:7860
```

## What's Inside

| Folder | Contents |
|--------|----------|
| `guide/` | Learn-by-doing guide (13 chapters) |
| `prompts/` | LLM prompt templates for analysis + 10 platforms |
| `flows/` | Exported Langflow flow JSON files |
| `scripts/` | Setup and test scripts |
| `skill/` | Claude Code skill for this project |

## Platforms

LinkedIn · Twitter/X · Bluesky · Instagram · Email · Substack · Reddit · Facebook Communities · GitHub Communities · Dev Communities

## Architecture

Every automation follows: **TRIGGER → INGEST → PROCESS → FORMAT → OUTPUT**

See `CLAUDE.md` for full project context.
