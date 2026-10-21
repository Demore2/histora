# Complete Email Integration Setup Prompt for VS Code

Paste this **entire prompt** into Claude in VS Code (or claude.ai) and Claude will provide complete working code and setup instructions.

---

## Task: Complete Email Integration Implementation with Resend

I have a React Native (Expo) history learning app called Histora with a feedback system. Currently emails don't send when users submit bug reports or ideas. I need you to build the **complete solution** including:

1. Working Supabase edge function with Resend integration
2. Complete setup instructions
3. Environment variable configuration 
4. Testing commands

### Current Setup

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

**Admin Email:** businessdemore@gmail.com

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

**Build a complete, working implementation that:**

1. **Create Supabase Edge Function** (`send-feedback-email`) that:
   - Triggers automatically on `INSERT` to `public.feedback`
   - Uses **Resend** (resend.com) to send emails
   - Sends **admin notification** to businessdemore@gmail.com with:
     - Feedback type (Bug/Idea) with emoji/formatting
     - User ID
     - Message content
     - App version and platform
     - Timestamp
   - Sends **user confirmation email** to the user's email (from `auth.users.email`) with:
     - Thank you message
     - Confirmation of their feedback
     - What they submitted (type + message)
   - Proper error handling (log errors but don't block feedback insertion)
   - Uses Resend's TypeScript SDK

2. **Complete Setup Instructions:**
   - How to create Resend account (free tier is fine)
   - How to get RESEND_API_KEY
   - How to get Supabase service_role_key
   - How to add these as secrets to the edge function in Supabase dashboard
   - How to deploy the edge function

3. **Testing Instructions:**
   - Curl commands to test the function directly
   - How to submit feedback through the app and verify emails
   - What to check if emails don't arrive
   - Where to find logs in Supabase

4. **Privacy & Legal:**
   - The edge function should respect RLS policies
   - Include privacy policy info in emails if needed
   - Error handling must be robust

### Technical Requirements

- **Email Service:** Resend (resend.com) - free tier with 100 emails/day
- **Language:** TypeScript for the edge function
- **Supabase:** Using auth.users table to get user emails
- **Error Handling:** Email failures should NOT block the feedback insertion (async/fire-and-forget pattern)
- **Logging:** Log all email attempts to Supabase logs for debugging

### Deliverables (in order)

1. **Complete TypeScript edge function code** (`send-feedback-email/index.ts`)
   - Ready to copy-paste into Supabase
   - Includes proper error handling
   - Uses Resend SDK

2. **Email template HTML** (admin notification)
   - Professional, organized layout
   - Clearly shows bug vs idea
   - All submission details formatted nicely

3. **Email template HTML** (user confirmation)
   - Friendly and welcoming tone
   - Confirms their feedback was received
   - Thanks them for contributing

4. **Step-by-step Setup Guide:**
   - Create Resend account & get API key
   - Get Supabase service_role_key
   - Add secrets to edge function
   - Deploy the function
   - Test it works

5. **Testing & Troubleshooting:**
   - Exact curl commands to test
   - How to verify emails in inbox
   - Common issues and fixes
   - Where to check Supabase logs

6. **After Implementation Checklist:**
   - Verify admin email works
   - Verify user confirmation works
   - Test with both 'bug' and 'idee' types
   - Confirm emails arrive within 30 seconds

### Context

- Admin email: **businessdemore@gmail.com** (needs to receive ALL bug reports and ideas)
- User emails come from `auth.users.email` table
- App is production-ready, needs this working ASAP
- This is the final blocker before Play Store launch
- Feedback type is `soort: 'bug' | 'idee'` (Dutch for bug/idea)

---

## What to Build

**Option 1 (Recommended):** If you're building this with me now:
- Provide complete working code
- Provide setup instructions I can follow step-by-step
- Provide testing instructions with curl examples
- Provide troubleshooting guide

**Option 2:** Just give me the code and secrets setup:
- The edge function TypeScript code
- How to add the secrets in Supabase
- One curl command to test it works

I prefer **Option 1** because I want to understand each step and verify it works before moving forward.

### My Supabase Project Details (for reference)
- Project: Histora app
- Table: public.feedback (already exists with RLS)
- Auth method: Supabase Auth with email
- Frontend: React Native/Expo

---

**Go ahead and build the complete solution. Make it production-ready, well-tested, and easy to deploy. Thanks!**
