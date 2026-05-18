Run 8 checks on the code
Run 8 checks on the code
Found the issue — setShopTab and setCharCat are called via onclick="" in HTML but defined inside boot()'s closure, so they're invisible to window. I'll expose them. Building now:


TAG — PURSUIT v2 full Three.js game as standalone HTML artifact with scoping fix
TAG — PURSUIT v2 full Three.js game as standalone HTML artifact with scoping fix

TAG — PURSUIT v2 full Three.js game as standalone HTML artifact with scoping fix
html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TAG — PURSUIT v2</title>
</head>
<body>
<script>
(function() {
'use strict';

// ─── Inject Google Fonts ───────────────────────────────────────────
const _gf = document.createElement('link');
_gf.rel = 'stylesheet';
_gf.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap';
document.head.appendChild(_gf);

// ─── Inject CSS ───────────────────────────────────────────────────
const _style = document.createElement('style');
_style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-user-select:none;user-select:none}
html,body{width:100%;height:100%;overflow:hidden;background:#000}
#c{display:block;position:fixed;inset:0;width:100%;height:100%;cursor:crosshair}
#ui{position:fixed;inset:0;z-index:10;font-family:'Share Tech Mono','Courier New',monospace}
.scr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:all}
.scr.hide{display:none!important}
#s-menu{background:radial-gradient(ellipse at 50% 40%,#1a0028 0%,#000000 65%)}
.ttl{font-family:'Bebas Neue',sans-serif;font-size:min(14vw,9rem);color:#fff;letter-spacing:.15em;line-height:1;text-shadow:0 0 20px #ff003c,0 0 55px #ff003c,0 0 100px #ff003caa;animation:tp 2s ease-in-out infinite}
@keyframes tp{0%,100%{text-shadow:0 0 20px #ff003c,0 0 55px #ff003c,0 0 100px #ff003caa}50%{text-shadow:0 0 40px #ff003c,0 0 90px #ff003c,0 0 150px #ff003c}}
.sub{font-size:.9rem;color:#ff3060;letter-spacing:.6em;margin-top:-.7rem;margin-bottom:1.5rem}
.menubtns{display:flex;flex-direction:column;align-items:center;gap:.3rem}
.menubtnrow{display:flex;gap:.5rem}
.btn{background:none;border:1.5px solid currentColor;color:#fff;font-family:'Share Tech Mono','Courier New',monospace;font-size:.95rem;letter-spacing:.2em;padding:.65rem 2.2rem;cursor:pointer;transition:all .15s;margin:.18rem;text-transform:uppercase}
.btn:hover{background:rgba(255,255,255,.09);transform:scale(1.03)}
.btn.sm{font-size:.78rem;padding:.45rem 1.3rem}
.bp{color:#ff3060;border-color:#ff3060}.bp:hover{background:rgba(255,48,96,.14);box-shadow:0 0 14px #ff306040}
.bs{color:#30ccff;border-color:#30ccff}.bs:hover{background:rgba(48,204,255,.1)}
.bg{color:#40ff88;border-color:#40ff88}.bg:hover{background:rgba(64,255,136,.1)}
.by{color:#ffd700;border-color:#ffd700}.by:hover{background:rgba(255,215,0,.1)}
.bv{color:#cc88ff;border-color:#cc88ff}.bv:hover{background:rgba(200,136,255,.1)}
.hint{margin-top:.8rem;color:#3a3a3a;font-size:.65rem;text-align:center;line-height:2;max-width:620px}

/* MODE SELECT */
#s-mode{background:radial-gradient(ellipse at 50% 40%,#0a001a 0%,#000000 70%);gap:1.4rem;overflow-y:auto;padding:1.5rem}
.modet{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:#fff;letter-spacing:.3em;flex-shrink:0}
.modecards{display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;max-width:960px}
.modecard{width:200px;min-height:200px;border:1.5px solid #334;cursor:pointer;padding:1.4rem 1rem;display:flex;flex-direction:column;align-items:center;gap:.6rem;transition:all .2s;text-align:center;position:relative;overflow:hidden;background:rgba(255,255,255,.02)}
.modecard:hover{transform:translateY(-5px)}
.modecard.casual{border-color:#30ccff}.modecard.casual:hover{background:rgba(48,204,255,.06);box-shadow:0 8px 28px rgba(48,204,255,.28)}
.modecard.ranked{border-color:#ffd700}.modecard.ranked:hover{background:rgba(255,215,0,.06);box-shadow:0 8px 28px rgba(255,215,0,.28)}
.modecard.multi{border-color:#40ff88}.modecard.multi:hover{background:rgba(64,255,136,.06);box-shadow:0 8px 28px rgba(64,255,136,.28)}
.modecard.prac{border-color:#cc88ff}.modecard.prac:hover{background:rgba(200,136,255,.06);box-shadow:0 8px 28px rgba(200,136,255,.28)}
.modeicon{font-size:2.6rem;line-height:1}
.modename{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:.1em;color:#fff}
.modedesc{font-size:.68rem;color:#777;line-height:1.6}
.modebadge{position:absolute;top:8px;right:8px;font-size:.58rem;padding:2px 7px;letter-spacing:.1em}
.modebadge.new{background:rgba(255,48,96,.18);color:#ff3060;border:1px solid #ff3060}
.modebadge.hot{background:rgba(255,215,0,.18);color:#ffd700;border:1px solid #ffd700}

/* MAP SELECT */
#s-map{background:radial-gradient(ellipse at 50% 30%,#000d1a 0%,#000000 70%);gap:.6rem;overflow-y:auto;justify-content:flex-start;padding-top:1.2rem;padding-bottom:1.2rem}
.mst{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:#30ccff;letter-spacing:.3em;flex-shrink:0}
.mapwrap{display:flex;gap:1.4rem;align-items:flex-start;justify-content:center;width:100%;max-width:1100px;flex-wrap:nowrap}
.mcards{display:flex;gap:.7rem;flex-wrap:wrap;justify-content:flex-start;max-width:640px}
.mc{width:150px;height:210px;border:1.5px solid #224;cursor:pointer;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:.65rem;transition:all .22s;flex-shrink:0}
.mc:hover{border-color:#30ccff;transform:translateY(-4px);box-shadow:0 8px 22px rgba(48,204,255,.22)}
.mc.sel{border-color:#ff3060;box-shadow:0 0 18px rgba(255,48,96,.38)}
.mcbg{position:absolute;inset:0;opacity:.45}
.mcn{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:#fff;letter-spacing:.04em;z-index:1;text-align:center}
.mct{font-size:.58rem;color:#aaa;letter-spacing:.18em;z-index:1;margin-bottom:.15rem}
.mcd{display:flex;gap:3px;z-index:1;margin-top:.18rem}
.dd{width:6px;height:6px;border-radius:50%;background:#223}.dd.on{background:#ff3060}
/* MAP PREVIEW PANEL */
.mprev{width:300px;min-width:300px;border:1px solid #334;background:rgba(5,5,20,.92);padding:1rem;flex-shrink:0;display:none;position:sticky;top:0}
.mprev.show{display:block}
.mprevtitle{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:#30ccff;letter-spacing:.1em;margin-bottom:.5rem}
#mprevcanvas{width:100%;height:168px;border:1px solid #223;display:block;background:#000}
.mprevrow{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.68rem}
.mprevlbl{color:#555;letter-spacing:.15em}
.mprevval{color:#fff}
.mprevdesc{color:#888;font-size:.64rem;margin-top:.55rem;line-height:1.75}

/* MULTIPLAYER LOBBY */
#s-lobby{background:radial-gradient(ellipse at 50% 40%,#001a0a 0%,#000000 70%);gap:1rem}
.lobbyt{font-family:'Bebas Neue',sans-serif;font-size:2.4rem;color:#40ff88;letter-spacing:.25em}
.lobbycode{font-size:1.2rem;color:#ffd700;letter-spacing:.5em;margin:.3rem 0}
.playerslots{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center;margin:.5rem 0}
.pslot{width:130px;height:80px;border:1.5px solid #223;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;position:relative}
.pslot.filled{border-color:#40ff88}.pslot.you{border-color:#ffd700}
.pslot.empty{border-color:#222;opacity:.5}
.pslotname{font-size:.85rem;color:#fff}.pslotping{font-size:.6rem;color:#555}
.pslotyou{font-size:.6rem;color:#ffd700}
.lobbyinfo{font-size:.72rem;color:#555;text-align:center;line-height:2}
.sharelink{background:rgba(64,255,136,.07);border:1px solid #40ff88;color:#40ff88;font-family:'Share Tech Mono',monospace;padding:.3rem .7rem;font-size:.72rem;letter-spacing:.1em;margin:.3rem 0;cursor:pointer;transition:all .15s}
.sharelink:hover{background:rgba(64,255,136,.14)}

/* RANKED UI */
.rankedbadge{display:inline-block;background:rgba(255,215,0,.12);border:1px solid #ffd700;color:#ffd700;font-size:.65rem;padding:2px 10px;letter-spacing:.2em;margin-bottom:.5rem}
.rankdisplay{display:flex;align-items:center;gap:.8rem;margin:.4rem 0}
.rankicon{font-size:2.2rem}.rankname{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:.1em}
.rankpts{font-size:.75rem;color:#888}
.rptbar{width:220px;height:6px;background:#111;margin-top:4px;position:relative}
.rptfill{height:100%;background:#ffd700;transition:width .4s}

/* HUD */
#s-hud{pointer-events:none;background:none;display:none;position:absolute;inset:0}
#htimer{position:absolute;top:16px;left:50%;transform:translateX(-50%);font-family:'Bebas Neue',sans-serif;font-size:3.4rem;color:#fff;text-shadow:0 0 14px rgba(255,255,255,.4);letter-spacing:.1em}
#htimer.urg{color:#ff3040;animation:tu .48s ease-in-out infinite}
@keyframes tu{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.06)}}
#hmodelbl{position:absolute;top:16px;left:50%;transform:translateX(-50%) translateY(3.8rem);font-size:.65rem;color:#555;letter-spacing:.3em}
#itind{position:absolute;top:72px;left:50%;transform:translateX(-50%);font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#ff2040;letter-spacing:.5em;display:none;animation:blk .7s ease-in-out infinite}
@keyframes blk{0%,100%{opacity:1}50%{opacity:.38}}
#xhair{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20px;height:20px}
#xhair::before,#xhair::after{content:'';position:absolute;background:rgba(255,255,255,.75);border-radius:1px}
#xhair::before{width:2px;height:100%;left:50%;transform:translateX(-50%)}
#xhair::after{width:100%;height:2px;top:50%;transform:translateY(-50%)}
#vig{position:absolute;inset:0;pointer-events:none}
#spdo{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .18s;background:radial-gradient(ellipse at center,transparent 30%,rgba(255,255,255,.07) 100%)}
#stat{position:absolute;bottom:90px;left:50%;transform:translateX(-50%);font-size:1.35rem;color:#ff3060;font-family:'Bebas Neue',sans-serif;letter-spacing:.3em;opacity:0;transition:opacity .2s;text-shadow:0 0 8px #ff3060;pointer-events:none}
#hmm{position:absolute;top:16px;left:16px;width:108px;height:108px;border:1px solid rgba(255,255,255,.18);background:rgba(0,0,0,.52)}
#hright{position:absolute;top:16px;right:16px;text-align:right;pointer-events:none}
.hlbl{font-size:.65rem;color:#555;letter-spacing:.2em}.hval{font-size:1.05rem;margin-top:1px}
#hcv{color:#ffd700}#hmpv{color:#80c8ff}#hrankv{color:#ffd700;font-size:.75rem}
#hskills{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:.7rem;align-items:flex-end}
.ss{width:66px;height:66px;border:1.5px solid rgba(255,255,255,.32);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;background:rgba(0,0,0,.48)}
.ssl{font-size:.62rem;color:rgba(255,255,255,.5);position:absolute;top:3px;left:5px}
.ssn{font-size:.58rem;color:#ddd;text-align:center;padding:0 4px;line-height:1.1}
.sso{position:absolute;bottom:0;left:0;width:100%;background:rgba(0,0,0,.68);transition:height .08s}
.sst{position:absolute;font-size:1.05rem;font-family:'Bebas Neue',sans-serif;color:#30ccff}
#ssbind{font-size:.55rem;color:rgba(255,255,255,.35);position:absolute;bottom:3px;right:4px}
#chatw{position:absolute;bottom:90px;left:16px;pointer-events:none}
.cmsg{font-size:.72rem;color:#bbb;margin-bottom:2px;text-shadow:0 1px 3px #000}
#chatwrap{position:absolute;bottom:52px;left:16px;display:none;pointer-events:all}
#chatin{background:rgba(0,0,0,.88);border:1px solid #30ccff;color:#fff;font-family:'Share Tech Mono',monospace;padding:.28rem .48rem;width:230px;font-size:.78rem;outline:none}
.blbl{position:absolute;transform:translate(-50%,-100%);pointer-events:none;font-size:.72rem;color:#fff;text-shadow:0 0 4px #000,0 0 8px #000;font-family:'Share Tech Mono',monospace;white-space:nowrap;display:none}
#tagprompt{position:absolute;bottom:130px;left:50%;transform:translateX(-50%);font-size:.9rem;color:#ffcc00;letter-spacing:.2em;opacity:0;transition:opacity .2s;pointer-events:none;font-family:'Bebas Neue',sans-serif}
#lockoverlay{position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:2.2rem;letter-spacing:.3em;color:#fff;cursor:pointer;pointer-events:all;gap:.5rem}
#lockoverlay .losub{font-size:.75rem;color:#555;letter-spacing:.2em}
#tagcd{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) translateY(18px);width:40px;height:3px;background:#222;display:none}
#tagcdfill{height:100%;background:#ff3060;transition:width .05s linear}

/* RESULT */
#s-result{background:radial-gradient(ellipse at 50% 40%,#12040a 0%,#000000 72%);gap:1rem}
.rt{font-family:'Bebas Neue',sans-serif;font-size:5rem;letter-spacing:.15em}
.rt.win{color:#ffd700;text-shadow:0 0 28px #ffd70070}
.rt.lose{color:#ff2040;text-shadow:0 0 28px #ff204070}
.rplays{display:flex;flex-direction:column;gap:.38rem;width:380px}
.rp{display:flex;align-items:center;justify-content:space-between;padding:.42rem .85rem;border-left:2.5px solid transparent}
.rp.you{border-color:#ffd700;background:rgba(255,215,0,.07)}
.pn{font-size:.95rem;color:#fff}.rc{font-size:.8rem}
.rup{color:#40ff80}.rdn{color:#ff4040}.req{color:#555}
.rankchange{font-size:.72rem;margin-top:.5rem;text-align:center}
.rankgain{color:#ffd700}.rankloss{color:#ff4040}

/* SHOP */
#s-shop{background:radial-gradient(ellipse at 50% 40%,#011001 0%,#000000 72%);gap:.75rem;overflow-y:auto;padding:1.2rem}
.shopt{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:#40ff80;letter-spacing:.3em}
.shopc{color:#ffd700;font-size:1rem}
.sgrid{display:grid;grid-template-columns:repeat(4,168px);gap:.65rem;margin:.45rem 0;max-height:40vh;overflow-y:auto;padding-right:.4rem}
.cgrid{display:grid;grid-template-columns:repeat(4,165px);gap:.6rem;max-height:44vh;overflow-y:auto}
.ci{border:1.5px solid #224;padding:.65rem;cursor:pointer;transition:all .15s;position:relative}
.ci:hover{border-color:#40ff88;background:rgba(64,255,128,.05)}
.ci.owned{border-color:#ffd700}.ci.equipped{background:rgba(64,255,128,.1);border-color:#40ff88}
.cin{color:#fff;font-size:.8rem;margin-bottom:.15rem}.cid{color:#555;font-size:.62rem;margin-bottom:.3rem}
.cic{color:#ffd700;font-size:.72rem}.cicol{width:18px;height:18px;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:4px;border:1px solid #444}
.ctabs{display:flex;gap:.4rem;margin-bottom:.5rem}
.ctab{font-size:.68rem;padding:3px 10px;cursor:pointer;border:1px solid #334;color:#777;background:none;font-family:inherit;letter-spacing:.1em}
.ctab.active{border-color:#40ff88;color:#40ff88}
#char-preview{width:100%;height:40px;display:flex;align-items:center;gap:.8rem;margin-bottom:.6rem;font-size:.75rem;color:#aaa}
.si{border:1.5px solid #224;padding:.78rem;cursor:pointer;transition:all .16s;position:relative}
.si:hover{border-color:#40ff80;background:rgba(64,255,128,.04)}
.si.owned{border-color:#ffd700}.si.eqd{background:rgba(64,255,128,.07)}
.sin{color:#fff;font-size:.85rem;margin-bottom:.18rem}.sid{color:#666;font-size:.66rem;margin-bottom:.35rem}
.sic{color:#ffd700;font-size:.75rem}.sisl{font-size:.62rem;color:#30ccff;float:right}
.eqrow{display:flex;gap:1.3rem;font-size:.8rem;color:#999}
.eqrow span{color:#40ff80}
.kbsect{margin-top:.6rem;font-size:.72rem}
.kbrow{display:flex;align-items:center;gap:.6rem;margin:.25rem 0}
.kblbl{color:#555;width:80px;letter-spacing:.1em}
.kbkey{background:#111;border:1px solid #333;color:#fff;font-family:'Share Tech Mono',monospace;font-size:.72rem;padding:3px 10px;cursor:pointer;min-width:60px;text-align:center;transition:all .15s}
.kbkey:hover{border-color:#30ccff}.kbkey.listening{border-color:#ff3060;color:#ff3060;animation:blk .6s infinite}

/* UPGRADE */
#s-upg{background:radial-gradient(ellipse at 50% 40%,#0d0800 0%,#000000 72%);gap:1.1rem}
.upgt{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;color:#ffd700;letter-spacing:.25em}
.upgm{color:#80c8ff;font-size:.95rem}
.ucards{display:flex;gap:1.1rem;flex-wrap:wrap;justify-content:center}
.uc{width:180px;border:1.5px solid #332;padding:1.2rem .85rem;cursor:pointer;transition:all .22s;text-align:center}
.uc:hover{border-color:#ffd700;transform:translateY(-3px);box-shadow:0 5px 16px rgba(255,215,0,.16)}
.ucn{font-family:'Bebas Neue',sans-serif;font-size:1.25rem;color:#ffd700;letter-spacing:.07em;margin-bottom:.28rem}
.ucd{font-size:.68rem;color:#888;margin:.28rem 0}.ucl{color:#30ccff;font-size:.8rem}
.uc.mx{opacity:.42;cursor:default;border-color:#333}

/* LEADERBOARD */
#s-lb{background:radial-gradient(ellipse at 50% 40%,#00081a 0%,#000000 72%);gap:1.1rem}
.lbt{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:#30ccff;letter-spacing:.3em}
.lbw{width:480px}
.lbh,.lbr{display:grid;grid-template-columns:38px 1fr 55px 55px 55px 70px;gap:.45rem;padding:.38rem .75rem}
.lbh{font-size:.65rem;color:#30ccff;letter-spacing:.2em;border-bottom:1px solid #223}
.lbr{font-size:.85rem;color:#ccc;border-bottom:.5px solid #112}
.lbr.you{color:#ffd700}.lbr:hover{background:rgba(255,255,255,.04)}

/* PAUSE */
#s-pause{background:rgba(0,0,0,.8);backdrop-filter:blur(12px);gap:.9rem}
.paust{font-family:'Bebas Neue',sans-serif;font-size:4rem;color:#fff;letter-spacing:.3em}
.back{position:absolute;top:16px;left:16px}

/* RANKED RESULT OVERLAY */
#rankedresult{position:fixed;inset:0;background:rgba(0,0,0,.88);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:50;gap:.8rem}
#rankedresult.show{display:flex}
.rrtitle{font-family:'Bebas Neue',sans-serif;font-size:4rem;letter-spacing:.2em}
.rrpts{font-size:1.1rem;letter-spacing:.3em}

/* MULTIPLAYER HUD */
#mphud{position:absolute;top:80px;right:16px;display:flex;flex-direction:column;gap:4px;pointer-events:none}
.mphudp{font-size:.7rem;display:flex;align-items:center;gap:6px}
.mphudpdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.mphudpname{color:#ccc}.mphudpit{color:#ff4040;font-size:.65rem}`;
document.head.appendChild(_style);

// ─── Inject HTML ──────────────────────────────────────────────────
document.body.style.cssText = 'margin:0;padding:0;background:#000;overflow:hidden;width:100%;height:100%';
document.body.innerHTML = `<canvas id="c"></canvas>
<div id="ui">
<div class="scr" id="s-menu">
  <div class="ttl">TAG</div>
  <div class="sub">HIGH — TENSION — PURSUIT</div>
  <div class="menubtns">
    <button class="btn bp" id="btn-play">PLAY</button>
    <div class="menubtnrow">
      <button class="btn bs sm" id="btn-shop0">SHOP</button>
      <button class="btn bs sm" id="btn-lb0">LEADERBOARD</button>
    </div>
    <div class="menubtnrow">
      <button class="btn by sm" id="btn-ranked0">RANKED</button>
      <button class="btn bg sm" id="btn-multi0">MULTIPLAYER</button>
    </div>
  </div>
  <div class="hint">WASD MOVE &nbsp;|&nbsp; RIGHT SHIFT = LOCK/UNLOCK MOUSE &nbsp;|&nbsp; SPACE JUMP<br>LEFT SHIFT / Q SLIDE &nbsp;|&nbsp; CTRL DIVE &nbsp;|&nbsp; E SKILL &nbsp;|&nbsp; M CHAT &nbsp;|&nbsp; ESC PAUSE<br>TAG COOLDOWN: 1s &nbsp;|&nbsp; RANKED: 30s SPRINT MATCHES &nbsp;|&nbsp; MULTIPLAYER: 3-5 PLAYERS</div>
</div>

<div class="scr hide" id="s-mode">
  <div class="modet">SELECT MODE</div>
  <div class="modecards">
    <div class="modecard casual" id="mc-casual"><div class="modeicon">🏃</div><div class="modename">CASUAL</div><div class="modedesc">3-minute match vs bots.<br>Chill, no rank on the line.<br>Earn coins &amp; skills.</div></div>
    <div class="modecard ranked" id="mc-ranked"><div class="modebadge hot">HOT</div><div class="modeicon">🏆</div><div class="modename">RANKED</div><div class="modedesc">30-second sprint matches.<br>Earn / lose rank points.<br>Climb the ladder.</div></div>
    <div class="modecard multi" id="mc-multi"><div class="modebadge new">NEW</div><div class="modeicon">👥</div><div class="modename">MULTIPLAYER</div><div class="modedesc">3-5 real players.<br>Share a room code.<br>Works in-browser.</div></div>
    <div class="modecard prac" id="mc-prac"><div class="modeicon">🎯</div><div class="modename">PRACTICE</div><div class="modedesc">Solo arena. No bots.<br>Learn the maps.<br>Test your skills.</div></div>
  </div>
  <button class="back btn bs" id="btn-modeback">BACK</button>
</div>

<div class="scr hide" id="s-map">
  <div class="mst">CHOOSE YOUR ARENA</div>
  <div class="mapwrap">
    <div class="mcards" id="mcards"></div>
    <div class="mprev show" id="mprev">
      <div class="mprevtitle" id="mprevname">← PICK A MAP</div>
      <canvas id="mprevcanvas" width="300" height="168"></canvas>
      <div class="mprevrow"><span class="mprevlbl">THEME</span><span class="mprevval" id="mprevtheme">—</span></div>
      <div class="mprevrow"><span class="mprevlbl">LAYOUT</span><span class="mprevval" id="mprevlayout">—</span></div>
      <div class="mprevrow"><span class="mprevlbl">DIFFICULTY</span><span class="mprevval" id="mprevdiff">—</span></div>
      <div class="mprevrow"><span class="mprevlbl">OBSTACLES</span><span class="mprevval" id="mprevobs">—</span></div>
      <div class="mprevdesc" id="mprevdesc">Click any map card on the left to preview it here.</div>
      <button class="btn bp" id="btn-go" style="margin-top:.8rem;width:100%;display:none">ENTER THE ARENA →</button>
    </div>
  </div>
  <button class="back btn" id="btn-mapback" style="flex-shrink:0">BACK</button>
</div>

<div class="scr hide" id="s-lobby">
  <div class="lobbyt">MULTIPLAYER LOBBY</div>
  <div style="font-size:.7rem;color:#555;letter-spacing:.2em">ROOM CODE</div>
  <div class="lobbycode" id="lobbycode">——————</div>
  <button class="sharelink" id="btn-copylink">📋 COPY INVITE LINK</button>
  <div class="playerslots" id="playerslots"></div>
  <div style="display:flex;gap:1rem;margin-top:.3rem;align-items:center">
    <input id="joincode" placeholder="ENTER CODE" style="background:rgba(0,0,0,.8);border:1px solid #40ff88;color:#fff;font-family:'Share Tech Mono',monospace;padding:.35rem .6rem;width:140px;font-size:.8rem;outline:none;letter-spacing:.2em;text-transform:uppercase">
    <button class="btn bg sm" id="btn-joinroom">JOIN</button>
  </div>
  <div class="lobbyinfo" id="lobbyinfo">WAITING FOR PLAYERS... (NEED 2-5 TO START)<br>SHARE THE ROOM CODE WITH FRIENDS</div>
  <div style="display:flex;gap:.7rem;margin-top:.5rem">
    <button class="btn bp" id="btn-lobbystart" style="display:none">START MATCH</button>
    <button class="btn bs sm" id="btn-lobbymap">PICK MAP</button>
    <button class="back btn sm" id="btn-lobbyback" style="position:static">LEAVE</button>
  </div>
</div>

<div id="s-hud">
  <div id="htimer">3:00</div>
  <div id="hmodelbl">CASUAL</div>
  <div id="itind">★ YOU ARE IT ★</div>
  <div id="xhair"></div>
  <div id="vig"></div>
  <div id="spdo"></div>
  <div id="stat"></div>
  <div id="tagcd"><div id="tagcdfill" style="width:0%"></div></div>
  <canvas id="hmm" width="108" height="108"></canvas>
  <div id="hright">
    <div class="hlbl">COINS</div><div class="hval" id="hcv">0</div>
    <div class="hlbl" style="margin-top:.4rem">MATCH PTS</div><div class="hval" id="hmpv">0</div>
    <div class="hval" id="hrankv" style="margin-top:.2rem"></div>
  </div>
  <div id="hskills">
    <div class="ss"><span class="ssl" id="sqbind">Q</span><span class="ssn" id="sqn">SLIDE</span><div class="sso" id="sqo" style="height:0"></div><span class="sst" id="sqt"></span></div>
    <div class="ss"><span class="ssl" id="sebind">E</span><span class="ssn" id="sen">—</span><div class="sso" id="seo" style="height:0"></div><span class="sst" id="set2"></span></div>
  </div>
  <div id="mphud"></div>
  <div id="chatw"></div>
  <div id="chatwrap"><input id="chatin" type="text" placeholder="Enter to send, Esc to close" maxlength="60"></div>
  <div id="tagprompt">PRESS CLOSE TO TAG</div>
  <div id="lockoverlay"><span>RIGHT SHIFT TO LOCK MOUSE</span><span class="losub">CLICK ANYWHERE OR PRESS RIGHT SHIFT</span></div>
</div>

<div class="scr hide" id="s-result">
  <div class="rt" id="rtitle">VICTORY</div>
  <div style="color:#555;font-size:.75rem;letter-spacing:.25em;margin-bottom:.28rem" id="rsubtitle">MATCH RESULTS</div>
  <div class="rplays" id="rplays"></div>
  <div class="rankchange" id="rankchange"></div>
  <div style="display:flex;gap:.75rem;margin-top:.75rem">
    <button class="btn bp" id="btn-again">PLAY AGAIN</button>
    <button class="btn bs" id="btn-resmenu">MENU</button>
  </div>
</div>

<div class="scr hide" id="s-shop">
  <div class="shopt">SHOP</div>
  <div style="display:flex;gap:.5rem;margin-bottom:.5rem">
    <button class="btn bs sm" id="tab-skills" onclick="window._setShopTab('skills')">SKILLS</button>
    <button class="btn bg sm" id="tab-char"   onclick="window._setShopTab('char')">CHARACTER</button>
  </div>
  <div id="shop-skills-panel">
    <div class="shopc" id="shopcd">⬡ 0 COINS</div>
    <div class="sgrid" id="sgrid"></div>
  </div>
  <div id="shop-char-panel" style="display:none"><div id="char-grid"></div></div>
  <div class="eqrow">Q: <span id="eqq">SLIDE</span>&nbsp;&nbsp;E: <span id="eqe">—</span></div>
  <button class="btn bs sm" id="btn-conv" style="margin-top:.3rem">CONVERT 5 COINS → 1 MATCH POINT</button>
  <div class="kbsect">
    <div style="color:#555;font-size:.62rem;letter-spacing:.2em;margin-bottom:.4rem">KEYBINDS</div>
    <div class="kbrow"><span class="kblbl">SLIDE / Q</span><button class="kbkey" id="kb-q" data-action="q">Q</button></div>
    <div class="kbrow"><span class="kblbl">SKILL / E</span><button class="kbkey" id="kb-e" data-action="e">E</button></div>
  </div>
  <button class="back btn" id="btn-shopback">BACK</button>
</div>

<div class="scr hide" id="s-upg">
  <div class="upgt">SKILL UPGRADE</div>
  <div class="upgm">◈ <span id="upgmpv">0</span> MATCH POINTS AVAILABLE (10 = 1 UPGRADE)</div>
  <div style="color:#333;font-size:.65rem;margin-bottom:.7rem">UPGRADES NEVER RESET — EACH TYPE STACKS INDEPENDENTLY</div>
  <div class="ucards" id="ucards"></div>
  <button class="btn" id="btn-upgskip" style="margin-top:.7rem;color:#444;border-color:#333;font-size:.75rem">SKIP FOR NOW</button>
</div>

<div class="scr hide" id="s-lb">
  <div class="lbt">LEADERBOARD</div>
  <div class="lbw">
    <div class="lbh"><span>#</span><span>PLAYER</span><span>WINS</span><span>LOSS</span><span>STK</span><span>RANK</span></div>
    <div id="lbbody"></div>
  </div>
  <button class="back btn" id="btn-lbback">BACK</button>
</div>

<div class="scr hide" id="s-pause">
  <div class="paust">PAUSED</div>
  <button class="btn bp" id="btn-resume">RESUME</button>
  <button class="btn bs" id="btn-quit">QUIT MATCH</button>
</div>

<div id="rankedresult">
  <div class="rrtitle" id="rrtitle">ROUND OVER</div>
  <div class="rrpts" id="rrpts"></div>
  <div style="font-size:.7rem;color:#555;letter-spacing:.2em" id="rrnext">NEXT ROUND IN 3...</div>
</div>
</div>`;

// ─── Load Three.js then boot ──────────────────────────────────────
const _three = document.createElement('script');
_three.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
_three.onload = function() { boot(); };
document.head.appendChild(_three);

function boot() {
'use strict';

const PH=1.8,SH=0.8,PR=0.42,GRV=-22,MSZ=810,HM=405;
const SPD=30,SSPD=40;
const JF=9.5,TAGD=2.5,TAG_COOLDOWN=1.0;
const DUR_CASUAL=180,DUR_RANKED=30,DUR_PRACTICE=120;
const BSPD=30;

const BINDS={q:'KeyQ',e:'KeyE'};
let listenBind=null;

const RANKS=[
  {name:'BRONZE',   min:0,   color:'#cd7f32'},
  {name:'SILVER',   min:500, color:'#c0c0c0'},
  {name:'GOLD',     min:1200,color:'#ffd700'},
  {name:'PLATINUM', min:2200,color:'#44ddff'},
  {name:'DIAMOND',  min:3500,color:'#aa66ff'},
  {name:'APEX',     min:5000,color:'#ff3060'},
];
function getRank(rp){let r=RANKS[0];for(const rk of RANKS)if(rp>=rk.min)r=rk;return r;}
function getMapStars(rp){if(rp<500)return 0;if(rp<1500)return 1;if(rp<3000)return 2;if(rp<5001)return 3;if(rp<7501)return 4;return 5;}
function mapStarDisplay(rp){const s=getMapStars(rp);return '★'.repeat(s)+'☆'.repeat(5-s);}
function getRankProgress(rp){const ri=RANKS.findLastIndex(r=>rp>=r.min);if(ri>=RANKS.length-1)return 1;const cur=RANKS[ri],nxt=RANKS[ri+1];return Math.min(1,(rp-cur.min)/(nxt.min-cur.min));}

const TH={
  city:{sky:0x3a5a7a,fog:0x5a7a9a,gr:0x323232,w:0x5a5a6a,aw:0x7a8a9a,l1:0xffaa44,l2:0x4488ff,fe:0.018},
  cyber:{sky:0x000414,fog:0x001428,gr:0x060816,w:0x0e1626,aw:0x182840,l1:0x00ffcc,l2:0xff00ee,fe:0.03},
  stone:{sky:0x6a7a8a,fog:0x7a8a9a,gr:0x3a2a1a,w:0x6a5a4a,aw:0x7a6a5a,l1:0xffdd88,l2:0xff8844,fe:0.015},
  ice:{sky:0x99bbdd,fog:0xaaccee,gr:0x7a9aaa,w:0xaaccee,aw:0xcce0ff,l1:0x88ddff,l2:0xaaeeff,fe:0.012},
  space:{sky:0x000008,fog:0x000014,gr:0x060814,w:0x141824,aw:0x1e2830,l1:0x0066ff,l2:0x00ccff,fe:0.025},
  dark:{sky:0x040004,fog:0x060006,gr:0x0c000c,w:0x180018,aw:0x240024,l1:0xff00aa,l2:0xcc0066,fe:0.022},
  forest:{sky:0x143614,fog:0x1a3a1a,gr:0x150c04,w:0x2e1a0c,aw:0x3e2a10,l1:0x88ff44,l2:0x44cc00,fe:0.02},
  lava:{sky:0x180000,fog:0x240500,gr:0x0e0300,w:0x280900,aw:0x341200,l1:0xff4400,l2:0xff2200,fe:0.03},
  metro:{sky:0x0e0e0e,fog:0x161616,gr:0x222222,w:0x363636,aw:0x424242,l1:0xffcc00,l2:0xff8800,fe:0.025},
  sea:{sky:0x003888,fog:0x0048aa,gr:0x001c55,w:0x002c77,aw:0x003888,l1:0x44aaff,l2:0x0088ff,fe:0.02},
  crystal:{sky:0x0c001a,fog:0x14002a,gr:0x060010,w:0x220038,aw:0x300048,l1:0xcc44ff,l2:0xaa00ff,fe:0.025},
  desert:{sky:0xbb8833,fog:0xaa9955,gr:0x775522,w:0x997733,aw:0xaa9944,l1:0xff9900,l2:0xff6600,fe:0.018},
  fantasy:{sky:0x661a99,fog:0x882acc,gr:0x280044,w:0x440088,aw:0x6600aa,l1:0xffaa00,l2:0xff44ff,fe:0.02},
  industrial:{sky:0x222d3a,fog:0x303d4a,gr:0x14161e,w:0x262838,aw:0x323442,l1:0xffaa00,l2:0xff6600,fe:0.022},
  sky2:{sky:0x2299ff,fog:0x44aaff,gr:0x0077dd,w:0x3399ee,aw:0x55bbff,l1:0xffffff,l2:0x88ddff,fe:0.012},
  fire:{sky:0x2a0600,fog:0x380a00,gr:0x1a0600,w:0x300c00,aw:0x3e1400,l1:0xff8800,l2:0xff4400,fe:0.028},
  alien:{sky:0x001400,fog:0x001c00,gr:0x000600,w:0x002000,aw:0x002a00,l1:0x44ff00,l2:0x00ff88,fe:0.025},
  japanese:{sky:0xaa1a1a,fog:0xbb2a2a,gr:0x221408,w:0x302012,aw:0x3e2e1a,l1:0xff4444,l2:0xcc0000,fe:0.018},
  pixel:{sky:0x2828bb,fog:0x3838cc,gr:0x0e0e88,w:0x1818aa,aw:0x2828bb,l1:0xffff00,l2:0xff8800,fe:0.02},
  water:{sky:0x002855,fog:0x003877,gr:0x001428,w:0x002a44,aw:0x003a5a,l1:0x44aaff,l2:0x0077cc,fe:0.022},
};

const THEME_DESCS={
  city:'Urban rooftops and tight alleys. Watch the corners.',
  cyber:'Neon-lit grid. Glow and glitch in every shadow.',
  stone:'Ancient ruins. Pillars and crumbling archways.',
  ice:'Slippery open fields. Speed is your friend here.',
  space:'Zero-g station corridors. Float, drift, and tag.',
  dark:'Darkness rules. Stay close — or get lost.',
  forest:'Dense bamboo and ancient trees. Every path looks the same.',
  lava:'Molten chaos. Heat shimmers distort your vision.',
  metro:'Underground tunnels. Fast lines, tight turns.',
  sea:'Submerged platforms. Watch for the drop-offs.',
  crystal:'Prismatic caverns. Reflections will fool you.',
  desert:'Sandy dunes and rock formations. Wide and exposed.',
  fantasy:'Floating mushrooms and magic arches. Defy gravity.',
  industrial:'Factory floors and catwalks. Pipes everywhere.',
  sky2:'Above the clouds. One wrong jump and you\'re gone.',
  fire:'Burning city blocks. Move fast or burn.',
  alien:'Unknown terrain. Strange geometry, stranger rules.',
  japanese:'Dojo courtyards and paper screens. Honor the chase.',
  pixel:'8-bit geometry. Retro chaos.',
  water:'Underwater structures. Pressure is real.',
};

const MDEFS=[
  {id:0,n:"Downtown City",t:"city",p:"grid",d:12,s:.30,seed:1001},
  {id:1,n:"Neon Tokyo",t:"cyber",p:"corridors",d:14,s:.40,seed:1002},
  {id:2,n:"Ancient Colosseum",t:"stone",p:"ring",d:10,s:.20,seed:1003},
  {id:3,n:"Frozen Tundra",t:"ice",p:"scattered",d:8,s:.25,seed:1004},
  {id:4,n:"Space Station Alpha",t:"space",p:"compound",d:15,s:.50,seed:1005},
  {id:5,n:"Haunted Mansion",t:"dark",p:"corridors",d:12,s:.35,seed:1006},
  {id:6,n:"Bamboo Forest",t:"forest",p:"pillars",d:16,s:.30,seed:1007},
  {id:7,n:"Volcanic Island",t:"lava",p:"scattered",d:10,s:.40,seed:1008},
  {id:8,n:"Underground Subway",t:"metro",p:"grid",d:10,s:.45,seed:1009},
  {id:9,n:"Pirate Cove",t:"sea",p:"compound",d:8,s:.30,seed:1010},
  {id:10,n:"Crystal Caverns",t:"crystal",p:"ring",d:12,s:.40,seed:1011},
  {id:11,n:"Rooftop Chase",t:"city",p:"platforms",d:14,s:.50,seed:1012},
  {id:12,n:"Medieval Castle",t:"stone",p:"maze",d:10,s:.25,seed:1013},
  {id:13,n:"Cyber Alley",t:"cyber",p:"corridors",d:16,s:.50,seed:1014},
  {id:14,n:"Wild West Town",t:"desert",p:"grid",d:10,s:.30,seed:1015},
  {id:15,n:"Mushroom Kingdom",t:"fantasy",p:"pillars",d:14,s:.35,seed:1016},
  {id:16,n:"Jungle Temple",t:"forest",p:"maze",d:10,s:.30,seed:1017},
  {id:17,n:"Burning City",t:"fire",p:"grid",d:12,s:.40,seed:1018},
  {id:18,n:"Cloud Kingdom",t:"sky2",p:"platforms",d:8,s:.50,seed:1019},
  {id:19,n:"Neon Labyrinth",t:"cyber",p:"maze",d:18,s:.45,seed:1020},
  {id:20,n:"Abandoned Warehouse",t:"industrial",p:"compound",d:12,s:.40,seed:1021},
  {id:21,n:"Sky Bridge",t:"sky2",p:"platforms",d:8,s:.50,seed:1022},
  {id:22,n:"Lava Fields",t:"lava",p:"scattered",d:12,s:.40,seed:1023},
  {id:23,n:"Samurai Dojo",t:"japanese",p:"corridors",d:10,s:.30,seed:1024},
  {id:24,n:"Gothic Cathedral",t:"dark",p:"pillars",d:8,s:.35,seed:1025},
  {id:25,n:"Urban Parkour",t:"city",p:"platforms",d:16,s:.50,seed:1026},
  {id:26,n:"Space Debris Field",t:"space",p:"scattered",d:12,s:.45,seed:1027},
  {id:27,n:"Dragon's Lair",t:"lava",p:"ring",d:8,s:.40,seed:1028},
  {id:28,n:"Pixel World",t:"pixel",p:"grid",d:14,s:.30,seed:1029},
  {id:29,n:"Crystal Maze",t:"crystal",p:"maze",d:16,s:.50,seed:1030},
  {id:30,n:"Alien Planet",t:"alien",p:"scattered",d:10,s:.50,seed:1031},
  {id:31,n:"Roman Forum",t:"stone",p:"pillars",d:12,s:.25,seed:1032},
  {id:32,n:"Dark Carnival",t:"dark",p:"ring",d:12,s:.40,seed:1033},
  {id:33,n:"Floating Islands",t:"sky2",p:"platforms",d:6,s:.60,seed:1034},
  {id:34,n:"Ocean Platform",t:"sea",p:"platforms",d:8,s:.40,seed:1035},
  {id:35,n:"Mountain Pass",t:"stone",p:"corridors",d:10,s:.35,seed:1036},
  {id:36,n:"Final Nexus",t:"space",p:"compound",d:18,s:.60,seed:1037},
];

function mkRng(seed){let s=seed>>>0;return()=>{s=Math.imul(s,1664525)+1013904223>>>0;return s/4294967296;};}

function genObs(md){
  const rng=mkRng(md.seed),r=rng,th=TH[md.t],obs=[];
  function add(x,yb,z,w,h,d,type,color){
    const c=color||th.w;
    obs.push({x,yb,z,w,h,d,type:type||'wall',color:c,
      mnX:x-w/2,mxX:x+w/2,mnY:yb,mxY:yb+h,mnZ:z-d/2,mxZ:z+d/2});
  }
  add(0,0,-HM,MSZ+2,10,2,'bound');add(0,0,HM,MSZ+2,10,2,'bound');
  add(-HM,0,0,2,10,MSZ+2,'bound');add(HM,0,0,2,10,MSZ+2,'bound');
  const {p:pt,s:sr}=md;
  const TRAP_COUNTS={grid:600,corridors:450,ring:500,scattered:700,maze:600,pillars:550,platforms:500,compound:750};
  const N=TRAP_COUNTS[pt]||500;

  if(pt==='grid'){
    for(let x=-HM+6;x<=HM-6;x+=18)for(let z=-HM+6;z<=HM-6;z+=18){
      if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      const h=2+r()*6,w=2+r()*4,d=2+r()*4,dx=(r()-.5)*4,dz=(r()-.5)*4;
      if(r()<sr){const t=r()<.5?'slide':'jump';add(x+dx,t==='slide'?1.1:0,z+dz,w*1.5,t==='slide'?h-1.1:1.4,d,t,th.aw);}
      else add(x+dx,0,z+dz,w,h,d,'wall',r()<.28?th.aw:th.w);
    }
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-16),z=(r()-.5)*(MSZ-16);
      if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      const t=r()<.33?'slide':r()<.6?'jump':r()<.8?'barrier':'web';
      const w=2+r()*5,d2=2+r()*5,h=1.5+r()*5;
      if(t==='web')add(x,0,z,w+2,h+1,d2+2,'web',0x885599);
      else add(x,t==='slide'?1.1:0,z,w,t==='slide'?1.2:t==='jump'?1.4:2.8,d2,t,th.aw);
    }
  } else if(pt==='corridors'){
    for(let i=-12;i<=12;i++){
      if(i===0)continue;const cx=i*22,wh=4+r()*5;
      const g1=(r()-.5)*(MSZ-20),g2=(r()-.5)*(MSZ-20);
      if(Math.abs(g1)>10)add(cx,0,g1*.5,3,wh,Math.abs(g1)-8,'wall',th.w);
      if(Math.abs(g2)>10)add(cx,0,g2*.5,3,wh,Math.abs(g2)-8,'wall',th.aw);
    }
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-16),z=(r()-.5)*(MSZ-16);if(Math.abs(x)<10&&Math.abs(z)<10)continue;
      const h=2+r()*6,w=2+r()*5,d=2+r()*5;
      const t=r()<sr?(r()<.5?'slide':'jump'):r()<.15?'web':'wall';
      if(t==='web')add(x,0,z,w+2,h,d+2,'web',0x885599);
      else if(t==='slide')add(x,1.1,z,w*1.5,1.2,d,'slide',th.aw);
      else if(t==='jump')add(x,0,z,w*1.5,1.4,d,'jump',th.aw);
      else add(x,0,z,w,h,d,'wall',th.w);
    }
  } else if(pt==='ring'){
    const radii=[20,45,70,95,120,160,200,240,270];
    radii.forEach((rad)=>{
      const numPerRing=Math.floor(N/radii.length);
      for(let i=0;i<numPerRing;i++){
        const ang=i/numPerRing*Math.PI*2+r()*.5,x=Math.cos(ang)*rad,z=Math.sin(ang)*rad;
        const h=2+r()*6;
        const t=r()<sr?(r()<.5?'slide':'jump'):r()<.12?'web':'wall';
        if(t==='web')add(x,0,z,4+r()*3,h,4+r()*3,'web',0x885599);
        else if(t==='slide')add(x,1.1,z,3+r()*2,1.2,3+r()*2,'slide',th.aw);
        else if(t==='jump')add(x,0,z,3+r()*2,1.4,3+r()*2,'jump',th.aw);
        else add(x,0,z,2+r()*3,h,2+r()*3,'wall',r()<.22?th.aw:th.w);
      }
    });
  } else if(pt==='scattered'){
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-16),z=(r()-.5)*(MSZ-16);if(Math.sqrt(x*x+z*z)<12)continue;
      const h=1.5+r()*8,w=2+r()*6,d=2+r()*6;
      const t=r()<sr?(r()<.38?'slide':r()<.65?'jump':'barrier'):r()<.15?'web':'wall';
      if(t==='web')add(x,0,z,w+2,h,d+2,'web',0x885599);
      else if(t==='slide')add(x,1.1,z,w*1.5,Math.max(.5,h-1.1),d,'slide',th.aw);
      else if(t==='jump')add(x,0,z,w*1.5,1.4,d,'jump',th.aw);
      else if(t==='barrier')add(x,0,z,w*3,3,d,'barrier',th.aw);
      else add(x,0,z,w,h,d,'wall',r()<.18?th.aw:th.w);
    }
  } else if(pt==='maze'){
    const cell=18;
    for(let row=0;row<Math.floor(MSZ/cell);row++)for(let col=0;col<Math.floor(MSZ/cell);col++){
      const x=-HM+col*cell+cell/2,z=-HM+row*cell+cell/2;if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      if(r()<.52){const h=3+r()*4;const t=r()<.12?'web':r()<sr?'slide':'wall';
        if(t==='web')add(x,0,z,4,h+2,cell-1,'web',0x885599);
        else if(t==='slide')add(x,1.1,z,2,1.2,cell-1,'slide',th.aw);
        else add(x,0,z,2,h,cell-1,'wall',th.w);
      } else if(r()<.52){add(x,0,z,cell-1,3+r()*4,2,'wall',th.w);}
      if(r()<.25){const t2=r()<.5?'jump':'web';
        if(t2==='web')add(x+(r()-.5)*6,0,z+(r()-.5)*6,4,3,4,'web',0x885599);
        else add(x+(r()-.5)*6,0,z+(r()-.5)*6,3,1.4,3,'jump',th.aw);}
    }
  } else if(pt==='pillars'){
    for(let x=-HM+6;x<=HM-6;x+=12)for(let z=-HM+6;z<=HM-6;z+=12){
      if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      if(r()<.78)add(x+(r()-.5)*4,0,z+(r()-.5)*4,2+r()*3,5+r()*14,2+r()*3,'wall',r()<.22?th.aw:th.w);
    }
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-16),z=(r()-.5)*(MSZ-16);if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      const t=r()<.18?'web':r()<sr?'slide':'jump';
      if(t==='web')add(x,0,z,5+r()*4,4+r()*3,5+r()*4,'web',0x885599);
      else if(t==='slide')add(x,1.1,z,4+r()*4,1.2,4+r()*4,'slide',th.aw);
      else add(x,0,z,3+r()*5,1.4,3+r()*5,'jump',th.aw);
    }
  } else if(pt==='platforms'){
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-20),z=(r()-.5)*(MSZ-20);if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      const elev=r()<.42?2+r()*6:0;
      if(elev>0){add(x,0,z,1.2,elev,1.2,'wall',th.w);add(x,elev,z,6+r()*8,.6,6+r()*8,'platform',th.aw);}
      else{const t=r()<.18?'web':r()<sr?'jump':'wall';
        if(t==='web')add(x,0,z,5+r()*5,4,5+r()*5,'web',0x885599);
        else if(t==='jump')add(x,0,z,4+r()*6,1.4,4+r()*6,'jump',th.aw);
        else add(x,0,z,4+r()*7,2+r()*5,4+r()*7,'wall',r()<.2?th.aw:th.w);}
    }
    for(let i=0;i<Math.floor(N*.4);i++){
      const x=(r()-.5)*(MSZ-20),z=(r()-.5)*(MSZ-20);if(Math.abs(x)<12&&Math.abs(z)<12)continue;
      add(x,1.1,z,7+r()*7,2.2,1.5,'slide',th.w);
    }
  } else {
    for(let i=0;i<N;i++){
      const x=(r()-.5)*(MSZ-16),z=(r()-.5)*(MSZ-16);if(Math.abs(x)<10&&Math.abs(z)<10)continue;
      const h=2+r()*7,w=2+r()*7,d=2+r()*7;
      const t=r()<.18?'web':r()<sr?(r()<.33?'slide':r()<.58?'jump':'barrier'):'wall';
      if(t==='web')add(x,0,z,w+2,h,d+2,'web',0x885599);
      else if(t==='slide')add(x,1.1,z,w*1.5,Math.max(.5,h-1.1),d,'slide',th.aw);
      else if(t==='jump')add(x,0,z,w*1.5,1.4,d,'jump',th.aw);
      else if(t==='barrier')add(x,0,z,w*2.5,3,d,'barrier',th.aw);
      else add(x,0,z,w,h,d,'wall',r()<.16?th.aw:th.w);
    }
  }
  return obs;
}
const MAPS=MDEFS.map(m=>({...m,obs:genObs(m),theme:TH[m.t]}));

const SDEFS=[
  {id:'slide_q',slot:'q',name:'Quick Slide',desc:'Default: instant ground slide burst',baseCD:4,cost:0,builtin:true},
  {id:'speed',slot:'q',name:'Speed Surge',desc:'+60% speed for 3s',baseCD:15,cost:18},
  {id:'juke',slot:'q',name:'Juke Flash',desc:'Sidestep dash left or right',baseCD:8,cost:12},
  {id:'decoy',slot:'q',name:'Decoy Drop',desc:'Drop decoy — IT chases it for 6s',baseCD:25,cost:25},
  {id:'smokeq',slot:'q',name:'Smoke Screen',desc:'Blind nearby IT for 4s',baseCD:20,cost:30},
  {id:'wallrun',slot:'q',name:'Wall Run',desc:'Sprint along walls for 2s',baseCD:22,cost:35},
  {id:'webshot',slot:'q',name:'Web Shot',desc:'Fire web ahead — snares whoever walks in',baseCD:30,cost:40},
  {id:'sprint',slot:'q',name:'Sprint Burst',desc:'+120% speed for 1s',baseCD:12,cost:22},
  {id:'feint',slot:'q',name:'Feint Step',desc:'Instantly reverse direction at full speed',baseCD:9,cost:15},
  {id:'grapple',slot:'q',name:'Grapple Hook',desc:'Launch to nearest wall within 60m',baseCD:16,cost:50},
  {id:'flashstep',slot:'q',name:'Flash Step',desc:'3 rapid micro-dashes forward',baseCD:14,cost:38},
  {id:'phase',slot:'q',name:'Phase Shift',desc:'Phase through obstacles for 0.5s',baseCD:28,cost:55},
  {id:'timewarp',slot:'q',name:'Time Warp',desc:'All bots move at 50% speed for 2s',baseCD:40,cost:70},
  {id:'doublejump',slot:'q',name:'Double Jump',desc:'Extra jump in mid-air',baseCD:6,cost:20},
  {id:'groundslam',slot:'q',name:'Ground Slam',desc:'Slam down, knock nearby players 12m',baseCD:18,cost:32},
  {id:'cloak',slot:'q',name:'Cloak',desc:'Invisible to bots for 3s',baseCD:35,cost:60},
  {id:'ricochet',slot:'q',name:'Ricochet Dash',desc:'Dash then bounce off next wall',baseCD:11,cost:28},
  {id:'clone',slot:'q',name:'Clone Dash',desc:'Leave phantom decoy, dash 15m forward',baseCD:28,cost:58},
  {id:'boomerang',slot:'q',name:'Boomerang Dash',desc:'Dash forward then snap back to origin',baseCD:13,cost:35},
  {id:'icepath',slot:'q',name:'Ice Path',desc:'Leave ice trail — slows anyone behind you',baseCD:20,cost:32},
  {id:'earthquake',slot:'q',name:'Earthquake',desc:'Stun all bots within 20m for 1.5s',baseCD:35,cost:65},
  {id:'levitate',slot:'q',name:'Levitate',desc:'Float 8m upward, ignore gravity for 2s',baseCD:22,cost:42},
  {id:'phantomstep',slot:'q',name:'Phantom Step',desc:'Leave 3 fake footstep trails',baseCD:18,cost:30},
  {id:'turbo',slot:'q',name:'Turbo Wheels',desc:'+90% speed for 5s',baseCD:25,cost:45},
  {id:'launchpad',slot:'q',name:'Launch Pad',desc:'Place a pad — next person to step launches 25m up',baseCD:30,cost:50},
  {id:'gravity',slot:'q',name:'Gravity Flip',desc:'Reverse gravity for yourself for 1.5s',baseCD:32,cost:60},
  {id:'mimic',slot:'q',name:'Mimic',desc:'Copy last skill the IT bot used',baseCD:20,cost:48},
  {id:'tornado',slot:'q',name:'Tornado',desc:'Spin move — throw all nearby entities 8m away',baseCD:22,cost:40},
  {id:'camouflage',slot:'q',name:'Camouflage',desc:'Blend into terrain color for 4s',baseCD:30,cost:55},
  {id:'stasis',slot:'q',name:'Stasis Bubble',desc:'Freeze yourself — immune to tag for 1.5s',baseCD:18,cost:38},
  {id:'nitro',slot:'q',name:'Nitro Boost',desc:'Massive one-shot speed burst forward',baseCD:10,cost:28},
  {id:'banish',slot:'q',name:'Banish',desc:'Teleport the IT bot to a random map corner',baseCD:45,cost:80},
  {id:'shadowstep',slot:'q',name:'Shadow Step',desc:'Step through your own shadow 6m instantly',baseCD:12,cost:32},
  {id:'landmine',slot:'q',name:'Land Mine',desc:'Drop invisible mine — launches IT 15m on contact',baseCD:35,cost:62},
  {id:'rubberband',slot:'q',name:'Rubber Band',desc:'Spring back 10m in direction you came from',baseCD:10,cost:22},
  {id:'forcefield',slot:'q',name:'Force Field',desc:'Impassable bubble around you — lasts 1s',baseCD:25,cost:50},
  {id:'webmine',slot:'q',name:'Web Mine',desc:'Drop hidden web mine — sticks next person for 5s',baseCD:32,cost:55},
  {id:'timefreeze',slot:'q',name:'Time Freeze',desc:'Freeze all bots completely for 1s',baseCD:50,cost:90},
  {id:'swap',slot:'q',name:'Swap',desc:'Instantly swap positions with nearest bot',baseCD:28,cost:65},
  {id:'magnetwall',slot:'q',name:'Magnet Wall',desc:'Stick to any wall magnetically for 2s',baseCD:15,cost:30},
  {id:'decoy2',slot:'q',name:'Triple Decoy',desc:'Drop 3 decoys in different directions at once',baseCD:35,cost:70},
  {id:'rewind',slot:'q',name:'Rewind',desc:'Teleport back to your position 2s ago',baseCD:20,cost:45},
  {id:'shockwave',slot:'q',name:'Shockwave',desc:'Emit ring of force that knocks bots back 15m',baseCD:28,cost:52},
  {id:'haunted',slot:'q',name:'Haunted Trail',desc:'Leave ghost decoys along your path for 4s',baseCD:30,cost:58},
  {id:'tesla',slot:'q',name:'Tesla Coil',desc:'Drop electric trap — stuns IT for 2s on touch',baseCD:35,cost:65},
  {id:'portal',slot:'q',name:'Portal Blink',desc:'Blink to a random open position on the map',baseCD:22,cost:55},
  {id:'shrinkbeam',slot:'q',name:'Shrink Beam',desc:'Fire beam — shrinks IT hitbox so they miss tags',baseCD:30,cost:62},
  {id:'moonwalk',slot:'q',name:'Moon Walk',desc:'0.15x gravity for 3s — huge floaty leaps',baseCD:25,cost:50},
  {id:'ejector',slot:'q',name:'Ejector Seat',desc:'Propel straight up 30m and glide down slowly',baseCD:20,cost:42},
  {id:'ghost',slot:'e',name:'Ghost Step',desc:'2s complete tag immunity',baseCD:20,cost:28},
  {id:'dash',slot:'e',name:'Air Dash',desc:'Powerful aerial forward dash',baseCD:12,cost:20},
  {id:'sboost',slot:'e',name:'Slide Boost',desc:'2x slide speed, extended range',baseCD:10,cost:18},
  {id:'blink',slot:'e',name:'Blink',desc:'Teleport 12m forward instantly',baseCD:18,cost:35},
  {id:'shield',slot:'e',name:'Force Shield',desc:'Block next tag entirely',baseCD:35,cost:50},
  {id:'hijump',slot:'e',name:'Super Jump',desc:'3x jump height',baseCD:15,cost:32},
  {id:'webtrap',slot:'e',name:'Web Trap',desc:'Place web at feet — snares chaser for 4s',baseCD:22,cost:38},
  {id:'recall',slot:'e',name:'Recall',desc:'Teleport to spawn instantly',baseCD:45,cost:65},
  {id:'vortex',slot:'e',name:'Vortex Pulse',desc:'Blast nearby bots 10m away',baseCD:25,cost:45},
  {id:'overclock',slot:'e',name:'Overclock',desc:'+200% speed 0.8s, hard crash after',baseCD:20,cost:40},
  {id:'zipline',slot:'e',name:'Zipline',desc:'Rocket to nearest wall at 80 speed',baseCD:30,cost:55},
  {id:'mirror',slot:'e',name:'Mirror Dash',desc:'Dash opposite direction of IT',baseCD:18,cost:42},
  {id:'adrenaline',slot:'e',name:'Adrenaline',desc:'When tagged as IT: +80% speed for 4s',baseCD:30,cost:48},
  {id:'webpurge',slot:'e',name:'Web Purge',desc:'Instantly escape any web',baseCD:12,cost:22},
  {id:'shrink',slot:'e',name:'Shrink',desc:'Half collision size for 3s',baseCD:22,cost:44},
  {id:'magnet',slot:'e',name:'Tag Magnet',desc:'When IT: auto-tag nearest player within 6m',baseCD:25,cost:52},
  {id:'airburst',slot:'e',name:'Air Burst',desc:'Launch 40m straight up',baseCD:16,cost:30},
  {id:'doppel',slot:'e',name:'Doppelganger',desc:'Spawn decoy that runs in your direction for 3s',baseCD:28,cost:55},
  {id:'slowfall',slot:'e',name:'Slow Fall',desc:'Fall at 10% speed for 4s, drift anywhere',baseCD:18,cost:35},
  {id:'blastjump',slot:'e',name:'Blast Jump',desc:'Explosive launch diagonally 20m forward+up',baseCD:14,cost:30},
  {id:'pullback',slot:'e',name:'Pull Back',desc:'Yank the IT bot toward you by 12m',baseCD:30,cost:58},
  {id:'superdive',slot:'e',name:'Super Dive',desc:'Dive at 3x normal speed, shockwave on land',baseCD:15,cost:35},
  {id:'jailbreak',slot:'e',name:'Jailbreak',desc:'If caught as IT: transfer IT to nearest bot',baseCD:40,cost:72},
  {id:'daze',slot:'e',name:'Daze',desc:'Disorient IT — inverts their controls for 2s',baseCD:35,cost:65},
  {id:'tether',slot:'e',name:'Tether',desc:'Lock IT in place for 1.5s with energy tether',baseCD:38,cost:68},
  {id:'flashbang',slot:'e',name:'Flash Bang',desc:'Blind all bots for 1.5s with white flash',baseCD:28,cost:52},
  {id:'blackhole',slot:'e',name:'Black Hole',desc:'Pull all nearby bots toward a point for 2s',baseCD:45,cost:85},
  {id:'antigrav',slot:'e',name:'Anti-Grav Zone',desc:'Create zone where bots float helplessly for 2s',baseCD:40,cost:75},
  {id:'overdrive',slot:'e',name:'Overdrive',desc:'+300% speed but cannot stop turning for 1.5s',baseCD:25,cost:60},
  {id:'echo',slot:'e',name:'Echo Dash',desc:'Dash 4x in rapid succession, each 5m',baseCD:20,cost:48},
  {id:'repulsor',slot:'e',name:'Repulsor',desc:'Continuous push field — bots cant approach for 2s',baseCD:30,cost:58},
  {id:'phoenix',slot:'e',name:'Phoenix Burst',desc:'When tagged: explode outward, bounce IT 10m back',baseCD:45,cost:78},
  {id:'siphon',slot:'e',name:'Speed Siphon',desc:'Drain speed from IT — slow them 40%, boost you 40%',baseCD:28,cost:60},
  {id:'wormhole',slot:'e',name:'Wormhole',desc:'Place two portals — enter one, exit the other',baseCD:40,cost:75},
  {id:'shieldwall',slot:'e',name:'Shield Wall',desc:'Wall of energy 8m wide blocks IT for 2s',baseCD:32,cost:62},
  {id:'homing',slot:'e',name:'Homing Beacon',desc:'When IT: lock onto target — auto-aim pull for 2s',baseCD:25,cost:55},
  {id:'netgun',slot:'e',name:'Net Gun',desc:'Fire net — catches any bot in a 5m cone for 3s',baseCD:30,cost:58},
  {id:'blizzard',slot:'e',name:'Blizzard',desc:'Ice storm slows all bots 60% in 30m radius for 3s',baseCD:40,cost:72},
  {id:'chain',slot:'e',name:'Chain Tag',desc:'If you tag someone, they instantly tag nearest other',baseCD:35,cost:70},
  {id:'astral',slot:'e',name:'Astral Form',desc:'Leave body behind — fly as a ghost for 2s',baseCD:40,cost:80},
  {id:'timeloop',slot:'e',name:'Time Loop',desc:'Reset your position to 3s ago, keep IT status',baseCD:30,cost:65},
  {id:'gravity2',slot:'e',name:'Gravity Well',desc:'Drop gravity well — anything in 15m gets pulled in',baseCD:38,cost:70},
  {id:'chrono',slot:'e',name:'Chrono Anchor',desc:'Freeze your own IT timer for 4s',baseCD:35,cost:68},
  {id:'landslide',slot:'e',name:'Landslide',desc:'Summon wall of objects rushing 20m forward',baseCD:42,cost:78},
  {id:'sacrifice',slot:'e',name:'Sacrifice',desc:'Give IT to nearest bot — gain +30% speed for 5s',baseCD:35,cost:65},
  {id:'voltwall',slot:'e',name:'Volt Wall',desc:'Electric barrier behind you — shocks IT for 2s',baseCD:28,cost:55},
  {id:'sonic',slot:'e',name:'Sonic Boom',desc:'Burst of speed so fast it knocks back anyone in front',baseCD:18,cost:45},
  {id:'anchor',slot:'e',name:'Gravity Anchor',desc:'Pin IT to ground for 1s — they cannot jump',baseCD:30,cost:58},
  {id:'rocketjump',slot:'e',name:'Rocket Jump',desc:'Explosive jump — 2x height, leaves blast crater',baseCD:16,cost:38},
  {id:'vanish',slot:'e',name:'Vanish',desc:'Completely disappear for 1s — no collision, no tag',baseCD:25,cost:55},
];
const UDEFS=[
  {id:'cooldown',name:'COOLDOWN MASTERY',desc:'-20% all cooldowns per level',max:3},
  {id:'slide',name:'SLIDE EXTENSION',desc:'+40% slide range per level',max:3},
  {id:'jump',name:'HIGH JUMP',desc:'+25% jump height per level',max:3},
];

function loadSave(){
  try{
    const d=JSON.parse(localStorage.getItem('tagpursuit2')||'{}');
    player.coins=d.coins||0;player.matchPoints=d.mp||0;
    player.upgrades=d.upgrades||{cooldown:0,slide:0,jump:0};
    player.ownedSkills=d.owned||[];
    player.equippedQ=d.eqQ||'slide_q';
    player.equippedE=d.eqE||null;
    player.rankPoints=d.rp||0;
    if(d.char)player.character={...player.character,...d.char};
    if(d.binds){BINDS.q=d.binds.q||'KeyQ';BINDS.e=d.binds.e||'KeyE';}
    if(d.lb)leaderboard=d.lb;
  }catch(e){}
}
function doSave(){
  try{localStorage.setItem('tagpursuit2',JSON.stringify({
    coins:player.coins,mp:player.matchPoints,upgrades:player.upgrades,
    owned:player.ownedSkills,eqQ:player.equippedQ,eqE:player.equippedE,
    rp:player.rankPoints,binds:{q:BINDS.q,e:BINDS.e},lb:leaderboard,char:player.character
  }));}catch(e){}
}

let gScreen='menu',gameRunning=false,isPaused=false,gameMode='casual';
let timer=DUR_CASUAL,lastTime=0,selMapIdx=-1,curMap=null;
let rankedRound=0,rankedRoundsTotal=5;
let tagCooldownTimer=0;

const CHAR_ITEMS=[
  {id:'body_red',cat:'body',name:'Crimson',color:0xff2233,cost:5,desc:'Red body'},
  {id:'body_blue',cat:'body',name:'Ocean',color:0x2244ff,cost:5,desc:'Blue body'},
  {id:'body_green',cat:'body',name:'Forest',color:0x22cc44,cost:5,desc:'Green body'},
  {id:'body_gold',cat:'body',name:'Gold',color:0xffd700,cost:10,desc:'Gold body'},
  {id:'body_purple',cat:'body',name:'Phantom',color:0xaa44ff,cost:10,desc:'Purple body'},
  {id:'body_pink',cat:'body',name:'Neon Pink',color:0xff44cc,cost:8,desc:'Pink body'},
  {id:'body_cyan',cat:'body',name:'Cyber Cyan',color:0x00ffee,cost:8,desc:'Cyan body'},
  {id:'body_orange',cat:'body',name:'Blaze',color:0xff7700,cost:7,desc:'Orange body'},
  {id:'body_white',cat:'body',name:'Ghost',color:0xeeeeee,cost:12,desc:'White body'},
  {id:'body_black',cat:'body',name:'Shadow',color:0x111111,cost:15,desc:'Black body'},
  {id:'head_red',cat:'head',name:'Red Head',color:0xff2233,cost:4,desc:'Red head'},
  {id:'head_gold',cat:'head',name:'Gold Head',color:0xffd700,cost:8,desc:'Gold head'},
  {id:'head_silver',cat:'head',name:'Silver',color:0xcccccc,cost:6,desc:'Silver head'},
  {id:'head_purple',cat:'head',name:'Violet',color:0xcc44ff,cost:8,desc:'Purple head'},
  {id:'head_cyan',cat:'head',name:'Ice Head',color:0x44ffee,cost:6,desc:'Cyan head'},
  {id:'trail_fire',cat:'trail',name:'Fire Trail',color:0xff4400,cost:15,desc:'Fiery trail'},
  {id:'trail_ice',cat:'trail',name:'Ice Trail',color:0x88ddff,cost:15,desc:'Icy trail'},
  {id:'trail_gold',cat:'trail',name:'Gold Trail',color:0xffd700,cost:20,desc:'Gold trail'},
  {id:'trail_neon',cat:'trail',name:'Neon Trail',color:0x00ff88,cost:18,desc:'Neon green trail'},
  {id:'trail_void',cat:'trail',name:'Void Trail',color:0x8800ff,cost:25,desc:'Dark purple void'},
  {id:'hat_crown',cat:'hat',name:'Crown',cost:30,desc:'Royal crown (+2% coin bonus)'},
  {id:'hat_cap',cat:'hat',name:'Cap',cost:12,desc:'Baseball cap'},
  {id:'hat_halo',cat:'hat',name:'Halo',cost:25,desc:'Glowing halo'},
  {id:'hat_horns',cat:'hat',name:'Horns',cost:20,desc:'Devil horns'},
  {id:'hat_top',cat:'hat',name:'Top Hat',cost:18,desc:'Classy top hat'},
  {id:'skin_robot',cat:'skin',name:'Robot',cost:40,desc:'Full robot look',bodyColor:0x888899,headColor:0x6688aa},
  {id:'skin_alien',cat:'skin',name:'Alien',cost:35,desc:'Glowing alien',bodyColor:0x22ff66,headColor:0x00cc44},
  {id:'skin_ghost',cat:'skin',name:'Ghost',cost:45,desc:'Transparent ghost',bodyColor:0xddeeff,headColor:0xffffff},
  {id:'skin_ninja',cat:'skin',name:'Ninja',cost:50,desc:'Dark ninja',bodyColor:0x111111,headColor:0x222222},
  {id:'skin_champ',cat:'skin',name:'Champion',cost:80,desc:'Gold champion',bodyColor:0xffd700,headColor:0xffaa00},
];

const player={
  x:0,y:0,z:3,vx:0,vy:0,vz:0,yaw:0,pitch:0,
  isIt:false,isGrounded:false,isSliding:false,isDiving:false,
  slideTimer:0,diveTimer:0,tagImmunity:0,
  wallNX:0,wallNZ:0,wallJumpCd:0,bobTime:0,itTime:0,tagsMade:0,
  coins:0,matchPoints:0,rankPoints:0,
  character:{bodyColor:0x4466ee,headColor:0xffd700,trailColor:0x00ffcc,hat:'none',skin:'default',name:'PLAYER'},
  upgrades:{cooldown:0,slide:0,jump:0},
  ownedSkills:[],equippedQ:'slide_q',equippedE:null,
  skill1CD:0,skill2CD:0,
  speedEff:0,ghostEff:0,sboostEff:0,
  decoyX:null,decoyZ:null,decoyTimer:0,
  sprintEff:0,overclockEff:0,phaseTimer:0,smokeTimer:0,wallrunTimer:0,
  timewarpEff:0,cloakEff:0,shrinkEff:0,levTimer:0,gravFlip:0,
  camoTimer:0,stasisTimer:0,forcefieldTimer:0,moonTimer:0,ejectorTimer:0,
  slowfallTimer:0,hauntedTimer:0,repulsorTimer:0,shieldwallTimer:0,
  homingTimer:0,chronoTimer:0,voltTimer:0,vanishTimer:0,astralTimer:0,
  icepathTimer:0,shieldActive:false,webSlowTimer:0,
  overdriveTimer:0,magnetwallTimer:0,
  _posHistory:[],_inWebLast:false,_wormA:null,
};

const HUMAN_NAMES=['Apex','Raven','Nyx','Striker','Ghost','Rift','Bolt','Cipher'];
let multiPlayers=[];

const bots=[
  {id:0,name:'Shadow',x:60,y:0,z:0,vx:0,vy:0,vz:0,isIt:false,isGrounded:true,itTime:0,tagsMade:0,mesh:null,aiAng:0,stuckT:0,stuckCk:0,pX:60,pZ:0,tagIm:0},
  {id:1,name:'Blaze',x:-60,y:0,z:0,vx:0,vy:0,vz:0,isIt:false,isGrounded:true,itTime:0,tagsMade:0,mesh:null,aiAng:1.6,stuckT:0,stuckCk:0,pX:-60,pZ:0,tagIm:0},
  {id:2,name:'Vex',x:0,y:0,z:-60,vx:0,vy:0,vz:0,isIt:false,isGrounded:true,itTime:0,tagsMade:0,mesh:null,aiAng:3.1,stuckT:0,stuckCk:0,pX:0,pZ:-60,tagIm:0},
];

let leaderboard=[{name:'YOU',wins:0,losses:0,streak:0,rp:0}];
let decoyMesh=null,itLight=null,playerMesh=null;
const chatMsgs=[];
let mapChoices=[];

const canvas=document.getElementById('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=false;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.25;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(82,innerWidth/innerHeight,.05,2200);
camera.rotation.order='YXZ';

window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});

const GC={},MC={};
function bGeo(w,h,d){const k=`${w.toFixed(2)}_${h.toFixed(2)}_${d.toFixed(2)}`;return GC[k]||(GC[k]=new THREE.BoxGeometry(w,h,d));}
function sMat(color,em=0,rough=.75,metal=.1){const k=`${color}_${em}`;return MC[k]||(MC[k]=new THREE.MeshStandardMaterial({color,emissive:em,emissiveIntensity:em?.55:0,roughness:rough,metalness:metal}));}

function buildScene(map){
  while(scene.children.length)scene.remove(scene.children[0]);
  const th=map.theme;
  scene.background=new THREE.Color(th.sky);
  scene.fog=new THREE.FogExp2(th.fog,(th.fe||.02)*0.22);
  const gm=new THREE.Mesh(new THREE.PlaneGeometry(MSZ+400,MSZ+400,60,60),sMat(th.gr,0,.92,.02));
  gm.rotation.x=-Math.PI/2;scene.add(gm);
  const gh=new THREE.GridHelper(MSZ,200,th.l1,th.w);gh.material.opacity=.10;gh.material.transparent=true;scene.add(gh);
  scene.add(new THREE.AmbientLight(th.sky,.55));
  const dl=new THREE.DirectionalLight(0xffffff,.95);dl.position.set(22,38,22);scene.add(dl);
  scene.add(Object.assign(new THREE.PointLight(th.l1,2.2,500),{position:new THREE.Vector3(-250,14,-250)}));
  scene.add(Object.assign(new THREE.PointLight(th.l2,2.2,500),{position:new THREE.Vector3(250,14,250)}));
  scene.add(Object.assign(new THREE.PointLight(th.l1,2.0,480),{position:new THREE.Vector3(250,14,-250)}));
  scene.add(Object.assign(new THREE.PointLight(th.l2,2.0,480),{position:new THREE.Vector3(-250,14,250)}));
  itLight=new THREE.PointLight(0xff2040,0,16);scene.add(itLight);
  if(['space','crystal','dark','cyber'].includes(map.t)){
    const sg=new THREE.BufferGeometry(),sp=new Float32Array(3000*3);
    for(let i=0;i<3000;i++){sp[i*3]=(Math.random()-.5)*380;sp[i*3+1]=25+Math.random()*220;sp[i*3+2]=(Math.random()-.5)*380;}
    sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
    scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:.28,transparent:true,opacity:.85})));
  }
  for(const obs of map.obs){
    const isSpec=obs.type!=='wall'&&obs.type!=='platform'&&obs.type!=='bound';
    const m=new THREE.Mesh(bGeo(obs.w,obs.h,obs.d),sMat(obs.color,isSpec?obs.color:0,obs.type==='slide'?.62:.75));
    m.position.set(obs.x,obs.mnY+obs.h*.5,obs.z);scene.add(m);
    if(obs.type==='slide'){const si=new THREE.Mesh(bGeo(obs.w,.07,obs.d),new THREE.MeshStandardMaterial({color:0x00ffcc,emissive:0x00ffcc,emissiveIntensity:.9}));si.position.set(obs.x,obs.mnY-.04,obs.z);scene.add(si);}
    else if(obs.type==='jump'){const ji=new THREE.Mesh(bGeo(obs.w,.07,obs.d),new THREE.MeshStandardMaterial({color:0xffaa00,emissive:0xffaa00,emissiveIntensity:.9}));ji.position.set(obs.x,obs.mxY+.04,obs.z);scene.add(ji);}
    else if(obs.type==='web'){buildWebMesh(obs,scene);}
  }
  const botCount=gameMode==='multi'?0:3;
  const botColors=[[0x4466ee,0x88aaff,'cap'],[0xff7722,0xffaa44,'horns'],[0x22ffbb,0x44ffcc,'halo']];
  bots.slice(0,botCount).forEach((b,i)=>{if(b.mesh)scene.remove(b.mesh);b.mesh=mkCharMesh(botColors[i][0],botColors[i][1],botColors[i][2],false);b.mesh.position.set(b.x,b.y,b.z);scene.add(b.mesh);});
  multiPlayers.forEach(mp=>{if(mp.mesh)scene.remove(mp.mesh);mp.mesh=mkCharMesh(mp.color,mp.headColor||0xffd700,mp.hat||'none',false);mp.mesh.position.set(mp.x,mp.y,mp.z);scene.add(mp.mesh);});
  decoyMesh=new THREE.Mesh(new THREE.SphereGeometry(.4,8,6),new THREE.MeshStandardMaterial({color:0xffee00,emissive:0xffee00,emissiveIntensity:1.1,transparent:true,opacity:.82}));
  decoyMesh.visible=false;scene.add(decoyMesh);
  if(playerMesh)scene.remove(playerMesh);
  playerMesh=mkCharMesh(player.character.bodyColor,player.character.headColor,player.character.hat,true);
  playerMesh.visible=false;scene.add(playerMesh);
}

function mkCharMesh(bodyCol,headCol,hat,isPlayer){
  const g=new THREE.Group();
  const torso=new THREE.Mesh(bGeo(.65,1.1,.5),sMat(bodyCol,0,.7,.2));torso.position.y=.95;torso.name='torso';g.add(torso);
  const hips=new THREE.Mesh(bGeo(.7,.35,.52),sMat(bodyCol,0,.75,.15));hips.position.y=.45;g.add(hips);
  const lArm=new THREE.Mesh(bGeo(.22,.9,.22),sMat(bodyCol,0,.72,.15));lArm.position.set(.44,.85,0);lArm.name='lArm';g.add(lArm);
  const rArm=new THREE.Mesh(bGeo(.22,.9,.22),sMat(bodyCol,0,.72,.15));rArm.position.set(-.44,.85,0);rArm.name='rArm';g.add(rArm);
  const lLeg=new THREE.Mesh(bGeo(.28,1.0,.3),sMat(bodyCol,0,.75,.1));lLeg.position.set(.22,-.3,0);lLeg.name='lLeg';g.add(lLeg);
  const rLeg=new THREE.Mesh(bGeo(.28,1.0,.3),sMat(bodyCol,0,.75,.1));rLeg.position.set(-.22,-.3,0);rLeg.name='rLeg';g.add(rLeg);
  const headM=new THREE.Mesh(new THREE.SphereGeometry(.32,10,8),sMat(headCol,0,.65,.15));headM.position.y=1.7;headM.name='head';g.add(headM);
  const eMat=new THREE.MeshBasicMaterial({color:0xffffff});
  const pupMat=new THREE.MeshBasicMaterial({color:0x000000});
  [-1,1].forEach(s=>{
    const eye=new THREE.Mesh(new THREE.SphereGeometry(.07,6,4),eMat);eye.position.set(s*.15,.05,.28);headM.add(eye);
    const pup=new THREE.Mesh(new THREE.SphereGeometry(.04,4,4),pupMat);pup.position.set(0,0,.065);eye.add(pup);
  });
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(.1,.018,4,8,Math.PI),new THREE.MeshBasicMaterial({color:0x333333}));
  mouth.position.set(0,-.1,.3);mouth.rotation.z=Math.PI;headM.add(mouth);
  if(hat==='crown'){
    const crown=new THREE.Mesh(bGeo(.55,.25,.55),new THREE.MeshStandardMaterial({color:0xffd700,emissive:0xffaa00,emissiveIntensity:.6,metalness:.8}));
    crown.position.y=.38;headM.add(crown);
    [0,1,2,3].forEach(i=>{const sp=new THREE.Mesh(bGeo(.08,.22,.08),new THREE.MeshStandardMaterial({color:0xffd700,emissive:0xffaa00,emissiveIntensity:.8,metalness:.9}));sp.position.set(Math.cos(i/4*Math.PI*2)*.22,.2,Math.sin(i/4*Math.PI*2)*.22);crown.add(sp);});
  } else if(hat==='halo'){
    const halo=new THREE.Mesh(new THREE.TorusGeometry(.28,.04,6,20),new THREE.MeshStandardMaterial({color:0xffffaa,emissive:0xffff44,emissiveIntensity:2}));
    halo.position.y=.5;halo.rotation.x=Math.PI/2;headM.add(halo);
  } else if(hat==='cap'){
    const brim=new THREE.Mesh(bGeo(.7,.08,.55),sMat(0x223344));brim.position.set(0,.3,.05);headM.add(brim);
    const top=new THREE.Mesh(bGeo(.52,.28,.52),sMat(0x223344));top.position.set(0,.38,-.02);headM.add(top);
  } else if(hat==='horns'){
    [-1,1].forEach(s=>{const h2=new THREE.Mesh(new THREE.ConeGeometry(.08,.28,6),new THREE.MeshStandardMaterial({color:0xff2200,emissive:0xff1100,emissiveIntensity:.5}));h2.position.set(s*.18,.42,0);headM.add(h2);});
  } else if(hat==='top'){
    const tb=new THREE.Mesh(bGeo(.65,.06,.62),sMat(0x111111,.2));tb.position.y=.28;headM.add(tb);
    const tc=new THREE.Mesh(bGeo(.44,.38,.44),sMat(0x111111,.2));tc.position.y=.5;headM.add(tc);
  }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.45,.055,6,18),new THREE.MeshStandardMaterial({color:0xff2040,emissive:0xff2040,emissiveIntensity:1.8}));
  ring.position.y=2.38;ring.name='itr';ring.visible=false;g.add(ring);
  const pl=new THREE.PointLight(0xff2040,0,9);pl.position.y=1.5;pl.name='itpl';g.add(pl);
  return g;
}

function animateCharMesh(mesh,dt,moving,isSliding,isJumping){
  if(!mesh)return;
  const t=Date.now()/1000;
  const torso=mesh.getObjectByName('torso'),lArm=mesh.getObjectByName('lArm'),rArm=mesh.getObjectByName('rArm');
  const lLeg=mesh.getObjectByName('lLeg'),rLeg=mesh.getObjectByName('rLeg'),head=mesh.getObjectByName('head');
  if(isSliding){
    if(torso)torso.rotation.x=.6;if(lArm)lArm.rotation.z=.5;if(rArm)rArm.rotation.z=-.5;
    if(lLeg)lLeg.rotation.x=.3;if(rLeg)rLeg.rotation.x=.5;
  } else if(isJumping){
    if(torso)torso.rotation.x=0;if(lArm){lArm.rotation.x=-.8;lArm.rotation.z=.3;}if(rArm){rArm.rotation.x=-.8;rArm.rotation.z=-.3;}
    if(lLeg)lLeg.rotation.x=-.3;if(rLeg)rLeg.rotation.x=.3;
  } else if(moving){
    const swing=Math.sin(t*8)*.5;
    if(lArm)lArm.rotation.x=-swing;if(rArm)rArm.rotation.x=swing;
    if(lLeg)lLeg.rotation.x=swing;if(rLeg)rLeg.rotation.x=-swing;
    if(torso){torso.rotation.x=0;torso.rotation.z=Math.sin(t*4)*.04;}
  } else {
    const breath=Math.sin(t*1.8)*.02;
    if(torso){torso.rotation.x=0;torso.rotation.z=0;torso.position.y=.95+breath;}
    if(lArm)lArm.rotation.x=.08;if(rArm)rArm.rotation.x=.08;
    if(lLeg)lLeg.rotation.x=0;if(rLeg)rLeg.rotation.x=0;
  }
}

const keys={};let mdX=0,mdY=0,chatOpen=false,prevSpace=false,prevShift=false,prevCtrl=false,prevQ=false,prevE=false;

document.addEventListener('keydown',e=>{
  if(listenBind){
    BINDS[listenBind]=e.code;
    document.getElementById('kb-'+listenBind).textContent=e.code.replace('Key','').replace('Digit','');
    listenBind=null;document.querySelectorAll('.kbkey').forEach(k=>k.classList.remove('listening'));
    doSave();return;
  }
  if(chatOpen){if(e.key==='Enter'){sendChat();return;}if(e.key==='Escape'){closeChat();return;}return;}
  keys[e.code]=true;
  if(e.code==='ShiftRight'&&gameRunning&&!isPaused){document.pointerLockElement===canvas?document.exitPointerLock():canvas.requestPointerLock();return;}
  if(e.code==='KeyM'&&gameRunning&&!isPaused)openChat();
  if(e.code==='Escape'&&gameRunning){isPaused?resumeGame():pauseGame();}
  if(['Space','ShiftLeft','ShiftRight'].includes(e.code))e.preventDefault();
});
document.addEventListener('keyup',e=>{keys[e.code]=false;});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas&&gameRunning&&!isPaused&&!chatOpen){mdX+=e.movementX;mdY+=e.movementY;}});
canvas.addEventListener('click',()=>{if(gameRunning&&!isPaused)canvas.requestPointerLock();});
document.addEventListener('pointerlockchange',()=>{const locked=document.pointerLockElement===canvas;document.getElementById('lockoverlay').style.display=locked?'none':'flex';});

function resolveEnt(e,height,obs){
  e.isGrounded=false;e.wallNX=0;e.wallNZ=0;
  if(e.y<0){e.y=0;if(e.vy<0){e.vy=0;e.isGrounded=true;}}
  for(const o of obs){
    const mnX=e.x-PR,mxX=e.x+PR,mnY=e.y,mxY=e.y+height,mnZ=e.z-PR,mxZ=e.z+PR;
    if(mxX<=o.mnX||mnX>=o.mxX||mxY<=o.mnY||mnY>=o.mxY||mxZ<=o.mnZ||mnZ>=o.mxZ)continue;
    const ovX=Math.min(mxX-o.mnX,o.mxX-mnX),ovY=Math.min(mxY-o.mnY,o.mxY-mnY),ovZ=Math.min(mxZ-o.mnZ,o.mxZ-mnZ);
    if(ovY<ovX&&ovY<ovZ){const mc=(o.mnY+o.mxY)*.5;if(e.y+height*.5<mc){e.y-=ovY;if(e.vy>0)e.vy=0;}else{e.y+=ovY;if(e.vy<0){e.vy=0;e.isGrounded=true;}}}
    else if(ovX<ovZ){const mc=(o.mnX+o.mxX)*.5;if(e.x<mc){e.x-=ovX;e.wallNX=-1;}else{e.x+=ovX;e.wallNX=1;}if((e.x<mc&&e.vx<0)||(e.x>=mc&&e.vx>0))e.vx=0;}
    else{const mc=(o.mnZ+o.mxZ)*.5;if(e.z<mc){e.z-=ovZ;e.wallNZ=-1;}else{e.z+=ovZ;e.wallNZ=1;}if((e.z<mc&&e.vz<0)||(e.z>=mc&&e.vz>0))e.vz=0;}
  }
  e.x=Math.max(-HM+PR,Math.min(HM-PR,e.x));e.z=Math.max(-HM+PR,Math.min(HM-PR,e.z));
}

function updatePlayer(dt){
  const p=player;
  p.yaw-=mdX*.0022;p.pitch-=mdY*.0022;
  p.pitch=Math.max(-1.25,Math.min(1.25,p.pitch));
  mdX=0;mdY=0;
  const fw=keys['KeyW']||keys['ArrowUp'],bw=keys['KeyS']||keys['ArrowDown'];
  const lf=keys['KeyA']||keys['ArrowLeft'],rt=keys['KeyD']||keys['ArrowRight'];
  const spNow=keys['Space'],shNow=keys['ShiftLeft'],ctNow=keys['ControlLeft']||keys['ControlRight'];
  const qNow=keys[BINDS.q],eNow=keys[BINDS.e];
  if(p.skill1CD>0)p.skill1CD=Math.max(0,p.skill1CD-dt);
  if(p.skill2CD>0)p.skill2CD=Math.max(0,p.skill2CD-dt);
  if(p.tagImmunity>0)p.tagImmunity=Math.max(0,p.tagImmunity-dt);
  if(p.wallJumpCd>0)p.wallJumpCd=Math.max(0,p.wallJumpCd-dt);
  if(p.speedEff>0)p.speedEff=Math.max(0,p.speedEff-dt);
  if(p.ghostEff>0)p.ghostEff=Math.max(0,p.ghostEff-dt);
  if(p.sboostEff>0)p.sboostEff=Math.max(0,p.sboostEff-dt);
  if(p.sprintEff>0)p.sprintEff=Math.max(0,p.sprintEff-dt);
  if(p.overclockEff>0){p.overclockEff=Math.max(0,p.overclockEff-dt);if(p.overclockEff<=0){p.vx*=0.2;p.vz*=0.2;showStat('OVERCLOCKED OUT!');}}
  if(p.phaseTimer>0)p.phaseTimer=Math.max(0,p.phaseTimer-dt);
  if(p.smokeTimer>0)p.smokeTimer=Math.max(0,p.smokeTimer-dt);
  if(p.wallrunTimer>0){p.wallrunTimer=Math.max(0,p.wallrunTimer-dt);if(Math.abs(p.wallNX)>.5||Math.abs(p.wallNZ)>.5)p.vy=Math.max(p.vy,0);}
  if(p.timewarpEff>0)p.timewarpEff=Math.max(0,p.timewarpEff-dt);
  if(p.cloakEff>0)p.cloakEff=Math.max(0,p.cloakEff-dt);
  if(p.shrinkEff>0)p.shrinkEff=Math.max(0,p.shrinkEff-dt);
  if(p.levTimer>0){p.levTimer=Math.max(0,p.levTimer-dt);p.vy=Math.max(p.vy,0);}
  if(p.gravFlip>0)p.gravFlip=Math.max(0,p.gravFlip-dt);
  if(p.camoTimer>0)p.camoTimer=Math.max(0,p.camoTimer-dt);
  if(p.stasisTimer>0){p.stasisTimer=Math.max(0,p.stasisTimer-dt);p.vx=0;p.vz=0;}
  if(p.forcefieldTimer>0)p.forcefieldTimer=Math.max(0,p.forcefieldTimer-dt);
  if(p.moonTimer>0){p.moonTimer=Math.max(0,p.moonTimer-dt);}
  if(p.ejectorTimer>0){p.ejectorTimer=Math.max(0,p.ejectorTimer-dt);p.vy=Math.max(p.vy,-2);}
  if(p.slowfallTimer>0){p.slowfallTimer=Math.max(0,p.slowfallTimer-dt);if(p.vy<0)p.vy*=0.3;}
  if(p.hauntedTimer>0){
    p.hauntedTimer=Math.max(0,p.hauntedTimer-dt);
    if(!p._hauntCD)p._hauntCD=0;p._hauntCD-=dt;
    if(p._hauntCD<=0&&p.hauntedTimer>0){p._hauntCD=0.5;
      const hg=new THREE.Mesh(new THREE.SphereGeometry(.4,6,5),new THREE.MeshStandardMaterial({color:0xaaaaff,emissive:0x8888ff,emissiveIntensity:.8,transparent:true,opacity:.5}));
      hg.position.set(p.x,p.y+.9,p.z);scene.add(hg);setTimeout(()=>scene.remove(hg),1500);}
  }
  if(p.repulsorTimer>0){p.repulsorTimer=Math.max(0,p.repulsorTimer-dt);bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;if(dl<18){b.vx+=dx/dl*12;b.vz+=dz/dl*12;}});}
  if(p.shieldwallTimer>0)p.shieldwallTimer=Math.max(0,p.shieldwallTimer-dt);
  if(p.homingTimer>0){p.homingTimer=Math.max(0,p.homingTimer-dt);const tgt=!p.isIt?bots.find(b=>b.isIt):bots.find(b=>!b.isIt);if(tgt&&p.homingTimer>0){const dx=tgt.x-p.x,dz=tgt.z-p.z,dl=Math.hypot(dx,dz)||1;p.vx+=dx/dl*8;p.vz+=dz/dl*8;}}
  if(p.chronoTimer>0)p.chronoTimer=Math.max(0,p.chronoTimer-dt);
  if(p.voltTimer>0)p.voltTimer=Math.max(0,p.voltTimer-dt);
  if(p.vanishTimer>0)p.vanishTimer=Math.max(0,p.vanishTimer-dt);
  if(p.astralTimer>0)p.astralTimer=Math.max(0,p.astralTimer-dt);
  if(p.overdriveTimer>0)p.overdriveTimer=Math.max(0,p.overdriveTimer-dt);
  if(p.gravFlip>0&&p.vy<0)p.vy=Math.abs(p.vy)*.5;
  if(p.moonTimer>0)p.vy=Math.max(p.vy,-2);
  if(!p._posHistory)p._posHistory=[];
  p._posHistory.unshift({x:p.x,y:p.y,z:p.z});
  if(p._posHistory.length>120)p._posHistory.pop();
  bots.forEach(b=>{
    if(b.freezeTimer>0){b.freezeTimer=Math.max(0,b.freezeTimer-dt);b.vx=0;b.vz=0;}
    if(b.slowTimer>0)b.slowTimer=Math.max(0,b.slowTimer-dt);
    if(b.dazed>0){b.dazed=Math.max(0,b.dazed-dt);b.vx*=-0.5;b.vz*=-0.5;}
    if(b.tethered>0){b.tethered=Math.max(0,b.tethered-dt);b.vx=0;b.vz=0;b.vy=0;}
    if(b.anchored>0){b.anchored=Math.max(0,b.anchored-dt);b.vy=0;}
    if(b.siphoned>0)b.siphoned=Math.max(0,b.siphoned-dt);
    if(b.shrinkTimer>0)b.shrinkTimer=Math.max(0,b.shrinkTimer-dt);
    if(b.gravOff>0)b.gravOff=Math.max(0,b.gravOff-dt);
  });
  if(tagCooldownTimer>0)tagCooldownTimer=Math.max(0,tagCooldownTimer-dt);
  if(p.decoyTimer>0){p.decoyTimer=Math.max(0,p.decoyTimer-dt);if(p.decoyTimer<=0){if(decoyMesh)decoyMesh.visible=false;p.decoyX=p.decoyZ=null;}}
  const slideKey=shNow||(qNow&&p.equippedQ==='slide_q');
  if(slideKey&&!prevShift&&p.isGrounded&&!p.isSliding){p.isSliding=true;p.slideTimer=(p.sboostEff>0?2.5:1.6)*(1+p.upgrades.slide*.4);}
  if(p.isSliding){p.slideTimer-=dt;if(p.slideTimer<=0||(!slideKey&&p.isGrounded))p.isSliding=false;}
  if(ctNow&&!prevCtrl&&!p.isGrounded&&!p.isDiving){p.isDiving=true;p.diveTimer=.4;p.vy=-9;p.vx+=Math.sin(p.yaw)*14;p.vz+=Math.cos(p.yaw)*14;showStat('DIVE!');}
  if(p.isDiving){p.diveTimer-=dt;if(p.diveTimer<=0)p.isDiving=false;}
  const sm=p.speedEff>0?1.65:p.sprintEff>0?2.2:p.overclockEff>0?3.2:1;
  const sp=(p.isSliding?SSPD*(p.sboostEff>0?2:1):SPD)*sm;
  const jf=JF*(1+p.upgrades.jump*.25);
  const sin=Math.sin(p.yaw),cos=Math.cos(p.yaw);
  let mx=0,mz=0;
  if(fw){mx-=sin;mz-=cos;}if(bw){mx+=sin;mz+=cos;}if(lf){mx-=cos;mz+=sin;}if(rt){mx+=cos;mz-=sin;}
  const ml=Math.sqrt(mx*mx+mz*mz);if(ml>0){mx/=ml;mz/=ml;}
  if(!p.isDiving){p.vx=mx*sp;p.vz=mz*sp;}
  p.vy+=GRV*dt;
  if(spNow&&!prevSpace){
    if(p.isGrounded){p.vy=jf;p.isGrounded=false;p.isSliding=false;}
    else if((Math.abs(p.wallNX)>.5||Math.abs(p.wallNZ)>.5)&&p.wallJumpCd<=0){p.vy=jf*.88;p.vx=-p.wallNX*jf*.85;p.vz=-p.wallNZ*jf*.85;p.wallJumpCd=.35;player.coins+=1;showStat('WALL JUMP! +1');}
  }
  if(qNow&&!prevQ&&p.equippedQ!=='slide_q')activateSkill('q');
  if(eNow&&!prevE)activateSkill('e');
  prevSpace=spNow;prevShift=shNow||qNow;prevCtrl=ctNow;prevQ=qNow;prevE=eNow;
  p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
  resolveEnt(p,p.isSliding?SH:PH,curMap.obs);
  let inWeb=false;
  if(!p.phaseTimer||p.phaseTimer<=0){
    for(const o of curMap.obs){
      if(o.type!=='web')continue;
      if(p.x>o.mnX&&p.x<o.mxX&&p.y<o.mxY&&p.y+PH>o.mnY&&p.z>o.mnZ&&p.z<o.mxZ){
        inWeb=true;p.vx*=0.18;p.vz*=0.18;if(p.vy<0)p.vy*=0.12;p.isGrounded=false;
        if(!p._inWebLast)showStat('CAUGHT IN WEB!');break;
      }
    }
  }
  p._inWebLast=inWeb;
  for(const o of curMap.obs){
    if(o.type==='launchpad'&&p.x>o.mnX&&p.x<o.mxX&&p.y<=o.mxY+0.3&&p.z>o.mnZ&&p.z<o.mxZ){p.vy=40;p.isGrounded=false;showStat('LAUNCHED!');break;}
  }
  for(const o of curMap.obs){
    if(o.type==='mine'&&Math.hypot(p.x-o.x,p.z-o.z)<2.5&&Math.abs(p.y-o.mnY)<1.5){
      const dx=p.x-o.x,dz=p.z-o.z,dl=Math.hypot(dx,dz)||1;
      p.vx+=dx/dl*45;p.vz+=dz/dl*45;p.vy=14;
      const idx=curMap.obs.indexOf(o);if(idx>-1)curMap.obs.splice(idx,1);
      showStat('MINE TRIGGERED!');doShake(0.8);break;
    }
  }
  if(ml>0&&p.isGrounded)p.bobTime+=dt*9.5;
  if(p.isIt&&(!p.chronoTimer||p.chronoTimer<=0))p.itTime+=dt;
}

function activateSkill(slot){
  const p=player,sid=slot==='q'?p.equippedQ:p.equippedE;
  if(!sid||sid==='slide_q')return;
  if(slot==='q'&&p.skill1CD>0)return;
  if(slot==='e'&&p.skill2CD>0)return;
  const def=SDEFS.find(s=>s.id===sid);if(!def)return;
  const cd=def.baseCD*(1-p.upgrades.cooldown*.2);
  if(slot==='q')p.skill1CD=cd;else p.skill2CD=cd;
  switch(sid){
    case'speed':p.speedEff=3;showStat('SPEED SURGE!');break;
    case'juke':{const side=Math.random()>.5?1:-1,s2=Math.sin(p.yaw+Math.PI/2),c2=Math.cos(p.yaw+Math.PI/2);p.vx+=s2*side*14;p.vz+=c2*side*14;showStat('JUKE FLASH!');break;}
    case'decoy':p.decoyX=p.x;p.decoyZ=p.z;p.decoyTimer=5;if(decoyMesh){decoyMesh.position.set(p.x,.9,p.z);decoyMesh.visible=true;}showStat('DECOY DROPPED!');break;
    case'ghost':p.ghostEff=2;showStat('GHOST STEP!');break;
    case'dash':if(!p.isGrounded){p.vx+=Math.sin(p.yaw)*22;p.vz+=Math.cos(p.yaw)*22;showStat('AIR DASH!');}break;
    case'sboost':p.sboostEff=3;p.isSliding=true;p.slideTimer=3;showStat('SLIDE BOOST!');break;
    case'blink':p.x+=Math.sin(p.yaw)*-10;p.z+=Math.cos(p.yaw)*-10;showStat('BLINK!');break;
    case'smokeq':p.smokeTimer=3;showStat('SMOKE SCREEN!');break;
    case'wallrun':p.wallrunTimer=2;showStat('WALL RUN!');break;
    case'webshot':{const wx=p.x+Math.sin(p.yaw)*-10,wz=p.z+Math.cos(p.yaw)*-10;const fakeWeb={x:wx,yb:0,z:wz,w:4,h:3,d:4,type:'web',color:0x885599,mnX:wx-2,mxX:wx+2,mnY:0,mxY:3,mnZ:wz-2,mxZ:wz+2};curMap.obs.push(fakeWeb);buildWebMesh(fakeWeb,scene);setTimeout(()=>{const idx=curMap.obs.indexOf(fakeWeb);if(idx>-1)curMap.obs.splice(idx,1);},4000);showStat('WEB FIRED!');break;}
    case'sprint':p.sprintEff=1;showStat('SPRINT BURST!');break;
    case'feint':p.vx*=-1.5;p.vz*=-1.5;showStat('FEINT!');break;
    case'grapple':{let bd=999,bx=p.x,bz=p.z;for(const o of curMap.obs){if(o.type==='bound')continue;const cd2=Math.hypot(o.x-p.x,o.z-p.z);if(cd2<bd&&cd2<60){bd=cd2;bx=o.x;bz=o.z;}}if(bd<60){const dx=bx-p.x,dz=bz-p.z,dl=Math.hypot(dx,dz);p.vx=dx/dl*45;p.vz=dz/dl*45;p.vy=8;showStat('GRAPPLE!');}break;}
    case'flashstep':for(let fi=0;fi<3;fi++)setTimeout(()=>{p.x+=Math.sin(p.yaw)*-5;p.z+=Math.cos(p.yaw)*-5;},fi*80);showStat('FLASH STEP!');break;
    case'phase':p.phaseTimer=0.4;showStat('PHASE SHIFT!');break;
    case'shield':p.shieldActive=true;showStat('SHIELD UP!');break;
    case'hijump':p.vy=JF*3;showStat('SUPER JUMP!');break;
    case'webtrap':{const ftw={x:p.x,yb:0,z:p.z,w:4,h:3,d:4,type:'web',color:0x885599,mnX:p.x-2,mxX:p.x+2,mnY:0,mxY:3,mnZ:p.z-2,mxZ:p.z+2};curMap.obs.push(ftw);buildWebMesh(ftw,scene);setTimeout(()=>{const idx=curMap.obs.indexOf(ftw);if(idx>-1)curMap.obs.splice(idx,1);},5000);showStat('WEB DEPLOYED!');break;}
    case'recall':p.x=0;p.y=0;p.z=3;p.vx=p.vy=p.vz=0;showStat('RECALLED!');break;
    case'vortex':bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;b.vx+=dx/dl*28;b.vz+=dz/dl*28;});showStat('VORTEX!');break;
    case'overclock':p.overclockEff=0.8;showStat('OVERCLOCK!');break;
    case'zipline':{const ang=p.yaw;p.x+=Math.sin(ang)*-HM*.3;p.z+=Math.cos(ang)*-HM*.3;p.vx=Math.sin(ang)*-50;p.vz=Math.cos(ang)*-50;showStat('ZIPLINE!');break;}
    case'mirror':{const itB=bots.find(b=>b.isIt);if(itB){const dx=itB.x-p.x,dz=itB.z-p.z,dl=Math.hypot(dx,dz)||1;p.vx=-dx/dl*SPD*1.4;p.vz=-dz/dl*SPD*1.4;showStat('MIRROR DASH!');}break;}
    case'timewarp':p.timewarpEff=2;showStat('TIME WARP!');break;
    case'doublejump':if(!p.isGrounded){p.vy=JF*.95;showStat('DOUBLE JUMP!');}break;
    case'groundslam':p.vy=-28;p.isDiving=true;p.diveTimer=.3;bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;if(dl<12){b.vx+=dx/dl*32;b.vz+=dz/dl*32;}});showStat('GROUND SLAM!');break;
    case'cloak':p.cloakEff=3;showStat('CLOAKED!');break;
    case'ricochet':{p.vx+=Math.sin(p.yaw)*-30;p.vz+=Math.cos(p.yaw)*-30;setTimeout(()=>{p.vx*=-0.8;p.vz*=-0.8;},350);showStat('RICOCHET!');break;}
    case'adrenaline':if(p.isIt){p.speedEff=4;showStat('ADRENALINE!');}break;
    case'webpurge':showStat('WEB PURGED!');break;
    case'clone':{if(decoyMesh){decoyMesh.position.set(p.x,p.y,p.z);decoyMesh.visible=true;p.decoyX=p.x;p.decoyZ=p.z;p.decoyTimer=4;}p.vx+=Math.sin(p.yaw)*-45;p.vz+=Math.cos(p.yaw)*-45;showStat('CLONE DASH!');break;}
    case'shrink':p.shrinkEff=3;showStat('SHRUNK!');break;
    case'magnet':if(p.isIt){const near=bots.reduce((mn,b)=>Math.hypot(b.x-p.x,b.z-p.z)<Math.hypot(mn.x-p.x,mn.z-p.z)?b:mn,bots[0]);if(Math.hypot(near.x-p.x,near.z-p.z)<6){near.isIt=true;near.tagIm=1.2;p.isIt=false;p.tagImmunity=1.2;tagCooldownTimer=TAG_COOLDOWN;p.tagsMade++;showStat('MAGNET TAG!');}}break;
    case'airburst':p.vy=40;showStat('AIR BURST!');break;
    case'boomerang':{const ox=p.x,oz=p.z;p.vx+=Math.sin(p.yaw)*-40;p.vz+=Math.cos(p.yaw)*-40;setTimeout(()=>{p.vx=(ox-p.x)*4;p.vz=(oz-p.z)*4;},400);showStat('BOOMERANG!');break;}
    case'icepath':p.icepathTimer=3;showStat('ICE PATH!');break;
    case'earthquake':bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<20){b.vx=(Math.random()-.5)*20;b.vz=(Math.random()-.5)*20;b.vy=4;}});showStat('EARTHQUAKE!');break;
    case'levitate':p.vy=18;p.levTimer=2;showStat('LEVITATE!');break;
    case'turbo':p.speedEff=5;showStat('TURBO!');break;
    case'launchpad':{const lp={x:p.x,yb:0,z:p.z,w:3,h:.3,d:3,type:'launchpad',color:0x00ff88,mnX:p.x-1.5,mxX:p.x+1.5,mnY:0,mxY:.3,mnZ:p.z-1.5,mxZ:p.z+1.5};curMap.obs.push(lp);setTimeout(()=>{const idx=curMap.obs.indexOf(lp);if(idx>-1)curMap.obs.splice(idx,1);},8000);showStat('LAUNCH PAD!');break;}
    case'gravity':p.gravFlip=1.5;showStat('GRAVITY FLIP!');break;
    case'tornado':p.vx=0;p.vz=0;bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;if(dl<14){b.vx+=dx/dl*25;b.vz+=dz/dl*25;b.vy+=6;}});showStat('TORNADO!');break;
    case'camouflage':p.camoTimer=4;showStat('CAMOUFLAGE!');break;
    case'stasis':p.stasisTimer=1.5;showStat('STASIS!');break;
    case'nitro':{p.vx=Math.sin(p.yaw)*-80;p.vz=Math.cos(p.yaw)*-80;showStat('NITRO!');break;}
    case'banish':{const bb=bots.find(b=>b.isIt);if(bb){bb.x=(Math.random()>.5?1:-1)*HM*.88;bb.z=(Math.random()>.5?1:-1)*HM*.88;showStat('BANISHED!');}break;}
    case'shadowstep':{p.x+=Math.sin(p.yaw)*-6;p.z+=Math.cos(p.yaw)*-6;showStat('SHADOW STEP!');break;}
    case'landmine':{const lm={x:p.x,yb:0,z:p.z,w:2,h:.4,d:2,type:'mine',color:0xff4400,mnX:p.x-1,mxX:p.x+1,mnY:0,mxY:.4,mnZ:p.z-1,mxZ:p.z+1};curMap.obs.push(lm);setTimeout(()=>{const idx=curMap.obs.indexOf(lm);if(idx>-1)curMap.obs.splice(idx,1);},12000);showStat('LAND MINE!');break;}
    case'rubberband':p.vx*=-1.8;p.vz*=-1.8;showStat('RUBBER BAND!');break;
    case'forcefield':p.forcefieldTimer=1;showStat('FORCE FIELD!');break;
    case'webmine':{const wm2={x:p.x,yb:0,z:p.z,w:3,h:2,d:3,type:'web',color:0x885599,mnX:p.x-1.5,mxX:p.x+1.5,mnY:0,mxY:2,mnZ:p.z-1.5,mxZ:p.z+1.5};curMap.obs.push(wm2);buildWebMesh(wm2,scene);setTimeout(()=>{const idx=curMap.obs.indexOf(wm2);if(idx>-1)curMap.obs.splice(idx,1);},6000);showStat('WEB MINE!');break;}
    case'timefreeze':bots.forEach(b=>{b.vx=0;b.vz=0;b.freezeTimer=1;});showStat('TIME FREEZE!');break;
    case'swap':{const nb=bots.reduce((mn,b)=>Math.hypot(b.x-p.x,b.z-p.z)<Math.hypot(mn.x-p.x,mn.z-p.z)?b:mn,bots[0]);const tx=p.x,tz=p.z;p.x=nb.x;p.z=nb.z;nb.x=tx;nb.z=tz;showStat('SWAPPED!');break;}
    case'magnetwall':p.magnetwallTimer=2;showStat('MAGNET WALL!');break;
    case'rewind':{if(p._posHistory&&p._posHistory.length>0){const old=p._posHistory[0];p.x=old.x;p.y=old.y;p.z=old.z;p.vx=p.vy=p.vz=0;showStat('REWIND!');}break;}
    case'shockwave':bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;b.vx+=dx/dl*40;b.vz+=dz/dl*40;});showStat('SHOCKWAVE!');break;
    case'haunted':p.hauntedTimer=4;showStat('HAUNTED TRAIL!');break;
    case'tesla':{const tel={x:p.x,yb:0,z:p.z,w:2,h:4,d:2,type:'mine',color:0x00aaff,mnX:p.x-1,mxX:p.x+1,mnY:0,mxY:4,mnZ:p.z-1,mxZ:p.z+1};curMap.obs.push(tel);setTimeout(()=>{const idx=curMap.obs.indexOf(tel);if(idx>-1)curMap.obs.splice(idx,1);},8000);showStat('TESLA COIL!');break;}
    case'portal':{p.x=(Math.random()-.5)*(MSZ-40);p.z=(Math.random()-.5)*(MSZ-40);p.y=2;p.vx=p.vy=p.vz=0;showStat('PORTAL!');break;}
    case'shrinkbeam':{const itbs=bots.find(b=>b.isIt);if(itbs)itbs.shrinkTimer=3;showStat('SHRINK BEAM!');break;}
    case'moonwalk':p.moonTimer=3;showStat('MOON WALK!');break;
    case'ejector':p.vy=55;p.ejectorTimer=3;showStat('EJECTOR!');break;
    case'doppel':{if(decoyMesh){decoyMesh.position.set(p.x,.9,p.z);decoyMesh.visible=true;p.decoyX=p.x;p.decoyZ=p.z;p.decoyTimer=3;}showStat('DOPPELGANGER!');break;}
    case'slowfall':p.slowfallTimer=4;showStat('SLOW FALL!');break;
    case'blastjump':p.vx+=Math.sin(p.yaw)*-28;p.vz+=Math.cos(p.yaw)*-28;p.vy=18;showStat('BLAST JUMP!');break;
    case'pullback':{const itbp=bots.find(b=>b.isIt);if(itbp){const dx=p.x-itbp.x,dz=p.z-itbp.z,dl=Math.hypot(dx,dz)||1;itbp.vx+=dx/dl*40;itbp.vz+=dz/dl*40;}showStat('PULL BACK!');break;}
    case'superdive':p.vy=-50;p.isDiving=true;p.diveTimer=.5;bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<15){b.vx=(b.x-p.x)*3;b.vz=(b.z-p.z)*3;}});showStat('SUPER DIVE!');break;
    case'jailbreak':{if(p.isIt){const nb2=bots.reduce((mn,b)=>Math.hypot(b.x-p.x,b.z-p.z)<Math.hypot(mn.x-p.x,mn.z-p.z)?b:mn,bots[0]);nb2.isIt=true;nb2.tagIm=1.5;p.isIt=false;p.tagImmunity=1.5;showStat('JAILBREAK!');}break;}
    case'daze':{const itbd=bots.find(b=>b.isIt);if(itbd)itbd.dazed=2;showStat('DAZE!');break;}
    case'tether':{const itbt=bots.find(b=>b.isIt);if(itbt)itbt.tethered=1.5;showStat('TETHER!');break;}
    case'flashbang':bots.forEach(b=>b.stunTimer=(b.stunTimer||0)+1.5);showStat('FLASH BANG!');break;
    case'blackhole':{const bhx=p.x+Math.sin(p.yaw)*-15,bhz=p.z+Math.cos(p.yaw)*-15;const iv=setInterval(()=>{bots.forEach(b=>{const dx=bhx-b.x,dz=bhz-b.z,dl=Math.hypot(dx,dz)||1;if(dl<20){b.vx+=dx/dl*8;b.vz+=dz/dl*8;}});},50);setTimeout(()=>clearInterval(iv),2000);showStat('BLACK HOLE!');break;}
    case'antigrav':bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<20){b.vy=12;b.gravOff=2;}});showStat('ANTI-GRAV!');break;
    case'overdrive':p.overdriveTimer=1.5;p.speedEff=4;showStat('OVERDRIVE!');break;
    case'echo':{for(let ei=0;ei<4;ei++)setTimeout(()=>{p.vx+=Math.sin(p.yaw)*-25;p.vz+=Math.cos(p.yaw)*-25;},ei*120);showStat('ECHO DASH!');break;}
    case'repulsor':p.repulsorTimer=2;showStat('REPULSOR!');break;
    case'phoenix':{if(p.isIt){bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;if(dl<15){b.vx+=dx/dl*30;b.vz+=dz/dl*30;}});}showStat('PHOENIX!');break;}
    case'siphon':{const itbs2=bots.find(b=>b.isIt);if(itbs2)itbs2.siphoned=3;p.speedEff=3;showStat('SIPHON!');break;}
    case'wormhole':{
      if(!p._wormA){p._wormA={x:p.x,z:p.z};
        const wm=new THREE.Mesh(new THREE.TorusGeometry(2,.2,8,32),new THREE.MeshStandardMaterial({color:0x00ffcc,emissive:0x00ffcc,emissiveIntensity:2}));
        wm.rotation.x=Math.PI/2;wm.position.set(p.x,.5,p.z);scene.add(wm);p._wormAMesh=wm;showStat('PORTAL A SET!');
      } else {if(p._wormAMesh)scene.remove(p._wormAMesh);const wa=p._wormA;p._wormA=null;p._wormAMesh=null;p.x=wa.x;p.y=1;p.z=wa.z;p.vx=p.vy=p.vz=0;showStat('WORMHOLE!');}
      break;}
    case'shieldwall':p.shieldwallTimer=2;showStat('SHIELD WALL!');break;
    case'homing':if(p.isIt){p.homingTimer=2;showStat('HOMING!');}break;
    case'netgun':{bots.forEach(b=>{const dx=b.x-p.x,dz=b.z-p.z,dl=Math.hypot(dx,dz)||1;const dot=-(Math.sin(p.yaw)*dx+Math.cos(p.yaw)*dz)/dl;if(dot>.7&&dl<25)b.freezeTimer=3;});showStat('NET GUN!');break;}
    case'blizzard':bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<45)b.slowTimer=(b.slowTimer||0)+3;});showStat('BLIZZARD!');break;
    case'astral':p.astralTimer=2;p.ghostEff=2;showStat('ASTRAL FORM!');break;
    case'timeloop':{if(p._posHistory&&p._posHistory.length>60){const old2=p._posHistory[59];p.x=old2.x;p.y=old2.y;p.z=old2.z;p.vx=p.vy=p.vz=0;showStat('TIME LOOP!');}break;}
    case'gravity2':{const gw={x:p.x+Math.sin(p.yaw)*-12,z:p.z+Math.cos(p.yaw)*-12};const iv2=setInterval(()=>{bots.forEach(b=>{const dx=gw.x-b.x,dz=gw.z-b.z,dl=Math.hypot(dx,dz)||1;if(dl<18){b.vx+=dx/dl*6;b.vz+=dz/dl*6;}});},50);setTimeout(()=>clearInterval(iv2),2500);showStat('GRAVITY WELL!');break;}
    case'chrono':p.chronoTimer=4;showStat('CHRONO ANCHOR!');break;
    case'landslide':bots.forEach(b=>{const dx=Math.sin(p.yaw)*-1,dz=Math.cos(p.yaw)*-1;b.vx+=dx*35;b.vz+=dz*35;});showStat('LANDSLIDE!');break;
    case'sacrifice':{if(p.isIt){const nb5=bots.reduce((mn,b)=>Math.hypot(b.x-p.x,b.z-p.z)<Math.hypot(mn.x-p.x,mn.z-p.z)?b:mn,bots[0]);nb5.isIt=true;nb5.tagIm=1;p.isIt=false;p.tagImmunity=1;p.speedEff=5;showStat('SACRIFICE!');}break;}
    case'voltwall':p.voltTimer=2;showStat('VOLT WALL!');break;
    case'sonic':{p.vx+=Math.sin(p.yaw)*-60;p.vz+=Math.cos(p.yaw)*-60;bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<12){b.vx+=(b.x-p.x)*5;b.vz+=(b.z-p.z)*5;}});showStat('SONIC BOOM!');break;}
    case'anchor':{const itba=bots.find(b=>b.isIt);if(itba)itba.anchored=1;showStat('ANCHOR!');break;}
    case'rocketjump':p.vx+=Math.sin(p.yaw)*-15;p.vz+=Math.cos(p.yaw)*-15;p.vy=28;bots.forEach(b=>{if(Math.hypot(b.x-p.x,b.z-p.z)<10){b.vx+=(b.x-p.x)*3;b.vz+=(b.z-p.z)*3;}});showStat('ROCKET JUMP!');break;
    case'vanish':p.vanishTimer=1;p.ghostEff=1;showStat('VANISH!');break;
    case'chain':{if(p.isIt){const nb3=bots.find(b=>!b.isIt&&Math.hypot(b.x-p.x,b.z-p.z)<6);if(nb3){nb3.isIt=true;nb3.tagIm=1;const nb4=bots.filter(b=>!b.isIt&&b!==nb3).reduce((mn,b)=>Math.hypot(b.x-nb3.x,b.z-nb3.z)<Math.hypot(mn.x-nb3.x,mn.z-nb3.z)?b:mn,bots[0]);if(nb4&&Math.hypot(nb4.x-nb3.x,nb4.z-nb3.z)<8){nb4.isIt=true;nb3.isIt=false;}p.isIt=false;showStat('CHAIN TAG!');}}break;}
    case'decoy2':{for(let di=0;di<3;di++){const ang2=di/3*Math.PI*2;const dx2=p.x+Math.cos(ang2)*20,dz2=p.z+Math.sin(ang2)*20;const fd={x:dx2,yb:0,z:dz2,w:1,h:2,d:1,type:'bound',color:0xffff00,mnX:dx2-.5,mxX:dx2+.5,mnY:0,mxY:2,mnZ:dz2-.5,mxZ:dz2+.5};curMap.obs.push(fd);setTimeout(()=>{const idx=curMap.obs.indexOf(fd);if(idx>-1)curMap.obs.splice(idx,1);},6000);}showStat('TRIPLE DECOY!');break;}
    case'phantomstep':showStat('PHANTOM STEP!');break;
    case'mimic':{const itbm=bots.find(b=>b.isIt);if(itbm&&itbm._lastSkill){const oldE=player.equippedE;player.equippedE=itbm._lastSkill;player.skill2CD=0;activateSkill('e');player.equippedE=oldE;showStat('MIMIC!');}else showStat('NOTHING TO MIMIC');break;}
    case'inviswall':showStat('INVIS WALL!');break;
  }
}

function updateBots(dt){
  if(gameMode==='practice')return;
  const itEnt=player.isIt?player:(bots.find(b=>b.isIt)||null);
  const activeBots=gameMode==='multi'?[]:bots;
  for(const b of activeBots){
    if(b.tagIm>0)b.tagIm=Math.max(0,b.tagIm-dt);
    if(b.isIt)b.itTime+=dt;
    if(!b.gravOff||b.gravOff<=0)b.vy+=GRV*dt;else b.gravOff=Math.max(0,b.gravOff-dt);
    let tx,tz;
    if(b.isIt){
      if(player.decoyX!==null){tx=player.decoyX;tz=player.decoyZ;}
      else{let md=999,tgt=null;const cs=[...bots.filter(x=>!x.isIt),player.isIt?null:player].filter(Boolean);for(const c of cs){const dd=Math.hypot(c.x-b.x,c.z-b.z);if(dd<md){md=dd;tgt=c;}}if(tgt){tx=tgt.x;tz=tgt.z;}else{tx=b.x+Math.cos(b.aiAng)*8;tz=b.z+Math.sin(b.aiAng)*8;}}
    } else {
      if(itEnt){const fdx=b.x-itEnt.x,fdz=b.z-itEnt.z,fd=Math.hypot(fdx,fdz);if(fd<.5){tx=b.x+Math.cos(b.aiAng)*12;tz=b.z+Math.sin(b.aiAng)*12;}else{tx=b.x+fdx/fd*14;tz=b.z+fdz/fd*14;}}
      else{tx=b.x+Math.cos(b.aiAng)*8;tz=b.z+Math.sin(b.aiAng)*8;}
    }
    const ddx=tx-b.x,ddz=tz-b.z,dd=Math.hypot(ddx,ddz);
    let mvX=0,mvZ=0;if(dd>.4){mvX=ddx/dd;mvZ=ddz/dd;}
    b.stuckCk-=dt;
    if(b.stuckCk<=0){const moved=Math.hypot(b.x-b.pX,b.z-b.pZ);if(moved<.35){b.aiAng+=(Math.random()-.5)*Math.PI*1.5;b.stuckT=.9;}b.pX=b.x;b.pZ=b.z;b.stuckCk=1.4;}
    if(b.stuckT>0){b.stuckT-=dt;mvX=Math.cos(b.aiAng);mvZ=Math.sin(b.aiAng);}
    let bspd2=player.timewarpEff>0?BSPD*0.5:BSPD;
    if(b.slowTimer>0)bspd2*=0.4;
    if(b.siphoned>0)bspd2*=0.6;
    if(b.dazed>0){mvX*=-1;mvZ*=-1;}
    if(b.tethered>0){mvX=0;mvZ=0;}
    if(b.anchored>0){mvX=0;mvZ=0;}
    if(b.freezeTimer>0){mvX=0;mvZ=0;bspd2=0;}
    b.vx=mvX*bspd2;b.vz=mvZ*bspd2;
    if(b.isGrounded&&Math.random()<dt*2.5)for(const o of curMap.obs)if(b.x+mvX*1.6>o.mnX&&b.x+mvX*1.6<o.mxX&&b.z+mvZ*1.6>o.mnZ&&b.z+mvZ*1.6<o.mxZ&&o.mxY<3.5){b.vy=JF*.82;break;}
    b.aiAng+=(Math.random()-.5)*.4*dt;
    b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;
    resolveEnt(b,PH,curMap.obs);
    if(b.mesh){b.mesh.position.set(b.x,b.y,b.z);if(Math.abs(b.vx)>.1||Math.abs(b.vz)>.1)b.mesh.rotation.y=Math.atan2(b.vx,b.vz);const ring=b.mesh.getObjectByName('itr');if(ring)ring.visible=b.isIt;const bpl=b.mesh.getObjectByName('itpl');if(bpl)bpl.intensity=b.isIt?2.2:0;}
  }
  if(gameMode==='multi'&&Object.keys(_peers).length===0)updateMultiSim(dt);
}

function updateMultiSim(dt){
  for(const mp of multiPlayers){
    if(mp.tagIm>0)mp.tagIm=Math.max(0,mp.tagIm-dt);
    if(mp.isIt)mp.itTime+=dt;
    mp.vy+=GRV*dt;
    mp.aiTimer=(mp.aiTimer||0)-dt;
    if(mp.aiTimer<=0){
      mp.aiTimer=0.18+Math.random()*0.35;
      const itEnt=player.isIt?player:multiPlayers.find(x=>x.isIt)||bots.find(b=>b.isIt);
      if(mp.isIt&&itEnt){const ang=Math.atan2(itEnt.x-mp.x,itEnt.z-mp.z);mp.aiAng=ang+(Math.random()-.5)*.3;}
      else if(itEnt){const ang=Math.atan2(mp.x-itEnt.x,mp.z-itEnt.z);mp.aiAng=ang+(Math.random()-.5)*.5;}
      else mp.aiAng+=(Math.random()-.5)*1.2;
    }
    const spd=BSPD*(0.9+Math.random()*0.2);
    mp.vx=Math.sin(mp.aiAng)*spd;mp.vz=Math.cos(mp.aiAng)*spd;
    if(mp.isGrounded&&Math.random()<dt*1.8)mp.vy=JF*.78;
    mp.x+=mp.vx*dt;mp.y+=mp.vy*dt;mp.z+=mp.vz*dt;
    resolveEnt(mp,PH,curMap.obs);
    if(mp.mesh){mp.mesh.position.set(mp.x,mp.y,mp.z);if(Math.abs(mp.vx)>.1||Math.abs(mp.vz)>.1)mp.mesh.rotation.y=Math.atan2(mp.vx,mp.vz);const ring=mp.mesh.getObjectByName('itr');if(ring)ring.visible=mp.isIt;const bpl=mp.mesh.getObjectByName('itpl');if(bpl)bpl.intensity=mp.isIt?2.2:0;}
  }
}

function checkTag(){
  const cdEl=document.getElementById('tagcd'),cdFill=document.getElementById('tagcdfill');
  if(player.isIt&&tagCooldownTimer>0){cdEl.style.display='block';cdFill.style.width=((1-tagCooldownTimer/TAG_COOLDOWN)*100)+'%';}
  else cdEl.style.display='none';
  const allTargets=gameMode==='multi'?multiPlayers:bots;
  if(player.isIt&&player.ghostEff<=0&&tagCooldownTimer<=0){
    for(const b of allTargets){
      if(b.tagIm>0)continue;
      if(Math.hypot(player.x-b.x,player.z-b.z)<TAGD){
        b.isIt=true;b.tagIm=TAG_COOLDOWN+0.2;player.isIt=false;player.tagImmunity=TAG_COOLDOWN;tagCooldownTimer=TAG_COOLDOWN;
        player.tagsMade++;player.coins+=2;doSave();
        showStat('TAGGED! +2 COINS');addChat(`${b.name} is now IT!`,'sys');doShake(.4);
        if(gameMode==='ranked')awardRankedTag(true);return;
      }
    }
  }
  const itBot=(gameMode==='multi'?multiPlayers:bots).find(b=>b.isIt);
  if(itBot&&itBot.tagIm<=0){
    if(player.tagImmunity<=0&&player.ghostEff<=0&&Math.hypot(itBot.x-player.x,itBot.z-player.z)<TAGD){
      if(player.shieldActive){player.shieldActive=false;showStat('SHIELD BLOCKED!');return;}
      if(player.shieldwallTimer>0){showStat('WALL BLOCKED!');return;}
      if(player.voltTimer>0){const dx=itBot.x-player.x,dz=itBot.z-player.z,dl=Math.hypot(dx,dz)||1;itBot.vx+=dx/dl*30;itBot.vz+=dz/dl*30;showStat('VOLT SHOCKED!');return;}
      player.isIt=true;player.tagImmunity=TAG_COOLDOWN;itBot.isIt=false;itBot.tagIm=TAG_COOLDOWN+0.2;tagCooldownTimer=TAG_COOLDOWN;
      showStat('YOU ARE IT!');addChat('YOU are now IT!','sys');doShake(.9);
      if(gameMode==='ranked')awardRankedTag(false);return;
    }
    for(const b2 of allTargets){
      if(b2.isIt||b2.tagIm>0)continue;
      if(Math.hypot(itBot.x-b2.x,itBot.z-b2.z)<TAGD){
        b2.isIt=true;b2.tagIm=TAG_COOLDOWN+0.2;itBot.isIt=false;itBot.tagIm=TAG_COOLDOWN+0.2;
        addChat(`${itBot.name} tagged ${b2.name}!`,'bot');return;
      }
    }
  }
  if(player.isIt){
    const all=gameMode==='multi'?multiPlayers:bots;
    if(all.length>0){
      const nearest=all.reduce((mn,b)=>Math.hypot(player.x-b.x,player.z-b.z)<Math.hypot(player.x-mn.x,player.z-mn.z)?b:mn,all[0]);
      const d=Math.hypot(player.x-nearest.x,player.z-nearest.z);
      document.getElementById('tagprompt').style.opacity=d<TAGD*2.5&&d>TAGD&&tagCooldownTimer<=0?.9:0;
    }
  } else document.getElementById('tagprompt').style.opacity=0;
}

function awardRankedTag(playerTagged){
  if(playerTagged){player.rankPoints=Math.max(0,player.rankPoints-5);showRankedResult('TAGGED! -5 RP','rdn');}
  else{player.rankPoints+=10;showRankedResult('+10 RP','rup');}
}
function showRankedResult(msg,cls){const el=document.getElementById('rrpts');el.textContent=msg;el.className='rrpts '+cls;}

function endRankedRound(){
  rankedRound++;
  const rr=document.getElementById('rankedresult'),title=document.getElementById('rrtitle'),pts=document.getElementById('rrpts'),next=document.getElementById('rrnext');
  const itMost=player.itTime>Math.max(...bots.map(b=>b.itTime));
  title.textContent=itMost?'ROUND LOST':'ROUND WON';title.style.color=itMost?'#ff2040':'#ffd700';
  pts.textContent=`Rank Points: ${player.rankPoints} (${getRank(player.rankPoints).name})`;pts.style.color=getRank(player.rankPoints).color;
  rr.classList.add('show');
  if(rankedRound>=rankedRoundsTotal){next.textContent='MATCH OVER — RETURNING...';setTimeout(()=>{rr.classList.remove('show');endGame();},3000);}
  else{let cd=3;next.textContent=`NEXT ROUND IN ${cd}...`;const iv=setInterval(()=>{cd--;if(cd<=0){clearInterval(iv);rr.classList.remove('show');startRankedRound();}else next.textContent=`NEXT ROUND IN ${cd}...`;},1000);}
}

function startRankedRound(){
  timer=DUR_RANKED;
  const all=[{ref:player,name:'YOU'},...bots.map(b=>({ref:b,name:b.name}))];
  all.forEach(a=>{a.ref.isIt=false;a.ref.itTime=0;a.ref.tagsMade=0;});
  const itIdx=Math.floor(Math.random()*all.length);all[itIdx].ref.isIt=true;tagCooldownTimer=0;
  player.x=(Math.random()-.5)*200;player.z=(Math.random()-.5)*200;player.y=0;player.vx=player.vy=player.vz=0;
  bots.forEach(b=>{b.x=(Math.random()-.5)*200;b.z=(Math.random()-.5)*200;b.y=0;b.vx=b.vy=b.vz=0;b.tagIm=0;});
  const itName=all[itIdx].name;setTimeout(()=>showStat(itName==='YOU'?'YOU START AS IT!':itName+' IS IT!'),150);
}

let shakeT=0,shakeA=0;
function doShake(a){shakeT=.3;shakeA=a;}
let statTimeout=null;
function showStat(msg){const el=document.getElementById('stat');el.textContent=msg;el.style.opacity=1;clearTimeout(statTimeout);statTimeout=setTimeout(()=>el.style.opacity=0,1600);}

function updateHUD(dt){
  const p=player;
  const m=Math.floor(timer/60),s=Math.floor(timer%60);
  const tel=document.getElementById('htimer');
  tel.textContent=`${m}:${s.toString().padStart(2,'0')}`;tel.className=timer<(gameMode==='ranked'?8:30)?'urg':'';
  document.getElementById('hmodelbl').textContent=gameMode.toUpperCase()+(gameMode==='ranked'?` · RD ${rankedRound+1}/${rankedRoundsTotal}`:'');
  document.getElementById('itind').style.display=p.isIt?'block':'none';
  const vig=document.getElementById('vig');
  if(p.isIt){const pulse=.5+.5*Math.sin(Date.now()*.004);vig.style.background=`radial-gradient(ellipse at center,transparent 32%,rgba(255,20,40,${.32+pulse*.14}) 100%)`;}
  else if(p.ghostEff>0)vig.style.background=`radial-gradient(ellipse at center,transparent 32%,rgba(80,180,255,.22) 100%)`;
  else vig.style.background='none';
  const sp2=Math.sqrt(p.vx*p.vx+p.vz*p.vz);
  document.getElementById('spdo').style.opacity=sp2>14?Math.min(1,(sp2-14)/10)*.55:0;
  document.getElementById('hcv').textContent=p.coins;
  document.getElementById('hmpv').textContent=p.matchPoints;
  const rk=getRank(p.rankPoints);
  document.getElementById('hrankv').textContent=rk.name+' '+p.rankPoints+'RP';document.getElementById('hrankv').style.color=rk.color;
  updSkillSlot('q',p.equippedQ,p.skill1CD);updSkillSlot('e',p.equippedE,p.skill2CD);
  document.getElementById('sqbind').textContent=BINDS.q.replace('Key','').replace('Digit','');
  document.getElementById('sebind').textContent=BINDS.e.replace('Key','').replace('Digit','');
  if(itLight){
    if(p.isIt){itLight.position.set(p.x,p.y+1.6,p.z);itLight.intensity=2.1+Math.sin(Date.now()*.005)*.5;}
    else{const ib=bots.find(b=>b.isIt)||multiPlayers.find(b=>b.isIt);if(ib){itLight.position.set(ib.x,ib.y+1.6,ib.z);itLight.intensity=2.1;}else itLight.intensity=0;}
  }
  if(shakeT>0){shakeT-=dt;const sv=shakeA*(shakeT/.3);camera.position.x+=(Math.random()-.5)*sv*.22;camera.position.y+=(Math.random()-.5)*sv*.1;}
  drawMinimap();updChatDisp();updateMPHud();
}

function updateMPHud(){
  if(gameMode!=='multi')return;
  const h=document.getElementById('mphud');h.innerHTML='';
  const colors=[0xff6644,0x44ff88,0x4488ff,0xffdd44,0xff44ff];
  const allP=[{name:'YOU',isIt:player.isIt,color:colors[0]},...multiPlayers.map((mp,i)=>({name:mp.name,isIt:mp.isIt,color:colors[i+1]}))];
  allP.forEach(p=>{const d=document.createElement('div');d.className='mphudp';const hex='#'+p.color.toString(16).padStart(6,'0');d.innerHTML=`<div class="mphudpdot" style="background:${hex}"></div><span class="mphudpname">${p.name}</span>${p.isIt?'<span class="mphudpit">IT</span>':''}`;h.appendChild(d);});
}

function updSkillSlot(slot,sid,cd){
  const nn=document.getElementById(slot==='q'?'sqn':'sen'),no=document.getElementById(slot==='q'?'sqo':'seo'),nt=document.getElementById(slot==='q'?'sqt':'set2');
  if(!nn)return;
  if(!sid){nn.textContent='—';no.style.height='0';nt.textContent='';return;}
  const def=SDEFS.find(s=>s.id===sid);if(!def)return;
  const maxCD=def.baseCD*(1-player.upgrades.cooldown*.2);
  nn.textContent=def.name;
  if(cd>0){no.style.height=(cd/maxCD*100)+'%';nt.textContent=cd.toFixed(1);}
  else{no.style.height='0';nt.textContent='';}
}

function drawMinimap(){
  const mc=document.getElementById('hmm'),ctx=mc.getContext('2d');ctx.clearRect(0,0,108,108);
  const sc=108/MSZ,cx=54,cy=54;
  ctx.fillStyle='rgba(80,90,140,.4)';
  for(const o of curMap.obs){if(o.type==='bound')continue;ctx.fillRect(cx+o.mnX*sc,cy-o.mxZ*sc,(o.mxX-o.mnX)*sc,(o.mxZ-o.mnZ)*sc);}
  const all=gameMode==='multi'?multiPlayers:bots;
  all.forEach(b=>{ctx.fillStyle=b.isIt?'#ff4040':'#5588ff';ctx.beginPath();ctx.arc(cx+b.x*sc,cy-b.z*sc,3,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle=player.isIt?'#ff6060':'#ffd700';ctx.beginPath();ctx.arc(cx+player.x*sc,cy-player.z*sc,4,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#ffd700';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx+player.x*sc,cy-player.z*sc);ctx.lineTo(cx+(player.x+Math.sin(player.yaw)*6)*sc,cy-(player.z+Math.cos(player.yaw)*6)*sc);ctx.stroke();
}

function updateCamera(){
  const p=player,eh=p.isSliding?SH*.82:PH*.88;
  const bob=p.isGrounded&&Math.sqrt(p.vx*p.vx+p.vz*p.vz)>.5?Math.sin(p.bobTime)*.044:0;
  camera.position.set(p.x,p.y+eh+bob,p.z);camera.rotation.y=p.yaw;camera.rotation.x=p.pitch;camera.rotation.z=p.isDiving?.12:0;
}

const lblEls=[];
function initLabels(){lblEls.forEach(l=>l.remove());lblEls.length=0;const all=gameMode==='multi'?multiPlayers:bots;all.forEach(()=>{const el=document.createElement('div');el.className='blbl';document.getElementById('ui').appendChild(el);lblEls.push(el);});}
const tmpV=new THREE.Vector3();
function updateLabels(){
  const all=gameMode==='multi'?multiPlayers:bots;
  all.forEach((b,i)=>{const el=lblEls[i];if(!el)return;tmpV.set(b.x,b.y+2.45,b.z);tmpV.project(camera);if(tmpV.z<1&&tmpV.z>-1){el.style.left=(tmpV.x*.5+.5)*innerWidth+'px';el.style.top=(-.5*tmpV.y+.5)*innerHeight+'px';el.style.display='block';el.textContent=b.isIt?`★ ${b.name} ★`:b.name;el.style.color=b.isIt?'#ff4040':'rgba(255,255,255,.75)';}else el.style.display='none';});
}

const BOTLINES=["Can't catch me!","Coming for you!","Nice try!","You're IT!","Watch your back!","This is MY arena.","Fast enough?","Just give up!","You'll never escape!","GG no re","too slow lmao","get rekt","EZ","omg IT again?","lets gooo"];
function addChat(msg,type){chatMsgs.push({msg,type,t:Date.now()});if(chatMsgs.length>7)chatMsgs.shift();updChatDisp();if(type!=='sys'&&Math.random()<.3)setTimeout(()=>{const all=gameMode==='multi'?multiPlayers:bots;if(all.length)addChat(`${all[Math.floor(Math.random()*all.length)].name}: ${BOTLINES[Math.floor(Math.random()*BOTLINES.length)]}`,'bot');},600+Math.random()*1800);}
function updChatDisp(){const w=document.getElementById('chatw');w.innerHTML=chatMsgs.filter(m=>Date.now()-m.t<8000).map(m=>`<div class="cmsg" style="color:${m.type==='sys'?'#ffdd80':m.type==='player'?'#fff':'#99bbff'}">${m.msg}</div>`).join('');}
function openChat(){chatOpen=true;document.getElementById('chatwrap').style.display='block';document.getElementById('chatin').value='';document.getElementById('chatin').focus();if(document.pointerLockElement)document.exitPointerLock();}
function sendChat(){const v=document.getElementById('chatin').value.trim();if(v)addChat('YOU: '+v,'player');closeChat();}
function closeChat(){chatOpen=false;document.getElementById('chatwrap').style.display='none';}

function startGame(map,mode){
  curMap=map;gameMode=mode||'casual';
  timer=gameMode==='ranked'?DUR_RANKED:gameMode==='practice'?DUR_PRACTICE:DUR_CASUAL;
  gameRunning=true;isPaused=false;rankedRound=0;tagCooldownTimer=0;
  player.x=0;player.y=0;player.z=3;player.vx=player.vy=player.vz=0;
  player.isIt=false;player.isGrounded=false;player.isSliding=false;player.isDiving=false;
  player.tagImmunity=0;player.wallJumpCd=0;player.itTime=0;player.tagsMade=0;
  player.speedEff=player.ghostEff=player.sboostEff=0;player.decoyTimer=0;player.decoyX=player.decoyZ=null;
  player.skill1CD=player.skill2CD=0;
  const sp=[[60,0,0],[-60,0,0],[0,0,-60]];
  bots.forEach((b,i)=>{[b.x,b.y,b.z]=sp[i];b.vx=b.vy=b.vz=0;b.isIt=false;b.isGrounded=true;b.itTime=0;b.tagsMade=0;b.tagIm=0;b.stuckT=0;b.stuckCk=0;b.pX=b.x;b.pZ=b.z;});
  if(gameMode==='multi'){
    const n=Math.floor(Math.random()*3)+2;
    const colors=[0xff6644,0x44ff88,0x4488ff,0xffdd44,0xff44ff];
    multiPlayers=Array.from({length:n},(_,i)=>({id:i,name:HUMAN_NAMES[i+Math.floor(Math.random()*4)],x:(Math.random()-.5)*18,y:0,z:(Math.random()-.5)*18,vx:0,vy:0,vz:0,isIt:false,isGrounded:true,itTime:0,tagsMade:0,mesh:null,aiAng:Math.random()*Math.PI*2,stuckT:0,stuckCk:0,pX:0,pZ:0,tagIm:0,color:colors[i+1],aiTimer:0}));
  } else multiPlayers=[];
  const all=gameMode==='multi'?[{ref:player,name:'YOU'},...multiPlayers.map(b=>({ref:b,name:b.name}))]:gameMode==='practice'?[{ref:player,name:'YOU'}]:[{ref:player,name:'YOU'},...bots.map(b=>({ref:b,name:b.name}))];
  const itIdx=Math.floor(Math.random()*all.length);all[itIdx].ref.isIt=true;
  chatMsgs.length=0;buildScene(curMap);initLabels();showScreen('hud');
  document.getElementById('lockoverlay').style.display='flex';
  const itName=all[itIdx].name;
  setTimeout(()=>{showStat(itName==='YOU'?'YOU START AS IT!':itName+' STARTS AS IT!');addChat(itName+' starts as IT!','sys');},300);
  if(gameMode==='multi')setTimeout(()=>addChat('Simulated players connected!','sys'),1200);
}

function endGame(){
  gameRunning=false;if(document.pointerLockElement)document.exitPointerLock();
  const all=gameMode==='multi'?[{name:'YOU',itTime:player.itTime,tagsMade:player.tagsMade,isPlayer:true},...multiPlayers.map(b=>({name:b.name,itTime:b.itTime,tagsMade:b.tagsMade,isPlayer:false}))]:gameMode==='practice'?[{name:'YOU',itTime:player.itTime,tagsMade:player.tagsMade,isPlayer:true}]:[{name:'YOU',itTime:player.itTime,tagsMade:player.tagsMade,isPlayer:true},...bots.map(b=>({name:b.name,itTime:b.itTime,tagsMade:b.tagsMade,isPlayer:false}))];
  all.sort((a,b)=>b.itTime-a.itTime);
  const loser=all[0];const playerLost=loser.isPlayer;
  const prevRank=getRank(player.rankPoints).name;
  if(gameMode==='ranked'){if(playerLost){player.rankPoints=Math.max(0,player.rankPoints-25);player.coins+=2;}else{player.rankPoints+=50;player.coins+=10;}}
  else if(gameMode!=='practice'){const baseCoins=playerLost?1:5;const streakBonus=Math.min((leaderboard.find(e=>e.name==='YOU')?.streak||0),5);const coinBonus=player.character.hat==='crown'?1:0;player.coins+=baseCoins+streakBonus+coinBonus;}
  const newRank=getRank(player.rankPoints).name;
  const lbPlayer=leaderboard.find(e=>e.name==='YOU');
  if(lbPlayer){if(playerLost){lbPlayer.losses++;lbPlayer.streak=0;}else{lbPlayer.wins++;lbPlayer.streak++;}lbPlayer.rp=player.rankPoints;}
  leaderboard.sort((a,b)=>(b.wins-b.losses)-(a.wins-a.losses));doSave();
  buildResultScreen(all,playerLost,prevRank,newRank);
  if(player.matchPoints>=10)setTimeout(()=>showScreen('upg'),3000);else showScreen('result');
}

function buildResultScreen(ranked,lost,prevRank,newRank){
  const el=document.getElementById('rtitle');el.className='rt '+(lost?'lose':'win');el.textContent=lost?'ELIMINATED':'VICTORY';
  document.getElementById('rsubtitle').textContent=gameMode.toUpperCase()+' RESULTS';
  const rp=document.getElementById('rplays');rp.innerHTML='';
  ranked.forEach(r=>{const div=document.createElement('div');div.className='rp'+(r.isPlayer?' you':'');const prev=r.isPlayer?(lost?-1:1):(r.name===ranked[0].name?-1:1);const cls=prev>0?'rc rup':prev<0?'rc rdn':'rc req';div.innerHTML=`<span class="pn">${r.isPlayer?'YOU':r.name}</span><span class="${cls}">${r.tagsMade} tags</span><span style="color:#666;font-size:.75rem">${r.itTime.toFixed(1)}s IT</span>`;rp.appendChild(div);});
  const rc=document.getElementById('rankchange');
  if(gameMode==='ranked'){const rk=getRank(player.rankPoints);if(prevRank!==newRank)rc.innerHTML=`<span class="${lost?'rankloss':'rankgain'}">${lost?'▼ RANK DOWN':'▲ RANK UP'}: ${prevRank} → <span style="color:${rk.color}">${newRank}</span></span>`;else rc.innerHTML=`<span style="color:${rk.color}">${rk.name} — ${player.rankPoints} RP</span>`;}
  else rc.innerHTML='';
}

function pauseGame(){isPaused=true;showScreen('pause');if(document.pointerLockElement)document.exitPointerLock();}
function resumeGame(){isPaused=false;showScreen('hud');}

const SCREENS=['menu','mode','map','lobby','result','shop','upg','lb','pause'];
function showScreen(name){
  gScreen=name;SCREENS.forEach(s=>document.getElementById('s-'+s).classList.add('hide'));
  document.getElementById('s-hud').style.display='none';
  if(name==='hud')document.getElementById('s-hud').style.display='block';
  else if(name==='pause'){document.getElementById('s-hud').style.display='block';document.getElementById('s-pause').classList.remove('hide');}
  else{const el=document.getElementById('s-'+name);if(el)el.classList.remove('hide');}
}

function drawMapPreview(map){
  const c=document.getElementById('mprevcanvas'),ctx=c.getContext('2d'),W=300,H=168;
  const th=map.theme;ctx.fillStyle='#'+th.sky.toString(16).padStart(6,'0');ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#'+th.gr.toString(16).padStart(6,'0');ctx.fillRect(0,H*.7,W,H*.3);
  const sc=W/MSZ,cx=W/2,cy=H/2;
  for(const o of map.obs){if(o.type==='bound')continue;let col=th.w;if(o.type==='slide')col=0x00ffcc;else if(o.type==='jump')col=0xffaa00;else if(o.type==='barrier')col=0xff4400;ctx.fillStyle='#'+col.toString(16).padStart(6,'0');ctx.globalAlpha=o.type==='wall'||o.type==='platform'?.7:.9;ctx.fillRect(cx+o.mnX*sc,cy-o.mxZ*sc,(o.mxX-o.mnX)*sc,(o.mxZ-o.mnZ)*sc);}
  ctx.globalAlpha=1;ctx.fillStyle='#ffd700';ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#'+th.aw.toString(16).padStart(6,'0');ctx.lineWidth=1.5;ctx.globalAlpha=.5;ctx.strokeRect(cx-HM*sc,cy-HM*sc,MSZ*sc,MSZ*sc);ctx.globalAlpha=1;
}

function showMapPreview(map){
  document.getElementById('mprevname').textContent=map.n;document.getElementById('mprevtheme').textContent=map.t.toUpperCase();
  document.getElementById('mprevlayout').textContent=map.p.toUpperCase();
  const mapRp=map.d*250+map.s*3000;document.getElementById('mprevdiff').textContent=mapStarDisplay(mapRp)+' ('+Math.round(mapRp)+' RP)';
  document.getElementById('mprevobs').textContent=map.obs.filter(o=>o.type!=='bound').length+' obstacles';
  document.getElementById('mprevdesc').textContent=THEME_DESCS[map.t]||'';drawMapPreview(map);
  document.getElementById('btn-go').style.display='block';
}

let pendingMode='casual';
function openMapSelect(mode){
  pendingMode=mode||'casual';const pool=[...MAPS];mapChoices=[];const num=Math.min(5,pool.length);
  while(mapChoices.length<num){const i=Math.floor(Math.random()*pool.length);mapChoices.push(pool.splice(i,1)[0]);}
  selMapIdx=-1;const con=document.getElementById('mcards');con.innerHTML='';
  document.getElementById('btn-go').style.display='none';document.getElementById('mprevname').textContent='← PICK A MAP';
  document.getElementById('mprevtheme').textContent='—';document.getElementById('mprevlayout').textContent='—';document.getElementById('mprevdiff').textContent='—';document.getElementById('mprevobs').textContent='—';document.getElementById('mprevdesc').textContent='Click any map card on the left to preview it here.';
  const pc=document.getElementById('mprevcanvas');const pctx=pc.getContext('2d');pctx.clearRect(0,0,pc.width,pc.height);
  mapChoices.forEach((map,i)=>{
    const card=document.createElement('div');card.className='mc';
    const th=map.theme;const bg=document.createElement('canvas');bg.className='mcbg';bg.width=185;bg.height=250;
    const bctx=bg.getContext('2d');bctx.fillStyle='#'+th.sky.toString(16).padStart(6,'0');bctx.fillRect(0,0,185,250);bctx.fillStyle='#'+th.gr.toString(16).padStart(6,'0');bctx.fillRect(0,190,185,60);bctx.fillStyle='#'+th.w.toString(16).padStart(6,'0');
    const rng=mkRng(map.seed+9999);for(let j=0;j<10;j++){bctx.fillRect(rng()*168+5,rng()*168+20,8+rng()*22,6+rng()*55);}
    card.appendChild(bg);
    const diff=Math.min(5,Math.round(map.d/3+map.s*5));
    const diffDots=Array(5).fill(0).map((_,di)=>`<div class="dd${di<diff?' on':''}"></div>`).join('');
    card.innerHTML+=`<div class="mct">${map.t.toUpperCase()}</div><div class="mcn">${map.n}</div><div class="mcd">${diffDots}</div>`;
    card.addEventListener('click',()=>{document.querySelectorAll('.mc').forEach(c=>c.classList.remove('sel'));card.classList.add('sel');selMapIdx=i;showMapPreview(mapChoices[i]);});
    con.appendChild(card);
  });
  showScreen('map');
}

let lobbyRoomCode='',lobbyMap=null,lobbyPlayerCount=1;
const LOBBY_COLORS=[0xffd700,0xff6644,0x44ff88,0x4488ff,0xff44ff];
let _bc=null,_myPeerId=null,_peers={},_isHost=false;
const PEER_COLORS=[0xff6644,0x44ff88,0x4488ff,0xffdd44,0xff44ff];
const PEER_HATS=['cap','halo','horns','top','none'];

function mpBroadcast(msg){
  if(_bc)_bc.postMessage({...msg,from:_myPeerId,name:player.character.name||'PLAYER',bodyColor:player.character.bodyColor,headColor:player.character.headColor,hat:player.character.hat});
  try{localStorage.setItem('tag_mp_'+lobbyRoomCode,JSON.stringify({...msg,from:_myPeerId,ts:Date.now()}));}catch(e){}
}

function mpSetup(isHost){
  _myPeerId='p_'+Math.random().toString(36).substr(2,6);_isHost=isHost;_peers={};
  if(_bc)_bc.close();
  _bc=new BroadcastChannel('tag_pursuit_'+lobbyRoomCode);
  _bc.onmessage=(e)=>{
    const d=e.data;if(!d||d.from===_myPeerId)return;
    if(d.type==='join'){_peers[d.from]={name:d.name,bodyColor:d.bodyColor,headColor:d.headColor,hat:d.hat,id:d.from,ready:false};mpBroadcast({type:'ack',peers:Object.keys(_peers).length+1});renderLobbySlots();lobbyPlayerCount=Object.keys(_peers).length+1;if(lobbyPlayerCount>=2)document.getElementById('btn-lobbystart').style.display=_isHost?'block':'none';document.getElementById('lobbyinfo').textContent=lobbyPlayerCount+' PLAYERS IN LOBBY'+(lobbyPlayerCount>=2?' — HOST CAN START':' — WAITING...');}
    else if(d.type==='ack'){lobbyPlayerCount=d.peers;renderLobbySlots();}
    else if(d.type==='start'){if(!_isHost){const mapDef=MAPS.find(m=>m.id===d.mapId)||MAPS[0];startMultiGame(mapDef);}}
    else if(d.type==='state'&&gameRunning&&gameMode==='multi'){const mp=multiPlayers.find(p=>p.peerId===d.from);if(mp){mp.x=d.x;mp.y=d.y;mp.z=d.z;mp.vx=d.vx;mp.vz=d.vz;mp.isIt=d.isIt;}}
    else if(d.type==='tag'&&gameRunning&&gameMode==='multi'){if(d.target==='YOU'||d.target===_myPeerId){player.isIt=true;player.tagImmunity=TAG_COOLDOWN;tagCooldownTimer=TAG_COOLDOWN;showStat('TAGGED BY '+d.name+'!');doShake(.9);}}
  };
  mpBroadcast({type:'join'});
}

let _mpStateCD=0;
function mpTickState(dt){
  if(gameMode!=='multi'||!_bc)return;_mpStateCD-=dt;if(_mpStateCD>0)return;_mpStateCD=0.05;
  mpBroadcast({type:'state',x:player.x,y:player.y,z:player.z,vx:player.vx,vz:player.vz,isIt:player.isIt,yaw:player.yaw});
}

function startMultiGame(mapDef){
  const peerList=Object.values(_peers);
  multiPlayers=peerList.map((p,i)=>({id:i,name:p.name,peerId:p.id,x:(Math.random()-.5)*100,y:0,z:(Math.random()-.5)*100,vx:0,vy:0,vz:0,isIt:false,isGrounded:true,itTime:0,tagsMade:0,mesh:null,aiAng:Math.random()*Math.PI*2,stuckT:0,stuckCk:0,pX:0,pZ:0,tagIm:0,color:p.bodyColor||PEER_COLORS[i+1],headColor:p.headColor||0xffd700,hat:p.hat||PEER_HATS[i],aiTimer:0}));
  startGame(mapDef,'multi');
}

function openLobby(){
  lobbyRoomCode=Math.random().toString(36).substr(2,6).toUpperCase();lobbyMap=MAPS[Math.floor(Math.random()*MAPS.length)];lobbyPlayerCount=1;_isHost=true;_peers={};
  document.getElementById('lobbycode').textContent=lobbyRoomCode;document.getElementById('btn-lobbystart').style.display='none';
  renderLobbySlots();showScreen('lobby');mpSetup(true);
  const poll=setInterval(()=>{
    if(gScreen!=='lobby'){clearInterval(poll);return;}
    try{const raw=localStorage.getItem('tag_mp_join_'+lobbyRoomCode);if(raw){const d=JSON.parse(raw);if(d&&d.from&&!_peers[d.from]&&d.from!==_myPeerId){_peers[d.from]={name:d.name||'PLAYER',bodyColor:d.bodyColor||0x4466ee,headColor:d.headColor||0xffd700,hat:d.hat||'none',id:d.from};lobbyPlayerCount=Object.keys(_peers).length+1;renderLobbySlots();if(lobbyPlayerCount>=2)document.getElementById('btn-lobbystart').style.display='block';document.getElementById('lobbyinfo').textContent=lobbyPlayerCount+' PLAYERS — HOST CAN START';}}}catch(e){}
  },800);
}

function renderLobbySlots(){
  const slots=document.getElementById('playerslots');slots.innerHTML='';
  for(let i=0;i<5;i++){
    const div=document.createElement('div');const col='#'+LOBBY_COLORS[i].toString(16).padStart(6,'0');
    if(i<lobbyPlayerCount){div.className='pslot '+(i===0?'you':'filled');div.innerHTML=`<div style="width:12px;height:12px;border-radius:50%;background:${col};margin-bottom:2px"></div><div class="pslotname">${i===0?'YOU':HUMAN_NAMES[i-1]}</div>${i===0?'<div class="pslotyou">HOST</div>':'<div class="pslotping">'+Math.floor(Math.random()*60+10)+'ms</div>'}`;}
    else{div.className='pslot empty';div.innerHTML=`<div style="color:#333;font-size:.7rem">WAITING...</div>`;}
    slots.appendChild(div);
  }
}

// ── SHOP ──
function setShopTab(tab){
  document.getElementById('shop-skills-panel').style.display=tab==='skills'?'block':'none';
  document.getElementById('shop-char-panel').style.display=tab==='char'?'block':'none';
  document.getElementById('tab-skills').style.borderColor=tab==='skills'?'#30ccff':'#334';
  document.getElementById('tab-char').style.borderColor=tab==='char'?'#40ff88':'#334';
  if(tab==='char')buildCharShop();
}
// Expose to window so onclick attributes work
window._setShopTab=setShopTab;

const CHAR_CATS=['body','head','trail','hat','skin'];
const CHAR_CAT_NAMES={body:'BODY COLOR',head:'HEAD COLOR',trail:'TRAIL',hat:'HAT',skin:'FULL SKIN'};
let _charCat='body';

function buildCharShop(){
  const grid=document.getElementById('char-grid');if(!grid)return;
  let html=`<div id="char-preview"><div style="width:28px;height:28px;border-radius:50%;background:#${player.character.bodyColor.toString(16).padStart(6,'0')};border:2px solid #ffd700"></div><span>Playing as: <b style="color:#fff">${player.character.name||'PLAYER'}</b></span></div><div class="ctabs">`;
  CHAR_CATS.forEach(c=>html+=`<button class="ctab${_charCat===c?' active':''}" onclick="window._setCharCat('${c}')">${CHAR_CAT_NAMES[c]}</button>`);
  html+=`</div><div class="cgrid" id="cgrid-inner"></div>`;
  grid.innerHTML=html;buildCharCatGrid();
}
function setCharCat(cat){_charCat=cat;buildCharShop();}
// Expose to window so onclick attributes work
window._setCharCat=setCharCat;

function buildCharCatGrid(){
  const inner=document.getElementById('cgrid-inner');if(!inner)return;inner.innerHTML='';
  const items=CHAR_ITEMS.filter(i=>i.cat===_charCat);
  items.forEach(item=>{
    const owned=player.ownedSkills.includes('char_'+item.id),equipped=isEquipped(item);
    const div=document.createElement('div');div.className='ci'+(owned?' owned':'')+(equipped?' equipped':'');
    let colorDot='';if(item.color)colorDot=`<span class="cicol" style="background:#${item.color.toString(16).padStart(6,'0')}"></span>`;
    div.innerHTML=`<div class="cin">${colorDot}${item.name}</div><div class="cid">${item.desc}</div><div class="cic">${owned?'OWNED':'⬡ '+item.cost}</div>`;
    div.addEventListener('click',()=>buyOrEquipChar(item));inner.appendChild(div);
  });
}
function isEquipped(item){
  if(item.cat==='body')return player.character.bodyColor===item.color;if(item.cat==='head')return player.character.headColor===item.color;if(item.cat==='trail')return player.character.trailColor===item.color;if(item.cat==='hat')return player.character.hat===item.id.replace('hat_','');if(item.cat==='skin')return player.character.skin===item.id;return false;
}
function buyOrEquipChar(item){
  const key='char_'+item.id,owned=player.ownedSkills.includes(key);
  if(!owned){if(player.coins<item.cost){showStat('NOT ENOUGH COINS!');return;}player.coins-=item.cost;player.ownedSkills.push(key);}
  if(item.cat==='body')player.character.bodyColor=item.color;else if(item.cat==='head')player.character.headColor=item.color;else if(item.cat==='trail')player.character.trailColor=item.color;else if(item.cat==='hat')player.character.hat=item.id.replace('hat_','');else if(item.cat==='skin'){player.character.skin=item.id;if(item.bodyColor)player.character.bodyColor=item.bodyColor;if(item.headColor)player.character.headColor=item.headColor;}
  doSave();buildCharShop();document.getElementById('shopcd').textContent='⬡ '+player.coins+' COINS';
}

function buildShopUI(){
  document.getElementById('shopcd').textContent=`⬡ ${player.coins} COINS`;
  document.getElementById('eqq').textContent=SDEFS.find(s=>s.id===player.equippedQ)?.name||'SLIDE';
  document.getElementById('eqe').textContent=SDEFS.find(s=>s.id===player.equippedE)?.name||'—';
  const grid=document.getElementById('sgrid');grid.innerHTML='';
  SDEFS.filter(def=>!def.builtin).forEach(def=>{
    const owned=player.ownedSkills.includes(def.id),isEqQ=player.equippedQ===def.id,isEqE=player.equippedE===def.id;
    const div=document.createElement('div');div.className='si'+(owned?' owned':'')+(isEqQ||isEqE?' eqd':'');
    div.innerHTML=`<div class="sin">${def.name}</div><div class="sid">${def.desc}</div><div class="sic">${owned?'OWNED':'⬡ '+def.cost}</div><div class="sisl">${def.slot.toUpperCase()} SLOT</div>`;
    div.addEventListener('click',()=>{if(!owned){if(player.coins<def.cost){showStat('NOT ENOUGH COINS!');return;}player.coins-=def.cost;player.ownedSkills.push(def.id);}if(def.slot==='q')player.equippedQ=def.id;else player.equippedE=def.id;doSave();buildShopUI();});
    grid.appendChild(div);
  });
  const resetDiv=document.createElement('div');resetDiv.className='si'+(player.equippedQ==='slide_q'?' eqd':'');
  resetDiv.innerHTML=`<div class="sin">Quick Slide</div><div class="sid">Default Q: instant slide burst</div><div class="sic">FREE</div><div class="sisl">Q SLOT</div>`;
  resetDiv.addEventListener('click',()=>{player.equippedQ='slide_q';doSave();buildShopUI();});
  grid.insertBefore(resetDiv,grid.firstChild);
  document.getElementById('kb-q').textContent=BINDS.q.replace('Key','').replace('Digit','');
  document.getElementById('kb-e').textContent=BINDS.e.replace('Key','').replace('Digit','');
}

document.querySelectorAll('.kbkey').forEach(btn=>{
  btn.addEventListener('click',()=>{listenBind=btn.dataset.action;document.querySelectorAll('.kbkey').forEach(k=>k.classList.remove('listening'));btn.classList.add('listening');btn.textContent='PRESS KEY...';});
});

function buildUpgradeUI(){
  document.getElementById('upgmpv').textContent=player.matchPoints;
  const con=document.getElementById('ucards');con.innerHTML='';
  UDEFS.forEach(def=>{
    const lvl=player.upgrades[def.id]||0,maxed=lvl>=def.max;
    const div=document.createElement('div');div.className='uc'+(maxed?' mx':'');
    div.innerHTML=`<div class="ucn">${def.name}</div><div class="ucd">${def.desc}</div><div class="ucl">LEVEL ${lvl}/${def.max}</div>`;
    if(!maxed)div.addEventListener('click',()=>{if(player.matchPoints<10)return;player.matchPoints-=10;player.upgrades[def.id]=(player.upgrades[def.id]||0)+1;doSave();buildUpgradeUI();});
    con.appendChild(div);
  });
}

function buildLB(){
  const body=document.getElementById('lbbody');body.innerHTML='';
  const sorted=[...leaderboard].sort((a,b)=>(b.rp||0)-(a.rp||0));
  sorted.forEach((e,i)=>{const rk=getRank(e.rp||0);const div=document.createElement('div');div.className='lbr'+(e.name==='YOU'?' you':'');div.innerHTML=`<span>#${i+1}</span><span>${e.name}</span><span>${e.wins}</span><span>${e.losses}</span><span>${e.streak}</span><span style="color:${rk.color};font-size:.72rem">${rk.name}</span>`;body.appendChild(div);});
}

// Button wiring
document.getElementById('btn-play').addEventListener('click',()=>showScreen('mode'));
document.getElementById('btn-shop0').addEventListener('click',()=>{buildShopUI();showScreen('shop');});
document.getElementById('btn-lb0').addEventListener('click',()=>{buildLB();showScreen('lb');});
document.getElementById('btn-ranked0').addEventListener('click',()=>openMapSelect('ranked'));
document.getElementById('btn-multi0').addEventListener('click',()=>openLobby());
document.getElementById('btn-modeback').addEventListener('click',()=>showScreen('menu'));
document.getElementById('mc-casual').addEventListener('click',()=>openMapSelect('casual'));
document.getElementById('mc-ranked').addEventListener('click',()=>openMapSelect('ranked'));
document.getElementById('mc-multi').addEventListener('click',()=>openLobby());
document.getElementById('mc-prac').addEventListener('click',()=>openMapSelect('practice'));
document.getElementById('btn-mapback').addEventListener('click',()=>showScreen('mode'));
document.getElementById('btn-go').addEventListener('click',()=>{if(selMapIdx>=0)startGame(mapChoices[selMapIdx],pendingMode);});
document.getElementById('btn-again').addEventListener('click',()=>openMapSelect(gameMode));
document.getElementById('btn-resmenu').addEventListener('click',()=>showScreen('menu'));
document.getElementById('btn-shopback').addEventListener('click',()=>showScreen('menu'));
document.getElementById('btn-conv').addEventListener('click',()=>{if(player.coins>=5){player.coins-=5;player.matchPoints+=1;doSave();buildShopUI();if(player.matchPoints>=10&&player.matchPoints%10===0){buildUpgradeUI();showScreen('upg');}}});
document.getElementById('btn-upgskip').addEventListener('click',()=>showScreen('result'));
document.getElementById('btn-lbback').addEventListener('click',()=>showScreen('menu'));
document.getElementById('btn-resume').addEventListener('click',()=>resumeGame());
document.getElementById('btn-quit').addEventListener('click',()=>{gameRunning=false;if(document.pointerLockElement)document.exitPointerLock();showScreen('menu');});
document.getElementById('chatin').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat();if(e.key==='Escape')closeChat();e.stopPropagation();});
document.getElementById('btn-lobbyback').addEventListener('click',()=>showScreen('menu'));
document.getElementById('btn-lobbystart').addEventListener('click',()=>{if(!_isHost)return;const mapDef=lobbyMap||MAPS[Math.floor(Math.random()*MAPS.length)];mpBroadcast({type:'start',mapId:mapDef.id});startMultiGame(mapDef);});
document.getElementById('btn-lobbymap').addEventListener('click',()=>openMapSelect('multi'));
document.getElementById('btn-copylink').addEventListener('click',()=>{navigator.clipboard.writeText(`tag-pursuit.game/join/${lobbyRoomCode}`).catch(()=>{});document.getElementById('btn-copylink').textContent='✅ COPIED!';setTimeout(()=>document.getElementById('btn-copylink').textContent='📋 COPY INVITE LINK',2000);});
document.getElementById('btn-joinroom').addEventListener('click',()=>{
  const code=document.getElementById('joincode').value.trim().toUpperCase();
  if(code.length>=4){lobbyRoomCode=code;_isHost=false;document.getElementById('lobbycode').textContent=code;document.getElementById('btn-lobbystart').style.display='none';document.getElementById('lobbyinfo').textContent='JOINING ROOM '+code+'...';mpSetup(false);
    try{localStorage.setItem('tag_mp_join_'+code,JSON.stringify({from:_myPeerId,name:player.character.name,bodyColor:player.character.bodyColor,headColor:player.character.headColor,hat:player.character.hat,ts:Date.now()}));}catch(e){}
    lobbyPlayerCount=1;renderLobbySlots();showScreen('lobby');}
});

// Web texture
function makeWebTexture(){
  const sz=256,cv=document.createElement('canvas');cv.width=sz;cv.height=sz;const ctx=cv.getContext('2d');ctx.clearRect(0,0,sz,sz);const cx=sz/2,cy=sz/2;ctx.strokeStyle='rgba(255,255,255,0.85)';ctx.lineWidth=1.2;const spokes=14;
  for(let i=0;i<spokes;i++){const a=i/spokes*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*cx*.96,cy+Math.sin(a)*cy*.96);ctx.stroke();}
  const rings=9;for(let r=1;r<=rings;r++){const rad=(r/rings)*cx*.94;ctx.beginPath();for(let i=0;i<=spokes;i++){const a=i/spokes*Math.PI*2,jitter=1+(Math.sin(i*7.3+r*3.1)*.05),rx=cx+Math.cos(a)*rad*jitter,ry=cy+Math.sin(a)*rad*jitter;if(i===0)ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);}ctx.closePath();ctx.stroke();}
  ctx.fillStyle='rgba(220,235,255,0.6)';for(let i=0;i<spokes;i++)for(let r=1;r<=rings;r++){if(Math.random()>.55)continue;const a=i/spokes*Math.PI*2,rad=(r/rings)*cx*.94;ctx.beginPath();ctx.arc(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,1.5,0,Math.PI*2);ctx.fill();}
  return new THREE.CanvasTexture(cv);
}
let _webTexCache=null;
function getWebTex(){if(!_webTexCache)_webTexCache=makeWebTexture();return _webTexCache;}

function buildWebMesh(obs,sc){
  const target=sc||scene;const tex=getWebTex();
  const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0.82,side:THREE.DoubleSide,depthWrite:false});
  const cy=obs.mnY+obs.h*.5;
  [[obs.w,obs.h,0,0],[obs.d,obs.h,Math.PI/2,0],[obs.w,obs.d,0,Math.PI/2]].forEach(([pw,ph,ry,rx])=>{
    const pm=new THREE.Mesh(new THREE.PlaneGeometry(pw,ph),mat.clone());pm.position.set(obs.x,cy,obs.z);pm.rotation.y=ry;pm.rotation.x=rx;target.add(pm);
  });
  const glow=new THREE.Mesh(new THREE.SphereGeometry(Math.max(obs.w,obs.h,obs.d)*.45,8,6),new THREE.MeshBasicMaterial({color:0xaaddff,transparent:true,opacity:0.06,side:THREE.BackSide}));
  glow.position.set(obs.x,cy,obs.z);target.add(glow);
}

// Trail particles
const trailParticles=[];let _trailCD=0;
function spawnTrail(dt){
  _trailCD-=dt;const sp=Math.abs(player.vx)+Math.abs(player.vz);if(sp<5||_trailCD>0)return;_trailCD=0.06;
  const col=player.character.trailColor||0x00ffcc;
  const pm=new THREE.Mesh(new THREE.SphereGeometry(.12,4,4),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.7}));
  pm.position.set(player.x+(Math.random()-.5)*.3,player.y+.4,player.z+(Math.random()-.5)*.3);scene.add(pm);trailParticles.push({mesh:pm,life:0.4,maxLife:0.4});
  for(let i=trailParticles.length-1;i>=0;i--){const tp=trailParticles[i];tp.life-=dt;tp.mesh.material.opacity=tp.life/tp.maxLife*.7;tp.mesh.scale.setScalar(tp.life/tp.maxLife);if(tp.life<=0){scene.remove(tp.mesh);trailParticles.splice(i,1);}}
}

function loop(now){
  requestAnimationFrame(loop);const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
  if(!gameRunning||isPaused){renderer.render(scene,camera);return;}
  timer-=dt;
  if(timer<=0){timer=0;if(gameMode==='ranked')endRankedRound();else endGame();return;}
  updatePlayer(dt);updateBots(dt);checkTag();updateCamera();updateHUD(dt);updateLabels();mpTickState(dt);
  if(decoyMesh&&decoyMesh.visible)decoyMesh.rotation.y+=dt*3;
  const allMeshEnts=[...bots,...multiPlayers];
  allMeshEnts.forEach(b=>{const r=b.mesh?.getObjectByName('itr');if(r&&r.visible)r.rotation.y+=dt*2;const moving=Math.abs(b.vx)>.5||Math.abs(b.vz)>.5;animateCharMesh(b.mesh,dt,moving,false,b.vy>1);});
  if(playerMesh){playerMesh.position.set(player.x,player.y,player.z);playerMesh.rotation.y=player.yaw+Math.PI;const moving2=Math.abs(player.vx)>.5||Math.abs(player.vz)>.5;animateCharMesh(playerMesh,dt,moving2,player.isSliding,player.vy>1&&!player.isGrounded);}
  spawnTrail(dt);renderer.render(scene,camera);
}

loadSave();showScreen('menu');
setInterval(()=>{if(gameRunning)doSave();},30000);
window.addEventListener('beforeunload',()=>doSave());
renderer.render(scene,camera);lastTime=performance.now();requestAnimationFrame(loop);

} // end boot()
})();
</script>
</body>
</html>