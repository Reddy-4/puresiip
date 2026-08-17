# Puresiip — Setup Guide

This app runs on two free services:
- **GitHub Pages** — hosts the app itself (the screens, buttons, design)
- **Firebase** — stores your data (deliveries, apartments, bills) so every phone sees the same numbers

Neither costs money for a business this size.

Full step-by-step instructions are in the chat message where this file was shared.
Quick reference once you've done the setup:

## Files in this folder
- `index.html` — the whole app
- `manifest.json` — tells phones how to show the home-screen icon
- `sw.js` — small file that makes "Add to Home Screen" work properly
- `icon-192.png` / `icon-512.png` — the app icon
- `firestore-rules.txt` — paste this into Firebase's Firestore "Rules" tab

## To change the Firebase connection later
Open `index.html`, search for `firebaseConfig`, and update the values there.

## To update the app after making changes
1. Edit the file on GitHub (or upload a new version).
2. Commit the change.
3. Wait about 30–60 seconds — GitHub Pages updates itself automatically.

## Your data
Everything (apartments, deliveries, bills, expenses) lives in your own Firebase
project under **Firestore Database → appdata**. You own it, you can export it,
and nobody else can see it unless they have your Firebase login.
