!function(a, b, c) {
    var d = a[c.k] = {
        w: a,
        d: b,
        a: c,
        s: {},
        f: function() {
            return {
                callback: [],
                sha: function(a) {
                    function b(a) {
                        for (var b = Array(a.length >> 2), c = 0; c < b.length; c++)
                            b[c] = 0;
                        for (c = 0; c < 8 * a.length; c += 8)
                            b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << 24 - c % 32;
                        return b
                    }
                    function c(a) {
                        for (var b = "", c = 0; c < 32 * a.length; c += 8)
                            b += String.fromCharCode(a[c >> 5] >>> 24 - c % 32 & 255);
                        return b
                    }
                    function d(a, b) {
                        var c = (65535 & a) + (65535 & b)
                          , d = (a >> 16) + (b >> 16) + (c >> 16);
                        return d << 16 | 65535 & c
                    }
                    function e(a, b) {
                        return a << b | a >>> 32 - b
                    }
                    function f(a, b) {
                        a[b >> 5] |= 128 << 24 - b % 32,
                        a[(b + 64 >> 9 << 4) + 15] = b;
                        for (var c = Array(80), f = 1732584193, i = -271733879, j = -1732584194, k = 271733878, l = -1009589776, m = 0; m < a.length; m += 16) {
                            for (var n = f, o = i, p = j, q = k, r = l, s = 0; s < 80; s++) {
                                s < 16 ? c[s] = a[m + s] : c[s] = e(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                                var t = d(d(e(f, 5), g(s, i, j, k)), d(d(l, c[s]), h(s)));
                                l = k,
                                k = j,
                                j = e(i, 30),
                                i = f,
                                f = t
                            }
                            f = d(f, n),
                            i = d(i, o),
                            j = d(j, p),
                            k = d(k, q),
                            l = d(l, r)
                        }
                        return Array(f, i, j, k, l)
                    }
                    function g(a, b, c, d) {
                        return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
                    }
                    function h(a) {
                        return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
                    }
                    function i(a) {
                        return c(f(b(a), 8 * a.length))
                    }
                    function j(a) {
                        for (var b, c = "0123456789abcdef", d = "", e = 0; e < a.length; e++)
                            b = a.charCodeAt(e),
                            d = d + c.charAt(b >>> 4 & 15) + c.charAt(15 & b);
                        return d
                    }
                    return j(i(a))
                },
                get: function(a, b) {
                    var c = null ;
                    return c = "undefined" !== typeof a[b] ? a[b] : a.getAttribute(b)
                },
                set: function(a, b, c) {
                    "string" === typeof a[b] ? a[b] = c : a.setAttribute(b, c)
                },
                getEl: function(a) {
                    var b = null ;
                    return b = a.target ? 3 === a.target.nodeType ? a.target.parentNode : a.target : a.srcElement
                },
                parse: function(a, b) {
                    var c, d, e, f, g, h;
                    if (h = {},
                    c = a.split("#")[0].split("?"),
                    c[1])
                        for (d = c[1].split("&"),
                        f = 0,
                        g = d.length; f < g; f += 1)
                            e = d[f].split("="),
                            2 === e.length && b[e[0]] && (h[e[0]] = e[1]);
                    return h
                },
                make: function(a) {
                    var b, c, e, f = !1;
                    for (b in a)
                        if (a[b].hasOwnProperty) {
                            f = d.d.createElement(b);
                            for (c in a[b])
                                if (a[b][c] && a[b][c].hasOwnProperty)
                                    if ("string" === typeof a[b][c])
                                        d.f.set(f, c, a[b][c]);
                                    else if ("style" === c)
                                        for (e in a[b][c])
                                            f.style.setProperty ? f.style.setProperty(e, a[b][c][e], "important") : f.style[e] = a[b][c][e];
                            break
                        }
                    return f
                },
                kill: function(a) {
                    "string" === typeof a && (a = d.d.getElementById(a)),
                    a && a.parentNode && a.parentNode.removeChild(a)
                },
                call: function(a, b) {
                    var c, e, f = "?";
                    d.v.nextCallback || (d.v.nextCallback = 0),
                    c = d.v.nextCallback,
                    d.v.nextCallback = d.v.nextCallback + 1,
                    e = d.a.k + ".f.callback[" + c + "]",
                    d.f.callback[c] = function(a) {
                        b(a, c),
                        d.f.kill(e),
                        d.v.callbackLoadingCount = d.v.callbackLoadingCount - 1
                    }
                    ,
                    a.match(/\?/) && (f = "&"),
                    d.d.b.appendChild(d.f.make({
                        SCRIPT: {
                            id: e,
                            type: "text/javascript",
                            charset: "utf-8",
                            src: a + f + "callback=" + e
                        }
                    })),
                    d.v.callbackLoadingCount = d.v.callbackLoadingCount + 1,
                    d.f.debug("Calling: " + a + f + "callback=" + e)
                },
                listen: function(a, b, c, e) {
                    e ? "undefined" !== typeof a.removeEventListener ? a.removeEventListener(b, c, !1) : "undefined" !== typeof a.detachEvent && a.detachEvent("on" + b, c) : "undefined" !== typeof d.w.addEventListener ? a.addEventListener(b, c, !1) : "undefined" !== typeof d.w.attachEvent && a.attachEvent("on" + b, c)
                },
                debug: function(a) {
                    d.w.console && d.w.console.log && d.v.config.debug && d.w.console.log(a)
                        , console.log(a) //I added this line
                },
                getConfig: function() {
                    var a = d.d.getElementsByTagName("SCRIPT")
                      , b = a.length
                      , c = 0
                      , e = 0
                      , f = d.a.validConfigParam.length
                      , g = null 
                      , h = ""
                      , i = function(a) {
                        d.w.setTimeout(function() {
                            d.f.kill(a)
                        }, 10)
                    }
                    ;
                    for (c = 0; c < b; c += 1)
                        if (a[c].src.match(d.a.me)) {
                            for (e = 0; e < f; e += 1)
                                h = d.a.validConfigParam[e],
                                g = a[c].getAttribute(h),
                                g && (d.v.config[h] = g);
                            i(a[c]);
                            break
                        }
                },
                getSelection: function() {
                    return ("" + (d.w.getSelection ? d.w.getSelection() : d.d.getSelection ? d.d.getSelection() : d.d.selection.createRange().text)).replace(/(^\s+|\s+$)/g, "")
                },
                getDim: function(a) { // GETS IMAGE DIMENSIONS, and returns an object {h: #, w: #}
                    var b, c;
                    return b = 0,
                    c = 0,
                    "number" === typeof a.naturalHeight ? b = a.naturalHeight : "number" === typeof a.height && (b = a.height),
                    "number" === typeof a.naturalWidth ? c = a.naturalWidth : "number" === typeof a.width && (c = a.width),
                    d.f.debug("dimensions for " + a.src + " " + b + " " + c),
                    {
                        h: b,
                        w: c
                    }
                },
                check: {
                    fileType: function(a) {
                        var b, c;
                        return b = !0,
                        a.src && (c = a.src.split("#")[0].split("?")[0].split(".").pop(),
                        d.a.invalidImageFileType[c] && (b = !1,
                        d.f.debug(c + " is not a valid image file type."))),
                        b
                    },
                    visibility: function(a) { // Checks whether any elements parent to the image are set to 'display="none"' or 'visibility="hidden"', and sets b to true or false
                        var b, c, e;
                        for (c = a.parentNode,
                        b = !0; c && "HTML" !== c.tagName; ) {
                            if (c.currentStyle ? ("none" === c.currentStyle.display || "hidden" === c.currentStyle.visibility) && (b = !1) : d.w.getComputedStyle && ("none" === d.w.getComputedStyle(a).getPropertyValue("display") || "hidden" === d.w.getComputedStyle(a).getPropertyValue("visibility")) && (b = !1),
                            b === !1) {
                                e = a.src + ": is invisible";
                                break
                            }
                            c = c.parentNode
                        }
                        return e && d.f.debug(e),
                        b
                    },
                    noPin: function(a) { //Checks and Sets whether PINNING IS ALLOWED
                        var b, c;
                        return b = !0, //= true
                        d.f.get(a, "data-pin-nopin") && (b = !0, //was !1 //= false
                        c = a.src + ": data-pin-nopin=true"),
                        d.f.get(a, "nopin") && (b = !0, //was !1 //= false
                        c = a.src + ": nopin=nopin"/*,
                        d.f.log({ //DO NOT LOG THIS to Pinterest company
                            reason: "image_with_inline_nopin",
                            img: a.src
                        })*/),
                        c && d.f.debug('image with inline nopin\n' + c),
                        b
                    },
                    size: function(a) {
                        var b, c, e;
                        return b = !1,
                        e = d.f.getDim(a),
                        e.h > d.a.imgLimitFloor && e.w > d.a.imgLimitFloor ? e.h > d.a.imgLimitMin || e.w > d.a.imgLimitMin ? e.w < e.h * d.a.imgLimitHorz ? b = !0 : c = a.src + " too wide" : c = a.src + " one dimension <= " + d.a.imgLimitMin : c = a.src + " one dimension <= " + d.a.imgLimitFloor,
                        c && d.f.debug(c),
                        b
                    },
                    dupe: function(a) {
                        var b = a;
                        "object" === typeof a && (b = a.src);
                        var c = !0;
                        return d.v.src[b] ? (d.f.debug(b + ": is a duplicate"),
                        c = !1) : d.v.src[b] = !0,
                        c
                    },
                    source: function(a, b) {
                        var c, e, f;
                        return c = !1,
                        f = "string" === typeof a ? a : a.src || a.href,
                        f && f.match(/^http/) && (f.match(/File:/) || (b ? (e = f.split("#")[0].split("?")[0].split(".").pop(),
                        d.a.validImageFileType[e] && (c = !0)) : c = !0)),
                        c === !0 && d.f.debug("Found high-quality image link: " + f),
                        c
                    },
                    domain: function(a) { // Checks and if domain in hashlist sets to true, blocking pinning from that domain
                        var b, c, e, f, g;
                        if (g = a,
                        "object" === typeof a && (g = a.src),
                        f = g.split("/")[2],
                        e = !0,
                        "undefined" === typeof d.v.srcDomain[f]) {
                            d.f.debug("checking hashlist against " + f);
                            for (var c = d.f.sha(f), b = 0, h = d.a.hashList.length; b < h; b += 1)
                                if (c.match(d.a.hashList[b])) {
                                    d.f.debug("found a blacklisted domain: " + f),
                                    d.f.log({
                                        reason: "domain_blacklisted"
                                    }),
                                    e = !1;
                                    break
                                }
                            d.v.srcDomain[f] = {
                                bad: e
                            }
                        } else
                            e = d.v.srcDomain[f].bad;
                        return e
                    }
                },
                tag: {
                    img: function(a) {
                        var b, c;
                        b = !0;
                        for (c in d.f.check)
                            if (!d.f.check[c](a)) {
                                b = !1;
                                break
                            }
                        return b
                    },
                    iframe: function(a) {
                        d.f.debug("Debug: iframe(a): a = " + a + ", a.src = " + a.src);
                        var b, c;
                        if (a.src.match(d.a.pattern.instagram.url) && (c = a.src.split("embed"),
                        c[1] && (b = "https://api.instagram.com/oembed?url=" + encodeURIComponent(c[0]),
                        d.f.call(b, d.f.handlers.instagram))),
                        a.src.match(d.a.pattern.youtube.iframe)) {
                            var c = a.src.split("#")[0].split("?")[0].split("/")[4];
                            c && (d.f.debug("found a YouTube player: " + a.src),
                            b = {
                                media: "http://i.ytimg.com/vi/" + c + "/hqdefault.jpg",
                                set: {
                                    description: d.d.title,
                                    url: "http://www.youtube.com/watch?v=" + c,
                                    isVideo: !0,
                                    attrib: "youtube"
                                }
                            },
                            d.f.loadImg(b))
                        }
                        a.src.match(d.a.pattern.vimeo.iframe) && (c = function(c) {
                            c.thumbnail_url && (d.f.debug("got a Vimeo API reply for iframe: " + a.src),
                            b = {
                                media: c.thumbnail_url.split("_")[0] + ".jpg",
                                set: {
                                    url: "https://vimeo.com/" + c.video_id,
                                    description: c.title,
                                    isVideo: !0,
                                    attrib: "vimeo"
                                }
                            },
                            d.f.loadImg(b))
                        }
                        ,
                        b = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(a.src),
                        d.f.call(b, c))
                    },
                    a: function(a) {
                        var b, c, e, f;
                        c = d.f.get(a, "data-pin-href"),
                        c && (e = d.f.parse(c, {
                            url: !0,
                            media: !0,
                            description: !0
                        }),
                        e.media && (d.f.debug("found a Pin It button: " + c),
                        b = {
                            media: decodeURIComponent(e.media),
                            set: {
                                pinItButton: !0,
                                url: decodeURIComponent(e.url) || void 0,
                                description: decodeURIComponent(e.description) || void 0
                            }
                        },
                        f = d.f.get(a, "data-pin-id"),
                        f && (b.set.dataPinId = f),
                        d.f.loadImg(b),
                        d.v.hazLoggedPinItButton || (d.v.hazLoggedPinItButton = !0,
                        d.f.log({
                            reason: "pinit_found"
                        }))))
                    },
                    link: function(a) {
                        var b, c;
                        b = a.rel,
                        c = a.href,
                        b && c && (b = b.toLowerCase(),
                        "canonical" === b && (d.f.debug("found link rel=canonical: " + c),
                        d.v.canonicalUrl || (d.v.canonicalUrl = c)),
                        ("icon" === b || "shortcut-icon" === b || "apple-touch-icon" === b) && (d.v.config.favicon = c,
                        d.f.debug("found favicon: " + d.v.config.favicon)))
                    },
                    meta: function(a) {
                        var b, c, e, f, g, h;
                        b = d.f.get(a, "content"),
                        c = d.f.get(a, "description"),
                        e = d.f.get(a, "property"),
                        g = d.f.get(a, "http-equiv"),
                        h = d.f.get(a, "content-language"),
                        f = d.f.get(a, "name"),
                        g && h && (d.f.debug("got language " + h + " from http-equiv meta"),
                        d.f.setLang(h)),
                        b && (f && "pinterest" === f && ("nopin" === b.toLowerCase() && (d.v.data.close = c || d.v.msg.noPinMeta, //start   IS THIS TO PREVENT PINNING IF nopin IS FOUND AS ATTRIBUTE?
                        d.f.log({
                            reason: "found_nopin_meta"
                        }),
                        d.f.debug("found pinterest nopin meta")), //end
                        "nohover" === b.toLowerCase() && (d.v.noHoverMeta = !0,
                        d.f.debug("found pinterest nohover meta"),
                        d.f.log({
                            reason: "found_no_hover_meta"
                        })),
                        "pinterest-rich-pin" === f && "false" === b.toLowerCase() && (d.f.debug("found pinterest no-rich-pin meta"),
                        d.f.log({
                            reason: "found_no_rich_pin_meta"
                        }))),
                        e && ("og:image" === e && (d.v.meta.og.media = b,
                        d.f.debug("found og:image meta: " + b)),
                        "og:url" === e && (d.v.meta.og.url = b,
                        d.f.debug("found og:url meta: " + b)),
                        "og:description" === e && (d.v.meta.og.description = b,
                        d.f.debug("found og:description meta: " + b)),
                        "og:title" === e && (d.v.meta.og.title = b,
                        d.f.debug("found og:title meta: " + b)),
                        "pin:media" === e && (d.v.meta.pinterest.media = b,
                        d.f.debug("found pin:media meta: " + b)),
                        "pin:url" === e && (d.v.meta.pinterest.url = b,
                        d.f.debug("found pin:url meta: " + b)),
                        "pin:description" === e && (d.v.meta.pinterest.description = b,
                        d.f.debug("found pin:description meta: " + b)),
                        "pin:id" === e && (d.v.meta.pinterest.id = b,
                        d.f.debug("found pin:id meta: " + b))))
                    }
                },
                loadImg: function(a) {
                    d.f.debug("loading image " + a.media);
                    var b, c;
                    d.v.imgLoadingCount = d.v.imgLoadingCount + 1,
                    b = d.d.createElement("IMG"),
                    b.onerror = function() {
                        d.w.clearTimeout(c),
                        d.v.imgLoadingCount = d.v.imgLoadingCount - 1
                    }
                    ,
                    b.onload = function() {
                        var b, e, f, g, h, i;
                        if (d.w.clearTimeout(c),
                        f = {},
                        d.f.debug(this.src + " has loaded"),
                        d.v.imgLoadingCount = d.v.imgLoadingCount - 1,
                        f.loaded = !0,
                        i = d.f.getDim(this),
                        f.height = i.h,
                        f.width = i.w,
                        f.media = this.src,
                        a.set)
                            if ("string" === typeof a.set)
                                f[a.set] = !0,
                                d.v.hazSet[a.set] = !0;
                            else
                                for (b in a.set)
                                    f[b] = a.set[b],
                                    d.v.hazSet[b] = !0;
                        for (a.url && d.v.canonicalUrl && (a.url !== d.v.canonicalUrl ? (g = d.v.canonicalUrl.split("/")[2],
                        h = a.url.split("/")[2],
                        g === h ? (f.url = a.url,
                        d.f.debug("Fixing on-domain link " + f.url),
                        f.linkOffPage = !0) : (f.url = a.url,
                        f.via = d.v.canonicalUrl,
                        f.linkOffDomain = !0)) : f.isVideo && (f.isCanonical = !0),
                        d.f.kill(this)),
                        a.description && (f.description = a.description),
                        d.v.found.unshift(f),
                        b = 1,
                        e = d.v.found.length; b < e; b += 1)
                            if (d.v.found[b].media === this.src) {
                                f.metaOg ? (f.description && (d.v.found[b].description = f.description),
                                f.url && (d.v.found[b].url = f.url),
                                d.v.found[b].isCanonical = !0,
                                d.v.found.shift()) : d.v.found.splice(b, 1);
                                break
                            }
                    }
                    ,
                    c = d.w.setTimeout(function() {
                        b = null ,
                        d.v.imgLoadingCount = d.v.imgLoadingCount - 1
                    }, d.a.maxWait),
                    b.src = a.media
                },
                handlers: {
                    instagram: function(a) {
                        var b;
                        if (a && a.thumbnail_url && a.title && a.html)
                            document.getElementsByTagName('video')[0] ? (b = document.getElementsByTagName('video')[0].getAttribute('src'),
                            d.f.debug("Debug: found video: " + b)) : (b = a.thumbnail_url,
                            d.f.debug("Debug: found image: " + b)),
                            (o = {
                                 media: b,
                                 set: {
                                      url: b,
                                      description: a.html.split('<a href="')[1].split('"')[0],
                                      isVideo: !0,
                                      attrib: "instagram"
                                 }
                            },
                            d.f.loadImg(o))
                    }
                },
                srcSet: function(a) {
                    var b = d.f.get(a, "srcset");
                    b && (src = b.split(",").pop().replace(/^\s+/gm, "").split(" ")[0],
                    src && (f = src.split("#")[0].split("?")[0].split(".").pop(),
                    d.a.validImageFileType[f] && !a.getAttribute("data-pin-media") && (a.setAttribute("data-pin-media", src),
                    d.f.debug("setting src to last srcset: " + src))))
                },
                modifiers: {
                    page: [function() {
                        var a, b, c;
                        d.d.URL.match(d.a.pattern.vimeo.page) && (b = d.d.getElementsByTagName("VIDEO")[0],
                        b && (c = b.parentNode.parentNode.getAttribute("data-thumb"),
                        c && (a = {
                            media: c,
                            set: {
                                sourceBump: !0,
                                url: d.d.URL,
                                description: d.d.title
                            }
                        },
                        d.f.loadImg(a))))
                    }
                    , function() {
                        var a, b, c, e;
                        if (d.d.URL.match(d.a.pattern.instagram.page))
                            if (d.d.URL.match(d.a.pattern.instagram.url))
                                e = "https://api.instagram.com/oembed?url=" + encodeURIComponent(d.d.URL),
                                d.f.call(e, d.f.handlers.instagram);
                            else
                                for (a = d.d.getElementsByTagName("A"),
                                b = 0,
                                c = a.length; b < c; b += 1)
                                    a[b].href && a[b].href.match(d.a.pattern.instagram.url) && (e = "https://api.instagram.com/oembed?url=" + encodeURIComponent(a[b].href.split("#")[0].split("?")[0]),
                                    d.f.call(e, d.f.handlers.instagram))
                    }
                    , function() {
                        var a, b, c, e, f, g, h;
                        if (d.d.URL.match(d.a.pattern.amazon.page)) {
                            var b = d.d.getElementsByTagName("A");
                            for (c = 0,
                            e = b.length; c < e; c += 1)
                                if (b[c].href && b[c].href.match("pinterest.com%2Fpin%2Fcreate%2Fbutton%3F")) {
                                    if (a = b[c].href.split("&token=")[0].split("pinterest.com%2Fpin%2Fcreate%2Fbutton%3F"),
                                    a[1])
                                        try {
                                            f = decodeURIComponent(a[1]),
                                            f && (h = d.f.parse("?" + f, {
                                                url: !0,
                                                media: !0,
                                                description: !0
                                            }),
                                            h.media && h.url && h.description && (h.url = h.url.split("ref%3D")[0],
                                            h.description = h.description.split("http")[0],
                                            g = {
                                                media: decodeURIComponent(h.media),
                                                set: {
                                                    sourceBump: !0,
                                                    url: decodeURIComponent(h.url),
                                                    description: decodeURIComponent(h.description)
                                                }
                                            },
                                            d.f.loadImg(g)))
                                        } catch (i) {}
                                    break
                                }
                        }
                    }
                    , function() {
                        var a, b, c, e, f, g, h, i, j;
                        if (j = function(a) {
                            var b = {};
                            b.media = "https://i.ytimg.com/vi/" + a.id + "/hqdefault.jpg",
                            b.url = "http://www.youtube.com/watch?v=" + a.id,
                            b.set = {
                                isVideo: !0,
                                attrib: "youtube",
                                url: b.url,
                                description: d.d.title
                            },
                            a.sourceBump && (b.set.sourceBump = !0),
                            a.sourceOrder && (b.set.sourceOrder = a.sourceOrder),
                            d.f.loadImg(b)
                        }
                        ,
                        d.d.URL.match(d.a.pattern.youtube.page))
                            for (b = d.d.URL.split("#")[0].split("?v="),
                            b[1] && j({
                                id: b[1].split("&")[0],
                                sourceBump: !0
                            }),
                            b = d.d.getElementsByClassName("_mfw"),
                            c = 0,
                            e = b.length; c < e; c += 1)
                                if (f = b[c].currentStyle || d.w.getComputedStyle(b[c], !1),
                                f && f.backgroundImage && "none" !== f.backgroundImage && (a = f.backgroundImage.split("&")[0].split("="),
                                a[1])) {
                                    for (g = a[1].split(","),
                                    h = g.length - 1,
                                    i = -1; h > i; h -= 1)
                                        j({
                                            id: g[h],
                                            sourceOrder: h
                                        });
                                    break
                                }
                    }
                    , function() {
                        var a, b, c, e, f, g, h, i, j, k;
                        if (d.d.URL.match(d.a.pattern.google.page) && (d.v.doNotSort = !0,
                        a = d.d.getElementById("ires")))
                            for (b = a.getElementsByTagName("A"),
                            c = 0,
                            e = b.length; c < e; c += 1)
                                if (h = "",
                                media = "",
                                b[c].href && (g = b[c].href.split("imgrefurl="),
                                g[1] && (h = g[1].split("&")[0]),
                                g = b[c].href.split("imgurl="),
                                g[1] && (media = g[1].split("&")[0])),
                                h && media && (f = b[c].getElementsByTagName("IMG"),
                                f[0] && (d.f.set(f[0], "data-pin-url", decodeURIComponent(h)),
                                d.f.set(f[0], "data-pin-media", decodeURIComponent(media)))),
                                i = b[c].parentNode.getElementsByTagName("DIV"),
                                i[2] && (j = i[2].textContent))
                                    try {
                                        k = JSON.parse(j),
                                        "object" === typeof k && (k.s || k.pt) && d.f.set(f[0], "data-pin-description", k.s || k.pt)
                                    } catch (l) {}
                    }
                    , function() {
                        d.d.URL.match(d.a.pattern.pinterest.page) && window.isMainPinterestSite === !0 && (d.v.data.close = d.v.msg.noPinningFromPinterest)
                    }
                    , function() {
                        d.d.URL.match(d.a.pattern.facebook.page) && (d.f.log({
                            reason: "facebook_nopin"
                        }),
                        d.v.data.close = d.v.msg.noPinDomain.replace(/%noPinDomain%/, "Facebook"))
                    }
                    , function() {
                        d.d.URL.match(d.a.pattern.craigslist.page) && (d.v.data.close = d.v.msg.noPinDomain.replace(/%noPinDomain%/, "Craigslist"))
                    }
                    ],
                    img: [function(a, b) {
                        if (d.d.URL.match(d.a.pattern.itunes.page)) {
                            a.description = d.d.title.split(" on the App Store")[0];
                            var c = d.d.getElementById("title");
                            if (c) {
                                var e = c.getElementsByTagName("H1")
                                  , f = c.getElementsByTagName("H2");
                                if (e[0] && f[0]) {
                                    var g = e[0].innerHTML
                                      , h = f[0].innerHTML;
                                    g && h && (h = h.charAt(0).toLowerCase() + h.substr(1),
                                    a.description = g + " " + h)
                                }
                            }
                        }
                    }
                    , function(a, b) {
                        var c, e;
                        d.d.URL.match(d.a.pattern.twitter.page) && (c = b.parentNode.parentNode,
                        c && "A" === c.tagName && d.f.get(c, "data-resolved-url-large") && (a.media = d.f.get(c, "data-resolved-url-large"),
                        a.url = c.href,
                        e = c.parentNode.parentNode.parentNode.getElementsByClassName("tweet-text")[0],
                        e && "P" === e.tagName && (a.description = e.innerText)))
                    }
                    , function(a, b) {
                        var c;
                        return c = !1,
                        a.media.match(d.a.pattern.flickr.media) && (a.getsAttribution = !0,
                        a.attrib = "flickr",
                        a.url = d.v.canonicalUrl,
                        c = !0),
                        c
                    }
                    , function(a, b) {
                        var c, e, f;
                        return c = !1,
                        a.media.match(d.a.pattern["500px"].media) && (a.getsAttribution = !0,
                        e = a.media.split("#")[0].split("?")[0].split("/"),
                        f = e.pop(),
                        f.match(/.jpg/) && (a.media = e.join("/") + "/2048.jpg",
                        a.set = {
                            getsAttribution: !0,
                            attrib: "fivehundredpx",
                            url: d.v.canonicalUrl
                        },
                        d.f.loadImg(a),
                        c = !0)),
                        c
                    }
                    , function(a, b) {
                        var c, e;
                        return c = !1,
                        a.media.match(d.a.pattern.youtube.media) && (e = a.media.split("/")[4],
                        a.media = "https://i.ytimg.com/vi/" + e + "/hqdefault.jpg",
                        a.url = d.v.canonicalUrl,
                        a.url.match(d.a.pattern.youtube.page) && (a.url = "https://www.youtube.com/watch?v=" + e),
                        a.set = {
                            isVideo: !0,
                            attrib: "youtube",
                            url: a.url
                        },
                        d.f.loadImg(a),
                        c = !0),
                        c
                    }
                    , function(a, b) {
                        var c, e;
                        return c = !1,
                        a.url || (a.url = d.v.canonicalUrl),
                        e = a["data-pin-url"],
                        e && (delete a["data-pin-url"],
                        a.dataPinUrl = e,
                        a.url = e),
                        e = a["data-pin-id"],
                        e && (delete a["data-pin-id"],
                        a.dataPinId = e),
                        e = a["data-pin-description"],
                        e && (delete a["data-pin-description"],
                        a.dataPinDescription = e),
                        e = a["data-pin-media"],
                        e && (delete a["data-pin-media"],
                        d.f.check.source(e) && (a.media = e,
                        a.set = {
                            dataPinMedia: !0,
                            url: a.url
                        },
                        a.dataPinUrl && (a.set.dataPinUrl = a.dataPinUrl),
                        a.dataPinDescription && (a.set.dataPinDescription = a.dataPinDescription),
                        a.dataPinId && (a.set.dataPinId = a.dataPinId),
                        d.f.loadImg(a),
                        c = !0)),
                        c
                    }
                    , function(a, b) {
                        var c, e;
                        return c = !1,
                        e = b.parentNode,
                        "A" === e.tagName && e.href && d.f.check.source(e, !0) && !d.d.URL.match(d.a.pattern.wikipedia.page) && (a.url || (a.url = d.v.canonicalUrl),
                        a.media = e.href,
                        a.set = {
                            linkedImg: !0,
                            url: a.url
                        },
                        d.f.loadImg(a),
                        c = !0),
                        c
                    }
                    ],
                    meta: [function() {
                        var a, b;
                        return a = !1,
                        d.v.meta.pinterest && d.v.meta.pinterest.media && d.f.check.source(d.v.meta.pinterest.media) && (b = {
                            media: d.v.meta.pinterest.media,
                            set: {
                                metaPinterest: !0,
                                url: d.v.meta.pinterest.url || d.v.canonicalUrl,
                                description: d.v.meta.pinterest.description || d.d.title || void 0
                            }
                        },
                        d.v.meta.pinterest.id && (b.set.dataPinId = d.v.meta.pinterest.id),
                        d.f.loadImg(b),
                        a = !0,
                        d.f.debug("loading pinterest meta image: " + b.media)),
                        a
                    }
                    , function() {
                        var a, b;
                        return d.v.meta.og && d.v.meta.og.media && d.f.check.source(d.v.meta.og.media) && (b = {
                            media: d.v.meta.og.media,
                            set: {
                                metaOg: !0,
                                url: d.v.meta.og.url || d.v.canonicalUrl,
                                description: d.v.meta.og.description || d.v.meta.og.title || d.d.title || void 0
                            }
                        },
                        d.f.loadImg(b),
                        a = !0,
                        d.f.debug("loading og meta image: " + b.media)),
                        a = !1
                    }
                    ]
                },
                runMods: function(a, b, c) {
                    if (d.f.modifiers[a])
                        for (var e = 0; e < d.f.modifiers[a].length && !d.f.modifiers[a][e](b, c); e += 1)
                            ;
                },
                getTags: function() {
                    var a, b, c, e, f, g, h, i, j, k;
                    for (a in d.a.tag)
                        if (b = d.d.getElementsByTagName(a),
                        c = b.length)
                            for (e = d.a.tag[a],
                            f = 0; f < c; f += 1) {
                                for ("img" === a && d.f.srcSet(b[f]),
                                g = null ,
                                h = 0; h < e.length; h += 1)
                                    i = d.f.get(b[f], e[h]),
                                    i && (g || (g = {}),
                                    g[e[h]] = i);
                                g && "function" === typeof d.f.tag[a] && d.f.tag[a](b[f]) && "img" === a && (g.sourceOrder = d.v.sourceOrder,
                                d.v.sourceOrder = d.v.sourceOrder + 1,
                                g.src && (g.media = g.src,
                                delete g.src),
                                d.f.runMods(a, g, b[f]),
                                g.description || (j = g.media.split("/").pop(),
                                k = j.split(".")[0],
                                (g.title === j || g.title === k) && (g.title = null ),
                                (g.alt === j || g.alt === k) && (g.alt = null ),
                                g.description = g.title || g.alt || d.v.meta.pinterest.description || d.v.meta.og.description || d.v.meta.og.title || d.d.title || void 0),
                                d.v.found.push(g))
                            }
                },
                arrange: function() {
                    var a, b, c, e, f, g;
                    for (a = 0,
                    b = d.v.found.length; a < b; a += 1)
                        g = 0,
                        c = d.v.found[a],
                        c.dataPinDescription && (c.description = c.dataPinDescription),
                        c.description = c.description.substring(0, 497),
                        497 === c.description.length && (c.description = c.description + "..."),
                        "number" === typeof c.naturalHeight && c.naturalHeight && (c.height = c.naturalHeight,
                        delete c.naturalHeight),
                        "number" === typeof c.naturalWidth && c.naturalWidth && (c.width = c.naturalWidth,
                        delete c.naturalWidth),
                        e = parseInt(c.height),
                        f = parseInt(c.width),
                        f > e && (f = e),
                        e > 3 * f && (e = 3 * f),
                        g = e * f,
                        c.isCanonical && (g = 3 * g),
                        (c.dataPinId || c.pinItButton || c.dataPinMedia || c.dataPinUrl || c.metaPinterest) && (g = 3 * g),
                        c.isVideo && (g = 3 * g),
                        c.sourceBump && (g = 3 * g),
                        f < d.a.thumbCellSize && (g /= 2,
                        d.v.hazSet.sourceBump && (g /= 10)),
                        c.metaOg && b > 1 && f < d.a.thumbCellSize && (g /= 100),
                        c.usemap && (g /= 100),
                        c.sourceOrder && (g -= 100 * c.sourceOrder),
                        c.order = g;
                    if (d.v.found.length && !d.v.doNotSort) {
                        var h = function(a, b) {
                            return b.order - a.order
                        }
                        ;
                        for (d.v.found.sort(h),
                        g = d.v.found[0].order,
                        a = 1,
                        b = d.v.found.length; a < b; a += 1)
                            if (d.v.found[a].order < g / d.v.config.quality) {
                                d.v.found[a].halt = !0;
                                break
                            }
                    }
                },
                log: function(a) {
                    var b, c, e;
                    c = a.url || d.d.URL,
                    b = "?type=pinmarklet&pmUrl=" + encodeURIComponent(c) + "&pmReason=" + encodeURIComponent(a.reason),
                    a.time && (b = b + "&pmTime=" + a.time),
                    a.img && (b = b + "&pmImg=" + encodeURIComponent(a.img)),
                    "bookmarklet_rendered" === a.reason && (d.v.config.via && (b = b + "&pmVia=" + encodeURIComponent(d.v.config.via)),
                    d.v.config.xuid && (b = b + "&pmXuid=" + encodeURIComponent(d.v.config.xuid)),
                    d.v.config.guid && (b = b + "&pmGuid=" + encodeURIComponent(d.v.config.guid))),
                    d.w.setTimeout(function() {
                        e = new Image,
                        e.src = d.a.log + b,
                        d.f.debug("Logging: " + e.src)
                    }, d.a.maxWait)
                },
                done: function() {
                    var a, b;
                    if (d.f.debug("done"),
                    d.v.data.close)
                        d.v.config.quiet || d.w.alert(d.v.data.close);
                    else {
                        for (d.f.arrange(),
                        d.v.data.thumb = d.v.found,
                        a = 0,
                        b = d.v.data.thumb.length; a < b; a += 1)
                            d.v.data.thumb[a].src = d.v.data.thumb[a].media,
                            d.v.data.thumb[a].isVideo && (d.v.data.thumb[a].multimedia = !0);
                        if (d.v.config.share)
                            return d.f.debug("ios share"),
                            d.d.b.setAttribute(d.v.config.share, JSON.stringify(d.v.data)),
                            void (d.v.data.thumb.length || d.v.config.quiet || d.w.alert(d.v.msg.noPinnablesFound));
                        if (d.w[d.v.config.render] && "function" === typeof d.w[d.v.config.render])
                            return d.f.debug("custom render"),
                            void d.w[d.v.config.render](d.v.data);
                        d.v.defaultBodyOverflow = "",
                        "function" === typeof d.w.getComputedStyle && "function" === d.w.getComputedStyle(d.d.b).getPropertyValue && (d.v.defaultBodyOverflow = d.w.getComputedStyle(d.d.b).getPropertyValue("overflow")),
                        "visible" === d.v.defaultBodyOverflow && (d.v.defaultBodyOverflow = ""),
                        d.d.b.style.overflow = "hidden",
                        d.f.debug("darkmark share"),
                        d.v.data.config = d.v.config,
                        d.v.data.hazExtension = d.f.get(d.d.b, "data-pinterest-extension-installed");
                        var c = JSON.stringify(d.v.data);
                        d.s.dark = d.f.make({
                            IFRAME: {
                                id: d.a.k + "_grid",
                                src: d.a.grid + "?" + (new Date).getTime(),
                                frameBorder: "0",
                                style: {
                                    display: "block",
                                    position: "fixed",
                                    height: "100%",
                                    width: "100%",
                                    top: "0",
                                    left: "0",
                                    bottom: "0",
                                    right: "0",
                                    margin: "0",
                                    clip: "auto",
                                    "z-index": "9223372036854775807"
                                }
                            }
                        });
                        var e = function() {
                            d.d.b.style.overflow = d.v.defaultBodyOverflow,
                            d.d.b.removeAttribute(d.a.hazPinningNow),
                            d.f.kill(d.s.dark)
                        }
                          , f = (new Date).getTime();
                        d.s.dark.onload = function() {
                            var a = (new Date).getTime() - f;
                            d.f.debug("Grid render time: " + a),
                            d.f.log({
                                reason: "bookmarklet_rendered",
                                time: a
                            }),
                            d.v.receiver = d.s.dark.contentWindow,
                            d.v.receiver.postMessage(c, d.s.dark.src),
                            d.f.listen(d.w, "message", function(a) {
                                d.w.clearTimeout(d.v.renderFailed),
                                "x" === a.data && e()
                            }),
                            this.focus()
                        }
                        ,
                        d.f.set(d.d.b, d.a.hazPinningNow, "true"),
                        d.d.b.appendChild(d.s.dark),
                        d.v.renderFailed = d.w.setTimeout(function() {
                            d.f.log({
                                reason: "iframe_timeout"
                            }),
                            d.w.alert(d.v.msg.noPinnablesFound),
                            e()
                        }, d.a.maxWait)
                    }
                },
                setLang: function(a) {
                    a && ("object" === typeof d.a.msg[a] ? (d.f.debug("Set language " + a),
                    d.v.msg = d.a.msg[a],
                    d.v.data.msg = d.v.msg) : (a = a.split("-")[0],
                    "object" === typeof d.a.msg[a] ? (d.f.debug("Set language " + a),
                    d.v.msg = d.a.msg[a],
                    d.v.data.msg = d.v.msg) : (d.f.debug("Default language to en"),
                    d.v.msg = d.a.msg.en,
                    d.v.data.msg = d.v.msg)))
                },
                getLang: function() {
                    var a;
                    a = d.d.getElementsByTagName("HTML")[0].getAttribute("lang") || "en",
                    a && (a = a.toLowerCase(),
                    d.f.setLang(a))
                },
                init: function() {
                    var a;
                    d.d.b = d.d.getElementsByTagName("BODY")[0],
                    d.d.b && (d.w.getComputedStyle || (d.w.getComputedStyle = function() {
                        return !1
                    }
                    ),
                    d.f.get(d.d.b, d.a.hazPinningNow) || (d.d.d = d.d.documentElement,
                    d.d.h = d.d.getElementsByTagName("HEAD")[0],
                    d.v = {
                        sourceOrder: 0,
                        canonicalUrl: d.d.URL,
                        src: {},
                        config: {
                            pinMethod: "bookmarklet",
                            quality: d.a.quality,
                            favicon: d.w.location.protocol + "//" + d.d.URL.split("/")[2] + "/favicon.ico",
                            xv: d.d.b.getAttribute(d.a.xv)
                        },
                        hazSet: {},
                        meta: {
                            og: {},
                            pinterest: {}
                        },
                        imgLoadingCount: 0,
                        callbackLoadingCount: 0,
                        srcDomain: {},
                        extensionVer: d.f.get(d.d.b, "data-pinterest-extension-installed") || void 0,
                        msg: d.a.msg.en,
                        css: "",
                        data: {
                            blacklistedSource: {},
                            thumb: []
                        },
                        found: []
                    },
                    d.f.getLang(),
                    d.f.getConfig(),
                    d.v.data.url = d.d.URL,
                    d.v.config.pinbox && (d.v.data.pinbox = d.v.config.pinbox),
                    d.f.check.domain(d.d.URL) ? (d.f.runMods("page"),
                    d.f.getTags(),
                    d.f.runMods("meta"),
                    d.v.safety = d.w.setTimeout(function() {
                        d.v.check && d.w.clearTimeout(d.v.check),
                        d.f.done()
                    }, d.a.maxWait),
                    (a = function() {
                        d.v.imgLoadingCount > 0 || d.v.callbackLoadingCount > 0 ? d.v.check = d.w.setTimeout(a, 100) : (d.v.safety && d.w.clearTimeout(d.v.safety),
                        d.f.done())
                    }
                    )()) : (d.v.data.close = d.v.msg.noPinDomain,
                    d.f.done())))
                }
            }
        }()
    };
    d.f.init()
}(window, document, {
    k: "PIN_" + (new Date).getTime(),
    me: /\/\/assets\.pinterest\.com\/js\/pinmarklet\.js/, //may need to change to location of script to "cdn.rawgit.com/MStasiw/Bookmarklets/a69bfaac/pinmarklet.js"
    grid: "https://assets.pinterest.com/ext/grid.html",
    maxWait: 5e3,
    quality: 30, //is this quality pinned image saved as?
    xv: "data-pinterest-extension-installed",
    log: "https://log.pinterest.com/",
    hazPinningNow: "data-pinterest-pinmarklet-rendered",
    pattern: {
        instagram: {
            page: /^https?:\/\/(.*?\.|)instagram\.com\//,
            url: /^https?:\/\/(.*?\.|)instagram\.com\/p\//
        },
        amazon: {
            media: /^https?:\/\/(.*?\.|)images-amazon\.com\/images\//,
            page: /^https?:\/\/(.*?\.|)amazon\.com\//
        },
        pinterest: {
            page: /^https?:\/\/(.*?\.|)pinterest\.com\//
        },
        facebook: {
            page: /^https?:\/\/([a-zA-Z0-9]*\.|)facebook\.com\//
        },
        craigslist: {
            page: /^https?:\/\/(.*?\.|)craigslist\.org\//
        },
        itunes: {
            page: /^https?:\/\/itunes\.apple\.com\//
        },
        youtube: {
            iframe: /^https?:\/\/www\.youtube\.com\/embed/,
            media: /^https?:\/\/(.*?\.|)ytimg\.com\/(vi|li)\//,
            page: /^https?:\/\/(.*?\.|)youtube\.com\//
        },
        flickr: {
            media: /^https?:\/\/(.*?)\.staticflickr\.com\//,
            page: /^https?:\/\/www\.flickr\.com\//
        },
        "500px": {
            media: /^https?:\/\/(.*?)\.500px\.org\//
        },
        vimeo: {
            iframe: /^https?:\/\/player\.vimeo\.com\/video\//,
            media: /^https?:\/\/i\.vimeocdn\.com\/video\//,
            page: /^https?:\/\/vimeo\.com\//
        },
        google: {
            page: /^https?:\/\/www\.google\.com\/search(.*&tbm=isch.*)/
        },
        twitter: {
            page: /^https?:\/\/twitter\.com\//
        },
        wikipedia: {
            page: /^https?:\/\/(.*?\.|)wikipedia\.org\//
        }
    },
    validConfigParam: ["debug", "noCancel", "noHeader", "pinMethod", "render", "share", "quiet", "quality", "pinbox", "pinfave", "via", "xuid", "edu", "guid"],
    validImageFileType: {
        gif: 1,
        jpg: 1,
        jpeg: 1,
        png: 1,
        svg: 1, //I added
        webp: 1
    },
    invalidImageFileType: {
        dummy: 1 //was svg: 1
    },
    imgLimitMin: 79,//was 119   //I think these
    imgLimitFloor: 79,          //two should be equal
    imgLimitHorz: 3,
    thumbCellSize: 236,
    thumbCellMargin: 14,
    tag: {
        link: ["rel", "href"],
        meta: ["name", "content", "property", "http-equiv", "content-language"],
        a: ["data-pin-href", "data-pin-id"],
        iframe: ["src"],
        img: ["src", "title", "alt", "naturalHeight", "naturalWidth", "nopin", "data-pin-nopin", "data-pin-id", "data-pin-media", "data-pin-url", "data-pin-description", "usemap"]
    },
    cdn: {
        "https:": "https://s-passets.pinimg.com",
        "http:": "http://passets.pinterest.com"
    },
    msg: {
        en: {
            noPinDomain: "Sorry, pinning is not allowed from this domain. Please contact the site operator if you have any questions.",
            noPinMeta: "Sorry, pinning is not allowed from this page. Please contact the site operator if you have any questions.",
            noPinnablesFound: "Sorry, couldn't find any pinnable things on this page.",
            noPinningFromPinterest: "Oops! That button doesn't work on Pinterest. Try using the red Pin It button at the top of any Pin.",
            choosePin: "Choose a Pin to save",
            nagText: "Upgrade to the new Pin It button for %s%",
            nagDismiss: "No, thanks.",
            nagLink: "Get it now!",
            nagSlug: "It's easier to pin from your browser when you find something good on the web"
        },
        cs: {
            noPinDomain: "Je nám líto. Z této domény není možné přidávat piny. S dotazy se obracejte na provozovatele webu.",
            noPinMeta: "Je nám líto. Z této stránky není možné přidávat piny. S dotazy se obracejte na provozovatele webu.",
            noPinnablesFound: "Je nám líto. Na této stránce jsme nenalezli žádný obsah, který by bylo možné připnout.",
            noPinningFromPinterest: "Jejda. Tohle tlačítko na Pinterestu nefunguje. Zkuste použít červené tlačítko Pin It v horní části kteréhokoliv pinu.",
            choosePin: "Zvolte pin, který chcete uložit",
            nagText: "Jediným kliknutím ukládejte kreativní nápady z celého internetu",
            nagDismiss: "Ne, díky.",
            nagLink: "Stáhnout tlačítko do prohlížeče",
            nagSlug: "Snadnější vytváření pinů přímo z prohlížeče ve chvíli, kdy najdete na internetu něco zajímavého"
        },
        da: {
            noPinDomain: "Det er ikke muligt at tilføje pins fra domænet. Kontakt websitets ejer, hvis du har spørgsmål.",
            noPinMeta: "Det er ikke tilladt at sætte pins op fra denne side. Kontakt websitets ejer, hvis du har spørgsmål.",
            noPinnablesFound: "Der er ikke rigtigt noget at sætte op på denne side.",
            noPinningFromPinterest: "Den knap virker desværre ikke på Pinterest. Prøv den røde Pin It-knap øverst på en pin i stedet for.",
            choosePin: "Vælg den pin, du vil gemme",
            nagText: "Gem kreative idéer fra hele nettet med et enkelt klik",
            nagDismiss: "Nej tak",
            nagLink: "Hent vores browserknap",
            nagSlug: "Det er lettere at tilføje pins direkte fra din browser, når du finder noget godt på nettet"
        },
        de: {
            noPinDomain: "Es tut uns leid, aber von dieser Domain kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",
            noPinMeta: "Es tut uns leid, aber von dieser Seite kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",
            noPinnablesFound: "Es tut uns leid, aber wir konnten auf dieser Seite nichts finden, was du pinnen könntest.",
            noPinningFromPinterest: 'Hoppla!\nDieser Button funktioniert auf Pinterest nicht.\nVersuchen Sie es stattdessen mit dem roten „Pin It"-Button, der sich oberhalb jedes Pins befindet.',
            choosePin: "Wähle den Pin, den du speichern möchtest",
            nagText: "Hol dir den neuen Pin it-Button für %s%",
            nagDismiss: "Nein, bitte.",
            nagLink: "Jetzt holen!",
            nagSlug: "Du kannst so ganz einfach von deinem Browser aus pinnen,  wenn du etwas Interessantes im Internet findest."
        },
        es: {
            noPinDomain: "Lo sentimos, no está permitido pinear desde este dominio. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",
            noPinMeta: "Lo sentimos, no está permitido pinear desde esta página. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",
            noPinnablesFound: "Lo sentimos, no hemos encontrado ningún elemento que se pueda pinear en esta página.",
            noPinningFromPinterest: "¡Vaya! \nEse botón no funciona en Pinterest. \nUsa el botón Pin It rojo que se encuentra en la parte superior de cualquier Pin.",
            choosePin: "Elige un Pin que guardar",
            nagText: "Actualice al nuevo botón Pin It para %s%",
            nagDismiss: "No, gracias.",
            nagLink: "Consiguelo ahora!",
            nagSlug: "Es más fácil de precisar desde su navegador cuando usted encuentra algo bueno en la Web."
        },
        "es-mx": {
            noPinDomain: "Lamentablemente, no está permitido pinear desde este dominio. Si quieres hacer consultas, comunícate con el operador del sitio.",
            noPinMeta: "Lamentablemente, no está permitido pinear desde esta página. Si quieres hacer consultas, comunícate con el operador del sitio.",
            noPinnablesFound: "Lamentablemente, no se encontraron cosas para pinear en esta página.",
            noPinningFromPinterest: "¡Uy! \nEse botón no funciona en Pinterest.\nIntenta con el botón rojo de Pin It, ubicado en la parte superior de cualquier Pin.",
            choosePin: "Elige un Pin para guardarlo",
            nagText: "Actualice al nuevo botón Pin It para %s%",
            nagDismiss: "No, gracias.",
            nagLink: "Consiguelo ahora!",
            nagSlug: "Es más fácil de precisar desde su navegador cuando usted encuentra algo bueno en la Web."
        },
        el: {
            noPinDomain: "Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτόν τον τομέα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.",
            noPinMeta: "Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτήν τη σελίδα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.",
            noPinnablesFound: "Λυπάμαι, δεν ήταν δυνατή η εύρεση στοιχείων που μπορούν να καρφιτσωθούν σε αυτήν τη σελίδα.",
            noPinningFromPinterest: "Δυστυχώς, αυτό το κουμπί δεν λειτουργεί στο Pinterest. Δοκιμάστε να χρησιμοποιήσετε το κόκκινο κουμπί Pin It στο επάνω μέρος οποιουδήποτε pin.",
            choosePin: "Επιλέξτε ένα pin για αποθήκευση",
            nagText: "Κάντε αναβάθμιση στο νέο κουμπί Pin It για %s%",
            nagDismiss: "Όχι, ευχαριστώ.",
            nagLink: "Λήψη τώρα!",
            nagSlug: "Είναι πιο εύκολο να καρφιτσώνετε από το πρόγραμμα περιήγησης, όταν βρίσκετε κάτι καλό στο web"
        },
        fi: {
            noPinDomain: "Et voi tehdä Pin-lisäyksiä tästä verkkotunnuksesta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.",
            noPinMeta: "Et voi tehdä Pin-lisäyksiä tältä sivulta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.",
            noPinnablesFound: "Sivulta ei valitettavasti löydy sisältöä, jota voi lisätä.",
            noPinningFromPinterest: "Hups! Painike ei toimi Pinterestissä. Käytä Pin-lisäyksen yläosassa näkyvää punaista Pin it -painiketta.",
            choosePin: "Valitse tallennettava Pin",
            nagText: "Hanki uusi Pin it -painike (%s%)",
            nagDismiss: "Ei kiitos.",
            nagLink: "Hanki painike",
            nagSlug: "Sillä lisäät netistä tekemäsi löydöt helposti selaimesta Pinterestiin"
        },
        fr: {
            noPinDomain: "Désolé, mais vous ne pouvez pas épingler les contenus de ce domaine. Pour toute question, veuillez contacter l'administrateur du site.",
            noPinMeta: "Désolé, mais vous ne pouvez pas épingler les contenus de cette page. Pour toute question, veuillez contacter l'administrateur du site.",
            noPinnablesFound: "Désolé, mais aucun contenu susceptible d'être épinglé n'a été trouvé sur cette page.",
            noPinningFromPinterest: "Oups…\nCe bouton ne fonctionne pas sur Pinterest.\nEssayez d'utiliser le bouton rouge Pin It en haut de chaque épingle.",
            choosePin: "Choisissez une épingle à enregistrer",
            nagText: "Installez le nouveau bouton Pin It pour %s%",
            nagDismiss: "Non merci.",
            nagLink: "Installez-le dès maintenant !",
            nagSlug: "Épinglez plus facilement les contenus intéressants que vous trouvez sur le Web, directement dans votre navigateur."
        },
        id: {
            noPinDomain: "Maaf, Anda tidak diizinkan mengepin dari domain ini. Hubungi operator situs jika Anda memiliki pertanyaan.",
            noPinMeta: "Maaf, Anda tidak diizinkan mengepin dari halaman ini. Silakan hubungi operator situs jika Anda memiliki pertanyaan.",
            noPinnablesFound: "Maaf, tidak ada yang bisa dipin dari halaman ini.",
            noPinningFromPinterest: "Duh! Tombol itu tidak bisa berfungsi di Pinterest. Cobalah menggunakan tombol Pin It di Pin mana saja",
            choosePin: "Pilih Pin untuk disimpan",
            nagText: "Simpan ide-ide kreatif dari seluruh penjuru web dengan sekali klik",
            nagDismiss: "Tidak, terima kasih.",
            nagLink: "Dapatkan tombol browser kami",
            nagSlug: "Lebih gampang mengepin langsung di browser Anda ketika menemukan sesuatu yang menarik di web"
        },
        it: {
            noPinDomain: "Ci dispiace, ma l'aggiunta di Pin non è consentita da questo dominio. Se hai domande, contatta il gestore del sito.",
            noPinMeta: "Ci dispiace, ma l'aggiunta di Pin non è consentita da questa pagina. Se hai domande, contatta il gestore del sito.",
            noPinnablesFound: "Spiacenti, impossibile trovare immagini o video che è possibile aggiungere ai Pin in questa pagina.",
            noPinningFromPinterest: "Spiacenti! Questo pulsante non funziona su Pinterest. Prova a utilizzare il pulsante rosso Pin It nella parte superiore di qualsiasi Pin.",
            choosePin: "Scegli un Pin da salvare",
            nagText: "Utilizza il nuovo pulsante Pin It per %s%",
            nagDismiss: "No grazie.",
            nagLink: "Installalo ora!",
            nagSlug: "Semplifica l'aggiunta di Pin dal browser quando trovi qualcosa di interessante sul Web"
        },
        hi: {
            noPinDomain: "क्षमा करें, इस डोमेन से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।",
            noPinMeta: "क्षमा करें, इस पेज से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।",
            noPinnablesFound: "क्षमा करें, इस पेज पर कोई भी पिन लगाने वाली चीज़ नहीं मिल सकी।",
            noPinningFromPinterest: "ओह! वह बटन Pinterest पर काम नहीं करता। किसी भी पिन के टॉप पर लाल पिन इट बटन का इस्तेमाल करने की कोशिश करें।",
            choosePin: "सेव करने के लिए एक पिन को चुनें",
            nagText: "एक क्लिक के साथ वेब में इधर-उधर से मिलने वाले रचनात्मक विचारों को सेव करें",
            nagDismiss: "जी नहीं, धन्यवाद।",
            nagLink: "हमारा ब्राउज़र बटन प्राप्त करें",
            nagSlug: "जब आपको वेब पर कुछ अच्छा दिखाई दे तो सीधे अपने ब्राउज़र से पिन करना आसान होता है"
        },
        hu: {
            noPinDomain: "Sajnáljuk, ebből a tartományból nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.",
            noPinMeta: "Sajnáljuk, erről az oldalról nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.",
            noPinnablesFound: "Sajnáljuk, ezen az oldalon nem található semmilyen pinelhető dolog.",
            noPinningFromPinterest: "Hoppá! Ez a gomb nem működik a Pinteresten. Próbáld meg a pinek bal felső sarkában lévő piros Pin It gombot használni.",
            choosePin: "Válassz egy menteni kívánt pint",
            nagText: "Kreatív ötletek mentése az internetről egyetlen kattintással",
            nagDismiss: "Nem, köszönöm.",
            nagLink: "Töltsd le böngészőgombunkat",
            nagSlug: "Egyszerűbb közvetlenül a böngészőből pinelni, ha valami érdekeset találsz az interneten"
        },
        ja: {
            noPinDomain: "し訳ありません。HTML 以外のページでピンすることはできません。画像をアップロードしようと試みている場合は、pinterest.com にアクセスしてください。",
            noPinMeta: "このページからのピンは許可されていません。ご質問がある場合は、サイト運営者にお問い合わせください。",
            noPinnablesFound: "申し訳ございません、このページでピンできるアイテムは見つかりませんでした。",
            noPinningFromPinterest: "Pinterest ではこのボタンは使えません。\nピンの上部にある赤い [ピン] ボタンをお使いください。",
            choosePin: "保存するピンを選択",
            nagText: "[ピン] ボタンをアップグレードする %s%",
            nagDismiss: "結構です。",
            nagLink: "今すぐダウンロード",
            nagSlug: "ウェブサイトから何かピンしたいモノを見つけたとき、ブラウザから簡単に直接ピンすることができます"
        },
        ko: {
            noPinDomain: "죄송합니다. 이 도메인에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.",
            noPinMeta: "죄송합니다. 이 페이지에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.",
            noPinnablesFound: "죄송합니다. 이 페이지에서 핀할 수 있는 것을 찾지 못했습니다.",
            noPinningFromPinterest: "죄송합니다. Pinterest에서 사용할 수 없는 버튼입니다. 핀 상단에 있는 빨간색 Pin It 버튼을 사용해 보세요.",
            choosePin: "저장할 핀을 선택하세요.",
            nagText: "한 번의 클릭으로 웹에서 찾은 창의적인 아이디어를 저장하세요.",
            nagDismiss: "하지 않음",
            nagLink: "브라우저 버튼 다운로드",
            nagSlug: "웹에서 유용한 내용을 발견했을 때 브라우저에서 직접 핀하기가 더욱 편리해졌습니다."
        },
        ms: {
            noPinDomain: "Maaf, mengepin tidak dibenarkan dari domain ini. Sila hubungi pengendali laman jika anda ada sebarang solan.",
            noPinMeta: "Maaf, mengepin tidak dibenarkan dari halaman ini. Sila hubungi pengendali laman jika anda ada sebarang soalan.",
            noPinnablesFound: "Maaf, tidak dapat mencari sebarang imej yang boleh dipin pada halaman ini.",
            noPinningFromPinterest: "Alamak! Butang itu tidak berfungsi di Pinterest. Sila cuba menggunakan butang Pin It merah di atas mana-mana Pin.",
            choosePin: "Pilih Pin untuk disimpan",
            nagText: "Simpan idea kreatif dari seluruh web dengan satu klik",
            nagDismiss: "Tidak, terima kasih.",
            nagLink: "Dapatkan butang pelayar kami",
            nagSlug: "Ianya lebih mudah untuk mengepin terus dari pelayar anda apabila anda menjumpai sesuatu yang bagus di web"
        },
        nb: {
            noPinDomain: "Beklager, pinning er ikke tillatt fra dette domenet. Ta kontakt med webmasteren hvis du har spørsmål.",
            noPinMeta: "Beklager, pinning er ikke tillatt fra denne siden. Ta kontakt med webmasteren hvis du har spørsmål.",
            noPinnablesFound: "Beklager, kunne ikke finne noen ting som kunne pinnes på denne siden.",
            noPinningFromPinterest: "Oops! Den knappen fungerer ikke på Pinterest. Prøv å bruke den røde Pin It-knappen som er på toppen av alle Pins.",
            choosePin: "Velg en Pin å lagre",
            nagText: "Oppgrader til den nye Pin It-knappen for %s%",
            nagDismiss: "Nei takk.",
            nagLink: "Få den nå!",
            nagSlug: "Det er enklere å pinne fra nettleseren når du finner noe bra på nettet"
        },
        nl: {
            noPinDomain: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",
            noPinMeta: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",
            noPinnablesFound: "Sorry, er is niets wat je kunt pinnen op deze pagina.",
            noPinningFromPinterest: "Oeps!\nDie knop werkt niet op Pinterest.\nProbeer de rode Pin It-knoppen die boven pins zweven.",
            choosePin: "Kies een pin om te bewaren",
            nagText: "Upgrade naar de nieuwe Pin It-knop voor %s%",
            nagDismiss: "Nei takk.",
            nagLink: "Nu installeren!",
            nagSlug: "Het is makkelijker om direct vanuit je browser te pinnen als je iets leuks op het internet vindt"
        },
        pl: {
            noPinDomain: "Niestety przypinanie z tej domeny jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.",
            noPinMeta: "Niestety przypinanie z tej strony jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.",
            noPinnablesFound: "Niestety na tej stronie nie ma żadnych rzeczy do przypinania.",
            noPinningFromPinterest: "Ups! Ten przycisk nie działa na Pintereście. Spróbuj użyć czerwonego przycisku Pin It u góry dowolnego Pina.",
            choosePin: "Wybierz Pina do zapisania",
            nagText: "Zmień na nowy przycisk Pin It dla przeglądarki %s%",
            nagDismiss: "Nie, dzięki.",
            nagLink: "Pobierz teraz!",
            nagSlug: "Łatwiej przypinaj z przeglądarki, kiedy znajdziesz coś ciekawego w sieci."
        },
        pt: {
            noPinDomain: "Lamentamos, mas não é permitido afixar pins a partir deste domínio. Em caso de dúvidas, contacta o operador do site.",
            noPinMeta: "Lamentamos, mas não é permitido afixar pins a partir desta página. Em caso de dúvidas, contacta o operador do site.",
            noPinnablesFound: "Lamentamos, mas não foi possível encontrar nesta página nenhum conteúdo que possa ser afixado.",
            noPinningFromPinterest: "Ups! \nEsse botão não funciona no Pinterest. \nTenta utilizar o botão vermelho Pin It, que se encontra na parte superior de cada Pin.",
            choosePin: "Escolhe um Pin para guardar",
            nagText: "Faz a atualização para o novo botão Pin It %s%",
            nagDismiss: "Não obrigado.",
            nagLink: "Instala-o já!",
            nagSlug: "É mais fácil adicionar Pins diretamente do browser, quando encontras algo de que gostas na Web"
        },
        "pt-br": {
            noPinDomain: "Não é possível pinar a partir deste domínio. Entre em contato com o operador do site se tiver dúvidas.",
            noPinMeta: "Não é possível pinar a partir desta página. Entre em contato com o operador do site se tiver dúvidas.",
            noPinnablesFound: "Não foi possível encontrar nesta página conteúdo que possa ser pinado.",
            noPinningFromPinterest: "Opa!\nEste botão não funciona no Pinterest.\nTente usar o botão vermelho Pin It, localizado na parte superior de qualquer Pin.",
            choosePin: "Escolha um Pin para salvar",
            nagText: "Faça o upgrade para o novo botão Pin It %s%",
            nagDismiss: "Não obrigado.",
            nagLink: "Obtenha agora!",
            nagSlug: "É mais fácil adicionar Pins diretamente do navegador quando você encontra algo legal na Web"
        },
        ro: {
            noPinDomain: "Ne pare rău, nu se pot adăuga Pinuri de pe acest site. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.",
            noPinMeta: "Ne pare rău, nu se pot adăuga Pinuri de pe această pagină. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.",
            noPinnablesFound: "Ne pare rău, nu am putut găsi conținut pentru adăugat ca Pinuri pe această pagină.",
            noPinningFromPinterest: "Oops! Acest buton nu funcționează pe Pinterest. Încearcă să folosești butonul roșu Pin It din partea de sus a oricărui Pin.",
            choosePin: "Alege un Pin pe care să-l salvezi",
            nagText: "Salvează idei creative de pe internet cu un singur click",
            nagDismiss: "Nu, mulțumesc.",
            nagLink: "Descarcă butonul nostru pentru browser",
            nagSlug: "E mai simplu să adaugi pinuri direct din browser când găsești ceva interesant pe net."
        },
        ru: {
            noPinDomain: "К сожалению, прикалывание Пинов в данном домене невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.",
            noPinMeta: "К сожалению, прикалывание Пинов с данной страницы невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.",
            noPinnablesFound: "На этой странице нет ничего, что можно было бы приколоть.",
            noPinningFromPinterest: "К сожалению, данная кнопка не работает в Pinterest. Попробуйте использовать красную кнопку Pin It, находящуюся в верхней части любого Пина.",
            choosePin: "Выберите Пин, который нужно сохранить.",
            nagText: "Сохраняйте интересные идеи, найденные на просторах Интернета, одним нажатием.",
            nagDismiss: "Нет, спасибо.",
            nagLink: "Установите кнопку для браузера.",
            nagSlug: "Вам будет на много проще прикалывать ваши находки в Интернете прямо из вашего браузера."
        },
        sk: {
            noPinDomain: "Prepáčte, z tejto domény si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.",
            noPinMeta: "Prepáčte, z tejto stránky si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.",
            noPinnablesFound: "Prepáčte, na tejto stránke sme nenašli nič na pripnutie.",
            noPinningFromPinterest: "Hopla! To tlačidlo nefunguje na Pintereste. Skúste použiť červené tlačidlo Pin It navrchu hociktorého pinu.",
            choosePin: "Vyberte si pin, ktorý si uložíte",
            nagText: "Jedným kliknutím si ukladajte kreatívne nápady, na ktoré natrafíte na webe.",
            nagDismiss: "Nie, ďakujem.",
            nagLink: "Získajte naše tlačidlo pre prehliadač",
            nagSlug: "Jednoduchšie sa vám bude pripínať priamo z prehliadača, keď niečo zaujímavé nájdete na webe"
        },
        sv: {
            noPinDomain: "Tyvärr går det inte att pinna från den här domänen. Kontakta webbplatsoperatören om du har frågor.",
            noPinMeta: "Det går inte att pinna från den här sidan. Kontakta webbplatsoperatören om du har frågor.",
            noPinnablesFound: "Det gick inte att hitta något på den här sidan som går att pinna.",
            noPinningFromPinterest: "Hoppsan! Den knappen fungerar inte på Pinterest. Försök använda den röda Pin It-knappen överst på varje pin.",
            choosePin: "Välj en pin som du vill spara",
            nagText: "Uppgradera till den nya Pin It-knappen för %s%",
            nagDismiss: "Nej, tack",
            nagLink: "Hämta nu!",
            nagSlug: "Det är enklare att lägga till pins direkt från webbläsaren när du hittar något spännande på webben"
        },
        th: {
            noPinDomain: "ขออภัย โดเมนนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย",
            noPinMeta: "ขออภัย เพจนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย",
            noPinnablesFound: "ขออภัย ไม่พบอะไรที่ปักพินได้ในเพจนี้",
            noPinningFromPinterest: "โอ๊ะ! ปุ่มนั้นใช้ไม่ได้กับ Pinterest ลองใช้ปุ่ม Pin It สีแดงด้านบนของพินสิ",
            choosePin: "เลือกพินที่ต้องการบันทึก",
            nagText: "อัพเกรดเป็นปุ่มใหม่ Pin It สำหรับ % s%",
            nagDismiss: "ไม่ล่ะ ขอบคุณ",
            nagLink: "ดาวน์โหลดเลย!",
            nagSlug: "การปักพินจากเบราว์เซอร์ทำได้ง่ายขึ้นเมื่อคุณเจออะไรดีๆ ในเว็บ"
        },
        tl: {
            noPinDomain: "Sorry, hindi allowed ang pinning sa domain na 'to. Paki-contact ang site operator kung may tanong ka.",
            noPinMeta: "Sorry, hindi allowed ang pinning mula sa page na 'to. Paki-contact ang site operator kung may tanong ka.",
            noPinnablesFound: "Sorry, walang makitang puwedeng i-pin sa page na 'to.",
            noPinningFromPinterest: "Ay, teka! Hindi gumagana ang button na 'yan sa Pinterest. Subukan ang pulang Pin It button sa itaas ng anumang Pin.",
            choosePin: "Pumili ng Pin na ise-save",
            nagText: "Mag-upgrade sa bagong Pin It button na 'to para sa% s%",
            nagDismiss: "Salamat pero okay lang kahit hindi.",
            nagLink: "Kunin na ito!",
            nagSlug: "Mas madaling mag-pin galing sa browser mo kapag may nagustuhan ka sa web."
        },
        tr: {
            noPinDomain: "Üzgünüz, bu alan adından pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.",
            noPinMeta: "Üzgünüz, bu sayfadan pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.",
            noPinnablesFound: "Üzgünüz, bu sayfada pinlenebilecek bir şey bulunamadı.",
            noPinningFromPinterest: "Dikkat! Bu düğme Pinterest'te çalışmaz. Herhangi bir Pinin üst tarafındaki kırmızı Pin It düğmesini kullanmayı deneyin.",
            choosePin: "Saklamak istediğiniz Pini seçin",
            nagText: "İnternette bulduğunuz yaratıcı fikirleri tek tıklamayla kaydedin",
            nagDismiss: "Hayır, istemiyorum.",
            nagLink: "Tarayıcı düğmemizi edinin",
            nagSlug: "İnternette güzel bir şey bulduğunuzda tarayıcınızdan Pinlemeniz daha kolaydır."
        },
        uk: {
            noPinDomain: "На жаль, приколювати піни з цього домену не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
            noPinMeta: "На жаль, приколювати піни з цієї сторінки не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
            noPinnablesFound: "На жаль, ми не змогли знайти на цій сторінці зображень, які можна було б приколоти.",
            noPinningFromPinterest: "Ой! Ця кнопка не працює у Pinterest. Спробуйте скористатися червоною кнопкою «Pin It», що знаходиться у верхній частині кожного піна.",
            choosePin: "Оберіть пін, який хотіли б зберегти",
            nagText: "Оновіть %s% до нової кнопки «Pin It»",
            nagDismiss: "Ні, дякую.",
            nagLink: "Встановити зараз!",
            nagSlug: "З її допомогою приколювати піни з сайтів, що вас зацікавили, набагато легше"
        },
        vi: {
            noPinDomain: "Rất tiếc, không cho phép ghim từ miền này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.",
            noPinMeta: "Rất tiếc, không cho phép ghim từ trang này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.",
            noPinnablesFound: "Rất tiếc, không thể tìm thấy thứ gì ghim được trên trang này.",
            noPinningFromPinterest: "Rất tiếc! Nút đó không hoạt động trên Pinterest. Hãy thử sử dụng nút Pin It màu đỏ ở phía trên bất kỳ Ghim nào.",
            choosePin: "Chọn một Ghim để lưu",
            nagText: "Nâng cấp lên nút Pin It mới cho %s%",
            nagDismiss: "Không, cám ơn.",
            nagLink: "Tải bây giờ!",
            nagSlug: "Sẽ dễ dàng hơn nếu bạn ghim từ trình duyệt web của mình khi bạn tìm thấy thứ gì hay trên web"
        }
    },
    hashList: [/efa3a2deb839/, /20c46b653b00/, /9e2089d8b8f2/, /820a6e7baa0f/, /293aa4f9b3d0/, /1529ad2b2cc8/, /8de5d416e5d2/, /8c2d5961f7af/, /540b2374abf1/, /415215dcadbf/, /dbafdf055617/, /871de03c9980/, /85ae87da6618/, /1d1d5ffa1d50/, /1847807c0ea1/, /08fb2eb6424d/, /a32353817e45/, /71c1f4783e6d/, /79f57d83d54a/, /eefa602a72ed/, /32aa39d04eb4/, /25f7c9982cea/]
});
