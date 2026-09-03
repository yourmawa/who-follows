# WhoFollows WebMCP demo — 2:15 target

## 0:00–0:20 — The problem

**On screen:** WhoFollows landing page, then the snapshot interface.

**Narration:** “WhoFollows compares Instagram Followers and Following snapshots that a user provides manually. It does not scrape Instagram, and it never asks for an Instagram password.”

## 0:20–0:40 — The existing product

**On screen:** A saved profile with two snapshots and the visual comparison.

**Narration:** “Its core is deliberately deterministic. WhoFollows normalizes usernames, stores snapshots, and calculates exactly what appeared, disappeared, or stayed the same.”

## 0:40–1:30 — WebMCP demo

**On screen:** Open `/webmcp-demo`. Show the fictional snapshots. Ask:

> What changed in @demo.profile's Following list since the previous snapshot?

Show the agent discovering and invoking `get_latest_changes`, then the structured result and natural-language answer.

**Narration:** “For the WebMCP Challenge, we added one focused, read-only tool: `get_latest_changes`. The user's agent discovers it directly from the page. WhoFollows returns structured facts: one account appeared, one disappeared, and three remained unchanged. The AI explains those facts, but does not calculate or invent them.”

## 1:30–1:50 — Architecture

**On screen:** Architecture in the README.

**Narration:** “WhoFollows owns the facts and operations. AI chooses what to ask and how to explain them. The product remains useful without AI, while WebMCP makes it meaningfully agent-ready.”

## 1:50–2:05 — Privacy and safety

**On screen:** Privacy boundary card.

**Narration:** “The agent receives read-only access to data already supplied by the user. It cannot access Instagram, scrape, create snapshots, delete history, change settings, or make purchases.”

## 2:05–2:15 — End

**On screen:** “WhoFollows owns the facts. AI owns the conversation.”

**Narration:** “WhoFollows: a deterministic, human-first product with a small and explicit interface for the user's AI.”

## Recording checklist

- Keep it close to 2:15 and under 3:00.
- Use only fictional demo data.
- Make the tool name and structured output readable.
- Show the actual invocation, not only the resulting prose.
- Disclose that the core predates the challenge and the WebMCP layer is the challenge work.
