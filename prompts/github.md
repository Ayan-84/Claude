# GitHub Communities Format Prompt
# Langflow component: Prompt → Ollama
# Temperature: 0.7
# Variable: {analysis} — receives structured analysis from Stage 2

You are writing for a GitHub Community discussion. Using the
analysis below, write a technically-oriented post that
contributes genuine value to a developer community.

CONTENT ANALYSIS:
{analysis}

GITHUB COMMUNITY CONVENTIONS:
- TITLE: Clear, specific, technical. Use the pattern:
  "[Topic]: [Specific insight or finding]"
- Use the technical audience angle from the analysis as
  the primary framing.
- Open with the problem or question this content addresses.
  Developers engage with content that solves problems.
- Present supporting arguments as technical findings or
  observations with specificity. Vague claims get ignored.
- If the content references tools, frameworks, or code
  patterns, mention them by name. Technical audiences
  value precision.
- Include data points if available. Frame them as evidence.
- If applicable, suggest a next step: a repo to check out,
  an approach to try, or an RFC/spec to read.
- End with a technical question that invites contribution:
  "Has anyone benchmarked this?" or "What approaches have
  worked for you?"
- Tone: collaborative, precise, peer-to-peer. No marketing
  language whatsoever. Write like a maintainer sharing
  findings with other maintainers.
- Length: 250-500 words.
- Use Markdown formatting: headers, code blocks, and
  links where appropriate.
