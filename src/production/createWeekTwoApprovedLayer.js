const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const WEEK = 25;
const APPROVED_DATE = "2026-06-18";
const APPROVED_BY = "Fred Lynch";
const SOURCE = "FINAL_TAB";
const OUTRO_COMPONENT = "proverbs-daily-standard-outro";
const FINAL_DOC_TITLE = "Proverbs Daily Season Two - Week Two Drafts - June 14-20";
const FINAL_DOC_URL =
  "https://docs.google.com/document/d/1IljVM1ObgbgtceI7cfMNBoLzEcvQ_U10tBEoqzYKg_o";

const approvedPerformancePath =
  "outputs/approved/week-two/weekly-approved-performance-script-week-25.md";
const approvedTechnicalPath =
  "outputs/technical/week-two/weekly-approved-technical-script-week-25.md";
const manifestPath = "data/production/week-two/productionManifest.week25.json";

const episodes = [
  {
    date: "2026-06-14",
    scriptureReference: "Proverbs 14:30",
    translation: "ESV",
    title: "The Rhythm of a Sound Heart",
    referenceSlug: "proverbs-14-30",
    episodeSlug: "the-rhythm-of-a-sound-heart",
    verseText: "A tranquil heart gives life to the flesh, but envy makes the bones rot.",
    body: `I took a CPR class once, and one of the things that stuck with me was the importance of rhythm.
You don't just start pressing frantically.
Even though you're thinking:
"This person is dying!"
You don't panic and start pounding away.
No.
You follow a rhythm.
A cadence.
A beat.
You stay in tempo because the body responds to rhythm.
And I remember thinking:
This is a trip.
A song can save a life.
A rhythm can help bring a body back from the brink.
And that's when Proverbs 14:30 came to mind.
"A tranquil heart gives life to the flesh, but envy makes the bones rot."
I love the phrase "a sound heart."
Not just because it means healthy.
But because it makes me think about sound itself.
Rhythm.
Harmony.
Being in tune.
A sound heart gives life.
A settled heart.
A centered heart.
A heart moving in rhythm with God's goodness.
But then Proverbs introduces envy.
And envy is offbeat.
Out of rhythm.
Out of tune.
Envy doesn't just make you want what someone else has.
It starts making you suspicious of the life God gave you.
It turns another person's joy into your private injury.
It takes a testimony and makes it feel like an insult.
And Proverbs says that kind of thing gets into the bones.
Not literally like an X-ray report.
But deeply.
Structurally.
Down where strength is supposed to live.
Think about your phone when too many apps are running in the background.
The screen looks normal.
Everything appears fine.
But the battery keeps draining.
That's how envy works.
You can smile.
Work.
Serve.
Post.
Encourage others.
And all the while comparison is quietly draining your joy in the background.
A sound heart closes the apps.
It says:
I don't have to compete with what God is doing in somebody else's life.
I can participate in what God is doing in mine.
The good news is that the heart can be tuned again.
You are not stuck with envy as your rhythm.
Gratitude can interrupt it.
Blessing others can weaken it.
Contentment can teach your soul to breathe again.
God isn't trying to shame you for feeling comparison.
He's inviting you into a healthier pulse.
A better cadence.
A life-giving rhythm.
Because what happens inside us doesn't stay inside us.
And a sound heart gives life.`,
    remember: "A quiet heart can heal what envy keeps inflaming.",
    prayer: "God, tune my heart to gratitude, contentment, peace, and joy.",
    challenge: `Name one envy trigger today.
A person.
A platform.
A conversation.
A number.
Then intentionally bless that person and release the comparison before it settles into your bones.`,
  },
  {
    date: "2026-06-15",
    scriptureReference: "Proverbs 15:1",
    translation: "NLT",
    title: "You Know That Thing Magnets Do...",
    referenceSlug: "proverbs-15-1",
    episodeSlug: "you-know-that-thing-magnets-do",
    verseText: "A gentle answer deflects anger, but harsh words make tempers flare.",
    body: `You know that thing magnets do?
You put one side close, and it pulls the other magnet in.
But turn it around the right way, and suddenly there's this invisible resistance. No hands. No noise. Nothing dramatic. Just a force you can't see, pushing something away.
That always felt a little like Star Wars to me.
Yoda lifts the X-wing out of the swamp. Obi-Wan waves his hand and redirects the room. Darth Vader stands there in Cloud City, Han Solo starts blasting, and Vader just raises his hand like, "Please. Not today." Blaster shots deflected. Everybody in the room suddenly realizes, there is power here we cannot see.
And that is the part that resonates with this ancient text.
Proverbs 15:1 says:
"A gentle answer deflects anger, but harsh words make tempers flare."
That word deflect is important.
A gentle answer does not pretend anger is not in the room. It feels the heat. It senses the smoke. It recognizes the emotional blaster fire coming across the table.
Then wisdom raises its hand.
A gentle answer turns the magnet.
It creates enough holy resistance that anger does not get to land the same way.
Harsh words do something else. Harshness is magnetic too, but it pulls temper closer. It gives anger something to grab. That's Palpatine whispering into Anakin's pain, feeding the wound, stirring the fear, turning heat into fire.
And we have all been in rooms like that.
One person carries so much harsh energy that everybody starts choosing their sentences carefully because one wrong syllable might set the whole thing off. The whole room becomes a verbal minefield. Nobody is talking freely. Everybody is surviving the atmosphere.
That is the power of speech.
Words are either a thermostat or a match.
A soft answer is not weakness. It is not fake niceness. It is not letting somebody run over you. It is trained strength. It is truth with breath control. It is power that does not need to prove itself by exploding.
Therapist Aundi Kolber uses the phrase, "Try Softer...Not Harder." I love that.
Because sometimes we try harder with our volume. Harder with our defense. Harder with our comeback. Harder with our need to win the sentence.
But Proverbs says there is another kind of strength.
Try softer.
Lower the voltage.
Turn the magnet.
Let wisdom create enough space for peace to enter the room.
You already have magnetism. Your tone pulls things closer or pushes things away. Your words can attract drama or deflect it. Your answer can make the room safer, calmer, wiser.
Today, use the force wisely.`,
    remember: "Try softer, not harder; wisdom cools what anger started.",
    prayer: "Lord, teach me to try softer with wise words today.",
    challenge:
      "Notice your magnetism in one conversation today. Before answering, pause, lower your tone, and choose words that deflect anger instead of attracting it.",
    signoff: "Be Wise. Be Well.",
  },
  {
    date: "2026-06-16",
    scriptureReference: "Proverbs 16:23",
    translation: "NKJV",
    title: "The Greatest Teacher",
    referenceSlug: "proverbs-16-23",
    episodeSlug: "the-greatest-teacher",
    verseText: "The heart of the wise teaches his mouth, And adds learning to his lips.",
    body: `GPS has made us both bold and helpless.
Bold, because we will drive into a city we do not know with full confidence. I know. I'm an Uber/Lyft driver. There are places I have gone that, without GPS, I would have never even attempted.
But GPS has also made us helpless, because if that signal drops, suddenly we are ready to pull over, breathe into a paper bag, and try to find our happy place.
And there is one little word that can change the whole mood in the car:
Rerouting...
You missed the turn.
You ignored the exit.
You thought you knew a better way.
And the phone doesn't put you on blast. It does not say, "See, I told you."
It just recalculates.
That may be one of the smallest pictures of grace we carry around every day.
Proverbs 16:23 says:
"The heart of the wise teaches his mouth, and adds learning to his lips."
That is a beautiful picture.
The mouth and the lips are the front-facing part of us. They are the public speakers. The outward expressors. They are what people hear first.
But the heart is the classroom.
The heart of the wise teaches the mouth.
Which means sometimes my mouth is about to drive right past wisdom. My lips are ready to take the wrong exit. My tongue has already hit the gas. It wants to say the sharp thing, the defensive thing, the funny-but-hurtful thing, the "I'm just being honest" thing.
Then somewhere deeper, wisdom starts blinking.
Rerouting...
Rerouting...
Rerouting...
That is the greatest teacher at work.
And the greatest teacher is not just information outside of you. It is the God-shaped wisdom within you, teaching the better version of you how to speak through the current version of you.
You already know some things your mouth has not learned yet.
You know how you want to sound when you are calm.
You know what kind of person you are becoming.
You know the words that heal, and you also know the words that leave smoke in the room.
The question is whether your mouth will let your heart teach today.
Following your heart does not mean obeying every feeling. In Proverbs, the wise heart is the trained center of a life learning from God.
So when that inner voice says, "Say it softer," listen.
When it says, "Wait before you answer," listen.
When it says, "That joke will wound them," listen.
When it says, "Tell the truth, but don't throw it like a rock," listen.
Because wisdom is not only trying to change what you know.
Wisdom is trying to disciple what you say.`,
    remember: "Self-taught by God, my heart tutors every word.",
    prayer: "Lord, teach my mouth to follow the wisdom within today.",
    challenge:
      'Before one important conversation today, pause and ask: "What is my heart trying to teach my mouth right now?" Write down one phrase you want to say better, then say it out loud with wisdom before you say it to them.',
    signoff: "Be Wise. Be Well.",
  },
  {
    date: "2026-06-17",
    scriptureReference: "Proverbs 17:1",
    translation: "NLT",
    title: "Quiet Tastes Better",
    referenceSlug: "proverbs-17-1",
    episodeSlug: "quiet-tastes-better",
    verseText: "Better a dry crust eaten in peace than a house filled with feasting—and conflict.",
    body: `I've been thinking about how the body receives what we give it.
Because you can have something nutrient dense, packed with everything the label says you need, vitamins, minerals, protein, all the wellness confetti, "And it's tasty too" (In my I Love Lucy voice) but if the body is under enough stress, it may not receive it the same way.
Now that doesn't mean junk food becomes holy manna if you eat it with a smile.
But it does mean there is a difference between something being nutrient dense and something being nutrient transferable.
It has to get into the system.
It has to be received in order for it to become strength.
Otherwise, you can swallow the vitamins and still watch your body send them right on down the river.
And Proverbs has been sitting there with this wisdom the whole time.
Proverbs 17:1 says:
"Better a dry crust eaten in peace than a house filled with feasting—and conflict."
The picture is simple.
On one side, a dry crust.
Day-old bread.
Nothing impressive. No butter melting into it. No Thanksgiving aroma. No "somebody come take a picture of this plate" moment.
Just crust.
But if peace is there...it's a feast.
On the other side, a house full of food. Feasting. Abundance. Celebration. The kind of table everyone would admire from the outside.
But conflict is sitting at the table too.
And Proverbs says wisdom would rather have less food with peace than more food with strife.
That is soul-level accounting.
Because strife can make a feast hard to digest.
Conflict can season everything with tension.
You ever been in a house where the food is good, but the room is tight? Everybody is passing plates, but also throwing shade. One person says the wrong thing, and suddenly the gravy has anxiety in it.
I get this personally.
I'm a big dude. Broad shoulders. Loud laugh. Extroverted. I can fill a room without trying.
But I do not like conflict.
Maybe age has taught me. Maybe I just do not want the smoke. Maybe I know there's a Mr. Hyde somewhere in the basement, and Doc Jekyll has learned to keep checking the locks.
So I try to detect when strife is afoot.
When the air changes.
When the room starts crackling.
When peace is leaving the kitchen.
And sometimes wisdom is not walking into the fight. Sometimes wisdom is making the room easier to breathe in.
A peaceful home helps people receive the good that is already there.
A gentle greeting.
A clean counter.
An apology before the day gets crowded.
A decision not to reheat yesterday's argument with today's coffee.
Quiet tastes better.
Peace makes simple bread more transferable to the soul.
And maybe today the blessing is not a bigger feast.
Maybe today the blessing is a quieter table.`,
    remember: "Quiet tastes better when peace helps the soul absorb.",
    prayer: "God, make my presence peaceful enough to nourish others today.",
    challenge:
      "Do one small thing today that makes your home easier to breathe in. Clear a mess. Speak gently. Apologize first. Or simply choose not to stir the strife.",
  },
  {
    date: "2026-06-18",
    scriptureReference: "Proverbs 18:21",
    translation: "AMP",
    title: "Eat Your Words",
    referenceSlug: "proverbs-18-21",
    episodeSlug: "eat-your-words",
    verseText:
      "Death and life are in the power of the tongue, And those who love it and indulge it will eat its fruit and bear the consequences of their words.",
    body: `Spoken words feel weightless, inconsequential, free until the bill arrives.
You can say it quick.
Post it quick.
Text it quick.
Drop the comment, make the joke, throw the verbal elbow, and in the moment it feels cheap.
Free-ninety-nine, even.
But eventually the receipt comes.
A relationship gets colder.
A child remembers a sentence you forgot you said.
A friend starts pulling back.
A room changes after you walk into it.
I guess Proverbs 18:21 wasn't lying:
"Death and life are in the power of the tongue, And those who love it and indulge it will eat its fruit and bear the consequences of their words."
I love the Amplified version because sometimes it opens the treasury of a words and lets you walk around inside it.
Here's a great one for example: indulge.
That is rich.
Indulge means this is not just something you said once. This is something you keep tasting. You keep reaching for it. You keep going back to the pantry of your own speech because there is a flavor you have learned to enjoy.
Some people indulge death with their words.
They love the sharp comeback.
They love the cutting joke.
They love the power of making a room go quiet.
They love being "real," when really they are just being reckless with a microphone God gave them.
But there are also people who indulge life.
They love blessing.
They love encouragement.
They love finding the sentence that helps somebody stand up straighter.
They love speaking peace into a nervous room.
They love telling the truth in a way that does not leave blood on the floor.
And Proverbs says both kinds of people will eat.
That is the part we miss.
The death talker eats the fruit of death.
The life talker eats the fruit of life.
A comment thread online can show this in real time. One sentence gets planted. Somebody adds sarcasm. Somebody else adds heat. Then comes the screenshot, the pile-on, the receipts, the digital fruit basket nobody wants to carry.
But life works that way too.
One sentence from a teacher can stay with you for thirty years.
One blessing from a parent can interrupt shame.
One apology can plant a garden where resentment was trying to grow.
One calm word can save the atmosphere of a whole house.
So maybe "eat your words" does not always have to be negative.
Maybe wisdom says: speak words today you would not mind living on tomorrow.
Speak words you could eat later and still feel nourished.
Because the tongue has power, and appetite always becomes harvest.`,
    remember: "Indulge life-giving words; you'll gladly eat that fruit.",
    prayer: "God, make my words become life-giving fruit I eagerly eat.",
    challenge:
      "Speak one life-giving sentence today where criticism would be easier. Encourage somebody. Bless somebody. Apologize to somebody. Plant fruit you would not mind eating later.",
    signoff: "Be Wise. Be Well.",
  },
  {
    date: "2026-06-19",
    scriptureReference: "Proverbs 19:21",
    translation: "KJV",
    title: "What's Your Algorithm?",
    referenceSlug: "proverbs-19-21",
    episodeSlug: "whats-your-algorithm",
    verseText:
      "There are many devices in a man's heart; nevertheless the counsel of the LORD, that shall stand.",
    body: `You ever know somebody so well, you can almost predict what they're about to say?
Some folks have a built-in phrase for everything.
Somebody says, "It might rain," and they say, "We needed it."
Somebody says, "I'm tired," and they say, "Better than the alternative."
Somebody mentions a problem, and before they even finish, you already know what button just got pushed inside them and you can finish their sentence for them!
Because all of us have patterns.
Little inner scripts.
Silent rules.
Emotional routines.
Almost like an algorithm running under the surface.
Oh...you thought it was just computers that ran on algorithms?
If this happens, say that.
If they challenge me, defend myself.
If I feel ignored, shut down.
If I get praised, perform harder.
If I get afraid, try to control everything.
And most of the time, we do not even notice the code running.
That is why I'm reading Proverbs 19:21 from the King James Version today.
Because of one word: devices.
Proverbs 19:21 says:
"There are many devices in a man's heart; nevertheless the counsel of the LORD, that shall stand."
Most newer translations say "plans," and that is right.
But "devices" has a strange little electricity to it.
A device is something designed to do something.
A mechanism.
A setup.
A thing built with an intended outcome.
And Proverbs says there are many devices in the human heart.
Not one.
Many.
We are full of inner machinery.
Some of it is beautiful. Creativity. Vision. Strategy. Possibility.
But some of it is old code from pain.
Old code from fear.
Old code from pride.
Old code from the version of us that learned how to survive, but has not yet learned how to surrender.
That is where the second half of the verse brings us home:
"Nevertheless the counsel of the LORD, that shall stand."
There is something stronger than the algorithm.
The counsel of the Lord stands.
God is not intimidated by the code running in your heart.
He can reveal it.
He can redeem it.
He can rewrite it.
Maybe you have a device in your heart that always expects rejection.
Maybe you have a device that turns every correction into an attack.
Maybe you have a device that keeps calculating worst-case scenarios and calling it wisdom.
But the counsel of the Lord stands there with steadier instructions.
You are loved.
You are teachable.
You are not trapped in your first reaction.
You can pause.
You can listen.
You can choose a wiser way.
Your plans may be many, but they do not have to be your master.
Your inner algorithm can be retrained by the counsel of God.`,
    remember: "Your inner algorithm needs God's counsel to stand.",
    prayer: "Lord, rewrite my hidden code until Your counsel stands within.",
    challenge:
      'Notice one repeated reaction in yourself today. Ask, "What device is running in my heart right now?" Then write one sentence of God\'s counsel that can interrupt that old code and lead you in a wiser direction.',
    signoff: "Be Wise. Be Well.",
  },
  {
    date: "2026-06-20",
    scriptureReference: "Proverbs 20:24",
    translation: "ESV",
    title: "Walking Without The Whole Map",
    referenceSlug: "proverbs-20-24",
    episodeSlug: "walking-without-the-whole-map",
    verseText: "A man's steps are from the LORD; how then can man understand his way?",
    body: `It was near midnight, and I was driving by myself through the deep pine-tree dark freeways of Mississippi.
Back highways.
No big city lights.
Just road, rain, tired eyes, and the kind of darkness that feels older than the moment you are driving through.
And I remember thinking about that land. Mississippi. The place where songs of sorrow still seem to hang in the trees like strange fruit. The place where history is not just in books, but in the air.
I was exhausted.
At the time, I was working with Josh McDowell Ministries as the "Urban Ministry Coordinator". We were doing big events. Conferences. Lights. Music. Speakers. The whole thing.
But on an off night, I kept thinking about the kids who would probably never make it to the big event. Kids who may not have had the money, the transportation, or even the invitation to cross town and sit in that kind of room.
So I rented a car.
Went to a little Baptist church.
And did the same message for them.
Same heart. Same gospel. Same invitation.
Just translated into their room.
Urbanized, if you will.
And afterward, I was done.
Dead-dog tired.
Driving through Mississippi rain on a hot summer night.
Then Fred Hammond's song came on:
"Your Steps Are Ordered."
And I just started crying.
Not cute crying either.
That tired, holy, ugly cry.
Because something in me knew: I had not just gone somewhere.
I had been sent somewhere.
Proverbs 20:24 says:
"A man's steps are from the LORD; how then can man understand his way?"
That verse tells the truth about life.
Your steps can be ordered by God before they are understood by you.
That is humbling.
Because while you are walking, all you may feel is tired.
Confused.
Stretched.
Unsure why you said yes.
Unsure why you are on that road, in that season, carrying that assignment.
But later, sometimes years later, you look back and realize heaven had placed an order.
Not just order like arrangement.
Order like a meal being prepared, a suit being tailored, a plan being lived out.
God was serving something through your steps.
Strength for somebody.
Encouragement for somebody.
Dignity for somebody.
A moment for kids who needed to know they were not forgotten.
That is why we cannot always understand our own way while we are still walking it.
We only see the road under the headlights.
God sees the destination, the detour, the person waiting, the seed being planted, the future testimony being formed in the dark.
Maybe today you are asking God for the whole map.
But maybe God is giving you the next faithful step.
Take it.
Make the call.
Do the work.
Encourage the person.
Show up in the little room.
Drive the back road if love sends you there.
Your understanding may arrive later.
But guidance can be present now.`,
    remember: "Ordered steps may feed someone before they make sense.",
    prayer: "God, order my steps even when I cannot understand them.",
    challenge:
      'Take one faithful step today without demanding the whole map. Then, as a bonus, listen to Fred Hammond\'s "Your Steps Are Ordered" and remember: guidance can be real before clarity is complete.',
  },
].map((episode) => ({
  ...episode,
  audioFilename: `${episode.date}_proverbs-daily_${episode.referenceSlug}_${episode.episodeSlug}.mp3`,
}));

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function ensureDir(relativePath) {
  fs.mkdirSync(absolute(relativePath), { recursive: true });
}

