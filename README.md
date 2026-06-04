<div align="center">

# ⏳ Git Time Machine

> **Interactively travel between your recent Git branches with a beautiful UI.**

[![npm version](https://badge.fury.io/js/git-time-machine.svg)](https://www.npmjs.com/package/git-time-machine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

```text
    ██████╗ ██╗████████╗    ████████╗██╗███╗   ███╗███████╗
    ██╔════╝ ██║╚══██╔══╝    ╚══██╔══╝██║████╗ ████║██╔════╝
    ██║  ███╗██║   ██║          ██║   ██║██╔████╔██║█████╗  
    ██║   ██║██║   ██║          ██║   ██║██║╚██╔╝██║██╔══╝  
    ╚██████╔╝██║   ██║          ██║   ██║██║ ╚═╝ ██║███████╗
     ╚═════╝ ╚═╝   ╚═╝          ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝
    ███╗   ███╗ █████╗  ██████╗ ██╗  ██╗██╗███╗   ██╗███████╗
    ████╗ ████║██╔══██╗██╔════╝ ██║  ██║██║████╗  ██║██╔════╝
    ██╔████╔██║███████║██║      ███████║██║██╔██╗ ██║█████╗  
    ██║╚██╔╝██║██╔══██║██║      ██╔══██║██║██║╚██╗██║██╔══╝  
    ██║ ╚═╝ ██║██║  ██║╚██████╗ ██║  ██║██║██║ ╚████║███████╗
    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
```

Typing `git branch`, hunting for the branch you worked on yesterday, and then manually typing `git checkout ...` is a massive waste of time.

**Git Time Machine** completely reinvents your git workflow by giving you a beautiful, interactive list of your local branches, sorted chronologically by the last commit date, allowing you to seamlessly "time jump" to your desired branch.

## ✨ Features

- **🕒 Chronological Sorting:** Branches are automatically sorted so the ones you were just working on are at the very top.
- **📝 Context Aware:** Shows the last commit message and the exact time it was committed so you never forget what a branch was for.
- **⚡ Lightning Fast:** No typing required. Just use your arrow keys and hit Enter to travel.
- **🎨 Premium UX:** Built with `inquirer` for a buttery-smooth terminal experience, complete with custom ASCII art.

## 🚀 Installation

Run it instantly anywhere without installing:

```bash
npx git-time-machine
```

Or install it globally to keep the time machine on your terminal dashboard:

```bash
npm install -g git-time-machine
```

## 🎮 Usage

Run the command inside any git repository:

```bash
git-time-machine
```

### Controls:
- **`↑ / ↓`** : Scroll through the timeline.
- **`Enter`** : Initiate the time jump.

---

### Architected by [@lakshanmuruganandam](https://github.com/lakshanmuruganandam)
*Because we shouldn't have to remember exact branch names in 2026.*
