# Platform Prompt Engineering Reference

This reference documents the ten-platform prompt framework established in
Chapter 1. Use it when writing new platform prompts or refining existing ones.

## Table of Contents

1. Prompt Architecture Pattern
2. The Three Layers of Platform Intelligence
3. Platform Quick Reference (conventions at a glance)
4. Common Failure Patterns and Fixes
5. Adding New Platforms

---

## 1. Prompt Architecture Pattern

Every format prompt follows this structure:

```
ROLE FRAME: "You are a [platform] content writer."
INPUT REFERENCE: "Using the content analysis below..."
INPUT VARIABLE: {analysis}
PLATFORM CONVENTIONS: Specific rules for this platform
  - Structural rules (length, formatting, truncation)
  - Audience/psychology rules (what they value)
  - Content culture rules (tone, norms)
DO NOT CONSTRAINTS: Explicit anti-patterns to avoid
```

The role frame activates domain-specific reasoning. The convention block
provides the guardrails. The DO NOT block prevents the most common AI
failure modes for that platform.

---

## 2. The Three Layers of Platform Intelligence

Every format prompt encodes three layers. When writing a new prompt for any
platform (including future platforms not in the original nine), analyze all
three layers:

**Layer 1: Structural Conventions**
The mechanical rules of the platform. These are objective and measurable.
- Character limits (total, before truncation, per post/tweet)
- Formatting norms (paragraphs, line breaks, markdown, emoji usage)
- Truncation behavior (where "see more" or "..." appears)
- Hashtag conventions (how many, where they go, in-text vs end)
- Media expectations (text-only, image required, video preferred)
- Link handling (clickable, suppressed by algorithm, in comments)

**Layer 2: Audience Psychology**
What the people on this platform care about and respond to. These are
patterns observed from high-performing content on each platform.
- What triggers engagement (comments, shares, saves)
- What gets scrolled past or ignored
- What gets actively punished (downvotes, unfollows, reports)
- How authority and credibility are established
- What emotional register resonates (data-backed, personal, provocative)

**Layer 3: Content Culture**
The unspoken rules that make content feel "native" versus "cross-posted."
- Self-promotion norms (acceptable, tolerated, punished)
- Tone expectations (professional, casual, academic, peer-to-peer)
- Community vs broadcast orientation
- Value-first vs hook-first norms
- How the audience feels about AI-generated content

---

## 3. Platform Quick Reference

### LinkedIn
| Attribute | Specification |
|-----------|--------------|
| Truncation | ~210 characters, then "...see more" |
| Sweet spot length | 1,000–1,300 characters |
| Hashtags | 3–5, industry-specific, at end |
| Best hook types | Contrarian take, surprising data, professional story |
| Tone | Authoritative but conversational |
| Avoid | Emoji bullets, "I'm excited to share," "leverage" |
| Algorithm signals | Dwell time, comments > reactions |

### Twitter/X
| Attribute | Specification |
|-----------|--------------|
| Single post limit | 280 characters |
| Thread format | Numbered (1/ 2/ 3/), hook tweet must stand alone |
| Hashtags | 1–2 max, at end, never mid-sentence |
| Best hook types | Punchy claim, quotable line, provocative framing |
| Tone | Sharp, confident, slightly provocative |
| Avoid | Hedging, excessive qualifiers |
| Algorithm signals | Replies, retweets, quote tweets |

### Bluesky
| Attribute | Specification |
|-----------|--------------|
| Single post limit | 300 characters |
| Thread format | Numbered (1/ 2/ 3/), no thread limit, each post standalone |
| URL handling | All URLs count as 22 characters regardless of actual length |
| Hashtags | NONE — Bluesky culture does not use hashtags; search is full-text |
| Best hook types | Genuine observation, curious question, thinking-out-loud |
| Tone | Genuine, curious, slightly informal, peer-to-peer |
| Audience | Tech-aware early adopters who left Twitter/X; value authenticity |
| Avoid | Hashtags, engagement bait, corporate language, emoji as structure, mentions of "algorithm" or "reach" |
| Critical rule | Write as a person with a perspective, not a brand optimizing for distribution |
| Algorithm signals | Minimal algorithmic amplification by design; reposts and likes surface content |

### Instagram
| Attribute | Specification |
|-----------|--------------|
| Truncation | ~125 characters before "...more" |
| Caption length | 800–1,500 characters (2,200 max) |
| Hashtags | 15–20, in first comment or after line breaks |
| Best hook types | Personal story, emotional pull, transformation |
| Tone | Warm, personal, reflective |
| Avoid | Corporate tone, leading with statistics, hashtags in caption body |
| Algorithm signals | Saves, shares, comments |

