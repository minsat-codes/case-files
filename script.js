/* =========================================================
   CASE FILES - script.js
   Plain JavaScript, no frameworks, no API.

   Sections:
     1. Case data (all the mysteries live here)
     2. Game state (progress, score, current case)
     3. Screens and the case list
     4. Investigation: brief, clues, suspects
     5. Making an accusation and showing the solution
     6. Replay, reset and next case
     7. Event listeners and start-up
   ========================================================= */


/* ---------------------------------------------------------
   1. CASE DATA
   Each case is an object with:
     id, title, location, difficulty
     intro, description, objective   - the case brief
     clues      - array of clues, revealed in this order
     suspects   - array of three suspects
     culpritId  - the id of the guilty suspect
     solution   - array of steps explaining the answer
   All people and places are fictional.
   --------------------------------------------------------- */
const cases = [
  {
    id: "bakery",
    number: "001",
    title: "The Midnight Bakery Break-in",
    location: "Crumb & Co. Bakery, Larkhaven",
    difficulty: "Beginner",
    intro: "Crumb & Co. is the most popular bakery in the small town of Larkhaven. Its owner, Rosa Crumb, has just won the town's Golden Whisk prize with her secret cinnamon bun recipe.",
    description: "When Rosa arrived at 4:30 AM on Tuesday, the cash box with the week's earnings and her handwritten secret recipe card were missing from the storeroom. Nothing else was touched. The bakery had been locked up at 11 PM the night before.",
    objective: "Work out who got into the bakery during the night and took the cash box and the recipe.",
    clues: [
      {
        type: "Physical evidence",
        title: "The back door",
        text: "There are no broken windows or damaged locks. The back door was opened with a key. Only three keys exist: one belongs to Rosa, one to her assistant baker Priya, and one to the delivery driver Oliver."
      },
      {
        type: "Record",
        title: "The alarm log",
        text: "The alarm was switched off at 2:14 AM by someone who typed in the correct code. Only Rosa and Priya know the code. Oliver has a key so he can drop off flour, but he always arrives after Rosa has switched the alarm off, so he was never told the code."
      },
      {
        type: "Record",
        title: "The radio station",
        text: "Larkhaven Radio confirms that Marcus Hale was live on air, hosting his 'Night Kitchen' cooking show, from 1:00 AM to 3:00 AM. The radio station is a 40-minute drive from the bakery."
      },
      {
        type: "Physical evidence",
        title: "Flour footprints",
        text: "A trail of floury footprints leads from the storeroom to the back door. They were made by small trainers, about size 6. Priya wears size 6. Oliver and Marcus wear much bigger shoes (size 11 and size 10)."
      },
      {
        type: "Witness",
        title: "The night bus driver",
        text: "The driver of the night bus remembers a young woman in a flour-dusted bakery apron getting off at the Market Street stop, right next to the bakery, at 2:05 AM."
      }
    ],
    suspects: [
      {
        id: "oliver",
        name: "Oliver Finch",
        role: "Delivery driver, 31",
        emoji: "🚚",
        description: "Delivers flour and sugar to the bakery five mornings a week and has his own key to the back door.",
        motive: "He is behind on the payments for his delivery van.",
        alibi: "Says he was asleep at home until his alarm rang at 4:00 AM for his morning deliveries."
      },
      {
        id: "priya",
        name: "Priya Sandoval",
        role: "Assistant baker, 24",
        emoji: "👩‍🍳",
        description: "Has worked at Crumb & Co. for three years and helped Rosa perfect the cinnamon bun recipe.",
        motive: "Last week Rosa turned down her request for a pay rise. Priya told a friend she deserved a share of the prize-winning recipe.",
        alibi: "Says she went straight home after closing and was asleep all night."
      },
      {
        id: "marcus",
        name: "Marcus Hale",
        role: "Rival bakery owner, 45",
        emoji: "🥐",
        description: "Owns Hale's Loaves across the street and came second in the Golden Whisk prize.",
        motive: "He was furious about losing and has wanted Rosa's secret recipe for years.",
        alibi: "Says he was busy hosting his late-night radio cooking show."
      }
    ],
    culpritId: "priya",
    solution: [
      "The back door was opened with a key, so the thief had to be Rosa, Priya or Oliver. Marcus has no key. (Clue 1)",
      "The alarm was switched off with the correct code, which only Rosa and Priya know. Oliver could open the door but could not have stopped the alarm. (Clue 2)",
      "Marcus was live on the radio from 1:00 to 3:00 AM, 40 minutes away, so he could not have been at the bakery at 2:14 AM. (Clue 3)",
      "The flour footprints are size 6, which matches Priya, not Oliver (size 11) or Marcus (size 10). (Clue 4)",
      "The bus driver saw a woman in a bakery apron arrive next to the bakery at 2:05 AM, nine minutes before the alarm was switched off. This breaks Priya's alibi that she was asleep at home. (Clue 5)",
      "Conclusion: Priya Sandoval used her own key and the alarm code to take the cash box and the recipe, because she was angry about being refused a pay rise."
    ]
  },

  {
    id: "museum",
    number: "002",
    title: "The Swapped Masterpiece",
    location: "Harbourview Art Museum, Port Ellery",
    difficulty: "Detective",
    intro: "The Harbourview Art Museum's most valuable painting is 'The Silver Lighthouse', a 150-year-old seascape. On Saturday night the museum held a charity gala from 7 PM to 10 PM, with 200 guests in the main hall.",
    description: "On Sunday morning, a restorer noticed that the painting hanging in the east gallery was a fake. Its paint was still slightly soft, which means it had been painted within the last week. The real painting had been swapped during the gala.",
    objective: "Find out who swapped the real painting for the forgery.",
    clues: [
      {
        type: "Record",
        title: "The camera log",
        text: "The east gallery cameras were switched off from 8:40 PM to 8:52 PM, using an admin key card at the gallery's side panel. Only two admin cards exist: one belongs to the curator, Dr. Helena Voss, and the other to the head of security, who is on holiday abroad this month."
      },
      {
        type: "Record",
        title: "The lobby camera",
        text: "The lobby camera kept recording all night. It shows night guard Sam Okafor at the coat-check desk from 8:30 PM to 9:05 PM, looking after a guest who felt unwell and calling her a taxi."
      },
      {
        type: "Record",
        title: "The taxi company",
        text: "City Cabs confirms that it picked up Julian Marsh outside the museum at 8:20 PM and dropped him at his flat across town at 8:50 PM. His neighbour saw him arrive home."
      },
      {
        type: "Witness",
        title: "Guests at the gala",
        text: "Several guests remember Dr. Voss leaving the main hall at about 8:35 PM, just after her speech, and coming back shortly before 9:00 PM, slightly out of breath."
      },
      {
        type: "Physical evidence",
        title: "The office recycling bin",
        text: "In the recycling bin of the curator's private office, police found a receipt for fast-drying oil paints, bought six days before the gala, in exactly the colours used in 'The Silver Lighthouse'."
      }
    ],
    suspects: [
      {
        id: "julian",
        name: "Julian Marsh",
        role: "Guest artist, 38",
        emoji: "🎨",
        description: "A painter famous for making near-perfect copies of classic paintings. He was invited to the gala as a special guest.",
        motive: "He has said in interviews that 'The Silver Lighthouse' was painted by his great-great-grandfather and should belong to his family.",
        alibi: "Says he felt unwell and left the gala early by taxi."
      },
      {
        id: "sam",
        name: "Sam Okafor",
        role: "Night security guard, 29",
        emoji: "🔦",
        description: "Has guarded the museum at night for two years and knows every room and corridor.",
        motive: "He has large debts and was recently warned by his manager about arriving late.",
        alibi: "Says he was busy at the coat-check desk in the lobby for most of the evening."
      },
      {
        id: "helena",
        name: "Dr. Helena Voss",
        role: "Museum curator, 52",
        emoji: "🖼️",
        description: "Runs the museum's collection. Before becoming curator she trained as a painting restorer, so she knows exactly how old paintings are made.",
        motive: "A private collector once offered her a fortune for 'The Silver Lighthouse', but the museum board refused to sell it.",
        alibi: "Says she stayed in the main hall all evening after her speech, and her key card never left her handbag."
      }
    ],
    culpritId: "helena",
    solution: [
      "The cameras were switched off with an admin key card. The head of security was abroad, so the only admin card in the building was Dr. Voss's. (Clue 1)",
      "Sam was on the lobby camera at the coat-check desk from 8:30 to 9:05 PM, so he could not have been in the east gallery while the cameras were off. (Clue 2)",
      "Julian looks suspicious because he copies paintings and claims the painting belongs to his family, but the taxi company and his neighbour prove he was across town from 8:20 PM. (Clue 3)",
      "Dr. Voss was missing from the main hall from about 8:35 PM to nearly 9:00 PM, exactly when the cameras were off. This breaks her alibi. (Clue 4)",
      "The paint receipt in her office matches the fresh paint on the forgery, and her training as a restorer explains how she could paint such a convincing copy. (Clue 5)",
      "Conclusion: Dr. Helena Voss painted the forgery herself, switched off the cameras with her own admin card, and swapped the paintings during the gala so she could sell the original to the private collector."
    ]
  }
];

