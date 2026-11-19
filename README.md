# Input Router

Large file reads and connector/tool outputs (over about 2,000 tokens) are routed through Haiku, or Sonnet if you prefer, before they reach the main chat. The summarizer sees your latest prompt and the assistant's stated goal, and returns only the relevant findings, exact references (line numbers, ids, paths) and the source, so the chat keeps a short summary instead of the whole payload.

## What it does

1. **Intercepts** results of `Read`, `WebFetch` and every `mcp__*` connector tool (configurable).
2. **Pre-filters deterministically** (no model call): JSON loses empty fields, avatar/image URLs, templated API URLs and bookkeeping metadata, and is written compact. If that alone gets under the threshold, no model is called.
3. **Summarizes** what is still too large with the configured model, and fails open: on any error, timeout or poor saving, the original result is kept.
4. **Tracks savings** per source and in total: status line (`router: −12.3k tok (5)`), a side pane, and `/input-router status`.

Ranged reads (`offset`, `limit`, `pages`) are never summarized, so the model can always re-read the exact lines it needs, for example before an edit.

## Commands

`/input-router` `on` | `off` | `toggle` | `status` | `panel` | `model haiku|sonnet` | `threshold N` | `reset`

Command changes override the config until `reset`. When off, results pass through untouched and the status entry is cleared.

## Config

`enabled`, `model`, `thresholdTokens`, `tools` (comma list, trailing `*` is a prefix; add `Bash` or `Grep` to route those too), `maxSummaryTokens`, `stripKeys` (extra regex of JSON keys to strip).

## Install

At the prompt of a terminal session:

```
/plugin install input-router --marketplace mahboobmonnamd/input-router
```

From a shell:

```
claude plugin install input-router --marketplace mahboobmonnamd/input-router
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `mahboobmonnamd/input-router`, then Add plugin.