### Email Snippet
| Attribute | Specification |
|-----------|--------------|
| Subject line | Under 50 characters |
| Preview text | 40–90 characters |
| Body | 2–3 sentences maximum |
| Purpose | TEASER — drive click-through, not summarize |
| Best hook types | Curiosity gap, surprising claim, relatable problem |
| Tone | Direct, personal, slightly urgent |
| Avoid | Full summarization, clickbait, long body |

### Substack
| Attribute | Specification |
|-----------|--------------|
| Length | 400–700 words (newsletter section) |
| Format | Flowing prose, no bullet points, no headers |
| Best hook types | Personal connection, observation, question |
| Tone | Thoughtful, conversational, intellectually generous |
| Audience | Subscribers who chose long-form; assume familiarity |
| Avoid | Bullet points, corporate voice, section headers |

### Reddit
| Attribute | Specification |
|-----------|--------------|
| Length | 300–600 words |
| Title | Descriptive, honest, no clickbait or ALL CAPS |
| Best hook types | "I learned X," "breaking down Y," genuine question |
| Tone | Genuine, peer-to-peer, slightly informal |
| Audience angle | Technical or community/developer |
| Avoid | ALL self-promotion language, marketing speak, exclamation marks |
| Critical rule | Value first, source link at very end (if at all) |

### Facebook Communities
| Attribute | Specification |
|-----------|--------------|
| Length | 200–400 words |
| Best hook types | Relatable question, personal observation |
| Tone | Warm, curious, inclusive |
| Audience angle | General/casual, jargon-free |
| Avoid | External links in body (algorithm penalty), formal language, lecturing |
| Critical rule | Embed questions throughout, not just at end |

### GitHub Communities
| Attribute | Specification |
|-----------|--------------|
| Length | 250–500 words |
| Format | Markdown (headers, code blocks, links) |
| Title | "[Topic]: [Specific insight or finding]" |
| Tone | Collaborative, precise, peer-to-peer |
| Audience angle | Technical |
| Avoid | Any marketing language whatsoever |
| Critical rule | Problem-first framing, tools/frameworks by name |

### Low/No-Code Dev Communities
| Attribute | Specification |
|-----------|--------------|
| Length | 200–400 words |
| Best hook types | "Here's what I built/learned," relatable builder problem |
| Tone | Enthusiastic, peer-to-peer, encouraging |
| Audience angle | Community/developer, simplified technical |
| Avoid | Unexplained jargon, condescension about skill level |
| Critical rule | Practical next step, tool names, "so what" framing |

---

## 4. Common Failure Patterns and Fixes

**Problem: All platforms sound the same.**
Diagnosis: Prompts lack platform-specific voice differentiation.
Fix: Add more Layer 3 (content culture) constraints. Increase the DO NOT
section with platform-specific anti-patterns. Add a sentence like "This
should NOT sound like a LinkedIn post" to non-LinkedIn prompts.

**Problem: Output sounds AI-generated / robotic.**
Diagnosis: Temperature too low, or prompts lack voice guidance.
Fix: Increase format temperature to 0.7-0.8. Add specific tone
instructions with examples of what "sounds like a human" means for
that platform. Try a larger model.

**Problem: Atoms are too long or too short.**
Diagnosis: Length guidance is vague or missing.
Fix: Add explicit character or word counts. Add "sweet spot" ranges
rather than hard limits.

**Problem: Hallucinated details appear.**
Diagnosis: Analysis stage didn't extract enough, so format stage invents.
Fix: Tighten analysis prompt to extract more explicitly. Add "Only use
information from the analysis. Do not invent statistics, names, or claims
not present in the source material" to format prompts.

**Problem: Content feels like summarization, not atomization.**
Diagnosis: The core distinction isn't being enforced.
Fix: Add to format prompts: "Atomization is RE-EXPRESSION, not compression.
Each atom should feel like it was written for this platform from scratch."

**Problem: Hashtags are generic (#business #success).**
Diagnosis: No industry specificity in hashtag guidance.
Fix: Add a line: "Hashtags should be specific to the content's industry
and topic, not generic motivational tags."

---

## 5. Adding New Platforms

When the user wants to add a new platform (TikTok scripts, Threads,
Mastodon, YouTube descriptions, podcast show notes, etc.), analyze the
three layers:

1. Research or ask the user about structural conventions for the platform
2. Identify what the platform's audience values and punishes
3. Determine the content culture norms

Then write a prompt following the standard architecture pattern:
role frame → input reference → convention block → DO NOT block.

Test with real content and iterate. The first draft will need 2-3
refinement passes, especially on Layer 3 (content culture), which is
hardest to get right without seeing real platform examples.