const MAX_POINTS = 100;   // reward for a correct accusation with no clues
const CLUE_PENALTY = 10;  // points lost for each clue revealed


/* ---------------------------------------------------------
   2. GAME STATE
   caseProgress keeps track of every case, for example:
   caseProgress.bakery = { cluesRevealed: 2, status: "open", points: 0, accusedId: null }
   status can be "open", "solved" or "failed".
   --------------------------------------------------------- */
let caseProgress = {};
let currentCase = null;        // the case object being investigated
let selectedSuspectId = null;  // the suspect the player has clicked

function createFreshProgress() {
  return { cluesRevealed: 0, status: "open", points: 0, accusedId: null };
}

function resetProgressForAllCases() {
  caseProgress = {};
  cases.forEach(function (caseFile) {
    caseProgress[caseFile.id] = createFreshProgress();
  });
}

function getTotalScore() {
  let total = 0;
  cases.forEach(function (caseFile) {
    total += caseProgress[caseFile.id].points;
  });
  return total;
}

function countCases(status) {
  return cases.filter(function (caseFile) {
    return caseProgress[caseFile.id].status === status;
  }).length;
}

function getRank() {
  const solved = countCases("solved");
  if (solved === cases.length) {
    return "Chief Inspector";
  } else if (solved >= 1) {
    return "Detective Sergeant";
  }
  return "Rookie";
}


