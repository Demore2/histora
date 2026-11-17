---
name: social-stats
description: Read the stats of Histora's shorts (@gethistora) on YouTube, Instagram and TikTok through Claude in Chrome, and write them into marketing/3.stats/ plus a stats.md per video in marketing/1.shorts/2.gepost/ and marketing/2.youtube/2.gepost/. Use when the owner asks for stats, a stats review, "hoe doen de video's het", or invokes /social-stats. Read-only - never post, edit, promote or change settings.
---

# Social stats (YouTube, Instagram, TikTok)

The owner is signed in to all three in his Chrome. You only read. First run: 2026-11-15
(`marketing/3.stats/stats-2026-11-15.md` is the format to follow).

## Setup (once per session)

1. Load the Chrome tools in ONE ToolSearch call:
   `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__tabs_close_mcp`
2. `tabs_context_mcp` → own tab. If the tools are missing, the owner must run `/chrome` first.
3. **Do YouTube yourself and start two background subagents for Instagram and TikTok in
   parallel** (owner's wish: much faster). Give each the matching section below plus the list of
   videos (folders in `marketing/1.shorts/2.gepost/` and `marketing/2.youtube/2.gepost/`), and tell them: own tab, read-only, close the tab, return one
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

## TikTok (subagent)

- List: `https://www.tiktok.com/tiktokstudio/content`. Per video:
  `https://www.tiktok.com/tiktokstudio/analytics/<videoId>`. `document.body.innerText` after a
  4 s wait has nearly everything. Check the overview, viewers and retention tabs.
- Per video: views, total play time, avg watch time, % watched fully, retention at 0:03 (tooltip
  on the curve), traffic sources (For You/profile/search), likes/comments/shares/saves, new
  followers, top 2 countries.
- Below 100 views TikTok hides sources and countries. Audience demographics only from 100
  followers. Never open Promote.

## Writing it down

1. `marketing/3.stats/stats-<date>.md`: accounts table, one row per short
   across the three platforms, then "Wat de data zegt" (numbered, concrete).
2. Append a `## Meting <date>` section to `2.gepost/<nn-id>/stats.md` per video (keep the file's
   line endings).
3. Move shorts that are live from `1.te-posten/` to `2.gepost/` (`mv`, never `rm`).
4. Compare with the previous `stats-*.md` and say what changed.

Known traps (2026-11-15): TikTok showed our English shorts mostly to NL/BE (55-83%), so every
video stalls at ~700 - check whether that is still true. YouTube sometimes gives a short no test
batch at all (4-40 views): that is distribution, not quality. Ignore views from the owner's own
circle (sudden high NL share on YouTube/Instagram).