function writeText(relativePath, value) {
  const filePath = absolute(relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function writeJson(relativePath, value) {
  writeText(relativePath, JSON.stringify(value, null, 2));
}

function touchGitkeep(relativePath) {
  writeText(path.join(relativePath, ".gitkeep").replace(/\\/g, "/"), "");
}

function metadata(episode) {
  return {
    status: "APPROVED",
    source: SOURCE,
    approvedBy: APPROVED_BY,
    approvedDate: APPROVED_DATE,
    week: WEEK,
    productionStatus: "READY_FOR_AUDIO",
    elevenLabsStatus: "READY",
    audioReviewStatus: "NOT_STARTED",
    videoStatus: "READY_FOR_PLANNING",
    publishStatus: "NOT_STARTED",
    outroComponent: OUTRO_COMPONENT,
    date: episode.date,
    scriptureReference: episode.scriptureReference,
    translation: episode.translation,
    title: episode.title,
  };
}

function yamlBlock(values) {
  return [
    "```yaml",
    `status: ${values.status}`,
    `source: ${values.source}`,
    `approvedBy: ${values.approvedBy}`,
    `approvedDate: ${values.approvedDate}`,
    `week: ${values.week}`,
    `productionStatus: ${values.productionStatus}`,
    `elevenLabsStatus: ${values.elevenLabsStatus}`,
    `audioReviewStatus: ${values.audioReviewStatus}`,
    `videoStatus: ${values.videoStatus}`,
    `publishStatus: ${values.publishStatus}`,
    `outroComponent: ${values.outroComponent}`,
    `date: ${values.date}`,
    `scriptureReference: ${values.scriptureReference}`,
    `translation: ${values.translation}`,
    `title: ${values.title}`,
    "```",
  ].join("\n");
}

function wordCount(value) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function listenerChunk(episode) {
  return [
    `Scripture Reference: ${episode.scriptureReference}`,
    "",
    `Verse Text: ${episode.verseText}`,
    "",
    `Episode Title: ${episode.title}`,
    "",
    "Body:",
    episode.body.trim(),
    "",
    `Remember: ${episode.remember}`,
    "",
    `Prayer: ${episode.prayer}`,
    "",
    `Today's Challenge: ${episode.challenge.trim()}`,
    episode.signoff ? ["", episode.signoff].join("\n") : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function validateEpisode(episode) {
  const combined = listenerChunk(episode);
  const sourceNeededMarker = ["SOURCE_NEEDED", "FROM_GOOGLE_DOC_FINAL_TAB"].join("_");
  const banned = [
    sourceNeededMarker,
    ["DRAFT", "FOR FRED REVIEW"].join(" "),
    ["Recommended", "Improvements"].join(" "),
    ["Fred", "Revision Notes"].join(" "),
    ["OUTRO", "PLACEHOLDER"].join(" "),
    ["10 word", "prayer here"].join(" "),
  ];
  for (const marker of banned) {
    if (combined.includes(marker)) {
      throw new Error(`${episode.date} contains banned marker: ${marker}`);
    }
  }
  const prayerWords = wordCount(episode.prayer);
  if (prayerWords !== 10) {
    throw new Error(`${episode.date} prayer has ${prayerWords} words: ${episode.prayer}`);
  }
}

function approvedPerformance() {
  episodes.forEach(validateEpisode);

  const lines = [
    "# Week Two Approved Performance Script - Week 25",
    "",
    "Clean listener-facing chunks for ElevenLabs batch preparation.",
    "",
  ];

  for (const episode of episodes) {
    lines.push("---", "", `## ${episode.scriptureReference} - ${episode.title}`, "", listenerChunk(episode), "");
  }

  return lines.join("\n");
}

function approvedTechnical() {
  const lines = [
    "# Week Two Approved Technical Script - Week 25",
    "",
    "Approved metadata and production routing for Week Two audio, review, and video planning.",
    "",
    `Final source document: ${FINAL_DOC_TITLE}`,
    `Final source URL: ${FINAL_DOC_URL}`,
    "",
  ];

  for (const episode of episodes) {
    const values = metadata(episode);
    lines.push(
      `## ${episode.date} - ${episode.scriptureReference} - ${episode.title}`,
      "",
      yamlBlock(values),
      "",
      "audio:",
      `- rawPath: outputs/audio/week-two/raw/${episode.audioFilename}`,
      `- reviewPath: outputs/audio/week-two/review/${episode.date}_${episode.referenceSlug}_audio-review.md`,
      "- sourcePolicy: Use listener-facing approved performance script only.",
      "- sourceSection: approved-performance-script/week-two",
      "- textPreparation: metadata and internal notes removed; scripture, title, body, Remember, Prayer, and Today's Challenge retained.",
      "",
      "video:",
      `- scenePlanPath: outputs/video/week-two/scene-plans/${episode.date}_${episode.referenceSlug}_scene-plan.md`,
      "- status: READY_FOR_PLANNING",
      "",
      "publish:",
      "- status: NOT_STARTED",
      ""
    );
  }

  return lines.join("\n");
}

function productionManifest() {
  return {
    week: WEEK,
    approvedDate: APPROVED_DATE,
    approvedBy: APPROVED_BY,
    source: SOURCE,
    finalSourceDocumentTitle: FINAL_DOC_TITLE,
    finalSourceDocumentUrl: FINAL_DOC_URL,
    episodes: episodes.map((episode) => ({
      date: episode.date,
      scriptureReference: episode.scriptureReference,
      translation: episode.translation,
      title: episode.title,
      status: "APPROVED",
      productionStatus: "READY_FOR_AUDIO",
      approvedScriptPath: approvedPerformancePath,
      technicalScriptPath: approvedTechnicalPath,
      audioRawPath: `outputs/audio/week-two/raw/${episode.audioFilename}`,
      audioReviewPath: `outputs/audio/week-two/review/${episode.date}_${episode.referenceSlug}_audio-review.md`,
      videoScenePlanPath: `outputs/video/week-two/scene-plans/${episode.date}_${episode.referenceSlug}_scene-plan.md`,
      elevenLabsStatus: "READY",
      audioReviewStatus: "NOT_STARTED",
      videoStatus: "READY_FOR_PLANNING",
      publishStatus: "NOT_STARTED",
      outroComponent: OUTRO_COMPONENT,
    })),
  };
}

function createFolders() {
  [
    "outputs/audio/week-two",
    "outputs/audio/week-two/raw",
    "outputs/audio/week-two/review",
    "outputs/video/week-two",
    "outputs/video/week-two/scene-plans",
    "outputs/video/week-two/assets",
    "outputs/publish/week-two",
    "outputs/approved/week-two",
    "data/production/week-two",
  ].forEach((dir) => {
    ensureDir(dir);
    touchGitkeep(dir);
  });
}

function run() {
  createFolders();
  writeText(approvedPerformancePath, approvedPerformance());
  writeText(approvedTechnicalPath, approvedTechnical());
  writeJson(manifestPath, productionManifest());

  console.log(`Updated ${approvedPerformancePath}`);
  console.log(`Updated ${approvedTechnicalPath}`);
  console.log(`Updated ${manifestPath}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  episodes,
  productionManifest,
  approvedPerformance,
  approvedTechnical,
};