/* ---------------------------------------------------------
   3. SCREENS AND THE CASE LIST
   --------------------------------------------------------- */
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
  window.scrollTo(0, 0);
}

// Update every place that shows the score or case counts
function updateScoreDisplays() {
  const closed = countCases("solved") + countCases("failed");
  const closedText = closed + " / " + cases.length;

  document.getElementById("header-score").textContent = getTotalScore();
  document.getElementById("header-closed").textContent = closedText;
  document.getElementById("profile-score").textContent = getTotalScore();
  document.getElementById("profile-closed").textContent = closedText;
  document.getElementById("profile-solved").textContent = countCases("solved");
  document.getElementById("profile-failed").textContent = countCases("failed");
  document.getElementById("detective-rank").textContent = getRank();
}

// Build one manila folder for each case
function renderCaseList() {
  const folderArea = document.getElementById("case-folders");
  folderArea.innerHTML = "";

  cases.forEach(function (caseFile) {
    const progress = caseProgress[caseFile.id];

    const folder = document.createElement("button");
    folder.className = "folder";
    folder.dataset.tab = "CASE #" + caseFile.number;

    const stamp = document.createElement("span");
    stamp.className = "stamp stamp-" + progress.status;
    stamp.textContent = progress.status.toUpperCase();
    folder.appendChild(stamp);

    const difficulty = document.createElement("p");
    difficulty.className = "typewriter text-sm text-red-900";
    difficulty.textContent = "Difficulty: " + caseFile.difficulty;
    folder.appendChild(difficulty);

    const title = document.createElement("h2");
    title.className = "typewriter mt-2 pr-24 text-2xl";
    title.textContent = caseFile.title;
    folder.appendChild(title);

    const location = document.createElement("p");
    location.className = "mt-1 text-sm text-stone-700";
    location.textContent = "📍 " + caseFile.location;
    folder.appendChild(location);

    const intro = document.createElement("p");
    intro.className = "mt-4 leading-relaxed";
    intro.textContent = caseFile.intro;
    folder.appendChild(intro);

    const footer = document.createElement("p");
    footer.className = "typewriter mt-5 border-t border-dashed border-stone-600 pt-3 text-sm";
    if (progress.status === "open") {
      footer.textContent = "▶ Open the file · " + caseFile.clues.length + " clues · " + caseFile.suspects.length + " suspects";
    } else {
      footer.textContent = "Closed · You earned " + progress.points + " points · Click to review";
    }
    folder.appendChild(footer);

    folder.addEventListener("click", function () {
      openCase(caseFile.id);
    });

    folderArea.appendChild(folder);
  });

  updateScoreDisplays();
}

