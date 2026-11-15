"""Zachte sfeerlagen voor de "What if"-video's (zee, wind, rivier, vuur, menigte), met numpy.

Schrijft naar public/watals-sfx/ (public/ en *.wav staan niet in git, dus na een verse clone:
`python scripts/watals-sfx.py`). De accenten (whoosh, tik, munt, inslag, glans, val, afsluiter)
komen uit de geluidsbank van earshot (mcp__earshot__sfx_render); de ids en instellingen staan in
.claude/skills/what-if-video/SKILL.md.
"""
import os
import wave

import numpy as np

SR = 48000
UIT = os.path.join(os.path.dirname(__file__), '..', 'public', 'watals-sfx')
os.makedirs(UIT, exist_ok=True)
rng = np.random.default_rng(7)


def lp(x, a):
    """Eenpolig laagdoorlaatfilter."""
    y = np.empty_like(x)
    s = 0.0
    for i in range(len(x)):
        s += a * (x[i] - s)
        y[i] = s
    return y


def bewaar(naam, x):
    x = x / np.max(np.abs(x)) * 0.5
    f = int(SR * 0.3)
    x[:f] *= np.linspace(0, 1, f)
    x[-f:] *= np.linspace(1, 0, f)
    w = wave.open(os.path.join(UIT, naam), 'wb')
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((x * 32767).astype(np.int16).tobytes())
    w.close()


N = SR * 5
t = np.arange(N) / SR
wn = rng.standard_normal(N)

zee = lp(wn, 0.03) * (0.55 + 0.45 * np.sin(2 * np.pi * 0.22 * t) ** 2) + lp(wn, 0.25) * 0.15 * (np.sin(2 * np.pi * 0.22 * t + 1) ** 8)
bewaar('zee.wav', zee)

band = lp(wn, 0.08) - lp(wn, 0.01)
bewaar('wind.wav', band * (0.4 + 0.6 * np.abs(np.sin(2 * np.pi * 0.15 * t + 0.3 * np.sin(2 * np.pi * 0.4 * t)))))

r = lp(wn, 0.35) - lp(wn, 0.05)
g = np.abs(lp(rng.standard_normal(N), 0.002))
bewaar('rivier.wav', r * (0.5 + g / g.max()))

v = lp(wn, 0.05) * 0.4
for p in rng.integers(0, N - 400, 90):
    L = rng.integers(40, 300)
    v[p:p + L] += rng.standard_normal(L) * np.exp(-np.arange(L) / 40) * rng.uniform(0.5, 2)
bewaar('vuur.wav', v)

m = np.zeros(N)
for k in range(14):
    m += lp(rng.standard_normal(N), 0.06) * (0.5 + 0.5 * np.sin(2 * np.pi * rng.uniform(1.5, 4) * t + k))
bewaar('menigte.wav', m - lp(m, 0.004))
print('ok:', UIT)
