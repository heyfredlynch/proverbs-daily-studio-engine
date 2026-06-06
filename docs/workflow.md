# Workflow

The Proverbs Daily Studio Engine follows a simple editorial and production flow:

1. Source archive
   - Start with the canonical Season One archive.
   - Use the archive as source material for Season Two episode generation.

2. Verse selection
   - Match the Proverbs chapter to the day of the month.
   - Prefer unused verses from that chapter.
   - Avoid repeated verses unless `CALL_AUDIBLE` is explicitly used.

3. Script generation
   - Generate a Season Two episode draft from the selected verse, archive context, content rules, and approved prompts.
   - Produce both a Reader Version and a Performance Version.

4. Fred review
   - Fred reviews the draft for biblical fit, tone, pacing, clarity, and usefulness.
   - Notes and requested changes stay with the episode record.

5. Approval
   - Approved episodes move from draft status to approved status.
   - The verse tracker and episode manifest should reflect the approved selection.

6. Reader output
   - Produce the Reader Version for Substack and ProverbsDaily.org.
   - Reader output may include headings, formatting, rollout copy, and publishing metadata.

7. Performance output
   - Produce the Performance Version for ElevenLabs.
   - Performance output should be clean spoken-word text only.

8. Future video output
   - Preserve visual style notes and b-roll tags for future video generation workflows.
   - Video output is not part of the initial generator logic.