function goToCaseList() {
  renderCaseList();
  showScreen("case-list-screen");
}


/* ---------------------------------------------------------
   4. INVESTIGATION: BRIEF, CLUES, SUSPECTS
   --------------------------------------------------------- */
function findCase(caseId) {
  return cases.find(function (caseFile) {
    return caseFile.id === caseId;
  });
}

function findSuspect(caseFile, suspectId) {
  return caseFile.suspects.find(function (suspect) {
    return suspect.id === suspectId;
  });
}

// Open a case and draw the whole investigation screen
function openCase(caseId) {
  currentCase = findCase(caseId);
  const progress = caseProgress[caseId];
  selectedSuspectId = progress.accusedId; // null if the case is still open

  document.getElementById("case-title").textContent = "Case #" + currentCase.number + ": " + currentCase.title;
  document.getElementById("case-location").textContent = "📍 " + currentCase.location + " · Difficulty: " + currentCase.difficulty;
  document.getElementById("case-intro").textContent = currentCase.intro;
  document.getElementById("case-description").textContent = currentCase.description;
  document.getElementById("case-objective").textContent = currentCase.objective;

  renderClues(false);
  renderSuspects();
  updateCaseStatus();

  if (progress.status === "open") {
    document.getElementById("verdict").classList.add("hidden");
  } else {
    showVerdict(); // reviewing a case that is already closed
  }

  showScreen("investigation-screen");
}

// Draw the clue cards: revealed ones show their text, the rest stay sealed
function renderClues(animateNewest) {
  const progress = caseProgress[currentCase.id];
  const board = document.getElementById("clue-board");
  board.innerHTML = "";

  // When the case is closed, every clue is shown
  const visibleCount = progress.status === "open" ? progress.cluesRevealed : currentCase.clues.length;

  currentCase.clues.forEach(function (clue, index) {
    const card = document.createElement("div");

    if (index < visibleCount) {
      card.className = "clue-card";
      if (animateNewest && index === visibleCount - 1) {
        card.classList.add("just-revealed");
      }
      card.innerHTML =
        '<p class="clue-type"></p>' +
        '<h4 class="typewriter mt-1 text-lg"></h4>' +
        '<p class="clue-text mt-2 text-sm leading-relaxed"></p>';
      card.querySelector(".clue-type").textContent = "Clue " + (index + 1) + " · " + clue.type;
      card.querySelector("h4").textContent = clue.title;
      card.querySelector(".clue-text").textContent = clue.text;
    } else {
      card.className = "clue-card sealed";
      card.innerHTML =
        '<p class="text-3xl" aria-hidden="true">🔒</p>' +
        '<p class="typewriter mt-2"></p>' +
        '<p class="text-xs">Sealed evidence</p>';
      card.querySelector(".typewriter").textContent = "EVIDENCE #" + (index + 1);
    }

    board.appendChild(card);
  });

  // Counter and reveal button
  document.getElementById("clue-counter").textContent =
    visibleCount + " / " + currentCase.clues.length + " clues revealed";

  const revealButton = document.getElementById("reveal-clue-button");
  const revealNote = document.getElementById("reveal-note");
  const allRevealed = progress.cluesRevealed >= currentCase.clues.length;

  revealButton.disabled = progress.status !== "open" || allRevealed;

  if (progress.status !== "open") {
    revealNote.textContent = "Case closed. All evidence is now unsealed.";
  } else if (allRevealed) {
    revealNote.textContent = "All clues revealed. A correct answer is now worth " + getPotentialPoints() + " points.";
  } else {
    revealNote.textContent = "A correct answer is now worth " + getPotentialPoints() + " points. Each new clue costs 10.";
  }
}

