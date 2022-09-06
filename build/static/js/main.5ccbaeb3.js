/*! For license information please see main.5ccbaeb3.js.LICENSE.txt */
!(function () {
  var e = {
      110: function (e, t, n) {
        'use strict'
        var r = n(441),
          o = {
            childContextTypes: !0,
            contextType: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            getDerivedStateFromError: !0,
            getDerivedStateFromProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0,
          },
          a = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0,
          },
          i = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0,
          },
          l = {}
        function u(e) {
          return r.isMemo(e) ? i : l[e.$$typeof] || o
        }
        ;(l[r.ForwardRef] = {
          $$typeof: !0,
          render: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
        }),
          (l[r.Memo] = i)
        var c = Object.defineProperty,
          s = Object.getOwnPropertyNames,
          d = Object.getOwnPropertySymbols,
          f = Object.getOwnPropertyDescriptor,
          p = Object.getPrototypeOf,
          m = Object.prototype
        e.exports = function e(t, n, r) {
          if ('string' !== typeof n) {
            if (m) {
              var o = p(n)
              o && o !== m && e(t, o, r)
            }
            var i = s(n)
            d && (i = i.concat(d(n)))
            for (var l = u(t), v = u(n), g = 0; g < i.length; ++g) {
              var h = i[g]
              if (!a[h] && (!r || !r[h]) && (!v || !v[h]) && (!l || !l[h])) {
                var b = f(n, h)
                try {
                  c(t, h, b)
                } catch (y) {}
              }
            }
          }
          return t
        }
      },
      845: function (e, t, n) {
        var r
        !(function () {
          'use strict'
          var o = function () {
            this.init()
          }
          o.prototype = {
            init: function () {
              var e = this || a
              return (
                (e._counter = 1e3),
                (e._html5AudioPool = []),
                (e.html5PoolSize = 10),
                (e._codecs = {}),
                (e._howls = []),
                (e._muted = !1),
                (e._volume = 1),
                (e._canPlayEvent = 'canplaythrough'),
                (e._navigator =
                  'undefined' !== typeof window && window.navigator
                    ? window.navigator
                    : null),
                (e.masterGain = null),
                (e.noAudio = !1),
                (e.usingWebAudio = !0),
                (e.autoSuspend = !0),
                (e.ctx = null),
                (e.autoUnlock = !0),
                e._setup(),
                e
              )
            },
            volume: function (e) {
              var t = this || a
              if (
                ((e = parseFloat(e)),
                t.ctx || p(),
                'undefined' !== typeof e && e >= 0 && e <= 1)
              ) {
                if (((t._volume = e), t._muted)) return t
                t.usingWebAudio &&
                  t.masterGain.gain.setValueAtTime(e, a.ctx.currentTime)
                for (var n = 0; n < t._howls.length; n++)
                  if (!t._howls[n]._webAudio)
                    for (
                      var r = t._howls[n]._getSoundIds(), o = 0;
                      o < r.length;
                      o++
                    ) {
                      var i = t._howls[n]._soundById(r[o])
                      i && i._node && (i._node.volume = i._volume * e)
                    }
                return t
              }
              return t._volume
            },
            mute: function (e) {
              var t = this || a
              t.ctx || p(),
                (t._muted = e),
                t.usingWebAudio &&
                  t.masterGain.gain.setValueAtTime(
                    e ? 0 : t._volume,
                    a.ctx.currentTime
                  )
              for (var n = 0; n < t._howls.length; n++)
                if (!t._howls[n]._webAudio)
                  for (
                    var r = t._howls[n]._getSoundIds(), o = 0;
                    o < r.length;
                    o++
                  ) {
                    var i = t._howls[n]._soundById(r[o])
                    i && i._node && (i._node.muted = !!e || i._muted)
                  }
              return t
            },
            stop: function () {
              for (var e = this || a, t = 0; t < e._howls.length; t++)
                e._howls[t].stop()
              return e
            },
            unload: function () {
              for (var e = this || a, t = e._howls.length - 1; t >= 0; t--)
                e._howls[t].unload()
              return (
                e.usingWebAudio &&
                  e.ctx &&
                  'undefined' !== typeof e.ctx.close &&
                  (e.ctx.close(), (e.ctx = null), p()),
                e
              )
            },
            codecs: function (e) {
              return (this || a)._codecs[e.replace(/^x-/, '')]
            },
            _setup: function () {
              var e = this || a
              if (
                ((e.state = (e.ctx && e.ctx.state) || 'suspended'),
                e._autoSuspend(),
                !e.usingWebAudio)
              )
                if ('undefined' !== typeof Audio)
                  try {
                    'undefined' === typeof new Audio().oncanplaythrough &&
                      (e._canPlayEvent = 'canplay')
                  } catch (t) {
                    e.noAudio = !0
                  }
                else e.noAudio = !0
              try {
                new Audio().muted && (e.noAudio = !0)
              } catch (t) {}
              return e.noAudio || e._setupCodecs(), e
            },
            _setupCodecs: function () {
              var e = this || a,
                t = null
              try {
                t = 'undefined' !== typeof Audio ? new Audio() : null
              } catch (s) {
                return e
              }
              if (!t || 'function' !== typeof t.canPlayType) return e
              var n = t.canPlayType('audio/mpeg;').replace(/^no$/, ''),
                r = e._navigator ? e._navigator.userAgent : '',
                o = r.match(/OPR\/([0-6].)/g),
                i = o && parseInt(o[0].split('/')[1], 10) < 33,
                l = -1 !== r.indexOf('Safari') && -1 === r.indexOf('Chrome'),
                u = r.match(/Version\/(.*?) /),
                c = l && u && parseInt(u[1], 10) < 15
              return (
                (e._codecs = {
                  mp3: !(
                    i ||
                    (!n && !t.canPlayType('audio/mp3;').replace(/^no$/, ''))
                  ),
                  mpeg: !!n,
                  opus: !!t
                    .canPlayType('audio/ogg; codecs="opus"')
                    .replace(/^no$/, ''),
                  ogg: !!t
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ''),
                  oga: !!t
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ''),
                  wav: !!(
                    t.canPlayType('audio/wav; codecs="1"') ||
                    t.canPlayType('audio/wav')
                  ).replace(/^no$/, ''),
                  aac: !!t.canPlayType('audio/aac;').replace(/^no$/, ''),
                  caf: !!t.canPlayType('audio/x-caf;').replace(/^no$/, ''),
                  m4a: !!(
                    t.canPlayType('audio/x-m4a;') ||
                    t.canPlayType('audio/m4a;') ||
                    t.canPlayType('audio/aac;')
                  ).replace(/^no$/, ''),
                  m4b: !!(
                    t.canPlayType('audio/x-m4b;') ||
                    t.canPlayType('audio/m4b;') ||
                    t.canPlayType('audio/aac;')
                  ).replace(/^no$/, ''),
                  mp4: !!(
                    t.canPlayType('audio/x-mp4;') ||
                    t.canPlayType('audio/mp4;') ||
                    t.canPlayType('audio/aac;')
                  ).replace(/^no$/, ''),
                  weba: !(
                    c ||
                    !t
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, '')
                  ),
                  webm: !(
                    c ||
                    !t
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, '')
                  ),
                  dolby: !!t
                    .canPlayType('audio/mp4; codecs="ec-3"')
                    .replace(/^no$/, ''),
                  flac: !!(
                    t.canPlayType('audio/x-flac;') ||
                    t.canPlayType('audio/flac;')
                  ).replace(/^no$/, ''),
                }),
                e
              )
            },
            _unlockAudio: function () {
              var e = this || a
              if (!e._audioUnlocked && e.ctx) {
                ;(e._audioUnlocked = !1),
                  (e.autoUnlock = !1),
                  e._mobileUnloaded ||
                    44100 === e.ctx.sampleRate ||
                    ((e._mobileUnloaded = !0), e.unload()),
                  (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050))
                var t = function t(n) {
                  for (; e._html5AudioPool.length < e.html5PoolSize; )
                    try {
                      var r = new Audio()
                      ;(r._unlocked = !0), e._releaseHtml5Audio(r)
                    } catch (n) {
                      e.noAudio = !0
                      break
                    }
                  for (var o = 0; o < e._howls.length; o++)
                    if (!e._howls[o]._webAudio)
                      for (
                        var a = e._howls[o]._getSoundIds(), i = 0;
                        i < a.length;
                        i++
                      ) {
                        var l = e._howls[o]._soundById(a[i])
                        l &&
                          l._node &&
                          !l._node._unlocked &&
                          ((l._node._unlocked = !0), l._node.load())
                      }
                  e._autoResume()
                  var u = e.ctx.createBufferSource()
                  ;(u.buffer = e._scratchBuffer),
                    u.connect(e.ctx.destination),
                    'undefined' === typeof u.start ? u.noteOn(0) : u.start(0),
                    'function' === typeof e.ctx.resume && e.ctx.resume(),
                    (u.onended = function () {
                      u.disconnect(0),
                        (e._audioUnlocked = !0),
                        document.removeEventListener('touchstart', t, !0),
                        document.removeEventListener('touchend', t, !0),
                        document.removeEventListener('click', t, !0),
                        document.removeEventListener('keydown', t, !0)
                      for (var n = 0; n < e._howls.length; n++)
                        e._howls[n]._emit('unlock')
                    })
                }
                return (
                  document.addEventListener('touchstart', t, !0),
                  document.addEventListener('touchend', t, !0),
                  document.addEventListener('click', t, !0),
                  document.addEventListener('keydown', t, !0),
                  e
                )
              }
            },
            _obtainHtml5Audio: function () {
              var e = this || a
              if (e._html5AudioPool.length) return e._html5AudioPool.pop()
              var t = new Audio().play()
              return (
                t &&
                  'undefined' !== typeof Promise &&
                  (t instanceof Promise || 'function' === typeof t.then) &&
                  t.catch(function () {
                    console.warn(
                      'HTML5 Audio pool exhausted, returning potentially locked audio object.'
                    )
                  }),
                new Audio()
              )
            },
            _releaseHtml5Audio: function (e) {
              var t = this || a
              return e._unlocked && t._html5AudioPool.push(e), t
            },
            _autoSuspend: function () {
              var e = this
              if (
                e.autoSuspend &&
                e.ctx &&
                'undefined' !== typeof e.ctx.suspend &&
                a.usingWebAudio
              ) {
                for (var t = 0; t < e._howls.length; t++)
                  if (e._howls[t]._webAudio)
                    for (var n = 0; n < e._howls[t]._sounds.length; n++)
                      if (!e._howls[t]._sounds[n]._paused) return e
                return (
                  e._suspendTimer && clearTimeout(e._suspendTimer),
                  (e._suspendTimer = setTimeout(function () {
                    if (e.autoSuspend) {
                      ;(e._suspendTimer = null), (e.state = 'suspending')
                      var t = function () {
                        ;(e.state = 'suspended'),
                          e._resumeAfterSuspend &&
                            (delete e._resumeAfterSuspend, e._autoResume())
                      }
                      e.ctx.suspend().then(t, t)
                    }
                  }, 3e4)),
                  e
                )
              }
            },
            _autoResume: function () {
              var e = this
              if (
                e.ctx &&
                'undefined' !== typeof e.ctx.resume &&
                a.usingWebAudio
              )
                return (
                  'running' === e.state &&
                  'interrupted' !== e.ctx.state &&
                  e._suspendTimer
                    ? (clearTimeout(e._suspendTimer), (e._suspendTimer = null))
                    : 'suspended' === e.state ||
                      ('running' === e.state && 'interrupted' === e.ctx.state)
                    ? (e.ctx.resume().then(function () {
                        e.state = 'running'
                        for (var t = 0; t < e._howls.length; t++)
                          e._howls[t]._emit('resume')
                      }),
                      e._suspendTimer &&
                        (clearTimeout(e._suspendTimer),
                        (e._suspendTimer = null)))
                    : 'suspending' === e.state && (e._resumeAfterSuspend = !0),
                  e
                )
            },
          }
          var a = new o(),
            i = function (e) {
              e.src && 0 !== e.src.length
                ? this.init(e)
                : console.error(
                    'An array of source files must be passed with any new Howl.'
                  )
            }
          i.prototype = {
            init: function (e) {
              var t = this
              return (
                a.ctx || p(),
                (t._autoplay = e.autoplay || !1),
                (t._format =
                  'string' !== typeof e.format ? e.format : [e.format]),
                (t._html5 = e.html5 || !1),
                (t._muted = e.mute || !1),
                (t._loop = e.loop || !1),
                (t._pool = e.pool || 5),
                (t._preload =
                  ('boolean' !== typeof e.preload &&
                    'metadata' !== e.preload) ||
                  e.preload),
                (t._rate = e.rate || 1),
                (t._sprite = e.sprite || {}),
                (t._src = 'string' !== typeof e.src ? e.src : [e.src]),
                (t._volume = void 0 !== e.volume ? e.volume : 1),
                (t._xhr = {
                  method: e.xhr && e.xhr.method ? e.xhr.method : 'GET',
                  headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
                  withCredentials:
                    !(!e.xhr || !e.xhr.withCredentials) &&
                    e.xhr.withCredentials,
                }),
                (t._duration = 0),
                (t._state = 'unloaded'),
                (t._sounds = []),
                (t._endTimers = {}),
                (t._queue = []),
                (t._playLock = !1),
                (t._onend = e.onend ? [{ fn: e.onend }] : []),
                (t._onfade = e.onfade ? [{ fn: e.onfade }] : []),
                (t._onload = e.onload ? [{ fn: e.onload }] : []),
                (t._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : []),
                (t._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : []),
                (t._onpause = e.onpause ? [{ fn: e.onpause }] : []),
                (t._onplay = e.onplay ? [{ fn: e.onplay }] : []),
                (t._onstop = e.onstop ? [{ fn: e.onstop }] : []),
                (t._onmute = e.onmute ? [{ fn: e.onmute }] : []),
                (t._onvolume = e.onvolume ? [{ fn: e.onvolume }] : []),
                (t._onrate = e.onrate ? [{ fn: e.onrate }] : []),
                (t._onseek = e.onseek ? [{ fn: e.onseek }] : []),
                (t._onunlock = e.onunlock ? [{ fn: e.onunlock }] : []),
                (t._onresume = []),
                (t._webAudio = a.usingWebAudio && !t._html5),
                'undefined' !== typeof a.ctx &&
                  a.ctx &&
                  a.autoUnlock &&
                  a._unlockAudio(),
                a._howls.push(t),
                t._autoplay &&
                  t._queue.push({
                    event: 'play',
                    action: function () {
                      t.play()
                    },
                  }),
                t._preload && 'none' !== t._preload && t.load(),
                t
              )
            },
            load: function () {
              var e = this,
                t = null
              if (a.noAudio) e._emit('loaderror', null, 'No audio support.')
              else {
                'string' === typeof e._src && (e._src = [e._src])
                for (var n = 0; n < e._src.length; n++) {
                  var r, o
                  if (e._format && e._format[n]) r = e._format[n]
                  else {
                    if ('string' !== typeof (o = e._src[n])) {
                      e._emit(
                        'loaderror',
                        null,
                        'Non-string found in selected audio sources - ignoring.'
                      )
                      continue
                    }
                    ;(r = /^data:audio\/([^;,]+);/i.exec(o)) ||
                      (r = /\.([^.]+)$/.exec(o.split('?', 1)[0])),
                      r && (r = r[1].toLowerCase())
                  }
                  if (
                    (r ||
                      console.warn(
                        'No file extension was found. Consider using the "format" property or specify an extension.'
                      ),
                    r && a.codecs(r))
                  ) {
                    t = e._src[n]
                    break
                  }
                }
                if (t)
                  return (
                    (e._src = t),
                    (e._state = 'loading'),
                    'https:' === window.location.protocol &&
                      'http:' === t.slice(0, 5) &&
                      ((e._html5 = !0), (e._webAudio = !1)),
                    new l(e),
                    e._webAudio && c(e),
                    e
                  )
                e._emit(
                  'loaderror',
                  null,
                  'No codec support for selected audio sources.'
                )
              }
            },
            play: function (e, t) {
              var n = this,
                r = null
              if ('number' === typeof e) (r = e), (e = null)
              else {
                if (
                  'string' === typeof e &&
                  'loaded' === n._state &&
                  !n._sprite[e]
                )
                  return null
                if (
                  'undefined' === typeof e &&
                  ((e = '__default'), !n._playLock)
                ) {
                  for (var o = 0, i = 0; i < n._sounds.length; i++)
                    n._sounds[i]._paused &&
                      !n._sounds[i]._ended &&
                      (o++, (r = n._sounds[i]._id))
                  1 === o ? (e = null) : (r = null)
                }
              }
              var l = r ? n._soundById(r) : n._inactiveSound()
              if (!l) return null
              if (
                (r && !e && (e = l._sprite || '__default'),
                'loaded' !== n._state)
              ) {
                ;(l._sprite = e), (l._ended = !1)
                var u = l._id
                return (
                  n._queue.push({
                    event: 'play',
                    action: function () {
                      n.play(u)
                    },
                  }),
                  u
                )
              }
              if (r && !l._paused) return t || n._loadQueue('play'), l._id
              n._webAudio && a._autoResume()
              var c = Math.max(
                  0,
                  l._seek > 0 ? l._seek : n._sprite[e][0] / 1e3
                ),
                s = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - c),
                d = (1e3 * s) / Math.abs(l._rate),
                f = n._sprite[e][0] / 1e3,
                p = (n._sprite[e][0] + n._sprite[e][1]) / 1e3
              ;(l._sprite = e), (l._ended = !1)
              var m = function () {
                ;(l._paused = !1),
                  (l._seek = c),
                  (l._start = f),
                  (l._stop = p),
                  (l._loop = !(!l._loop && !n._sprite[e][2]))
              }
              if (!(c >= p)) {
                var v = l._node
                if (n._webAudio) {
                  var g = function () {
                    ;(n._playLock = !1), m(), n._refreshBuffer(l)
                    var e = l._muted || n._muted ? 0 : l._volume
                    v.gain.setValueAtTime(e, a.ctx.currentTime),
                      (l._playStart = a.ctx.currentTime),
                      'undefined' === typeof v.bufferSource.start
                        ? l._loop
                          ? v.bufferSource.noteGrainOn(0, c, 86400)
                          : v.bufferSource.noteGrainOn(0, c, s)
                        : l._loop
                        ? v.bufferSource.start(0, c, 86400)
                        : v.bufferSource.start(0, c, s),
                      d !== 1 / 0 &&
                        (n._endTimers[l._id] = setTimeout(
                          n._ended.bind(n, l),
                          d
                        )),
                      t ||
                        setTimeout(function () {
                          n._emit('play', l._id), n._loadQueue()
                        }, 0)
                  }
                  'running' === a.state && 'interrupted' !== a.ctx.state
                    ? g()
                    : ((n._playLock = !0),
                      n.once('resume', g),
                      n._clearTimer(l._id))
                } else {
                  var h = function () {
                    ;(v.currentTime = c),
                      (v.muted = l._muted || n._muted || a._muted || v.muted),
                      (v.volume = l._volume * a.volume()),
                      (v.playbackRate = l._rate)
                    try {
                      var r = v.play()
                      if (
                        (r &&
                        'undefined' !== typeof Promise &&
                        (r instanceof Promise || 'function' === typeof r.then)
                          ? ((n._playLock = !0),
                            m(),
                            r
                              .then(function () {
                                ;(n._playLock = !1),
                                  (v._unlocked = !0),
                                  t ? n._loadQueue() : n._emit('play', l._id)
                              })
                              .catch(function () {
                                ;(n._playLock = !1),
                                  n._emit(
                                    'playerror',
                                    l._id,
                                    'Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.'
                                  ),
                                  (l._ended = !0),
                                  (l._paused = !0)
                              }))
                          : t ||
                            ((n._playLock = !1), m(), n._emit('play', l._id)),
                        (v.playbackRate = l._rate),
                        v.paused)
                      )
                        return void n._emit(
                          'playerror',
                          l._id,
                          'Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.'
                        )
                      '__default' !== e || l._loop
                        ? (n._endTimers[l._id] = setTimeout(
                            n._ended.bind(n, l),
                            d
                          ))
                        : ((n._endTimers[l._id] = function () {
                            n._ended(l),
                              v.removeEventListener(
                                'ended',
                                n._endTimers[l._id],
                                !1
                              )
                          }),
                          v.addEventListener('ended', n._endTimers[l._id], !1))
                    } catch (o) {
                      n._emit('playerror', l._id, o)
                    }
                  }
                  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA' ===
                    v.src && ((v.src = n._src), v.load())
                  var b =
                    (window && window.ejecta) ||
                    (!v.readyState && a._navigator.isCocoonJS)
                  if (v.readyState >= 3 || b) h()
                  else {
                    ;(n._playLock = !0), (n._state = 'loading')
                    v.addEventListener(
                      a._canPlayEvent,
                      function e() {
                        ;(n._state = 'loaded'),
                          h(),
                          v.removeEventListener(a._canPlayEvent, e, !1)
                      },
                      !1
                    ),
                      n._clearTimer(l._id)
                  }
                }
                return l._id
              }
              n._ended(l)
            },
            pause: function (e) {
              var t = this
              if ('loaded' !== t._state || t._playLock)
                return (
                  t._queue.push({
                    event: 'pause',
                    action: function () {
                      t.pause(e)
                    },
                  }),
                  t
                )
              for (var n = t._getSoundIds(e), r = 0; r < n.length; r++) {
                t._clearTimer(n[r])
                var o = t._soundById(n[r])
                if (
                  o &&
                  !o._paused &&
                  ((o._seek = t.seek(n[r])),
                  (o._rateSeek = 0),
                  (o._paused = !0),
                  t._stopFade(n[r]),
                  o._node)
                )
                  if (t._webAudio) {
                    if (!o._node.bufferSource) continue
                    'undefined' === typeof o._node.bufferSource.stop
                      ? o._node.bufferSource.noteOff(0)
                      : o._node.bufferSource.stop(0),
                      t._cleanBuffer(o._node)
                  } else
                    (isNaN(o._node.duration) && o._node.duration !== 1 / 0) ||
                      o._node.pause()
                arguments[1] || t._emit('pause', o ? o._id : null)
              }
              return t
            },
            stop: function (e, t) {
              var n = this
              if ('loaded' !== n._state || n._playLock)
                return (
                  n._queue.push({
                    event: 'stop',
                    action: function () {
                      n.stop(e)
                    },
                  }),
                  n
                )
              for (var r = n._getSoundIds(e), o = 0; o < r.length; o++) {
                n._clearTimer(r[o])
                var a = n._soundById(r[o])
                a &&
                  ((a._seek = a._start || 0),
                  (a._rateSeek = 0),
                  (a._paused = !0),
                  (a._ended = !0),
                  n._stopFade(r[o]),
                  a._node &&
                    (n._webAudio
                      ? a._node.bufferSource &&
                        ('undefined' === typeof a._node.bufferSource.stop
                          ? a._node.bufferSource.noteOff(0)
                          : a._node.bufferSource.stop(0),
                        n._cleanBuffer(a._node))
                      : (isNaN(a._node.duration) &&
                          a._node.duration !== 1 / 0) ||
                        ((a._node.currentTime = a._start || 0),
                        a._node.pause(),
                        a._node.duration === 1 / 0 && n._clearSound(a._node))),
                  t || n._emit('stop', a._id))
              }
              return n
            },
            mute: function (e, t) {
              var n = this
              if ('loaded' !== n._state || n._playLock)
                return (
                  n._queue.push({
                    event: 'mute',
                    action: function () {
                      n.mute(e, t)
                    },
                  }),
                  n
                )
              if ('undefined' === typeof t) {
                if ('boolean' !== typeof e) return n._muted
                n._muted = e
              }
              for (var r = n._getSoundIds(t), o = 0; o < r.length; o++) {
                var i = n._soundById(r[o])
                i &&
                  ((i._muted = e),
                  i._interval && n._stopFade(i._id),
                  n._webAudio && i._node
                    ? i._node.gain.setValueAtTime(
                        e ? 0 : i._volume,
                        a.ctx.currentTime
                      )
                    : i._node && (i._node.muted = !!a._muted || e),
                  n._emit('mute', i._id))
              }
              return n
            },
            volume: function () {
              var e,
                t,
                n,
                r = this,
                o = arguments
              if (0 === o.length) return r._volume
              if (
                1 === o.length ||
                (2 === o.length && 'undefined' === typeof o[1])
              ) {
                var i = r._getSoundIds(),
                  l = i.indexOf(o[0])
                l >= 0 ? (t = parseInt(o[0], 10)) : (e = parseFloat(o[0]))
              } else
                o.length >= 2 &&
                  ((e = parseFloat(o[0])), (t = parseInt(o[1], 10)))
              if (!('undefined' !== typeof e && e >= 0 && e <= 1))
                return (n = t ? r._soundById(t) : r._sounds[0]) ? n._volume : 0
              if ('loaded' !== r._state || r._playLock)
                return (
                  r._queue.push({
                    event: 'volume',
                    action: function () {
                      r.volume.apply(r, o)
                    },
                  }),
                  r
                )
              'undefined' === typeof t && (r._volume = e),
                (t = r._getSoundIds(t))
              for (var u = 0; u < t.length; u++)
                (n = r._soundById(t[u])) &&
                  ((n._volume = e),
                  o[2] || r._stopFade(t[u]),
                  r._webAudio && n._node && !n._muted
                    ? n._node.gain.setValueAtTime(e, a.ctx.currentTime)
                    : n._node && !n._muted && (n._node.volume = e * a.volume()),
                  r._emit('volume', n._id))
              return r
            },
            fade: function (e, t, n, r) {
              var o = this
              if ('loaded' !== o._state || o._playLock)
                return (
                  o._queue.push({
                    event: 'fade',
                    action: function () {
                      o.fade(e, t, n, r)
                    },
                  }),
                  o
                )
              ;(e = Math.min(Math.max(0, parseFloat(e)), 1)),
                (t = Math.min(Math.max(0, parseFloat(t)), 1)),
                (n = parseFloat(n)),
                o.volume(e, r)
              for (var i = o._getSoundIds(r), l = 0; l < i.length; l++) {
                var u = o._soundById(i[l])
                if (u) {
                  if ((r || o._stopFade(i[l]), o._webAudio && !u._muted)) {
                    var c = a.ctx.currentTime,
                      s = c + n / 1e3
                    ;(u._volume = e),
                      u._node.gain.setValueAtTime(e, c),
                      u._node.gain.linearRampToValueAtTime(t, s)
                  }
                  o._startFadeInterval(
                    u,
                    e,
                    t,
                    n,
                    i[l],
                    'undefined' === typeof r
                  )
                }
              }
              return o
            },
            _startFadeInterval: function (e, t, n, r, o, a) {
              var i = this,
                l = t,
                u = n - t,
                c = Math.abs(u / 0.01),
                s = Math.max(4, c > 0 ? r / c : r),
                d = Date.now()
              ;(e._fadeTo = n),
                (e._interval = setInterval(function () {
                  var o = (Date.now() - d) / r
                  ;(d = Date.now()),
                    (l += u * o),
                    (l = Math.round(100 * l) / 100),
                    (l = u < 0 ? Math.max(n, l) : Math.min(n, l)),
                    i._webAudio ? (e._volume = l) : i.volume(l, e._id, !0),
                    a && (i._volume = l),
                    ((n < t && l <= n) || (n > t && l >= n)) &&
                      (clearInterval(e._interval),
                      (e._interval = null),
                      (e._fadeTo = null),
                      i.volume(n, e._id),
                      i._emit('fade', e._id))
                }, s))
            },
            _stopFade: function (e) {
              var t = this,
                n = t._soundById(e)
              return (
                n &&
                  n._interval &&
                  (t._webAudio &&
                    n._node.gain.cancelScheduledValues(a.ctx.currentTime),
                  clearInterval(n._interval),
                  (n._interval = null),
                  t.volume(n._fadeTo, e),
                  (n._fadeTo = null),
                  t._emit('fade', e)),
                t
              )
            },
            loop: function () {
              var e,
                t,
                n,
                r = this,
                o = arguments
              if (0 === o.length) return r._loop
              if (1 === o.length) {
                if ('boolean' !== typeof o[0])
                  return !!(n = r._soundById(parseInt(o[0], 10))) && n._loop
                ;(e = o[0]), (r._loop = e)
              } else 2 === o.length && ((e = o[0]), (t = parseInt(o[1], 10)))
              for (var a = r._getSoundIds(t), i = 0; i < a.length; i++)
                (n = r._soundById(a[i])) &&
                  ((n._loop = e),
                  r._webAudio &&
                    n._node &&
                    n._node.bufferSource &&
                    ((n._node.bufferSource.loop = e),
                    e &&
                      ((n._node.bufferSource.loopStart = n._start || 0),
                      (n._node.bufferSource.loopEnd = n._stop),
                      r.playing(a[i]) &&
                        (r.pause(a[i], !0), r.play(a[i], !0)))))
              return r
            },
            rate: function () {
              var e,
                t,
                n,
                r = this,
                o = arguments
              if (0 === o.length) t = r._sounds[0]._id
              else if (1 === o.length) {
                var i = r._getSoundIds(),
                  l = i.indexOf(o[0])
                l >= 0 ? (t = parseInt(o[0], 10)) : (e = parseFloat(o[0]))
              } else
                2 === o.length &&
                  ((e = parseFloat(o[0])), (t = parseInt(o[1], 10)))
              if ('number' !== typeof e)
                return (n = r._soundById(t)) ? n._rate : r._rate
              if ('loaded' !== r._state || r._playLock)
                return (
                  r._queue.push({
                    event: 'rate',
                    action: function () {
                      r.rate.apply(r, o)
                    },
                  }),
                  r
                )
              'undefined' === typeof t && (r._rate = e), (t = r._getSoundIds(t))
              for (var u = 0; u < t.length; u++)
                if ((n = r._soundById(t[u]))) {
                  r.playing(t[u]) &&
                    ((n._rateSeek = r.seek(t[u])),
                    (n._playStart = r._webAudio
                      ? a.ctx.currentTime
                      : n._playStart)),
                    (n._rate = e),
                    r._webAudio && n._node && n._node.bufferSource
                      ? n._node.bufferSource.playbackRate.setValueAtTime(
                          e,
                          a.ctx.currentTime
                        )
                      : n._node && (n._node.playbackRate = e)
                  var c = r.seek(t[u]),
                    s =
                      (r._sprite[n._sprite][0] + r._sprite[n._sprite][1]) /
                        1e3 -
                      c,
                    d = (1e3 * s) / Math.abs(n._rate)
                  ;(!r._endTimers[t[u]] && n._paused) ||
                    (r._clearTimer(t[u]),
                    (r._endTimers[t[u]] = setTimeout(r._ended.bind(r, n), d))),
                    r._emit('rate', n._id)
                }
              return r
            },
            seek: function () {
              var e,
                t,
                n = this,
                r = arguments
              if (0 === r.length) n._sounds.length && (t = n._sounds[0]._id)
              else if (1 === r.length) {
                var o = n._getSoundIds(),
                  i = o.indexOf(r[0])
                i >= 0
                  ? (t = parseInt(r[0], 10))
                  : n._sounds.length &&
                    ((t = n._sounds[0]._id), (e = parseFloat(r[0])))
              } else
                2 === r.length &&
                  ((e = parseFloat(r[0])), (t = parseInt(r[1], 10)))
              if ('undefined' === typeof t) return 0
              if (
                'number' === typeof e &&
                ('loaded' !== n._state || n._playLock)
              )
                return (
                  n._queue.push({
                    event: 'seek',
                    action: function () {
                      n.seek.apply(n, r)
                    },
                  }),
                  n
                )
              var l = n._soundById(t)
              if (l) {
                if (!('number' === typeof e && e >= 0)) {
                  if (n._webAudio) {
                    var u = n.playing(t) ? a.ctx.currentTime - l._playStart : 0,
                      c = l._rateSeek ? l._rateSeek - l._seek : 0
                    return l._seek + (c + u * Math.abs(l._rate))
                  }
                  return l._node.currentTime
                }
                var s = n.playing(t)
                s && n.pause(t, !0),
                  (l._seek = e),
                  (l._ended = !1),
                  n._clearTimer(t),
                  n._webAudio ||
                    !l._node ||
                    isNaN(l._node.duration) ||
                    (l._node.currentTime = e)
                var d = function () {
                  s && n.play(t, !0), n._emit('seek', t)
                }
                if (s && !n._webAudio) {
                  var f = function e() {
                    n._playLock ? setTimeout(e, 0) : d()
                  }
                  setTimeout(f, 0)
                } else d()
              }
              return n
            },
            playing: function (e) {
              var t = this
              if ('number' === typeof e) {
                var n = t._soundById(e)
                return !!n && !n._paused
              }
              for (var r = 0; r < t._sounds.length; r++)
                if (!t._sounds[r]._paused) return !0
              return !1
            },
            duration: function (e) {
              var t = this,
                n = t._duration,
                r = t._soundById(e)
              return r && (n = t._sprite[r._sprite][1] / 1e3), n
            },
            state: function () {
              return this._state
            },
            unload: function () {
              for (var e = this, t = e._sounds, n = 0; n < t.length; n++)
                t[n]._paused || e.stop(t[n]._id),
                  e._webAudio ||
                    (e._clearSound(t[n]._node),
                    t[n]._node.removeEventListener('error', t[n]._errorFn, !1),
                    t[n]._node.removeEventListener(
                      a._canPlayEvent,
                      t[n]._loadFn,
                      !1
                    ),
                    t[n]._node.removeEventListener('ended', t[n]._endFn, !1),
                    a._releaseHtml5Audio(t[n]._node)),
                  delete t[n]._node,
                  e._clearTimer(t[n]._id)
              var r = a._howls.indexOf(e)
              r >= 0 && a._howls.splice(r, 1)
              var o = !0
              for (n = 0; n < a._howls.length; n++)
                if (
                  a._howls[n]._src === e._src ||
                  e._src.indexOf(a._howls[n]._src) >= 0
                ) {
                  o = !1
                  break
                }
              return (
                u && o && delete u[e._src],
                (a.noAudio = !1),
                (e._state = 'unloaded'),
                (e._sounds = []),
                (e = null),
                null
              )
            },
            on: function (e, t, n, r) {
              var o = this['_on' + e]
              return (
                'function' === typeof t &&
                  o.push(r ? { id: n, fn: t, once: r } : { id: n, fn: t }),
                this
              )
            },
            off: function (e, t, n) {
              var r = this,
                o = r['_on' + e],
                a = 0
              if (('number' === typeof t && ((n = t), (t = null)), t || n))
                for (a = 0; a < o.length; a++) {
                  var i = n === o[a].id
                  if ((t === o[a].fn && i) || (!t && i)) {
                    o.splice(a, 1)
                    break
                  }
                }
              else if (e) r['_on' + e] = []
              else {
                var l = Object.keys(r)
                for (a = 0; a < l.length; a++)
                  0 === l[a].indexOf('_on') &&
                    Array.isArray(r[l[a]]) &&
                    (r[l[a]] = [])
              }
              return r
            },
            once: function (e, t, n) {
              return this.on(e, t, n, 1), this
            },
            _emit: function (e, t, n) {
              for (
                var r = this, o = r['_on' + e], a = o.length - 1;
                a >= 0;
                a--
              )
                (o[a].id && o[a].id !== t && 'load' !== e) ||
                  (setTimeout(
                    function (e) {
                      e.call(this, t, n)
                    }.bind(r, o[a].fn),
                    0
                  ),
                  o[a].once && r.off(e, o[a].fn, o[a].id))
              return r._loadQueue(e), r
            },
            _loadQueue: function (e) {
              var t = this
              if (t._queue.length > 0) {
                var n = t._queue[0]
                n.event === e && (t._queue.shift(), t._loadQueue()),
                  e || n.action()
              }
              return t
            },
            _ended: function (e) {
              var t = this,
                n = e._sprite
              if (
                !t._webAudio &&
                e._node &&
                !e._node.paused &&
                !e._node.ended &&
                e._node.currentTime < e._stop
              )
                return setTimeout(t._ended.bind(t, e), 100), t
              var r = !(!e._loop && !t._sprite[n][2])
              if (
                (t._emit('end', e._id),
                !t._webAudio && r && t.stop(e._id, !0).play(e._id),
                t._webAudio && r)
              ) {
                t._emit('play', e._id),
                  (e._seek = e._start || 0),
                  (e._rateSeek = 0),
                  (e._playStart = a.ctx.currentTime)
                var o = (1e3 * (e._stop - e._start)) / Math.abs(e._rate)
                t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), o)
              }
              return (
                t._webAudio &&
                  !r &&
                  ((e._paused = !0),
                  (e._ended = !0),
                  (e._seek = e._start || 0),
                  (e._rateSeek = 0),
                  t._clearTimer(e._id),
                  t._cleanBuffer(e._node),
                  a._autoSuspend()),
                t._webAudio || r || t.stop(e._id, !0),
                t
              )
            },
            _clearTimer: function (e) {
              var t = this
              if (t._endTimers[e]) {
                if ('function' !== typeof t._endTimers[e])
                  clearTimeout(t._endTimers[e])
                else {
                  var n = t._soundById(e)
                  n &&
                    n._node &&
                    n._node.removeEventListener('ended', t._endTimers[e], !1)
                }
                delete t._endTimers[e]
              }
              return t
            },
            _soundById: function (e) {
              for (var t = this, n = 0; n < t._sounds.length; n++)
                if (e === t._sounds[n]._id) return t._sounds[n]
              return null
            },
            _inactiveSound: function () {
              var e = this
              e._drain()
              for (var t = 0; t < e._sounds.length; t++)
                if (e._sounds[t]._ended) return e._sounds[t].reset()
              return new l(e)
            },
            _drain: function () {
              var e = this,
                t = e._pool,
                n = 0,
                r = 0
              if (!(e._sounds.length < t)) {
                for (r = 0; r < e._sounds.length; r++)
                  e._sounds[r]._ended && n++
                for (r = e._sounds.length - 1; r >= 0; r--) {
                  if (n <= t) return
                  e._sounds[r]._ended &&
                    (e._webAudio &&
                      e._sounds[r]._node &&
                      e._sounds[r]._node.disconnect(0),
                    e._sounds.splice(r, 1),
                    n--)
                }
              }
            },
            _getSoundIds: function (e) {
              if ('undefined' === typeof e) {
                for (var t = [], n = 0; n < this._sounds.length; n++)
                  t.push(this._sounds[n]._id)
                return t
              }
              return [e]
            },
            _refreshBuffer: function (e) {
              return (
                (e._node.bufferSource = a.ctx.createBufferSource()),
                (e._node.bufferSource.buffer = u[this._src]),
                e._panner
                  ? e._node.bufferSource.connect(e._panner)
                  : e._node.bufferSource.connect(e._node),
                (e._node.bufferSource.loop = e._loop),
                e._loop &&
                  ((e._node.bufferSource.loopStart = e._start || 0),
                  (e._node.bufferSource.loopEnd = e._stop || 0)),
                e._node.bufferSource.playbackRate.setValueAtTime(
                  e._rate,
                  a.ctx.currentTime
                ),
                this
              )
            },
            _cleanBuffer: function (e) {
              var t = a._navigator && a._navigator.vendor.indexOf('Apple') >= 0
              if (
                a._scratchBuffer &&
                e.bufferSource &&
                ((e.bufferSource.onended = null),
                e.bufferSource.disconnect(0),
                t)
              )
                try {
                  e.bufferSource.buffer = a._scratchBuffer
                } catch (n) {}
              return (e.bufferSource = null), this
            },
            _clearSound: function (e) {
              ;/MSIE |Trident\//.test(a._navigator && a._navigator.userAgent) ||
                (e.src =
                  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA')
            },
          }
          var l = function (e) {
            ;(this._parent = e), this.init()
          }
          l.prototype = {
            init: function () {
              var e = this,
                t = e._parent
              return (
                (e._muted = t._muted),
                (e._loop = t._loop),
                (e._volume = t._volume),
                (e._rate = t._rate),
                (e._seek = 0),
                (e._paused = !0),
                (e._ended = !0),
                (e._sprite = '__default'),
                (e._id = ++a._counter),
                t._sounds.push(e),
                e.create(),
                e
              )
            },
            create: function () {
              var e = this,
                t = e._parent,
                n = a._muted || e._muted || e._parent._muted ? 0 : e._volume
              return (
                t._webAudio
                  ? ((e._node =
                      'undefined' === typeof a.ctx.createGain
                        ? a.ctx.createGainNode()
                        : a.ctx.createGain()),
                    e._node.gain.setValueAtTime(n, a.ctx.currentTime),
                    (e._node.paused = !0),
                    e._node.connect(a.masterGain))
                  : a.noAudio ||
                    ((e._node = a._obtainHtml5Audio()),
                    (e._errorFn = e._errorListener.bind(e)),
                    e._node.addEventListener('error', e._errorFn, !1),
                    (e._loadFn = e._loadListener.bind(e)),
                    e._node.addEventListener(a._canPlayEvent, e._loadFn, !1),
                    (e._endFn = e._endListener.bind(e)),
                    e._node.addEventListener('ended', e._endFn, !1),
                    (e._node.src = t._src),
                    (e._node.preload = !0 === t._preload ? 'auto' : t._preload),
                    (e._node.volume = n * a.volume()),
                    e._node.load()),
                e
              )
            },
            reset: function () {
              var e = this,
                t = e._parent
              return (
                (e._muted = t._muted),
                (e._loop = t._loop),
                (e._volume = t._volume),
                (e._rate = t._rate),
                (e._seek = 0),
                (e._rateSeek = 0),
                (e._paused = !0),
                (e._ended = !0),
                (e._sprite = '__default'),
                (e._id = ++a._counter),
                e
              )
            },
            _errorListener: function () {
              var e = this
              e._parent._emit(
                'loaderror',
                e._id,
                e._node.error ? e._node.error.code : 0
              ),
                e._node.removeEventListener('error', e._errorFn, !1)
            },
            _loadListener: function () {
              var e = this,
                t = e._parent
              ;(t._duration = Math.ceil(10 * e._node.duration) / 10),
                0 === Object.keys(t._sprite).length &&
                  (t._sprite = {
                    __default: [0, 1e3 * t._duration],
                  }),
                'loaded' !== t._state &&
                  ((t._state = 'loaded'), t._emit('load'), t._loadQueue()),
                e._node.removeEventListener(a._canPlayEvent, e._loadFn, !1)
            },
            _endListener: function () {
              var e = this,
                t = e._parent
              t._duration === 1 / 0 &&
                ((t._duration = Math.ceil(10 * e._node.duration) / 10),
                t._sprite.__default[1] === 1 / 0 &&
                  (t._sprite.__default[1] = 1e3 * t._duration),
                t._ended(e)),
                e._node.removeEventListener('ended', e._endFn, !1)
            },
          }
          var u = {},
            c = function (e) {
              var t = e._src
              if (u[t]) return (e._duration = u[t].duration), void f(e)
              if (/^data:[^;]+;base64,/.test(t)) {
                for (
                  var n = atob(t.split(',')[1]),
                    r = new Uint8Array(n.length),
                    o = 0;
                  o < n.length;
                  ++o
                )
                  r[o] = n.charCodeAt(o)
                d(r.buffer, e)
              } else {
                var a = new XMLHttpRequest()
                a.open(e._xhr.method, t, !0),
                  (a.withCredentials = e._xhr.withCredentials),
                  (a.responseType = 'arraybuffer'),
                  e._xhr.headers &&
                    Object.keys(e._xhr.headers).forEach(function (t) {
                      a.setRequestHeader(t, e._xhr.headers[t])
                    }),
                  (a.onload = function () {
                    var t = (a.status + '')[0]
                    '0' === t || '2' === t || '3' === t
                      ? d(a.response, e)
                      : e._emit(
                          'loaderror',
                          null,
                          'Failed loading audio file with status: ' +
                            a.status +
                            '.'
                        )
                  }),
                  (a.onerror = function () {
                    e._webAudio &&
                      ((e._html5 = !0),
                      (e._webAudio = !1),
                      (e._sounds = []),
                      delete u[t],
                      e.load())
                  }),
                  s(a)
              }
            },
            s = function (e) {
              try {
                e.send()
              } catch (t) {
                e.onerror()
              }
            },
            d = function (e, t) {
              var n = function () {
                  t._emit('loaderror', null, 'Decoding audio data failed.')
                },
                r = function (e) {
                  e && t._sounds.length > 0 ? ((u[t._src] = e), f(t, e)) : n()
                }
              'undefined' !== typeof Promise &&
              1 === a.ctx.decodeAudioData.length
                ? a.ctx.decodeAudioData(e).then(r).catch(n)
                : a.ctx.decodeAudioData(e, r, n)
            },
            f = function (e, t) {
              t && !e._duration && (e._duration = t.duration),
                0 === Object.keys(e._sprite).length &&
                  (e._sprite = {
                    __default: [0, 1e3 * e._duration],
                  }),
                'loaded' !== e._state &&
                  ((e._state = 'loaded'), e._emit('load'), e._loadQueue())
            },
            p = function () {
              if (a.usingWebAudio) {
                try {
                  'undefined' !== typeof AudioContext
                    ? (a.ctx = new AudioContext())
                    : 'undefined' !== typeof webkitAudioContext
                    ? (a.ctx = new webkitAudioContext())
                    : (a.usingWebAudio = !1)
                } catch (o) {
                  a.usingWebAudio = !1
                }
                a.ctx || (a.usingWebAudio = !1)
                var e = /iP(hone|od|ad)/.test(
                    a._navigator && a._navigator.platform
                  ),
                  t =
                    a._navigator &&
                    a._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                  n = t ? parseInt(t[1], 10) : null
                if (e && n && n < 9) {
                  var r = /safari/.test(
                    a._navigator && a._navigator.userAgent.toLowerCase()
                  )
                  a._navigator && !r && (a.usingWebAudio = !1)
                }
                a.usingWebAudio &&
                  ((a.masterGain =
                    'undefined' === typeof a.ctx.createGain
                      ? a.ctx.createGainNode()
                      : a.ctx.createGain()),
                  a.masterGain.gain.setValueAtTime(
                    a._muted ? 0 : a._volume,
                    a.ctx.currentTime
                  ),
                  a.masterGain.connect(a.ctx.destination)),
                  a._setup()
              }
            }
          void 0 ===
            (r = function () {
              return { Howler: a, Howl: i }
            }.apply(t, [])) || (e.exports = r),
            (t.Howler = a),
            (t.Howl = i),
            'undefined' !== typeof n.g
              ? ((n.g.HowlerGlobal = o),
                (n.g.Howler = a),
                (n.g.Howl = i),
                (n.g.Sound = l))
              : 'undefined' !== typeof window &&
                ((window.HowlerGlobal = o),
                (window.Howler = a),
                (window.Howl = i),
                (window.Sound = l))
        })(),
          (function () {
            'use strict'
            var e
            ;(HowlerGlobal.prototype._pos = [0, 0, 0]),
              (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
              (HowlerGlobal.prototype.stereo = function (e) {
                var t = this
                if (!t.ctx || !t.ctx.listener) return t
                for (var n = t._howls.length - 1; n >= 0; n--)
                  t._howls[n].stereo(e)
                return t
              }),
              (HowlerGlobal.prototype.pos = function (e, t, n) {
                var r = this
                return r.ctx && r.ctx.listener
                  ? ((t = 'number' !== typeof t ? r._pos[1] : t),
                    (n = 'number' !== typeof n ? r._pos[2] : n),
                    'number' !== typeof e
                      ? r._pos
                      : ((r._pos = [e, t, n]),
                        'undefined' !== typeof r.ctx.listener.positionX
                          ? (r.ctx.listener.positionX.setTargetAtTime(
                              r._pos[0],
                              Howler.ctx.currentTime,
                              0.1
                            ),
                            r.ctx.listener.positionY.setTargetAtTime(
                              r._pos[1],
                              Howler.ctx.currentTime,
                              0.1
                            ),
                            r.ctx.listener.positionZ.setTargetAtTime(
                              r._pos[2],
                              Howler.ctx.currentTime,
                              0.1
                            ))
                          : r.ctx.listener.setPosition(
                              r._pos[0],
                              r._pos[1],
                              r._pos[2]
                            ),
                        r))
                  : r
              }),
              (HowlerGlobal.prototype.orientation = function (
                e,
                t,
                n,
                r,
                o,
                a
              ) {
                var i = this
                if (!i.ctx || !i.ctx.listener) return i
                var l = i._orientation
                return (
                  (t = 'number' !== typeof t ? l[1] : t),
                  (n = 'number' !== typeof n ? l[2] : n),
                  (r = 'number' !== typeof r ? l[3] : r),
                  (o = 'number' !== typeof o ? l[4] : o),
                  (a = 'number' !== typeof a ? l[5] : a),
                  'number' !== typeof e
                    ? l
                    : ((i._orientation = [e, t, n, r, o, a]),
                      'undefined' !== typeof i.ctx.listener.forwardX
                        ? (i.ctx.listener.forwardX.setTargetAtTime(
                            e,
                            Howler.ctx.currentTime,
                            0.1
                          ),
                          i.ctx.listener.forwardY.setTargetAtTime(
                            t,
                            Howler.ctx.currentTime,
                            0.1
                          ),
                          i.ctx.listener.forwardZ.setTargetAtTime(
                            n,
                            Howler.ctx.currentTime,
                            0.1
                          ),
                          i.ctx.listener.upX.setTargetAtTime(
                            r,
                            Howler.ctx.currentTime,
                            0.1
                          ),
                          i.ctx.listener.upY.setTargetAtTime(
                            o,
                            Howler.ctx.currentTime,
                            0.1
                          ),
                          i.ctx.listener.upZ.setTargetAtTime(
                            a,
                            Howler.ctx.currentTime,
                            0.1
                          ))
                        : i.ctx.listener.setOrientation(e, t, n, r, o, a),
                      i)
                )
              }),
              (Howl.prototype.init =
                ((e = Howl.prototype.init),
                function (t) {
                  var n = this
                  return (
                    (n._orientation = t.orientation || [1, 0, 0]),
                    (n._stereo = t.stereo || null),
                    (n._pos = t.pos || null),
                    (n._pannerAttr = {
                      coneInnerAngle:
                        'undefined' !== typeof t.coneInnerAngle
                          ? t.coneInnerAngle
                          : 360,
                      coneOuterAngle:
                        'undefined' !== typeof t.coneOuterAngle
                          ? t.coneOuterAngle
                          : 360,
                      coneOuterGain:
                        'undefined' !== typeof t.coneOuterGain
                          ? t.coneOuterGain
                          : 0,
                      distanceModel:
                        'undefined' !== typeof t.distanceModel
                          ? t.distanceModel
                          : 'inverse',
                      maxDistance:
                        'undefined' !== typeof t.maxDistance
                          ? t.maxDistance
                          : 1e4,
                      panningModel:
                        'undefined' !== typeof t.panningModel
                          ? t.panningModel
                          : 'HRTF',
                      refDistance:
                        'undefined' !== typeof t.refDistance
                          ? t.refDistance
                          : 1,
                      rolloffFactor:
                        'undefined' !== typeof t.rolloffFactor
                          ? t.rolloffFactor
                          : 1,
                    }),
                    (n._onstereo = t.onstereo ? [{ fn: t.onstereo }] : []),
                    (n._onpos = t.onpos ? [{ fn: t.onpos }] : []),
                    (n._onorientation = t.onorientation
                      ? [{ fn: t.onorientation }]
                      : []),
                    e.call(this, t)
                  )
                })),
              (Howl.prototype.stereo = function (e, n) {
                var r = this
                if (!r._webAudio) return r
                if ('loaded' !== r._state)
                  return (
                    r._queue.push({
                      event: 'stereo',
                      action: function () {
                        r.stereo(e, n)
                      },
                    }),
                    r
                  )
                var o =
                  'undefined' === typeof Howler.ctx.createStereoPanner
                    ? 'spatial'
                    : 'stereo'
                if ('undefined' === typeof n) {
                  if ('number' !== typeof e) return r._stereo
                  ;(r._stereo = e), (r._pos = [e, 0, 0])
                }
                for (var a = r._getSoundIds(n), i = 0; i < a.length; i++) {
                  var l = r._soundById(a[i])
                  if (l) {
                    if ('number' !== typeof e) return l._stereo
                    ;(l._stereo = e),
                      (l._pos = [e, 0, 0]),
                      l._node &&
                        ((l._pannerAttr.panningModel = 'equalpower'),
                        (l._panner && l._panner.pan) || t(l, o),
                        'spatial' === o
                          ? 'undefined' !== typeof l._panner.positionX
                            ? (l._panner.positionX.setValueAtTime(
                                e,
                                Howler.ctx.currentTime
                              ),
                              l._panner.positionY.setValueAtTime(
                                0,
                                Howler.ctx.currentTime
                              ),
                              l._panner.positionZ.setValueAtTime(
                                0,
                                Howler.ctx.currentTime
                              ))
                            : l._panner.setPosition(e, 0, 0)
                          : l._panner.pan.setValueAtTime(
                              e,
                              Howler.ctx.currentTime
                            )),
                      r._emit('stereo', l._id)
                  }
                }
                return r
              }),
              (Howl.prototype.pos = function (e, n, r, o) {
                var a = this
                if (!a._webAudio) return a
                if ('loaded' !== a._state)
                  return (
                    a._queue.push({
                      event: 'pos',
                      action: function () {
                        a.pos(e, n, r, o)
                      },
                    }),
                    a
                  )
                if (
                  ((n = 'number' !== typeof n ? 0 : n),
                  (r = 'number' !== typeof r ? -0.5 : r),
                  'undefined' === typeof o)
                ) {
                  if ('number' !== typeof e) return a._pos
                  a._pos = [e, n, r]
                }
                for (var i = a._getSoundIds(o), l = 0; l < i.length; l++) {
                  var u = a._soundById(i[l])
                  if (u) {
                    if ('number' !== typeof e) return u._pos
                    ;(u._pos = [e, n, r]),
                      u._node &&
                        ((u._panner && !u._panner.pan) || t(u, 'spatial'),
                        'undefined' !== typeof u._panner.positionX
                          ? (u._panner.positionX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime
                            ),
                            u._panner.positionY.setValueAtTime(
                              n,
                              Howler.ctx.currentTime
                            ),
                            u._panner.positionZ.setValueAtTime(
                              r,
                              Howler.ctx.currentTime
                            ))
                          : u._panner.setPosition(e, n, r)),
                      a._emit('pos', u._id)
                  }
                }
                return a
              }),
              (Howl.prototype.orientation = function (e, n, r, o) {
                var a = this
                if (!a._webAudio) return a
                if ('loaded' !== a._state)
                  return (
                    a._queue.push({
                      event: 'orientation',
                      action: function () {
                        a.orientation(e, n, r, o)
                      },
                    }),
                    a
                  )
                if (
                  ((n = 'number' !== typeof n ? a._orientation[1] : n),
                  (r = 'number' !== typeof r ? a._orientation[2] : r),
                  'undefined' === typeof o)
                ) {
                  if ('number' !== typeof e) return a._orientation
                  a._orientation = [e, n, r]
                }
                for (var i = a._getSoundIds(o), l = 0; l < i.length; l++) {
                  var u = a._soundById(i[l])
                  if (u) {
                    if ('number' !== typeof e) return u._orientation
                    ;(u._orientation = [e, n, r]),
                      u._node &&
                        (u._panner ||
                          (u._pos || (u._pos = a._pos || [0, 0, -0.5]),
                          t(u, 'spatial')),
                        'undefined' !== typeof u._panner.orientationX
                          ? (u._panner.orientationX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime
                            ),
                            u._panner.orientationY.setValueAtTime(
                              n,
                              Howler.ctx.currentTime
                            ),
                            u._panner.orientationZ.setValueAtTime(
                              r,
                              Howler.ctx.currentTime
                            ))
                          : u._panner.setOrientation(e, n, r)),
                      a._emit('orientation', u._id)
                  }
                }
                return a
              }),
              (Howl.prototype.pannerAttr = function () {
                var e,
                  n,
                  r,
                  o = this,
                  a = arguments
                if (!o._webAudio) return o
                if (0 === a.length) return o._pannerAttr
                if (1 === a.length) {
                  if ('object' !== typeof a[0])
                    return (r = o._soundById(parseInt(a[0], 10)))
                      ? r._pannerAttr
                      : o._pannerAttr
                  ;(e = a[0]),
                    'undefined' === typeof n &&
                      (e.pannerAttr ||
                        (e.pannerAttr = {
                          coneInnerAngle: e.coneInnerAngle,
                          coneOuterAngle: e.coneOuterAngle,
                          coneOuterGain: e.coneOuterGain,
                          distanceModel: e.distanceModel,
                          maxDistance: e.maxDistance,
                          refDistance: e.refDistance,
                          rolloffFactor: e.rolloffFactor,
                          panningModel: e.panningModel,
                        }),
                      (o._pannerAttr = {
                        coneInnerAngle:
                          'undefined' !== typeof e.pannerAttr.coneInnerAngle
                            ? e.pannerAttr.coneInnerAngle
                            : o._coneInnerAngle,
                        coneOuterAngle:
                          'undefined' !== typeof e.pannerAttr.coneOuterAngle
                            ? e.pannerAttr.coneOuterAngle
                            : o._coneOuterAngle,
                        coneOuterGain:
                          'undefined' !== typeof e.pannerAttr.coneOuterGain
                            ? e.pannerAttr.coneOuterGain
                            : o._coneOuterGain,
                        distanceModel:
                          'undefined' !== typeof e.pannerAttr.distanceModel
                            ? e.pannerAttr.distanceModel
                            : o._distanceModel,
                        maxDistance:
                          'undefined' !== typeof e.pannerAttr.maxDistance
                            ? e.pannerAttr.maxDistance
                            : o._maxDistance,
                        refDistance:
                          'undefined' !== typeof e.pannerAttr.refDistance
                            ? e.pannerAttr.refDistance
                            : o._refDistance,
                        rolloffFactor:
                          'undefined' !== typeof e.pannerAttr.rolloffFactor
                            ? e.pannerAttr.rolloffFactor
                            : o._rolloffFactor,
                        panningModel:
                          'undefined' !== typeof e.pannerAttr.panningModel
                            ? e.pannerAttr.panningModel
                            : o._panningModel,
                      }))
                } else 2 === a.length && ((e = a[0]), (n = parseInt(a[1], 10)))
                for (var i = o._getSoundIds(n), l = 0; l < i.length; l++)
                  if ((r = o._soundById(i[l]))) {
                    var u = r._pannerAttr
                    u = {
                      coneInnerAngle:
                        'undefined' !== typeof e.coneInnerAngle
                          ? e.coneInnerAngle
                          : u.coneInnerAngle,
                      coneOuterAngle:
                        'undefined' !== typeof e.coneOuterAngle
                          ? e.coneOuterAngle
                          : u.coneOuterAngle,
                      coneOuterGain:
                        'undefined' !== typeof e.coneOuterGain
                          ? e.coneOuterGain
                          : u.coneOuterGain,
                      distanceModel:
                        'undefined' !== typeof e.distanceModel
                          ? e.distanceModel
                          : u.distanceModel,
                      maxDistance:
                        'undefined' !== typeof e.maxDistance
                          ? e.maxDistance
                          : u.maxDistance,
                      refDistance:
                        'undefined' !== typeof e.refDistance
                          ? e.refDistance
                          : u.refDistance,
                      rolloffFactor:
                        'undefined' !== typeof e.rolloffFactor
                          ? e.rolloffFactor
                          : u.rolloffFactor,
                      panningModel:
                        'undefined' !== typeof e.panningModel
                          ? e.panningModel
                          : u.panningModel,
                    }
                    var c = r._panner
                    c
                      ? ((c.coneInnerAngle = u.coneInnerAngle),
                        (c.coneOuterAngle = u.coneOuterAngle),
                        (c.coneOuterGain = u.coneOuterGain),
                        (c.distanceModel = u.distanceModel),
                        (c.maxDistance = u.maxDistance),
                        (c.refDistance = u.refDistance),
                        (c.rolloffFactor = u.rolloffFactor),
                        (c.panningModel = u.panningModel))
                      : (r._pos || (r._pos = o._pos || [0, 0, -0.5]),
                        t(r, 'spatial'))
                  }
                return o
              }),
              (Sound.prototype.init = (function (e) {
                return function () {
                  var t = this,
                    n = t._parent
                  ;(t._orientation = n._orientation),
                    (t._stereo = n._stereo),
                    (t._pos = n._pos),
                    (t._pannerAttr = n._pannerAttr),
                    e.call(this),
                    t._stereo
                      ? n.stereo(t._stereo)
                      : t._pos && n.pos(t._pos[0], t._pos[1], t._pos[2], t._id)
                }
              })(Sound.prototype.init)),
              (Sound.prototype.reset = (function (e) {
                return function () {
                  var t = this,
                    n = t._parent
                  return (
                    (t._orientation = n._orientation),
                    (t._stereo = n._stereo),
                    (t._pos = n._pos),
                    (t._pannerAttr = n._pannerAttr),
                    t._stereo
                      ? n.stereo(t._stereo)
                      : t._pos
                      ? n.pos(t._pos[0], t._pos[1], t._pos[2], t._id)
                      : t._panner &&
                        (t._panner.disconnect(0),
                        (t._panner = void 0),
                        n._refreshBuffer(t)),
                    e.call(this)
                  )
                }
              })(Sound.prototype.reset))
            var t = function (e, t) {
              'spatial' === (t = t || 'spatial')
                ? ((e._panner = Howler.ctx.createPanner()),
                  (e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle),
                  (e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle),
                  (e._panner.coneOuterGain = e._pannerAttr.coneOuterGain),
                  (e._panner.distanceModel = e._pannerAttr.distanceModel),
                  (e._panner.maxDistance = e._pannerAttr.maxDistance),
                  (e._panner.refDistance = e._pannerAttr.refDistance),
                  (e._panner.rolloffFactor = e._pannerAttr.rolloffFactor),
                  (e._panner.panningModel = e._pannerAttr.panningModel),
                  'undefined' !== typeof e._panner.positionX
                    ? (e._panner.positionX.setValueAtTime(
                        e._pos[0],
                        Howler.ctx.currentTime
                      ),
                      e._panner.positionY.setValueAtTime(
                        e._pos[1],
                        Howler.ctx.currentTime
                      ),
                      e._panner.positionZ.setValueAtTime(
                        e._pos[2],
                        Howler.ctx.currentTime
                      ))
                    : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
                  'undefined' !== typeof e._panner.orientationX
                    ? (e._panner.orientationX.setValueAtTime(
                        e._orientation[0],
                        Howler.ctx.currentTime
                      ),
                      e._panner.orientationY.setValueAtTime(
                        e._orientation[1],
                        Howler.ctx.currentTime
                      ),
                      e._panner.orientationZ.setValueAtTime(
                        e._orientation[2],
                        Howler.ctx.currentTime
                      ))
                    : e._panner.setOrientation(
                        e._orientation[0],
                        e._orientation[1],
                        e._orientation[2]
                      ))
                : ((e._panner = Howler.ctx.createStereoPanner()),
                  e._panner.pan.setValueAtTime(
                    e._stereo,
                    Howler.ctx.currentTime
                  )),
                e._panner.connect(e._node),
                e._paused || e._parent.pause(e._id, !0).play(e._id, !0)
            }
          })()
      },
      234: function (e, t) {
        'use strict'
        var n = 60103,
          r = 60106,
          o = 60107,
          a = 60108,
          i = 60114,
          l = 60109,
          u = 60110,
          c = 60112,
          s = 60113,
          d = 60120,
          f = 60115,
          p = 60116,
          m = 60121,
          v = 60122,
          g = 60117,
          h = 60129,
          b = 60131
        if ('function' === typeof Symbol && Symbol.for) {
          var y = Symbol.for
          ;(n = y('react.element')),
            (r = y('react.portal')),
            (o = y('react.fragment')),
            (a = y('react.strict_mode')),
            (i = y('react.profiler')),
            (l = y('react.provider')),
            (u = y('react.context')),
            (c = y('react.forward_ref')),
            (s = y('react.suspense')),
            (d = y('react.suspense_list')),
            (f = y('react.memo')),
            (p = y('react.lazy')),
            (m = y('react.block')),
            (v = y('react.server.block')),
            (g = y('react.fundamental')),
            (h = y('react.debug_trace_mode')),
            (b = y('react.legacy_hidden'))
        }
        function _(e) {
          if ('object' === typeof e && null !== e) {
            var t = e.$$typeof
            switch (t) {
              case n:
                switch ((e = e.type)) {
                  case o:
                  case i:
                  case a:
                  case s:
                  case d:
                    return e
                  default:
                    switch ((e = e && e.$$typeof)) {
                      case u:
                      case c:
                      case p:
                      case f:
                      case l:
                        return e
                      default:
                        return t
                    }
                }
              case r:
                return t
            }
          }
        }
        t.isContextConsumer = function (e) {
          return _(e) === u
        }
      },
      556: function (e, t, n) {
        'use strict'
        e.exports = n(234)
      },
      463: function (e, t, n) {
        'use strict'
        var r = n(791),
          o = n(296)
        function a(e) {
          for (
            var t =
                'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += '&args[]=' + encodeURIComponent(arguments[n])
          return (
            'Minified React error #' +
            e +
            '; visit ' +
            t +
            ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
          )
        }
        var i = new Set(),
          l = {}
        function u(e, t) {
          c(e, t), c(e + 'Capture', t)
        }
        function c(e, t) {
          for (l[e] = t, e = 0; e < t.length; e++) i.add(t[e])
        }
        var s = !(
            'undefined' === typeof window ||
            'undefined' === typeof window.document ||
            'undefined' === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          f =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          p = {},
          m = {}
        function v(e, t, n, r, o, a, i) {
          ;(this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = o),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = a),
            (this.removeEmptyString = i)
        }
        var g = {}
        'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
          .split(' ')
          .forEach(function (e) {
            g[e] = new v(e, 0, !1, e, null, !1, !1)
          }),
          [
            ['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv'],
          ].forEach(function (e) {
            var t = e[0]
            g[t] = new v(t, 1, !1, e[1], null, !1, !1)
          }),
          ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
            function (e) {
              g[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1)
            }
          ),
          [
            'autoReverse',
            'externalResourcesRequired',
            'focusable',
            'preserveAlpha',
          ].forEach(function (e) {
            g[e] = new v(e, 2, !1, e, null, !1, !1)
          }),
          'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
            .split(' ')
            .forEach(function (e) {
              g[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1)
            }),
          ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
            g[e] = new v(e, 3, !0, e, null, !1, !1)
          }),
          ['capture', 'download'].forEach(function (e) {
            g[e] = new v(e, 4, !1, e, null, !1, !1)
          }),
          ['cols', 'rows', 'size', 'span'].forEach(function (e) {
            g[e] = new v(e, 6, !1, e, null, !1, !1)
          }),
          ['rowSpan', 'start'].forEach(function (e) {
            g[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1)
          })
        var h = /[\-:]([a-z])/g
        function b(e) {
          return e[1].toUpperCase()
        }
        function y(e, t, n, r) {
          var o = g.hasOwnProperty(t) ? g[t] : null
          ;(null !== o
            ? 0 !== o.type
            : r ||
              !(2 < t.length) ||
              ('o' !== t[0] && 'O' !== t[0]) ||
              ('n' !== t[1] && 'N' !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                'undefined' === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1
                  switch (typeof t) {
                    case 'function':
                    case 'symbol':
                      return !0
                    case 'boolean':
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : 'data-' !== (e = e.toLowerCase().slice(0, 5)) &&
                            'aria-' !== e)
                      )
                    default:
                      return !1
                  }
                })(e, t, n, r)
              )
                return !0
              if (r) return !1
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t
                  case 4:
                    return !1 === t
                  case 5:
                    return isNaN(t)
                  case 6:
                    return isNaN(t) || 1 > t
                }
              return !1
            })(t, n, o, r) && (n = null),
            r || null === o
              ? (function (e) {
                  return (
                    !!d.call(m, e) ||
                    (!d.call(p, e) &&
                      (f.test(e) ? (m[e] = !0) : ((p[e] = !0), !1)))
                  )
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
              : o.mustUseProperty
              ? (e[o.propertyName] = null === n ? 3 !== o.type && '' : n)
              : ((t = o.attributeName),
                (r = o.attributeNamespace),
                null === n
                  ? e.removeAttribute(t)
                  : ((n =
                      3 === (o = o.type) || (4 === o && !0 === n)
                        ? ''
                        : '' + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
        }
        'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
          .split(' ')
          .forEach(function (e) {
            var t = e.replace(h, b)
            g[t] = new v(t, 1, !1, e, null, !1, !1)
          }),
          'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
            .split(' ')
            .forEach(function (e) {
              var t = e.replace(h, b)
              g[t] = new v(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
            }),
          ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
            var t = e.replace(h, b)
            g[t] = new v(
              t,
              1,
              !1,
              e,
              'http://www.w3.org/XML/1998/namespace',
              !1,
              !1
            )
          }),
          ['tabIndex', 'crossOrigin'].forEach(function (e) {
            g[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1)
          }),
          (g.xlinkHref = new v(
            'xlinkHref',
            1,
            !1,
            'xlink:href',
            'http://www.w3.org/1999/xlink',
            !0,
            !1
          )),
          ['src', 'href', 'action', 'formAction'].forEach(function (e) {
            g[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0)
          })
        var _ = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          w = Symbol.for('react.element'),
          x = Symbol.for('react.portal'),
          S = Symbol.for('react.fragment'),
          k = Symbol.for('react.strict_mode'),
          E = Symbol.for('react.profiler'),
          I = Symbol.for('react.provider'),
          C = Symbol.for('react.context'),
          P = Symbol.for('react.forward_ref'),
          A = Symbol.for('react.suspense'),
          D = Symbol.for('react.suspense_list'),
          T = Symbol.for('react.memo'),
          O = Symbol.for('react.lazy')
        Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode')
        var N = Symbol.for('react.offscreen')
        Symbol.for('react.legacy_hidden'),
          Symbol.for('react.cache'),
          Symbol.for('react.tracing_marker')
        var R = Symbol.iterator
        function L(e) {
          return null === e || 'object' !== typeof e
            ? null
            : 'function' === typeof (e = (R && e[R]) || e['@@iterator'])
            ? e
            : null
        }
        var M,
          B = Object.assign
        function F(e) {
          if (void 0 === M)
            try {
              throw Error()
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/)
              M = (t && t[1]) || ''
            }
          return '\n' + M + e
        }
        var j = !1
        function z(e, t) {
          if (!e || j) return ''
          j = !0
          var n = Error.prepareStackTrace
          Error.prepareStackTrace = void 0
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error()
                }),
                Object.defineProperty(t.prototype, 'props', {
                  set: function () {
                    throw Error()
                  },
                }),
                'object' === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, [])
                } catch (c) {
                  var r = c
                }
                Reflect.construct(e, [], t)
              } else {
                try {
                  t.call()
                } catch (c) {
                  r = c
                }
                e.call(t.prototype)
              }
            else {
              try {
                throw Error()
              } catch (c) {
                r = c
              }
              e()
            }
          } catch (c) {
            if (c && r && 'string' === typeof c.stack) {
              for (
                var o = c.stack.split('\n'),
                  a = r.stack.split('\n'),
                  i = o.length - 1,
                  l = a.length - 1;
                1 <= i && 0 <= l && o[i] !== a[l];

              )
                l--
              for (; 1 <= i && 0 <= l; i--, l--)
                if (o[i] !== a[l]) {
                  if (1 !== i || 1 !== l)
                    do {
                      if ((i--, 0 > --l || o[i] !== a[l])) {
                        var u = '\n' + o[i].replace(' at new ', ' at ')
                        return (
                          e.displayName &&
                            u.includes('<anonymous>') &&
                            (u = u.replace('<anonymous>', e.displayName)),
                          u
                        )
                      }
                    } while (1 <= i && 0 <= l)
                  break
                }
            }
          } finally {
            ;(j = !1), (Error.prepareStackTrace = n)
          }
          return (e = e ? e.displayName || e.name : '') ? F(e) : ''
        }
        function G(e) {
          switch (e.tag) {
            case 5:
              return F(e.type)
            case 16:
              return F('Lazy')
            case 13:
              return F('Suspense')
            case 19:
              return F('SuspenseList')
            case 0:
            case 2:
            case 15:
              return (e = z(e.type, !1))
            case 11:
              return (e = z(e.type.render, !1))
            case 1:
              return (e = z(e.type, !0))
            default:
              return ''
          }
        }
        function U(e) {
          if (null == e) return null
          if ('function' === typeof e) return e.displayName || e.name || null
          if ('string' === typeof e) return e
          switch (e) {
            case S:
              return 'Fragment'
            case x:
              return 'Portal'
            case E:
              return 'Profiler'
            case k:
              return 'StrictMode'
            case A:
              return 'Suspense'
            case D:
              return 'SuspenseList'
          }
          if ('object' === typeof e)
            switch (e.$$typeof) {
              case C:
                return (e.displayName || 'Context') + '.Consumer'
              case I:
                return (e._context.displayName || 'Context') + '.Provider'
              case P:
                var t = e.render
                return (
                  (e = e.displayName) ||
                    (e =
                      '' !== (e = t.displayName || t.name || '')
                        ? 'ForwardRef(' + e + ')'
                        : 'ForwardRef'),
                  e
                )
              case T:
                return null !== (t = e.displayName || null)
                  ? t
                  : U(e.type) || 'Memo'
              case O:
                ;(t = e._payload), (e = e._init)
                try {
                  return U(e(t))
                } catch (n) {}
            }
          return null
        }
        function H(e) {
          var t = e.type
          switch (e.tag) {
            case 24:
              return 'Cache'
            case 9:
              return (t.displayName || 'Context') + '.Consumer'
            case 10:
              return (t._context.displayName || 'Context') + '.Provider'
            case 18:
              return 'DehydratedFragment'
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ''),
                t.displayName ||
                  ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
              )
            case 7:
              return 'Fragment'
            case 5:
              return t
            case 4:
              return 'Portal'
            case 3:
              return 'Root'
            case 6:
              return 'Text'
            case 16:
              return U(t)
            case 8:
              return t === k ? 'StrictMode' : 'Mode'
            case 22:
              return 'Offscreen'
            case 12:
              return 'Profiler'
            case 21:
              return 'Scope'
            case 13:
              return 'Suspense'
            case 19:
              return 'SuspenseList'
            case 25:
              return 'TracingMarker'
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ('function' === typeof t)
                return t.displayName || t.name || null
              if ('string' === typeof t) return t
          }
          return null
        }
        function W(e) {
          switch (typeof e) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'undefined':
            case 'object':
              return e
            default:
              return ''
          }
        }
        function V(e) {
          var t = e.type
          return (
            (e = e.nodeName) &&
            'input' === e.toLowerCase() &&
            ('checkbox' === t || 'radio' === t)
          )
        }
        function $(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = V(e) ? 'checked' : 'value',
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = '' + e[t]
              if (
                !e.hasOwnProperty(t) &&
                'undefined' !== typeof n &&
                'function' === typeof n.get &&
                'function' === typeof n.set
              ) {
                var o = n.get,
                  a = n.set
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return o.call(this)
                    },
                    set: function (e) {
                      ;(r = '' + e), a.call(this, e)
                    },
                  }),
                  Object.defineProperty(e, t, {
                    enumerable: n.enumerable,
                  }),
                  {
                    getValue: function () {
                      return r
                    },
                    setValue: function (e) {
                      r = '' + e
                    },
                    stopTracking: function () {
                      ;(e._valueTracker = null), delete e[t]
                    },
                  }
                )
              }
            })(e))
        }
        function q(e) {
          if (!e) return !1
          var t = e._valueTracker
          if (!t) return !0
          var n = t.getValue(),
            r = ''
          return (
            e && (r = V(e) ? (e.checked ? 'true' : 'false') : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          )
        }
        function Q(e) {
          if (
            'undefined' ===
            typeof (e =
              e || ('undefined' !== typeof document ? document : void 0))
          )
            return null
          try {
            return e.activeElement || e.body
          } catch (t) {
            return e.body
          }
        }
        function X(e, t) {
          var n = t.checked
          return B({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          })
        }
        function Y(e, t) {
          var n = null == t.defaultValue ? '' : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked
          ;(n = W(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                'checkbox' === t.type || 'radio' === t.type
                  ? null != t.checked
                  : null != t.value,
            })
        }
        function K(e, t) {
          null != (t = t.checked) && y(e, 'checked', t, !1)
        }
        function J(e, t) {
          K(e, t)
          var n = W(t.value),
            r = t.type
          if (null != n)
            'number' === r
              ? ((0 === n && '' === e.value) || e.value != n) &&
                (e.value = '' + n)
              : e.value !== '' + n && (e.value = '' + n)
          else if ('submit' === r || 'reset' === r)
            return void e.removeAttribute('value')
          t.hasOwnProperty('value')
            ? ee(e, t.type, n)
            : t.hasOwnProperty('defaultValue') &&
              ee(e, t.type, W(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked)
        }
        function Z(e, t, n) {
          if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
            var r = t.type
            if (
              !(
                ('submit' !== r && 'reset' !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return
            ;(t = '' + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t)
          }
          '' !== (n = e.name) && (e.name = ''),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            '' !== n && (e.name = n)
        }
        function ee(e, t, n) {
          ;('number' === t && Q(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = '' + e._wrapperState.initialValue)
              : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
        }
        var te = Array.isArray
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {}
            for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0
            for (n = 0; n < e.length; n++)
              (o = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== o && (e[n].selected = o),
                o && r && (e[n].defaultSelected = !0)
          } else {
            for (n = '' + W(n), t = null, o = 0; o < e.length; o++) {
              if (e[o].value === n)
                return (
                  (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
                )
              null !== t || e[o].disabled || (t = e[o])
            }
            null !== t && (t.selected = !0)
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(a(91))
          return B({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: '' + e._wrapperState.initialValue,
          })
        }
        function oe(e, t) {
          var n = t.value
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(a(92))
              if (te(n)) {
                if (1 < n.length) throw Error(a(93))
                n = n[0]
              }
              t = n
            }
            null == t && (t = ''), (n = t)
          }
          e._wrapperState = { initialValue: W(n) }
        }
        function ae(e, t) {
          var n = W(t.value),
            r = W(t.defaultValue)
          null != n &&
            ((n = '' + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = '' + r)
        }
        function ie(e) {
          var t = e.textContent
          t === e._wrapperState.initialValue &&
            '' !== t &&
            null !== t &&
            (e.value = t)
        }
        function le(e) {
          switch (e) {
            case 'svg':
              return 'http://www.w3.org/2000/svg'
            case 'math':
              return 'http://www.w3.org/1998/Math/MathML'
            default:
              return 'http://www.w3.org/1999/xhtml'
          }
        }
        function ue(e, t) {
          return null == e || 'http://www.w3.org/1999/xhtml' === e
            ? le(t)
            : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
            ? 'http://www.w3.org/1999/xhtml'
            : e
        }
        var ce,
          se,
          de =
            ((se = function (e, t) {
              if (
                'http://www.w3.org/2000/svg' !== e.namespaceURI ||
                'innerHTML' in e
              )
                e.innerHTML = t
              else {
                for (
                  (ce = ce || document.createElement('div')).innerHTML =
                    '<svg>' + t.valueOf().toString() + '</svg>',
                    t = ce.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild)
                for (; t.firstChild; ) e.appendChild(t.firstChild)
              }
            }),
            'undefined' !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return se(e, t)
                  })
                }
              : se)
        function fe(e, t) {
          if (t) {
            var n = e.firstChild
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t)
          }
          e.textContent = t
        }
        var pe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          me = ['Webkit', 'ms', 'Moz', 'O']
        function ve(e, t, n) {
          return null == t || 'boolean' === typeof t || '' === t
            ? ''
            : n ||
              'number' !== typeof t ||
              0 === t ||
              (pe.hasOwnProperty(e) && pe[e])
            ? ('' + t).trim()
            : t + 'px'
        }
        function ge(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf('--'),
                o = ve(n, t[n], r)
              'float' === n && (n = 'cssFloat'),
                r ? e.setProperty(n, o) : (e[n] = o)
            }
        }
        Object.keys(pe).forEach(function (e) {
          me.forEach(function (t) {
            ;(t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (pe[t] = pe[e])
          })
        })
        var he = B(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        )
        function be(e, t) {
          if (t) {
            if (
              he[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(a(137, e))
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(a(60))
              if (
                'object' !== typeof t.dangerouslySetInnerHTML ||
                !('__html' in t.dangerouslySetInnerHTML)
              )
                throw Error(a(61))
            }
            if (null != t.style && 'object' !== typeof t.style)
              throw Error(a(62))
          }
        }
        function ye(e, t) {
          if (-1 === e.indexOf('-')) return 'string' === typeof t.is
          switch (e) {
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
              return !1
            default:
              return !0
          }
        }
        var _e = null
        function we(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          )
        }
        var xe = null,
          Se = null,
          ke = null
        function Ee(e) {
          if ((e = _o(e))) {
            if ('function' !== typeof xe) throw Error(a(280))
            var t = e.stateNode
            t && ((t = xo(t)), xe(e.stateNode, e.type, t))
          }
        }
        function Ie(e) {
          Se ? (ke ? ke.push(e) : (ke = [e])) : (Se = e)
        }
        function Ce() {
          if (Se) {
            var e = Se,
              t = ke
            if (((ke = Se = null), Ee(e), t))
              for (e = 0; e < t.length; e++) Ee(t[e])
          }
        }
        function Pe(e, t) {
          return e(t)
        }
        function Ae() {}
        var De = !1
        function Te(e, t, n) {
          if (De) return e(t, n)
          De = !0
          try {
            return Pe(e, t, n)
          } finally {
            ;(De = !1), (null !== Se || null !== ke) && (Ae(), Ce())
          }
        }
        function Oe(e, t) {
          var n = e.stateNode
          if (null === n) return null
          var r = xo(n)
          if (null === r) return null
          n = r[t]
          e: switch (t) {
            case 'onClick':
            case 'onClickCapture':
            case 'onDoubleClick':
            case 'onDoubleClickCapture':
            case 'onMouseDown':
            case 'onMouseDownCapture':
            case 'onMouseMove':
            case 'onMouseMoveCapture':
            case 'onMouseUp':
            case 'onMouseUpCapture':
            case 'onMouseEnter':
              ;(r = !r.disabled) ||
                (r = !(
                  'button' === (e = e.type) ||
                  'input' === e ||
                  'select' === e ||
                  'textarea' === e
                )),
                (e = !r)
              break e
            default:
              e = !1
          }
          if (e) return null
          if (n && 'function' !== typeof n) throw Error(a(231, t, typeof n))
          return n
        }
        var Ne = !1
        if (s)
          try {
            var Re = {}
            Object.defineProperty(Re, 'passive', {
              get: function () {
                Ne = !0
              },
            }),
              window.addEventListener('test', Re, Re),
              window.removeEventListener('test', Re, Re)
          } catch (se) {
            Ne = !1
          }
        function Le(e, t, n, r, o, a, i, l, u) {
          var c = Array.prototype.slice.call(arguments, 3)
          try {
            t.apply(n, c)
          } catch (s) {
            this.onError(s)
          }
        }
        var Me = !1,
          Be = null,
          Fe = !1,
          je = null,
          ze = {
            onError: function (e) {
              ;(Me = !0), (Be = e)
            },
          }
        function Ge(e, t, n, r, o, a, i, l, u) {
          ;(Me = !1), (Be = null), Le.apply(ze, arguments)
        }
        function Ue(e) {
          var t = e,
            n = e
          if (e.alternate) for (; t.return; ) t = t.return
          else {
            e = t
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return)
            } while (e)
          }
          return 3 === t.tag ? n : null
        }
        function He(e) {
          if (13 === e.tag) {
            var t = e.memoizedState
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated
          }
          return null
        }
        function We(e) {
          if (Ue(e) !== e) throw Error(a(188))
        }
        function Ve(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate
              if (!t) {
                if (null === (t = Ue(e))) throw Error(a(188))
                return t !== e ? null : e
              }
              for (var n = e, r = t; ; ) {
                var o = n.return
                if (null === o) break
                var i = o.alternate
                if (null === i) {
                  if (null !== (r = o.return)) {
                    n = r
                    continue
                  }
                  break
                }
                if (o.child === i.child) {
                  for (i = o.child; i; ) {
                    if (i === n) return We(o), e
                    if (i === r) return We(o), t
                    i = i.sibling
                  }
                  throw Error(a(188))
                }
                if (n.return !== r.return) (n = o), (r = i)
                else {
                  for (var l = !1, u = o.child; u; ) {
                    if (u === n) {
                      ;(l = !0), (n = o), (r = i)
                      break
                    }
                    if (u === r) {
                      ;(l = !0), (r = o), (n = i)
                      break
                    }
                    u = u.sibling
                  }
                  if (!l) {
                    for (u = i.child; u; ) {
                      if (u === n) {
                        ;(l = !0), (n = i), (r = o)
                        break
                      }
                      if (u === r) {
                        ;(l = !0), (r = i), (n = o)
                        break
                      }
                      u = u.sibling
                    }
                    if (!l) throw Error(a(189))
                  }
                }
                if (n.alternate !== r) throw Error(a(190))
              }
              if (3 !== n.tag) throw Error(a(188))
              return n.stateNode.current === n ? e : t
            })(e))
            ? $e(e)
            : null
        }
        function $e(e) {
          if (5 === e.tag || 6 === e.tag) return e
          for (e = e.child; null !== e; ) {
            var t = $e(e)
            if (null !== t) return t
            e = e.sibling
          }
          return null
        }
        var qe = o.unstable_scheduleCallback,
          Qe = o.unstable_cancelCallback,
          Xe = o.unstable_shouldYield,
          Ye = o.unstable_requestPaint,
          Ke = o.unstable_now,
          Je = o.unstable_getCurrentPriorityLevel,
          Ze = o.unstable_ImmediatePriority,
          et = o.unstable_UserBlockingPriority,
          tt = o.unstable_NormalPriority,
          nt = o.unstable_LowPriority,
          rt = o.unstable_IdlePriority,
          ot = null,
          at = null
        var it = Math.clz32
            ? Math.clz32
            : function (e) {
                return 0 === (e >>>= 0) ? 32 : (31 - ((lt(e) / ut) | 0)) | 0
              },
          lt = Math.log,
          ut = Math.LN2
        var ct = 64,
          st = 4194304
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1
            case 2:
              return 2
            case 4:
              return 4
            case 8:
              return 8
            case 16:
              return 16
            case 32:
              return 32
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e
            case 134217728:
              return 134217728
            case 268435456:
              return 268435456
            case 536870912:
              return 536870912
            case 1073741824:
              return 1073741824
            default:
              return e
          }
        }
        function ft(e, t) {
          var n = e.pendingLanes
          if (0 === n) return 0
          var r = 0,
            o = e.suspendedLanes,
            a = e.pingedLanes,
            i = 268435455 & n
          if (0 !== i) {
            var l = i & ~o
            0 !== l ? (r = dt(l)) : 0 !== (a &= i) && (r = dt(a))
          } else 0 !== (i = n & ~o) ? (r = dt(i)) : 0 !== a && (r = dt(a))
          if (0 === r) return 0
          if (
            0 !== t &&
            t !== r &&
            0 === (t & o) &&
            ((o = r & -r) >= (a = t & -t) || (16 === o && 0 !== (4194240 & a)))
          )
            return t
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (o = 1 << (n = 31 - it(t))), (r |= e[n]), (t &= ~o)
          return r
        }
        function pt(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3
            default:
              return -1
          }
        }
        function mt(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
            ? 1073741824
            : 0
        }
        function vt() {
          var e = ct
          return 0 === (4194240 & (ct <<= 1)) && (ct = 64), e
        }
        function gt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e)
          return t
        }
        function ht(e, t, n) {
          ;(e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - it(t))] = n)
        }
        function bt(e, t) {
          var n = (e.entangledLanes |= t)
          for (e = e.entanglements; n; ) {
            var r = 31 - it(n),
              o = 1 << r
            ;(o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o)
          }
        }
        var yt = 0
        function _t(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1
        }
        var wt,
          xt,
          St,
          kt,
          Et,
          It = !1,
          Ct = [],
          Pt = null,
          At = null,
          Dt = null,
          Tt = new Map(),
          Ot = new Map(),
          Nt = [],
          Rt =
            'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
              ' '
            )
        function Lt(e, t) {
          switch (e) {
            case 'focusin':
            case 'focusout':
              Pt = null
              break
            case 'dragenter':
            case 'dragleave':
              At = null
              break
            case 'mouseover':
            case 'mouseout':
              Dt = null
              break
            case 'pointerover':
            case 'pointerout':
              Tt.delete(t.pointerId)
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
              Ot.delete(t.pointerId)
          }
        }
        function Mt(e, t, n, r, o, a) {
          return null === e || e.nativeEvent !== a
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: a,
                targetContainers: [o],
              }),
              null !== t && null !== (t = _o(t)) && xt(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== o && -1 === t.indexOf(o) && t.push(o),
              e)
        }
        function Bt(e) {
          var t = yo(e.target)
          if (null !== t) {
            var n = Ue(t)
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = He(n)))
                  return (
                    (e.blockedOn = t),
                    void Et(e.priority, function () {
                      St(n)
                    })
                  )
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null)
          }
          e.blockedOn = null
        }
        function Ft(e) {
          if (null !== e.blockedOn) return !1
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Xt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
            if (null !== n)
              return null !== (t = _o(n)) && xt(t), (e.blockedOn = n), !1
            var r = new (n = e.nativeEvent).constructor(n.type, n)
            ;(_e = r), n.target.dispatchEvent(r), (_e = null), t.shift()
          }
          return !0
        }
        function jt(e, t, n) {
          Ft(e) && n.delete(t)
        }
        function zt() {
          ;(It = !1),
            null !== Pt && Ft(Pt) && (Pt = null),
            null !== At && Ft(At) && (At = null),
            null !== Dt && Ft(Dt) && (Dt = null),
            Tt.forEach(jt),
            Ot.forEach(jt)
        }
        function Gt(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            It ||
              ((It = !0),
              o.unstable_scheduleCallback(o.unstable_NormalPriority, zt)))
        }
        function Ut(e) {
          function t(t) {
            return Gt(t, e)
          }
          if (0 < Ct.length) {
            Gt(Ct[0], e)
            for (var n = 1; n < Ct.length; n++) {
              var r = Ct[n]
              r.blockedOn === e && (r.blockedOn = null)
            }
          }
          for (
            null !== Pt && Gt(Pt, e),
              null !== At && Gt(At, e),
              null !== Dt && Gt(Dt, e),
              Tt.forEach(t),
              Ot.forEach(t),
              n = 0;
            n < Nt.length;
            n++
          )
            (r = Nt[n]).blockedOn === e && (r.blockedOn = null)
          for (; 0 < Nt.length && null === (n = Nt[0]).blockedOn; )
            Bt(n), null === n.blockedOn && Nt.shift()
        }
        var Ht = _.ReactCurrentBatchConfig,
          Wt = !0
        function Vt(e, t, n, r) {
          var o = yt,
            a = Ht.transition
          Ht.transition = null
          try {
            ;(yt = 1), qt(e, t, n, r)
          } finally {
            ;(yt = o), (Ht.transition = a)
          }
        }
        function $t(e, t, n, r) {
          var o = yt,
            a = Ht.transition
          Ht.transition = null
          try {
            ;(yt = 4), qt(e, t, n, r)
          } finally {
            ;(yt = o), (Ht.transition = a)
          }
        }
        function qt(e, t, n, r) {
          if (Wt) {
            var o = Xt(e, t, n, r)
            if (null === o) Wr(e, t, r, Qt, n), Lt(e, r)
            else if (
              (function (e, t, n, r, o) {
                switch (t) {
                  case 'focusin':
                    return (Pt = Mt(Pt, e, t, n, r, o)), !0
                  case 'dragenter':
                    return (At = Mt(At, e, t, n, r, o)), !0
                  case 'mouseover':
                    return (Dt = Mt(Dt, e, t, n, r, o)), !0
                  case 'pointerover':
                    var a = o.pointerId
                    return Tt.set(a, Mt(Tt.get(a) || null, e, t, n, r, o)), !0
                  case 'gotpointercapture':
                    return (
                      (a = o.pointerId),
                      Ot.set(a, Mt(Ot.get(a) || null, e, t, n, r, o)),
                      !0
                    )
                }
                return !1
              })(o, e, t, n, r)
            )
              r.stopPropagation()
            else if ((Lt(e, r), 4 & t && -1 < Rt.indexOf(e))) {
              for (; null !== o; ) {
                var a = _o(o)
                if (
                  (null !== a && wt(a),
                  null === (a = Xt(e, t, n, r)) && Wr(e, t, r, Qt, n),
                  a === o)
                )
                  break
                o = a
              }
              null !== o && r.stopPropagation()
            } else Wr(e, t, r, null, n)
          }
        }
        var Qt = null
        function Xt(e, t, n, r) {
          if (((Qt = null), null !== (e = yo((e = we(r))))))
            if (null === (t = Ue(e))) e = null
            else if (13 === (n = t.tag)) {
              if (null !== (e = He(t))) return e
              e = null
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null
              e = null
            } else t !== e && (e = null)
          return (Qt = e), null
        }
        function Yt(e) {
          switch (e) {
            case 'cancel':
            case 'click':
            case 'close':
            case 'contextmenu':
            case 'copy':
            case 'cut':
            case 'auxclick':
            case 'dblclick':
            case 'dragend':
            case 'dragstart':
            case 'drop':
            case 'focusin':
            case 'focusout':
            case 'input':
            case 'invalid':
            case 'keydown':
            case 'keypress':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'paste':
            case 'pause':
            case 'play':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerup':
            case 'ratechange':
            case 'reset':
            case 'resize':
            case 'seeked':
            case 'submit':
            case 'touchcancel':
            case 'touchend':
            case 'touchstart':
            case 'volumechange':
            case 'change':
            case 'selectionchange':
            case 'textInput':
            case 'compositionstart':
            case 'compositionend':
            case 'compositionupdate':
            case 'beforeblur':
            case 'afterblur':
            case 'beforeinput':
            case 'blur':
            case 'fullscreenchange':
            case 'focus':
            case 'hashchange':
            case 'popstate':
            case 'select':
            case 'selectstart':
              return 1
            case 'drag':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'scroll':
            case 'toggle':
            case 'touchmove':
            case 'wheel':
            case 'mouseenter':
            case 'mouseleave':
            case 'pointerenter':
            case 'pointerleave':
              return 4
            case 'message':
              switch (Je()) {
                case Ze:
                  return 1
                case et:
                  return 4
                case tt:
                case nt:
                  return 16
                case rt:
                  return 536870912
                default:
                  return 16
              }
            default:
              return 16
          }
        }
        var Kt = null,
          Jt = null,
          Zt = null
        function en() {
          if (Zt) return Zt
          var e,
            t,
            n = Jt,
            r = n.length,
            o = 'value' in Kt ? Kt.value : Kt.textContent,
            a = o.length
          for (e = 0; e < r && n[e] === o[e]; e++);
          var i = r - e
          for (t = 1; t <= i && n[r - t] === o[a - t]; t++);
          return (Zt = o.slice(e, 1 < t ? 1 - t : void 0))
        }
        function tn(e) {
          var t = e.keyCode
          return (
            'charCode' in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          )
        }
        function nn() {
          return !0
        }
        function rn() {
          return !1
        }
        function on(e) {
          function t(t, n, r, o, a) {
            for (var i in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = o),
            (this.target = a),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(i) && ((t = e[i]), (this[i] = t ? t(o) : o[i]))
            return (
              (this.isDefaultPrevented = (
                null != o.defaultPrevented
                  ? o.defaultPrevented
                  : !1 === o.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            )
          }
          return (
            B(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0
                var e = this.nativeEvent
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : 'unknown' !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn))
              },
              stopPropagation: function () {
                var e = this.nativeEvent
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : 'unknown' !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn))
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          )
        }
        var an,
          ln,
          un,
          cn = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now()
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          sn = on(cn),
          dn = B({}, cn, { view: 0, detail: 0 }),
          fn = on(dn),
          pn = B({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: En,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget
            },
            movementX: function (e) {
              return 'movementX' in e
                ? e.movementX
                : (e !== un &&
                    (un && 'mousemove' === e.type
                      ? ((an = e.screenX - un.screenX),
                        (ln = e.screenY - un.screenY))
                      : (ln = an = 0),
                    (un = e)),
                  an)
            },
            movementY: function (e) {
              return 'movementY' in e ? e.movementY : ln
            },
          }),
          mn = on(pn),
          vn = on(B({}, pn, { dataTransfer: 0 })),
          gn = on(B({}, dn, { relatedTarget: 0 })),
          hn = on(
            B({}, cn, {
              animationName: 0,
              elapsedTime: 0,
              pseudoElement: 0,
            })
          ),
          bn = B({}, cn, {
            clipboardData: function (e) {
              return 'clipboardData' in e
                ? e.clipboardData
                : window.clipboardData
            },
          }),
          yn = on(bn),
          _n = on(B({}, cn, { data: 0 })),
          wn = {
            Esc: 'Escape',
            Spacebar: ' ',
            Left: 'ArrowLeft',
            Up: 'ArrowUp',
            Right: 'ArrowRight',
            Down: 'ArrowDown',
            Del: 'Delete',
            Win: 'OS',
            Menu: 'ContextMenu',
            Apps: 'ContextMenu',
            Scroll: 'ScrollLock',
            MozPrintableKey: 'Unidentified',
          },
          xn = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta',
          },
          Sn = {
            Alt: 'altKey',
            Control: 'ctrlKey',
            Meta: 'metaKey',
            Shift: 'shiftKey',
          }
        function kn(e) {
          var t = this.nativeEvent
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = Sn[e]) && !!t[e]
        }
        function En() {
          return kn
        }
        var In = B({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = wn[e.key] || e.key
                if ('Unidentified' !== t) return t
              }
              return 'keypress' === e.type
                ? 13 === (e = tn(e))
                  ? 'Enter'
                  : String.fromCharCode(e)
                : 'keydown' === e.type || 'keyup' === e.type
                ? xn[e.keyCode] || 'Unidentified'
                : ''
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: En,
            charCode: function (e) {
              return 'keypress' === e.type ? tn(e) : 0
            },
            keyCode: function (e) {
              return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0
            },
            which: function (e) {
              return 'keypress' === e.type
                ? tn(e)
                : 'keydown' === e.type || 'keyup' === e.type
                ? e.keyCode
                : 0
            },
          }),
          Cn = on(In),
          Pn = on(
            B({}, pn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          An = on(
            B({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: En,
            })
          ),
          Dn = on(
            B({}, cn, {
              propertyName: 0,
              elapsedTime: 0,
              pseudoElement: 0,
            })
          ),
          Tn = B({}, pn, {
            deltaX: function (e) {
              return 'deltaX' in e
                ? e.deltaX
                : 'wheelDeltaX' in e
                ? -e.wheelDeltaX
                : 0
            },
            deltaY: function (e) {
              return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                ? -e.wheelDeltaY
                : 'wheelDelta' in e
                ? -e.wheelDelta
                : 0
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          On = on(Tn),
          Nn = [9, 13, 27, 32],
          Rn = s && 'CompositionEvent' in window,
          Ln = null
        s && 'documentMode' in document && (Ln = document.documentMode)
        var Mn = s && 'TextEvent' in window && !Ln,
          Bn = s && (!Rn || (Ln && 8 < Ln && 11 >= Ln)),
          Fn = String.fromCharCode(32),
          jn = !1
        function zn(e, t) {
          switch (e) {
            case 'keyup':
              return -1 !== Nn.indexOf(t.keyCode)
            case 'keydown':
              return 229 !== t.keyCode
            case 'keypress':
            case 'mousedown':
            case 'focusout':
              return !0
            default:
              return !1
          }
        }
        function Gn(e) {
          return 'object' === typeof (e = e.detail) && 'data' in e
            ? e.data
            : null
        }
        var Un = !1
        var Hn = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        }
        function Wn(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase()
          return 'input' === t ? !!Hn[e.type] : 'textarea' === t
        }
        function Vn(e, t, n, r) {
          Ie(r),
            0 < (t = $r(t, 'onChange')).length &&
              ((n = new sn('onChange', 'change', null, n, r)),
              e.push({ event: n, listeners: t }))
        }
        var $n = null,
          qn = null
        function Qn(e) {
          Fr(e, 0)
        }
        function Xn(e) {
          if (q(wo(e))) return e
        }
        function Yn(e, t) {
          if ('change' === e) return t
        }
        var Kn = !1
        if (s) {
          var Jn
          if (s) {
            var Zn = 'oninput' in document
            if (!Zn) {
              var er = document.createElement('div')
              er.setAttribute('oninput', 'return;'),
                (Zn = 'function' === typeof er.oninput)
            }
            Jn = Zn
          } else Jn = !1
          Kn = Jn && (!document.documentMode || 9 < document.documentMode)
        }
        function tr() {
          $n && ($n.detachEvent('onpropertychange', nr), (qn = $n = null))
        }
        function nr(e) {
          if ('value' === e.propertyName && Xn(qn)) {
            var t = []
            Vn(t, qn, e, we(e)), Te(Qn, t)
          }
        }
        function rr(e, t, n) {
          'focusin' === e
            ? (tr(), (qn = n), ($n = t).attachEvent('onpropertychange', nr))
            : 'focusout' === e && tr()
        }
        function or(e) {
          if ('selectionchange' === e || 'keyup' === e || 'keydown' === e)
            return Xn(qn)
        }
        function ar(e, t) {
          if ('click' === e) return Xn(t)
        }
        function ir(e, t) {
          if ('input' === e || 'change' === e) return Xn(t)
        }
        var lr =
          'function' === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                )
              }
        function ur(e, t) {
          if (lr(e, t)) return !0
          if (
            'object' !== typeof e ||
            null === e ||
            'object' !== typeof t ||
            null === t
          )
            return !1
          var n = Object.keys(e),
            r = Object.keys(t)
          if (n.length !== r.length) return !1
          for (r = 0; r < n.length; r++) {
            var o = n[r]
            if (!d.call(t, o) || !lr(e[o], t[o])) return !1
          }
          return !0
        }
        function cr(e) {
          for (; e && e.firstChild; ) e = e.firstChild
          return e
        }
        function sr(e, t) {
          var n,
            r = cr(e)
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e }
              e = n
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling
                  break e
                }
                r = r.parentNode
              }
              r = void 0
            }
            r = cr(r)
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : 'contains' in e
                  ? e.contains(t)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(t)))))
          )
        }
        function fr() {
          for (var e = window, t = Q(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = 'string' === typeof t.contentWindow.location.href
            } catch (r) {
              n = !1
            }
            if (!n) break
            t = Q((e = t.contentWindow).document)
          }
          return t
        }
        function pr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase()
          return (
            t &&
            (('input' === t &&
              ('text' === e.type ||
                'search' === e.type ||
                'tel' === e.type ||
                'url' === e.type ||
                'password' === e.type)) ||
              'textarea' === t ||
              'true' === e.contentEditable)
          )
        }
        function mr(e) {
          var t = fr(),
            n = e.focusedElem,
            r = e.selectionRange
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && pr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                'selectionStart' in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length))
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection()
                var o = n.textContent.length,
                  a = Math.min(r.start, o)
                ;(r = void 0 === r.end ? a : Math.min(r.end, o)),
                  !e.extend && a > r && ((o = r), (r = a), (a = o)),
                  (o = sr(n, a))
                var i = sr(n, r)
                o &&
                  i &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== o.node ||
                    e.anchorOffset !== o.offset ||
                    e.focusNode !== i.node ||
                    e.focusOffset !== i.offset) &&
                  ((t = t.createRange()).setStart(o.node, o.offset),
                  e.removeAllRanges(),
                  a > r
                    ? (e.addRange(t), e.extend(i.node, i.offset))
                    : (t.setEnd(i.node, i.offset), e.addRange(t)))
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({
                  element: e,
                  left: e.scrollLeft,
                  top: e.scrollTop,
                })
            for (
              'function' === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top)
          }
        }
        var vr = s && 'documentMode' in document && 11 >= document.documentMode,
          gr = null,
          hr = null,
          br = null,
          yr = !1
        function _r(e, t, n) {
          var r =
            n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument
          yr ||
            null == gr ||
            gr !== Q(r) ||
            ('selectionStart' in (r = gr) && pr(r)
              ? (r = {
                  start: r.selectionStart,
                  end: r.selectionEnd,
                })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (br && ur(br, r)) ||
              ((br = r),
              0 < (r = $r(hr, 'onSelect')).length &&
                ((t = new sn('onSelect', 'select', null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = gr))))
        }
        function wr(e, t) {
          var n = {}
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n['Webkit' + e] = 'webkit' + t),
            (n['Moz' + e] = 'moz' + t),
            n
          )
        }
        var xr = {
            animationend: wr('Animation', 'AnimationEnd'),
            animationiteration: wr('Animation', 'AnimationIteration'),
            animationstart: wr('Animation', 'AnimationStart'),
            transitionend: wr('Transition', 'TransitionEnd'),
          },
          Sr = {},
          kr = {}
        function Er(e) {
          if (Sr[e]) return Sr[e]
          if (!xr[e]) return e
          var t,
            n = xr[e]
          for (t in n) if (n.hasOwnProperty(t) && t in kr) return (Sr[e] = n[t])
          return e
        }
        s &&
          ((kr = document.createElement('div').style),
          'AnimationEvent' in window ||
            (delete xr.animationend.animation,
            delete xr.animationiteration.animation,
            delete xr.animationstart.animation),
          'TransitionEvent' in window || delete xr.transitionend.transition)
        var Ir = Er('animationend'),
          Cr = Er('animationiteration'),
          Pr = Er('animationstart'),
          Ar = Er('transitionend'),
          Dr = new Map(),
          Tr =
            'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
              ' '
            )
        function Or(e, t) {
          Dr.set(e, t), u(t, [e])
        }
        for (var Nr = 0; Nr < Tr.length; Nr++) {
          var Rr = Tr[Nr]
          Or(Rr.toLowerCase(), 'on' + (Rr[0].toUpperCase() + Rr.slice(1)))
        }
        Or(Ir, 'onAnimationEnd'),
          Or(Cr, 'onAnimationIteration'),
          Or(Pr, 'onAnimationStart'),
          Or('dblclick', 'onDoubleClick'),
          Or('focusin', 'onFocus'),
          Or('focusout', 'onBlur'),
          Or(Ar, 'onTransitionEnd'),
          c('onMouseEnter', ['mouseout', 'mouseover']),
          c('onMouseLeave', ['mouseout', 'mouseover']),
          c('onPointerEnter', ['pointerout', 'pointerover']),
          c('onPointerLeave', ['pointerout', 'pointerover']),
          u(
            'onChange',
            'change click focusin focusout input keydown keyup selectionchange'.split(
              ' '
            )
          ),
          u(
            'onSelect',
            'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
              ' '
            )
          ),
          u('onBeforeInput', [
            'compositionend',
            'keypress',
            'textInput',
            'paste',
          ]),
          u(
            'onCompositionEnd',
            'compositionend focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          u(
            'onCompositionStart',
            'compositionstart focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          u(
            'onCompositionUpdate',
            'compositionupdate focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          )
        var Lr =
            'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
              ' '
            ),
          Mr = new Set(
            'cancel close invalid load scroll toggle'.split(' ').concat(Lr)
          )
        function Br(e, t, n) {
          var r = e.type || 'unknown-event'
          ;(e.currentTarget = n),
            (function (e, t, n, r, o, i, l, u, c) {
              if ((Ge.apply(this, arguments), Me)) {
                if (!Me) throw Error(a(198))
                var s = Be
                ;(Me = !1), (Be = null), Fe || ((Fe = !0), (je = s))
              }
            })(r, t, void 0, e),
            (e.currentTarget = null)
        }
        function Fr(e, t) {
          t = 0 !== (4 & t)
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              o = r.event
            r = r.listeners
            e: {
              var a = void 0
              if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                  var l = r[i],
                    u = l.instance,
                    c = l.currentTarget
                  if (((l = l.listener), u !== a && o.isPropagationStopped()))
                    break e
                  Br(o, l, c), (a = u)
                }
              else
                for (i = 0; i < r.length; i++) {
                  if (
                    ((u = (l = r[i]).instance),
                    (c = l.currentTarget),
                    (l = l.listener),
                    u !== a && o.isPropagationStopped())
                  )
                    break e
                  Br(o, l, c), (a = u)
                }
            }
          }
          if (Fe) throw ((e = je), (Fe = !1), (je = null), e)
        }
        function jr(e, t) {
          var n = t[go]
          void 0 === n && (n = t[go] = new Set())
          var r = e + '__bubble'
          n.has(r) || (Hr(t, e, 2, !1), n.add(r))
        }
        function zr(e, t, n) {
          var r = 0
          t && (r |= 4), Hr(n, e, r, t)
        }
        var Gr = '_reactListening' + Math.random().toString(36).slice(2)
        function Ur(e) {
          if (!e[Gr]) {
            ;(e[Gr] = !0),
              i.forEach(function (t) {
                'selectionchange' !== t &&
                  (Mr.has(t) || zr(t, !1, e), zr(t, !0, e))
              })
            var t = 9 === e.nodeType ? e : e.ownerDocument
            null === t || t[Gr] || ((t[Gr] = !0), zr('selectionchange', !1, t))
          }
        }
        function Hr(e, t, n, r) {
          switch (Yt(t)) {
            case 1:
              var o = Vt
              break
            case 4:
              o = $t
              break
            default:
              o = qt
          }
          ;(n = o.bind(null, t, n, e)),
            (o = void 0),
            !Ne ||
              ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) ||
              (o = !0),
            r
              ? void 0 !== o
                ? e.addEventListener(t, n, {
                    capture: !0,
                    passive: o,
                  })
                : e.addEventListener(t, n, !0)
              : void 0 !== o
              ? e.addEventListener(t, n, { passive: o })
              : e.addEventListener(t, n, !1)
        }
        function Wr(e, t, n, r, o) {
          var a = r
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return
              var i = r.tag
              if (3 === i || 4 === i) {
                var l = r.stateNode.containerInfo
                if (l === o || (8 === l.nodeType && l.parentNode === o)) break
                if (4 === i)
                  for (i = r.return; null !== i; ) {
                    var u = i.tag
                    if (
                      (3 === u || 4 === u) &&
                      ((u = i.stateNode.containerInfo) === o ||
                        (8 === u.nodeType && u.parentNode === o))
                    )
                      return
                    i = i.return
                  }
                for (; null !== l; ) {
                  if (null === (i = yo(l))) return
                  if (5 === (u = i.tag) || 6 === u) {
                    r = a = i
                    continue e
                  }
                  l = l.parentNode
                }
              }
              r = r.return
            }
          Te(function () {
            var r = a,
              o = we(n),
              i = []
            e: {
              var l = Dr.get(e)
              if (void 0 !== l) {
                var u = sn,
                  c = e
                switch (e) {
                  case 'keypress':
                    if (0 === tn(n)) break e
                  case 'keydown':
                  case 'keyup':
                    u = Cn
                    break
                  case 'focusin':
                    ;(c = 'focus'), (u = gn)
                    break
                  case 'focusout':
                    ;(c = 'blur'), (u = gn)
                    break
                  case 'beforeblur':
                  case 'afterblur':
                    u = gn
                    break
                  case 'click':
                    if (2 === n.button) break e
                  case 'auxclick':
                  case 'dblclick':
                  case 'mousedown':
                  case 'mousemove':
                  case 'mouseup':
                  case 'mouseout':
                  case 'mouseover':
                  case 'contextmenu':
                    u = mn
                    break
                  case 'drag':
                  case 'dragend':
                  case 'dragenter':
                  case 'dragexit':
                  case 'dragleave':
                  case 'dragover':
                  case 'dragstart':
                  case 'drop':
                    u = vn
                    break
                  case 'touchcancel':
                  case 'touchend':
                  case 'touchmove':
                  case 'touchstart':
                    u = An
                    break
                  case Ir:
                  case Cr:
                  case Pr:
                    u = hn
                    break
                  case Ar:
                    u = Dn
                    break
                  case 'scroll':
                    u = fn
                    break
                  case 'wheel':
                    u = On
                    break
                  case 'copy':
                  case 'cut':
                  case 'paste':
                    u = yn
                    break
                  case 'gotpointercapture':
                  case 'lostpointercapture':
                  case 'pointercancel':
                  case 'pointerdown':
                  case 'pointermove':
                  case 'pointerout':
                  case 'pointerover':
                  case 'pointerup':
                    u = Pn
                }
                var s = 0 !== (4 & t),
                  d = !s && 'scroll' === e,
                  f = s ? (null !== l ? l + 'Capture' : null) : l
                s = []
                for (var p, m = r; null !== m; ) {
                  var v = (p = m).stateNode
                  if (
                    (5 === p.tag &&
                      null !== v &&
                      ((p = v),
                      null !== f &&
                        null != (v = Oe(m, f)) &&
                        s.push(Vr(m, v, p))),
                    d)
                  )
                    break
                  m = m.return
                }
                0 < s.length &&
                  ((l = new u(l, c, null, n, o)),
                  i.push({ event: l, listeners: s }))
              }
            }
            if (0 === (7 & t)) {
              if (
                ((u = 'mouseout' === e || 'pointerout' === e),
                (!(l = 'mouseover' === e || 'pointerover' === e) ||
                  n === _e ||
                  !(c = n.relatedTarget || n.fromElement) ||
                  (!yo(c) && !c[vo])) &&
                  (u || l) &&
                  ((l =
                    o.window === o
                      ? o
                      : (l = o.ownerDocument)
                      ? l.defaultView || l.parentWindow
                      : window),
                  u
                    ? ((u = r),
                      null !==
                        (c = (c = n.relatedTarget || n.toElement)
                          ? yo(c)
                          : null) &&
                        (c !== (d = Ue(c)) || (5 !== c.tag && 6 !== c.tag)) &&
                        (c = null))
                    : ((u = null), (c = r)),
                  u !== c))
              ) {
                if (
                  ((s = mn),
                  (v = 'onMouseLeave'),
                  (f = 'onMouseEnter'),
                  (m = 'mouse'),
                  ('pointerout' !== e && 'pointerover' !== e) ||
                    ((s = Pn),
                    (v = 'onPointerLeave'),
                    (f = 'onPointerEnter'),
                    (m = 'pointer')),
                  (d = null == u ? l : wo(u)),
                  (p = null == c ? l : wo(c)),
                  ((l = new s(v, m + 'leave', u, n, o)).target = d),
                  (l.relatedTarget = p),
                  (v = null),
                  yo(o) === r &&
                    (((s = new s(f, m + 'enter', c, n, o)).target = p),
                    (s.relatedTarget = d),
                    (v = s)),
                  (d = v),
                  u && c)
                )
                  e: {
                    for (f = c, m = 0, p = s = u; p; p = qr(p)) m++
                    for (p = 0, v = f; v; v = qr(v)) p++
                    for (; 0 < m - p; ) (s = qr(s)), m--
                    for (; 0 < p - m; ) (f = qr(f)), p--
                    for (; m--; ) {
                      if (s === f || (null !== f && s === f.alternate)) break e
                      ;(s = qr(s)), (f = qr(f))
                    }
                    s = null
                  }
                else s = null
                null !== u && Qr(i, l, u, s, !1),
                  null !== c && null !== d && Qr(i, d, c, s, !0)
              }
              if (
                'select' ===
                  (u =
                    (l = r ? wo(r) : window).nodeName &&
                    l.nodeName.toLowerCase()) ||
                ('input' === u && 'file' === l.type)
              )
                var g = Yn
              else if (Wn(l))
                if (Kn) g = ir
                else {
                  g = or
                  var h = rr
                }
              else
                (u = l.nodeName) &&
                  'input' === u.toLowerCase() &&
                  ('checkbox' === l.type || 'radio' === l.type) &&
                  (g = ar)
              switch (
                (g && (g = g(e, r))
                  ? Vn(i, g, n, o)
                  : (h && h(e, l, r),
                    'focusout' === e &&
                      (h = l._wrapperState) &&
                      h.controlled &&
                      'number' === l.type &&
                      ee(l, 'number', l.value)),
                (h = r ? wo(r) : window),
                e)
              ) {
                case 'focusin':
                  ;(Wn(h) || 'true' === h.contentEditable) &&
                    ((gr = h), (hr = r), (br = null))
                  break
                case 'focusout':
                  br = hr = gr = null
                  break
                case 'mousedown':
                  yr = !0
                  break
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                  ;(yr = !1), _r(i, n, o)
                  break
                case 'selectionchange':
                  if (vr) break
                case 'keydown':
                case 'keyup':
                  _r(i, n, o)
              }
              var b
              if (Rn)
                e: {
                  switch (e) {
                    case 'compositionstart':
                      var y = 'onCompositionStart'
                      break e
                    case 'compositionend':
                      y = 'onCompositionEnd'
                      break e
                    case 'compositionupdate':
                      y = 'onCompositionUpdate'
                      break e
                  }
                  y = void 0
                }
              else
                Un
                  ? zn(e, n) && (y = 'onCompositionEnd')
                  : 'keydown' === e &&
                    229 === n.keyCode &&
                    (y = 'onCompositionStart')
              y &&
                (Bn &&
                  'ko' !== n.locale &&
                  (Un || 'onCompositionStart' !== y
                    ? 'onCompositionEnd' === y && Un && (b = en())
                    : ((Jt = 'value' in (Kt = o) ? Kt.value : Kt.textContent),
                      (Un = !0))),
                0 < (h = $r(r, y)).length &&
                  ((y = new _n(y, e, null, n, o)),
                  i.push({ event: y, listeners: h }),
                  b ? (y.data = b) : null !== (b = Gn(n)) && (y.data = b))),
                (b = Mn
                  ? (function (e, t) {
                      switch (e) {
                        case 'compositionend':
                          return Gn(t)
                        case 'keypress':
                          return 32 !== t.which ? null : ((jn = !0), Fn)
                        case 'textInput':
                          return (e = t.data) === Fn && jn ? null : e
                        default:
                          return null
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Un)
                        return 'compositionend' === e || (!Rn && zn(e, t))
                          ? ((e = en()), (Zt = Jt = Kt = null), (Un = !1), e)
                          : null
                      switch (e) {
                        case 'paste':
                        default:
                          return null
                        case 'keypress':
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char
                            if (t.which) return String.fromCharCode(t.which)
                          }
                          return null
                        case 'compositionend':
                          return Bn && 'ko' !== t.locale ? null : t.data
                      }
                    })(e, n)) &&
                  0 < (r = $r(r, 'onBeforeInput')).length &&
                  ((o = new _n('onBeforeInput', 'beforeinput', null, n, o)),
                  i.push({ event: o, listeners: r }),
                  (o.data = b))
            }
            Fr(i, t)
          })
        }
        function Vr(e, t, n) {
          return { instance: e, listener: t, currentTarget: n }
        }
        function $r(e, t) {
          for (var n = t + 'Capture', r = []; null !== e; ) {
            var o = e,
              a = o.stateNode
            5 === o.tag &&
              null !== a &&
              ((o = a),
              null != (a = Oe(e, n)) && r.unshift(Vr(e, a, o)),
              null != (a = Oe(e, t)) && r.push(Vr(e, a, o))),
              (e = e.return)
          }
          return r
        }
        function qr(e) {
          if (null === e) return null
          do {
            e = e.return
          } while (e && 5 !== e.tag)
          return e || null
        }
        function Qr(e, t, n, r, o) {
          for (var a = t._reactName, i = []; null !== n && n !== r; ) {
            var l = n,
              u = l.alternate,
              c = l.stateNode
            if (null !== u && u === r) break
            5 === l.tag &&
              null !== c &&
              ((l = c),
              o
                ? null != (u = Oe(n, a)) && i.unshift(Vr(n, u, l))
                : o || (null != (u = Oe(n, a)) && i.push(Vr(n, u, l)))),
              (n = n.return)
          }
          0 !== i.length && e.push({ event: t, listeners: i })
        }
        var Xr = /\r\n?/g,
          Yr = /\u0000|\uFFFD/g
        function Kr(e) {
          return ('string' === typeof e ? e : '' + e)
            .replace(Xr, '\n')
            .replace(Yr, '')
        }
        function Jr(e, t, n) {
          if (((t = Kr(t)), Kr(e) !== t && n)) throw Error(a(425))
        }
        function Zr() {}
        var eo = null,
          to = null
        function no(e, t) {
          return (
            'textarea' === e ||
            'noscript' === e ||
            'string' === typeof t.children ||
            'number' === typeof t.children ||
            ('object' === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          )
        }
        var ro = 'function' === typeof setTimeout ? setTimeout : void 0,
          oo = 'function' === typeof clearTimeout ? clearTimeout : void 0,
          ao = 'function' === typeof Promise ? Promise : void 0,
          io =
            'function' === typeof queueMicrotask
              ? queueMicrotask
              : 'undefined' !== typeof ao
              ? function (e) {
                  return ao.resolve(null).then(e).catch(lo)
                }
              : ro
        function lo(e) {
          setTimeout(function () {
            throw e
          })
        }
        function uo(e, t) {
          var n = t,
            r = 0
          do {
            var o = n.nextSibling
            if ((e.removeChild(n), o && 8 === o.nodeType))
              if ('/$' === (n = o.data)) {
                if (0 === r) return e.removeChild(o), void Ut(t)
                r--
              } else ('$' !== n && '$?' !== n && '$!' !== n) || r++
            n = o
          } while (n)
          Ut(t)
        }
        function co(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType
            if (1 === t || 3 === t) break
            if (8 === t) {
              if ('$' === (t = e.data) || '$!' === t || '$?' === t) break
              if ('/$' === t) return null
            }
          }
          return e
        }
        function so(e) {
          e = e.previousSibling
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data
              if ('$' === n || '$!' === n || '$?' === n) {
                if (0 === t) return e
                t--
              } else '/$' === n && t++
            }
            e = e.previousSibling
          }
          return null
        }
        var fo = Math.random().toString(36).slice(2),
          po = '__reactFiber$' + fo,
          mo = '__reactProps$' + fo,
          vo = '__reactContainer$' + fo,
          go = '__reactEvents$' + fo,
          ho = '__reactListeners$' + fo,
          bo = '__reactHandles$' + fo
        function yo(e) {
          var t = e[po]
          if (t) return t
          for (var n = e.parentNode; n; ) {
            if ((t = n[vo] || n[po])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = so(e); null !== e; ) {
                  if ((n = e[po])) return n
                  e = so(e)
                }
              return t
            }
            n = (e = n).parentNode
          }
          return null
        }
        function _o(e) {
          return !(e = e[po] || e[vo]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e
        }
        function wo(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode
          throw Error(a(33))
        }
        function xo(e) {
          return e[mo] || null
        }
        var So = [],
          ko = -1
        function Eo(e) {
          return { current: e }
        }
        function Io(e) {
          0 > ko || ((e.current = So[ko]), (So[ko] = null), ko--)
        }
        function Co(e, t) {
          ko++, (So[ko] = e.current), (e.current = t)
        }
        var Po = {},
          Ao = Eo(Po),
          Do = Eo(!1),
          To = Po
        function Oo(e, t) {
          var n = e.type.contextTypes
          if (!n) return Po
          var r = e.stateNode
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext
          var o,
            a = {}
          for (o in n) a[o] = t[o]
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = a)),
            a
          )
        }
        function No(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e
        }
        function Ro() {
          Io(Do), Io(Ao)
        }
        function Lo(e, t, n) {
          if (Ao.current !== Po) throw Error(a(168))
          Co(Ao, t), Co(Do, n)
        }
        function Mo(e, t, n) {
          var r = e.stateNode
          if (
            ((t = t.childContextTypes), 'function' !== typeof r.getChildContext)
          )
            return n
          for (var o in (r = r.getChildContext()))
            if (!(o in t)) throw Error(a(108, H(e) || 'Unknown', o))
          return B({}, n, r)
        }
        function Bo(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Po),
            (To = Ao.current),
            Co(Ao, e),
            Co(Do, Do.current),
            !0
          )
        }
        function Fo(e, t, n) {
          var r = e.stateNode
          if (!r) throw Error(a(169))
          n
            ? ((e = Mo(e, t, To)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              Io(Do),
              Io(Ao),
              Co(Ao, e))
            : Io(Do),
            Co(Do, n)
        }
        var jo = null,
          zo = !1,
          Go = !1
        function Uo(e) {
          null === jo ? (jo = [e]) : jo.push(e)
        }
        function Ho() {
          if (!Go && null !== jo) {
            Go = !0
            var e = 0,
              t = yt
            try {
              var n = jo
              for (yt = 1; e < n.length; e++) {
                var r = n[e]
                do {
                  r = r(!0)
                } while (null !== r)
              }
              ;(jo = null), (zo = !1)
            } catch (o) {
              throw (null !== jo && (jo = jo.slice(e + 1)), qe(Ze, Ho), o)
            } finally {
              ;(yt = t), (Go = !1)
            }
          }
          return null
        }
        var Wo = _.ReactCurrentBatchConfig
        function Vo(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = B({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n])
            return t
          }
          return t
        }
        var $o = Eo(null),
          qo = null,
          Qo = null,
          Xo = null
        function Yo() {
          Xo = Qo = qo = null
        }
        function Ko(e) {
          var t = $o.current
          Io($o), (e._currentValue = t)
        }
        function Jo(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break
            e = e.return
          }
        }
        function Zo(e, t) {
          ;(qo = e),
            (Xo = Qo = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (wl = !0), (e.firstContext = null))
        }
        function ea(e) {
          var t = e._currentValue
          if (Xo !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === Qo)
            ) {
              if (null === qo) throw Error(a(308))
              ;(Qo = e),
                (qo.dependencies = {
                  lanes: 0,
                  firstContext: e,
                })
            } else Qo = Qo.next = e
          return t
        }
        var ta = null,
          na = !1
        function ra(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          }
        }
        function oa(e, t) {
          ;(e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              })
        }
        function aa(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          }
        }
        function ia(e, t) {
          var n = e.updateQueue
          null !== n &&
            ((n = n.shared),
            tc(e)
              ? (null === (e = n.interleaved)
                  ? ((t.next = t), null === ta ? (ta = [n]) : ta.push(n))
                  : ((t.next = e.next), (e.next = t)),
                (n.interleaved = t))
              : (null === (e = n.pending)
                  ? (t.next = t)
                  : ((t.next = e.next), (e.next = t)),
                (n.pending = t)))
        }
        function la(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes
            ;(n |= r &= e.pendingLanes), (t.lanes = n), bt(e, n)
          }
        }
        function ua(e, t) {
          var n = e.updateQueue,
            r = e.alternate
          if (null !== r && n === (r = r.updateQueue)) {
            var o = null,
              a = null
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var i = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                }
                null === a ? (o = a = i) : (a = a.next = i), (n = n.next)
              } while (null !== n)
              null === a ? (o = a = t) : (a = a.next = t)
            } else o = a = t
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: o,
                lastBaseUpdate: a,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            )
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t)
        }
        function ca(e, t, n, r) {
          var o = e.updateQueue
          na = !1
          var a = o.firstBaseUpdate,
            i = o.lastBaseUpdate,
            l = o.shared.pending
          if (null !== l) {
            o.shared.pending = null
            var u = l,
              c = u.next
            ;(u.next = null), null === i ? (a = c) : (i.next = c), (i = u)
            var s = e.alternate
            null !== s &&
              (l = (s = s.updateQueue).lastBaseUpdate) !== i &&
              (null === l ? (s.firstBaseUpdate = c) : (l.next = c),
              (s.lastBaseUpdate = u))
          }
          if (null !== a) {
            var d = o.baseState
            for (i = 0, s = c = u = null, l = a; ; ) {
              var f = l.lane,
                p = l.eventTime
              if ((r & f) === f) {
                null !== s &&
                  (s = s.next =
                    {
                      eventTime: p,
                      lane: 0,
                      tag: l.tag,
                      payload: l.payload,
                      callback: l.callback,
                      next: null,
                    })
                e: {
                  var m = e,
                    v = l
                  switch (((f = t), (p = n), v.tag)) {
                    case 1:
                      if ('function' === typeof (m = v.payload)) {
                        d = m.call(p, d, f)
                        break e
                      }
                      d = m
                      break e
                    case 3:
                      m.flags = (-65537 & m.flags) | 128
                    case 0:
                      if (
                        null ===
                          (f =
                            'function' === typeof (m = v.payload)
                              ? m.call(p, d, f)
                              : m) ||
                        void 0 === f
                      )
                        break e
                      d = B({}, d, f)
                      break e
                    case 2:
                      na = !0
                  }
                }
                null !== l.callback &&
                  0 !== l.lane &&
                  ((e.flags |= 64),
                  null === (f = o.effects) ? (o.effects = [l]) : f.push(l))
              } else
                (p = {
                  eventTime: p,
                  lane: f,
                  tag: l.tag,
                  payload: l.payload,
                  callback: l.callback,
                  next: null,
                }),
                  null === s ? ((c = s = p), (u = d)) : (s = s.next = p),
                  (i |= f)
              if (null === (l = l.next)) {
                if (null === (l = o.shared.pending)) break
                ;(l = (f = l).next),
                  (f.next = null),
                  (o.lastBaseUpdate = f),
                  (o.shared.pending = null)
              }
            }
            if (
              (null === s && (u = d),
              (o.baseState = u),
              (o.firstBaseUpdate = c),
              (o.lastBaseUpdate = s),
              null !== (t = o.shared.interleaved))
            ) {
              o = t
              do {
                ;(i |= o.lane), (o = o.next)
              } while (o !== t)
            } else null === a && (o.shared.lanes = 0)
            ;(Nu |= i), (e.lanes = i), (e.memoizedState = d)
          }
        }
        function sa(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                o = r.callback
              if (null !== o) {
                if (((r.callback = null), (r = n), 'function' !== typeof o))
                  throw Error(a(191, o))
                o.call(r)
              }
            }
        }
        var da = new r.Component().refs
        function fa(e, t, n, r) {
          ;(n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : B({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n)
        }
        var pa = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && Ue(e) === e
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals
            var r = Ku(),
              o = Ju(e),
              a = aa(r, o)
            ;(a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              ia(e, a),
              null !== (t = Zu(e, o, r)) && la(t, e, o)
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals
            var r = Ku(),
              o = Ju(e),
              a = aa(r, o)
            ;(a.tag = 1),
              (a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              ia(e, a),
              null !== (t = Zu(e, o, r)) && la(t, e, o)
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals
            var n = Ku(),
              r = Ju(e),
              o = aa(n, r)
            ;(o.tag = 2),
              void 0 !== t && null !== t && (o.callback = t),
              ia(e, o),
              null !== (t = Zu(e, r, n)) && la(t, e, r)
          },
        }
        function ma(e, t, n, r, o, a, i) {
          return 'function' === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, a, i)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !ur(n, r) ||
                !ur(o, a)
        }
        function va(e, t, n) {
          var r = !1,
            o = Po,
            a = t.contextType
          return (
            'object' === typeof a && null !== a
              ? (a = ea(a))
              : ((o = No(t) ? To : Ao.current),
                (a = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? Oo(e, o)
                  : Po)),
            (t = new t(n, a)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = pa),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                o),
              (e.__reactInternalMemoizedMaskedChildContext = a)),
            t
          )
        }
        function ga(e, t, n, r) {
          ;(e = t.state),
            'function' === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            'function' === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && pa.enqueueReplaceState(t, t.state, null)
        }
        function ha(e, t, n, r) {
          var o = e.stateNode
          ;(o.props = n), (o.state = e.memoizedState), (o.refs = da), ra(e)
          var a = t.contextType
          'object' === typeof a && null !== a
            ? (o.context = ea(a))
            : ((a = No(t) ? To : Ao.current), (o.context = Oo(e, a))),
            (o.state = e.memoizedState),
            'function' === typeof (a = t.getDerivedStateFromProps) &&
              (fa(e, t, a, n), (o.state = e.memoizedState)),
            'function' === typeof t.getDerivedStateFromProps ||
              'function' === typeof o.getSnapshotBeforeUpdate ||
              ('function' !== typeof o.UNSAFE_componentWillMount &&
                'function' !== typeof o.componentWillMount) ||
              ((t = o.state),
              'function' === typeof o.componentWillMount &&
                o.componentWillMount(),
              'function' === typeof o.UNSAFE_componentWillMount &&
                o.UNSAFE_componentWillMount(),
              t !== o.state && pa.enqueueReplaceState(o, o.state, null),
              ca(e, n, o, r),
              (o.state = e.memoizedState)),
            'function' === typeof o.componentDidMount && (e.flags |= 4194308)
        }
        var ba = [],
          ya = 0,
          _a = null,
          wa = 0,
          xa = [],
          Sa = 0,
          ka = null,
          Ea = 1,
          Ia = ''
        function Ca(e, t) {
          ;(ba[ya++] = wa), (ba[ya++] = _a), (_a = e), (wa = t)
        }
        function Pa(e, t, n) {
          ;(xa[Sa++] = Ea), (xa[Sa++] = Ia), (xa[Sa++] = ka), (ka = e)
          var r = Ea
          e = Ia
          var o = 32 - it(r) - 1
          ;(r &= ~(1 << o)), (n += 1)
          var a = 32 - it(t) + o
          if (30 < a) {
            var i = o - (o % 5)
            ;(a = (r & ((1 << i) - 1)).toString(32)),
              (r >>= i),
              (o -= i),
              (Ea = (1 << (32 - it(t) + o)) | (n << o) | r),
              (Ia = a + e)
          } else (Ea = (1 << a) | (n << o) | r), (Ia = e)
        }
        function Aa(e) {
          null !== e.return && (Ca(e, 1), Pa(e, 1, 0))
        }
        function Da(e) {
          for (; e === _a; )
            (_a = ba[--ya]), (ba[ya] = null), (wa = ba[--ya]), (ba[ya] = null)
          for (; e === ka; )
            (ka = xa[--Sa]),
              (xa[Sa] = null),
              (Ia = xa[--Sa]),
              (xa[Sa] = null),
              (Ea = xa[--Sa]),
              (xa[Sa] = null)
        }
        var Ta = null,
          Oa = null,
          Na = !1,
          Ra = null
        function La(e, t) {
          var n = Dc(5, null, null, 0)
          ;(n.elementType = 'DELETED'),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n)
        }
        function Ma(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (Ta = e), (Oa = co(t.firstChild)), !0)
              )
            case 6:
              return (
                null !==
                  (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (Ta = e), (Oa = null), !0)
              )
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== ka ? { id: Ea, overflow: Ia } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = Dc(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (Ta = e),
                (Oa = null),
                !0)
              )
            default:
              return !1
          }
        }
        function Ba(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags)
        }
        function Fa(e) {
          if (Na) {
            var t = Oa
            if (t) {
              var n = t
              if (!Ma(e, t)) {
                if (Ba(e)) throw Error(a(418))
                t = co(n.nextSibling)
                var r = Ta
                t && Ma(e, t)
                  ? La(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (Na = !1), (Ta = e))
              }
            } else {
              if (Ba(e)) throw Error(a(418))
              ;(e.flags = (-4097 & e.flags) | 2), (Na = !1), (Ta = e)
            }
          }
        }
        function ja(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return
          Ta = e
        }
        function za(e) {
          if (e !== Ta) return !1
          if (!Na) return ja(e), (Na = !0), !1
          var t
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                'head' !== (t = e.type) &&
                'body' !== t &&
                !no(e.type, e.memoizedProps)),
            t && (t = Oa))
          ) {
            if (Ba(e)) {
              for (e = Oa; e; ) e = co(e.nextSibling)
              throw Error(a(418))
            }
            for (; t; ) La(e, t), (t = co(t.nextSibling))
          }
          if ((ja(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(a(317))
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data
                  if ('/$' === n) {
                    if (0 === t) {
                      Oa = co(e.nextSibling)
                      break e
                    }
                    t--
                  } else ('$' !== n && '$!' !== n && '$?' !== n) || t++
                }
                e = e.nextSibling
              }
              Oa = null
            }
          } else Oa = Ta ? co(e.stateNode.nextSibling) : null
          return !0
        }
        function Ga() {
          ;(Oa = Ta = null), (Na = !1)
        }
        function Ua(e) {
          null === Ra ? (Ra = [e]) : Ra.push(e)
        }
        function Ha(e, t, n) {
          if (
            null !== (e = n.ref) &&
            'function' !== typeof e &&
            'object' !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(a(309))
                var r = n.stateNode
              }
              if (!r) throw Error(a(147, e))
              var o = r,
                i = '' + e
              return null !== t &&
                null !== t.ref &&
                'function' === typeof t.ref &&
                t.ref._stringRef === i
                ? t.ref
                : ((t = function (e) {
                    var t = o.refs
                    t === da && (t = o.refs = {}),
                      null === e ? delete t[i] : (t[i] = e)
                  }),
                  (t._stringRef = i),
                  t)
            }
            if ('string' !== typeof e) throw Error(a(284))
            if (!n._owner) throw Error(a(290, e))
          }
          return e
        }
        function Wa(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              a(
                31,
                '[object Object]' === e
                  ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                  : e
              )
            ))
          )
        }
        function Va(e) {
          return (0, e._init)(e._payload)
        }
        function $a(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n)
            }
          }
          function n(n, r) {
            if (!e) return null
            for (; null !== r; ) t(n, r), (r = r.sibling)
            return null
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling)
            return e
          }
          function o(e, t) {
            return ((e = Oc(e, t)).index = 0), (e.sibling = null), e
          }
          function i(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            )
          }
          function l(t) {
            return e && null === t.alternate && (t.flags |= 2), t
          }
          function u(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Mc(n, e.mode, r)).return = e), t)
              : (((t = o(t, n)).return = e), t)
          }
          function c(e, t, n, r) {
            var a = n.type
            return a === S
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                (t.elementType === a ||
                  ('object' === typeof a &&
                    null !== a &&
                    a.$$typeof === O &&
                    Va(a) === t.type))
              ? (((r = o(t, n.props)).ref = Ha(e, t, n)), (r.return = e), r)
              : (((r = Nc(n.type, n.key, n.props, null, e.mode, r)).ref = Ha(
                  e,
                  t,
                  n
                )),
                (r.return = e),
                r)
          }
          function s(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Bc(n, e.mode, r)).return = e), t)
              : (((t = o(t, n.children || [])).return = e), t)
          }
          function d(e, t, n, r, a) {
            return null === t || 7 !== t.tag
              ? (((t = Rc(n, e.mode, r, a)).return = e), t)
              : (((t = o(t, n)).return = e), t)
          }
          function f(e, t, n) {
            if (('string' === typeof t && '' !== t) || 'number' === typeof t)
              return ((t = Mc('' + t, e.mode, n)).return = e), t
            if ('object' === typeof t && null !== t) {
              switch (t.$$typeof) {
                case w:
                  return (
                    ((n = Nc(t.type, t.key, t.props, null, e.mode, n)).ref = Ha(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  )
                case x:
                  return ((t = Bc(t, e.mode, n)).return = e), t
                case O:
                  return f(e, (0, t._init)(t._payload), n)
              }
              if (te(t) || L(t))
                return ((t = Rc(t, e.mode, n, null)).return = e), t
              Wa(e, t)
            }
            return null
          }
          function p(e, t, n, r) {
            var o = null !== t ? t.key : null
            if (('string' === typeof n && '' !== n) || 'number' === typeof n)
              return null !== o ? null : u(e, t, '' + n, r)
            if ('object' === typeof n && null !== n) {
              switch (n.$$typeof) {
                case w:
                  return n.key === o ? c(e, t, n, r) : null
                case x:
                  return n.key === o ? s(e, t, n, r) : null
                case O:
                  return p(e, t, (o = n._init)(n._payload), r)
              }
              if (te(n) || L(n)) return null !== o ? null : d(e, t, n, r, null)
              Wa(e, n)
            }
            return null
          }
          function m(e, t, n, r, o) {
            if (('string' === typeof r && '' !== r) || 'number' === typeof r)
              return u(t, (e = e.get(n) || null), '' + r, o)
            if ('object' === typeof r && null !== r) {
              switch (r.$$typeof) {
                case w:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  )
                case x:
                  return s(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  )
                case O:
                  return m(e, t, n, (0, r._init)(r._payload), o)
              }
              if (te(r) || L(r)) return d(t, (e = e.get(n) || null), r, o, null)
              Wa(t, r)
            }
            return null
          }
          function v(o, a, l, u) {
            for (
              var c = null, s = null, d = a, v = (a = 0), g = null;
              null !== d && v < l.length;
              v++
            ) {
              d.index > v ? ((g = d), (d = null)) : (g = d.sibling)
              var h = p(o, d, l[v], u)
              if (null === h) {
                null === d && (d = g)
                break
              }
              e && d && null === h.alternate && t(o, d),
                (a = i(h, a, v)),
                null === s ? (c = h) : (s.sibling = h),
                (s = h),
                (d = g)
            }
            if (v === l.length) return n(o, d), Na && Ca(o, v), c
            if (null === d) {
              for (; v < l.length; v++)
                null !== (d = f(o, l[v], u)) &&
                  ((a = i(d, a, v)),
                  null === s ? (c = d) : (s.sibling = d),
                  (s = d))
              return Na && Ca(o, v), c
            }
            for (d = r(o, d); v < l.length; v++)
              null !== (g = m(d, o, v, l[v], u)) &&
                (e &&
                  null !== g.alternate &&
                  d.delete(null === g.key ? v : g.key),
                (a = i(g, a, v)),
                null === s ? (c = g) : (s.sibling = g),
                (s = g))
            return (
              e &&
                d.forEach(function (e) {
                  return t(o, e)
                }),
              Na && Ca(o, v),
              c
            )
          }
          function g(o, l, u, c) {
            var s = L(u)
            if ('function' !== typeof s) throw Error(a(150))
            if (null == (u = s.call(u))) throw Error(a(151))
            for (
              var d = (s = null), v = l, g = (l = 0), h = null, b = u.next();
              null !== v && !b.done;
              g++, b = u.next()
            ) {
              v.index > g ? ((h = v), (v = null)) : (h = v.sibling)
              var y = p(o, v, b.value, c)
              if (null === y) {
                null === v && (v = h)
                break
              }
              e && v && null === y.alternate && t(o, v),
                (l = i(y, l, g)),
                null === d ? (s = y) : (d.sibling = y),
                (d = y),
                (v = h)
            }
            if (b.done) return n(o, v), Na && Ca(o, g), s
            if (null === v) {
              for (; !b.done; g++, b = u.next())
                null !== (b = f(o, b.value, c)) &&
                  ((l = i(b, l, g)),
                  null === d ? (s = b) : (d.sibling = b),
                  (d = b))
              return Na && Ca(o, g), s
            }
            for (v = r(o, v); !b.done; g++, b = u.next())
              null !== (b = m(v, o, g, b.value, c)) &&
                (e &&
                  null !== b.alternate &&
                  v.delete(null === b.key ? g : b.key),
                (l = i(b, l, g)),
                null === d ? (s = b) : (d.sibling = b),
                (d = b))
            return (
              e &&
                v.forEach(function (e) {
                  return t(o, e)
                }),
              Na && Ca(o, g),
              s
            )
          }
          return function e(r, a, i, u) {
            if (
              ('object' === typeof i &&
                null !== i &&
                i.type === S &&
                null === i.key &&
                (i = i.props.children),
              'object' === typeof i && null !== i)
            ) {
              switch (i.$$typeof) {
                case w:
                  e: {
                    for (var c = i.key, s = a; null !== s; ) {
                      if (s.key === c) {
                        if ((c = i.type) === S) {
                          if (7 === s.tag) {
                            n(r, s.sibling),
                              ((a = o(s, i.props.children)).return = r),
                              (r = a)
                            break e
                          }
                        } else if (
                          s.elementType === c ||
                          ('object' === typeof c &&
                            null !== c &&
                            c.$$typeof === O &&
                            Va(c) === s.type)
                        ) {
                          n(r, s.sibling),
                            ((a = o(s, i.props)).ref = Ha(r, s, i)),
                            (a.return = r),
                            (r = a)
                          break e
                        }
                        n(r, s)
                        break
                      }
                      t(r, s), (s = s.sibling)
                    }
                    i.type === S
                      ? (((a = Rc(i.props.children, r.mode, u, i.key)).return =
                          r),
                        (r = a))
                      : (((u = Nc(
                          i.type,
                          i.key,
                          i.props,
                          null,
                          r.mode,
                          u
                        )).ref = Ha(r, a, i)),
                        (u.return = r),
                        (r = u))
                  }
                  return l(r)
                case x:
                  e: {
                    for (s = i.key; null !== a; ) {
                      if (a.key === s) {
                        if (
                          4 === a.tag &&
                          a.stateNode.containerInfo === i.containerInfo &&
                          a.stateNode.implementation === i.implementation
                        ) {
                          n(r, a.sibling),
                            ((a = o(a, i.children || [])).return = r),
                            (r = a)
                          break e
                        }
                        n(r, a)
                        break
                      }
                      t(r, a), (a = a.sibling)
                    }
                    ;((a = Bc(i, r.mode, u)).return = r), (r = a)
                  }
                  return l(r)
                case O:
                  return e(r, a, (s = i._init)(i._payload), u)
              }
              if (te(i)) return v(r, a, i, u)
              if (L(i)) return g(r, a, i, u)
              Wa(r, i)
            }
            return ('string' === typeof i && '' !== i) || 'number' === typeof i
              ? ((i = '' + i),
                null !== a && 6 === a.tag
                  ? (n(r, a.sibling), ((a = o(a, i)).return = r), (r = a))
                  : (n(r, a), ((a = Mc(i, r.mode, u)).return = r), (r = a)),
                l(r))
              : n(r, a)
          }
        }
        var qa = $a(!0),
          Qa = $a(!1),
          Xa = {},
          Ya = Eo(Xa),
          Ka = Eo(Xa),
          Ja = Eo(Xa)
        function Za(e) {
          if (e === Xa) throw Error(a(174))
          return e
        }
        function ei(e, t) {
          switch ((Co(Ja, t), Co(Ka, e), Co(Ya, Xa), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : ue(null, '')
              break
            default:
              t = ue(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              )
          }
          Io(Ya), Co(Ya, t)
        }
        function ti() {
          Io(Ya), Io(Ka), Io(Ja)
        }
        function ni(e) {
          Za(Ja.current)
          var t = Za(Ya.current),
            n = ue(t, e.type)
          t !== n && (Co(Ka, e), Co(Ya, n))
        }
        function ri(e) {
          Ka.current === e && (Io(Ya), Io(Ka))
        }
        var oi = Eo(0)
        function ai(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  '$?' === n.data ||
                  '$!' === n.data)
              )
                return t
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t
            } else if (null !== t.child) {
              ;(t.child.return = t), (t = t.child)
              continue
            }
            if (t === e) break
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null
              t = t.return
            }
            ;(t.sibling.return = t.return), (t = t.sibling)
          }
          return null
        }
        var ii = []
        function li() {
          for (var e = 0; e < ii.length; e++)
            ii[e]._workInProgressVersionPrimary = null
          ii.length = 0
        }
        var ui = _.ReactCurrentDispatcher,
          ci = _.ReactCurrentBatchConfig,
          si = 0,
          di = null,
          fi = null,
          pi = null,
          mi = !1,
          vi = !1,
          gi = 0,
          hi = 0
        function bi() {
          throw Error(a(321))
        }
        function yi(e, t) {
          if (null === t) return !1
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!lr(e[n], t[n])) return !1
          return !0
        }
        function _i(e, t, n, r, o, i) {
          if (
            ((si = i),
            (di = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (ui.current = null === e || null === e.memoizedState ? rl : ol),
            (e = n(r, o)),
            vi)
          ) {
            i = 0
            do {
              if (((vi = !1), (gi = 0), 25 <= i)) throw Error(a(301))
              ;(i += 1),
                (pi = fi = null),
                (t.updateQueue = null),
                (ui.current = al),
                (e = n(r, o))
            } while (vi)
          }
          if (
            ((ui.current = nl),
            (t = null !== fi && null !== fi.next),
            (si = 0),
            (pi = fi = di = null),
            (mi = !1),
            t)
          )
            throw Error(a(300))
          return e
        }
        function wi() {
          var e = 0 !== gi
          return (gi = 0), e
        }
        function xi() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          }
          return (
            null === pi ? (di.memoizedState = pi = e) : (pi = pi.next = e), pi
          )
        }
        function Si() {
          if (null === fi) {
            var e = di.alternate
            e = null !== e ? e.memoizedState : null
          } else e = fi.next
          var t = null === pi ? di.memoizedState : pi.next
          if (null !== t) (pi = t), (fi = e)
          else {
            if (null === e) throw Error(a(310))
            ;(e = {
              memoizedState: (fi = e).memoizedState,
              baseState: fi.baseState,
              baseQueue: fi.baseQueue,
              queue: fi.queue,
              next: null,
            }),
              null === pi ? (di.memoizedState = pi = e) : (pi = pi.next = e)
          }
          return pi
        }
        function ki(e, t) {
          return 'function' === typeof t ? t(e) : t
        }
        function Ei(e) {
          var t = Si(),
            n = t.queue
          if (null === n) throw Error(a(311))
          n.lastRenderedReducer = e
          var r = fi,
            o = r.baseQueue,
            i = n.pending
          if (null !== i) {
            if (null !== o) {
              var l = o.next
              ;(o.next = i.next), (i.next = l)
            }
            ;(r.baseQueue = o = i), (n.pending = null)
          }
          if (null !== o) {
            ;(i = o.next), (r = r.baseState)
            var u = (l = null),
              c = null,
              s = i
            do {
              var d = s.lane
              if ((si & d) === d)
                null !== c &&
                  (c = c.next =
                    {
                      lane: 0,
                      action: s.action,
                      hasEagerState: s.hasEagerState,
                      eagerState: s.eagerState,
                      next: null,
                    }),
                  (r = s.hasEagerState ? s.eagerState : e(r, s.action))
              else {
                var f = {
                  lane: d,
                  action: s.action,
                  hasEagerState: s.hasEagerState,
                  eagerState: s.eagerState,
                  next: null,
                }
                null === c ? ((u = c = f), (l = r)) : (c = c.next = f),
                  (di.lanes |= d),
                  (Nu |= d)
              }
              s = s.next
            } while (null !== s && s !== i)
            null === c ? (l = r) : (c.next = u),
              lr(r, t.memoizedState) || (wl = !0),
              (t.memoizedState = r),
              (t.baseState = l),
              (t.baseQueue = c),
              (n.lastRenderedState = r)
          }
          if (null !== (e = n.interleaved)) {
            o = e
            do {
              ;(i = o.lane), (di.lanes |= i), (Nu |= i), (o = o.next)
            } while (o !== e)
          } else null === o && (n.lanes = 0)
          return [t.memoizedState, n.dispatch]
        }
        function Ii(e) {
          var t = Si(),
            n = t.queue
          if (null === n) throw Error(a(311))
          n.lastRenderedReducer = e
          var r = n.dispatch,
            o = n.pending,
            i = t.memoizedState
          if (null !== o) {
            n.pending = null
            var l = (o = o.next)
            do {
              ;(i = e(i, l.action)), (l = l.next)
            } while (l !== o)
            lr(i, t.memoizedState) || (wl = !0),
              (t.memoizedState = i),
              null === t.baseQueue && (t.baseState = i),
              (n.lastRenderedState = i)
          }
          return [i, r]
        }
        function Ci() {}
        function Pi(e, t) {
          var n = di,
            r = Si(),
            o = t(),
            i = !lr(r.memoizedState, o)
          if (
            (i && ((r.memoizedState = o), (wl = !0)),
            (r = r.queue),
            ji(Ti.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              i ||
              (null !== pi && 1 & pi.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ri(9, Di.bind(null, n, r, o, t), void 0, null),
              null === Iu)
            )
              throw Error(a(349))
            0 !== (30 & si) || Ai(n, t, o)
          }
          return o
        }
        function Ai(e, t, n) {
          ;(e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = di.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (di.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
              ? (t.stores = [e])
              : n.push(e)
        }
        function Di(e, t, n, r) {
          ;(t.value = n), (t.getSnapshot = r), Oi(t) && Zu(e, 1, -1)
        }
        function Ti(e, t, n) {
          return n(function () {
            Oi(t) && Zu(e, 1, -1)
          })
        }
        function Oi(e) {
          var t = e.getSnapshot
          e = e.value
          try {
            var n = t()
            return !lr(e, n)
          } catch (r) {
            return !0
          }
        }
        function Ni(e) {
          var t = xi()
          return (
            'function' === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: ki,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Ki.bind(null, di, e)),
            [t.memoizedState, e]
          )
        }
        function Ri(e, t, n, r) {
          return (
            (e = {
              tag: e,
              create: t,
              destroy: n,
              deps: r,
              next: null,
            }),
            null === (t = di.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (di.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          )
        }
        function Li() {
          return Si().memoizedState
        }
        function Mi(e, t, n, r) {
          var o = xi()
          ;(di.flags |= e),
            (o.memoizedState = Ri(1 | t, n, void 0, void 0 === r ? null : r))
        }
        function Bi(e, t, n, r) {
          var o = Si()
          r = void 0 === r ? null : r
          var a = void 0
          if (null !== fi) {
            var i = fi.memoizedState
            if (((a = i.destroy), null !== r && yi(r, i.deps)))
              return void (o.memoizedState = Ri(t, n, a, r))
          }
          ;(di.flags |= e), (o.memoizedState = Ri(1 | t, n, a, r))
        }
        function Fi(e, t) {
          return Mi(8390656, 8, e, t)
        }
        function ji(e, t) {
          return Bi(2048, 8, e, t)
        }
        function zi(e, t) {
          return Bi(4, 2, e, t)
        }
        function Gi(e, t) {
          return Bi(4, 4, e, t)
        }
        function Ui(e, t) {
          return 'function' === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null)
              })
            : null !== t && void 0 !== t
            ? ((e = e()),
              (t.current = e),
              function () {
                t.current = null
              })
            : void 0
        }
        function Hi(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Bi(4, 4, Ui.bind(null, t, e), n)
          )
        }
        function Wi() {}
        function Vi(e, t) {
          var n = Si()
          t = void 0 === t ? null : t
          var r = n.memoizedState
          return null !== r && null !== t && yi(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e)
        }
        function $i(e, t) {
          var n = Si()
          t = void 0 === t ? null : t
          var r = n.memoizedState
          return null !== r && null !== t && yi(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e)
        }
        function qi(e, t, n) {
          return 0 === (21 & si)
            ? (e.baseState && ((e.baseState = !1), (wl = !0)),
              (e.memoizedState = n))
            : (lr(n, t) ||
                ((n = vt()), (di.lanes |= n), (Nu |= n), (e.baseState = !0)),
              t)
        }
        function Qi(e, t) {
          var n = yt
          ;(yt = 0 !== n && 4 > n ? n : 4), e(!0)
          var r = ci.transition
          ci.transition = {}
          try {
            e(!1), t()
          } finally {
            ;(yt = n), (ci.transition = r)
          }
        }
        function Xi() {
          return Si().memoizedState
        }
        function Yi(e, t, n) {
          var r = Ju(e)
          ;(n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
            Ji(e)
              ? Zi(t, n)
              : (el(e, t, n),
                null !== (e = Zu(e, r, (n = Ku()))) && tl(e, t, r))
        }
        function Ki(e, t, n) {
          var r = Ju(e),
            o = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }
          if (Ji(e)) Zi(t, o)
          else {
            el(e, t, o)
            var a = e.alternate
            if (
              0 === e.lanes &&
              (null === a || 0 === a.lanes) &&
              null !== (a = t.lastRenderedReducer)
            )
              try {
                var i = t.lastRenderedState,
                  l = a(i, n)
                if (((o.hasEagerState = !0), (o.eagerState = l), lr(l, i)))
                  return
              } catch (u) {}
            null !== (e = Zu(e, r, (n = Ku()))) && tl(e, t, r)
          }
        }
        function Ji(e) {
          var t = e.alternate
          return e === di || (null !== t && t === di)
        }
        function Zi(e, t) {
          vi = mi = !0
          var n = e.pending
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t)
        }
        function el(e, t, n) {
          tc(e)
            ? (null === (e = t.interleaved)
                ? ((n.next = n), null === ta ? (ta = [t]) : ta.push(t))
                : ((n.next = e.next), (e.next = n)),
              (t.interleaved = n))
            : (null === (e = t.pending)
                ? (n.next = n)
                : ((n.next = e.next), (e.next = n)),
              (t.pending = n))
        }
        function tl(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes
            ;(n |= r &= e.pendingLanes), (t.lanes = n), bt(e, n)
          }
        }
        var nl = {
            readContext: ea,
            useCallback: bi,
            useContext: bi,
            useEffect: bi,
            useImperativeHandle: bi,
            useInsertionEffect: bi,
            useLayoutEffect: bi,
            useMemo: bi,
            useReducer: bi,
            useRef: bi,
            useState: bi,
            useDebugValue: bi,
            useDeferredValue: bi,
            useTransition: bi,
            useMutableSource: bi,
            useSyncExternalStore: bi,
            useId: bi,
            unstable_isNewReconciler: !1,
          },
          rl = {
            readContext: ea,
            useCallback: function (e, t) {
              return (xi().memoizedState = [e, void 0 === t ? null : t]), e
            },
            useContext: ea,
            useEffect: Fi,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                Mi(4194308, 4, Ui.bind(null, t, e), n)
              )
            },
            useLayoutEffect: function (e, t) {
              return Mi(4194308, 4, e, t)
            },
            useInsertionEffect: function (e, t) {
              return Mi(4, 2, e, t)
            },
            useMemo: function (e, t) {
              var n = xi()
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              )
            },
            useReducer: function (e, t, n) {
              var r = xi()
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Yi.bind(null, di, e)),
                [r.memoizedState, e]
              )
            },
            useRef: function (e) {
              return (e = { current: e }), (xi().memoizedState = e)
            },
            useState: Ni,
            useDebugValue: Wi,
            useDeferredValue: function (e) {
              return (xi().memoizedState = e)
            },
            useTransition: function () {
              var e = Ni(!1),
                t = e[0]
              return (e = Qi.bind(null, e[1])), (xi().memoizedState = e), [t, e]
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = di,
                o = xi()
              if (Na) {
                if (void 0 === n) throw Error(a(407))
                n = n()
              } else {
                if (((n = t()), null === Iu)) throw Error(a(349))
                0 !== (30 & si) || Ai(r, t, n)
              }
              o.memoizedState = n
              var i = { value: n, getSnapshot: t }
              return (
                (o.queue = i),
                Fi(Ti.bind(null, r, i, e), [e]),
                (r.flags |= 2048),
                Ri(9, Di.bind(null, r, i, n, t), void 0, null),
                n
              )
            },
            useId: function () {
              var e = xi(),
                t = Iu.identifierPrefix
              if (Na) {
                var n = Ia
                ;(t =
                  ':' +
                  t +
                  'R' +
                  (n = (Ea & ~(1 << (32 - it(Ea) - 1))).toString(32) + n)),
                  0 < (n = gi++) && (t += 'H' + n.toString(32)),
                  (t += ':')
              } else t = ':' + t + 'r' + (n = hi++).toString(32) + ':'
              return (e.memoizedState = t)
            },
            unstable_isNewReconciler: !1,
          },
          ol = {
            readContext: ea,
            useCallback: Vi,
            useContext: ea,
            useEffect: ji,
            useImperativeHandle: Hi,
            useInsertionEffect: zi,
            useLayoutEffect: Gi,
            useMemo: $i,
            useReducer: Ei,
            useRef: Li,
            useState: function () {
              return Ei(ki)
            },
            useDebugValue: Wi,
            useDeferredValue: function (e) {
              return qi(Si(), fi.memoizedState, e)
            },
            useTransition: function () {
              return [Ei(ki)[0], Si().memoizedState]
            },
            useMutableSource: Ci,
            useSyncExternalStore: Pi,
            useId: Xi,
            unstable_isNewReconciler: !1,
          },
          al = {
            readContext: ea,
            useCallback: Vi,
            useContext: ea,
            useEffect: ji,
            useImperativeHandle: Hi,
            useInsertionEffect: zi,
            useLayoutEffect: Gi,
            useMemo: $i,
            useReducer: Ii,
            useRef: Li,
            useState: function () {
              return Ii(ki)
            },
            useDebugValue: Wi,
            useDeferredValue: function (e) {
              var t = Si()
              return null === fi
                ? (t.memoizedState = e)
                : qi(t, fi.memoizedState, e)
            },
            useTransition: function () {
              return [Ii(ki)[0], Si().memoizedState]
            },
            useMutableSource: Ci,
            useSyncExternalStore: Pi,
            useId: Xi,
            unstable_isNewReconciler: !1,
          }
        function il(e, t) {
          try {
            var n = '',
              r = t
            do {
              ;(n += G(r)), (r = r.return)
            } while (r)
            var o = n
          } catch (a) {
            o = '\nError generating stack: ' + a.message + '\n' + a.stack
          }
          return { value: e, source: t, stack: o }
        }
        function ll(e, t) {
          try {
            console.error(t.value)
          } catch (n) {
            setTimeout(function () {
              throw n
            })
          }
        }
        var ul,
          cl,
          sl,
          dl = 'function' === typeof WeakMap ? WeakMap : Map
        function fl(e, t, n) {
          ;((n = aa(-1, n)).tag = 3), (n.payload = { element: null })
          var r = t.value
          return (
            (n.callback = function () {
              Gu || ((Gu = !0), (Uu = r)), ll(0, t)
            }),
            n
          )
        }
        function pl(e, t, n) {
          ;(n = aa(-1, n)).tag = 3
          var r = e.type.getDerivedStateFromError
          if ('function' === typeof r) {
            var o = t.value
            ;(n.payload = function () {
              return r(o)
            }),
              (n.callback = function () {
                ll(0, t)
              })
          }
          var a = e.stateNode
          return (
            null !== a &&
              'function' === typeof a.componentDidCatch &&
              (n.callback = function () {
                ll(0, t),
                  'function' !== typeof r &&
                    (null === Hu ? (Hu = new Set([this])) : Hu.add(this))
                var e = t.stack
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : '',
                })
              }),
            n
          )
        }
        function ml(e, t, n) {
          var r = e.pingCache
          if (null === r) {
            r = e.pingCache = new dl()
            var o = new Set()
            r.set(t, o)
          } else void 0 === (o = r.get(t)) && ((o = new Set()), r.set(t, o))
          o.has(n) || (o.add(n), (e = kc.bind(null, e, t, n)), t.then(e, e))
        }
        function vl(e) {
          do {
            var t
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e
            e = e.return
          } while (null !== e)
          return null
        }
        function gl(e, t, n, r, o) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = aa(-1, 1)).tag = 2), ia(n, t))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = o), e)
        }
        function hl(e, t) {
          if (!Na)
            switch (e.tailMode) {
              case 'hidden':
                t = e.tail
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling)
                null === n ? (e.tail = null) : (n.sibling = null)
                break
              case 'collapsed':
                n = e.tail
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling)
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null)
            }
        }
        function bl(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0
          if (t)
            for (var o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= 14680064 & o.subtreeFlags),
                (r |= 14680064 & o.flags),
                (o.return = e),
                (o = o.sibling)
          else
            for (o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= o.subtreeFlags),
                (r |= o.flags),
                (o.return = e),
                (o = o.sibling)
          return (e.subtreeFlags |= r), (e.childLanes = n), t
        }
        function yl(e, t, n) {
          var r = t.pendingProps
          switch ((Da(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return bl(t), null
            case 1:
            case 17:
              return No(t.type) && Ro(), bl(t), null
            case 3:
              return (
                (r = t.stateNode),
                ti(),
                Io(Do),
                Io(Ao),
                li(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (za(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== Ra && (ac(Ra), (Ra = null)))),
                bl(t),
                null
              )
            case 5:
              ri(t)
              var o = Za(Ja.current)
              if (((n = t.type), null !== e && null != t.stateNode))
                cl(e, t, n, r),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152))
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(a(166))
                  return bl(t), null
                }
                if (((e = Za(Ya.current)), za(t))) {
                  ;(r = t.stateNode), (n = t.type)
                  var i = t.memoizedProps
                  switch (
                    ((r[po] = t), (r[mo] = i), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case 'dialog':
                      jr('cancel', r), jr('close', r)
                      break
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      jr('load', r)
                      break
                    case 'video':
                    case 'audio':
                      for (o = 0; o < Lr.length; o++) jr(Lr[o], r)
                      break
                    case 'source':
                      jr('error', r)
                      break
                    case 'img':
                    case 'image':
                    case 'link':
                      jr('error', r), jr('load', r)
                      break
                    case 'details':
                      jr('toggle', r)
                      break
                    case 'input':
                      Y(r, i), jr('invalid', r)
                      break
                    case 'select':
                      ;(r._wrapperState = {
                        wasMultiple: !!i.multiple,
                      }),
                        jr('invalid', r)
                      break
                    case 'textarea':
                      oe(r, i), jr('invalid', r)
                  }
                  for (var u in (be(n, i), (o = null), i))
                    if (i.hasOwnProperty(u)) {
                      var c = i[u]
                      'children' === u
                        ? 'string' === typeof c
                          ? r.textContent !== c &&
                            (!0 !== i.suppressHydrationWarning &&
                              Jr(r.textContent, c, e),
                            (o = ['children', c]))
                          : 'number' === typeof c &&
                            r.textContent !== '' + c &&
                            (!0 !== i.suppressHydrationWarning &&
                              Jr(r.textContent, c, e),
                            (o = ['children', '' + c]))
                        : l.hasOwnProperty(u) &&
                          null != c &&
                          'onScroll' === u &&
                          jr('scroll', r)
                    }
                  switch (n) {
                    case 'input':
                      $(r), Z(r, i, !0)
                      break
                    case 'textarea':
                      $(r), ie(r)
                      break
                    case 'select':
                    case 'option':
                      break
                    default:
                      'function' === typeof i.onClick && (r.onclick = Zr)
                  }
                  ;(r = o), (t.updateQueue = r), null !== r && (t.flags |= 4)
                } else {
                  ;(u = 9 === o.nodeType ? o : o.ownerDocument),
                    'http://www.w3.org/1999/xhtml' === e && (e = le(n)),
                    'http://www.w3.org/1999/xhtml' === e
                      ? 'script' === n
                        ? (((e = u.createElement('div')).innerHTML =
                            '<script></script>'),
                          (e = e.removeChild(e.firstChild)))
                        : 'string' === typeof r.is
                        ? (e = u.createElement(n, {
                            is: r.is,
                          }))
                        : ((e = u.createElement(n)),
                          'select' === n &&
                            ((u = e),
                            r.multiple
                              ? (u.multiple = !0)
                              : r.size && (u.size = r.size)))
                      : (e = u.createElementNS(e, n)),
                    (e[po] = t),
                    (e[mo] = r),
                    ul(e, t),
                    (t.stateNode = e)
                  e: {
                    switch (((u = ye(n, r)), n)) {
                      case 'dialog':
                        jr('cancel', e), jr('close', e), (o = r)
                        break
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        jr('load', e), (o = r)
                        break
                      case 'video':
                      case 'audio':
                        for (o = 0; o < Lr.length; o++) jr(Lr[o], e)
                        o = r
                        break
                      case 'source':
                        jr('error', e), (o = r)
                        break
                      case 'img':
                      case 'image':
                      case 'link':
                        jr('error', e), jr('load', e), (o = r)
                        break
                      case 'details':
                        jr('toggle', e), (o = r)
                        break
                      case 'input':
                        Y(e, r), (o = X(e, r)), jr('invalid', e)
                        break
                      case 'option':
                      default:
                        o = r
                        break
                      case 'select':
                        ;(e._wrapperState = {
                          wasMultiple: !!r.multiple,
                        }),
                          (o = B({}, r, {
                            value: void 0,
                          })),
                          jr('invalid', e)
                        break
                      case 'textarea':
                        oe(e, r), (o = re(e, r)), jr('invalid', e)
                    }
                    for (i in (be(n, o), (c = o)))
                      if (c.hasOwnProperty(i)) {
                        var s = c[i]
                        'style' === i
                          ? ge(e, s)
                          : 'dangerouslySetInnerHTML' === i
                          ? null != (s = s ? s.__html : void 0) && de(e, s)
                          : 'children' === i
                          ? 'string' === typeof s
                            ? ('textarea' !== n || '' !== s) && fe(e, s)
                            : 'number' === typeof s && fe(e, '' + s)
                          : 'suppressContentEditableWarning' !== i &&
                            'suppressHydrationWarning' !== i &&
                            'autoFocus' !== i &&
                            (l.hasOwnProperty(i)
                              ? null != s && 'onScroll' === i && jr('scroll', e)
                              : null != s && y(e, i, s, u))
                      }
                    switch (n) {
                      case 'input':
                        $(e), Z(e, r, !1)
                        break
                      case 'textarea':
                        $(e), ie(e)
                        break
                      case 'option':
                        null != r.value &&
                          e.setAttribute('value', '' + W(r.value))
                        break
                      case 'select':
                        ;(e.multiple = !!r.multiple),
                          null != (i = r.value)
                            ? ne(e, !!r.multiple, i, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0)
                        break
                      default:
                        'function' === typeof o.onClick && (e.onclick = Zr)
                    }
                    switch (n) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        r = !!r.autoFocus
                        break e
                      case 'img':
                        r = !0
                        break e
                      default:
                        r = !1
                    }
                  }
                  r && (t.flags |= 4)
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152))
              }
              return bl(t), null
            case 6:
              if (e && null != t.stateNode) sl(0, t, e.memoizedProps, r)
              else {
                if ('string' !== typeof r && null === t.stateNode)
                  throw Error(a(166))
                if (((n = Za(Ja.current)), Za(Ya.current), za(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[po] = t),
                    (i = r.nodeValue !== n) && null !== (e = Ta))
                  )
                    switch (e.tag) {
                      case 3:
                        Jr(r.nodeValue, n, 0 !== (1 & e.mode))
                        break
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Jr(r.nodeValue, n, 0 !== (1 & e.mode))
                    }
                  i && (t.flags |= 4)
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[po] = t),
                    (t.stateNode = r)
              }
              return bl(t), null
            case 13:
              if (
                (Io(oi),
                (r = t.memoizedState),
                Na &&
                  null !== Oa &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags))
              ) {
                for (r = Oa; r; ) r = co(r.nextSibling)
                return Ga(), (t.flags |= 98560), t
              }
              if (null !== r && null !== r.dehydrated) {
                if (((r = za(t)), null === e)) {
                  if (!r) throw Error(a(318))
                  if (
                    !(r = null !== (r = t.memoizedState) ? r.dehydrated : null)
                  )
                    throw Error(a(317))
                  r[po] = t
                } else
                  Ga(),
                    0 === (128 & t.flags) && (t.memoizedState = null),
                    (t.flags |= 4)
                return bl(t), null
              }
              return (
                null !== Ra && (ac(Ra), (Ra = null)),
                0 !== (128 & t.flags)
                  ? ((t.lanes = n), t)
                  : ((r = null !== r),
                    (n = !1),
                    null === e ? za(t) : (n = null !== e.memoizedState),
                    r !== n &&
                      r &&
                      ((t.child.flags |= 8192),
                      0 !== (1 & t.mode) &&
                        (null === e || 0 !== (1 & oi.current)
                          ? 0 === Tu && (Tu = 3)
                          : mc())),
                    null !== t.updateQueue && (t.flags |= 4),
                    bl(t),
                    null)
              )
            case 4:
              return (
                ti(), null === e && Ur(t.stateNode.containerInfo), bl(t), null
              )
            case 10:
              return Ko(t.type._context), bl(t), null
            case 19:
              if ((Io(oi), null === (i = t.memoizedState))) return bl(t), null
              if (((r = 0 !== (128 & t.flags)), null === (u = i.rendering)))
                if (r) hl(i, !1)
                else {
                  if (0 !== Tu || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (u = ai(e))) {
                        for (
                          t.flags |= 128,
                            hl(i, !1),
                            null !== (r = u.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((i = n).flags &= 14680066),
                            null === (u = i.alternate)
                              ? ((i.childLanes = 0),
                                (i.lanes = e),
                                (i.child = null),
                                (i.subtreeFlags = 0),
                                (i.memoizedProps = null),
                                (i.memoizedState = null),
                                (i.updateQueue = null),
                                (i.dependencies = null),
                                (i.stateNode = null))
                              : ((i.childLanes = u.childLanes),
                                (i.lanes = u.lanes),
                                (i.child = u.child),
                                (i.subtreeFlags = 0),
                                (i.deletions = null),
                                (i.memoizedProps = u.memoizedProps),
                                (i.memoizedState = u.memoizedState),
                                (i.updateQueue = u.updateQueue),
                                (i.type = u.type),
                                (e = u.dependencies),
                                (i.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling)
                        return Co(oi, (1 & oi.current) | 2), t.child
                      }
                      e = e.sibling
                    }
                  null !== i.tail &&
                    Ke() > ju &&
                    ((t.flags |= 128), (r = !0), hl(i, !1), (t.lanes = 4194304))
                }
              else {
                if (!r)
                  if (null !== (e = ai(u))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      hl(i, !0),
                      null === i.tail &&
                        'hidden' === i.tailMode &&
                        !u.alternate &&
                        !Na)
                    )
                      return bl(t), null
                  } else
                    2 * Ke() - i.renderingStartTime > ju &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      hl(i, !1),
                      (t.lanes = 4194304))
                i.isBackwards
                  ? ((u.sibling = t.child), (t.child = u))
                  : (null !== (n = i.last) ? (n.sibling = u) : (t.child = u),
                    (i.last = u))
              }
              return null !== i.tail
                ? ((t = i.tail),
                  (i.rendering = t),
                  (i.tail = t.sibling),
                  (i.renderingStartTime = Ke()),
                  (t.sibling = null),
                  (n = oi.current),
                  Co(oi, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (bl(t), null)
            case 22:
            case 23:
              return (
                sc(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & Au) &&
                    (bl(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : bl(t),
                null
              )
            case 24:
            case 25:
              return null
          }
          throw Error(a(156, t.tag))
        }
        ;(ul = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode)
            else if (4 !== n.tag && null !== n.child) {
              ;(n.child.return = n), (n = n.child)
              continue
            }
            if (n === t) break
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return
              n = n.return
            }
            ;(n.sibling.return = n.return), (n = n.sibling)
          }
        }),
          (cl = function (e, t, n, r) {
            var o = e.memoizedProps
            if (o !== r) {
              ;(e = t.stateNode), Za(Ya.current)
              var a,
                i = null
              switch (n) {
                case 'input':
                  ;(o = X(e, o)), (r = X(e, r)), (i = [])
                  break
                case 'select':
                  ;(o = B({}, o, { value: void 0 })),
                    (r = B({}, r, { value: void 0 })),
                    (i = [])
                  break
                case 'textarea':
                  ;(o = re(e, o)), (r = re(e, r)), (i = [])
                  break
                default:
                  'function' !== typeof o.onClick &&
                    'function' === typeof r.onClick &&
                    (e.onclick = Zr)
              }
              for (s in (be(n, r), (n = null), o))
                if (!r.hasOwnProperty(s) && o.hasOwnProperty(s) && null != o[s])
                  if ('style' === s) {
                    var u = o[s]
                    for (a in u)
                      u.hasOwnProperty(a) && (n || (n = {}), (n[a] = ''))
                  } else
                    'dangerouslySetInnerHTML' !== s &&
                      'children' !== s &&
                      'suppressContentEditableWarning' !== s &&
                      'suppressHydrationWarning' !== s &&
                      'autoFocus' !== s &&
                      (l.hasOwnProperty(s)
                        ? i || (i = [])
                        : (i = i || []).push(s, null))
              for (s in r) {
                var c = r[s]
                if (
                  ((u = null != o ? o[s] : void 0),
                  r.hasOwnProperty(s) && c !== u && (null != c || null != u))
                )
                  if ('style' === s)
                    if (u) {
                      for (a in u)
                        !u.hasOwnProperty(a) ||
                          (c && c.hasOwnProperty(a)) ||
                          (n || (n = {}), (n[a] = ''))
                      for (a in c)
                        c.hasOwnProperty(a) &&
                          u[a] !== c[a] &&
                          (n || (n = {}), (n[a] = c[a]))
                    } else n || (i || (i = []), i.push(s, n)), (n = c)
                  else
                    'dangerouslySetInnerHTML' === s
                      ? ((c = c ? c.__html : void 0),
                        (u = u ? u.__html : void 0),
                        null != c && u !== c && (i = i || []).push(s, c))
                      : 'children' === s
                      ? ('string' !== typeof c && 'number' !== typeof c) ||
                        (i = i || []).push(s, '' + c)
                      : 'suppressContentEditableWarning' !== s &&
                        'suppressHydrationWarning' !== s &&
                        (l.hasOwnProperty(s)
                          ? (null != c && 'onScroll' === s && jr('scroll', e),
                            i || u === c || (i = []))
                          : (i = i || []).push(s, c))
              }
              n && (i = i || []).push('style', n)
              var s = i
              ;(t.updateQueue = s) && (t.flags |= 4)
            }
          }),
          (sl = function (e, t, n, r) {
            n !== r && (t.flags |= 4)
          })
        var _l = _.ReactCurrentOwner,
          wl = !1
        function xl(e, t, n, r) {
          t.child = null === e ? Qa(t, null, n, r) : qa(t, e.child, n, r)
        }
        function Sl(e, t, n, r, o) {
          n = n.render
          var a = t.ref
          return (
            Zo(t, o),
            (r = _i(e, t, n, r, a, o)),
            (n = wi()),
            null === e || wl
              ? (Na && n && Aa(t), (t.flags |= 1), xl(e, t, r, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                Wl(e, t, o))
          )
        }
        function kl(e, t, n, r, o) {
          if (null === e) {
            var a = n.type
            return 'function' !== typeof a ||
              Tc(a) ||
              void 0 !== a.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = Nc(n.type, null, r, t, t.mode, o)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = a), El(e, t, a, r, o))
          }
          if (((a = e.child), 0 === (e.lanes & o))) {
            var i = a.memoizedProps
            if (
              (n = null !== (n = n.compare) ? n : ur)(i, r) &&
              e.ref === t.ref
            )
              return Wl(e, t, o)
          }
          return (
            (t.flags |= 1),
            ((e = Oc(a, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          )
        }
        function El(e, t, n, r, o) {
          if (null !== e) {
            var a = e.memoizedProps
            if (ur(a, r) && e.ref === t.ref) {
              if (((wl = !1), (t.pendingProps = r = a), 0 === (e.lanes & o)))
                return (t.lanes = e.lanes), Wl(e, t, o)
              0 !== (131072 & e.flags) && (wl = !0)
            }
          }
          return Pl(e, t, n, r, o)
        }
        function Il(e, t, n) {
          var r = t.pendingProps,
            o = r.children,
            a = null !== e ? e.memoizedState : null
          if ('hidden' === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Co(Du, Au),
                (Au |= n)
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== a ? a.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Co(Du, Au),
                  (Au |= e),
                  null
                )
              ;(t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== a ? a.baseLanes : n),
                Co(Du, Au),
                (Au |= r)
            }
          else
            null !== a
              ? ((r = a.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Co(Du, Au),
              (Au |= r)
          return xl(e, t, o, n), t.child
        }
        function Cl(e, t) {
          var n = t.ref
          ;((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152))
        }
        function Pl(e, t, n, r, o) {
          var a = No(n) ? To : Ao.current
          return (
            (a = Oo(t, a)),
            Zo(t, o),
            (n = _i(e, t, n, r, a, o)),
            (r = wi()),
            null === e || wl
              ? (Na && r && Aa(t), (t.flags |= 1), xl(e, t, n, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                Wl(e, t, o))
          )
        }
        function Al(e, t, n, r, o) {
          if (No(n)) {
            var a = !0
            Bo(t)
          } else a = !1
          if ((Zo(t, o), null === t.stateNode))
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
              va(t, n, r),
              ha(t, n, r, o),
              (r = !0)
          else if (null === e) {
            var i = t.stateNode,
              l = t.memoizedProps
            i.props = l
            var u = i.context,
              c = n.contextType
            'object' === typeof c && null !== c
              ? (c = ea(c))
              : (c = Oo(t, (c = No(n) ? To : Ao.current)))
            var s = n.getDerivedStateFromProps,
              d =
                'function' === typeof s ||
                'function' === typeof i.getSnapshotBeforeUpdate
            d ||
              ('function' !== typeof i.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof i.componentWillReceiveProps) ||
              ((l !== r || u !== c) && ga(t, i, r, c)),
              (na = !1)
            var f = t.memoizedState
            ;(i.state = f),
              ca(t, r, i, o),
              (u = t.memoizedState),
              l !== r || f !== u || Do.current || na
                ? ('function' === typeof s &&
                    (fa(t, n, s, r), (u = t.memoizedState)),
                  (l = na || ma(t, n, l, r, f, u, c))
                    ? (d ||
                        ('function' !== typeof i.UNSAFE_componentWillMount &&
                          'function' !== typeof i.componentWillMount) ||
                        ('function' === typeof i.componentWillMount &&
                          i.componentWillMount(),
                        'function' === typeof i.UNSAFE_componentWillMount &&
                          i.UNSAFE_componentWillMount()),
                      'function' === typeof i.componentDidMount &&
                        (t.flags |= 4194308))
                    : ('function' === typeof i.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = u)),
                  (i.props = r),
                  (i.state = u),
                  (i.context = c),
                  (r = l))
                : ('function' === typeof i.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1))
          } else {
            ;(i = t.stateNode),
              oa(e, t),
              (l = t.memoizedProps),
              (c = t.type === t.elementType ? l : Vo(t.type, l)),
              (i.props = c),
              (d = t.pendingProps),
              (f = i.context),
              'object' === typeof (u = n.contextType) && null !== u
                ? (u = ea(u))
                : (u = Oo(t, (u = No(n) ? To : Ao.current)))
            var p = n.getDerivedStateFromProps
            ;(s =
              'function' === typeof p ||
              'function' === typeof i.getSnapshotBeforeUpdate) ||
              ('function' !== typeof i.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof i.componentWillReceiveProps) ||
              ((l !== d || f !== u) && ga(t, i, r, u)),
              (na = !1),
              (f = t.memoizedState),
              (i.state = f),
              ca(t, r, i, o)
            var m = t.memoizedState
            l !== d || f !== m || Do.current || na
              ? ('function' === typeof p &&
                  (fa(t, n, p, r), (m = t.memoizedState)),
                (c = na || ma(t, n, c, r, f, m, u) || !1)
                  ? (s ||
                      ('function' !== typeof i.UNSAFE_componentWillUpdate &&
                        'function' !== typeof i.componentWillUpdate) ||
                      ('function' === typeof i.componentWillUpdate &&
                        i.componentWillUpdate(r, m, u),
                      'function' === typeof i.UNSAFE_componentWillUpdate &&
                        i.UNSAFE_componentWillUpdate(r, m, u)),
                    'function' === typeof i.componentDidUpdate &&
                      (t.flags |= 4),
                    'function' === typeof i.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ('function' !== typeof i.componentDidUpdate ||
                      (l === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    'function' !== typeof i.getSnapshotBeforeUpdate ||
                      (l === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = m)),
                (i.props = r),
                (i.state = m),
                (i.context = u),
                (r = c))
              : ('function' !== typeof i.componentDidUpdate ||
                  (l === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                'function' !== typeof i.getSnapshotBeforeUpdate ||
                  (l === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1))
          }
          return Dl(e, t, n, r, a, o)
        }
        function Dl(e, t, n, r, o, a) {
          Cl(e, t)
          var i = 0 !== (128 & t.flags)
          if (!r && !i) return o && Fo(t, n, !1), Wl(e, t, a)
          ;(r = t.stateNode), (_l.current = t)
          var l =
            i && 'function' !== typeof n.getDerivedStateFromError
              ? null
              : r.render()
          return (
            (t.flags |= 1),
            null !== e && i
              ? ((t.child = qa(t, e.child, null, a)),
                (t.child = qa(t, null, l, a)))
              : xl(e, t, l, a),
            (t.memoizedState = r.state),
            o && Fo(t, n, !0),
            t.child
          )
        }
        function Tl(e) {
          var t = e.stateNode
          t.pendingContext
            ? Lo(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Lo(0, t.context, !1),
            ei(e, t.containerInfo)
        }
        function Ol(e, t, n, r, o) {
          return Ga(), Ua(o), (t.flags |= 256), xl(e, t, n, r), t.child
        }
        var Nl = { dehydrated: null, treeContext: null, retryLane: 0 }
        function Rl(e) {
          return { baseLanes: e, cachePool: null, transitions: null }
        }
        function Ll(e, t) {
          return {
            baseLanes: e.baseLanes | t,
            cachePool: null,
            transitions: e.transitions,
          }
        }
        function Ml(e, t, n) {
          var r,
            o = t.pendingProps,
            i = oi.current,
            l = !1,
            u = 0 !== (128 & t.flags)
          if (
            ((r = u) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & i)),
            r
              ? ((l = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (i |= 1),
            Co(oi, 1 & i),
            null === e)
          )
            return (
              Fa(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : '$!' === e.data
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824),
                  null)
                : ((i = o.children),
                  (e = o.fallback),
                  l
                    ? ((o = t.mode),
                      (l = t.child),
                      (i = { mode: 'hidden', children: i }),
                      0 === (1 & o) && null !== l
                        ? ((l.childLanes = 0), (l.pendingProps = i))
                        : (l = Lc(i, o, 0, null)),
                      (e = Rc(e, o, n, null)),
                      (l.return = t),
                      (e.return = t),
                      (l.sibling = e),
                      (t.child = l),
                      (t.child.memoizedState = Rl(n)),
                      (t.memoizedState = Nl),
                      e)
                    : Bl(t, i))
            )
          if (null !== (i = e.memoizedState)) {
            if (null !== (r = i.dehydrated)) {
              if (u)
                return 256 & t.flags
                  ? ((t.flags &= -257), zl(e, t, n, Error(a(422))))
                  : null !== t.memoizedState
                  ? ((t.child = e.child), (t.flags |= 128), null)
                  : ((l = o.fallback),
                    (i = t.mode),
                    (o = Lc(
                      {
                        mode: 'visible',
                        children: o.children,
                      },
                      i,
                      0,
                      null
                    )),
                    ((l = Rc(l, i, n, null)).flags |= 2),
                    (o.return = t),
                    (l.return = t),
                    (o.sibling = l),
                    (t.child = o),
                    0 !== (1 & t.mode) && qa(t, e.child, null, n),
                    (t.child.memoizedState = Rl(n)),
                    (t.memoizedState = Nl),
                    l)
              if (0 === (1 & t.mode)) t = zl(e, t, n, null)
              else if ('$!' === r.data) t = zl(e, t, n, Error(a(419)))
              else if (((o = 0 !== (n & e.childLanes)), wl || o)) {
                if (null !== (o = Iu)) {
                  switch (n & -n) {
                    case 4:
                      l = 2
                      break
                    case 16:
                      l = 8
                      break
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      l = 32
                      break
                    case 536870912:
                      l = 268435456
                      break
                    default:
                      l = 0
                  }
                  0 !== (o = 0 !== (l & (o.suspendedLanes | n)) ? 0 : l) &&
                    o !== i.retryLane &&
                    ((i.retryLane = o), Zu(e, o, -1))
                }
                mc(), (t = zl(e, t, n, Error(a(421))))
              } else
                '$?' === r.data
                  ? ((t.flags |= 128),
                    (t.child = e.child),
                    (t = Ic.bind(null, e)),
                    (r._reactRetry = t),
                    (t = null))
                  : ((n = i.treeContext),
                    (Oa = co(r.nextSibling)),
                    (Ta = t),
                    (Na = !0),
                    (Ra = null),
                    null !== n &&
                      ((xa[Sa++] = Ea),
                      (xa[Sa++] = Ia),
                      (xa[Sa++] = ka),
                      (Ea = n.id),
                      (Ia = n.overflow),
                      (ka = t)),
                    ((t = Bl(t, t.pendingProps.children)).flags |= 4096))
              return t
            }
            return l
              ? ((o = jl(e, t, o.children, o.fallback, n)),
                (l = t.child),
                (i = e.child.memoizedState),
                (l.memoizedState = null === i ? Rl(n) : Ll(i, n)),
                (l.childLanes = e.childLanes & ~n),
                (t.memoizedState = Nl),
                o)
              : ((n = Fl(e, t, o.children, n)), (t.memoizedState = null), n)
          }
          return l
            ? ((o = jl(e, t, o.children, o.fallback, n)),
              (l = t.child),
              (i = e.child.memoizedState),
              (l.memoizedState = null === i ? Rl(n) : Ll(i, n)),
              (l.childLanes = e.childLanes & ~n),
              (t.memoizedState = Nl),
              o)
            : ((n = Fl(e, t, o.children, n)), (t.memoizedState = null), n)
        }
        function Bl(e, t) {
          return (
            ((t = Lc(
              { mode: 'visible', children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          )
        }
        function Fl(e, t, n, r) {
          var o = e.child
          return (
            (e = o.sibling),
            (n = Oc(o, { mode: 'visible', children: n })),
            0 === (1 & t.mode) && (n.lanes = r),
            (n.return = t),
            (n.sibling = null),
            null !== e &&
              (null === (r = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : r.push(e)),
            (t.child = n)
          )
        }
        function jl(e, t, n, r, o) {
          var a = t.mode,
            i = (e = e.child).sibling,
            l = { mode: 'hidden', children: n }
          return (
            0 === (1 & a) && t.child !== e
              ? (((n = t.child).childLanes = 0),
                (n.pendingProps = l),
                (t.deletions = null))
              : ((n = Oc(e, l)).subtreeFlags = 14680064 & e.subtreeFlags),
            null !== i ? (r = Oc(i, r)) : ((r = Rc(r, a, o, null)).flags |= 2),
            (r.return = t),
            (n.return = t),
            (n.sibling = r),
            (t.child = n),
            r
          )
        }
        function zl(e, t, n, r) {
          return (
            null !== r && Ua(r),
            qa(t, e.child, null, n),
            ((e = Bl(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          )
        }
        function Gl(e, t, n) {
          e.lanes |= t
          var r = e.alternate
          null !== r && (r.lanes |= t), Jo(e.return, t, n)
        }
        function Ul(e, t, n, r, o) {
          var a = e.memoizedState
          null === a
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: o,
              })
            : ((a.isBackwards = t),
              (a.rendering = null),
              (a.renderingStartTime = 0),
              (a.last = r),
              (a.tail = n),
              (a.tailMode = o))
        }
        function Hl(e, t, n) {
          var r = t.pendingProps,
            o = r.revealOrder,
            a = r.tail
          if ((xl(e, t, r.children, n), 0 !== (2 & (r = oi.current))))
            (r = (1 & r) | 2), (t.flags |= 128)
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Gl(e, n, t)
                else if (19 === e.tag) Gl(e, n, t)
                else if (null !== e.child) {
                  ;(e.child.return = e), (e = e.child)
                  continue
                }
                if (e === t) break e
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e
                  e = e.return
                }
                ;(e.sibling.return = e.return), (e = e.sibling)
              }
            r &= 1
          }
          if ((Co(oi, r), 0 === (1 & t.mode))) t.memoizedState = null
          else
            switch (o) {
              case 'forwards':
                for (n = t.child, o = null; null !== n; )
                  null !== (e = n.alternate) && null === ai(e) && (o = n),
                    (n = n.sibling)
                null === (n = o)
                  ? ((o = t.child), (t.child = null))
                  : ((o = n.sibling), (n.sibling = null)),
                  Ul(t, !1, o, n, a)
                break
              case 'backwards':
                for (n = null, o = t.child, t.child = null; null !== o; ) {
                  if (null !== (e = o.alternate) && null === ai(e)) {
                    t.child = o
                    break
                  }
                  ;(e = o.sibling), (o.sibling = n), (n = o), (o = e)
                }
                Ul(t, !0, n, null, a)
                break
              case 'together':
                Ul(t, !1, null, null, void 0)
                break
              default:
                t.memoizedState = null
            }
          return t.child
        }
        function Wl(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Nu |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null
          if (null !== e && t.child !== e.child) throw Error(a(153))
          if (null !== t.child) {
            for (
              n = Oc((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = Oc(e, e.pendingProps)).return = t)
            n.sibling = null
          }
          return t.child
        }
        function Vl(e, t) {
          switch ((Da(t), t.tag)) {
            case 1:
              return (
                No(t.type) && Ro(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              )
            case 3:
              return (
                ti(),
                Io(Do),
                Io(Ao),
                li(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              )
            case 5:
              return ri(t), null
            case 13:
              if (
                (Io(oi),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(a(340))
                Ga()
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null
            case 19:
              return Io(oi), null
            case 4:
              return ti(), null
            case 10:
              return Ko(t.type._context), null
            case 22:
            case 23:
              return sc(), null
            default:
              return null
          }
        }
        var $l = !1,
          ql = !1,
          Ql = 'function' === typeof WeakSet ? WeakSet : Set,
          Xl = null
        function Yl(e, t) {
          var n = e.ref
          if (null !== n)
            if ('function' === typeof n)
              try {
                n(null)
              } catch (r) {
                Sc(e, t, r)
              }
            else n.current = null
        }
        function Kl(e, t, n) {
          try {
            n()
          } catch (r) {
            Sc(e, t, r)
          }
        }
        var Jl = !1
        function Zl(e, t, n) {
          var r = t.updateQueue
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var o = (r = r.next)
            do {
              if ((o.tag & e) === e) {
                var a = o.destroy
                ;(o.destroy = void 0), void 0 !== a && Kl(t, n, a)
              }
              o = o.next
            } while (o !== r)
          }
        }
        function eu(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next)
            do {
              if ((n.tag & e) === e) {
                var r = n.create
                n.destroy = r()
              }
              n = n.next
            } while (n !== t)
          }
        }
        function tu(e) {
          var t = e.ref
          if (null !== t) {
            var n = e.stateNode
            e.tag, (e = n), 'function' === typeof t ? t(e) : (t.current = e)
          }
        }
        function nu(e) {
          var t = e.alternate
          null !== t && ((e.alternate = null), nu(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[po],
              delete t[mo],
              delete t[go],
              delete t[ho],
              delete t[bo]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null)
        }
        function ru(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag
        }
        function ou(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || ru(e.return)) return null
              e = e.return
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e
              if (null === e.child || 4 === e.tag) continue e
              ;(e.child.return = e), (e = e.child)
            }
            if (!(2 & e.flags)) return e.stateNode
          }
        }
        function au(e, t, n) {
          var r = e.tag
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = Zr))
          else if (4 !== r && null !== (e = e.child))
            for (au(e, t, n), e = e.sibling; null !== e; )
              au(e, t, n), (e = e.sibling)
        }
        function iu(e, t, n) {
          var r = e.tag
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e)
          else if (4 !== r && null !== (e = e.child))
            for (iu(e, t, n), e = e.sibling; null !== e; )
              iu(e, t, n), (e = e.sibling)
        }
        var lu = null,
          uu = !1
        function cu(e, t, n) {
          for (n = n.child; null !== n; ) su(e, t, n), (n = n.sibling)
        }
        function su(e, t, n) {
          if (at && 'function' === typeof at.onCommitFiberUnmount)
            try {
              at.onCommitFiberUnmount(ot, n)
            } catch (l) {}
          switch (n.tag) {
            case 5:
              ql || Yl(n, t)
            case 6:
              var r = lu,
                o = uu
              ;(lu = null),
                cu(e, t, n),
                (uu = o),
                null !== (lu = r) &&
                  (uu
                    ? ((e = lu),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : lu.removeChild(n.stateNode))
              break
            case 18:
              null !== lu &&
                (uu
                  ? ((e = lu),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? uo(e.parentNode, n)
                      : 1 === e.nodeType && uo(e, n),
                    Ut(e))
                  : uo(lu, n.stateNode))
              break
            case 4:
              ;(r = lu),
                (o = uu),
                (lu = n.stateNode.containerInfo),
                (uu = !0),
                cu(e, t, n),
                (lu = r),
                (uu = o)
              break
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !ql &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                o = r = r.next
                do {
                  var a = o,
                    i = a.destroy
                  ;(a = a.tag),
                    void 0 !== i &&
                      (0 !== (2 & a) || 0 !== (4 & a)) &&
                      Kl(n, t, i),
                    (o = o.next)
                } while (o !== r)
              }
              cu(e, t, n)
              break
            case 1:
              if (
                !ql &&
                (Yl(n, t),
                'function' === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  ;(r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount()
                } catch (l) {
                  Sc(n, t, l)
                }
              cu(e, t, n)
              break
            case 21:
              cu(e, t, n)
              break
            case 22:
              1 & n.mode
                ? ((ql = (r = ql) || null !== n.memoizedState),
                  cu(e, t, n),
                  (ql = r))
                : cu(e, t, n)
              break
            default:
              cu(e, t, n)
          }
        }
        function du(e) {
          var t = e.updateQueue
          if (null !== t) {
            e.updateQueue = null
            var n = e.stateNode
            null === n && (n = e.stateNode = new Ql()),
              t.forEach(function (t) {
                var r = Cc.bind(null, e, t)
                n.has(t) || (n.add(t), t.then(r, r))
              })
          }
        }
        function fu(e, t) {
          var n = t.deletions
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var o = n[r]
              try {
                var i = e,
                  l = t,
                  u = l
                e: for (; null !== u; ) {
                  switch (u.tag) {
                    case 5:
                      ;(lu = u.stateNode), (uu = !1)
                      break e
                    case 3:
                    case 4:
                      ;(lu = u.stateNode.containerInfo), (uu = !0)
                      break e
                  }
                  u = u.return
                }
                if (null === lu) throw Error(a(160))
                su(i, l, o), (lu = null), (uu = !1)
                var c = o.alternate
                null !== c && (c.return = null), (o.return = null)
              } catch (s) {
                Sc(o, t, s)
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) pu(t, e), (t = t.sibling)
        }
        function pu(e, t) {
          var n = e.alternate,
            r = e.flags
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((fu(t, e), mu(e), 4 & r)) {
                try {
                  Zl(3, e, e.return), eu(3, e)
                } catch (v) {
                  Sc(e, e.return, v)
                }
                try {
                  Zl(5, e, e.return)
                } catch (v) {
                  Sc(e, e.return, v)
                }
              }
              break
            case 1:
              fu(t, e), mu(e), 512 & r && null !== n && Yl(n, n.return)
              break
            case 5:
              if (
                (fu(t, e),
                mu(e),
                512 & r && null !== n && Yl(n, n.return),
                32 & e.flags)
              ) {
                var o = e.stateNode
                try {
                  fe(o, '')
                } catch (v) {
                  Sc(e, e.return, v)
                }
              }
              if (4 & r && null != (o = e.stateNode)) {
                var i = e.memoizedProps,
                  l = null !== n ? n.memoizedProps : i,
                  u = e.type,
                  c = e.updateQueue
                if (((e.updateQueue = null), null !== c))
                  try {
                    'input' === u &&
                      'radio' === i.type &&
                      null != i.name &&
                      K(o, i),
                      ye(u, l)
                    var s = ye(u, i)
                    for (l = 0; l < c.length; l += 2) {
                      var d = c[l],
                        f = c[l + 1]
                      'style' === d
                        ? ge(o, f)
                        : 'dangerouslySetInnerHTML' === d
                        ? de(o, f)
                        : 'children' === d
                        ? fe(o, f)
                        : y(o, d, f, s)
                    }
                    switch (u) {
                      case 'input':
                        J(o, i)
                        break
                      case 'textarea':
                        ae(o, i)
                        break
                      case 'select':
                        var p = o._wrapperState.wasMultiple
                        o._wrapperState.wasMultiple = !!i.multiple
                        var m = i.value
                        null != m
                          ? ne(o, !!i.multiple, m, !1)
                          : p !== !!i.multiple &&
                            (null != i.defaultValue
                              ? ne(o, !!i.multiple, i.defaultValue, !0)
                              : ne(o, !!i.multiple, i.multiple ? [] : '', !1))
                    }
                    o[mo] = i
                  } catch (v) {
                    Sc(e, e.return, v)
                  }
              }
              break
            case 6:
              if ((fu(t, e), mu(e), 4 & r)) {
                if (null === e.stateNode) throw Error(a(162))
                ;(s = e.stateNode), (d = e.memoizedProps)
                try {
                  s.nodeValue = d
                } catch (v) {
                  Sc(e, e.return, v)
                }
              }
              break
            case 3:
              if (
                (fu(t, e),
                mu(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Ut(t.containerInfo)
                } catch (v) {
                  Sc(e, e.return, v)
                }
              break
            case 4:
            default:
              fu(t, e), mu(e)
              break
            case 13:
              fu(t, e),
                mu(e),
                8192 & (s = e.child).flags &&
                  null !== s.memoizedState &&
                  (null === s.alternate ||
                    null === s.alternate.memoizedState) &&
                  (Fu = Ke()),
                4 & r && du(e)
              break
            case 22:
              if (
                ((s = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((ql = (d = ql) || s), fu(t, e), (ql = d))
                  : fu(t, e),
                mu(e),
                8192 & r)
              ) {
                d = null !== e.memoizedState
                e: for (f = null, p = e; ; ) {
                  if (5 === p.tag) {
                    if (null === f) {
                      f = p
                      try {
                        ;(o = p.stateNode),
                          d
                            ? 'function' === typeof (i = o.style).setProperty
                              ? i.setProperty('display', 'none', 'important')
                              : (i.display = 'none')
                            : ((u = p.stateNode),
                              (l =
                                void 0 !== (c = p.memoizedProps.style) &&
                                null !== c &&
                                c.hasOwnProperty('display')
                                  ? c.display
                                  : null),
                              (u.style.display = ve('display', l)))
                      } catch (v) {
                        Sc(e, e.return, v)
                      }
                    }
                  } else if (6 === p.tag) {
                    if (null === f)
                      try {
                        p.stateNode.nodeValue = d ? '' : p.memoizedProps
                      } catch (v) {
                        Sc(e, e.return, v)
                      }
                  } else if (
                    ((22 !== p.tag && 23 !== p.tag) ||
                      null === p.memoizedState ||
                      p === e) &&
                    null !== p.child
                  ) {
                    ;(p.child.return = p), (p = p.child)
                    continue
                  }
                  if (p === e) break e
                  for (; null === p.sibling; ) {
                    if (null === p.return || p.return === e) break e
                    f === p && (f = null), (p = p.return)
                  }
                  f === p && (f = null),
                    (p.sibling.return = p.return),
                    (p = p.sibling)
                }
                if (d && !s && 0 !== (1 & e.mode))
                  for (Xl = e, e = e.child; null !== e; ) {
                    for (s = Xl = e; null !== Xl; ) {
                      switch (((f = (d = Xl).child), d.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          Zl(4, d, d.return)
                          break
                        case 1:
                          if (
                            (Yl(d, d.return),
                            'function' ===
                              typeof (i = d.stateNode).componentWillUnmount)
                          ) {
                            ;(p = d), (m = d.return)
                            try {
                              ;(o = p),
                                (i.props = o.memoizedProps),
                                (i.state = o.memoizedState),
                                i.componentWillUnmount()
                            } catch (v) {
                              Sc(p, m, v)
                            }
                          }
                          break
                        case 5:
                          Yl(d, d.return)
                          break
                        case 22:
                          if (null !== d.memoizedState) {
                            bu(s)
                            continue
                          }
                      }
                      null !== f ? ((f.return = d), (Xl = f)) : bu(s)
                    }
                    e = e.sibling
                  }
              }
              break
            case 19:
              fu(t, e), mu(e), 4 & r && du(e)
            case 21:
          }
        }
        function mu(e) {
          var t = e.flags
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (ru(n)) {
                    var r = n
                    break e
                  }
                  n = n.return
                }
                throw Error(a(160))
              }
              switch (r.tag) {
                case 5:
                  var o = r.stateNode
                  32 & r.flags && (fe(o, ''), (r.flags &= -33)), iu(e, ou(e), o)
                  break
                case 3:
                case 4:
                  var i = r.stateNode.containerInfo
                  au(e, ou(e), i)
                  break
                default:
                  throw Error(a(161))
              }
            } catch (l) {
              Sc(e, e.return, l)
            }
            e.flags &= -3
          }
          4096 & t && (e.flags &= -4097)
        }
        function vu(e, t, n) {
          ;(Xl = e), gu(e, t, n)
        }
        function gu(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== Xl; ) {
            var o = Xl,
              a = o.child
            if (22 === o.tag && r) {
              var i = null !== o.memoizedState || $l
              if (!i) {
                var l = o.alternate,
                  u = (null !== l && null !== l.memoizedState) || ql
                l = $l
                var c = ql
                if ((($l = i), (ql = u) && !c))
                  for (Xl = o; null !== Xl; )
                    (u = (i = Xl).child),
                      22 === i.tag && null !== i.memoizedState
                        ? yu(o)
                        : null !== u
                        ? ((u.return = i), (Xl = u))
                        : yu(o)
                for (; null !== a; ) (Xl = a), gu(a, t, n), (a = a.sibling)
                ;(Xl = o), ($l = l), (ql = c)
              }
              hu(e)
            } else
              0 !== (8772 & o.subtreeFlags) && null !== a
                ? ((a.return = o), (Xl = a))
                : hu(e)
          }
        }
        function hu(e) {
          for (; null !== Xl; ) {
            var t = Xl
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ql || eu(5, t)
                      break
                    case 1:
                      var r = t.stateNode
                      if (4 & t.flags && !ql)
                        if (null === n) r.componentDidMount()
                        else {
                          var o =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : Vo(t.type, n.memoizedProps)
                          r.componentDidUpdate(
                            o,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          )
                        }
                      var i = t.updateQueue
                      null !== i && sa(t, i, r)
                      break
                    case 3:
                      var l = t.updateQueue
                      if (null !== l) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode
                          }
                        sa(t, l, n)
                      }
                      break
                    case 5:
                      var u = t.stateNode
                      if (null === n && 4 & t.flags) {
                        n = u
                        var c = t.memoizedProps
                        switch (t.type) {
                          case 'button':
                          case 'input':
                          case 'select':
                          case 'textarea':
                            c.autoFocus && n.focus()
                            break
                          case 'img':
                            c.src && (n.src = c.src)
                        }
                      }
                      break
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                      break
                    case 13:
                      if (null === t.memoizedState) {
                        var s = t.alternate
                        if (null !== s) {
                          var d = s.memoizedState
                          if (null !== d) {
                            var f = d.dehydrated
                            null !== f && Ut(f)
                          }
                        }
                      }
                      break
                    default:
                      throw Error(a(163))
                  }
                ql || (512 & t.flags && tu(t))
              } catch (p) {
                Sc(t, t.return, p)
              }
            }
            if (t === e) {
              Xl = null
              break
            }
            if (null !== (n = t.sibling)) {
              ;(n.return = t.return), (Xl = n)
              break
            }
            Xl = t.return
          }
        }
        function bu(e) {
          for (; null !== Xl; ) {
            var t = Xl
            if (t === e) {
              Xl = null
              break
            }
            var n = t.sibling
            if (null !== n) {
              ;(n.return = t.return), (Xl = n)
              break
            }
            Xl = t.return
          }
        }
        function yu(e) {
          for (; null !== Xl; ) {
            var t = Xl
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return
                  try {
                    eu(4, t)
                  } catch (u) {
                    Sc(t, n, u)
                  }
                  break
                case 1:
                  var r = t.stateNode
                  if ('function' === typeof r.componentDidMount) {
                    var o = t.return
                    try {
                      r.componentDidMount()
                    } catch (u) {
                      Sc(t, o, u)
                    }
                  }
                  var a = t.return
                  try {
                    tu(t)
                  } catch (u) {
                    Sc(t, a, u)
                  }
                  break
                case 5:
                  var i = t.return
                  try {
                    tu(t)
                  } catch (u) {
                    Sc(t, i, u)
                  }
              }
            } catch (u) {
              Sc(t, t.return, u)
            }
            if (t === e) {
              Xl = null
              break
            }
            var l = t.sibling
            if (null !== l) {
              ;(l.return = t.return), (Xl = l)
              break
            }
            Xl = t.return
          }
        }
        var _u,
          wu = Math.ceil,
          xu = _.ReactCurrentDispatcher,
          Su = _.ReactCurrentOwner,
          ku = _.ReactCurrentBatchConfig,
          Eu = 0,
          Iu = null,
          Cu = null,
          Pu = 0,
          Au = 0,
          Du = Eo(0),
          Tu = 0,
          Ou = null,
          Nu = 0,
          Ru = 0,
          Lu = 0,
          Mu = null,
          Bu = null,
          Fu = 0,
          ju = 1 / 0,
          zu = null,
          Gu = !1,
          Uu = null,
          Hu = null,
          Wu = !1,
          Vu = null,
          $u = 0,
          qu = 0,
          Qu = null,
          Xu = -1,
          Yu = 0
        function Ku() {
          return 0 !== (6 & Eu) ? Ke() : -1 !== Xu ? Xu : (Xu = Ke())
        }
        function Ju(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Eu) && 0 !== Pu
            ? Pu & -Pu
            : null !== Wo.transition
            ? (0 === Yu && (Yu = vt()), Yu)
            : 0 !== (e = yt)
            ? e
            : (e = void 0 === (e = window.event) ? 16 : Yt(e.type))
        }
        function Zu(e, t, n) {
          if (50 < qu) throw ((qu = 0), (Qu = null), Error(a(185)))
          var r = ec(e, t)
          return null === r
            ? null
            : (ht(r, t, n),
              (0 !== (2 & Eu) && r === Iu) ||
                (r === Iu &&
                  (0 === (2 & Eu) && (Ru |= t), 4 === Tu && ic(r, Pu)),
                nc(r, n),
                1 === t &&
                  0 === Eu &&
                  0 === (1 & e.mode) &&
                  ((ju = Ke() + 500), zo && Ho())),
              r)
        }
        function ec(e, t) {
          e.lanes |= t
          var n = e.alternate
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return)
          return 3 === n.tag ? n.stateNode : null
        }
        function tc(e) {
          return (
            (null !== Iu || null !== ta) && 0 !== (1 & e.mode) && 0 === (2 & Eu)
          )
        }
        function nc(e, t) {
          var n = e.callbackNode
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                o = e.expirationTimes,
                a = e.pendingLanes;
              0 < a;

            ) {
              var i = 31 - it(a),
                l = 1 << i,
                u = o[i]
              ;-1 === u
                ? (0 !== (l & n) && 0 === (l & r)) || (o[i] = pt(l, t))
                : u <= t && (e.expiredLanes |= l),
                (a &= ~l)
            }
          })(e, t)
          var r = ft(e, e === Iu ? Pu : 0)
          if (0 === r)
            null !== n && Qe(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0)
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Qe(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    ;(zo = !0), Uo(e)
                  })(lc.bind(null, e))
                : Uo(lc.bind(null, e)),
                io(function () {
                  0 === Eu && Ho()
                }),
                (n = null)
            else {
              switch (_t(r)) {
                case 1:
                  n = Ze
                  break
                case 4:
                  n = et
                  break
                case 16:
                default:
                  n = tt
                  break
                case 536870912:
                  n = rt
              }
              n = Pc(n, rc.bind(null, e))
            }
            ;(e.callbackPriority = t), (e.callbackNode = n)
          }
        }
        function rc(e, t) {
          if (((Xu = -1), (Yu = 0), 0 !== (6 & Eu))) throw Error(a(327))
          var n = e.callbackNode
          if (wc() && e.callbackNode !== n) return null
          var r = ft(e, e === Iu ? Pu : 0)
          if (0 === r) return null
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = vc(e, r)
          else {
            t = r
            var o = Eu
            Eu |= 2
            var i = pc()
            for (
              (Iu === e && Pu === t) ||
              ((zu = null), (ju = Ke() + 500), dc(e, t));
              ;

            )
              try {
                hc()
                break
              } catch (u) {
                fc(e, u)
              }
            Yo(),
              (xu.current = i),
              (Eu = o),
              null !== Cu ? (t = 0) : ((Iu = null), (Pu = 0), (t = Tu))
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (o = mt(e)) && ((r = o), (t = oc(e, o))),
              1 === t)
            )
              throw ((n = Ou), dc(e, 0), ic(e, r), nc(e, Ke()), n)
            if (6 === t) ic(e, r)
            else {
              if (
                ((o = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var o = n[r],
                              a = o.getSnapshot
                            o = o.value
                            try {
                              if (!lr(a(), o)) return !1
                            } catch (l) {
                              return !1
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n)
                      else {
                        if (t === e) break
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0
                          t = t.return
                        }
                        ;(t.sibling.return = t.return), (t = t.sibling)
                      }
                    }
                    return !0
                  })(o) &&
                  (2 === (t = vc(e, r)) &&
                    0 !== (i = mt(e)) &&
                    ((r = i), (t = oc(e, i))),
                  1 === t))
              )
                throw ((n = Ou), dc(e, 0), ic(e, r), nc(e, Ke()), n)
              switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(a(345))
                case 2:
                case 5:
                  _c(e, Bu, zu)
                  break
                case 3:
                  if (
                    (ic(e, r),
                    (130023424 & r) === r && 10 < (t = Fu + 500 - Ke()))
                  ) {
                    if (0 !== ft(e, 0)) break
                    if (((o = e.suspendedLanes) & r) !== r) {
                      Ku(), (e.pingedLanes |= e.suspendedLanes & o)
                      break
                    }
                    e.timeoutHandle = ro(_c.bind(null, e, Bu, zu), t)
                    break
                  }
                  _c(e, Bu, zu)
                  break
                case 4:
                  if ((ic(e, r), (4194240 & r) === r)) break
                  for (t = e.eventTimes, o = -1; 0 < r; ) {
                    var l = 31 - it(r)
                    ;(i = 1 << l), (l = t[l]) > o && (o = l), (r &= ~i)
                  }
                  if (
                    ((r = o),
                    10 <
                      (r =
                        (120 > (r = Ke() - r)
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * wu(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ro(_c.bind(null, e, Bu, zu), r)
                    break
                  }
                  _c(e, Bu, zu)
                  break
                default:
                  throw Error(a(329))
              }
            }
          }
          return nc(e, Ke()), e.callbackNode === n ? rc.bind(null, e) : null
        }
        function oc(e, t) {
          var n = Mu
          return (
            e.current.memoizedState.isDehydrated && (dc(e, t).flags |= 256),
            2 !== (e = vc(e, t)) && ((t = Bu), (Bu = n), null !== t && ac(t)),
            e
          )
        }
        function ac(e) {
          null === Bu ? (Bu = e) : Bu.push.apply(Bu, e)
        }
        function ic(e, t) {
          for (
            t &= ~Lu,
              t &= ~Ru,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - it(t),
              r = 1 << n
            ;(e[n] = -1), (t &= ~r)
          }
        }
        function lc(e) {
          if (0 !== (6 & Eu)) throw Error(a(327))
          wc()
          var t = ft(e, 0)
          if (0 === (1 & t)) return nc(e, Ke()), null
          var n = vc(e, t)
          if (0 !== e.tag && 2 === n) {
            var r = mt(e)
            0 !== r && ((t = r), (n = oc(e, r)))
          }
          if (1 === n) throw ((n = Ou), dc(e, 0), ic(e, t), nc(e, Ke()), n)
          if (6 === n) throw Error(a(345))
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            _c(e, Bu, zu),
            nc(e, Ke()),
            null
          )
        }
        function uc(e, t) {
          var n = Eu
          Eu |= 1
          try {
            return e(t)
          } finally {
            0 === (Eu = n) && ((ju = Ke() + 500), zo && Ho())
          }
        }
        function cc(e) {
          null !== Vu && 0 === Vu.tag && 0 === (6 & Eu) && wc()
          var t = Eu
          Eu |= 1
          var n = ku.transition,
            r = yt
          try {
            if (((ku.transition = null), (yt = 1), e)) return e()
          } finally {
            ;(yt = r), (ku.transition = n), 0 === (6 & (Eu = t)) && Ho()
          }
        }
        function sc() {
          ;(Au = Du.current), Io(Du)
        }
        function dc(e, t) {
          ;(e.finishedWork = null), (e.finishedLanes = 0)
          var n = e.timeoutHandle
          if ((-1 !== n && ((e.timeoutHandle = -1), oo(n)), null !== Cu))
            for (n = Cu.return; null !== n; ) {
              var r = n
              switch ((Da(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    Ro()
                  break
                case 3:
                  ti(), Io(Do), Io(Ao), li()
                  break
                case 5:
                  ri(r)
                  break
                case 4:
                  ti()
                  break
                case 13:
                case 19:
                  Io(oi)
                  break
                case 10:
                  Ko(r.type._context)
                  break
                case 22:
                case 23:
                  sc()
              }
              n = n.return
            }
          if (
            ((Iu = e),
            (Cu = e = Oc(e.current, null)),
            (Pu = Au = t),
            (Tu = 0),
            (Ou = null),
            (Lu = Ru = Nu = 0),
            (Bu = Mu = null),
            null !== ta)
          ) {
            for (t = 0; t < ta.length; t++)
              if (null !== (r = (n = ta[t]).interleaved)) {
                n.interleaved = null
                var o = r.next,
                  a = n.pending
                if (null !== a) {
                  var i = a.next
                  ;(a.next = o), (r.next = i)
                }
                n.pending = r
              }
            ta = null
          }
          return e
        }
        function fc(e, t) {
          for (;;) {
            var n = Cu
            try {
              if ((Yo(), (ui.current = nl), mi)) {
                for (var r = di.memoizedState; null !== r; ) {
                  var o = r.queue
                  null !== o && (o.pending = null), (r = r.next)
                }
                mi = !1
              }
              if (
                ((si = 0),
                (pi = fi = di = null),
                (vi = !1),
                (gi = 0),
                (Su.current = null),
                null === n || null === n.return)
              ) {
                ;(Tu = 1), (Ou = t), (Cu = null)
                break
              }
              e: {
                var i = e,
                  l = n.return,
                  u = n,
                  c = t
                if (
                  ((t = Pu),
                  (u.flags |= 32768),
                  null !== c &&
                    'object' === typeof c &&
                    'function' === typeof c.then)
                ) {
                  var s = c,
                    d = u,
                    f = d.tag
                  if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                    var p = d.alternate
                    p
                      ? ((d.updateQueue = p.updateQueue),
                        (d.memoizedState = p.memoizedState),
                        (d.lanes = p.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null))
                  }
                  var m = vl(l)
                  if (null !== m) {
                    ;(m.flags &= -257),
                      gl(m, l, u, 0, t),
                      1 & m.mode && ml(i, s, t),
                      (c = s)
                    var v = (t = m).updateQueue
                    if (null === v) {
                      var g = new Set()
                      g.add(c), (t.updateQueue = g)
                    } else v.add(c)
                    break e
                  }
                  if (0 === (1 & t)) {
                    ml(i, s, t), mc()
                    break e
                  }
                  c = Error(a(426))
                } else if (Na && 1 & u.mode) {
                  var h = vl(l)
                  if (null !== h) {
                    0 === (65536 & h.flags) && (h.flags |= 256),
                      gl(h, l, u, 0, t),
                      Ua(c)
                    break e
                  }
                }
                ;(i = c),
                  4 !== Tu && (Tu = 2),
                  null === Mu ? (Mu = [i]) : Mu.push(i),
                  (c = il(c, u)),
                  (u = l)
                do {
                  switch (u.tag) {
                    case 3:
                      ;(u.flags |= 65536),
                        (t &= -t),
                        (u.lanes |= t),
                        ua(u, fl(0, c, t))
                      break e
                    case 1:
                      i = c
                      var b = u.type,
                        y = u.stateNode
                      if (
                        0 === (128 & u.flags) &&
                        ('function' === typeof b.getDerivedStateFromError ||
                          (null !== y &&
                            'function' === typeof y.componentDidCatch &&
                            (null === Hu || !Hu.has(y))))
                      ) {
                        ;(u.flags |= 65536),
                          (t &= -t),
                          (u.lanes |= t),
                          ua(u, pl(u, i, t))
                        break e
                      }
                  }
                  u = u.return
                } while (null !== u)
              }
              yc(n)
            } catch (_) {
              ;(t = _), Cu === n && null !== n && (Cu = n = n.return)
              continue
            }
            break
          }
        }
        function pc() {
          var e = xu.current
          return (xu.current = nl), null === e ? nl : e
        }
        function mc() {
          ;(0 !== Tu && 3 !== Tu && 2 !== Tu) || (Tu = 4),
            null === Iu ||
              (0 === (268435455 & Nu) && 0 === (268435455 & Ru)) ||
              ic(Iu, Pu)
        }
        function vc(e, t) {
          var n = Eu
          Eu |= 2
          var r = pc()
          for ((Iu === e && Pu === t) || ((zu = null), dc(e, t)); ; )
            try {
              gc()
              break
            } catch (o) {
              fc(e, o)
            }
          if ((Yo(), (Eu = n), (xu.current = r), null !== Cu))
            throw Error(a(261))
          return (Iu = null), (Pu = 0), Tu
        }
        function gc() {
          for (; null !== Cu; ) bc(Cu)
        }
        function hc() {
          for (; null !== Cu && !Xe(); ) bc(Cu)
        }
        function bc(e) {
          var t = _u(e.alternate, e, Au)
          ;(e.memoizedProps = e.pendingProps),
            null === t ? yc(e) : (Cu = t),
            (Su.current = null)
        }
        function yc(e) {
          var t = e
          do {
            var n = t.alternate
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = yl(n, t, Au))) return void (Cu = n)
            } else {
              if (null !== (n = Vl(n, t)))
                return (n.flags &= 32767), void (Cu = n)
              if (null === e) return (Tu = 6), void (Cu = null)
              ;(e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)
            }
            if (null !== (t = t.sibling)) return void (Cu = t)
            Cu = t = e
          } while (null !== t)
          0 === Tu && (Tu = 5)
        }
        function _c(e, t, n) {
          var r = yt,
            o = ku.transition
          try {
            ;(ku.transition = null),
              (yt = 1),
              (function (e, t, n, r) {
                do {
                  wc()
                } while (null !== Vu)
                if (0 !== (6 & Eu)) throw Error(a(327))
                n = e.finishedWork
                var o = e.finishedLanes
                if (null === n) return null
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(a(177))
                ;(e.callbackNode = null), (e.callbackPriority = 0)
                var i = n.lanes | n.childLanes
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t
                    ;(e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements)
                    var r = e.eventTimes
                    for (e = e.expirationTimes; 0 < n; ) {
                      var o = 31 - it(n),
                        a = 1 << o
                      ;(t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~a)
                    }
                  })(e, i),
                  e === Iu && ((Cu = Iu = null), (Pu = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Wu ||
                    ((Wu = !0),
                    Pc(tt, function () {
                      return wc(), null
                    })),
                  (i = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || i)
                ) {
                  ;(i = ku.transition), (ku.transition = null)
                  var l = yt
                  yt = 1
                  var u = Eu
                  ;(Eu |= 4),
                    (Su.current = null),
                    (function (e, t) {
                      if (((eo = Wt), pr((e = fr())))) {
                        if ('selectionStart' in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          }
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection()
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode
                              var o = r.anchorOffset,
                                i = r.focusNode
                              r = r.focusOffset
                              try {
                                n.nodeType, i.nodeType
                              } catch (x) {
                                n = null
                                break e
                              }
                              var l = 0,
                                u = -1,
                                c = -1,
                                s = 0,
                                d = 0,
                                f = e,
                                p = null
                              t: for (;;) {
                                for (
                                  var m;
                                  f !== n ||
                                    (0 !== o && 3 !== f.nodeType) ||
                                    (u = l + o),
                                    f !== i ||
                                      (0 !== r && 3 !== f.nodeType) ||
                                      (c = l + r),
                                    3 === f.nodeType &&
                                      (l += f.nodeValue.length),
                                    null !== (m = f.firstChild);

                                )
                                  (p = f), (f = m)
                                for (;;) {
                                  if (f === e) break t
                                  if (
                                    (p === n && ++s === o && (u = l),
                                    p === i && ++d === r && (c = l),
                                    null !== (m = f.nextSibling))
                                  )
                                    break
                                  p = (f = p).parentNode
                                }
                                f = m
                              }
                              n =
                                -1 === u || -1 === c
                                  ? null
                                  : {
                                      start: u,
                                      end: c,
                                    }
                            } else n = null
                          }
                        n = n || { start: 0, end: 0 }
                      } else n = null
                      for (
                        to = {
                          focusedElem: e,
                          selectionRange: n,
                        },
                          Wt = !1,
                          Xl = t;
                        null !== Xl;

                      )
                        if (
                          ((e = (t = Xl).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (Xl = e)
                        else
                          for (; null !== Xl; ) {
                            t = Xl
                            try {
                              var v = t.alternate
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break
                                  case 1:
                                    if (null !== v) {
                                      var g = v.memoizedProps,
                                        h = v.memoizedState,
                                        b = t.stateNode,
                                        y = b.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? g
                                            : Vo(t.type, g),
                                          h
                                        )
                                      b.__reactInternalSnapshotBeforeUpdate = y
                                    }
                                    break
                                  case 3:
                                    var _ = t.stateNode.containerInfo
                                    if (1 === _.nodeType) _.textContent = ''
                                    else if (9 === _.nodeType) {
                                      var w = _.body
                                      null != w && (w.textContent = '')
                                    }
                                    break
                                  default:
                                    throw Error(a(163))
                                }
                            } catch (x) {
                              Sc(t, t.return, x)
                            }
                            if (null !== (e = t.sibling)) {
                              ;(e.return = t.return), (Xl = e)
                              break
                            }
                            Xl = t.return
                          }
                      ;(v = Jl), (Jl = !1)
                    })(e, n),
                    pu(n, e),
                    mr(to),
                    (Wt = !!eo),
                    (to = eo = null),
                    (e.current = n),
                    vu(n, e, o),
                    Ye(),
                    (Eu = u),
                    (yt = l),
                    (ku.transition = i)
                } else e.current = n
                if (
                  (Wu && ((Wu = !1), (Vu = e), ($u = o)),
                  0 === (i = e.pendingLanes) && (Hu = null),
                  (function (e) {
                    if (at && 'function' === typeof at.onCommitFiberRoot)
                      try {
                        at.onCommitFiberRoot(
                          ot,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        )
                      } catch (t) {}
                  })(n.stateNode),
                  nc(e, Ke()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    r(t[n])
                if (Gu) throw ((Gu = !1), (e = Uu), (Uu = null), e)
                0 !== (1 & $u) && 0 !== e.tag && wc(),
                  0 !== (1 & (i = e.pendingLanes))
                    ? e === Qu
                      ? qu++
                      : ((qu = 0), (Qu = e))
                    : (qu = 0),
                  Ho()
              })(e, t, n, r)
          } finally {
            ;(ku.transition = o), (yt = r)
          }
          return null
        }
        function wc() {
          if (null !== Vu) {
            var e = _t($u),
              t = ku.transition,
              n = yt
            try {
              if (((ku.transition = null), (yt = 16 > e ? 16 : e), null === Vu))
                var r = !1
              else {
                if (((e = Vu), (Vu = null), ($u = 0), 0 !== (6 & Eu)))
                  throw Error(a(331))
                var o = Eu
                for (Eu |= 4, Xl = e.current; null !== Xl; ) {
                  var i = Xl,
                    l = i.child
                  if (0 !== (16 & Xl.flags)) {
                    var u = i.deletions
                    if (null !== u) {
                      for (var c = 0; c < u.length; c++) {
                        var s = u[c]
                        for (Xl = s; null !== Xl; ) {
                          var d = Xl
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              Zl(8, d, i)
                          }
                          var f = d.child
                          if (null !== f) (f.return = d), (Xl = f)
                          else
                            for (; null !== Xl; ) {
                              var p = (d = Xl).sibling,
                                m = d.return
                              if ((nu(d), d === s)) {
                                Xl = null
                                break
                              }
                              if (null !== p) {
                                ;(p.return = m), (Xl = p)
                                break
                              }
                              Xl = m
                            }
                        }
                      }
                      var v = i.alternate
                      if (null !== v) {
                        var g = v.child
                        if (null !== g) {
                          v.child = null
                          do {
                            var h = g.sibling
                            ;(g.sibling = null), (g = h)
                          } while (null !== g)
                        }
                      }
                      Xl = i
                    }
                  }
                  if (0 !== (2064 & i.subtreeFlags) && null !== l)
                    (l.return = i), (Xl = l)
                  else
                    e: for (; null !== Xl; ) {
                      if (0 !== (2048 & (i = Xl).flags))
                        switch (i.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Zl(9, i, i.return)
                        }
                      var b = i.sibling
                      if (null !== b) {
                        ;(b.return = i.return), (Xl = b)
                        break e
                      }
                      Xl = i.return
                    }
                }
                var y = e.current
                for (Xl = y; null !== Xl; ) {
                  var _ = (l = Xl).child
                  if (0 !== (2064 & l.subtreeFlags) && null !== _)
                    (_.return = l), (Xl = _)
                  else
                    e: for (l = y; null !== Xl; ) {
                      if (0 !== (2048 & (u = Xl).flags))
                        try {
                          switch (u.tag) {
                            case 0:
                            case 11:
                            case 15:
                              eu(9, u)
                          }
                        } catch (x) {
                          Sc(u, u.return, x)
                        }
                      if (u === l) {
                        Xl = null
                        break e
                      }
                      var w = u.sibling
                      if (null !== w) {
                        ;(w.return = u.return), (Xl = w)
                        break e
                      }
                      Xl = u.return
                    }
                }
                if (
                  ((Eu = o),
                  Ho(),
                  at && 'function' === typeof at.onPostCommitFiberRoot)
                )
                  try {
                    at.onPostCommitFiberRoot(ot, e)
                  } catch (x) {}
                r = !0
              }
              return r
            } finally {
              ;(yt = n), (ku.transition = t)
            }
          }
          return !1
        }
        function xc(e, t, n) {
          ia(e, (t = fl(0, (t = il(n, t)), 1))),
            (t = Ku()),
            null !== (e = ec(e, 1)) && (ht(e, 1, t), nc(e, t))
        }
        function Sc(e, t, n) {
          if (3 === e.tag) xc(e, e, n)
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                xc(t, e, n)
                break
              }
              if (1 === t.tag) {
                var r = t.stateNode
                if (
                  'function' === typeof t.type.getDerivedStateFromError ||
                  ('function' === typeof r.componentDidCatch &&
                    (null === Hu || !Hu.has(r)))
                ) {
                  ia(t, (e = pl(t, (e = il(n, e)), 1))),
                    (e = Ku()),
                    null !== (t = ec(t, 1)) && (ht(t, 1, e), nc(t, e))
                  break
                }
              }
              t = t.return
            }
        }
        function kc(e, t, n) {
          var r = e.pingCache
          null !== r && r.delete(t),
            (t = Ku()),
            (e.pingedLanes |= e.suspendedLanes & n),
            Iu === e &&
              (Pu & n) === n &&
              (4 === Tu ||
              (3 === Tu && (130023424 & Pu) === Pu && 500 > Ke() - Fu)
                ? dc(e, 0)
                : (Lu |= n)),
            nc(e, t)
        }
        function Ec(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = st), 0 === (130023424 & (st <<= 1)) && (st = 4194304)))
          var n = Ku()
          null !== (e = ec(e, t)) && (ht(e, t, n), nc(e, n))
        }
        function Ic(e) {
          var t = e.memoizedState,
            n = 0
          null !== t && (n = t.retryLane), Ec(e, n)
        }
        function Cc(e, t) {
          var n = 0
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                o = e.memoizedState
              null !== o && (n = o.retryLane)
              break
            case 19:
              r = e.stateNode
              break
            default:
              throw Error(a(314))
          }
          null !== r && r.delete(t), Ec(e, n)
        }
        function Pc(e, t) {
          return qe(e, t)
        }
        function Ac(e, t, n, r) {
          ;(this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null)
        }
        function Dc(e, t, n, r) {
          return new Ac(e, t, n, r)
        }
        function Tc(e) {
          return !(!(e = e.prototype) || !e.isReactComponent)
        }
        function Oc(e, t) {
          var n = e.alternate
          return (
            null === n
              ? (((n = Dc(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : {
                    lanes: t.lanes,
                    firstContext: t.firstContext,
                  }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          )
        }
        function Nc(e, t, n, r, o, i) {
          var l = 2
          if (((r = e), 'function' === typeof e)) Tc(e) && (l = 1)
          else if ('string' === typeof e) l = 5
          else
            e: switch (e) {
              case S:
                return Rc(n.children, o, i, t)
              case k:
                ;(l = 8), (o |= 8)
                break
              case E:
                return (
                  ((e = Dc(12, n, t, 2 | o)).elementType = E), (e.lanes = i), e
                )
              case A:
                return ((e = Dc(13, n, t, o)).elementType = A), (e.lanes = i), e
              case D:
                return ((e = Dc(19, n, t, o)).elementType = D), (e.lanes = i), e
              case N:
                return Lc(n, o, i, t)
              default:
                if ('object' === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case I:
                      l = 10
                      break e
                    case C:
                      l = 9
                      break e
                    case P:
                      l = 11
                      break e
                    case T:
                      l = 14
                      break e
                    case O:
                      ;(l = 16), (r = null)
                      break e
                  }
                throw Error(a(130, null == e ? e : typeof e, ''))
            }
          return (
            ((t = Dc(l, n, t, o)).elementType = e),
            (t.type = r),
            (t.lanes = i),
            t
          )
        }
        function Rc(e, t, n, r) {
          return ((e = Dc(7, e, r, t)).lanes = n), e
        }
        function Lc(e, t, n, r) {
          return (
            ((e = Dc(22, e, r, t)).elementType = N),
            (e.lanes = n),
            (e.stateNode = {}),
            e
          )
        }
        function Mc(e, t, n) {
          return ((e = Dc(6, e, null, t)).lanes = n), e
        }
        function Bc(e, t, n) {
          return (
            ((t = Dc(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          )
        }
        function Fc(e, t, n, r, o) {
          ;(this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = o),
            (this.mutableSourceEagerHydrationData = null)
        }
        function jc(e, t, n, r, o, a, i, l, u) {
          return (
            (e = new Fc(e, t, n, l, u)),
            1 === t ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
            (a = Dc(3, null, null, t)),
            (e.current = a),
            (a.stateNode = e),
            (a.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            ra(a),
            e
          )
        }
        function zc(e, t, n) {
          var r =
            3 < arguments.length && void 0 !== arguments[3]
              ? arguments[3]
              : null
          return {
            $$typeof: x,
            key: null == r ? null : '' + r,
            children: e,
            containerInfo: t,
            implementation: n,
          }
        }
        function Gc(e) {
          if (!e) return Po
          e: {
            if (Ue((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(a(170))
            var t = e
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context
                  break e
                case 1:
                  if (No(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext
                    break e
                  }
              }
              t = t.return
            } while (null !== t)
            throw Error(a(171))
          }
          if (1 === e.tag) {
            var n = e.type
            if (No(n)) return Mo(e, n, t)
          }
          return t
        }
        function Uc(e, t, n, r, o, a, i, l, u) {
          return (
            ((e = jc(n, r, !0, e, 0, a, 0, l, u)).context = Gc(null)),
            (n = e.current),
            ((a = aa((r = Ku()), (o = Ju(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            ia(n, a),
            (e.current.lanes = o),
            ht(e, o, r),
            nc(e, r),
            e
          )
        }
        function Hc(e, t, n, r) {
          var o = t.current,
            a = Ku(),
            i = Ju(o)
          return (
            (n = Gc(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = aa(a, i)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            ia(o, t),
            null !== (e = Zu(o, i, a)) && la(e, o, i),
            i
          )
        }
        function Wc(e) {
          return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null
        }
        function Vc(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane
            e.retryLane = 0 !== n && n < t ? n : t
          }
        }
        function $c(e, t) {
          Vc(e, t), (e = e.alternate) && Vc(e, t)
        }
        _u = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || Do.current) wl = !0
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (wl = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        Tl(t), Ga()
                        break
                      case 5:
                        ni(t)
                        break
                      case 1:
                        No(t.type) && Bo(t)
                        break
                      case 4:
                        ei(t, t.stateNode.containerInfo)
                        break
                      case 10:
                        var r = t.type._context,
                          o = t.memoizedProps.value
                        Co($o, r._currentValue), (r._currentValue = o)
                        break
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Co(oi, 1 & oi.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                            ? Ml(e, t, n)
                            : (Co(oi, 1 & oi.current),
                              null !== (e = Wl(e, t, n)) ? e.sibling : null)
                        Co(oi, 1 & oi.current)
                        break
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Hl(e, t, n)
                          t.flags |= 128
                        }
                        if (
                          (null !== (o = t.memoizedState) &&
                            ((o.rendering = null),
                            (o.tail = null),
                            (o.lastEffect = null)),
                          Co(oi, oi.current),
                          r)
                        )
                          break
                        return null
                      case 22:
                      case 23:
                        return (t.lanes = 0), Il(e, t, n)
                    }
                    return Wl(e, t, n)
                  })(e, t, n)
                )
              wl = 0 !== (131072 & e.flags)
            }
          else (wl = !1), Na && 0 !== (1048576 & t.flags) && Pa(t, wa, t.index)
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type
              null !== e &&
                ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
                (e = t.pendingProps)
              var o = Oo(t, Ao.current)
              Zo(t, n), (o = _i(null, t, r, e, o, n))
              var i = wi()
              return (
                (t.flags |= 1),
                'object' === typeof o &&
                null !== o &&
                'function' === typeof o.render &&
                void 0 === o.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    No(r) ? ((i = !0), Bo(t)) : (i = !1),
                    (t.memoizedState =
                      null !== o.state && void 0 !== o.state ? o.state : null),
                    ra(t),
                    (o.updater = pa),
                    (t.stateNode = o),
                    (o._reactInternals = t),
                    ha(t, r, e, n),
                    (t = Dl(null, t, r, !0, i, n)))
                  : ((t.tag = 0),
                    Na && i && Aa(t),
                    xl(null, t, o, n),
                    (t = t.child)),
                t
              )
            case 16:
              r = t.elementType
              e: {
                switch (
                  (null !== e &&
                    ((e.alternate = null),
                    (t.alternate = null),
                    (t.flags |= 2)),
                  (e = t.pendingProps),
                  (r = (o = r._init)(r._payload)),
                  (t.type = r),
                  (o = t.tag =
                    (function (e) {
                      if ('function' === typeof e) return Tc(e) ? 1 : 0
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === P) return 11
                        if (e === T) return 14
                      }
                      return 2
                    })(r)),
                  (e = Vo(r, e)),
                  o)
                ) {
                  case 0:
                    t = Pl(null, t, r, e, n)
                    break e
                  case 1:
                    t = Al(null, t, r, e, n)
                    break e
                  case 11:
                    t = Sl(null, t, r, e, n)
                    break e
                  case 14:
                    t = kl(null, t, r, Vo(r.type, e), n)
                    break e
                }
                throw Error(a(306, r, ''))
              }
              return t
            case 0:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Pl(e, t, r, (o = t.elementType === r ? o : Vo(r, o)), n)
              )
            case 1:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Al(e, t, r, (o = t.elementType === r ? o : Vo(r, o)), n)
              )
            case 3:
              e: {
                if ((Tl(t), null === e)) throw Error(a(387))
                ;(r = t.pendingProps),
                  (o = (i = t.memoizedState).element),
                  oa(e, t),
                  ca(t, r, null, n)
                var l = t.memoizedState
                if (((r = l.element), i.isDehydrated)) {
                  if (
                    ((i = {
                      element: r,
                      isDehydrated: !1,
                      cache: l.cache,
                      pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                      transitions: l.transitions,
                    }),
                    (t.updateQueue.baseState = i),
                    (t.memoizedState = i),
                    256 & t.flags)
                  ) {
                    t = Ol(e, t, r, n, (o = Error(a(423))))
                    break e
                  }
                  if (r !== o) {
                    t = Ol(e, t, r, n, (o = Error(a(424))))
                    break e
                  }
                  for (
                    Oa = co(t.stateNode.containerInfo.firstChild),
                      Ta = t,
                      Na = !0,
                      Ra = null,
                      n = Qa(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling)
                } else {
                  if ((Ga(), r === o)) {
                    t = Wl(e, t, n)
                    break e
                  }
                  xl(e, t, r, n)
                }
                t = t.child
              }
              return t
            case 5:
              return (
                ni(t),
                null === e && Fa(t),
                (r = t.type),
                (o = t.pendingProps),
                (i = null !== e ? e.memoizedProps : null),
                (l = o.children),
                no(r, o)
                  ? (l = null)
                  : null !== i && no(r, i) && (t.flags |= 32),
                Cl(e, t),
                xl(e, t, l, n),
                t.child
              )
            case 6:
              return null === e && Fa(t), null
            case 13:
              return Ml(e, t, n)
            case 4:
              return (
                ei(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = qa(t, null, r, n)) : xl(e, t, r, n),
                t.child
              )
            case 11:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Sl(e, t, r, (o = t.elementType === r ? o : Vo(r, o)), n)
              )
            case 7:
              return xl(e, t, t.pendingProps, n), t.child
            case 8:
            case 12:
              return xl(e, t, t.pendingProps.children, n), t.child
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (o = t.pendingProps),
                  (i = t.memoizedProps),
                  (l = o.value),
                  Co($o, r._currentValue),
                  (r._currentValue = l),
                  null !== i)
                )
                  if (lr(i.value, l)) {
                    if (i.children === o.children && !Do.current) {
                      t = Wl(e, t, n)
                      break e
                    }
                  } else
                    for (
                      null !== (i = t.child) && (i.return = t);
                      null !== i;

                    ) {
                      var u = i.dependencies
                      if (null !== u) {
                        l = i.child
                        for (var c = u.firstContext; null !== c; ) {
                          if (c.context === r) {
                            if (1 === i.tag) {
                              ;(c = aa(-1, n & -n)).tag = 2
                              var s = i.updateQueue
                              if (null !== s) {
                                var d = (s = s.shared).pending
                                null === d
                                  ? (c.next = c)
                                  : ((c.next = d.next), (d.next = c)),
                                  (s.pending = c)
                              }
                            }
                            ;(i.lanes |= n),
                              null !== (c = i.alternate) && (c.lanes |= n),
                              Jo(i.return, n, t),
                              (u.lanes |= n)
                            break
                          }
                          c = c.next
                        }
                      } else if (10 === i.tag)
                        l = i.type === t.type ? null : i.child
                      else if (18 === i.tag) {
                        if (null === (l = i.return)) throw Error(a(341))
                        ;(l.lanes |= n),
                          null !== (u = l.alternate) && (u.lanes |= n),
                          Jo(l, n, t),
                          (l = i.sibling)
                      } else l = i.child
                      if (null !== l) l.return = i
                      else
                        for (l = i; null !== l; ) {
                          if (l === t) {
                            l = null
                            break
                          }
                          if (null !== (i = l.sibling)) {
                            ;(i.return = l.return), (l = i)
                            break
                          }
                          l = l.return
                        }
                      i = l
                    }
                xl(e, t, o.children, n), (t = t.child)
              }
              return t
            case 9:
              return (
                (o = t.type),
                (r = t.pendingProps.children),
                Zo(t, n),
                (r = r((o = ea(o)))),
                (t.flags |= 1),
                xl(e, t, r, n),
                t.child
              )
            case 14:
              return (
                (o = Vo((r = t.type), t.pendingProps)),
                kl(e, t, r, (o = Vo(r.type, o)), n)
              )
            case 15:
              return El(e, t, t.type, t.pendingProps, n)
            case 17:
              return (
                (r = t.type),
                (o = t.pendingProps),
                (o = t.elementType === r ? o : Vo(r, o)),
                null !== e &&
                  ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
                (t.tag = 1),
                No(r) ? ((e = !0), Bo(t)) : (e = !1),
                Zo(t, n),
                va(t, r, o),
                ha(t, r, o, n),
                Dl(null, t, r, !0, e, n)
              )
            case 19:
              return Hl(e, t, n)
            case 22:
              return Il(e, t, n)
          }
          throw Error(a(156, t.tag))
        }
        var qc =
          'function' === typeof reportError
            ? reportError
            : function (e) {
                console.error(e)
              }
        function Qc(e) {
          this._internalRoot = e
        }
        function Xc(e) {
          this._internalRoot = e
        }
        function Yc(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          )
        }
        function Kc(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                ' react-mount-point-unstable ' !== e.nodeValue))
          )
        }
        function Jc() {}
        function Zc(e, t, n, r, o) {
          var a = n._reactRootContainer
          if (a) {
            var i = a
            if ('function' === typeof o) {
              var l = o
              o = function () {
                var e = Wc(i)
                l.call(e)
              }
            }
            Hc(t, i, e, o)
          } else
            i = (function (e, t, n, r, o) {
              if (o) {
                if ('function' === typeof r) {
                  var a = r
                  r = function () {
                    var e = Wc(i)
                    a.call(e)
                  }
                }
                var i = Uc(t, r, e, 0, null, !1, 0, '', Jc)
                return (
                  (e._reactRootContainer = i),
                  (e[vo] = i.current),
                  Ur(8 === e.nodeType ? e.parentNode : e),
                  cc(),
                  i
                )
              }
              for (; (o = e.lastChild); ) e.removeChild(o)
              if ('function' === typeof r) {
                var l = r
                r = function () {
                  var e = Wc(u)
                  l.call(e)
                }
              }
              var u = jc(e, 0, !1, null, 0, !1, 0, '', Jc)
              return (
                (e._reactRootContainer = u),
                (e[vo] = u.current),
                Ur(8 === e.nodeType ? e.parentNode : e),
                cc(function () {
                  Hc(t, u, n, r)
                }),
                u
              )
            })(n, t, e, o, r)
          return Wc(i)
        }
        ;(Xc.prototype.render = Qc.prototype.render =
          function (e) {
            var t = this._internalRoot
            if (null === t) throw Error(a(409))
            Hc(e, t, null, null)
          }),
          (Xc.prototype.unmount = Qc.prototype.unmount =
            function () {
              var e = this._internalRoot
              if (null !== e) {
                this._internalRoot = null
                var t = e.containerInfo
                cc(function () {
                  Hc(null, e, null, null)
                }),
                  (t[vo] = null)
              }
            }),
          (Xc.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = kt()
              e = { blockedOn: null, target: e, priority: t }
              for (
                var n = 0;
                n < Nt.length && 0 !== t && t < Nt[n].priority;
                n++
              );
              Nt.splice(n, 0, e), 0 === n && Bt(e)
            }
          }),
          (wt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes)
                  0 !== n &&
                    (bt(t, 1 | n),
                    nc(t, Ke()),
                    0 === (6 & Eu) && ((ju = Ke() + 500), Ho()))
                }
                break
              case 13:
                var r = Ku()
                cc(function () {
                  return Zu(e, 1, r)
                }),
                  $c(e, 1)
            }
          }),
          (xt = function (e) {
            13 === e.tag && (Zu(e, 134217728, Ku()), $c(e, 134217728))
          }),
          (St = function (e) {
            if (13 === e.tag) {
              var t = Ku(),
                n = Ju(e)
              Zu(e, n, t), $c(e, n)
            }
          }),
          (kt = function () {
            return yt
          }),
          (Et = function (e, t) {
            var n = yt
            try {
              return (yt = e), t()
            } finally {
              yt = n
            }
          }),
          (xe = function (e, t, n) {
            switch (t) {
              case 'input':
                if ((J(e, n), (t = n.name), 'radio' === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode
                  for (
                    n = n.querySelectorAll(
                      'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t]
                    if (r !== e && r.form === e.form) {
                      var o = xo(r)
                      if (!o) throw Error(a(90))
                      q(r), J(r, o)
                    }
                  }
                }
                break
              case 'textarea':
                ae(e, n)
                break
              case 'select':
                null != (t = n.value) && ne(e, !!n.multiple, t, !1)
            }
          }),
          (Pe = uc),
          (Ae = cc)
        var es = {
            usingClientEntryPoint: !1,
            Events: [_o, wo, xo, Ie, Ce, uc],
          },
          ts = {
            findFiberByHostInstance: yo,
            bundleType: 0,
            version: '18.1.0',
            rendererPackageName: 'react-dom',
          },
          ns = {
            bundleType: ts.bundleType,
            version: ts.version,
            rendererPackageName: ts.rendererPackageName,
            rendererConfig: ts.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: _.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = Ve(e)) ? null : e.stateNode
            },
            findFiberByHostInstance:
              ts.findFiberByHostInstance ||
              function () {
                return null
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: '18.1.0-next-22edb9f77-20220426',
          }
        if ('undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var rs = __REACT_DEVTOOLS_GLOBAL_HOOK__
          if (!rs.isDisabled && rs.supportsFiber)
            try {
              ;(ot = rs.inject(ns)), (at = rs)
            } catch (se) {}
        }
        ;(t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = es),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null
            if (!Yc(t)) throw Error(a(200))
            return zc(e, t, null, n)
          }),
          (t.createRoot = function (e, t) {
            if (!Yc(e)) throw Error(a(299))
            var n = !1,
              r = '',
              o = qc
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (o = t.onRecoverableError)),
              (t = jc(e, 1, !1, null, 0, n, 0, r, o)),
              (e[vo] = t.current),
              Ur(8 === e.nodeType ? e.parentNode : e),
              new Qc(t)
            )
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null
            if (1 === e.nodeType) return e
            var t = e._reactInternals
            if (void 0 === t) {
              if ('function' === typeof e.render) throw Error(a(188))
              throw ((e = Object.keys(e).join(',')), Error(a(268, e)))
            }
            return (e = null === (e = Ve(t)) ? null : e.stateNode)
          }),
          (t.flushSync = function (e) {
            return cc(e)
          }),
          (t.hydrate = function (e, t, n) {
            if (!Kc(t)) throw Error(a(200))
            return Zc(null, e, t, !0, n)
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Yc(e)) throw Error(a(405))
            var r = (null != n && n.hydratedSources) || null,
              o = !1,
              i = '',
              l = qc
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (o = !0),
                void 0 !== n.identifierPrefix && (i = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (l = n.onRecoverableError)),
              (t = Uc(t, null, e, 1, null != n ? n : null, o, 0, i, l)),
              (e[vo] = t.current),
              Ur(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (o = (o = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, o])
                    : t.mutableSourceEagerHydrationData.push(n, o)
            return new Xc(t)
          }),
          (t.render = function (e, t, n) {
            if (!Kc(t)) throw Error(a(200))
            return Zc(null, e, t, !1, n)
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Kc(e)) throw Error(a(40))
            return (
              !!e._reactRootContainer &&
              (cc(function () {
                Zc(null, null, e, !1, function () {
                  ;(e._reactRootContainer = null), (e[vo] = null)
                })
              }),
              !0)
            )
          }),
          (t.unstable_batchedUpdates = uc),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Kc(n)) throw Error(a(200))
            if (null == e || void 0 === e._reactInternals) throw Error(a(38))
            return Zc(e, t, n, !1, r)
          }),
          (t.version = '18.1.0-next-22edb9f77-20220426')
      },
      250: function (e, t, n) {
        'use strict'
        var r = n(164)
        ;(t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot)
      },
      164: function (e, t, n) {
        'use strict'
        !(function e() {
          if (
            'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
            } catch (t) {
              console.error(t)
            }
        })(),
          (e.exports = n(463))
      },
      372: function (e, t) {
        'use strict'
        var n = 'function' === typeof Symbol && Symbol.for,
          r = n ? Symbol.for('react.element') : 60103,
          o = n ? Symbol.for('react.portal') : 60106,
          a = n ? Symbol.for('react.fragment') : 60107,
          i = n ? Symbol.for('react.strict_mode') : 60108,
          l = n ? Symbol.for('react.profiler') : 60114,
          u = n ? Symbol.for('react.provider') : 60109,
          c = n ? Symbol.for('react.context') : 60110,
          s = n ? Symbol.for('react.async_mode') : 60111,
          d = n ? Symbol.for('react.concurrent_mode') : 60111,
          f = n ? Symbol.for('react.forward_ref') : 60112,
          p = n ? Symbol.for('react.suspense') : 60113,
          m = n ? Symbol.for('react.suspense_list') : 60120,
          v = n ? Symbol.for('react.memo') : 60115,
          g = n ? Symbol.for('react.lazy') : 60116,
          h = n ? Symbol.for('react.block') : 60121,
          b = n ? Symbol.for('react.fundamental') : 60117,
          y = n ? Symbol.for('react.responder') : 60118,
          _ = n ? Symbol.for('react.scope') : 60119
        function w(e) {
          if ('object' === typeof e && null !== e) {
            var t = e.$$typeof
            switch (t) {
              case r:
                switch ((e = e.type)) {
                  case s:
                  case d:
                  case a:
                  case l:
                  case i:
                  case p:
                    return e
                  default:
                    switch ((e = e && e.$$typeof)) {
                      case c:
                      case f:
                      case g:
                      case v:
                      case u:
                        return e
                      default:
                        return t
                    }
                }
              case o:
                return t
            }
          }
        }
        function x(e) {
          return w(e) === d
        }
        ;(t.AsyncMode = s),
          (t.ConcurrentMode = d),
          (t.ContextConsumer = c),
          (t.ContextProvider = u),
          (t.Element = r),
          (t.ForwardRef = f),
          (t.Fragment = a),
          (t.Lazy = g),
          (t.Memo = v),
          (t.Portal = o),
          (t.Profiler = l),
          (t.StrictMode = i),
          (t.Suspense = p),
          (t.isAsyncMode = function (e) {
            return x(e) || w(e) === s
          }),
          (t.isConcurrentMode = x),
          (t.isContextConsumer = function (e) {
            return w(e) === c
          }),
          (t.isContextProvider = function (e) {
            return w(e) === u
          }),
          (t.isElement = function (e) {
            return 'object' === typeof e && null !== e && e.$$typeof === r
          }),
          (t.isForwardRef = function (e) {
            return w(e) === f
          }),
          (t.isFragment = function (e) {
            return w(e) === a
          }),
          (t.isLazy = function (e) {
            return w(e) === g
          }),
          (t.isMemo = function (e) {
            return w(e) === v
          }),
          (t.isPortal = function (e) {
            return w(e) === o
          }),
          (t.isProfiler = function (e) {
            return w(e) === l
          }),
          (t.isStrictMode = function (e) {
            return w(e) === i
          }),
          (t.isSuspense = function (e) {
            return w(e) === p
          }),
          (t.isValidElementType = function (e) {
            return (
              'string' === typeof e ||
              'function' === typeof e ||
              e === a ||
              e === d ||
              e === l ||
              e === i ||
              e === p ||
              e === m ||
              ('object' === typeof e &&
                null !== e &&
                (e.$$typeof === g ||
                  e.$$typeof === v ||
                  e.$$typeof === u ||
                  e.$$typeof === c ||
                  e.$$typeof === f ||
                  e.$$typeof === b ||
                  e.$$typeof === y ||
                  e.$$typeof === _ ||
                  e.$$typeof === h))
            )
          }),
          (t.typeOf = w)
      },
      441: function (e, t, n) {
        'use strict'
        e.exports = n(372)
      },
      459: function (e, t) {
        'use strict'
        var n,
          r = Symbol.for('react.element'),
          o = Symbol.for('react.portal'),
          a = Symbol.for('react.fragment'),
          i = Symbol.for('react.strict_mode'),
          l = Symbol.for('react.profiler'),
          u = Symbol.for('react.provider'),
          c = Symbol.for('react.context'),
          s = Symbol.for('react.server_context'),
          d = Symbol.for('react.forward_ref'),
          f = Symbol.for('react.suspense'),
          p = Symbol.for('react.suspense_list'),
          m = Symbol.for('react.memo'),
          v = Symbol.for('react.lazy'),
          g = Symbol.for('react.offscreen')
        function h(e) {
          if ('object' === typeof e && null !== e) {
            var t = e.$$typeof
            switch (t) {
              case r:
                switch ((e = e.type)) {
                  case a:
                  case l:
                  case i:
                  case f:
                  case p:
                    return e
                  default:
                    switch ((e = e && e.$$typeof)) {
                      case s:
                      case c:
                      case d:
                      case v:
                      case m:
                      case u:
                        return e
                      default:
                        return t
                    }
                }
              case o:
                return t
            }
          }
        }
        n = Symbol.for('react.module.reference')
      },
      900: function (e, t, n) {
        'use strict'
        n(459)
      },
      374: function (e, t, n) {
        'use strict'
        var r = n(791),
          o = Symbol.for('react.element'),
          a = Symbol.for('react.fragment'),
          i = Object.prototype.hasOwnProperty,
          l =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          u = { key: !0, ref: !0, __self: !0, __source: !0 }
        function c(e, t, n) {
          var r,
            a = {},
            c = null,
            s = null
          for (r in (void 0 !== n && (c = '' + n),
          void 0 !== t.key && (c = '' + t.key),
          void 0 !== t.ref && (s = t.ref),
          t))
            i.call(t, r) && !u.hasOwnProperty(r) && (a[r] = t[r])
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === a[r] && (a[r] = t[r])
          return {
            $$typeof: o,
            type: e,
            key: c,
            ref: s,
            props: a,
            _owner: l.current,
          }
        }
        ;(t.Fragment = a), (t.jsx = c), (t.jsxs = c)
      },
      117: function (e, t) {
        'use strict'
        var n = Symbol.for('react.element'),
          r = Symbol.for('react.portal'),
          o = Symbol.for('react.fragment'),
          a = Symbol.for('react.strict_mode'),
          i = Symbol.for('react.profiler'),
          l = Symbol.for('react.provider'),
          u = Symbol.for('react.context'),
          c = Symbol.for('react.forward_ref'),
          s = Symbol.for('react.suspense'),
          d = Symbol.for('react.memo'),
          f = Symbol.for('react.lazy'),
          p = Symbol.iterator
        var m = {
            isMounted: function () {
              return !1
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          v = Object.assign,
          g = {}
        function h(e, t, n) {
          ;(this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || m)
        }
        function b() {}
        function y(e, t, n) {
          ;(this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || m)
        }
        ;(h.prototype.isReactComponent = {}),
          (h.prototype.setState = function (e, t) {
            if ('object' !== typeof e && 'function' !== typeof e && null != e)
              throw Error(
                'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
              )
            this.updater.enqueueSetState(this, e, t, 'setState')
          }),
          (h.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
          }),
          (b.prototype = h.prototype)
        var _ = (y.prototype = new b())
        ;(_.constructor = y), v(_, h.prototype), (_.isPureReactComponent = !0)
        var w = Array.isArray,
          x = Object.prototype.hasOwnProperty,
          S = { current: null },
          k = { key: !0, ref: !0, __self: !0, __source: !0 }
        function E(e, t, r) {
          var o,
            a = {},
            i = null,
            l = null
          if (null != t)
            for (o in (void 0 !== t.ref && (l = t.ref),
            void 0 !== t.key && (i = '' + t.key),
            t))
              x.call(t, o) && !k.hasOwnProperty(o) && (a[o] = t[o])
          var u = arguments.length - 2
          if (1 === u) a.children = r
          else if (1 < u) {
            for (var c = Array(u), s = 0; s < u; s++) c[s] = arguments[s + 2]
            a.children = c
          }
          if (e && e.defaultProps)
            for (o in (u = e.defaultProps)) void 0 === a[o] && (a[o] = u[o])
          return {
            $$typeof: n,
            type: e,
            key: i,
            ref: l,
            props: a,
            _owner: S.current,
          }
        }
        function I(e) {
          return 'object' === typeof e && null !== e && e.$$typeof === n
        }
        var C = /\/+/g
        function P(e, t) {
          return 'object' === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { '=': '=0', ':': '=2' }
                return (
                  '$' +
                  e.replace(/[=:]/g, function (e) {
                    return t[e]
                  })
                )
              })('' + e.key)
            : t.toString(36)
        }
        function A(e, t, o, a, i) {
          var l = typeof e
          ;('undefined' !== l && 'boolean' !== l) || (e = null)
          var u = !1
          if (null === e) u = !0
          else
            switch (l) {
              case 'string':
              case 'number':
                u = !0
                break
              case 'object':
                switch (e.$$typeof) {
                  case n:
                  case r:
                    u = !0
                }
            }
          if (u)
            return (
              (i = i((u = e))),
              (e = '' === a ? '.' + P(u, 0) : a),
              w(i)
                ? ((o = ''),
                  null != e && (o = e.replace(C, '$&/') + '/'),
                  A(i, t, o, '', function (e) {
                    return e
                  }))
                : null != i &&
                  (I(i) &&
                    (i = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      }
                    })(
                      i,
                      o +
                        (!i.key || (u && u.key === i.key)
                          ? ''
                          : ('' + i.key).replace(C, '$&/') + '/') +
                        e
                    )),
                  t.push(i)),
              1
            )
          if (((u = 0), (a = '' === a ? '.' : a + ':'), w(e)))
            for (var c = 0; c < e.length; c++) {
              var s = a + P((l = e[c]), c)
              u += A(l, t, o, s, i)
            }
          else if (
            ((s = (function (e) {
              return null === e || 'object' !== typeof e
                ? null
                : 'function' === typeof (e = (p && e[p]) || e['@@iterator'])
                ? e
                : null
            })(e)),
            'function' === typeof s)
          )
            for (e = s.call(e), c = 0; !(l = e.next()).done; )
              u += A((l = l.value), t, o, (s = a + P(l, c++)), i)
          else if ('object' === l)
            throw (
              ((t = String(e)),
              Error(
                'Objects are not valid as a React child (found: ' +
                  ('[object Object]' === t
                    ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                    : t) +
                  '). If you meant to render a collection of children, use an array instead.'
              ))
            )
          return u
        }
        function D(e, t, n) {
          if (null == e) return e
          var r = [],
            o = 0
          return (
            A(e, r, '', '', function (e) {
              return t.call(n, e, o++)
            }),
            r
          )
        }
        function T(e) {
          if (-1 === e._status) {
            var t = e._result
            ;(t = t()).then(
              function (t) {
                ;(0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t))
              },
              function (t) {
                ;(0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t))
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t))
          }
          if (1 === e._status) return e._result.default
          throw e._result
        }
        var O = { current: null },
          N = { transition: null },
          R = {
            ReactCurrentDispatcher: O,
            ReactCurrentBatchConfig: N,
            ReactCurrentOwner: S,
          }
        ;(t.Children = {
          map: D,
          forEach: function (e, t, n) {
            D(
              e,
              function () {
                t.apply(this, arguments)
              },
              n
            )
          },
          count: function (e) {
            var t = 0
            return (
              D(e, function () {
                t++
              }),
              t
            )
          },
          toArray: function (e) {
            return (
              D(e, function (e) {
                return e
              }) || []
            )
          },
          only: function (e) {
            if (!I(e))
              throw Error(
                'React.Children.only expected to receive a single React element child.'
              )
            return e
          },
        }),
          (t.Component = h),
          (t.Fragment = o),
          (t.Profiler = i),
          (t.PureComponent = y),
          (t.StrictMode = a),
          (t.Suspense = s),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = R),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                'React.cloneElement(...): The argument must be a React element, but you passed ' +
                  e +
                  '.'
              )
            var o = v({}, e.props),
              a = e.key,
              i = e.ref,
              l = e._owner
            if (null != t) {
              if (
                (void 0 !== t.ref && ((i = t.ref), (l = S.current)),
                void 0 !== t.key && (a = '' + t.key),
                e.type && e.type.defaultProps)
              )
                var u = e.type.defaultProps
              for (c in t)
                x.call(t, c) &&
                  !k.hasOwnProperty(c) &&
                  (o[c] = void 0 === t[c] && void 0 !== u ? u[c] : t[c])
            }
            var c = arguments.length - 2
            if (1 === c) o.children = r
            else if (1 < c) {
              u = Array(c)
              for (var s = 0; s < c; s++) u[s] = arguments[s + 2]
              o.children = u
            }
            return {
              $$typeof: n,
              type: e.type,
              key: a,
              ref: i,
              props: o,
              _owner: l,
            }
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: u,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: l, _context: e }),
              (e.Consumer = e)
            )
          }),
          (t.createElement = E),
          (t.createFactory = function (e) {
            var t = E.bind(null, e)
            return (t.type = e), t
          }),
          (t.createRef = function () {
            return { current: null }
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: c, render: e }
          }),
          (t.isValidElement = I),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: T,
            }
          }),
          (t.memo = function (e, t) {
            return {
              $$typeof: d,
              type: e,
              compare: void 0 === t ? null : t,
            }
          }),
          (t.startTransition = function (e) {
            var t = N.transition
            N.transition = {}
            try {
              e()
            } finally {
              N.transition = t
            }
          }),
          (t.unstable_act = function () {
            throw Error(
              'act(...) is not supported in production builds of React.'
            )
          }),
          (t.useCallback = function (e, t) {
            return O.current.useCallback(e, t)
          }),
          (t.useContext = function (e) {
            return O.current.useContext(e)
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return O.current.useDeferredValue(e)
          }),
          (t.useEffect = function (e, t) {
            return O.current.useEffect(e, t)
          }),
          (t.useId = function () {
            return O.current.useId()
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return O.current.useImperativeHandle(e, t, n)
          }),
          (t.useInsertionEffect = function (e, t) {
            return O.current.useInsertionEffect(e, t)
          }),
          (t.useLayoutEffect = function (e, t) {
            return O.current.useLayoutEffect(e, t)
          }),
          (t.useMemo = function (e, t) {
            return O.current.useMemo(e, t)
          }),
          (t.useReducer = function (e, t, n) {
            return O.current.useReducer(e, t, n)
          }),
          (t.useRef = function (e) {
            return O.current.useRef(e)
          }),
          (t.useState = function (e) {
            return O.current.useState(e)
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return O.current.useSyncExternalStore(e, t, n)
          }),
          (t.useTransition = function () {
            return O.current.useTransition()
          }),
          (t.version = '18.1.0')
      },
      791: function (e, t, n) {
        'use strict'
        e.exports = n(117)
      },
      184: function (e, t, n) {
        'use strict'
        e.exports = n(374)
      },
      813: function (e, t) {
        'use strict'
        function n(e, t) {
          var n = e.length
          e.push(t)
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              o = e[r]
            if (!(0 < a(o, t))) break e
            ;(e[r] = t), (e[n] = o), (n = r)
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0]
        }
        function o(e) {
          if (0 === e.length) return null
          var t = e[0],
            n = e.pop()
          if (n !== t) {
            e[0] = n
            e: for (var r = 0, o = e.length, i = o >>> 1; r < i; ) {
              var l = 2 * (r + 1) - 1,
                u = e[l],
                c = l + 1,
                s = e[c]
              if (0 > a(u, n))
                c < o && 0 > a(s, u)
                  ? ((e[r] = s), (e[c] = n), (r = c))
                  : ((e[r] = u), (e[l] = n), (r = l))
              else {
                if (!(c < o && 0 > a(s, n))) break e
                ;(e[r] = s), (e[c] = n), (r = c)
              }
            }
          }
          return t
        }
        function a(e, t) {
          var n = e.sortIndex - t.sortIndex
          return 0 !== n ? n : e.id - t.id
        }
        if (
          'object' === typeof performance &&
          'function' === typeof performance.now
        ) {
          var i = performance
          t.unstable_now = function () {
            return i.now()
          }
        } else {
          var l = Date,
            u = l.now()
          t.unstable_now = function () {
            return l.now() - u
          }
        }
        var c = [],
          s = [],
          d = 1,
          f = null,
          p = 3,
          m = !1,
          v = !1,
          g = !1,
          h = 'function' === typeof setTimeout ? setTimeout : null,
          b = 'function' === typeof clearTimeout ? clearTimeout : null,
          y = 'undefined' !== typeof setImmediate ? setImmediate : null
        function _(e) {
          for (var t = r(s); null !== t; ) {
            if (null === t.callback) o(s)
            else {
              if (!(t.startTime <= e)) break
              o(s), (t.sortIndex = t.expirationTime), n(c, t)
            }
            t = r(s)
          }
        }
        function w(e) {
          if (((g = !1), _(e), !v))
            if (null !== r(c)) (v = !0), N(x)
            else {
              var t = r(s)
              null !== t && R(w, t.startTime - e)
            }
        }
        function x(e, n) {
          ;(v = !1), g && ((g = !1), b(I), (I = -1)), (m = !0)
          var a = p
          try {
            for (
              _(n), f = r(c);
              null !== f && (!(f.expirationTime > n) || (e && !A()));

            ) {
              var i = f.callback
              if ('function' === typeof i) {
                ;(f.callback = null), (p = f.priorityLevel)
                var l = i(f.expirationTime <= n)
                ;(n = t.unstable_now()),
                  'function' === typeof l
                    ? (f.callback = l)
                    : f === r(c) && o(c),
                  _(n)
              } else o(c)
              f = r(c)
            }
            if (null !== f) var u = !0
            else {
              var d = r(s)
              null !== d && R(w, d.startTime - n), (u = !1)
            }
            return u
          } finally {
            ;(f = null), (p = a), (m = !1)
          }
        }
        'undefined' !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling)
        var S,
          k = !1,
          E = null,
          I = -1,
          C = 5,
          P = -1
        function A() {
          return !(t.unstable_now() - P < C)
        }
        function D() {
          if (null !== E) {
            var e = t.unstable_now()
            P = e
            var n = !0
            try {
              n = E(!0, e)
            } finally {
              n ? S() : ((k = !1), (E = null))
            }
          } else k = !1
        }
        if ('function' === typeof y)
          S = function () {
            y(D)
          }
        else if ('undefined' !== typeof MessageChannel) {
          var T = new MessageChannel(),
            O = T.port2
          ;(T.port1.onmessage = D),
            (S = function () {
              O.postMessage(null)
            })
        } else
          S = function () {
            h(D, 0)
          }
        function N(e) {
          ;(E = e), k || ((k = !0), S())
        }
        function R(e, n) {
          I = h(function () {
            e(t.unstable_now())
          }, n)
        }
        ;(t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null
          }),
          (t.unstable_continueExecution = function () {
            v || m || ((v = !0), N(x))
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (C = 0 < e ? Math.floor(1e3 / e) : 5)
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(c)
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3
                break
              default:
                t = p
            }
            var n = p
            p = t
            try {
              return e()
            } finally {
              p = n
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                e = 3
            }
            var n = p
            p = e
            try {
              return t()
            } finally {
              p = n
            }
          }),
          (t.unstable_scheduleCallback = function (e, o, a) {
            var i = t.unstable_now()
            switch (
              ('object' === typeof a && null !== a
                ? (a = 'number' === typeof (a = a.delay) && 0 < a ? i + a : i)
                : (a = i),
              e)
            ) {
              case 1:
                var l = -1
                break
              case 2:
                l = 250
                break
              case 5:
                l = 1073741823
                break
              case 4:
                l = 1e4
                break
              default:
                l = 5e3
            }
            return (
              (e = {
                id: d++,
                callback: o,
                priorityLevel: e,
                startTime: a,
                expirationTime: (l = a + l),
                sortIndex: -1,
              }),
              a > i
                ? ((e.sortIndex = a),
                  n(s, e),
                  null === r(c) &&
                    e === r(s) &&
                    (g ? (b(I), (I = -1)) : (g = !0), R(w, a - i)))
                : ((e.sortIndex = l), n(c, e), v || m || ((v = !0), N(x))),
              e
            )
          }),
          (t.unstable_shouldYield = A),
          (t.unstable_wrapCallback = function (e) {
            var t = p
            return function () {
              var n = p
              p = t
              try {
                return e.apply(this, arguments)
              } finally {
                p = n
              }
            }
          })
      },
      296: function (e, t, n) {
        'use strict'
        e.exports = n(813)
      },
      561: function (e, t, n) {
        'use strict'
        var r = n(791)
        var o =
            'function' === typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e === 1 / t)) ||
                    (e !== e && t !== t)
                  )
                },
          a = r.useState,
          i = r.useEffect,
          l = r.useLayoutEffect,
          u = r.useDebugValue
        function c(e) {
          var t = e.getSnapshot
          e = e.value
          try {
            var n = t()
            return !o(e, n)
          } catch (r) {
            return !0
          }
        }
        var s =
          'undefined' === typeof window ||
          'undefined' === typeof window.document ||
          'undefined' === typeof window.document.createElement
            ? function (e, t) {
                return t()
              }
            : function (e, t) {
                var n = t(),
                  r = a({ inst: { value: n, getSnapshot: t } }),
                  o = r[0].inst,
                  s = r[1]
                return (
                  l(
                    function () {
                      ;(o.value = n),
                        (o.getSnapshot = t),
                        c(o) && s({ inst: o })
                    },
                    [e, n, t]
                  ),
                  i(
                    function () {
                      return (
                        c(o) && s({ inst: o }),
                        e(function () {
                          c(o) && s({ inst: o })
                        })
                      )
                    },
                    [e]
                  ),
                  u(n),
                  n
                )
              }
        t.useSyncExternalStore =
          void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : s
      },
      595: function (e, t, n) {
        'use strict'
        var r = n(791),
          o = n(248)
        var a =
            'function' === typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e === 1 / t)) ||
                    (e !== e && t !== t)
                  )
                },
          i = o.useSyncExternalStore,
          l = r.useRef,
          u = r.useEffect,
          c = r.useMemo,
          s = r.useDebugValue
        t.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
          var d = l(null)
          if (null === d.current) {
            var f = { hasValue: !1, value: null }
            d.current = f
          } else f = d.current
          d = c(
            function () {
              function e(e) {
                if (!u) {
                  if (
                    ((u = !0), (i = e), (e = r(e)), void 0 !== o && f.hasValue)
                  ) {
                    var t = f.value
                    if (o(t, e)) return (l = t)
                  }
                  return (l = e)
                }
                if (((t = l), a(i, e))) return t
                var n = r(e)
                return void 0 !== o && o(t, n) ? t : ((i = e), (l = n))
              }
              var i,
                l,
                u = !1,
                c = void 0 === n ? null : n
              return [
                function () {
                  return e(t())
                },
                null === c
                  ? void 0
                  : function () {
                      return e(c())
                    },
              ]
            },
            [t, n, r, o]
          )
          var p = i(e, d[0], d[1])
          return (
            u(
              function () {
                ;(f.hasValue = !0), (f.value = p)
              },
              [p]
            ),
            s(p),
            p
          )
        }
      },
      248: function (e, t, n) {
        'use strict'
        e.exports = n(561)
      },
      327: function (e, t, n) {
        'use strict'
        e.exports = n(595)
      },
    },
    t = {}
  function n(r) {
    var o = t[r]
    if (void 0 !== o) return o.exports
    var a = (t[r] = { exports: {} })
    return e[r](a, a.exports, n), a.exports
  }
  ;(n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default
          }
        : function () {
            return e
          }
    return n.d(t, { a: t }), t
  }),
    (n.d = function (e, t) {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
    }),
    (n.g = (function () {
      if ('object' === typeof globalThis) return globalThis
      try {
        return this || new Function('return this')()
      } catch (e) {
        if ('object' === typeof window) return window
      }
    })()),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (function () {
      'use strict'
      var e = n(250),
        t = n(791)
      function r(e, t) {
        return (
          (r = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return (e.__proto__ = t), e
              }),
          r(e, t)
        )
      }
      function o(e, t) {
        ;(e.prototype = Object.create(t.prototype)),
          (e.prototype.constructor = e),
          r(e, t)
      }
      function a() {
        return (
          (a = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t]
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
              }),
          a.apply(this, arguments)
        )
      }
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        )
      }
      function l(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? l(Object(n), !0).forEach(function (t) {
                i(e, t, n[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : l(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                )
              })
        }
        return e
      }
      function c(e) {
        return (
          'Minified Redux error #' +
          e +
          '; visit https://redux.js.org/Errors?code=' +
          e +
          ' for the full message or use the non-minified dev environment for full errors. '
        )
      }
      var s =
          ('function' === typeof Symbol && Symbol.observable) || '@@observable',
        d = function () {
          return Math.random().toString(36).substring(7).split('').join('.')
        },
        f = {
          INIT: '@@redux/INIT' + d(),
          REPLACE: '@@redux/REPLACE' + d(),
          PROBE_UNKNOWN_ACTION: function () {
            return '@@redux/PROBE_UNKNOWN_ACTION' + d()
          },
        }
      function p(e) {
        if ('object' !== typeof e || null === e) return !1
        for (var t = e; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t)
        return Object.getPrototypeOf(e) === t
      }
      function m(e, t, n) {
        var r
        if (
          ('function' === typeof t && 'function' === typeof n) ||
          ('function' === typeof n && 'function' === typeof arguments[3])
        )
          throw new Error(c(0))
        if (
          ('function' === typeof t &&
            'undefined' === typeof n &&
            ((n = t), (t = void 0)),
          'undefined' !== typeof n)
        ) {
          if ('function' !== typeof n) throw new Error(c(1))
          return n(m)(e, t)
        }
        if ('function' !== typeof e) throw new Error(c(2))
        var o = e,
          a = t,
          i = [],
          l = i,
          u = !1
        function d() {
          l === i && (l = i.slice())
        }
        function v() {
          if (u) throw new Error(c(3))
          return a
        }
        function g(e) {
          if ('function' !== typeof e) throw new Error(c(4))
          if (u) throw new Error(c(5))
          var t = !0
          return (
            d(),
            l.push(e),
            function () {
              if (t) {
                if (u) throw new Error(c(6))
                ;(t = !1), d()
                var n = l.indexOf(e)
                l.splice(n, 1), (i = null)
              }
            }
          )
        }
        function h(e) {
          if (!p(e)) throw new Error(c(7))
          if ('undefined' === typeof e.type) throw new Error(c(8))
          if (u) throw new Error(c(9))
          try {
            ;(u = !0), (a = o(a, e))
          } finally {
            u = !1
          }
          for (var t = (i = l), n = 0; n < t.length; n++) {
            ;(0, t[n])()
          }
          return e
        }
        function b(e) {
          if ('function' !== typeof e) throw new Error(c(10))
          ;(o = e), h({ type: f.REPLACE })
        }
        function y() {
          var e,
            t = g
          return (
            ((e = {
              subscribe: function (e) {
                if ('object' !== typeof e || null === e) throw new Error(c(11))
                function n() {
                  e.next && e.next(v())
                }
                return n(), { unsubscribe: t(n) }
              },
            })[s] = function () {
              return this
            }),
            e
          )
        }
        return (
          h({ type: f.INIT }),
          ((r = {
            dispatch: h,
            subscribe: g,
            getState: v,
            replaceReducer: b,
          })[s] = y),
          r
        )
      }
      function v(e) {
        for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
          var o = t[r]
          0, 'function' === typeof e[o] && (n[o] = e[o])
        }
        var a,
          i = Object.keys(n)
        try {
          !(function (e) {
            Object.keys(e).forEach(function (t) {
              var n = e[t]
              if ('undefined' === typeof n(void 0, { type: f.INIT }))
                throw new Error(c(12))
              if (
                'undefined' ===
                typeof n(void 0, {
                  type: f.PROBE_UNKNOWN_ACTION(),
                })
              )
                throw new Error(c(13))
            })
          })(n)
        } catch (l) {
          a = l
        }
        return function (e, t) {
          if ((void 0 === e && (e = {}), a)) throw a
          for (var r = !1, o = {}, l = 0; l < i.length; l++) {
            var u = i[l],
              s = n[u],
              d = e[u],
              f = s(d, t)
            if ('undefined' === typeof f) {
              t && t.type
              throw new Error(c(14))
            }
            ;(o[u] = f), (r = r || f !== d)
          }
          return (r = r || i.length !== Object.keys(e).length) ? o : e
        }
      }
      function g(e, t) {
        return function () {
          return t(e.apply(this, arguments))
        }
      }
      function h(e, t) {
        if ('function' === typeof e) return g(e, t)
        if ('object' !== typeof e || null === e) throw new Error(c(16))
        var n = {}
        for (var r in e) {
          var o = e[r]
          'function' === typeof o && (n[r] = g(o, t))
        }
        return n
      }
      function b() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n]
        return 0 === t.length
          ? function (e) {
              return e
            }
          : 1 === t.length
          ? t[0]
          : t.reduce(function (e, t) {
              return function () {
                return e(t.apply(void 0, arguments))
              }
            })
      }
      function y() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n]
        return function (e) {
          return function () {
            var n = e.apply(void 0, arguments),
              r = function () {
                throw new Error(c(15))
              },
              o = {
                getState: n.getState,
                dispatch: function () {
                  return r.apply(void 0, arguments)
                },
              },
              a = t.map(function (e) {
                return e(o)
              })
            return (
              (r = b.apply(void 0, a)(n.dispatch)),
              u(u({}, n), {}, { dispatch: r })
            )
          }
        }
      }
      var _ = t.createContext(null)
      var w = function (e) {
          e()
        },
        x = function () {
          return w
        }
      var S = {
        notify: function () {},
        get: function () {
          return []
        },
      }
      function k(e, t) {
        var n,
          r = S
        function o() {
          i.onStateChange && i.onStateChange()
        }
        function a() {
          n ||
            ((n = t ? t.addNestedSub(o) : e.subscribe(o)),
            (r = (function () {
              var e = x(),
                t = null,
                n = null
              return {
                clear: function () {
                  ;(t = null), (n = null)
                },
                notify: function () {
                  e(function () {
                    for (var e = t; e; ) e.callback(), (e = e.next)
                  })
                },
                get: function () {
                  for (var e = [], n = t; n; ) e.push(n), (n = n.next)
                  return e
                },
                subscribe: function (e) {
                  var r = !0,
                    o = (n = {
                      callback: e,
                      next: null,
                      prev: n,
                    })
                  return (
                    o.prev ? (o.prev.next = o) : (t = o),
                    function () {
                      r &&
                        null !== t &&
                        ((r = !1),
                        o.next ? (o.next.prev = o.prev) : (n = o.prev),
                        o.prev ? (o.prev.next = o.next) : (t = o.next))
                    }
                  )
                },
              }
            })()))
        }
        var i = {
          addNestedSub: function (e) {
            return a(), r.subscribe(e)
          },
          notifyNestedSubs: function () {
            r.notify()
          },
          handleChangeWrapper: o,
          isSubscribed: function () {
            return Boolean(n)
          },
          trySubscribe: a,
          tryUnsubscribe: function () {
            n && (n(), (n = void 0), r.clear(), (r = S))
          },
          getListeners: function () {
            return r
          },
        }
        return i
      }
      var E =
        'undefined' !== typeof window &&
        'undefined' !== typeof window.document &&
        'undefined' !== typeof window.document.createElement
          ? t.useLayoutEffect
          : t.useEffect
      var I = function (e) {
        var n = e.store,
          r = e.context,
          o = e.children,
          a = (0, t.useMemo)(
            function () {
              var e = k(n)
              return { store: n, subscription: e }
            },
            [n]
          ),
          i = (0, t.useMemo)(
            function () {
              return n.getState()
            },
            [n]
          )
        E(
          function () {
            var e = a.subscription
            return (
              (e.onStateChange = e.notifyNestedSubs),
              e.trySubscribe(),
              i !== n.getState() && e.notifyNestedSubs(),
              function () {
                e.tryUnsubscribe(), (e.onStateChange = null)
              }
            )
          },
          [a, i]
        )
        var l = r || _
        return t.createElement(l.Provider, { value: a }, o)
      }
      function C(e, t) {
        if (null == e) return {}
        var n,
          r,
          o = {},
          a = Object.keys(e)
        for (r = 0; r < a.length; r++)
          (n = a[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
        return o
      }
      var P = n(110),
        A = n.n(P),
        D = n(556),
        T = [
          'getDisplayName',
          'methodName',
          'renderCountProp',
          'shouldHandleStateChanges',
          'storeKey',
          'withRef',
          'forwardRef',
          'context',
        ],
        O = ['reactReduxForwardedRef'],
        N = [],
        R = [null, null]
      function L(e, t) {
        var n = e[1]
        return [t.payload, n + 1]
      }
      function M(e, t, n) {
        E(function () {
          return e.apply(void 0, t)
        }, n)
      }
      function B(e, t, n, r, o, a, i) {
        ;(e.current = r),
          (t.current = o),
          (n.current = !1),
          a.current && ((a.current = null), i())
      }
      function F(e, t, n, r, o, a, i, l, u, c) {
        if (e) {
          var s = !1,
            d = null,
            f = function () {
              if (!s) {
                var e,
                  n,
                  f = t.getState()
                try {
                  e = r(f, o.current)
                } catch (p) {
                  ;(n = p), (d = p)
                }
                n || (d = null),
                  e === a.current
                    ? i.current || u()
                    : ((a.current = e),
                      (l.current = e),
                      (i.current = !0),
                      c({
                        type: 'STORE_UPDATED',
                        payload: { error: n },
                      }))
              }
            }
          ;(n.onStateChange = f), n.trySubscribe(), f()
          return function () {
            if (((s = !0), n.tryUnsubscribe(), (n.onStateChange = null), d))
              throw d
          }
        }
      }
      var j = function () {
        return [null, 0]
      }
      function z(e, n) {
        void 0 === n && (n = {})
        var r = n,
          o = r.getDisplayName,
          i =
            void 0 === o
              ? function (e) {
                  return 'ConnectAdvanced(' + e + ')'
                }
              : o,
          l = r.methodName,
          u = void 0 === l ? 'connectAdvanced' : l,
          c = r.renderCountProp,
          s = void 0 === c ? void 0 : c,
          d = r.shouldHandleStateChanges,
          f = void 0 === d || d,
          p = r.storeKey,
          m = void 0 === p ? 'store' : p,
          v = (r.withRef, r.forwardRef),
          g = void 0 !== v && v,
          h = r.context,
          b = void 0 === h ? _ : h,
          y = C(r, T),
          w = b
        return function (n) {
          var r = n.displayName || n.name || 'Component',
            o = i(r),
            l = a({}, y, {
              getDisplayName: i,
              methodName: u,
              renderCountProp: s,
              shouldHandleStateChanges: f,
              storeKey: m,
              displayName: o,
              wrappedComponentName: r,
              WrappedComponent: n,
            }),
            c = y.pure
          var d = c
            ? t.useMemo
            : function (e) {
                return e()
              }
          function p(r) {
            var o = (0, t.useMemo)(
                function () {
                  var e = r.reactReduxForwardedRef,
                    t = C(r, O)
                  return [r.context, e, t]
                },
                [r]
              ),
              i = o[0],
              u = o[1],
              c = o[2],
              s = (0, t.useMemo)(
                function () {
                  return i &&
                    i.Consumer &&
                    (0, D.isContextConsumer)(t.createElement(i.Consumer, null))
                    ? i
                    : w
                },
                [i, w]
              ),
              p = (0, t.useContext)(s),
              m =
                Boolean(r.store) &&
                Boolean(r.store.getState) &&
                Boolean(r.store.dispatch)
            Boolean(p) && Boolean(p.store)
            var v = m ? r.store : p.store,
              g = (0, t.useMemo)(
                function () {
                  return (function (t) {
                    return e(t.dispatch, l)
                  })(v)
                },
                [v]
              ),
              h = (0, t.useMemo)(
                function () {
                  if (!f) return R
                  var e = k(v, m ? null : p.subscription),
                    t = e.notifyNestedSubs.bind(e)
                  return [e, t]
                },
                [v, m, p]
              ),
              b = h[0],
              y = h[1],
              _ = (0, t.useMemo)(
                function () {
                  return m ? p : a({}, p, { subscription: b })
                },
                [m, p, b]
              ),
              x = (0, t.useReducer)(L, N, j),
              S = x[0][0],
              E = x[1]
            if (S && S.error) throw S.error
            var I = (0, t.useRef)(),
              P = (0, t.useRef)(c),
              A = (0, t.useRef)(),
              T = (0, t.useRef)(!1),
              z = d(
                function () {
                  return A.current && c === P.current
                    ? A.current
                    : g(v.getState(), c)
                },
                [v, S, c]
              )
            M(B, [P, I, T, c, z, A, y]),
              M(F, [f, v, b, g, P, I, T, A, y, E], [v, b, g])
            var G = (0, t.useMemo)(
              function () {
                return t.createElement(n, a({}, z, { ref: u }))
              },
              [u, n, z]
            )
            return (0, t.useMemo)(
              function () {
                return f ? t.createElement(s.Provider, { value: _ }, G) : G
              },
              [s, G, _]
            )
          }
          var v = c ? t.memo(p) : p
          if (
            ((v.WrappedComponent = n), (v.displayName = p.displayName = o), g)
          ) {
            var h = t.forwardRef(function (e, n) {
              return t.createElement(v, a({}, e, { reactReduxForwardedRef: n }))
            })
            return (h.displayName = o), (h.WrappedComponent = n), A()(h, n)
          }
          return A()(v, n)
        }
      }
      function G(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e === 1 / t
          : e !== e && t !== t
      }
      function U(e, t) {
        if (G(e, t)) return !0
        if (
          'object' !== typeof e ||
          null === e ||
          'object' !== typeof t ||
          null === t
        )
          return !1
        var n = Object.keys(e),
          r = Object.keys(t)
        if (n.length !== r.length) return !1
        for (var o = 0; o < n.length; o++)
          if (
            !Object.prototype.hasOwnProperty.call(t, n[o]) ||
            !G(e[n[o]], t[n[o]])
          )
            return !1
        return !0
      }
      function H(e) {
        return function (t, n) {
          var r = e(t, n)
          function o() {
            return r
          }
          return (o.dependsOnOwnProps = !1), o
        }
      }
      function W(e) {
        return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
          ? Boolean(e.dependsOnOwnProps)
          : 1 !== e.length
      }
      function V(e, t) {
        return function (t, n) {
          n.displayName
          var r = function (e, t) {
            return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e)
          }
          return (
            (r.dependsOnOwnProps = !0),
            (r.mapToProps = function (t, n) {
              ;(r.mapToProps = e), (r.dependsOnOwnProps = W(e))
              var o = r(t, n)
              return (
                'function' === typeof o &&
                  ((r.mapToProps = o),
                  (r.dependsOnOwnProps = W(o)),
                  (o = r(t, n))),
                o
              )
            }),
            r
          )
        }
      }
      var $ = [
        function (e) {
          return 'function' === typeof e ? V(e) : void 0
        },
        function (e) {
          return e
            ? void 0
            : H(function (e) {
                return { dispatch: e }
              })
        },
        function (e) {
          return e && 'object' === typeof e
            ? H(function (t) {
                return (function (e, t) {
                  var n = {},
                    r = function (r) {
                      var o = e[r]
                      'function' === typeof o &&
                        (n[r] = function () {
                          return t(o.apply(void 0, arguments))
                        })
                    }
                  for (var o in e) r(o)
                  return n
                })(e, t)
              })
            : void 0
        },
      ]
      var q = [
        function (e) {
          return 'function' === typeof e ? V(e) : void 0
        },
        function (e) {
          return e
            ? void 0
            : H(function () {
                return {}
              })
        },
      ]
      function Q(e, t, n) {
        return a({}, n, e, t)
      }
      var X = [
          function (e) {
            return 'function' === typeof e
              ? (function (e) {
                  return function (t, n) {
                    n.displayName
                    var r,
                      o = n.pure,
                      a = n.areMergedPropsEqual,
                      i = !1
                    return function (t, n, l) {
                      var u = e(t, n, l)
                      return (
                        i ? (o && a(u, r)) || (r = u) : ((i = !0), (r = u)), r
                      )
                    }
                  }
                })(e)
              : void 0
          },
          function (e) {
            return e
              ? void 0
              : function () {
                  return Q
                }
          },
        ],
        Y = ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']
      function K(e, t, n, r) {
        return function (o, a) {
          return n(e(o, a), t(r, a), a)
        }
      }
      function J(e, t, n, r, o) {
        var a,
          i,
          l,
          u,
          c,
          s = o.areStatesEqual,
          d = o.areOwnPropsEqual,
          f = o.areStatePropsEqual,
          p = !1
        function m(o, p) {
          var m = !d(p, i),
            v = !s(o, a)
          return (
            (a = o),
            (i = p),
            m && v
              ? ((l = e(a, i)),
                t.dependsOnOwnProps && (u = t(r, i)),
                (c = n(l, u, i)))
              : m
              ? (e.dependsOnOwnProps && (l = e(a, i)),
                t.dependsOnOwnProps && (u = t(r, i)),
                (c = n(l, u, i)))
              : v
              ? (function () {
                  var t = e(a, i),
                    r = !f(t, l)
                  return (l = t), r && (c = n(l, u, i)), c
                })()
              : c
          )
        }
        return function (o, s) {
          return p
            ? m(o, s)
            : ((l = e((a = o), (i = s))),
              (u = t(r, i)),
              (c = n(l, u, i)),
              (p = !0),
              c)
        }
      }
      function Z(e, t) {
        var n = t.initMapStateToProps,
          r = t.initMapDispatchToProps,
          o = t.initMergeProps,
          a = C(t, Y),
          i = n(e, a),
          l = r(e, a),
          u = o(e, a)
        return (a.pure ? J : K)(i, l, u, e, a)
      }
      var ee = [
        'pure',
        'areStatesEqual',
        'areOwnPropsEqual',
        'areStatePropsEqual',
        'areMergedPropsEqual',
      ]
      function te(e, t, n) {
        for (var r = t.length - 1; r >= 0; r--) {
          var o = t[r](e)
          if (o) return o
        }
        return function (t, r) {
          throw new Error(
            'Invalid value of type ' +
              typeof e +
              ' for ' +
              n +
              ' argument when connecting component ' +
              r.wrappedComponentName +
              '.'
          )
        }
      }
      function ne(e, t) {
        return e === t
      }
      function re(e) {
        var t = void 0 === e ? {} : e,
          n = t.connectHOC,
          r = void 0 === n ? z : n,
          o = t.mapStateToPropsFactories,
          i = void 0 === o ? q : o,
          l = t.mapDispatchToPropsFactories,
          u = void 0 === l ? $ : l,
          c = t.mergePropsFactories,
          s = void 0 === c ? X : c,
          d = t.selectorFactory,
          f = void 0 === d ? Z : d
        return function (e, t, n, o) {
          void 0 === o && (o = {})
          var l = o,
            c = l.pure,
            d = void 0 === c || c,
            p = l.areStatesEqual,
            m = void 0 === p ? ne : p,
            v = l.areOwnPropsEqual,
            g = void 0 === v ? U : v,
            h = l.areStatePropsEqual,
            b = void 0 === h ? U : h,
            y = l.areMergedPropsEqual,
            _ = void 0 === y ? U : y,
            w = C(l, ee),
            x = te(e, i, 'mapStateToProps'),
            S = te(t, u, 'mapDispatchToProps'),
            k = te(n, s, 'mergeProps')
          return r(
            f,
            a(
              {
                methodName: 'connect',
                getDisplayName: function (e) {
                  return 'Connect(' + e + ')'
                },
                shouldHandleStateChanges: Boolean(e),
                initMapStateToProps: x,
                initMapDispatchToProps: S,
                initMergeProps: k,
                pure: d,
                areStatesEqual: m,
                areOwnPropsEqual: g,
                areStatePropsEqual: b,
                areMergedPropsEqual: _,
              },
              w
            )
          )
        }
      }
      var oe = re()
      var ae,
        ie = n(164)
      function le(e, n) {
        var r = (0, t.useState)(function () {
            return { inputs: n, result: e() }
          })[0],
          o = (0, t.useRef)(!0),
          a = (0, t.useRef)(r),
          i =
            o.current ||
            Boolean(
              n &&
                a.current.inputs &&
                (function (e, t) {
                  if (e.length !== t.length) return !1
                  for (var n = 0; n < e.length; n++)
                    if (e[n] !== t[n]) return !1
                  return !0
                })(n, a.current.inputs)
            ),
          l = i ? a.current : { inputs: n, result: e() }
        return (
          (0, t.useEffect)(
            function () {
              ;(o.current = !1), (a.current = l)
            },
            [l]
          ),
          l.result
        )
      }
      ;(ae = ie.unstable_batchedUpdates), (w = ae)
      var ue = le,
        ce = function (e, t) {
          return le(function () {
            return e
          }, t)
        },
        se = 'Invariant failed'
      var de = function (e) {
          var t = e.top,
            n = e.right,
            r = e.bottom,
            o = e.left
          return {
            top: t,
            right: n,
            bottom: r,
            left: o,
            width: n - o,
            height: r - t,
            x: o,
            y: t,
            center: { x: (n + o) / 2, y: (r + t) / 2 },
          }
        },
        fe = function (e, t) {
          return {
            top: e.top - t.top,
            left: e.left - t.left,
            bottom: e.bottom + t.bottom,
            right: e.right + t.right,
          }
        },
        pe = function (e, t) {
          return {
            top: e.top + t.top,
            left: e.left + t.left,
            bottom: e.bottom - t.bottom,
            right: e.right - t.right,
          }
        },
        me = { top: 0, right: 0, bottom: 0, left: 0 },
        ve = function (e) {
          var t = e.borderBox,
            n = e.margin,
            r = void 0 === n ? me : n,
            o = e.border,
            a = void 0 === o ? me : o,
            i = e.padding,
            l = void 0 === i ? me : i,
            u = de(fe(t, r)),
            c = de(pe(t, a)),
            s = de(pe(c, l))
          return {
            marginBox: u,
            borderBox: de(t),
            paddingBox: c,
            contentBox: s,
            margin: r,
            border: a,
            padding: l,
          }
        },
        ge = function (e) {
          var t = e.slice(0, -2)
          if ('px' !== e.slice(-2)) return 0
          var n = Number(t)
          return (
            isNaN(n) &&
              (function (e, t) {
                if (!e) throw new Error(se)
              })(!1),
            n
          )
        },
        he = function (e, t) {
          var n,
            r,
            o = e.borderBox,
            a = e.border,
            i = e.margin,
            l = e.padding,
            u =
              ((r = t),
              {
                top: (n = o).top + r.y,
                left: n.left + r.x,
                bottom: n.bottom + r.y,
                right: n.right + r.x,
              })
          return ve({
            borderBox: u,
            border: a,
            margin: i,
            padding: l,
          })
        },
        be = function (e, t) {
          return (
            void 0 === t &&
              (t = {
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
            he(e, t)
          )
        },
        ye = function (e, t) {
          var n = {
              top: ge(t.marginTop),
              right: ge(t.marginRight),
              bottom: ge(t.marginBottom),
              left: ge(t.marginLeft),
            },
            r = {
              top: ge(t.paddingTop),
              right: ge(t.paddingRight),
              bottom: ge(t.paddingBottom),
              left: ge(t.paddingLeft),
            },
            o = {
              top: ge(t.borderTopWidth),
              right: ge(t.borderRightWidth),
              bottom: ge(t.borderBottomWidth),
              left: ge(t.borderLeftWidth),
            }
          return ve({
            borderBox: e,
            margin: n,
            padding: r,
            border: o,
          })
        },
        _e = function (e) {
          var t = e.getBoundingClientRect(),
            n = window.getComputedStyle(e)
          return ye(t, n)
        },
        we =
          Number.isNaN ||
          function (e) {
            return 'number' === typeof e && e !== e
          }
      function xe(e, t) {
        if (e.length !== t.length) return !1
        for (var n = 0; n < e.length; n++)
          if (((r = e[n]), (o = t[n]), !(r === o || (we(r) && we(o)))))
            return !1
        var r, o
        return !0
      }
      var Se = function (e, t) {
          var n
          void 0 === t && (t = xe)
          var r,
            o = [],
            a = !1
          return function () {
            for (var i = [], l = 0; l < arguments.length; l++)
              i[l] = arguments[l]
            return (
              (a && n === this && t(i, o)) ||
                ((r = e.apply(this, i)), (a = !0), (n = this), (o = i)),
              r
            )
          }
        },
        ke = function (e) {
          var t = [],
            n = null,
            r = function () {
              for (
                var r = arguments.length, o = new Array(r), a = 0;
                a < r;
                a++
              )
                o[a] = arguments[a]
              ;(t = o),
                n ||
                  (n = requestAnimationFrame(function () {
                    ;(n = null), e.apply(void 0, t)
                  }))
            }
          return (
            (r.cancel = function () {
              n && (cancelAnimationFrame(n), (n = null))
            }),
            r
          )
        }
      function Ee(e, t) {}
      Ee.bind(null, 'warn'), Ee.bind(null, 'error')
      function Ie() {}
      function Ce(e, t, n) {
        var r = t.map(function (t) {
          var r = (function (e, t) {
            return a({}, e, {}, t)
          })(n, t.options)
          return (
            e.addEventListener(t.eventName, t.fn, r),
            function () {
              e.removeEventListener(t.eventName, t.fn, r)
            }
          )
        })
        return function () {
          r.forEach(function (e) {
            e()
          })
        }
      }
      var Pe = 'Invariant failed'
      function Ae(e) {
        this.message = e
      }
      function De(e, t) {
        if (!e) throw new Ae(Pe)
      }
      Ae.prototype.toString = function () {
        return this.message
      }
      var Te = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), o = 0;
              o < n;
              o++
            )
              r[o] = arguments[o]
            return (
              ((t = e.call.apply(e, [this].concat(r)) || this).callbacks =
                null),
              (t.unbind = Ie),
              (t.onWindowError = function (e) {
                var n = t.getCallbacks()
                n.isDragging() && n.tryAbort(),
                  e.error instanceof Ae && e.preventDefault()
              }),
              (t.getCallbacks = function () {
                if (!t.callbacks)
                  throw new Error(
                    'Unable to find AppCallbacks in <ErrorBoundary/>'
                  )
                return t.callbacks
              }),
              (t.setCallbacks = function (e) {
                t.callbacks = e
              }),
              t
            )
          }
          o(t, e)
          var n = t.prototype
          return (
            (n.componentDidMount = function () {
              this.unbind = Ce(window, [
                { eventName: 'error', fn: this.onWindowError },
              ])
            }),
            (n.componentDidCatch = function (e) {
              if (!(e instanceof Ae)) throw e
              this.setState({})
            }),
            (n.componentWillUnmount = function () {
              this.unbind()
            }),
            (n.render = function () {
              return this.props.children(this.setCallbacks)
            }),
            t
          )
        })(t.Component),
        Oe = function (e) {
          return e + 1
        },
        Ne = function (e, t) {
          var n = e.droppableId === t.droppableId,
            r = Oe(e.index),
            o = Oe(t.index)
          return n
            ? '\n      You have moved the item from position ' +
                r +
                '\n      to position ' +
                o +
                '\n    '
            : '\n    You have moved the item from position ' +
                r +
                '\n    in list ' +
                e.droppableId +
                '\n    to list ' +
                t.droppableId +
                '\n    in position ' +
                o +
                '\n  '
        },
        Re = function (e, t, n) {
          return t.droppableId === n.droppableId
            ? '\n      The item ' +
                e +
                '\n      has been combined with ' +
                n.draggableId
            : '\n      The item ' +
                e +
                '\n      in list ' +
                t.droppableId +
                '\n      has been combined with ' +
                n.draggableId +
                '\n      in list ' +
                n.droppableId +
                '\n    '
        },
        Le = function (e) {
          return (
            '\n  The item has returned to its starting position\n  of ' +
            Oe(e.index) +
            '\n'
          )
        },
        Me =
          '\n  Press space bar to start a drag.\n  When dragging you can use the arrow keys to move the item around and escape to cancel.\n  Some screen readers may require you to be in focus mode or to use your pass through key\n',
        Be = function (e) {
          return (
            '\n  You have lifted an item in position ' +
            Oe(e.source.index) +
            '\n'
          )
        },
        Fe = function (e) {
          var t = e.destination
          if (t) return Ne(e.source, t)
          var n = e.combine
          return n
            ? Re(e.draggableId, e.source, n)
            : 'You are over an area that cannot be dropped on'
        },
        je = function (e) {
          if ('CANCEL' === e.reason)
            return (
              '\n      Movement cancelled.\n      ' + Le(e.source) + '\n    '
            )
          var t = e.destination,
            n = e.combine
          return t
            ? '\n      You have dropped the item.\n      ' +
                Ne(e.source, t) +
                '\n    '
            : n
            ? '\n      You have dropped the item.\n      ' +
              Re(e.draggableId, e.source, n) +
              '\n    '
            : '\n    The item has been dropped while not over a drop area.\n    ' +
              Le(e.source) +
              '\n  '
        },
        ze = { x: 0, y: 0 },
        Ge = function (e, t) {
          return { x: e.x + t.x, y: e.y + t.y }
        },
        Ue = function (e, t) {
          return { x: e.x - t.x, y: e.y - t.y }
        },
        He = function (e, t) {
          return e.x === t.x && e.y === t.y
        },
        We = function (e) {
          return { x: 0 !== e.x ? -e.x : 0, y: 0 !== e.y ? -e.y : 0 }
        },
        Ve = function (e, t, n) {
          var r
          return (
            void 0 === n && (n = 0),
            ((r = {})[e] = t),
            (r['x' === e ? 'y' : 'x'] = n),
            r
          )
        },
        $e = function (e, t) {
          return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
        },
        qe = function (e, t) {
          return Math.min.apply(
            Math,
            t.map(function (t) {
              return $e(e, t)
            })
          )
        },
        Qe = function (e) {
          return function (t) {
            return { x: e(t.x), y: e(t.y) }
          }
        },
        Xe = function (e, t) {
          return {
            top: e.top + t.y,
            left: e.left + t.x,
            bottom: e.bottom + t.y,
            right: e.right + t.x,
          }
        },
        Ye = function (e) {
          return [
            { x: e.left, y: e.top },
            { x: e.right, y: e.top },
            { x: e.left, y: e.bottom },
            { x: e.right, y: e.bottom },
          ]
        },
        Ke = function (e, t) {
          return t && t.shouldClipSubject
            ? (function (e, t) {
                var n = de({
                  top: Math.max(t.top, e.top),
                  right: Math.min(t.right, e.right),
                  bottom: Math.min(t.bottom, e.bottom),
                  left: Math.max(t.left, e.left),
                })
                return n.width <= 0 || n.height <= 0 ? null : n
              })(t.pageMarginBox, e)
            : de(e)
        },
        Je = function (e) {
          var t = e.page,
            n = e.withPlaceholder,
            r = e.axis,
            o = e.frame,
            i = (function (e, t) {
              return t ? Xe(e, t.scroll.diff.displacement) : e
            })(t.marginBox, o),
            l = (function (e, t, n) {
              var r
              return n && n.increasedBy
                ? a(
                    {},
                    e,
                    (((r = {})[t.end] = e[t.end] + n.increasedBy[t.line]), r)
                  )
                : e
            })(i, r, n)
          return { page: t, withPlaceholder: n, active: Ke(l, o) }
        },
        Ze = function (e, t) {
          e.frame || De(!1)
          var n = e.frame,
            r = Ue(t, n.scroll.initial),
            o = We(r),
            i = a({}, n, {
              scroll: {
                initial: n.scroll.initial,
                current: t,
                diff: { value: r, displacement: o },
                max: n.scroll.max,
              },
            })
          return a({}, e, {
            frame: i,
            subject: Je({
              page: e.subject.page,
              withPlaceholder: e.subject.withPlaceholder,
              axis: e.axis,
              frame: i,
            }),
          })
        }
      function et(e) {
        return Object.values
          ? Object.values(e)
          : Object.keys(e).map(function (t) {
              return e[t]
            })
      }
      function tt(e, t) {
        if (e.findIndex) return e.findIndex(t)
        for (var n = 0; n < e.length; n++) if (t(e[n])) return n
        return -1
      }
      function nt(e, t) {
        if (e.find) return e.find(t)
        var n = tt(e, t)
        return -1 !== n ? e[n] : void 0
      }
      function rt(e) {
        return Array.prototype.slice.call(e)
      }
      var ot = Se(function (e) {
          return e.reduce(function (e, t) {
            return (e[t.descriptor.id] = t), e
          }, {})
        }),
        at = Se(function (e) {
          return e.reduce(function (e, t) {
            return (e[t.descriptor.id] = t), e
          }, {})
        }),
        it = Se(function (e) {
          return et(e)
        }),
        lt = Se(function (e) {
          return et(e)
        }),
        ut = Se(function (e, t) {
          var n = lt(t)
            .filter(function (t) {
              return e === t.descriptor.droppableId
            })
            .sort(function (e, t) {
              return e.descriptor.index - t.descriptor.index
            })
          return n
        })
      function ct(e) {
        return e.at && 'REORDER' === e.at.type ? e.at.destination : null
      }
      function st(e) {
        return e.at && 'COMBINE' === e.at.type ? e.at.combine : null
      }
      var dt = Se(function (e, t) {
          return t.filter(function (t) {
            return t.descriptor.id !== e.descriptor.id
          })
        }),
        ft = function (e, t) {
          return e.descriptor.droppableId === t.descriptor.id
        },
        pt = { point: ze, value: 0 },
        mt = { invisible: {}, visible: {}, all: [] },
        vt = { displaced: mt, displacedBy: pt, at: null },
        gt = function (e, t) {
          return function (n) {
            return e <= n && n <= t
          }
        },
        ht = function (e) {
          var t = gt(e.top, e.bottom),
            n = gt(e.left, e.right)
          return function (r) {
            if (t(r.top) && t(r.bottom) && n(r.left) && n(r.right)) return !0
            var o = t(r.top) || t(r.bottom),
              a = n(r.left) || n(r.right)
            if (o && a) return !0
            var i = r.top < e.top && r.bottom > e.bottom,
              l = r.left < e.left && r.right > e.right
            return !(!i || !l) || (i && a) || (l && o)
          }
        },
        bt = function (e) {
          var t = gt(e.top, e.bottom),
            n = gt(e.left, e.right)
          return function (e) {
            return t(e.top) && t(e.bottom) && n(e.left) && n(e.right)
          }
        },
        yt = {
          direction: 'vertical',
          line: 'y',
          crossAxisLine: 'x',
          start: 'top',
          end: 'bottom',
          size: 'height',
          crossAxisStart: 'left',
          crossAxisEnd: 'right',
          crossAxisSize: 'width',
        },
        _t = {
          direction: 'horizontal',
          line: 'x',
          crossAxisLine: 'y',
          start: 'left',
          end: 'right',
          size: 'width',
          crossAxisStart: 'top',
          crossAxisEnd: 'bottom',
          crossAxisSize: 'height',
        },
        wt = function (e) {
          var t = e.target,
            n = e.destination,
            r = e.viewport,
            o = e.withDroppableDisplacement,
            a = e.isVisibleThroughFrameFn,
            i = o
              ? (function (e, t) {
                  var n = t.frame ? t.frame.scroll.diff.displacement : ze
                  return Xe(e, n)
                })(t, n)
              : t
          return (
            (function (e, t, n) {
              return !!t.subject.active && n(t.subject.active)(e)
            })(i, n, a) &&
            (function (e, t, n) {
              return n(t)(e)
            })(i, r, a)
          )
        },
        xt = function (e) {
          return wt(a({}, e, { isVisibleThroughFrameFn: ht }))
        },
        St = function (e) {
          return wt(a({}, e, { isVisibleThroughFrameFn: bt }))
        }
      function kt(e) {
        var t = e.afterDragging,
          n = e.destination,
          r = e.displacedBy,
          o = e.viewport,
          a = e.forceShouldAnimate,
          i = e.last
        return t.reduce(
          function (e, t) {
            var l = (function (e, t) {
                var n = e.page.marginBox,
                  r = {
                    top: t.point.y,
                    right: 0,
                    bottom: 0,
                    left: t.point.x,
                  }
                return de(fe(n, r))
              })(t, r),
              u = t.descriptor.id
            if (
              (e.all.push(u),
              !xt({
                target: l,
                destination: n,
                viewport: o,
                withDroppableDisplacement: !0,
              }))
            )
              return (e.invisible[t.descriptor.id] = !0), e
            var c = (function (e, t, n) {
                if ('boolean' === typeof n) return n
                if (!t) return !0
                var r = t.invisible,
                  o = t.visible
                if (r[e]) return !1
                var a = o[e]
                return !a || a.shouldAnimate
              })(u, i, a),
              s = { draggableId: u, shouldAnimate: c }
            return (e.visible[u] = s), e
          },
          { all: [], visible: {}, invisible: {} }
        )
      }
      function Et(e) {
        var t = e.insideDestination,
          n = e.inHomeList,
          r = e.displacedBy,
          o = e.destination,
          a = (function (e, t) {
            if (!e.length) return 0
            var n = e[e.length - 1].descriptor.index
            return t.inHomeList ? n : n + 1
          })(t, { inHomeList: n })
        return {
          displaced: mt,
          displacedBy: r,
          at: {
            type: 'REORDER',
            destination: { droppableId: o.descriptor.id, index: a },
          },
        }
      }
      function It(e) {
        var t = e.draggable,
          n = e.insideDestination,
          r = e.destination,
          o = e.viewport,
          a = e.displacedBy,
          i = e.last,
          l = e.index,
          u = e.forceShouldAnimate,
          c = ft(t, r)
        if (null == l)
          return Et({
            insideDestination: n,
            inHomeList: c,
            displacedBy: a,
            destination: r,
          })
        var s = nt(n, function (e) {
          return e.descriptor.index === l
        })
        if (!s)
          return Et({
            insideDestination: n,
            inHomeList: c,
            displacedBy: a,
            destination: r,
          })
        var d = dt(t, n),
          f = n.indexOf(s)
        return {
          displaced: kt({
            afterDragging: d.slice(f),
            destination: r,
            displacedBy: a,
            last: i,
            viewport: o.frame,
            forceShouldAnimate: u,
          }),
          displacedBy: a,
          at: {
            type: 'REORDER',
            destination: { droppableId: r.descriptor.id, index: l },
          },
        }
      }
      function Ct(e, t) {
        return Boolean(t.effected[e])
      }
      var Pt = function (e) {
          var t = e.isMovingForward,
            n = e.isInHomeList,
            r = e.draggable,
            o = e.draggables,
            a = e.destination,
            i = e.insideDestination,
            l = e.previousImpact,
            u = e.viewport,
            c = e.afterCritical,
            s = l.at
          if ((s || De(!1), 'REORDER' === s.type)) {
            var d = (function (e) {
              var t = e.isMovingForward,
                n = e.isInHomeList,
                r = e.insideDestination,
                o = e.location
              if (!r.length) return null
              var a = o.index,
                i = t ? a + 1 : a - 1,
                l = r[0].descriptor.index,
                u = r[r.length - 1].descriptor.index
              return i < l || i > (n ? u : u + 1) ? null : i
            })({
              isMovingForward: t,
              isInHomeList: n,
              location: s.destination,
              insideDestination: i,
            })
            return null == d
              ? null
              : It({
                  draggable: r,
                  insideDestination: i,
                  destination: a,
                  viewport: u,
                  last: l.displaced,
                  displacedBy: l.displacedBy,
                  index: d,
                })
          }
          var f = (function (e) {
            var t = e.isMovingForward,
              n = e.destination,
              r = e.draggables,
              o = e.combine,
              a = e.afterCritical
            if (!n.isCombineEnabled) return null
            var i = o.draggableId,
              l = r[i].descriptor.index
            return Ct(i, a) ? (t ? l : l - 1) : t ? l + 1 : l
          })({
            isMovingForward: t,
            destination: a,
            displaced: l.displaced,
            draggables: o,
            combine: s.combine,
            afterCritical: c,
          })
          return null == f
            ? null
            : It({
                draggable: r,
                insideDestination: i,
                destination: a,
                viewport: u,
                last: l.displaced,
                displacedBy: l.displacedBy,
                index: f,
              })
        },
        At = function (e) {
          var t = e.afterCritical,
            n = e.impact,
            r = e.draggables,
            o = st(n)
          o || De(!1)
          var a = o.draggableId,
            i = r[a].page.borderBox.center,
            l = (function (e) {
              var t = e.displaced,
                n = e.afterCritical,
                r = e.combineWith,
                o = e.displacedBy,
                a = Boolean(t.visible[r] || t.invisible[r])
              return Ct(r, n) ? (a ? ze : We(o.point)) : a ? o.point : ze
            })({
              displaced: n.displaced,
              afterCritical: t,
              combineWith: a,
              displacedBy: n.displacedBy,
            })
          return Ge(i, l)
        },
        Dt = function (e, t) {
          return t.margin[e.start] + t.borderBox[e.size] / 2
        },
        Tt = function (e, t, n) {
          return (
            t[e.crossAxisStart] +
            n.margin[e.crossAxisStart] +
            n.borderBox[e.crossAxisSize] / 2
          )
        },
        Ot = function (e) {
          var t = e.axis,
            n = e.moveRelativeTo,
            r = e.isMoving
          return Ve(
            t.line,
            n.marginBox[t.end] + Dt(t, r),
            Tt(t, n.marginBox, r)
          )
        },
        Nt = function (e) {
          var t = e.axis,
            n = e.moveRelativeTo,
            r = e.isMoving
          return Ve(
            t.line,
            n.marginBox[t.start] -
              (function (e, t) {
                return t.margin[e.end] + t.borderBox[e.size] / 2
              })(t, r),
            Tt(t, n.marginBox, r)
          )
        },
        Rt = function (e) {
          var t = e.impact,
            n = e.draggable,
            r = e.draggables,
            o = e.droppable,
            a = e.afterCritical,
            i = ut(o.descriptor.id, r),
            l = n.page,
            u = o.axis
          if (!i.length)
            return (function (e) {
              var t = e.axis,
                n = e.moveInto,
                r = e.isMoving
              return Ve(
                t.line,
                n.contentBox[t.start] + Dt(t, r),
                Tt(t, n.contentBox, r)
              )
            })({ axis: u, moveInto: o.page, isMoving: l })
          var c = t.displaced,
            s = t.displacedBy,
            d = c.all[0]
          if (d) {
            var f = r[d]
            if (Ct(d, a))
              return Nt({
                axis: u,
                moveRelativeTo: f.page,
                isMoving: l,
              })
            var p = he(f.page, s.point)
            return Nt({ axis: u, moveRelativeTo: p, isMoving: l })
          }
          var m = i[i.length - 1]
          if (m.descriptor.id === n.descriptor.id) return l.borderBox.center
          if (Ct(m.descriptor.id, a)) {
            var v = he(m.page, We(a.displacedBy.point))
            return Ot({ axis: u, moveRelativeTo: v, isMoving: l })
          }
          return Ot({ axis: u, moveRelativeTo: m.page, isMoving: l })
        },
        Lt = function (e, t) {
          var n = e.frame
          return n ? Ge(t, n.scroll.diff.displacement) : t
        },
        Mt = function (e) {
          var t = (function (e) {
              var t = e.impact,
                n = e.draggable,
                r = e.droppable,
                o = e.draggables,
                a = e.afterCritical,
                i = n.page.borderBox.center,
                l = t.at
              return r && l
                ? 'REORDER' === l.type
                  ? Rt({
                      impact: t,
                      draggable: n,
                      draggables: o,
                      droppable: r,
                      afterCritical: a,
                    })
                  : At({
                      impact: t,
                      draggables: o,
                      afterCritical: a,
                    })
                : i
            })(e),
            n = e.droppable
          return n ? Lt(n, t) : t
        },
        Bt = function (e, t) {
          var n = Ue(t, e.scroll.initial),
            r = We(n)
          return {
            frame: de({
              top: t.y,
              bottom: t.y + e.frame.height,
              left: t.x,
              right: t.x + e.frame.width,
            }),
            scroll: {
              initial: e.scroll.initial,
              max: e.scroll.max,
              current: t,
              diff: { value: n, displacement: r },
            },
          }
        }
      function Ft(e, t) {
        return e.map(function (e) {
          return t[e]
        })
      }
      var jt = function (e) {
          var t = e.pageBorderBoxCenter,
            n = e.draggable,
            r = (function (e, t) {
              return Ge(e.scroll.diff.displacement, t)
            })(e.viewport, t),
            o = Ue(r, n.page.borderBox.center)
          return Ge(n.client.borderBox.center, o)
        },
        zt = function (e) {
          var t = e.draggable,
            n = e.destination,
            r = e.newPageBorderBoxCenter,
            o = e.viewport,
            i = e.withDroppableDisplacement,
            l = e.onlyOnMainAxis,
            u = void 0 !== l && l,
            c = Ue(r, t.page.borderBox.center),
            s = {
              target: Xe(t.page.borderBox, c),
              destination: n,
              withDroppableDisplacement: i,
              viewport: o,
            }
          return u
            ? (function (e) {
                return wt(
                  a({}, e, {
                    isVisibleThroughFrameFn:
                      ((t = e.destination.axis),
                      function (e) {
                        var n = gt(e.top, e.bottom),
                          r = gt(e.left, e.right)
                        return function (e) {
                          return t === yt
                            ? n(e.top) && n(e.bottom)
                            : r(e.left) && r(e.right)
                        }
                      }),
                  })
                )
                var t
              })(s)
            : St(s)
        },
        Gt = function (e) {
          var t = e.isMovingForward,
            n = e.draggable,
            r = e.destination,
            o = e.draggables,
            i = e.previousImpact,
            l = e.viewport,
            u = e.previousPageBorderBoxCenter,
            c = e.previousClientSelection,
            s = e.afterCritical
          if (!r.isEnabled) return null
          var d = ut(r.descriptor.id, o),
            f = ft(n, r),
            p =
              (function (e) {
                var t = e.isMovingForward,
                  n = e.draggable,
                  r = e.destination,
                  o = e.insideDestination,
                  i = e.previousImpact
                if (!r.isCombineEnabled) return null
                if (!ct(i)) return null
                function l(e) {
                  var t = {
                    type: 'COMBINE',
                    combine: {
                      draggableId: e,
                      droppableId: r.descriptor.id,
                    },
                  }
                  return a({}, i, { at: t })
                }
                var u = i.displaced.all,
                  c = u.length ? u[0] : null
                if (t) return c ? l(c) : null
                var s = dt(n, o)
                if (!c)
                  return s.length ? l(s[s.length - 1].descriptor.id) : null
                var d = tt(s, function (e) {
                  return e.descriptor.id === c
                })
                ;-1 === d && De(!1)
                var f = d - 1
                return f < 0 ? null : l(s[f].descriptor.id)
              })({
                isMovingForward: t,
                draggable: n,
                destination: r,
                insideDestination: d,
                previousImpact: i,
              }) ||
              Pt({
                isMovingForward: t,
                isInHomeList: f,
                draggable: n,
                draggables: o,
                destination: r,
                insideDestination: d,
                previousImpact: i,
                viewport: l,
                afterCritical: s,
              })
          if (!p) return null
          var m = Mt({
            impact: p,
            draggable: n,
            droppable: r,
            draggables: o,
            afterCritical: s,
          })
          if (
            zt({
              draggable: n,
              destination: r,
              newPageBorderBoxCenter: m,
              viewport: l.frame,
              withDroppableDisplacement: !1,
              onlyOnMainAxis: !0,
            })
          )
            return {
              clientSelection: jt({
                pageBorderBoxCenter: m,
                draggable: n,
                viewport: l,
              }),
              impact: p,
              scrollJumpRequest: null,
            }
          var v = Ue(m, u),
            g = (function (e) {
              var t = e.impact,
                n = e.viewport,
                r = e.destination,
                o = e.draggables,
                i = e.maxScrollChange,
                l = Bt(n, Ge(n.scroll.current, i)),
                u = r.frame ? Ze(r, Ge(r.frame.scroll.current, i)) : r,
                c = t.displaced,
                s = kt({
                  afterDragging: Ft(c.all, o),
                  destination: r,
                  displacedBy: t.displacedBy,
                  viewport: l.frame,
                  last: c,
                  forceShouldAnimate: !1,
                }),
                d = kt({
                  afterDragging: Ft(c.all, o),
                  destination: u,
                  displacedBy: t.displacedBy,
                  viewport: n.frame,
                  last: c,
                  forceShouldAnimate: !1,
                }),
                f = {},
                p = {},
                m = [c, s, d]
              return (
                c.all.forEach(function (e) {
                  var t = (function (e, t) {
                    for (var n = 0; n < t.length; n++) {
                      var r = t[n].visible[e]
                      if (r) return r
                    }
                    return null
                  })(e, m)
                  t ? (p[e] = t) : (f[e] = !0)
                }),
                a({}, t, {
                  displaced: {
                    all: c.all,
                    invisible: f,
                    visible: p,
                  },
                })
              )
            })({
              impact: p,
              viewport: l,
              destination: r,
              draggables: o,
              maxScrollChange: v,
            })
          return {
            clientSelection: c,
            impact: g,
            scrollJumpRequest: v,
          }
        },
        Ut = function (e) {
          var t = e.subject.active
          return t || De(!1), t
        },
        Ht = function (e, t) {
          var n = e.page.borderBox.center
          return Ct(e.descriptor.id, t) ? Ue(n, t.displacedBy.point) : n
        },
        Wt = function (e, t) {
          var n = e.page.borderBox
          return Ct(e.descriptor.id, t) ? Xe(n, We(t.displacedBy.point)) : n
        },
        Vt = Se(function (e, t) {
          var n = t[e.line]
          return { value: n, point: Ve(e.line, n) }
        }),
        $t = function (e, t) {
          return a({}, e, { scroll: a({}, e.scroll, { max: t }) })
        },
        qt = function (e, t, n) {
          var r = e.frame
          ft(t, e) && De(!1), e.subject.withPlaceholder && De(!1)
          var o = Vt(e.axis, t.displaceBy).point,
            i = (function (e, t, n) {
              var r = e.axis
              if ('virtual' === e.descriptor.mode) return Ve(r.line, t[r.line])
              var o = e.subject.page.contentBox[r.size],
                a =
                  ut(e.descriptor.id, n).reduce(function (e, t) {
                    return e + t.client.marginBox[r.size]
                  }, 0) +
                  t[r.line] -
                  o
              return a <= 0 ? null : Ve(r.line, a)
            })(e, o, n),
            l = {
              placeholderSize: o,
              increasedBy: i,
              oldFrameMaxScroll: e.frame ? e.frame.scroll.max : null,
            }
          if (!r)
            return a({}, e, {
              subject: Je({
                page: e.subject.page,
                withPlaceholder: l,
                axis: e.axis,
                frame: e.frame,
              }),
            })
          var u = i ? Ge(r.scroll.max, i) : r.scroll.max,
            c = $t(r, u)
          return a({}, e, {
            subject: Je({
              page: e.subject.page,
              withPlaceholder: l,
              axis: e.axis,
              frame: c,
            }),
            frame: c,
          })
        },
        Qt = function (e) {
          var t = e.isMovingForward,
            n = e.previousPageBorderBoxCenter,
            r = e.draggable,
            o = e.isOver,
            a = e.draggables,
            i = e.droppables,
            l = e.viewport,
            u = e.afterCritical,
            c = (function (e) {
              var t = e.isMovingForward,
                n = e.pageBorderBoxCenter,
                r = e.source,
                o = e.droppables,
                a = e.viewport,
                i = r.subject.active
              if (!i) return null
              var l = r.axis,
                u = gt(i[l.start], i[l.end]),
                c = it(o)
                  .filter(function (e) {
                    return e !== r
                  })
                  .filter(function (e) {
                    return e.isEnabled
                  })
                  .filter(function (e) {
                    return Boolean(e.subject.active)
                  })
                  .filter(function (e) {
                    return ht(a.frame)(Ut(e))
                  })
                  .filter(function (e) {
                    var n = Ut(e)
                    return t
                      ? i[l.crossAxisEnd] < n[l.crossAxisEnd]
                      : n[l.crossAxisStart] < i[l.crossAxisStart]
                  })
                  .filter(function (e) {
                    var t = Ut(e),
                      n = gt(t[l.start], t[l.end])
                    return (
                      u(t[l.start]) ||
                      u(t[l.end]) ||
                      n(i[l.start]) ||
                      n(i[l.end])
                    )
                  })
                  .sort(function (e, n) {
                    var r = Ut(e)[l.crossAxisStart],
                      o = Ut(n)[l.crossAxisStart]
                    return t ? r - o : o - r
                  })
                  .filter(function (e, t, n) {
                    return (
                      Ut(e)[l.crossAxisStart] === Ut(n[0])[l.crossAxisStart]
                    )
                  })
              if (!c.length) return null
              if (1 === c.length) return c[0]
              var s = c.filter(function (e) {
                return gt(Ut(e)[l.start], Ut(e)[l.end])(n[l.line])
              })
              return 1 === s.length
                ? s[0]
                : s.length > 1
                ? s.sort(function (e, t) {
                    return Ut(e)[l.start] - Ut(t)[l.start]
                  })[0]
                : c.sort(function (e, t) {
                    var r = qe(n, Ye(Ut(e))),
                      o = qe(n, Ye(Ut(t)))
                    return r !== o ? r - o : Ut(e)[l.start] - Ut(t)[l.start]
                  })[0]
            })({
              isMovingForward: t,
              pageBorderBoxCenter: n,
              source: o,
              droppables: i,
              viewport: l,
            })
          if (!c) return null
          var s = ut(c.descriptor.id, a),
            d = (function (e) {
              var t = e.pageBorderBoxCenter,
                n = e.viewport,
                r = e.destination,
                o = e.insideDestination,
                a = e.afterCritical,
                i = o
                  .filter(function (e) {
                    return St({
                      target: Wt(e, a),
                      destination: r,
                      viewport: n.frame,
                      withDroppableDisplacement: !0,
                    })
                  })
                  .sort(function (e, n) {
                    var o = $e(t, Lt(r, Ht(e, a))),
                      i = $e(t, Lt(r, Ht(n, a)))
                    return o < i
                      ? -1
                      : i < o
                      ? 1
                      : e.descriptor.index - n.descriptor.index
                  })
              return i[0] || null
            })({
              pageBorderBoxCenter: n,
              viewport: l,
              destination: c,
              insideDestination: s,
              afterCritical: u,
            }),
            f = (function (e) {
              var t = e.previousPageBorderBoxCenter,
                n = e.moveRelativeTo,
                r = e.insideDestination,
                o = e.draggable,
                a = e.draggables,
                i = e.destination,
                l = e.viewport,
                u = e.afterCritical
              if (!n) {
                if (r.length) return null
                var c = {
                    displaced: mt,
                    displacedBy: pt,
                    at: {
                      type: 'REORDER',
                      destination: {
                        droppableId: i.descriptor.id,
                        index: 0,
                      },
                    },
                  },
                  s = Mt({
                    impact: c,
                    draggable: o,
                    droppable: i,
                    draggables: a,
                    afterCritical: u,
                  }),
                  d = ft(o, i) ? i : qt(i, o, a)
                return zt({
                  draggable: o,
                  destination: d,
                  newPageBorderBoxCenter: s,
                  viewport: l.frame,
                  withDroppableDisplacement: !1,
                  onlyOnMainAxis: !0,
                })
                  ? c
                  : null
              }
              var f = Boolean(
                  t[i.axis.line] <= n.page.borderBox.center[i.axis.line]
                ),
                p = (function () {
                  var e = n.descriptor.index
                  return n.descriptor.id === o.descriptor.id || f ? e : e + 1
                })(),
                m = Vt(i.axis, o.displaceBy)
              return It({
                draggable: o,
                insideDestination: r,
                destination: i,
                viewport: l,
                displacedBy: m,
                last: mt,
                index: p,
              })
            })({
              previousPageBorderBoxCenter: n,
              destination: c,
              draggable: r,
              draggables: a,
              moveRelativeTo: d,
              insideDestination: s,
              viewport: l,
              afterCritical: u,
            })
          if (!f) return null
          var p = Mt({
            impact: f,
            draggable: r,
            droppable: c,
            draggables: a,
            afterCritical: u,
          })
          return {
            clientSelection: jt({
              pageBorderBoxCenter: p,
              draggable: r,
              viewport: l,
            }),
            impact: f,
            scrollJumpRequest: null,
          }
        },
        Xt = function (e) {
          var t = e.at
          return t
            ? 'REORDER' === t.type
              ? t.destination.droppableId
              : t.combine.droppableId
            : null
        },
        Yt = function (e) {
          var t = e.state,
            n = e.type,
            r = (function (e, t) {
              var n = Xt(e)
              return n ? t[n] : null
            })(t.impact, t.dimensions.droppables),
            o = Boolean(r),
            a = t.dimensions.droppables[t.critical.droppable.id],
            i = r || a,
            l = i.axis.direction,
            u =
              ('vertical' === l && ('MOVE_UP' === n || 'MOVE_DOWN' === n)) ||
              ('horizontal' === l && ('MOVE_LEFT' === n || 'MOVE_RIGHT' === n))
          if (u && !o) return null
          var c = 'MOVE_DOWN' === n || 'MOVE_RIGHT' === n,
            s = t.dimensions.draggables[t.critical.draggable.id],
            d = t.current.page.borderBoxCenter,
            f = t.dimensions,
            p = f.draggables,
            m = f.droppables
          return u
            ? Gt({
                isMovingForward: c,
                previousPageBorderBoxCenter: d,
                draggable: s,
                destination: i,
                draggables: p,
                viewport: t.viewport,
                previousClientSelection: t.current.client.selection,
                previousImpact: t.impact,
                afterCritical: t.afterCritical,
              })
            : Qt({
                isMovingForward: c,
                previousPageBorderBoxCenter: d,
                draggable: s,
                isOver: i,
                draggables: p,
                droppables: m,
                viewport: t.viewport,
                afterCritical: t.afterCritical,
              })
        }
      function Kt(e) {
        return 'DRAGGING' === e.phase || 'COLLECTING' === e.phase
      }
      function Jt(e) {
        var t = gt(e.top, e.bottom),
          n = gt(e.left, e.right)
        return function (e) {
          return t(e.y) && n(e.x)
        }
      }
      function Zt(e) {
        var t = e.pageBorderBox,
          n = e.draggable,
          r = e.droppables,
          o = it(r).filter(function (e) {
            if (!e.isEnabled) return !1
            var n,
              r,
              o = e.subject.active
            if (!o) return !1
            if (
              ((r = o),
              !(
                (n = t).left < r.right &&
                n.right > r.left &&
                n.top < r.bottom &&
                n.bottom > r.top
              ))
            )
              return !1
            if (Jt(o)(t.center)) return !0
            var a = e.axis,
              i = o.center[a.crossAxisLine],
              l = t[a.crossAxisStart],
              u = t[a.crossAxisEnd],
              c = gt(o[a.crossAxisStart], o[a.crossAxisEnd]),
              s = c(l),
              d = c(u)
            return (!s && !d) || (s ? l < i : u > i)
          })
        return o.length
          ? 1 === o.length
            ? o[0].descriptor.id
            : (function (e) {
                var t = e.pageBorderBox,
                  n = e.draggable,
                  r = e.candidates,
                  o = n.page.borderBox.center,
                  a = r
                    .map(function (e) {
                      var n = e.axis,
                        r = Ve(
                          e.axis.line,
                          t.center[n.line],
                          e.page.borderBox.center[n.crossAxisLine]
                        )
                      return {
                        id: e.descriptor.id,
                        distance: $e(o, r),
                      }
                    })
                    .sort(function (e, t) {
                      return t.distance - e.distance
                    })
                return a[0] ? a[0].id : null
              })({ pageBorderBox: t, draggable: n, candidates: o })
          : null
      }
      var en = function (e, t) {
        return de(Xe(e, t))
      }
      function tn(e) {
        var t = e.displaced,
          n = e.id
        return Boolean(t.visible[n] || t.invisible[n])
      }
      var nn = function (e) {
          var t = e.pageOffset,
            n = e.draggable,
            r = e.draggables,
            o = e.droppables,
            a = e.previousImpact,
            i = e.viewport,
            l = e.afterCritical,
            u = en(n.page.borderBox, t),
            c = Zt({
              pageBorderBox: u,
              draggable: n,
              droppables: o,
            })
          if (!c) return vt
          var s = o[c],
            d = ut(s.descriptor.id, r),
            f = (function (e, t) {
              var n = e.frame
              return n ? en(t, n.scroll.diff.value) : t
            })(s, u)
          return (
            (function (e) {
              var t = e.draggable,
                n = e.pageBorderBoxWithDroppableScroll,
                r = e.previousImpact,
                o = e.destination,
                a = e.insideDestination,
                i = e.afterCritical
              if (!o.isCombineEnabled) return null
              var l = o.axis,
                u = Vt(o.axis, t.displaceBy),
                c = u.value,
                s = n[l.start],
                d = n[l.end],
                f = nt(dt(t, a), function (e) {
                  var t = e.descriptor.id,
                    n = e.page.borderBox,
                    o = n[l.size] / 4,
                    a = Ct(t, i),
                    u = tn({
                      displaced: r.displaced,
                      id: t,
                    })
                  return a
                    ? u
                      ? d > n[l.start] + o && d < n[l.end] - o
                      : s > n[l.start] - c + o && s < n[l.end] - c - o
                    : u
                    ? d > n[l.start] + c + o && d < n[l.end] + c - o
                    : s > n[l.start] + o && s < n[l.end] - o
                })
              return f
                ? {
                    displacedBy: u,
                    displaced: r.displaced,
                    at: {
                      type: 'COMBINE',
                      combine: {
                        draggableId: f.descriptor.id,
                        droppableId: o.descriptor.id,
                      },
                    },
                  }
                : null
            })({
              pageBorderBoxWithDroppableScroll: f,
              draggable: n,
              previousImpact: a,
              destination: s,
              insideDestination: d,
              afterCritical: l,
            }) ||
            (function (e) {
              var t = e.pageBorderBoxWithDroppableScroll,
                n = e.draggable,
                r = e.destination,
                o = e.insideDestination,
                a = e.last,
                i = e.viewport,
                l = e.afterCritical,
                u = r.axis,
                c = Vt(r.axis, n.displaceBy),
                s = c.value,
                d = t[u.start],
                f = t[u.end],
                p = (function (e) {
                  var t = e.draggable,
                    n = e.closest,
                    r = e.inHomeList
                  return n
                    ? r && n.descriptor.index > t.descriptor.index
                      ? n.descriptor.index - 1
                      : n.descriptor.index
                    : null
                })({
                  draggable: n,
                  closest: nt(dt(n, o), function (e) {
                    var t = e.descriptor.id,
                      n = e.page.borderBox.center[u.line],
                      r = Ct(t, l),
                      o = tn({ displaced: a, id: t })
                    return r ? (o ? f <= n : d < n - s) : o ? f <= n + s : d < n
                  }),
                  inHomeList: ft(n, r),
                })
              return It({
                draggable: n,
                insideDestination: o,
                destination: r,
                viewport: i,
                last: a,
                displacedBy: c,
                index: p,
              })
            })({
              pageBorderBoxWithDroppableScroll: f,
              draggable: n,
              destination: s,
              insideDestination: d,
              last: a.displaced,
              viewport: i,
              afterCritical: l,
            })
          )
        },
        rn = function (e, t) {
          var n
          return a({}, e, (((n = {})[t.descriptor.id] = t), n))
        },
        on = function (e) {
          var t = e.previousImpact,
            n = e.impact,
            r = e.droppables,
            o = Xt(t),
            i = Xt(n)
          if (!o) return r
          if (o === i) return r
          var l = r[o]
          if (!l.subject.withPlaceholder) return r
          var u = (function (e) {
            var t = e.subject.withPlaceholder
            t || De(!1)
            var n = e.frame
            if (!n)
              return a({}, e, {
                subject: Je({
                  page: e.subject.page,
                  axis: e.axis,
                  frame: null,
                  withPlaceholder: null,
                }),
              })
            var r = t.oldFrameMaxScroll
            r || De(!1)
            var o = $t(n, r)
            return a({}, e, {
              subject: Je({
                page: e.subject.page,
                axis: e.axis,
                frame: o,
                withPlaceholder: null,
              }),
              frame: o,
            })
          })(l)
          return rn(r, u)
        },
        an = function (e) {
          var t = e.state,
            n = e.clientSelection,
            r = e.dimensions,
            o = e.viewport,
            i = e.impact,
            l = e.scrollJumpRequest,
            u = o || t.viewport,
            c = r || t.dimensions,
            s = n || t.current.client.selection,
            d = Ue(s, t.initial.client.selection),
            f = {
              offset: d,
              selection: s,
              borderBoxCenter: Ge(t.initial.client.borderBoxCenter, d),
            },
            p = {
              selection: Ge(f.selection, u.scroll.current),
              borderBoxCenter: Ge(f.borderBoxCenter, u.scroll.current),
              offset: Ge(f.offset, u.scroll.diff.value),
            },
            m = { client: f, page: p }
          if ('COLLECTING' === t.phase)
            return a({ phase: 'COLLECTING' }, t, {
              dimensions: c,
              viewport: u,
              current: m,
            })
          var v = c.draggables[t.critical.draggable.id],
            g =
              i ||
              nn({
                pageOffset: p.offset,
                draggable: v,
                draggables: c.draggables,
                droppables: c.droppables,
                previousImpact: t.impact,
                viewport: u,
                afterCritical: t.afterCritical,
              }),
            h = (function (e) {
              var t = e.draggable,
                n = e.draggables,
                r = e.droppables,
                o = e.previousImpact,
                a = e.impact,
                i = on({
                  previousImpact: o,
                  impact: a,
                  droppables: r,
                }),
                l = Xt(a)
              if (!l) return i
              var u = r[l]
              if (ft(t, u)) return i
              if (u.subject.withPlaceholder) return i
              var c = qt(u, t, n)
              return rn(i, c)
            })({
              draggable: v,
              impact: g,
              previousImpact: t.impact,
              draggables: c.draggables,
              droppables: c.droppables,
            })
          return a({}, t, {
            current: m,
            dimensions: { draggables: c.draggables, droppables: h },
            impact: g,
            viewport: u,
            scrollJumpRequest: l || null,
            forceShouldAnimate: !l && null,
          })
        }
      var ln = function (e) {
          var t = e.impact,
            n = e.viewport,
            r = e.draggables,
            o = e.destination,
            i = e.forceShouldAnimate,
            l = t.displaced,
            u = (function (e, t) {
              return e.map(function (e) {
                return t[e]
              })
            })(l.all, r)
          return a({}, t, {
            displaced: kt({
              afterDragging: u,
              destination: o,
              displacedBy: t.displacedBy,
              viewport: n.frame,
              forceShouldAnimate: i,
              last: l,
            }),
          })
        },
        un = function (e) {
          var t = e.impact,
            n = e.draggable,
            r = e.droppable,
            o = e.draggables,
            a = e.viewport,
            i = e.afterCritical,
            l = Mt({
              impact: t,
              draggable: n,
              draggables: o,
              droppable: r,
              afterCritical: i,
            })
          return jt({
            pageBorderBoxCenter: l,
            draggable: n,
            viewport: a,
          })
        },
        cn = function (e) {
          var t = e.state,
            n = e.dimensions,
            r = e.viewport
          'SNAP' !== t.movementMode && De(!1)
          var o = t.impact,
            a = r || t.viewport,
            i = n || t.dimensions,
            l = i.draggables,
            u = i.droppables,
            c = l[t.critical.draggable.id],
            s = Xt(o)
          s || De(!1)
          var d = u[s],
            f = ln({
              impact: o,
              viewport: a,
              destination: d,
              draggables: l,
            }),
            p = un({
              impact: f,
              draggable: c,
              droppable: d,
              draggables: l,
              viewport: a,
              afterCritical: t.afterCritical,
            })
          return an({
            impact: f,
            clientSelection: p,
            state: t,
            dimensions: i,
            viewport: a,
          })
        },
        sn = function (e) {
          var t = e.draggable,
            n = e.home,
            r = e.draggables,
            o = e.viewport,
            a = Vt(n.axis, t.displaceBy),
            i = ut(n.descriptor.id, r),
            l = i.indexOf(t)
          ;-1 === l && De(!1)
          var u,
            c = i.slice(l + 1),
            s = c.reduce(function (e, t) {
              return (e[t.descriptor.id] = !0), e
            }, {}),
            d = {
              inVirtualList: 'virtual' === n.descriptor.mode,
              displacedBy: a,
              effected: s,
            }
          return {
            impact: {
              displaced: kt({
                afterDragging: c,
                destination: n,
                displacedBy: a,
                last: null,
                viewport: o.frame,
                forceShouldAnimate: !1,
              }),
              displacedBy: a,
              at: {
                type: 'REORDER',
                destination:
                  ((u = t.descriptor),
                  {
                    index: u.index,
                    droppableId: u.droppableId,
                  }),
              },
            },
            afterCritical: d,
          }
        },
        dn = function (e) {
          0
        },
        fn = function (e) {
          0
        },
        pn = function (e) {
          var t = e.additions,
            n = e.updatedDroppables,
            r = e.viewport,
            o = r.scroll.diff.value
          return t.map(function (e) {
            var t = e.descriptor.droppableId,
              i = (function (e) {
                var t = e.frame
                return t || De(!1), t
              })(n[t]),
              l = i.scroll.diff.value,
              u = (function (e) {
                var t = e.draggable,
                  n = e.offset,
                  r = e.initialWindowScroll,
                  o = he(t.client, n),
                  i = be(o, r)
                return a({}, t, {
                  placeholder: a({}, t.placeholder, {
                    client: o,
                  }),
                  client: o,
                  page: i,
                })
              })({
                draggable: e,
                offset: Ge(o, l),
                initialWindowScroll: r.scroll.initial,
              })
            return u
          })
        },
        mn = function (e) {
          return 'SNAP' === e.movementMode
        },
        vn = function (e, t, n) {
          var r = (function (e, t) {
            return {
              draggables: e.draggables,
              droppables: rn(e.droppables, t),
            }
          })(e.dimensions, t)
          return !mn(e) || n
            ? an({ state: e, dimensions: r })
            : cn({ state: e, dimensions: r })
        }
      function gn(e) {
        return e.isDragging && 'SNAP' === e.movementMode
          ? a({ phase: 'DRAGGING' }, e, { scrollJumpRequest: null })
          : e
      }
      var hn = { phase: 'IDLE', completed: null, shouldFlush: !1 },
        bn = function (e, t) {
          if ((void 0 === e && (e = hn), 'FLUSH' === t.type))
            return a({}, hn, { shouldFlush: !0 })
          if ('INITIAL_PUBLISH' === t.type) {
            'IDLE' !== e.phase && De(!1)
            var n = t.payload,
              r = n.critical,
              o = n.clientSelection,
              i = n.viewport,
              l = n.dimensions,
              u = n.movementMode,
              c = l.draggables[r.draggable.id],
              s = l.droppables[r.droppable.id],
              d = {
                selection: o,
                borderBoxCenter: c.client.borderBox.center,
                offset: ze,
              },
              f = {
                client: d,
                page: {
                  selection: Ge(d.selection, i.scroll.initial),
                  borderBoxCenter: Ge(d.selection, i.scroll.initial),
                  offset: Ge(d.selection, i.scroll.diff.value),
                },
              },
              p = it(l.droppables).every(function (e) {
                return !e.isFixedOnPage
              }),
              m = sn({
                draggable: c,
                home: s,
                draggables: l.draggables,
                viewport: i,
              }),
              v = m.impact
            return {
              phase: 'DRAGGING',
              isDragging: !0,
              critical: r,
              movementMode: u,
              dimensions: l,
              initial: f,
              current: f,
              isWindowScrollAllowed: p,
              impact: v,
              afterCritical: m.afterCritical,
              onLiftImpact: v,
              viewport: i,
              scrollJumpRequest: null,
              forceShouldAnimate: null,
            }
          }
          if ('COLLECTION_STARTING' === t.type)
            return 'COLLECTING' === e.phase || 'DROP_PENDING' === e.phase
              ? e
              : ('DRAGGING' !== e.phase && De(!1),
                a({ phase: 'COLLECTING' }, e, {
                  phase: 'COLLECTING',
                }))
          if ('PUBLISH_WHILE_DRAGGING' === t.type)
            return (
              'COLLECTING' !== e.phase && 'DROP_PENDING' !== e.phase && De(!1),
              (function (e) {
                var t = e.state,
                  n = e.published
                dn()
                var r = n.modified.map(function (e) {
                    var n = t.dimensions.droppables[e.droppableId]
                    return Ze(n, e.scroll)
                  }),
                  o = a({}, t.dimensions.droppables, {}, ot(r)),
                  i = at(
                    pn({
                      additions: n.additions,
                      updatedDroppables: o,
                      viewport: t.viewport,
                    })
                  ),
                  l = a({}, t.dimensions.draggables, {}, i)
                n.removals.forEach(function (e) {
                  delete l[e]
                })
                var u = { droppables: o, draggables: l },
                  c = Xt(t.impact),
                  s = c ? u.droppables[c] : null,
                  d = u.draggables[t.critical.draggable.id],
                  f = u.droppables[t.critical.droppable.id],
                  p = sn({
                    draggable: d,
                    home: f,
                    draggables: l,
                    viewport: t.viewport,
                  }),
                  m = p.impact,
                  v = p.afterCritical,
                  g = s && s.isCombineEnabled ? t.impact : m,
                  h = nn({
                    pageOffset: t.current.page.offset,
                    draggable: u.draggables[t.critical.draggable.id],
                    draggables: u.draggables,
                    droppables: u.droppables,
                    previousImpact: g,
                    viewport: t.viewport,
                    afterCritical: v,
                  })
                fn()
                var b = a({ phase: 'DRAGGING' }, t, {
                  phase: 'DRAGGING',
                  impact: h,
                  onLiftImpact: m,
                  dimensions: u,
                  afterCritical: v,
                  forceShouldAnimate: !1,
                })
                return 'COLLECTING' === t.phase
                  ? b
                  : a({ phase: 'DROP_PENDING' }, b, {
                      phase: 'DROP_PENDING',
                      reason: t.reason,
                      isWaiting: !1,
                    })
              })({ state: e, published: t.payload })
            )
          if ('MOVE' === t.type) {
            if ('DROP_PENDING' === e.phase) return e
            Kt(e) || De(!1)
            var g = t.payload.client
            return He(g, e.current.client.selection)
              ? e
              : an({
                  state: e,
                  clientSelection: g,
                  impact: mn(e) ? e.impact : null,
                })
          }
          if ('UPDATE_DROPPABLE_SCROLL' === t.type) {
            if ('DROP_PENDING' === e.phase) return gn(e)
            if ('COLLECTING' === e.phase) return gn(e)
            Kt(e) || De(!1)
            var h = t.payload,
              b = h.id,
              y = h.newScroll,
              _ = e.dimensions.droppables[b]
            if (!_) return e
            var w = Ze(_, y)
            return vn(e, w, !1)
          }
          if ('UPDATE_DROPPABLE_IS_ENABLED' === t.type) {
            if ('DROP_PENDING' === e.phase) return e
            Kt(e) || De(!1)
            var x = t.payload,
              S = x.id,
              k = x.isEnabled,
              E = e.dimensions.droppables[S]
            E || De(!1), E.isEnabled === k && De(!1)
            var I = a({}, E, { isEnabled: k })
            return vn(e, I, !0)
          }
          if ('UPDATE_DROPPABLE_IS_COMBINE_ENABLED' === t.type) {
            if ('DROP_PENDING' === e.phase) return e
            Kt(e) || De(!1)
            var C = t.payload,
              P = C.id,
              A = C.isCombineEnabled,
              D = e.dimensions.droppables[P]
            D || De(!1), D.isCombineEnabled === A && De(!1)
            var T = a({}, D, { isCombineEnabled: A })
            return vn(e, T, !0)
          }
          if ('MOVE_BY_WINDOW_SCROLL' === t.type) {
            if ('DROP_PENDING' === e.phase || 'DROP_ANIMATING' === e.phase)
              return e
            Kt(e) || De(!1), e.isWindowScrollAllowed || De(!1)
            var O = t.payload.newScroll
            if (He(e.viewport.scroll.current, O)) return gn(e)
            var N = Bt(e.viewport, O)
            return mn(e)
              ? cn({ state: e, viewport: N })
              : an({ state: e, viewport: N })
          }
          if ('UPDATE_VIEWPORT_MAX_SCROLL' === t.type) {
            if (!Kt(e)) return e
            var R = t.payload.maxScroll
            if (He(R, e.viewport.scroll.max)) return e
            var L = a({}, e.viewport, {
              scroll: a({}, e.viewport.scroll, { max: R }),
            })
            return a({ phase: 'DRAGGING' }, e, { viewport: L })
          }
          if (
            'MOVE_UP' === t.type ||
            'MOVE_DOWN' === t.type ||
            'MOVE_LEFT' === t.type ||
            'MOVE_RIGHT' === t.type
          ) {
            if ('COLLECTING' === e.phase || 'DROP_PENDING' === e.phase) return e
            'DRAGGING' !== e.phase && De(!1)
            var M = Yt({ state: e, type: t.type })
            return M
              ? an({
                  state: e,
                  impact: M.impact,
                  clientSelection: M.clientSelection,
                  scrollJumpRequest: M.scrollJumpRequest,
                })
              : e
          }
          if ('DROP_PENDING' === t.type) {
            var B = t.payload.reason
            return (
              'COLLECTING' !== e.phase && De(!1),
              a({ phase: 'DROP_PENDING' }, e, {
                phase: 'DROP_PENDING',
                isWaiting: !0,
                reason: B,
              })
            )
          }
          if ('DROP_ANIMATE' === t.type) {
            var F = t.payload,
              j = F.completed,
              z = F.dropDuration,
              G = F.newHomeClientOffset
            return (
              'DRAGGING' !== e.phase && 'DROP_PENDING' !== e.phase && De(!1),
              {
                phase: 'DROP_ANIMATING',
                completed: j,
                dropDuration: z,
                newHomeClientOffset: G,
                dimensions: e.dimensions,
              }
            )
          }
          return 'DROP_COMPLETE' === t.type
            ? {
                phase: 'IDLE',
                completed: t.payload.completed,
                shouldFlush: !1,
              }
            : e
        },
        yn = function (e) {
          return { type: 'PUBLISH_WHILE_DRAGGING', payload: e }
        },
        _n = function () {
          return { type: 'COLLECTION_STARTING', payload: null }
        },
        wn = function (e) {
          return { type: 'UPDATE_DROPPABLE_SCROLL', payload: e }
        },
        xn = function (e) {
          return { type: 'UPDATE_DROPPABLE_IS_ENABLED', payload: e }
        },
        Sn = function (e) {
          return {
            type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
            payload: e,
          }
        },
        kn = function (e) {
          return { type: 'MOVE', payload: e }
        },
        En = function () {
          return { type: 'MOVE_UP', payload: null }
        },
        In = function () {
          return { type: 'MOVE_DOWN', payload: null }
        },
        Cn = function () {
          return { type: 'MOVE_RIGHT', payload: null }
        },
        Pn = function () {
          return { type: 'MOVE_LEFT', payload: null }
        },
        An = function (e) {
          return { type: 'DROP_COMPLETE', payload: e }
        },
        Dn = function (e) {
          return { type: 'DROP', payload: e }
        },
        Tn = function () {
          return { type: 'DROP_ANIMATION_FINISHED', payload: null }
        }
      var On = 'cubic-bezier(.2,1,.1,1)',
        Nn = { drop: 0, combining: 0.7 },
        Rn = { drop: 0.75 },
        Ln = 0.2 + 's ' + 'cubic-bezier(0.2, 0, 0, 1)',
        Mn = {
          fluid: 'opacity ' + Ln,
          snap: 'transform ' + Ln + ', opacity ' + Ln,
          drop: function (e) {
            var t = e + 's ' + On
            return 'transform ' + t + ', opacity ' + t
          },
          outOfTheWay: 'transform ' + Ln,
          placeholder: 'height ' + Ln + ', width ' + Ln + ', margin ' + Ln,
        },
        Bn = function (e) {
          return He(e, ze) ? null : 'translate(' + e.x + 'px, ' + e.y + 'px)'
        },
        Fn = Bn,
        jn = function (e, t) {
          var n = Bn(e)
          return n ? (t ? n + ' scale(' + Rn.drop + ')' : n) : null
        },
        zn = 0.33,
        Gn = 0.55,
        Un = Gn - zn,
        Hn = function (e) {
          var t = e.getState,
            n = e.dispatch
          return function (e) {
            return function (r) {
              if ('DROP' === r.type) {
                var o = t(),
                  i = r.payload.reason
                if ('COLLECTING' !== o.phase) {
                  if ('IDLE' !== o.phase) {
                    'DROP_PENDING' === o.phase && o.isWaiting && De(!1),
                      'DRAGGING' !== o.phase &&
                        'DROP_PENDING' !== o.phase &&
                        De(!1)
                    var l = o.critical,
                      u = o.dimensions,
                      c = u.draggables[o.critical.draggable.id],
                      s = (function (e) {
                        var t = e.draggables,
                          n = e.reason,
                          r = e.lastImpact,
                          o = e.home,
                          i = e.viewport,
                          l = e.onLiftImpact
                        return r.at && 'DROP' === n
                          ? 'REORDER' === r.at.type
                            ? {
                                impact: r,
                                didDropInsideDroppable: !0,
                              }
                            : {
                                impact: a({}, r, {
                                  displaced: mt,
                                }),
                                didDropInsideDroppable: !0,
                              }
                          : {
                              impact: ln({
                                draggables: t,
                                impact: l,
                                destination: o,
                                viewport: i,
                                forceShouldAnimate: !0,
                              }),
                              didDropInsideDroppable: !1,
                            }
                      })({
                        reason: i,
                        lastImpact: o.impact,
                        afterCritical: o.afterCritical,
                        onLiftImpact: o.onLiftImpact,
                        home: o.dimensions.droppables[o.critical.droppable.id],
                        viewport: o.viewport,
                        draggables: o.dimensions.draggables,
                      }),
                      d = s.impact,
                      f = s.didDropInsideDroppable,
                      p = f ? ct(d) : null,
                      m = f ? st(d) : null,
                      v = {
                        index: l.draggable.index,
                        droppableId: l.droppable.id,
                      },
                      g = {
                        draggableId: c.descriptor.id,
                        type: c.descriptor.type,
                        source: v,
                        reason: i,
                        mode: o.movementMode,
                        destination: p,
                        combine: m,
                      },
                      h = (function (e) {
                        var t = e.impact,
                          n = e.draggable,
                          r = e.dimensions,
                          o = e.viewport,
                          a = e.afterCritical,
                          i = r.draggables,
                          l = r.droppables,
                          u = Xt(t),
                          c = u ? l[u] : null,
                          s = l[n.descriptor.droppableId],
                          d = un({
                            impact: t,
                            draggable: n,
                            draggables: i,
                            afterCritical: a,
                            droppable: c || s,
                            viewport: o,
                          })
                        return Ue(d, n.client.borderBox.center)
                      })({
                        impact: d,
                        draggable: c,
                        dimensions: u,
                        viewport: o.viewport,
                        afterCritical: o.afterCritical,
                      }),
                      b = {
                        critical: o.critical,
                        afterCritical: o.afterCritical,
                        result: g,
                        impact: d,
                      }
                    if (!He(o.current.client.offset, h) || Boolean(g.combine)) {
                      var y = (function (e) {
                        var t = e.current,
                          n = e.destination,
                          r = e.reason,
                          o = $e(t, n)
                        if (o <= 0) return zn
                        if (o >= 1500) return Gn
                        var a = zn + Un * (o / 1500)
                        return Number(('CANCEL' === r ? 0.6 * a : a).toFixed(2))
                      })({
                        current: o.current.client.offset,
                        destination: h,
                        reason: i,
                      })
                      n(
                        (function (e) {
                          return {
                            type: 'DROP_ANIMATE',
                            payload: e,
                          }
                        })({
                          newHomeClientOffset: h,
                          dropDuration: y,
                          completed: b,
                        })
                      )
                    } else n(An({ completed: b }))
                  }
                } else
                  n(
                    (function (e) {
                      return {
                        type: 'DROP_PENDING',
                        payload: e,
                      }
                    })({ reason: i })
                  )
              } else e(r)
            }
          }
        },
        Wn = function () {
          return { x: window.pageXOffset, y: window.pageYOffset }
        }
      function Vn(e) {
        var t = e.onWindowScroll
        var n = ke(function () {
            t(Wn())
          }),
          r = (function (e) {
            return {
              eventName: 'scroll',
              options: { passive: !0, capture: !1 },
              fn: function (t) {
                ;(t.target !== window && t.target !== window.document) || e()
              },
            }
          })(n),
          o = Ie
        function a() {
          return o !== Ie
        }
        return {
          start: function () {
            a() && De(!1), (o = Ce(window, [r]))
          },
          stop: function () {
            a() || De(!1), n.cancel(), o(), (o = Ie)
          },
          isActive: a,
        }
      }
      var $n = function (e) {
          var t = Vn({
            onWindowScroll: function (t) {
              e.dispatch({
                type: 'MOVE_BY_WINDOW_SCROLL',
                payload: { newScroll: t },
              })
            },
          })
          return function (e) {
            return function (n) {
              t.isActive() || 'INITIAL_PUBLISH' !== n.type || t.start(),
                t.isActive() &&
                  (function (e) {
                    return (
                      'DROP_COMPLETE' === e.type ||
                      'DROP_ANIMATE' === e.type ||
                      'FLUSH' === e.type
                    )
                  })(n) &&
                  t.stop(),
                e(n)
            }
          }
        },
        qn = function () {
          var e = []
          return {
            add: function (t) {
              var n = setTimeout(function () {
                  return (function (t) {
                    var n = tt(e, function (e) {
                      return e.timerId === t
                    })
                    ;-1 === n && De(!1), e.splice(n, 1)[0].callback()
                  })(n)
                }),
                r = { timerId: n, callback: t }
              e.push(r)
            },
            flush: function () {
              if (e.length) {
                var t = [].concat(e)
                ;(e.length = 0),
                  t.forEach(function (e) {
                    clearTimeout(e.timerId), e.callback()
                  })
              }
            },
          }
        },
        Qn = function (e, t) {
          dn(), t(), fn()
        },
        Xn = function (e, t) {
          return {
            draggableId: e.draggable.id,
            type: e.droppable.type,
            source: {
              droppableId: e.droppable.id,
              index: e.draggable.index,
            },
            mode: t,
          }
        },
        Yn = function (e, t, n, r) {
          if (e) {
            var o = (function (e) {
              var t = !1,
                n = !1,
                r = setTimeout(function () {
                  n = !0
                }),
                o = function (o) {
                  t || n || ((t = !0), e(o), clearTimeout(r))
                }
              return (
                (o.wasCalled = function () {
                  return t
                }),
                o
              )
            })(n)
            e(t, { announce: o }), o.wasCalled() || n(r(t))
          } else n(r(t))
        },
        Kn = function (e, t) {
          var n = (function (e, t) {
            var n = qn(),
              r = null,
              o = function (n) {
                r || De(!1),
                  (r = null),
                  Qn(0, function () {
                    return Yn(e().onDragEnd, n, t, je)
                  })
              }
            return {
              beforeCapture: function (t, n) {
                r && De(!1),
                  Qn(0, function () {
                    var r = e().onBeforeCapture
                    r && r({ draggableId: t, mode: n })
                  })
              },
              beforeStart: function (t, n) {
                r && De(!1),
                  Qn(0, function () {
                    var r = e().onBeforeDragStart
                    r && r(Xn(t, n))
                  })
              },
              start: function (o, a) {
                r && De(!1)
                var i = Xn(o, a)
                ;(r = {
                  mode: a,
                  lastCritical: o,
                  lastLocation: i.source,
                  lastCombine: null,
                }),
                  n.add(function () {
                    Qn(0, function () {
                      return Yn(e().onDragStart, i, t, Be)
                    })
                  })
              },
              update: function (o, i) {
                var l = ct(i),
                  u = st(i)
                r || De(!1)
                var c = !(function (e, t) {
                  if (e === t) return !0
                  var n =
                      e.draggable.id === t.draggable.id &&
                      e.draggable.droppableId === t.draggable.droppableId &&
                      e.draggable.type === t.draggable.type &&
                      e.draggable.index === t.draggable.index,
                    r =
                      e.droppable.id === t.droppable.id &&
                      e.droppable.type === t.droppable.type
                  return n && r
                })(o, r.lastCritical)
                c && (r.lastCritical = o)
                var s,
                  d,
                  f =
                    ((d = l),
                    !(
                      (null == (s = r.lastLocation) && null == d) ||
                      (null != s &&
                        null != d &&
                        s.droppableId === d.droppableId &&
                        s.index === d.index)
                    ))
                f && (r.lastLocation = l)
                var p = !(function (e, t) {
                  return (
                    (null == e && null == t) ||
                    (null != e &&
                      null != t &&
                      e.draggableId === t.draggableId &&
                      e.droppableId === t.droppableId)
                  )
                })(r.lastCombine, u)
                if ((p && (r.lastCombine = u), c || f || p)) {
                  var m = a({}, Xn(o, r.mode), {
                    combine: u,
                    destination: l,
                  })
                  n.add(function () {
                    Qn(0, function () {
                      return Yn(e().onDragUpdate, m, t, Fe)
                    })
                  })
                }
              },
              flush: function () {
                r || De(!1), n.flush()
              },
              drop: o,
              abort: function () {
                if (r) {
                  var e = a({}, Xn(r.lastCritical, r.mode), {
                    combine: null,
                    destination: null,
                    reason: 'CANCEL',
                  })
                  o(e)
                }
              },
            }
          })(e, t)
          return function (e) {
            return function (t) {
              return function (r) {
                if ('BEFORE_INITIAL_CAPTURE' !== r.type) {
                  if ('INITIAL_PUBLISH' === r.type) {
                    var o = r.payload.critical
                    return (
                      n.beforeStart(o, r.payload.movementMode),
                      t(r),
                      void n.start(o, r.payload.movementMode)
                    )
                  }
                  if ('DROP_COMPLETE' === r.type) {
                    var a = r.payload.completed.result
                    return n.flush(), t(r), void n.drop(a)
                  }
                  if ((t(r), 'FLUSH' !== r.type)) {
                    var i = e.getState()
                    'DRAGGING' === i.phase && n.update(i.critical, i.impact)
                  } else n.abort()
                } else
                  n.beforeCapture(r.payload.draggableId, r.payload.movementMode)
              }
            }
          }
        },
        Jn = function (e) {
          return function (t) {
            return function (n) {
              if ('DROP_ANIMATION_FINISHED' === n.type) {
                var r = e.getState()
                'DROP_ANIMATING' !== r.phase && De(!1),
                  e.dispatch(An({ completed: r.completed }))
              } else t(n)
            }
          }
        },
        Zn = function (e) {
          var t = null,
            n = null
          return function (r) {
            return function (o) {
              if (
                (('FLUSH' !== o.type &&
                  'DROP_COMPLETE' !== o.type &&
                  'DROP_ANIMATION_FINISHED' !== o.type) ||
                  (n && (cancelAnimationFrame(n), (n = null)),
                  t && (t(), (t = null))),
                r(o),
                'DROP_ANIMATE' === o.type)
              ) {
                var a = {
                  eventName: 'scroll',
                  options: {
                    capture: !0,
                    passive: !1,
                    once: !0,
                  },
                  fn: function () {
                    'DROP_ANIMATING' === e.getState().phase &&
                      e.dispatch({
                        type: 'DROP_ANIMATION_FINISHED',
                        payload: null,
                      })
                  },
                }
                n = requestAnimationFrame(function () {
                  ;(n = null), (t = Ce(window, [a]))
                })
              }
            }
          }
        },
        er = function (e) {
          return function (t) {
            return function (n) {
              if ((t(n), 'PUBLISH_WHILE_DRAGGING' === n.type)) {
                var r = e.getState()
                'DROP_PENDING' === r.phase &&
                  (r.isWaiting || e.dispatch(Dn({ reason: r.reason })))
              }
            }
          }
        },
        tr = b,
        nr = function (e) {
          var t,
            n = e.dimensionMarshal,
            r = e.focusMarshal,
            o = e.styleMarshal,
            a = e.getResponders,
            i = e.announce,
            l = e.autoScroller
          return m(
            bn,
            tr(
              y(
                ((t = o),
                function () {
                  return function (e) {
                    return function (n) {
                      'INITIAL_PUBLISH' === n.type && t.dragging(),
                        'DROP_ANIMATE' === n.type &&
                          t.dropping(n.payload.completed.result.reason),
                        ('FLUSH' !== n.type && 'DROP_COMPLETE' !== n.type) ||
                          t.resting(),
                        e(n)
                    }
                  }
                }),
                (function (e) {
                  return function () {
                    return function (t) {
                      return function (n) {
                        ;('DROP_COMPLETE' !== n.type &&
                          'FLUSH' !== n.type &&
                          'DROP_ANIMATE' !== n.type) ||
                          e.stopPublishing(),
                          t(n)
                      }
                    }
                  }
                })(n),
                (function (e) {
                  return function (t) {
                    var n = t.getState,
                      r = t.dispatch
                    return function (t) {
                      return function (o) {
                        if ('LIFT' === o.type) {
                          var a = o.payload,
                            i = a.id,
                            l = a.clientSelection,
                            u = a.movementMode,
                            c = n()
                          'DROP_ANIMATING' === c.phase &&
                            r(
                              An({
                                completed: c.completed,
                              })
                            ),
                            'IDLE' !== n().phase && De(!1),
                            r({
                              type: 'FLUSH',
                              payload: null,
                            }),
                            r({
                              type: 'BEFORE_INITIAL_CAPTURE',
                              payload: {
                                draggableId: i,
                                movementMode: u,
                              },
                            })
                          var s = {
                              draggableId: i,
                              scrollOptions: {
                                shouldPublishImmediately: 'SNAP' === u,
                              },
                            },
                            d = e.startPublishing(s),
                            f = d.critical,
                            p = d.dimensions,
                            m = d.viewport
                          r({
                            type: 'INITIAL_PUBLISH',
                            payload: {
                              critical: f,
                              dimensions: p,
                              clientSelection: l,
                              movementMode: u,
                              viewport: m,
                            },
                          })
                        } else t(o)
                      }
                    }
                  }
                })(n),
                Hn,
                Jn,
                Zn,
                er,
                (function (e) {
                  return function (t) {
                    return function (n) {
                      return function (r) {
                        if (
                          (function (e) {
                            return (
                              'DROP_COMPLETE' === e.type ||
                              'DROP_ANIMATE' === e.type ||
                              'FLUSH' === e.type
                            )
                          })(r)
                        )
                          return e.stop(), void n(r)
                        if ('INITIAL_PUBLISH' === r.type) {
                          n(r)
                          var o = t.getState()
                          return (
                            'DRAGGING' !== o.phase && De(!1), void e.start(o)
                          )
                        }
                        n(r), e.scroll(t.getState())
                      }
                    }
                  }
                })(l),
                $n,
                (function (e) {
                  var t = !1
                  return function () {
                    return function (n) {
                      return function (r) {
                        if ('INITIAL_PUBLISH' === r.type)
                          return (
                            (t = !0),
                            e.tryRecordFocus(r.payload.critical.draggable.id),
                            n(r),
                            void e.tryRestoreFocusRecorded()
                          )
                        if ((n(r), t)) {
                          if ('FLUSH' === r.type)
                            return (t = !1), void e.tryRestoreFocusRecorded()
                          if ('DROP_COMPLETE' === r.type) {
                            t = !1
                            var o = r.payload.completed.result
                            o.combine &&
                              e.tryShiftRecord(
                                o.draggableId,
                                o.combine.draggableId
                              ),
                              e.tryRestoreFocusRecorded()
                          }
                        }
                      }
                    }
                  }
                })(r),
                Kn(a, i)
              )
            )
          )
        }
      var rr = function (e) {
          var t = e.scrollHeight,
            n = e.scrollWidth,
            r = e.height,
            o = e.width,
            a = Ue({ x: n, y: t }, { x: o, y: r })
          return { x: Math.max(0, a.x), y: Math.max(0, a.y) }
        },
        or = function () {
          var e = document.documentElement
          return e || De(!1), e
        },
        ar = function () {
          var e = or()
          return rr({
            scrollHeight: e.scrollHeight,
            scrollWidth: e.scrollWidth,
            width: e.clientWidth,
            height: e.clientHeight,
          })
        },
        ir = function (e) {
          var t = e.critical,
            n = e.scrollOptions,
            r = e.registry
          dn()
          var o = (function () {
              var e = Wn(),
                t = ar(),
                n = e.y,
                r = e.x,
                o = or(),
                a = o.clientWidth,
                i = o.clientHeight
              return {
                frame: de({
                  top: n,
                  left: r,
                  right: r + a,
                  bottom: n + i,
                }),
                scroll: {
                  initial: e,
                  current: e,
                  max: t,
                  diff: { value: ze, displacement: ze },
                },
              }
            })(),
            a = o.scroll.current,
            i = t.droppable,
            l = r.droppable.getAllByType(i.type).map(function (e) {
              return e.callbacks.getDimensionAndWatchScroll(a, n)
            }),
            u = r.draggable.getAllByType(t.draggable.type).map(function (e) {
              return e.getDimension(a)
            }),
            c = { draggables: at(u), droppables: ot(l) }
          return fn(), { dimensions: c, critical: t, viewport: o }
        }
      function lr(e, t, n) {
        return (
          n.descriptor.id !== t.id &&
          n.descriptor.type === t.type &&
          'virtual' ===
            e.droppable.getById(n.descriptor.droppableId).descriptor.mode
        )
      }
      var ur = function (e, t) {
          var n = null,
            r = (function (e) {
              var t = e.registry,
                n = e.callbacks,
                r = {
                  additions: {},
                  removals: {},
                  modified: {},
                },
                o = null,
                a = function () {
                  o ||
                    (n.collectionStarting(),
                    (o = requestAnimationFrame(function () {
                      ;(o = null), dn()
                      var e = r,
                        a = e.additions,
                        i = e.removals,
                        l = e.modified,
                        u = Object.keys(a)
                          .map(function (e) {
                            return t.draggable.getById(e).getDimension(ze)
                          })
                          .sort(function (e, t) {
                            return e.descriptor.index - t.descriptor.index
                          }),
                        c = Object.keys(l).map(function (e) {
                          return {
                            droppableId: e,
                            scroll: t.droppable
                              .getById(e)
                              .callbacks.getScrollWhileDragging(),
                          }
                        }),
                        s = {
                          additions: u,
                          removals: Object.keys(i),
                          modified: c,
                        }
                      ;(r = {
                        additions: {},
                        removals: {},
                        modified: {},
                      }),
                        fn(),
                        n.publish(s)
                    })))
                }
              return {
                add: function (e) {
                  var t = e.descriptor.id
                  ;(r.additions[t] = e),
                    (r.modified[e.descriptor.droppableId] = !0),
                    r.removals[t] && delete r.removals[t],
                    a()
                },
                remove: function (e) {
                  var t = e.descriptor
                  ;(r.removals[t.id] = !0),
                    (r.modified[t.droppableId] = !0),
                    r.additions[t.id] && delete r.additions[t.id],
                    a()
                },
                stop: function () {
                  o &&
                    (cancelAnimationFrame(o),
                    (o = null),
                    (r = {
                      additions: {},
                      removals: {},
                      modified: {},
                    }))
                },
              }
            })({
              callbacks: {
                publish: t.publishWhileDragging,
                collectionStarting: t.collectionStarting,
              },
              registry: e,
            }),
            o = function (t) {
              n || De(!1)
              var o = n.critical.draggable
              'ADDITION' === t.type && lr(e, o, t.value) && r.add(t.value),
                'REMOVAL' === t.type && lr(e, o, t.value) && r.remove(t.value)
            },
            a = {
              updateDroppableIsEnabled: function (r, o) {
                e.droppable.exists(r) || De(!1),
                  n &&
                    t.updateDroppableIsEnabled({
                      id: r,
                      isEnabled: o,
                    })
              },
              updateDroppableIsCombineEnabled: function (r, o) {
                n &&
                  (e.droppable.exists(r) || De(!1),
                  t.updateDroppableIsCombineEnabled({
                    id: r,
                    isCombineEnabled: o,
                  }))
              },
              scrollDroppable: function (t, r) {
                n && e.droppable.getById(t).callbacks.scroll(r)
              },
              updateDroppableScroll: function (r, o) {
                n &&
                  (e.droppable.exists(r) || De(!1),
                  t.updateDroppableScroll({
                    id: r,
                    newScroll: o,
                  }))
              },
              startPublishing: function (t) {
                n && De(!1)
                var r = e.draggable.getById(t.draggableId),
                  a = e.droppable.getById(r.descriptor.droppableId),
                  i = {
                    draggable: r.descriptor,
                    droppable: a.descriptor,
                  },
                  l = e.subscribe(o)
                return (
                  (n = { critical: i, unsubscribe: l }),
                  ir({
                    critical: i,
                    registry: e,
                    scrollOptions: t.scrollOptions,
                  })
                )
              },
              stopPublishing: function () {
                if (n) {
                  r.stop()
                  var t = n.critical.droppable
                  e.droppable.getAllByType(t.type).forEach(function (e) {
                    return e.callbacks.dragStopped()
                  }),
                    n.unsubscribe(),
                    (n = null)
                }
              },
            }
          return a
        },
        cr = function (e, t) {
          return (
            'IDLE' === e.phase ||
            ('DROP_ANIMATING' === e.phase &&
              e.completed.result.draggableId !== t &&
              'DROP' === e.completed.result.reason)
          )
        },
        sr = function (e) {
          window.scrollBy(e.x, e.y)
        },
        dr = Se(function (e) {
          return it(e).filter(function (e) {
            return !!e.isEnabled && !!e.frame
          })
        }),
        fr = function (e) {
          var t = e.center,
            n = e.destination,
            r = e.droppables
          if (n) {
            var o = r[n]
            return o.frame ? o : null
          }
          var a = (function (e, t) {
            var n = nt(dr(t), function (t) {
              return t.frame || De(!1), Jt(t.frame.pageMarginBox)(e)
            })
            return n
          })(t, r)
          return a
        },
        pr = 0.25,
        mr = 0.05,
        vr = 28,
        gr = function (e) {
          return Math.pow(e, 2)
        },
        hr = { stopDampeningAt: 1200, accelerateAt: 360 },
        br = function (e) {
          var t = e.startOfRange,
            n = e.endOfRange,
            r = e.current,
            o = n - t
          return 0 === o ? 0 : (r - t) / o
        },
        yr = hr.accelerateAt,
        _r = hr.stopDampeningAt,
        wr = function (e) {
          var t = e.distanceToEdge,
            n = e.thresholds,
            r = e.dragStartTime,
            o = e.shouldUseTimeDampening,
            a = (function (e, t) {
              if (e > t.startScrollingFrom) return 0
              if (e <= t.maxScrollValueAt) return vr
              if (e === t.startScrollingFrom) return 1
              var n = br({
                  startOfRange: t.maxScrollValueAt,
                  endOfRange: t.startScrollingFrom,
                  current: e,
                }),
                r = vr * gr(1 - n)
              return Math.ceil(r)
            })(t, n)
          return 0 === a
            ? 0
            : o
            ? Math.max(
                (function (e, t) {
                  var n = t,
                    r = _r,
                    o = Date.now() - n
                  if (o >= _r) return e
                  if (o < yr) return 1
                  var a = br({
                      startOfRange: yr,
                      endOfRange: r,
                      current: o,
                    }),
                    i = e * gr(a)
                  return Math.ceil(i)
                })(a, r),
                1
              )
            : a
        },
        xr = function (e) {
          var t = e.container,
            n = e.distanceToEdges,
            r = e.dragStartTime,
            o = e.axis,
            a = e.shouldUseTimeDampening,
            i = (function (e, t) {
              return {
                startScrollingFrom: e[t.size] * pr,
                maxScrollValueAt: e[t.size] * mr,
              }
            })(t, o)
          return n[o.end] < n[o.start]
            ? wr({
                distanceToEdge: n[o.end],
                thresholds: i,
                dragStartTime: r,
                shouldUseTimeDampening: a,
              })
            : -1 *
                wr({
                  distanceToEdge: n[o.start],
                  thresholds: i,
                  dragStartTime: r,
                  shouldUseTimeDampening: a,
                })
        },
        Sr = Qe(function (e) {
          return 0 === e ? 0 : e
        }),
        kr = function (e) {
          var t = e.dragStartTime,
            n = e.container,
            r = e.subject,
            o = e.center,
            a = e.shouldUseTimeDampening,
            i = {
              top: o.y - n.top,
              right: n.right - o.x,
              bottom: n.bottom - o.y,
              left: o.x - n.left,
            },
            l = xr({
              container: n,
              distanceToEdges: i,
              dragStartTime: t,
              axis: yt,
              shouldUseTimeDampening: a,
            }),
            u = xr({
              container: n,
              distanceToEdges: i,
              dragStartTime: t,
              axis: _t,
              shouldUseTimeDampening: a,
            }),
            c = Sr({ x: u, y: l })
          if (He(c, ze)) return null
          var s = (function (e) {
            var t = e.container,
              n = e.subject,
              r = e.proposedScroll,
              o = n.height > t.height,
              a = n.width > t.width
            return a || o
              ? a && o
                ? null
                : { x: a ? 0 : r.x, y: o ? 0 : r.y }
              : r
          })({ container: n, subject: r, proposedScroll: c })
          return s ? (He(s, ze) ? null : s) : null
        },
        Er = Qe(function (e) {
          return 0 === e ? 0 : e > 0 ? 1 : -1
        }),
        Ir = (function () {
          var e = function (e, t) {
            return e < 0 ? e : e > t ? e - t : 0
          }
          return function (t) {
            var n = t.current,
              r = t.max,
              o = t.change,
              a = Ge(n, o),
              i = { x: e(a.x, r.x), y: e(a.y, r.y) }
            return He(i, ze) ? null : i
          }
        })(),
        Cr = function (e) {
          var t = e.max,
            n = e.current,
            r = e.change,
            o = { x: Math.max(n.x, t.x), y: Math.max(n.y, t.y) },
            a = Er(r),
            i = Ir({ max: o, current: n, change: a })
          return !i || (0 !== a.x && 0 === i.x) || (0 !== a.y && 0 === i.y)
        },
        Pr = function (e, t) {
          return Cr({
            current: e.scroll.current,
            max: e.scroll.max,
            change: t,
          })
        },
        Ar = function (e, t) {
          var n = e.frame
          return (
            !!n &&
            Cr({
              current: n.scroll.current,
              max: n.scroll.max,
              change: t,
            })
          )
        },
        Dr = function (e) {
          var t = e.state,
            n = e.dragStartTime,
            r = e.shouldUseTimeDampening,
            o = e.scrollWindow,
            a = e.scrollDroppable,
            i = t.current.page.borderBoxCenter,
            l = t.dimensions.draggables[t.critical.draggable.id].page.marginBox
          if (t.isWindowScrollAllowed) {
            var u = (function (e) {
              var t = e.viewport,
                n = e.subject,
                r = e.center,
                o = e.dragStartTime,
                a = e.shouldUseTimeDampening,
                i = kr({
                  dragStartTime: o,
                  container: t.frame,
                  subject: n,
                  center: r,
                  shouldUseTimeDampening: a,
                })
              return i && Pr(t, i) ? i : null
            })({
              dragStartTime: n,
              viewport: t.viewport,
              subject: l,
              center: i,
              shouldUseTimeDampening: r,
            })
            if (u) return void o(u)
          }
          var c = fr({
            center: i,
            destination: Xt(t.impact),
            droppables: t.dimensions.droppables,
          })
          if (c) {
            var s = (function (e) {
              var t = e.droppable,
                n = e.subject,
                r = e.center,
                o = e.dragStartTime,
                a = e.shouldUseTimeDampening,
                i = t.frame
              if (!i) return null
              var l = kr({
                dragStartTime: o,
                container: i.pageMarginBox,
                subject: n,
                center: r,
                shouldUseTimeDampening: a,
              })
              return l && Ar(t, l) ? l : null
            })({
              dragStartTime: n,
              droppable: c,
              subject: l,
              center: i,
              shouldUseTimeDampening: r,
            })
            s && a(c.descriptor.id, s)
          }
        },
        Tr = function (e) {
          var t = e.move,
            n = e.scrollDroppable,
            r = e.scrollWindow,
            o = function (e, t) {
              if (!Ar(e, t)) return t
              var r = (function (e, t) {
                var n = e.frame
                return n && Ar(e, t)
                  ? Ir({
                      current: n.scroll.current,
                      max: n.scroll.max,
                      change: t,
                    })
                  : null
              })(e, t)
              if (!r) return n(e.descriptor.id, t), null
              var o = Ue(t, r)
              return n(e.descriptor.id, o), Ue(t, o)
            },
            a = function (e, t, n) {
              if (!e) return n
              if (!Pr(t, n)) return n
              var o = (function (e, t) {
                if (!Pr(e, t)) return null
                var n = e.scroll.max,
                  r = e.scroll.current
                return Ir({ current: r, max: n, change: t })
              })(t, n)
              if (!o) return r(n), null
              var a = Ue(n, o)
              return r(a), Ue(n, a)
            }
          return function (e) {
            var n = e.scrollJumpRequest
            if (n) {
              var r = Xt(e.impact)
              r || De(!1)
              var i = o(e.dimensions.droppables[r], n)
              if (i) {
                var l = e.viewport,
                  u = a(e.isWindowScrollAllowed, l, i)
                u &&
                  (function (e, n) {
                    var r = Ge(e.current.client.selection, n)
                    t({ client: r })
                  })(e, u)
              }
            }
          }
        },
        Or = function (e) {
          var t = e.scrollDroppable,
            n = e.scrollWindow,
            r = e.move,
            o = (function (e) {
              var t = e.scrollWindow,
                n = e.scrollDroppable,
                r = ke(t),
                o = ke(n),
                a = null,
                i = function (e) {
                  a || De(!1)
                  var t = a,
                    n = t.shouldUseTimeDampening,
                    i = t.dragStartTime
                  Dr({
                    state: e,
                    scrollWindow: r,
                    scrollDroppable: o,
                    dragStartTime: i,
                    shouldUseTimeDampening: n,
                  })
                }
              return {
                start: function (e) {
                  dn(), a && De(!1)
                  var t = Date.now(),
                    n = !1,
                    r = function () {
                      n = !0
                    }
                  Dr({
                    state: e,
                    dragStartTime: 0,
                    shouldUseTimeDampening: !1,
                    scrollWindow: r,
                    scrollDroppable: r,
                  }),
                    (a = {
                      dragStartTime: t,
                      shouldUseTimeDampening: n,
                    }),
                    fn(),
                    n && i(e)
                },
                stop: function () {
                  a && (r.cancel(), o.cancel(), (a = null))
                },
                scroll: i,
              }
            })({ scrollWindow: n, scrollDroppable: t }),
            a = Tr({ move: r, scrollWindow: n, scrollDroppable: t })
          return {
            scroll: function (e) {
              'DRAGGING' === e.phase &&
                ('FLUID' !== e.movementMode
                  ? e.scrollJumpRequest && a(e)
                  : o.scroll(e))
            },
            start: o.start,
            stop: o.stop,
          }
        },
        Nr = (function () {
          var e = 'data-rbd-drag-handle'
          return {
            base: e,
            draggableId: e + '-draggable-id',
            contextId: e + '-context-id',
          }
        })(),
        Rr = (function () {
          var e = 'data-rbd-draggable'
          return {
            base: e,
            contextId: e + '-context-id',
            id: e + '-id',
          }
        })(),
        Lr = (function () {
          var e = 'data-rbd-droppable'
          return {
            base: e,
            contextId: e + '-context-id',
            id: e + '-id',
          }
        })(),
        Mr = { contextId: 'data-rbd-scroll-container-context-id' },
        Br = function (e, t) {
          return e
            .map(function (e) {
              var n = e.styles[t]
              return n ? e.selector + ' { ' + n + ' }' : ''
            })
            .join(' ')
        },
        Fr =
          'undefined' !== typeof window &&
          'undefined' !== typeof window.document &&
          'undefined' !== typeof window.document.createElement
            ? t.useLayoutEffect
            : t.useEffect,
        jr = function () {
          var e = document.querySelector('head')
          return e || De(!1), e
        },
        zr = function (e) {
          var t = document.createElement('style')
          return e && t.setAttribute('nonce', e), (t.type = 'text/css'), t
        }
      function Gr(e, n) {
        var r = ue(
            function () {
              return (function (e) {
                var t,
                  n =
                    ((t = e),
                    function (e) {
                      return '[' + e + '="' + t + '"]'
                    }),
                  r = (function () {
                    var e =
                      '\n      cursor: -webkit-grab;\n      cursor: grab;\n    '
                    return {
                      selector: n(Nr.contextId),
                      styles: {
                        always:
                          '\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        ',
                        resting: e,
                        dragging: 'pointer-events: none;',
                        dropAnimating: e,
                      },
                    }
                  })(),
                  o = [
                    (function () {
                      var e =
                        '\n      transition: ' + Mn.outOfTheWay + ';\n    '
                      return {
                        selector: n(Rr.contextId),
                        styles: {
                          dragging: e,
                          dropAnimating: e,
                          userCancel: e,
                        },
                      }
                    })(),
                    r,
                    {
                      selector: n(Lr.contextId),
                      styles: {
                        always: 'overflow-anchor: none;',
                      },
                    },
                    {
                      selector: 'body',
                      styles: {
                        dragging:
                          '\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      ',
                      },
                    },
                  ]
                return {
                  always: Br(o, 'always'),
                  resting: Br(o, 'resting'),
                  dragging: Br(o, 'dragging'),
                  dropAnimating: Br(o, 'dropAnimating'),
                  userCancel: Br(o, 'userCancel'),
                }
              })(e)
            },
            [e]
          ),
          o = (0, t.useRef)(null),
          a = (0, t.useRef)(null),
          i = ce(
            Se(function (e) {
              var t = a.current
              t || De(!1), (t.textContent = e)
            }),
            []
          ),
          l = ce(function (e) {
            var t = o.current
            t || De(!1), (t.textContent = e)
          }, [])
        Fr(
          function () {
            ;(o.current || a.current) && De(!1)
            var t = zr(n),
              u = zr(n)
            return (
              (o.current = t),
              (a.current = u),
              t.setAttribute('data-rbd-always', e),
              u.setAttribute('data-rbd-dynamic', e),
              jr().appendChild(t),
              jr().appendChild(u),
              l(r.always),
              i(r.resting),
              function () {
                var e = function (e) {
                  var t = e.current
                  t || De(!1), jr().removeChild(t), (e.current = null)
                }
                e(o), e(a)
              }
            )
          },
          [n, l, i, r.always, r.resting, e]
        )
        var u = ce(
            function () {
              return i(r.dragging)
            },
            [i, r.dragging]
          ),
          c = ce(
            function (e) {
              i('DROP' !== e ? r.userCancel : r.dropAnimating)
            },
            [i, r.dropAnimating, r.userCancel]
          ),
          s = ce(
            function () {
              a.current && i(r.resting)
            },
            [i, r.resting]
          )
        return ue(
          function () {
            return { dragging: u, dropping: c, resting: s }
          },
          [u, c, s]
        )
      }
      var Ur = function (e) {
        return e && e.ownerDocument ? e.ownerDocument.defaultView : window
      }
      function Hr(e) {
        return e instanceof Ur(e).HTMLElement
      }
      function Wr(e, t) {
        var n = '[' + Nr.contextId + '="' + e + '"]',
          r = rt(document.querySelectorAll(n))
        if (!r.length) return null
        var o = nt(r, function (e) {
          return e.getAttribute(Nr.draggableId) === t
        })
        return o && Hr(o) ? o : null
      }
      function Vr() {
        var e = { draggables: {}, droppables: {} },
          t = []
        function n(e) {
          t.length &&
            t.forEach(function (t) {
              return t(e)
            })
        }
        function r(t) {
          return e.draggables[t] || null
        }
        function o(t) {
          return e.droppables[t] || null
        }
        return {
          draggable: {
            register: function (t) {
              ;(e.draggables[t.descriptor.id] = t),
                n({ type: 'ADDITION', value: t })
            },
            update: function (t, n) {
              var r = e.draggables[n.descriptor.id]
              r &&
                r.uniqueId === t.uniqueId &&
                (delete e.draggables[n.descriptor.id],
                (e.draggables[t.descriptor.id] = t))
            },
            unregister: function (t) {
              var o = t.descriptor.id,
                a = r(o)
              a &&
                t.uniqueId === a.uniqueId &&
                (delete e.draggables[o], n({ type: 'REMOVAL', value: t }))
            },
            getById: function (e) {
              var t = r(e)
              return t || De(!1), t
            },
            findById: r,
            exists: function (e) {
              return Boolean(r(e))
            },
            getAllByType: function (t) {
              return et(e.draggables).filter(function (e) {
                return e.descriptor.type === t
              })
            },
          },
          droppable: {
            register: function (t) {
              e.droppables[t.descriptor.id] = t
            },
            unregister: function (t) {
              var n = o(t.descriptor.id)
              n &&
                t.uniqueId === n.uniqueId &&
                delete e.droppables[t.descriptor.id]
            },
            getById: function (e) {
              var t = o(e)
              return t || De(!1), t
            },
            findById: o,
            exists: function (e) {
              return Boolean(o(e))
            },
            getAllByType: function (t) {
              return et(e.droppables).filter(function (e) {
                return e.descriptor.type === t
              })
            },
          },
          subscribe: function (e) {
            return (
              t.push(e),
              function () {
                var n = t.indexOf(e)
                ;-1 !== n && t.splice(n, 1)
              }
            )
          },
          clean: function () {
            ;(e.draggables = {}), (e.droppables = {}), (t.length = 0)
          },
        }
      }
      var $r = t.createContext(null),
        qr = function () {
          var e = document.body
          return e || De(!1), e
        },
        Qr = {
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          border: '0',
          padding: '0',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          'clip-path': 'inset(100%)',
        }
      var Xr = 0,
        Yr = { separator: '::' }
      function Kr(e, t) {
        return (
          void 0 === t && (t = Yr),
          ue(
            function () {
              return '' + e + t.separator + Xr++
            },
            [t.separator, e]
          )
        )
      }
      var Jr = t.createContext(null)
      function Zr(e) {
        0
      }
      function eo(e, t) {
        Zr()
      }
      function to() {
        eo()
      }
      function no(e) {
        var n = (0, t.useRef)(e)
        return (
          (0, t.useEffect)(function () {
            n.current = e
          }),
          n
        )
      }
      var ro,
        oo = (((ro = {})[13] = !0), (ro[9] = !0), ro),
        ao = function (e) {
          oo[e.keyCode] && e.preventDefault()
        },
        io = (function () {
          var e = 'visibilitychange'
          return 'undefined' === typeof document
            ? e
            : nt([e, 'ms' + e, 'webkit' + e, 'moz' + e, 'o' + e], function (e) {
                return 'on' + e in document
              }) || e
        })()
      var lo,
        uo = { type: 'IDLE' }
      function co(e) {
        var t = e.cancel,
          n = e.completed,
          r = e.getPhase,
          o = e.setPhase
        return [
          {
            eventName: 'mousemove',
            fn: function (e) {
              var t = e.button,
                n = e.clientX,
                a = e.clientY
              if (0 === t) {
                var i = { x: n, y: a },
                  l = r()
                if ('DRAGGING' === l.type)
                  return e.preventDefault(), void l.actions.move(i)
                if (
                  ('PENDING' !== l.type && De(!1),
                  (function (e, t) {
                    return Math.abs(t.x - e.x) >= 5 || Math.abs(t.y - e.y) >= 5
                  })(l.point, i))
                ) {
                  e.preventDefault()
                  var u = l.actions.fluidLift(i)
                  o({ type: 'DRAGGING', actions: u })
                }
              }
            },
          },
          {
            eventName: 'mouseup',
            fn: function (e) {
              var o = r()
              'DRAGGING' === o.type
                ? (e.preventDefault(),
                  o.actions.drop({ shouldBlockNextClick: !0 }),
                  n())
                : t()
            },
          },
          {
            eventName: 'mousedown',
            fn: function (e) {
              'DRAGGING' === r().type && e.preventDefault(), t()
            },
          },
          {
            eventName: 'keydown',
            fn: function (e) {
              if ('PENDING' !== r().type)
                return 27 === e.keyCode
                  ? (e.preventDefault(), void t())
                  : void ao(e)
              t()
            },
          },
          { eventName: 'resize', fn: t },
          {
            eventName: 'scroll',
            options: { passive: !0, capture: !1 },
            fn: function () {
              'PENDING' === r().type && t()
            },
          },
          {
            eventName: 'webkitmouseforcedown',
            fn: function (e) {
              var n = r()
              'IDLE' === n.type && De(!1),
                n.actions.shouldRespectForcePress() ? t() : e.preventDefault()
            },
          },
          { eventName: io, fn: t },
        ]
      }
      function so() {}
      var fo =
        (((lo = {})[34] = !0), (lo[33] = !0), (lo[36] = !0), (lo[35] = !0), lo)
      function po(e, t) {
        function n() {
          t(), e.cancel()
        }
        return [
          {
            eventName: 'keydown',
            fn: function (r) {
              return 27 === r.keyCode
                ? (r.preventDefault(), void n())
                : 32 === r.keyCode
                ? (r.preventDefault(), t(), void e.drop())
                : 40 === r.keyCode
                ? (r.preventDefault(), void e.moveDown())
                : 38 === r.keyCode
                ? (r.preventDefault(), void e.moveUp())
                : 39 === r.keyCode
                ? (r.preventDefault(), void e.moveRight())
                : 37 === r.keyCode
                ? (r.preventDefault(), void e.moveLeft())
                : void (fo[r.keyCode] ? r.preventDefault() : ao(r))
            },
          },
          { eventName: 'mousedown', fn: n },
          { eventName: 'mouseup', fn: n },
          { eventName: 'click', fn: n },
          { eventName: 'touchstart', fn: n },
          { eventName: 'resize', fn: n },
          { eventName: 'wheel', fn: n, options: { passive: !0 } },
          { eventName: io, fn: n },
        ]
      }
      var mo = { type: 'IDLE' }
      var vo = {
        input: !0,
        button: !0,
        textarea: !0,
        select: !0,
        option: !0,
        optgroup: !0,
        video: !0,
        audio: !0,
      }
      function go(e, t) {
        if (null == t) return !1
        if (Boolean(vo[t.tagName.toLowerCase()])) return !0
        var n = t.getAttribute('contenteditable')
        return 'true' === n || '' === n || (t !== e && go(e, t.parentElement))
      }
      function ho(e, t) {
        var n = t.target
        return !!Hr(n) && go(e, n)
      }
      var bo = function (e) {
        return de(e.getBoundingClientRect()).center
      }
      var yo = (function () {
        var e = 'matches'
        return 'undefined' === typeof document
          ? e
          : nt([e, 'msMatchesSelector', 'webkitMatchesSelector'], function (e) {
              return e in Element.prototype
            }) || e
      })()
      function _o(e, t) {
        return null == e ? null : e[yo](t) ? e : _o(e.parentElement, t)
      }
      function wo(e, t) {
        return e.closest ? e.closest(t) : _o(e, t)
      }
      function xo(e, t) {
        var n,
          r = t.target
        if (!((n = r) instanceof Ur(n).Element)) return null
        var o = (function (e) {
            return '[' + Nr.contextId + '="' + e + '"]'
          })(e),
          a = wo(r, o)
        return a && Hr(a) ? a : null
      }
      function So(e) {
        e.preventDefault()
      }
      function ko(e) {
        var t = e.expected,
          n = e.phase,
          r = e.isLockActive
        e.shouldWarn
        return !!r() && t === n
      }
      function Eo(e) {
        var t = e.lockAPI,
          n = e.store,
          r = e.registry,
          o = e.draggableId
        if (t.isClaimed()) return !1
        var a = r.draggable.findById(o)
        return !!a && !!a.options.isEnabled && !!cr(n.getState(), o)
      }
      function Io(e) {
        var t = e.lockAPI,
          n = e.contextId,
          r = e.store,
          o = e.registry,
          i = e.draggableId,
          l = e.forceSensorStop,
          u = e.sourceEvent
        if (!Eo({ lockAPI: t, store: r, registry: o, draggableId: i }))
          return null
        var c = o.draggable.getById(i),
          s = (function (e, t) {
            var n = '[' + Rr.contextId + '="' + e + '"]',
              r = nt(rt(document.querySelectorAll(n)), function (e) {
                return e.getAttribute(Rr.id) === t
              })
            return r && Hr(r) ? r : null
          })(n, c.descriptor.id)
        if (!s) return null
        if (u && !c.options.canDragInteractiveElements && ho(s, u)) return null
        var d = t.claim(l || Ie),
          f = 'PRE_DRAG'
        function p() {
          return c.options.shouldRespectForcePress
        }
        function m() {
          return t.isActive(d)
        }
        var v = function (e, t) {
          ko({
            expected: e,
            phase: f,
            isLockActive: m,
            shouldWarn: !0,
          }) && r.dispatch(t())
        }.bind(null, 'DRAGGING')
        function g(e) {
          function n() {
            t.release(), (f = 'COMPLETED')
          }
          function o(t, o) {
            if (
              (void 0 === o && (o = { shouldBlockNextClick: !1 }),
              e.cleanup(),
              o.shouldBlockNextClick)
            ) {
              var a = Ce(window, [
                {
                  eventName: 'click',
                  fn: So,
                  options: {
                    once: !0,
                    passive: !1,
                    capture: !0,
                  },
                },
              ])
              setTimeout(a)
            }
            n(), r.dispatch(Dn({ reason: t }))
          }
          return (
            'PRE_DRAG' !== f && (n(), 'PRE_DRAG' !== f && De(!1)),
            r.dispatch(
              (function (e) {
                return { type: 'LIFT', payload: e }
              })(e.liftActionArgs)
            ),
            (f = 'DRAGGING'),
            a(
              {
                isActive: function () {
                  return ko({
                    expected: 'DRAGGING',
                    phase: f,
                    isLockActive: m,
                    shouldWarn: !1,
                  })
                },
                shouldRespectForcePress: p,
                drop: function (e) {
                  return o('DROP', e)
                },
                cancel: function (e) {
                  return o('CANCEL', e)
                },
              },
              e.actions
            )
          )
        }
        var h = {
          isActive: function () {
            return ko({
              expected: 'PRE_DRAG',
              phase: f,
              isLockActive: m,
              shouldWarn: !1,
            })
          },
          shouldRespectForcePress: p,
          fluidLift: function (e) {
            var t = ke(function (e) {
              v(function () {
                return kn({ client: e })
              })
            })
            return a(
              {},
              g({
                liftActionArgs: {
                  id: i,
                  clientSelection: e,
                  movementMode: 'FLUID',
                },
                cleanup: function () {
                  return t.cancel()
                },
                actions: { move: t },
              }),
              { move: t }
            )
          },
          snapLift: function () {
            var e = {
              moveUp: function () {
                return v(En)
              },
              moveRight: function () {
                return v(Cn)
              },
              moveDown: function () {
                return v(In)
              },
              moveLeft: function () {
                return v(Pn)
              },
            }
            return g({
              liftActionArgs: {
                id: i,
                clientSelection: bo(s),
                movementMode: 'SNAP',
              },
              cleanup: Ie,
              actions: e,
            })
          },
          abort: function () {
            ko({
              expected: 'PRE_DRAG',
              phase: f,
              isLockActive: m,
              shouldWarn: !0,
            }) && t.release()
          },
        }
        return h
      }
      var Co = [
        function (e) {
          var n = (0, t.useRef)(uo),
            r = (0, t.useRef)(Ie),
            o = ue(
              function () {
                return {
                  eventName: 'mousedown',
                  fn: function (t) {
                    if (
                      !t.defaultPrevented &&
                      0 === t.button &&
                      !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)
                    ) {
                      var n = e.findClosestDraggableId(t)
                      if (n) {
                        var o = e.tryGetLock(n, l, {
                          sourceEvent: t,
                        })
                        if (o) {
                          t.preventDefault()
                          var a = {
                            x: t.clientX,
                            y: t.clientY,
                          }
                          r.current(), s(o, a)
                        }
                      }
                    }
                  },
                }
              },
              [e]
            ),
            a = ue(
              function () {
                return {
                  eventName: 'webkitmouseforcewillbegin',
                  fn: function (t) {
                    if (!t.defaultPrevented) {
                      var n = e.findClosestDraggableId(t)
                      if (n) {
                        var r = e.findOptionsForDraggable(n)
                        r &&
                          (r.shouldRespectForcePress ||
                            (e.canGetLock(n) && t.preventDefault()))
                      }
                    }
                  },
                }
              },
              [e]
            ),
            i = ce(
              function () {
                r.current = Ce(window, [a, o], {
                  passive: !1,
                  capture: !0,
                })
              },
              [a, o]
            ),
            l = ce(
              function () {
                'IDLE' !== n.current.type &&
                  ((n.current = uo), r.current(), i())
              },
              [i]
            ),
            u = ce(
              function () {
                var e = n.current
                l(),
                  'DRAGGING' === e.type &&
                    e.actions.cancel({
                      shouldBlockNextClick: !0,
                    }),
                  'PENDING' === e.type && e.actions.abort()
              },
              [l]
            ),
            c = ce(
              function () {
                var e = co({
                  cancel: u,
                  completed: l,
                  getPhase: function () {
                    return n.current
                  },
                  setPhase: function (e) {
                    n.current = e
                  },
                })
                r.current = Ce(window, e, {
                  capture: !0,
                  passive: !1,
                })
              },
              [u, l]
            ),
            s = ce(
              function (e, t) {
                'IDLE' !== n.current.type && De(!1),
                  (n.current = {
                    type: 'PENDING',
                    point: t,
                    actions: e,
                  }),
                  c()
              },
              [c]
            )
          Fr(
            function () {
              return (
                i(),
                function () {
                  r.current()
                }
              )
            },
            [i]
          )
        },
        function (e) {
          var n = (0, t.useRef)(so),
            r = ue(
              function () {
                return {
                  eventName: 'keydown',
                  fn: function (t) {
                    if (!t.defaultPrevented && 32 === t.keyCode) {
                      var r = e.findClosestDraggableId(t)
                      if (r) {
                        var a = e.tryGetLock(r, u, {
                          sourceEvent: t,
                        })
                        if (a) {
                          t.preventDefault()
                          var i = !0,
                            l = a.snapLift()
                          n.current(),
                            (n.current = Ce(window, po(l, u), {
                              capture: !0,
                              passive: !1,
                            }))
                        }
                      }
                    }
                    function u() {
                      i || De(!1), (i = !1), n.current(), o()
                    }
                  },
                }
              },
              [e]
            ),
            o = ce(
              function () {
                n.current = Ce(window, [r], {
                  passive: !1,
                  capture: !0,
                })
              },
              [r]
            )
          Fr(
            function () {
              return (
                o(),
                function () {
                  n.current()
                }
              )
            },
            [o]
          )
        },
        function (e) {
          var n = (0, t.useRef)(mo),
            r = (0, t.useRef)(Ie),
            o = ce(function () {
              return n.current
            }, []),
            a = ce(function (e) {
              n.current = e
            }, []),
            i = ue(
              function () {
                return {
                  eventName: 'touchstart',
                  fn: function (t) {
                    if (!t.defaultPrevented) {
                      var n = e.findClosestDraggableId(t)
                      if (n) {
                        var o = e.tryGetLock(n, u, {
                          sourceEvent: t,
                        })
                        if (o) {
                          var a = t.touches[0],
                            i = {
                              x: a.clientX,
                              y: a.clientY,
                            }
                          r.current(), f(o, i)
                        }
                      }
                    }
                  },
                }
              },
              [e]
            ),
            l = ce(
              function () {
                r.current = Ce(window, [i], {
                  capture: !0,
                  passive: !1,
                })
              },
              [i]
            ),
            u = ce(
              function () {
                var e = n.current
                'IDLE' !== e.type &&
                  ('PENDING' === e.type && clearTimeout(e.longPressTimerId),
                  a(mo),
                  r.current(),
                  l())
              },
              [l, a]
            ),
            c = ce(
              function () {
                var e = n.current
                u(),
                  'DRAGGING' === e.type &&
                    e.actions.cancel({
                      shouldBlockNextClick: !0,
                    }),
                  'PENDING' === e.type && e.actions.abort()
              },
              [u]
            ),
            s = ce(
              function () {
                var e = { capture: !0, passive: !1 },
                  t = {
                    cancel: c,
                    completed: u,
                    getPhase: o,
                  },
                  n = Ce(
                    window,
                    (function (e) {
                      var t = e.cancel,
                        n = e.completed,
                        r = e.getPhase
                      return [
                        {
                          eventName: 'touchmove',
                          options: { capture: !1 },
                          fn: function (e) {
                            var n = r()
                            if ('DRAGGING' === n.type) {
                              n.hasMoved = !0
                              var o = e.touches[0],
                                a = {
                                  x: o.clientX,
                                  y: o.clientY,
                                }
                              e.preventDefault(), n.actions.move(a)
                            } else t()
                          },
                        },
                        {
                          eventName: 'touchend',
                          fn: function (e) {
                            var o = r()
                            'DRAGGING' === o.type
                              ? (e.preventDefault(),
                                o.actions.drop({
                                  shouldBlockNextClick: !0,
                                }),
                                n())
                              : t()
                          },
                        },
                        {
                          eventName: 'touchcancel',
                          fn: function (e) {
                            'DRAGGING' === r().type
                              ? (e.preventDefault(), t())
                              : t()
                          },
                        },
                        {
                          eventName: 'touchforcechange',
                          fn: function (e) {
                            var n = r()
                            'IDLE' === n.type && De(!1)
                            var o = e.touches[0]
                            if (o && o.force >= 0.15) {
                              var a = n.actions.shouldRespectForcePress()
                              if ('PENDING' !== n.type)
                                return a
                                  ? n.hasMoved
                                    ? void e.preventDefault()
                                    : void t()
                                  : void e.preventDefault()
                              a && t()
                            }
                          },
                        },
                        { eventName: io, fn: t },
                      ]
                    })(t),
                    e
                  ),
                  a = Ce(
                    window,
                    (function (e) {
                      var t = e.cancel,
                        n = e.getPhase
                      return [
                        {
                          eventName: 'orientationchange',
                          fn: t,
                        },
                        { eventName: 'resize', fn: t },
                        {
                          eventName: 'contextmenu',
                          fn: function (e) {
                            e.preventDefault()
                          },
                        },
                        {
                          eventName: 'keydown',
                          fn: function (e) {
                            'DRAGGING' === n().type
                              ? (27 === e.keyCode && e.preventDefault(), t())
                              : t()
                          },
                        },
                        { eventName: io, fn: t },
                      ]
                    })(t),
                    e
                  )
                r.current = function () {
                  n(), a()
                }
              },
              [c, o, u]
            ),
            d = ce(
              function () {
                var e = o()
                'PENDING' !== e.type && De(!1)
                var t = e.actions.fluidLift(e.point)
                a({
                  type: 'DRAGGING',
                  actions: t,
                  hasMoved: !1,
                })
              },
              [o, a]
            ),
            f = ce(
              function (e, t) {
                'IDLE' !== o().type && De(!1)
                var n = setTimeout(d, 120)
                a({
                  type: 'PENDING',
                  point: t,
                  actions: e,
                  longPressTimerId: n,
                }),
                  s()
              },
              [s, o, a, d]
            )
          Fr(
            function () {
              return (
                l(),
                function () {
                  r.current()
                  var e = o()
                  'PENDING' === e.type &&
                    (clearTimeout(e.longPressTimerId), a(mo))
                }
              )
            },
            [o, l, a]
          ),
            Fr(function () {
              return Ce(window, [
                {
                  eventName: 'touchmove',
                  fn: function () {},
                  options: { capture: !1, passive: !1 },
                },
              ])
            }, [])
        },
      ]
      function Po(e) {
        var n = e.contextId,
          r = e.store,
          o = e.registry,
          a = e.customSensors,
          i = e.enableDefaultSensors,
          l = [].concat(i ? Co : [], a || []),
          u = (0, t.useState)(function () {
            return (function () {
              var e = null
              function t() {
                e || De(!1), (e = null)
              }
              return {
                isClaimed: function () {
                  return Boolean(e)
                },
                isActive: function (t) {
                  return t === e
                },
                claim: function (t) {
                  e && De(!1)
                  var n = { abandon: t }
                  return (e = n), n
                },
                release: t,
                tryAbandon: function () {
                  e && (e.abandon(), t())
                },
              }
            })()
          })[0],
          c = ce(
            function (e, t) {
              e.isDragging && !t.isDragging && u.tryAbandon()
            },
            [u]
          )
        Fr(
          function () {
            var e = r.getState()
            return r.subscribe(function () {
              var t = r.getState()
              c(e, t), (e = t)
            })
          },
          [u, r, c]
        ),
          Fr(
            function () {
              return u.tryAbandon
            },
            [u.tryAbandon]
          )
        var s = ce(
            function (e) {
              return Eo({
                lockAPI: u,
                registry: o,
                store: r,
                draggableId: e,
              })
            },
            [u, o, r]
          ),
          d = ce(
            function (e, t, a) {
              return Io({
                lockAPI: u,
                registry: o,
                contextId: n,
                store: r,
                draggableId: e,
                forceSensorStop: t,
                sourceEvent: a && a.sourceEvent ? a.sourceEvent : null,
              })
            },
            [n, u, o, r]
          ),
          f = ce(
            function (e) {
              return (function (e, t) {
                var n = xo(e, t)
                return n ? n.getAttribute(Nr.draggableId) : null
              })(n, e)
            },
            [n]
          ),
          p = ce(
            function (e) {
              var t = o.draggable.findById(e)
              return t ? t.options : null
            },
            [o.draggable]
          ),
          m = ce(
            function () {
              u.isClaimed() &&
                (u.tryAbandon(),
                'IDLE' !== r.getState().phase &&
                  r.dispatch({
                    type: 'FLUSH',
                    payload: null,
                  }))
            },
            [u, r]
          ),
          v = ce(u.isClaimed, [u]),
          g = ue(
            function () {
              return {
                canGetLock: s,
                tryGetLock: d,
                findClosestDraggableId: f,
                findOptionsForDraggable: p,
                tryReleaseLock: m,
                isLockClaimed: v,
              }
            },
            [s, d, f, p, m, v]
          )
        Zr()
        for (var h = 0; h < l.length; h++) l[h](g)
      }
      function Ao(e) {
        return e.current || De(!1), e.current
      }
      function Do(e) {
        var n = e.contextId,
          r = e.setCallbacks,
          o = e.sensors,
          i = e.nonce,
          l = e.dragHandleUsageInstructions,
          u = (0, t.useRef)(null)
        to()
        var c = no(e),
          s = ce(
            function () {
              return (function (e) {
                return {
                  onBeforeCapture: e.onBeforeCapture,
                  onBeforeDragStart: e.onBeforeDragStart,
                  onDragStart: e.onDragStart,
                  onDragEnd: e.onDragEnd,
                  onDragUpdate: e.onDragUpdate,
                }
              })(c.current)
            },
            [c]
          ),
          d = (function (e) {
            var n = ue(
                function () {
                  return (function (e) {
                    return 'rbd-announcement-' + e
                  })(e)
                },
                [e]
              ),
              r = (0, t.useRef)(null)
            return (
              (0, t.useEffect)(
                function () {
                  var e = document.createElement('div')
                  return (
                    (r.current = e),
                    (e.id = n),
                    e.setAttribute('aria-live', 'assertive'),
                    e.setAttribute('aria-atomic', 'true'),
                    a(e.style, Qr),
                    qr().appendChild(e),
                    function () {
                      setTimeout(function () {
                        var t = qr()
                        t.contains(e) && t.removeChild(e),
                          e === r.current && (r.current = null)
                      })
                    }
                  )
                },
                [n]
              ),
              ce(function (e) {
                var t = r.current
                t && (t.textContent = e)
              }, [])
            )
          })(n),
          f = (function (e) {
            var n = e.contextId,
              r = e.text,
              o = Kr('hidden-text', { separator: '-' }),
              a = ue(
                function () {
                  return (
                    'rbd-hidden-text-' +
                    (e = { contextId: n, uniqueId: o }).contextId +
                    '-' +
                    e.uniqueId
                  )
                  var e
                },
                [o, n]
              )
            return (
              (0, t.useEffect)(
                function () {
                  var e = document.createElement('div')
                  return (
                    (e.id = a),
                    (e.textContent = r),
                    (e.style.display = 'none'),
                    qr().appendChild(e),
                    function () {
                      var t = qr()
                      t.contains(e) && t.removeChild(e)
                    }
                  )
                },
                [a, r]
              ),
              a
            )
          })({ contextId: n, text: l }),
          p = Gr(n, i),
          m = ce(function (e) {
            Ao(u).dispatch(e)
          }, []),
          v = ue(
            function () {
              return h(
                {
                  publishWhileDragging: yn,
                  updateDroppableScroll: wn,
                  updateDroppableIsEnabled: xn,
                  updateDroppableIsCombineEnabled: Sn,
                  collectionStarting: _n,
                },
                m
              )
            },
            [m]
          ),
          g = (function () {
            var e = ue(Vr, [])
            return (
              (0, t.useEffect)(
                function () {
                  return function () {
                    requestAnimationFrame(e.clean)
                  }
                },
                [e]
              ),
              e
            )
          })(),
          b = ue(
            function () {
              return ur(g, v)
            },
            [g, v]
          ),
          y = ue(
            function () {
              return Or(
                a(
                  {
                    scrollWindow: sr,
                    scrollDroppable: b.scrollDroppable,
                  },
                  h({ move: kn }, m)
                )
              )
            },
            [b.scrollDroppable, m]
          ),
          _ = (function (e) {
            var n = (0, t.useRef)({}),
              r = (0, t.useRef)(null),
              o = (0, t.useRef)(null),
              a = (0, t.useRef)(!1),
              i = ce(function (e, t) {
                var r = { id: e, focus: t }
                return (
                  (n.current[e] = r),
                  function () {
                    var t = n.current
                    t[e] !== r && delete t[e]
                  }
                )
              }, []),
              l = ce(
                function (t) {
                  var n = Wr(e, t)
                  n && n !== document.activeElement && n.focus()
                },
                [e]
              ),
              u = ce(function (e, t) {
                r.current === e && (r.current = t)
              }, []),
              c = ce(
                function () {
                  o.current ||
                    (a.current &&
                      (o.current = requestAnimationFrame(function () {
                        o.current = null
                        var e = r.current
                        e && l(e)
                      })))
                },
                [l]
              ),
              s = ce(function (e) {
                r.current = null
                var t = document.activeElement
                t && t.getAttribute(Nr.draggableId) === e && (r.current = e)
              }, [])
            return (
              Fr(function () {
                return (
                  (a.current = !0),
                  function () {
                    a.current = !1
                    var e = o.current
                    e && cancelAnimationFrame(e)
                  }
                )
              }, []),
              ue(
                function () {
                  return {
                    register: i,
                    tryRecordFocus: s,
                    tryRestoreFocusRecorded: c,
                    tryShiftRecord: u,
                  }
                },
                [i, s, c, u]
              )
            )
          })(n),
          w = ue(
            function () {
              return nr({
                announce: d,
                autoScroller: y,
                dimensionMarshal: b,
                focusMarshal: _,
                getResponders: s,
                styleMarshal: p,
              })
            },
            [d, y, b, _, s, p]
          )
        u.current = w
        var x = ce(function () {
            var e = Ao(u)
            'IDLE' !== e.getState().phase &&
              e.dispatch({ type: 'FLUSH', payload: null })
          }, []),
          S = ce(function () {
            var e = Ao(u).getState()
            return e.isDragging || 'DROP_ANIMATING' === e.phase
          }, [])
        r(
          ue(
            function () {
              return { isDragging: S, tryAbort: x }
            },
            [S, x]
          )
        )
        var k = ce(function (e) {
            return cr(Ao(u).getState(), e)
          }, []),
          E = ce(function () {
            return Kt(Ao(u).getState())
          }, []),
          C = ue(
            function () {
              return {
                marshal: b,
                focus: _,
                contextId: n,
                canLift: k,
                isMovementAllowed: E,
                dragHandleUsageInstructionsId: f,
                registry: g,
              }
            },
            [n, b, f, _, k, E, g]
          )
        return (
          Po({
            contextId: n,
            store: w,
            registry: g,
            customSensors: o,
            enableDefaultSensors: !1 !== e.enableDefaultSensors,
          }),
          (0, t.useEffect)(
            function () {
              return x
            },
            [x]
          ),
          t.createElement(
            Jr.Provider,
            { value: C },
            t.createElement(I, { context: $r, store: w }, e.children)
          )
        )
      }
      var To = 0
      function Oo(e) {
        var n = ue(function () {
            return '' + To++
          }, []),
          r = e.dragHandleUsageInstructions || Me
        return t.createElement(Te, null, function (o) {
          return t.createElement(
            Do,
            {
              nonce: e.nonce,
              contextId: n,
              setCallbacks: o,
              dragHandleUsageInstructions: r,
              enableDefaultSensors: e.enableDefaultSensors,
              sensors: e.sensors,
              onBeforeCapture: e.onBeforeCapture,
              onBeforeDragStart: e.onBeforeDragStart,
              onDragStart: e.onDragStart,
              onDragUpdate: e.onDragUpdate,
              onDragEnd: e.onDragEnd,
            },
            e.children
          )
        })
      }
      var No = function (e) {
          return function (t) {
            return e === t
          }
        },
        Ro = No('scroll'),
        Lo = No('auto'),
        Mo =
          (No('visible'),
          function (e, t) {
            return t(e.overflowX) || t(e.overflowY)
          }),
        Bo = function (e) {
          var t = window.getComputedStyle(e),
            n = { overflowX: t.overflowX, overflowY: t.overflowY }
          return Mo(n, Ro) || Mo(n, Lo)
        },
        Fo = function e(t) {
          return null == t ||
            t === document.body ||
            t === document.documentElement
            ? null
            : Bo(t)
            ? t
            : e(t.parentElement)
        },
        jo = function (e) {
          return { x: e.scrollLeft, y: e.scrollTop }
        },
        zo = function e(t) {
          return (
            !!t &&
            ('fixed' === window.getComputedStyle(t).position ||
              e(t.parentElement))
          )
        },
        Go = function (e) {
          return { closestScrollable: Fo(e), isFixedOnPage: zo(e) }
        },
        Uo = function (e) {
          var t = e.ref,
            n = e.descriptor,
            r = e.env,
            o = e.windowScroll,
            a = e.direction,
            i = e.isDropDisabled,
            l = e.isCombineEnabled,
            u = e.shouldClipSubject,
            c = r.closestScrollable,
            s = (function (e, t) {
              var n = _e(e)
              if (!t) return n
              if (e !== t) return n
              var r = n.paddingBox.top - t.scrollTop,
                o = n.paddingBox.left - t.scrollLeft,
                a = r + t.scrollHeight,
                i = o + t.scrollWidth,
                l = fe({ top: r, right: i, bottom: a, left: o }, n.border)
              return ve({
                borderBox: l,
                margin: n.margin,
                border: n.border,
                padding: n.padding,
              })
            })(t, c),
            d = be(s, o),
            f = (function () {
              if (!c) return null
              var e = _e(c),
                t = {
                  scrollHeight: c.scrollHeight,
                  scrollWidth: c.scrollWidth,
                }
              return {
                client: e,
                page: be(e, o),
                scroll: jo(c),
                scrollSize: t,
                shouldClipSubject: u,
              }
            })(),
            p = (function (e) {
              var t = e.descriptor,
                n = e.isEnabled,
                r = e.isCombineEnabled,
                o = e.isFixedOnPage,
                a = e.direction,
                i = e.client,
                l = e.page,
                u = e.closest,
                c = (function () {
                  if (!u) return null
                  var e = u.scrollSize,
                    t = u.client,
                    n = rr({
                      scrollHeight: e.scrollHeight,
                      scrollWidth: e.scrollWidth,
                      height: t.paddingBox.height,
                      width: t.paddingBox.width,
                    })
                  return {
                    pageMarginBox: u.page.marginBox,
                    frameClient: t,
                    scrollSize: e,
                    shouldClipSubject: u.shouldClipSubject,
                    scroll: {
                      initial: u.scroll,
                      current: u.scroll,
                      max: n,
                      diff: {
                        value: ze,
                        displacement: ze,
                      },
                    },
                  }
                })(),
                s = 'vertical' === a ? yt : _t
              return {
                descriptor: t,
                isCombineEnabled: r,
                isFixedOnPage: o,
                axis: s,
                isEnabled: n,
                client: i,
                page: l,
                frame: c,
                subject: Je({
                  page: l,
                  withPlaceholder: null,
                  axis: s,
                  frame: c,
                }),
              }
            })({
              descriptor: n,
              isEnabled: !i,
              isCombineEnabled: l,
              isFixedOnPage: r.isFixedOnPage,
              direction: a,
              client: s,
              page: d,
              closest: f,
            })
          return p
        },
        Ho = { passive: !1 },
        Wo = { passive: !0 },
        Vo = function (e) {
          return e.shouldPublishImmediately ? Ho : Wo
        }
      function $o(e) {
        var n = (0, t.useContext)(e)
        return n || De(!1), n
      }
      var qo = function (e) {
        return (e && e.env.closestScrollable) || null
      }
      function Qo() {}
      var Xo = {
          width: 0,
          height: 0,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        },
        Yo = function (e) {
          var t = e.isAnimatingOpenOnMount,
            n = e.placeholder,
            r = e.animate,
            o = (function (e) {
              var t = e.isAnimatingOpenOnMount,
                n = e.placeholder,
                r = e.animate
              return t || 'close' === r
                ? Xo
                : {
                    height: n.client.borderBox.height,
                    width: n.client.borderBox.width,
                    margin: n.client.margin,
                  }
            })({
              isAnimatingOpenOnMount: t,
              placeholder: n,
              animate: r,
            })
          return {
            display: n.display,
            boxSizing: 'border-box',
            width: o.width,
            height: o.height,
            marginTop: o.margin.top,
            marginRight: o.margin.right,
            marginBottom: o.margin.bottom,
            marginLeft: o.margin.left,
            flexShrink: '0',
            flexGrow: '0',
            pointerEvents: 'none',
            transition: 'none' !== r ? Mn.placeholder : null,
          }
        }
      var Ko = t.memo(function (e) {
          var n = (0, t.useRef)(null),
            r = ce(function () {
              n.current && (clearTimeout(n.current), (n.current = null))
            }, []),
            o = e.animate,
            a = e.onTransitionEnd,
            i = e.onClose,
            l = e.contextId,
            u = (0, t.useState)('open' === e.animate),
            c = u[0],
            s = u[1]
          ;(0, t.useEffect)(
            function () {
              return c
                ? 'open' !== o
                  ? (r(), s(!1), Qo)
                  : n.current
                  ? Qo
                  : ((n.current = setTimeout(function () {
                      ;(n.current = null), s(!1)
                    })),
                    r)
                : Qo
            },
            [o, c, r]
          )
          var d = ce(
              function (e) {
                'height' === e.propertyName && (a(), 'close' === o && i())
              },
              [o, i, a]
            ),
            f = Yo({
              isAnimatingOpenOnMount: c,
              animate: e.animate,
              placeholder: e.placeholder,
            })
          return t.createElement(e.placeholder.tagName, {
            style: f,
            'data-rbd-placeholder-context-id': l,
            onTransitionEnd: d,
            ref: e.innerRef,
          })
        }),
        Jo = t.createContext(null)
      var Zo = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), o = 0;
              o < n;
              o++
            )
              r[o] = arguments[o]
            return (
              ((t = e.call.apply(e, [this].concat(r)) || this).state = {
                isVisible: Boolean(t.props.on),
                data: t.props.on,
                animate: t.props.shouldAnimate && t.props.on ? 'open' : 'none',
              }),
              (t.onClose = function () {
                'close' === t.state.animate && t.setState({ isVisible: !1 })
              }),
              t
            )
          }
          return (
            o(t, e),
            (t.getDerivedStateFromProps = function (e, t) {
              return e.shouldAnimate
                ? e.on
                  ? {
                      isVisible: !0,
                      data: e.on,
                      animate: 'open',
                    }
                  : t.isVisible
                  ? {
                      isVisible: !0,
                      data: t.data,
                      animate: 'close',
                    }
                  : {
                      isVisible: !1,
                      animate: 'close',
                      data: null,
                    }
                : {
                    isVisible: Boolean(e.on),
                    data: e.on,
                    animate: 'none',
                  }
            }),
            (t.prototype.render = function () {
              if (!this.state.isVisible) return null
              var e = {
                onClose: this.onClose,
                data: this.state.data,
                animate: this.state.animate,
              }
              return this.props.children(e)
            }),
            t
          )
        })(t.PureComponent),
        ea = 5e3,
        ta = 4500,
        na = function (e, t) {
          return t ? Mn.drop(t.duration) : e ? Mn.snap : Mn.fluid
        },
        ra = function (e, t) {
          return e ? (t ? Nn.drop : Nn.combining) : null
        }
      function oa(e) {
        return 'DRAGGING' === e.type
          ? (function (e) {
              var t = e.dimension.client,
                n = e.offset,
                r = e.combineWith,
                o = e.dropping,
                a = Boolean(r),
                i = (function (e) {
                  return null != e.forceShouldAnimate
                    ? e.forceShouldAnimate
                    : 'SNAP' === e.mode
                })(e),
                l = Boolean(o),
                u = l ? jn(n, a) : Fn(n)
              return {
                position: 'fixed',
                top: t.marginBox.top,
                left: t.marginBox.left,
                boxSizing: 'border-box',
                width: t.borderBox.width,
                height: t.borderBox.height,
                transition: na(i, o),
                transform: u,
                opacity: ra(a, l),
                zIndex: l ? ta : ea,
                pointerEvents: 'none',
              }
            })(e)
          : {
              transform: Fn((t = e).offset),
              transition: t.shouldAnimateDisplacement ? null : 'none',
            }
        var t
      }
      function aa(e) {
        var n = Kr('draggable'),
          r = e.descriptor,
          o = e.registry,
          a = e.getDraggableRef,
          i = e.canDragInteractiveElements,
          l = e.shouldRespectForcePress,
          u = e.isEnabled,
          c = ue(
            function () {
              return {
                canDragInteractiveElements: i,
                shouldRespectForcePress: l,
                isEnabled: u,
              }
            },
            [i, u, l]
          ),
          s = ce(
            function (e) {
              var t = a()
              return (
                t || De(!1),
                (function (e, t, n) {
                  void 0 === n && (n = ze)
                  var r = window.getComputedStyle(t),
                    o = t.getBoundingClientRect(),
                    a = ye(o, r),
                    i = be(a, n)
                  return {
                    descriptor: e,
                    placeholder: {
                      client: a,
                      tagName: t.tagName.toLowerCase(),
                      display: r.display,
                    },
                    displaceBy: {
                      x: a.marginBox.width,
                      y: a.marginBox.height,
                    },
                    client: a,
                    page: i,
                  }
                })(r, t, e)
              )
            },
            [r, a]
          ),
          d = ue(
            function () {
              return {
                uniqueId: n,
                descriptor: r,
                options: c,
                getDimension: s,
              }
            },
            [r, s, c, n]
          ),
          f = (0, t.useRef)(d),
          p = (0, t.useRef)(!0)
        Fr(
          function () {
            return (
              o.draggable.register(f.current),
              function () {
                return o.draggable.unregister(f.current)
              }
            )
          },
          [o.draggable]
        ),
          Fr(
            function () {
              if (p.current) p.current = !1
              else {
                var e = f.current
                ;(f.current = d), o.draggable.update(d, e)
              }
            },
            [d, o.draggable]
          )
      }
      function ia(e, t, n) {
        eo()
      }
      function la(e) {
        e.preventDefault()
      }
      var ua = function (e, t) {
          return e === t
        },
        ca = function (e) {
          var t = e.combine,
            n = e.destination
          return n ? n.droppableId : t ? t.droppableId : null
        }
      function sa(e) {
        return {
          isDragging: !1,
          isDropAnimating: !1,
          isClone: !1,
          dropAnimation: null,
          mode: null,
          draggingOver: null,
          combineTargetFor: e,
          combineWith: null,
        }
      }
      var da = {
        mapped: {
          type: 'SECONDARY',
          offset: ze,
          combineTargetFor: null,
          shouldAnimateDisplacement: !0,
          snapshot: sa(null),
        },
      }
      var fa = oe(
        function () {
          var e = (function () {
              var e = Se(function (e, t) {
                  return { x: e, y: t }
                }),
                t = Se(function (e, t, n, r, o) {
                  return {
                    isDragging: !0,
                    isClone: t,
                    isDropAnimating: Boolean(o),
                    dropAnimation: o,
                    mode: e,
                    draggingOver: n,
                    combineWith: r,
                    combineTargetFor: null,
                  }
                }),
                n = Se(function (e, n, r, o, a, i, l) {
                  return {
                    mapped: {
                      type: 'DRAGGING',
                      dropping: null,
                      draggingOver: a,
                      combineWith: i,
                      mode: n,
                      offset: e,
                      dimension: r,
                      forceShouldAnimate: l,
                      snapshot: t(n, o, a, i, null),
                    },
                  }
                })
              return function (r, o) {
                if (r.isDragging) {
                  if (r.critical.draggable.id !== o.draggableId) return null
                  var a = r.current.client.offset,
                    i = r.dimensions.draggables[o.draggableId],
                    l = Xt(r.impact),
                    u =
                      (s = r.impact).at && 'COMBINE' === s.at.type
                        ? s.at.combine.draggableId
                        : null,
                    c = r.forceShouldAnimate
                  return n(e(a.x, a.y), r.movementMode, i, o.isClone, l, u, c)
                }
                var s
                if ('DROP_ANIMATING' === r.phase) {
                  var d = r.completed
                  if (d.result.draggableId !== o.draggableId) return null
                  var f = o.isClone,
                    p = r.dimensions.draggables[o.draggableId],
                    m = d.result,
                    v = m.mode,
                    g = ca(m),
                    h = (function (e) {
                      return e.combine ? e.combine.draggableId : null
                    })(m),
                    b = {
                      duration: r.dropDuration,
                      curve: On,
                      moveTo: r.newHomeClientOffset,
                      opacity: h ? Nn.drop : null,
                      scale: h ? Rn.drop : null,
                    }
                  return {
                    mapped: {
                      type: 'DRAGGING',
                      offset: r.newHomeClientOffset,
                      dimension: p,
                      dropping: b,
                      draggingOver: g,
                      combineWith: h,
                      mode: v,
                      forceShouldAnimate: null,
                      snapshot: t(v, f, g, h, b),
                    },
                  }
                }
                return null
              }
            })(),
            t = (function () {
              var e = Se(function (e, t) {
                  return { x: e, y: t }
                }),
                t = Se(sa),
                n = Se(function (e, n, r) {
                  return (
                    void 0 === n && (n = null),
                    {
                      mapped: {
                        type: 'SECONDARY',
                        offset: e,
                        combineTargetFor: n,
                        shouldAnimateDisplacement: r,
                        snapshot: t(n),
                      },
                    }
                  )
                }),
                r = function (e) {
                  return e ? n(ze, e, !0) : null
                },
                o = function (t, o, a, i) {
                  var l = a.displaced.visible[t],
                    u = Boolean(i.inVirtualList && i.effected[t]),
                    c = st(a),
                    s = c && c.draggableId === t ? o : null
                  if (!l) {
                    if (!u) return r(s)
                    if (a.displaced.invisible[t]) return null
                    var d = We(i.displacedBy.point),
                      f = e(d.x, d.y)
                    return n(f, s, !0)
                  }
                  if (u) return r(s)
                  var p = a.displacedBy.point,
                    m = e(p.x, p.y)
                  return n(m, s, l.shouldAnimate)
                }
              return function (e, t) {
                if (e.isDragging)
                  return e.critical.draggable.id === t.draggableId
                    ? null
                    : o(
                        t.draggableId,
                        e.critical.draggable.id,
                        e.impact,
                        e.afterCritical
                      )
                if ('DROP_ANIMATING' === e.phase) {
                  var n = e.completed
                  return n.result.draggableId === t.draggableId
                    ? null
                    : o(
                        t.draggableId,
                        n.result.draggableId,
                        n.impact,
                        n.afterCritical
                      )
                }
                return null
              }
            })()
          return function (n, r) {
            return e(n, r) || t(n, r) || da
          }
        },
        { dropAnimationFinished: Tn },
        null,
        { context: $r, pure: !0, areStatePropsEqual: ua }
      )(function (e) {
        var n = (0, t.useRef)(null),
          r = ce(function (e) {
            n.current = e
          }, []),
          o = ce(function () {
            return n.current
          }, []),
          a = $o(Jr),
          i = a.contextId,
          l = a.dragHandleUsageInstructionsId,
          u = a.registry,
          c = $o(Jo),
          s = c.type,
          d = c.droppableId,
          f = ue(
            function () {
              return {
                id: e.draggableId,
                index: e.index,
                type: s,
                droppableId: d,
              }
            },
            [e.draggableId, e.index, s, d]
          ),
          p = e.children,
          m = e.draggableId,
          v = e.isEnabled,
          g = e.shouldRespectForcePress,
          h = e.canDragInteractiveElements,
          b = e.isClone,
          y = e.mapped,
          _ = e.dropAnimationFinished
        ia(),
          Zr(),
          b ||
            aa(
              ue(
                function () {
                  return {
                    descriptor: f,
                    registry: u,
                    getDraggableRef: o,
                    canDragInteractiveElements: h,
                    shouldRespectForcePress: g,
                    isEnabled: v,
                  }
                },
                [f, u, o, h, g, v]
              )
            )
        var w = ue(
            function () {
              return v
                ? {
                    tabIndex: 0,
                    role: 'button',
                    'aria-describedby': l,
                    'data-rbd-drag-handle-draggable-id': m,
                    'data-rbd-drag-handle-context-id': i,
                    draggable: !1,
                    onDragStart: la,
                  }
                : null
            },
            [i, l, m, v]
          ),
          x = ce(
            function (e) {
              'DRAGGING' === y.type &&
                y.dropping &&
                'transform' === e.propertyName &&
                _()
            },
            [_, y]
          ),
          S = ue(
            function () {
              var e = oa(y),
                t = 'DRAGGING' === y.type && y.dropping ? x : null
              return {
                innerRef: r,
                draggableProps: {
                  'data-rbd-draggable-context-id': i,
                  'data-rbd-draggable-id': m,
                  style: e,
                  onTransitionEnd: t,
                },
                dragHandleProps: w,
              }
            },
            [i, w, m, y, x, r]
          ),
          k = ue(
            function () {
              return {
                draggableId: f.id,
                type: f.type,
                source: {
                  index: f.index,
                  droppableId: f.droppableId,
                },
              }
            },
            [f.droppableId, f.id, f.index, f.type]
          )
        return p(S, y.snapshot, k)
      })
      function pa(e) {
        return $o(Jo).isUsingCloneFor !== e.draggableId || e.isClone
          ? t.createElement(fa, e)
          : null
      }
      function ma(e) {
        var n = 'boolean' !== typeof e.isDragDisabled || !e.isDragDisabled,
          r = Boolean(e.disableInteractiveElementBlocking),
          o = Boolean(e.shouldRespectForcePress)
        return t.createElement(
          pa,
          a({}, e, {
            isClone: !1,
            isEnabled: n,
            canDragInteractiveElements: r,
            shouldRespectForcePress: o,
          })
        )
      }
      var va = function (e, t) {
          return e === t.droppable.type
        },
        ga = function (e, t) {
          return t.draggables[e.draggable.id]
        }
      var ha = {
          mode: 'standard',
          type: 'DEFAULT',
          direction: 'vertical',
          isDropDisabled: !1,
          isCombineEnabled: !1,
          ignoreContainerClipping: !1,
          renderClone: null,
          getContainerForClone: function () {
            return document.body || De(!1), document.body
          },
        },
        ba = oe(
          function () {
            var e = {
                placeholder: null,
                shouldAnimatePlaceholder: !0,
                snapshot: {
                  isDraggingOver: !1,
                  draggingOverWith: null,
                  draggingFromThisWith: null,
                  isUsingPlaceholder: !1,
                },
                useClone: null,
              },
              t = a({}, e, { shouldAnimatePlaceholder: !1 }),
              n = Se(function (e) {
                return {
                  draggableId: e.id,
                  type: e.type,
                  source: {
                    index: e.index,
                    droppableId: e.droppableId,
                  },
                }
              }),
              r = Se(function (r, o, a, i, l, u) {
                var c = l.descriptor.id
                if (l.descriptor.droppableId === r) {
                  var s = u
                      ? {
                          render: u,
                          dragging: n(l.descriptor),
                        }
                      : null,
                    d = {
                      isDraggingOver: a,
                      draggingOverWith: a ? c : null,
                      draggingFromThisWith: c,
                      isUsingPlaceholder: !0,
                    }
                  return {
                    placeholder: l.placeholder,
                    shouldAnimatePlaceholder: !1,
                    snapshot: d,
                    useClone: s,
                  }
                }
                if (!o) return t
                if (!i) return e
                var f = {
                  isDraggingOver: a,
                  draggingOverWith: c,
                  draggingFromThisWith: null,
                  isUsingPlaceholder: !0,
                }
                return {
                  placeholder: l.placeholder,
                  shouldAnimatePlaceholder: !0,
                  snapshot: f,
                  useClone: null,
                }
              })
            return function (n, o) {
              var a = o.droppableId,
                i = o.type,
                l = !o.isDropDisabled,
                u = o.renderClone
              if (n.isDragging) {
                var c = n.critical
                if (!va(i, c)) return t
                var s = ga(c, n.dimensions),
                  d = Xt(n.impact) === a
                return r(a, l, d, d, s, u)
              }
              if ('DROP_ANIMATING' === n.phase) {
                var f = n.completed
                if (!va(i, f.critical)) return t
                var p = ga(f.critical, n.dimensions)
                return r(a, l, ca(f.result) === a, Xt(f.impact) === a, p, u)
              }
              if ('IDLE' === n.phase && n.completed && !n.shouldFlush) {
                var m = n.completed
                if (!va(i, m.critical)) return t
                var v = Xt(m.impact) === a,
                  g = Boolean(m.impact.at && 'COMBINE' === m.impact.at.type),
                  h = m.critical.droppable.id === a
                return v ? (g ? e : t) : h ? e : t
              }
              return t
            }
          },
          {
            updateViewportMaxScroll: function (e) {
              return {
                type: 'UPDATE_VIEWPORT_MAX_SCROLL',
                payload: e,
              }
            },
          },
          null,
          { context: $r, pure: !0, areStatePropsEqual: ua }
        )(function (e) {
          var n = (0, t.useContext)(Jr)
          n || De(!1)
          var r = n.contextId,
            o = n.isMovementAllowed,
            a = (0, t.useRef)(null),
            i = (0, t.useRef)(null),
            l = e.children,
            u = e.droppableId,
            c = e.type,
            s = e.mode,
            d = e.direction,
            f = e.ignoreContainerClipping,
            p = e.isDropDisabled,
            m = e.isCombineEnabled,
            v = e.snapshot,
            g = e.useClone,
            h = e.updateViewportMaxScroll,
            b = e.getContainerForClone,
            y = ce(function () {
              return a.current
            }, []),
            _ = ce(function (e) {
              a.current = e
            }, []),
            w =
              (ce(function () {
                return i.current
              }, []),
              ce(function (e) {
                i.current = e
              }, []))
          eo()
          var x = ce(
            function () {
              o() && h({ maxScroll: ar() })
            },
            [o, h]
          )
          !(function (e) {
            var n = (0, t.useRef)(null),
              r = $o(Jr),
              o = Kr('droppable'),
              a = r.registry,
              i = r.marshal,
              l = no(e),
              u = ue(
                function () {
                  return {
                    id: e.droppableId,
                    type: e.type,
                    mode: e.mode,
                  }
                },
                [e.droppableId, e.mode, e.type]
              ),
              c = (0, t.useRef)(u),
              s = ue(
                function () {
                  return Se(function (e, t) {
                    n.current || De(!1)
                    var r = { x: e, y: t }
                    i.updateDroppableScroll(u.id, r)
                  })
                },
                [u.id, i]
              ),
              d = ce(function () {
                var e = n.current
                return e && e.env.closestScrollable
                  ? jo(e.env.closestScrollable)
                  : ze
              }, []),
              f = ce(
                function () {
                  var e = d()
                  s(e.x, e.y)
                },
                [d, s]
              ),
              p = ue(
                function () {
                  return ke(f)
                },
                [f]
              ),
              m = ce(
                function () {
                  var e = n.current,
                    t = qo(e)
                  ;(e && t) || De(!1),
                    e.scrollOptions.shouldPublishImmediately ? f() : p()
                },
                [p, f]
              ),
              v = ce(
                function (e, t) {
                  n.current && De(!1)
                  var o = l.current,
                    a = o.getDroppableRef()
                  a || De(!1)
                  var i = Go(a),
                    c = {
                      ref: a,
                      descriptor: u,
                      env: i,
                      scrollOptions: t,
                    }
                  n.current = c
                  var s = Uo({
                      ref: a,
                      descriptor: u,
                      env: i,
                      windowScroll: e,
                      direction: o.direction,
                      isDropDisabled: o.isDropDisabled,
                      isCombineEnabled: o.isCombineEnabled,
                      shouldClipSubject: !o.ignoreContainerClipping,
                    }),
                    d = i.closestScrollable
                  return (
                    d &&
                      (d.setAttribute(Mr.contextId, r.contextId),
                      d.addEventListener('scroll', m, Vo(c.scrollOptions))),
                    s
                  )
                },
                [r.contextId, u, m, l]
              ),
              g = ce(function () {
                var e = n.current,
                  t = qo(e)
                return (e && t) || De(!1), jo(t)
              }, []),
              h = ce(
                function () {
                  var e = n.current
                  e || De(!1)
                  var t = qo(e)
                  ;(n.current = null),
                    t &&
                      (p.cancel(),
                      t.removeAttribute(Mr.contextId),
                      t.removeEventListener('scroll', m, Vo(e.scrollOptions)))
                },
                [m, p]
              ),
              b = ce(function (e) {
                var t = n.current
                t || De(!1)
                var r = qo(t)
                r || De(!1), (r.scrollTop += e.y), (r.scrollLeft += e.x)
              }, []),
              y = ue(
                function () {
                  return {
                    getDimensionAndWatchScroll: v,
                    getScrollWhileDragging: g,
                    dragStopped: h,
                    scroll: b,
                  }
                },
                [h, v, g, b]
              ),
              _ = ue(
                function () {
                  return {
                    uniqueId: o,
                    descriptor: u,
                    callbacks: y,
                  }
                },
                [y, u, o]
              )
            Fr(
              function () {
                return (
                  (c.current = _.descriptor),
                  a.droppable.register(_),
                  function () {
                    n.current && h(), a.droppable.unregister(_)
                  }
                )
              },
              [y, u, h, _, i, a.droppable]
            ),
              Fr(
                function () {
                  n.current &&
                    i.updateDroppableIsEnabled(c.current.id, !e.isDropDisabled)
                },
                [e.isDropDisabled, i]
              ),
              Fr(
                function () {
                  n.current &&
                    i.updateDroppableIsCombineEnabled(
                      c.current.id,
                      e.isCombineEnabled
                    )
                },
                [e.isCombineEnabled, i]
              )
          })({
            droppableId: u,
            type: c,
            mode: s,
            direction: d,
            isDropDisabled: p,
            isCombineEnabled: m,
            ignoreContainerClipping: f,
            getDroppableRef: y,
          })
          var S = t.createElement(
              Zo,
              {
                on: e.placeholder,
                shouldAnimate: e.shouldAnimatePlaceholder,
              },
              function (e) {
                var n = e.onClose,
                  o = e.data,
                  a = e.animate
                return t.createElement(Ko, {
                  placeholder: o,
                  onClose: n,
                  innerRef: w,
                  animate: a,
                  contextId: r,
                  onTransitionEnd: x,
                })
              }
            ),
            k = ue(
              function () {
                return {
                  innerRef: _,
                  placeholder: S,
                  droppableProps: {
                    'data-rbd-droppable-id': u,
                    'data-rbd-droppable-context-id': r,
                  },
                }
              },
              [r, u, S, _]
            ),
            E = g ? g.dragging.draggableId : null,
            I = ue(
              function () {
                return {
                  droppableId: u,
                  type: c,
                  isUsingCloneFor: E,
                }
              },
              [u, E, c]
            )
          return t.createElement(
            Jo.Provider,
            { value: I },
            l(k, v),
            (function () {
              if (!g) return null
              var e = g.dragging,
                n = g.render,
                r = t.createElement(
                  pa,
                  {
                    draggableId: e.draggableId,
                    index: e.source.index,
                    isClone: !0,
                    isEnabled: !0,
                    shouldRespectForcePress: !1,
                    canDragInteractiveElements: !0,
                  },
                  function (t, r) {
                    return n(t, r, e)
                  }
                )
              return ie.createPortal(r, b())
            })()
          )
        })
      ba.defaultProps = ha
      var ya = {
          Square: 'Square_Square__2RdIp',
          highlight: 'Square_highlight__QpaGw',
          tw: 'Square_tw__ElKGP',
          dw: 'Square_dw__ds+Wa',
          dl: 'Square_dl__j6jVw',
          tl: 'Square_tl__BnWS8',
          multiplierText: 'Square_multiplierText__XsgoP',
        },
        _a = 'Tile_tile__CwrXl',
        wa = 'Tile_letter__kGxJc',
        xa = 'Tile_score__C+Qs0',
        Sa = 'Tile_unSelected__1F1Tk',
        ka = {
          a: 1,
          e: 1,
          i: 1,
          l: 1,
          n: 1,
          o: 1,
          r: 1,
          s: 1,
          t: 1,
          u: 1,
          d: 2,
          g: 2,
          b: 3,
          c: 3,
          m: 3,
          p: 3,
          f: 4,
          h: 4,
          v: 4,
          w: 4,
          y: 4,
          k: 5,
          j: 8,
          x: 8,
          q: 10,
          z: 10,
        },
        Ea = n(184),
        Ia = function (e) {
          var t = e.letter,
            n = e.index,
            r = e.id,
            o = e.isDragDisabled,
            a = e.unSelected
          return (0, Ea.jsx)(ma, {
            draggableId: r,
            index: n,
            isDragDisabled: o,
            children: function (e) {
              return (0, Ea.jsxs)(
                'div',
                u(
                  u(
                    u({ ref: e.innerRef }, e.draggableProps),
                    e.dragHandleProps
                  ),
                  {},
                  {
                    className: ''.concat(_a, ' ').concat(a && Sa),
                    children: [
                      (0, Ea.jsx)('div', {
                        className: wa,
                        children: '*' !== t && t,
                      }),
                      (0, Ea.jsx)('span', {
                        className: xa,
                        children: '*' !== t && ka[t],
                      }),
                    ],
                  }
                )
              )
            },
          })
        },
        Ca = {
          0: 'tw',
          1: '',
          2: '',
          3: 'dl',
          4: '',
          5: '',
          6: '',
          7: 'tw',
          8: '',
          9: '',
          10: '',
          11: 'dl',
          12: '',
          13: '',
          14: 'tw',
          15: '',
          16: 'dw',
          17: '',
          18: '',
          19: '',
          20: 'tl',
          21: '',
          22: '',
          23: '',
          24: 'tl',
          25: '',
          26: '',
          27: '',
          28: 'dw',
          29: '',
          30: '',
          31: '',
          32: 'dw',
          33: '',
          34: '',
          35: '',
          36: 'dl',
          37: '',
          38: 'dl',
          39: '',
          40: '',
          41: '',
          42: 'dw',
          43: '',
          44: '',
          45: 'dl',
          46: '',
          47: '',
          48: 'dw',
          49: '',
          50: '',
          51: '',
          52: 'dl',
          53: '',
          54: '',
          55: '',
          56: 'dw',
          57: '',
          58: '',
          59: 'dl',
          60: '',
          61: '',
          62: '',
          63: '',
          64: 'dw',
          65: '',
          66: '',
          67: '',
          68: '',
          69: '',
          70: 'dw',
          71: '',
          72: '',
          73: '',
          74: '',
          75: '',
          76: 'tl',
          77: '',
          78: '',
          79: '',
          80: 'tl',
          81: '',
          82: '',
          83: '',
          84: 'tl',
          85: '',
          86: '',
          87: '',
          88: 'tl',
          89: '',
          90: '',
          91: '',
          92: 'dl',
          93: '',
          94: '',
          95: '',
          96: 'dl',
          97: '',
          98: 'dl',
          99: '',
          100: '',
          101: '',
          102: 'dl',
          103: '',
          104: '',
          105: 'tw',
          106: '',
          107: '',
          108: 'dl',
          109: '',
          110: '',
          111: '',
          112: 'dw',
          113: '',
          114: '',
          115: '',
          116: 'dl',
          117: '',
          118: '',
          119: 'tw',
          120: '',
          121: '',
          122: 'dl',
          123: '',
          124: '',
          125: '',
          126: 'dl',
          127: '',
          128: 'dl',
          129: '',
          130: '',
          131: '',
          132: 'dl',
          133: '',
          134: '',
          135: '',
          136: 'tl',
          137: '',
          138: '',
          139: '',
          140: 'tl',
          141: '',
          142: '',
          143: '',
          144: 'tl',
          145: '',
          146: '',
          147: '',
          148: 'tl',
          149: '',
          150: '',
          151: '',
          152: '',
          153: '',
          154: 'dw',
          155: '',
          156: '',
          157: '',
          158: '',
          159: '',
          160: 'dw',
          161: '',
          162: '',
          163: '',
          164: '',
          165: 'dl',
          166: '',
          167: '',
          168: 'dw',
          169: '',
          170: '',
          171: '',
          172: 'dl',
          173: '',
          174: '',
          175: '',
          176: 'dw',
          177: '',
          178: '',
          179: 'dl',
          180: '',
          181: '',
          182: 'dw',
          183: '',
          184: '',
          185: '',
          186: 'dl',
          187: '',
          188: 'dl',
          189: '',
          190: '',
          191: '',
          192: 'dw',
          193: '',
          194: '',
          195: '',
          196: 'dw',
          197: '',
          198: '',
          199: '',
          200: 'tl',
          201: '',
          202: '',
          203: '',
          204: 'tl',
          205: '',
          206: '',
          207: '',
          208: 'dw',
          209: '',
          210: 'tw',
          211: '',
          212: '',
          213: 'dl',
          214: '',
          215: '',
          216: '',
          217: 'tw',
          218: '',
          219: '',
          220: '',
          221: 'dl',
          222: '',
          223: '',
          224: 'tw',
        },
        Pa = {
          tw: 'triple word',
          dw: 'double word',
          tl: 'triple letter',
          dl: 'double letter',
        },
        Aa = function (e) {
          var t = e.tile,
            n = e.index,
            r = Ca[n.toString()]
          return (0, Ea.jsx)(ba, {
            droppableId: n.toString(),
            isDropDisabled: Boolean(t.letter),
            children: function (e, n) {
              return (0, Ea.jsxs)(
                'div',
                u(
                  u({ ref: e.innerRef }, e.droppableProps),
                  {},
                  {
                    className: ''
                      .concat(ya.Square, ' ')
                      .concat(n.isDraggingOver ? ya.highlight : '', ' ')
                      .concat(ya[r]),
                    children: [
                      (0, Ea.jsx)('div', {
                        className: ya.multiplierText,
                        children: Pa[r],
                      }),
                      t.letter &&
                        t.id &&
                        (0, Ea.jsx)(Ia, {
                          letter: t.letter,
                          id: t.id,
                          index: 0,
                          isDragDisabled: t.fixed,
                        }),
                      e.placeholder,
                    ],
                  }
                )
              )
            },
          })
        },
        Da = 'Board_Board_container__HuTig',
        Ta = 'Board_outer_container__efLXk',
        Oa = 'Board_flexWrapper__Bk2uz',
        Na = 'Board_vertical_label__MI6lQ',
        Ra = 'Board_vertical_label_container__6PFg0',
        La = 'Board_horizontal_label__9RvH6',
        Ma = 'Board_horizontal_label_container__GNgib',
        Ba = 'Board_rackWrapper__u0J+H',
        Fa = 'Board_buttonPanel__HL+CB',
        ja = 'Board_tooltipWrapper__oGojS',
        za = 'Board_tooltip__vL0PO',
        Ga = 'Board_button__XWVun',
        Ua = {
          Rack: 'Rack_Rack__SquIw',
          cursorPointer: 'Rack_cursorPointer__rupiH',
        },
        Ha = n(248),
        Wa = n(327)
      var Va = function (e) {
          e()
        },
        $a = t.createContext(null)
      function qa() {
        return (0, t.useContext)($a)
      }
      var Qa = function () {
          throw new Error('uSES not initialized!')
        },
        Xa = Qa,
        Ya = function (e, t) {
          return e === t
        }
      function Ka() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : $a,
          n =
            e === $a
              ? qa
              : function () {
                  return (0, t.useContext)(e)
                }
        return function (e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ya
          var o = n(),
            a = o.store,
            i = o.subscription,
            l = o.getServerState,
            u = Xa(i.addNestedSub, a.getState, l || a.getState, e, r)
          return (0, t.useDebugValue)(u), u
        }
      }
      var Ja = Ka()
      n(900)
      function Za() {
        var e = Va,
          t = null,
          n = null
        return {
          clear: function () {
            ;(t = null), (n = null)
          },
          notify: function () {
            e(function () {
              for (var e = t; e; ) e.callback(), (e = e.next)
            })
          },
          get: function () {
            for (var e = [], n = t; n; ) e.push(n), (n = n.next)
            return e
          },
          subscribe: function (e) {
            var r = !0,
              o = (n = { callback: e, next: null, prev: n })
            return (
              o.prev ? (o.prev.next = o) : (t = o),
              function () {
                r &&
                  null !== t &&
                  ((r = !1),
                  o.next ? (o.next.prev = o.prev) : (n = o.prev),
                  o.prev ? (o.prev.next = o.next) : (t = o.next))
              }
            )
          },
        }
      }
      var ei = {
        notify: function () {},
        get: function () {
          return []
        },
      }
      var ti = !(
        'undefined' === typeof window ||
        'undefined' === typeof window.document ||
        'undefined' === typeof window.document.createElement
      )
        ? t.useLayoutEffect
        : t.useEffect
      var ni = function (e) {
        var n = e.store,
          r = e.context,
          o = e.children,
          a = e.serverState,
          i = (0, t.useMemo)(
            function () {
              var e = (function (e, t) {
                var n,
                  r = ei
                function o() {
                  i.onStateChange && i.onStateChange()
                }
                function a() {
                  n ||
                    ((n = t ? t.addNestedSub(o) : e.subscribe(o)), (r = Za()))
                }
                var i = {
                  addNestedSub: function (e) {
                    return a(), r.subscribe(e)
                  },
                  notifyNestedSubs: function () {
                    r.notify()
                  },
                  handleChangeWrapper: o,
                  isSubscribed: function () {
                    return Boolean(n)
                  },
                  trySubscribe: a,
                  tryUnsubscribe: function () {
                    n && (n(), (n = void 0), r.clear(), (r = ei))
                  },
                  getListeners: function () {
                    return r
                  },
                }
                return i
              })(n)
              return {
                store: n,
                subscription: e,
                getServerState: a
                  ? function () {
                      return a
                    }
                  : void 0,
              }
            },
            [n, a]
          ),
          l = (0, t.useMemo)(
            function () {
              return n.getState()
            },
            [n]
          )
        ti(
          function () {
            var e = i.subscription
            return (
              (e.onStateChange = e.notifyNestedSubs),
              e.trySubscribe(),
              l !== n.getState() && e.notifyNestedSubs(),
              function () {
                e.tryUnsubscribe(), (e.onStateChange = void 0)
              }
            )
          },
          [i, l]
        )
        var u = r || $a
        return t.createElement(u.Provider, { value: i }, o)
      }
      function ri() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : $a,
          n =
            e === $a
              ? qa
              : function () {
                  return (0, t.useContext)(e)
                }
        return function () {
          return n().store
        }
      }
      var oi = ri()
      function ai() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : $a,
          t = e === $a ? oi : ri(e)
        return function () {
          return t().dispatch
        }
      }
      var ii = ai()
      !(function (e) {
        Xa = e
      })(Wa.useSyncExternalStoreWithSelector),
        (function (e) {
          e
        })(Ha.useSyncExternalStore),
        (function (e) {
          Va = e
        })(ie.unstable_batchedUpdates)
      var li = Ja
      function ui() {
        var e = li(function (e) {
          return e.game.rack
        })
        return (0, Ea.jsx)('div', {
          className: Ua.rackWrapper,
          children: (0, Ea.jsx)(ba, {
            droppableId: 'rack',
            direction: 'horizontal',
            children: function (t) {
              return (0, Ea.jsxs)(
                'div',
                u(
                  u({ ref: t.innerRef }, t.droppableProps),
                  {},
                  {
                    className: Ua.Rack,
                    children: [
                      e.map(function (e, t) {
                        return (0,
                        Ea.jsx)(Ia, { letter: e.letter, index: t, id: e.id, isDragDisabled: !1 }, e.id)
                      }),
                      t.placeholder,
                    ],
                  }
                )
              )
            },
          }),
        })
      }
      function ci(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
        return r
      }
      function si(e, t) {
        if (e) {
          if ('string' === typeof e) return ci(e, t)
          var n = Object.prototype.toString.call(e).slice(8, -1)
          return (
            'Object' === n && e.constructor && (n = e.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(e)
              : 'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? ci(e, t)
              : void 0
          )
        }
      }
      function di(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return ci(e)
          })(e) ||
          (function (e) {
            if (
              ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e)
          })(e) ||
          si(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          })()
        )
      }
      var fi = function (e) {
        var t = e.setSelectedTiles,
          n = e.selectedTiles,
          r = li(function (e) {
            return e.game.rack
          })
        return (0, Ea.jsx)('div', {
          className: Ua.rackWrapper,
          children: (0, Ea.jsx)(ba, {
            droppableId: 'rack',
            direction: 'horizontal',
            children: function (e) {
              return (0, Ea.jsxs)(
                'div',
                u(
                  u({ ref: e.innerRef }, e.droppableProps),
                  {},
                  {
                    className: Ua.Rack,
                    children: [
                      r.map(function (e, r) {
                        return (0, Ea.jsx)(
                          'div',
                          {
                            onClick: function () {
                              return t(function (t) {
                                return t.includes(e.id)
                                  ? t.filter(function (t) {
                                      return e.id !== t
                                    })
                                  : [].concat(di(t), [e.id])
                              })
                            },
                            className: Ua.cursorPointer,
                            children: (0, Ea.jsx)(
                              Ia,
                              {
                                letter: e.letter,
                                index: r,
                                id: e.id,
                                isDragDisabled: !0,
                                unSelected: !n.includes(e.id),
                              },
                              e.id
                            ),
                          },
                          e.id
                        )
                      }),
                      e.placeholder,
                    ],
                  }
                )
              )
            },
          }),
        })
      }
      function pi(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e
          })(e) ||
          (function (e, t) {
            var n =
              null == e
                ? null
                : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
                  e['@@iterator']
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                l = !1
              try {
                for (
                  n = n.call(e);
                  !(i = (r = n.next()).done) &&
                  (a.push(r.value), !t || a.length !== t);
                  i = !0
                );
              } catch (u) {
                ;(l = !0), (o = u)
              } finally {
                try {
                  i || null == n.return || n.return()
                } finally {
                  if (l) throw o
                }
              }
              return a
            }
          })(e, t) ||
          si(e, t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          })()
        )
      }
      var mi = n(845)
      function vi(e) {
        for (
          var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r]
        throw Error(
          '[Immer] minified error nr: ' +
            e +
            (n.length
              ? ' ' +
                n
                  .map(function (e) {
                    return "'" + e + "'"
                  })
                  .join(',')
              : '') +
            '. Find the full error at: https://bit.ly/3cXEKWf'
        )
      }
      function gi(e) {
        return !!e && !!e[al]
      }
      function hi(e) {
        return (
          !!e &&
          ((function (e) {
            if (!e || 'object' != typeof e) return !1
            var t = Object.getPrototypeOf(e)
            if (null === t) return !0
            var n =
              Object.hasOwnProperty.call(t, 'constructor') && t.constructor
            return (
              n === Object ||
              ('function' == typeof n && Function.toString.call(n) === il)
            )
          })(e) ||
            Array.isArray(e) ||
            !!e[ol] ||
            !!e.constructor[ol] ||
            ki(e) ||
            Ei(e))
        )
      }
      function bi(e, t, n) {
        void 0 === n && (n = !1),
          0 === yi(e)
            ? (n ? Object.keys : ll)(e).forEach(function (r) {
                ;(n && 'symbol' == typeof r) || t(r, e[r], e)
              })
            : e.forEach(function (n, r) {
                return t(r, n, e)
              })
      }
      function yi(e) {
        var t = e[al]
        return t
          ? t.i > 3
            ? t.i - 4
            : t.i
          : Array.isArray(e)
          ? 1
          : ki(e)
          ? 2
          : Ei(e)
          ? 3
          : 0
      }
      function _i(e, t) {
        return 2 === yi(e)
          ? e.has(t)
          : Object.prototype.hasOwnProperty.call(e, t)
      }
      function wi(e, t) {
        return 2 === yi(e) ? e.get(t) : e[t]
      }
      function xi(e, t, n) {
        var r = yi(e)
        2 === r ? e.set(t, n) : 3 === r ? (e.delete(t), e.add(n)) : (e[t] = n)
      }
      function Si(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
      }
      function ki(e) {
        return el && e instanceof Map
      }
      function Ei(e) {
        return tl && e instanceof Set
      }
      function Ii(e) {
        return e.o || e.t
      }
      function Ci(e) {
        if (Array.isArray(e)) return Array.prototype.slice.call(e)
        var t = ul(e)
        delete t[al]
        for (var n = ll(t), r = 0; r < n.length; r++) {
          var o = n[r],
            a = t[o]
          !1 === a.writable && ((a.writable = !0), (a.configurable = !0)),
            (a.get || a.set) &&
              (t[o] = {
                configurable: !0,
                writable: !0,
                enumerable: a.enumerable,
                value: e[o],
              })
        }
        return Object.create(Object.getPrototypeOf(e), t)
      }
      function Pi(e, t) {
        return (
          void 0 === t && (t = !1),
          Di(e) ||
            gi(e) ||
            !hi(e) ||
            (yi(e) > 1 && (e.set = e.add = e.clear = e.delete = Ai),
            Object.freeze(e),
            t &&
              bi(
                e,
                function (e, t) {
                  return Pi(t, !0)
                },
                !0
              )),
          e
        )
      }
      function Ai() {
        vi(2)
      }
      function Di(e) {
        return null == e || 'object' != typeof e || Object.isFrozen(e)
      }
      function Ti(e) {
        var t = cl[e]
        return t || vi(18, e), t
      }
      function Oi(e, t) {
        cl[e] || (cl[e] = t)
      }
      function Ni() {
        return Ji
      }
      function Ri(e, t) {
        t && (Ti('Patches'), (e.u = []), (e.s = []), (e.v = t))
      }
      function Li(e) {
        Mi(e), e.p.forEach(Fi), (e.p = null)
      }
      function Mi(e) {
        e === Ji && (Ji = e.l)
      }
      function Bi(e) {
        return (Ji = { p: [], l: Ji, h: e, m: !0, _: 0 })
      }
      function Fi(e) {
        var t = e[al]
        0 === t.i || 1 === t.i ? t.j() : (t.O = !0)
      }
      function ji(e, t) {
        t._ = t.p.length
        var n = t.p[0],
          r = void 0 !== e && e !== n
        return (
          t.h.g || Ti('ES5').S(t, e, r),
          r
            ? (n[al].P && (Li(t), vi(4)),
              hi(e) && ((e = zi(t, e)), t.l || Ui(t, e)),
              t.u && Ti('Patches').M(n[al].t, e, t.u, t.s))
            : (e = zi(t, n, [])),
          Li(t),
          t.u && t.v(t.u, t.s),
          e !== rl ? e : void 0
        )
      }
      function zi(e, t, n) {
        if (Di(t)) return t
        var r = t[al]
        if (!r)
          return (
            bi(
              t,
              function (o, a) {
                return Gi(e, r, t, o, a, n)
              },
              !0
            ),
            t
          )
        if (r.A !== e) return t
        if (!r.P) return Ui(e, r.t, !0), r.t
        if (!r.I) {
          ;(r.I = !0), r.A._--
          var o = 4 === r.i || 5 === r.i ? (r.o = Ci(r.k)) : r.o
          bi(3 === r.i ? new Set(o) : o, function (t, a) {
            return Gi(e, r, o, t, a, n)
          }),
            Ui(e, o, !1),
            n && e.u && Ti('Patches').R(r, n, e.u, e.s)
        }
        return r.o
      }
      function Gi(e, t, n, r, o, a) {
        if (gi(o)) {
          var i = zi(
            e,
            o,
            a && t && 3 !== t.i && !_i(t.D, r) ? a.concat(r) : void 0
          )
          if ((xi(n, r, i), !gi(i))) return
          e.m = !1
        }
        if (hi(o) && !Di(o)) {
          if (!e.h.F && e._ < 1) return
          zi(e, o), (t && t.A.l) || Ui(e, o)
        }
      }
      function Ui(e, t, n) {
        void 0 === n && (n = !1), e.h.F && e.m && Pi(t, n)
      }
      function Hi(e, t) {
        var n = e[al]
        return (n ? Ii(n) : e)[t]
      }
      function Wi(e, t) {
        if (t in e)
          for (var n = Object.getPrototypeOf(e); n; ) {
            var r = Object.getOwnPropertyDescriptor(n, t)
            if (r) return r
            n = Object.getPrototypeOf(n)
          }
      }
      function Vi(e) {
        e.P || ((e.P = !0), e.l && Vi(e.l))
      }
      function $i(e) {
        e.o || (e.o = Ci(e.t))
      }
      function qi(e, t, n) {
        var r = ki(t)
          ? Ti('MapSet').N(t, n)
          : Ei(t)
          ? Ti('MapSet').T(t, n)
          : e.g
          ? (function (e, t) {
              var n = Array.isArray(e),
                r = {
                  i: n ? 1 : 0,
                  A: t ? t.A : Ni(),
                  P: !1,
                  I: !1,
                  D: {},
                  l: t,
                  t: e,
                  k: null,
                  o: null,
                  j: null,
                  C: !1,
                },
                o = r,
                a = sl
              n && ((o = [r]), (a = dl))
              var i = Proxy.revocable(o, a),
                l = i.revoke,
                u = i.proxy
              return (r.k = u), (r.j = l), u
            })(t, n)
          : Ti('ES5').J(t, n)
        return (n ? n.A : Ni()).p.push(r), r
      }
      function Qi(e) {
        return (
          gi(e) || vi(22, e),
          (function e(t) {
            if (!hi(t)) return t
            var n,
              r = t[al],
              o = yi(t)
            if (r) {
              if (!r.P && (r.i < 4 || !Ti('ES5').K(r))) return r.t
              ;(r.I = !0), (n = Xi(t, o)), (r.I = !1)
            } else n = Xi(t, o)
            return (
              bi(n, function (t, o) {
                ;(r && wi(r.t, t) === o) || xi(n, t, e(o))
              }),
              3 === o ? new Set(n) : n
            )
          })(e)
        )
      }
      function Xi(e, t) {
        switch (t) {
          case 2:
            return new Map(e)
          case 3:
            return Array.from(e)
        }
        return Ci(e)
      }
      function Yi() {
        function e(e, t) {
          var n = o[e]
          return (
            n
              ? (n.enumerable = t)
              : (o[e] = n =
                  {
                    configurable: !0,
                    enumerable: t,
                    get: function () {
                      var t = this[al]
                      return sl.get(t, e)
                    },
                    set: function (t) {
                      var n = this[al]
                      sl.set(n, e, t)
                    },
                  }),
            n
          )
        }
        function t(e) {
          for (var t = e.length - 1; t >= 0; t--) {
            var o = e[t][al]
            if (!o.P)
              switch (o.i) {
                case 5:
                  r(o) && Vi(o)
                  break
                case 4:
                  n(o) && Vi(o)
              }
          }
        }
        function n(e) {
          for (var t = e.t, n = e.k, r = ll(n), o = r.length - 1; o >= 0; o--) {
            var a = r[o]
            if (a !== al) {
              var i = t[a]
              if (void 0 === i && !_i(t, a)) return !0
              var l = n[a],
                u = l && l[al]
              if (u ? u.t !== i : !Si(l, i)) return !0
            }
          }
          var c = !!t[al]
          return r.length !== ll(t).length + (c ? 0 : 1)
        }
        function r(e) {
          var t = e.k
          if (t.length !== e.t.length) return !0
          var n = Object.getOwnPropertyDescriptor(t, t.length - 1)
          if (n && !n.get) return !0
          for (var r = 0; r < t.length; r++) if (!t.hasOwnProperty(r)) return !0
          return !1
        }
        var o = {}
        Oi('ES5', {
          J: function (t, n) {
            var r = Array.isArray(t),
              o = (function (t, n) {
                if (t) {
                  for (var r = Array(n.length), o = 0; o < n.length; o++)
                    Object.defineProperty(r, '' + o, e(o, !0))
                  return r
                }
                var a = ul(n)
                delete a[al]
                for (var i = ll(a), l = 0; l < i.length; l++) {
                  var u = i[l]
                  a[u] = e(u, t || !!a[u].enumerable)
                }
                return Object.create(Object.getPrototypeOf(n), a)
              })(r, t),
              a = {
                i: r ? 5 : 4,
                A: n ? n.A : Ni(),
                P: !1,
                I: !1,
                D: {},
                l: n,
                t: t,
                k: o,
                o: null,
                O: !1,
                C: !1,
              }
            return (
              Object.defineProperty(o, al, {
                value: a,
                writable: !0,
              }),
              o
            )
          },
          S: function (e, n, o) {
            o
              ? gi(n) && n[al].A === e && t(e.p)
              : (e.u &&
                  (function e(t) {
                    if (t && 'object' == typeof t) {
                      var n = t[al]
                      if (n) {
                        var o = n.t,
                          a = n.k,
                          i = n.D,
                          l = n.i
                        if (4 === l)
                          bi(a, function (t) {
                            t !== al &&
                              (void 0 !== o[t] || _i(o, t)
                                ? i[t] || e(a[t])
                                : ((i[t] = !0), Vi(n)))
                          }),
                            bi(o, function (e) {
                              void 0 !== a[e] ||
                                _i(a, e) ||
                                ((i[e] = !1), Vi(n))
                            })
                        else if (5 === l) {
                          if (
                            (r(n) && (Vi(n), (i.length = !0)),
                            a.length < o.length)
                          )
                            for (var u = a.length; u < o.length; u++) i[u] = !1
                          else
                            for (var c = o.length; c < a.length; c++) i[c] = !0
                          for (
                            var s = Math.min(a.length, o.length), d = 0;
                            d < s;
                            d++
                          )
                            a.hasOwnProperty(d) || (i[d] = !0),
                              void 0 === i[d] && e(a[d])
                        }
                      }
                    }
                  })(e.p[0]),
                t(e.p))
          },
          K: function (e) {
            return 4 === e.i ? n(e) : r(e)
          },
        })
      }
      var Ki,
        Ji,
        Zi = 'undefined' != typeof Symbol && 'symbol' == typeof Symbol('x'),
        el = 'undefined' != typeof Map,
        tl = 'undefined' != typeof Set,
        nl =
          'undefined' != typeof Proxy &&
          void 0 !== Proxy.revocable &&
          'undefined' != typeof Reflect,
        rl = Zi
          ? Symbol.for('immer-nothing')
          : (((Ki = {})['immer-nothing'] = !0), Ki),
        ol = Zi ? Symbol.for('immer-draftable') : '__$immer_draftable',
        al = Zi ? Symbol.for('immer-state') : '__$immer_state',
        il =
          ('undefined' != typeof Symbol && Symbol.iterator,
          '' + Object.prototype.constructor),
        ll =
          'undefined' != typeof Reflect && Reflect.ownKeys
            ? Reflect.ownKeys
            : void 0 !== Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                )
              }
            : Object.getOwnPropertyNames,
        ul =
          Object.getOwnPropertyDescriptors ||
          function (e) {
            var t = {}
            return (
              ll(e).forEach(function (n) {
                t[n] = Object.getOwnPropertyDescriptor(e, n)
              }),
              t
            )
          },
        cl = {},
        sl = {
          get: function (e, t) {
            if (t === al) return e
            var n = Ii(e)
            if (!_i(n, t))
              return (function (e, t, n) {
                var r,
                  o = Wi(t, n)
                return o
                  ? 'value' in o
                    ? o.value
                    : null === (r = o.get) || void 0 === r
                    ? void 0
                    : r.call(e.k)
                  : void 0
              })(e, n, t)
            var r = n[t]
            return e.I || !hi(r)
              ? r
              : r === Hi(e.t, t)
              ? ($i(e), (e.o[t] = qi(e.A.h, r, e)))
              : r
          },
          has: function (e, t) {
            return t in Ii(e)
          },
          ownKeys: function (e) {
            return Reflect.ownKeys(Ii(e))
          },
          set: function (e, t, n) {
            var r = Wi(Ii(e), t)
            if (null == r ? void 0 : r.set) return r.set.call(e.k, n), !0
            if (!e.P) {
              var o = Hi(Ii(e), t),
                a = null == o ? void 0 : o[al]
              if (a && a.t === n) return (e.o[t] = n), (e.D[t] = !1), !0
              if (Si(n, o) && (void 0 !== n || _i(e.t, t))) return !0
              $i(e), Vi(e)
            }
            return (
              (e.o[t] === n &&
                'number' != typeof n &&
                (void 0 !== n || t in e.o)) ||
              ((e.o[t] = n), (e.D[t] = !0), !0)
            )
          },
          deleteProperty: function (e, t) {
            return (
              void 0 !== Hi(e.t, t) || t in e.t
                ? ((e.D[t] = !1), $i(e), Vi(e))
                : delete e.D[t],
              e.o && delete e.o[t],
              !0
            )
          },
          getOwnPropertyDescriptor: function (e, t) {
            var n = Ii(e),
              r = Reflect.getOwnPropertyDescriptor(n, t)
            return r
              ? {
                  writable: !0,
                  configurable: 1 !== e.i || 'length' !== t,
                  enumerable: r.enumerable,
                  value: n[t],
                }
              : r
          },
          defineProperty: function () {
            vi(11)
          },
          getPrototypeOf: function (e) {
            return Object.getPrototypeOf(e.t)
          },
          setPrototypeOf: function () {
            vi(12)
          },
        },
        dl = {}
      bi(sl, function (e, t) {
        dl[e] = function () {
          return (arguments[0] = arguments[0][0]), t.apply(this, arguments)
        }
      }),
        (dl.deleteProperty = function (e, t) {
          return dl.set.call(this, e, t, void 0)
        }),
        (dl.set = function (e, t, n) {
          return sl.set.call(this, e[0], t, n, e[0])
        })
      var fl = (function () {
          function e(e) {
            var t = this
            ;(this.g = nl),
              (this.F = !0),
              (this.produce = function (e, n, r) {
                if ('function' == typeof e && 'function' != typeof n) {
                  var o = n
                  n = e
                  var a = t
                  return function (e) {
                    var t = this
                    void 0 === e && (e = o)
                    for (
                      var r = arguments.length,
                        i = Array(r > 1 ? r - 1 : 0),
                        l = 1;
                      l < r;
                      l++
                    )
                      i[l - 1] = arguments[l]
                    return a.produce(e, function (e) {
                      var r
                      return (r = n).call.apply(r, [t, e].concat(i))
                    })
                  }
                }
                var i
                if (
                  ('function' != typeof n && vi(6),
                  void 0 !== r && 'function' != typeof r && vi(7),
                  hi(e))
                ) {
                  var l = Bi(t),
                    u = qi(t, e, void 0),
                    c = !0
                  try {
                    ;(i = n(u)), (c = !1)
                  } finally {
                    c ? Li(l) : Mi(l)
                  }
                  return 'undefined' != typeof Promise && i instanceof Promise
                    ? i.then(
                        function (e) {
                          return Ri(l, r), ji(e, l)
                        },
                        function (e) {
                          throw (Li(l), e)
                        }
                      )
                    : (Ri(l, r), ji(i, l))
                }
                if (!e || 'object' != typeof e) {
                  if (
                    (void 0 === (i = n(e)) && (i = e),
                    i === rl && (i = void 0),
                    t.F && Pi(i, !0),
                    r)
                  ) {
                    var s = [],
                      d = []
                    Ti('Patches').M(e, i, s, d), r(s, d)
                  }
                  return i
                }
                vi(21, e)
              }),
              (this.produceWithPatches = function (e, n) {
                if ('function' == typeof e)
                  return function (n) {
                    for (
                      var r = arguments.length,
                        o = Array(r > 1 ? r - 1 : 0),
                        a = 1;
                      a < r;
                      a++
                    )
                      o[a - 1] = arguments[a]
                    return t.produceWithPatches(n, function (t) {
                      return e.apply(void 0, [t].concat(o))
                    })
                  }
                var r,
                  o,
                  a = t.produce(e, n, function (e, t) {
                    ;(r = e), (o = t)
                  })
                return 'undefined' != typeof Promise && a instanceof Promise
                  ? a.then(function (e) {
                      return [e, r, o]
                    })
                  : [a, r, o]
              }),
              'boolean' == typeof (null == e ? void 0 : e.useProxies) &&
                this.setUseProxies(e.useProxies),
              'boolean' == typeof (null == e ? void 0 : e.autoFreeze) &&
                this.setAutoFreeze(e.autoFreeze)
          }
          var t = e.prototype
          return (
            (t.createDraft = function (e) {
              hi(e) || vi(8), gi(e) && (e = Qi(e))
              var t = Bi(this),
                n = qi(this, e, void 0)
              return (n[al].C = !0), Mi(t), n
            }),
            (t.finishDraft = function (e, t) {
              var n = (e && e[al]).A
              return Ri(n, t), ji(void 0, n)
            }),
            (t.setAutoFreeze = function (e) {
              this.F = e
            }),
            (t.setUseProxies = function (e) {
              e && !nl && vi(20), (this.g = e)
            }),
            (t.applyPatches = function (e, t) {
              var n
              for (n = t.length - 1; n >= 0; n--) {
                var r = t[n]
                if (0 === r.path.length && 'replace' === r.op) {
                  e = r.value
                  break
                }
              }
              n > -1 && (t = t.slice(n + 1))
              var o = Ti('Patches').$
              return gi(e)
                ? o(e, t)
                : this.produce(e, function (e) {
                    return o(e, t)
                  })
            }),
            e
          )
        })(),
        pl = new fl(),
        ml = pl.produce,
        vl =
          (pl.produceWithPatches.bind(pl),
          pl.setAutoFreeze.bind(pl),
          pl.setUseProxies.bind(pl),
          pl.applyPatches.bind(pl),
          pl.createDraft.bind(pl),
          pl.finishDraft.bind(pl),
          ml)
      function gl(e) {
        return function (t) {
          var n = t.dispatch,
            r = t.getState
          return function (t) {
            return function (o) {
              return 'function' === typeof o ? o(n, r, e) : t(o)
            }
          }
        }
      }
      var hl = gl()
      hl.withExtraArgument = gl
      var bl = hl,
        yl = (function () {
          var e = function (t, n) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t
                  }) ||
                function (e, t) {
                  for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }),
              e(t, n)
            )
          }
          return function (t, n) {
            if ('function' !== typeof n && null !== n)
              throw new TypeError(
                'Class extends value ' +
                  String(n) +
                  ' is not a constructor or null'
              )
            function r() {
              this.constructor = t
            }
            e(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((r.prototype = n.prototype), new r()))
          }
        })(),
        _l = function (e, t) {
          for (var n = 0, r = t.length, o = e.length; n < r; n++, o++)
            e[o] = t[n]
          return e
        },
        wl = Object.defineProperty,
        xl =
          (Object.defineProperties,
          Object.getOwnPropertyDescriptors,
          Object.getOwnPropertySymbols),
        Sl = Object.prototype.hasOwnProperty,
        kl = Object.prototype.propertyIsEnumerable,
        El = function (e, t, n) {
          return t in e
            ? wl(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: n,
              })
            : (e[t] = n)
        },
        Il = function (e, t) {
          for (var n in t || (t = {})) Sl.call(t, n) && El(e, n, t[n])
          if (xl)
            for (var r = 0, o = xl(t); r < o.length; r++) {
              n = o[r]
              kl.call(t, n) && El(e, n, t[n])
            }
          return e
        },
        Cl =
          'undefined' !== typeof window &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : function () {
                if (0 !== arguments.length)
                  return 'object' === typeof arguments[0]
                    ? b
                    : b.apply(null, arguments)
              }
      'undefined' !== typeof window &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__
      function Pl(e) {
        if ('object' !== typeof e || null === e) return !1
        var t = Object.getPrototypeOf(e)
        if (null === t) return !0
        for (var n = t; null !== Object.getPrototypeOf(n); )
          n = Object.getPrototypeOf(n)
        return t === n
      }
      var Al = (function (e) {
        function t() {
          for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r]
          var o = e.apply(this, n) || this
          return Object.setPrototypeOf(o, t.prototype), o
        }
        return (
          yl(t, e),
          Object.defineProperty(t, Symbol.species, {
            get: function () {
              return t
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.concat = function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n]
            return e.prototype.concat.apply(this, t)
          }),
          (t.prototype.prepend = function () {
            for (var e = [], n = 0; n < arguments.length; n++)
              e[n] = arguments[n]
            return 1 === e.length && Array.isArray(e[0])
              ? new (t.bind.apply(t, _l([void 0], e[0].concat(this))))()
              : new (t.bind.apply(t, _l([void 0], e.concat(this))))()
          }),
          t
        )
      })(Array)
      function Dl() {
        return function (e) {
          return (function (e) {
            void 0 === e && (e = {})
            var t = e.thunk,
              n = void 0 === t || t,
              r = (e.immutableCheck, e.serializableCheck, new Al())
            n &&
              (!(function (e) {
                return 'boolean' === typeof e
              })(n)
                ? r.push(bl.withExtraArgument(n.extraArgument))
                : r.push(bl))
            0
            return r
          })(e)
        }
      }
      function Tl(e, t) {
        function n() {
          for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r]
          if (t) {
            var o = t.apply(void 0, n)
            if (!o) throw new Error('prepareAction did not return an object')
            return Il(
              Il(
                { type: e, payload: o.payload },
                'meta' in o && { meta: o.meta }
              ),
              'error' in o && { error: o.error }
            )
          }
          return { type: e, payload: n[0] }
        }
        return (
          (n.toString = function () {
            return '' + e
          }),
          (n.type = e),
          (n.match = function (t) {
            return t.type === e
          }),
          n
        )
      }
      function Ol(e) {
        var t,
          n = {},
          r = [],
          o = {
            addCase: function (e, t) {
              var r = 'string' === typeof e ? e : e.type
              if (r in n)
                throw new Error(
                  'addCase cannot be called with two reducers for the same action type'
                )
              return (n[r] = t), o
            },
            addMatcher: function (e, t) {
              return r.push({ matcher: e, reducer: t }), o
            },
            addDefaultCase: function (e) {
              return (t = e), o
            },
          }
        return e(o), [n, r, t]
      }
      Object.assign
      var Nl = 'listenerMiddleware'
      Tl(Nl + '/add'), Tl(Nl + '/removeAll'), Tl(Nl + '/remove')
      Yi()
      var Rl = [
          { letter: 'a', id: 'a1' },
          { letter: 'a', id: 'a2' },
          { letter: 'a', id: 'a3' },
          { letter: 'a', id: 'a4' },
          { letter: 'a', id: 'a5' },
          { letter: 'a', id: 'a6' },
          { letter: 'a', id: 'a7' },
          { letter: 'a', id: 'a8' },
          { letter: 'a', id: 'a9' },
          { letter: 'b', id: 'b1' },
          { letter: 'b', id: 'b2' },
          { letter: 'c', id: 'c1' },
          { letter: 'c', id: 'c2' },
          { letter: 'd', id: 'd1' },
          { letter: 'd', id: 'd2' },
          { letter: 'd', id: 'd3' },
          { letter: 'd', id: 'd4' },
          { letter: 'e', id: 'e1' },
          { letter: 'e', id: 'e2' },
          { letter: 'e', id: 'e3' },
          { letter: 'e', id: 'e4' },
          { letter: 'e', id: 'e5' },
          { letter: 'e', id: 'e6' },
          { letter: 'e', id: 'e7' },
          { letter: 'e', id: 'e8' },
          { letter: 'e', id: 'e9' },
          { letter: 'e', id: 'e10' },
          { letter: 'e', id: 'e11' },
          { letter: 'e', id: 'e12' },
          { letter: 'f', id: 'f1' },
          { letter: 'f', id: 'f2' },
          { letter: 'g', id: 'g1' },
          { letter: 'g', id: 'g2' },
          { letter: 'g', id: 'g3' },
          { letter: 'h', id: 'h1' },
          { letter: 'h', id: 'h2' },
          { letter: 'i', id: 'i1' },
          { letter: 'i', id: 'i2' },
          { letter: 'i', id: 'i3' },
          { letter: 'i', id: 'i4' },
          { letter: 'i', id: 'i5' },
          { letter: 'i', id: 'i6' },
          { letter: 'i', id: 'i7' },
          { letter: 'i', id: 'i8' },
          { letter: 'i', id: 'i9' },
          { letter: 'j', id: 'j1' },
          { letter: 'k', id: 'k1' },
          { letter: 'l', id: 'l1' },
          { letter: 'l', id: 'l2' },
          { letter: 'l', id: 'l3' },
          { letter: 'l', id: 'l4' },
          { letter: 'm', id: 'm1' },
          { letter: 'm', id: 'm2' },
          { letter: 'n', id: 'n1' },
          { letter: 'n', id: 'n2' },
          { letter: 'n', id: 'n3' },
          { letter: 'n', id: 'n4' },
          { letter: 'n', id: 'n5' },
          { letter: 'n', id: 'n6' },
          { letter: 'o', id: 'o1' },
          { letter: 'o', id: 'o2' },
          { letter: 'o', id: 'o3' },
          { letter: 'o', id: 'o4' },
          { letter: 'o', id: 'o5' },
          { letter: 'o', id: 'o6' },
          { letter: 'o', id: 'o7' },
          { letter: 'o', id: 'o8' },
          { letter: 'p', id: 'p1' },
          { letter: 'p', id: 'p2' },
          { letter: 'q', id: 'q1' },
          { letter: 'r', id: 'r1' },
          { letter: 'r', id: 'r2' },
          { letter: 'r', id: 'r3' },
          { letter: 'r', id: 'r4' },
          { letter: 'r', id: 'r5' },
          { letter: 'r', id: 'r6' },
          { letter: 's', id: 's1' },
          { letter: 's', id: 's2' },
          { letter: 's', id: 's3' },
          { letter: 's', id: 's4' },
          { letter: 't', id: 't1' },
          { letter: 't', id: 't2' },
          { letter: 't', id: 't3' },
          { letter: 't', id: 't4' },
          { letter: 't', id: 't5' },
          { letter: 't', id: 't6' },
          { letter: 'u', id: 'u1' },
          { letter: 'u', id: 'u2' },
          { letter: 'u', id: 'u3' },
          { letter: 'u', id: 'u4' },
          { letter: 'v', id: 'v1' },
          { letter: 'v', id: 'v2' },
          { letter: 'w', id: 'w1' },
          { letter: 'w', id: 'w2' },
          { letter: 'x', id: 'x1' },
          { letter: 'y', id: 'y1' },
          { letter: 'y', id: 'y2' },
          { letter: 'z', id: 'z1' },
          { letter: '*', id: '*1' },
          { letter: '*', id: '*2' },
        ],
        Ll = { letter: null, id: null, fixed: !0 },
        Ml = localStorage.getItem('game')
      function Bl() {
        for (
          var e = {
              board: new Array(225).fill(Ll),
              rack: [],
              bag: [].concat(Rl),
            },
            t = 0;
          t < 7;
          t++
        ) {
          var n = e.bag.length,
            r = Math.floor(Math.random() * n),
            o = pi(e.bag.splice(r, 1), 1)[0]
          e.rack.push(o)
        }
        return e
      }
      var Fl = (Ml && JSON.parse(Ml)) || Bl()
      var jl = function (e) {
          for (var t, n = e.length; 0 != n; ) {
            ;(t = Math.floor(Math.random() * n)), n--
            var r = [e[t], e[n]]
            ;(e[n] = r[0]), (e[t] = r[1])
          }
          return e
        },
        zl = (function (e) {
          var t = e.name
          if (!t) throw new Error('`name` is a required option for createSlice')
          var n,
            r =
              'function' == typeof e.initialState
                ? e.initialState
                : vl(e.initialState, function () {}),
            o = e.reducers || {},
            a = Object.keys(o),
            i = {},
            l = {},
            u = {}
          function c() {
            var t =
                'function' === typeof e.extraReducers
                  ? Ol(e.extraReducers)
                  : [e.extraReducers],
              n = t[0],
              o = void 0 === n ? {} : n,
              a = t[1],
              i = void 0 === a ? [] : a,
              u = t[2],
              c = void 0 === u ? void 0 : u,
              s = Il(Il({}, o), l)
            return (function (e, t, n, r) {
              void 0 === n && (n = [])
              var o,
                a = 'function' === typeof t ? Ol(t) : [t, n, r],
                i = a[0],
                l = a[1],
                u = a[2]
              if (
                (function (e) {
                  return 'function' === typeof e
                })(e)
              )
                o = function () {
                  return vl(e(), function () {})
                }
              else {
                var c = vl(e, function () {})
                o = function () {
                  return c
                }
              }
              function s(e, t) {
                void 0 === e && (e = o())
                var n = _l(
                  [i[t.type]],
                  l
                    .filter(function (e) {
                      return (0, e.matcher)(t)
                    })
                    .map(function (e) {
                      return e.reducer
                    })
                )
                return (
                  0 ===
                    n.filter(function (e) {
                      return !!e
                    }).length && (n = [u]),
                  n.reduce(function (e, n) {
                    if (n) {
                      var r
                      if (gi(e))
                        return 'undefined' === typeof (r = n(e, t)) ? e : r
                      if (hi(e))
                        return vl(e, function (e) {
                          return n(e, t)
                        })
                      if ('undefined' === typeof (r = n(e, t))) {
                        if (null === e) return e
                        throw Error(
                          'A case reducer on a non-draftable value must not return undefined'
                        )
                      }
                      return r
                    }
                    return e
                  }, e)
                )
              }
              return (s.getInitialState = o), s
            })(r, s, i, c)
          }
          return (
            a.forEach(function (e) {
              var n,
                r,
                a = o[e],
                c = (function (e, t) {
                  return e + '/' + t
                })(t, e)
              'reducer' in a ? ((n = a.reducer), (r = a.prepare)) : (n = a),
                (i[e] = n),
                (l[c] = n),
                (u[e] = r ? Tl(c, r) : Tl(c))
            }),
            {
              name: t,
              reducer: function (e, t) {
                return n || (n = c()), n(e, t)
              },
              actions: u,
              caseReducers: i,
              getInitialState: function () {
                return n || (n = c()), n.getInitialState()
              },
            }
          )
        })({
          name: 'game',
          initialState: Fl,
          reducers: {
            tilePlaced: function (e, t) {
              e.board[t.payload.index] = {
                letter: t.payload.letter,
                id: t.payload.id,
                fixed: !1,
              }
            },
            tileRetractedToRack: function (e, t) {
              e.rack.splice(t.payload.index, 0, {
                letter: t.payload.letter,
                id: t.payload.draggableId,
              }),
                e.board.splice(t.payload.squareIndex, 1, Ll)
            },
            retractAll: function (e) {
              var t = []
              ;(e.board = e.board.map(function (e) {
                return e.fixed ? e : (t.push(e), Ll)
              })),
                (e.rack = [].concat(di(e.rack), t))
            },
            tileDrawn: function (e) {
              var t = e.bag.length,
                n = Math.floor(Math.random() * t),
                r = pi(e.bag.splice(n, 1), 1)[0]
              e.rack.push(r)
            },
            removedFromRack: function (e, t) {
              e.rack = e.rack.filter(function (e) {
                return e.id !== t.payload.draggableId
              })
            },
            rackRearranged: function (e, t) {
              var n = t.payload,
                r = n.sourceIndex,
                o = n.destinationIndex,
                a = pi(e.rack.splice(r, 1), 1)[0]
              e.rack.splice(o, 0, a)
            },
            tileMovedOnBoard: function (e, t) {
              var n = t.payload,
                r = n.sourceIndex,
                o = n.destinationIndex,
                a = e.board[r]
              ;(e.board[r] = Ll), (e.board[o] = a)
            },
            moveConfirmed: function (e) {
              e.board = e.board.map(function (e) {
                return e.fixed ? e : u(u({}, e), {}, { fixed: !0 })
              })
            },
            returnTilesToBag: function (e, t) {
              var n = pi(
                  e.rack.reduce(
                    function (e, n) {
                      return (
                        t.payload.selected.includes(n.id)
                          ? e[0].push(n)
                          : e[1].push(n),
                        e
                      )
                    },
                    [[], []]
                  ),
                  2
                ),
                r = n[0],
                o = n[1]
              ;(e.rack = o), (e.bag = [].concat(di(e.bag), di(r)))
            },
            tilesShuffled: function (e) {
              var t = di(e.rack)
              jl(t), (e.rack = t)
            },
            gameReset: function () {
              return Bl()
            },
          },
        }),
        Gl = zl.actions,
        Ul = Gl.tilePlaced,
        Hl = Gl.tileDrawn,
        Wl = Gl.removedFromRack,
        Vl = Gl.rackRearranged,
        $l = Gl.tileRetractedToRack,
        ql = Gl.tileMovedOnBoard,
        Ql = Gl.retractAll,
        Xl = Gl.moveConfirmed,
        Yl = Gl.returnTilesToBag,
        Kl = Gl.tilesShuffled,
        Jl = Gl.gameReset,
        Zl = zl.reducer,
        eu = new mi.Howl({ src: ['/sound/placeTile2.mp3'] }),
        tu = new mi.Howl({ src: ['/sound/retract.mp3'] }),
        nu = new mi.Howl({ src: ['/sound/confirm.mp3'] }),
        ru = new mi.Howl({ src: ['/sound/swapTiles.mp3'] }),
        ou = new mi.Howl({ src: ['/sound/restart.mp3'] }),
        au = function () {
          var e = ii(),
            n = pi((0, t.useState)(!1), 2),
            r = n[0],
            o = n[1],
            a = pi((0, t.useState)([]), 2),
            i = a[0],
            l = a[1],
            u = li(function (e) {
              return e.game
            }),
            c = u.board,
            s = u.rack.length
          ;(0, t.useEffect)(
            function () {
              localStorage.setItem('game', JSON.stringify(u))
            },
            [u]
          )
          return {
            onDragEnd: function (t) {
              t.destination &&
                (!(function (t, n) {
                  'rack' === t.droppableId
                    ? 'rack' !== n.source.droppableId
                      ? e(
                          $l({
                            letter: n.draggableId[0],
                            draggableId: n.draggableId,
                            index: t.index,
                            squareIndex: Number(n.source.droppableId),
                          })
                        )
                      : e(
                          Vl({
                            sourceIndex: n.source.index,
                            destinationIndex: t.index,
                          })
                        )
                    : 'rack' !== n.source.droppableId
                    ? e(
                        ql({
                          sourceIndex: Number(n.source.droppableId),
                          destinationIndex: Number(t.droppableId),
                        })
                      )
                    : (e(
                        Ul({
                          index: Number(t.droppableId),
                          id: n.draggableId,
                          letter: n.draggableId[0],
                        })
                      ),
                      e(Wl({ draggableId: n.draggableId })))
                })(t.destination, t),
                'rack' !== t.destination.droppableId && eu.play())
            },
            boardState: c,
            isSwapping: r,
            setSelectedTiles: l,
            selectedTiles: i,
            onConfirmSwap: function () {
              ru.play(), e(Yl({ selected: i }))
              for (var t = 0; t < i.length; t++) e(Hl())
              l([]), o(!1)
            },
            onRetractAll: function () {
              tu.play(), e(Ql())
            },
            onConfirmPlacement: function () {
              var t = 7 - s
              nu.play(), e(Xl())
              for (var n = 0; n < t; n++) e(Hl())
            },
            setIsSwapping: o,
            onShuffle: function () {
              e(Kl())
            },
            onReset: function () {
              confirm('Are you sure you want to reset the board?') &&
                (ou.play(), e(Jl()))
            },
            onClickSwap: function () {
              0 !== s && o(!0)
            },
          }
        },
        iu = new Array(15).fill(1).map(function (e, t) {
          return (0, Ea.jsx)('div', { className: Na, children: t + 1 }, t)
        }),
        lu = new Array(15).fill(1).map(function (e, t) {
          return (0,
          Ea.jsx)('div', { className: La, children: String.fromCharCode(t + 65) }, t)
        }),
        uu = function () {
          var e = au(),
            t = e.onDragEnd,
            n = e.boardState,
            r = e.isSwapping,
            o = e.setSelectedTiles,
            a = e.selectedTiles,
            i = e.onConfirmSwap,
            l = e.onRetractAll,
            u = e.onConfirmPlacement,
            c = e.onShuffle,
            s = e.onReset,
            d = e.onClickSwap
          return (0, Ea.jsxs)(Oo, {
            onDragEnd: t,
            children: [
              (0, Ea.jsxs)('div', {
                className: Ta,
                children: [
                  (0, Ea.jsx)('div', {
                    className: Ma,
                    children: lu,
                  }),
                  (0, Ea.jsxs)('div', {
                    className: Oa,
                    children: [
                      (0, Ea.jsx)('div', {
                        className: Ra,
                        children: iu,
                      }),
                      (0, Ea.jsx)('div', {
                        className: Da,
                        children: n.map(function (e, t) {
                          return (0, Ea.jsx)(Aa, { index: t, tile: e }, t)
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ea.jsx)('div', {
                className: Ba,
                children: r
                  ? (0, Ea.jsxs)(Ea.Fragment, {
                      children: [
                        (0, Ea.jsx)(fi, {
                          setSelectedTiles: o,
                          selectedTiles: a,
                        }),
                        (0, Ea.jsx)('button', {
                          onClick: i,
                          className: Ga,
                          children: 'Confirm Swap',
                        }),
                      ],
                    })
                  : (0, Ea.jsxs)(Ea.Fragment, {
                      children: [
                        (0, Ea.jsx)(ui, {}),
                        (0, Ea.jsxs)('div', {
                          className: Fa,
                          children: [
                            (0, Ea.jsxs)('div', {
                              className: ja,
                              children: [
                                (0, Ea.jsx)('button', {
                                  onClick: l,
                                  className: Ga,
                                  children: 'RETRACT',
                                }),
                                (0, Ea.jsx)('div', {
                                  className: za,
                                  children: 'retracts all unconfirmed tiles',
                                }),
                              ],
                            }),
                            (0, Ea.jsxs)('div', {
                              className: ja,
                              children: [
                                (0, Ea.jsx)('button', {
                                  onClick: u,
                                  className: Ga,
                                  children: 'PLACE TILES',
                                }),
                                (0, Ea.jsx)('div', {
                                  className: za,
                                  children:
                                    'fix tiles on the board, automatically draw new tiles',
                                }),
                              ],
                            }),
                            (0, Ea.jsxs)('div', {
                              className: ja,
                              children: [
                                (0, Ea.jsx)('button', {
                                  onClick: d,
                                  className: Ga,
                                  children: 'SWAP TILES',
                                }),
                                (0, Ea.jsx)('div', {
                                  className: za,
                                  children: 'swap selected tiles',
                                }),
                              ],
                            }),
                            (0, Ea.jsx)('button', {
                              onClick: c,
                              className: Ga,
                              children: 'SHUFFLE',
                            }),
                            (0, Ea.jsx)('button', {
                              onClick: s,
                              className: Ga,
                              children: 'RESET',
                            }),
                          ],
                        }),
                      ],
                    }),
              }),
            ],
          })
        }
      var cu = function () {
          return (0, Ea.jsx)(uu, {})
        },
        su = (function (e) {
          var t,
            n = Dl(),
            r = e || {},
            o = r.reducer,
            a = void 0 === o ? void 0 : o,
            i = r.middleware,
            l = void 0 === i ? n() : i,
            u = r.devTools,
            c = void 0 === u || u,
            s = r.preloadedState,
            d = void 0 === s ? void 0 : s,
            f = r.enhancers,
            p = void 0 === f ? void 0 : f
          if ('function' === typeof a) t = a
          else {
            if (!Pl(a))
              throw new Error(
                '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
              )
            t = v(a)
          }
          var g = l
          'function' === typeof g && (g = g(n))
          var h = y.apply(void 0, g),
            _ = b
          c && (_ = Cl(Il({ trace: !1 }, 'object' === typeof c && c)))
          var w = [h]
          return (
            Array.isArray(p)
              ? (w = _l([h], p))
              : 'function' === typeof p && (w = p(w)),
            m(t, d, _.apply(void 0, w))
          )
        })({ reducer: { game: Zl } }),
        du = su
      e.createRoot(document.getElementById('root')).render(
        (0, Ea.jsx)(ni, { store: du, children: (0, Ea.jsx)(cu, {}) })
      )
    })()
})()
//# sourceMappingURL=main.5ccbaeb3.js.map
