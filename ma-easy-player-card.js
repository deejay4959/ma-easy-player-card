/* MA Easy Player — custom:ma-easy-player-card
 * A simple, touch-friendly Music Assistant player for Home Assistant dashboards.
 * Uses: music_assistant (play / search / library), media_player services,
 * and optionally mass_queue (Music Assistant Queue Actions) for the queue tray and grouping checks.
 * Built by a non-developer with help from Claude (Anthropic). Provided as-is under the MIT license.
 */
const CCM_VERSION = '2.1.1';

const I = {
  disc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/></svg>',
  playlists: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 11h11M4 16h7"/><circle cx="17.5" cy="17" r="2.5"/><path d="M20 17V6"/></svg>',
  artists: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  albums: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="3"/></svg>',
  radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2.5"/><path d="M7 8l10-4"/><circle cx="15.5" cy="14" r="2.5"/><path d="M6 13h4M6 16h4"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
  shuffleBig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h3l10 10h3M4 17h3l3-3M14 10l3-3h3M18 5l2 2-2 2M18 15l2 2-2 2"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5h3.5L11 5.5v13l-4.5-4H3z" fill="currentColor"/><path d="M14.5 9.2a4 4 0 0 1 0 5.6M17.2 6.8a7.6 7.6 0 0 1 0 10.4M19.9 4.4a11 11 0 0 1 0 15.2"/></svg>',
  volumeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5h3.5L11 5.5v13l-4.5-4H3z" fill="currentColor"/><path d="M14.5 9.2a4 4 0 0 1 0 5.6M17.2 6.8a7.6 7.6 0 0 1 0 10.4" opacity=".55"/><path d="M3 3l18 18" stroke-width="2.4"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="3"/><circle cx="12" cy="14" r="3"/><circle cx="12" cy="7.5" r="1"/></svg>',
  chevDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8.5 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="#F87171"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6v12L9 12z" fill="currentColor"/><path d="M6 6v12"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6v12l9-6z" fill="currentColor"/><path d="M18 6v12"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h3l10 10h3M4 17h3l3-3M14 10l3-3h3M18 5l2 2-2 2M18 15l2 2-2 2"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V9a3 3 0 0 1 3-3h11M16 3l3 3-3 3M19 13v2a3 3 0 0 1-3 3H5M8 21l-3-3 3-3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',
  mix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L15 9"/><path d="M14 3l1.2 2.3L17.5 6.5l-2.3 1.2L14 10l-1.2-2.3L10.5 6.5l2.3-1.2z"/><path d="M19.5 11.5l.7 1.3 1.3.7-1.3.7-.7 1.3-.7-1.3-1.3-.7 1.3-.7z"/></svg>',
  queue: '<svg viewBox="0 0 24 24" fill="none" stroke="#8BE9FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 11h11M4 16h7"/><circle cx="17.5" cy="17" r="2.5"/><path d="M20 17V6"/></svg>',
};

const NAV = [
  ['now', 'Now Playing', 'disc'],
  ['discover', 'Discover', 'compass'],
  ['playlists', 'Playlists', 'playlists'],
  ['artists', 'Artists', 'artists'],
  ['albums', 'Albums', 'albums'],
  ['radio', 'Radio', 'radio'],
  ['search', 'Search', 'search'],
];
const LIB_TYPE = { playlists: 'playlist', artists: 'artist', albums: 'album', radio: 'radio' };
const LIB_TITLE = { playlists: 'Playlists', artists: 'Artists', albums: 'Albums', radio: 'Radio stations' };
const PAGE = 120;

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (sec) => { sec = Math.max(0, Math.floor(sec || 0)); const m = Math.floor(sec / 60), s = sec % 60; return m + ':' + String(s).padStart(2, '0'); };
const hash = (s) => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
const gradFor = (name) => { const h = hash(name) % 360; return `linear-gradient(135deg, hsl(${h} 70% 55%) 0%, hsl(${(h + 50) % 360} 65% 32%) 100%)`; };
const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };

class MAEasyPlayerCard extends HTMLElement {
  static getStubConfig(hass) {
    const e = hass && Object.keys(hass.entities || {}).find((k) => hass.entities[k].platform === 'music_assistant' && k.startsWith('media_player.'));
    return { entity: e || '' };
  }

  setConfig(config) {
    this._config = Object.assign({ stop_all_script: null, exclude: [], presets: [], volume_step: 5 }, config || {});
    /* min_height: lower the card's minimum height for small screens (default 640). */
    if (this._config.min_height != null) { const mh = Number(this._config.min_height) || 0; this.style.setProperty('--maep-minh', mh + 'px'); this.style.setProperty('--maep-npminh', Math.max(0, mh - 80) + 'px'); }
    else { this.style.removeProperty('--maep-minh'); this.style.removeProperty('--maep-npminh'); }
    /* compact: smaller transport buttons on one row, for small tablets. */
    this.classList.toggle('compact', !!this._config.compact);
    this._view = this._view || 'now';
    if (this._built) this._renderAll();
  }

