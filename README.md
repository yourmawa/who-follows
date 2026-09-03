# WhoFollows

**A deterministic Instagram snapshot comparison tool that becomes agent-ready through WebMCP.**

WhoFollows compares Instagram Followers or Following lists supplied by the user. It does not scrape Instagram, request Instagram credentials, or ask an AI model to decide what changed.

For the OpenAI WebMCP Challenge, WhoFollows exposes one small, read-only tool so the user's own agent can retrieve a verified comparison and explain it conversationally.

> WhoFollows owns the facts and operations. AI chooses what to ask and how to explain them.

## Challenge demo

Open `/webmcp-demo` in a browser with WebMCP support. The page contains two fictional snapshots for `@demo.profile` and registers one document-bound tool.

### `get_latest_changes`

Input:

```json
{"profile":"demo.profile","list_type":"following"}
```

It returns the two snapshot timestamps and counts, `appeared`, `disappeared`, and `unchanged_count` as structured JSON.

Suggested agent prompt:

> What changed in @demo.profile's Following list since the previous snapshot?

The authenticated app registers the same tool against the signed-in user's already saved snapshots. The tool is annotated as read-only and never obtains new Instagram data.

## Architecture

```text
User-provided Instagram lists
        ↓
Deterministic normalization and comparison
        ↓
Snapshots and history
        ↓
One read-only WebMCP tool
        ↓
User's AI agent
```

The comparison is ordinary set arithmetic:

- `appeared = current − previous`
- `disappeared = previous − current`
- `unchanged = current ∩ previous`

WhoFollows deliberately uses **appeared** and **disappeared** rather than claiming a follow or unfollow event. A user-provided import can be incomplete, and a snapshot difference alone cannot establish when or why an account changed.

## Safety and privacy boundaries

The WebMCP integration:

- reads only snapshots the user already provided to WhoFollows;
- cannot log in to or scrape Instagram;
- cannot add fresh Instagram data autonomously;
- cannot modify or delete snapshots;
- cannot change account or security settings;
- cannot purchase a subscription or perform financial actions.

The public challenge demo uses fictional data only.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Use `npm run build` for a production check.

## Existing project disclosure

The core WhoFollows application existed before the OpenAI WebMCP Challenge. The WebMCP integration, agent-accessible tool layer, challenge demo, and related documentation were developed for the challenge.

## Challenge principle

Deterministic core. Human-first interface. Optional agent access. Explicit boundaries.

## License

MIT — see [LICENSE](LICENSE).
