---
name: social-stats
description: Read the stats of Histora's videos (long videos; the archived What-if shorts too) (@gethistora) on YouTube and Instagram through Claude in Chrome, and write them into marketing/2.stats/ plus a stats.md per video in marketing/9.archief/what-if-shorts/2.gepost/ and marketing/1.videos/2.gepost/. Use when the owner asks for stats, a stats review, "hoe doen de video's het", or invokes /social-stats. Read-only - never post, edit, promote or change settings.
---

# Social stats (YouTube, Instagram)

> **TikTok is stopped (owner, 2026-11-26)**: every video stalled at ~600 views, 60-86% NL/BE, zero followers. Do not measure it any more.

The owner is signed in to both in his Chrome. You only read. First run: 2026-11-15
(`marketing/2.stats/stats-2026-11-15.md` is the format to follow).

## Setup (once per session)

1. Load the Chrome tools in ONE ToolSearch call:
   `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__tabs_close_mcp`
2. `tabs_context_mcp` → own tab. If the tools are missing, the owner must run `/chrome` first.
3. **Do YouTube yourself and start one background subagent for Instagram in
   parallel** (owner's wish: much faster). Give each the matching section below plus the list of
   videos (folders in `marketing/9.archief/what-if-shorts/2.gepost/` and `marketing/1.videos/2.gepost/`), and tell them: own tab, read-only, close the tab, return one
   markdown table.

Studio pages render late: every JS extractor starts with a 4-5 s wait. Use `browser_batch`
(navigate + javascript pairs) for per-video pages, not one call per step.

## YouTube (channel UC4zE-VpdoGv7uXAtLSF6sWw, UI in Dutch)

**1. One table for all videos** (views, watch time, subs, avg duration, avg %):
```
https://studio.youtube.com/channel/UC4zE-VpdoGv7uXAtLSF6sWw/analytics/tab-content/period-lifetime/explore?entity_type=CHANNEL&entity_id=UC4zE-VpdoGv7uXAtLSF6sWw&time_period=lifetime&explore_type=TABLE_AND_CHART&metric=VIEWS&granularity=DAY&t_metrics=VIEWS&t_metrics=WATCH_TIME&t_metrics=SUBSCRIBERS_NET_CHANGE&t_metrics=AVERAGE_WATCH_TIME&t_metrics=AVERAGE_WATCH_PERCENTAGE&dimension=VIDEO&o_column=VIEWS&o_direction=ANALYTICS_ORDER_DIRECTION_DESC
```
(Adding LIKES/SHARES/COMMENTS to `t_metrics` breaks it: "Er is iets misgegaan".)
```js
await new Promise(r=>setTimeout(r,7000));
[...document.querySelectorAll('yta-explore-table-row, tr')].map(r=>r.innerText.replace(/#\w+/g,'').replace(/\s*\n\s*/g,'|').replace(/\s+/g,' ')).filter(t=>/\d:\d\d/.test(t)).join('\n')
```
Row = duration | title | views | % | watch hours | % | subs | % | avg duration | avg % viewed.
Output is truncated around 3.5K chars: if so, run again with `.slice(10)`.

**2. Video ids + publish dates:** `https://studio.youtube.com/channel/UC4zE-VpdoGv7uXAtLSF6sWw/videos/short`
```js
await new Promise(r=>setTimeout(r,2500));
[...document.querySelectorAll('ytcp-video-row')].map(r=>{const a=r.querySelector('a[href*="/video/"]');const id=(a&&a.href.match(/video\/([^/]+)/)||[])[1];const t=(r.querySelector('#video-title')||{}).innerText;const c=[...r.querySelectorAll('.tablecell-date, .tablecell-views')].map(x=>x.innerText.replace(/\s+/g,' ').trim());return [id,t&&t.slice(0,35),...c].join('|')}).join('\n')
```

**3. Per video "Bleef kijken", likes, countries:** navigate to
`https://studio.youtube.com/video/<id>/analytics/tab-overview/period-lifetime`, then:
```js
await new Promise(r=>setTimeout(r,4500)); const s=document.body.innerText.replace(/\n+/g,' | '); const g=re=>(s.match(re)||[])[1];
['<NAME>', g(/([\d,]+%) \| Bleef kijken/), 'likes '+g(/Likes \| Sinds publicatie \| ([\d.]+)/), g(/geografische gebieden[^|]*\|[^|]*\| ([^|]+\| [\d,]+% \| [^|]+\| [\d,]+%)/)].join(' ; ')
```
Countries are empty below ~100 views. Channel totals: the channel dashboard `get_page_text`.

## Instagram (subagent)

- **Meta Business Suite → Insights → Content** (`business.facebook.com/latest/insights/content`),
  period "Last 28 days" or longer, Reels: views, reach, avg watch time, likes, comments, saves,
  shares, follows per Reel in one table. Dismiss promo pop-ups only with "Dismiss"/"Not now".
- **Per Reel:** `instagram.com/insights/media/<id>/` → viewers and % non-followers.
- Account: followers, 28-day views/reach/profile visits/link clicks, follower countries.
- **Not on the web:** retention at 0:03 and countries per Reel. Ask the owner for app
  screenshots only if that is really needed.
- Shares differ between MBS and instagram.com: report the MBS value.
- **Trial reels:** the owner wants to use them as soon as the account passes **200 followers** (187 on
  2026-11-26). Report the follower count against 200, and once past it, whether the trial option is visible.

## Writing it down

1. `marketing/2.stats/stats-<date>.md`: accounts table, one row per short
   across the two platforms, then "Wat de data zegt" (numbered, concrete).
2. Append a `## Meting <date>` section to `2.gepost/<nn-id>/stats.md` per video (keep the file's
   line endings).
3. Move a person's folder `<nn>-<id>/` (with `1.video/` + `2.short/`) from `1.te-posten/` to `2.gepost/` as soon as everything in it is live (`mv`, never `rm`); fix the absolute paths in `2.short/posten.json`.
4. Compare with the previous `stats-*.md` and say what changed.

Known traps: YouTube sometimes gives a short no test
batch at all (4-40 views): that is distribution, not quality. Ignore views from the owner's own
circle (sudden high NL share on YouTube/Instagram).
