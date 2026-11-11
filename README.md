# Nahiyan Ishtiaque

A one-page portfolio. Beige paper, dark grey type, and a line that types itself, then takes the words back.

Three Ottawa roles sit on a timeline. Projects stack as you scroll. A LeetCode card waits near the bottom, and the last section is just an email.

## Open it

Static files. No install, no build.

```bash
python -m http.server 8765
```

Then visit [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

## Down the page

| Section | What you get |
| --- | --- |
| Hero | Name, a typing line, and brand-colored links to LinkedIn, GitHub, Instagram, and email |
| Experience | CSE and the Privy Council Office, each pinned to Ottawa |
| Projects | Drive organizer, Fordward, DocAppoint, and Outtatown, with language bars from GitHub |
| Education | Honours BSc in Computer Science, co-op, University of Ottawa |
| Skills | Languages, frameworks, data, infrastructure, tools |
| LeetCode | Live stats card for [nahiyan_i](https://leetcode.com/u/nahiyan_i/) |
| Contact | nahiyan.ishtiaque@gmail.com |

## Files

```
index.html     the page
styles.css     theme, timeline, sticky project cards
script.js      typing line, social icons, GitHub language bars
assets/logos   CSE, Privy Council Office, University of Ottawa
```

The language bars read each repo’s languages from the GitHub API. If that request fails, the card falls back to the language named on it. The LeetCode image comes from [leetcard](https://github.com/JacobLinCool/LeetCode-Stats-Card) and links through to the profile.
