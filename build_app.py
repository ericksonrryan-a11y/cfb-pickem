#!/usr/bin/env python3
"""Assemble site/app.js from the shared logic chunks plus the new data layer.

The render, grading and helper chunks are carried over verbatim from the
artifact build so their behaviour is already tested; only the persistence
layer is new.
"""
import io
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CHUNKS = "/tmp/claude-0"
PARTS = os.path.join(HERE, "parts")

ORDER = [
    (PARTS,   "10_head.js"),
    (CHUNKS,  "p_teams.js"),
    (CHUNKS,  "p_cats.js"),
    (CHUNKS,  "p_helpers.js"),
    (CHUNKS,  "p_statehlp.js"),
    (CHUNKS,  "p_grading.js"),
    (CHUNKS,  "p_seasonfn.js"),
    (PARTS,   "40_player.js"),
    (PARTS,   "50_data.js"),
    (CHUNKS,  "p_render.js"),
    (CHUNKS,  "p_events.js"),
    (PARTS,   "90_init.js"),
]

pieces = []
for d, name in ORDER:
    path = os.path.join(d, name)
    if not os.path.exists(path):
        sys.exit("missing chunk: " + path)
    pieces.append(io.open(path, encoding="utf-8").read())

app = "\n".join(pieces)

out = os.path.join(HERE, "app.js")
io.open(out, "w", encoding="utf-8").write(app)

# The whole file is wrapped in one IIFE, so these must balance.
assert app.count("(function(){") >= 1, "IIFE opener missing"
assert app.rstrip().endswith("})();"), "IIFE not closed"

subprocess.check_call(["node", "--check", out])
print("built app.js  %d bytes  (%d chunks)" % (len(app), len(ORDER)))
