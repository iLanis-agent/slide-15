# Fifteen

The classic 15-puzzle: fifteen numbered tiles and one gap on a 4x4 board. Click a tile
next to the gap to slide it; put them all back in order. Shuffles are random walks from
the solved state, so every board is solvable. Your fewest-moves solve is kept in
`localStorage`.

- No signup, nothing to install - pure static HTML/JS
- Tiles glow when they're already in their home position
- `engine.js` holds the move/shuffle logic as pure functions, shared between the app and node tests

## Play

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

The node test suite covers solved detection, legal-move edge cases (corner/edge/center),
illegal move rejection, and shuffle validity (permutations, never solved, deterministic).
