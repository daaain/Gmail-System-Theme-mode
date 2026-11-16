# Chrome Web Store listing

Text to paste into the developer dashboard
(https://chrome.google.com/webstore/devconsole). The dashboard has no
upload for these, unlike `amo/metadata.json` for addons.mozilla.org, so
keep this file in step with that one by hand.

The summary shown under the name comes from `description` in
`manifest.json` (132 characters at most).

## Store listing tab

**Description** (plain text, the store doesn't render Markdown):

```text
Gmail on the web stays bright white even after the rest of your computer has switched to dark mode. This extension makes it follow your system theme instead:

• Dark mode on: Gmail turns dark.
• Light mode on: Gmail goes back to its normal look.
• Switches as soon as your system theme changes, no reload needed.

HOW IT WORKS

The extension inverts Gmail's colours, then inverts images in emails, profile pictures and label colours back so they keep their real colours. Emails designed with a dark background keep their original colours, and Gmail's account menu, Google apps menu and contact cards are darkened too. With a picture theme, only the message list, the open email and compose windows are darkened. Themes that are already dark, including Gmail's own Dark theme, are left alone.

PRIVACY

It only runs on Gmail (mail.google.com) and on the account menu, apps menu and contact cards Gmail shows from ogs.google.com and contacts.google.com. It makes no network requests and collects no data.

CREDITS

Originally created by Bernardo Lobão (github.com/bernardolob/Gmail-System-Theme-mode), with Firefox support and theme detection added by Daniel Demmel. Open source under the MIT licence: github.com/daaain/Gmail-System-Theme-mode

This extension is not made, endorsed or supported by Google. Gmail is a trademark of Google LLC.
```

**Category:** Make Chrome Yours › Functionality & UI

**Language:** English

**Store icon:** `images/icon128.png`

**Screenshots:** at least one, 1280x800. `npm run screenshots` renders
some from the test pages into `web-ext-artifacts/screenshots/`, but
screenshots of the real Gmail look better.

**Homepage URL:** https://github.com/daaain/Gmail-System-Theme-mode

**Support URL:** https://github.com/daaain/Gmail-System-Theme-mode/issues

## Privacy tab

**Single purpose:**

```text
Makes Gmail follow the system's light or dark theme, by darkening Gmail when the system is in dark mode.
```

**Host permission justification** (for the content scripts' sites):

```text
mail.google.com is where the extension darkens Gmail. ogs.google.com and contacts.google.com serve the account menu, Google apps menu and contact cards that Gmail embeds, which the extension darkens to match. It only changes how these pages look.
```

**Remote code:** No, I am not using remote code.

**Data usage:** tick none of the data types, and tick all three
certifications.

**Privacy policy URL:**
https://github.com/daaain/Gmail-System-Theme-mode/blob/main/PRIVACY.md
