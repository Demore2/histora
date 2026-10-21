# Discord Webhook Integration - Complete Prompt

**Paste this ENTIRE prompt into Claude in VS Code**

---

## Task: Send Feedback to Discord via Webhooks (Complete Setup)

I want bug reports and ideas to go directly to my Discord server via webhooks. Here's everything you need:

### My Setup

**App:** React Native/Expo (Histora - Dutch history learning app)

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

RLS: Users can insert and read only their own feedback
```

**Feedback Component:** `src/components/feedback-modal.tsx` inserts:
```typescript
await supabase.from('feedback').insert({ 
  user_id: user.id, 
  soort: 'bug' | 'idee',
  bericht: string,
  app_versie: string,
  platform: string
})
```

### Discord Webhooks (Already Created)

**🐛 Bugs Channel Webhook:**
```
https://discord.com/api/webhooks/1547696764289548378/gSdvRA3oExkD5jtyGwXdCPPJ4Y261ntV3TnY2YvmWSeM9_RYxAfsBLCu-gGKssljQa45
```

**💡 Ideas Channel Webhook:**
```
https://discord.com/api/webhooks/1547697059975405689/KwjFSnBBMUlXCqxiDKtU1vTP-WQ9bQxpuYWYIek4XxvTaUxMxXkXY3oM9M52MOH-8QCt
```

### What I Need

Build a **Supabase Edge Function** (`send-feedback-discord`) that:

1. **Triggers on INSERT** to `public.feedback` table

2. **Sends Discord messages:**
   - If `soort = 'bug'` → POST to bugs webhook
   - If `soort = 'idee'` → POST to ideas webhook
   - Nice formatted Discord embed (not just text)

3. **Message includes:**
   - **Type label** with emoji (🐛 bug, 💡 idea)
   - **User ID** (who submitted)
   - **Message text** (the feedback)
   - **App version** (version number)
   - **Platform** (ios/android/web)
   - **Timestamp** (when submitted)
   - Message length indicator if long

4. **Formatting:**
   - Use Discord embeds (structured messages)
   - Color: Red (#FF0000) for bugs, Blue (#0099FF) for ideas
   - Professional, readable layout
   - Emoji icons

5. **Error handling:**
   - If webhook fails → log error but don't block feedback insertion
   - Silent failures (user's feedback still gets saved)
   - Log all webhook attempts for debugging

### Technical Requirements

- **Language:** TypeScript
- **Method:** HTTP POST to webhook URLs (no SDK needed)
- **Payload:** Discord webhook embed format (JSON)
- **No Resend, no email, just webhooks**
- **Error handling:** Try/catch with logging

### Deliverables (in order)

1. **Complete TypeScript edge function code** (ready to copy-paste)
   - Uses the two webhook URLs I provided
   - Handles both 'bug' and 'idee' types
   - Proper error handling
   - Ready to deploy

2. **Supabase deployment steps:**
   - How to create edge function in Supabase dashboard
   - Code to copy-paste
   - How to configure the function
   - How to trigger on feedback table inserts

3. **Testing instructions:**
   - Curl command to test the webhook directly
   - How to submit feedback through the app and verify Discord message
   - What to check if nothing appears
   - How to read Supabase logs for debugging

4. **Setup checklist:**
   - Step-by-step to get it working
   - Verification steps
   - Troubleshooting common issues

### Optional Enhancements (if time)

- Add a "View in Dashboard" link (optional, not required)
- Add user email if available (from auth.users)
- Add reactions to Discord messages for status (👀 seen, ✅ fixed, etc)

---

## Build Instructions

1. **Provide the complete TypeScript code** for the edge function
2. **Include the webhook URLs** already in the code (not as env variables)
3. **Make it production-ready** with error handling
4. **Provide step-by-step Supabase setup** with exact clicks
5. **Provide testing curl commands** I can run to verify

---

**Go! Build this for me. I'll deploy it and test immediately.**
