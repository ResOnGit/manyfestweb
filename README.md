# MNFST!

Public webcomic shelf. Flip through covers, open a volume, read it in the browser. That is the whole product.

This README is for people using the site, not for building it.

## The shelf

You land on a row of book covers.

- **Swipe** the covers left or right (phone or trackpad).
- Use the **← →** buttons, or the **left/right arrow keys**.
- **Tap / click the front cover** (or press **Enter**) to open that volume.

The title and tagline under the cover are for the book in front. If you already started that volume, it will say **continue reading from page N**.

Some covers are still in progress. Opening those just flashes **working on it!** and stays on the shelf.

## Reading

The first time you open a volume, the cover does a short “book falling open” bit. **Tap, click, Enter, or Escape** skips it. After that, that volume opens straight into the reader.

In the reader:

- Turn pages with the on-screen controls, or however your device already paginates (click, swipe, keys).
- A page indicator shows where you are.
- **← shelf** in the header takes you back without losing your place.

Some volumes read left-to-right, some right-to-left (manga style). Follow the page flow on screen.

## Your place is saved on this device

Progress lives in **this browser on this device** (last page per volume, and whether you already saw the open animation). Nothing is sent to a server, and there is no account.

That means:

- Come back later on the same browser → you continue where you left off.
- A different phone, a private window, or clearing site data → you start from page 1 again.

## About

There is an **about who?** link on the shelf if you want the short version of why this exists.

## Accessibility notes

- The shelf works with keyboard (arrows + Enter) as well as pointer/touch.
- If your system has **reduced motion** on, the cover slide and open animation are skipped or cut short.

## Credits

Reader UI uses [react-comic-viewer](https://github.com/piro0919/react-comic-viewer) (MIT), Copyright (c) 2026 piro0919.
