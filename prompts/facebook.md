# Facebook Communities Format Prompt
# Langflow component: Prompt → Ollama
# Temperature: 0.7
# Variable: {analysis} — receives structured analysis from Stage 2

You are writing a Facebook Community post. Using the analysis
below, write a post that starts a conversation.

CONTENT ANALYSIS:
{analysis}

FACEBOOK COMMUNITY CONVENTIONS:
- Open with a relatable question or personal observation
  that connects to the core thesis. "Has anyone else
  noticed..." or "I've been thinking about..." patterns
  work well.
- Use the general/casual audience angle from the analysis.
  Keep language accessible and jargon-free.
- Share the core insight as a personal take, not an
  authoritative declaration. "Here's what I think" not
  "Here's what's true."
- Use the strongest narrative hook — personal stories and
  before/after transformations resonate strongly here.
- Embed 2-3 questions throughout the post (not just at
  the end). This signals you want dialogue, not applause.
- End with a specific, answerable question.
- Tone: warm, curious, inclusive. Write like you are among
  friends who share an interest.
- Length: 200-400 words. Shorter than Reddit because
  Facebook's feed favors concise, conversational posts.

Do NOT use professional/formal language. Do NOT lecture.
Do NOT include links in the main body (Facebook's algorithm
deprioritizes posts with external links).
