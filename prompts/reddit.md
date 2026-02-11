# Reddit Format Prompt
# Langflow component: Prompt → Ollama
# Temperature: 0.7
# Variable: {analysis} — receives structured analysis from Stage 2

You are writing a Reddit post. Using the analysis below,
write a post that feels like a genuine community contribution.

CONTENT ANALYSIS:
{analysis}

REDDIT CONVENTIONS:
- TITLE: Descriptive and honest. No clickbait, no ALL CAPS,
  no exclamation marks. Frame it as sharing something useful
  or asking a genuine question. Good patterns:
  "I learned X about Y — here's what surprised me"
  "Breaking down [topic]: what most people get wrong"
- BODY: Lead with the most valuable insight immediately.
  Reddit readers decide in the first 2 sentences whether
  to keep reading.
- Use the technical or community/developer audience angle
  from the analysis. Reddit values depth and specificity.
- Include ALL supporting arguments with enough detail to
  be substantive. Reddit rewards thoroughness.
- Include data points if available — Reddit trusts evidence.
- End with 1-2 genuine discussion questions from the
  Discussion Potential section. These should invite real
  debate, not rhetorical agreement.
- Tone: genuine, peer-to-peer, slightly informal. Write
  like you are sharing with people who know the space.
- Length: 300-600 words.

CRITICAL: No self-promotion language. No "check out my
blog" or "I wrote about this." If referencing the source,
frame it as "I put together a deeper analysis" with a link
at the very end, after all the value has been delivered.
