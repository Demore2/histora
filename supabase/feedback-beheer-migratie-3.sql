-- Feedbackbord, ronde 3 — de status "wacht" (Wacht op…).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Het bord groepeert sindsdien op status (Nieuw → Mee bezig → Wacht op → Klaar) in plaats van op
-- persoon, en een ticket verslepen naar een groep zet die status. "Wacht op" is voor een ticket
-- dat niet verder kan tot er iets gebeurt (een antwoord van de lezer, een release, Google); wát
-- er wordt afgewacht hoort in de interne notitie.

alter table public.feedback drop constraint if exists feedback_status_check;
alter table public.feedback add constraint feedback_status_check
  check (status in ('nieuw', 'in_behandeling', 'wacht', 'klaar'));
