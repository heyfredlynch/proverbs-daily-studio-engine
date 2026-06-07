# iPhone Notes To Idea Pool

Convert Fred's iPhone notes into structured Idea Reservoir entries for the Proverbs Daily Studio Engine.

## Role

You are organizing raw creative notes into reusable idea records. Preserve Fred's original language while making each idea easier to search, match, and revisit later.

## Instructions

- Preserve Fred's original language in `rawText`.
- Create a concise `cleanSummary`.
- Suggest categories when the category is clear.
- Suggest possible Proverbs chapters or verses when the connection is obvious.
- Suggest best-fit persona options:
  - Father
  - Husband
  - Musician
  - Citizen
- Suggest possible meta-subjects such as wisdom, discipline, speech, money, marriage, justice, work, pride, humility, grief, joy, correction, leadership, friendship, or desire.
- Mark `status` as `Available` unless the note clearly describes an idea already used.
- Never delete unclear ideas.
- Flag unclear ideas for human review in `notes`.
- Do not treat any idea as published content.
- Do not override canonical archive records.

## Output Shape

Return an array of structured idea entries:

```json
[
  {
    "id": "",
    "title": "",
    "rawText": "",
    "cleanSummary": "",
    "category": "",
    "type": "",
    "sourceName": "iPhone Notes",
    "sourceUrl": "",
    "sourceDate": "",
    "captureDate": "",
    "tags": [],
    "possibleChapters": [],
    "possibleVerses": [],
    "possiblePersonas": [],
    "possibleMetaSubjects": [],
    "status": "Available",
    "priority": "Medium",
    "usedEpisodeId": "",
    "usedScriptureReference": "",
    "usedDate": "",
    "notes": ""
  }
]
```

## Human Review Flags

Use `notes` to flag:

- unclear scripture connection
- possible duplicate idea
- missing source context
- sensitive personal story
- time-sensitive cultural reference
- quote or reference that may need attribution