function getPotentialPoints() {
  return MAX_POINTS - CLUE_PENALTY * caseProgress[currentCase.id].cluesRevealed;
}

// Reveal clues one at a time, in order
function revealNextClue() {
  const progress = caseProgress[currentCase.id];
  if (progress.status !== "open" || progress.cluesRevealed >= currentCase.clues.length) {
    return;
  }
  progress.cluesRevealed++;
  renderClues(true);
}

// Draw the three suspect polaroids
function renderSuspects() {
  const progress = caseProgress[currentCase.id];
  const list = document.getElementById("suspect-list");
  list.innerHTML = "";

  currentCase.suspects.forEach(function (suspect) {
    const card = document.createElement("button");
    card.className = "suspect-card";
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", suspect.id === selectedSuspectId);
    card.disabled = progress.status !== "open";
    if (suspect.id === selectedSuspectId) {
      card.classList.add("selected");
    }

    card.innerHTML =
      '<div class="suspect-photo" aria-hidden="true"></div>' +
      '<h4 class="typewriter mt-3 text-xl"></h4>' +
      '<p class="suspect-role text-sm text-stone-600"></p>' +
      '<p class="suspect-description mt-2 text-sm leading-relaxed"></p>' +
      '<p class="suspect-label mt-3">Possible motive</p>' +
      '<p class="suspect-motive text-sm"></p>' +
      '<p class="suspect-label mt-2">Alibi (their story)</p>' +
      '<p class="suspect-alibi text-sm"></p>';
    card.querySelector(".suspect-photo").textContent = suspect.emoji;
    card.querySelector("h4").textContent = suspect.name;
    card.querySelector(".suspect-role").textContent = suspect.role;
    card.querySelector(".suspect-description").textContent = suspect.description;
    card.querySelector(".suspect-motive").textContent = suspect.motive;
    card.querySelector(".suspect-alibi").textContent = suspect.alibi;

    // After the case is closed, stamp each suspect GUILTY or CLEARED
    if (progress.status !== "open") {
      const stamp = document.createElement("span");
      const isGuilty = suspect.id === currentCase.culpritId;
      stamp.className = "suspect-stamp " + (isGuilty ? "stamp-guilty" : "stamp-cleared");
      stamp.textContent = isGuilty ? "GUILTY" : "CLEARED";
      card.appendChild(stamp);
    }

    card.addEventListener("click", function () {
      selectSuspect(suspect.id);
    });

    list.appendChild(card);
  });

  updateAccuseBar();
}

function selectSuspect(suspectId) {
  if (caseProgress[currentCase.id].status !== "open") {
    return;
  }
  selectedSuspectId = suspectId;
  renderSuspects();
}

function updateAccuseBar() {
  const progress = caseProgress[currentCase.id];
  const nameElement = document.getElementById("selected-suspect-name");
  const submitButton = document.getElementById("submit-answer-button");

  if (selectedSuspectId === null) {
    nameElement.textContent = "nobody selected";
  } else {
    nameElement.textContent = findSuspect(currentCase, selectedSuspectId).name;
  }

  submitButton.disabled = selectedSuspectId === null || progress.status !== "open";
  submitButton.textContent = progress.status === "open" ? "⚖️ Submit accusation" : "Case closed";
}

