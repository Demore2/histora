# Discord Webhook Integration Prompt for VS Code

Paste this **entire prompt** into Claude in VS Code and Claude will provide complete working code for Discord notifications.

---

## Task: Send Feedback to Discord Channels via Webhooks

I want to receive bug reports and ideas directly in my Discord server instead of emails. I need:

1. **Bug reports** → Discord channel `#bugs` (as messages via webhook)
2. **Ideas** → Discord channel `#ideas` (as messages via webhook)
3. No email notifications at all
4. Formatted Discord messages showing all details
5. Simple webhooks I can set up in Discord

### Current Setup

**App:** React Native/Expo (Chronicles - Dutch history learning app)

**Supabase Table:** `public.feedback`
```
Columns:
  - id (UUID, primary key)
  - user_id (UUID, foreign key to auth.users)
  - soort (text: 'bug' or 'idee')
  - bericht (text, max 2000 characters)
  - app_versie (text)
  - platform (text: 'ios', 'android', or 'web')
  - created_at (timestamp)
```

**Feedback Component:** `src/components/feedback-modal.tsx` inserts data like:
```typescript
await supabase.from('feedback').insert({ 
  user_id: user.id, 
  soort: 'bug' | 'idee',
  bericht: string,
  app_versie: string,
  platform: string
})
```

### What I Need

**Build a complete Supabase Edge Function** (`send-feedback-discord`) that:

1. **Triggers automatically** on `INSERT` to `public.feedback` table

2. **Sends to Discord webhooks:**
   - If `soort = 'bug'` → sends to Discord webhook for bugs channel
   - If `soort = 'idee'` → sends to Discord webhook for ideas channel
   - Nice formatted Discord embed message

3. **Message content includes:**
   - **Bug/Idea label** (with emoji: 🐛 for bugs, 💡 for ideas)
   - **User ID** (who submitted it)
   - **Message** (the actual feedback text, formatted nicely)
   - **App version** (which version had the bug/idea)
   - **Platform** (ios/android/web)
   - **Timestamp** (when submitted)
   - **Message length indicator** if text is long

4. **Error handling:**
   - If webhook fails, log the error but don't block feedback insertion
   - Webhook failures should be silent (don't fail the user's submission)

5. **Discord message formatting:**
   - Use Discord embeds for nice formatting
   - Color code: red for bugs, blue for ideas
   - Make it readable and organized

### Discord Setup

I will provide:
1. Discord server URL: (provide your server invite or just say you have one)
2. Channels I'll create: `#bugs` and `#ideas`
3. Webhooks will be generated in Discord admin

### What I Need From You (Claude)

1. **Complete TypeScript edge function** (`send-feedback-discord/index.ts`)
   - Ready to deploy to Supabase
   - Uses Discord webhook URLs from secrets
   - Handles both bug and idea types
   - Proper error handling

2. **Discord Webhook Setup Guide:**
   - Step-by-step how to create channels in Discord
   - How to generate webhooks in Discord
   - How to get the webhook URLs
   - Where to paste webhook URLs in Supabase

3. **Supabase Setup:**
   - How to add webhook secrets to the edge function
   - How to deploy the function
   - How to test it's working

4. **Testing Guide:**
   - How to verify Discord receives messages
   - What to check if messages don't appear
   - Curl command or direct test method

5. **Troubleshooting:**
   - Common issues and fixes
   - Where to find logs
   - How to debug if webhooks fail

### Technical Details

- **No email service needed** (no Resend, no SMTP)
- **Just webhooks** (simple HTTP POST to Discord)
- **Supabase Edge Function** (same as before, different logic)
- **Error handling** (silent failures, log to console)
- **RLS compliance** (respects feedback table permissions)

### Deliverables

1. Complete working edge function (TypeScript)
2. Discord setup guide (how to create webhooks)
3. Supabase secrets setup
4. Testing instructions
5. Troubleshooting guide

---

**Build this for me. Make it clean, simple, and production-ready. I'll copy it into Supabase and set up the Discord webhooks myself.**