  getCardSize() { return 14; }
  getGridOptions() { return { columns: 'full', rows: 10, min_rows: 8 }; }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) { this._build(); this._init(); }
    this._onHass();
  }

  connectedCallback() {
    if (!this._tick) this._tick = setInterval(() => this._tickProgress(), 1000);
  }
  disconnectedCallback() {
    clearInterval(this._tick); this._tick = null;
  }

  /* ---------------- setup ---------------- */
  _build() {
    this._built = true;
    this._lib = {}; this._libSort = {}; this._libMore = {};
    this._queue = []; this._queueOpen = false;
    this._search = { q: '', type: 'all', results: null, busy: false };
    this._searchSeq = 0;
    /* Use the last-picked speaker only if this card offers it; otherwise start on the card's own entity. */
    const saved = lsGet('maep.player', null), inc0 = this._config.include || [], ex0 = this._config.exclude || [];
    const okSaved = saved && !ex0.includes(saved) && (!inc0.length || inc0.includes(saved));
    this._player = (okSaved ? saved : null) || this._config.entity || null;
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${CSS}</style>
      <div class="wrap">
        <nav class="rail" aria-label="Music sections"></nav>
        <div class="main">
          <div class="top"></div>
          <div class="view"></div>
          <div class="mini"></div>
        </div>
      </div>
      <div class="toast" role="status"></div>`;
    this._$ = (s) => root.querySelector(s);
    root.addEventListener('click', (e) => this._onClick(e));
    root.addEventListener('input', (e) => this._onInput(e));
    root.addEventListener('pointerdown', (e) => this._onPress(e));
    root.addEventListener('pointerup', () => clearTimeout(this._pressT));
    root.addEventListener('pointerleave', () => clearTimeout(this._pressT));
    if (window.ResizeObserver) { this._ro = new ResizeObserver(() => this._alignEnds()); this._ro.observe(this); }
    root.addEventListener('error', (e) => { if (e.target && e.target.tagName === 'IMG') e.target.classList.add('broken'); }, true);
  }

  async _init() {
    try {
      const ma = await this._hass.callWS({ type: 'config_entries/get', domain: 'music_assistant' });
      this._maEntry = this._config.config_entry_id || (ma.find((e) => e.state === 'loaded') || ma[0] || {}).entry_id;
    } catch (e) { /* ignore */ }
    try {
      const mq = await this._hass.callWS({ type: 'config_entries/get', domain: 'mass_queue' });
      this._mqEntry = (mq.find((e) => e.state === 'loaded') || {}).entry_id || null;
    } catch (e) { this._mqEntry = null; }
    try {
      const reg = await this._hass.callWS({ type: 'config/entity_registry/list' });
      this._pidToEnt = {}; this._entToPid = {};
      reg.filter((r) => r.platform === 'music_assistant' && r.entity_id.startsWith('media_player.')).forEach((r) => {
        this._pidToEnt[r.unique_id] = r.entity_id; this._entToPid[r.entity_id] = r.unique_id;
      });
    } catch (e) { /* ignore */ }
    await this._loadPlayers();
    if (!this._player || !this._hass.states[this._player]) {
      const first = this._speakers()[0];
      this._player = first ? first.entity_id : null;
    }
    this._renderAll();
  }

  async _loadPlayers() {
    if (!this._mqEntry) return;
    try {
      const r = await this._svc('mass_queue', 'send_command', { config_entry_id: this._mqEntry, command: 'players/all' }, null, true);
      const list = (r && r.response) || [];
      this._maPlayers = {};
      list.forEach((p) => { this._maPlayers[p.player_id] = p; });
      this._playersAt = Date.now();
    } catch (e) { /* grouping info optional */ }
  }

  /* ---------------- HA helpers ---------------- */
  async _svc(domain, service, data, target, returnResponse) {
    const msg = { type: 'call_service', domain, service, service_data: data || {} };
    if (target) msg.target = target;
    if (returnResponse) msg.return_response = true;
    const r = await this._hass.callWS(msg);
    return returnResponse ? r.response : r;
  }
  _do(p, okMsg) {
    return Promise.resolve(p).then(() => { if (okMsg) this._toast(okMsg); }).catch((e) => this._toast('Couldn’t do that: ' + ((e && e.message) || e), true));
  }
  _toast(msg, bad) {
    const t = this._$('.toast');
    t.textContent = msg; t.className = 'toast show' + (bad ? ' bad' : '');
    clearTimeout(this._toastT); this._toastT = setTimeout(() => { t.className = 'toast'; }, 3200);
  }

  _st(e) { return e && this._hass.states[e]; }
  _name(e) { const s = this._st(e); return s ? (s.attributes.friendly_name || e) : e; }
  _isGroupEnt(e) { const s = this._st(e); return !!(s && s.attributes.mass_player_type === 'group'); }

  _speakers() {
    const H = this._hass, ex = new Set(this._config.exclude || []), inc = this._config.include || [];
    const all = Object.keys(H.entities || {}).filter((e) => {
      const r = H.entities[e];
      return r.platform === 'music_assistant' && e.startsWith('media_player.') && !r.hidden;
    });
    const children = new Set();
    /* Hide a group's members only when this card actually offers that group. */
    all.forEach((e) => { const s = H.states[e]; if (s && s.attributes.mass_player_type === 'group' && !ex.has(e) && (!inc.length || inc.includes(e))) (this._baseMembers(e) || []).forEach((m) => children.add(m)); });
    return all.map((e) => H.states[e]).filter((s) => s && s.state !== 'unavailable' && !ex.has(s.entity_id) && !children.has(s.entity_id) && (!inc.length || inc.includes(s.entity_id))
      && ((s.attributes.supported_features || 0) & 512)
      /* MA also makes "dashboard" copies of some players (no mass_player_type) — hide those unless listed in include. */
      && (s.attributes.mass_player_type || inc.includes(s.entity_id)))
      .sort((a, b) => this._pinRank(a.entity_id) - this._pinRank(b.entity_id) || (a.attributes.friendly_name || '').localeCompare(b.attributes.friendly_name || ''));
  }

  _pinRank(e) {
    const i = (this._config.pinned || []).indexOf(e);
    return i < 0 ? 999 : i;
  }

  /* Sync groups have their own fixed members; remember them so we only treat extras as "added". */
  _baseMembers(e) {
    const s = this._st(e); if (!s || s.attributes.mass_player_type !== 'group') return [];
    const key = 'maep.base.' + e;
    let base = lsGet(key, null);
    const pid = this._entToPid && this._entToPid[e];
    const ma = pid && this._maPlayers && this._maPlayers[pid];
    if (!base) {
      base = ma && ma.static_group_members && ma.static_group_members.length
        ? ma.static_group_members.map((p) => this._pidToEnt[p]).filter(Boolean)
        : (s.attributes.group_members || []).slice();
      lsSet(key, base);
    }
    return base;
  }

  _addedMembers(leader) {
    const s = this._st(leader); if (!s) return [];
    const base = new Set(this._baseMembers(leader));
    return (s.attributes.group_members || []).filter((m) => m !== leader && !base.has(m));
  }

  _leaderOf(e) {
    const H = this._hass;
    for (const s of this._speakers()) {
      if (s.entity_id !== e && this._addedMembers(s.entity_id).includes(e)) return s.entity_id;
    }
    return null;
  }

  _canGroup(leader, member) {
    if (!this._maPlayers || !this._entToPid) return !this._isGroupEnt(member);
    const lp = this._maPlayers[this._entToPid[leader]], mp = this._entToPid[member];
    if (!lp || !mp) return false;
    return (lp.can_group_with || []).includes(mp);
  }

  /* ---------------- rendering ---------------- */
  _renderAll() {
    if (!this._built) return;
    this._renderRail(); this._renderTop(); this._renderView(); this._renderMini();
  }

  _renderRail() {
    const nav = NAV.map(([id, label, ic]) => `<button class="nav ${this._view === id ? 'on' : ''}" data-a="view" data-v="${id}" aria-label="${label}" title="${label}">${I[ic]}<span>${label}</span></button>`).join('');
    const home = this._config.home_path ? `<button class="nav homebtn" data-a="home" aria-label="Home">${I.home}<span>Home</span></button><div class="raildiv"></div>` : '';
    this._$('.rail').innerHTML = home + nav;
  }

  _groupLabel() {
    if (!this._player) return 'Choose a speaker';
    const added = this._addedMembers(this._player);
    return this._name(this._player) + (added.length ? ' +' + added.length : '');
  }

  _renderTop() {
    const title = this._view === 'speakers' ? 'Speakers' : (NAV.find((n) => n[0] === this._view) || [])[1] || '';
    this._$('.top').innerHTML = `
      <h2 class="vtitle">${esc(title)}</h2>
      <div class="topbtns">
        <div class="acts">${(this._config.chips || []).map((c, i) => { if (!this._chipVis(c)) return ''; const on = this._chipOn(c); return `<button class="pill chip ${on ? 'lit' : ''}" data-a="chip" data-i="${i}"><ha-icon icon="${esc(c.icon || 'mdi:speaker-multiple')}"></ha-icon><span>${esc(c.name || '')} · ${on ? 'On' : 'Off'}</span></button>`; }).join('')}
        ${this._config.show_stop_all === false ? '' : `<button class="pill red" data-a="stopall">${I.stop}<span>Stop all music</span></button>`}</div>
        <button class="pill green" data-a="view" data-v="speakers">${I.speaker}<span>${esc(this._groupLabel())}</span>${I.chevDown}</button>
      </div>`;
    this._topSig = this._topKey();
    requestAnimationFrame(() => this._alignEnds());
  }

  /* Extra volume sliders: a chip with volume_entity adds one (e.g. "Main floor") while the chip is on and visible. */
  /* volume_entities: { player: entity } sends a player's main volume to another device (e.g. a TV streamer whose volume is fixed, to the receiver). */
  _volEnt(p) { return ((this._config.volume_entities || {})[p]) || p; }
  /* Some players (e.g. Music Assistant sync groups) never report is_volume_muted, so remember what we set for those. */
  _muted() {
    const e = this._volEnt(this._player), v = this._st(e);
    if (v && typeof v.attributes.is_volume_muted === 'boolean') return v.attributes.is_volume_muted;
    return !!(this._muteLocal || {})[e];
  }
  _extraVols() {
    return (this._config.chips || []).filter((c) => c.volume_entity && this._chipVis(c) && this._chipOn(c) && this._st(c.volume_entity))
      .map((c) => ({ entity: c.volume_entity, label: c.volume_label || c.name || 'Zone', vol: Math.round((this._st(c.volume_entity).attributes.volume_level || 0) * 100) }));
  }
  _chipOn(c) { const s = this._st(c.entity); return !!s && (c.active_states || ['on']).includes(s.state); }
  /* A chip with show_for only appears when the selected speaker (or a speaker grouped with it) is in that list. */
  _chipVis(c) {
    if (!c.show_for) return true;
    const want = [].concat(c.show_for); if (!this._player) return false;
    return [this._player, ...this._addedMembers(this._player)].some((e) => want.includes(e));
  }
  _topKey() { return this._player + '|' + this._groupLabel() + '|' + (this._config.chips || []).map((c) => this._chipVis(c) + ':' + this._chipOn(c)).join(','); }

  /* End the progress and volume bars just left of the "Stop all music" button. */
  _alignEnds() {
    const sa = this.shadowRoot.querySelector('[data-a="stopall"]'), inf = this.shadowRoot.querySelector('.info');
    if (!sa || !inf) return;
    const ir = inf.getBoundingClientRect(), d = Math.round(ir.right - sa.getBoundingClientRect().left + 12);
    inf.style.setProperty('--endpad', (d > 0 && d < ir.width * 0.6 ? d : 0) + 'px');
  }

  _renderView() {
    const v = this._view, el = this._$('.view');
    el.classList.toggle('scroll', v !== 'now'); this._$('.main').classList.toggle('isnow', v === 'now');
    if (v === 'now') el.innerHTML = this._htmlNow();
    else if (v === 'speakers') el.innerHTML = this._htmlSpeakers();
    else if (v === 'discover') { el.innerHTML = this._htmlDiscover(); this._loadDiscover(); }
    else if (v === 'search') { el.innerHTML = this._htmlSearch(); const inp = el.querySelector('input'); if (inp && this._focusSearch) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }
    else { el.innerHTML = this._htmlLibrary(v); if (!this._lib[v]) this._loadLib(v); }
    if (v === 'now') { this._applyWash(); this._renderTray(); this._tickProgress(); requestAnimationFrame(() => this._alignEnds()); }
  }

  _renderMini() {
    const el = this._$('.mini');
    const s = this._st(this._player);
    if (this._view === 'now' || !s || !s.attributes.media_title || !['playing', 'paused'].includes(s.state)) { el.innerHTML = ''; el.style.display = 'none'; return; }
    el.style.display = '';
    const pic = s.attributes.entity_picture;
    el.innerHTML = `<button class="minimain" data-a="view" data-v="now">
        <span class="miniart" style="background:${gradFor(s.attributes.media_title)}">${pic ? `<img src="${esc(pic)}" alt="">` : ''}</span>
        <span class="minitxt"><b>${esc(s.attributes.media_title)}</b><small>${esc(s.attributes.media_artist || '')} · ${esc(this._groupLabel())}</small></span>
      </button>
      <button class="miniplay" data-a="playpause" aria-label="${s.state === 'playing' ? 'Pause' : 'Play'}">${s.state === 'playing' ? I.pause : I.play}</button>`;
  }

  /* Music Assistant briefly reports idle/no title between songs; hold the last song on screen for a few seconds. */
  _nowMeta(s) {
    const a = s.attributes;
    if (['playing', 'paused', 'buffering'].includes(s.state) && a.media_title) {
      this._lastMeta = { player: s.entity_id, title: a.media_title, artist: a.media_artist, album: a.media_album_name, pic: a.entity_picture, dur: a.media_duration };
      this._lastAt = Date.now();
      return this._lastMeta;
    }
    const lm = this._lastMeta, left = 6000 - (Date.now() - (this._lastAt || 0));
    if (lm && lm.player === s.entity_id && left > 0) {
      clearTimeout(this._graceT);
      this._graceT = setTimeout(() => { if (this._view === 'now') this._renderView(); this._renderMini(); }, left + 50);
      return Object.assign({}, lm, { grace: true, pic: a.entity_picture || lm.pic });
    }
    return null;
  }

  _htmlNow() {
    const s = this._st(this._player);
    if (!s) return `<section class="np"><div class="empty"><h3>No speaker selected</h3><p>Pick one on the Speakers screen.</p><button class="pill green" data-a="view" data-v="speakers">${I.speaker}<span>Choose a speaker</span></button></div></section>`;
    const a = s.attributes, playing = s.state === 'playing';
    const m = this._nowMeta(s), active = !!m;
    const kicker = active ? (m.grace ? 'Loading next song on ' : playing ? 'Playing on ' : 'Paused on ') + this._groupLabel() : 'Nothing playing on ' + this._groupLabel();
    const rep = a.repeat || 'off';
    const vs = this._st(this._volEnt(this._player)), vol = Math.round(((vs || s).attributes.volume_level || 0) * 100);
    const pic = active ? m.pic : null;
    return `<section class="np">
      <div class="wash"></div>
      <div class="art" style="background:${gradFor((m && m.title) || 'x')}">${pic ? `<img src="${esc(pic)}" alt="Album art">` : I.note}</div>
      <div class="info">
        <div class="titles">
          <span class="kicker">${esc(kicker)}</span>
          <h2 class="title">${esc(active ? m.title : 'Pick some music')}</h2>
          <span class="artist">${esc(active ? [m.artist, m.album].filter(Boolean).join(' · ') : 'Start a playlist, artist, album or station from the menu.')}</span>
        </div>
        ${active ? `<div class="prog-wrap"><div class="prog" data-a="seek"><div class="progfill"></div></div><div class="times"><span class="t-pos">0:00</span><span class="t-dur">${fmt(m.dur)}</span></div></div>` : ''}
        <div class="ctrls">
          <button class="sq sm ${a.shuffle ? 'lit' : ''}" data-a="shuffle" aria-label="Shuffle">${I.shuffle}</button>
          <button class="sq md" data-a="prev" aria-label="Previous track">${I.prev}</button>
          <button class="bigplay" data-a="playpause" aria-label="${playing ? 'Pause' : 'Play'}">${playing ? I.pause : I.play}</button>
          <button class="sq md" data-a="next" aria-label="Next track">${I.next}</button>
          <button class="sq sm ${rep !== 'off' ? 'lit' : ''}" data-a="repeat" aria-label="Repeat ${rep}">${I.repeat}${rep === 'one' ? '<i class="one">1</i>' : ''}</button>
          <button class="sq sm stopbtn" data-a="stop" aria-label="Stop">${I.stop}</button>
        </div>
        <div class="volrow"><button class="volico ${this._muted() ? 'muted' : ''}" data-a="mute" aria-label="${this._muted() ? 'Unmute' : 'Mute'}">${this._muted() ? I.volumeOff : I.volume}</button>
          <button class="sq sm txt" data-a="vol" data-d="-1" aria-label="Volume down">−</button>
          <div class="volcol"><div class="vol" data-a="volset"><div class="volfill" style="width:${vol}%"></div></div></div>
          <button class="sq sm txt" data-a="vol" data-d="1" aria-label="Volume up">+</button>
        </div>${this._extraVols().map((x) => `
        <div class="volrow vol2"><span class="vlbl">${esc(x.label)}</span>
          <button class="sq sm txt" data-a="vol" data-d="-1" data-ve="${esc(x.entity)}" aria-label="${esc(x.label)} volume down">−</button>
          <div class="volcol"><div class="vol" data-a="volset" data-ve="${esc(x.entity)}"><div class="volfill" style="width:${x.vol}%"></div></div></div>
          <button class="sq sm txt" data-a="vol" data-d="1" data-ve="${esc(x.entity)}" aria-label="${esc(x.label)} volume up">+</button>
        </div>`).join('')}
      </div>
      <div class="npbtns">${active && a.media_content_id && this._config.instant_mix !== false ? `<button class="qbtn mixbtn" data-a="mix">${I.mix}<span>Instant mix</span></button>` : ''}<button class="qbtn" data-a="queue">${I.queue}<span>Up next${this._queue.length ? ' · ' + this._queue.length : ''}</span></button></div>
      <aside class="tray ${this._queueOpen ? 'open' : ''}" aria-label="Up next"></aside>
    </section>`;
  }

  _renderTray() {
    const t = this.shadowRoot.querySelector('.tray'); if (!t) return;
    t.classList.toggle('open', this._queueOpen);
    const q = this._queue;
    t.innerHTML = `<div class="trayhead"><h3>Up next · ${q.length ? q.length + ' songs' : 'empty'}</h3>
        <div class="row"><button class="pill red sm" data-a="clearq">Clear</button><button class="circ" data-a="queue" aria-label="Close queue">${I.chevRight}</button></div></div>
      <div class="qlist">${!this._mqEntry ? '<p class="muted">Install “Music Assistant Queue Actions” (mass_queue) to see the queue.</p>' :
        q.length ? q.map((it) => `<div class="qitem">
          <button class="qmain" data-a="qplay" data-id="${esc(it.queue_item_id)}">
            <span class="qart" style="background:${gradFor(it.media_title)}">${it.media_image ? `<img src="${esc(it.media_image)}" alt="">` : ''}</span>
            <span class="qtxt"><b>${esc(it.media_title)}</b><small>${esc(it.media_artist || '')}</small></span>
          </button>
          <button class="circ ghost" data-a="qdel" data-id="${esc(it.queue_item_id)}" aria-label="Remove from queue">${I.x}</button></div>`).join('')
          : '<p class="muted">Queue is empty. Pick a playlist, artist or station to start something new.</p>'}</div>`;
    const qb = this.shadowRoot.querySelector('[data-a="queue"].qbtn span');
    if (qb) qb.textContent = 'Up next' + (q.length ? ' · ' + q.length : '');
  }

  _htmlLibrary(v) {
    const items = this._lib[v];
    const sort = this._libSort[v] || 'sort_name';
    const head = `<div class="libhead"><span class="sec">${LIB_TITLE[v]} · tap to play</span>
      <div class="row"><button class="pill sm ${sort === 'sort_name' ? 'sel' : ''}" data-a="sort" data-s="sort_name">A–Z</button>
      <button class="pill sm ${sort === 'last_played_desc' ? 'sel' : ''}" data-a="sort" data-s="last_played_desc">Recently played</button>
      <button class="pill sm ${sort === 'play_count_desc' ? 'sel' : ''}" data-a="sort" data-s="play_count_desc">Most played</button></div></div>`;
    if (!items) return head + '<div class="loading">Loading…</div>';
    if (!items.length) return head + '<p class="muted">Nothing here yet.</p>';
    const cls = v === 'playlists' ? 'grid pl' : 'grid';
    return head + `<div class="${cls}">${items.map((it, i) => this._tile(it, v, i)).join('')}</div>` +
      (this._libMore[v] ? '<div class="morewrap"><button class="pill" data-a="more">Load more</button></div>' : '');
  }

  _tile(it, v, i) {
    const round = it.media_type === 'artist';
    const sub = it.media_type === 'album' && it.artists && it.artists[0] ? it.artists[0].name : '';
    return `<button class="tile" data-a="playitem" data-uri="${esc(it.uri)}" data-t="${esc(it.media_type)}" data-n="${esc(it.name)}">
      <span class="img ${round ? 'round' : ''}" style="background:${gradFor(it.name)}">${it.image && it.image !== 'null' ? `<img loading="lazy" src="${esc(it.image)}" alt="">` : ''}<span class="tplay">${I.play}</span></span>
      <span class="tname">${esc(it.name)}</span>${sub ? `<span class="tsub">${esc(sub)}</span>` : ''}</button>`;
  }

  /* ---------------- discover ---------------- */
  /* Artwork from Music Assistant comes through its image proxy (ma_url, default this host on port 8095). */
  _maUrl() { return (this._config.ma_url || (location.protocol + '//' + location.hostname + ':8095')).replace(/\/$/, ''); }
  _imgOf(it) {
    if (!it) return '';
    let im = it.image;
    if (!im && it.metadata && it.metadata.images && it.metadata.images.length) im = it.metadata.images.find((x) => x.type === 'thumb') || it.metadata.images[0];
    if (!im && it.album && it.album.image) im = it.album.image;
    if (!im) return '';
    if (typeof im === 'string') return im === 'null' ? '' : im;
    if (im.remotely_accessible && /^https?:/.test(im.path || '')) return im.path;
    return im.proxy_id ? this._maUrl() + '/imageproxy/' + im.proxy_id + '?size=256' : '';
  }
  _dtile(it) {
    const round = it.media_type === 'artist';
    const sub = (it.artists && it.artists[0] && it.artists[0].name) || '';
    const img = this._imgOf(it);
    return `<button class="tile dt" data-a="playitem" data-uri="${esc(it.uri)}" data-t="${esc(it.media_type)}" data-n="${esc(it.name)}">
      <span class="img ${round ? 'round' : ''}" style="background:${gradFor(it.name)}">${img ? `<img loading="lazy" src="${esc(img)}" alt="">` : ''}<span class="tplay">${I.play}</span></span>
      <span class="tname">${esc(it.name)}</span>${sub && it.media_type !== 'artist' ? `<span class="tsub">${esc(sub)}</span>` : ''}</button>`;
  }
  _htmlDiscover() {
    const D = this._disc || {};
    if (D.genre) {
      const g = D.genre, albums = D.genreAlbums;
      return `<div class="libhead"><button class="pill sm" data-a="dback">${I.back}<span>Discover</span></button>
          <button class="pill green" data-a="gplay" data-id="${esc(g.item_id)}" data-n="${esc(g.name)}">${I.shuffleBig}<span>Shuffle ${esc(g.name)}</span></button></div>
        <span class="sec">${esc(g.name)} albums · tap to play</span>
        ${!albums ? '<div class="loading">Loading…</div>' : albums.length ? `<div class="grid">${albums.map((it) => this._dtile(it)).join('')}</div>` : '<p class="muted">No albums found.</p>'}`;
    }
    const gs = D.genres;
    const genres = gs === undefined ? '<div class="loading">Loading genres…</div>' : gs.length ? `<div class="genres">${gs.map((g) => `<button class="gtile" data-a="genre" data-id="${esc(g.item_id)}" style="background:${gradFor(g.name)}"><b>${esc(g.name)}</b><small>${g.tracks} songs</small><span class="gshuf" data-a="gplay" data-id="${esc(g.item_id)}" data-n="${esc(g.name)}" role="button" aria-label="Shuffle ${esc(g.name)}">${I.shuffleBig}</span></button>`).join('')}</div>` : '';
    const rows = (D.rows || []).map((r, i) => {
      const items = (D.items || {})[r.uri];
      if (items && !items.length) return '';
      return `<span class="sec">${esc(r.name)}</span><div class="hrow" data-row="${i}">${items ? items.map((it) => this._dtile(it)).join('') : '<div class="loading">Loading…</div>'}</div>`;
    }).join('');
    return `<span class="sec">Browse by genre · tap to see albums, or the shuffle icon to play</span>${genres}${D.rows === undefined ? '<div class="loading">Loading suggestions…</div>' : rows}`;
  }

  async _loadDiscover(force) {
    if (!this._mqEntry) { this._disc = { genres: [], rows: [] }; this._toast('Discover needs the Music Assistant Queue Actions integration', true); return; }
    const D = this._disc = this._disc || {};
    if (!force && D.at && Date.now() - D.at < 600000) return;
    D.at = Date.now();
    const redraw = () => { if (this._view === 'discover' && !D.genre) { const el = this._$('.view'), top = el.scrollTop; const xs = [...el.querySelectorAll('.hrow')].map((r) => r.scrollLeft); el.innerHTML = this._htmlDiscover(); el.scrollTop = top; el.querySelectorAll('.hrow').forEach((r, i) => { if (xs[i]) r.scrollLeft = xs[i]; }); } };
    /* genres: music genres with enough songs, biggest first */
    (async () => {
      try {
        const all = ((await this._ma('music/genres/library_items', { limit: 500, hide_empty: true })) || []).filter((g) => g.content_type !== 'podcast' && g.content_type !== 'audiobook');
        const counts = all.length ? ((await this._ma('music/genres/media_counts', { genre_ids: all.map((g) => String(g.item_id)) })) || {}) : {};
        const min = this._config.genre_min_tracks != null ? this._config.genre_min_tracks : 15;
        D.genres = all.map((g) => ({ item_id: g.item_id, name: g.name, tracks: ((counts[String(g.item_id)] || {}).track) || 0 }))
          .filter((g) => g.tracks >= min).sort((a, b) => b.tracks - a.tracks).slice(0, this._config.genre_limit || 24);
      } catch (e) { D.genres = []; }
      redraw();
    })();
    /* suggestion rows from Music Assistant (skip podcasts, timelines and in-progress) */
    try {
      const skip = new Set(['in_progress'].concat(this._config.discover_exclude || []));
      const rows = ((await this._ma('music/recommendations')) || []).filter((r) => r.enabled_by_default !== false && (r.type || 'default') === 'default'
        && !/podcast|audiobook/i.test(r.provider || '') && !skip.has(r.item_id) && !skip.has(r.name));
      D.rows = rows.slice(0, this._config.discover_rows || 12); D.items = {};
    } catch (e) { D.rows = []; this._toast('Couldn’t load suggestions', true); }
    redraw();
    await Promise.all(D.rows.map(async (r) => {
      try {
        const its = (await this._ma('music/recommendations/items', { provider: r.provider, item_id: r.item_id })) || [];
        D.items[r.uri] = its.filter((x) => x && x.is_playable && x.uri && ['album', 'playlist', 'track', 'artist', 'radio'].includes(x.media_type)).slice(0, 20);
      } catch (e) { D.items[r.uri] = []; }
      redraw();
    }));
  }

  async _openGenre(id) {
    const D = this._disc = this._disc || {};
    const g = (D.genres || []).find((x) => String(x.item_id) === String(id)) || { item_id: id, name: 'Genre' };
    D.genre = g; D.genreAlbums = null; this._renderView(); this._$('.view').scrollTop = 0;
    try { D.genreAlbums = ((await this._ma('music/genres/albums', { item_id: String(id), limit: 120, sort_field: 'random' })) || []).filter((x) => x.uri); }
    catch (e) { D.genreAlbums = []; }
    if (this._view === 'discover' && D.genre === g) this._renderView();
  }

  async _playGenre(id, name) {
    const P = this._player;
    if (!P) { this._toast('Choose a speaker first', true); return; }
    this._toast('Shuffling ' + name + '…');
    try {
      const tr = (await this._ma('music/genres/tracks', { item_id: String(id), limit: this._config.genre_shuffle_size || 100, sort_field: 'random' })) || [];
      const uris = tr.map((t) => t.uri).filter(Boolean);
      if (!uris.length) { this._toast('No songs found in ' + name, true); return; }
      await this._svc('music_assistant', 'play_media', { media_id: uris, media_type: 'track', enqueue: 'replace' }, { entity_id: P });
      this._toast('Playing ' + uris.length + ' ' + name + ' songs');
      this._view = 'now'; this._renderAll(); setTimeout(() => this._loadQueue(), 2000);
    } catch (e) { this._toast('Couldn’t play ' + name + ': ' + ((e && e.message) || e), true); }
  }

  _htmlSearch() {
    const S = this._search;
    const types = [['all', 'Everything'], ['track', 'Songs'], ['artist', 'Artists'], ['album', 'Albums'], ['playlist', 'Playlists'], ['radio', 'Radio']];
    let res = '';
    if (S.busy) res = '<div class="loading">Searching…</div>';
    else if (S.results) res = this._htmlResults(S.results);
    else res = '<p class="muted">Results show as big tiles. One tap plays on the current speaker; songs also have a + to add them to the queue.</p>';
    return `<section class="searchbox">
        <label class="sec" for="maep-q">Search your music</label>
        <div class="sinput">${I.search}<input id="maep-q" type="search" placeholder="Artist, album, song or station" value="${esc(S.q)}" autocomplete="off"></div>
        <div class="row wrap">${types.map(([t, l]) => `<button class="pill ${S.type === t ? 'sel' : ''}" data-a="stype" data-s="${t}">${l}</button>`).join('')}</div>
      </section><div class="results">${res}</div>`;
  }

  _htmlResults(r) {
    const sec = (title, arr, kind) => {
      if (!arr || !arr.length) return '';
      if (kind === 'track') return `<h3 class="sec">${title}</h3><div class="tracks">${arr.map((t) => `<div class="trow">
          <button class="tmain" data-a="playitem" data-uri="${esc(t.uri)}" data-t="track" data-n="${esc(t.name)}">
            <span class="qart" style="background:${gradFor(t.name)}">${t.image ? `<img loading="lazy" src="${esc(t.image)}" alt="">` : ''}</span>
            <span class="qtxt"><b>${esc(t.name)}</b><small>${esc((t.artists || []).map((x) => x.name).join(', '))}${t.album ? ' · ' + esc(t.album.name) : ''}</small></span></button>
          <button class="circ ghost" data-a="enqueue" data-uri="${esc(t.uri)}" data-n="${esc(t.name)}" aria-label="Add to queue">${I.plus}</button></div>`).join('')}</div>`;
      return `<h3 class="sec">${title}</h3><div class="grid ${kind === 'playlist' ? 'pl' : ''}">${arr.map((it) => this._tile(it, kind)).join('')}</div>`;
    };
    const out = sec('Songs', r.tracks, 'track') + sec('Artists', r.artists, 'artist') + sec('Albums', r.albums, 'album') + sec('Playlists', r.playlists, 'playlist') + sec('Radio', r.radio, 'radio');
    return out || '<p class="muted">No matches.</p>';
  }

  _htmlSpeakers() {
    const sp = this._speakers();
    const leader = this._player;
    const added = leader ? this._addedMembers(leader) : [];
    const presets = (this._config.presets || []).concat(lsGet('maep.presets', []));
    const summary = leader ? [this._name(leader)].concat(added.map((m) => this._name(m))) : [];
    const leaderPlaying = leader && this._st(leader) && this._st(leader).state === 'playing';
    return `<section class="groupbox">
        <div class="ghead"><div><span class="kicker">Playing on</span><div class="gsum">${summary.length ? (summary.length > 1 ? summary.length + ' speakers · ' : '') + esc(summary.join(', ')) : 'No speaker selected'}</div></div>
          <div class="row">${added.length ? `<button class="pill sm" data-a="savepreset">Save as one-tap group</button><button class="pill sm" data-a="ungroup">Ungroup all</button>` : ''}</div></div>
        ${presets.length ? `<div class="row wrap"><span class="muted sm">One-tap groups:</span>${presets.map((p, i) => `<button class="pill cyan" data-a="preset" data-i="${i}">${esc(p.name)}</button>`).join('')}</div>` : '<div class="muted sm">Tip: group some speakers, then “Save as one-tap group” to make a button for it. Long-press a saved group to delete it.</div>'}
      </section>
      <span class="sec">Select a speaker to control it · Add to group it with ${esc(leader ? this._name(leader) : 'the current speaker')}</span>
      <div class="spk">${sp.map((s) => {
        const e = s.entity_id, isLeader = e === leader, inGroup = added.includes(e), otherLeader = !isLeader && !inGroup ? this._leaderOf(e) : null;
        const solo = (this._config.no_group || []).includes(e) || (this._config.no_group || []).includes(leader);
        const can = leader && !isLeader && !solo && this._canGroup(leader, e);
        const st = s.state === 'playing' ? 'Playing' + (s.attributes.media_title ? ' · ' + s.attributes.media_title : '') : s.state === 'paused' ? 'Paused' : 'Idle';
        const status = isLeader ? 'Controlling · ' + st : inGroup ? 'In this group' : otherLeader ? 'Grouped with ' + this._name(otherLeader) : st;
        let btn;
        if (isLeader) btn = '<span class="tag">Main</span>';
        else if (inGroup) btn = `<button class="pill sm red" data-a="unjoin" data-e="${e}">Remove</button>`;
        else if (can) btn = `<button class="pill sm green" data-a="join" data-e="${e}">Add</button>`;
        else btn = solo ? '' : '<span class="tag dash">Can’t group</span>';
        const move = leaderPlaying && !isLeader && !inGroup && s.state !== 'playing' ? `<button class="pill sm cyan" data-a="move" data-e="${e}">Move music here</button>` : '';
        return `<div class="scard ${isLeader || inGroup ? 'on' : ''}">
          <button class="spick" data-a="pick" data-e="${e}"><span class="orb">${I.speaker}</span><span class="stxt"><b>${esc(this._name(e))}</b><small>${esc(status)}</small></span></button>
          <div class="sbtns">${move}${isLeader ? '' : `<button class="pill sm cyan" data-a="pick" data-e="${e}">Select</button>`}${btn}</div></div>`;
      }).join('')}</div>`;
  }

  /* ---------------- live updates ---------------- */
  /* If the selected speaker isn't playing but another one is (e.g. music started from another card),
     switch to it — unless a speaker was picked by hand in the last 2 minutes. */
  _autoFollow() {
    if (this._config.follow_playing === false || !this._hass) return;
    if (Date.now() - (this._manualAt || 0) < 120000) return;
    const cur = this._st(this._player);
    if (cur && this._livePlaying(cur)) return;
    const upd = (x) => Date.parse(x.attributes.media_position_updated_at || '') || Date.parse(x.last_updated || '') || 0;
    const sp = this._speakers().filter((x) => this._livePlaying(x) && x.attributes.app_id === 'music_assistant' && !this._leaderOf(x.entity_id)).sort((a, b) => upd(b) - upd(a));
    if (!sp.length || sp[0].entity_id === this._player) return;
    this._player = sp[0].entity_id; lsSet('maep.player', this._player);
    this._sig = null; this._lastMeta = null; this._queue = [];
    this._renderAll(); this._loadQueue();
  }

  /* "Playing" that's real: a speaker dropped from a group can keep reporting an old song as playing.
     Its position stops updating, so ignore it if the position is older than the song itself (+90s). */
  _livePlaying(x) {
    if (!x || x.state !== 'playing') return false;
    const a = x.attributes, t = Date.parse(a.media_position_updated_at || '');
    if (!t) return true;
    const dur = +a.media_duration || 0, pos = +a.media_position || 0;
    return Date.now() - t < Math.max(dur - pos, 0) * 1000 + 90000;
  }

  _onHass() {
    if (!this._built) return;
    this._autoFollow();
    const s = this._st(this._player);
    const a = s ? s.attributes : {};
    const sig = (s ? [s.state, a.media_title, a.media_artist, a.entity_picture, a.volume_level, a.shuffle, a.repeat, (a.group_members || []).join(',')].join('|') : 'none') + '#' + (((this._st(this._volEnt(this._player)) || {}).attributes || {}).volume_level) + '#' + this._muted() + '#' + this._extraVols().map((x) => x.entity + ':' + x.vol).join(',');
    const spSig = this._view === 'speakers' ? this._speakers().map((x) => x.entity_id + x.state + (x.attributes.group_members || []).join(',') + (x.attributes.media_title || '')).join('|') : '';
    if (sig !== this._sig) {
      const titleChanged = !this._sig || this._sig.split('|')[1] !== String(a.media_title);
      this._sig = sig;
      if (this._view === 'now') this._renderView();
      this._renderMini();
      if (titleChanged) this._loadQueue();
    }
    if (this._topSig !== this._topKey()) this._renderTop();
    if (spSig !== this._spSig) {
      this._spSig = spSig;
      if (this._view === 'speakers') this._renderView();
    }
  }

  _tickProgress() {
    if (!this._hass || this._view !== 'now') return;
    const s = this._st(this._player); if (!s) return;
    const a = s.attributes, dur = a.media_duration || 0;
    let pos = a.media_position || 0;
    if (s.state === 'playing' && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at).getTime()) / 1000;
    if (dur) pos = Math.min(pos, dur);
    const f = this.shadowRoot.querySelector('.progfill'), t = this.shadowRoot.querySelector('.t-pos');
    if (f) f.style.width = (dur ? (pos / dur) * 100 : 0) + '%';
    if (t) t.textContent = fmt(pos);
  }

  _applyWash() {
    const s = this._st(this._player); const w = this.shadowRoot.querySelector('.wash');
    if (!w || !s) return;
    const a = s.attributes, m = this._nowMeta(s), pic = m && m.pic;
    if (pic) {
      w.classList.add('artbg');
      w.style.background = 'url("' + pic + '") center / cover no-repeat';
    } else {
      const h = hash(a.media_title || 'x') % 360;
      w.classList.remove('artbg');
      w.style.background = `radial-gradient(circle at 25% 35%, hsl(${h} 70% 50%) 0%, transparent 48%), radial-gradient(circle at 80% 70%, hsl(${(h + 50) % 360} 65% 35%) 0%, transparent 52%)`;
    }
  }

  /* ---------------- data loading ---------------- */
  async _loadLib(v, more) {
    if (!this._maEntry) return;
    const sort = this._libSort[v] || 'sort_name';
    const offset = more ? (this._lib[v] || []).length : 0;
    try {
      const r = await this._svc('music_assistant', 'get_library', { config_entry_id: this._maEntry, media_type: LIB_TYPE[v], limit: PAGE, offset, order_by: sort }, null, true);
      const items = (r && r.items) || [];
      this._lib[v] = more ? (this._lib[v] || []).concat(items) : items;
      this._libMore[v] = items.length === PAGE;
    } catch (e) { this._lib[v] = []; this._toast('Couldn’t load ' + LIB_TITLE[v].toLowerCase(), true); }
    if (this._view === v) {
      const el = this._$('.view'), top = el.scrollTop;
      el.innerHTML = this._htmlLibrary(v);
      if (more) el.scrollTop = top;
    }
  }

  async _loadQueue() {
    if (!this._mqEntry || !this._player) { this._queue = []; this._renderTray(); return; }
    const s = this._st(this._player);
    if (!s || !['playing', 'paused'].includes(s.state)) { this._queue = []; this._renderTray(); return; }
    try {
      const r = await this._svc('mass_queue', 'get_queue_items', { entity: this._player, limit_before: 1, limit_after: 100 }, null, true);
      const list = (r && r[this._player]) || [];
      const cur = s.attributes.media_content_id;
      const idx = list.findIndex((it) => it.media_content_id === cur);
      this._queue = idx >= 0 ? list.slice(idx + 1) : list;
    } catch (e) { this._queue = []; }
    this._renderTray();
  }

  async _runSearch() {
    const S = this._search, q = S.q.trim();
    if (!q) { S.results = null; S.busy = false; this._refreshResults(); return; }
    S.busy = true; this._refreshResults();
    const my = ++this._searchSeq;
    const data = { config_entry_id: this._maEntry, name: q, limit: 12 };
    if (S.type !== 'all') data.media_type = [S.type];
    try {
      const r = await this._svc('music_assistant', 'search', data, null, true);
      if (my !== this._searchSeq) return;
      S.results = r || {};
    } catch (e) { S.results = {}; this._toast('Search failed', true); }
    S.busy = false; this._refreshResults();
  }
  _refreshResults() {
    if (this._view !== 'search') return;
    const el = this.shadowRoot.querySelector('.results'); if (!el) return;
    const S = this._search;
    el.innerHTML = S.busy ? '<div class="loading">Searching…</div>' : S.results ? this._htmlResults(S.results) : '<p class="muted">Results show as big tiles. One tap plays on the current speaker; songs also have a + to add them to the queue.</p>';
  }

  /* Instant mix: sonically similar songs from your own library (mix_provider, Plex by default), replacing everything after the current song. */
  async _ma(command, data) {
    const r = await this._svc('mass_queue', 'send_command', { config_entry_id: this._mqEntry, command, data }, null, true);
    return r && r.response;
  }

  async _libraryMapping(id, title, artist) {
    const want = this._config.mix_provider || 'plex';
    const m = /^([^:]+):\/\/track\/(.+)$/.exec(id || '');
    if (m && m[1].startsWith(want)) return { prov: m[1], item: m[2] };
    const fromTrack = (t) => { const pm = ((t && t.provider_mappings) || []).find((p) => p.provider_domain === want && p.available !== false); return pm ? { prov: pm.provider_instance, item: pm.item_id } : null; };
    if (m) { try { const hit = fromTrack(await this._ma('music/tracks/get', { item_id: m[2], provider_instance_id_or_domain: m[1] })); if (hit) return hit; } catch (e) { /* try search */ } }
    if (!title) return null;
    try {
      const r = await this._svc('music_assistant', 'search', { config_entry_id: this._maEntry, name: title, artist: artist || undefined, media_type: ['track'], limit: 5, library_only: true }, null, true);
      for (const t of (r && r.tracks) || []) {
        const tm = /^([^:]+):\/\/track\/(.+)$/.exec(t.uri || '');
        if (!tm) continue;
        if (tm[1].startsWith(want)) return { prov: tm[1], item: tm[2] };
        const hit = fromTrack(await this._ma('music/tracks/get', { item_id: tm[2], provider_instance_id_or_domain: tm[1] }));
        if (hit) return hit;
      }
    } catch (e) { /* no match */ }
    return null;
  }

  async _instantMix() {
    const P = this._player, st = this._st(P);
    if (!P || !st || !st.attributes.media_content_id) { this._toast('Play a song first', true); return; }
    if (!this._mqEntry) { this._toast('Instant mix needs the Music Assistant Queue Actions integration', true); return; }
    const a = st.attributes;
    this._toast('Building an instant mix from ' + (a.media_title || 'this song') + '…');
    try {
      const map = await this._libraryMapping(a.media_content_id, a.media_title, a.media_artist);
      if (!map) { this._toast('Couldn’t find this song in your library, so no mix', true); return; }
      const sim = (await this._ma('music/tracks/similar_tracks', { item_id: map.item, provider_instance_id_or_domain: map.prov, limit: 75 })) || [];
      const seen = new Set([(String(a.media_title) + '|' + String(a.media_artist || '').split(/[,&]/)[0]).toLowerCase().trim()]);
      const uris = [];
      for (const t of sim) {
        const key = (t.name + '|' + ((t.artists && t.artists[0] && t.artists[0].name) || '')).toLowerCase().trim();
        if (seen.has(key) || !t.uri) continue;
        seen.add(key); uris.push(t.uri);
        if (uris.length >= (this._config.mix_size || 50)) break;
      }
      if (!uris.length) { this._toast('No similar songs found in your library', true); return; }
      await this._svc('music_assistant', 'play_media', { media_id: uris, media_type: 'track', enqueue: 'replace_next' }, { entity_id: P });
      this._toast('Instant mix: ' + uris.length + ' songs from your library');
      setTimeout(() => this._loadQueue(), 1500);
    } catch (e) { this._toast('Instant mix failed: ' + ((e && e.message) || e), true); }
  }

  /* ---------------- events ---------------- */
  _onInput(e) {
    if (e.target.id !== 'maep-q') return;
    this._search.q = e.target.value;
    clearTimeout(this._searchT);
    this._searchSeq = this._searchSeq || 0;
    this._searchT = setTimeout(() => this._runSearch(), 450);
  }

  _onPress(e) {
    const b = e.target.closest && e.target.closest('[data-a="preset"]');
    if (!b) return;
    clearTimeout(this._pressT);
    this._pressT = setTimeout(() => {
      this._suppressClick = true;
      const i = +b.dataset.i, cfgN = (this._config.presets || []).length;
      if (i < cfgN) { this._toast('That group is set in the card config'); return; }
      const saved = lsGet('maep.presets', []); const p = saved[i - cfgN];
      if (p && confirm('Delete the one-tap group “' + p.name + '”?')) { saved.splice(i - cfgN, 1); lsSet('maep.presets', saved); this._renderView(); }
    }, 650);
  }

  _onClick(e) {
    const b = e.target.closest && e.target.closest('[data-a]');
    if (!b) return;
    if (this._suppressClick) { this._suppressClick = false; return; }
    const a = b.dataset.a, P = this._player, H = this._hass;
    const tgt = { entity_id: P };
    switch (a) {
      case 'view':
        this._view = b.dataset.v; this._focusSearch = this._view === 'search';
        if (this._view === 'discover' && this._disc) this._disc.genre = null;
        if (this._view === 'speakers' && (!this._playersAt || Date.now() - this._playersAt > 30000)) this._loadPlayers().then(() => { if (this._view === 'speakers') this._renderView(); });
        this._renderAll(); if (this._view === 'now') this._loadQueue();
        break;
      case 'playpause': if (P) this._do(this._svc('media_player', 'media_play_pause', {}, tgt)); break;
      case 'next': if (P) this._do(this._svc('media_player', 'media_next_track', {}, tgt)); break;
      case 'prev': if (P) this._do(this._svc('media_player', 'media_previous_track', {}, tgt)); break;
      case 'stop': this._lastMeta = null; if (P) this._do(this._svc('media_player', 'media_stop', {}, tgt), 'Stopped'); break;
      case 'shuffle': if (P) this._do(this._svc('media_player', 'shuffle_set', { shuffle: !this._st(P).attributes.shuffle }, tgt)); break;
      case 'repeat': if (P) { const r = this._st(P).attributes.repeat || 'off'; this._do(this._svc('media_player', 'repeat_set', { repeat: r === 'off' ? 'all' : r === 'all' ? 'one' : 'off' }, tgt)); } break;
      case 'vol': if (!b.dataset.ve && P && this._volEnt(P) !== P) b.dataset.ve = this._volEnt(P);
        if (b.dataset.ve) { const ve = b.dataset.ve, v = (this._st(ve) || { attributes: {} }).attributes.volume_level || 0; const nv = Math.min(1, Math.max(0, v + (+b.dataset.d) * (this._config.volume_step / 100))); this._do(this._svc('media_player', 'volume_set', { volume_level: Math.round(nv * 100) / 100 }, { entity_id: ve })); break; }
        if (P) { const v = this._st(P).attributes.volume_level || 0; const nv = Math.min(1, Math.max(0, v + (+b.dataset.d) * (this._config.volume_step / 100))); this._do(this._svc('media_player', 'volume_set', { volume_level: Math.round(nv * 100) / 100 }, tgt)); } break;
      case 'volset': if (!b.dataset.ve && P && this._volEnt(P) !== P) b.dataset.ve = this._volEnt(P);
        if (b.dataset.ve) { const r = b.getBoundingClientRect(); const nv = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); this._do(this._svc('media_player', 'volume_set', { volume_level: Math.round(nv * 100) / 100 }, { entity_id: b.dataset.ve })); break; }
        if (P) { const r = b.getBoundingClientRect(); const nv = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); this._do(this._svc('media_player', 'volume_set', { volume_level: Math.round(nv * 100) / 100 }, tgt)); } break;
      case 'seek': if (P) { const d = this._st(P).attributes.media_duration; if (d) { const r = b.getBoundingClientRect(); this._do(this._svc('media_player', 'media_seek', { seek_position: Math.round(d * Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))) }, tgt)); } } break;
      case 'stopall': { this._lastMeta = null;
        const sc = this._config.stop_all_script;
        const p = sc && H.states[sc] ? this._svc('script', 'turn_on', {}, { entity_id: sc })
          : this._svc('media_player', 'media_stop', {}, { entity_id: this._speakers().filter((s) => s.state === 'playing').map((s) => s.entity_id) });
        this._do(p, 'Stopping all music');
        break;
      }
      case 'mix': this._instantMix(); break;
      case 'mute': if (P) {
        /* mute_scripts: { player: script } runs a script instead (e.g. mute a receiver and a second zone together). */
        const ms = (this._config.mute_scripts || {})[P];
        if (ms) this._do(this._svc('script', 'turn_on', {}, { entity_id: ms }));
        else {
          const ve = this._volEnt(P), want = !this._muted();
          this._muteLocal = this._muteLocal || {}; this._muteLocal[ve] = want;
          this._do(this._svc('media_player', 'volume_mute', { is_volume_muted: want }, { entity_id: ve }));
          this._sig = null; if (this._view === 'now') this._renderView();
        }
      } break;
      case 'home':
        history.pushState(null, '', this._config.home_path);
        window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
        break;
      case 'chip': {
        const c = (this._config.chips || [])[+b.dataset.i]; if (!c) break;
        if (c.script) this._do(this._svc('script', 'turn_on', {}, { entity_id: c.script }));
        else if (c.entity) this._do(this._svc('homeassistant', 'toggle', {}, { entity_id: c.entity }));
        break;
      }
      case 'queue': this._queueOpen = !this._queueOpen; this._renderTray(); if (this._queueOpen) this._loadQueue(); break;
      case 'clearq': if (P && this._mqEntry) this._do(this._svc('mass_queue', 'clear_queue_from_here', { entity: P }).then(() => { this._queue = []; this._renderTray(); setTimeout(() => this._loadQueue(), 800); }), 'Queue cleared'); break;
      case 'qplay': this._do(this._svc('mass_queue', 'play_queue_item', { entity: P, queue_item_id: b.dataset.id })); break;
      case 'qdel': this._queue = this._queue.filter((x) => x.queue_item_id !== b.dataset.id); this._renderTray();
        this._do(this._svc('mass_queue', 'remove_queue_item', { entity: P, queue_item_id: b.dataset.id })); break;
      case 'genre': this._openGenre(b.dataset.id); break;
      case 'gplay': this._playGenre(b.dataset.id, b.dataset.n); break;
      case 'dback': if (this._disc) { this._disc.genre = null; } this._renderView(); break;
      case 'playitem': {
        if (!P) { this._toast('Choose a speaker first', true); this._view = 'speakers'; this._renderAll(); break; }
        this._do(this._svc('music_assistant', 'play_media', { media_id: b.dataset.uri, media_type: b.dataset.t, enqueue: 'replace' }, tgt), 'Playing ' + b.dataset.n);
        this._view = 'now'; this._renderAll(); setTimeout(() => this._loadQueue(), 2500);
        break;
      }
      case 'enqueue': if (P) this._do(this._svc('music_assistant', 'play_media', { media_id: b.dataset.uri, media_type: 'track', enqueue: 'add' }, tgt).then(() => setTimeout(() => this._loadQueue(), 1000)), 'Added ' + b.dataset.n + ' to the queue'); break;
      case 'sort': { const v = this._view; this._libSort[v] = b.dataset.s; this._lib[v] = null; this._renderView(); this._loadLib(v); break; }
      case 'more': this._loadLib(this._view, true); b.textContent = 'Loading…'; break;
      case 'stype': this._search.type = b.dataset.s; this._focusSearch = false;
        this.shadowRoot.querySelectorAll('[data-a="stype"]').forEach((x) => x.classList.toggle('sel', x === b));
        this._runSearch(); break;
      case 'pick': this._manualAt = Date.now(); this._player = b.dataset.e; lsSet('maep.player', this._player); this._sig = null; this._queue = []; this._view = 'now'; this._renderAll(); this._loadQueue(); break;
      case 'join': if (P) this._do(this._svc('media_player', 'join', { group_members: [b.dataset.e] }, tgt), 'Added ' + this._name(b.dataset.e)); break;
      case 'unjoin': this._do(this._svc('media_player', 'unjoin', {}, { entity_id: b.dataset.e }), 'Removed ' + this._name(b.dataset.e)); break;
      case 'ungroup': { const added = this._addedMembers(P); if (added.length) this._do(this._svc('media_player', 'unjoin', {}, { entity_id: added }), 'Ungrouped'); break; }
      case 'move': if (P) {
        const to = b.dataset.e; this._manualAt = Date.now();
        this._do(this._svc('music_assistant', 'transfer_queue', { source_player: P, auto_play: true }, { entity_id: to }).then(() => {
          this._player = to; lsSet('maep.player', to); this._sig = null; this._view = 'now'; this._renderAll(); setTimeout(() => this._loadQueue(), 1500);
        }), 'Moving music to ' + this._name(to));
      } break;
      case 'savepreset': {
        const added = this._addedMembers(P); if (!added.length) break;
        const name = prompt('Name this group (e.g. "Downstairs")', '');
        if (name && name.trim()) { const saved = lsGet('maep.presets', []); saved.push({ name: name.trim(), leader: P, members: added }); lsSet('maep.presets', saved); this._renderView(); this._toast('Saved “' + name.trim() + '”'); }
        break;
      }
      case 'preset': {
        const all = (this._config.presets || []).concat(lsGet('maep.presets', []));
        const p = all[+b.dataset.i]; if (!p) break;
        const leader = p.leader;
        const want = (p.members || []).filter((m) => H.states[m] && H.states[m].state !== 'unavailable');
        const cur = this._addedMembers(leader);
        const drop = cur.filter((m) => !want.includes(m)), add = want.filter((m) => !cur.includes(m));
        this._manualAt = Date.now(); this._player = leader; lsSet('maep.player', leader); this._sig = null;
        const steps = [];
        if (drop.length) steps.push(this._svc('media_player', 'unjoin', {}, { entity_id: drop }));
        if (add.length) steps.push(this._svc('media_player', 'join', { group_members: add }, { entity_id: leader }));
        this._do(Promise.all(steps), 'Grouped: ' + p.name);
        this._renderAll();
        break;
      }
      default: break;
    }
  }
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
:host{display:block;height:100%;--g:#4ADE80;--c:#8BE9FF;--r:#F87171;--tx:#F3F5FF;--mut:rgba(226,232,255,.68);--glass:linear-gradient(150deg,rgba(255,255,255,.11),rgba(255,255,255,.035) 42%,rgba(255,255,255,.065));--bd:1px solid rgba(255,255,255,.13)}
*{box-sizing:border-box}
button{font-family:inherit;cursor:pointer;color:inherit}
button:focus-visible{outline:2px solid var(--c);outline-offset:2px}
svg{display:block}
.wrap{display:flex;gap:20px;height:100%;min-height:var(--maep-minh,640px);font-family:Outfit,Inter,system-ui,sans-serif;color:var(--tx)}
.rail{flex:none;width:128px;display:flex;flex-direction:column;gap:10px;padding:14px 12px;border-radius:30px;background:var(--glass);border:var(--bd)}
.spacer{flex:1}
.raildiv{height:1px;margin:2px 6px;background:rgba(255,255,255,.12)}
.nav.homebtn{color:#2DD4BF}
.nav{width:100%;min-height:76px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-radius:22px;font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);color:rgba(226,232,255,.78);transition:all .2s}
.nav svg{width:28px;height:28px}
.nav:hover{background:rgba(255,255,255,.08)}
.nav.on{border-color:rgba(74,222,128,.7);background:linear-gradient(160deg,rgba(74,222,128,.42),rgba(74,222,128,.10));color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 0 22px -6px var(--g)}
.main{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px;min-height:0}
.top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.vtitle{margin:0 0 0 6px;font-size:13px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,232,255,.75)}
.topbtns,.row{display:flex;align-items:center;gap:8px}
.acts{display:contents}
/* "wrap" is also the outer layout class; undo its layout rules on button rows. */
.row.wrap{flex-wrap:wrap;flex-direction:row;height:auto;min-height:0;gap:8px}
.pill{display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 18px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;font-size:15px;font-weight:600;white-space:nowrap}
.pill svg{width:20px;height:20px}
.pill.sm{height:44px;padding:0 16px;font-size:14px}
.pill.green{border-color:rgba(74,222,128,.5);background:linear-gradient(150deg,rgba(74,222,128,.22),rgba(255,255,255,.05))}
.pill.green svg:first-child{color:var(--g)}
.pill.red{border-color:rgba(248,113,113,.5);background:rgba(248,113,113,.14)}
.pill.cyan{border-color:rgba(139,233,255,.45);background:rgba(139,233,255,.12)}
.pill.sel{border-color:rgba(74,222,128,.55);background:rgba(74,222,128,.2)}
.pill.chip ha-icon{--mdc-icon-size:20px;color:rgba(226,232,255,.6)}
.pill.chip.lit{border-color:rgba(74,222,128,.6);background:linear-gradient(150deg,rgba(74,222,128,.3),rgba(255,255,255,.05))}
.pill.chip.lit ha-icon{color:var(--g)}
.view{flex:1;min-height:0;position:relative;display:flex;flex-direction:column;gap:14px}
.view.scroll{overflow-y:auto;padding-right:4px}
.sec{display:block;margin:2px 4px;font-size:13px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(226,232,255,.75)}
h3.sec{margin-top:10px}
.muted{color:var(--mut);font-size:15px;margin:6px 4px}.muted.sm{font-size:13px}
.loading{padding:40px;text-align:center;color:var(--mut)}
/* now playing */
.np{position:relative;overflow:hidden;flex:1;min-height:var(--maep-npminh,560px);border-radius:34px;border:1px solid rgba(255,255,255,.14);background:#0A0C16;display:flex;flex-wrap:wrap;align-items:stretch;flex-wrap:nowrap;gap:44px;padding:32px 36px}
.wash{position:absolute;inset:-30%;opacity:.55;filter:blur(60px);pointer-events:none;transition:background 1s}
.wash.artbg{inset:-25%;opacity:1;filter:blur(70px) saturate(1.5) brightness(.5)}
.art{position:relative;flex:none;align-self:stretch;aspect-ratio:1;max-width:56%;border-radius:30px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center}
.art>svg{width:96px;height:96px}
.art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
img.broken{display:none}
.info{position:relative;flex:1 1 300px;min-width:0;display:flex;flex-direction:column;gap:20px;padding:6px 0 2px}
.titles{display:flex;flex-direction:column;gap:6px;margin-top:auto}
.kicker{font-size:13px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#86EFAC}
.title{margin:0;font-size:52px;line-height:1.05;font-weight:600;color:#fff;overflow-wrap:anywhere}
.artist{font-size:24px;color:rgba(236,240,255,.82)}
.prog-wrap{display:flex;flex-direction:column;gap:8px;margin-right:var(--endpad,0px)}
.prog{height:5px;border-radius:999px;background:rgba(255,255,255,.16);overflow:hidden;cursor:pointer;background-clip:content-box;padding:8px 0;box-sizing:content-box}
.prog .progfill{background:rgba(236,240,255,.78)}
.progfill,.volfill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--g),var(--c));transition:width .9s linear}
.times{display:flex;justify-content:space-between;font-size:13px;color:rgba(226,232,255,.7)}
.ctrls{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.sq{display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.07);color:rgba(236,240,255,.85);position:relative}
.sq.sm{width:68px;height:68px;border-radius:22px}.sq.sm svg{width:28px;height:28px}
.sq.md{width:88px;height:88px;border-radius:28px;color:#fff}.sq.md svg{width:40px;height:40px}
.sq.lit{color:var(--g);border-color:rgba(74,222,128,.55);background:rgba(74,222,128,.14)}
.sq.txt{font-size:30px;font-weight:500;color:#fff}
.sq .one{position:absolute;right:7px;bottom:5px;font-style:normal;font-size:11px;font-weight:700}
.stopbtn{border-color:rgba(248,113,113,.5);background:rgba(248,113,113,.14)}.stopbtn svg{width:26px;height:26px}
.bigplay{width:124px;height:124px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:radial-gradient(circle at 30% 22%,#BBF7D0 0%,#4ADE80 55%,#15803D 100%);color:#06120A;display:flex;align-items:center;justify-content:center;box-shadow:0 0 34px -6px var(--g)}
.bigplay svg{width:56px;height:56px}
.volrow{display:flex;align-items:center;gap:14px;margin-right:var(--endpad,0px)}
.volcol{flex:1;display:flex;flex-direction:column;gap:6px}
.vol{height:16px;border-radius:999px;background:rgba(255,255,255,.14);overflow:hidden;cursor:pointer}
.vollbl{font-size:14px;color:rgba(226,232,255,.7)}
.volico{flex:none;display:flex;align-items:center;justify-content:center;padding:6px;margin:-6px;border:none;background:transparent;border-radius:12px;color:rgba(236,240,255,.8)}.volico.muted{color:var(--r)}.volico svg{width:30px;height:30px}
.vlbl{flex:none;min-width:30px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(226,232,255,.7);line-height:1.1}
.vol2{margin-top:-6px}
.npbtns{position:absolute;top:20px;right:20px;z-index:2;display:flex;gap:10px}
.mixbtn{border-color:rgba(196,181,253,.5)!important}.mixbtn svg{color:#C4B5FD}
.qbtn{height:48px;padding:0 18px 0 14px;border-radius:999px;border:1px solid rgba(139,233,255,.45);background:rgba(10,12,22,.55);color:#fff;display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600}
.qbtn svg{width:20px;height:20px}
.tray{position:absolute;top:12px;right:12px;bottom:12px;width:360px;max-width:calc(100% - 24px);z-index:3;display:flex;flex-direction:column;gap:10px;padding:18px;border-radius:26px;border:1px solid rgba(255,255,255,.16);background:rgba(10,12,22,.84);backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);box-shadow:-24px 0 60px -20px rgba(0,0,0,.8);transition:transform .35s ease,opacity .35s ease;transform:translateX(calc(100% + 24px));opacity:0;pointer-events:none}
.tray.open{transform:none;opacity:1;pointer-events:auto}
.trayhead{display:flex;align-items:center;justify-content:space-between;gap:10px}
.trayhead h3{margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(226,232,255,.8)}
.qlist{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px}
.qitem,.trow{display:flex;align-items:center;gap:8px;min-height:56px;padding:4px 6px;border-radius:16px;background:rgba(255,255,255,.05)}
.qmain,.tmain{flex:1;min-width:0;display:flex;align-items:center;gap:12px;padding:0;border:none;background:transparent;text-align:left}
.qart{position:relative;flex:none;width:44px;height:44px;border-radius:10px;overflow:hidden}
.qart img{width:100%;height:100%;object-fit:cover}
.qtxt{display:flex;flex-direction:column;min-width:0}
.qtxt b{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qtxt small{font-size:12px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.circ{flex:none;width:44px;height:44px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center}
.circ svg{width:18px;height:18px}.circ.ghost{border-color:transparent;background:transparent;color:rgba(226,232,255,.7)}
.empty{position:relative;margin:auto;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px}
.empty h3{margin:0;font-size:28px}
/* library */
.libhead{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:16px}
.grid.pl{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
.tile{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:24px;border:var(--bd);background:var(--glass);text-align:left;transition:transform .15s}
.tile:active{transform:scale(.97)}
.img{position:relative;width:100%;aspect-ratio:1;border-radius:16px;overflow:hidden;display:block}
.grid.pl .img{aspect-ratio:16/10}
.img.round{border-radius:50%}
.img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.tplay{position:absolute;right:8px;bottom:8px;width:40px;height:40px;border-radius:50%;background:rgba(10,12,22,.6);color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}
.tplay svg{width:20px;height:20px}
.tile:hover .tplay{opacity:1}
.tname{font-size:15px;font-weight:600;padding:0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tsub{font-size:12px;color:var(--mut);padding:0 2px;margin-top:-6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.morewrap{display:flex;justify-content:center;padding:10px 0 20px}
/* search */
.searchbox{display:flex;flex-direction:column;gap:14px;padding:22px;border-radius:30px;border:var(--bd);background:var(--glass)}
.sinput{display:flex;align-items:center;gap:14px;height:64px;padding:0 20px;border-radius:22px;border:1px solid rgba(139,233,255,.4);background:rgba(5,6,12,.55);color:var(--c)}
.sinput svg{width:26px;height:26px}
.sinput input{flex:1;min-width:0;height:100%;border:none;outline:none;background:transparent;color:#fff;font:inherit;font-size:21px}
.tracks{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:8px}
.results{display:flex;flex-direction:column;gap:10px}
/* speakers */
.groupbox{display:flex;flex-direction:column;gap:12px;padding:18px 20px;border-radius:28px;border:1px solid rgba(74,222,128,.35);background:linear-gradient(150deg,rgba(74,222,128,.14),rgba(255,255,255,.04) 60%)}
.ghead{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.gsum{font-size:21px;font-weight:600;color:#fff}
.spk{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:14px}
.scard{display:flex;align-items:center;gap:10px;min-height:84px;padding:12px 14px;border-radius:24px;border:var(--bd);background:var(--glass)}
.scard.on{border-color:rgba(74,222,128,.55);background:linear-gradient(150deg,rgba(74,222,128,.24),rgba(255,255,255,.045) 60%)}
.spick{flex:1;min-width:0;display:flex;align-items:center;gap:14px;padding:0;border:none;background:transparent;text-align:left}
.orb{flex:none;width:52px;height:52px;border-radius:17px;display:flex;align-items:center;justify-content:center;background:rgba(74,222,128,.14);color:var(--g)}
.orb svg{width:24px;height:24px}
.scard.on .orb{background:radial-gradient(circle at 30% 22%,#BBF7D0 0%,#4ADE80 55%,#15803D 100%);color:#06120A}
.stxt{display:flex;flex-direction:column;min-width:0}
.stxt b{font-size:17px;font-weight:600}
.stxt small{font-size:13px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sbtns{display:flex;gap:6px;align-items:center;flex:none}
.tag{display:inline-flex;align-items:center;height:44px;padding:0 14px;border-radius:999px;font-size:13px;font-weight:600;background:rgba(255,255,255,.12)}
.tag.dash{background:transparent;border:1px dashed rgba(255,255,255,.25);color:var(--mut)}
/* mini */
.mini{display:flex;align-items:center;gap:16px;padding:10px 14px;border-radius:26px;border:1px solid rgba(74,222,128,.35);background:linear-gradient(150deg,rgba(74,222,128,.16),rgba(255,255,255,.05) 60%)}
.minimain{flex:1;min-width:0;display:flex;align-items:center;gap:14px;padding:0;border:none;background:transparent;text-align:left}
.miniart{position:relative;flex:none;width:52px;height:52px;border-radius:14px;overflow:hidden}
.miniart img{width:100%;height:100%;object-fit:cover}
.minitxt{display:flex;flex-direction:column;min-width:0}
.minitxt b{font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.minitxt small{font-size:13px;color:rgba(226,232,255,.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.miniplay{flex:none;width:56px;height:56px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:radial-gradient(circle at 30% 22%,#BBF7D0 0%,#4ADE80 55%,#15803D 100%);color:#06120A;display:flex;align-items:center;justify-content:center}
.miniplay svg{width:24px;height:24px}
:host(.compact) .ctrls{flex-wrap:nowrap;gap:10px}
:host(.compact) .sq.sm{width:48px;height:48px;border-radius:15px}:host(.compact) .sq.sm svg{width:21px;height:21px}
:host(.compact) .sq.md{width:58px;height:58px;border-radius:18px}:host(.compact) .sq.md svg{width:26px;height:26px}
:host(.compact) .bigplay{width:78px;height:78px}:host(.compact) .bigplay svg{width:34px;height:34px}
:host(.compact) .stopbtn svg{width:18px;height:18px}
/* discover */
.tile{min-width:0;overflow:hidden}
.tile .tname,.tile .tsub{display:block;width:100%;max-width:100%;min-width:0;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow{flex:none;display:grid;grid-auto-flow:column;grid-auto-columns:168px;gap:14px;overflow-x:auto;overflow-y:hidden;padding:2px 2px 10px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
.hrow .tile{scroll-snap-align:start}
.hrow .loading{padding:30px 10px}
.genres{flex:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.gtile{position:relative;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:2px;min-height:96px;padding:14px 16px;border-radius:22px;border:1px solid rgba(255,255,255,.16);color:#fff;text-align:left;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}
.gtile b{font-size:19px;font-weight:600;text-shadow:0 1px 6px rgba(0,0,0,.45);padding-right:44px}
.gtile small{font-size:12px;opacity:.85}
.gshuf{position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:50%;background:rgba(10,12,22,.45);display:flex;align-items:center;justify-content:center}
.gshuf svg{width:20px;height:20px}
.rail{overflow-y:auto}.rail::-webkit-scrollbar{display:none}
:host(.compact) .nav{min-height:54px;gap:2px;font-size:12px;border-radius:18px}:host(.compact) .nav svg{width:24px;height:24px}:host(.compact) .rail{gap:6px}
:host(.compact) .hrow{grid-auto-columns:140px}:host(.compact) .genres{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}:host(.compact) .gtile{min-height:80px}:host(.compact) .gtile b{font-size:17px}
.toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);opacity:0;pointer-events:none;padding:12px 20px;border-radius:999px;background:rgba(10,12,22,.92);border:1px solid rgba(74,222,128,.45);color:#fff;font:600 14px Outfit,system-ui,sans-serif;transition:all .25s;z-index:9}
.toast.show{opacity:1;transform:translate(-50%,0)}
.toast.bad{border-color:rgba(248,113,113,.6)}
@media (max-width:1400px){.nav{min-height:64px;gap:4px}.rail{gap:8px;padding:12px 10px;width:112px}.np{gap:28px;padding:24px 26px}.art{max-width:48%}.title{font-size:36px}.artist{font-size:19px}.ctrls{gap:12px}.sq.sm{width:52px;height:52px;border-radius:18px}.sq.sm svg{width:22px;height:22px}.sq.md{width:68px;height:68px;border-radius:22px}.sq.md svg{width:30px;height:30px}.sq.txt{font-size:24px}.stopbtn svg{width:20px;height:20px}.bigplay{width:96px;height:96px}.bigplay svg{width:42px;height:42px}.info{gap:16px}.npbtns{top:14px;right:14px}}
@media (max-width:900px){.wrap{flex-direction:column}.rail{width:auto;flex-direction:row;overflow-x:auto}.nav{min-width:84px}.spacer{display:none}.np{padding:24px;flex-wrap:wrap}.art{align-self:auto;width:100%;max-width:100%}.titles{padding-right:0;margin-top:56px}.title{font-size:32px}.spk{grid-template-columns:1fr}}
@media (max-width:700px){
:host{height:auto}
.wrap{flex-direction:column;gap:12px;min-height:0;height:auto}
.rail{width:auto;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));padding:6px;gap:6px;border-radius:20px}
.rail [data-v="speakers"]{display:none}
.rail::-webkit-scrollbar{display:none}
.nav{width:auto;min-width:0;min-height:46px;flex:none;border-radius:14px;gap:0}
.nav span{display:none}
.nav svg{width:22px;height:22px}
.spacer,.raildiv{display:none}
.main{gap:12px}
.vtitle{display:none}
.top{width:100%}
.topbtns{width:100%;flex-wrap:wrap;gap:8px}
.topbtns .pill{flex:1 1 auto;justify-content:center;height:44px;font-size:14px;padding:0 12px}
.topbtns .pill.green{flex-basis:100%;order:-1}
.acts{display:flex;gap:8px;width:100%}
.acts .pill{flex:1 1 0;justify-content:center;height:44px;font-size:14px;padding:0 12px}
.main.isnow .top,.main.isnow .topbtns{display:contents}
.main.isnow .acts{order:2}
.view,.view.scroll{overflow:visible;min-height:0;padding-right:0}
.np{flex-direction:column;flex-wrap:nowrap;min-height:0;padding:16px;gap:16px;border-radius:28px}
.art{width:100%;max-width:100%;align-self:stretch;flex:none}
.info{flex:none;width:100%;gap:14px;padding:0}
.titles{margin-top:0}
.title{font-size:26px}.artist{font-size:16px}
.npbtns{position:static;order:5;justify-content:center;flex-wrap:wrap;width:100%}
.npbtns .qbtn{flex:1 1 0;justify-content:center}
.ctrls{justify-content:space-between;gap:4px;flex-wrap:nowrap}
.sq.sm{width:44px;height:44px;border-radius:14px}.sq.sm svg{width:20px;height:20px}
.sq.md{width:56px;height:56px;border-radius:18px}.sq.md svg{width:26px;height:26px}
.bigplay{width:76px;height:76px}.bigplay svg{width:34px;height:34px}
.stopbtn svg{width:18px;height:18px}
.prog-wrap,.volrow{margin-right:0!important}
.volrow{gap:10px}.volico svg{width:24px;height:24px}
.tray{position:fixed;left:8px;right:8px;top:auto;bottom:96px;height:68vh;width:auto;max-width:none;z-index:20;transform:translateY(120%)}
.tray.open{transform:none}
.grid,.grid.pl{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.tile{padding:8px;border-radius:18px}
.spk{grid-template-columns:1fr}
.scard{flex-wrap:wrap}
.sbtns{width:100%;justify-content:flex-end}
.tracks{grid-template-columns:1fr}
.searchbox{padding:14px;border-radius:24px}
.sinput{height:52px}.sinput input{font-size:17px}
.libhead .row{flex-wrap:wrap}
.groupbox{padding:14px}
.gsum{font-size:17px}
.mini{position:sticky;bottom:96px;z-index:4}
}
`;

if (!customElements.get('ma-easy-player-card')) customElements.define('ma-easy-player-card', MAEasyPlayerCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'ma-easy-player-card', name: 'MA Easy Player', description: 'Simple, touch-friendly Music Assistant player with library, queue tray and easy speaker grouping.', documentationURL: 'https://github.com/deejay4959/ma-easy-player-card' });
console.info('%c MA-EASY-PLAYER %c ' + CCM_VERSION, 'background:#4ADE80;color:#06120A;font-weight:700', 'color:#4ADE80');