function updateCaseStatus() {
  const status = caseProgress[currentCase.id].status;
  const chip = document.getElementById("case-status");
  chip.className = "status-chip status-" + status;
  chip.textContent = status.toUpperCase();
}


/* ---------------------------------------------------------
   5. MAKING AN ACCUSATION AND SHOWING THE SOLUTION
   --------------------------------------------------------- */
function submitAccusation() {
  const progress = caseProgress[currentCase.id];
  if (selectedSuspectId === null || progress.status !== "open") {
    return;
  }

  progress.accusedId = selectedSuspectId;

  if (selectedSuspectId === currentCase.culpritId) {
    progress.status = "solved";
    progress.points = getPotentialPoints();
  } else {
    progress.status = "failed";
    progress.points = 0;
  }

  // Redraw everything in its "closed" state
  renderClues(false);
  renderSuspects();
  updateCaseStatus();
  updateScoreDisplays();
  showVerdict();

  document.getElementById("verdict").scrollIntoView({ behavior: "smooth" });
}

// Verdict box: correct or wrong, plus the full solution
function showVerdict() {
  const progress = caseProgress[currentCase.id];
  const culprit = findSuspect(currentCase, currentCase.culpritId);
  const accused = findSuspect(currentCase, progress.accusedId);

  const stamp = document.getElementById("verdict-stamp");
  const message = document.getElementById("verdict-message");

  if (progress.status === "solved") {
    stamp.textContent = "CASE SOLVED";
    stamp.className = "verdict-stamp verdict-correct";
    message.textContent = "Well done, detective! " + culprit.name + " is guilty. You used " +
      progress.cluesRevealed + " of " + currentCase.clues.length + " clues and earned " + progress.points + " points.";
  } else {
    stamp.textContent = "WRONG SUSPECT";
    stamp.className = "verdict-stamp verdict-wrong";
    message.textContent = "Not this time. You accused " + accused.name + ", but the guilty person is " +
      culprit.name + ". Read the solution below to see how the clues point to them.";
  }

  // Solution steps
  const list = document.getElementById("solution-steps");
  list.innerHTML = "";
  currentCase.solution.forEach(function (step) {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });

  // "Next case" goes to the case after this one (wrapping round to the first)
  const nextButton = document.getElementById("next-case-button");
  nextButton.classList.toggle("hidden", cases.length < 2);

  document.getElementById("verdict").classList.remove("hidden");
}


/* ---------------------------------------------------------
   6. REPLAY, RESET AND NEXT CASE
   --------------------------------------------------------- */

// Play the current case again from the start (its points are removed)
function replayCase() {
  caseProgress[currentCase.id] = createFreshProgress();
  updateScoreDisplays();
  openCase(currentCase.id);
}

function goToNextCase() {
  const currentIndex = cases.indexOf(currentCase);
  const nextIndex = (currentIndex + 1) % cases.length;
  openCase(cases[nextIndex].id);
}

function resetAllProgress() {
  if (confirm("Reset all cases and your score?")) {
    resetProgressForAllCases();
    renderCaseList();
  }
}


/* ---------------------------------------------------------
   7. EVENT LISTENERS AND START-UP
   --------------------------------------------------------- */
document.getElementById("reveal-clue-button").addEventListener("click", revealNextClue);
document.getElementById("submit-answer-button").addEventListener("click", submitAccusation);
document.getElementById("replay-button").addEventListener("click", replayCase);
document.getElementById("next-case-button").addEventListener("click", goToNextCase);
document.getElementById("reset-all").addEventListener("click", resetAllProgress);
document.getElementById("logo-button").addEventListener("click", goToCaseList);

document.querySelectorAll(".back-button").forEach(function (button) {
  button.addEventListener("click", goToCaseList);
});

resetProgressForAllCases();
renderCaseList();
