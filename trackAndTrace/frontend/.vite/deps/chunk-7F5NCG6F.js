import {
    AccountTransactionType,
    ContractName_exports,
    EntrypointName_exports,
    Parameter_exports,
    getTransactionKindString,
    jsonUnwrapStringify,
    serializeInitContractParameters,
    serializeTypeValue,
    serializeUpdateContractParameters,
    toBuffer,
} from './chunk-UJRN4I3W.js';
import { require_base64_js, require_ieee754 } from './chunk-GNSLCM6O.js';
import { __commonJS, __esm, __export, __reExport, __require, __toCommonJS, __toESM } from './chunk-ANIWD3T6.js';

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs = __commonJS({
    'node_modules/@walletconnect/window-getters/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.getLocalStorage =
            exports.getLocalStorageOrThrow =
            exports.getCrypto =
            exports.getCryptoOrThrow =
            exports.getLocation =
            exports.getLocationOrThrow =
            exports.getNavigator =
            exports.getNavigatorOrThrow =
            exports.getDocument =
            exports.getDocumentOrThrow =
            exports.getFromWindowOrThrow =
            exports.getFromWindow =
                void 0;
        function getFromWindow3(name2) {
            let res = void 0;
            if (typeof window !== 'undefined' && typeof window[name2] !== 'undefined') {
                res = window[name2];
            }
            return res;
        }
        exports.getFromWindow = getFromWindow3;
        function getFromWindowOrThrow3(name2) {
            const res = getFromWindow3(name2);
            if (!res) {
                throw new Error(`${name2} is not defined in Window`);
            }
            return res;
        }
        exports.getFromWindowOrThrow = getFromWindowOrThrow3;
        function getDocumentOrThrow3() {
            return getFromWindowOrThrow3('document');
        }
        exports.getDocumentOrThrow = getDocumentOrThrow3;
        function getDocument3() {
            return getFromWindow3('document');
        }
        exports.getDocument = getDocument3;
        function getNavigatorOrThrow3() {
            return getFromWindowOrThrow3('navigator');
        }
        exports.getNavigatorOrThrow = getNavigatorOrThrow3;
        function getNavigator3() {
            return getFromWindow3('navigator');
        }
        exports.getNavigator = getNavigator3;
        function getLocationOrThrow3() {
            return getFromWindowOrThrow3('location');
        }
        exports.getLocationOrThrow = getLocationOrThrow3;
        function getLocation3() {
            return getFromWindow3('location');
        }
        exports.getLocation = getLocation3;
        function getCryptoOrThrow3() {
            return getFromWindowOrThrow3('crypto');
        }
        exports.getCryptoOrThrow = getCryptoOrThrow3;
        function getCrypto3() {
            return getFromWindow3('crypto');
        }
        exports.getCrypto = getCrypto3;
        function getLocalStorageOrThrow3() {
            return getFromWindowOrThrow3('localStorage');
        }
        exports.getLocalStorageOrThrow = getLocalStorageOrThrow3;
        function getLocalStorage3() {
            return getFromWindow3('localStorage');
        }
        exports.getLocalStorage = getLocalStorage3;
    },
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs2 = __commonJS({
    'node_modules/@walletconnect/window-metadata/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.getWindowMetadata = void 0;
        var window_getters_1 = require_cjs();
        function getWindowMetadata2() {
            let doc;
            let loc;
            try {
                doc = window_getters_1.getDocumentOrThrow();
                loc = window_getters_1.getLocationOrThrow();
            } catch (e3) {
                return null;
            }
            function getIcons() {
                const links = doc.getElementsByTagName('link');
                const icons2 = [];
                for (let i4 = 0; i4 < links.length; i4++) {
                    const link = links[i4];
                    const rel = link.getAttribute('rel');
                    if (rel) {
                        if (rel.toLowerCase().indexOf('icon') > -1) {
                            const href = link.getAttribute('href');
                            if (href) {
                                if (
                                    href.toLowerCase().indexOf('https:') === -1 &&
                                    href.toLowerCase().indexOf('http:') === -1 &&
                                    href.indexOf('//') !== 0
                                ) {
                                    let absoluteHref = loc.protocol + '//' + loc.host;
                                    if (href.indexOf('/') === 0) {
                                        absoluteHref += href;
                                    } else {
                                        const path = loc.pathname.split('/');
                                        path.pop();
                                        const finalPath = path.join('/');
                                        absoluteHref += finalPath + '/' + href;
                                    }
                                    icons2.push(absoluteHref);
                                } else if (href.indexOf('//') === 0) {
                                    const absoluteUrl = loc.protocol + href;
                                    icons2.push(absoluteUrl);
                                } else {
                                    icons2.push(href);
                                }
                            }
                        }
                    }
                }
                return icons2;
            }
            function getWindowMetadataOfAny(...args) {
                const metaTags = doc.getElementsByTagName('meta');
                for (let i4 = 0; i4 < metaTags.length; i4++) {
                    const tag = metaTags[i4];
                    const attributes = ['itemprop', 'property', 'name']
                        .map((target) => tag.getAttribute(target))
                        .filter((attr) => {
                            if (attr) {
                                return args.includes(attr);
                            }
                            return false;
                        });
                    if (attributes.length && attributes) {
                        const content = tag.getAttribute('content');
                        if (content) {
                            return content;
                        }
                    }
                }
                return '';
            }
            function getName() {
                let name3 = getWindowMetadataOfAny('name', 'og:site_name', 'og:title', 'twitter:title');
                if (!name3) {
                    name3 = doc.title;
                }
                return name3;
            }
            function getDescription() {
                const description2 = getWindowMetadataOfAny(
                    'description',
                    'og:description',
                    'twitter:description',
                    'keywords'
                );
                return description2;
            }
            const name2 = getName();
            const description = getDescription();
            const url = loc.origin;
            const icons = getIcons();
            const meta = {
                description,
                url,
                icons,
                name: name2,
            };
            return meta;
        }
        exports.getWindowMetadata = getWindowMetadata2;
    },
});

// node_modules/@walletconnect/browser-utils/node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs3 = __commonJS({
    'node_modules/@walletconnect/browser-utils/node_modules/@walletconnect/window-getters/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.getLocalStorage =
            exports.getLocalStorageOrThrow =
            exports.getCrypto =
            exports.getCryptoOrThrow =
            exports.getLocation =
            exports.getLocationOrThrow =
            exports.getNavigator =
            exports.getNavigatorOrThrow =
            exports.getDocument =
            exports.getDocumentOrThrow =
            exports.getFromWindowOrThrow =
            exports.getFromWindow =
                void 0;
        function getFromWindow3(name2) {
            let res = void 0;
            if (typeof window !== 'undefined' && typeof window[name2] !== 'undefined') {
                res = window[name2];
            }
            return res;
        }
        exports.getFromWindow = getFromWindow3;
        function getFromWindowOrThrow3(name2) {
            const res = getFromWindow3(name2);
            if (!res) {
                throw new Error(`${name2} is not defined in Window`);
            }
            return res;
        }
        exports.getFromWindowOrThrow = getFromWindowOrThrow3;
        function getDocumentOrThrow3() {
            return getFromWindowOrThrow3('document');
        }
        exports.getDocumentOrThrow = getDocumentOrThrow3;
        function getDocument3() {
            return getFromWindow3('document');
        }
        exports.getDocument = getDocument3;
        function getNavigatorOrThrow3() {
            return getFromWindowOrThrow3('navigator');
        }
        exports.getNavigatorOrThrow = getNavigatorOrThrow3;
        function getNavigator3() {
            return getFromWindow3('navigator');
        }
        exports.getNavigator = getNavigator3;
        function getLocationOrThrow3() {
            return getFromWindowOrThrow3('location');
        }
        exports.getLocationOrThrow = getLocationOrThrow3;
        function getLocation3() {
            return getFromWindow3('location');
        }
        exports.getLocation = getLocation3;
        function getCryptoOrThrow3() {
            return getFromWindowOrThrow3('crypto');
        }
        exports.getCryptoOrThrow = getCryptoOrThrow3;
        function getCrypto3() {
            return getFromWindow3('crypto');
        }
        exports.getCrypto = getCrypto3;
        function getLocalStorageOrThrow3() {
            return getFromWindowOrThrow3('localStorage');
        }
        exports.getLocalStorageOrThrow = getLocalStorageOrThrow3;
        function getLocalStorage3() {
            return getFromWindow3('localStorage');
        }
        exports.getLocalStorage = getLocalStorage3;
    },
});

// node_modules/detect-browser/es/index.js
function detect(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return new ReactNativeInfo();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
}
function matchUserAgent(ua) {
    return (
        ua !== '' &&
        userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0],
                regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false)
    );
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name2 = matchedRule[0],
        match = matchedRule[1];
    if (name2 === 'searchbot') {
        return new BotInfo();
    }
    var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArrays(
                versionParts,
                createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length)
            );
        }
    } else {
        versionParts = [];
    }
    var version2 = versionParts.join('.');
    var os2 = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name2, version2, os2, searchBotMatch[1]);
    }
    return new BrowserInfo(name2, version2, os2);
}
function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii],
            os2 = _a[0],
            regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os2;
        }
    }
    return null;
}
function getNodeVersion() {
    var isNode3 = typeof process !== 'undefined' && process.version;
    return isNode3 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}
var __spreadArrays,
    BrowserInfo,
    NodeInfo,
    SearchBotDeviceInfo,
    BotInfo,
    ReactNativeInfo,
    SEARCHBOX_UA_REGEX,
    SEARCHBOT_OS_REGEX,
    REQUIRED_VERSION_PARTS,
    userAgentRules,
    operatingSystemRules;
var init_es = __esm({
    'node_modules/detect-browser/es/index.js'() {
        __spreadArrays = function () {
            for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
            for (var r3 = Array(s3), k5 = 0, i4 = 0; i4 < il; i4++)
                for (var a5 = arguments[i4], j5 = 0, jl = a5.length; j5 < jl; j5++, k5++) r3[k5] = a5[j5];
            return r3;
        };
        BrowserInfo =
            /** @class */
            /* @__PURE__ */ (function () {
                function BrowserInfo3(name2, version2, os2) {
                    this.name = name2;
                    this.version = version2;
                    this.os = os2;
                    this.type = 'browser';
                }
                return BrowserInfo3;
            })();
        NodeInfo =
            /** @class */
            /* @__PURE__ */ (function () {
                function NodeInfo3(version2) {
                    this.version = version2;
                    this.type = 'node';
                    this.name = 'node';
                    this.os = process.platform;
                }
                return NodeInfo3;
            })();
        SearchBotDeviceInfo =
            /** @class */
            /* @__PURE__ */ (function () {
                function SearchBotDeviceInfo3(name2, version2, os2, bot) {
                    this.name = name2;
                    this.version = version2;
                    this.os = os2;
                    this.bot = bot;
                    this.type = 'bot-device';
                }
                return SearchBotDeviceInfo3;
            })();
        BotInfo =
            /** @class */
            /* @__PURE__ */ (function () {
                function BotInfo3() {
                    this.type = 'bot';
                    this.bot = true;
                    this.name = 'bot';
                    this.version = null;
                    this.os = null;
                }
                return BotInfo3;
            })();
        ReactNativeInfo =
            /** @class */
            /* @__PURE__ */ (function () {
                function ReactNativeInfo3() {
                    this.type = 'react-native';
                    this.name = 'react-native';
                    this.version = null;
                    this.os = null;
                }
                return ReactNativeInfo3;
            })();
        SEARCHBOX_UA_REGEX =
            /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
        SEARCHBOT_OS_REGEX = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
        REQUIRED_VERSION_PARTS = 3;
        userAgentRules = [
            ['aol', /AOLShield\/([0-9\._]+)/],
            ['edge', /Edge\/([0-9\._]+)/],
            ['edge-ios', /EdgiOS\/([0-9\._]+)/],
            ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
            ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
            ['samsung', /SamsungBrowser\/([0-9\.]+)/],
            ['silk', /\bSilk\/([0-9._-]+)\b/],
            ['miui', /MiuiBrowser\/([0-9\.]+)$/],
            ['beaker', /BeakerBrowser\/([0-9\.]+)/],
            ['edge-chromium', /EdgA?\/([0-9\.]+)/],
            ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
            ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
            ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
            ['fxios', /FxiOS\/([0-9\.]+)/],
            ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
            ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
            ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
            ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
            ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ['ie', /MSIE\s(7\.0)/],
            ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ['android', /Android\s([0-9\.]+)/],
            ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ['safari', /Version\/([0-9\._]+).*Safari/],
            ['facebook', /FBAV\/([0-9\.]+)/],
            ['instagram', /Instagram\s([0-9\.]+)/],
            ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
            ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
            ['searchbot', SEARCHBOX_UA_REGEX],
        ];
        operatingSystemRules = [
            ['iOS', /iP(hone|od|ad)/],
            ['Android OS', /Android/],
            ['BlackBerry OS', /BlackBerry|BB10/],
            ['Windows Mobile', /IEMobile/],
            ['Amazon OS', /Kindle/],
            ['Windows 3.11', /Win16/],
            ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
            ['Windows 98', /(Windows 98)|(Win98)/],
            ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
            ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
            ['Windows Server 2003', /(Windows NT 5.2)/],
            ['Windows Vista', /(Windows NT 6.0)/],
            ['Windows 7', /(Windows NT 6.1)/],
            ['Windows 8', /(Windows NT 6.2)/],
            ['Windows 8.1', /(Windows NT 6.3)/],
            ['Windows 10', /(Windows NT 10.0)/],
            ['Windows ME', /Windows ME/],
            ['Open BSD', /OpenBSD/],
            ['Sun OS', /SunOS/],
            ['Chrome OS', /CrOS/],
            ['Linux', /(Linux)|(X11)/],
            ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
            ['QNX', /QNX/],
            ['BeOS', /BeOS/],
            ['OS/2', /OS\/2/],
        ];
    },
});

// node_modules/@walletconnect/browser-utils/dist/esm/browser.js
function detectEnv(userAgent) {
    return detect(userAgent);
}
function detectOS2() {
    const env = detectEnv();
    return env && env.os ? env.os : void 0;
}
function isAndroid() {
    const os2 = detectOS2();
    return os2 ? os2.toLowerCase().includes('android') : false;
}
function isIOS() {
    const os2 = detectOS2();
    return os2
        ? os2.toLowerCase().includes('ios') || (os2.toLowerCase().includes('mac') && navigator.maxTouchPoints > 1)
        : false;
}
function isMobile() {
    const os2 = detectOS2();
    return os2 ? isAndroid() || isIOS() : false;
}
function isNode() {
    const env = detectEnv();
    const result = env && env.name ? env.name.toLowerCase() === 'node' : false;
    return result;
}
function isBrowser() {
    const result = !isNode() && !!getNavigator2();
    return result;
}
function getClientMeta() {
    return windowMetadata.getWindowMetadata();
}
var windowMetadata,
    windowGetters,
    getFromWindow2,
    getFromWindowOrThrow2,
    getDocumentOrThrow2,
    getDocument2,
    getNavigatorOrThrow2,
    getNavigator2,
    getLocationOrThrow2,
    getLocation2,
    getCryptoOrThrow2,
    getCrypto2,
    getLocalStorageOrThrow2,
    getLocalStorage2;
var init_browser = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/browser.js'() {
        windowMetadata = __toESM(require_cjs2());
        windowGetters = __toESM(require_cjs3());
        init_es();
        getFromWindow2 = windowGetters.getFromWindow;
        getFromWindowOrThrow2 = windowGetters.getFromWindowOrThrow;
        getDocumentOrThrow2 = windowGetters.getDocumentOrThrow;
        getDocument2 = windowGetters.getDocument;
        getNavigatorOrThrow2 = windowGetters.getNavigatorOrThrow;
        getNavigator2 = windowGetters.getNavigator;
        getLocationOrThrow2 = windowGetters.getLocationOrThrow;
        getLocation2 = windowGetters.getLocation;
        getCryptoOrThrow2 = windowGetters.getCryptoOrThrow;
        getCrypto2 = windowGetters.getCrypto;
        getLocalStorageOrThrow2 = windowGetters.getLocalStorageOrThrow;
        getLocalStorage2 = windowGetters.getLocalStorage;
    },
});

// node_modules/@walletconnect/browser-utils/node_modules/@walletconnect/safe-json/dist/esm/index.js
function safeJsonParse(value) {
    if (typeof value !== 'string') {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    }
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === 'string' ? value : JSON.stringify(value);
}
var init_esm = __esm({
    'node_modules/@walletconnect/browser-utils/node_modules/@walletconnect/safe-json/dist/esm/index.js'() {},
});

// node_modules/@walletconnect/browser-utils/dist/esm/json.js
var safeJsonParse2, safeJsonStringify2;
var init_json = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/json.js'() {
        init_esm();
        safeJsonParse2 = safeJsonParse;
        safeJsonStringify2 = safeJsonStringify;
    },
});

// node_modules/@walletconnect/browser-utils/dist/esm/local.js
function setLocal(key, data) {
    const raw = safeJsonStringify2(data);
    const local = getLocalStorage2();
    if (local) {
        local.setItem(key, raw);
    }
}
function getLocal(key) {
    let data = null;
    let raw = null;
    const local = getLocalStorage2();
    if (local) {
        raw = local.getItem(key);
    }
    data = raw ? safeJsonParse2(raw) : raw;
    return data;
}
function removeLocal(key) {
    const local = getLocalStorage2();
    if (local) {
        local.removeItem(key);
    }
}
var init_local = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/local.js'() {
        init_json();
        init_browser();
    },
});

// node_modules/@walletconnect/browser-utils/dist/esm/mobile.js
function formatIOSMobile(uri, entry) {
    const encodedUri = encodeURIComponent(uri);
    return entry.universalLink
        ? `${entry.universalLink}/wc?uri=${encodedUri}`
        : entry.deepLink
          ? `${entry.deepLink}${entry.deepLink.endsWith(':') ? '//' : '/'}wc?uri=${encodedUri}`
          : '';
}
function saveMobileLinkInfo(data) {
    const focusUri = data.href.split('?')[0];
    setLocal(mobileLinkChoiceKey, Object.assign(Object.assign({}, data), { href: focusUri }));
}
function getMobileRegistryEntry(registry, name2) {
    return registry.filter((entry) => entry.name.toLowerCase().includes(name2.toLowerCase()))[0];
}
function getMobileLinkRegistry(registry, whitelist) {
    let links = registry;
    if (whitelist) {
        links = whitelist.map((name2) => getMobileRegistryEntry(registry, name2)).filter(Boolean);
    }
    return links;
}
var mobileLinkChoiceKey;
var init_mobile = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/mobile.js'() {
        init_local();
        mobileLinkChoiceKey = 'WALLETCONNECT_DEEPLINK_CHOICE';
    },
});

// node_modules/@walletconnect/browser-utils/dist/esm/registry.js
function getWalletRegistryUrl() {
    return API_URL + '/api/v2/wallets';
}
function getDappRegistryUrl() {
    return API_URL + '/api/v2/dapps';
}
function formatMobileRegistryEntry(entry, platform = 'mobile') {
    var _a;
    return {
        name: entry.name || '',
        shortName: entry.metadata.shortName || '',
        color: entry.metadata.colors.primary || '',
        logo: (_a = entry.image_url.sm) !== null && _a !== void 0 ? _a : '',
        universalLink: entry[platform].universal || '',
        deepLink: entry[platform].native || '',
    };
}
function formatMobileRegistry(registry, platform = 'mobile') {
    return Object.values(registry)
        .filter((entry) => !!entry[platform].universal || !!entry[platform].native)
        .map((entry) => formatMobileRegistryEntry(entry, platform));
}
var API_URL;
var init_registry = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/registry.js'() {
        API_URL = 'https://registry.walletconnect.com';
    },
});

// node_modules/@walletconnect/browser-utils/dist/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
    detectEnv: () => detectEnv,
    detectOS: () => detectOS2,
    formatIOSMobile: () => formatIOSMobile,
    formatMobileRegistry: () => formatMobileRegistry,
    formatMobileRegistryEntry: () => formatMobileRegistryEntry,
    getClientMeta: () => getClientMeta,
    getCrypto: () => getCrypto2,
    getCryptoOrThrow: () => getCryptoOrThrow2,
    getDappRegistryUrl: () => getDappRegistryUrl,
    getDocument: () => getDocument2,
    getDocumentOrThrow: () => getDocumentOrThrow2,
    getFromWindow: () => getFromWindow2,
    getFromWindowOrThrow: () => getFromWindowOrThrow2,
    getLocal: () => getLocal,
    getLocalStorage: () => getLocalStorage2,
    getLocalStorageOrThrow: () => getLocalStorageOrThrow2,
    getLocation: () => getLocation2,
    getLocationOrThrow: () => getLocationOrThrow2,
    getMobileLinkRegistry: () => getMobileLinkRegistry,
    getMobileRegistryEntry: () => getMobileRegistryEntry,
    getNavigator: () => getNavigator2,
    getNavigatorOrThrow: () => getNavigatorOrThrow2,
    getWalletRegistryUrl: () => getWalletRegistryUrl,
    isAndroid: () => isAndroid,
    isBrowser: () => isBrowser,
    isIOS: () => isIOS,
    isMobile: () => isMobile,
    isNode: () => isNode,
    mobileLinkChoiceKey: () => mobileLinkChoiceKey,
    removeLocal: () => removeLocal,
    safeJsonParse: () => safeJsonParse2,
    safeJsonStringify: () => safeJsonStringify2,
    saveMobileLinkInfo: () => saveMobileLinkInfo,
    setLocal: () => setLocal,
});
var init_esm2 = __esm({
    'node_modules/@walletconnect/browser-utils/dist/esm/index.js'() {
        init_browser();
        init_json();
        init_local();
        init_mobile();
        init_registry();
    },
});

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
    'node_modules/qrcode/lib/can-promise.js'(exports, module) {
        module.exports = function () {
            return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
        };
    },
});

// node_modules/isarray/index.js
var require_isarray = __commonJS({
    'node_modules/isarray/index.js'(exports, module) {
        var toString3 = {}.toString;
        module.exports =
            Array.isArray ||
            function (arr) {
                return toString3.call(arr) == '[object Array]';
            };
    },
});

// node_modules/qrcode/lib/utils/typedarray-buffer.js
var require_typedarray_buffer = __commonJS({
    'node_modules/qrcode/lib/utils/typedarray-buffer.js'(exports, module) {
        'use strict';
        var isArray = require_isarray();
        function typedArraySupport() {
            try {
                var arr = new Uint8Array(1);
                arr.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                        return 42;
                    },
                };
                return arr.foo() === 42;
            } catch (e3) {
                return false;
            }
        }
        Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
        var K_MAX_LENGTH = Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        function Buffer2(arg, offset, length2) {
            if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
                return new Buffer2(arg, offset, length2);
            }
            if (typeof arg === 'number') {
                return allocUnsafe2(this, arg);
            }
            return from3(this, arg, offset, length2);
        }
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
            Buffer2.prototype.__proto__ = Uint8Array.prototype;
            Buffer2.__proto__ = Uint8Array;
            if (typeof Symbol !== 'undefined' && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
                Object.defineProperty(Buffer2, Symbol.species, {
                    value: null,
                    configurable: true,
                    enumerable: false,
                    writable: false,
                });
            }
        }
        function checked(length2) {
            if (length2 >= K_MAX_LENGTH) {
                throw new RangeError(
                    'Attempt to allocate Buffer larger than maximum size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes'
                );
            }
            return length2 | 0;
        }
        function isnan(val) {
            return val !== val;
        }
        function createBuffer(that, length2) {
            var buf;
            if (Buffer2.TYPED_ARRAY_SUPPORT) {
                buf = new Uint8Array(length2);
                buf.__proto__ = Buffer2.prototype;
            } else {
                buf = that;
                if (buf === null) {
                    buf = new Buffer2(length2);
                }
                buf.length = length2;
            }
            return buf;
        }
        function allocUnsafe2(that, size) {
            var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
            if (!Buffer2.TYPED_ARRAY_SUPPORT) {
                for (var i4 = 0; i4 < size; ++i4) {
                    buf[i4] = 0;
                }
            }
            return buf;
        }
        function fromString3(that, string2) {
            var length2 = byteLength(string2) | 0;
            var buf = createBuffer(that, length2);
            var actual = buf.write(string2);
            if (actual !== length2) {
                buf = buf.slice(0, actual);
            }
            return buf;
        }
        function fromArrayLike(that, array) {
            var length2 = array.length < 0 ? 0 : checked(array.length) | 0;
            var buf = createBuffer(that, length2);
            for (var i4 = 0; i4 < length2; i4 += 1) {
                buf[i4] = array[i4] & 255;
            }
            return buf;
        }
        function fromArrayBuffer(that, array, byteOffset, length2) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
                throw new RangeError("'offset' is out of bounds");
            }
            if (array.byteLength < byteOffset + (length2 || 0)) {
                throw new RangeError("'length' is out of bounds");
            }
            var buf;
            if (byteOffset === void 0 && length2 === void 0) {
                buf = new Uint8Array(array);
            } else if (length2 === void 0) {
                buf = new Uint8Array(array, byteOffset);
            } else {
                buf = new Uint8Array(array, byteOffset, length2);
            }
            if (Buffer2.TYPED_ARRAY_SUPPORT) {
                buf.__proto__ = Buffer2.prototype;
            } else {
                buf = fromArrayLike(that, buf);
            }
            return buf;
        }
        function fromObject(that, obj) {
            if (Buffer2.isBuffer(obj)) {
                var len = checked(obj.length) | 0;
                var buf = createBuffer(that, len);
                if (buf.length === 0) {
                    return buf;
                }
                obj.copy(buf, 0, 0, len);
                return buf;
            }
            if (obj) {
                if ((typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
                    if (typeof obj.length !== 'number' || isnan(obj.length)) {
                        return createBuffer(that, 0);
                    }
                    return fromArrayLike(that, obj);
                }
                if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
                    return fromArrayLike(that, obj.data);
                }
            }
            throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
        }
        function utf8ToBytes(string2, units) {
            units = units || Infinity;
            var codePoint;
            var length2 = string2.length;
            var leadSurrogate = null;
            var bytes = [];
            for (var i4 = 0; i4 < length2; ++i4) {
                codePoint = string2.charCodeAt(i4);
                if (codePoint > 55295 && codePoint < 57344) {
                    if (!leadSurrogate) {
                        if (codePoint > 56319) {
                            if ((units -= 3) > -1) bytes.push(239, 191, 189);
                            continue;
                        } else if (i4 + 1 === length2) {
                            if ((units -= 3) > -1) bytes.push(239, 191, 189);
                            continue;
                        }
                        leadSurrogate = codePoint;
                        continue;
                    }
                    if (codePoint < 56320) {
                        if ((units -= 3) > -1) bytes.push(239, 191, 189);
                        leadSurrogate = codePoint;
                        continue;
                    }
                    codePoint = (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
                } else if (leadSurrogate) {
                    if ((units -= 3) > -1) bytes.push(239, 191, 189);
                }
                leadSurrogate = null;
                if (codePoint < 128) {
                    if ((units -= 1) < 0) break;
                    bytes.push(codePoint);
                } else if (codePoint < 2048) {
                    if ((units -= 2) < 0) break;
                    bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
                } else if (codePoint < 65536) {
                    if ((units -= 3) < 0) break;
                    bytes.push((codePoint >> 12) | 224, ((codePoint >> 6) & 63) | 128, (codePoint & 63) | 128);
                } else if (codePoint < 1114112) {
                    if ((units -= 4) < 0) break;
                    bytes.push(
                        (codePoint >> 18) | 240,
                        ((codePoint >> 12) & 63) | 128,
                        ((codePoint >> 6) & 63) | 128,
                        (codePoint & 63) | 128
                    );
                } else {
                    throw new Error('Invalid code point');
                }
            }
            return bytes;
        }
        function byteLength(string2) {
            if (Buffer2.isBuffer(string2)) {
                return string2.length;
            }
            if (
                typeof ArrayBuffer !== 'undefined' &&
                typeof ArrayBuffer.isView === 'function' &&
                (ArrayBuffer.isView(string2) || string2 instanceof ArrayBuffer)
            ) {
                return string2.byteLength;
            }
            if (typeof string2 !== 'string') {
                string2 = '' + string2;
            }
            var len = string2.length;
            if (len === 0) return 0;
            return utf8ToBytes(string2).length;
        }
        function blitBuffer(src2, dst, offset, length2) {
            for (var i4 = 0; i4 < length2; ++i4) {
                if (i4 + offset >= dst.length || i4 >= src2.length) break;
                dst[i4 + offset] = src2[i4];
            }
            return i4;
        }
        function utf8Write(buf, string2, offset, length2) {
            return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length2);
        }
        function from3(that, value, offset, length2) {
            if (typeof value === 'number') {
                throw new TypeError('"value" argument must not be a number');
            }
            if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
                return fromArrayBuffer(that, value, offset, length2);
            }
            if (typeof value === 'string') {
                return fromString3(that, value, offset);
            }
            return fromObject(that, value);
        }
        Buffer2.prototype.write = function write(string2, offset, length2) {
            if (offset === void 0) {
                length2 = this.length;
                offset = 0;
            } else if (length2 === void 0 && typeof offset === 'string') {
                length2 = this.length;
                offset = 0;
            } else if (isFinite(offset)) {
                offset = offset | 0;
                if (isFinite(length2)) {
                    length2 = length2 | 0;
                } else {
                    length2 = void 0;
                }
            }
            var remaining = this.length - offset;
            if (length2 === void 0 || length2 > remaining) length2 = remaining;
            if ((string2.length > 0 && (length2 < 0 || offset < 0)) || offset > this.length) {
                throw new RangeError('Attempt to write outside buffer bounds');
            }
            return utf8Write(this, string2, offset, length2);
        };
        Buffer2.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === void 0 ? len : ~~end;
            if (start < 0) {
                start += len;
                if (start < 0) start = 0;
            } else if (start > len) {
                start = len;
            }
            if (end < 0) {
                end += len;
                if (end < 0) end = 0;
            } else if (end > len) {
                end = len;
            }
            if (end < start) end = start;
            var newBuf;
            if (Buffer2.TYPED_ARRAY_SUPPORT) {
                newBuf = this.subarray(start, end);
                newBuf.__proto__ = Buffer2.prototype;
            } else {
                var sliceLen = end - start;
                newBuf = new Buffer2(sliceLen, void 0);
                for (var i4 = 0; i4 < sliceLen; ++i4) {
                    newBuf[i4] = this[i4 + start];
                }
            }
            return newBuf;
        };
        Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;
            if (targetStart < 0) {
                throw new RangeError('targetStart out of bounds');
            }
            if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
                end = target.length - targetStart + start;
            }
            var len = end - start;
            var i4;
            if (this === target && start < targetStart && targetStart < end) {
                for (i4 = len - 1; i4 >= 0; --i4) {
                    target[i4 + targetStart] = this[i4 + start];
                }
            } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
                for (i4 = 0; i4 < len; ++i4) {
                    target[i4 + targetStart] = this[i4 + start];
                }
            } else {
                Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
            }
            return len;
        };
        Buffer2.prototype.fill = function fill(val, start, end) {
            if (typeof val === 'string') {
                if (typeof start === 'string') {
                    start = 0;
                    end = this.length;
                } else if (typeof end === 'string') {
                    end = this.length;
                }
                if (val.length === 1) {
                    var code2 = val.charCodeAt(0);
                    if (code2 < 256) {
                        val = code2;
                    }
                }
            } else if (typeof val === 'number') {
                val = val & 255;
            }
            if (start < 0 || this.length < start || this.length < end) {
                throw new RangeError('Out of range index');
            }
            if (end <= start) {
                return this;
            }
            start = start >>> 0;
            end = end === void 0 ? this.length : end >>> 0;
            if (!val) val = 0;
            var i4;
            if (typeof val === 'number') {
                for (i4 = start; i4 < end; ++i4) {
                    this[i4] = val;
                }
            } else {
                var bytes = Buffer2.isBuffer(val) ? val : new Buffer2(val);
                var len = bytes.length;
                for (i4 = 0; i4 < end - start; ++i4) {
                    this[i4 + start] = bytes[i4 % len];
                }
            }
            return this;
        };
        Buffer2.concat = function concat2(list, length2) {
            if (!isArray(list)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
            }
            if (list.length === 0) {
                return createBuffer(null, 0);
            }
            var i4;
            if (length2 === void 0) {
                length2 = 0;
                for (i4 = 0; i4 < list.length; ++i4) {
                    length2 += list[i4].length;
                }
            }
            var buffer = allocUnsafe2(null, length2);
            var pos = 0;
            for (i4 = 0; i4 < list.length; ++i4) {
                var buf = list[i4];
                if (!Buffer2.isBuffer(buf)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                }
                buf.copy(buffer, pos);
                pos += buf.length;
            }
            return buffer;
        };
        Buffer2.byteLength = byteLength;
        Buffer2.prototype._isBuffer = true;
        Buffer2.isBuffer = function isBuffer(b5) {
            return !!(b5 != null && b5._isBuffer);
        };
        module.exports.alloc = function (size) {
            var buffer = new Buffer2(size);
            buffer.fill(0);
            return buffer;
        };
        module.exports.from = function (data) {
            return new Buffer2(data);
        };
    },
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
    'node_modules/qrcode/lib/core/utils.js'(exports) {
        var toSJISFunction;
        var CODEWORDS_COUNT = [
            0,
            // Not used
            26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156,
            1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532,
            3706,
        ];
        exports.getSymbolSize = function getSymbolSize(version2) {
            if (!version2) throw new Error('"version" cannot be null or undefined');
            if (version2 < 1 || version2 > 40) throw new Error('"version" should be in range from 1 to 40');
            return version2 * 4 + 17;
        };
        exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
            return CODEWORDS_COUNT[version2];
        };
        exports.getBCHDigit = function (data) {
            var digit = 0;
            while (data !== 0) {
                digit++;
                data >>>= 1;
            }
            return digit;
        };
        exports.setToSJISFunction = function setToSJISFunction(f4) {
            if (typeof f4 !== 'function') {
                throw new Error('"toSJISFunc" is not a valid function.');
            }
            toSJISFunction = f4;
        };
        exports.isKanjiModeEnabled = function () {
            return typeof toSJISFunction !== 'undefined';
        };
        exports.toSJIS = function toSJIS(kanji) {
            return toSJISFunction(kanji);
        };
    },
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
    'node_modules/qrcode/lib/core/error-correction-level.js'(exports) {
        exports.L = { bit: 1 };
        exports.M = { bit: 0 };
        exports.Q = { bit: 3 };
        exports.H = { bit: 2 };
        function fromString3(string2) {
            if (typeof string2 !== 'string') {
                throw new Error('Param is not a string');
            }
            var lcStr = string2.toLowerCase();
            switch (lcStr) {
                case 'l':
                case 'low':
                    return exports.L;
                case 'm':
                case 'medium':
                    return exports.M;
                case 'q':
                case 'quartile':
                    return exports.Q;
                case 'h':
                case 'high':
                    return exports.H;
                default:
                    throw new Error('Unknown EC Level: ' + string2);
            }
        }
        exports.isValid = function isValid(level) {
            return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
        };
        exports.from = function from3(value, defaultValue) {
            if (exports.isValid(value)) {
                return value;
            }
            try {
                return fromString3(value);
            } catch (e3) {
                return defaultValue;
            }
        };
    },
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
    'node_modules/qrcode/lib/core/bit-buffer.js'(exports, module) {
        function BitBuffer() {
            this.buffer = [];
            this.length = 0;
        }
        BitBuffer.prototype = {
            get: function (index) {
                var bufIndex = Math.floor(index / 8);
                return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) === 1;
            },
            put: function (num, length2) {
                for (var i4 = 0; i4 < length2; i4++) {
                    this.putBit(((num >>> (length2 - i4 - 1)) & 1) === 1);
                }
            },
            getLengthInBits: function () {
                return this.length;
            },
            putBit: function (bit) {
                var bufIndex = Math.floor(this.length / 8);
                if (this.buffer.length <= bufIndex) {
                    this.buffer.push(0);
                }
                if (bit) {
                    this.buffer[bufIndex] |= 128 >>> this.length % 8;
                }
                this.length++;
            },
        };
        module.exports = BitBuffer;
    },
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
    'node_modules/qrcode/lib/core/bit-matrix.js'(exports, module) {
        var BufferUtil = require_typedarray_buffer();
        function BitMatrix(size) {
            if (!size || size < 1) {
                throw new Error('BitMatrix size must be defined and greater than 0');
            }
            this.size = size;
            this.data = BufferUtil.alloc(size * size);
            this.reservedBit = BufferUtil.alloc(size * size);
        }
        BitMatrix.prototype.set = function (row, col, value, reserved) {
            var index = row * this.size + col;
            this.data[index] = value;
            if (reserved) this.reservedBit[index] = true;
        };
        BitMatrix.prototype.get = function (row, col) {
            return this.data[row * this.size + col];
        };
        BitMatrix.prototype.xor = function (row, col, value) {
            this.data[row * this.size + col] ^= value;
        };
        BitMatrix.prototype.isReserved = function (row, col) {
            return this.reservedBit[row * this.size + col];
        };
        module.exports = BitMatrix;
    },
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
    'node_modules/qrcode/lib/core/alignment-pattern.js'(exports) {
        var getSymbolSize = require_utils().getSymbolSize;
        exports.getRowColCoords = function getRowColCoords(version2) {
            if (version2 === 1) return [];
            var posCount = Math.floor(version2 / 7) + 2;
            var size = getSymbolSize(version2);
            var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
            var positions = [size - 7];
            for (var i4 = 1; i4 < posCount - 1; i4++) {
                positions[i4] = positions[i4 - 1] - intervals;
            }
            positions.push(6);
            return positions.reverse();
        };
        exports.getPositions = function getPositions(version2) {
            var coords = [];
            var pos = exports.getRowColCoords(version2);
            var posLength = pos.length;
            for (var i4 = 0; i4 < posLength; i4++) {
                for (var j5 = 0; j5 < posLength; j5++) {
                    if (
                        (i4 === 0 && j5 === 0) || // top-left
                        (i4 === 0 && j5 === posLength - 1) || // bottom-left
                        (i4 === posLength - 1 && j5 === 0)
                    ) {
                        continue;
                    }
                    coords.push([pos[i4], pos[j5]]);
                }
            }
            return coords;
        };
    },
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
    'node_modules/qrcode/lib/core/finder-pattern.js'(exports) {
        var getSymbolSize = require_utils().getSymbolSize;
        var FINDER_PATTERN_SIZE = 7;
        exports.getPositions = function getPositions(version2) {
            var size = getSymbolSize(version2);
            return [
                // top-left
                [0, 0],
                // top-right
                [size - FINDER_PATTERN_SIZE, 0],
                // bottom-left
                [0, size - FINDER_PATTERN_SIZE],
            ];
        };
    },
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
    'node_modules/qrcode/lib/core/mask-pattern.js'(exports) {
        exports.Patterns = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7,
        };
        var PenaltyScores = {
            N1: 3,
            N2: 3,
            N3: 40,
            N4: 10,
        };
        exports.isValid = function isValid(mask) {
            return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
        };
        exports.from = function from3(value) {
            return exports.isValid(value) ? parseInt(value, 10) : void 0;
        };
        exports.getPenaltyN1 = function getPenaltyN1(data) {
            var size = data.size;
            var points = 0;
            var sameCountCol = 0;
            var sameCountRow = 0;
            var lastCol = null;
            var lastRow = null;
            for (var row = 0; row < size; row++) {
                sameCountCol = sameCountRow = 0;
                lastCol = lastRow = null;
                for (var col = 0; col < size; col++) {
                    var module2 = data.get(row, col);
                    if (module2 === lastCol) {
                        sameCountCol++;
                    } else {
                        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                        lastCol = module2;
                        sameCountCol = 1;
                    }
                    module2 = data.get(col, row);
                    if (module2 === lastRow) {
                        sameCountRow++;
                    } else {
                        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                        lastRow = module2;
                        sameCountRow = 1;
                    }
                }
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            }
            return points;
        };
        exports.getPenaltyN2 = function getPenaltyN2(data) {
            var size = data.size;
            var points = 0;
            for (var row = 0; row < size - 1; row++) {
                for (var col = 0; col < size - 1; col++) {
                    var last =
                        data.get(row, col) +
                        data.get(row, col + 1) +
                        data.get(row + 1, col) +
                        data.get(row + 1, col + 1);
                    if (last === 4 || last === 0) points++;
                }
            }
            return points * PenaltyScores.N2;
        };
        exports.getPenaltyN3 = function getPenaltyN3(data) {
            var size = data.size;
            var points = 0;
            var bitsCol = 0;
            var bitsRow = 0;
            for (var row = 0; row < size; row++) {
                bitsCol = bitsRow = 0;
                for (var col = 0; col < size; col++) {
                    bitsCol = ((bitsCol << 1) & 2047) | data.get(row, col);
                    if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
                    bitsRow = ((bitsRow << 1) & 2047) | data.get(col, row);
                    if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
                }
            }
            return points * PenaltyScores.N3;
        };
        exports.getPenaltyN4 = function getPenaltyN4(data) {
            var darkCount = 0;
            var modulesCount = data.data.length;
            for (var i4 = 0; i4 < modulesCount; i4++) darkCount += data.data[i4];
            var k5 = Math.abs(Math.ceil((darkCount * 100) / modulesCount / 5) - 10);
            return k5 * PenaltyScores.N4;
        };
        function getMaskAt(maskPattern, i4, j5) {
            switch (maskPattern) {
                case exports.Patterns.PATTERN000:
                    return (i4 + j5) % 2 === 0;
                case exports.Patterns.PATTERN001:
                    return i4 % 2 === 0;
                case exports.Patterns.PATTERN010:
                    return j5 % 3 === 0;
                case exports.Patterns.PATTERN011:
                    return (i4 + j5) % 3 === 0;
                case exports.Patterns.PATTERN100:
                    return (Math.floor(i4 / 2) + Math.floor(j5 / 3)) % 2 === 0;
                case exports.Patterns.PATTERN101:
                    return ((i4 * j5) % 2) + ((i4 * j5) % 3) === 0;
                case exports.Patterns.PATTERN110:
                    return (((i4 * j5) % 2) + ((i4 * j5) % 3)) % 2 === 0;
                case exports.Patterns.PATTERN111:
                    return (((i4 * j5) % 3) + ((i4 + j5) % 2)) % 2 === 0;
                default:
                    throw new Error('bad maskPattern:' + maskPattern);
            }
        }
        exports.applyMask = function applyMask(pattern, data) {
            var size = data.size;
            for (var col = 0; col < size; col++) {
                for (var row = 0; row < size; row++) {
                    if (data.isReserved(row, col)) continue;
                    data.xor(row, col, getMaskAt(pattern, row, col));
                }
            }
        };
        exports.getBestMask = function getBestMask(data, setupFormatFunc) {
            var numPatterns = Object.keys(exports.Patterns).length;
            var bestPattern = 0;
            var lowerPenalty = Infinity;
            for (var p5 = 0; p5 < numPatterns; p5++) {
                setupFormatFunc(p5);
                exports.applyMask(p5, data);
                var penalty =
                    exports.getPenaltyN1(data) +
                    exports.getPenaltyN2(data) +
                    exports.getPenaltyN3(data) +
                    exports.getPenaltyN4(data);
                exports.applyMask(p5, data);
                if (penalty < lowerPenalty) {
                    lowerPenalty = penalty;
                    bestPattern = p5;
                }
            }
            return bestPattern;
        };
    },
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
    'node_modules/qrcode/lib/core/error-correction-code.js'(exports) {
        var ECLevel = require_error_correction_level();
        var EC_BLOCKS_TABLE = [
            // L  M  Q  H
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8,
            4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16,
            19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27,
            32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31,
            43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22,
            45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
        ];
        var EC_CODEWORDS_TABLE = [
            // L  M  Q  H
            7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108,
            130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
            288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504,
            588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900,
            300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260,
            420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440,
            1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260,
            1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
        ];
        exports.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
                case ECLevel.L:
                    return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
                case ECLevel.M:
                    return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
                case ECLevel.Q:
                    return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
                case ECLevel.H:
                    return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
                default:
                    return void 0;
            }
        };
        exports.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
                case ECLevel.L:
                    return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
                case ECLevel.M:
                    return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
                case ECLevel.Q:
                    return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
                case ECLevel.H:
                    return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
                default:
                    return void 0;
            }
        };
    },
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
    'node_modules/qrcode/lib/core/galois-field.js'(exports) {
        var BufferUtil = require_typedarray_buffer();
        var EXP_TABLE = BufferUtil.alloc(512);
        var LOG_TABLE = BufferUtil.alloc(256);
        (function initTables() {
            var x5 = 1;
            for (var i4 = 0; i4 < 255; i4++) {
                EXP_TABLE[i4] = x5;
                LOG_TABLE[x5] = i4;
                x5 <<= 1;
                if (x5 & 256) {
                    x5 ^= 285;
                }
            }
            for (i4 = 255; i4 < 512; i4++) {
                EXP_TABLE[i4] = EXP_TABLE[i4 - 255];
            }
        })();
        exports.log = function log(n3) {
            if (n3 < 1) throw new Error('log(' + n3 + ')');
            return LOG_TABLE[n3];
        };
        exports.exp = function exp(n3) {
            return EXP_TABLE[n3];
        };
        exports.mul = function mul(x5, y6) {
            if (x5 === 0 || y6 === 0) return 0;
            return EXP_TABLE[LOG_TABLE[x5] + LOG_TABLE[y6]];
        };
    },
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
    'node_modules/qrcode/lib/core/polynomial.js'(exports) {
        var BufferUtil = require_typedarray_buffer();
        var GF = require_galois_field();
        exports.mul = function mul(p1, p22) {
            var coeff = BufferUtil.alloc(p1.length + p22.length - 1);
            for (var i4 = 0; i4 < p1.length; i4++) {
                for (var j5 = 0; j5 < p22.length; j5++) {
                    coeff[i4 + j5] ^= GF.mul(p1[i4], p22[j5]);
                }
            }
            return coeff;
        };
        exports.mod = function mod(divident, divisor) {
            var result = BufferUtil.from(divident);
            while (result.length - divisor.length >= 0) {
                var coeff = result[0];
                for (var i4 = 0; i4 < divisor.length; i4++) {
                    result[i4] ^= GF.mul(divisor[i4], coeff);
                }
                var offset = 0;
                while (offset < result.length && result[offset] === 0) offset++;
                result = result.slice(offset);
            }
            return result;
        };
        exports.generateECPolynomial = function generateECPolynomial(degree) {
            var poly = BufferUtil.from([1]);
            for (var i4 = 0; i4 < degree; i4++) {
                poly = exports.mul(poly, [1, GF.exp(i4)]);
            }
            return poly;
        };
    },
});

// node_modules/qrcode/node_modules/buffer/index.js
var require_buffer = __commonJS({
    'node_modules/qrcode/node_modules/buffer/index.js'(exports) {
        'use strict';
        var base642 = require_base64_js();
        var ieee754 = require_ieee754();
        var customInspectSymbol =
            typeof Symbol === 'function' && typeof Symbol['for'] === 'function'
                ? Symbol['for']('nodejs.util.inspect.custom')
                : null;
        exports.Buffer = Buffer2;
        exports.SlowBuffer = SlowBuffer;
        exports.INSPECT_MAX_BYTES = 50;
        var K_MAX_LENGTH = 2147483647;
        exports.kMaxLength = K_MAX_LENGTH;
        Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
        if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(
                'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
            );
        }
        function typedArraySupport() {
            try {
                var arr = new Uint8Array(1);
                var proto = {
                    foo: function () {
                        return 42;
                    },
                };
                Object.setPrototypeOf(proto, Uint8Array.prototype);
                Object.setPrototypeOf(arr, proto);
                return arr.foo() === 42;
            } catch (e3) {
                return false;
            }
        }
        Object.defineProperty(Buffer2.prototype, 'parent', {
            enumerable: true,
            get: function () {
                if (!Buffer2.isBuffer(this)) return void 0;
                return this.buffer;
            },
        });
        Object.defineProperty(Buffer2.prototype, 'offset', {
            enumerable: true,
            get: function () {
                if (!Buffer2.isBuffer(this)) return void 0;
                return this.byteOffset;
            },
        });
        function createBuffer(length2) {
            if (length2 > K_MAX_LENGTH) {
                throw new RangeError('The value "' + length2 + '" is invalid for option "size"');
            }
            var buf = new Uint8Array(length2);
            Object.setPrototypeOf(buf, Buffer2.prototype);
            return buf;
        }
        function Buffer2(arg, encodingOrOffset, length2) {
            if (typeof arg === 'number') {
                if (typeof encodingOrOffset === 'string') {
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                }
                return allocUnsafe2(arg);
            }
            return from3(arg, encodingOrOffset, length2);
        }
        Buffer2.poolSize = 8192;
        function from3(value, encodingOrOffset, length2) {
            if (typeof value === 'string') {
                return fromString3(value, encodingOrOffset);
            }
            if (ArrayBuffer.isView(value)) {
                return fromArrayView(value);
            }
            if (value == null) {
                throw new TypeError(
                    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                        typeof value
                );
            }
            if (isInstance(value, ArrayBuffer) || (value && isInstance(value.buffer, ArrayBuffer))) {
                return fromArrayBuffer(value, encodingOrOffset, length2);
            }
            if (
                typeof SharedArrayBuffer !== 'undefined' &&
                (isInstance(value, SharedArrayBuffer) || (value && isInstance(value.buffer, SharedArrayBuffer)))
            ) {
                return fromArrayBuffer(value, encodingOrOffset, length2);
            }
            if (typeof value === 'number') {
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            }
            var valueOf = value.valueOf && value.valueOf();
            if (valueOf != null && valueOf !== value) {
                return Buffer2.from(valueOf, encodingOrOffset, length2);
            }
            var b5 = fromObject(value);
            if (b5) return b5;
            if (
                typeof Symbol !== 'undefined' &&
                Symbol.toPrimitive != null &&
                typeof value[Symbol.toPrimitive] === 'function'
            ) {
                return Buffer2.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length2);
            }
            throw new TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                    typeof value
            );
        }
        Buffer2.from = function (value, encodingOrOffset, length2) {
            return from3(value, encodingOrOffset, length2);
        };
        Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(Buffer2, Uint8Array);
        function assertSize(size) {
            if (typeof size !== 'number') {
                throw new TypeError('"size" argument must be of type number');
            } else if (size < 0) {
                throw new RangeError('The value "' + size + '" is invalid for option "size"');
            }
        }
        function alloc(size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
                return createBuffer(size);
            }
            if (fill !== void 0) {
                return typeof encoding === 'string'
                    ? createBuffer(size).fill(fill, encoding)
                    : createBuffer(size).fill(fill);
            }
            return createBuffer(size);
        }
        Buffer2.alloc = function (size, fill, encoding) {
            return alloc(size, fill, encoding);
        };
        function allocUnsafe2(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : checked(size) | 0);
        }
        Buffer2.allocUnsafe = function (size) {
            return allocUnsafe2(size);
        };
        Buffer2.allocUnsafeSlow = function (size) {
            return allocUnsafe2(size);
        };
        function fromString3(string2, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
                encoding = 'utf8';
            }
            if (!Buffer2.isEncoding(encoding)) {
                throw new TypeError('Unknown encoding: ' + encoding);
            }
            var length2 = byteLength(string2, encoding) | 0;
            var buf = createBuffer(length2);
            var actual = buf.write(string2, encoding);
            if (actual !== length2) {
                buf = buf.slice(0, actual);
            }
            return buf;
        }
        function fromArrayLike(array) {
            var length2 = array.length < 0 ? 0 : checked(array.length) | 0;
            var buf = createBuffer(length2);
            for (var i4 = 0; i4 < length2; i4 += 1) {
                buf[i4] = array[i4] & 255;
            }
            return buf;
        }
        function fromArrayView(arrayView) {
            if (isInstance(arrayView, Uint8Array)) {
                var copy = new Uint8Array(arrayView);
                return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
            }
            return fromArrayLike(arrayView);
        }
        function fromArrayBuffer(array, byteOffset, length2) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
                throw new RangeError('"offset" is outside of buffer bounds');
            }
            if (array.byteLength < byteOffset + (length2 || 0)) {
                throw new RangeError('"length" is outside of buffer bounds');
            }
            var buf;
            if (byteOffset === void 0 && length2 === void 0) {
                buf = new Uint8Array(array);
            } else if (length2 === void 0) {
                buf = new Uint8Array(array, byteOffset);
            } else {
                buf = new Uint8Array(array, byteOffset, length2);
            }
            Object.setPrototypeOf(buf, Buffer2.prototype);
            return buf;
        }
        function fromObject(obj) {
            if (Buffer2.isBuffer(obj)) {
                var len = checked(obj.length) | 0;
                var buf = createBuffer(len);
                if (buf.length === 0) {
                    return buf;
                }
                obj.copy(buf, 0, 0, len);
                return buf;
            }
            if (obj.length !== void 0) {
                if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                    return createBuffer(0);
                }
                return fromArrayLike(obj);
            }
            if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
                return fromArrayLike(obj.data);
            }
        }
        function checked(length2) {
            if (length2 >= K_MAX_LENGTH) {
                throw new RangeError(
                    'Attempt to allocate Buffer larger than maximum size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes'
                );
            }
            return length2 | 0;
        }
        function SlowBuffer(length2) {
            if (+length2 != length2) {
                length2 = 0;
            }
            return Buffer2.alloc(+length2);
        }
        Buffer2.isBuffer = function isBuffer(b5) {
            return b5 != null && b5._isBuffer === true && b5 !== Buffer2.prototype;
        };
        Buffer2.compare = function compare2(a5, b5) {
            if (isInstance(a5, Uint8Array)) a5 = Buffer2.from(a5, a5.offset, a5.byteLength);
            if (isInstance(b5, Uint8Array)) b5 = Buffer2.from(b5, b5.offset, b5.byteLength);
            if (!Buffer2.isBuffer(a5) || !Buffer2.isBuffer(b5)) {
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            }
            if (a5 === b5) return 0;
            var x5 = a5.length;
            var y6 = b5.length;
            for (var i4 = 0, len = Math.min(x5, y6); i4 < len; ++i4) {
                if (a5[i4] !== b5[i4]) {
                    x5 = a5[i4];
                    y6 = b5[i4];
                    break;
                }
            }
            if (x5 < y6) return -1;
            if (y6 < x5) return 1;
            return 0;
        };
        Buffer2.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return true;
                default:
                    return false;
            }
        };
        Buffer2.concat = function concat2(list, length2) {
            if (!Array.isArray(list)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
            }
            if (list.length === 0) {
                return Buffer2.alloc(0);
            }
            var i4;
            if (length2 === void 0) {
                length2 = 0;
                for (i4 = 0; i4 < list.length; ++i4) {
                    length2 += list[i4].length;
                }
            }
            var buffer = Buffer2.allocUnsafe(length2);
            var pos = 0;
            for (i4 = 0; i4 < list.length; ++i4) {
                var buf = list[i4];
                if (isInstance(buf, Uint8Array)) {
                    if (pos + buf.length > buffer.length) {
                        Buffer2.from(buf).copy(buffer, pos);
                    } else {
                        Uint8Array.prototype.set.call(buffer, buf, pos);
                    }
                } else if (!Buffer2.isBuffer(buf)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                } else {
                    buf.copy(buffer, pos);
                }
                pos += buf.length;
            }
            return buffer;
        };
        function byteLength(string2, encoding) {
            if (Buffer2.isBuffer(string2)) {
                return string2.length;
            }
            if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
                return string2.byteLength;
            }
            if (typeof string2 !== 'string') {
                throw new TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                        typeof string2
                );
            }
            var len = string2.length;
            var mustMatch = arguments.length > 2 && arguments[2] === true;
            if (!mustMatch && len === 0) return 0;
            var loweredCase = false;
            for (;;) {
                switch (encoding) {
                    case 'ascii':
                    case 'latin1':
                    case 'binary':
                        return len;
                    case 'utf8':
                    case 'utf-8':
                        return utf8ToBytes(string2).length;
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        return len * 2;
                    case 'hex':
                        return len >>> 1;
                    case 'base64':
                        return base64ToBytes(string2).length;
                    default:
                        if (loweredCase) {
                            return mustMatch ? -1 : utf8ToBytes(string2).length;
                        }
                        encoding = ('' + encoding).toLowerCase();
                        loweredCase = true;
                }
            }
        }
        Buffer2.byteLength = byteLength;
        function slowToString(encoding, start, end) {
            var loweredCase = false;
            if (start === void 0 || start < 0) {
                start = 0;
            }
            if (start > this.length) {
                return '';
            }
            if (end === void 0 || end > this.length) {
                end = this.length;
            }
            if (end <= 0) {
                return '';
            }
            end >>>= 0;
            start >>>= 0;
            if (end <= start) {
                return '';
            }
            if (!encoding) encoding = 'utf8';
            while (true) {
                switch (encoding) {
                    case 'hex':
                        return hexSlice(this, start, end);
                    case 'utf8':
                    case 'utf-8':
                        return utf8Slice(this, start, end);
                    case 'ascii':
                        return asciiSlice(this, start, end);
                    case 'latin1':
                    case 'binary':
                        return latin1Slice(this, start, end);
                    case 'base64':
                        return base64Slice(this, start, end);
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        return utf16leSlice(this, start, end);
                    default:
                        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                        encoding = (encoding + '').toLowerCase();
                        loweredCase = true;
                }
            }
        }
        Buffer2.prototype._isBuffer = true;
        function swap(b5, n3, m4) {
            var i4 = b5[n3];
            b5[n3] = b5[m4];
            b5[m4] = i4;
        }
        Buffer2.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 16-bits');
            }
            for (var i4 = 0; i4 < len; i4 += 2) {
                swap(this, i4, i4 + 1);
            }
            return this;
        };
        Buffer2.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 32-bits');
            }
            for (var i4 = 0; i4 < len; i4 += 4) {
                swap(this, i4, i4 + 3);
                swap(this, i4 + 1, i4 + 2);
            }
            return this;
        };
        Buffer2.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
                throw new RangeError('Buffer size must be a multiple of 64-bits');
            }
            for (var i4 = 0; i4 < len; i4 += 8) {
                swap(this, i4, i4 + 7);
                swap(this, i4 + 1, i4 + 6);
                swap(this, i4 + 2, i4 + 5);
                swap(this, i4 + 3, i4 + 4);
            }
            return this;
        };
        Buffer2.prototype.toString = function toString3() {
            var length2 = this.length;
            if (length2 === 0) return '';
            if (arguments.length === 0) return utf8Slice(this, 0, length2);
            return slowToString.apply(this, arguments);
        };
        Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
        Buffer2.prototype.equals = function equals4(b5) {
            if (!Buffer2.isBuffer(b5)) throw new TypeError('Argument must be a Buffer');
            if (this === b5) return true;
            return Buffer2.compare(this, b5) === 0;
        };
        Buffer2.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.INSPECT_MAX_BYTES;
            str = this.toString('hex', 0, max)
                .replace(/(.{2})/g, '$1 ')
                .trim();
            if (this.length > max) str += ' ... ';
            return '<Buffer ' + str + '>';
        };
        if (customInspectSymbol) {
            Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
        }
        Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
            if (isInstance(target, Uint8Array)) {
                target = Buffer2.from(target, target.offset, target.byteLength);
            }
            if (!Buffer2.isBuffer(target)) {
                throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
                );
            }
            if (start === void 0) {
                start = 0;
            }
            if (end === void 0) {
                end = target ? target.length : 0;
            }
            if (thisStart === void 0) {
                thisStart = 0;
            }
            if (thisEnd === void 0) {
                thisEnd = this.length;
            }
            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                throw new RangeError('out of range index');
            }
            if (thisStart >= thisEnd && start >= end) {
                return 0;
            }
            if (thisStart >= thisEnd) {
                return -1;
            }
            if (start >= end) {
                return 1;
            }
            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;
            if (this === target) return 0;
            var x5 = thisEnd - thisStart;
            var y6 = end - start;
            var len = Math.min(x5, y6);
            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);
            for (var i4 = 0; i4 < len; ++i4) {
                if (thisCopy[i4] !== targetCopy[i4]) {
                    x5 = thisCopy[i4];
                    y6 = targetCopy[i4];
                    break;
                }
            }
            if (x5 < y6) return -1;
            if (y6 < x5) return 1;
            return 0;
        };
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            if (buffer.length === 0) return -1;
            if (typeof byteOffset === 'string') {
                encoding = byteOffset;
                byteOffset = 0;
            } else if (byteOffset > 2147483647) {
                byteOffset = 2147483647;
            } else if (byteOffset < -2147483648) {
                byteOffset = -2147483648;
            }
            byteOffset = +byteOffset;
            if (numberIsNaN(byteOffset)) {
                byteOffset = dir ? 0 : buffer.length - 1;
            }
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
                if (dir) return -1;
                else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
                if (dir) byteOffset = 0;
                else return -1;
            }
            if (typeof val === 'string') {
                val = Buffer2.from(val, encoding);
            }
            if (Buffer2.isBuffer(val)) {
                if (val.length === 0) {
                    return -1;
                }
                return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === 'number') {
                val = val & 255;
                if (typeof Uint8Array.prototype.indexOf === 'function') {
                    if (dir) {
                        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                    } else {
                        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                    }
                }
                return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }
            throw new TypeError('val must be string, number or Buffer');
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;
            if (encoding !== void 0) {
                encoding = String(encoding).toLowerCase();
                if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
                    if (arr.length < 2 || val.length < 2) {
                        return -1;
                    }
                    indexSize = 2;
                    arrLength /= 2;
                    valLength /= 2;
                    byteOffset /= 2;
                }
            }
            function read2(buf, i5) {
                if (indexSize === 1) {
                    return buf[i5];
                } else {
                    return buf.readUInt16BE(i5 * indexSize);
                }
            }
            var i4;
            if (dir) {
                var foundIndex = -1;
                for (i4 = byteOffset; i4 < arrLength; i4++) {
                    if (read2(arr, i4) === read2(val, foundIndex === -1 ? 0 : i4 - foundIndex)) {
                        if (foundIndex === -1) foundIndex = i4;
                        if (i4 - foundIndex + 1 === valLength) return foundIndex * indexSize;
                    } else {
                        if (foundIndex !== -1) i4 -= i4 - foundIndex;
                        foundIndex = -1;
                    }
                }
            } else {
                if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
                for (i4 = byteOffset; i4 >= 0; i4--) {
                    var found = true;
                    for (var j5 = 0; j5 < valLength; j5++) {
                        if (read2(arr, i4 + j5) !== read2(val, j5)) {
                            found = false;
                            break;
                        }
                    }
                    if (found) return i4;
                }
            }
            return -1;
        }
        Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
        };
        Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string2, offset, length2) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length2) {
                length2 = remaining;
            } else {
                length2 = Number(length2);
                if (length2 > remaining) {
                    length2 = remaining;
                }
            }
            var strLen = string2.length;
            if (length2 > strLen / 2) {
                length2 = strLen / 2;
            }
            for (var i4 = 0; i4 < length2; ++i4) {
                var parsed = parseInt(string2.substr(i4 * 2, 2), 16);
                if (numberIsNaN(parsed)) return i4;
                buf[offset + i4] = parsed;
            }
            return i4;
        }
        function utf8Write(buf, string2, offset, length2) {
            return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length2);
        }
        function asciiWrite(buf, string2, offset, length2) {
            return blitBuffer(asciiToBytes(string2), buf, offset, length2);
        }
        function base64Write(buf, string2, offset, length2) {
            return blitBuffer(base64ToBytes(string2), buf, offset, length2);
        }
        function ucs2Write(buf, string2, offset, length2) {
            return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length2);
        }
        Buffer2.prototype.write = function write(string2, offset, length2, encoding) {
            if (offset === void 0) {
                encoding = 'utf8';
                length2 = this.length;
                offset = 0;
            } else if (length2 === void 0 && typeof offset === 'string') {
                encoding = offset;
                length2 = this.length;
                offset = 0;
            } else if (isFinite(offset)) {
                offset = offset >>> 0;
                if (isFinite(length2)) {
                    length2 = length2 >>> 0;
                    if (encoding === void 0) encoding = 'utf8';
                } else {
                    encoding = length2;
                    length2 = void 0;
                }
            } else {
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
            }
            var remaining = this.length - offset;
            if (length2 === void 0 || length2 > remaining) length2 = remaining;
            if ((string2.length > 0 && (length2 < 0 || offset < 0)) || offset > this.length) {
                throw new RangeError('Attempt to write outside buffer bounds');
            }
            if (!encoding) encoding = 'utf8';
            var loweredCase = false;
            for (;;) {
                switch (encoding) {
                    case 'hex':
                        return hexWrite(this, string2, offset, length2);
                    case 'utf8':
                    case 'utf-8':
                        return utf8Write(this, string2, offset, length2);
                    case 'ascii':
                    case 'latin1':
                    case 'binary':
                        return asciiWrite(this, string2, offset, length2);
                    case 'base64':
                        return base64Write(this, string2, offset, length2);
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        return ucs2Write(this, string2, offset, length2);
                    default:
                        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                        encoding = ('' + encoding).toLowerCase();
                        loweredCase = true;
                }
            }
        };
        Buffer2.prototype.toJSON = function toJSON() {
            return {
                type: 'Buffer',
                data: Array.prototype.slice.call(this._arr || this, 0),
            };
        };
        function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
                return base642.fromByteArray(buf);
            } else {
                return base642.fromByteArray(buf.slice(start, end));
            }
        }
        function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];
            var i4 = start;
            while (i4 < end) {
                var firstByte = buf[i4];
                var codePoint = null;
                var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                if (i4 + bytesPerSequence <= end) {
                    var secondByte, thirdByte, fourthByte, tempCodePoint;
                    switch (bytesPerSequence) {
                        case 1:
                            if (firstByte < 128) {
                                codePoint = firstByte;
                            }
                            break;
                        case 2:
                            secondByte = buf[i4 + 1];
                            if ((secondByte & 192) === 128) {
                                tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
                                if (tempCodePoint > 127) {
                                    codePoint = tempCodePoint;
                                }
                            }
                            break;
                        case 3:
                            secondByte = buf[i4 + 1];
                            thirdByte = buf[i4 + 2];
                            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                                tempCodePoint = ((firstByte & 15) << 12) | ((secondByte & 63) << 6) | (thirdByte & 63);
                                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                                    codePoint = tempCodePoint;
                                }
                            }
                            break;
                        case 4:
                            secondByte = buf[i4 + 1];
                            thirdByte = buf[i4 + 2];
                            fourthByte = buf[i4 + 3];
                            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                                tempCodePoint =
                                    ((firstByte & 15) << 18) |
                                    ((secondByte & 63) << 12) |
                                    ((thirdByte & 63) << 6) |
                                    (fourthByte & 63);
                                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                                    codePoint = tempCodePoint;
                                }
                            }
                    }
                }
                if (codePoint === null) {
                    codePoint = 65533;
                    bytesPerSequence = 1;
                } else if (codePoint > 65535) {
                    codePoint -= 65536;
                    res.push(((codePoint >>> 10) & 1023) | 55296);
                    codePoint = 56320 | (codePoint & 1023);
                }
                res.push(codePoint);
                i4 += bytesPerSequence;
            }
            return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 4096;
        function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
                return String.fromCharCode.apply(String, codePoints);
            }
            var res = '';
            var i4 = 0;
            while (i4 < len) {
                res += String.fromCharCode.apply(String, codePoints.slice(i4, (i4 += MAX_ARGUMENTS_LENGTH)));
            }
            return res;
        }
        function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for (var i4 = start; i4 < end; ++i4) {
                ret += String.fromCharCode(buf[i4] & 127);
            }
            return ret;
        }
        function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for (var i4 = start; i4 < end; ++i4) {
                ret += String.fromCharCode(buf[i4]);
            }
            return ret;
        }
        function hexSlice(buf, start, end) {
            var len = buf.length;
            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;
            var out = '';
            for (var i4 = start; i4 < end; ++i4) {
                out += hexSliceLookupTable[buf[i4]];
            }
            return out;
        }
        function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';
            for (var i4 = 0; i4 < bytes.length - 1; i4 += 2) {
                res += String.fromCharCode(bytes[i4] + bytes[i4 + 1] * 256);
            }
            return res;
        }
        Buffer2.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === void 0 ? len : ~~end;
            if (start < 0) {
                start += len;
                if (start < 0) start = 0;
            } else if (start > len) {
                start = len;
            }
            if (end < 0) {
                end += len;
                if (end < 0) end = 0;
            } else if (end > len) {
                end = len;
            }
            if (end < start) end = start;
            var newBuf = this.subarray(start, end);
            Object.setPrototypeOf(newBuf, Buffer2.prototype);
            return newBuf;
        };
        function checkOffset(offset, ext, length2) {
            if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
            if (offset + ext > length2) throw new RangeError('Trying to access beyond buffer length');
        }
        Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(
            offset,
            byteLength2,
            noAssert
        ) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) checkOffset(offset, byteLength2, this.length);
            var val = this[offset];
            var mul = 1;
            var i4 = 0;
            while (++i4 < byteLength2 && (mul *= 256)) {
                val += this[offset + i4] * mul;
            }
            return val;
        };
        Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(
            offset,
            byteLength2,
            noAssert
        ) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
                checkOffset(offset, byteLength2, this.length);
            }
            var val = this[offset + --byteLength2];
            var mul = 1;
            while (byteLength2 > 0 && (mul *= 256)) {
                val += this[offset + --byteLength2] * mul;
            }
            return val;
        };
        Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
        };
        Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | (this[offset + 1] << 8);
        };
        Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return (this[offset] << 8) | this[offset + 1];
        };
        Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + this[offset + 3] * 16777216;
        };
        Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] * 16777216 + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
        };
        Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) checkOffset(offset, byteLength2, this.length);
            var val = this[offset];
            var mul = 1;
            var i4 = 0;
            while (++i4 < byteLength2 && (mul *= 256)) {
                val += this[offset + i4] * mul;
            }
            mul *= 128;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
            return val;
        };
        Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) checkOffset(offset, byteLength2, this.length);
            var i4 = byteLength2;
            var mul = 1;
            var val = this[offset + --i4];
            while (i4 > 0 && (mul *= 256)) {
                val += this[offset + --i4] * mul;
            }
            mul *= 128;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
            return val;
        };
        Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 128)) return this[offset];
            return (255 - this[offset] + 1) * -1;
        };
        Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | (this[offset + 1] << 8);
            return val & 32768 ? val | 4294901760 : val;
        };
        Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | (this[offset] << 8);
            return val & 32768 ? val | 4294901760 : val;
        };
        Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
        };
        Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3];
        };
        Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
        }
        Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(
            value,
            offset,
            byteLength2,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                checkInt(this, value, offset, byteLength2, maxBytes, 0);
            }
            var mul = 1;
            var i4 = 0;
            this[offset] = value & 255;
            while (++i4 < byteLength2 && (mul *= 256)) {
                this[offset + i4] = (value / mul) & 255;
            }
            return offset + byteLength2;
        };
        Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(
            value,
            offset,
            byteLength2,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                checkInt(this, value, offset, byteLength2, maxBytes, 0);
            }
            var i4 = byteLength2 - 1;
            var mul = 1;
            this[offset + i4] = value & 255;
            while (--i4 >= 0 && (mul *= 256)) {
                this[offset + i4] = (value / mul) & 255;
            }
            return offset + byteLength2;
        };
        Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
            this[offset] = value & 255;
            return offset + 1;
        };
        Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(
            value,
            offset,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            return offset + 2;
        };
        Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(
            value,
            offset,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
            return offset + 2;
        };
        Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(
            value,
            offset,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 255;
            return offset + 4;
        };
        Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(
            value,
            offset,
            noAssert
        ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
            return offset + 4;
        };
        Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength2 - 1);
                checkInt(this, value, offset, byteLength2, limit - 1, -limit);
            }
            var i4 = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 255;
            while (++i4 < byteLength2 && (mul *= 256)) {
                if (value < 0 && sub === 0 && this[offset + i4 - 1] !== 0) {
                    sub = 1;
                }
                this[offset + i4] = (((value / mul) >> 0) - sub) & 255;
            }
            return offset + byteLength2;
        };
        Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength2 - 1);
                checkInt(this, value, offset, byteLength2, limit - 1, -limit);
            }
            var i4 = byteLength2 - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i4] = value & 255;
            while (--i4 >= 0 && (mul *= 256)) {
                if (value < 0 && sub === 0 && this[offset + i4 + 1] !== 0) {
                    sub = 1;
                }
                this[offset + i4] = (((value / mul) >> 0) - sub) & 255;
            }
            return offset + byteLength2;
        };
        Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
            if (value < 0) value = 255 + value + 1;
            this[offset] = value & 255;
            return offset + 1;
        };
        Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            return offset + 2;
        };
        Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
            return offset + 2;
        };
        Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
        };
        Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
            if (value < 0) value = 4294967295 + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
            return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
                checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
        }
        Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
                checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
        }
        Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
            if (!Buffer2.isBuffer(target)) throw new TypeError('argument should be a Buffer');
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;
            if (targetStart < 0) {
                throw new RangeError('targetStart out of bounds');
            }
            if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
                end = target.length - targetStart + start;
            }
            var len = end - start;
            if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
                this.copyWithin(targetStart, start, end);
            } else {
                Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
            }
            return len;
        };
        Buffer2.prototype.fill = function fill(val, start, end, encoding) {
            if (typeof val === 'string') {
                if (typeof start === 'string') {
                    encoding = start;
                    start = 0;
                    end = this.length;
                } else if (typeof end === 'string') {
                    encoding = end;
                    end = this.length;
                }
                if (encoding !== void 0 && typeof encoding !== 'string') {
                    throw new TypeError('encoding must be a string');
                }
                if (typeof encoding === 'string' && !Buffer2.isEncoding(encoding)) {
                    throw new TypeError('Unknown encoding: ' + encoding);
                }
                if (val.length === 1) {
                    var code2 = val.charCodeAt(0);
                    if ((encoding === 'utf8' && code2 < 128) || encoding === 'latin1') {
                        val = code2;
                    }
                }
            } else if (typeof val === 'number') {
                val = val & 255;
            } else if (typeof val === 'boolean') {
                val = Number(val);
            }
            if (start < 0 || this.length < start || this.length < end) {
                throw new RangeError('Out of range index');
            }
            if (end <= start) {
                return this;
            }
            start = start >>> 0;
            end = end === void 0 ? this.length : end >>> 0;
            if (!val) val = 0;
            var i4;
            if (typeof val === 'number') {
                for (i4 = start; i4 < end; ++i4) {
                    this[i4] = val;
                }
            } else {
                var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
                var len = bytes.length;
                if (len === 0) {
                    throw new TypeError('The value "' + val + '" is invalid for argument "value"');
                }
                for (i4 = 0; i4 < end - start; ++i4) {
                    this[i4 + start] = bytes[i4 % len];
                }
            }
            return this;
        };
        var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
        function base64clean(str) {
            str = str.split('=')[0];
            str = str.trim().replace(INVALID_BASE64_RE, '');
            if (str.length < 2) return '';
            while (str.length % 4 !== 0) {
                str = str + '=';
            }
            return str;
        }
        function utf8ToBytes(string2, units) {
            units = units || Infinity;
            var codePoint;
            var length2 = string2.length;
            var leadSurrogate = null;
            var bytes = [];
            for (var i4 = 0; i4 < length2; ++i4) {
                codePoint = string2.charCodeAt(i4);
                if (codePoint > 55295 && codePoint < 57344) {
                    if (!leadSurrogate) {
                        if (codePoint > 56319) {
                            if ((units -= 3) > -1) bytes.push(239, 191, 189);
                            continue;
                        } else if (i4 + 1 === length2) {
                            if ((units -= 3) > -1) bytes.push(239, 191, 189);
                            continue;
                        }
                        leadSurrogate = codePoint;
                        continue;
                    }
                    if (codePoint < 56320) {
                        if ((units -= 3) > -1) bytes.push(239, 191, 189);
                        leadSurrogate = codePoint;
                        continue;
                    }
                    codePoint = (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
                } else if (leadSurrogate) {
                    if ((units -= 3) > -1) bytes.push(239, 191, 189);
                }
                leadSurrogate = null;
                if (codePoint < 128) {
                    if ((units -= 1) < 0) break;
                    bytes.push(codePoint);
                } else if (codePoint < 2048) {
                    if ((units -= 2) < 0) break;
                    bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
                } else if (codePoint < 65536) {
                    if ((units -= 3) < 0) break;
                    bytes.push((codePoint >> 12) | 224, ((codePoint >> 6) & 63) | 128, (codePoint & 63) | 128);
                } else if (codePoint < 1114112) {
                    if ((units -= 4) < 0) break;
                    bytes.push(
                        (codePoint >> 18) | 240,
                        ((codePoint >> 12) & 63) | 128,
                        ((codePoint >> 6) & 63) | 128,
                        (codePoint & 63) | 128
                    );
                } else {
                    throw new Error('Invalid code point');
                }
            }
            return bytes;
        }
        function asciiToBytes(str) {
            var byteArray = [];
            for (var i4 = 0; i4 < str.length; ++i4) {
                byteArray.push(str.charCodeAt(i4) & 255);
            }
            return byteArray;
        }
        function utf16leToBytes(str, units) {
            var c5, hi, lo;
            var byteArray = [];
            for (var i4 = 0; i4 < str.length; ++i4) {
                if ((units -= 2) < 0) break;
                c5 = str.charCodeAt(i4);
                hi = c5 >> 8;
                lo = c5 % 256;
                byteArray.push(lo);
                byteArray.push(hi);
            }
            return byteArray;
        }
        function base64ToBytes(str) {
            return base642.toByteArray(base64clean(str));
        }
        function blitBuffer(src2, dst, offset, length2) {
            for (var i4 = 0; i4 < length2; ++i4) {
                if (i4 + offset >= dst.length || i4 >= src2.length) break;
                dst[i4 + offset] = src2[i4];
            }
            return i4;
        }
        function isInstance(obj, type) {
            return (
                obj instanceof type ||
                (obj != null &&
                    obj.constructor != null &&
                    obj.constructor.name != null &&
                    obj.constructor.name === type.name)
            );
        }
        function numberIsNaN(obj) {
            return obj !== obj;
        }
        var hexSliceLookupTable = (function () {
            var alphabet2 = '0123456789abcdef';
            var table = new Array(256);
            for (var i4 = 0; i4 < 16; ++i4) {
                var i16 = i4 * 16;
                for (var j5 = 0; j5 < 16; ++j5) {
                    table[i16 + j5] = alphabet2[i4] + alphabet2[j5];
                }
            }
            return table;
        })();
    },
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
    'node_modules/qrcode/lib/core/reed-solomon-encoder.js'(exports, module) {
        var BufferUtil = require_typedarray_buffer();
        var Polynomial = require_polynomial();
        var Buffer2 = require_buffer().Buffer;
        function ReedSolomonEncoder(degree) {
            this.genPoly = void 0;
            this.degree = degree;
            if (this.degree) this.initialize(this.degree);
        }
        ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
            this.degree = degree;
            this.genPoly = Polynomial.generateECPolynomial(this.degree);
        };
        ReedSolomonEncoder.prototype.encode = function encode5(data) {
            if (!this.genPoly) {
                throw new Error('Encoder not initialized');
            }
            var pad = BufferUtil.alloc(this.degree);
            var paddedData = Buffer2.concat([data, pad], data.length + this.degree);
            var remainder = Polynomial.mod(paddedData, this.genPoly);
            var start = this.degree - remainder.length;
            if (start > 0) {
                var buff = BufferUtil.alloc(this.degree);
                remainder.copy(buff, start);
                return buff;
            }
            return remainder;
        };
        module.exports = ReedSolomonEncoder;
    },
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
    'node_modules/qrcode/lib/core/version-check.js'(exports) {
        exports.isValid = function isValid(version2) {
            return !isNaN(version2) && version2 >= 1 && version2 <= 40;
        };
    },
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
    'node_modules/qrcode/lib/core/regex.js'(exports) {
        var numeric = '[0-9]+';
        var alphanumeric = '[A-Z $%*+\\-./:]+';
        var kanji =
            '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
        kanji = kanji.replace(/u/g, '\\u');
        var byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
        exports.KANJI = new RegExp(kanji, 'g');
        exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
        exports.BYTE = new RegExp(byte, 'g');
        exports.NUMERIC = new RegExp(numeric, 'g');
        exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
        var TEST_KANJI = new RegExp('^' + kanji + '$');
        var TEST_NUMERIC = new RegExp('^' + numeric + '$');
        var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
        exports.testKanji = function testKanji(str) {
            return TEST_KANJI.test(str);
        };
        exports.testNumeric = function testNumeric(str) {
            return TEST_NUMERIC.test(str);
        };
        exports.testAlphanumeric = function testAlphanumeric(str) {
            return TEST_ALPHANUMERIC.test(str);
        };
    },
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
    'node_modules/qrcode/lib/core/mode.js'(exports) {
        var VersionCheck = require_version_check();
        var Regex = require_regex();
        exports.NUMERIC = {
            id: 'Numeric',
            bit: 1 << 0,
            ccBits: [10, 12, 14],
        };
        exports.ALPHANUMERIC = {
            id: 'Alphanumeric',
            bit: 1 << 1,
            ccBits: [9, 11, 13],
        };
        exports.BYTE = {
            id: 'Byte',
            bit: 1 << 2,
            ccBits: [8, 16, 16],
        };
        exports.KANJI = {
            id: 'Kanji',
            bit: 1 << 3,
            ccBits: [8, 10, 12],
        };
        exports.MIXED = {
            bit: -1,
        };
        exports.getCharCountIndicator = function getCharCountIndicator(mode, version2) {
            if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
            if (!VersionCheck.isValid(version2)) {
                throw new Error('Invalid version: ' + version2);
            }
            if (version2 >= 1 && version2 < 10) return mode.ccBits[0];
            else if (version2 < 27) return mode.ccBits[1];
            return mode.ccBits[2];
        };
        exports.getBestModeForData = function getBestModeForData(dataStr) {
            if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
            else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
            else if (Regex.testKanji(dataStr)) return exports.KANJI;
            else return exports.BYTE;
        };
        exports.toString = function toString3(mode) {
            if (mode && mode.id) return mode.id;
            throw new Error('Invalid mode');
        };
        exports.isValid = function isValid(mode) {
            return mode && mode.bit && mode.ccBits;
        };
        function fromString3(string2) {
            if (typeof string2 !== 'string') {
                throw new Error('Param is not a string');
            }
            var lcStr = string2.toLowerCase();
            switch (lcStr) {
                case 'numeric':
                    return exports.NUMERIC;
                case 'alphanumeric':
                    return exports.ALPHANUMERIC;
                case 'kanji':
                    return exports.KANJI;
                case 'byte':
                    return exports.BYTE;
                default:
                    throw new Error('Unknown mode: ' + string2);
            }
        }
        exports.from = function from3(value, defaultValue) {
            if (exports.isValid(value)) {
                return value;
            }
            try {
                return fromString3(value);
            } catch (e3) {
                return defaultValue;
            }
        };
    },
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
    'node_modules/qrcode/lib/core/version.js'(exports) {
        var Utils = require_utils();
        var ECCode = require_error_correction_code();
        var ECLevel = require_error_correction_level();
        var Mode = require_mode();
        var VersionCheck = require_version_check();
        var isArray = require_isarray();
        var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
        var G18_BCH = Utils.getBCHDigit(G18);
        function getBestVersionForDataLength(mode, length2, errorCorrectionLevel) {
            for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
                if (length2 <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
                    return currentVersion;
                }
            }
            return void 0;
        }
        function getReservedBitsCount(mode, version2) {
            return Mode.getCharCountIndicator(mode, version2) + 4;
        }
        function getTotalBitsFromDataArray(segments, version2) {
            var totalBits = 0;
            segments.forEach(function (data) {
                var reservedBits = getReservedBitsCount(data.mode, version2);
                totalBits += reservedBits + data.getBitsLength();
            });
            return totalBits;
        }
        function getBestVersionForMixedData(segments, errorCorrectionLevel) {
            for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
                var length2 = getTotalBitsFromDataArray(segments, currentVersion);
                if (length2 <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
                    return currentVersion;
                }
            }
            return void 0;
        }
        exports.from = function from3(value, defaultValue) {
            if (VersionCheck.isValid(value)) {
                return parseInt(value, 10);
            }
            return defaultValue;
        };
        exports.getCapacity = function getCapacity(version2, errorCorrectionLevel, mode) {
            if (!VersionCheck.isValid(version2)) {
                throw new Error('Invalid QR Code version');
            }
            if (typeof mode === 'undefined') mode = Mode.BYTE;
            var totalCodewords = Utils.getSymbolTotalCodewords(version2);
            var ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
            var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
            if (mode === Mode.MIXED) return dataTotalCodewordsBits;
            var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version2);
            switch (mode) {
                case Mode.NUMERIC:
                    return Math.floor((usableBits / 10) * 3);
                case Mode.ALPHANUMERIC:
                    return Math.floor((usableBits / 11) * 2);
                case Mode.KANJI:
                    return Math.floor(usableBits / 13);
                case Mode.BYTE:
                default:
                    return Math.floor(usableBits / 8);
            }
        };
        exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
            var seg;
            var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
            if (isArray(data)) {
                if (data.length > 1) {
                    return getBestVersionForMixedData(data, ecl);
                }
                if (data.length === 0) {
                    return 1;
                }
                seg = data[0];
            } else {
                seg = data;
            }
            return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
        };
        exports.getEncodedBits = function getEncodedBits(version2) {
            if (!VersionCheck.isValid(version2) || version2 < 7) {
                throw new Error('Invalid QR Code version');
            }
            var d4 = version2 << 12;
            while (Utils.getBCHDigit(d4) - G18_BCH >= 0) {
                d4 ^= G18 << (Utils.getBCHDigit(d4) - G18_BCH);
            }
            return (version2 << 12) | d4;
        };
    },
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
    'node_modules/qrcode/lib/core/format-info.js'(exports) {
        var Utils = require_utils();
        var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
        var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
        var G15_BCH = Utils.getBCHDigit(G15);
        exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
            var data = (errorCorrectionLevel.bit << 3) | mask;
            var d4 = data << 10;
            while (Utils.getBCHDigit(d4) - G15_BCH >= 0) {
                d4 ^= G15 << (Utils.getBCHDigit(d4) - G15_BCH);
            }
            return ((data << 10) | d4) ^ G15_MASK;
        };
    },
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
    'node_modules/qrcode/lib/core/numeric-data.js'(exports, module) {
        var Mode = require_mode();
        function NumericData(data) {
            this.mode = Mode.NUMERIC;
            this.data = data.toString();
        }
        NumericData.getBitsLength = function getBitsLength(length2) {
            return 10 * Math.floor(length2 / 3) + (length2 % 3 ? (length2 % 3) * 3 + 1 : 0);
        };
        NumericData.prototype.getLength = function getLength() {
            return this.data.length;
        };
        NumericData.prototype.getBitsLength = function getBitsLength() {
            return NumericData.getBitsLength(this.data.length);
        };
        NumericData.prototype.write = function write(bitBuffer) {
            var i4, group, value;
            for (i4 = 0; i4 + 3 <= this.data.length; i4 += 3) {
                group = this.data.substr(i4, 3);
                value = parseInt(group, 10);
                bitBuffer.put(value, 10);
            }
            var remainingNum = this.data.length - i4;
            if (remainingNum > 0) {
                group = this.data.substr(i4);
                value = parseInt(group, 10);
                bitBuffer.put(value, remainingNum * 3 + 1);
            }
        };
        module.exports = NumericData;
    },
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
    'node_modules/qrcode/lib/core/alphanumeric-data.js'(exports, module) {
        var Mode = require_mode();
        var ALPHA_NUM_CHARS = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            ' ',
            '$',
            '%',
            '*',
            '+',
            '-',
            '.',
            '/',
            ':',
        ];
        function AlphanumericData(data) {
            this.mode = Mode.ALPHANUMERIC;
            this.data = data;
        }
        AlphanumericData.getBitsLength = function getBitsLength(length2) {
            return 11 * Math.floor(length2 / 2) + 6 * (length2 % 2);
        };
        AlphanumericData.prototype.getLength = function getLength() {
            return this.data.length;
        };
        AlphanumericData.prototype.getBitsLength = function getBitsLength() {
            return AlphanumericData.getBitsLength(this.data.length);
        };
        AlphanumericData.prototype.write = function write(bitBuffer) {
            var i4;
            for (i4 = 0; i4 + 2 <= this.data.length; i4 += 2) {
                var value = ALPHA_NUM_CHARS.indexOf(this.data[i4]) * 45;
                value += ALPHA_NUM_CHARS.indexOf(this.data[i4 + 1]);
                bitBuffer.put(value, 11);
            }
            if (this.data.length % 2) {
                bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i4]), 6);
            }
        };
        module.exports = AlphanumericData;
    },
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
    'node_modules/qrcode/lib/core/byte-data.js'(exports, module) {
        var BufferUtil = require_typedarray_buffer();
        var Mode = require_mode();
        function ByteData(data) {
            this.mode = Mode.BYTE;
            this.data = BufferUtil.from(data);
        }
        ByteData.getBitsLength = function getBitsLength(length2) {
            return length2 * 8;
        };
        ByteData.prototype.getLength = function getLength() {
            return this.data.length;
        };
        ByteData.prototype.getBitsLength = function getBitsLength() {
            return ByteData.getBitsLength(this.data.length);
        };
        ByteData.prototype.write = function (bitBuffer) {
            for (var i4 = 0, l4 = this.data.length; i4 < l4; i4++) {
                bitBuffer.put(this.data[i4], 8);
            }
        };
        module.exports = ByteData;
    },
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
    'node_modules/qrcode/lib/core/kanji-data.js'(exports, module) {
        var Mode = require_mode();
        var Utils = require_utils();
        function KanjiData(data) {
            this.mode = Mode.KANJI;
            this.data = data;
        }
        KanjiData.getBitsLength = function getBitsLength(length2) {
            return length2 * 13;
        };
        KanjiData.prototype.getLength = function getLength() {
            return this.data.length;
        };
        KanjiData.prototype.getBitsLength = function getBitsLength() {
            return KanjiData.getBitsLength(this.data.length);
        };
        KanjiData.prototype.write = function (bitBuffer) {
            var i4;
            for (i4 = 0; i4 < this.data.length; i4++) {
                var value = Utils.toSJIS(this.data[i4]);
                if (value >= 33088 && value <= 40956) {
                    value -= 33088;
                } else if (value >= 57408 && value <= 60351) {
                    value -= 49472;
                } else {
                    throw new Error('Invalid SJIS character: ' + this.data[i4] + '\nMake sure your charset is UTF-8');
                }
                value = ((value >>> 8) & 255) * 192 + (value & 255);
                bitBuffer.put(value, 13);
            }
        };
        module.exports = KanjiData;
    },
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
    'node_modules/dijkstrajs/dijkstra.js'(exports, module) {
        'use strict';
        var dijkstra = {
            single_source_shortest_paths: function (graph, s3, d4) {
                var predecessors = {};
                var costs = {};
                costs[s3] = 0;
                var open = dijkstra.PriorityQueue.make();
                open.push(s3, 0);
                var closest,
                    u5,
                    v5,
                    cost_of_s_to_u,
                    adjacent_nodes,
                    cost_of_e,
                    cost_of_s_to_u_plus_cost_of_e,
                    cost_of_s_to_v,
                    first_visit;
                while (!open.empty()) {
                    closest = open.pop();
                    u5 = closest.value;
                    cost_of_s_to_u = closest.cost;
                    adjacent_nodes = graph[u5] || {};
                    for (v5 in adjacent_nodes) {
                        if (adjacent_nodes.hasOwnProperty(v5)) {
                            cost_of_e = adjacent_nodes[v5];
                            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                            cost_of_s_to_v = costs[v5];
                            first_visit = typeof costs[v5] === 'undefined';
                            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                                costs[v5] = cost_of_s_to_u_plus_cost_of_e;
                                open.push(v5, cost_of_s_to_u_plus_cost_of_e);
                                predecessors[v5] = u5;
                            }
                        }
                    }
                }
                if (typeof d4 !== 'undefined' && typeof costs[d4] === 'undefined') {
                    var msg = ['Could not find a path from ', s3, ' to ', d4, '.'].join('');
                    throw new Error(msg);
                }
                return predecessors;
            },
            extract_shortest_path_from_predecessor_list: function (predecessors, d4) {
                var nodes = [];
                var u5 = d4;
                var predecessor;
                while (u5) {
                    nodes.push(u5);
                    predecessor = predecessors[u5];
                    u5 = predecessors[u5];
                }
                nodes.reverse();
                return nodes;
            },
            find_path: function (graph, s3, d4) {
                var predecessors = dijkstra.single_source_shortest_paths(graph, s3, d4);
                return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d4);
            },
            /**
             * A very naive priority queue implementation.
             */
            PriorityQueue: {
                make: function (opts) {
                    var T4 = dijkstra.PriorityQueue,
                        t3 = {},
                        key;
                    opts = opts || {};
                    for (key in T4) {
                        if (T4.hasOwnProperty(key)) {
                            t3[key] = T4[key];
                        }
                    }
                    t3.queue = [];
                    t3.sorter = opts.sorter || T4.default_sorter;
                    return t3;
                },
                default_sorter: function (a5, b5) {
                    return a5.cost - b5.cost;
                },
                /**
                 * Add a new item to the queue and ensure the highest priority element
                 * is at the front of the queue.
                 */
                push: function (value, cost) {
                    var item = { value, cost };
                    this.queue.push(item);
                    this.queue.sort(this.sorter);
                },
                /**
                 * Return the highest priority element in the queue.
                 */
                pop: function () {
                    return this.queue.shift();
                },
                empty: function () {
                    return this.queue.length === 0;
                },
            },
        };
        if (typeof module !== 'undefined') {
            module.exports = dijkstra;
        }
    },
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
    'node_modules/qrcode/lib/core/segments.js'(exports) {
        var Mode = require_mode();
        var NumericData = require_numeric_data();
        var AlphanumericData = require_alphanumeric_data();
        var ByteData = require_byte_data();
        var KanjiData = require_kanji_data();
        var Regex = require_regex();
        var Utils = require_utils();
        var dijkstra = require_dijkstra();
        function getStringByteLength(str) {
            return unescape(encodeURIComponent(str)).length;
        }
        function getSegments(regex, mode, str) {
            var segments = [];
            var result;
            while ((result = regex.exec(str)) !== null) {
                segments.push({
                    data: result[0],
                    index: result.index,
                    mode,
                    length: result[0].length,
                });
            }
            return segments;
        }
        function getSegmentsFromString(dataStr) {
            var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
            var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
            var byteSegs;
            var kanjiSegs;
            if (Utils.isKanjiModeEnabled()) {
                byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
                kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
            } else {
                byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
                kanjiSegs = [];
            }
            var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
            return segs
                .sort(function (s1, s22) {
                    return s1.index - s22.index;
                })
                .map(function (obj) {
                    return {
                        data: obj.data,
                        mode: obj.mode,
                        length: obj.length,
                    };
                });
        }
        function getSegmentBitsLength(length2, mode) {
            switch (mode) {
                case Mode.NUMERIC:
                    return NumericData.getBitsLength(length2);
                case Mode.ALPHANUMERIC:
                    return AlphanumericData.getBitsLength(length2);
                case Mode.KANJI:
                    return KanjiData.getBitsLength(length2);
                case Mode.BYTE:
                    return ByteData.getBitsLength(length2);
            }
        }
        function mergeSegments(segs) {
            return segs.reduce(function (acc, curr) {
                var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
                if (prevSeg && prevSeg.mode === curr.mode) {
                    acc[acc.length - 1].data += curr.data;
                    return acc;
                }
                acc.push(curr);
                return acc;
            }, []);
        }
        function buildNodes(segs) {
            var nodes = [];
            for (var i4 = 0; i4 < segs.length; i4++) {
                var seg = segs[i4];
                switch (seg.mode) {
                    case Mode.NUMERIC:
                        nodes.push([
                            seg,
                            { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
                            { data: seg.data, mode: Mode.BYTE, length: seg.length },
                        ]);
                        break;
                    case Mode.ALPHANUMERIC:
                        nodes.push([seg, { data: seg.data, mode: Mode.BYTE, length: seg.length }]);
                        break;
                    case Mode.KANJI:
                        nodes.push([seg, { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }]);
                        break;
                    case Mode.BYTE:
                        nodes.push([{ data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }]);
                }
            }
            return nodes;
        }
        function buildGraph(nodes, version2) {
            var table = {};
            var graph = { start: {} };
            var prevNodeIds = ['start'];
            for (var i4 = 0; i4 < nodes.length; i4++) {
                var nodeGroup = nodes[i4];
                var currentNodeIds = [];
                for (var j5 = 0; j5 < nodeGroup.length; j5++) {
                    var node = nodeGroup[j5];
                    var key = '' + i4 + j5;
                    currentNodeIds.push(key);
                    table[key] = { node, lastCount: 0 };
                    graph[key] = {};
                    for (var n3 = 0; n3 < prevNodeIds.length; n3++) {
                        var prevNodeId = prevNodeIds[n3];
                        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                            graph[prevNodeId][key] =
                                getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
                                getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                            table[prevNodeId].lastCount += node.length;
                        } else {
                            if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                            graph[prevNodeId][key] =
                                getSegmentBitsLength(node.length, node.mode) +
                                4 +
                                Mode.getCharCountIndicator(node.mode, version2);
                        }
                    }
                }
                prevNodeIds = currentNodeIds;
            }
            for (n3 = 0; n3 < prevNodeIds.length; n3++) {
                graph[prevNodeIds[n3]]['end'] = 0;
            }
            return { map: graph, table };
        }
        function buildSingleSegment(data, modesHint) {
            var mode;
            var bestMode = Mode.getBestModeForData(data);
            mode = Mode.from(modesHint, bestMode);
            if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
                throw new Error(
                    '"' +
                        data +
                        '" cannot be encoded with mode ' +
                        Mode.toString(mode) +
                        '.\n Suggested mode is: ' +
                        Mode.toString(bestMode)
                );
            }
            if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
                mode = Mode.BYTE;
            }
            switch (mode) {
                case Mode.NUMERIC:
                    return new NumericData(data);
                case Mode.ALPHANUMERIC:
                    return new AlphanumericData(data);
                case Mode.KANJI:
                    return new KanjiData(data);
                case Mode.BYTE:
                    return new ByteData(data);
            }
        }
        exports.fromArray = function fromArray(array) {
            return array.reduce(function (acc, seg) {
                if (typeof seg === 'string') {
                    acc.push(buildSingleSegment(seg, null));
                } else if (seg.data) {
                    acc.push(buildSingleSegment(seg.data, seg.mode));
                }
                return acc;
            }, []);
        };
        exports.fromString = function fromString3(data, version2) {
            var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
            var nodes = buildNodes(segs);
            var graph = buildGraph(nodes, version2);
            var path = dijkstra.find_path(graph.map, 'start', 'end');
            var optimizedSegs = [];
            for (var i4 = 1; i4 < path.length - 1; i4++) {
                optimizedSegs.push(graph.table[path[i4]].node);
            }
            return exports.fromArray(mergeSegments(optimizedSegs));
        };
        exports.rawSplit = function rawSplit(data) {
            return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
        };
    },
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
    'node_modules/qrcode/lib/core/qrcode.js'(exports) {
        var BufferUtil = require_typedarray_buffer();
        var Utils = require_utils();
        var ECLevel = require_error_correction_level();
        var BitBuffer = require_bit_buffer();
        var BitMatrix = require_bit_matrix();
        var AlignmentPattern = require_alignment_pattern();
        var FinderPattern = require_finder_pattern();
        var MaskPattern = require_mask_pattern();
        var ECCode = require_error_correction_code();
        var ReedSolomonEncoder = require_reed_solomon_encoder();
        var Version = require_version();
        var FormatInfo = require_format_info();
        var Mode = require_mode();
        var Segments = require_segments();
        var isArray = require_isarray();
        function setupFinderPattern(matrix, version2) {
            var size = matrix.size;
            var pos = FinderPattern.getPositions(version2);
            for (var i4 = 0; i4 < pos.length; i4++) {
                var row = pos[i4][0];
                var col = pos[i4][1];
                for (var r3 = -1; r3 <= 7; r3++) {
                    if (row + r3 <= -1 || size <= row + r3) continue;
                    for (var c5 = -1; c5 <= 7; c5++) {
                        if (col + c5 <= -1 || size <= col + c5) continue;
                        if (
                            (r3 >= 0 && r3 <= 6 && (c5 === 0 || c5 === 6)) ||
                            (c5 >= 0 && c5 <= 6 && (r3 === 0 || r3 === 6)) ||
                            (r3 >= 2 && r3 <= 4 && c5 >= 2 && c5 <= 4)
                        ) {
                            matrix.set(row + r3, col + c5, true, true);
                        } else {
                            matrix.set(row + r3, col + c5, false, true);
                        }
                    }
                }
            }
        }
        function setupTimingPattern(matrix) {
            var size = matrix.size;
            for (var r3 = 8; r3 < size - 8; r3++) {
                var value = r3 % 2 === 0;
                matrix.set(r3, 6, value, true);
                matrix.set(6, r3, value, true);
            }
        }
        function setupAlignmentPattern(matrix, version2) {
            var pos = AlignmentPattern.getPositions(version2);
            for (var i4 = 0; i4 < pos.length; i4++) {
                var row = pos[i4][0];
                var col = pos[i4][1];
                for (var r3 = -2; r3 <= 2; r3++) {
                    for (var c5 = -2; c5 <= 2; c5++) {
                        if (r3 === -2 || r3 === 2 || c5 === -2 || c5 === 2 || (r3 === 0 && c5 === 0)) {
                            matrix.set(row + r3, col + c5, true, true);
                        } else {
                            matrix.set(row + r3, col + c5, false, true);
                        }
                    }
                }
            }
        }
        function setupVersionInfo(matrix, version2) {
            var size = matrix.size;
            var bits = Version.getEncodedBits(version2);
            var row, col, mod;
            for (var i4 = 0; i4 < 18; i4++) {
                row = Math.floor(i4 / 3);
                col = (i4 % 3) + size - 8 - 3;
                mod = ((bits >> i4) & 1) === 1;
                matrix.set(row, col, mod, true);
                matrix.set(col, row, mod, true);
            }
        }
        function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
            var size = matrix.size;
            var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
            var i4, mod;
            for (i4 = 0; i4 < 15; i4++) {
                mod = ((bits >> i4) & 1) === 1;
                if (i4 < 6) {
                    matrix.set(i4, 8, mod, true);
                } else if (i4 < 8) {
                    matrix.set(i4 + 1, 8, mod, true);
                } else {
                    matrix.set(size - 15 + i4, 8, mod, true);
                }
                if (i4 < 8) {
                    matrix.set(8, size - i4 - 1, mod, true);
                } else if (i4 < 9) {
                    matrix.set(8, 15 - i4 - 1 + 1, mod, true);
                } else {
                    matrix.set(8, 15 - i4 - 1, mod, true);
                }
            }
            matrix.set(size - 8, 8, 1, true);
        }
        function setupData(matrix, data) {
            var size = matrix.size;
            var inc = -1;
            var row = size - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            for (var col = size - 1; col > 0; col -= 2) {
                if (col === 6) col--;
                while (true) {
                    for (var c5 = 0; c5 < 2; c5++) {
                        if (!matrix.isReserved(row, col - c5)) {
                            var dark = false;
                            if (byteIndex < data.length) {
                                dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
                            }
                            matrix.set(row, col - c5, dark);
                            bitIndex--;
                            if (bitIndex === -1) {
                                byteIndex++;
                                bitIndex = 7;
                            }
                        }
                    }
                    row += inc;
                    if (row < 0 || size <= row) {
                        row -= inc;
                        inc = -inc;
                        break;
                    }
                }
            }
        }
        function createData(version2, errorCorrectionLevel, segments) {
            var buffer = new BitBuffer();
            segments.forEach(function (data) {
                buffer.put(data.mode.bit, 4);
                buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
                data.write(buffer);
            });
            var totalCodewords = Utils.getSymbolTotalCodewords(version2);
            var ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
            var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
            if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
                buffer.put(0, 4);
            }
            while (buffer.getLengthInBits() % 8 !== 0) {
                buffer.putBit(0);
            }
            var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
            for (var i4 = 0; i4 < remainingByte; i4++) {
                buffer.put(i4 % 2 ? 17 : 236, 8);
            }
            return createCodewords(buffer, version2, errorCorrectionLevel);
        }
        function createCodewords(bitBuffer, version2, errorCorrectionLevel) {
            var totalCodewords = Utils.getSymbolTotalCodewords(version2);
            var ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
            var dataTotalCodewords = totalCodewords - ecTotalCodewords;
            var ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel);
            var blocksInGroup2 = totalCodewords % ecTotalBlocks;
            var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
            var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
            var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
            var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
            var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
            var rs2 = new ReedSolomonEncoder(ecCount);
            var offset = 0;
            var dcData = new Array(ecTotalBlocks);
            var ecData = new Array(ecTotalBlocks);
            var maxDataSize = 0;
            var buffer = BufferUtil.from(bitBuffer.buffer);
            for (var b5 = 0; b5 < ecTotalBlocks; b5++) {
                var dataSize = b5 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
                dcData[b5] = buffer.slice(offset, offset + dataSize);
                ecData[b5] = rs2.encode(dcData[b5]);
                offset += dataSize;
                maxDataSize = Math.max(maxDataSize, dataSize);
            }
            var data = BufferUtil.alloc(totalCodewords);
            var index = 0;
            var i4, r3;
            for (i4 = 0; i4 < maxDataSize; i4++) {
                for (r3 = 0; r3 < ecTotalBlocks; r3++) {
                    if (i4 < dcData[r3].length) {
                        data[index++] = dcData[r3][i4];
                    }
                }
            }
            for (i4 = 0; i4 < ecCount; i4++) {
                for (r3 = 0; r3 < ecTotalBlocks; r3++) {
                    data[index++] = ecData[r3][i4];
                }
            }
            return data;
        }
        function createSymbol(data, version2, errorCorrectionLevel, maskPattern) {
            var segments;
            if (isArray(data)) {
                segments = Segments.fromArray(data);
            } else if (typeof data === 'string') {
                var estimatedVersion = version2;
                if (!estimatedVersion) {
                    var rawSegments = Segments.rawSplit(data);
                    estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
                }
                segments = Segments.fromString(data, estimatedVersion || 40);
            } else {
                throw new Error('Invalid data');
            }
            var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
            if (!bestVersion) {
                throw new Error('The amount of data is too big to be stored in a QR Code');
            }
            if (!version2) {
                version2 = bestVersion;
            } else if (version2 < bestVersion) {
                throw new Error(
                    '\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: ' +
                        bestVersion +
                        '.\n'
                );
            }
            var dataBits = createData(version2, errorCorrectionLevel, segments);
            var moduleCount = Utils.getSymbolSize(version2);
            var modules = new BitMatrix(moduleCount);
            setupFinderPattern(modules, version2);
            setupTimingPattern(modules);
            setupAlignmentPattern(modules, version2);
            setupFormatInfo(modules, errorCorrectionLevel, 0);
            if (version2 >= 7) {
                setupVersionInfo(modules, version2);
            }
            setupData(modules, dataBits);
            if (isNaN(maskPattern)) {
                maskPattern = MaskPattern.getBestMask(
                    modules,
                    setupFormatInfo.bind(null, modules, errorCorrectionLevel)
                );
            }
            MaskPattern.applyMask(maskPattern, modules);
            setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
            return {
                modules,
                version: version2,
                errorCorrectionLevel,
                maskPattern,
                segments,
            };
        }
        exports.create = function create2(data, options) {
            if (typeof data === 'undefined' || data === '') {
                throw new Error('No input text');
            }
            var errorCorrectionLevel = ECLevel.M;
            var version2;
            var mask;
            if (typeof options !== 'undefined') {
                errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
                version2 = Version.from(options.version);
                mask = MaskPattern.from(options.maskPattern);
                if (options.toSJISFunc) {
                    Utils.setToSJISFunction(options.toSJISFunc);
                }
            }
            return createSymbol(data, version2, errorCorrectionLevel, mask);
        };
    },
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
    'node_modules/qrcode/lib/renderer/utils.js'(exports) {
        function hex2rgba(hex) {
            if (typeof hex === 'number') {
                hex = hex.toString();
            }
            if (typeof hex !== 'string') {
                throw new Error('Color should be defined as hex string');
            }
            var hexCode = hex.slice().replace('#', '').split('');
            if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
                throw new Error('Invalid hex color: ' + hex);
            }
            if (hexCode.length === 3 || hexCode.length === 4) {
                hexCode = Array.prototype.concat.apply(
                    [],
                    hexCode.map(function (c5) {
                        return [c5, c5];
                    })
                );
            }
            if (hexCode.length === 6) hexCode.push('F', 'F');
            var hexValue = parseInt(hexCode.join(''), 16);
            return {
                r: (hexValue >> 24) & 255,
                g: (hexValue >> 16) & 255,
                b: (hexValue >> 8) & 255,
                a: hexValue & 255,
                hex: '#' + hexCode.slice(0, 6).join(''),
            };
        }
        exports.getOptions = function getOptions(options) {
            if (!options) options = {};
            if (!options.color) options.color = {};
            var margin =
                typeof options.margin === 'undefined' || options.margin === null || options.margin < 0
                    ? 4
                    : options.margin;
            var width = options.width && options.width >= 21 ? options.width : void 0;
            var scale = options.scale || 4;
            return {
                width,
                scale: width ? 4 : scale,
                margin,
                color: {
                    dark: hex2rgba(options.color.dark || '#000000ff'),
                    light: hex2rgba(options.color.light || '#ffffffff'),
                },
                type: options.type,
                rendererOpts: options.rendererOpts || {},
            };
        };
        exports.getScale = function getScale(qrSize, opts) {
            return opts.width && opts.width >= qrSize + opts.margin * 2
                ? opts.width / (qrSize + opts.margin * 2)
                : opts.scale;
        };
        exports.getImageWidth = function getImageWidth(qrSize, opts) {
            var scale = exports.getScale(qrSize, opts);
            return Math.floor((qrSize + opts.margin * 2) * scale);
        };
        exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
            var size = qr.modules.size;
            var data = qr.modules.data;
            var scale = exports.getScale(size, opts);
            var symbolSize = Math.floor((size + opts.margin * 2) * scale);
            var scaledMargin = opts.margin * scale;
            var palette = [opts.color.light, opts.color.dark];
            for (var i4 = 0; i4 < symbolSize; i4++) {
                for (var j5 = 0; j5 < symbolSize; j5++) {
                    var posDst = (i4 * symbolSize + j5) * 4;
                    var pxColor = opts.color.light;
                    if (
                        i4 >= scaledMargin &&
                        j5 >= scaledMargin &&
                        i4 < symbolSize - scaledMargin &&
                        j5 < symbolSize - scaledMargin
                    ) {
                        var iSrc = Math.floor((i4 - scaledMargin) / scale);
                        var jSrc = Math.floor((j5 - scaledMargin) / scale);
                        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
                    }
                    imgData[posDst++] = pxColor.r;
                    imgData[posDst++] = pxColor.g;
                    imgData[posDst++] = pxColor.b;
                    imgData[posDst] = pxColor.a;
                }
            }
        };
    },
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
    'node_modules/qrcode/lib/renderer/canvas.js'(exports) {
        var Utils = require_utils2();
        function clearCanvas(ctx, canvas, size) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!canvas.style) canvas.style = {};
            canvas.height = size;
            canvas.width = size;
            canvas.style.height = size + 'px';
            canvas.style.width = size + 'px';
        }
        function getCanvasElement() {
            try {
                return document.createElement('canvas');
            } catch (e3) {
                throw new Error('You need to specify a canvas element');
            }
        }
        exports.render = function render(qrData, canvas, options) {
            var opts = options;
            var canvasEl = canvas;
            if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
                opts = canvas;
                canvas = void 0;
            }
            if (!canvas) {
                canvasEl = getCanvasElement();
            }
            opts = Utils.getOptions(opts);
            var size = Utils.getImageWidth(qrData.modules.size, opts);
            var ctx = canvasEl.getContext('2d');
            var image = ctx.createImageData(size, size);
            Utils.qrToImageData(image.data, qrData, opts);
            clearCanvas(ctx, canvasEl, size);
            ctx.putImageData(image, 0, 0);
            return canvasEl;
        };
        exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
            var opts = options;
            if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
                opts = canvas;
                canvas = void 0;
            }
            if (!opts) opts = {};
            var canvasEl = exports.render(qrData, canvas, opts);
            var type = opts.type || 'image/png';
            var rendererOpts = opts.rendererOpts || {};
            return canvasEl.toDataURL(type, rendererOpts.quality);
        };
    },
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
    'node_modules/qrcode/lib/renderer/svg-tag.js'(exports) {
        var Utils = require_utils2();
        function getColorAttrib(color, attrib) {
            var alpha = color.a / 255;
            var str = attrib + '="' + color.hex + '"';
            return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
        }
        function svgCmd(cmd, x5, y6) {
            var str = cmd + x5;
            if (typeof y6 !== 'undefined') str += ' ' + y6;
            return str;
        }
        function qrToPath(data, size, margin) {
            var path = '';
            var moveBy = 0;
            var newRow = false;
            var lineLength = 0;
            for (var i4 = 0; i4 < data.length; i4++) {
                var col = Math.floor(i4 % size);
                var row = Math.floor(i4 / size);
                if (!col && !newRow) newRow = true;
                if (data[i4]) {
                    lineLength++;
                    if (!(i4 > 0 && col > 0 && data[i4 - 1])) {
                        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                        moveBy = 0;
                        newRow = false;
                    }
                    if (!(col + 1 < size && data[i4 + 1])) {
                        path += svgCmd('h', lineLength);
                        lineLength = 0;
                    }
                } else {
                    moveBy++;
                }
            }
            return path;
        }
        exports.render = function render(qrData, options, cb) {
            var opts = Utils.getOptions(options);
            var size = qrData.modules.size;
            var data = qrData.modules.data;
            var qrcodesize = size + opts.margin * 2;
            var bg = !opts.color.light.a
                ? ''
                : '<path ' +
                  getColorAttrib(opts.color.light, 'fill') +
                  ' d="M0 0h' +
                  qrcodesize +
                  'v' +
                  qrcodesize +
                  'H0z"/>';
            var path =
                '<path ' +
                getColorAttrib(opts.color.dark, 'stroke') +
                ' d="' +
                qrToPath(data, size, opts.margin) +
                '"/>';
            var viewBox = 'viewBox="0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
            var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
            var svgTag =
                '<svg xmlns="http://www.w3.org/2000/svg" ' +
                width +
                viewBox +
                ' shape-rendering="crispEdges">' +
                bg +
                path +
                '</svg>\n';
            if (typeof cb === 'function') {
                cb(null, svgTag);
            }
            return svgTag;
        };
    },
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
    'node_modules/qrcode/lib/browser.js'(exports) {
        var canPromise = require_can_promise();
        var QRCode = require_qrcode();
        var CanvasRenderer = require_canvas();
        var SvgRenderer = require_svg_tag();
        function renderCanvas(renderFunc, canvas, text, opts, cb) {
            var args = [].slice.call(arguments, 1);
            var argsNum = args.length;
            var isLastArgCb = typeof args[argsNum - 1] === 'function';
            if (!isLastArgCb && !canPromise()) {
                throw new Error('Callback required as last argument');
            }
            if (isLastArgCb) {
                if (argsNum < 2) {
                    throw new Error('Too few arguments provided');
                }
                if (argsNum === 2) {
                    cb = text;
                    text = canvas;
                    canvas = opts = void 0;
                } else if (argsNum === 3) {
                    if (canvas.getContext && typeof cb === 'undefined') {
                        cb = opts;
                        opts = void 0;
                    } else {
                        cb = opts;
                        opts = text;
                        text = canvas;
                        canvas = void 0;
                    }
                }
            } else {
                if (argsNum < 1) {
                    throw new Error('Too few arguments provided');
                }
                if (argsNum === 1) {
                    text = canvas;
                    canvas = opts = void 0;
                } else if (argsNum === 2 && !canvas.getContext) {
                    opts = text;
                    text = canvas;
                    canvas = void 0;
                }
                return new Promise(function (resolve, reject) {
                    try {
                        var data2 = QRCode.create(text, opts);
                        resolve(renderFunc(data2, canvas, opts));
                    } catch (e3) {
                        reject(e3);
                    }
                });
            }
            try {
                var data = QRCode.create(text, opts);
                cb(null, renderFunc(data, canvas, opts));
            } catch (e3) {
                cb(e3);
            }
        }
        exports.create = QRCode.create;
        exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
        exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
        exports.toString = renderCanvas.bind(null, function (data, _6, opts) {
            return SvgRenderer.render(data, opts);
        });
    },
});

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
    'node_modules/toggle-selection/index.js'(exports, module) {
        module.exports = function () {
            var selection = document.getSelection();
            if (!selection.rangeCount) {
                return function () {};
            }
            var active = document.activeElement;
            var ranges = [];
            for (var i4 = 0; i4 < selection.rangeCount; i4++) {
                ranges.push(selection.getRangeAt(i4));
            }
            switch (active.tagName.toUpperCase()) {
                case 'INPUT':
                case 'TEXTAREA':
                    active.blur();
                    break;
                default:
                    active = null;
                    break;
            }
            selection.removeAllRanges();
            return function () {
                selection.type === 'Caret' && selection.removeAllRanges();
                if (!selection.rangeCount) {
                    ranges.forEach(function (range) {
                        selection.addRange(range);
                    });
                }
                active && active.focus();
            };
        };
    },
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
    'node_modules/copy-to-clipboard/index.js'(exports, module) {
        'use strict';
        var deselectCurrent = require_toggle_selection();
        var clipboardToIE11Formatting = {
            'text/plain': 'Text',
            'text/html': 'Url',
            default: 'Text',
        };
        var defaultMessage = 'Copy to clipboard: #{key}, Enter';
        function format(message) {
            var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
            return message.replace(/#{\s*key\s*}/g, copyKey);
        }
        function copy(text, options) {
            var debug,
                message,
                reselectPrevious,
                range,
                selection,
                mark,
                success = false;
            if (!options) {
                options = {};
            }
            debug = options.debug || false;
            try {
                reselectPrevious = deselectCurrent();
                range = document.createRange();
                selection = document.getSelection();
                mark = document.createElement('span');
                mark.textContent = text;
                mark.ariaHidden = 'true';
                mark.style.all = 'unset';
                mark.style.position = 'fixed';
                mark.style.top = 0;
                mark.style.clip = 'rect(0, 0, 0, 0)';
                mark.style.whiteSpace = 'pre';
                mark.style.webkitUserSelect = 'text';
                mark.style.MozUserSelect = 'text';
                mark.style.msUserSelect = 'text';
                mark.style.userSelect = 'text';
                mark.addEventListener('copy', function (e3) {
                    e3.stopPropagation();
                    if (options.format) {
                        e3.preventDefault();
                        if (typeof e3.clipboardData === 'undefined') {
                            debug && console.warn('unable to use e.clipboardData');
                            debug && console.warn('trying IE specific stuff');
                            window.clipboardData.clearData();
                            var format2 =
                                clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting['default'];
                            window.clipboardData.setData(format2, text);
                        } else {
                            e3.clipboardData.clearData();
                            e3.clipboardData.setData(options.format, text);
                        }
                    }
                    if (options.onCopy) {
                        e3.preventDefault();
                        options.onCopy(e3.clipboardData);
                    }
                });
                document.body.appendChild(mark);
                range.selectNodeContents(mark);
                selection.addRange(range);
                var successful = document.execCommand('copy');
                if (!successful) {
                    throw new Error('copy command was unsuccessful');
                }
                success = true;
            } catch (err) {
                debug && console.error('unable to copy using execCommand: ', err);
                debug && console.warn('trying IE specific stuff');
                try {
                    window.clipboardData.setData(options.format || 'text', text);
                    options.onCopy && options.onCopy(window.clipboardData);
                    success = true;
                } catch (err2) {
                    debug && console.error('unable to copy using clipboardData: ', err2);
                    debug && console.error('falling back to prompt');
                    message = format('message' in options ? options.message : defaultMessage);
                    window.prompt(message, text);
                }
            } finally {
                if (selection) {
                    if (typeof selection.removeRange == 'function') {
                        selection.removeRange(range);
                    } else {
                        selection.removeAllRanges();
                    }
                }
                if (mark) {
                    document.body.removeChild(mark);
                }
                reselectPrevious();
            }
            return success;
        }
        module.exports = copy;
    },
});

// node_modules/preact/dist/preact.module.js
function a(n3, l4) {
    for (var u5 in l4) n3[u5] = l4[u5];
    return n3;
}
function v(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
}
function h(n3, l4, u5) {
    var i4,
        t3 = arguments,
        r3 = {};
    for (i4 in l4) 'key' !== i4 && 'ref' !== i4 && (r3[i4] = l4[i4]);
    if (arguments.length > 3) for (u5 = [u5], i4 = 3; i4 < arguments.length; i4++) u5.push(t3[i4]);
    if ((null != u5 && (r3.children = u5), 'function' == typeof n3 && null != n3.defaultProps))
        for (i4 in n3.defaultProps) void 0 === r3[i4] && (r3[i4] = n3.defaultProps[i4]);
    return p(n3, r3, l4 && l4.key, l4 && l4.ref, null);
}
function p(l4, u5, i4, t3, r3) {
    var o3 = {
        type: l4,
        props: u5,
        key: i4,
        ref: t3,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: r3,
    };
    return null == r3 && (o3.__v = o3), n.vnode && n.vnode(o3), o3;
}
function y() {
    return {};
}
function d(n3) {
    return n3.children;
}
function m(n3, l4) {
    (this.props = n3), (this.context = l4);
}
function w(n3, l4) {
    if (null == l4) return n3.__ ? w(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u5; l4 < n3.__k.length; l4++) if (null != (u5 = n3.__k[l4]) && null != u5.__e) return u5.__e;
    return 'function' == typeof n3.type ? w(n3) : null;
}
function k(n3) {
    var l4, u5;
    if (null != (n3 = n3.__) && null != n3.__c) {
        for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
            if (null != (u5 = n3.__k[l4]) && null != u5.__e) {
                n3.__e = n3.__c.base = u5.__e;
                break;
            }
        return k(n3);
    }
}
function g(l4) {
    ((!l4.__d && (l4.__d = true) && u.push(l4) && !i++) || r !== n.debounceRendering) &&
        ((r = n.debounceRendering) || t)(_);
}
function _() {
    for (var n3; (i = u.length); )
        (n3 = u.sort(function (n4, l4) {
            return n4.__v.__b - l4.__v.__b;
        })),
            (u = []),
            n3.some(function (n4) {
                var l4, u5, i4, t3, r3, o3, f4;
                n4.__d &&
                    ((o3 = (r3 = (l4 = n4).__v).__e),
                    (f4 = l4.__P) &&
                        ((u5 = []),
                        ((i4 = a({}, r3)).__v = i4),
                        (t3 = A(f4, r3, i4, l4.__n, void 0 !== f4.ownerSVGElement, null, u5, null == o3 ? w(r3) : o3)),
                        T(u5, r3),
                        t3 != o3 && k(r3)));
            });
}
function b(n3, l4, u5, i4, t3, r3, o3, f4, s3) {
    var a5,
        h6,
        p5,
        y6,
        d4,
        m4,
        k5,
        g7 = (u5 && u5.__k) || c,
        _6 = g7.length;
    if (
        (f4 == e && (f4 = null != r3 ? r3[0] : _6 ? w(u5, 0) : null),
        (a5 = 0),
        (l4.__k = x(l4.__k, function (u6) {
            if (null != u6) {
                if (
                    ((u6.__ = l4),
                    (u6.__b = l4.__b + 1),
                    null === (p5 = g7[a5]) || (p5 && u6.key == p5.key && u6.type === p5.type))
                )
                    g7[a5] = void 0;
                else
                    for (h6 = 0; h6 < _6; h6++) {
                        if ((p5 = g7[h6]) && u6.key == p5.key && u6.type === p5.type) {
                            g7[h6] = void 0;
                            break;
                        }
                        p5 = null;
                    }
                if (
                    ((y6 = A(n3, u6, (p5 = p5 || e), i4, t3, r3, o3, f4, s3)),
                    (h6 = u6.ref) &&
                        p5.ref != h6 &&
                        (k5 || (k5 = []), p5.ref && k5.push(p5.ref, null, u6), k5.push(h6, u6.__c || y6, u6)),
                    null != y6)
                ) {
                    var c5;
                    if ((null == m4 && (m4 = y6), void 0 !== u6.__d)) (c5 = u6.__d), (u6.__d = void 0);
                    else if (r3 == p5 || y6 != f4 || null == y6.parentNode) {
                        n: if (null == f4 || f4.parentNode !== n3) n3.appendChild(y6), (c5 = null);
                        else {
                            for (d4 = f4, h6 = 0; (d4 = d4.nextSibling) && h6 < _6; h6 += 2) if (d4 == y6) break n;
                            n3.insertBefore(y6, f4), (c5 = f4);
                        }
                        'option' == l4.type && (n3.value = '');
                    }
                    (f4 = void 0 !== c5 ? c5 : y6.nextSibling), 'function' == typeof l4.type && (l4.__d = f4);
                } else f4 && p5.__e == f4 && f4.parentNode != n3 && (f4 = w(p5));
            }
            return a5++, u6;
        })),
        (l4.__e = m4),
        null != r3 && 'function' != typeof l4.type)
    )
        for (a5 = r3.length; a5--; ) null != r3[a5] && v(r3[a5]);
    for (a5 = _6; a5--; ) null != g7[a5] && D(g7[a5], g7[a5]);
    if (k5) for (a5 = 0; a5 < k5.length; a5++) j(k5[a5], k5[++a5], k5[++a5]);
}
function x(n3, l4, u5) {
    if ((null == u5 && (u5 = []), null == n3 || 'boolean' == typeof n3)) l4 && u5.push(l4(null));
    else if (Array.isArray(n3)) for (var i4 = 0; i4 < n3.length; i4++) x(n3[i4], l4, u5);
    else
        u5.push(
            l4
                ? l4(
                      'string' == typeof n3 || 'number' == typeof n3
                          ? p(null, n3, null, null, n3)
                          : null != n3.__e || null != n3.__c
                            ? p(n3.type, n3.props, n3.key, null, n3.__v)
                            : n3
                  )
                : n3
        );
    return u5;
}
function P(n3, l4, u5, i4, t3) {
    var r3;
    for (r3 in u5) 'children' === r3 || 'key' === r3 || r3 in l4 || N(n3, r3, null, u5[r3], i4);
    for (r3 in l4)
        (t3 && 'function' != typeof l4[r3]) ||
            'children' === r3 ||
            'key' === r3 ||
            'value' === r3 ||
            'checked' === r3 ||
            u5[r3] === l4[r3] ||
            N(n3, r3, l4[r3], u5[r3], i4);
}
function C(n3, l4, u5) {
    '-' === l4[0]
        ? n3.setProperty(l4, u5)
        : (n3[l4] = 'number' == typeof u5 && false === s.test(l4) ? u5 + 'px' : null == u5 ? '' : u5);
}
function N(n3, l4, u5, i4, t3) {
    var r3, o3, f4, e3, c5;
    if ((t3 ? 'className' === l4 && (l4 = 'class') : 'class' === l4 && (l4 = 'className'), 'style' === l4))
        if (((r3 = n3.style), 'string' == typeof u5)) r3.cssText = u5;
        else {
            if (('string' == typeof i4 && ((r3.cssText = ''), (i4 = null)), i4))
                for (e3 in i4) (u5 && e3 in u5) || C(r3, e3, '');
            if (u5) for (c5 in u5) (i4 && u5[c5] === i4[c5]) || C(r3, c5, u5[c5]);
        }
    else
        'o' === l4[0] && 'n' === l4[1]
            ? ((o3 = l4 !== (l4 = l4.replace(/Capture$/, ''))),
              (f4 = l4.toLowerCase()),
              (l4 = (f4 in n3 ? f4 : l4).slice(2)),
              u5
                  ? (i4 || n3.addEventListener(l4, z, o3), ((n3.l || (n3.l = {}))[l4] = u5))
                  : n3.removeEventListener(l4, z, o3))
            : 'list' !== l4 && 'tagName' !== l4 && 'form' !== l4 && 'type' !== l4 && 'size' !== l4 && !t3 && l4 in n3
              ? (n3[l4] = null == u5 ? '' : u5)
              : 'function' != typeof u5 &&
                'dangerouslySetInnerHTML' !== l4 &&
                (l4 !== (l4 = l4.replace(/^xlink:?/, ''))
                    ? null == u5 || false === u5
                        ? n3.removeAttributeNS('http://www.w3.org/1999/xlink', l4.toLowerCase())
                        : n3.setAttributeNS('http://www.w3.org/1999/xlink', l4.toLowerCase(), u5)
                    : null == u5 || (false === u5 && !/^ar/.test(l4))
                      ? n3.removeAttribute(l4)
                      : n3.setAttribute(l4, u5));
}
function z(l4) {
    this.l[l4.type](n.event ? n.event(l4) : l4);
}
function A(l4, u5, i4, t3, r3, o3, f4, e3, c5) {
    var s3,
        v5,
        h6,
        p5,
        y6,
        w8,
        k5,
        g7,
        _6,
        x5,
        P4 = u5.type;
    if (void 0 !== u5.constructor) return null;
    (s3 = n.__b) && s3(u5);
    try {
        n: if ('function' == typeof P4) {
            if (
                ((g7 = u5.props),
                (_6 = (s3 = P4.contextType) && t3[s3.__c]),
                (x5 = s3 ? (_6 ? _6.props.value : s3.__) : t3),
                i4.__c
                    ? (k5 = (v5 = u5.__c = i4.__c).__ = v5.__E)
                    : ('prototype' in P4 && P4.prototype.render
                          ? (u5.__c = v5 = new P4(g7, x5))
                          : ((u5.__c = v5 = new m(g7, x5)), (v5.constructor = P4), (v5.render = E)),
                      _6 && _6.sub(v5),
                      (v5.props = g7),
                      v5.state || (v5.state = {}),
                      (v5.context = x5),
                      (v5.__n = t3),
                      (h6 = v5.__d = true),
                      (v5.__h = [])),
                null == v5.__s && (v5.__s = v5.state),
                null != P4.getDerivedStateFromProps &&
                    (v5.__s == v5.state && (v5.__s = a({}, v5.__s)),
                    a(v5.__s, P4.getDerivedStateFromProps(g7, v5.__s))),
                (p5 = v5.props),
                (y6 = v5.state),
                h6)
            )
                null == P4.getDerivedStateFromProps && null != v5.componentWillMount && v5.componentWillMount(),
                    null != v5.componentDidMount && v5.__h.push(v5.componentDidMount);
            else {
                if (
                    (null == P4.getDerivedStateFromProps &&
                        g7 !== p5 &&
                        null != v5.componentWillReceiveProps &&
                        v5.componentWillReceiveProps(g7, x5),
                    (!v5.__e &&
                        null != v5.shouldComponentUpdate &&
                        false === v5.shouldComponentUpdate(g7, v5.__s, x5)) ||
                        (u5.__v === i4.__v && !v5.__))
                ) {
                    for (
                        v5.props = g7,
                            v5.state = v5.__s,
                            u5.__v !== i4.__v && (v5.__d = false),
                            v5.__v = u5,
                            u5.__e = i4.__e,
                            u5.__k = i4.__k,
                            v5.__h.length && f4.push(v5),
                            s3 = 0;
                        s3 < u5.__k.length;
                        s3++
                    )
                        u5.__k[s3] && (u5.__k[s3].__ = u5);
                    break n;
                }
                null != v5.componentWillUpdate && v5.componentWillUpdate(g7, v5.__s, x5),
                    null != v5.componentDidUpdate &&
                        v5.__h.push(function () {
                            v5.componentDidUpdate(p5, y6, w8);
                        });
            }
            (v5.context = x5),
                (v5.props = g7),
                (v5.state = v5.__s),
                (s3 = n.__r) && s3(u5),
                (v5.__d = false),
                (v5.__v = u5),
                (v5.__P = l4),
                (s3 = v5.render(v5.props, v5.state, v5.context)),
                (u5.__k =
                    null != s3 && s3.type == d && null == s3.key ? s3.props.children : Array.isArray(s3) ? s3 : [s3]),
                null != v5.getChildContext && (t3 = a(a({}, t3), v5.getChildContext())),
                h6 || null == v5.getSnapshotBeforeUpdate || (w8 = v5.getSnapshotBeforeUpdate(p5, y6)),
                b(l4, u5, i4, t3, r3, o3, f4, e3, c5),
                (v5.base = u5.__e),
                v5.__h.length && f4.push(v5),
                k5 && (v5.__E = v5.__ = null),
                (v5.__e = false);
        } else
            null == o3 && u5.__v === i4.__v
                ? ((u5.__k = i4.__k), (u5.__e = i4.__e))
                : (u5.__e = $(i4.__e, u5, i4, t3, r3, o3, f4, c5));
        (s3 = n.diffed) && s3(u5);
    } catch (l5) {
        (u5.__v = null), n.__e(l5, u5, i4);
    }
    return u5.__e;
}
function T(l4, u5) {
    n.__c && n.__c(u5, l4),
        l4.some(function (u6) {
            try {
                (l4 = u6.__h),
                    (u6.__h = []),
                    l4.some(function (n3) {
                        n3.call(u6);
                    });
            } catch (l5) {
                n.__e(l5, u6.__v);
            }
        });
}
function $(n3, l4, u5, i4, t3, r3, o3, f4) {
    var s3,
        a5,
        v5,
        h6,
        p5,
        y6 = u5.props,
        d4 = l4.props;
    if (((t3 = 'svg' === l4.type || t3), null != r3)) {
        for (s3 = 0; s3 < r3.length; s3++)
            if (
                null != (a5 = r3[s3]) &&
                ((null === l4.type ? 3 === a5.nodeType : a5.localName === l4.type) || n3 == a5)
            ) {
                (n3 = a5), (r3[s3] = null);
                break;
            }
    }
    if (null == n3) {
        if (null === l4.type) return document.createTextNode(d4);
        (n3 = t3
            ? document.createElementNS('http://www.w3.org/2000/svg', l4.type)
            : document.createElement(l4.type, d4.is && { is: d4.is })),
            (r3 = null),
            (f4 = false);
    }
    if (null === l4.type) y6 !== d4 && n3.data != d4 && (n3.data = d4);
    else {
        if (
            (null != r3 && (r3 = c.slice.call(n3.childNodes)),
            (v5 = (y6 = u5.props || e).dangerouslySetInnerHTML),
            (h6 = d4.dangerouslySetInnerHTML),
            !f4)
        ) {
            if (y6 === e)
                for (y6 = {}, p5 = 0; p5 < n3.attributes.length; p5++)
                    y6[n3.attributes[p5].name] = n3.attributes[p5].value;
            (h6 || v5) && ((h6 && v5 && h6.__html == v5.__html) || (n3.innerHTML = (h6 && h6.__html) || ''));
        }
        P(n3, d4, y6, t3, f4),
            h6
                ? (l4.__k = [])
                : ((l4.__k = l4.props.children), b(n3, l4, u5, i4, 'foreignObject' !== l4.type && t3, r3, o3, e, f4)),
            f4 ||
                ('value' in d4 && void 0 !== (s3 = d4.value) && s3 !== n3.value && N(n3, 'value', s3, y6.value, false),
                'checked' in d4 &&
                    void 0 !== (s3 = d4.checked) &&
                    s3 !== n3.checked &&
                    N(n3, 'checked', s3, y6.checked, false));
    }
    return n3;
}
function j(l4, u5, i4) {
    try {
        'function' == typeof l4 ? l4(u5) : (l4.current = u5);
    } catch (l5) {
        n.__e(l5, i4);
    }
}
function D(l4, u5, i4) {
    var t3, r3, o3;
    if (
        (n.unmount && n.unmount(l4),
        (t3 = l4.ref) && ((t3.current && t3.current !== l4.__e) || j(t3, null, u5)),
        i4 || 'function' == typeof l4.type || (i4 = null != (r3 = l4.__e)),
        (l4.__e = l4.__d = void 0),
        null != (t3 = l4.__c))
    ) {
        if (t3.componentWillUnmount)
            try {
                t3.componentWillUnmount();
            } catch (l5) {
                n.__e(l5, u5);
            }
        t3.base = t3.__P = null;
    }
    if ((t3 = l4.__k)) for (o3 = 0; o3 < t3.length; o3++) t3[o3] && D(t3[o3], u5, i4);
    null != r3 && v(r3);
}
function E(n3, l4, u5) {
    return this.constructor(n3, u5);
}
function H(l4, u5, i4) {
    var t3, r3, f4;
    n.__ && n.__(l4, u5),
        (r3 = (t3 = i4 === o) ? null : (i4 && i4.__k) || u5.__k),
        (l4 = h(d, null, [l4])),
        (f4 = []),
        A(
            u5,
            ((t3 ? u5 : i4 || u5).__k = l4),
            r3 || e,
            e,
            void 0 !== u5.ownerSVGElement,
            i4 && !t3 ? [i4] : r3 ? null : c.slice.call(u5.childNodes),
            f4,
            i4 || e,
            t3
        ),
        T(f4, l4);
}
function I(n3, l4) {
    H(n3, l4, o);
}
function L(n3, l4) {
    var u5, i4;
    for (i4 in ((l4 = a(a({}, n3.props), l4)),
    arguments.length > 2 && (l4.children = c.slice.call(arguments, 2)),
    (u5 = {}),
    l4))
        'key' !== i4 && 'ref' !== i4 && (u5[i4] = l4[i4]);
    return p(n3.type, u5, l4.key || n3.key, l4.ref || n3.ref, null);
}
function M(n3) {
    var l4 = {},
        u5 = {
            __c: '__cC' + f++,
            __: n3,
            Consumer: function (n4, l5) {
                return n4.children(l5);
            },
            Provider: function (n4) {
                var i4,
                    t3 = this;
                return (
                    this.getChildContext ||
                        ((i4 = []),
                        (this.getChildContext = function () {
                            return (l4[u5.__c] = t3), l4;
                        }),
                        (this.shouldComponentUpdate = function (n5) {
                            t3.props.value !== n5.value &&
                                i4.some(function (l5) {
                                    (l5.context = n5.value), g(l5);
                                });
                        }),
                        (this.sub = function (n5) {
                            i4.push(n5);
                            var l5 = n5.componentWillUnmount;
                            n5.componentWillUnmount = function () {
                                i4.splice(i4.indexOf(n5), 1), l5 && l5.call(n5);
                            };
                        })),
                    n4.children
                );
            },
        };
    return (u5.Consumer.contextType = u5), (u5.Provider.__ = u5), u5;
}
var n, l, u, i, t, r, o, f, e, c, s;
var init_preact_module = __esm({
    'node_modules/preact/dist/preact.module.js'() {
        e = {};
        c = [];
        s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
        (n = {
            __e: function (n3, l4) {
                for (var u5, i4; (l4 = l4.__); )
                    if ((u5 = l4.__c) && !u5.__)
                        try {
                            if (
                                (u5.constructor &&
                                    null != u5.constructor.getDerivedStateFromError &&
                                    ((i4 = true), u5.setState(u5.constructor.getDerivedStateFromError(n3))),
                                null != u5.componentDidCatch && ((i4 = true), u5.componentDidCatch(n3)),
                                i4)
                            )
                                return g((u5.__E = u5));
                        } catch (l5) {
                            n3 = l5;
                        }
                throw n3;
            },
        }),
            (l = function (n3) {
                return null != n3 && void 0 === n3.constructor;
            }),
            (m.prototype.setState = function (n3, l4) {
                var u5;
                (u5 = this.__s !== this.state ? this.__s : (this.__s = a({}, this.state))),
                    'function' == typeof n3 && (n3 = n3(u5, this.props)),
                    n3 && a(u5, n3),
                    null != n3 && this.__v && (l4 && this.__h.push(l4), g(this));
            }),
            (m.prototype.forceUpdate = function (n3) {
                this.__v && ((this.__e = true), n3 && this.__h.push(n3), g(this));
            }),
            (m.prototype.render = d),
            (u = []),
            (i = 0),
            (t = 'function' == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
            (o = e),
            (f = 0);
    },
});

// node_modules/preact/hooks/dist/hooks.module.js
function v2(t3, r3) {
    n.__h && n.__h(u2, t3, i2 || r3), (i2 = 0);
    var o3 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t3 >= o3.__.length && o3.__.push({}), o3.__[t3];
}
function m2(n3) {
    return (i2 = 1), p2(E2, n3);
}
function p2(n3, r3, i4) {
    var o3 = v2(t2++, 2);
    return (
        o3.__c ||
            ((o3.__c = u2),
            (o3.__ = [
                i4 ? i4(r3) : E2(void 0, r3),
                function (t3) {
                    var u5 = n3(o3.__[0], t3);
                    o3.__[0] !== u5 && ((o3.__[0] = u5), o3.__c.setState({}));
                },
            ])),
        o3.__
    );
}
function l2(r3, i4) {
    var o3 = v2(t2++, 3);
    !n.__s && x2(o3.__H, i4) && ((o3.__ = r3), (o3.__H = i4), u2.__H.__h.push(o3));
}
function y2(r3, i4) {
    var o3 = v2(t2++, 4);
    !n.__s && x2(o3.__H, i4) && ((o3.__ = r3), (o3.__H = i4), u2.__h.push(o3));
}
function d2(n3) {
    return (
        (i2 = 5),
        h2(function () {
            return { current: n3 };
        }, [])
    );
}
function s2(n3, t3, u5) {
    (i2 = 6),
        y2(
            function () {
                'function' == typeof n3 ? n3(t3()) : n3 && (n3.current = t3());
            },
            null == u5 ? u5 : u5.concat(n3)
        );
}
function h2(n3, u5) {
    var r3 = v2(t2++, 7);
    return x2(r3.__H, u5) ? ((r3.__H = u5), (r3.__h = n3), (r3.__ = n3())) : r3.__;
}
function T2(n3, t3) {
    return (
        (i2 = 8),
        h2(function () {
            return n3;
        }, t3)
    );
}
function w2(n3) {
    var r3 = u2.context[n3.__c],
        i4 = v2(t2++, 9);
    return (i4.__c = n3), r3 ? (null == i4.__ && ((i4.__ = true), r3.sub(u2)), r3.props.value) : n3.__;
}
function A2(t3, u5) {
    n.useDebugValue && n.useDebugValue(u5 ? u5(t3) : t3);
}
function F(n3) {
    var r3 = v2(t2++, 10),
        i4 = m2();
    return (
        (r3.__ = n3),
        u2.componentDidCatch ||
            (u2.componentDidCatch = function (n4) {
                r3.__ && r3.__(n4), i4[1](n4);
            }),
        [
            i4[0],
            function () {
                i4[1](void 0);
            },
        ]
    );
}
function _2() {
    o2.some(function (t3) {
        if (t3.__P)
            try {
                t3.__H.__h.forEach(g2), t3.__H.__h.forEach(q), (t3.__H.__h = []);
            } catch (u5) {
                return (t3.__H.__h = []), n.__e(u5, t3.__v), true;
            }
    }),
        (o2 = []);
}
function g2(n3) {
    n3.t && n3.t();
}
function q(n3) {
    var t3 = n3.__();
    'function' == typeof t3 && (n3.t = t3);
}
function x2(n3, t3) {
    return (
        !n3 ||
        t3.some(function (t4, u5) {
            return t4 !== n3[u5];
        })
    );
}
function E2(n3, t3) {
    return 'function' == typeof t3 ? t3(n3) : t3;
}
var t2, u2, r2, i2, o2, c2, f2, e2, a2;
var init_hooks_module = __esm({
    'node_modules/preact/hooks/dist/hooks.module.js'() {
        init_preact_module();
        i2 = 0;
        o2 = [];
        c2 = n.__r;
        f2 = n.diffed;
        e2 = n.__c;
        a2 = n.unmount;
        (n.__r = function (n3) {
            c2 && c2(n3),
                (t2 = 0),
                (u2 = n3.__c).__H && (u2.__H.__h.forEach(g2), u2.__H.__h.forEach(q), (u2.__H.__h = []));
        }),
            (n.diffed = function (t3) {
                f2 && f2(t3);
                var u5 = t3.__c;
                if (u5) {
                    var i4 = u5.__H;
                    i4 &&
                        i4.__h.length &&
                        ((1 !== o2.push(u5) && r2 === n.requestAnimationFrame) ||
                            (
                                (r2 = n.requestAnimationFrame) ||
                                function (n3) {
                                    var t4,
                                        u6 = function () {
                                            clearTimeout(r3), cancelAnimationFrame(t4), setTimeout(n3);
                                        },
                                        r3 = setTimeout(u6, 100);
                                    'undefined' != typeof window && (t4 = requestAnimationFrame(u6));
                                }
                            )(_2));
                }
            }),
            (n.__c = function (t3, u5) {
                u5.some(function (t4) {
                    try {
                        t4.__h.forEach(g2),
                            (t4.__h = t4.__h.filter(function (n3) {
                                return !n3.__ || q(n3);
                            }));
                    } catch (r3) {
                        u5.some(function (n3) {
                            n3.__h && (n3.__h = []);
                        }),
                            (u5 = []),
                            n.__e(r3, t4.__v);
                    }
                }),
                    e2 && e2(t3, u5);
            }),
            (n.unmount = function (t3) {
                a2 && a2(t3);
                var u5 = t3.__c;
                if (u5) {
                    var r3 = u5.__H;
                    if (r3)
                        try {
                            r3.__.forEach(function (n3) {
                                return n3.t && n3.t();
                            });
                        } catch (t4) {
                            n.__e(t4, u5.__v);
                        }
                }
            });
    },
});

// node_modules/preact/compat/dist/compat.module.js
var compat_module_exports = {};
__export(compat_module_exports, {
    Children: () => R,
    Component: () => m,
    Fragment: () => d,
    PureComponent: () => C2,
    Suspense: () => U,
    SuspenseList: () => O,
    cloneElement: () => K,
    createContext: () => M,
    createElement: () => h,
    createFactory: () => G,
    createPortal: () => z2,
    createRef: () => y,
    default: () => compat_module_default,
    findDOMNode: () => X,
    forwardRef: () => S,
    hydrate: () => V,
    isValidElement: () => J,
    lazy: () => L2,
    memo: () => _3,
    render: () => T3,
    unmountComponentAtNode: () => Q,
    unstable_batchedUpdates: () => Y,
    useCallback: () => T2,
    useContext: () => w2,
    useDebugValue: () => A2,
    useEffect: () => l2,
    useErrorBoundary: () => F,
    useImperativeHandle: () => s2,
    useLayoutEffect: () => y2,
    useMemo: () => h2,
    useReducer: () => p2,
    useRef: () => d2,
    useState: () => m2,
    version: () => B,
});
function E3(n3, t3) {
    for (var e3 in t3) n3[e3] = t3[e3];
    return n3;
}
function w3(n3, t3) {
    for (var e3 in n3) if ('__source' !== e3 && !(e3 in t3)) return true;
    for (var r3 in t3) if ('__source' !== r3 && n3[r3] !== t3[r3]) return true;
    return false;
}
function _3(n3, t3) {
    function e3(n4) {
        var e4 = this.props.ref,
            r4 = e4 == n4.ref;
        return (
            !r4 && e4 && (e4.call ? e4(null) : (e4.current = null)),
            t3 ? !t3(this.props, n4) || !r4 : w3(this.props, n4)
        );
    }
    function r3(t4) {
        return (this.shouldComponentUpdate = e3), h(n3, E3({}, t4));
    }
    return (
        (r3.prototype.isReactComponent = true),
        (r3.displayName = 'Memo(' + (n3.displayName || n3.name) + ')'),
        (r3.t = true),
        r3
    );
}
function S(n3) {
    function t3(t4) {
        var e3 = E3({}, t4);
        return delete e3.ref, n3(e3, t4.ref);
    }
    return (
        (t3.prototype.isReactComponent = t3.t = true),
        (t3.displayName = 'ForwardRef(' + (n3.displayName || n3.name) + ')'),
        t3
    );
}
function N2(n3) {
    return n3 && (((n3 = E3({}, n3)).__c = null), (n3.__k = n3.__k && n3.__k.map(N2))), n3;
}
function U() {
    (this.__u = 0), (this.o = null), (this.__b = null);
}
function M2(n3) {
    var t3 = n3.__.__c;
    return t3 && t3.u && t3.u(n3);
}
function L2(n3) {
    var t3, e3, r3;
    function o3(o4) {
        if (
            (t3 ||
                (t3 = n3()).then(
                    function (n4) {
                        e3 = n4.default || n4;
                    },
                    function (n4) {
                        r3 = n4;
                    }
                ),
            r3)
        )
            throw r3;
        if (!e3) throw t3;
        return h(e3, o4);
    }
    return (o3.displayName = 'Lazy'), (o3.t = true), o3;
}
function O() {
    (this.i = null), (this.l = null);
}
function j2(n3) {
    var t3 = this,
        e3 = n3.container,
        r3 = h(W, { context: t3.context }, n3.vnode);
    return (
        t3.s && t3.s !== e3 && (t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h), (t3.p = false)),
        n3.vnode
            ? t3.p
                ? ((e3.__k = t3.__k), H(r3, e3), (t3.__k = e3.__k))
                : ((t3.v = document.createTextNode('')),
                  I('', e3),
                  e3.appendChild(t3.v),
                  (t3.p = true),
                  (t3.s = e3),
                  H(r3, e3, t3.v),
                  (t3.__k = t3.v.__k))
            : t3.p && (t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h)),
        (t3.h = r3),
        (t3.componentWillUnmount = function () {
            t3.v.parentNode && t3.s.removeChild(t3.v), D(t3.h);
        }),
        null
    );
}
function z2(n3, t3) {
    return h(j2, { vnode: n3, container: t3 });
}
function T3(n3, t3, e3) {
    if (null == t3.__k) for (; t3.firstChild; ) t3.removeChild(t3.firstChild);
    return H(n3, t3), 'function' == typeof e3 && e3(), n3 ? n3.__c : null;
}
function V(n3, t3, e3) {
    return I(n3, t3), 'function' == typeof e3 && e3(), n3 ? n3.__c : null;
}
function I2(n3, t3) {
    n3['UNSAFE_' + t3] &&
        !n3[t3] &&
        Object.defineProperty(n3, t3, {
            configurable: false,
            get: function () {
                return this['UNSAFE_' + t3];
            },
            set: function (n4) {
                this['UNSAFE_' + t3] = n4;
            },
        });
}
function G(n3) {
    return h.bind(null, n3);
}
function J(n3) {
    return !!n3 && n3.$$typeof === H2;
}
function K(n3) {
    return J(n3) ? L.apply(null, arguments) : n3;
}
function Q(n3) {
    return !!n3.__k && (H(null, n3), true);
}
function X(n3) {
    return (n3 && (n3.base || (1 === n3.nodeType && n3))) || null;
}
var C2, A3, k2, R, F2, P2, W, D2, H2, Z, $2, q2, B, Y, compat_module_default;
var init_compat_module = __esm({
    'node_modules/preact/compat/dist/compat.module.js'() {
        init_hooks_module();
        init_hooks_module();
        init_preact_module();
        init_preact_module();
        C2 = (function (n3) {
            var t3, e3;
            function r3(t4) {
                var e4;
                return ((e4 = n3.call(this, t4) || this).isPureReactComponent = true), e4;
            }
            return (
                (e3 = n3),
                ((t3 = r3).prototype = Object.create(e3.prototype)),
                (t3.prototype.constructor = t3),
                (t3.__proto__ = e3),
                (r3.prototype.shouldComponentUpdate = function (n4, t4) {
                    return w3(this.props, n4) || w3(this.state, t4);
                }),
                r3
            );
        })(m);
        A3 = n.__b;
        n.__b = function (n3) {
            n3.type && n3.type.t && n3.ref && ((n3.props.ref = n3.ref), (n3.ref = null)), A3 && A3(n3);
        };
        k2 = function (n3, t3) {
            return n3
                ? x(n3).reduce(function (n4, e3, r3) {
                      return n4.concat(t3(e3, r3));
                  }, [])
                : null;
        };
        R = {
            map: k2,
            forEach: k2,
            count: function (n3) {
                return n3 ? x(n3).length : 0;
            },
            only: function (n3) {
                if (1 !== (n3 = x(n3)).length) throw new Error('Children.only() expects only one child.');
                return n3[0];
            },
            toArray: x,
        };
        F2 = n.__e;
        (n.__e = function (n3, t3, e3) {
            if (n3.then) {
                for (var r3, o3 = t3; (o3 = o3.__); ) if ((r3 = o3.__c) && r3.__c) return r3.__c(n3, t3.__c);
            }
            F2(n3, t3, e3);
        }),
            ((U.prototype = new m()).__c = function (n3, t3) {
                var e3 = this;
                null == e3.o && (e3.o = []), e3.o.push(t3);
                var r3 = M2(e3.__v),
                    o3 = false,
                    u5 = function () {
                        o3 || ((o3 = true), r3 ? r3(i4) : i4());
                    };
                (t3.__c = t3.componentWillUnmount),
                    (t3.componentWillUnmount = function () {
                        u5(), t3.__c && t3.__c();
                    });
                var i4 = function () {
                    var n4;
                    if (!--e3.__u)
                        for (e3.__v.__k[0] = e3.state.u, e3.setState({ u: (e3.__b = null) }); (n4 = e3.o.pop()); )
                            n4.forceUpdate();
                };
                e3.__u++ || e3.setState({ u: (e3.__b = e3.__v.__k[0]) }), n3.then(u5, u5);
            }),
            (U.prototype.render = function (n3, t3) {
                return (
                    this.__b && ((this.__v.__k[0] = N2(this.__b)), (this.__b = null)),
                    [h(m, null, t3.u ? null : n3.children), t3.u && n3.fallback]
                );
            });
        P2 = function (n3, t3, e3) {
            if (
                (++e3[1] === e3[0] && n3.l.delete(t3),
                n3.props.revealOrder && ('t' !== n3.props.revealOrder[0] || !n3.l.size))
            )
                for (e3 = n3.i; e3; ) {
                    for (; e3.length > 3; ) e3.pop()();
                    if (e3[1] < e3[0]) break;
                    n3.i = e3 = e3[2];
                }
        };
        ((O.prototype = new m()).u = function (n3) {
            var t3 = this,
                e3 = M2(t3.__v),
                r3 = t3.l.get(n3);
            return (
                r3[0]++,
                function (o3) {
                    var u5 = function () {
                        t3.props.revealOrder ? (r3.push(o3), P2(t3, n3, r3)) : o3();
                    };
                    e3 ? e3(u5) : u5();
                }
            );
        }),
            (O.prototype.render = function (n3) {
                (this.i = null), (this.l = /* @__PURE__ */ new Map());
                var t3 = x(n3.children);
                n3.revealOrder && 'b' === n3.revealOrder[0] && t3.reverse();
                for (var e3 = t3.length; e3--; ) this.l.set(t3[e3], (this.i = [1, 0, this.i]));
                return n3.children;
            }),
            (O.prototype.componentDidUpdate = O.prototype.componentDidMount =
                function () {
                    var n3 = this;
                    n3.l.forEach(function (t3, e3) {
                        P2(n3, e3, t3);
                    });
                });
        W = (function () {
            function n3() {}
            var t3 = n3.prototype;
            return (
                (t3.getChildContext = function () {
                    return this.props.context;
                }),
                (t3.render = function (n4) {
                    return n4.children;
                }),
                n3
            );
        })();
        D2 =
            /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
        m.prototype.isReactComponent = {};
        H2 = ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103;
        Z = n.event;
        n.event = function (n3) {
            Z && (n3 = Z(n3)), (n3.persist = function () {});
            var t3 = false,
                e3 = false,
                r3 = n3.stopPropagation;
            n3.stopPropagation = function () {
                r3.call(n3), (t3 = true);
            };
            var o3 = n3.preventDefault;
            return (
                (n3.preventDefault = function () {
                    o3.call(n3), (e3 = true);
                }),
                (n3.isPropagationStopped = function () {
                    return t3;
                }),
                (n3.isDefaultPrevented = function () {
                    return e3;
                }),
                (n3.nativeEvent = n3)
            );
        };
        $2 = {
            configurable: true,
            get: function () {
                return this.class;
            },
        };
        q2 = n.vnode;
        n.vnode = function (n3) {
            n3.$$typeof = H2;
            var t3 = n3.type,
                e3 = n3.props;
            if (t3) {
                if (
                    (e3.class != e3.className &&
                        (($2.enumerable = 'className' in e3),
                        null != e3.className && (e3.class = e3.className),
                        Object.defineProperty(e3, 'className', $2)),
                    'function' != typeof t3)
                ) {
                    var r3, o3, u5;
                    for (u5 in (e3.defaultValue &&
                        void 0 !== e3.value &&
                        (e3.value || 0 === e3.value || (e3.value = e3.defaultValue), delete e3.defaultValue),
                    Array.isArray(e3.value) &&
                        e3.multiple &&
                        'select' === t3 &&
                        (x(e3.children).forEach(function (n4) {
                            -1 != e3.value.indexOf(n4.props.value) && (n4.props.selected = true);
                        }),
                        delete e3.value),
                    e3))
                        if ((r3 = D2.test(u5))) break;
                    if (r3)
                        for (u5 in ((o3 = n3.props = {}), e3))
                            o3[D2.test(u5) ? u5.replace(/[A-Z0-9]/, '-$&').toLowerCase() : u5] = e3[u5];
                }
                !(function (t4) {
                    var e4 = n3.type,
                        r4 = n3.props;
                    if (r4 && 'string' == typeof e4) {
                        var o4 = {};
                        for (var u6 in r4)
                            /^on(Ani|Tra|Tou)/.test(u6) && ((r4[u6.toLowerCase()] = r4[u6]), delete r4[u6]),
                                (o4[u6.toLowerCase()] = u6);
                        if (
                            (o4.ondoubleclick && ((r4.ondblclick = r4[o4.ondoubleclick]), delete r4[o4.ondoubleclick]),
                            o4.onbeforeinput &&
                                ((r4.onbeforeinput = r4[o4.onbeforeinput]), delete r4[o4.onbeforeinput]),
                            o4.onchange &&
                                ('textarea' === e4 || ('input' === e4.toLowerCase() && !/^fil|che|ra/i.test(r4.type))))
                        ) {
                            var i4 = o4.oninput || 'oninput';
                            r4[i4] || ((r4[i4] = r4[o4.onchange]), delete r4[o4.onchange]);
                        }
                    }
                })(),
                    'function' == typeof t3 &&
                        !t3.m &&
                        t3.prototype &&
                        (I2(t3.prototype, 'componentWillMount'),
                        I2(t3.prototype, 'componentWillReceiveProps'),
                        I2(t3.prototype, 'componentWillUpdate'),
                        (t3.m = true));
            }
            q2 && q2(n3);
        };
        B = '16.8.0';
        Y = function (n3, t3) {
            return n3(t3);
        };
        compat_module_default = {
            useState: m2,
            useReducer: p2,
            useEffect: l2,
            useLayoutEffect: y2,
            useRef: d2,
            useImperativeHandle: s2,
            useMemo: h2,
            useCallback: T2,
            useContext: w2,
            useDebugValue: A2,
            version: '16.8.0',
            Children: R,
            render: T3,
            hydrate: T3,
            unmountComponentAtNode: Q,
            createPortal: z2,
            createElement: h,
            createContext: M,
            createFactory: G,
            cloneElement: K,
            createRef: y,
            Fragment: d,
            isValidElement: J,
            findDOMNode: X,
            Component: m,
            PureComponent: C2,
            memo: _3,
            forwardRef: S,
            unstable_batchedUpdates: Y,
            Suspense: U,
            SuspenseList: O,
            lazy: L2,
        };
    },
});

// node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js
var require_cjs4 = __commonJS({
    'node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js'(exports, module) {
        function _interopDefault(ex) {
            return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
        }
        var browserUtils = (init_esm2(), __toCommonJS(esm_exports2));
        var QRCode = _interopDefault(require_browser());
        var copy = _interopDefault(require_copy_to_clipboard());
        var React = (init_compat_module(), __toCommonJS(compat_module_exports));
        function open(uri) {
            QRCode.toString(uri, {
                type: 'terminal',
            }).then(console.log);
        }
        var WALLETCONNECT_STYLE_SHEET =
            ':root {\n  --animation-duration: 300ms;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.fadeIn {\n  animation-name: fadeIn;\n}\n\n.fadeOut {\n  animation-name: fadeOut;\n}\n\n#walletconnect-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n\n.walletconnect-modal__headerLogo {\n  height: 21px;\n}\n\n.walletconnect-modal__header p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n  align-items: flex-start;\n  display: flex;\n  flex: 1;\n  margin-left: 5px;\n}\n\n.walletconnect-modal__close__wrapper {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  z-index: 10000;\n  background: white;\n  border-radius: 26px;\n  padding: 6px;\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n}\n\n.walletconnect-modal__close__icon {\n  position: relative;\n  top: 7px;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(45deg);\n}\n\n.walletconnect-modal__close__line1 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n}\n\n.walletconnect-modal__close__line2 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n  transform: rotate(90deg);\n}\n\n.walletconnect-qrcode__base {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background: rgba(37, 41, 46, 0.95);\n  height: 100%;\n  left: 0;\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  width: 100%;\n  will-change: opacity;\n  padding: 40px;\n  box-sizing: border-box;\n}\n\n.walletconnect-qrcode__text {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 10px 0 20px 0;\n  text-align: center;\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-qrcode__text {\n    font-size: 4vw;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-qrcode__text {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-qrcode__image {\n  width: calc(100% - 30px);\n  box-sizing: border-box;\n  cursor: none;\n  margin: 0 auto;\n}\n\n.walletconnect-qrcode__notification {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  font-size: 16px;\n  padding: 16px 20px;\n  border-radius: 16px;\n  text-align: center;\n  transition: all 0.1s ease-in-out;\n  background: white;\n  color: black;\n  margin-bottom: -60px;\n  opacity: 0;\n}\n\n.walletconnect-qrcode__notification.notification__show {\n  opacity: 1;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__header {\n    height: 130px;\n  }\n  .walletconnect-modal__base {\n    overflow: auto;\n  }\n}\n\n@media only screen and (min-device-width: 415px) and (max-width: 768px) {\n  #content {\n    max-width: 768px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 375px) and (max-width: 415px) {\n  #content {\n    max-width: 414px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 320px) and (max-width: 375px) {\n  #content {\n    max-width: 375px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  #content {\n    max-width: 320px;\n    box-sizing: border-box;\n  }\n}\n\n.walletconnect-modal__base {\n  -webkit-font-smoothing: antialiased;\n  background: #ffffff;\n  border-radius: 24px;\n  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);\n  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,\n    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,\n    "Open Sans", "Helvetica Neue", sans-serif;\n  margin-top: 41px;\n  padding: 24px 24px 22px;\n  pointer-events: auto;\n  position: relative;\n  text-align: center;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  will-change: transform;\n  overflow: visible;\n  transform: translateY(-50%);\n  top: 50%;\n  max-width: 500px;\n  margin: auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__base {\n    padding: 24px 12px;\n  }\n}\n\n.walletconnect-modal__base .hidden {\n  transform: translateY(150%);\n  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.walletconnect-modal__header {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  left: 0;\n  justify-content: space-between;\n  position: absolute;\n  top: -42px;\n  width: 100%;\n}\n\n.walletconnect-modal__base .wc-logo {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  margin-top: 15px;\n  padding-bottom: 15px;\n  pointer-events: auto;\n}\n\n.walletconnect-modal__base .wc-logo div {\n  background-color: #3399ff;\n  height: 21px;\n  margin-right: 5px;\n  mask-image: url("images/wc-logo.svg") center no-repeat;\n  width: 32px;\n}\n\n.walletconnect-modal__base .wc-logo p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.walletconnect-modal__base h2 {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 0 0 19px 0;\n  text-align: center;\n  width: 100%;\n}\n\n.walletconnect-modal__base__row {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  align-items: center;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  height: 56px;\n  justify-content: space-between;\n  padding: 0 15px;\n  position: relative;\n  margin: 0px 0px 8px;\n  text-align: left;\n  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  will-change: transform;\n  text-decoration: none;\n}\n\n.walletconnect-modal__base__row:hover {\n  background: rgba(60, 66, 82, 0.06);\n}\n\n.walletconnect-modal__base__row:active {\n  background: rgba(60, 66, 82, 0.06);\n  transform: scale(0.975);\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.walletconnect-modal__base__row__h3 {\n  color: #25292e;\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0;\n  padding-bottom: 3px;\n}\n\n.walletconnect-modal__base__row__right {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n.walletconnect-modal__base__row__right__app-icon {\n  border-radius: 8px;\n  height: 34px;\n  margin: 0 11px 2px 0;\n  width: 34px;\n  background-size: 100%;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-modal__base__row__right__caret {\n  height: 18px;\n  opacity: 0.3;\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  width: 8px;\n  will-change: opacity;\n}\n\n.walletconnect-modal__base__row:hover .caret,\n.walletconnect-modal__base__row:active .caret {\n  opacity: 0.6;\n}\n\n.walletconnect-modal__mobile__toggle {\n  width: 80%;\n  display: flex;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 18px;\n  background: #d4d5d9;\n}\n\n.walletconnect-modal__single_wallet {\n  display: flex;\n  justify-content: center;\n  margin-top: 7px;\n  margin-bottom: 18px;\n}\n\n.walletconnect-modal__single_wallet a {\n  cursor: pointer;\n  color: rgb(64, 153, 255);\n  font-size: 21px;\n  font-weight: 800;\n  text-decoration: none !important;\n  margin: 0 auto;\n}\n\n.walletconnect-modal__mobile__toggle_selector {\n  width: calc(50% - 8px);\n  background: white;\n  position: absolute;\n  border-radius: 5px;\n  height: calc(100% - 8px);\n  top: 4px;\n  transition: all 0.2s ease-in-out;\n  transform: translate3d(4px, 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {\n  transform: translate3d(calc(100% + 12px), 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle a {\n  font-size: 12px;\n  width: 50%;\n  text-align: center;\n  padding: 8px;\n  margin: 0;\n  font-weight: 600;\n  z-index: 1;\n}\n\n.walletconnect-modal__footer {\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__footer {\n    margin-top: 5vw;\n  }\n}\n\n.walletconnect-modal__footer a {\n  cursor: pointer;\n  color: #898d97;\n  font-size: 15px;\n  margin: 0 auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__footer a {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-connect__buttons__wrapper {\n  max-height: 44vh;\n}\n\n.walletconnect-connect__buttons__wrapper__android {\n  margin: 50% 0;\n}\n\n.walletconnect-connect__buttons__wrapper__wrap {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  margin: 10px 0;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__buttons__wrapper__wrap {\n    margin-top: 40px;\n  }\n}\n\n.walletconnect-connect__button {\n  background-color: rgb(64, 153, 255);\n  padding: 12px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: rgb(255, 255, 255);\n  font-weight: 500;\n}\n\n.walletconnect-connect__button__icon_anchor {\n  cursor: pointer;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 8px;\n  width: 42px;\n  justify-self: center;\n  flex-direction: column;\n  text-decoration: none !important;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-connect__button__icon_anchor {\n    margin: 4px;\n  }\n}\n\n.walletconnect-connect__button__icon {\n  border-radius: 10px;\n  height: 42px;\n  margin: 0;\n  width: 42px;\n  background-size: cover !important;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-connect__button__text {\n  color: #424952;\n  font-size: 2.7vw;\n  text-decoration: none !important;\n  padding: 0;\n  margin-top: 1.8vw;\n  font-weight: 600;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__button__text {\n    font-size: 16px;\n    margin-top: 12px;\n  }\n}\n\n.walletconnect-search__input {\n  border: none;\n  background: #d4d5d9;\n  border-style: none;\n  padding: 8px 16px;\n  outline: none;\n  font-style: normal;\n  font-stretch: normal;\n  font-size: 16px;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  text-align: left;\n  border-radius: 8px;\n  width: calc(100% - 16px);\n  margin: 0;\n  margin-bottom: 8px;\n}\n';
        var _iteratorSymbol =
            typeof Symbol !== 'undefined'
                ? Symbol.iterator || (Symbol.iterator = Symbol('Symbol.iterator'))
                : '@@iterator';
        var _asyncIteratorSymbol =
            typeof Symbol !== 'undefined'
                ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol('Symbol.asyncIterator'))
                : '@@asyncIterator';
        function _catch(body, recover) {
            try {
                var result = body();
            } catch (e3) {
                return recover(e3);
            }
            if (result && result.then) {
                return result.then(void 0, recover);
            }
            return result;
        }
        var WALLETCONNECT_LOGO_SVG_URL =
            "data:image/svg+xml,%3Csvg height='185' viewBox='0 0 300 185' width='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m61.4385429 36.2562612c48.9112241-47.8881663 128.2119871-47.8881663 177.1232091 0l5.886545 5.7634174c2.445561 2.3944081 2.445561 6.2765112 0 8.6709204l-20.136695 19.715503c-1.222781 1.1972051-3.2053 1.1972051-4.428081 0l-8.100584-7.9311479c-34.121692-33.4079817-89.443886-33.4079817-123.5655788 0l-8.6750562 8.4936051c-1.2227816 1.1972041-3.205301 1.1972041-4.4280806 0l-20.1366949-19.7155031c-2.4455612-2.3944092-2.4455612-6.2765122 0-8.6709204zm218.7677961 40.7737449 17.921697 17.546897c2.445549 2.3943969 2.445563 6.2764769.000031 8.6708899l-80.810171 79.121134c-2.445544 2.394426-6.410582 2.394453-8.85616.000062-.00001-.00001-.000022-.000022-.000032-.000032l-57.354143-56.154572c-.61139-.598602-1.60265-.598602-2.21404 0-.000004.000004-.000007.000008-.000011.000011l-57.3529212 56.154531c-2.4455368 2.394432-6.4105755 2.394472-8.8561612.000087-.0000143-.000014-.0000296-.000028-.0000449-.000044l-80.81241943-79.122185c-2.44556021-2.394408-2.44556021-6.2765115 0-8.6709197l17.92172963-17.5468673c2.4455602-2.3944082 6.4105989-2.3944082 8.8561602 0l57.3549775 56.155357c.6113908.598602 1.602649.598602 2.2140398 0 .0000092-.000009.0000174-.000017.0000265-.000024l57.3521031-56.155333c2.445505-2.3944633 6.410544-2.3945531 8.856161-.0002.000034.0000336.000068.0000673.000101.000101l57.354902 56.155432c.61139.598601 1.60265.598601 2.21404 0l57.353975-56.1543249c2.445561-2.3944092 6.410599-2.3944092 8.85616 0z' fill='%233b99fc'/%3E%3C/svg%3E";
        var WALLETCONNECT_HEADER_TEXT = 'WalletConnect';
        var ANIMATION_DURATION = 300;
        var DEFAULT_BUTTON_COLOR = 'rgb(64, 153, 255)';
        var WALLETCONNECT_WRAPPER_ID = 'walletconnect-wrapper';
        var WALLETCONNECT_STYLE_ID = 'walletconnect-style-sheet';
        var WALLETCONNECT_MODAL_ID = 'walletconnect-qrcode-modal';
        var WALLETCONNECT_CLOSE_BUTTON_ID = 'walletconnect-qrcode-close';
        var WALLETCONNECT_CTA_TEXT_ID = 'walletconnect-qrcode-text';
        var WALLETCONNECT_CONNECT_BUTTON_ID = 'walletconnect-connect-button';
        function Header(props) {
            return React.createElement(
                'div',
                {
                    className: 'walletconnect-modal__header',
                },
                React.createElement('img', {
                    src: WALLETCONNECT_LOGO_SVG_URL,
                    className: 'walletconnect-modal__headerLogo',
                }),
                React.createElement('p', null, WALLETCONNECT_HEADER_TEXT),
                React.createElement(
                    'div',
                    {
                        className: 'walletconnect-modal__close__wrapper',
                        onClick: props.onClose,
                    },
                    React.createElement(
                        'div',
                        {
                            id: WALLETCONNECT_CLOSE_BUTTON_ID,
                            className: 'walletconnect-modal__close__icon',
                        },
                        React.createElement('div', {
                            className: 'walletconnect-modal__close__line1',
                        }),
                        React.createElement('div', {
                            className: 'walletconnect-modal__close__line2',
                        })
                    )
                )
            );
        }
        function ConnectButton(props) {
            return React.createElement(
                'a',
                {
                    className: 'walletconnect-connect__button',
                    href: props.href,
                    id: WALLETCONNECT_CONNECT_BUTTON_ID + '-' + props.name,
                    onClick: props.onClick,
                    rel: 'noopener noreferrer',
                    style: {
                        backgroundColor: props.color,
                    },
                    target: '_blank',
                },
                props.name
            );
        }
        var CARET_SVG_URL =
            "data:image/svg+xml,%3Csvg fill='none' height='18' viewBox='0 0 8 18' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath clip-rule='evenodd' d='m.586301.213898c-.435947.33907-.5144813.967342-.175411 1.403292l4.87831 6.27212c.28087.36111.28087.86677 0 1.22788l-4.878311 6.27211c-.33907.436-.260536 1.0642.175412 1.4033.435949.3391 1.064219.2605 1.403289-.1754l4.87832-6.2721c.84259-1.08336.84259-2.60034 0-3.68367l-4.87832-6.27212c-.33907-.4359474-.96734-.514482-1.403289-.175412z' fill='%233c4252' fill-rule='evenodd'/%3E%3C/svg%3E";
        function WalletButton(props) {
            var color = props.color;
            var href = props.href;
            var name2 = props.name;
            var logo = props.logo;
            var onClick = props.onClick;
            return React.createElement(
                'a',
                {
                    className: 'walletconnect-modal__base__row',
                    href,
                    onClick,
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
                React.createElement(
                    'h3',
                    {
                        className: 'walletconnect-modal__base__row__h3',
                    },
                    name2
                ),
                React.createElement(
                    'div',
                    {
                        className: 'walletconnect-modal__base__row__right',
                    },
                    React.createElement('div', {
                        className: 'walletconnect-modal__base__row__right__app-icon',
                        style: {
                            background: "url('" + logo + "') " + color,
                            backgroundSize: '100%',
                        },
                    }),
                    React.createElement('img', {
                        src: CARET_SVG_URL,
                        className: 'walletconnect-modal__base__row__right__caret',
                    })
                )
            );
        }
        function WalletIcon(props) {
            var color = props.color;
            var href = props.href;
            var name2 = props.name;
            var logo = props.logo;
            var onClick = props.onClick;
            var fontSize = window.innerWidth < 768 ? (name2.length > 8 ? 2.5 : 2.7) + 'vw' : 'inherit';
            return React.createElement(
                'a',
                {
                    className: 'walletconnect-connect__button__icon_anchor',
                    href,
                    onClick,
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
                React.createElement('div', {
                    className: 'walletconnect-connect__button__icon',
                    style: {
                        background: "url('" + logo + "') " + color,
                        backgroundSize: '100%',
                    },
                }),
                React.createElement(
                    'div',
                    {
                        style: {
                            fontSize,
                        },
                        className: 'walletconnect-connect__button__text',
                    },
                    name2
                )
            );
        }
        var GRID_MIN_COUNT = 5;
        var LINKS_PER_PAGE = 12;
        function LinkDisplay(props) {
            var android = browserUtils.isAndroid();
            var ref = React.useState('');
            var input = ref[0];
            var setInput = ref[1];
            var ref$1 = React.useState('');
            var filter = ref$1[0];
            var setFilter = ref$1[1];
            var ref$2 = React.useState(1);
            var page = ref$2[0];
            var setPage = ref$2[1];
            var links = filter
                ? props.links.filter(function (link) {
                      return link.name.toLowerCase().includes(filter.toLowerCase());
                  })
                : props.links;
            var errorMessage = props.errorMessage;
            var grid = filter || links.length > GRID_MIN_COUNT;
            var pages = Math.ceil(links.length / LINKS_PER_PAGE);
            var range = [(page - 1) * LINKS_PER_PAGE + 1, page * LINKS_PER_PAGE];
            var pageLinks = links.length
                ? links.filter(function (_6, index2) {
                      return index2 + 1 >= range[0] && index2 + 1 <= range[1];
                  })
                : [];
            var hasPaging = !!(!android && pages > 1);
            var filterTimeout = void 0;
            function handleInput(e3) {
                setInput(e3.target.value);
                clearTimeout(filterTimeout);
                if (e3.target.value) {
                    filterTimeout = setTimeout(function () {
                        setFilter(e3.target.value);
                        setPage(1);
                    }, 1e3);
                } else {
                    setInput('');
                    setFilter('');
                    setPage(1);
                }
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    {
                        id: WALLETCONNECT_CTA_TEXT_ID,
                        className: 'walletconnect-qrcode__text',
                    },
                    android ? props.text.connect_mobile_wallet : props.text.choose_preferred_wallet
                ),
                !android &&
                    React.createElement('input', {
                        className: 'walletconnect-search__input',
                        placeholder: 'Search',
                        value: input,
                        onChange: handleInput,
                    }),
                React.createElement(
                    'div',
                    {
                        className:
                            'walletconnect-connect__buttons__wrapper' +
                            (android ? '__android' : grid && links.length ? '__wrap' : ''),
                    },
                    !android
                        ? pageLinks.length
                            ? pageLinks.map(function (entry) {
                                  var color = entry.color;
                                  var name2 = entry.name;
                                  var shortName = entry.shortName;
                                  var logo = entry.logo;
                                  var href = browserUtils.formatIOSMobile(props.uri, entry);
                                  var handleClickIOS = React.useCallback(
                                      function () {
                                          browserUtils.saveMobileLinkInfo({
                                              name: name2,
                                              href,
                                          });
                                      },
                                      [pageLinks]
                                  );
                                  return !grid
                                      ? React.createElement(WalletButton, {
                                            color,
                                            href,
                                            name: name2,
                                            logo,
                                            onClick: handleClickIOS,
                                        })
                                      : React.createElement(WalletIcon, {
                                            color,
                                            href,
                                            name: shortName || name2,
                                            logo,
                                            onClick: handleClickIOS,
                                        });
                              })
                            : React.createElement(
                                  React.Fragment,
                                  null,
                                  React.createElement(
                                      'p',
                                      null,
                                      errorMessage.length
                                          ? props.errorMessage
                                          : !!props.links.length && !links.length
                                            ? props.text.no_wallets_found
                                            : props.text.loading
                                  )
                              )
                        : React.createElement(ConnectButton, {
                              name: props.text.connect,
                              color: DEFAULT_BUTTON_COLOR,
                              href: props.uri,
                              onClick: React.useCallback(function () {
                                  browserUtils.saveMobileLinkInfo({
                                      name: 'Unknown',
                                      href: props.uri,
                                  });
                              }, []),
                          })
                ),
                hasPaging &&
                    React.createElement(
                        'div',
                        {
                            className: 'walletconnect-modal__footer',
                        },
                        Array(pages)
                            .fill(0)
                            .map(function (_6, index2) {
                                var pageNumber = index2 + 1;
                                var selected = page === pageNumber;
                                return React.createElement(
                                    'a',
                                    {
                                        style: {
                                            margin: 'auto 10px',
                                            fontWeight: selected ? 'bold' : 'normal',
                                        },
                                        onClick: function () {
                                            return setPage(pageNumber);
                                        },
                                    },
                                    pageNumber
                                );
                            })
                    )
            );
        }
        function Notification(props) {
            var show = !!props.message.trim();
            return React.createElement(
                'div',
                {
                    className: 'walletconnect-qrcode__notification' + (show ? ' notification__show' : ''),
                },
                props.message
            );
        }
        var formatQRCodeImage = function (data) {
            try {
                var result = '';
                return Promise.resolve(
                    QRCode.toString(data, {
                        margin: 0,
                        type: 'svg',
                    })
                ).then(function (dataString) {
                    if (typeof dataString === 'string') {
                        result = dataString.replace('<svg', '<svg class="walletconnect-qrcode__image"');
                    }
                    return result;
                });
            } catch (e3) {
                return Promise.reject(e3);
            }
        };
        function QRCodeDisplay(props) {
            var ref = React.useState('');
            var notification = ref[0];
            var setNotification = ref[1];
            var ref$1 = React.useState('');
            var svg = ref$1[0];
            var setSvg = ref$1[1];
            React.useEffect(function () {
                try {
                    return Promise.resolve(formatQRCodeImage(props.uri)).then(function (_formatQRCodeImage) {
                        setSvg(_formatQRCodeImage);
                    });
                } catch (e3) {
                    Promise.reject(e3);
                }
            }, []);
            var copyToClipboard = function () {
                var success = copy(props.uri);
                if (success) {
                    setNotification(props.text.copied_to_clipboard);
                    setInterval(function () {
                        return setNotification('');
                    }, 1200);
                } else {
                    setNotification('Error');
                    setInterval(function () {
                        return setNotification('');
                    }, 1200);
                }
            };
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    {
                        id: WALLETCONNECT_CTA_TEXT_ID,
                        className: 'walletconnect-qrcode__text',
                    },
                    props.text.scan_qrcode_with_wallet
                ),
                React.createElement('div', {
                    dangerouslySetInnerHTML: {
                        __html: svg,
                    },
                }),
                React.createElement(
                    'div',
                    {
                        className: 'walletconnect-modal__footer',
                    },
                    React.createElement(
                        'a',
                        {
                            onClick: copyToClipboard,
                        },
                        props.text.copy_to_clipboard
                    )
                ),
                React.createElement(Notification, {
                    message: notification,
                })
            );
        }
        function Modal(props) {
            var android = browserUtils.isAndroid();
            var mobile = browserUtils.isMobile();
            var whitelist = mobile
                ? props.qrcodeModalOptions && props.qrcodeModalOptions.mobileLinks
                    ? props.qrcodeModalOptions.mobileLinks
                    : void 0
                : props.qrcodeModalOptions && props.qrcodeModalOptions.desktopLinks
                  ? props.qrcodeModalOptions.desktopLinks
                  : void 0;
            var ref = React.useState(false);
            var loading = ref[0];
            var setLoading = ref[1];
            var ref$1 = React.useState(false);
            var fetched = ref$1[0];
            var setFetched = ref$1[1];
            var ref$2 = React.useState(!mobile);
            var displayQRCode = ref$2[0];
            var setDisplayQRCode = ref$2[1];
            var displayProps = {
                mobile,
                text: props.text,
                uri: props.uri,
                qrcodeModalOptions: props.qrcodeModalOptions,
            };
            var ref$3 = React.useState('');
            var singleLinkHref = ref$3[0];
            var setSingleLinkHref = ref$3[1];
            var ref$4 = React.useState(false);
            var hasSingleLink = ref$4[0];
            var setHasSingleLink = ref$4[1];
            var ref$5 = React.useState([]);
            var links = ref$5[0];
            var setLinks = ref$5[1];
            var ref$6 = React.useState('');
            var errorMessage = ref$6[0];
            var setErrorMessage = ref$6[1];
            var getLinksIfNeeded = function () {
                if (fetched || loading || (whitelist && !whitelist.length) || links.length > 0) {
                    return;
                }
                React.useEffect(function () {
                    var initLinks = function () {
                        try {
                            if (android) {
                                return Promise.resolve();
                            }
                            setLoading(true);
                            var _temp = _catch(
                                function () {
                                    var url =
                                        props.qrcodeModalOptions && props.qrcodeModalOptions.registryUrl
                                            ? props.qrcodeModalOptions.registryUrl
                                            : browserUtils.getWalletRegistryUrl();
                                    return Promise.resolve(fetch(url)).then(function (registryResponse) {
                                        return Promise.resolve(registryResponse.json()).then(
                                            function (_registryResponse$jso) {
                                                var registry = _registryResponse$jso.listings;
                                                var platform = mobile ? 'mobile' : 'desktop';
                                                var _links = browserUtils.getMobileLinkRegistry(
                                                    browserUtils.formatMobileRegistry(registry, platform),
                                                    whitelist
                                                );
                                                setLoading(false);
                                                setFetched(true);
                                                setErrorMessage(!_links.length ? props.text.no_supported_wallets : '');
                                                setLinks(_links);
                                                var hasSingleLink2 = _links.length === 1;
                                                if (hasSingleLink2) {
                                                    setSingleLinkHref(
                                                        browserUtils.formatIOSMobile(props.uri, _links[0])
                                                    );
                                                    setDisplayQRCode(true);
                                                }
                                                setHasSingleLink(hasSingleLink2);
                                            }
                                        );
                                    });
                                },
                                function (e3) {
                                    setLoading(false);
                                    setFetched(true);
                                    setErrorMessage(props.text.something_went_wrong);
                                    console.error(e3);
                                }
                            );
                            return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
                        } catch (e3) {
                            return Promise.reject(e3);
                        }
                    };
                    initLinks();
                });
            };
            getLinksIfNeeded();
            var rightSelected = mobile ? displayQRCode : !displayQRCode;
            return React.createElement(
                'div',
                {
                    id: WALLETCONNECT_MODAL_ID,
                    className: 'walletconnect-qrcode__base animated fadeIn',
                },
                React.createElement(
                    'div',
                    {
                        className: 'walletconnect-modal__base',
                    },
                    React.createElement(Header, {
                        onClose: props.onClose,
                    }),
                    hasSingleLink && displayQRCode
                        ? React.createElement(
                              'div',
                              {
                                  className: 'walletconnect-modal__single_wallet',
                              },
                              React.createElement(
                                  'a',
                                  {
                                      onClick: function () {
                                          return browserUtils.saveMobileLinkInfo({
                                              name: links[0].name,
                                              href: singleLinkHref,
                                          });
                                      },
                                      href: singleLinkHref,
                                      rel: 'noopener noreferrer',
                                      target: '_blank',
                                  },
                                  props.text.connect_with + ' ' + (hasSingleLink ? links[0].name : '') + ' ›'
                              )
                          )
                        : android || loading || (!loading && links.length)
                          ? React.createElement(
                                'div',
                                {
                                    className:
                                        'walletconnect-modal__mobile__toggle' +
                                        (rightSelected ? ' right__selected' : ''),
                                },
                                React.createElement('div', {
                                    className: 'walletconnect-modal__mobile__toggle_selector',
                                }),
                                mobile
                                    ? React.createElement(
                                          React.Fragment,
                                          null,
                                          React.createElement(
                                              'a',
                                              {
                                                  onClick: function () {
                                                      return setDisplayQRCode(false), getLinksIfNeeded();
                                                  },
                                              },
                                              props.text.mobile
                                          ),
                                          React.createElement(
                                              'a',
                                              {
                                                  onClick: function () {
                                                      return setDisplayQRCode(true);
                                                  },
                                              },
                                              props.text.qrcode
                                          )
                                      )
                                    : React.createElement(
                                          React.Fragment,
                                          null,
                                          React.createElement(
                                              'a',
                                              {
                                                  onClick: function () {
                                                      return setDisplayQRCode(true);
                                                  },
                                              },
                                              props.text.qrcode
                                          ),
                                          React.createElement(
                                              'a',
                                              {
                                                  onClick: function () {
                                                      return setDisplayQRCode(false), getLinksIfNeeded();
                                                  },
                                              },
                                              props.text.desktop
                                          )
                                      )
                            )
                          : null,
                    React.createElement(
                        'div',
                        null,
                        displayQRCode || (!android && !loading && !links.length)
                            ? React.createElement(QRCodeDisplay, Object.assign({}, displayProps))
                            : React.createElement(
                                  LinkDisplay,
                                  Object.assign({}, displayProps, {
                                      links,
                                      errorMessage,
                                  })
                              )
                    )
                )
            );
        }
        var de4 = {
            choose_preferred_wallet: 'Wähle bevorzugte Wallet',
            connect_mobile_wallet: 'Verbinde mit Mobile Wallet',
            scan_qrcode_with_wallet: 'Scanne den QR-code mit einer WalletConnect kompatiblen Wallet',
            connect: 'Verbinden',
            qrcode: 'QR-Code',
            mobile: 'Mobile',
            desktop: 'Desktop',
            copy_to_clipboard: 'In die Zwischenablage kopieren',
            copied_to_clipboard: 'In die Zwischenablage kopiert!',
            connect_with: 'Verbinden mit Hilfe von',
            loading: 'Laden...',
            something_went_wrong: 'Etwas ist schief gelaufen',
            no_supported_wallets: 'Es gibt noch keine unterstützten Wallet',
            no_wallets_found: 'keine Wallet gefunden',
        };
        var en = {
            choose_preferred_wallet: 'Choose your preferred wallet',
            connect_mobile_wallet: 'Connect to Mobile Wallet',
            scan_qrcode_with_wallet: 'Scan QR code with a WalletConnect-compatible wallet',
            connect: 'Connect',
            qrcode: 'QR Code',
            mobile: 'Mobile',
            desktop: 'Desktop',
            copy_to_clipboard: 'Copy to clipboard',
            copied_to_clipboard: 'Copied to clipboard!',
            connect_with: 'Connect with',
            loading: 'Loading...',
            something_went_wrong: 'Something went wrong',
            no_supported_wallets: 'There are no supported wallets yet',
            no_wallets_found: 'No wallets found',
        };
        var es2 = {
            choose_preferred_wallet: 'Elige tu billetera preferida',
            connect_mobile_wallet: 'Conectar a billetera móvil',
            scan_qrcode_with_wallet: 'Escanea el código QR con una billetera compatible con WalletConnect',
            connect: 'Conectar',
            qrcode: 'Código QR',
            mobile: 'Móvil',
            desktop: 'Desktop',
            copy_to_clipboard: 'Copiar',
            copied_to_clipboard: 'Copiado!',
            connect_with: 'Conectar mediante',
            loading: 'Cargando...',
            something_went_wrong: 'Algo salió mal',
            no_supported_wallets: 'Todavía no hay billeteras compatibles',
            no_wallets_found: 'No se encontraron billeteras',
        };
        var fr = {
            choose_preferred_wallet: 'Choisissez votre portefeuille préféré',
            connect_mobile_wallet: 'Se connecter au portefeuille mobile',
            scan_qrcode_with_wallet: 'Scannez le QR code avec un portefeuille compatible WalletConnect',
            connect: 'Se connecter',
            qrcode: 'QR Code',
            mobile: 'Mobile',
            desktop: 'Desktop',
            copy_to_clipboard: 'Copier',
            copied_to_clipboard: 'Copié!',
            connect_with: "Connectez-vous à l'aide de",
            loading: 'Chargement...',
            something_went_wrong: 'Quelque chose a mal tourné',
            no_supported_wallets: "Il n'y a pas encore de portefeuilles pris en charge",
            no_wallets_found: 'Aucun portefeuille trouvé',
        };
        var ko = {
            choose_preferred_wallet: '원하는 지갑을 선택하세요',
            connect_mobile_wallet: '모바일 지갑과 연결',
            scan_qrcode_with_wallet: 'WalletConnect 지원 지갑에서 QR코드를 스캔하세요',
            connect: '연결',
            qrcode: 'QR 코드',
            mobile: '모바일',
            desktop: '데스크탑',
            copy_to_clipboard: '클립보드에 복사',
            copied_to_clipboard: '클립보드에 복사되었습니다!',
            connect_with: '와 연결하다',
            loading: '로드 중...',
            something_went_wrong: '문제가 발생했습니다.',
            no_supported_wallets: '아직 지원되는 지갑이 없습니다',
            no_wallets_found: '지갑을 찾을 수 없습니다',
        };
        var pt3 = {
            choose_preferred_wallet: 'Escolha sua carteira preferida',
            connect_mobile_wallet: 'Conectar-se à carteira móvel',
            scan_qrcode_with_wallet: 'Ler o código QR com uma carteira compatível com WalletConnect',
            connect: 'Conectar',
            qrcode: 'Código QR',
            mobile: 'Móvel',
            desktop: 'Desktop',
            copy_to_clipboard: 'Copiar',
            copied_to_clipboard: 'Copiado!',
            connect_with: 'Ligar por meio de',
            loading: 'Carregamento...',
            something_went_wrong: 'Algo correu mal',
            no_supported_wallets: 'Ainda não há carteiras suportadas',
            no_wallets_found: 'Nenhuma carteira encontrada',
        };
        var zh = {
            choose_preferred_wallet: '选择你的钱包',
            connect_mobile_wallet: '连接至移动端钱包',
            scan_qrcode_with_wallet: '使用兼容 WalletConnect 的钱包扫描二维码',
            connect: '连接',
            qrcode: '二维码',
            mobile: '移动',
            desktop: '桌面',
            copy_to_clipboard: '复制到剪贴板',
            copied_to_clipboard: '复制到剪贴板成功！',
            connect_with: '通过以下方式连接',
            loading: '正在加载...',
            something_went_wrong: '出了问题',
            no_supported_wallets: '目前还没有支持的钱包',
            no_wallets_found: '没有找到钱包',
        };
        var fa = {
            choose_preferred_wallet: 'کیف پول مورد نظر خود را انتخاب کنید',
            connect_mobile_wallet: 'به کیف پول موبایل وصل شوید',
            scan_qrcode_with_wallet: 'کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید',
            connect: 'اتصال',
            qrcode: 'کد QR',
            mobile: 'سیار',
            desktop: 'دسکتاپ',
            copy_to_clipboard: 'کپی به کلیپ بورد',
            copied_to_clipboard: 'در کلیپ بورد کپی شد!',
            connect_with: 'ارتباط با',
            loading: '...بارگذاری',
            something_went_wrong: 'مشکلی پیش آمد',
            no_supported_wallets: 'هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد',
            no_wallets_found: 'هیچ کیف پولی پیدا نشد',
        };
        var languages = {
            de: de4,
            en,
            es: es2,
            fr,
            ko,
            pt: pt3,
            zh,
            fa,
        };
        function injectStyleSheet() {
            var doc = browserUtils.getDocumentOrThrow();
            var prev = doc.getElementById(WALLETCONNECT_STYLE_ID);
            if (prev) {
                doc.head.removeChild(prev);
            }
            var style = doc.createElement('style');
            style.setAttribute('id', WALLETCONNECT_STYLE_ID);
            style.innerText = WALLETCONNECT_STYLE_SHEET;
            doc.head.appendChild(style);
        }
        function renderWrapper() {
            var doc = browserUtils.getDocumentOrThrow();
            var wrapper = doc.createElement('div');
            wrapper.setAttribute('id', WALLETCONNECT_WRAPPER_ID);
            doc.body.appendChild(wrapper);
            return wrapper;
        }
        function triggerCloseAnimation() {
            var doc = browserUtils.getDocumentOrThrow();
            var modal = doc.getElementById(WALLETCONNECT_MODAL_ID);
            if (modal) {
                modal.className = modal.className.replace('fadeIn', 'fadeOut');
                setTimeout(function () {
                    var wrapper = doc.getElementById(WALLETCONNECT_WRAPPER_ID);
                    if (wrapper) {
                        doc.body.removeChild(wrapper);
                    }
                }, ANIMATION_DURATION);
            }
        }
        function getWrappedCallback(cb) {
            return function () {
                triggerCloseAnimation();
                if (cb) {
                    cb();
                }
            };
        }
        function getText() {
            var lang = browserUtils.getNavigatorOrThrow().language.split('-')[0] || 'en';
            return languages[lang] || languages['en'];
        }
        function open$1(uri, cb, qrcodeModalOptions) {
            injectStyleSheet();
            var wrapper = renderWrapper();
            React.render(
                React.createElement(Modal, {
                    text: getText(),
                    uri,
                    onClose: getWrappedCallback(cb),
                    qrcodeModalOptions,
                }),
                wrapper
            );
        }
        function close$1() {
            triggerCloseAnimation();
        }
        var isNode3 = function () {
            return (
                typeof process !== 'undefined' &&
                typeof process.versions !== 'undefined' &&
                typeof process.versions.node !== 'undefined'
            );
        };
        function open$2(uri, cb, qrcodeModalOptions) {
            console.log(uri);
            if (isNode3()) {
                open(uri);
            } else {
                open$1(uri, cb, qrcodeModalOptions);
            }
        }
        function close$2() {
            if (isNode3());
            else {
                close$1();
            }
        }
        var index = {
            open: open$2,
            close: close$2,
        };
        module.exports = index;
    },
});

// node_modules/events/events.js
var require_events = __commonJS({
    'node_modules/events/events.js'(exports, module) {
        'use strict';
        var R5 = typeof Reflect === 'object' ? Reflect : null;
        var ReflectApply =
            R5 && typeof R5.apply === 'function'
                ? R5.apply
                : function ReflectApply2(target, receiver, args) {
                      return Function.prototype.apply.call(target, receiver, args);
                  };
        var ReflectOwnKeys;
        if (R5 && typeof R5.ownKeys === 'function') {
            ReflectOwnKeys = R5.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
            ReflectOwnKeys = function ReflectOwnKeys2(target) {
                return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
            };
        } else {
            ReflectOwnKeys = function ReflectOwnKeys2(target) {
                return Object.getOwnPropertyNames(target);
            };
        }
        function ProcessEmitWarning(warning) {
            if (console && console.warn) console.warn(warning);
        }
        var NumberIsNaN =
            Number.isNaN ||
            function NumberIsNaN2(value) {
                return value !== value;
            };
        function EventEmitter2() {
            EventEmitter2.init.call(this);
        }
        module.exports = EventEmitter2;
        module.exports.once = once;
        EventEmitter2.EventEmitter = EventEmitter2;
        EventEmitter2.prototype._events = void 0;
        EventEmitter2.prototype._eventsCount = 0;
        EventEmitter2.prototype._maxListeners = void 0;
        var defaultMaxListeners = 10;
        function checkListener(listener) {
            if (typeof listener !== 'function') {
                throw new TypeError(
                    'The "listener" argument must be of type Function. Received type ' + typeof listener
                );
            }
        }
        Object.defineProperty(EventEmitter2, 'defaultMaxListeners', {
            enumerable: true,
            get: function () {
                return defaultMaxListeners;
            },
            set: function (arg) {
                if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
                    throw new RangeError(
                        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                            arg +
                            '.'
                    );
                }
                defaultMaxListeners = arg;
            },
        });
        EventEmitter2.init = function () {
            if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
                this._events = /* @__PURE__ */ Object.create(null);
                this._eventsCount = 0;
            }
            this._maxListeners = this._maxListeners || void 0;
        };
        EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n3) {
            if (typeof n3 !== 'number' || n3 < 0 || NumberIsNaN(n3)) {
                throw new RangeError(
                    'The value of "n" is out of range. It must be a non-negative number. Received ' + n3 + '.'
                );
            }
            this._maxListeners = n3;
            return this;
        };
        function _getMaxListeners(that) {
            if (that._maxListeners === void 0) return EventEmitter2.defaultMaxListeners;
            return that._maxListeners;
        }
        EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
            return _getMaxListeners(this);
        };
        EventEmitter2.prototype.emit = function emit(type) {
            var args = [];
            for (var i4 = 1; i4 < arguments.length; i4++) args.push(arguments[i4]);
            var doError = type === 'error';
            var events = this._events;
            if (events !== void 0) doError = doError && events.error === void 0;
            else if (!doError) return false;
            if (doError) {
                var er3;
                if (args.length > 0) er3 = args[0];
                if (er3 instanceof Error) {
                    throw er3;
                }
                var err = new Error('Unhandled error.' + (er3 ? ' (' + er3.message + ')' : ''));
                err.context = er3;
                throw err;
            }
            var handler = events[type];
            if (handler === void 0) return false;
            if (typeof handler === 'function') {
                ReflectApply(handler, this, args);
            } else {
                var len = handler.length;
                var listeners = arrayClone(handler, len);
                for (var i4 = 0; i4 < len; ++i4) ReflectApply(listeners[i4], this, args);
            }
            return true;
        };
        function _addListener(target, type, listener, prepend) {
            var m4;
            var events;
            var existing;
            checkListener(listener);
            events = target._events;
            if (events === void 0) {
                events = target._events = /* @__PURE__ */ Object.create(null);
                target._eventsCount = 0;
            } else {
                if (events.newListener !== void 0) {
                    target.emit('newListener', type, listener.listener ? listener.listener : listener);
                    events = target._events;
                }
                existing = events[type];
            }
            if (existing === void 0) {
                existing = events[type] = listener;
                ++target._eventsCount;
            } else {
                if (typeof existing === 'function') {
                    existing = events[type] = prepend ? [listener, existing] : [existing, listener];
                } else if (prepend) {
                    existing.unshift(listener);
                } else {
                    existing.push(listener);
                }
                m4 = _getMaxListeners(target);
                if (m4 > 0 && existing.length > m4 && !existing.warned) {
                    existing.warned = true;
                    var w8 = new Error(
                        'Possible EventEmitter memory leak detected. ' +
                            existing.length +
                            ' ' +
                            String(type) +
                            ' listeners added. Use emitter.setMaxListeners() to increase limit'
                    );
                    w8.name = 'MaxListenersExceededWarning';
                    w8.emitter = target;
                    w8.type = type;
                    w8.count = existing.length;
                    ProcessEmitWarning(w8);
                }
            }
            return target;
        }
        EventEmitter2.prototype.addListener = function addListener(type, listener) {
            return _addListener(this, type, listener, false);
        };
        EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
        EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
            return _addListener(this, type, listener, true);
        };
        function onceWrapper() {
            if (!this.fired) {
                this.target.removeListener(this.type, this.wrapFn);
                this.fired = true;
                if (arguments.length === 0) return this.listener.call(this.target);
                return this.listener.apply(this.target, arguments);
            }
        }
        function _onceWrap(target, type, listener) {
            var state = { fired: false, wrapFn: void 0, target, type, listener };
            var wrapped = onceWrapper.bind(state);
            wrapped.listener = listener;
            state.wrapFn = wrapped;
            return wrapped;
        }
        EventEmitter2.prototype.once = function once2(type, listener) {
            checkListener(listener);
            this.on(type, _onceWrap(this, type, listener));
            return this;
        };
        EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
            checkListener(listener);
            this.prependListener(type, _onceWrap(this, type, listener));
            return this;
        };
        EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
            var list, events, position, i4, originalListener;
            checkListener(listener);
            events = this._events;
            if (events === void 0) return this;
            list = events[type];
            if (list === void 0) return this;
            if (list === listener || list.listener === listener) {
                if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
                else {
                    delete events[type];
                    if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
                }
            } else if (typeof list !== 'function') {
                position = -1;
                for (i4 = list.length - 1; i4 >= 0; i4--) {
                    if (list[i4] === listener || list[i4].listener === listener) {
                        originalListener = list[i4].listener;
                        position = i4;
                        break;
                    }
                }
                if (position < 0) return this;
                if (position === 0) list.shift();
                else {
                    spliceOne(list, position);
                }
                if (list.length === 1) events[type] = list[0];
                if (events.removeListener !== void 0) this.emit('removeListener', type, originalListener || listener);
            }
            return this;
        };
        EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
        EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
            var listeners, events, i4;
            events = this._events;
            if (events === void 0) return this;
            if (events.removeListener === void 0) {
                if (arguments.length === 0) {
                    this._events = /* @__PURE__ */ Object.create(null);
                    this._eventsCount = 0;
                } else if (events[type] !== void 0) {
                    if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
                    else delete events[type];
                }
                return this;
            }
            if (arguments.length === 0) {
                var keys2 = Object.keys(events);
                var key;
                for (i4 = 0; i4 < keys2.length; ++i4) {
                    key = keys2[i4];
                    if (key === 'removeListener') continue;
                    this.removeAllListeners(key);
                }
                this.removeAllListeners('removeListener');
                this._events = /* @__PURE__ */ Object.create(null);
                this._eventsCount = 0;
                return this;
            }
            listeners = events[type];
            if (typeof listeners === 'function') {
                this.removeListener(type, listeners);
            } else if (listeners !== void 0) {
                for (i4 = listeners.length - 1; i4 >= 0; i4--) {
                    this.removeListener(type, listeners[i4]);
                }
            }
            return this;
        };
        function _listeners(target, type, unwrap) {
            var events = target._events;
            if (events === void 0) return [];
            var evlistener = events[type];
            if (evlistener === void 0) return [];
            if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
            return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }
        EventEmitter2.prototype.listeners = function listeners(type) {
            return _listeners(this, type, true);
        };
        EventEmitter2.prototype.rawListeners = function rawListeners(type) {
            return _listeners(this, type, false);
        };
        EventEmitter2.listenerCount = function (emitter, type) {
            if (typeof emitter.listenerCount === 'function') {
                return emitter.listenerCount(type);
            } else {
                return listenerCount.call(emitter, type);
            }
        };
        EventEmitter2.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
            var events = this._events;
            if (events !== void 0) {
                var evlistener = events[type];
                if (typeof evlistener === 'function') {
                    return 1;
                } else if (evlistener !== void 0) {
                    return evlistener.length;
                }
            }
            return 0;
        }
        EventEmitter2.prototype.eventNames = function eventNames() {
            return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };
        function arrayClone(arr, n3) {
            var copy = new Array(n3);
            for (var i4 = 0; i4 < n3; ++i4) copy[i4] = arr[i4];
            return copy;
        }
        function spliceOne(list, index) {
            for (; index + 1 < list.length; index++) list[index] = list[index + 1];
            list.pop();
        }
        function unwrapListeners(arr) {
            var ret = new Array(arr.length);
            for (var i4 = 0; i4 < ret.length; ++i4) {
                ret[i4] = arr[i4].listener || arr[i4];
            }
            return ret;
        }
        function once(emitter, name2) {
            return new Promise(function (resolve, reject) {
                function errorListener(err) {
                    emitter.removeListener(name2, resolver);
                    reject(err);
                }
                function resolver() {
                    if (typeof emitter.removeListener === 'function') {
                        emitter.removeListener('error', errorListener);
                    }
                    resolve([].slice.call(arguments));
                }
                eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
                if (name2 !== 'error') {
                    addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
                }
            });
        }
        function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
            if (typeof emitter.on === 'function') {
                eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
            }
        }
        function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
            if (typeof emitter.on === 'function') {
                if (flags.once) {
                    emitter.once(name2, listener);
                } else {
                    emitter.on(name2, listener);
                }
            } else if (typeof emitter.addEventListener === 'function') {
                emitter.addEventListener(name2, function wrapListener(arg) {
                    if (flags.once) {
                        emitter.removeEventListener(name2, wrapListener);
                    }
                    listener(arg);
                });
            } else {
                throw new TypeError(
                    'The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter
                );
            }
        }
    },
});

// node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
    __assign: () => __assign,
    __asyncDelegator: () => __asyncDelegator,
    __asyncGenerator: () => __asyncGenerator,
    __asyncValues: () => __asyncValues,
    __await: () => __await,
    __awaiter: () => __awaiter,
    __classPrivateFieldGet: () => __classPrivateFieldGet,
    __classPrivateFieldSet: () => __classPrivateFieldSet,
    __createBinding: () => __createBinding,
    __decorate: () => __decorate,
    __exportStar: () => __exportStar,
    __extends: () => __extends,
    __generator: () => __generator,
    __importDefault: () => __importDefault,
    __importStar: () => __importStar,
    __makeTemplateObject: () => __makeTemplateObject,
    __metadata: () => __metadata,
    __param: () => __param,
    __read: () => __read,
    __rest: () => __rest,
    __spread: () => __spread,
    __spreadArrays: () => __spreadArrays2,
    __values: () => __values,
});
function __extends(d4, b5) {
    extendStatics(d4, b5);
    function __() {
        this.constructor = d4;
    }
    d4.prototype = b5 === null ? Object.create(b5) : ((__.prototype = b5.prototype), new __());
}
function __rest(s3, e3) {
    var t3 = {};
    for (var p5 in s3) if (Object.prototype.hasOwnProperty.call(s3, p5) && e3.indexOf(p5) < 0) t3[p5] = s3[p5];
    if (s3 != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i4 = 0, p5 = Object.getOwnPropertySymbols(s3); i4 < p5.length; i4++) {
            if (e3.indexOf(p5[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p5[i4]))
                t3[p5[i4]] = s3[p5[i4]];
        }
    return t3;
}
function __decorate(decorators, target, key, desc) {
    var c5 = arguments.length,
        r3 = c5 < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
        d4;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r3 = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i4 = decorators.length - 1; i4 >= 0; i4--)
            if ((d4 = decorators[i4])) r3 = (c5 < 3 ? d4(r3) : c5 > 3 ? d4(target, key, r3) : d4(target, key)) || r3;
    return c5 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P4, generator) {
    function adopt(value) {
        return value instanceof P4
            ? value
            : new P4(function (resolve) {
                  resolve(value);
              });
    }
    return new (P4 || (P4 = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e3) {
                reject(e3);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e3) {
                reject(e3);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _6 = {
            label: 0,
            sent: function () {
                if (t3[0] & 1) throw t3[1];
                return t3[1];
            },
            trys: [],
            ops: [],
        },
        f4,
        y6,
        t3,
        g7;
    return (
        (g7 = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
            (g7[Symbol.iterator] = function () {
                return this;
            }),
        g7
    );
    function verb(n3) {
        return function (v5) {
            return step([n3, v5]);
        };
    }
    function step(op) {
        if (f4) throw new TypeError('Generator is already executing.');
        while (_6)
            try {
                if (
                    ((f4 = 1),
                    y6 &&
                        (t3 =
                            op[0] & 2
                                ? y6['return']
                                : op[0]
                                  ? y6['throw'] || ((t3 = y6['return']) && t3.call(y6), 0)
                                  : y6.next) &&
                        !(t3 = t3.call(y6, op[1])).done)
                )
                    return t3;
                if (((y6 = 0), t3)) op = [op[0] & 2, t3.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t3 = op;
                        break;
                    case 4:
                        _6.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _6.label++;
                        y6 = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _6.ops.pop();
                        _6.trys.pop();
                        continue;
                    default:
                        if (
                            !((t3 = _6.trys), (t3 = t3.length > 0 && t3[t3.length - 1])) &&
                            (op[0] === 6 || op[0] === 2)
                        ) {
                            _6 = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t3 || (op[1] > t3[0] && op[1] < t3[3]))) {
                            _6.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _6.label < t3[1]) {
                            _6.label = t3[1];
                            t3 = op;
                            break;
                        }
                        if (t3 && _6.label < t3[2]) {
                            _6.label = t3[2];
                            _6.ops.push(op);
                            break;
                        }
                        if (t3[2]) _6.ops.pop();
                        _6.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _6);
            } catch (e3) {
                op = [6, e3];
                y6 = 0;
            } finally {
                f4 = t3 = 0;
            }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __createBinding(o3, m4, k5, k22) {
    if (k22 === void 0) k22 = k5;
    o3[k22] = m4[k5];
}
function __exportStar(m4, exports) {
    for (var p5 in m4) if (p5 !== 'default' && !exports.hasOwnProperty(p5)) exports[p5] = m4[p5];
}
function __values(o3) {
    var s3 = typeof Symbol === 'function' && Symbol.iterator,
        m4 = s3 && o3[s3],
        i4 = 0;
    if (m4) return m4.call(o3);
    if (o3 && typeof o3.length === 'number')
        return {
            next: function () {
                if (o3 && i4 >= o3.length) o3 = void 0;
                return { value: o3 && o3[i4++], done: !o3 };
            },
        };
    throw new TypeError(s3 ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function __read(o3, n3) {
    var m4 = typeof Symbol === 'function' && o3[Symbol.iterator];
    if (!m4) return o3;
    var i4 = m4.call(o3),
        r3,
        ar2 = [],
        e3;
    try {
        while ((n3 === void 0 || n3-- > 0) && !(r3 = i4.next()).done) ar2.push(r3.value);
    } catch (error) {
        e3 = { error };
    } finally {
        try {
            if (r3 && !r3.done && (m4 = i4['return'])) m4.call(i4);
        } finally {
            if (e3) throw e3.error;
        }
    }
    return ar2;
}
function __spread() {
    for (var ar2 = [], i4 = 0; i4 < arguments.length; i4++) ar2 = ar2.concat(__read(arguments[i4]));
    return ar2;
}
function __spreadArrays2() {
    for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
    for (var r3 = Array(s3), k5 = 0, i4 = 0; i4 < il; i4++)
        for (var a5 = arguments[i4], j5 = 0, jl = a5.length; j5 < jl; j5++, k5++) r3[k5] = a5[j5];
    return r3;
}
function __await(v5) {
    return this instanceof __await ? ((this.v = v5), this) : new __await(v5);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
    var g7 = generator.apply(thisArg, _arguments || []),
        i4,
        q4 = [];
    return (
        (i4 = {}),
        verb('next'),
        verb('throw'),
        verb('return'),
        (i4[Symbol.asyncIterator] = function () {
            return this;
        }),
        i4
    );
    function verb(n3) {
        if (g7[n3])
            i4[n3] = function (v5) {
                return new Promise(function (a5, b5) {
                    q4.push([n3, v5, a5, b5]) > 1 || resume(n3, v5);
                });
            };
    }
    function resume(n3, v5) {
        try {
            step(g7[n3](v5));
        } catch (e3) {
            settle(q4[0][3], e3);
        }
    }
    function step(r3) {
        r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q4[0][2], r3);
    }
    function fulfill(value) {
        resume('next', value);
    }
    function reject(value) {
        resume('throw', value);
    }
    function settle(f4, v5) {
        if ((f4(v5), q4.shift(), q4.length)) resume(q4[0][0], q4[0][1]);
    }
}
function __asyncDelegator(o3) {
    var i4, p5;
    return (
        (i4 = {}),
        verb('next'),
        verb('throw', function (e3) {
            throw e3;
        }),
        verb('return'),
        (i4[Symbol.iterator] = function () {
            return this;
        }),
        i4
    );
    function verb(n3, f4) {
        i4[n3] = o3[n3]
            ? function (v5) {
                  return (p5 = !p5) ? { value: __await(o3[n3](v5)), done: n3 === 'return' } : f4 ? f4(v5) : v5;
              }
            : f4;
    }
}
function __asyncValues(o3) {
    if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
    var m4 = o3[Symbol.asyncIterator],
        i4;
    return m4
        ? m4.call(o3)
        : ((o3 = typeof __values === 'function' ? __values(o3) : o3[Symbol.iterator]()),
          (i4 = {}),
          verb('next'),
          verb('throw'),
          verb('return'),
          (i4[Symbol.asyncIterator] = function () {
              return this;
          }),
          i4);
    function verb(n3) {
        i4[n3] =
            o3[n3] &&
            function (v5) {
                return new Promise(function (resolve, reject) {
                    (v5 = o3[n3](v5)), settle(resolve, reject, v5.done, v5.value);
                });
            };
    }
    function settle(resolve, reject, d4, v5) {
        Promise.resolve(v5).then(function (v6) {
            resolve({ value: v6, done: d4 });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for (var k5 in mod) if (Object.hasOwnProperty.call(mod, k5)) result[k5] = mod[k5];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError('attempted to set private field on non-instance');
    }
    privateMap.set(receiver, value);
    return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
    'node_modules/tslib/tslib.es6.js'() {
        extendStatics = function (d4, b5) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d5, b6) {
                        d5.__proto__ = b6;
                    }) ||
                function (d5, b6) {
                    for (var p5 in b6) if (b6.hasOwnProperty(p5)) d5[p5] = b6[p5];
                };
            return extendStatics(d4, b5);
        };
        __assign = function () {
            __assign =
                Object.assign ||
                function __assign2(t3) {
                    for (var s3, i4 = 1, n3 = arguments.length; i4 < n3; i4++) {
                        s3 = arguments[i4];
                        for (var p5 in s3) if (Object.prototype.hasOwnProperty.call(s3, p5)) t3[p5] = s3[p5];
                    }
                    return t3;
                };
            return __assign.apply(this, arguments);
        };
    },
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/utils/delay.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.delay = void 0;
        function delay(timeout) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, timeout);
            });
        }
        exports.delay = delay;
    },
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/constants/misc.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
        exports.ONE_HUNDRED = 100;
        exports.ONE_THOUSAND = 1e3;
    },
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/constants/time.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.ONE_YEAR =
            exports.FOUR_WEEKS =
            exports.THREE_WEEKS =
            exports.TWO_WEEKS =
            exports.ONE_WEEK =
            exports.THIRTY_DAYS =
            exports.SEVEN_DAYS =
            exports.FIVE_DAYS =
            exports.THREE_DAYS =
            exports.ONE_DAY =
            exports.TWENTY_FOUR_HOURS =
            exports.TWELVE_HOURS =
            exports.SIX_HOURS =
            exports.THREE_HOURS =
            exports.ONE_HOUR =
            exports.SIXTY_MINUTES =
            exports.THIRTY_MINUTES =
            exports.TEN_MINUTES =
            exports.FIVE_MINUTES =
            exports.ONE_MINUTE =
            exports.SIXTY_SECONDS =
            exports.THIRTY_SECONDS =
            exports.TEN_SECONDS =
            exports.FIVE_SECONDS =
            exports.ONE_SECOND =
                void 0;
        exports.ONE_SECOND = 1;
        exports.FIVE_SECONDS = 5;
        exports.TEN_SECONDS = 10;
        exports.THIRTY_SECONDS = 30;
        exports.SIXTY_SECONDS = 60;
        exports.ONE_MINUTE = exports.SIXTY_SECONDS;
        exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
        exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
        exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
        exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
        exports.ONE_HOUR = exports.SIXTY_MINUTES;
        exports.THREE_HOURS = exports.ONE_HOUR * 3;
        exports.SIX_HOURS = exports.ONE_HOUR * 6;
        exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
        exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
        exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
        exports.THREE_DAYS = exports.ONE_DAY * 3;
        exports.FIVE_DAYS = exports.ONE_DAY * 5;
        exports.SEVEN_DAYS = exports.ONE_DAY * 7;
        exports.THIRTY_DAYS = exports.ONE_DAY * 30;
        exports.ONE_WEEK = exports.SEVEN_DAYS;
        exports.TWO_WEEKS = exports.ONE_WEEK * 2;
        exports.THREE_WEEKS = exports.ONE_WEEK * 3;
        exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
        exports.ONE_YEAR = exports.ONE_DAY * 365;
    },
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/constants/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_misc(), exports);
        tslib_1.__exportStar(require_time(), exports);
    },
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/utils/convert.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.fromMiliseconds = exports.toMiliseconds = void 0;
        var constants_1 = require_constants();
        function toMiliseconds(seconds) {
            return seconds * constants_1.ONE_THOUSAND;
        }
        exports.toMiliseconds = toMiliseconds;
        function fromMiliseconds2(miliseconds) {
            return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
        }
        exports.fromMiliseconds = fromMiliseconds2;
    },
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils3 = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/utils/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_delay(), exports);
        tslib_1.__exportStar(require_convert(), exports);
    },
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/watch.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.Watch = void 0;
        var Watch = class {
            constructor() {
                this.timestamps = /* @__PURE__ */ new Map();
            }
            start(label) {
                if (this.timestamps.has(label)) {
                    throw new Error(`Watch already started for label: ${label}`);
                }
                this.timestamps.set(label, { started: Date.now() });
            }
            stop(label) {
                const timestamp = this.get(label);
                if (typeof timestamp.elapsed !== 'undefined') {
                    throw new Error(`Watch already stopped for label: ${label}`);
                }
                const elapsed = Date.now() - timestamp.started;
                this.timestamps.set(label, { started: timestamp.started, elapsed });
            }
            get(label) {
                const timestamp = this.timestamps.get(label);
                if (typeof timestamp === 'undefined') {
                    throw new Error(`No timestamp found for label: ${label}`);
                }
                return timestamp;
            }
            elapsed(label) {
                const timestamp = this.get(label);
                const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
                return elapsed;
            }
        };
        exports.Watch = Watch;
        exports.default = Watch;
    },
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/types/watch.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.IWatch = void 0;
        var IWatch = class {};
        exports.IWatch = IWatch;
    },
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/types/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_watch2(), exports);
    },
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs5 = __commonJS({
    'node_modules/@walletconnect/time/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_utils3(), exports);
        tslib_1.__exportStar(require_watch(), exports);
        tslib_1.__exportStar(require_types(), exports);
        tslib_1.__exportStar(require_constants(), exports);
    },
});

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents;
var init_events = __esm({
    'node_modules/@walletconnect/events/dist/esm/events.js'() {
        IEvents = class {};
    },
});

// node_modules/@walletconnect/events/dist/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
    IEvents: () => IEvents,
});
var init_esm3 = __esm({
    'node_modules/@walletconnect/events/dist/esm/index.js'() {
        init_events();
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js
var require_heartbeat = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.IHeartBeat = void 0;
        var events_1 = (init_esm3(), __toCommonJS(esm_exports3));
        var IHeartBeat = class extends events_1.IEvents {
            constructor(opts) {
                super();
            }
        };
        exports.IHeartBeat = IHeartBeat;
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js
var require_types2 = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_heartbeat(), exports);
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js
var require_heartbeat2 = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0;
        var time_1 = require_cjs5();
        exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
        exports.HEARTBEAT_EVENTS = {
            pulse: 'heartbeat_pulse',
        };
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js
var require_constants2 = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_heartbeat2(), exports);
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js
var require_heartbeat3 = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.HeartBeat = void 0;
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        var events_1 = require_events();
        var time_1 = require_cjs5();
        var types_1 = require_types2();
        var constants_1 = require_constants2();
        var HeartBeat = class _HeartBeat extends types_1.IHeartBeat {
            constructor(opts) {
                super(opts);
                this.events = new events_1.EventEmitter();
                this.interval = constants_1.HEARTBEAT_INTERVAL;
                this.interval =
                    (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
            }
            static init(opts) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const heartbeat = new _HeartBeat(opts);
                    yield heartbeat.init();
                    return heartbeat;
                });
            }
            init() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    yield this.initialize();
                });
            }
            stop() {
                clearInterval(this.intervalRef);
            }
            on(event, listener) {
                this.events.on(event, listener);
            }
            once(event, listener) {
                this.events.once(event, listener);
            }
            off(event, listener) {
                this.events.off(event, listener);
            }
            removeListener(event, listener) {
                this.events.removeListener(event, listener);
            }
            initialize() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    this.intervalRef = setInterval(() => this.pulse(), time_1.toMiliseconds(this.interval));
                });
            }
            pulse() {
                this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
            }
        };
        exports.HeartBeat = HeartBeat;
    },
});

// node_modules/@walletconnect/heartbeat/dist/cjs/index.js
var require_cjs6 = __commonJS({
    'node_modules/@walletconnect/heartbeat/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_heartbeat3(), exports);
        tslib_1.__exportStar(require_types2(), exports);
        tslib_1.__exportStar(require_constants2(), exports);
    },
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
    'node_modules/quick-format-unescaped/index.js'(exports, module) {
        'use strict';
        function tryStringify(o3) {
            try {
                return JSON.stringify(o3);
            } catch (e3) {
                return '"[Circular]"';
            }
        }
        module.exports = format;
        function format(f4, args, opts) {
            var ss2 = (opts && opts.stringify) || tryStringify;
            var offset = 1;
            if (typeof f4 === 'object' && f4 !== null) {
                var len = args.length + offset;
                if (len === 1) return f4;
                var objects = new Array(len);
                objects[0] = ss2(f4);
                for (var index = 1; index < len; index++) {
                    objects[index] = ss2(args[index]);
                }
                return objects.join(' ');
            }
            if (typeof f4 !== 'string') {
                return f4;
            }
            var argLen = args.length;
            if (argLen === 0) return f4;
            var str = '';
            var a5 = 1 - offset;
            var lastPos = -1;
            var flen = (f4 && f4.length) || 0;
            for (var i4 = 0; i4 < flen; ) {
                if (f4.charCodeAt(i4) === 37 && i4 + 1 < flen) {
                    lastPos = lastPos > -1 ? lastPos : 0;
                    switch (f4.charCodeAt(i4 + 1)) {
                        case 100:
                        case 102:
                            if (a5 >= argLen) break;
                            if (args[a5] == null) break;
                            if (lastPos < i4) str += f4.slice(lastPos, i4);
                            str += Number(args[a5]);
                            lastPos = i4 + 2;
                            i4++;
                            break;
                        case 105:
                            if (a5 >= argLen) break;
                            if (args[a5] == null) break;
                            if (lastPos < i4) str += f4.slice(lastPos, i4);
                            str += Math.floor(Number(args[a5]));
                            lastPos = i4 + 2;
                            i4++;
                            break;
                        case 79:
                        case 111:
                        case 106:
                            if (a5 >= argLen) break;
                            if (args[a5] === void 0) break;
                            if (lastPos < i4) str += f4.slice(lastPos, i4);
                            var type = typeof args[a5];
                            if (type === 'string') {
                                str += "'" + args[a5] + "'";
                                lastPos = i4 + 2;
                                i4++;
                                break;
                            }
                            if (type === 'function') {
                                str += args[a5].name || '<anonymous>';
                                lastPos = i4 + 2;
                                i4++;
                                break;
                            }
                            str += ss2(args[a5]);
                            lastPos = i4 + 2;
                            i4++;
                            break;
                        case 115:
                            if (a5 >= argLen) break;
                            if (lastPos < i4) str += f4.slice(lastPos, i4);
                            str += String(args[a5]);
                            lastPos = i4 + 2;
                            i4++;
                            break;
                        case 37:
                            if (lastPos < i4) str += f4.slice(lastPos, i4);
                            str += '%';
                            lastPos = i4 + 2;
                            i4++;
                            a5--;
                            break;
                    }
                    ++a5;
                }
                ++i4;
            }
            if (lastPos === -1) return f4;
            else if (lastPos < flen) {
                str += f4.slice(lastPos);
            }
            return str;
        }
    },
});

// node_modules/pino/browser.js
var require_browser2 = __commonJS({
    'node_modules/pino/browser.js'(exports, module) {
        'use strict';
        var format = require_quick_format_unescaped();
        module.exports = pino;
        var _console = pfGlobalThisOrFallback().console || {};
        var stdSerializers = {
            mapHttpRequest: mock,
            mapHttpResponse: mock,
            wrapRequestSerializer: passthrough,
            wrapResponseSerializer: passthrough,
            wrapErrorSerializer: passthrough,
            req: mock,
            res: mock,
            err: asErrValue,
        };
        function shouldSerialize(serialize, serializers) {
            if (Array.isArray(serialize)) {
                const hasToFilter = serialize.filter(function (k5) {
                    return k5 !== '!stdSerializers.err';
                });
                return hasToFilter;
            } else if (serialize === true) {
                return Object.keys(serializers);
            }
            return false;
        }
        function pino(opts) {
            opts = opts || {};
            opts.browser = opts.browser || {};
            const transmit2 = opts.browser.transmit;
            if (transmit2 && typeof transmit2.send !== 'function') {
                throw Error('pino: transmit option must have a send function');
            }
            const proto = opts.browser.write || _console;
            if (opts.browser.write) opts.browser.asObject = true;
            const serializers = opts.serializers || {};
            const serialize = shouldSerialize(opts.browser.serialize, serializers);
            let stdErrSerialize = opts.browser.serialize;
            if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf('!stdSerializers.err') > -1)
                stdErrSerialize = false;
            const levels = ['error', 'fatal', 'warn', 'info', 'debug', 'trace'];
            if (typeof proto === 'function') {
                proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
            }
            if (opts.enabled === false) opts.level = 'silent';
            const level = opts.level || 'info';
            const logger = Object.create(proto);
            if (!logger.log) logger.log = noop;
            Object.defineProperty(logger, 'levelVal', {
                get: getLevelVal,
            });
            Object.defineProperty(logger, 'level', {
                get: getLevel,
                set: setLevel,
            });
            const setOpts = {
                transmit: transmit2,
                serialize,
                asObject: opts.browser.asObject,
                levels,
                timestamp: getTimeFunction(opts),
            };
            logger.levels = pino.levels;
            logger.level = level;
            logger.setMaxListeners =
                logger.getMaxListeners =
                logger.emit =
                logger.addListener =
                logger.on =
                logger.prependListener =
                logger.once =
                logger.prependOnceListener =
                logger.removeListener =
                logger.removeAllListeners =
                logger.listeners =
                logger.listenerCount =
                logger.eventNames =
                logger.write =
                logger.flush =
                    noop;
            logger.serializers = serializers;
            logger._serialize = serialize;
            logger._stdErrSerialize = stdErrSerialize;
            logger.child = child;
            if (transmit2) logger._logEvent = createLogEventShape();
            function getLevelVal() {
                return this.level === 'silent' ? Infinity : this.levels.values[this.level];
            }
            function getLevel() {
                return this._level;
            }
            function setLevel(level2) {
                if (level2 !== 'silent' && !this.levels.values[level2]) {
                    throw Error('unknown level ' + level2);
                }
                this._level = level2;
                set2(setOpts, logger, 'error', 'log');
                set2(setOpts, logger, 'fatal', 'error');
                set2(setOpts, logger, 'warn', 'error');
                set2(setOpts, logger, 'info', 'log');
                set2(setOpts, logger, 'debug', 'log');
                set2(setOpts, logger, 'trace', 'log');
            }
            function child(bindings, childOptions) {
                if (!bindings) {
                    throw new Error('missing bindings for child Pino');
                }
                childOptions = childOptions || {};
                if (serialize && bindings.serializers) {
                    childOptions.serializers = bindings.serializers;
                }
                const childOptionsSerializers = childOptions.serializers;
                if (serialize && childOptionsSerializers) {
                    var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
                    var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
                    delete bindings.serializers;
                    applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
                }
                function Child(parent) {
                    this._childLevel = (parent._childLevel | 0) + 1;
                    this.error = bind(parent, bindings, 'error');
                    this.fatal = bind(parent, bindings, 'fatal');
                    this.warn = bind(parent, bindings, 'warn');
                    this.info = bind(parent, bindings, 'info');
                    this.debug = bind(parent, bindings, 'debug');
                    this.trace = bind(parent, bindings, 'trace');
                    if (childSerializers) {
                        this.serializers = childSerializers;
                        this._serialize = childSerialize;
                    }
                    if (transmit2) {
                        this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
                    }
                }
                Child.prototype = this;
                return new Child(this);
            }
            return logger;
        }
        pino.levels = {
            values: {
                fatal: 60,
                error: 50,
                warn: 40,
                info: 30,
                debug: 20,
                trace: 10,
            },
            labels: {
                10: 'trace',
                20: 'debug',
                30: 'info',
                40: 'warn',
                50: 'error',
                60: 'fatal',
            },
        };
        pino.stdSerializers = stdSerializers;
        pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
        function set2(opts, logger, level, fallback) {
            const proto = Object.getPrototypeOf(logger);
            logger[level] =
                logger.levelVal > logger.levels.values[level]
                    ? noop
                    : proto[level]
                      ? proto[level]
                      : _console[level] || _console[fallback] || noop;
            wrap(opts, logger, level);
        }
        function wrap(opts, logger, level) {
            if (!opts.transmit && logger[level] === noop) return;
            logger[level] = /* @__PURE__ */ (function (write) {
                return function LOG() {
                    const ts2 = opts.timestamp();
                    const args = new Array(arguments.length);
                    const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
                    for (var i4 = 0; i4 < args.length; i4++) args[i4] = arguments[i4];
                    if (opts.serialize && !opts.asObject) {
                        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
                    }
                    if (opts.asObject) write.call(proto, asObject(this, level, args, ts2));
                    else write.apply(proto, args);
                    if (opts.transmit) {
                        const transmitLevel = opts.transmit.level || logger.level;
                        const transmitValue = pino.levels.values[transmitLevel];
                        const methodValue = pino.levels.values[level];
                        if (methodValue < transmitValue) return;
                        transmit(
                            this,
                            {
                                ts: ts2,
                                methodLevel: level,
                                methodValue,
                                transmitLevel,
                                transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                                send: opts.transmit.send,
                                val: logger.levelVal,
                            },
                            args
                        );
                    }
                };
            })(logger[level]);
        }
        function asObject(logger, level, args, ts2) {
            if (logger._serialize)
                applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
            const argsCloned = args.slice();
            let msg = argsCloned[0];
            const o3 = {};
            if (ts2) {
                o3.time = ts2;
            }
            o3.level = pino.levels.values[level];
            let lvl = (logger._childLevel | 0) + 1;
            if (lvl < 1) lvl = 1;
            if (msg !== null && typeof msg === 'object') {
                while (lvl-- && typeof argsCloned[0] === 'object') {
                    Object.assign(o3, argsCloned.shift());
                }
                msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
            } else if (typeof msg === 'string') msg = format(argsCloned.shift(), argsCloned);
            if (msg !== void 0) o3.msg = msg;
            return o3;
        }
        function applySerializers(args, serialize, serializers, stdErrSerialize) {
            for (const i4 in args) {
                if (stdErrSerialize && args[i4] instanceof Error) {
                    args[i4] = pino.stdSerializers.err(args[i4]);
                } else if (typeof args[i4] === 'object' && !Array.isArray(args[i4])) {
                    for (const k5 in args[i4]) {
                        if (serialize && serialize.indexOf(k5) > -1 && k5 in serializers) {
                            args[i4][k5] = serializers[k5](args[i4][k5]);
                        }
                    }
                }
            }
        }
        function bind(parent, bindings, level) {
            return function () {
                const args = new Array(1 + arguments.length);
                args[0] = bindings;
                for (var i4 = 1; i4 < args.length; i4++) {
                    args[i4] = arguments[i4 - 1];
                }
                return parent[level].apply(this, args);
            };
        }
        function transmit(logger, opts, args) {
            const send = opts.send;
            const ts2 = opts.ts;
            const methodLevel = opts.methodLevel;
            const methodValue = opts.methodValue;
            const val = opts.val;
            const bindings = logger._logEvent.bindings;
            applySerializers(
                args,
                logger._serialize || Object.keys(logger.serializers),
                logger.serializers,
                logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
            );
            logger._logEvent.ts = ts2;
            logger._logEvent.messages = args.filter(function (arg) {
                return bindings.indexOf(arg) === -1;
            });
            logger._logEvent.level.label = methodLevel;
            logger._logEvent.level.value = methodValue;
            send(methodLevel, logger._logEvent, val);
            logger._logEvent = createLogEventShape(bindings);
        }
        function createLogEventShape(bindings) {
            return {
                ts: 0,
                messages: [],
                bindings: bindings || [],
                level: { label: '', value: 0 },
            };
        }
        function asErrValue(err) {
            const obj = {
                type: err.constructor.name,
                msg: err.message,
                stack: err.stack,
            };
            for (const key in err) {
                if (obj[key] === void 0) {
                    obj[key] = err[key];
                }
            }
            return obj;
        }
        function getTimeFunction(opts) {
            if (typeof opts.timestamp === 'function') {
                return opts.timestamp;
            }
            if (opts.timestamp === false) {
                return nullTime;
            }
            return epochTime;
        }
        function mock() {
            return {};
        }
        function passthrough(a5) {
            return a5;
        }
        function noop() {}
        function nullTime() {
            return false;
        }
        function epochTime() {
            return Date.now();
        }
        function unixTime() {
            return Math.round(Date.now() / 1e3);
        }
        function isoTime() {
            return new Date(Date.now()).toISOString();
        }
        function pfGlobalThisOrFallback() {
            function defd(o3) {
                return typeof o3 !== 'undefined' && o3;
            }
            try {
                if (typeof globalThis !== 'undefined') return globalThis;
                Object.defineProperty(Object.prototype, 'globalThis', {
                    get: function () {
                        delete Object.prototype.globalThis;
                        return (this.globalThis = this);
                    },
                    configurable: true,
                });
                return globalThis;
            } catch (e3) {
                return defd(self) || defd(window) || defd(this) || {};
            }
        }
    },
});

// node_modules/@walletconnect/logger/dist/cjs/constants.js
var require_constants3 = __commonJS({
    'node_modules/@walletconnect/logger/dist/cjs/constants.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0;
        exports.PINO_LOGGER_DEFAULTS = {
            level: 'info',
        };
        exports.PINO_CUSTOM_CONTEXT_KEY = 'custom_context';
    },
});

// node_modules/@walletconnect/logger/dist/cjs/utils.js
var require_utils4 = __commonJS({
    'node_modules/@walletconnect/logger/dist/cjs/utils.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.generateChildLogger =
            exports.formatChildLoggerContext =
            exports.getLoggerContext =
            exports.setBrowserLoggerContext =
            exports.getBrowserLoggerContext =
            exports.getDefaultLoggerOptions =
                void 0;
        var constants_1 = require_constants3();
        function getDefaultLoggerOptions(opts) {
            return Object.assign(Object.assign({}, opts), {
                level:
                    (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level,
            });
        }
        exports.getDefaultLoggerOptions = getDefaultLoggerOptions;
        function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
            return logger[customContextKey] || '';
        }
        exports.getBrowserLoggerContext = getBrowserLoggerContext;
        function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
            logger[customContextKey] = context;
            return logger;
        }
        exports.setBrowserLoggerContext = setBrowserLoggerContext;
        function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
            let context = '';
            if (typeof logger.bindings === 'undefined') {
                context = getBrowserLoggerContext(logger, customContextKey);
            } else {
                context = logger.bindings().context || '';
            }
            return context;
        }
        exports.getLoggerContext = getLoggerContext;
        function formatChildLoggerContext(
            logger,
            childContext,
            customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY
        ) {
            const parentContext = getLoggerContext(logger, customContextKey);
            const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
            return context;
        }
        exports.formatChildLoggerContext = formatChildLoggerContext;
        function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
            const context = formatChildLoggerContext(logger, childContext, customContextKey);
            const child = logger.child({ context });
            return setBrowserLoggerContext(child, context, customContextKey);
        }
        exports.generateChildLogger = generateChildLogger;
    },
});

// node_modules/@walletconnect/logger/dist/cjs/index.js
var require_cjs7 = __commonJS({
    'node_modules/@walletconnect/logger/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.pino = void 0;
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        var pino_1 = tslib_1.__importDefault(require_browser2());
        Object.defineProperty(exports, 'pino', {
            enumerable: true,
            get: function () {
                return pino_1.default;
            },
        });
        tslib_1.__exportStar(require_constants3(), exports);
        tslib_1.__exportStar(require_utils4(), exports);
    },
});

// node_modules/@stablelib/random/lib/source/browser.js
var require_browser3 = __commonJS({
    'node_modules/@stablelib/random/lib/source/browser.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.BrowserRandomSource = void 0;
        var QUOTA = 65536;
        var BrowserRandomSource = class {
            constructor() {
                this.isAvailable = false;
                this.isInstantiated = false;
                const browserCrypto = typeof self !== 'undefined' ? self.crypto || self.msCrypto : null;
                if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
                    this._crypto = browserCrypto;
                    this.isAvailable = true;
                    this.isInstantiated = true;
                }
            }
            randomBytes(length2) {
                if (!this.isAvailable || !this._crypto) {
                    throw new Error('Browser random byte generator is not available.');
                }
                const out = new Uint8Array(length2);
                for (let i4 = 0; i4 < out.length; i4 += QUOTA) {
                    this._crypto.getRandomValues(out.subarray(i4, i4 + Math.min(out.length - i4, QUOTA)));
                }
                return out;
            }
        };
        exports.BrowserRandomSource = BrowserRandomSource;
    },
});

// node_modules/@stablelib/wipe/lib/wipe.js
var require_wipe = __commonJS({
    'node_modules/@stablelib/wipe/lib/wipe.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function wipe(array) {
            for (var i4 = 0; i4 < array.length; i4++) {
                array[i4] = 0;
            }
            return array;
        }
        exports.wipe = wipe;
    },
});

// browser-external:crypto
var require_crypto = __commonJS({
    'browser-external:crypto'(exports, module) {
        module.exports = Object.create(
            new Proxy(
                {},
                {
                    get(_6, key) {
                        if (key !== '__esModule' && key !== '__proto__' && key !== 'constructor' && key !== 'splice') {
                            console.warn(
                                `Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`
                            );
                        }
                    },
                }
            )
        );
    },
});

// node_modules/@stablelib/random/lib/source/node.js
var require_node = __commonJS({
    'node_modules/@stablelib/random/lib/source/node.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.NodeRandomSource = void 0;
        var wipe_1 = require_wipe();
        var NodeRandomSource = class {
            constructor() {
                this.isAvailable = false;
                this.isInstantiated = false;
                if (typeof __require !== 'undefined') {
                    const nodeCrypto = require_crypto();
                    if (nodeCrypto && nodeCrypto.randomBytes) {
                        this._crypto = nodeCrypto;
                        this.isAvailable = true;
                        this.isInstantiated = true;
                    }
                }
            }
            randomBytes(length2) {
                if (!this.isAvailable || !this._crypto) {
                    throw new Error('Node.js random byte generator is not available.');
                }
                let buffer = this._crypto.randomBytes(length2);
                if (buffer.length !== length2) {
                    throw new Error('NodeRandomSource: got fewer bytes than requested');
                }
                const out = new Uint8Array(length2);
                for (let i4 = 0; i4 < out.length; i4++) {
                    out[i4] = buffer[i4];
                }
                (0, wipe_1.wipe)(buffer);
                return out;
            }
        };
        exports.NodeRandomSource = NodeRandomSource;
    },
});

// node_modules/@stablelib/random/lib/source/system.js
var require_system = __commonJS({
    'node_modules/@stablelib/random/lib/source/system.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.SystemRandomSource = void 0;
        var browser_1 = require_browser3();
        var node_1 = require_node();
        var SystemRandomSource = class {
            constructor() {
                this.isAvailable = false;
                this.name = '';
                this._source = new browser_1.BrowserRandomSource();
                if (this._source.isAvailable) {
                    this.isAvailable = true;
                    this.name = 'Browser';
                    return;
                }
                this._source = new node_1.NodeRandomSource();
                if (this._source.isAvailable) {
                    this.isAvailable = true;
                    this.name = 'Node';
                    return;
                }
            }
            randomBytes(length2) {
                if (!this.isAvailable) {
                    throw new Error('System random byte generator is not available.');
                }
                return this._source.randomBytes(length2);
            }
        };
        exports.SystemRandomSource = SystemRandomSource;
    },
});

// node_modules/@stablelib/int/lib/int.js
var require_int = __commonJS({
    'node_modules/@stablelib/int/lib/int.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function imulShim(a5, b5) {
            var ah = (a5 >>> 16) & 65535,
                al = a5 & 65535;
            var bh = (b5 >>> 16) & 65535,
                bl = b5 & 65535;
            return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0;
        }
        exports.mul = Math.imul || imulShim;
        function add(a5, b5) {
            return (a5 + b5) | 0;
        }
        exports.add = add;
        function sub(a5, b5) {
            return (a5 - b5) | 0;
        }
        exports.sub = sub;
        function rotl(x5, n3) {
            return (x5 << n3) | (x5 >>> (32 - n3));
        }
        exports.rotl = rotl;
        function rotr(x5, n3) {
            return (x5 << (32 - n3)) | (x5 >>> n3);
        }
        exports.rotr = rotr;
        function isIntegerShim(n3) {
            return typeof n3 === 'number' && isFinite(n3) && Math.floor(n3) === n3;
        }
        exports.isInteger = Number.isInteger || isIntegerShim;
        exports.MAX_SAFE_INTEGER = 9007199254740991;
        exports.isSafeInteger = function (n3) {
            return exports.isInteger(n3) && n3 >= -exports.MAX_SAFE_INTEGER && n3 <= exports.MAX_SAFE_INTEGER;
        };
    },
});

// node_modules/@stablelib/binary/lib/binary.js
var require_binary = __commonJS({
    'node_modules/@stablelib/binary/lib/binary.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var int_1 = require_int();
        function readInt16BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (((array[offset + 0] << 8) | array[offset + 1]) << 16) >> 16;
        }
        exports.readInt16BE = readInt16BE;
        function readUint16BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return ((array[offset + 0] << 8) | array[offset + 1]) >>> 0;
        }
        exports.readUint16BE = readUint16BE;
        function readInt16LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (((array[offset + 1] << 8) | array[offset]) << 16) >> 16;
        }
        exports.readInt16LE = readInt16LE;
        function readUint16LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return ((array[offset + 1] << 8) | array[offset]) >>> 0;
        }
        exports.readUint16LE = readUint16LE;
        function writeUint16BE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(2);
            }
            if (offset === void 0) {
                offset = 0;
            }
            out[offset + 0] = value >>> 8;
            out[offset + 1] = value >>> 0;
            return out;
        }
        exports.writeUint16BE = writeUint16BE;
        exports.writeInt16BE = writeUint16BE;
        function writeUint16LE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(2);
            }
            if (offset === void 0) {
                offset = 0;
            }
            out[offset + 0] = value >>> 0;
            out[offset + 1] = value >>> 8;
            return out;
        }
        exports.writeUint16LE = writeUint16LE;
        exports.writeInt16LE = writeUint16LE;
        function readInt32BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (array[offset] << 24) | (array[offset + 1] << 16) | (array[offset + 2] << 8) | array[offset + 3];
        }
        exports.readInt32BE = readInt32BE;
        function readUint32BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (
                ((array[offset] << 24) | (array[offset + 1] << 16) | (array[offset + 2] << 8) | array[offset + 3]) >>> 0
            );
        }
        exports.readUint32BE = readUint32BE;
        function readInt32LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (array[offset + 3] << 24) | (array[offset + 2] << 16) | (array[offset + 1] << 8) | array[offset];
        }
        exports.readInt32LE = readInt32LE;
        function readUint32LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            return (
                ((array[offset + 3] << 24) | (array[offset + 2] << 16) | (array[offset + 1] << 8) | array[offset]) >>> 0
            );
        }
        exports.readUint32LE = readUint32LE;
        function writeUint32BE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(4);
            }
            if (offset === void 0) {
                offset = 0;
            }
            out[offset + 0] = value >>> 24;
            out[offset + 1] = value >>> 16;
            out[offset + 2] = value >>> 8;
            out[offset + 3] = value >>> 0;
            return out;
        }
        exports.writeUint32BE = writeUint32BE;
        exports.writeInt32BE = writeUint32BE;
        function writeUint32LE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(4);
            }
            if (offset === void 0) {
                offset = 0;
            }
            out[offset + 0] = value >>> 0;
            out[offset + 1] = value >>> 8;
            out[offset + 2] = value >>> 16;
            out[offset + 3] = value >>> 24;
            return out;
        }
        exports.writeUint32LE = writeUint32LE;
        exports.writeInt32LE = writeUint32LE;
        function readInt64BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var hi = readInt32BE(array, offset);
            var lo = readInt32BE(array, offset + 4);
            return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
        }
        exports.readInt64BE = readInt64BE;
        function readUint64BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var hi = readUint32BE(array, offset);
            var lo = readUint32BE(array, offset + 4);
            return hi * 4294967296 + lo;
        }
        exports.readUint64BE = readUint64BE;
        function readInt64LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var lo = readInt32LE(array, offset);
            var hi = readInt32LE(array, offset + 4);
            return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
        }
        exports.readInt64LE = readInt64LE;
        function readUint64LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var lo = readUint32LE(array, offset);
            var hi = readUint32LE(array, offset + 4);
            return hi * 4294967296 + lo;
        }
        exports.readUint64LE = readUint64LE;
        function writeUint64BE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            writeUint32BE((value / 4294967296) >>> 0, out, offset);
            writeUint32BE(value >>> 0, out, offset + 4);
            return out;
        }
        exports.writeUint64BE = writeUint64BE;
        exports.writeInt64BE = writeUint64BE;
        function writeUint64LE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            writeUint32LE(value >>> 0, out, offset);
            writeUint32LE((value / 4294967296) >>> 0, out, offset + 4);
            return out;
        }
        exports.writeUint64LE = writeUint64LE;
        exports.writeInt64LE = writeUint64LE;
        function readUintBE(bitLength, array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            if (bitLength % 8 !== 0) {
                throw new Error('readUintBE supports only bitLengths divisible by 8');
            }
            if (bitLength / 8 > array.length - offset) {
                throw new Error('readUintBE: array is too short for the given bitLength');
            }
            var result = 0;
            var mul = 1;
            for (var i4 = bitLength / 8 + offset - 1; i4 >= offset; i4--) {
                result += array[i4] * mul;
                mul *= 256;
            }
            return result;
        }
        exports.readUintBE = readUintBE;
        function readUintLE(bitLength, array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            if (bitLength % 8 !== 0) {
                throw new Error('readUintLE supports only bitLengths divisible by 8');
            }
            if (bitLength / 8 > array.length - offset) {
                throw new Error('readUintLE: array is too short for the given bitLength');
            }
            var result = 0;
            var mul = 1;
            for (var i4 = offset; i4 < offset + bitLength / 8; i4++) {
                result += array[i4] * mul;
                mul *= 256;
            }
            return result;
        }
        exports.readUintLE = readUintLE;
        function writeUintBE(bitLength, value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(bitLength / 8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            if (bitLength % 8 !== 0) {
                throw new Error('writeUintBE supports only bitLengths divisible by 8');
            }
            if (!int_1.isSafeInteger(value)) {
                throw new Error('writeUintBE value must be an integer');
            }
            var div = 1;
            for (var i4 = bitLength / 8 + offset - 1; i4 >= offset; i4--) {
                out[i4] = (value / div) & 255;
                div *= 256;
            }
            return out;
        }
        exports.writeUintBE = writeUintBE;
        function writeUintLE(bitLength, value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(bitLength / 8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            if (bitLength % 8 !== 0) {
                throw new Error('writeUintLE supports only bitLengths divisible by 8');
            }
            if (!int_1.isSafeInteger(value)) {
                throw new Error('writeUintLE value must be an integer');
            }
            var div = 1;
            for (var i4 = offset; i4 < offset + bitLength / 8; i4++) {
                out[i4] = (value / div) & 255;
                div *= 256;
            }
            return out;
        }
        exports.writeUintLE = writeUintLE;
        function readFloat32BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
            return view.getFloat32(offset);
        }
        exports.readFloat32BE = readFloat32BE;
        function readFloat32LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
            return view.getFloat32(offset, true);
        }
        exports.readFloat32LE = readFloat32LE;
        function readFloat64BE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
            return view.getFloat64(offset);
        }
        exports.readFloat64BE = readFloat64BE;
        function readFloat64LE(array, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
            return view.getFloat64(offset, true);
        }
        exports.readFloat64LE = readFloat64LE;
        function writeFloat32BE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(4);
            }
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
            view.setFloat32(offset, value);
            return out;
        }
        exports.writeFloat32BE = writeFloat32BE;
        function writeFloat32LE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(4);
            }
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
            view.setFloat32(offset, value, true);
            return out;
        }
        exports.writeFloat32LE = writeFloat32LE;
        function writeFloat64BE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
            view.setFloat64(offset, value);
            return out;
        }
        exports.writeFloat64BE = writeFloat64BE;
        function writeFloat64LE(value, out, offset) {
            if (out === void 0) {
                out = new Uint8Array(8);
            }
            if (offset === void 0) {
                offset = 0;
            }
            var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
            view.setFloat64(offset, value, true);
            return out;
        }
        exports.writeFloat64LE = writeFloat64LE;
    },
});

// node_modules/@stablelib/random/lib/random.js
var require_random = __commonJS({
    'node_modules/@stablelib/random/lib/random.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.randomStringForEntropy =
            exports.randomString =
            exports.randomUint32 =
            exports.randomBytes =
            exports.defaultRandomSource =
                void 0;
        var system_1 = require_system();
        var binary_1 = require_binary();
        var wipe_1 = require_wipe();
        exports.defaultRandomSource = new system_1.SystemRandomSource();
        function randomBytes2(length2, prng = exports.defaultRandomSource) {
            return prng.randomBytes(length2);
        }
        exports.randomBytes = randomBytes2;
        function randomUint32(prng = exports.defaultRandomSource) {
            const buf = randomBytes2(4, prng);
            const result = (0, binary_1.readUint32LE)(buf);
            (0, wipe_1.wipe)(buf);
            return result;
        }
        exports.randomUint32 = randomUint32;
        var ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        function randomString(length2, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
            if (charset.length < 2) {
                throw new Error('randomString charset is too short');
            }
            if (charset.length > 256) {
                throw new Error('randomString charset is too long');
            }
            let out = '';
            const charsLen = charset.length;
            const maxByte = 256 - (256 % charsLen);
            while (length2 > 0) {
                const buf = randomBytes2(Math.ceil((length2 * 256) / maxByte), prng);
                for (let i4 = 0; i4 < buf.length && length2 > 0; i4++) {
                    const randomByte = buf[i4];
                    if (randomByte < maxByte) {
                        out += charset.charAt(randomByte % charsLen);
                        length2--;
                    }
                }
                (0, wipe_1.wipe)(buf);
            }
            return out;
        }
        exports.randomString = randomString;
        function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
            const length2 = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
            return randomString(length2, charset, prng);
        }
        exports.randomStringForEntropy = randomStringForEntropy;
    },
});

// node_modules/@stablelib/sha512/lib/sha512.js
var require_sha512 = __commonJS({
    'node_modules/@stablelib/sha512/lib/sha512.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var binary_1 = require_binary();
        var wipe_1 = require_wipe();
        exports.DIGEST_LENGTH = 64;
        exports.BLOCK_SIZE = 128;
        var SHA512 =
            /** @class */
            (function () {
                function SHA5122() {
                    this.digestLength = exports.DIGEST_LENGTH;
                    this.blockSize = exports.BLOCK_SIZE;
                    this._stateHi = new Int32Array(8);
                    this._stateLo = new Int32Array(8);
                    this._tempHi = new Int32Array(16);
                    this._tempLo = new Int32Array(16);
                    this._buffer = new Uint8Array(256);
                    this._bufferLength = 0;
                    this._bytesHashed = 0;
                    this._finished = false;
                    this.reset();
                }
                SHA5122.prototype._initState = function () {
                    this._stateHi[0] = 1779033703;
                    this._stateHi[1] = 3144134277;
                    this._stateHi[2] = 1013904242;
                    this._stateHi[3] = 2773480762;
                    this._stateHi[4] = 1359893119;
                    this._stateHi[5] = 2600822924;
                    this._stateHi[6] = 528734635;
                    this._stateHi[7] = 1541459225;
                    this._stateLo[0] = 4089235720;
                    this._stateLo[1] = 2227873595;
                    this._stateLo[2] = 4271175723;
                    this._stateLo[3] = 1595750129;
                    this._stateLo[4] = 2917565137;
                    this._stateLo[5] = 725511199;
                    this._stateLo[6] = 4215389547;
                    this._stateLo[7] = 327033209;
                };
                SHA5122.prototype.reset = function () {
                    this._initState();
                    this._bufferLength = 0;
                    this._bytesHashed = 0;
                    this._finished = false;
                    return this;
                };
                SHA5122.prototype.clean = function () {
                    wipe_1.wipe(this._buffer);
                    wipe_1.wipe(this._tempHi);
                    wipe_1.wipe(this._tempLo);
                    this.reset();
                };
                SHA5122.prototype.update = function (data, dataLength) {
                    if (dataLength === void 0) {
                        dataLength = data.length;
                    }
                    if (this._finished) {
                        throw new Error("SHA512: can't update because hash was finished.");
                    }
                    var dataPos = 0;
                    this._bytesHashed += dataLength;
                    if (this._bufferLength > 0) {
                        while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
                            this._buffer[this._bufferLength++] = data[dataPos++];
                            dataLength--;
                        }
                        if (this._bufferLength === this.blockSize) {
                            hashBlocks(
                                this._tempHi,
                                this._tempLo,
                                this._stateHi,
                                this._stateLo,
                                this._buffer,
                                0,
                                this.blockSize
                            );
                            this._bufferLength = 0;
                        }
                    }
                    if (dataLength >= this.blockSize) {
                        dataPos = hashBlocks(
                            this._tempHi,
                            this._tempLo,
                            this._stateHi,
                            this._stateLo,
                            data,
                            dataPos,
                            dataLength
                        );
                        dataLength %= this.blockSize;
                    }
                    while (dataLength > 0) {
                        this._buffer[this._bufferLength++] = data[dataPos++];
                        dataLength--;
                    }
                    return this;
                };
                SHA5122.prototype.finish = function (out) {
                    if (!this._finished) {
                        var bytesHashed = this._bytesHashed;
                        var left = this._bufferLength;
                        var bitLenHi = (bytesHashed / 536870912) | 0;
                        var bitLenLo = bytesHashed << 3;
                        var padLength = bytesHashed % 128 < 112 ? 128 : 256;
                        this._buffer[left] = 128;
                        for (var i4 = left + 1; i4 < padLength - 8; i4++) {
                            this._buffer[i4] = 0;
                        }
                        binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
                        binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
                        hashBlocks(
                            this._tempHi,
                            this._tempLo,
                            this._stateHi,
                            this._stateLo,
                            this._buffer,
                            0,
                            padLength
                        );
                        this._finished = true;
                    }
                    for (var i4 = 0; i4 < this.digestLength / 8; i4++) {
                        binary_1.writeUint32BE(this._stateHi[i4], out, i4 * 8);
                        binary_1.writeUint32BE(this._stateLo[i4], out, i4 * 8 + 4);
                    }
                    return this;
                };
                SHA5122.prototype.digest = function () {
                    var out = new Uint8Array(this.digestLength);
                    this.finish(out);
                    return out;
                };
                SHA5122.prototype.saveState = function () {
                    if (this._finished) {
                        throw new Error('SHA256: cannot save finished state');
                    }
                    return {
                        stateHi: new Int32Array(this._stateHi),
                        stateLo: new Int32Array(this._stateLo),
                        buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
                        bufferLength: this._bufferLength,
                        bytesHashed: this._bytesHashed,
                    };
                };
                SHA5122.prototype.restoreState = function (savedState) {
                    this._stateHi.set(savedState.stateHi);
                    this._stateLo.set(savedState.stateLo);
                    this._bufferLength = savedState.bufferLength;
                    if (savedState.buffer) {
                        this._buffer.set(savedState.buffer);
                    }
                    this._bytesHashed = savedState.bytesHashed;
                    this._finished = false;
                    return this;
                };
                SHA5122.prototype.cleanSavedState = function (savedState) {
                    wipe_1.wipe(savedState.stateHi);
                    wipe_1.wipe(savedState.stateLo);
                    if (savedState.buffer) {
                        wipe_1.wipe(savedState.buffer);
                    }
                    savedState.bufferLength = 0;
                    savedState.bytesHashed = 0;
                };
                return SHA5122;
            })();
        exports.SHA512 = SHA512;
        var K3 = new Int32Array([
            1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163,
            4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
            310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206,
            991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
            264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692,
            3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
            3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
            168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
            1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921,
            1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
            3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616,
            1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
            1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452,
            2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
            3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271,
            4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
            685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470,
            3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ]);
        function hashBlocks(wh, wl, hh, hl, m4, pos, len) {
            var ah0 = hh[0],
                ah1 = hh[1],
                ah2 = hh[2],
                ah3 = hh[3],
                ah4 = hh[4],
                ah5 = hh[5],
                ah6 = hh[6],
                ah7 = hh[7],
                al0 = hl[0],
                al1 = hl[1],
                al2 = hl[2],
                al3 = hl[3],
                al4 = hl[4],
                al5 = hl[5],
                al6 = hl[6],
                al7 = hl[7];
            var h6, l4;
            var th, tl;
            var a5, b5, c5, d4;
            while (len >= 128) {
                for (var i4 = 0; i4 < 16; i4++) {
                    var j5 = 8 * i4 + pos;
                    wh[i4] = binary_1.readUint32BE(m4, j5);
                    wl[i4] = binary_1.readUint32BE(m4, j5 + 4);
                }
                for (var i4 = 0; i4 < 80; i4++) {
                    var bh0 = ah0;
                    var bh1 = ah1;
                    var bh2 = ah2;
                    var bh3 = ah3;
                    var bh4 = ah4;
                    var bh5 = ah5;
                    var bh6 = ah6;
                    var bh7 = ah7;
                    var bl0 = al0;
                    var bl1 = al1;
                    var bl2 = al2;
                    var bl3 = al3;
                    var bl4 = al4;
                    var bl5 = al5;
                    var bl6 = al6;
                    var bl7 = al7;
                    h6 = ah7;
                    l4 = al7;
                    a5 = l4 & 65535;
                    b5 = l4 >>> 16;
                    c5 = h6 & 65535;
                    d4 = h6 >>> 16;
                    h6 =
                        ((ah4 >>> 14) | (al4 << (32 - 14))) ^
                        ((ah4 >>> 18) | (al4 << (32 - 18))) ^
                        ((al4 >>> (41 - 32)) | (ah4 << (32 - (41 - 32))));
                    l4 =
                        ((al4 >>> 14) | (ah4 << (32 - 14))) ^
                        ((al4 >>> 18) | (ah4 << (32 - 18))) ^
                        ((ah4 >>> (41 - 32)) | (al4 << (32 - (41 - 32))));
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    h6 = (ah4 & ah5) ^ (~ah4 & ah6);
                    l4 = (al4 & al5) ^ (~al4 & al6);
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    h6 = K3[i4 * 2];
                    l4 = K3[i4 * 2 + 1];
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    h6 = wh[i4 % 16];
                    l4 = wl[i4 % 16];
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    b5 += a5 >>> 16;
                    c5 += b5 >>> 16;
                    d4 += c5 >>> 16;
                    th = (c5 & 65535) | (d4 << 16);
                    tl = (a5 & 65535) | (b5 << 16);
                    h6 = th;
                    l4 = tl;
                    a5 = l4 & 65535;
                    b5 = l4 >>> 16;
                    c5 = h6 & 65535;
                    d4 = h6 >>> 16;
                    h6 =
                        ((ah0 >>> 28) | (al0 << (32 - 28))) ^
                        ((al0 >>> (34 - 32)) | (ah0 << (32 - (34 - 32)))) ^
                        ((al0 >>> (39 - 32)) | (ah0 << (32 - (39 - 32))));
                    l4 =
                        ((al0 >>> 28) | (ah0 << (32 - 28))) ^
                        ((ah0 >>> (34 - 32)) | (al0 << (32 - (34 - 32)))) ^
                        ((ah0 >>> (39 - 32)) | (al0 << (32 - (39 - 32))));
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    h6 = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
                    l4 = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    b5 += a5 >>> 16;
                    c5 += b5 >>> 16;
                    d4 += c5 >>> 16;
                    bh7 = (c5 & 65535) | (d4 << 16);
                    bl7 = (a5 & 65535) | (b5 << 16);
                    h6 = bh3;
                    l4 = bl3;
                    a5 = l4 & 65535;
                    b5 = l4 >>> 16;
                    c5 = h6 & 65535;
                    d4 = h6 >>> 16;
                    h6 = th;
                    l4 = tl;
                    a5 += l4 & 65535;
                    b5 += l4 >>> 16;
                    c5 += h6 & 65535;
                    d4 += h6 >>> 16;
                    b5 += a5 >>> 16;
                    c5 += b5 >>> 16;
                    d4 += c5 >>> 16;
                    bh3 = (c5 & 65535) | (d4 << 16);
                    bl3 = (a5 & 65535) | (b5 << 16);
                    ah1 = bh0;
                    ah2 = bh1;
                    ah3 = bh2;
                    ah4 = bh3;
                    ah5 = bh4;
                    ah6 = bh5;
                    ah7 = bh6;
                    ah0 = bh7;
                    al1 = bl0;
                    al2 = bl1;
                    al3 = bl2;
                    al4 = bl3;
                    al5 = bl4;
                    al6 = bl5;
                    al7 = bl6;
                    al0 = bl7;
                    if (i4 % 16 === 15) {
                        for (var j5 = 0; j5 < 16; j5++) {
                            h6 = wh[j5];
                            l4 = wl[j5];
                            a5 = l4 & 65535;
                            b5 = l4 >>> 16;
                            c5 = h6 & 65535;
                            d4 = h6 >>> 16;
                            h6 = wh[(j5 + 9) % 16];
                            l4 = wl[(j5 + 9) % 16];
                            a5 += l4 & 65535;
                            b5 += l4 >>> 16;
                            c5 += h6 & 65535;
                            d4 += h6 >>> 16;
                            th = wh[(j5 + 1) % 16];
                            tl = wl[(j5 + 1) % 16];
                            h6 = ((th >>> 1) | (tl << (32 - 1))) ^ ((th >>> 8) | (tl << (32 - 8))) ^ (th >>> 7);
                            l4 =
                                ((tl >>> 1) | (th << (32 - 1))) ^
                                ((tl >>> 8) | (th << (32 - 8))) ^
                                ((tl >>> 7) | (th << (32 - 7)));
                            a5 += l4 & 65535;
                            b5 += l4 >>> 16;
                            c5 += h6 & 65535;
                            d4 += h6 >>> 16;
                            th = wh[(j5 + 14) % 16];
                            tl = wl[(j5 + 14) % 16];
                            h6 =
                                ((th >>> 19) | (tl << (32 - 19))) ^
                                ((tl >>> (61 - 32)) | (th << (32 - (61 - 32)))) ^
                                (th >>> 6);
                            l4 =
                                ((tl >>> 19) | (th << (32 - 19))) ^
                                ((th >>> (61 - 32)) | (tl << (32 - (61 - 32)))) ^
                                ((tl >>> 6) | (th << (32 - 6)));
                            a5 += l4 & 65535;
                            b5 += l4 >>> 16;
                            c5 += h6 & 65535;
                            d4 += h6 >>> 16;
                            b5 += a5 >>> 16;
                            c5 += b5 >>> 16;
                            d4 += c5 >>> 16;
                            wh[j5] = (c5 & 65535) | (d4 << 16);
                            wl[j5] = (a5 & 65535) | (b5 << 16);
                        }
                    }
                }
                h6 = ah0;
                l4 = al0;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[0];
                l4 = hl[0];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[0] = ah0 = (c5 & 65535) | (d4 << 16);
                hl[0] = al0 = (a5 & 65535) | (b5 << 16);
                h6 = ah1;
                l4 = al1;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[1];
                l4 = hl[1];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[1] = ah1 = (c5 & 65535) | (d4 << 16);
                hl[1] = al1 = (a5 & 65535) | (b5 << 16);
                h6 = ah2;
                l4 = al2;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[2];
                l4 = hl[2];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[2] = ah2 = (c5 & 65535) | (d4 << 16);
                hl[2] = al2 = (a5 & 65535) | (b5 << 16);
                h6 = ah3;
                l4 = al3;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[3];
                l4 = hl[3];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[3] = ah3 = (c5 & 65535) | (d4 << 16);
                hl[3] = al3 = (a5 & 65535) | (b5 << 16);
                h6 = ah4;
                l4 = al4;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[4];
                l4 = hl[4];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[4] = ah4 = (c5 & 65535) | (d4 << 16);
                hl[4] = al4 = (a5 & 65535) | (b5 << 16);
                h6 = ah5;
                l4 = al5;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[5];
                l4 = hl[5];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[5] = ah5 = (c5 & 65535) | (d4 << 16);
                hl[5] = al5 = (a5 & 65535) | (b5 << 16);
                h6 = ah6;
                l4 = al6;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[6];
                l4 = hl[6];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[6] = ah6 = (c5 & 65535) | (d4 << 16);
                hl[6] = al6 = (a5 & 65535) | (b5 << 16);
                h6 = ah7;
                l4 = al7;
                a5 = l4 & 65535;
                b5 = l4 >>> 16;
                c5 = h6 & 65535;
                d4 = h6 >>> 16;
                h6 = hh[7];
                l4 = hl[7];
                a5 += l4 & 65535;
                b5 += l4 >>> 16;
                c5 += h6 & 65535;
                d4 += h6 >>> 16;
                b5 += a5 >>> 16;
                c5 += b5 >>> 16;
                d4 += c5 >>> 16;
                hh[7] = ah7 = (c5 & 65535) | (d4 << 16);
                hl[7] = al7 = (a5 & 65535) | (b5 << 16);
                pos += 128;
                len -= 128;
            }
            return pos;
        }
        function hash(data) {
            var h6 = new SHA512();
            h6.update(data);
            var digest2 = h6.digest();
            h6.clean();
            return digest2;
        }
        exports.hash = hash;
    },
});

// node_modules/@stablelib/ed25519/lib/ed25519.js
var require_ed25519 = __commonJS({
    'node_modules/@stablelib/ed25519/lib/ed25519.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.convertSecretKeyToX25519 =
            exports.convertPublicKeyToX25519 =
            exports.verify =
            exports.sign =
            exports.extractPublicKeyFromSecretKey =
            exports.generateKeyPair =
            exports.generateKeyPairFromSeed =
            exports.SEED_LENGTH =
            exports.SECRET_KEY_LENGTH =
            exports.PUBLIC_KEY_LENGTH =
            exports.SIGNATURE_LENGTH =
                void 0;
        var random_1 = require_random();
        var sha512_1 = require_sha512();
        var wipe_1 = require_wipe();
        exports.SIGNATURE_LENGTH = 64;
        exports.PUBLIC_KEY_LENGTH = 32;
        exports.SECRET_KEY_LENGTH = 64;
        exports.SEED_LENGTH = 32;
        function gf(init) {
            const r3 = new Float64Array(16);
            if (init) {
                for (let i4 = 0; i4 < init.length; i4++) {
                    r3[i4] = init[i4];
                }
            }
            return r3;
        }
        var _9 = new Uint8Array(32);
        _9[0] = 9;
        var gf0 = gf();
        var gf1 = gf([1]);
        var D7 = gf([
            30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995,
        ]);
        var D22 = gf([
            61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222,
        ]);
        var X5 = gf([
            54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035,
            8553,
        ]);
        var Y2 = gf([
            26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
            26214,
        ]);
        var I4 = gf([
            41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139,
        ]);
        function set25519(r3, a5) {
            for (let i4 = 0; i4 < 16; i4++) {
                r3[i4] = a5[i4] | 0;
            }
        }
        function car25519(o3) {
            let c5 = 1;
            for (let i4 = 0; i4 < 16; i4++) {
                let v5 = o3[i4] + c5 + 65535;
                c5 = Math.floor(v5 / 65536);
                o3[i4] = v5 - c5 * 65536;
            }
            o3[0] += c5 - 1 + 37 * (c5 - 1);
        }
        function sel25519(p5, q4, b5) {
            const c5 = ~(b5 - 1);
            for (let i4 = 0; i4 < 16; i4++) {
                const t3 = c5 & (p5[i4] ^ q4[i4]);
                p5[i4] ^= t3;
                q4[i4] ^= t3;
            }
        }
        function pack25519(o3, n3) {
            const m4 = gf();
            const t3 = gf();
            for (let i4 = 0; i4 < 16; i4++) {
                t3[i4] = n3[i4];
            }
            car25519(t3);
            car25519(t3);
            car25519(t3);
            for (let j5 = 0; j5 < 2; j5++) {
                m4[0] = t3[0] - 65517;
                for (let i4 = 1; i4 < 15; i4++) {
                    m4[i4] = t3[i4] - 65535 - ((m4[i4 - 1] >> 16) & 1);
                    m4[i4 - 1] &= 65535;
                }
                m4[15] = t3[15] - 32767 - ((m4[14] >> 16) & 1);
                const b5 = (m4[15] >> 16) & 1;
                m4[14] &= 65535;
                sel25519(t3, m4, 1 - b5);
            }
            for (let i4 = 0; i4 < 16; i4++) {
                o3[2 * i4] = t3[i4] & 255;
                o3[2 * i4 + 1] = t3[i4] >> 8;
            }
        }
        function verify32(x5, y6) {
            let d4 = 0;
            for (let i4 = 0; i4 < 32; i4++) {
                d4 |= x5[i4] ^ y6[i4];
            }
            return (1 & ((d4 - 1) >>> 8)) - 1;
        }
        function neq25519(a5, b5) {
            const c5 = new Uint8Array(32);
            const d4 = new Uint8Array(32);
            pack25519(c5, a5);
            pack25519(d4, b5);
            return verify32(c5, d4);
        }
        function par25519(a5) {
            const d4 = new Uint8Array(32);
            pack25519(d4, a5);
            return d4[0] & 1;
        }
        function unpack25519(o3, n3) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = n3[2 * i4] + (n3[2 * i4 + 1] << 8);
            }
            o3[15] &= 32767;
        }
        function add(o3, a5, b5) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = a5[i4] + b5[i4];
            }
        }
        function sub(o3, a5, b5) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = a5[i4] - b5[i4];
            }
        }
        function mul(o3, a5, b5) {
            let v5,
                c5,
                t0 = 0,
                t1 = 0,
                t22 = 0,
                t3 = 0,
                t4 = 0,
                t5 = 0,
                t6 = 0,
                t7 = 0,
                t8 = 0,
                t9 = 0,
                t10 = 0,
                t11 = 0,
                t12 = 0,
                t13 = 0,
                t14 = 0,
                t15 = 0,
                t16 = 0,
                t17 = 0,
                t18 = 0,
                t19 = 0,
                t20 = 0,
                t21 = 0,
                t222 = 0,
                t23 = 0,
                t24 = 0,
                t25 = 0,
                t26 = 0,
                t27 = 0,
                t28 = 0,
                t29 = 0,
                t30 = 0,
                b0 = b5[0],
                b1 = b5[1],
                b22 = b5[2],
                b32 = b5[3],
                b42 = b5[4],
                b52 = b5[5],
                b6 = b5[6],
                b7 = b5[7],
                b8 = b5[8],
                b9 = b5[9],
                b10 = b5[10],
                b11 = b5[11],
                b12 = b5[12],
                b13 = b5[13],
                b14 = b5[14],
                b15 = b5[15];
            v5 = a5[0];
            t0 += v5 * b0;
            t1 += v5 * b1;
            t22 += v5 * b22;
            t3 += v5 * b32;
            t4 += v5 * b42;
            t5 += v5 * b52;
            t6 += v5 * b6;
            t7 += v5 * b7;
            t8 += v5 * b8;
            t9 += v5 * b9;
            t10 += v5 * b10;
            t11 += v5 * b11;
            t12 += v5 * b12;
            t13 += v5 * b13;
            t14 += v5 * b14;
            t15 += v5 * b15;
            v5 = a5[1];
            t1 += v5 * b0;
            t22 += v5 * b1;
            t3 += v5 * b22;
            t4 += v5 * b32;
            t5 += v5 * b42;
            t6 += v5 * b52;
            t7 += v5 * b6;
            t8 += v5 * b7;
            t9 += v5 * b8;
            t10 += v5 * b9;
            t11 += v5 * b10;
            t12 += v5 * b11;
            t13 += v5 * b12;
            t14 += v5 * b13;
            t15 += v5 * b14;
            t16 += v5 * b15;
            v5 = a5[2];
            t22 += v5 * b0;
            t3 += v5 * b1;
            t4 += v5 * b22;
            t5 += v5 * b32;
            t6 += v5 * b42;
            t7 += v5 * b52;
            t8 += v5 * b6;
            t9 += v5 * b7;
            t10 += v5 * b8;
            t11 += v5 * b9;
            t12 += v5 * b10;
            t13 += v5 * b11;
            t14 += v5 * b12;
            t15 += v5 * b13;
            t16 += v5 * b14;
            t17 += v5 * b15;
            v5 = a5[3];
            t3 += v5 * b0;
            t4 += v5 * b1;
            t5 += v5 * b22;
            t6 += v5 * b32;
            t7 += v5 * b42;
            t8 += v5 * b52;
            t9 += v5 * b6;
            t10 += v5 * b7;
            t11 += v5 * b8;
            t12 += v5 * b9;
            t13 += v5 * b10;
            t14 += v5 * b11;
            t15 += v5 * b12;
            t16 += v5 * b13;
            t17 += v5 * b14;
            t18 += v5 * b15;
            v5 = a5[4];
            t4 += v5 * b0;
            t5 += v5 * b1;
            t6 += v5 * b22;
            t7 += v5 * b32;
            t8 += v5 * b42;
            t9 += v5 * b52;
            t10 += v5 * b6;
            t11 += v5 * b7;
            t12 += v5 * b8;
            t13 += v5 * b9;
            t14 += v5 * b10;
            t15 += v5 * b11;
            t16 += v5 * b12;
            t17 += v5 * b13;
            t18 += v5 * b14;
            t19 += v5 * b15;
            v5 = a5[5];
            t5 += v5 * b0;
            t6 += v5 * b1;
            t7 += v5 * b22;
            t8 += v5 * b32;
            t9 += v5 * b42;
            t10 += v5 * b52;
            t11 += v5 * b6;
            t12 += v5 * b7;
            t13 += v5 * b8;
            t14 += v5 * b9;
            t15 += v5 * b10;
            t16 += v5 * b11;
            t17 += v5 * b12;
            t18 += v5 * b13;
            t19 += v5 * b14;
            t20 += v5 * b15;
            v5 = a5[6];
            t6 += v5 * b0;
            t7 += v5 * b1;
            t8 += v5 * b22;
            t9 += v5 * b32;
            t10 += v5 * b42;
            t11 += v5 * b52;
            t12 += v5 * b6;
            t13 += v5 * b7;
            t14 += v5 * b8;
            t15 += v5 * b9;
            t16 += v5 * b10;
            t17 += v5 * b11;
            t18 += v5 * b12;
            t19 += v5 * b13;
            t20 += v5 * b14;
            t21 += v5 * b15;
            v5 = a5[7];
            t7 += v5 * b0;
            t8 += v5 * b1;
            t9 += v5 * b22;
            t10 += v5 * b32;
            t11 += v5 * b42;
            t12 += v5 * b52;
            t13 += v5 * b6;
            t14 += v5 * b7;
            t15 += v5 * b8;
            t16 += v5 * b9;
            t17 += v5 * b10;
            t18 += v5 * b11;
            t19 += v5 * b12;
            t20 += v5 * b13;
            t21 += v5 * b14;
            t222 += v5 * b15;
            v5 = a5[8];
            t8 += v5 * b0;
            t9 += v5 * b1;
            t10 += v5 * b22;
            t11 += v5 * b32;
            t12 += v5 * b42;
            t13 += v5 * b52;
            t14 += v5 * b6;
            t15 += v5 * b7;
            t16 += v5 * b8;
            t17 += v5 * b9;
            t18 += v5 * b10;
            t19 += v5 * b11;
            t20 += v5 * b12;
            t21 += v5 * b13;
            t222 += v5 * b14;
            t23 += v5 * b15;
            v5 = a5[9];
            t9 += v5 * b0;
            t10 += v5 * b1;
            t11 += v5 * b22;
            t12 += v5 * b32;
            t13 += v5 * b42;
            t14 += v5 * b52;
            t15 += v5 * b6;
            t16 += v5 * b7;
            t17 += v5 * b8;
            t18 += v5 * b9;
            t19 += v5 * b10;
            t20 += v5 * b11;
            t21 += v5 * b12;
            t222 += v5 * b13;
            t23 += v5 * b14;
            t24 += v5 * b15;
            v5 = a5[10];
            t10 += v5 * b0;
            t11 += v5 * b1;
            t12 += v5 * b22;
            t13 += v5 * b32;
            t14 += v5 * b42;
            t15 += v5 * b52;
            t16 += v5 * b6;
            t17 += v5 * b7;
            t18 += v5 * b8;
            t19 += v5 * b9;
            t20 += v5 * b10;
            t21 += v5 * b11;
            t222 += v5 * b12;
            t23 += v5 * b13;
            t24 += v5 * b14;
            t25 += v5 * b15;
            v5 = a5[11];
            t11 += v5 * b0;
            t12 += v5 * b1;
            t13 += v5 * b22;
            t14 += v5 * b32;
            t15 += v5 * b42;
            t16 += v5 * b52;
            t17 += v5 * b6;
            t18 += v5 * b7;
            t19 += v5 * b8;
            t20 += v5 * b9;
            t21 += v5 * b10;
            t222 += v5 * b11;
            t23 += v5 * b12;
            t24 += v5 * b13;
            t25 += v5 * b14;
            t26 += v5 * b15;
            v5 = a5[12];
            t12 += v5 * b0;
            t13 += v5 * b1;
            t14 += v5 * b22;
            t15 += v5 * b32;
            t16 += v5 * b42;
            t17 += v5 * b52;
            t18 += v5 * b6;
            t19 += v5 * b7;
            t20 += v5 * b8;
            t21 += v5 * b9;
            t222 += v5 * b10;
            t23 += v5 * b11;
            t24 += v5 * b12;
            t25 += v5 * b13;
            t26 += v5 * b14;
            t27 += v5 * b15;
            v5 = a5[13];
            t13 += v5 * b0;
            t14 += v5 * b1;
            t15 += v5 * b22;
            t16 += v5 * b32;
            t17 += v5 * b42;
            t18 += v5 * b52;
            t19 += v5 * b6;
            t20 += v5 * b7;
            t21 += v5 * b8;
            t222 += v5 * b9;
            t23 += v5 * b10;
            t24 += v5 * b11;
            t25 += v5 * b12;
            t26 += v5 * b13;
            t27 += v5 * b14;
            t28 += v5 * b15;
            v5 = a5[14];
            t14 += v5 * b0;
            t15 += v5 * b1;
            t16 += v5 * b22;
            t17 += v5 * b32;
            t18 += v5 * b42;
            t19 += v5 * b52;
            t20 += v5 * b6;
            t21 += v5 * b7;
            t222 += v5 * b8;
            t23 += v5 * b9;
            t24 += v5 * b10;
            t25 += v5 * b11;
            t26 += v5 * b12;
            t27 += v5 * b13;
            t28 += v5 * b14;
            t29 += v5 * b15;
            v5 = a5[15];
            t15 += v5 * b0;
            t16 += v5 * b1;
            t17 += v5 * b22;
            t18 += v5 * b32;
            t19 += v5 * b42;
            t20 += v5 * b52;
            t21 += v5 * b6;
            t222 += v5 * b7;
            t23 += v5 * b8;
            t24 += v5 * b9;
            t25 += v5 * b10;
            t26 += v5 * b11;
            t27 += v5 * b12;
            t28 += v5 * b13;
            t29 += v5 * b14;
            t30 += v5 * b15;
            t0 += 38 * t16;
            t1 += 38 * t17;
            t22 += 38 * t18;
            t3 += 38 * t19;
            t4 += 38 * t20;
            t5 += 38 * t21;
            t6 += 38 * t222;
            t7 += 38 * t23;
            t8 += 38 * t24;
            t9 += 38 * t25;
            t10 += 38 * t26;
            t11 += 38 * t27;
            t12 += 38 * t28;
            t13 += 38 * t29;
            t14 += 38 * t30;
            c5 = 1;
            v5 = t0 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t0 = v5 - c5 * 65536;
            v5 = t1 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t1 = v5 - c5 * 65536;
            v5 = t22 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t22 = v5 - c5 * 65536;
            v5 = t3 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t3 = v5 - c5 * 65536;
            v5 = t4 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t4 = v5 - c5 * 65536;
            v5 = t5 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t5 = v5 - c5 * 65536;
            v5 = t6 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t6 = v5 - c5 * 65536;
            v5 = t7 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t7 = v5 - c5 * 65536;
            v5 = t8 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t8 = v5 - c5 * 65536;
            v5 = t9 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t9 = v5 - c5 * 65536;
            v5 = t10 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t10 = v5 - c5 * 65536;
            v5 = t11 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t11 = v5 - c5 * 65536;
            v5 = t12 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t12 = v5 - c5 * 65536;
            v5 = t13 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t13 = v5 - c5 * 65536;
            v5 = t14 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t14 = v5 - c5 * 65536;
            v5 = t15 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t15 = v5 - c5 * 65536;
            t0 += c5 - 1 + 37 * (c5 - 1);
            c5 = 1;
            v5 = t0 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t0 = v5 - c5 * 65536;
            v5 = t1 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t1 = v5 - c5 * 65536;
            v5 = t22 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t22 = v5 - c5 * 65536;
            v5 = t3 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t3 = v5 - c5 * 65536;
            v5 = t4 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t4 = v5 - c5 * 65536;
            v5 = t5 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t5 = v5 - c5 * 65536;
            v5 = t6 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t6 = v5 - c5 * 65536;
            v5 = t7 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t7 = v5 - c5 * 65536;
            v5 = t8 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t8 = v5 - c5 * 65536;
            v5 = t9 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t9 = v5 - c5 * 65536;
            v5 = t10 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t10 = v5 - c5 * 65536;
            v5 = t11 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t11 = v5 - c5 * 65536;
            v5 = t12 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t12 = v5 - c5 * 65536;
            v5 = t13 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t13 = v5 - c5 * 65536;
            v5 = t14 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t14 = v5 - c5 * 65536;
            v5 = t15 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t15 = v5 - c5 * 65536;
            t0 += c5 - 1 + 37 * (c5 - 1);
            o3[0] = t0;
            o3[1] = t1;
            o3[2] = t22;
            o3[3] = t3;
            o3[4] = t4;
            o3[5] = t5;
            o3[6] = t6;
            o3[7] = t7;
            o3[8] = t8;
            o3[9] = t9;
            o3[10] = t10;
            o3[11] = t11;
            o3[12] = t12;
            o3[13] = t13;
            o3[14] = t14;
            o3[15] = t15;
        }
        function square(o3, a5) {
            mul(o3, a5, a5);
        }
        function inv25519(o3, i4) {
            const c5 = gf();
            let a5;
            for (a5 = 0; a5 < 16; a5++) {
                c5[a5] = i4[a5];
            }
            for (a5 = 253; a5 >= 0; a5--) {
                square(c5, c5);
                if (a5 !== 2 && a5 !== 4) {
                    mul(c5, c5, i4);
                }
            }
            for (a5 = 0; a5 < 16; a5++) {
                o3[a5] = c5[a5];
            }
        }
        function pow2523(o3, i4) {
            const c5 = gf();
            let a5;
            for (a5 = 0; a5 < 16; a5++) {
                c5[a5] = i4[a5];
            }
            for (a5 = 250; a5 >= 0; a5--) {
                square(c5, c5);
                if (a5 !== 1) {
                    mul(c5, c5, i4);
                }
            }
            for (a5 = 0; a5 < 16; a5++) {
                o3[a5] = c5[a5];
            }
        }
        function edadd(p5, q4) {
            const a5 = gf(),
                b5 = gf(),
                c5 = gf(),
                d4 = gf(),
                e3 = gf(),
                f4 = gf(),
                g7 = gf(),
                h6 = gf(),
                t3 = gf();
            sub(a5, p5[1], p5[0]);
            sub(t3, q4[1], q4[0]);
            mul(a5, a5, t3);
            add(b5, p5[0], p5[1]);
            add(t3, q4[0], q4[1]);
            mul(b5, b5, t3);
            mul(c5, p5[3], q4[3]);
            mul(c5, c5, D22);
            mul(d4, p5[2], q4[2]);
            add(d4, d4, d4);
            sub(e3, b5, a5);
            sub(f4, d4, c5);
            add(g7, d4, c5);
            add(h6, b5, a5);
            mul(p5[0], e3, f4);
            mul(p5[1], h6, g7);
            mul(p5[2], g7, f4);
            mul(p5[3], e3, h6);
        }
        function cswap(p5, q4, b5) {
            for (let i4 = 0; i4 < 4; i4++) {
                sel25519(p5[i4], q4[i4], b5);
            }
        }
        function pack(r3, p5) {
            const tx = gf(),
                ty = gf(),
                zi = gf();
            inv25519(zi, p5[2]);
            mul(tx, p5[0], zi);
            mul(ty, p5[1], zi);
            pack25519(r3, ty);
            r3[31] ^= par25519(tx) << 7;
        }
        function scalarmult(p5, q4, s3) {
            set25519(p5[0], gf0);
            set25519(p5[1], gf1);
            set25519(p5[2], gf1);
            set25519(p5[3], gf0);
            for (let i4 = 255; i4 >= 0; --i4) {
                const b5 = (s3[(i4 / 8) | 0] >> (i4 & 7)) & 1;
                cswap(p5, q4, b5);
                edadd(q4, p5);
                edadd(p5, p5);
                cswap(p5, q4, b5);
            }
        }
        function scalarbase(p5, s3) {
            const q4 = [gf(), gf(), gf(), gf()];
            set25519(q4[0], X5);
            set25519(q4[1], Y2);
            set25519(q4[2], gf1);
            mul(q4[3], X5, Y2);
            scalarmult(p5, q4, s3);
        }
        function generateKeyPairFromSeed2(seed) {
            if (seed.length !== exports.SEED_LENGTH) {
                throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
            }
            const d4 = (0, sha512_1.hash)(seed);
            d4[0] &= 248;
            d4[31] &= 127;
            d4[31] |= 64;
            const publicKey = new Uint8Array(32);
            const p5 = [gf(), gf(), gf(), gf()];
            scalarbase(p5, d4);
            pack(publicKey, p5);
            const secretKey = new Uint8Array(64);
            secretKey.set(seed);
            secretKey.set(publicKey, 32);
            return {
                publicKey,
                secretKey,
            };
        }
        exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
        function generateKeyPair3(prng) {
            const seed = (0, random_1.randomBytes)(32, prng);
            const result = generateKeyPairFromSeed2(seed);
            (0, wipe_1.wipe)(seed);
            return result;
        }
        exports.generateKeyPair = generateKeyPair3;
        function extractPublicKeyFromSecretKey(secretKey) {
            if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
                throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
            }
            return new Uint8Array(secretKey.subarray(32));
        }
        exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
        var L6 = new Float64Array([
            237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 16,
        ]);
        function modL(r3, x5) {
            let carry;
            let i4;
            let j5;
            let k5;
            for (i4 = 63; i4 >= 32; --i4) {
                carry = 0;
                for (j5 = i4 - 32, k5 = i4 - 12; j5 < k5; ++j5) {
                    x5[j5] += carry - 16 * x5[i4] * L6[j5 - (i4 - 32)];
                    carry = Math.floor((x5[j5] + 128) / 256);
                    x5[j5] -= carry * 256;
                }
                x5[j5] += carry;
                x5[i4] = 0;
            }
            carry = 0;
            for (j5 = 0; j5 < 32; j5++) {
                x5[j5] += carry - (x5[31] >> 4) * L6[j5];
                carry = x5[j5] >> 8;
                x5[j5] &= 255;
            }
            for (j5 = 0; j5 < 32; j5++) {
                x5[j5] -= carry * L6[j5];
            }
            for (i4 = 0; i4 < 32; i4++) {
                x5[i4 + 1] += x5[i4] >> 8;
                r3[i4] = x5[i4] & 255;
            }
        }
        function reduce(r3) {
            const x5 = new Float64Array(64);
            for (let i4 = 0; i4 < 64; i4++) {
                x5[i4] = r3[i4];
            }
            for (let i4 = 0; i4 < 64; i4++) {
                r3[i4] = 0;
            }
            modL(r3, x5);
        }
        function sign2(secretKey, message) {
            const x5 = new Float64Array(64);
            const p5 = [gf(), gf(), gf(), gf()];
            const d4 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
            d4[0] &= 248;
            d4[31] &= 127;
            d4[31] |= 64;
            const signature = new Uint8Array(64);
            signature.set(d4.subarray(32), 32);
            const hs3 = new sha512_1.SHA512();
            hs3.update(signature.subarray(32));
            hs3.update(message);
            const r3 = hs3.digest();
            hs3.clean();
            reduce(r3);
            scalarbase(p5, r3);
            pack(signature, p5);
            hs3.reset();
            hs3.update(signature.subarray(0, 32));
            hs3.update(secretKey.subarray(32));
            hs3.update(message);
            const h6 = hs3.digest();
            reduce(h6);
            for (let i4 = 0; i4 < 32; i4++) {
                x5[i4] = r3[i4];
            }
            for (let i4 = 0; i4 < 32; i4++) {
                for (let j5 = 0; j5 < 32; j5++) {
                    x5[i4 + j5] += h6[i4] * d4[j5];
                }
            }
            modL(signature.subarray(32), x5);
            return signature;
        }
        exports.sign = sign2;
        function unpackneg(r3, p5) {
            const t3 = gf(),
                chk = gf(),
                num = gf(),
                den = gf(),
                den2 = gf(),
                den4 = gf(),
                den6 = gf();
            set25519(r3[2], gf1);
            unpack25519(r3[1], p5);
            square(num, r3[1]);
            mul(den, num, D7);
            sub(num, num, r3[2]);
            add(den, r3[2], den);
            square(den2, den);
            square(den4, den2);
            mul(den6, den4, den2);
            mul(t3, den6, num);
            mul(t3, t3, den);
            pow2523(t3, t3);
            mul(t3, t3, num);
            mul(t3, t3, den);
            mul(t3, t3, den);
            mul(r3[0], t3, den);
            square(chk, r3[0]);
            mul(chk, chk, den);
            if (neq25519(chk, num)) {
                mul(r3[0], r3[0], I4);
            }
            square(chk, r3[0]);
            mul(chk, chk, den);
            if (neq25519(chk, num)) {
                return -1;
            }
            if (par25519(r3[0]) === p5[31] >> 7) {
                sub(r3[0], gf0, r3[0]);
            }
            mul(r3[3], r3[0], r3[1]);
            return 0;
        }
        function verify2(publicKey, message, signature) {
            const t3 = new Uint8Array(32);
            const p5 = [gf(), gf(), gf(), gf()];
            const q4 = [gf(), gf(), gf(), gf()];
            if (signature.length !== exports.SIGNATURE_LENGTH) {
                throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
            }
            if (unpackneg(q4, publicKey)) {
                return false;
            }
            const hs3 = new sha512_1.SHA512();
            hs3.update(signature.subarray(0, 32));
            hs3.update(publicKey);
            hs3.update(message);
            const h6 = hs3.digest();
            reduce(h6);
            scalarmult(p5, q4, h6);
            scalarbase(q4, signature.subarray(32));
            edadd(p5, q4);
            pack(t3, p5);
            if (verify32(signature, t3)) {
                return false;
            }
            return true;
        }
        exports.verify = verify2;
        function convertPublicKeyToX25519(publicKey) {
            let q4 = [gf(), gf(), gf(), gf()];
            if (unpackneg(q4, publicKey)) {
                throw new Error('Ed25519: invalid public key');
            }
            let a5 = gf();
            let b5 = gf();
            let y6 = q4[1];
            add(a5, gf1, y6);
            sub(b5, gf1, y6);
            inv25519(b5, b5);
            mul(a5, a5, b5);
            let z4 = new Uint8Array(32);
            pack25519(z4, a5);
            return z4;
        }
        exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
        function convertSecretKeyToX25519(secretKey) {
            const d4 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
            d4[0] &= 248;
            d4[31] &= 127;
            d4[31] |= 64;
            const o3 = new Uint8Array(d4.subarray(0, 32));
            (0, wipe_1.wipe)(d4);
            return o3;
        }
        exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
    },
});

// node_modules/@stablelib/chacha/lib/chacha.js
var require_chacha = __commonJS({
    'node_modules/@stablelib/chacha/lib/chacha.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var binary_1 = require_binary();
        var wipe_1 = require_wipe();
        var ROUNDS = 20;
        function core(out, input, key) {
            var j0 = 1634760805;
            var j1 = 857760878;
            var j22 = 2036477234;
            var j32 = 1797285236;
            var j42 = (key[3] << 24) | (key[2] << 16) | (key[1] << 8) | key[0];
            var j5 = (key[7] << 24) | (key[6] << 16) | (key[5] << 8) | key[4];
            var j6 = (key[11] << 24) | (key[10] << 16) | (key[9] << 8) | key[8];
            var j7 = (key[15] << 24) | (key[14] << 16) | (key[13] << 8) | key[12];
            var j8 = (key[19] << 24) | (key[18] << 16) | (key[17] << 8) | key[16];
            var j9 = (key[23] << 24) | (key[22] << 16) | (key[21] << 8) | key[20];
            var j10 = (key[27] << 24) | (key[26] << 16) | (key[25] << 8) | key[24];
            var j11 = (key[31] << 24) | (key[30] << 16) | (key[29] << 8) | key[28];
            var j12 = (input[3] << 24) | (input[2] << 16) | (input[1] << 8) | input[0];
            var j13 = (input[7] << 24) | (input[6] << 16) | (input[5] << 8) | input[4];
            var j14 = (input[11] << 24) | (input[10] << 16) | (input[9] << 8) | input[8];
            var j15 = (input[15] << 24) | (input[14] << 16) | (input[13] << 8) | input[12];
            var x0 = j0;
            var x1 = j1;
            var x22 = j22;
            var x32 = j32;
            var x42 = j42;
            var x5 = j5;
            var x6 = j6;
            var x7 = j7;
            var x8 = j8;
            var x9 = j9;
            var x10 = j10;
            var x11 = j11;
            var x12 = j12;
            var x13 = j13;
            var x14 = j14;
            var x15 = j15;
            for (var i4 = 0; i4 < ROUNDS; i4 += 2) {
                x0 = (x0 + x42) | 0;
                x12 ^= x0;
                x12 = (x12 >>> (32 - 16)) | (x12 << 16);
                x8 = (x8 + x12) | 0;
                x42 ^= x8;
                x42 = (x42 >>> (32 - 12)) | (x42 << 12);
                x1 = (x1 + x5) | 0;
                x13 ^= x1;
                x13 = (x13 >>> (32 - 16)) | (x13 << 16);
                x9 = (x9 + x13) | 0;
                x5 ^= x9;
                x5 = (x5 >>> (32 - 12)) | (x5 << 12);
                x22 = (x22 + x6) | 0;
                x14 ^= x22;
                x14 = (x14 >>> (32 - 16)) | (x14 << 16);
                x10 = (x10 + x14) | 0;
                x6 ^= x10;
                x6 = (x6 >>> (32 - 12)) | (x6 << 12);
                x32 = (x32 + x7) | 0;
                x15 ^= x32;
                x15 = (x15 >>> (32 - 16)) | (x15 << 16);
                x11 = (x11 + x15) | 0;
                x7 ^= x11;
                x7 = (x7 >>> (32 - 12)) | (x7 << 12);
                x22 = (x22 + x6) | 0;
                x14 ^= x22;
                x14 = (x14 >>> (32 - 8)) | (x14 << 8);
                x10 = (x10 + x14) | 0;
                x6 ^= x10;
                x6 = (x6 >>> (32 - 7)) | (x6 << 7);
                x32 = (x32 + x7) | 0;
                x15 ^= x32;
                x15 = (x15 >>> (32 - 8)) | (x15 << 8);
                x11 = (x11 + x15) | 0;
                x7 ^= x11;
                x7 = (x7 >>> (32 - 7)) | (x7 << 7);
                x1 = (x1 + x5) | 0;
                x13 ^= x1;
                x13 = (x13 >>> (32 - 8)) | (x13 << 8);
                x9 = (x9 + x13) | 0;
                x5 ^= x9;
                x5 = (x5 >>> (32 - 7)) | (x5 << 7);
                x0 = (x0 + x42) | 0;
                x12 ^= x0;
                x12 = (x12 >>> (32 - 8)) | (x12 << 8);
                x8 = (x8 + x12) | 0;
                x42 ^= x8;
                x42 = (x42 >>> (32 - 7)) | (x42 << 7);
                x0 = (x0 + x5) | 0;
                x15 ^= x0;
                x15 = (x15 >>> (32 - 16)) | (x15 << 16);
                x10 = (x10 + x15) | 0;
                x5 ^= x10;
                x5 = (x5 >>> (32 - 12)) | (x5 << 12);
                x1 = (x1 + x6) | 0;
                x12 ^= x1;
                x12 = (x12 >>> (32 - 16)) | (x12 << 16);
                x11 = (x11 + x12) | 0;
                x6 ^= x11;
                x6 = (x6 >>> (32 - 12)) | (x6 << 12);
                x22 = (x22 + x7) | 0;
                x13 ^= x22;
                x13 = (x13 >>> (32 - 16)) | (x13 << 16);
                x8 = (x8 + x13) | 0;
                x7 ^= x8;
                x7 = (x7 >>> (32 - 12)) | (x7 << 12);
                x32 = (x32 + x42) | 0;
                x14 ^= x32;
                x14 = (x14 >>> (32 - 16)) | (x14 << 16);
                x9 = (x9 + x14) | 0;
                x42 ^= x9;
                x42 = (x42 >>> (32 - 12)) | (x42 << 12);
                x22 = (x22 + x7) | 0;
                x13 ^= x22;
                x13 = (x13 >>> (32 - 8)) | (x13 << 8);
                x8 = (x8 + x13) | 0;
                x7 ^= x8;
                x7 = (x7 >>> (32 - 7)) | (x7 << 7);
                x32 = (x32 + x42) | 0;
                x14 ^= x32;
                x14 = (x14 >>> (32 - 8)) | (x14 << 8);
                x9 = (x9 + x14) | 0;
                x42 ^= x9;
                x42 = (x42 >>> (32 - 7)) | (x42 << 7);
                x1 = (x1 + x6) | 0;
                x12 ^= x1;
                x12 = (x12 >>> (32 - 8)) | (x12 << 8);
                x11 = (x11 + x12) | 0;
                x6 ^= x11;
                x6 = (x6 >>> (32 - 7)) | (x6 << 7);
                x0 = (x0 + x5) | 0;
                x15 ^= x0;
                x15 = (x15 >>> (32 - 8)) | (x15 << 8);
                x10 = (x10 + x15) | 0;
                x5 ^= x10;
                x5 = (x5 >>> (32 - 7)) | (x5 << 7);
            }
            binary_1.writeUint32LE((x0 + j0) | 0, out, 0);
            binary_1.writeUint32LE((x1 + j1) | 0, out, 4);
            binary_1.writeUint32LE((x22 + j22) | 0, out, 8);
            binary_1.writeUint32LE((x32 + j32) | 0, out, 12);
            binary_1.writeUint32LE((x42 + j42) | 0, out, 16);
            binary_1.writeUint32LE((x5 + j5) | 0, out, 20);
            binary_1.writeUint32LE((x6 + j6) | 0, out, 24);
            binary_1.writeUint32LE((x7 + j7) | 0, out, 28);
            binary_1.writeUint32LE((x8 + j8) | 0, out, 32);
            binary_1.writeUint32LE((x9 + j9) | 0, out, 36);
            binary_1.writeUint32LE((x10 + j10) | 0, out, 40);
            binary_1.writeUint32LE((x11 + j11) | 0, out, 44);
            binary_1.writeUint32LE((x12 + j12) | 0, out, 48);
            binary_1.writeUint32LE((x13 + j13) | 0, out, 52);
            binary_1.writeUint32LE((x14 + j14) | 0, out, 56);
            binary_1.writeUint32LE((x15 + j15) | 0, out, 60);
        }
        function streamXOR(key, nonce, src2, dst, nonceInplaceCounterLength) {
            if (nonceInplaceCounterLength === void 0) {
                nonceInplaceCounterLength = 0;
            }
            if (key.length !== 32) {
                throw new Error('ChaCha: key size must be 32 bytes');
            }
            if (dst.length < src2.length) {
                throw new Error('ChaCha: destination is shorter than source');
            }
            var nc;
            var counterLength;
            if (nonceInplaceCounterLength === 0) {
                if (nonce.length !== 8 && nonce.length !== 12) {
                    throw new Error('ChaCha nonce must be 8 or 12 bytes');
                }
                nc = new Uint8Array(16);
                counterLength = nc.length - nonce.length;
                nc.set(nonce, counterLength);
            } else {
                if (nonce.length !== 16) {
                    throw new Error('ChaCha nonce with counter must be 16 bytes');
                }
                nc = nonce;
                counterLength = nonceInplaceCounterLength;
            }
            var block = new Uint8Array(64);
            for (var i4 = 0; i4 < src2.length; i4 += 64) {
                core(block, nc, key);
                for (var j5 = i4; j5 < i4 + 64 && j5 < src2.length; j5++) {
                    dst[j5] = src2[j5] ^ block[j5 - i4];
                }
                incrementCounter(nc, 0, counterLength);
            }
            wipe_1.wipe(block);
            if (nonceInplaceCounterLength === 0) {
                wipe_1.wipe(nc);
            }
            return dst;
        }
        exports.streamXOR = streamXOR;
        function stream(key, nonce, dst, nonceInplaceCounterLength) {
            if (nonceInplaceCounterLength === void 0) {
                nonceInplaceCounterLength = 0;
            }
            wipe_1.wipe(dst);
            return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
        }
        exports.stream = stream;
        function incrementCounter(counter, pos, len) {
            var carry = 1;
            while (len--) {
                carry = (carry + (counter[pos] & 255)) | 0;
                counter[pos] = carry & 255;
                carry >>>= 8;
                pos++;
            }
            if (carry > 0) {
                throw new Error('ChaCha: counter overflow');
            }
        }
    },
});

// node_modules/@stablelib/constant-time/lib/constant-time.js
var require_constant_time = __commonJS({
    'node_modules/@stablelib/constant-time/lib/constant-time.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function select(subject, resultIfOne, resultIfZero) {
            return (~(subject - 1) & resultIfOne) | ((subject - 1) & resultIfZero);
        }
        exports.select = select;
        function lessOrEqual(a5, b5) {
            return (((a5 | 0) - (b5 | 0) - 1) >>> 31) & 1;
        }
        exports.lessOrEqual = lessOrEqual;
        function compare2(a5, b5) {
            if (a5.length !== b5.length) {
                return 0;
            }
            var result = 0;
            for (var i4 = 0; i4 < a5.length; i4++) {
                result |= a5[i4] ^ b5[i4];
            }
            return 1 & ((result - 1) >>> 8);
        }
        exports.compare = compare2;
        function equal(a5, b5) {
            if (a5.length === 0 || b5.length === 0) {
                return false;
            }
            return compare2(a5, b5) !== 0;
        }
        exports.equal = equal;
    },
});

// node_modules/@stablelib/poly1305/lib/poly1305.js
var require_poly1305 = __commonJS({
    'node_modules/@stablelib/poly1305/lib/poly1305.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var constant_time_1 = require_constant_time();
        var wipe_1 = require_wipe();
        exports.DIGEST_LENGTH = 16;
        var Poly1305 =
            /** @class */
            (function () {
                function Poly13052(key) {
                    this.digestLength = exports.DIGEST_LENGTH;
                    this._buffer = new Uint8Array(16);
                    this._r = new Uint16Array(10);
                    this._h = new Uint16Array(10);
                    this._pad = new Uint16Array(8);
                    this._leftover = 0;
                    this._fin = 0;
                    this._finished = false;
                    var t0 = key[0] | (key[1] << 8);
                    this._r[0] = t0 & 8191;
                    var t1 = key[2] | (key[3] << 8);
                    this._r[1] = ((t0 >>> 13) | (t1 << 3)) & 8191;
                    var t22 = key[4] | (key[5] << 8);
                    this._r[2] = ((t1 >>> 10) | (t22 << 6)) & 7939;
                    var t3 = key[6] | (key[7] << 8);
                    this._r[3] = ((t22 >>> 7) | (t3 << 9)) & 8191;
                    var t4 = key[8] | (key[9] << 8);
                    this._r[4] = ((t3 >>> 4) | (t4 << 12)) & 255;
                    this._r[5] = (t4 >>> 1) & 8190;
                    var t5 = key[10] | (key[11] << 8);
                    this._r[6] = ((t4 >>> 14) | (t5 << 2)) & 8191;
                    var t6 = key[12] | (key[13] << 8);
                    this._r[7] = ((t5 >>> 11) | (t6 << 5)) & 8065;
                    var t7 = key[14] | (key[15] << 8);
                    this._r[8] = ((t6 >>> 8) | (t7 << 8)) & 8191;
                    this._r[9] = (t7 >>> 5) & 127;
                    this._pad[0] = key[16] | (key[17] << 8);
                    this._pad[1] = key[18] | (key[19] << 8);
                    this._pad[2] = key[20] | (key[21] << 8);
                    this._pad[3] = key[22] | (key[23] << 8);
                    this._pad[4] = key[24] | (key[25] << 8);
                    this._pad[5] = key[26] | (key[27] << 8);
                    this._pad[6] = key[28] | (key[29] << 8);
                    this._pad[7] = key[30] | (key[31] << 8);
                }
                Poly13052.prototype._blocks = function (m4, mpos, bytes) {
                    var hibit = this._fin ? 0 : 1 << 11;
                    var h0 = this._h[0],
                        h1 = this._h[1],
                        h22 = this._h[2],
                        h32 = this._h[3],
                        h42 = this._h[4],
                        h52 = this._h[5],
                        h6 = this._h[6],
                        h7 = this._h[7],
                        h8 = this._h[8],
                        h9 = this._h[9];
                    var r0 = this._r[0],
                        r1 = this._r[1],
                        r22 = this._r[2],
                        r3 = this._r[3],
                        r4 = this._r[4],
                        r5 = this._r[5],
                        r6 = this._r[6],
                        r7 = this._r[7],
                        r8 = this._r[8],
                        r9 = this._r[9];
                    while (bytes >= 16) {
                        var t0 = m4[mpos + 0] | (m4[mpos + 1] << 8);
                        h0 += t0 & 8191;
                        var t1 = m4[mpos + 2] | (m4[mpos + 3] << 8);
                        h1 += ((t0 >>> 13) | (t1 << 3)) & 8191;
                        var t22 = m4[mpos + 4] | (m4[mpos + 5] << 8);
                        h22 += ((t1 >>> 10) | (t22 << 6)) & 8191;
                        var t3 = m4[mpos + 6] | (m4[mpos + 7] << 8);
                        h32 += ((t22 >>> 7) | (t3 << 9)) & 8191;
                        var t4 = m4[mpos + 8] | (m4[mpos + 9] << 8);
                        h42 += ((t3 >>> 4) | (t4 << 12)) & 8191;
                        h52 += (t4 >>> 1) & 8191;
                        var t5 = m4[mpos + 10] | (m4[mpos + 11] << 8);
                        h6 += ((t4 >>> 14) | (t5 << 2)) & 8191;
                        var t6 = m4[mpos + 12] | (m4[mpos + 13] << 8);
                        h7 += ((t5 >>> 11) | (t6 << 5)) & 8191;
                        var t7 = m4[mpos + 14] | (m4[mpos + 15] << 8);
                        h8 += ((t6 >>> 8) | (t7 << 8)) & 8191;
                        h9 += (t7 >>> 5) | hibit;
                        var c5 = 0;
                        var d0 = c5;
                        d0 += h0 * r0;
                        d0 += h1 * (5 * r9);
                        d0 += h22 * (5 * r8);
                        d0 += h32 * (5 * r7);
                        d0 += h42 * (5 * r6);
                        c5 = d0 >>> 13;
                        d0 &= 8191;
                        d0 += h52 * (5 * r5);
                        d0 += h6 * (5 * r4);
                        d0 += h7 * (5 * r3);
                        d0 += h8 * (5 * r22);
                        d0 += h9 * (5 * r1);
                        c5 += d0 >>> 13;
                        d0 &= 8191;
                        var d1 = c5;
                        d1 += h0 * r1;
                        d1 += h1 * r0;
                        d1 += h22 * (5 * r9);
                        d1 += h32 * (5 * r8);
                        d1 += h42 * (5 * r7);
                        c5 = d1 >>> 13;
                        d1 &= 8191;
                        d1 += h52 * (5 * r6);
                        d1 += h6 * (5 * r5);
                        d1 += h7 * (5 * r4);
                        d1 += h8 * (5 * r3);
                        d1 += h9 * (5 * r22);
                        c5 += d1 >>> 13;
                        d1 &= 8191;
                        var d22 = c5;
                        d22 += h0 * r22;
                        d22 += h1 * r1;
                        d22 += h22 * r0;
                        d22 += h32 * (5 * r9);
                        d22 += h42 * (5 * r8);
                        c5 = d22 >>> 13;
                        d22 &= 8191;
                        d22 += h52 * (5 * r7);
                        d22 += h6 * (5 * r6);
                        d22 += h7 * (5 * r5);
                        d22 += h8 * (5 * r4);
                        d22 += h9 * (5 * r3);
                        c5 += d22 >>> 13;
                        d22 &= 8191;
                        var d32 = c5;
                        d32 += h0 * r3;
                        d32 += h1 * r22;
                        d32 += h22 * r1;
                        d32 += h32 * r0;
                        d32 += h42 * (5 * r9);
                        c5 = d32 >>> 13;
                        d32 &= 8191;
                        d32 += h52 * (5 * r8);
                        d32 += h6 * (5 * r7);
                        d32 += h7 * (5 * r6);
                        d32 += h8 * (5 * r5);
                        d32 += h9 * (5 * r4);
                        c5 += d32 >>> 13;
                        d32 &= 8191;
                        var d4 = c5;
                        d4 += h0 * r4;
                        d4 += h1 * r3;
                        d4 += h22 * r22;
                        d4 += h32 * r1;
                        d4 += h42 * r0;
                        c5 = d4 >>> 13;
                        d4 &= 8191;
                        d4 += h52 * (5 * r9);
                        d4 += h6 * (5 * r8);
                        d4 += h7 * (5 * r7);
                        d4 += h8 * (5 * r6);
                        d4 += h9 * (5 * r5);
                        c5 += d4 >>> 13;
                        d4 &= 8191;
                        var d5 = c5;
                        d5 += h0 * r5;
                        d5 += h1 * r4;
                        d5 += h22 * r3;
                        d5 += h32 * r22;
                        d5 += h42 * r1;
                        c5 = d5 >>> 13;
                        d5 &= 8191;
                        d5 += h52 * r0;
                        d5 += h6 * (5 * r9);
                        d5 += h7 * (5 * r8);
                        d5 += h8 * (5 * r7);
                        d5 += h9 * (5 * r6);
                        c5 += d5 >>> 13;
                        d5 &= 8191;
                        var d6 = c5;
                        d6 += h0 * r6;
                        d6 += h1 * r5;
                        d6 += h22 * r4;
                        d6 += h32 * r3;
                        d6 += h42 * r22;
                        c5 = d6 >>> 13;
                        d6 &= 8191;
                        d6 += h52 * r1;
                        d6 += h6 * r0;
                        d6 += h7 * (5 * r9);
                        d6 += h8 * (5 * r8);
                        d6 += h9 * (5 * r7);
                        c5 += d6 >>> 13;
                        d6 &= 8191;
                        var d7 = c5;
                        d7 += h0 * r7;
                        d7 += h1 * r6;
                        d7 += h22 * r5;
                        d7 += h32 * r4;
                        d7 += h42 * r3;
                        c5 = d7 >>> 13;
                        d7 &= 8191;
                        d7 += h52 * r22;
                        d7 += h6 * r1;
                        d7 += h7 * r0;
                        d7 += h8 * (5 * r9);
                        d7 += h9 * (5 * r8);
                        c5 += d7 >>> 13;
                        d7 &= 8191;
                        var d8 = c5;
                        d8 += h0 * r8;
                        d8 += h1 * r7;
                        d8 += h22 * r6;
                        d8 += h32 * r5;
                        d8 += h42 * r4;
                        c5 = d8 >>> 13;
                        d8 &= 8191;
                        d8 += h52 * r3;
                        d8 += h6 * r22;
                        d8 += h7 * r1;
                        d8 += h8 * r0;
                        d8 += h9 * (5 * r9);
                        c5 += d8 >>> 13;
                        d8 &= 8191;
                        var d9 = c5;
                        d9 += h0 * r9;
                        d9 += h1 * r8;
                        d9 += h22 * r7;
                        d9 += h32 * r6;
                        d9 += h42 * r5;
                        c5 = d9 >>> 13;
                        d9 &= 8191;
                        d9 += h52 * r4;
                        d9 += h6 * r3;
                        d9 += h7 * r22;
                        d9 += h8 * r1;
                        d9 += h9 * r0;
                        c5 += d9 >>> 13;
                        d9 &= 8191;
                        c5 = ((c5 << 2) + c5) | 0;
                        c5 = (c5 + d0) | 0;
                        d0 = c5 & 8191;
                        c5 = c5 >>> 13;
                        d1 += c5;
                        h0 = d0;
                        h1 = d1;
                        h22 = d22;
                        h32 = d32;
                        h42 = d4;
                        h52 = d5;
                        h6 = d6;
                        h7 = d7;
                        h8 = d8;
                        h9 = d9;
                        mpos += 16;
                        bytes -= 16;
                    }
                    this._h[0] = h0;
                    this._h[1] = h1;
                    this._h[2] = h22;
                    this._h[3] = h32;
                    this._h[4] = h42;
                    this._h[5] = h52;
                    this._h[6] = h6;
                    this._h[7] = h7;
                    this._h[8] = h8;
                    this._h[9] = h9;
                };
                Poly13052.prototype.finish = function (mac, macpos) {
                    if (macpos === void 0) {
                        macpos = 0;
                    }
                    var g7 = new Uint16Array(10);
                    var c5;
                    var mask;
                    var f4;
                    var i4;
                    if (this._leftover) {
                        i4 = this._leftover;
                        this._buffer[i4++] = 1;
                        for (; i4 < 16; i4++) {
                            this._buffer[i4] = 0;
                        }
                        this._fin = 1;
                        this._blocks(this._buffer, 0, 16);
                    }
                    c5 = this._h[1] >>> 13;
                    this._h[1] &= 8191;
                    for (i4 = 2; i4 < 10; i4++) {
                        this._h[i4] += c5;
                        c5 = this._h[i4] >>> 13;
                        this._h[i4] &= 8191;
                    }
                    this._h[0] += c5 * 5;
                    c5 = this._h[0] >>> 13;
                    this._h[0] &= 8191;
                    this._h[1] += c5;
                    c5 = this._h[1] >>> 13;
                    this._h[1] &= 8191;
                    this._h[2] += c5;
                    g7[0] = this._h[0] + 5;
                    c5 = g7[0] >>> 13;
                    g7[0] &= 8191;
                    for (i4 = 1; i4 < 10; i4++) {
                        g7[i4] = this._h[i4] + c5;
                        c5 = g7[i4] >>> 13;
                        g7[i4] &= 8191;
                    }
                    g7[9] -= 1 << 13;
                    mask = (c5 ^ 1) - 1;
                    for (i4 = 0; i4 < 10; i4++) {
                        g7[i4] &= mask;
                    }
                    mask = ~mask;
                    for (i4 = 0; i4 < 10; i4++) {
                        this._h[i4] = (this._h[i4] & mask) | g7[i4];
                    }
                    this._h[0] = (this._h[0] | (this._h[1] << 13)) & 65535;
                    this._h[1] = ((this._h[1] >>> 3) | (this._h[2] << 10)) & 65535;
                    this._h[2] = ((this._h[2] >>> 6) | (this._h[3] << 7)) & 65535;
                    this._h[3] = ((this._h[3] >>> 9) | (this._h[4] << 4)) & 65535;
                    this._h[4] = ((this._h[4] >>> 12) | (this._h[5] << 1) | (this._h[6] << 14)) & 65535;
                    this._h[5] = ((this._h[6] >>> 2) | (this._h[7] << 11)) & 65535;
                    this._h[6] = ((this._h[7] >>> 5) | (this._h[8] << 8)) & 65535;
                    this._h[7] = ((this._h[8] >>> 8) | (this._h[9] << 5)) & 65535;
                    f4 = this._h[0] + this._pad[0];
                    this._h[0] = f4 & 65535;
                    for (i4 = 1; i4 < 8; i4++) {
                        f4 = (((this._h[i4] + this._pad[i4]) | 0) + (f4 >>> 16)) | 0;
                        this._h[i4] = f4 & 65535;
                    }
                    mac[macpos + 0] = this._h[0] >>> 0;
                    mac[macpos + 1] = this._h[0] >>> 8;
                    mac[macpos + 2] = this._h[1] >>> 0;
                    mac[macpos + 3] = this._h[1] >>> 8;
                    mac[macpos + 4] = this._h[2] >>> 0;
                    mac[macpos + 5] = this._h[2] >>> 8;
                    mac[macpos + 6] = this._h[3] >>> 0;
                    mac[macpos + 7] = this._h[3] >>> 8;
                    mac[macpos + 8] = this._h[4] >>> 0;
                    mac[macpos + 9] = this._h[4] >>> 8;
                    mac[macpos + 10] = this._h[5] >>> 0;
                    mac[macpos + 11] = this._h[5] >>> 8;
                    mac[macpos + 12] = this._h[6] >>> 0;
                    mac[macpos + 13] = this._h[6] >>> 8;
                    mac[macpos + 14] = this._h[7] >>> 0;
                    mac[macpos + 15] = this._h[7] >>> 8;
                    this._finished = true;
                    return this;
                };
                Poly13052.prototype.update = function (m4) {
                    var mpos = 0;
                    var bytes = m4.length;
                    var want;
                    if (this._leftover) {
                        want = 16 - this._leftover;
                        if (want > bytes) {
                            want = bytes;
                        }
                        for (var i4 = 0; i4 < want; i4++) {
                            this._buffer[this._leftover + i4] = m4[mpos + i4];
                        }
                        bytes -= want;
                        mpos += want;
                        this._leftover += want;
                        if (this._leftover < 16) {
                            return this;
                        }
                        this._blocks(this._buffer, 0, 16);
                        this._leftover = 0;
                    }
                    if (bytes >= 16) {
                        want = bytes - (bytes % 16);
                        this._blocks(m4, mpos, want);
                        mpos += want;
                        bytes -= want;
                    }
                    if (bytes) {
                        for (var i4 = 0; i4 < bytes; i4++) {
                            this._buffer[this._leftover + i4] = m4[mpos + i4];
                        }
                        this._leftover += bytes;
                    }
                    return this;
                };
                Poly13052.prototype.digest = function () {
                    if (this._finished) {
                        throw new Error('Poly1305 was finished');
                    }
                    var mac = new Uint8Array(16);
                    this.finish(mac);
                    return mac;
                };
                Poly13052.prototype.clean = function () {
                    wipe_1.wipe(this._buffer);
                    wipe_1.wipe(this._r);
                    wipe_1.wipe(this._h);
                    wipe_1.wipe(this._pad);
                    this._leftover = 0;
                    this._fin = 0;
                    this._finished = true;
                    return this;
                };
                return Poly13052;
            })();
        exports.Poly1305 = Poly1305;
        function oneTimeAuth(key, data) {
            var h6 = new Poly1305(key);
            h6.update(data);
            var digest2 = h6.digest();
            h6.clean();
            return digest2;
        }
        exports.oneTimeAuth = oneTimeAuth;
        function equal(a5, b5) {
            if (a5.length !== exports.DIGEST_LENGTH || b5.length !== exports.DIGEST_LENGTH) {
                return false;
            }
            return constant_time_1.equal(a5, b5);
        }
        exports.equal = equal;
    },
});

// node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js
var require_chacha20poly1305 = __commonJS({
    'node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var chacha_1 = require_chacha();
        var poly1305_1 = require_poly1305();
        var wipe_1 = require_wipe();
        var binary_1 = require_binary();
        var constant_time_1 = require_constant_time();
        exports.KEY_LENGTH = 32;
        exports.NONCE_LENGTH = 12;
        exports.TAG_LENGTH = 16;
        var ZEROS = new Uint8Array(16);
        var ChaCha20Poly1305 =
            /** @class */
            (function () {
                function ChaCha20Poly13052(key) {
                    this.nonceLength = exports.NONCE_LENGTH;
                    this.tagLength = exports.TAG_LENGTH;
                    if (key.length !== exports.KEY_LENGTH) {
                        throw new Error('ChaCha20Poly1305 needs 32-byte key');
                    }
                    this._key = new Uint8Array(key);
                }
                ChaCha20Poly13052.prototype.seal = function (nonce, plaintext, associatedData, dst) {
                    if (nonce.length > 16) {
                        throw new Error('ChaCha20Poly1305: incorrect nonce length');
                    }
                    var counter = new Uint8Array(16);
                    counter.set(nonce, counter.length - nonce.length);
                    var authKey = new Uint8Array(32);
                    chacha_1.stream(this._key, counter, authKey, 4);
                    var resultLength = plaintext.length + this.tagLength;
                    var result;
                    if (dst) {
                        if (dst.length !== resultLength) {
                            throw new Error('ChaCha20Poly1305: incorrect destination length');
                        }
                        result = dst;
                    } else {
                        result = new Uint8Array(resultLength);
                    }
                    chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
                    this._authenticate(
                        result.subarray(result.length - this.tagLength, result.length),
                        authKey,
                        result.subarray(0, result.length - this.tagLength),
                        associatedData
                    );
                    wipe_1.wipe(counter);
                    return result;
                };
                ChaCha20Poly13052.prototype.open = function (nonce, sealed, associatedData, dst) {
                    if (nonce.length > 16) {
                        throw new Error('ChaCha20Poly1305: incorrect nonce length');
                    }
                    if (sealed.length < this.tagLength) {
                        return null;
                    }
                    var counter = new Uint8Array(16);
                    counter.set(nonce, counter.length - nonce.length);
                    var authKey = new Uint8Array(32);
                    chacha_1.stream(this._key, counter, authKey, 4);
                    var calculatedTag = new Uint8Array(this.tagLength);
                    this._authenticate(
                        calculatedTag,
                        authKey,
                        sealed.subarray(0, sealed.length - this.tagLength),
                        associatedData
                    );
                    if (
                        !constant_time_1.equal(
                            calculatedTag,
                            sealed.subarray(sealed.length - this.tagLength, sealed.length)
                        )
                    ) {
                        return null;
                    }
                    var resultLength = sealed.length - this.tagLength;
                    var result;
                    if (dst) {
                        if (dst.length !== resultLength) {
                            throw new Error('ChaCha20Poly1305: incorrect destination length');
                        }
                        result = dst;
                    } else {
                        result = new Uint8Array(resultLength);
                    }
                    chacha_1.streamXOR(
                        this._key,
                        counter,
                        sealed.subarray(0, sealed.length - this.tagLength),
                        result,
                        4
                    );
                    wipe_1.wipe(counter);
                    return result;
                };
                ChaCha20Poly13052.prototype.clean = function () {
                    wipe_1.wipe(this._key);
                    return this;
                };
                ChaCha20Poly13052.prototype._authenticate = function (tagOut, authKey, ciphertext, associatedData) {
                    var h6 = new poly1305_1.Poly1305(authKey);
                    if (associatedData) {
                        h6.update(associatedData);
                        if (associatedData.length % 16 > 0) {
                            h6.update(ZEROS.subarray(associatedData.length % 16));
                        }
                    }
                    h6.update(ciphertext);
                    if (ciphertext.length % 16 > 0) {
                        h6.update(ZEROS.subarray(ciphertext.length % 16));
                    }
                    var length2 = new Uint8Array(8);
                    if (associatedData) {
                        binary_1.writeUint64LE(associatedData.length, length2);
                    }
                    h6.update(length2);
                    binary_1.writeUint64LE(ciphertext.length, length2);
                    h6.update(length2);
                    var tag = h6.digest();
                    for (var i4 = 0; i4 < tag.length; i4++) {
                        tagOut[i4] = tag[i4];
                    }
                    h6.clean();
                    wipe_1.wipe(tag);
                    wipe_1.wipe(length2);
                };
                return ChaCha20Poly13052;
            })();
        exports.ChaCha20Poly1305 = ChaCha20Poly1305;
    },
});

// node_modules/@stablelib/hash/lib/hash.js
var require_hash = __commonJS({
    'node_modules/@stablelib/hash/lib/hash.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function isSerializableHash(h6) {
            return (
                typeof h6.saveState !== 'undefined' &&
                typeof h6.restoreState !== 'undefined' &&
                typeof h6.cleanSavedState !== 'undefined'
            );
        }
        exports.isSerializableHash = isSerializableHash;
    },
});

// node_modules/@stablelib/hmac/lib/hmac.js
var require_hmac = __commonJS({
    'node_modules/@stablelib/hmac/lib/hmac.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var hash_1 = require_hash();
        var constant_time_1 = require_constant_time();
        var wipe_1 = require_wipe();
        var HMAC =
            /** @class */
            (function () {
                function HMAC2(hash, key) {
                    this._finished = false;
                    this._inner = new hash();
                    this._outer = new hash();
                    this.blockSize = this._outer.blockSize;
                    this.digestLength = this._outer.digestLength;
                    var pad = new Uint8Array(this.blockSize);
                    if (key.length > this.blockSize) {
                        this._inner.update(key).finish(pad).clean();
                    } else {
                        pad.set(key);
                    }
                    for (var i4 = 0; i4 < pad.length; i4++) {
                        pad[i4] ^= 54;
                    }
                    this._inner.update(pad);
                    for (var i4 = 0; i4 < pad.length; i4++) {
                        pad[i4] ^= 54 ^ 92;
                    }
                    this._outer.update(pad);
                    if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
                        this._innerKeyedState = this._inner.saveState();
                        this._outerKeyedState = this._outer.saveState();
                    }
                    wipe_1.wipe(pad);
                }
                HMAC2.prototype.reset = function () {
                    if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
                        throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
                    }
                    this._inner.restoreState(this._innerKeyedState);
                    this._outer.restoreState(this._outerKeyedState);
                    this._finished = false;
                    return this;
                };
                HMAC2.prototype.clean = function () {
                    if (hash_1.isSerializableHash(this._inner)) {
                        this._inner.cleanSavedState(this._innerKeyedState);
                    }
                    if (hash_1.isSerializableHash(this._outer)) {
                        this._outer.cleanSavedState(this._outerKeyedState);
                    }
                    this._inner.clean();
                    this._outer.clean();
                };
                HMAC2.prototype.update = function (data) {
                    this._inner.update(data);
                    return this;
                };
                HMAC2.prototype.finish = function (out) {
                    if (this._finished) {
                        this._outer.finish(out);
                        return this;
                    }
                    this._inner.finish(out);
                    this._outer.update(out.subarray(0, this.digestLength)).finish(out);
                    this._finished = true;
                    return this;
                };
                HMAC2.prototype.digest = function () {
                    var out = new Uint8Array(this.digestLength);
                    this.finish(out);
                    return out;
                };
                HMAC2.prototype.saveState = function () {
                    if (!hash_1.isSerializableHash(this._inner)) {
                        throw new Error("hmac: can't saveState() because hash doesn't implement it");
                    }
                    return this._inner.saveState();
                };
                HMAC2.prototype.restoreState = function (savedState) {
                    if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
                        throw new Error("hmac: can't restoreState() because hash doesn't implement it");
                    }
                    this._inner.restoreState(savedState);
                    this._outer.restoreState(this._outerKeyedState);
                    this._finished = false;
                    return this;
                };
                HMAC2.prototype.cleanSavedState = function (savedState) {
                    if (!hash_1.isSerializableHash(this._inner)) {
                        throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
                    }
                    this._inner.cleanSavedState(savedState);
                };
                return HMAC2;
            })();
        exports.HMAC = HMAC;
        function hmac(hash, key, data) {
            var h6 = new HMAC(hash, key);
            h6.update(data);
            var digest2 = h6.digest();
            h6.clean();
            return digest2;
        }
        exports.hmac = hmac;
        exports.equal = constant_time_1.equal;
    },
});

// node_modules/@stablelib/hkdf/lib/hkdf.js
var require_hkdf = __commonJS({
    'node_modules/@stablelib/hkdf/lib/hkdf.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var hmac_1 = require_hmac();
        var wipe_1 = require_wipe();
        var HKDF =
            /** @class */
            (function () {
                function HKDF2(hash, key, salt, info) {
                    if (salt === void 0) {
                        salt = new Uint8Array(0);
                    }
                    this._counter = new Uint8Array(1);
                    this._hash = hash;
                    this._info = info;
                    var okm = hmac_1.hmac(this._hash, salt, key);
                    this._hmac = new hmac_1.HMAC(hash, okm);
                    this._buffer = new Uint8Array(this._hmac.digestLength);
                    this._bufpos = this._buffer.length;
                }
                HKDF2.prototype._fillBuffer = function () {
                    this._counter[0]++;
                    var ctr = this._counter[0];
                    if (ctr === 0) {
                        throw new Error('hkdf: cannot expand more');
                    }
                    this._hmac.reset();
                    if (ctr > 1) {
                        this._hmac.update(this._buffer);
                    }
                    if (this._info) {
                        this._hmac.update(this._info);
                    }
                    this._hmac.update(this._counter);
                    this._hmac.finish(this._buffer);
                    this._bufpos = 0;
                };
                HKDF2.prototype.expand = function (length2) {
                    var out = new Uint8Array(length2);
                    for (var i4 = 0; i4 < out.length; i4++) {
                        if (this._bufpos === this._buffer.length) {
                            this._fillBuffer();
                        }
                        out[i4] = this._buffer[this._bufpos++];
                    }
                    return out;
                };
                HKDF2.prototype.clean = function () {
                    this._hmac.clean();
                    wipe_1.wipe(this._buffer);
                    wipe_1.wipe(this._counter);
                    this._bufpos = 0;
                };
                return HKDF2;
            })();
        exports.HKDF = HKDF;
    },
});

// node_modules/@stablelib/sha256/lib/sha256.js
var require_sha256 = __commonJS({
    'node_modules/@stablelib/sha256/lib/sha256.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var binary_1 = require_binary();
        var wipe_1 = require_wipe();
        exports.DIGEST_LENGTH = 32;
        exports.BLOCK_SIZE = 64;
        var SHA256 =
            /** @class */
            (function () {
                function SHA2562() {
                    this.digestLength = exports.DIGEST_LENGTH;
                    this.blockSize = exports.BLOCK_SIZE;
                    this._state = new Int32Array(8);
                    this._temp = new Int32Array(64);
                    this._buffer = new Uint8Array(128);
                    this._bufferLength = 0;
                    this._bytesHashed = 0;
                    this._finished = false;
                    this.reset();
                }
                SHA2562.prototype._initState = function () {
                    this._state[0] = 1779033703;
                    this._state[1] = 3144134277;
                    this._state[2] = 1013904242;
                    this._state[3] = 2773480762;
                    this._state[4] = 1359893119;
                    this._state[5] = 2600822924;
                    this._state[6] = 528734635;
                    this._state[7] = 1541459225;
                };
                SHA2562.prototype.reset = function () {
                    this._initState();
                    this._bufferLength = 0;
                    this._bytesHashed = 0;
                    this._finished = false;
                    return this;
                };
                SHA2562.prototype.clean = function () {
                    wipe_1.wipe(this._buffer);
                    wipe_1.wipe(this._temp);
                    this.reset();
                };
                SHA2562.prototype.update = function (data, dataLength) {
                    if (dataLength === void 0) {
                        dataLength = data.length;
                    }
                    if (this._finished) {
                        throw new Error("SHA256: can't update because hash was finished.");
                    }
                    var dataPos = 0;
                    this._bytesHashed += dataLength;
                    if (this._bufferLength > 0) {
                        while (this._bufferLength < this.blockSize && dataLength > 0) {
                            this._buffer[this._bufferLength++] = data[dataPos++];
                            dataLength--;
                        }
                        if (this._bufferLength === this.blockSize) {
                            hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
                            this._bufferLength = 0;
                        }
                    }
                    if (dataLength >= this.blockSize) {
                        dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
                        dataLength %= this.blockSize;
                    }
                    while (dataLength > 0) {
                        this._buffer[this._bufferLength++] = data[dataPos++];
                        dataLength--;
                    }
                    return this;
                };
                SHA2562.prototype.finish = function (out) {
                    if (!this._finished) {
                        var bytesHashed = this._bytesHashed;
                        var left = this._bufferLength;
                        var bitLenHi = (bytesHashed / 536870912) | 0;
                        var bitLenLo = bytesHashed << 3;
                        var padLength = bytesHashed % 64 < 56 ? 64 : 128;
                        this._buffer[left] = 128;
                        for (var i4 = left + 1; i4 < padLength - 8; i4++) {
                            this._buffer[i4] = 0;
                        }
                        binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
                        binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
                        hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
                        this._finished = true;
                    }
                    for (var i4 = 0; i4 < this.digestLength / 4; i4++) {
                        binary_1.writeUint32BE(this._state[i4], out, i4 * 4);
                    }
                    return this;
                };
                SHA2562.prototype.digest = function () {
                    var out = new Uint8Array(this.digestLength);
                    this.finish(out);
                    return out;
                };
                SHA2562.prototype.saveState = function () {
                    if (this._finished) {
                        throw new Error('SHA256: cannot save finished state');
                    }
                    return {
                        state: new Int32Array(this._state),
                        buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
                        bufferLength: this._bufferLength,
                        bytesHashed: this._bytesHashed,
                    };
                };
                SHA2562.prototype.restoreState = function (savedState) {
                    this._state.set(savedState.state);
                    this._bufferLength = savedState.bufferLength;
                    if (savedState.buffer) {
                        this._buffer.set(savedState.buffer);
                    }
                    this._bytesHashed = savedState.bytesHashed;
                    this._finished = false;
                    return this;
                };
                SHA2562.prototype.cleanSavedState = function (savedState) {
                    wipe_1.wipe(savedState.state);
                    if (savedState.buffer) {
                        wipe_1.wipe(savedState.buffer);
                    }
                    savedState.bufferLength = 0;
                    savedState.bytesHashed = 0;
                };
                return SHA2562;
            })();
        exports.SHA256 = SHA256;
        var K3 = new Int32Array([
            1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080,
            310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
            264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808,
            3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
            1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
            3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
            1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
        ]);
        function hashBlocks(w8, v5, p5, pos, len) {
            while (len >= 64) {
                var a5 = v5[0];
                var b5 = v5[1];
                var c5 = v5[2];
                var d4 = v5[3];
                var e3 = v5[4];
                var f4 = v5[5];
                var g7 = v5[6];
                var h6 = v5[7];
                for (var i4 = 0; i4 < 16; i4++) {
                    var j5 = pos + i4 * 4;
                    w8[i4] = binary_1.readUint32BE(p5, j5);
                }
                for (var i4 = 16; i4 < 64; i4++) {
                    var u5 = w8[i4 - 2];
                    var t1 = ((u5 >>> 17) | (u5 << (32 - 17))) ^ ((u5 >>> 19) | (u5 << (32 - 19))) ^ (u5 >>> 10);
                    u5 = w8[i4 - 15];
                    var t22 = ((u5 >>> 7) | (u5 << (32 - 7))) ^ ((u5 >>> 18) | (u5 << (32 - 18))) ^ (u5 >>> 3);
                    w8[i4] = ((t1 + w8[i4 - 7]) | 0) + ((t22 + w8[i4 - 16]) | 0);
                }
                for (var i4 = 0; i4 < 64; i4++) {
                    var t1 =
                        ((((((e3 >>> 6) | (e3 << (32 - 6))) ^
                            ((e3 >>> 11) | (e3 << (32 - 11))) ^
                            ((e3 >>> 25) | (e3 << (32 - 25)))) +
                            ((e3 & f4) ^ (~e3 & g7))) |
                            0) +
                            ((h6 + ((K3[i4] + w8[i4]) | 0)) | 0)) |
                        0;
                    var t22 =
                        ((((a5 >>> 2) | (a5 << (32 - 2))) ^
                            ((a5 >>> 13) | (a5 << (32 - 13))) ^
                            ((a5 >>> 22) | (a5 << (32 - 22)))) +
                            ((a5 & b5) ^ (a5 & c5) ^ (b5 & c5))) |
                        0;
                    h6 = g7;
                    g7 = f4;
                    f4 = e3;
                    e3 = (d4 + t1) | 0;
                    d4 = c5;
                    c5 = b5;
                    b5 = a5;
                    a5 = (t1 + t22) | 0;
                }
                v5[0] += a5;
                v5[1] += b5;
                v5[2] += c5;
                v5[3] += d4;
                v5[4] += e3;
                v5[5] += f4;
                v5[6] += g7;
                v5[7] += h6;
                pos += 64;
                len -= 64;
            }
            return pos;
        }
        function hash(data) {
            var h6 = new SHA256();
            h6.update(data);
            var digest2 = h6.digest();
            h6.clean();
            return digest2;
        }
        exports.hash = hash;
    },
});

// node_modules/@stablelib/x25519/lib/x25519.js
var require_x25519 = __commonJS({
    'node_modules/@stablelib/x25519/lib/x25519.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.sharedKey =
            exports.generateKeyPair =
            exports.generateKeyPairFromSeed =
            exports.scalarMultBase =
            exports.scalarMult =
            exports.SHARED_KEY_LENGTH =
            exports.SECRET_KEY_LENGTH =
            exports.PUBLIC_KEY_LENGTH =
                void 0;
        var random_1 = require_random();
        var wipe_1 = require_wipe();
        exports.PUBLIC_KEY_LENGTH = 32;
        exports.SECRET_KEY_LENGTH = 32;
        exports.SHARED_KEY_LENGTH = 32;
        function gf(init) {
            const r3 = new Float64Array(16);
            if (init) {
                for (let i4 = 0; i4 < init.length; i4++) {
                    r3[i4] = init[i4];
                }
            }
            return r3;
        }
        var _9 = new Uint8Array(32);
        _9[0] = 9;
        var _121665 = gf([56129, 1]);
        function car25519(o3) {
            let c5 = 1;
            for (let i4 = 0; i4 < 16; i4++) {
                let v5 = o3[i4] + c5 + 65535;
                c5 = Math.floor(v5 / 65536);
                o3[i4] = v5 - c5 * 65536;
            }
            o3[0] += c5 - 1 + 37 * (c5 - 1);
        }
        function sel25519(p5, q4, b5) {
            const c5 = ~(b5 - 1);
            for (let i4 = 0; i4 < 16; i4++) {
                const t3 = c5 & (p5[i4] ^ q4[i4]);
                p5[i4] ^= t3;
                q4[i4] ^= t3;
            }
        }
        function pack25519(o3, n3) {
            const m4 = gf();
            const t3 = gf();
            for (let i4 = 0; i4 < 16; i4++) {
                t3[i4] = n3[i4];
            }
            car25519(t3);
            car25519(t3);
            car25519(t3);
            for (let j5 = 0; j5 < 2; j5++) {
                m4[0] = t3[0] - 65517;
                for (let i4 = 1; i4 < 15; i4++) {
                    m4[i4] = t3[i4] - 65535 - ((m4[i4 - 1] >> 16) & 1);
                    m4[i4 - 1] &= 65535;
                }
                m4[15] = t3[15] - 32767 - ((m4[14] >> 16) & 1);
                const b5 = (m4[15] >> 16) & 1;
                m4[14] &= 65535;
                sel25519(t3, m4, 1 - b5);
            }
            for (let i4 = 0; i4 < 16; i4++) {
                o3[2 * i4] = t3[i4] & 255;
                o3[2 * i4 + 1] = t3[i4] >> 8;
            }
        }
        function unpack25519(o3, n3) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = n3[2 * i4] + (n3[2 * i4 + 1] << 8);
            }
            o3[15] &= 32767;
        }
        function add(o3, a5, b5) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = a5[i4] + b5[i4];
            }
        }
        function sub(o3, a5, b5) {
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = a5[i4] - b5[i4];
            }
        }
        function mul(o3, a5, b5) {
            let v5,
                c5,
                t0 = 0,
                t1 = 0,
                t22 = 0,
                t3 = 0,
                t4 = 0,
                t5 = 0,
                t6 = 0,
                t7 = 0,
                t8 = 0,
                t9 = 0,
                t10 = 0,
                t11 = 0,
                t12 = 0,
                t13 = 0,
                t14 = 0,
                t15 = 0,
                t16 = 0,
                t17 = 0,
                t18 = 0,
                t19 = 0,
                t20 = 0,
                t21 = 0,
                t222 = 0,
                t23 = 0,
                t24 = 0,
                t25 = 0,
                t26 = 0,
                t27 = 0,
                t28 = 0,
                t29 = 0,
                t30 = 0,
                b0 = b5[0],
                b1 = b5[1],
                b22 = b5[2],
                b32 = b5[3],
                b42 = b5[4],
                b52 = b5[5],
                b6 = b5[6],
                b7 = b5[7],
                b8 = b5[8],
                b9 = b5[9],
                b10 = b5[10],
                b11 = b5[11],
                b12 = b5[12],
                b13 = b5[13],
                b14 = b5[14],
                b15 = b5[15];
            v5 = a5[0];
            t0 += v5 * b0;
            t1 += v5 * b1;
            t22 += v5 * b22;
            t3 += v5 * b32;
            t4 += v5 * b42;
            t5 += v5 * b52;
            t6 += v5 * b6;
            t7 += v5 * b7;
            t8 += v5 * b8;
            t9 += v5 * b9;
            t10 += v5 * b10;
            t11 += v5 * b11;
            t12 += v5 * b12;
            t13 += v5 * b13;
            t14 += v5 * b14;
            t15 += v5 * b15;
            v5 = a5[1];
            t1 += v5 * b0;
            t22 += v5 * b1;
            t3 += v5 * b22;
            t4 += v5 * b32;
            t5 += v5 * b42;
            t6 += v5 * b52;
            t7 += v5 * b6;
            t8 += v5 * b7;
            t9 += v5 * b8;
            t10 += v5 * b9;
            t11 += v5 * b10;
            t12 += v5 * b11;
            t13 += v5 * b12;
            t14 += v5 * b13;
            t15 += v5 * b14;
            t16 += v5 * b15;
            v5 = a5[2];
            t22 += v5 * b0;
            t3 += v5 * b1;
            t4 += v5 * b22;
            t5 += v5 * b32;
            t6 += v5 * b42;
            t7 += v5 * b52;
            t8 += v5 * b6;
            t9 += v5 * b7;
            t10 += v5 * b8;
            t11 += v5 * b9;
            t12 += v5 * b10;
            t13 += v5 * b11;
            t14 += v5 * b12;
            t15 += v5 * b13;
            t16 += v5 * b14;
            t17 += v5 * b15;
            v5 = a5[3];
            t3 += v5 * b0;
            t4 += v5 * b1;
            t5 += v5 * b22;
            t6 += v5 * b32;
            t7 += v5 * b42;
            t8 += v5 * b52;
            t9 += v5 * b6;
            t10 += v5 * b7;
            t11 += v5 * b8;
            t12 += v5 * b9;
            t13 += v5 * b10;
            t14 += v5 * b11;
            t15 += v5 * b12;
            t16 += v5 * b13;
            t17 += v5 * b14;
            t18 += v5 * b15;
            v5 = a5[4];
            t4 += v5 * b0;
            t5 += v5 * b1;
            t6 += v5 * b22;
            t7 += v5 * b32;
            t8 += v5 * b42;
            t9 += v5 * b52;
            t10 += v5 * b6;
            t11 += v5 * b7;
            t12 += v5 * b8;
            t13 += v5 * b9;
            t14 += v5 * b10;
            t15 += v5 * b11;
            t16 += v5 * b12;
            t17 += v5 * b13;
            t18 += v5 * b14;
            t19 += v5 * b15;
            v5 = a5[5];
            t5 += v5 * b0;
            t6 += v5 * b1;
            t7 += v5 * b22;
            t8 += v5 * b32;
            t9 += v5 * b42;
            t10 += v5 * b52;
            t11 += v5 * b6;
            t12 += v5 * b7;
            t13 += v5 * b8;
            t14 += v5 * b9;
            t15 += v5 * b10;
            t16 += v5 * b11;
            t17 += v5 * b12;
            t18 += v5 * b13;
            t19 += v5 * b14;
            t20 += v5 * b15;
            v5 = a5[6];
            t6 += v5 * b0;
            t7 += v5 * b1;
            t8 += v5 * b22;
            t9 += v5 * b32;
            t10 += v5 * b42;
            t11 += v5 * b52;
            t12 += v5 * b6;
            t13 += v5 * b7;
            t14 += v5 * b8;
            t15 += v5 * b9;
            t16 += v5 * b10;
            t17 += v5 * b11;
            t18 += v5 * b12;
            t19 += v5 * b13;
            t20 += v5 * b14;
            t21 += v5 * b15;
            v5 = a5[7];
            t7 += v5 * b0;
            t8 += v5 * b1;
            t9 += v5 * b22;
            t10 += v5 * b32;
            t11 += v5 * b42;
            t12 += v5 * b52;
            t13 += v5 * b6;
            t14 += v5 * b7;
            t15 += v5 * b8;
            t16 += v5 * b9;
            t17 += v5 * b10;
            t18 += v5 * b11;
            t19 += v5 * b12;
            t20 += v5 * b13;
            t21 += v5 * b14;
            t222 += v5 * b15;
            v5 = a5[8];
            t8 += v5 * b0;
            t9 += v5 * b1;
            t10 += v5 * b22;
            t11 += v5 * b32;
            t12 += v5 * b42;
            t13 += v5 * b52;
            t14 += v5 * b6;
            t15 += v5 * b7;
            t16 += v5 * b8;
            t17 += v5 * b9;
            t18 += v5 * b10;
            t19 += v5 * b11;
            t20 += v5 * b12;
            t21 += v5 * b13;
            t222 += v5 * b14;
            t23 += v5 * b15;
            v5 = a5[9];
            t9 += v5 * b0;
            t10 += v5 * b1;
            t11 += v5 * b22;
            t12 += v5 * b32;
            t13 += v5 * b42;
            t14 += v5 * b52;
            t15 += v5 * b6;
            t16 += v5 * b7;
            t17 += v5 * b8;
            t18 += v5 * b9;
            t19 += v5 * b10;
            t20 += v5 * b11;
            t21 += v5 * b12;
            t222 += v5 * b13;
            t23 += v5 * b14;
            t24 += v5 * b15;
            v5 = a5[10];
            t10 += v5 * b0;
            t11 += v5 * b1;
            t12 += v5 * b22;
            t13 += v5 * b32;
            t14 += v5 * b42;
            t15 += v5 * b52;
            t16 += v5 * b6;
            t17 += v5 * b7;
            t18 += v5 * b8;
            t19 += v5 * b9;
            t20 += v5 * b10;
            t21 += v5 * b11;
            t222 += v5 * b12;
            t23 += v5 * b13;
            t24 += v5 * b14;
            t25 += v5 * b15;
            v5 = a5[11];
            t11 += v5 * b0;
            t12 += v5 * b1;
            t13 += v5 * b22;
            t14 += v5 * b32;
            t15 += v5 * b42;
            t16 += v5 * b52;
            t17 += v5 * b6;
            t18 += v5 * b7;
            t19 += v5 * b8;
            t20 += v5 * b9;
            t21 += v5 * b10;
            t222 += v5 * b11;
            t23 += v5 * b12;
            t24 += v5 * b13;
            t25 += v5 * b14;
            t26 += v5 * b15;
            v5 = a5[12];
            t12 += v5 * b0;
            t13 += v5 * b1;
            t14 += v5 * b22;
            t15 += v5 * b32;
            t16 += v5 * b42;
            t17 += v5 * b52;
            t18 += v5 * b6;
            t19 += v5 * b7;
            t20 += v5 * b8;
            t21 += v5 * b9;
            t222 += v5 * b10;
            t23 += v5 * b11;
            t24 += v5 * b12;
            t25 += v5 * b13;
            t26 += v5 * b14;
            t27 += v5 * b15;
            v5 = a5[13];
            t13 += v5 * b0;
            t14 += v5 * b1;
            t15 += v5 * b22;
            t16 += v5 * b32;
            t17 += v5 * b42;
            t18 += v5 * b52;
            t19 += v5 * b6;
            t20 += v5 * b7;
            t21 += v5 * b8;
            t222 += v5 * b9;
            t23 += v5 * b10;
            t24 += v5 * b11;
            t25 += v5 * b12;
            t26 += v5 * b13;
            t27 += v5 * b14;
            t28 += v5 * b15;
            v5 = a5[14];
            t14 += v5 * b0;
            t15 += v5 * b1;
            t16 += v5 * b22;
            t17 += v5 * b32;
            t18 += v5 * b42;
            t19 += v5 * b52;
            t20 += v5 * b6;
            t21 += v5 * b7;
            t222 += v5 * b8;
            t23 += v5 * b9;
            t24 += v5 * b10;
            t25 += v5 * b11;
            t26 += v5 * b12;
            t27 += v5 * b13;
            t28 += v5 * b14;
            t29 += v5 * b15;
            v5 = a5[15];
            t15 += v5 * b0;
            t16 += v5 * b1;
            t17 += v5 * b22;
            t18 += v5 * b32;
            t19 += v5 * b42;
            t20 += v5 * b52;
            t21 += v5 * b6;
            t222 += v5 * b7;
            t23 += v5 * b8;
            t24 += v5 * b9;
            t25 += v5 * b10;
            t26 += v5 * b11;
            t27 += v5 * b12;
            t28 += v5 * b13;
            t29 += v5 * b14;
            t30 += v5 * b15;
            t0 += 38 * t16;
            t1 += 38 * t17;
            t22 += 38 * t18;
            t3 += 38 * t19;
            t4 += 38 * t20;
            t5 += 38 * t21;
            t6 += 38 * t222;
            t7 += 38 * t23;
            t8 += 38 * t24;
            t9 += 38 * t25;
            t10 += 38 * t26;
            t11 += 38 * t27;
            t12 += 38 * t28;
            t13 += 38 * t29;
            t14 += 38 * t30;
            c5 = 1;
            v5 = t0 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t0 = v5 - c5 * 65536;
            v5 = t1 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t1 = v5 - c5 * 65536;
            v5 = t22 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t22 = v5 - c5 * 65536;
            v5 = t3 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t3 = v5 - c5 * 65536;
            v5 = t4 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t4 = v5 - c5 * 65536;
            v5 = t5 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t5 = v5 - c5 * 65536;
            v5 = t6 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t6 = v5 - c5 * 65536;
            v5 = t7 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t7 = v5 - c5 * 65536;
            v5 = t8 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t8 = v5 - c5 * 65536;
            v5 = t9 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t9 = v5 - c5 * 65536;
            v5 = t10 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t10 = v5 - c5 * 65536;
            v5 = t11 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t11 = v5 - c5 * 65536;
            v5 = t12 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t12 = v5 - c5 * 65536;
            v5 = t13 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t13 = v5 - c5 * 65536;
            v5 = t14 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t14 = v5 - c5 * 65536;
            v5 = t15 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t15 = v5 - c5 * 65536;
            t0 += c5 - 1 + 37 * (c5 - 1);
            c5 = 1;
            v5 = t0 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t0 = v5 - c5 * 65536;
            v5 = t1 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t1 = v5 - c5 * 65536;
            v5 = t22 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t22 = v5 - c5 * 65536;
            v5 = t3 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t3 = v5 - c5 * 65536;
            v5 = t4 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t4 = v5 - c5 * 65536;
            v5 = t5 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t5 = v5 - c5 * 65536;
            v5 = t6 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t6 = v5 - c5 * 65536;
            v5 = t7 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t7 = v5 - c5 * 65536;
            v5 = t8 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t8 = v5 - c5 * 65536;
            v5 = t9 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t9 = v5 - c5 * 65536;
            v5 = t10 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t10 = v5 - c5 * 65536;
            v5 = t11 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t11 = v5 - c5 * 65536;
            v5 = t12 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t12 = v5 - c5 * 65536;
            v5 = t13 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t13 = v5 - c5 * 65536;
            v5 = t14 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t14 = v5 - c5 * 65536;
            v5 = t15 + c5 + 65535;
            c5 = Math.floor(v5 / 65536);
            t15 = v5 - c5 * 65536;
            t0 += c5 - 1 + 37 * (c5 - 1);
            o3[0] = t0;
            o3[1] = t1;
            o3[2] = t22;
            o3[3] = t3;
            o3[4] = t4;
            o3[5] = t5;
            o3[6] = t6;
            o3[7] = t7;
            o3[8] = t8;
            o3[9] = t9;
            o3[10] = t10;
            o3[11] = t11;
            o3[12] = t12;
            o3[13] = t13;
            o3[14] = t14;
            o3[15] = t15;
        }
        function square(o3, a5) {
            mul(o3, a5, a5);
        }
        function inv25519(o3, inp) {
            const c5 = gf();
            for (let i4 = 0; i4 < 16; i4++) {
                c5[i4] = inp[i4];
            }
            for (let i4 = 253; i4 >= 0; i4--) {
                square(c5, c5);
                if (i4 !== 2 && i4 !== 4) {
                    mul(c5, c5, inp);
                }
            }
            for (let i4 = 0; i4 < 16; i4++) {
                o3[i4] = c5[i4];
            }
        }
        function scalarMult(n3, p5) {
            const z4 = new Uint8Array(32);
            const x5 = new Float64Array(80);
            const a5 = gf(),
                b5 = gf(),
                c5 = gf(),
                d4 = gf(),
                e3 = gf(),
                f4 = gf();
            for (let i4 = 0; i4 < 31; i4++) {
                z4[i4] = n3[i4];
            }
            z4[31] = (n3[31] & 127) | 64;
            z4[0] &= 248;
            unpack25519(x5, p5);
            for (let i4 = 0; i4 < 16; i4++) {
                b5[i4] = x5[i4];
            }
            a5[0] = d4[0] = 1;
            for (let i4 = 254; i4 >= 0; --i4) {
                const r3 = (z4[i4 >>> 3] >>> (i4 & 7)) & 1;
                sel25519(a5, b5, r3);
                sel25519(c5, d4, r3);
                add(e3, a5, c5);
                sub(a5, a5, c5);
                add(c5, b5, d4);
                sub(b5, b5, d4);
                square(d4, e3);
                square(f4, a5);
                mul(a5, c5, a5);
                mul(c5, b5, e3);
                add(e3, a5, c5);
                sub(a5, a5, c5);
                square(b5, a5);
                sub(c5, d4, f4);
                mul(a5, c5, _121665);
                add(a5, a5, d4);
                mul(c5, c5, a5);
                mul(a5, d4, f4);
                mul(d4, b5, x5);
                square(b5, e3);
                sel25519(a5, b5, r3);
                sel25519(c5, d4, r3);
            }
            for (let i4 = 0; i4 < 16; i4++) {
                x5[i4 + 16] = a5[i4];
                x5[i4 + 32] = c5[i4];
                x5[i4 + 48] = b5[i4];
                x5[i4 + 64] = d4[i4];
            }
            const x32 = x5.subarray(32);
            const x16 = x5.subarray(16);
            inv25519(x32, x32);
            mul(x16, x16, x32);
            const q4 = new Uint8Array(32);
            pack25519(q4, x16);
            return q4;
        }
        exports.scalarMult = scalarMult;
        function scalarMultBase(n3) {
            return scalarMult(n3, _9);
        }
        exports.scalarMultBase = scalarMultBase;
        function generateKeyPairFromSeed2(seed) {
            if (seed.length !== exports.SECRET_KEY_LENGTH) {
                throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
            }
            const secretKey = new Uint8Array(seed);
            const publicKey = scalarMultBase(secretKey);
            return {
                publicKey,
                secretKey,
            };
        }
        exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
        function generateKeyPair3(prng) {
            const seed = (0, random_1.randomBytes)(32, prng);
            const result = generateKeyPairFromSeed2(seed);
            (0, wipe_1.wipe)(seed);
            return result;
        }
        exports.generateKeyPair = generateKeyPair3;
        function sharedKey2(mySecretKey, theirPublicKey, rejectZero = false) {
            if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
                throw new Error('X25519: incorrect secret key length');
            }
            if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
                throw new Error('X25519: incorrect public key length');
            }
            const result = scalarMult(mySecretKey, theirPublicKey);
            if (rejectZero) {
                let zeros = 0;
                for (let i4 = 0; i4 < result.length; i4++) {
                    zeros |= result[i4];
                }
                if (zeros === 0) {
                    throw new Error('X25519: invalid shared key');
                }
            }
            return result;
        }
        exports.sharedKey = sharedKey2;
    },
});

// node_modules/@walletconnect/utils/node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs8 = __commonJS({
    'node_modules/@walletconnect/utils/node_modules/@walletconnect/window-metadata/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.getWindowMetadata = void 0;
        var window_getters_1 = require_cjs();
        function getWindowMetadata2() {
            let doc;
            let loc;
            try {
                doc = window_getters_1.getDocumentOrThrow();
                loc = window_getters_1.getLocationOrThrow();
            } catch (e3) {
                return null;
            }
            function getIcons() {
                const links = doc.getElementsByTagName('link');
                const icons2 = [];
                for (let i4 = 0; i4 < links.length; i4++) {
                    const link = links[i4];
                    const rel = link.getAttribute('rel');
                    if (rel) {
                        if (rel.toLowerCase().indexOf('icon') > -1) {
                            const href = link.getAttribute('href');
                            if (href) {
                                if (
                                    href.toLowerCase().indexOf('https:') === -1 &&
                                    href.toLowerCase().indexOf('http:') === -1 &&
                                    href.indexOf('//') !== 0
                                ) {
                                    let absoluteHref = loc.protocol + '//' + loc.host;
                                    if (href.indexOf('/') === 0) {
                                        absoluteHref += href;
                                    } else {
                                        const path = loc.pathname.split('/');
                                        path.pop();
                                        const finalPath = path.join('/');
                                        absoluteHref += finalPath + '/' + href;
                                    }
                                    icons2.push(absoluteHref);
                                } else if (href.indexOf('//') === 0) {
                                    const absoluteUrl = loc.protocol + href;
                                    icons2.push(absoluteUrl);
                                } else {
                                    icons2.push(href);
                                }
                            }
                        }
                    }
                }
                return icons2;
            }
            function getWindowMetadataOfAny(...args) {
                const metaTags = doc.getElementsByTagName('meta');
                for (let i4 = 0; i4 < metaTags.length; i4++) {
                    const tag = metaTags[i4];
                    const attributes = ['itemprop', 'property', 'name']
                        .map((target) => tag.getAttribute(target))
                        .filter((attr) => {
                            if (attr) {
                                return args.includes(attr);
                            }
                            return false;
                        });
                    if (attributes.length && attributes) {
                        const content = tag.getAttribute('content');
                        if (content) {
                            return content;
                        }
                    }
                }
                return '';
            }
            function getName() {
                let name3 = getWindowMetadataOfAny('name', 'og:site_name', 'og:title', 'twitter:title');
                if (!name3) {
                    name3 = doc.title;
                }
                return name3;
            }
            function getDescription() {
                const description2 = getWindowMetadataOfAny(
                    'description',
                    'og:description',
                    'twitter:description',
                    'keywords'
                );
                return description2;
            }
            const name2 = getName();
            const description = getDescription();
            const url = loc.origin;
            const icons = getIcons();
            const meta = {
                description,
                url,
                icons,
                name: name2,
            };
            return meta;
        }
        exports.getWindowMetadata = getWindowMetadata2;
    },
});

// node_modules/strict-uri-encode/index.js
var require_strict_uri_encode = __commonJS({
    'node_modules/strict-uri-encode/index.js'(exports, module) {
        'use strict';
        module.exports = (str) =>
            encodeURIComponent(str).replace(/[!'()*]/g, (x5) => `%${x5.charCodeAt(0).toString(16).toUpperCase()}`);
    },
});

// node_modules/decode-uri-component/index.js
var require_decode_uri_component = __commonJS({
    'node_modules/decode-uri-component/index.js'(exports, module) {
        'use strict';
        var token = '%[a-f0-9]{2}';
        var singleMatcher = new RegExp('(' + token + ')|([^%]+?)', 'gi');
        var multiMatcher = new RegExp('(' + token + ')+', 'gi');
        function decodeComponents(components, split) {
            try {
                return [decodeURIComponent(components.join(''))];
            } catch (err) {}
            if (components.length === 1) {
                return components;
            }
            split = split || 1;
            var left = components.slice(0, split);
            var right = components.slice(split);
            return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
        }
        function decode6(input) {
            try {
                return decodeURIComponent(input);
            } catch (err) {
                var tokens = input.match(singleMatcher) || [];
                for (var i4 = 1; i4 < tokens.length; i4++) {
                    input = decodeComponents(tokens, i4).join('');
                    tokens = input.match(singleMatcher) || [];
                }
                return input;
            }
        }
        function customDecodeURIComponent(input) {
            var replaceMap = {
                '%FE%FF': '��',
                '%FF%FE': '��',
            };
            var match = multiMatcher.exec(input);
            while (match) {
                try {
                    replaceMap[match[0]] = decodeURIComponent(match[0]);
                } catch (err) {
                    var result = decode6(match[0]);
                    if (result !== match[0]) {
                        replaceMap[match[0]] = result;
                    }
                }
                match = multiMatcher.exec(input);
            }
            replaceMap['%C2'] = '�';
            var entries = Object.keys(replaceMap);
            for (var i4 = 0; i4 < entries.length; i4++) {
                var key = entries[i4];
                input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
            }
            return input;
        }
        module.exports = function (encodedURI) {
            if (typeof encodedURI !== 'string') {
                throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
            }
            try {
                encodedURI = encodedURI.replace(/\+/g, ' ');
                return decodeURIComponent(encodedURI);
            } catch (err) {
                return customDecodeURIComponent(encodedURI);
            }
        };
    },
});

// node_modules/split-on-first/index.js
var require_split_on_first = __commonJS({
    'node_modules/split-on-first/index.js'(exports, module) {
        'use strict';
        module.exports = (string2, separator) => {
            if (!(typeof string2 === 'string' && typeof separator === 'string')) {
                throw new TypeError('Expected the arguments to be of type `string`');
            }
            if (separator === '') {
                return [string2];
            }
            const separatorIndex = string2.indexOf(separator);
            if (separatorIndex === -1) {
                return [string2];
            }
            return [string2.slice(0, separatorIndex), string2.slice(separatorIndex + separator.length)];
        };
    },
});

// node_modules/filter-obj/index.js
var require_filter_obj = __commonJS({
    'node_modules/filter-obj/index.js'(exports, module) {
        'use strict';
        module.exports = function (obj, predicate) {
            var ret = {};
            var keys2 = Object.keys(obj);
            var isArr = Array.isArray(predicate);
            for (var i4 = 0; i4 < keys2.length; i4++) {
                var key = keys2[i4];
                var val = obj[key];
                if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
                    ret[key] = val;
                }
            }
            return ret;
        };
    },
});

// node_modules/query-string/index.js
var require_query_string = __commonJS({
    'node_modules/query-string/index.js'(exports) {
        'use strict';
        var strictUriEncode = require_strict_uri_encode();
        var decodeComponent = require_decode_uri_component();
        var splitOnFirst = require_split_on_first();
        var filterObject = require_filter_obj();
        var isNullOrUndefined = (value) => value === null || value === void 0;
        var encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');
        function encoderForArrayFormat(options) {
            switch (options.arrayFormat) {
                case 'index':
                    return (key) => (result, value) => {
                        const index = result.length;
                        if (
                            value === void 0 ||
                            (options.skipNull && value === null) ||
                            (options.skipEmptyString && value === '')
                        ) {
                            return result;
                        }
                        if (value === null) {
                            return [...result, [encode5(key, options), '[', index, ']'].join('')];
                        }
                        return [
                            ...result,
                            [encode5(key, options), '[', encode5(index, options), ']=', encode5(value, options)].join(
                                ''
                            ),
                        ];
                    };
                case 'bracket':
                    return (key) => (result, value) => {
                        if (
                            value === void 0 ||
                            (options.skipNull && value === null) ||
                            (options.skipEmptyString && value === '')
                        ) {
                            return result;
                        }
                        if (value === null) {
                            return [...result, [encode5(key, options), '[]'].join('')];
                        }
                        return [...result, [encode5(key, options), '[]=', encode5(value, options)].join('')];
                    };
                case 'colon-list-separator':
                    return (key) => (result, value) => {
                        if (
                            value === void 0 ||
                            (options.skipNull && value === null) ||
                            (options.skipEmptyString && value === '')
                        ) {
                            return result;
                        }
                        if (value === null) {
                            return [...result, [encode5(key, options), ':list='].join('')];
                        }
                        return [...result, [encode5(key, options), ':list=', encode5(value, options)].join('')];
                    };
                case 'comma':
                case 'separator':
                case 'bracket-separator': {
                    const keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
                    return (key) => (result, value) => {
                        if (
                            value === void 0 ||
                            (options.skipNull && value === null) ||
                            (options.skipEmptyString && value === '')
                        ) {
                            return result;
                        }
                        value = value === null ? '' : value;
                        if (result.length === 0) {
                            return [[encode5(key, options), keyValueSep, encode5(value, options)].join('')];
                        }
                        return [[result, encode5(value, options)].join(options.arrayFormatSeparator)];
                    };
                }
                default:
                    return (key) => (result, value) => {
                        if (
                            value === void 0 ||
                            (options.skipNull && value === null) ||
                            (options.skipEmptyString && value === '')
                        ) {
                            return result;
                        }
                        if (value === null) {
                            return [...result, encode5(key, options)];
                        }
                        return [...result, [encode5(key, options), '=', encode5(value, options)].join('')];
                    };
            }
        }
        function parserForArrayFormat(options) {
            let result;
            switch (options.arrayFormat) {
                case 'index':
                    return (key, value, accumulator) => {
                        result = /\[(\d*)\]$/.exec(key);
                        key = key.replace(/\[\d*\]$/, '');
                        if (!result) {
                            accumulator[key] = value;
                            return;
                        }
                        if (accumulator[key] === void 0) {
                            accumulator[key] = {};
                        }
                        accumulator[key][result[1]] = value;
                    };
                case 'bracket':
                    return (key, value, accumulator) => {
                        result = /(\[\])$/.exec(key);
                        key = key.replace(/\[\]$/, '');
                        if (!result) {
                            accumulator[key] = value;
                            return;
                        }
                        if (accumulator[key] === void 0) {
                            accumulator[key] = [value];
                            return;
                        }
                        accumulator[key] = [].concat(accumulator[key], value);
                    };
                case 'colon-list-separator':
                    return (key, value, accumulator) => {
                        result = /(:list)$/.exec(key);
                        key = key.replace(/:list$/, '');
                        if (!result) {
                            accumulator[key] = value;
                            return;
                        }
                        if (accumulator[key] === void 0) {
                            accumulator[key] = [value];
                            return;
                        }
                        accumulator[key] = [].concat(accumulator[key], value);
                    };
                case 'comma':
                case 'separator':
                    return (key, value, accumulator) => {
                        const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
                        const isEncodedArray =
                            typeof value === 'string' &&
                            !isArray &&
                            decode6(value, options).includes(options.arrayFormatSeparator);
                        value = isEncodedArray ? decode6(value, options) : value;
                        const newValue =
                            isArray || isEncodedArray
                                ? value.split(options.arrayFormatSeparator).map((item) => decode6(item, options))
                                : value === null
                                  ? value
                                  : decode6(value, options);
                        accumulator[key] = newValue;
                    };
                case 'bracket-separator':
                    return (key, value, accumulator) => {
                        const isArray = /(\[\])$/.test(key);
                        key = key.replace(/\[\]$/, '');
                        if (!isArray) {
                            accumulator[key] = value ? decode6(value, options) : value;
                            return;
                        }
                        const arrayValue =
                            value === null
                                ? []
                                : value.split(options.arrayFormatSeparator).map((item) => decode6(item, options));
                        if (accumulator[key] === void 0) {
                            accumulator[key] = arrayValue;
                            return;
                        }
                        accumulator[key] = [].concat(accumulator[key], arrayValue);
                    };
                default:
                    return (key, value, accumulator) => {
                        if (accumulator[key] === void 0) {
                            accumulator[key] = value;
                            return;
                        }
                        accumulator[key] = [].concat(accumulator[key], value);
                    };
            }
        }
        function validateArrayFormatSeparator(value) {
            if (typeof value !== 'string' || value.length !== 1) {
                throw new TypeError('arrayFormatSeparator must be single character string');
            }
        }
        function encode5(value, options) {
            if (options.encode) {
                return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
            }
            return value;
        }
        function decode6(value, options) {
            if (options.decode) {
                return decodeComponent(value);
            }
            return value;
        }
        function keysSorter(input) {
            if (Array.isArray(input)) {
                return input.sort();
            }
            if (typeof input === 'object') {
                return keysSorter(Object.keys(input))
                    .sort((a5, b5) => Number(a5) - Number(b5))
                    .map((key) => input[key]);
            }
            return input;
        }
        function removeHash(input) {
            const hashStart = input.indexOf('#');
            if (hashStart !== -1) {
                input = input.slice(0, hashStart);
            }
            return input;
        }
        function getHash(url) {
            let hash = '';
            const hashStart = url.indexOf('#');
            if (hashStart !== -1) {
                hash = url.slice(hashStart);
            }
            return hash;
        }
        function extract(input) {
            input = removeHash(input);
            const queryStart = input.indexOf('?');
            if (queryStart === -1) {
                return '';
            }
            return input.slice(queryStart + 1);
        }
        function parseValue(value, options) {
            if (
                options.parseNumbers &&
                !Number.isNaN(Number(value)) &&
                typeof value === 'string' &&
                value.trim() !== ''
            ) {
                value = Number(value);
            } else if (
                options.parseBooleans &&
                value !== null &&
                (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')
            ) {
                value = value.toLowerCase() === 'true';
            }
            return value;
        }
        function parse2(query, options) {
            options = Object.assign(
                {
                    decode: true,
                    sort: true,
                    arrayFormat: 'none',
                    arrayFormatSeparator: ',',
                    parseNumbers: false,
                    parseBooleans: false,
                },
                options
            );
            validateArrayFormatSeparator(options.arrayFormatSeparator);
            const formatter = parserForArrayFormat(options);
            const ret = /* @__PURE__ */ Object.create(null);
            if (typeof query !== 'string') {
                return ret;
            }
            query = query.trim().replace(/^[?#&]/, '');
            if (!query) {
                return ret;
            }
            for (const param of query.split('&')) {
                if (param === '') {
                    continue;
                }
                let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');
                value =
                    value === void 0
                        ? null
                        : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat)
                          ? value
                          : decode6(value, options);
                formatter(decode6(key, options), value, ret);
            }
            for (const key of Object.keys(ret)) {
                const value = ret[key];
                if (typeof value === 'object' && value !== null) {
                    for (const k5 of Object.keys(value)) {
                        value[k5] = parseValue(value[k5], options);
                    }
                } else {
                    ret[key] = parseValue(value, options);
                }
            }
            if (options.sort === false) {
                return ret;
            }
            return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(
                (result, key) => {
                    const value = ret[key];
                    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
                        result[key] = keysSorter(value);
                    } else {
                        result[key] = value;
                    }
                    return result;
                },
                /* @__PURE__ */ Object.create(null)
            );
        }
        exports.extract = extract;
        exports.parse = parse2;
        exports.stringify = (object, options) => {
            if (!object) {
                return '';
            }
            options = Object.assign(
                {
                    encode: true,
                    strict: true,
                    arrayFormat: 'none',
                    arrayFormatSeparator: ',',
                },
                options
            );
            validateArrayFormatSeparator(options.arrayFormatSeparator);
            const shouldFilter = (key) =>
                (options.skipNull && isNullOrUndefined(object[key])) || (options.skipEmptyString && object[key] === '');
            const formatter = encoderForArrayFormat(options);
            const objectCopy = {};
            for (const key of Object.keys(object)) {
                if (!shouldFilter(key)) {
                    objectCopy[key] = object[key];
                }
            }
            const keys2 = Object.keys(objectCopy);
            if (options.sort !== false) {
                keys2.sort(options.sort);
            }
            return keys2
                .map((key) => {
                    const value = object[key];
                    if (value === void 0) {
                        return '';
                    }
                    if (value === null) {
                        return encode5(key, options);
                    }
                    if (Array.isArray(value)) {
                        if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
                            return encode5(key, options) + '[]';
                        }
                        return value.reduce(formatter(key), []).join('&');
                    }
                    return encode5(key, options) + '=' + encode5(value, options);
                })
                .filter((x5) => x5.length > 0)
                .join('&');
        };
        exports.parseUrl = (url, options) => {
            options = Object.assign(
                {
                    decode: true,
                },
                options
            );
            const [url_, hash] = splitOnFirst(url, '#');
            return Object.assign(
                {
                    url: url_.split('?')[0] || '',
                    query: parse2(extract(url), options),
                },
                options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode6(hash, options) } : {}
            );
        };
        exports.stringifyUrl = (object, options) => {
            options = Object.assign(
                {
                    encode: true,
                    strict: true,
                    [encodeFragmentIdentifier]: true,
                },
                options
            );
            const url = removeHash(object.url).split('?')[0] || '';
            const queryFromUrl = exports.extract(object.url);
            const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
            const query = Object.assign(parsedQueryFromUrl, object.query);
            let queryString = exports.stringify(query, options);
            if (queryString) {
                queryString = `?${queryString}`;
            }
            let hash = getHash(object.url);
            if (object.fragmentIdentifier) {
                hash = `#${options[encodeFragmentIdentifier] ? encode5(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
            }
            return `${url}${queryString}${hash}`;
        };
        exports.pick = (input, filter, options) => {
            options = Object.assign(
                {
                    parseFragmentIdentifier: true,
                    [encodeFragmentIdentifier]: false,
                },
                options
            );
            const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
            return exports.stringifyUrl(
                {
                    url,
                    query: filterObject(query, filter),
                    fragmentIdentifier,
                },
                options
            );
        };
        exports.exclude = (input, filter, options) => {
            const exclusionFilter = Array.isArray(filter)
                ? (key) => !filter.includes(key)
                : (key, value) => !filter(key, value);
            return exports.pick(input, exclusionFilter, options);
        };
    },
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto2 = __commonJS({
    'node_modules/@walletconnect/environment/dist/cjs/crypto.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
        function getBrowerCrypto() {
            return (
                (global === null || global === void 0 ? void 0 : global.crypto) ||
                (global === null || global === void 0 ? void 0 : global.msCrypto) ||
                {}
            );
        }
        exports.getBrowerCrypto = getBrowerCrypto;
        function getSubtleCrypto() {
            const browserCrypto = getBrowerCrypto();
            return browserCrypto.subtle || browserCrypto.webkitSubtle;
        }
        exports.getSubtleCrypto = getSubtleCrypto;
        function isBrowserCryptoAvailable() {
            return !!getBrowerCrypto() && !!getSubtleCrypto();
        }
        exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
    },
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
    'node_modules/@walletconnect/environment/dist/cjs/env.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
        function isReactNative() {
            return (
                typeof document === 'undefined' &&
                typeof navigator !== 'undefined' &&
                navigator.product === 'ReactNative'
            );
        }
        exports.isReactNative = isReactNative;
        function isNode3() {
            return (
                typeof process !== 'undefined' &&
                typeof process.versions !== 'undefined' &&
                typeof process.versions.node !== 'undefined'
            );
        }
        exports.isNode = isNode3;
        function isBrowser2() {
            return !isReactNative() && !isNode3();
        }
        exports.isBrowser = isBrowser2;
    },
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs9 = __commonJS({
    'node_modules/@walletconnect/environment/dist/cjs/index.js'(exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
        tslib_1.__exportStar(require_crypto2(), exports);
        tslib_1.__exportStar(require_env(), exports);
    },
});

// node_modules/ws/browser.js
var require_browser4 = __commonJS({
    'node_modules/ws/browser.js'(exports, module) {
        'use strict';
        module.exports = function () {
            throw new Error('ws does not work in the browser. Browser clients must use the native WebSocket object');
        };
    },
});

// node_modules/lodash.isequal/index.js
var require_lodash = __commonJS({
    'node_modules/lodash.isequal/index.js'(exports, module) {
        var LARGE_ARRAY_SIZE = 200;
        var HASH_UNDEFINED = '__lodash_hash_undefined__';
        var COMPARE_PARTIAL_FLAG = 1;
        var COMPARE_UNORDERED_FLAG = 2;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var argsTag = '[object Arguments]';
        var arrayTag = '[object Array]';
        var asyncTag = '[object AsyncFunction]';
        var boolTag = '[object Boolean]';
        var dateTag = '[object Date]';
        var errorTag = '[object Error]';
        var funcTag = '[object Function]';
        var genTag = '[object GeneratorFunction]';
        var mapTag = '[object Map]';
        var numberTag = '[object Number]';
        var nullTag = '[object Null]';
        var objectTag = '[object Object]';
        var promiseTag = '[object Promise]';
        var proxyTag = '[object Proxy]';
        var regexpTag = '[object RegExp]';
        var setTag = '[object Set]';
        var stringTag = '[object String]';
        var symbolTag = '[object Symbol]';
        var undefinedTag = '[object Undefined]';
        var weakMapTag = '[object WeakMap]';
        var arrayBufferTag = '[object ArrayBuffer]';
        var dataViewTag = '[object DataView]';
        var float32Tag = '[object Float32Array]';
        var float64Tag = '[object Float64Array]';
        var int8Tag = '[object Int8Array]';
        var int16Tag = '[object Int16Array]';
        var int32Tag = '[object Int32Array]';
        var uint8Tag = '[object Uint8Array]';
        var uint8ClampedTag = '[object Uint8ClampedArray]';
        var uint16Tag = '[object Uint16Array]';
        var uint32Tag = '[object Uint32Array]';
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] =
            typedArrayTags[float64Tag] =
            typedArrayTags[int8Tag] =
            typedArrayTags[int16Tag] =
            typedArrayTags[int32Tag] =
            typedArrayTags[uint8Tag] =
            typedArrayTags[uint8ClampedTag] =
            typedArrayTags[uint16Tag] =
            typedArrayTags[uint32Tag] =
                true;
        typedArrayTags[argsTag] =
            typedArrayTags[arrayTag] =
            typedArrayTags[arrayBufferTag] =
            typedArrayTags[boolTag] =
            typedArrayTags[dataViewTag] =
            typedArrayTags[dateTag] =
            typedArrayTags[errorTag] =
            typedArrayTags[funcTag] =
            typedArrayTags[mapTag] =
            typedArrayTags[numberTag] =
            typedArrayTags[objectTag] =
            typedArrayTags[regexpTag] =
            typedArrayTags[setTag] =
            typedArrayTags[stringTag] =
            typedArrayTags[weakMapTag] =
                false;
        var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
        var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function('return this')();
        var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = (function () {
            try {
                return freeProcess && freeProcess.binding && freeProcess.binding('util');
            } catch (e3) {}
        })();
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function arrayFilter(array, predicate) {
            var index = -1,
                length2 = array == null ? 0 : array.length,
                resIndex = 0,
                result = [];
            while (++index < length2) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result[resIndex++] = value;
                }
            }
            return result;
        }
        function arrayPush(array, values) {
            var index = -1,
                length2 = values.length,
                offset = array.length;
            while (++index < length2) {
                array[offset + index] = values[index];
            }
            return array;
        }
        function arraySome(array, predicate) {
            var index = -1,
                length2 = array == null ? 0 : array.length;
            while (++index < length2) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }
        function baseTimes(n3, iteratee) {
            var index = -1,
                result = Array(n3);
            while (++index < n3) {
                result[index] = iteratee(index);
            }
            return result;
        }
        function baseUnary(func) {
            return function (value) {
                return func(value);
            };
        }
        function cacheHas(cache, key) {
            return cache.has(key);
        }
        function getValue(object, key) {
            return object == null ? void 0 : object[key];
        }
        function mapToArray(map) {
            var index = -1,
                result = Array(map.size);
            map.forEach(function (value, key) {
                result[++index] = [key, value];
            });
            return result;
        }
        function overArg(func, transform) {
            return function (arg) {
                return func(transform(arg));
            };
        }
        function setToArray(set2) {
            var index = -1,
                result = Array(set2.size);
            set2.forEach(function (value) {
                result[++index] = value;
            });
            return result;
        }
        var arrayProto = Array.prototype;
        var funcProto = Function.prototype;
        var objectProto = Object.prototype;
        var coreJsData = root['__core-js_shared__'];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var maskSrcKey = (function () {
            var uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '');
            return uid ? 'Symbol(src)_1.' + uid : '';
        })();
        var nativeObjectToString = objectProto.toString;
        var reIsNative = RegExp(
            '^' +
                funcToString
                    .call(hasOwnProperty)
                    .replace(reRegExpChar, '\\$&')
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                '$'
        );
        var Buffer2 = moduleExports ? root.Buffer : void 0;
        var Symbol2 = root.Symbol;
        var Uint8Array2 = root.Uint8Array;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable;
        var splice = arrayProto.splice;
        var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
        var nativeGetSymbols = Object.getOwnPropertySymbols;
        var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
        var nativeKeys = overArg(Object.keys, Object);
        var DataView2 = getNative(root, 'DataView');
        var Map2 = getNative(root, 'Map');
        var Promise2 = getNative(root, 'Promise');
        var Set2 = getNative(root, 'Set');
        var WeakMap = getNative(root, 'WeakMap');
        var nativeCreate = getNative(Object, 'create');
        var dataViewCtorString = toSource(DataView2);
        var mapCtorString = toSource(Map2);
        var promiseCtorString = toSource(Promise2);
        var setCtorString = toSource(Set2);
        var weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
        var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
        function Hash(entries) {
            var index = -1,
                length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
        }
        function hashDelete(key) {
            var result = this.has(key) && delete this.__data__[key];
            this.size -= result ? 1 : 0;
            return result;
        }
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? void 0 : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : void 0;
        }
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
            return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype['delete'] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
            var index = -1,
                length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
        }
        function listCacheDelete(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);
            if (index < 0) {
                return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
                data.pop();
            } else {
                splice.call(data, index, 1);
            }
            --this.size;
            return true;
        }
        function listCacheGet(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);
            return index < 0 ? void 0 : data[index][1];
        }
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
            var data = this.__data__,
                index = assocIndexOf(data, key);
            if (index < 0) {
                ++this.size;
                data.push([key, value]);
            } else {
                data[index][1] = value;
            }
            return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype['delete'] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
            var index = -1,
                length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
                hash: new Hash(),
                map: new (Map2 || ListCache)(),
                string: new Hash(),
            };
        }
        function mapCacheDelete(key) {
            var result = getMapData(this, key)['delete'](key);
            this.size -= result ? 1 : 0;
            return result;
        }
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
            var data = getMapData(this, key),
                size = data.size;
            data.set(key, value);
            this.size += data.size == size ? 0 : 1;
            return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype['delete'] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values) {
            var index = -1,
                length2 = values == null ? 0 : values.length;
            this.__data__ = new MapCache();
            while (++index < length2) {
                this.add(values[index]);
            }
        }
        function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
        }
        function setCacheHas(value) {
            return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
            var data = (this.__data__ = new ListCache(entries));
            this.size = data.size;
        }
        function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
        }
        function stackDelete(key) {
            var data = this.__data__,
                result = data['delete'](key);
            this.size = data.size;
            return result;
        }
        function stackGet(key) {
            return this.__data__.get(key);
        }
        function stackHas(key) {
            return this.__data__.has(key);
        }
        function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
                var pairs = data.__data__;
                if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                    pairs.push([key, value]);
                    this.size = ++data.size;
                    return this;
                }
                data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype['delete'] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value),
                isArg = !isArr && isArguments(value),
                isBuff = !isArr && !isArg && isBuffer(value),
                isType = !isArr && !isArg && !isBuff && isTypedArray(value),
                skipIndexes = isArr || isArg || isBuff || isType,
                result = skipIndexes ? baseTimes(value.length, String) : [],
                length2 = result.length;
            for (var key in value) {
                if (
                    (inherited || hasOwnProperty.call(value, key)) &&
                    !(
                        skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
                        (key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
                            (isBuff && (key == 'offset' || key == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
                            (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || // Skip index properties.
                            isIndex(key, length2))
                    )
                ) {
                    result.push(key);
                }
            }
            return result;
        }
        function assocIndexOf(array, key) {
            var length2 = array.length;
            while (length2--) {
                if (eq(array[length2][0], key)) {
                    return length2;
                }
            }
            return -1;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result = keysFunc(object);
            return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
        }
        function baseGetTag(value) {
            if (value == null) {
                return value === void 0 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
        }
        function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
                return true;
            }
            if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object),
                othIsArr = isArray(other),
                objTag = objIsArr ? arrayTag : getTag(object),
                othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag,
                othIsObj = othTag == objectTag,
                isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
                if (!isBuffer(other)) {
                    return false;
                }
                objIsArr = true;
                objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
                stack || (stack = new Stack());
                return objIsArr || isTypedArray(object)
                    ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
                    : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
                if (objIsWrapped || othIsWrapped) {
                    var objUnwrapped = objIsWrapped ? object.value() : object,
                        othUnwrapped = othIsWrapped ? other.value() : other;
                    stack || (stack = new Stack());
                    return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
                }
            }
            if (!isSameTag) {
                return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
                return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
        }
        function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != 'constructor') {
                    result.push(key);
                }
            }
            return result;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                arrLength = array.length,
                othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
                return false;
            }
            var stacked = stack.get(array);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var index = -1,
                result = true,
                seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index];
                if (customizer) {
                    var compared = isPartial
                        ? customizer(othValue, arrValue, index, other, array, stack)
                        : customizer(arrValue, othValue, index, array, other, stack);
                }
                if (compared !== void 0) {
                    if (compared) {
                        continue;
                    }
                    result = false;
                    break;
                }
                if (seen) {
                    if (
                        !arraySome(other, function (othValue2, othIndex) {
                            if (
                                !cacheHas(seen, othIndex) &&
                                (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))
                            ) {
                                return seen.push(othIndex);
                            }
                        })
                    ) {
                        result = false;
                        break;
                    }
                } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    result = false;
                    break;
                }
            }
            stack['delete'](array);
            stack['delete'](other);
            return result;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
                case dataViewTag:
                    if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                        return false;
                    }
                    object = object.buffer;
                    other = other.buffer;
                case arrayBufferTag:
                    if (
                        object.byteLength != other.byteLength ||
                        !equalFunc(new Uint8Array2(object), new Uint8Array2(other))
                    ) {
                        return false;
                    }
                    return true;
                case boolTag:
                case dateTag:
                case numberTag:
                    return eq(+object, +other);
                case errorTag:
                    return object.name == other.name && object.message == other.message;
                case regexpTag:
                case stringTag:
                    return object == other + '';
                case mapTag:
                    var convert = mapToArray;
                case setTag:
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                    convert || (convert = setToArray);
                    if (object.size != other.size && !isPartial) {
                        return false;
                    }
                    var stacked = stack.get(object);
                    if (stacked) {
                        return stacked == other;
                    }
                    bitmask |= COMPARE_UNORDERED_FLAG;
                    stack.set(object, other);
                    var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                    stack['delete'](object);
                    return result;
                case symbolTag:
                    if (symbolValueOf) {
                        return symbolValueOf.call(object) == symbolValueOf.call(other);
                    }
            }
            return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                objProps = getAllKeys(object),
                objLength = objProps.length,
                othProps = getAllKeys(other),
                othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                    return false;
                }
            }
            var stacked = stack.get(object);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var result = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key];
                if (customizer) {
                    var compared = isPartial
                        ? customizer(othValue, objValue, key, other, object, stack)
                        : customizer(objValue, othValue, key, object, other, stack);
                }
                if (
                    !(compared === void 0
                        ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)
                        : compared)
                ) {
                    result = false;
                    break;
                }
                skipCtor || (skipCtor = key == 'constructor');
            }
            if (result && !skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;
                if (
                    objCtor != othCtor &&
                    'constructor' in object &&
                    'constructor' in other &&
                    !(
                        typeof objCtor == 'function' &&
                        objCtor instanceof objCtor &&
                        typeof othCtor == 'function' &&
                        othCtor instanceof othCtor
                    )
                ) {
                    result = false;
                }
            }
            stack['delete'](object);
            stack['delete'](other);
            return result;
        }
        function getAllKeys(object) {
            return baseGetAllKeys(object, keys2, getSymbols);
        }
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
        }
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : void 0;
        }
        function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag),
                tag = value[symToStringTag];
            try {
                value[symToStringTag] = void 0;
                var unmasked = true;
            } catch (e3) {}
            var result = nativeObjectToString.call(value);
            if (unmasked) {
                if (isOwn) {
                    value[symToStringTag] = tag;
                } else {
                    delete value[symToStringTag];
                }
            }
            return result;
        }
        var getSymbols = !nativeGetSymbols
            ? stubArray
            : function (object) {
                  if (object == null) {
                      return [];
                  }
                  object = Object(object);
                  return arrayFilter(nativeGetSymbols(object), function (symbol) {
                      return propertyIsEnumerable.call(object, symbol);
                  });
              };
        var getTag = baseGetTag;
        if (
            (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag) ||
            (Map2 && getTag(new Map2()) != mapTag) ||
            (Promise2 && getTag(Promise2.resolve()) != promiseTag) ||
            (Set2 && getTag(new Set2()) != setTag) ||
            (WeakMap && getTag(new WeakMap()) != weakMapTag)
        ) {
            getTag = function (value) {
                var result = baseGetTag(value),
                    Ctor = result == objectTag ? value.constructor : void 0,
                    ctorString = Ctor ? toSource(Ctor) : '';
                if (ctorString) {
                    switch (ctorString) {
                        case dataViewCtorString:
                            return dataViewTag;
                        case mapCtorString:
                            return mapTag;
                        case promiseCtorString:
                            return promiseTag;
                        case setCtorString:
                            return setTag;
                        case weakMapCtorString:
                            return weakMapTag;
                    }
                }
                return result;
            };
        }
        function isIndex(value, length2) {
            length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
            return (
                !!length2 &&
                (typeof value == 'number' || reIsUint.test(value)) &&
                value > -1 &&
                value % 1 == 0 &&
                value < length2
            );
        }
        function isKeyable(value) {
            var type = typeof value;
            return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
                ? value !== '__proto__'
                : value === null;
        }
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
        }
        function isPrototype(value) {
            var Ctor = value && value.constructor,
                proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
            return value === proto;
        }
        function objectToString(value) {
            return nativeObjectToString.call(value);
        }
        function toSource(func) {
            if (func != null) {
                try {
                    return funcToString.call(func);
                } catch (e3) {}
                try {
                    return func + '';
                } catch (e3) {}
            }
            return '';
        }
        function eq(value, other) {
            return value === other || (value !== value && other !== other);
        }
        var isArguments = baseIsArguments(
            /* @__PURE__ */ (function () {
                return arguments;
            })()
        )
            ? baseIsArguments
            : function (value) {
                  return (
                      isObjectLike(value) &&
                      hasOwnProperty.call(value, 'callee') &&
                      !propertyIsEnumerable.call(value, 'callee')
                  );
              };
        var isArray = Array.isArray;
        function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        function isEqual(value, other) {
            return baseIsEqual(value, other);
        }
        function isFunction(value) {
            if (!isObject(value)) {
                return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
            var type = typeof value;
            return value != null && (type == 'object' || type == 'function');
        }
        function isObjectLike(value) {
            return value != null && typeof value == 'object';
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function keys2(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function stubArray() {
            return [];
        }
        function stubFalse() {
            return false;
        }
        module.exports = isEqual;
    },
});

// node_modules/unfetch/dist/unfetch.module.js
var unfetch_module_exports = {};
__export(unfetch_module_exports, {
    default: () => unfetch_module_default,
});
function unfetch_module_default(e3, n3) {
    return (
        (n3 = n3 || {}),
        new Promise(function (t3, r3) {
            var s3 = new XMLHttpRequest(),
                o3 = [],
                u5 = [],
                i4 = {},
                a5 = function () {
                    return {
                        ok: 2 == ((s3.status / 100) | 0),
                        statusText: s3.statusText,
                        status: s3.status,
                        url: s3.responseURL,
                        text: function () {
                            return Promise.resolve(s3.responseText);
                        },
                        json: function () {
                            return Promise.resolve(s3.responseText).then(JSON.parse);
                        },
                        blob: function () {
                            return Promise.resolve(new Blob([s3.response]));
                        },
                        clone: a5,
                        headers: {
                            keys: function () {
                                return o3;
                            },
                            entries: function () {
                                return u5;
                            },
                            get: function (e4) {
                                return i4[e4.toLowerCase()];
                            },
                            has: function (e4) {
                                return e4.toLowerCase() in i4;
                            },
                        },
                    };
                };
            for (var l4 in (s3.open(n3.method || 'get', e3, true),
            (s3.onload = function () {
                s3.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (e4, n4, t4) {
                    o3.push((n4 = n4.toLowerCase())), u5.push([n4, t4]), (i4[n4] = i4[n4] ? i4[n4] + ',' + t4 : t4);
                }),
                    t3(a5());
            }),
            (s3.onerror = r3),
            (s3.withCredentials = 'include' == n3.credentials),
            n3.headers))
                s3.setRequestHeader(l4, n3.headers[l4]);
            s3.send(n3.body || null);
        })
    );
}
var init_unfetch_module = __esm({
    'node_modules/unfetch/dist/unfetch.module.js'() {},
});

// node_modules/isomorphic-unfetch/browser.js
var require_browser5 = __commonJS({
    'node_modules/isomorphic-unfetch/browser.js'(exports, module) {
        module.exports =
            self.fetch ||
            (self.fetch =
                (init_unfetch_module(), __toCommonJS(unfetch_module_exports)).default ||
                (init_unfetch_module(), __toCommonJS(unfetch_module_exports)));
    },
});

// node_modules/@concordium/wallet-connectors/dist/WalletConnection.js
function moduleSchemaFromBase64(schemaBase64, version2) {
    return moduleSchema(schemaAsBuffer(schemaBase64), version2);
}
function moduleSchema(schema, version2) {
    return {
        type: 'ModuleSchema',
        value: schema,
        version: version2,
    };
}
function typeSchemaFromBase64(schemaBase64) {
    return typeSchema(schemaAsBuffer(schemaBase64));
}
function typeSchema(schema) {
    return {
        type: 'TypeSchema',
        value: schema,
    };
}
function schemaAsBuffer(schemaBase64) {
    const res = toBuffer(schemaBase64, 'base64');
    if (res.toString('base64') !== schemaBase64) {
        throw new Error(`provided schema '${schemaBase64}' is not valid base64`);
    }
    return res;
}
function stringMessage(msg) {
    return {
        type: 'StringMessage',
        value: msg,
    };
}
function binaryMessageFromHex(msgHex, schema) {
    return {
        type: 'BinaryMessage',
        value: messageAsBuffer(msgHex),
        schema,
    };
}
function messageAsBuffer(msgHex) {
    const res = toBuffer(msgHex, 'hex');
    if (res.toString('hex') !== msgHex) {
        throw new Error(`provided message '${msgHex}' is not valid hex`);
    }
    return res;
}

// node_modules/@concordium/wallet-connectors/dist/WalletConnect.js
var import_qrcode_modal = __toESM(require_cjs4());

// node_modules/@walletconnect/core/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/destr/dist/index.mjs
var suspectProtoRx =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
    if (key === '__proto__' || (key === 'constructor' && value && typeof value === 'object' && 'prototype' in value)) {
        warnKeyDropped(key);
        return;
    }
    return value;
}
function warnKeyDropped(key) {
    console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
    if (typeof value !== 'string') {
        return value;
    }
    const _value = value.trim();
    if (
        // eslint-disable-next-line unicorn/prefer-at
        value[0] === '"' &&
        value.at(-1) === '"' &&
        !value.includes('\\')
    ) {
        return _value.slice(1, -1);
    }
    if (_value.length <= 9) {
        const _lval = _value.toLowerCase();
        if (_lval === 'true') {
            return true;
        }
        if (_lval === 'false') {
            return false;
        }
        if (_lval === 'undefined') {
            return void 0;
        }
        if (_lval === 'null') {
            return null;
        }
        if (_lval === 'nan') {
            return Number.NaN;
        }
        if (_lval === 'infinity') {
            return Number.POSITIVE_INFINITY;
        }
        if (_lval === '-infinity') {
            return Number.NEGATIVE_INFINITY;
        }
    }
    if (!JsonSigRx.test(value)) {
        if (options.strict) {
            throw new SyntaxError('[destr] Invalid JSON');
        }
        return value;
    }
    try {
        if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
            if (options.strict) {
                throw new Error('[destr] Possible prototype pollution');
            }
            return JSON.parse(value, jsonParseTransform);
        }
        return JSON.parse(value);
    } catch (error) {
        if (options.strict) {
            throw error;
        }
        return value;
    }
}

// node_modules/unstorage/dist/shared/unstorage.8581f561.mjs
function wrapToPromise(value) {
    if (!value || typeof value.then !== 'function') {
        return Promise.resolve(value);
    }
    return value;
}
function asyncCall(function_, ...arguments_) {
    try {
        return wrapToPromise(function_(...arguments_));
    } catch (error) {
        return Promise.reject(error);
    }
}
function isPrimitive(value) {
    const type = typeof value;
    return value === null || (type !== 'object' && type !== 'function');
}
function isPureObject(value) {
    const proto = Object.getPrototypeOf(value);
    return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
    if (isPrimitive(value)) {
        return String(value);
    }
    if (isPureObject(value) || Array.isArray(value)) {
        return JSON.stringify(value);
    }
    if (typeof value.toJSON === 'function') {
        return stringify(value.toJSON());
    }
    throw new Error('[unstorage] Cannot stringify value!');
}
function checkBufferSupport() {
    if (typeof Buffer === void 0) {
        throw new TypeError('[unstorage] Buffer is not supported!');
    }
}
var BASE64_PREFIX = 'base64:';
function serializeRaw(value) {
    if (typeof value === 'string') {
        return value;
    }
    checkBufferSupport();
    const base642 = Buffer.from(value).toString('base64');
    return BASE64_PREFIX + base642;
}
function deserializeRaw(value) {
    if (typeof value !== 'string') {
        return value;
    }
    if (!value.startsWith(BASE64_PREFIX)) {
        return value;
    }
    checkBufferSupport();
    return Buffer.from(value.slice(BASE64_PREFIX.length), 'base64');
}
function normalizeKey(key) {
    if (!key) {
        return '';
    }
    return key.split('?')[0].replace(/[/\\]/g, ':').replace(/:+/g, ':').replace(/^:|:$/g, '');
}
function joinKeys(...keys2) {
    return normalizeKey(keys2.join(':'));
}
function normalizeBaseKey(base3) {
    base3 = normalizeKey(base3);
    return base3 ? base3 + ':' : '';
}

// node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
    return factory;
}
var DRIVER_NAME = 'memory';
var memory = defineDriver(() => {
    const data = /* @__PURE__ */ new Map();
    return {
        name: DRIVER_NAME,
        options: {},
        hasItem(key) {
            return data.has(key);
        },
        getItem(key) {
            return data.get(key) ?? null;
        },
        getItemRaw(key) {
            return data.get(key) ?? null;
        },
        setItem(key, value) {
            data.set(key, value);
        },
        setItemRaw(key, value) {
            data.set(key, value);
        },
        removeItem(key) {
            data.delete(key);
        },
        getKeys() {
            return Array.from(data.keys());
        },
        clear() {
            data.clear();
        },
        dispose() {
            data.clear();
        },
    };
});
function createStorage(options = {}) {
    const context = {
        mounts: { '': options.driver || memory() },
        mountpoints: [''],
        watching: false,
        watchListeners: [],
        unwatch: {},
    };
    const getMount = (key) => {
        for (const base3 of context.mountpoints) {
            if (key.startsWith(base3)) {
                return {
                    base: base3,
                    relativeKey: key.slice(base3.length),
                    driver: context.mounts[base3],
                };
            }
        }
        return {
            base: '',
            relativeKey: key,
            driver: context.mounts[''],
        };
    };
    const getMounts = (base3, includeParent) => {
        return context.mountpoints
            .filter((mountpoint) => mountpoint.startsWith(base3) || (includeParent && base3.startsWith(mountpoint)))
            .map((mountpoint) => ({
                relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
                mountpoint,
                driver: context.mounts[mountpoint],
            }));
    };
    const onChange = (event, key) => {
        if (!context.watching) {
            return;
        }
        key = normalizeKey(key);
        for (const listener of context.watchListeners) {
            listener(event, key);
        }
    };
    const startWatch = async () => {
        if (context.watching) {
            return;
        }
        context.watching = true;
        for (const mountpoint in context.mounts) {
            context.unwatch[mountpoint] = await watch(context.mounts[mountpoint], onChange, mountpoint);
        }
    };
    const stopWatch = async () => {
        if (!context.watching) {
            return;
        }
        for (const mountpoint in context.unwatch) {
            await context.unwatch[mountpoint]();
        }
        context.unwatch = {};
        context.watching = false;
    };
    const runBatch = (items, commonOptions, cb) => {
        const batches = /* @__PURE__ */ new Map();
        const getBatch = (mount) => {
            let batch = batches.get(mount.base);
            if (!batch) {
                batch = {
                    driver: mount.driver,
                    base: mount.base,
                    items: [],
                };
                batches.set(mount.base, batch);
            }
            return batch;
        };
        for (const item of items) {
            const isStringItem = typeof item === 'string';
            const key = normalizeKey(isStringItem ? item : item.key);
            const value = isStringItem ? void 0 : item.value;
            const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
            const mount = getMount(key);
            getBatch(mount).items.push({
                key,
                value,
                relativeKey: mount.relativeKey,
                options: options2,
            });
        }
        return Promise.all([...batches.values()].map((batch) => cb(batch))).then((r3) => r3.flat());
    };
    const storage = {
        // Item
        hasItem(key, opts = {}) {
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            return asyncCall(driver.hasItem, relativeKey, opts);
        },
        getItem(key, opts = {}) {
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            return asyncCall(driver.getItem, relativeKey, opts).then((value) => destr(value));
        },
        getItems(items, commonOptions) {
            return runBatch(items, commonOptions, (batch) => {
                if (batch.driver.getItems) {
                    return asyncCall(
                        batch.driver.getItems,
                        batch.items.map((item) => ({
                            key: item.relativeKey,
                            options: item.options,
                        })),
                        commonOptions
                    ).then((r3) =>
                        r3.map((item) => ({
                            key: joinKeys(batch.base, item.key),
                            value: destr(item.value),
                        }))
                    );
                }
                return Promise.all(
                    batch.items.map((item) => {
                        return asyncCall(batch.driver.getItem, item.relativeKey, item.options).then((value) => ({
                            key: item.key,
                            value: destr(value),
                        }));
                    })
                );
            });
        },
        getItemRaw(key, opts = {}) {
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            if (driver.getItemRaw) {
                return asyncCall(driver.getItemRaw, relativeKey, opts);
            }
            return asyncCall(driver.getItem, relativeKey, opts).then((value) => deserializeRaw(value));
        },
        async setItem(key, value, opts = {}) {
            if (value === void 0) {
                return storage.removeItem(key);
            }
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            if (!driver.setItem) {
                return;
            }
            await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
            if (!driver.watch) {
                onChange('update', key);
            }
        },
        async setItems(items, commonOptions) {
            await runBatch(items, commonOptions, async (batch) => {
                if (batch.driver.setItems) {
                    await asyncCall(
                        batch.driver.setItems,
                        batch.items.map((item) => ({
                            key: item.relativeKey,
                            value: stringify(item.value),
                            options: item.options,
                        })),
                        commonOptions
                    );
                }
                if (!batch.driver.setItem) {
                    return;
                }
                await Promise.all(
                    batch.items.map((item) => {
                        return asyncCall(batch.driver.setItem, item.relativeKey, stringify(item.value), item.options);
                    })
                );
            });
        },
        async setItemRaw(key, value, opts = {}) {
            if (value === void 0) {
                return storage.removeItem(key, opts);
            }
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            if (driver.setItemRaw) {
                await asyncCall(driver.setItemRaw, relativeKey, value, opts);
            } else if (driver.setItem) {
                await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
            } else {
                return;
            }
            if (!driver.watch) {
                onChange('update', key);
            }
        },
        async removeItem(key, opts = {}) {
            if (typeof opts === 'boolean') {
                opts = { removeMeta: opts };
            }
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            if (!driver.removeItem) {
                return;
            }
            await asyncCall(driver.removeItem, relativeKey, opts);
            if (opts.removeMeta || opts.removeMata) {
                await asyncCall(driver.removeItem, relativeKey + '$', opts);
            }
            if (!driver.watch) {
                onChange('remove', key);
            }
        },
        // Meta
        async getMeta(key, opts = {}) {
            if (typeof opts === 'boolean') {
                opts = { nativeOnly: opts };
            }
            key = normalizeKey(key);
            const { relativeKey, driver } = getMount(key);
            const meta = /* @__PURE__ */ Object.create(null);
            if (driver.getMeta) {
                Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
            }
            if (!opts.nativeOnly) {
                const value = await asyncCall(driver.getItem, relativeKey + '$', opts).then((value_) => destr(value_));
                if (value && typeof value === 'object') {
                    if (typeof value.atime === 'string') {
                        value.atime = new Date(value.atime);
                    }
                    if (typeof value.mtime === 'string') {
                        value.mtime = new Date(value.mtime);
                    }
                    Object.assign(meta, value);
                }
            }
            return meta;
        },
        setMeta(key, value, opts = {}) {
            return this.setItem(key + '$', value, opts);
        },
        removeMeta(key, opts = {}) {
            return this.removeItem(key + '$', opts);
        },
        // Keys
        async getKeys(base3, opts = {}) {
            base3 = normalizeBaseKey(base3);
            const mounts = getMounts(base3, true);
            let maskedMounts = [];
            const allKeys = [];
            for (const mount of mounts) {
                const rawKeys = await asyncCall(mount.driver.getKeys, mount.relativeBase, opts);
                const keys2 = rawKeys
                    .map((key) => mount.mountpoint + normalizeKey(key))
                    .filter((key) => !maskedMounts.some((p5) => key.startsWith(p5)));
                allKeys.push(...keys2);
                maskedMounts = [mount.mountpoint, ...maskedMounts.filter((p5) => !p5.startsWith(mount.mountpoint))];
            }
            return base3
                ? allKeys.filter((key) => key.startsWith(base3) && !key.endsWith('$'))
                : allKeys.filter((key) => !key.endsWith('$'));
        },
        // Utils
        async clear(base3, opts = {}) {
            base3 = normalizeBaseKey(base3);
            await Promise.all(
                getMounts(base3, false).map(async (m4) => {
                    if (m4.driver.clear) {
                        return asyncCall(m4.driver.clear, m4.relativeBase, opts);
                    }
                    if (m4.driver.removeItem) {
                        const keys2 = await m4.driver.getKeys(m4.relativeBase || '', opts);
                        return Promise.all(keys2.map((key) => m4.driver.removeItem(key, opts)));
                    }
                })
            );
        },
        async dispose() {
            await Promise.all(Object.values(context.mounts).map((driver) => dispose(driver)));
        },
        async watch(callback) {
            await startWatch();
            context.watchListeners.push(callback);
            return async () => {
                context.watchListeners = context.watchListeners.filter((listener) => listener !== callback);
                if (context.watchListeners.length === 0) {
                    await stopWatch();
                }
            };
        },
        async unwatch() {
            context.watchListeners = [];
            await stopWatch();
        },
        // Mount
        mount(base3, driver) {
            base3 = normalizeBaseKey(base3);
            if (base3 && context.mounts[base3]) {
                throw new Error(`already mounted at ${base3}`);
            }
            if (base3) {
                context.mountpoints.push(base3);
                context.mountpoints.sort((a5, b5) => b5.length - a5.length);
            }
            context.mounts[base3] = driver;
            if (context.watching) {
                Promise.resolve(watch(driver, onChange, base3))
                    .then((unwatcher) => {
                        context.unwatch[base3] = unwatcher;
                    })
                    .catch(console.error);
            }
            return storage;
        },
        async unmount(base3, _dispose = true) {
            base3 = normalizeBaseKey(base3);
            if (!base3 || !context.mounts[base3]) {
                return;
            }
            if (context.watching && base3 in context.unwatch) {
                context.unwatch[base3]();
                delete context.unwatch[base3];
            }
            if (_dispose) {
                await dispose(context.mounts[base3]);
            }
            context.mountpoints = context.mountpoints.filter((key) => key !== base3);
            delete context.mounts[base3];
        },
        getMount(key = '') {
            key = normalizeKey(key) + ':';
            const m4 = getMount(key);
            return {
                driver: m4.driver,
                base: m4.base,
            };
        },
        getMounts(base3 = '', opts = {}) {
            base3 = normalizeKey(base3);
            const mounts = getMounts(base3, opts.parents);
            return mounts.map((m4) => ({
                driver: m4.driver,
                base: m4.mountpoint,
            }));
        },
    };
    return storage;
}
function watch(driver, onChange, base3) {
    return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {};
}
async function dispose(driver) {
    if (typeof driver.dispose === 'function') {
        await asyncCall(driver.dispose);
    }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function () {
        if (!this.result) return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
}

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) =>
    JSON.stringify(data, (_6, value) => (typeof value === 'bigint' ? value.toString() + 'n' : value));
var JSONParse = (json) => {
    const numbersBiggerThanMaxInt =
        /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
    const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
    return JSON.parse(serializedData, (_6, value) => {
        const isCustomFormatBigInt = typeof value === 'string' && value.match(/^\d+n$/);
        if (isCustomFormatBigInt) return BigInt(value.substring(0, value.length - 1));
        return value;
    });
};
function safeJsonParse3(value) {
    if (typeof value !== 'string') {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    }
    try {
        return JSONParse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify3(value) {
    return typeof value === 'string' ? value : JSONStringify(value) || '';
}

// node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x3 = 'idb-keyval';
var z3 = (i4 = {}) => {
    const t3 = i4.base && i4.base.length > 0 ? `${i4.base}:` : '',
        e3 = (s3) => t3 + s3;
    let n3;
    return (
        i4.dbName && i4.storeName && (n3 = createStore(i4.dbName, i4.storeName)),
        {
            name: x3,
            options: i4,
            async hasItem(s3) {
                return !(typeof (await get(e3(s3), n3)) > 'u');
            },
            async getItem(s3) {
                return (await get(e3(s3), n3)) ?? null;
            },
            setItem(s3, a5) {
                return set(e3(s3), a5, n3);
            },
            removeItem(s3) {
                return del(e3(s3), n3);
            },
            getKeys() {
                return keys(n3);
            },
            clear() {
                return clear(n3);
            },
        }
    );
};
var D3 = 'WALLET_CONNECT_V2_INDEXED_DB';
var E4 = 'keyvaluestorage';
var _4 = class {
    constructor() {
        this.indexedDb = createStorage({ driver: z3({ dbName: D3, storeName: E4 }) });
    }
    async getKeys() {
        return this.indexedDb.getKeys();
    }
    async getEntries() {
        return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t3) => [t3.key, t3.value]);
    }
    async getItem(t3) {
        const e3 = await this.indexedDb.getItem(t3);
        if (e3 !== null) return e3;
    }
    async setItem(t3, e3) {
        await this.indexedDb.setItem(t3, safeJsonStringify3(e3));
    }
    async removeItem(t3) {
        await this.indexedDb.removeItem(t3);
    }
};
var l3 =
    typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : typeof self < 'u'
              ? self
              : {};
var c3 = { exports: {} };
(function () {
    let i4;
    function t3() {}
    (i4 = t3),
        (i4.prototype.getItem = function (e3) {
            return this.hasOwnProperty(e3) ? String(this[e3]) : null;
        }),
        (i4.prototype.setItem = function (e3, n3) {
            this[e3] = String(n3);
        }),
        (i4.prototype.removeItem = function (e3) {
            delete this[e3];
        }),
        (i4.prototype.clear = function () {
            const e3 = this;
            Object.keys(e3).forEach(function (n3) {
                (e3[n3] = void 0), delete e3[n3];
            });
        }),
        (i4.prototype.key = function (e3) {
            return (e3 = e3 || 0), Object.keys(this)[e3];
        }),
        i4.prototype.__defineGetter__('length', function () {
            return Object.keys(this).length;
        }),
        typeof l3 < 'u' && l3.localStorage
            ? (c3.exports = l3.localStorage)
            : typeof window < 'u' && window.localStorage
              ? (c3.exports = window.localStorage)
              : (c3.exports = new t3());
})();
function k3(i4) {
    var t3;
    return [i4[0], safeJsonParse3((t3 = i4[1]) != null ? t3 : '')];
}
var K2 = class {
    constructor() {
        this.localStorage = c3.exports;
    }
    async getKeys() {
        return Object.keys(this.localStorage);
    }
    async getEntries() {
        return Object.entries(this.localStorage).map(k3);
    }
    async getItem(t3) {
        const e3 = this.localStorage.getItem(t3);
        if (e3 !== null) return safeJsonParse3(e3);
    }
    async setItem(t3, e3) {
        this.localStorage.setItem(t3, safeJsonStringify3(e3));
    }
    async removeItem(t3) {
        this.localStorage.removeItem(t3);
    }
};
var N3 = 'wc_storage_version';
var y3 = 1;
var O2 = async (i4, t3, e3) => {
    const n3 = N3,
        s3 = await t3.getItem(n3);
    if (s3 && s3 >= y3) {
        e3(t3);
        return;
    }
    const a5 = await i4.getKeys();
    if (!a5.length) {
        e3(t3);
        return;
    }
    const m4 = [];
    for (; a5.length; ) {
        const r3 = a5.shift();
        if (!r3) continue;
        const o3 = r3.toLowerCase();
        if (o3.includes('wc@') || o3.includes('walletconnect') || o3.includes('wc_') || o3.includes('wallet_connect')) {
            const f4 = await i4.getItem(r3);
            await t3.setItem(r3, f4), m4.push(r3);
        }
    }
    await t3.setItem(n3, y3), e3(t3), j3(i4, m4);
};
var j3 = async (i4, t3) => {
    t3.length &&
        t3.forEach(async (e3) => {
            await i4.removeItem(e3);
        });
};
var h3 = class {
    constructor() {
        (this.initialized = false),
            (this.setInitialized = (e3) => {
                (this.storage = e3), (this.initialized = true);
            });
        const t3 = new K2();
        this.storage = t3;
        try {
            const e3 = new _4();
            O2(t3, e3, this.setInitialized);
        } catch {
            this.initialized = true;
        }
    }
    async getKeys() {
        return await this.initialize(), this.storage.getKeys();
    }
    async getEntries() {
        return await this.initialize(), this.storage.getEntries();
    }
    async getItem(t3) {
        return await this.initialize(), this.storage.getItem(t3);
    }
    async setItem(t3, e3) {
        return await this.initialize(), this.storage.setItem(t3, e3);
    }
    async removeItem(t3) {
        return await this.initialize(), this.storage.removeItem(t3);
    }
    async initialize() {
        this.initialized ||
            (await new Promise((t3) => {
                const e3 = setInterval(() => {
                    this.initialized && (clearInterval(e3), t3());
                }, 20);
            }));
    }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_heartbeat = __toESM(require_cjs6());
var import_logger = __toESM(require_cjs7());

// node_modules/@walletconnect/types/dist/index.es.js
init_esm3();
var import_events2 = __toESM(require_events());
var n2 = class extends IEvents {
    constructor(s3) {
        super(), (this.opts = s3), (this.protocol = 'wc'), (this.version = 2);
    }
};
var h4 = class extends IEvents {
    constructor(s3, t3) {
        super(), (this.core = s3), (this.logger = t3), (this.records = /* @__PURE__ */ new Map());
    }
};
var a3 = class {
    constructor(s3, t3) {
        (this.logger = s3), (this.core = t3);
    }
};
var u3 = class extends IEvents {
    constructor(s3, t3) {
        super(), (this.relayer = s3), (this.logger = t3);
    }
};
var g3 = class extends IEvents {
    constructor(s3) {
        super();
    }
};
var p3 = class {
    constructor(s3, t3, o3, M5) {
        (this.core = s3), (this.logger = t3), (this.name = o3);
    }
};
var d3 = class extends IEvents {
    constructor(s3, t3) {
        super(), (this.relayer = s3), (this.logger = t3);
    }
};
var E5 = class extends IEvents {
    constructor(s3, t3) {
        super(), (this.core = s3), (this.logger = t3);
    }
};
var y4 = class {
    constructor(s3, t3) {
        (this.projectId = s3), (this.logger = t3);
    }
};
var v3 = class {
    constructor(s3, t3) {
        (this.projectId = s3), (this.logger = t3);
    }
};
var b2 = class {
    constructor(s3) {
        (this.opts = s3), (this.protocol = 'wc'), (this.version = 2);
    }
};
var w4 = class {
    constructor(s3) {
        this.client = s3;
    }
};

// node_modules/@walletconnect/relay-auth/dist/esm/api.js
var ed25519 = __toESM(require_ed25519());
var import_random = __toESM(require_random());
var import_time = __toESM(require_cjs5());

// node_modules/@walletconnect/relay-auth/dist/esm/constants.js
var JWT_IRIDIUM_ALG = 'EdDSA';
var JWT_IRIDIUM_TYP = 'JWT';
var JWT_DELIMITER = '.';
var JWT_ENCODING = 'base64url';
var JSON_ENCODING = 'utf8';
var DATA_ENCODING = 'utf8';
var DID_DELIMITER = ':';
var DID_PREFIX = 'did';
var DID_METHOD = 'key';
var MULTICODEC_ED25519_ENCODING = 'base58btc';
var MULTICODEC_ED25519_BASE = 'z';
var MULTICODEC_ED25519_HEADER = 'K36';
var KEY_PAIR_SEED_LENGTH = 32;

// node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
    if (globalThis.Buffer != null) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    return buf;
}

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
        return asUint8Array(globalThis.Buffer.allocUnsafe(size));
    }
    return new Uint8Array(size);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat(arrays, length2) {
    if (!length2) {
        length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
    }
    const output = allocUnsafe(length2);
    let offset = 0;
    for (const arr of arrays) {
        output.set(arr, offset);
        offset += arr.length;
    }
    return asUint8Array(output);
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
    identity: () => identity,
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
    if (ALPHABET.length >= 255) {
        throw new TypeError('Alphabet too long');
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j5 = 0; j5 < BASE_MAP.length; j5++) {
        BASE_MAP[j5] = 255;
    }
    for (var i4 = 0; i4 < ALPHABET.length; i4++) {
        var x5 = ALPHABET.charAt(i4);
        var xc = x5.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x5 + ' is ambiguous');
        }
        BASE_MAP[xc] = i4;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode5(source) {
        if (source instanceof Uint8Array);
        else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
            throw new TypeError('Expected Uint8Array');
        }
        if (source.length === 0) {
            return '';
        }
        var zeroes = 0;
        var length2 = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
        }
        var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
            var carry = source[pbegin];
            var i5 = 0;
            for (var it1 = size - 1; (carry !== 0 || i5 < length2) && it1 !== -1; it1--, i5++) {
                carry += (256 * b58[it1]) >>> 0;
                b58[it1] = carry % BASE >>> 0;
                carry = (carry / BASE) >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length2 = i5;
            pbegin++;
        }
        var it2 = size - length2;
        while (it2 !== size && b58[it2] === 0) {
            it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
        }
        return str;
    }
    function decodeUnsafe(source) {
        if (typeof source !== 'string') {
            throw new TypeError('Expected String');
        }
        if (source.length === 0) {
            return new Uint8Array();
        }
        var psz = 0;
        if (source[psz] === ' ') {
            return;
        }
        var zeroes = 0;
        var length2 = 0;
        while (source[psz] === LEADER) {
            zeroes++;
            psz++;
        }
        var size = ((source.length - psz) * FACTOR + 1) >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) {
                return;
            }
            var i5 = 0;
            for (var it3 = size - 1; (carry !== 0 || i5 < length2) && it3 !== -1; it3--, i5++) {
                carry += (BASE * b256[it3]) >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = (carry / 256) >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length2 = i5;
            psz++;
        }
        if (source[psz] === ' ') {
            return;
        }
        var it4 = size - length2;
        while (it4 !== size && b256[it4] === 0) {
            it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j6 = zeroes;
        while (it4 !== size) {
            vch[j6++] = b256[it4++];
        }
        return vch;
    }
    function decode6(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
            return buffer;
        }
        throw new Error(`Non-${name2} character`);
    }
    return {
        encode: encode5,
        decodeUnsafe,
        decode: decode6,
    };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) {
        return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
            return false;
        }
    }
    return true;
};
var coerce = (o3) => {
    if (o3 instanceof Uint8Array && o3.constructor.name === 'Uint8Array') return o3;
    if (o3 instanceof ArrayBuffer) return new Uint8Array(o3);
    if (ArrayBuffer.isView(o3)) {
        return new Uint8Array(o3.buffer, o3.byteOffset, o3.byteLength);
    }
    throw new Error('Unknown type, must be binary type');
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b5) => new TextDecoder().decode(b5);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
    constructor(name2, prefix, baseEncode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
    }
    encode(bytes) {
        if (bytes instanceof Uint8Array) {
            return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
            throw Error('Unknown type, must be binary type');
        }
    }
};
var Decoder = class {
    constructor(name2, prefix, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === void 0) {
            throw new Error('Invalid prefix character');
        }
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
    }
    decode(text) {
        if (typeof text === 'string') {
            if (text.codePointAt(0) !== this.prefixCodePoint) {
                throw Error(
                    `Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`
                );
            }
            return this.baseDecode(text.slice(this.prefix.length));
        } else {
            throw Error('Can only multibase decode strings');
        }
    }
    or(decoder) {
        return or(this, decoder);
    }
};
var ComposedDecoder = class {
    constructor(decoders) {
        this.decoders = decoders;
    }
    or(decoder) {
        return or(this, decoder);
    }
    decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
            return decoder.decode(input);
        } else {
            throw RangeError(
                `Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
            );
        }
    }
};
var or = (left, right) =>
    new ComposedDecoder({
        ...(left.decoders || { [left.prefix]: left }),
        ...(right.decoders || { [right.prefix]: right }),
    });
var Codec = class {
    constructor(name2, prefix, baseEncode, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name2, prefix, baseEncode);
        this.decoder = new Decoder(name2, prefix, baseDecode);
    }
    encode(input) {
        return this.encoder.encode(input);
    }
    decode(input) {
        return this.decoder.decode(input);
    }
};
var from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
    const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
    return from({
        prefix,
        name: name2,
        encode: encode5,
        decode: (text) => coerce(decode6(text)),
    });
};
var decode = (string2, alphabet2, bitsPerChar, name2) => {
    const codes = {};
    for (let i4 = 0; i4 < alphabet2.length; ++i4) {
        codes[alphabet2[i4]] = i4;
    }
    let end = string2.length;
    while (string2[end - 1] === '=') {
        --end;
    }
    const out = new Uint8Array(((end * bitsPerChar) / 8) | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for (let i4 = 0; i4 < end; ++i4) {
        const value = codes[string2[i4]];
        if (value === void 0) {
            throw new SyntaxError(`Non-${name2} character`);
        }
        buffer = (buffer << bitsPerChar) | value;
        bits += bitsPerChar;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & (buffer >> bits);
        }
    }
    if (bits >= bitsPerChar || 255 & (buffer << (8 - bits))) {
        throw new SyntaxError('Unexpected end of data');
    }
    return out;
};
var encode = (data, alphabet2, bitsPerChar) => {
    const pad = alphabet2[alphabet2.length - 1] === '=';
    const mask = (1 << bitsPerChar) - 1;
    let out = '';
    let bits = 0;
    let buffer = 0;
    for (let i4 = 0; i4 < data.length; ++i4) {
        buffer = (buffer << 8) | data[i4];
        bits += 8;
        while (bits > bitsPerChar) {
            bits -= bitsPerChar;
            out += alphabet2[mask & (buffer >> bits)];
        }
    }
    if (bits) {
        out += alphabet2[mask & (buffer << (bitsPerChar - bits))];
    }
    if (pad) {
        while ((out.length * bitsPerChar) & 7) {
            out += '=';
        }
    }
    return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
    return from({
        prefix,
        name: name2,
        encode(input) {
            return encode(input, alphabet2, bitsPerChar);
        },
        decode(input) {
            return decode(input, alphabet2, bitsPerChar, name2);
        },
    });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from({
    prefix: '\0',
    name: 'identity',
    encode: (buf) => toString(buf),
    decode: (str) => fromString(str),
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
    base2: () => base2,
});
var base2 = rfc4648({
    prefix: '0',
    name: 'base2',
    alphabet: '01',
    bitsPerChar: 1,
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
    base8: () => base8,
});
var base8 = rfc4648({
    prefix: '7',
    name: 'base8',
    alphabet: '01234567',
    bitsPerChar: 3,
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
    base10: () => base10,
});
var base10 = baseX({
    prefix: '9',
    name: 'base10',
    alphabet: '0123456789',
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
    base16: () => base16,
    base16upper: () => base16upper,
});
var base16 = rfc4648({
    prefix: 'f',
    name: 'base16',
    alphabet: '0123456789abcdef',
    bitsPerChar: 4,
});
var base16upper = rfc4648({
    prefix: 'F',
    name: 'base16upper',
    alphabet: '0123456789ABCDEF',
    bitsPerChar: 4,
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
    base32: () => base32,
    base32hex: () => base32hex,
    base32hexpad: () => base32hexpad,
    base32hexpadupper: () => base32hexpadupper,
    base32hexupper: () => base32hexupper,
    base32pad: () => base32pad,
    base32padupper: () => base32padupper,
    base32upper: () => base32upper,
    base32z: () => base32z,
});
var base32 = rfc4648({
    prefix: 'b',
    name: 'base32',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
    bitsPerChar: 5,
});
var base32upper = rfc4648({
    prefix: 'B',
    name: 'base32upper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    bitsPerChar: 5,
});
var base32pad = rfc4648({
    prefix: 'c',
    name: 'base32pad',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
    bitsPerChar: 5,
});
var base32padupper = rfc4648({
    prefix: 'C',
    name: 'base32padupper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
    bitsPerChar: 5,
});
var base32hex = rfc4648({
    prefix: 'v',
    name: 'base32hex',
    alphabet: '0123456789abcdefghijklmnopqrstuv',
    bitsPerChar: 5,
});
var base32hexupper = rfc4648({
    prefix: 'V',
    name: 'base32hexupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    bitsPerChar: 5,
});
var base32hexpad = rfc4648({
    prefix: 't',
    name: 'base32hexpad',
    alphabet: '0123456789abcdefghijklmnopqrstuv=',
    bitsPerChar: 5,
});
var base32hexpadupper = rfc4648({
    prefix: 'T',
    name: 'base32hexpadupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
    bitsPerChar: 5,
});
var base32z = rfc4648({
    prefix: 'h',
    name: 'base32z',
    alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    bitsPerChar: 5,
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
    base36: () => base36,
    base36upper: () => base36upper,
});
var base36 = baseX({
    prefix: 'k',
    name: 'base36',
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyz',
});
var base36upper = baseX({
    prefix: 'K',
    name: 'base36upper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
    base58btc: () => base58btc,
    base58flickr: () => base58flickr,
});
var base58btc = baseX({
    name: 'base58btc',
    prefix: 'z',
    alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
});
var base58flickr = baseX({
    name: 'base58flickr',
    prefix: 'Z',
    alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
    base64: () => base64,
    base64pad: () => base64pad,
    base64url: () => base64url,
    base64urlpad: () => base64urlpad,
});
var base64 = rfc4648({
    prefix: 'm',
    name: 'base64',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    bitsPerChar: 6,
});
var base64pad = rfc4648({
    prefix: 'M',
    name: 'base64pad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    bitsPerChar: 6,
});
var base64url = rfc4648({
    prefix: 'u',
    name: 'base64url',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    bitsPerChar: 6,
});
var base64urlpad = rfc4648({
    prefix: 'U',
    name: 'base64urlpad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
    bitsPerChar: 6,
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
    base256emoji: () => base256emoji,
});
var alphabet = Array.from(
    '🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂'
);
var alphabetBytesToChars = alphabet.reduce((p5, c5, i4) => {
    p5[i4] = c5;
    return p5;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p5, c5, i4) => {
    p5[c5.codePointAt(0)] = i4;
    return p5;
}, []);
function encode2(data) {
    return data.reduce((p5, c5) => {
        p5 += alphabetBytesToChars[c5];
        return p5;
    }, '');
}
function decode2(str) {
    const byts = [];
    for (const char of str) {
        const byt = alphabetCharsToBytes[char.codePointAt(0)];
        if (byt === void 0) {
            throw new Error(`Non-base256emoji character: ${char}`);
        }
        byts.push(byt);
    }
    return new Uint8Array(byts);
}
var base256emoji = from({
    prefix: '🚀',
    name: 'base256emoji',
    encode: encode2,
    decode: decode2,
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
    sha256: () => sha256,
    sha512: () => sha512,
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode3;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode3(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
        out[offset++] = (num & 255) | MSB;
        num /= 128;
    }
    while (num & MSBALL) {
        out[offset++] = (num & 255) | MSB;
        num >>>= 7;
    }
    out[offset] = num | 0;
    encode3.bytes = offset - oldOffset + 1;
    return out;
}
var decode3 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
    var res = 0,
        offset = offset || 0,
        shift = 0,
        counter = offset,
        b5,
        l4 = buf.length;
    do {
        if (counter >= l4) {
            read.bytes = 0;
            throw new RangeError('Could not decode varint');
        }
        b5 = buf[counter++];
        res += shift < 28 ? (b5 & REST$1) << shift : (b5 & REST$1) * Math.pow(2, shift);
        shift += 7;
    } while (b5 >= MSB$1);
    read.bytes = counter - offset;
    return res;
}
var N1 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function (value) {
    return value < N1
        ? 1
        : value < N22
          ? 2
          : value < N32
            ? 3
            : value < N4
              ? 4
              : value < N5
                ? 5
                : value < N6
                  ? 6
                  : value < N7
                    ? 7
                    : value < N8
                      ? 8
                      : value < N9
                        ? 9
                        : 10;
};
var varint = {
    encode: encode_1,
    decode: decode3,
    encodingLength: length,
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode4 = (data, offset = 0) => {
    const code2 = varint_default.decode(data, offset);
    return [code2, varint_default.decode.bytes];
};
var encodeTo = (int, target, offset = 0) => {
    varint_default.encode(int, target, offset);
    return target;
};
var encodingLength = (int) => {
    return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
    const size = digest2.byteLength;
    const sizeOffset = encodingLength(code2);
    const digestOffset = sizeOffset + encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    encodeTo(code2, bytes, 0);
    encodeTo(size, bytes, sizeOffset);
    bytes.set(digest2, digestOffset);
    return new Digest(code2, size, digest2, bytes);
};
var decode5 = (multihash) => {
    const bytes = coerce(multihash);
    const [code2, sizeOffset] = decode4(bytes);
    const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
    const digest2 = bytes.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size) {
        throw new Error('Incorrect length');
    }
    return new Digest(code2, size, digest2, bytes);
};
var equals2 = (a5, b5) => {
    if (a5 === b5) {
        return true;
    } else {
        return a5.code === b5.code && a5.size === b5.size && equals(a5.bytes, b5.bytes);
    }
};
var Digest = class {
    constructor(code2, size, digest2, bytes) {
        this.code = code2;
        this.size = size;
        this.digest = digest2;
        this.bytes = bytes;
    }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
var Hasher = class {
    constructor(name2, code2, encode5) {
        this.name = name2;
        this.code = code2;
        this.encode = encode5;
    }
    digest(input) {
        if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array
                ? create(this.code, result)
                : result.then((digest2) => create(this.code, digest2));
        } else {
            throw Error('Unknown type, must be binary type');
        }
    }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
    name: 'sha2-256',
    code: 18,
    encode: sha('SHA-256'),
});
var sha512 = from2({
    name: 'sha2-512',
    code: 19,
    encode: sha('SHA-512'),
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
    identity: () => identity2,
});
var code = 0;
var name = 'identity';
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
    code,
    name,
    encode: encode4,
    digest,
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
    constructor(version2, code2, multihash, bytes) {
        this.code = code2;
        this.version = version2;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = /* @__PURE__ */ new Map();
        Object.defineProperties(this, {
            byteOffset: hidden,
            byteLength: hidden,
            code: readonly,
            version: readonly,
            multihash: readonly,
            bytes: readonly,
            _baseCache: hidden,
            asCID: hidden,
        });
    }
    toV0() {
        switch (this.version) {
            case 0: {
                return this;
            }
            default: {
                const { code: code2, multihash } = this;
                if (code2 !== DAG_PB_CODE) {
                    throw new Error('Cannot convert a non dag-pb CID to CIDv0');
                }
                if (multihash.code !== SHA_256_CODE) {
                    throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
                }
                return _CID.createV0(multihash);
            }
        }
    }
    toV1() {
        switch (this.version) {
            case 0: {
                const { code: code2, digest: digest2 } = this.multihash;
                const multihash = create(code2, digest2);
                return _CID.createV1(this.code, multihash);
            }
            case 1: {
                return this;
            }
            default: {
                throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
            }
        }
    }
    equals(other) {
        return (
            other &&
            this.code === other.code &&
            this.version === other.version &&
            equals2(this.multihash, other.multihash)
        );
    }
    toString(base3) {
        const { bytes, version: version2, _baseCache } = this;
        switch (version2) {
            case 0:
                return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
            default:
                return toStringV1(bytes, _baseCache, base3 || base32.encoder);
        }
    }
    toJSON() {
        return {
            code: this.code,
            version: this.version,
            hash: this.multihash.bytes,
        };
    }
    get [Symbol.toStringTag]() {
        return 'CID';
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return 'CID(' + this.toString() + ')';
    }
    static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
        throw new Error('Deprecated, use .toString()');
    }
    get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
        throw new Error('Deprecated .buffer property, use .bytes to get Uint8Array instead');
    }
    get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
        throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
        if (value instanceof _CID) {
            return value;
        } else if (value != null && value.asCID === value) {
            const { version: version2, code: code2, multihash, bytes } = value;
            return new _CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
            const { version: version2, multihash, code: code2 } = value;
            const digest2 = decode5(multihash);
            return _CID.create(version2, code2, digest2);
        } else {
            return null;
        }
    }
    static create(version2, code2, digest2) {
        if (typeof code2 !== 'number') {
            throw new Error('String codecs are no longer supported');
        }
        switch (version2) {
            case 0: {
                if (code2 !== DAG_PB_CODE) {
                    throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
                } else {
                    return new _CID(version2, code2, digest2, digest2.bytes);
                }
            }
            case 1: {
                const bytes = encodeCID(version2, code2, digest2.bytes);
                return new _CID(version2, code2, digest2, bytes);
            }
            default: {
                throw new Error('Invalid version');
            }
        }
    }
    static createV0(digest2) {
        return _CID.create(0, DAG_PB_CODE, digest2);
    }
    static createV1(code2, digest2) {
        return _CID.create(1, code2, digest2);
    }
    static decode(bytes) {
        const [cid, remainder] = _CID.decodeFirst(bytes);
        if (remainder.length) {
            throw new Error('Incorrect length');
        }
        return cid;
    }
    static decodeFirst(bytes) {
        const specs = _CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
            throw new Error('Incorrect length');
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
        return [cid, bytes.subarray(specs.size)];
    }
    static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
            const [i4, length2] = decode4(initialBytes.subarray(offset));
            offset += length2;
            return i4;
        };
        let version2 = next();
        let codec = DAG_PB_CODE;
        if (version2 === 18) {
            version2 = 0;
            offset = 0;
        } else if (version2 === 1) {
            codec = next();
        }
        if (version2 !== 0 && version2 !== 1) {
            throw new RangeError(`Invalid CID version ${version2}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
            version: version2,
            codec,
            multihashCode,
            digestSize,
            multihashSize,
            size,
        };
    }
    static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = _CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
    }
};
var parseCIDtoBytes = (source, base3) => {
    switch (source[0]) {
        case 'Q': {
            const decoder = base3 || base58btc;
            return [base58btc.prefix, decoder.decode(`${base58btc.prefix}${source}`)];
        }
        case base58btc.prefix: {
            const decoder = base3 || base58btc;
            return [base58btc.prefix, decoder.decode(source)];
        }
        case base32.prefix: {
            const decoder = base3 || base32;
            return [base32.prefix, decoder.decode(source)];
        }
        default: {
            if (base3 == null) {
                throw Error('To parse non base32 or base58btc encoded CID multibase decoder must be provided');
            }
            return [source[0], base3.decode(source)];
        }
    }
};
var toStringV0 = (bytes, cache, base3) => {
    const { prefix } = base3;
    if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
    } else {
        return cid;
    }
};
var toStringV1 = (bytes, cache, base3) => {
    const { prefix } = base3;
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
    } else {
        return cid;
    }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code2, multihash) => {
    const codeOffset = encodingLength(version2);
    const hashOffset = codeOffset + encodingLength(code2);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version2, bytes, 0);
    encodeTo(code2, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
};
var cidSymbol = Symbol.for('@ipld/js-cid/CID');
var readonly = {
    writable: false,
    configurable: false,
    enumerable: true,
};
var hidden = {
    writable: false,
    enumerable: false,
    configurable: false,
};
var version = '0.0.0-dev';
var deprecate = (range, message) => {
    if (range.test(version)) {
        console.warn(message);
    } else {
        throw new Error(message);
    }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
    ...identity_exports,
    ...base2_exports,
    ...base8_exports,
    ...base10_exports,
    ...base16_exports,
    ...base32_exports,
    ...base36_exports,
    ...base58_exports,
    ...base64_exports,
    ...base256emoji_exports,
};
var hashes = {
    ...sha2_browser_exports,
    ...identity_exports2,
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
    return {
        name: name2,
        prefix,
        encoder: {
            name: name2,
            prefix,
            encode: encode5,
        },
        decoder: { decode: decode6 },
    };
}
var string = createCodec(
    'utf8',
    'u',
    (buf) => {
        const decoder = new TextDecoder('utf8');
        return 'u' + decoder.decode(buf);
    },
    (str) => {
        const encoder = new TextEncoder();
        return encoder.encode(str.substring(1));
    }
);
var ascii = createCodec(
    'ascii',
    'a',
    (buf) => {
        let string2 = 'a';
        for (let i4 = 0; i4 < buf.length; i4++) {
            string2 += String.fromCharCode(buf[i4]);
        }
        return string2;
    },
    (str) => {
        str = str.substring(1);
        const buf = allocUnsafe(str.length);
        for (let i4 = 0; i4 < str.length; i4++) {
            buf[i4] = str.charCodeAt(i4);
        }
        return buf;
    }
);
var BASES = {
    utf8: string,
    'utf-8': string,
    hex: bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...bases,
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = 'utf8') {
    const base3 = bases_default[encoding];
    if (!base3) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
        return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('utf8');
    }
    return base3.encoder.encode(array).substring(1);
}

// node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = 'utf8') {
    const base3 = bases_default[encoding];
    if (!base3) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
        return asUint8Array(globalThis.Buffer.from(string2, 'utf-8'));
    }
    return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/@walletconnect/relay-auth/dist/esm/utils.js
function encodeJSON(val) {
    return toString2(fromString2(safeJsonStringify3(val), JSON_ENCODING), JWT_ENCODING);
}
function encodeIss(publicKey) {
    const header = fromString2(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
    const multicodec = MULTICODEC_ED25519_BASE + toString2(concat([header, publicKey]), MULTICODEC_ED25519_ENCODING);
    return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}
function encodeSig(bytes) {
    return toString2(bytes, JWT_ENCODING);
}
function encodeData(params) {
    return fromString2([encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER), DATA_ENCODING);
}
function encodeJWT(params) {
    return [encodeJSON(params.header), encodeJSON(params.payload), encodeSig(params.signature)].join(JWT_DELIMITER);
}

// node_modules/@walletconnect/relay-auth/dist/esm/api.js
function generateKeyPair(seed = (0, import_random.randomBytes)(KEY_PAIR_SEED_LENGTH)) {
    return ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, import_time.fromMiliseconds)(Date.now())) {
    const header = { alg: JWT_IRIDIUM_ALG, typ: JWT_IRIDIUM_TYP };
    const iss = encodeIss(keyPair.publicKey);
    const exp = iat + ttl;
    const payload = { iss, sub, aud, iat, exp };
    const data = encodeData({ header, payload });
    const signature = ed25519.sign(keyPair.secretKey, data);
    return encodeJWT({ header, payload, signature });
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_chacha20poly1305 = __toESM(require_chacha20poly1305());
var import_hkdf = __toESM(require_hkdf());
var import_random2 = __toESM(require_random());
var import_sha256 = __toESM(require_sha256());
var fe = __toESM(require_x25519());

// node_modules/@walletconnect/utils/node_modules/detect-browser/es/index.js
var __spreadArray = function (to, from3, pack) {
    if (pack || arguments.length === 2)
        for (var i4 = 0, l4 = from3.length, ar2; i4 < l4; i4++) {
            if (ar2 || !(i4 in from3)) {
                if (!ar2) ar2 = Array.prototype.slice.call(from3, 0, i4);
                ar2[i4] = from3[i4];
            }
        }
    return to.concat(ar2 || Array.prototype.slice.call(from3));
};
var BrowserInfo2 =
    /** @class */
    /* @__PURE__ */ (function () {
        function BrowserInfo3(name2, version2, os2) {
            this.name = name2;
            this.version = version2;
            this.os = os2;
            this.type = 'browser';
        }
        return BrowserInfo3;
    })();
var NodeInfo2 =
    /** @class */
    /* @__PURE__ */ (function () {
        function NodeInfo3(version2) {
            this.version = version2;
            this.type = 'node';
            this.name = 'node';
            this.os = process.platform;
        }
        return NodeInfo3;
    })();
var SearchBotDeviceInfo2 =
    /** @class */
    /* @__PURE__ */ (function () {
        function SearchBotDeviceInfo3(name2, version2, os2, bot) {
            this.name = name2;
            this.version = version2;
            this.os = os2;
            this.bot = bot;
            this.type = 'bot-device';
        }
        return SearchBotDeviceInfo3;
    })();
var BotInfo2 =
    /** @class */
    /* @__PURE__ */ (function () {
        function BotInfo3() {
            this.type = 'bot';
            this.bot = true;
            this.name = 'bot';
            this.version = null;
            this.os = null;
        }
        return BotInfo3;
    })();
var ReactNativeInfo2 =
    /** @class */
    /* @__PURE__ */ (function () {
        function ReactNativeInfo3() {
            this.type = 'react-native';
            this.name = 'react-native';
            this.version = null;
            this.os = null;
        }
        return ReactNativeInfo3;
    })();
var SEARCHBOX_UA_REGEX2 =
    /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX2 = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS2 = 3;
var userAgentRules2 = [
    ['aol', /AOLShield\/([0-9\._]+)/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['edge-ios', /EdgiOS\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
    ['silk', /\bSilk\/([0-9._-]+)\b/],
    ['miui', /MiuiBrowser\/([0-9\.]+)$/],
    ['beaker', /BeakerBrowser\/([0-9\.]+)/],
    ['edge-chromium', /EdgA?\/([0-9\.]+)/],
    ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
    ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    ['pie', /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
    ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['facebook', /FB[AS]V\/([0-9\.]+)/],
    ['instagram', /Instagram\s([0-9\.]+)/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ['curl', /^curl\/([0-9\.]+)$/],
    ['searchbot', SEARCHBOX_UA_REGEX2],
];
var operatingSystemRules2 = [
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Chrome OS', /CrOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\/2/],
];
function detect2(userAgent) {
    if (!!userAgent) {
        return parseUserAgent2(userAgent);
    }
    if (typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return new ReactNativeInfo2();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent2(navigator.userAgent);
    }
    return getNodeVersion2();
}
function matchUserAgent2(ua) {
    return (
        ua !== '' &&
        userAgentRules2.reduce(function (matched, _a) {
            var browser = _a[0],
                regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false)
    );
}
function parseUserAgent2(ua) {
    var matchedRule = matchUserAgent2(ua);
    if (!matchedRule) {
        return null;
    }
    var name2 = matchedRule[0],
        match = matchedRule[1];
    if (name2 === 'searchbot') {
        return new BotInfo2();
    }
    var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS2) {
            versionParts = __spreadArray(
                __spreadArray([], versionParts, true),
                createVersionParts2(REQUIRED_VERSION_PARTS2 - versionParts.length),
                true
            );
        }
    } else {
        versionParts = [];
    }
    var version2 = versionParts.join('.');
    var os2 = detectOS3(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX2.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo2(name2, version2, os2, searchBotMatch[1]);
    }
    return new BrowserInfo2(name2, version2, os2);
}
function detectOS3(ua) {
    for (var ii = 0, count = operatingSystemRules2.length; ii < count; ii++) {
        var _a = operatingSystemRules2[ii],
            os2 = _a[0],
            regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os2;
        }
    }
    return null;
}
function getNodeVersion2() {
    var isNode3 = typeof process !== 'undefined' && process.version;
    return isNode3 ? new NodeInfo2(process.version.slice(1)) : null;
}
function createVersionParts2(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_time2 = __toESM(require_cjs5());
var import_window_getters = __toESM(require_cjs());
var import_window_metadata = __toESM(require_cjs8());
var M3 = __toESM(require_query_string());

// node_modules/@walletconnect/relay-api/dist/esm/jsonrpc.js
var RELAY_JSONRPC = {
    waku: {
        publish: 'waku_publish',
        batchPublish: 'waku_batchPublish',
        subscribe: 'waku_subscribe',
        batchSubscribe: 'waku_batchSubscribe',
        subscription: 'waku_subscription',
        unsubscribe: 'waku_unsubscribe',
        batchUnsubscribe: 'waku_batchUnsubscribe',
    },
    irn: {
        publish: 'irn_publish',
        batchPublish: 'irn_batchPublish',
        subscribe: 'irn_subscribe',
        batchSubscribe: 'irn_batchSubscribe',
        subscription: 'irn_subscription',
        unsubscribe: 'irn_unsubscribe',
        batchUnsubscribe: 'irn_batchUnsubscribe',
    },
    iridium: {
        publish: 'iridium_publish',
        batchPublish: 'iridium_batchPublish',
        subscribe: 'iridium_subscribe',
        batchSubscribe: 'iridium_batchSubscribe',
        subscription: 'iridium_subscription',
        unsubscribe: 'iridium_unsubscribe',
        batchUnsubscribe: 'iridium_batchUnsubscribe',
    },
};

// node_modules/@walletconnect/utils/dist/index.es.js
function L3(e3, n3) {
    return e3.includes(':') ? [e3] : n3.chains || [];
}
var J2 = 'base10';
var p4 = 'base16';
var F3 = 'base64pad';
var H3 = 'utf8';
var Q2 = 0;
var _5 = 1;
var Dn = 0;
var Te = 1;
var Z2 = 12;
var X2 = 32;
function kn() {
    const e3 = fe.generateKeyPair();
    return { privateKey: toString2(e3.secretKey, p4), publicKey: toString2(e3.publicKey, p4) };
}
function Vn() {
    const e3 = (0, import_random2.randomBytes)(X2);
    return toString2(e3, p4);
}
function Mn(e3, n3) {
    const t3 = fe.sharedKey(fromString2(e3, p4), fromString2(n3, p4), true),
        r3 = new import_hkdf.HKDF(import_sha256.SHA256, t3).expand(X2);
    return toString2(r3, p4);
}
function Kn(e3) {
    const n3 = (0, import_sha256.hash)(fromString2(e3, p4));
    return toString2(n3, p4);
}
function Ln(e3) {
    const n3 = (0, import_sha256.hash)(fromString2(e3, H3));
    return toString2(n3, p4);
}
function Pe(e3) {
    return fromString2(`${e3}`, J2);
}
function j4(e3) {
    return Number(toString2(e3, J2));
}
function xn(e3) {
    const n3 = Pe(typeof e3.type < 'u' ? e3.type : Q2);
    if (j4(n3) === _5 && typeof e3.senderPublicKey > 'u')
        throw new Error('Missing sender public key for type 1 envelope');
    const t3 = typeof e3.senderPublicKey < 'u' ? fromString2(e3.senderPublicKey, p4) : void 0,
        r3 = typeof e3.iv < 'u' ? fromString2(e3.iv, p4) : (0, import_random2.randomBytes)(Z2),
        o3 = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e3.symKey, p4)).seal(
            r3,
            fromString2(e3.message, H3)
        );
    return Re({ type: n3, sealed: o3, iv: r3, senderPublicKey: t3 });
}
function Fn(e3) {
    const n3 = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e3.symKey, p4)),
        { sealed: t3, iv: r3 } = ee(e3.encoded),
        o3 = n3.open(r3, t3);
    if (o3 === null) throw new Error('Failed to decrypt');
    return toString2(o3, H3);
}
function Re(e3) {
    if (j4(e3.type) === _5) {
        if (typeof e3.senderPublicKey > 'u') throw new Error('Missing sender public key for type 1 envelope');
        return toString2(concat([e3.type, e3.senderPublicKey, e3.iv, e3.sealed]), F3);
    }
    return toString2(concat([e3.type, e3.iv, e3.sealed]), F3);
}
function ee(e3) {
    const n3 = fromString2(e3, F3),
        t3 = n3.slice(Dn, Te),
        r3 = Te;
    if (j4(t3) === _5) {
        const d4 = r3 + X2,
            l4 = d4 + Z2,
            c5 = n3.slice(r3, d4),
            u5 = n3.slice(d4, l4),
            a5 = n3.slice(l4);
        return { type: t3, sealed: a5, iv: u5, senderPublicKey: c5 };
    }
    const o3 = r3 + Z2,
        s3 = n3.slice(r3, o3),
        i4 = n3.slice(o3);
    return { type: t3, sealed: i4, iv: s3 };
}
function Hn(e3, n3) {
    const t3 = ee(e3);
    return Ae({
        type: j4(t3.type),
        senderPublicKey: typeof t3.senderPublicKey < 'u' ? toString2(t3.senderPublicKey, p4) : void 0,
        receiverPublicKey: n3 == null ? void 0 : n3.receiverPublicKey,
    });
}
function Ae(e3) {
    const n3 = (e3 == null ? void 0 : e3.type) || Q2;
    if (n3 === _5) {
        if (typeof (e3 == null ? void 0 : e3.senderPublicKey) > 'u') throw new Error('missing sender public key');
        if (typeof (e3 == null ? void 0 : e3.receiverPublicKey) > 'u') throw new Error('missing receiver public key');
    }
    return {
        type: n3,
        senderPublicKey: e3 == null ? void 0 : e3.senderPublicKey,
        receiverPublicKey: e3 == null ? void 0 : e3.receiverPublicKey,
    };
}
function qn(e3) {
    return e3.type === _5 && typeof e3.senderPublicKey == 'string' && typeof e3.receiverPublicKey == 'string';
}
var Bn = Object.defineProperty;
var Ue = Object.getOwnPropertySymbols;
var Gn = Object.prototype.hasOwnProperty;
var Wn = Object.prototype.propertyIsEnumerable;
var _e = (e3, n3, t3) =>
    n3 in e3 ? Bn(e3, n3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (e3[n3] = t3);
var $e = (e3, n3) => {
    for (var t3 in n3 || (n3 = {})) Gn.call(n3, t3) && _e(e3, t3, n3[t3]);
    if (Ue) for (var t3 of Ue(n3)) Wn.call(n3, t3) && _e(e3, t3, n3[t3]);
    return e3;
};
var Ce = 'ReactNative';
var m3 = { reactNative: 'react-native', node: 'node', browser: 'browser', unknown: 'unknown' };
var De = 'js';
function te() {
    return typeof process < 'u' && typeof process.versions < 'u' && typeof process.versions.node < 'u';
}
function $3() {
    return (
        !(0, import_window_getters.getDocument)() &&
        !!(0, import_window_getters.getNavigator)() &&
        navigator.product === Ce
    );
}
function D4() {
    return !te() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function R2() {
    return $3() ? m3.reactNative : te() ? m3.node : D4() ? m3.browser : m3.unknown;
}
function Jn() {
    var e3;
    try {
        return $3() && typeof global < 'u' && typeof (global == null ? void 0 : global.Application) < 'u'
            ? (e3 = global.Application) == null
                ? void 0
                : e3.applicationId
            : void 0;
    } catch {
        return;
    }
}
function ke(e3, n3) {
    let t3 = M3.parse(e3);
    return (t3 = $e($e({}, t3), n3)), (e3 = M3.stringify(t3)), e3;
}
function Qn() {
    return (0, import_window_metadata.getWindowMetadata)() || { name: '', description: '', url: '', icons: [''] };
}
function Ve() {
    if (R2() === m3.reactNative && typeof global < 'u' && typeof (global == null ? void 0 : global.Platform) < 'u') {
        const { OS: t3, Version: r3 } = global.Platform;
        return [t3, r3].join('-');
    }
    const e3 = detect2();
    if (e3 === null) return 'unknown';
    const n3 = e3.os ? e3.os.replace(' ', '').toLowerCase() : 'unknown';
    return e3.type === 'browser' ? [n3, e3.name, e3.version].join('-') : [n3, e3.version].join('-');
}
function Me() {
    var e3;
    const n3 = R2();
    return n3 === m3.browser
        ? [n3, ((e3 = (0, import_window_getters.getLocation)()) == null ? void 0 : e3.host) || 'unknown'].join(':')
        : n3;
}
function Ke(e3, n3, t3) {
    const r3 = Ve(),
        o3 = Me();
    return [[e3, n3].join('-'), [De, t3].join('-'), r3, o3].join('/');
}
function Xn({
    protocol: e3,
    version: n3,
    relayUrl: t3,
    sdkVersion: r3,
    auth: o3,
    projectId: s3,
    useOnCloseEvent: i4,
    bundleId: d4,
}) {
    const l4 = t3.split('?'),
        c5 = Ke(e3, n3, r3),
        u5 = { auth: o3, ua: c5, projectId: s3, useOnCloseEvent: i4 || void 0, origin: d4 || void 0 },
        a5 = ke(l4[1] || '', u5);
    return l4[0] + '?' + a5;
}
function O3(e3, n3) {
    return e3.filter((t3) => n3.includes(t3)).length === e3.length;
}
function rt(e3) {
    return Object.fromEntries(e3.entries());
}
function ot(e3) {
    return new Map(Object.entries(e3));
}
function at(e3 = import_time2.FIVE_MINUTES, n3) {
    const t3 = (0, import_time2.toMiliseconds)(e3 || import_time2.FIVE_MINUTES);
    let r3, o3, s3;
    return {
        resolve: (i4) => {
            s3 && r3 && (clearTimeout(s3), r3(i4));
        },
        reject: (i4) => {
            s3 && o3 && (clearTimeout(s3), o3(i4));
        },
        done: () =>
            new Promise((i4, d4) => {
                (s3 = setTimeout(() => {
                    d4(new Error(n3));
                }, t3)),
                    (r3 = i4),
                    (o3 = d4);
            }),
    };
}
function ut(e3, n3, t3) {
    return new Promise(async (r3, o3) => {
        const s3 = setTimeout(() => o3(new Error(t3)), n3);
        try {
            const i4 = await e3;
            r3(i4);
        } catch (i4) {
            o3(i4);
        }
        clearTimeout(s3);
    });
}
function re(e3, n3) {
    if (typeof n3 == 'string' && n3.startsWith(`${e3}:`)) return n3;
    if (e3.toLowerCase() === 'topic') {
        if (typeof n3 != 'string') throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${n3}`;
    } else if (e3.toLowerCase() === 'id') {
        if (typeof n3 != 'number') throw new Error('Value must be "number" for expirer target type: id');
        return `id:${n3}`;
    }
    throw new Error(`Unknown expirer target type: ${e3}`);
}
function lt(e3) {
    return re('topic', e3);
}
function dt(e3) {
    return re('id', e3);
}
function ft(e3) {
    const [n3, t3] = e3.split(':'),
        r3 = { id: void 0, topic: void 0 };
    if (n3 === 'topic' && typeof t3 == 'string') r3.topic = t3;
    else if (n3 === 'id' && Number.isInteger(Number(t3))) r3.id = Number(t3);
    else throw new Error(`Invalid target, expected id:number or topic:string, got ${n3}:${t3}`);
    return r3;
}
function pt(e3, n3) {
    return (0, import_time2.fromMiliseconds)((n3 || Date.now()) + (0, import_time2.toMiliseconds)(e3));
}
function mt(e3) {
    return Date.now() >= (0, import_time2.toMiliseconds)(e3);
}
function yt(e3, n3) {
    return `${e3}${n3 ? `:${n3}` : ''}`;
}
async function gt({ id: e3, topic: n3, wcDeepLink: t3 }) {
    try {
        if (!t3) return;
        const r3 = typeof t3 == 'string' ? JSON.parse(t3) : t3;
        let o3 = r3 == null ? void 0 : r3.href;
        if (typeof o3 != 'string') return;
        o3.endsWith('/') && (o3 = o3.slice(0, -1));
        const s3 = `${o3}/wc?requestId=${e3}&sessionTopic=${n3}`,
            i4 = R2();
        i4 === m3.browser
            ? s3.startsWith('https://')
                ? window.open(s3, '_blank', 'noreferrer noopener')
                : window.open(s3, '_self', 'noreferrer noopener')
            : i4 === m3.reactNative &&
              typeof (global == null ? void 0 : global.Linking) < 'u' &&
              (await global.Linking.openURL(s3));
    } catch (r3) {
        console.error(r3);
    }
}
async function ht(e3, n3) {
    try {
        return (await e3.getItem(n3)) || (D4() ? localStorage.getItem(n3) : void 0);
    } catch (t3) {
        console.error(t3);
    }
}
var He = 'irn';
function vt(e3) {
    return (e3 == null ? void 0 : e3.relay) || { protocol: He };
}
function Et(e3) {
    const n3 = RELAY_JSONRPC[e3];
    if (typeof n3 > 'u') throw new Error(`Relay Protocol not supported: ${e3}`);
    return n3;
}
var bt = Object.defineProperty;
var Nt = Object.defineProperties;
var Ot = Object.getOwnPropertyDescriptors;
var qe = Object.getOwnPropertySymbols;
var St = Object.prototype.hasOwnProperty;
var wt = Object.prototype.propertyIsEnumerable;
var Be = (e3, n3, t3) =>
    n3 in e3 ? bt(e3, n3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (e3[n3] = t3);
var It = (e3, n3) => {
    for (var t3 in n3 || (n3 = {})) St.call(n3, t3) && Be(e3, t3, n3[t3]);
    if (qe) for (var t3 of qe(n3)) wt.call(n3, t3) && Be(e3, t3, n3[t3]);
    return e3;
};
var Tt = (e3, n3) => Nt(e3, Ot(n3));
function Ge(e3, n3 = '-') {
    const t3 = {},
        r3 = 'relay' + n3;
    return (
        Object.keys(e3).forEach((o3) => {
            if (o3.startsWith(r3)) {
                const s3 = o3.replace(r3, ''),
                    i4 = e3[o3];
                t3[s3] = i4;
            }
        }),
        t3
    );
}
function Pt(e3) {
    (e3 = e3.includes('wc://') ? e3.replace('wc://', '') : e3), (e3 = e3.includes('wc:') ? e3.replace('wc:', '') : e3);
    const n3 = e3.indexOf(':'),
        t3 = e3.indexOf('?') !== -1 ? e3.indexOf('?') : void 0,
        r3 = e3.substring(0, n3),
        o3 = e3.substring(n3 + 1, t3).split('@'),
        s3 = typeof t3 < 'u' ? e3.substring(t3) : '',
        i4 = M3.parse(s3);
    return {
        protocol: r3,
        topic: We(o3[0]),
        version: parseInt(o3[1], 10),
        symKey: i4.symKey,
        relay: Ge(i4),
        expiryTimestamp: i4.expiryTimestamp ? parseInt(i4.expiryTimestamp, 10) : void 0,
    };
}
function We(e3) {
    return e3.startsWith('//') ? e3.substring(2) : e3;
}
function ze(e3, n3 = '-') {
    const t3 = 'relay',
        r3 = {};
    return (
        Object.keys(e3).forEach((o3) => {
            const s3 = t3 + n3 + o3;
            e3[o3] && (r3[s3] = e3[o3]);
        }),
        r3
    );
}
function Rt(e3) {
    return (
        `${e3.protocol}:${e3.topic}@${e3.version}?` +
        M3.stringify(Tt(It({ symKey: e3.symKey }, ze(e3.relay)), { expiryTimestamp: e3.expiryTimestamp }))
    );
}
function A4(e3) {
    const n3 = [];
    return (
        e3.forEach((t3) => {
            const [r3, o3] = t3.split(':');
            n3.push(`${r3}:${o3}`);
        }),
        n3
    );
}
function Qe(e3) {
    const n3 = [];
    return (
        Object.values(e3).forEach((t3) => {
            n3.push(...A4(t3.accounts));
        }),
        n3
    );
}
function Ze(e3, n3) {
    const t3 = [];
    return (
        Object.values(e3).forEach((r3) => {
            A4(r3.accounts).includes(n3) && t3.push(...r3.methods);
        }),
        t3
    );
}
function Xe(e3, n3) {
    const t3 = [];
    return (
        Object.values(e3).forEach((r3) => {
            A4(r3.accounts).includes(n3) && t3.push(...r3.events);
        }),
        t3
    );
}
var nn = {
    INVALID_METHOD: { message: 'Invalid method.', code: 1001 },
    INVALID_EVENT: { message: 'Invalid event.', code: 1002 },
    INVALID_UPDATE_REQUEST: { message: 'Invalid update request.', code: 1003 },
    INVALID_EXTEND_REQUEST: { message: 'Invalid extend request.', code: 1004 },
    INVALID_SESSION_SETTLE_REQUEST: { message: 'Invalid session settle request.', code: 1005 },
    UNAUTHORIZED_METHOD: { message: 'Unauthorized method.', code: 3001 },
    UNAUTHORIZED_EVENT: { message: 'Unauthorized event.', code: 3002 },
    UNAUTHORIZED_UPDATE_REQUEST: { message: 'Unauthorized update request.', code: 3003 },
    UNAUTHORIZED_EXTEND_REQUEST: { message: 'Unauthorized extend request.', code: 3004 },
    USER_REJECTED: { message: 'User rejected.', code: 5e3 },
    USER_REJECTED_CHAINS: { message: 'User rejected chains.', code: 5001 },
    USER_REJECTED_METHODS: { message: 'User rejected methods.', code: 5002 },
    USER_REJECTED_EVENTS: { message: 'User rejected events.', code: 5003 },
    UNSUPPORTED_CHAINS: { message: 'Unsupported chains.', code: 5100 },
    UNSUPPORTED_METHODS: { message: 'Unsupported methods.', code: 5101 },
    UNSUPPORTED_EVENTS: { message: 'Unsupported events.', code: 5102 },
    UNSUPPORTED_ACCOUNTS: { message: 'Unsupported accounts.', code: 5103 },
    UNSUPPORTED_NAMESPACE_KEY: { message: 'Unsupported namespace key.', code: 5104 },
    USER_DISCONNECTED: { message: 'User disconnected.', code: 6e3 },
    SESSION_SETTLEMENT_FAILED: { message: 'Session settlement failed.', code: 7e3 },
    WC_METHOD_UNSUPPORTED: { message: 'Unsupported wc_ method.', code: 10001 },
};
var tn = {
    NOT_INITIALIZED: { message: 'Not initialized.', code: 1 },
    NO_MATCHING_KEY: { message: 'No matching key.', code: 2 },
    RESTORE_WILL_OVERRIDE: { message: 'Restore will override.', code: 3 },
    RESUBSCRIBED: { message: 'Resubscribed.', code: 4 },
    MISSING_OR_INVALID: { message: 'Missing or invalid.', code: 5 },
    EXPIRED: { message: 'Expired.', code: 6 },
    UNKNOWN_TYPE: { message: 'Unknown type.', code: 7 },
    MISMATCHED_TOPIC: { message: 'Mismatched topic.', code: 8 },
    NON_CONFORMING_NAMESPACES: { message: 'Non conforming namespaces.', code: 9 },
};
function N10(e3, n3) {
    const { message: t3, code: r3 } = tn[e3];
    return { message: n3 ? `${t3} ${n3}` : t3, code: r3 };
}
function U2(e3, n3) {
    const { message: t3, code: r3 } = nn[e3];
    return { message: n3 ? `${t3} ${n3}` : t3, code: r3 };
}
function k4(e3, n3) {
    return Array.isArray(e3) ? (typeof n3 < 'u' && e3.length ? e3.every(n3) : true) : false;
}
function B2(e3) {
    return Object.getPrototypeOf(e3) === Object.prototype && Object.keys(e3).length;
}
function w5(e3) {
    return typeof e3 > 'u';
}
function g4(e3, n3) {
    return n3 && w5(e3) ? true : typeof e3 == 'string' && !!e3.trim().length;
}
function G2(e3, n3) {
    return n3 && w5(e3) ? true : typeof e3 == 'number' && !isNaN(e3);
}
function Mt(e3, n3) {
    const { requiredNamespaces: t3 } = n3,
        r3 = Object.keys(e3.namespaces),
        o3 = Object.keys(t3);
    let s3 = true;
    return O3(o3, r3)
        ? (r3.forEach((i4) => {
              const { accounts: d4, methods: l4, events: c5 } = e3.namespaces[i4],
                  u5 = A4(d4),
                  a5 = t3[i4];
              (!O3(L3(i4, a5), u5) || !O3(a5.methods, l4) || !O3(a5.events, c5)) && (s3 = false);
          }),
          s3)
        : false;
}
function V2(e3) {
    return g4(e3, false) && e3.includes(':') ? e3.split(':').length === 2 : false;
}
function rn(e3) {
    if (g4(e3, false) && e3.includes(':')) {
        const n3 = e3.split(':');
        if (n3.length === 3) {
            const t3 = n3[0] + ':' + n3[1];
            return !!n3[2] && V2(t3);
        }
    }
    return false;
}
function Kt(e3) {
    if (g4(e3, false))
        try {
            return typeof new URL(e3) < 'u';
        } catch {
            return false;
        }
    return false;
}
function Lt(e3) {
    var n3;
    return (n3 = e3 == null ? void 0 : e3.proposer) == null ? void 0 : n3.publicKey;
}
function xt(e3) {
    return e3 == null ? void 0 : e3.topic;
}
function Ft(e3, n3) {
    let t3 = null;
    return (
        g4(e3 == null ? void 0 : e3.publicKey, false) ||
            (t3 = N10('MISSING_OR_INVALID', `${n3} controller public key should be a string`)),
        t3
    );
}
function ie(e3) {
    let n3 = true;
    return k4(e3) ? e3.length && (n3 = e3.every((t3) => g4(t3, false))) : (n3 = false), n3;
}
function on(e3, n3, t3) {
    let r3 = null;
    return (
        k4(n3) && n3.length
            ? n3.forEach((o3) => {
                  r3 ||
                      V2(o3) ||
                      (r3 = U2(
                          'UNSUPPORTED_CHAINS',
                          `${t3}, chain ${o3} should be a string and conform to "namespace:chainId" format`
                      ));
              })
            : V2(e3) ||
              (r3 = U2(
                  'UNSUPPORTED_CHAINS',
                  `${t3}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`
              )),
        r3
    );
}
function sn(e3, n3, t3) {
    let r3 = null;
    return (
        Object.entries(e3).forEach(([o3, s3]) => {
            if (r3) return;
            const i4 = on(o3, L3(o3, s3), `${n3} ${t3}`);
            i4 && (r3 = i4);
        }),
        r3
    );
}
function cn(e3, n3) {
    let t3 = null;
    return (
        k4(e3)
            ? e3.forEach((r3) => {
                  t3 ||
                      rn(r3) ||
                      (t3 = U2(
                          'UNSUPPORTED_ACCOUNTS',
                          `${n3}, account ${r3} should be a string and conform to "namespace:chainId:address" format`
                      ));
              })
            : (t3 = U2(
                  'UNSUPPORTED_ACCOUNTS',
                  `${n3}, accounts should be an array of strings conforming to "namespace:chainId:address" format`
              )),
        t3
    );
}
function an(e3, n3) {
    let t3 = null;
    return (
        Object.values(e3).forEach((r3) => {
            if (t3) return;
            const o3 = cn(r3 == null ? void 0 : r3.accounts, `${n3} namespace`);
            o3 && (t3 = o3);
        }),
        t3
    );
}
function un(e3, n3) {
    let t3 = null;
    return (
        ie(e3 == null ? void 0 : e3.methods)
            ? ie(e3 == null ? void 0 : e3.events) ||
              (t3 = U2(
                  'UNSUPPORTED_EVENTS',
                  `${n3}, events should be an array of strings or empty array for no events`
              ))
            : (t3 = U2(
                  'UNSUPPORTED_METHODS',
                  `${n3}, methods should be an array of strings or empty array for no methods`
              )),
        t3
    );
}
function ce(e3, n3) {
    let t3 = null;
    return (
        Object.values(e3).forEach((r3) => {
            if (t3) return;
            const o3 = un(r3, `${n3}, namespace`);
            o3 && (t3 = o3);
        }),
        t3
    );
}
function Ht(e3, n3, t3) {
    let r3 = null;
    if (e3 && B2(e3)) {
        const o3 = ce(e3, n3);
        o3 && (r3 = o3);
        const s3 = sn(e3, n3, t3);
        s3 && (r3 = s3);
    } else r3 = N10('MISSING_OR_INVALID', `${n3}, ${t3} should be an object with data`);
    return r3;
}
function ln(e3, n3) {
    let t3 = null;
    if (e3 && B2(e3)) {
        const r3 = ce(e3, n3);
        r3 && (t3 = r3);
        const o3 = an(e3, n3);
        o3 && (t3 = o3);
    } else t3 = N10('MISSING_OR_INVALID', `${n3}, namespaces should be an object with data`);
    return t3;
}
function dn(e3) {
    return g4(e3.protocol, true);
}
function qt(e3, n3) {
    let t3 = false;
    return (
        n3 && !e3
            ? (t3 = true)
            : e3 &&
              k4(e3) &&
              e3.length &&
              e3.forEach((r3) => {
                  t3 = dn(r3);
              }),
        t3
    );
}
function Bt(e3) {
    return typeof e3 == 'number';
}
function Gt(e3) {
    return typeof e3 < 'u' && typeof e3 !== null;
}
function Wt(e3) {
    return !(!e3 || typeof e3 != 'object' || !e3.code || !G2(e3.code, false) || !e3.message || !g4(e3.message, false));
}
function zt(e3) {
    return !(w5(e3) || !g4(e3.method, false));
}
function Yt(e3) {
    return !(w5(e3) || (w5(e3.result) && w5(e3.error)) || !G2(e3.id, false) || !g4(e3.jsonrpc, false));
}
function Jt(e3) {
    return !(w5(e3) || !g4(e3.name, false));
}
function Qt(e3, n3) {
    return !(!V2(n3) || !Qe(e3).includes(n3));
}
function Zt(e3, n3, t3) {
    return g4(t3, false) ? Ze(e3, n3).includes(t3) : false;
}
function Xt(e3, n3, t3) {
    return g4(t3, false) ? Xe(e3, n3).includes(t3) : false;
}
function fn(e3, n3, t3) {
    let r3 = null;
    const o3 = er(e3),
        s3 = nr(n3),
        i4 = Object.keys(o3),
        d4 = Object.keys(s3),
        l4 = pn(Object.keys(e3)),
        c5 = pn(Object.keys(n3)),
        u5 = l4.filter((a5) => !c5.includes(a5));
    return (
        u5.length &&
            (r3 = N10(
                'NON_CONFORMING_NAMESPACES',
                `${t3} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u5.toString()}
      Received: ${Object.keys(n3).toString()}`
            )),
        O3(i4, d4) ||
            (r3 = N10(
                'NON_CONFORMING_NAMESPACES',
                `${t3} namespaces chains don't satisfy required namespaces.
      Required: ${i4.toString()}
      Approved: ${d4.toString()}`
            )),
        Object.keys(n3).forEach((a5) => {
            if (!a5.includes(':') || r3) return;
            const b5 = A4(n3[a5].accounts);
            b5.includes(a5) ||
                (r3 = N10(
                    'NON_CONFORMING_NAMESPACES',
                    `${t3} namespaces accounts don't satisfy namespace accounts for ${a5}
        Required: ${a5}
        Approved: ${b5.toString()}`
                ));
        }),
        i4.forEach((a5) => {
            r3 ||
                (O3(o3[a5].methods, s3[a5].methods)
                    ? O3(o3[a5].events, s3[a5].events) ||
                      (r3 = N10(
                          'NON_CONFORMING_NAMESPACES',
                          `${t3} namespaces events don't satisfy namespace events for ${a5}`
                      ))
                    : (r3 = N10(
                          'NON_CONFORMING_NAMESPACES',
                          `${t3} namespaces methods don't satisfy namespace methods for ${a5}`
                      )));
        }),
        r3
    );
}
function er(e3) {
    const n3 = {};
    return (
        Object.keys(e3).forEach((t3) => {
            var r3;
            t3.includes(':')
                ? (n3[t3] = e3[t3])
                : (r3 = e3[t3].chains) == null ||
                  r3.forEach((o3) => {
                      n3[o3] = { methods: e3[t3].methods, events: e3[t3].events };
                  });
        }),
        n3
    );
}
function pn(e3) {
    return [...new Set(e3.map((n3) => (n3.includes(':') ? n3.split(':')[0] : n3)))];
}
function nr(e3) {
    const n3 = {};
    return (
        Object.keys(e3).forEach((t3) => {
            if (t3.includes(':')) n3[t3] = e3[t3];
            else {
                const r3 = A4(e3[t3].accounts);
                r3 == null
                    ? void 0
                    : r3.forEach((o3) => {
                          n3[o3] = {
                              accounts: e3[t3].accounts.filter((s3) => s3.includes(`${o3}:`)),
                              methods: e3[t3].methods,
                              events: e3[t3].events,
                          };
                      });
            }
        }),
        n3
    );
}
function tr(e3, n3) {
    return G2(e3, false) && e3 <= n3.max && e3 >= n3.min;
}
function rr() {
    const e3 = R2();
    return new Promise((n3) => {
        switch (e3) {
            case m3.browser:
                n3(mn());
                break;
            case m3.reactNative:
                n3(yn());
                break;
            case m3.node:
                n3(gn());
                break;
            default:
                n3(true);
        }
    });
}
function mn() {
    return D4() && (navigator == null ? void 0 : navigator.onLine);
}
async function yn() {
    if ($3() && typeof global < 'u' && global != null && global.NetInfo) {
        const e3 = await (global == null ? void 0 : global.NetInfo.fetch());
        return e3 == null ? void 0 : e3.isConnected;
    }
    return true;
}
function gn() {
    return true;
}
function or2(e3) {
    switch (R2()) {
        case m3.browser:
            hn(e3);
            break;
        case m3.reactNative:
            vn(e3);
            break;
        case m3.node:
            break;
    }
}
function hn(e3) {
    !$3() &&
        D4() &&
        (window.addEventListener('online', () => e3(true)), window.addEventListener('offline', () => e3(false)));
}
function vn(e3) {
    $3() &&
        typeof global < 'u' &&
        global != null &&
        global.NetInfo &&
        (global == null ? void 0 : global.NetInfo.addEventListener((n3) => e3(n3 == null ? void 0 : n3.isConnected)));
}
var ae = {};
var sr = class {
    static get(n3) {
        return ae[n3];
    }
    static set(n3, t3) {
        ae[n3] = t3;
    }
    static delete(n3) {
        delete ae[n3];
    }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_time3 = __toESM(require_cjs5());

// node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js
var import_events3 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports4 = {};
__export(esm_exports4, {
    DEFAULT_ERROR: () => DEFAULT_ERROR,
    IBaseJsonRpcProvider: () => IBaseJsonRpcProvider,
    IEvents: () => IEvents2,
    IJsonRpcConnection: () => IJsonRpcConnection,
    IJsonRpcProvider: () => IJsonRpcProvider,
    INTERNAL_ERROR: () => INTERNAL_ERROR,
    INVALID_PARAMS: () => INVALID_PARAMS,
    INVALID_REQUEST: () => INVALID_REQUEST,
    METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
    PARSE_ERROR: () => PARSE_ERROR,
    RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
    SERVER_ERROR: () => SERVER_ERROR,
    SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
    STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
    formatErrorMessage: () => formatErrorMessage,
    formatJsonRpcError: () => formatJsonRpcError,
    formatJsonRpcRequest: () => formatJsonRpcRequest,
    formatJsonRpcResult: () => formatJsonRpcResult,
    getBigIntRpcId: () => getBigIntRpcId,
    getError: () => getError,
    getErrorByCode: () => getErrorByCode,
    isHttpUrl: () => isHttpUrl,
    isJsonRpcError: () => isJsonRpcError,
    isJsonRpcPayload: () => isJsonRpcPayload,
    isJsonRpcRequest: () => isJsonRpcRequest,
    isJsonRpcResponse: () => isJsonRpcResponse,
    isJsonRpcResult: () => isJsonRpcResult,
    isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
    isLocalhostUrl: () => isLocalhostUrl,
    isNodeJs: () => isNodeJs,
    isReservedErrorCode: () => isReservedErrorCode,
    isServerErrorCode: () => isServerErrorCode,
    isValidDefaultRoute: () => isValidDefaultRoute,
    isValidErrorCode: () => isValidErrorCode,
    isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
    isValidRoute: () => isValidRoute,
    isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
    isValidWildcardRoute: () => isValidWildcardRoute,
    isWsUrl: () => isWsUrl,
    parseConnectionError: () => parseConnectionError,
    payloadId: () => payloadId,
    validateJsonRpcError: () => validateJsonRpcError,
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = 'PARSE_ERROR';
var INVALID_REQUEST = 'INVALID_REQUEST';
var METHOD_NOT_FOUND = 'METHOD_NOT_FOUND';
var INVALID_PARAMS = 'INVALID_PARAMS';
var INTERNAL_ERROR = 'INTERNAL_ERROR';
var SERVER_ERROR = 'SERVER_ERROR';
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: { code: -32700, message: 'Parse error' },
    [INVALID_REQUEST]: { code: -32600, message: 'Invalid Request' },
    [METHOD_NOT_FOUND]: { code: -32601, message: 'Method not found' },
    [INVALID_PARAMS]: { code: -32602, message: 'Invalid params' },
    [INTERNAL_ERROR]: { code: -32603, message: 'Internal error' },
    [SERVER_ERROR]: { code: -32e3, message: 'Server error' },
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
    return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
    return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
    return typeof code2 === 'number';
}
function getError(type) {
    if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
        return STANDARD_ERROR_MAP[DEFAULT_ERROR];
    }
    return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
    const match = Object.values(STANDARD_ERROR_MAP).find((e3) => e3.code === code2);
    if (!match) {
        return STANDARD_ERROR_MAP[DEFAULT_ERROR];
    }
    return match;
}
function validateJsonRpcError(response) {
    if (typeof response.error.code === 'undefined') {
        return { valid: false, error: 'Missing code for JSON-RPC error' };
    }
    if (typeof response.error.message === 'undefined') {
        return { valid: false, error: 'Missing message for JSON-RPC error' };
    }
    if (!isValidErrorCode(response.error.code)) {
        return {
            valid: false,
            error: `Invalid error code type for JSON-RPC: ${response.error.code}`,
        };
    }
    if (isReservedErrorCode(response.error.code)) {
        const error = getErrorByCode(response.error.code);
        if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
            return {
                valid: false,
                error: `Invalid error code message for JSON-RPC: ${response.error.code}`,
            };
        }
    }
    return { valid: true };
}
function parseConnectionError(e3, url, type) {
    return e3.message.includes('getaddrinfo ENOTFOUND') || e3.message.includes('connect ECONNREFUSED')
        ? new Error(`Unavailable ${type} RPC url at ${url}`)
        : e3;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
    isNodeJs: () => isNodeJs,
});
var import_environment = __toESM(require_cjs9());
__reExport(env_exports, __toESM(require_cjs9()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports4, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
    const date = Date.now() * Math.pow(10, entropy);
    const extra = Math.floor(Math.random() * Math.pow(10, entropy));
    return date + extra;
}
function getBigIntRpcId(entropy = 6) {
    return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
    return {
        id: id || payloadId(),
        jsonrpc: '2.0',
        method,
        params,
    };
}
function formatJsonRpcResult(id, result) {
    return {
        id,
        jsonrpc: '2.0',
        result,
    };
}
function formatJsonRpcError(id, error, data) {
    return {
        id,
        jsonrpc: '2.0',
        error: formatErrorMessage(error, data),
    };
}
function formatErrorMessage(error, data) {
    if (typeof error === 'undefined') {
        return getError(INTERNAL_ERROR);
    }
    if (typeof error === 'string') {
        error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
    }
    if (typeof data !== 'undefined') {
        error.data = data;
    }
    if (isReservedErrorCode(error.code)) {
        error = getErrorByCode(error.code);
    }
    return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
    if (route.includes('*')) {
        return isValidWildcardRoute(route);
    }
    if (/\W/g.test(route)) {
        return false;
    }
    return true;
}
function isValidDefaultRoute(route) {
    return route === '*';
}
function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) {
        return true;
    }
    if (!route.includes('*')) {
        return false;
    }
    if (route.split('*').length !== 2) {
        return false;
    }
    if (route.split('*').filter((x5) => x5.trim() === '').length !== 1) {
        return false;
    }
    return true;
}
function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split('*')[0].trim();
}
function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split('*')[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/esm/misc.js
var IEvents2 = class {};

// node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js
var IJsonRpcConnection = class extends IEvents2 {
    constructor(opts) {
        super();
    }
};
var IBaseJsonRpcProvider = class extends IEvents2 {
    constructor() {
        super();
    }
};
var IJsonRpcProvider = class extends IBaseJsonRpcProvider {
    constructor(connection) {
        super();
    }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = '^https?:';
var WS_REGEX = '^wss?:';
function getUrlProtocol(url) {
    const matches = url.match(new RegExp(/^\w+:/, 'gi'));
    if (!matches || !matches.length) return;
    return matches[0];
}
function matchRegexProtocol(url, regex) {
    const protocol = getUrlProtocol(url);
    if (typeof protocol === 'undefined') return false;
    return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
    return new RegExp('wss?://localhost(:d{2,5})?').test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
    return typeof payload === 'object' && 'id' in payload && 'jsonrpc' in payload && payload.jsonrpc === '2.0';
}
function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && 'method' in payload;
}
function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
    return 'result' in payload;
}
function isJsonRpcError(payload) {
    return 'error' in payload;
}
function isJsonRpcValidationInvalid(validation) {
    return 'error' in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js
var JsonRpcProvider = class extends IJsonRpcProvider {
    constructor(connection) {
        super(connection);
        this.events = new import_events3.EventEmitter();
        this.hasRegisteredEventListeners = false;
        this.connection = this.setConnection(connection);
        if (this.connection.connected) {
            this.registerEventListeners();
        }
    }
    async connect(connection = this.connection) {
        await this.open(connection);
    }
    async disconnect() {
        await this.close();
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async request(request, context) {
        return this.requestStrict(
            formatJsonRpcRequest(request.method, request.params || [], request.id || getBigIntRpcId().toString()),
            context
        );
    }
    async requestStrict(request, context) {
        return new Promise(async (resolve, reject) => {
            if (!this.connection.connected) {
                try {
                    await this.open();
                } catch (e3) {
                    reject(e3);
                }
            }
            this.events.on(`${request.id}`, (response) => {
                if (isJsonRpcError(response)) {
                    reject(response.error);
                } else {
                    resolve(response.result);
                }
            });
            try {
                await this.connection.send(request, context);
            } catch (e3) {
                reject(e3);
            }
        });
    }
    setConnection(connection = this.connection) {
        return connection;
    }
    onPayload(payload) {
        this.events.emit('payload', payload);
        if (isJsonRpcResponse(payload)) {
            this.events.emit(`${payload.id}`, payload);
        } else {
            this.events.emit('message', {
                type: payload.method,
                data: payload.params,
            });
        }
    }
    onClose(event) {
        if (event && event.code === 3e3) {
            this.events.emit(
                'error',
                new Error(
                    `WebSocket connection closed abnormally with code: ${event.code} ${event.reason ? `(${event.reason})` : ''}`
                )
            );
        }
        this.events.emit('disconnect');
    }
    async open(connection = this.connection) {
        if (this.connection === connection && this.connection.connected) return;
        if (this.connection.connected) this.close();
        if (typeof connection === 'string') {
            await this.connection.open(connection);
            connection = this.connection;
        }
        this.connection = this.setConnection(connection);
        await this.connection.open();
        this.registerEventListeners();
        this.events.emit('connect');
    }
    async close() {
        await this.connection.close();
    }
    registerEventListeners() {
        if (this.hasRegisteredEventListeners) return;
        this.connection.on('payload', (payload) => this.onPayload(payload));
        this.connection.on('close', (event) => this.onClose(event));
        this.connection.on('error', (error) => this.events.emit('error', error));
        this.connection.on('register_error', (error) => this.onClose());
        this.hasRegisteredEventListeners = true;
    }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events4 = __toESM(require_events());
var w6 = () =>
    typeof WebSocket < 'u'
        ? WebSocket
        : typeof global < 'u' && typeof global.WebSocket < 'u'
          ? global.WebSocket
          : typeof window < 'u' && typeof window.WebSocket < 'u'
            ? window.WebSocket
            : typeof self < 'u' && typeof self.WebSocket < 'u'
              ? self.WebSocket
              : require_browser4();
var b3 = () =>
    typeof WebSocket < 'u' ||
    (typeof global < 'u' && typeof global.WebSocket < 'u') ||
    (typeof window < 'u' && typeof window.WebSocket < 'u') ||
    (typeof self < 'u' && typeof self.WebSocket < 'u');
var a4 = (c5) => c5.split('?')[0];
var h5 = 10;
var S2 = w6();
var f3 = class {
    constructor(e3) {
        if (
            ((this.url = e3),
            (this.events = new import_events4.EventEmitter()),
            (this.registering = false),
            !isWsUrl(e3))
        )
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${e3}`);
        this.url = e3;
    }
    get connected() {
        return typeof this.socket < 'u';
    }
    get connecting() {
        return this.registering;
    }
    on(e3, t3) {
        this.events.on(e3, t3);
    }
    once(e3, t3) {
        this.events.once(e3, t3);
    }
    off(e3, t3) {
        this.events.off(e3, t3);
    }
    removeListener(e3, t3) {
        this.events.removeListener(e3, t3);
    }
    async open(e3 = this.url) {
        await this.register(e3);
    }
    async close() {
        return new Promise((e3, t3) => {
            if (typeof this.socket > 'u') {
                t3(new Error('Connection already closed'));
                return;
            }
            (this.socket.onclose = (n3) => {
                this.onClose(n3), e3();
            }),
                this.socket.close();
        });
    }
    async send(e3) {
        typeof this.socket > 'u' && (this.socket = await this.register());
        try {
            this.socket.send(safeJsonStringify3(e3));
        } catch (t3) {
            this.onError(e3.id, t3);
        }
    }
    register(e3 = this.url) {
        if (!isWsUrl(e3)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e3}`);
        if (this.registering) {
            const t3 = this.events.getMaxListeners();
            return (
                (this.events.listenerCount('register_error') >= t3 || this.events.listenerCount('open') >= t3) &&
                    this.events.setMaxListeners(t3 + 1),
                new Promise((n3, o3) => {
                    this.events.once('register_error', (s3) => {
                        this.resetMaxListeners(), o3(s3);
                    }),
                        this.events.once('open', () => {
                            if ((this.resetMaxListeners(), typeof this.socket > 'u'))
                                return o3(new Error('WebSocket connection is missing or invalid'));
                            n3(this.socket);
                        });
                })
            );
        }
        return (
            (this.url = e3),
            (this.registering = true),
            new Promise((t3, n3) => {
                const o3 = new URLSearchParams(e3).get('origin'),
                    s3 = (0, esm_exports4.isReactNative)()
                        ? { headers: { origin: o3 } }
                        : { rejectUnauthorized: !isLocalhostUrl(e3) },
                    i4 = new S2(e3, [], s3);
                b3()
                    ? (i4.onerror = (r3) => {
                          const l4 = r3;
                          n3(this.emitError(l4.error));
                      })
                    : i4.on('error', (r3) => {
                          n3(this.emitError(r3));
                      }),
                    (i4.onopen = () => {
                        this.onOpen(i4), t3(i4);
                    });
            })
        );
    }
    onOpen(e3) {
        (e3.onmessage = (t3) => this.onPayload(t3)),
            (e3.onclose = (t3) => this.onClose(t3)),
            (this.socket = e3),
            (this.registering = false),
            this.events.emit('open');
    }
    onClose(e3) {
        (this.socket = void 0), (this.registering = false), this.events.emit('close', e3);
    }
    onPayload(e3) {
        if (typeof e3.data > 'u') return;
        const t3 = typeof e3.data == 'string' ? safeJsonParse3(e3.data) : e3.data;
        this.events.emit('payload', t3);
    }
    onError(e3, t3) {
        const n3 = this.parseError(t3),
            o3 = n3.message || n3.toString(),
            s3 = formatJsonRpcError(e3, o3);
        this.events.emit('payload', s3);
    }
    parseError(e3, t3 = this.url) {
        return parseConnectionError(e3, a4(t3), 'WS');
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > h5 && this.events.setMaxListeners(h5);
    }
    emitError(e3) {
        const t3 = this.parseError(
            new Error((e3 == null ? void 0 : e3.message) || `WebSocket connection failed for host: ${a4(this.url)}`)
        );
        return this.events.emit('register_error', t3), t3;
    }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_lodash = __toESM(require_lodash());
var import_isomorphic_unfetch = __toESM(require_browser5());
function Hi(n3, e3) {
    if (n3.length >= 255) throw new TypeError('Alphabet too long');
    for (var t3 = new Uint8Array(256), i4 = 0; i4 < t3.length; i4++) t3[i4] = 255;
    for (var s3 = 0; s3 < n3.length; s3++) {
        var r3 = n3.charAt(s3),
            o3 = r3.charCodeAt(0);
        if (t3[o3] !== 255) throw new TypeError(r3 + ' is ambiguous');
        t3[o3] = s3;
    }
    var a5 = n3.length,
        h6 = n3.charAt(0),
        l4 = Math.log(a5) / Math.log(256),
        d4 = Math.log(256) / Math.log(a5);
    function p5(u5) {
        if (
            (u5 instanceof Uint8Array ||
                (ArrayBuffer.isView(u5)
                    ? (u5 = new Uint8Array(u5.buffer, u5.byteOffset, u5.byteLength))
                    : Array.isArray(u5) && (u5 = Uint8Array.from(u5))),
            !(u5 instanceof Uint8Array))
        )
            throw new TypeError('Expected Uint8Array');
        if (u5.length === 0) return '';
        for (var m4 = 0, z4 = 0, I4 = 0, _6 = u5.length; I4 !== _6 && u5[I4] === 0; ) I4++, m4++;
        for (var T4 = ((_6 - I4) * d4 + 1) >>> 0, f4 = new Uint8Array(T4); I4 !== _6; ) {
            for (var S3 = u5[I4], A5 = 0, C3 = T4 - 1; (S3 !== 0 || A5 < z4) && C3 !== -1; C3--, A5++)
                (S3 += (256 * f4[C3]) >>> 0), (f4[C3] = S3 % a5 >>> 0), (S3 = (S3 / a5) >>> 0);
            if (S3 !== 0) throw new Error('Non-zero carry');
            (z4 = A5), I4++;
        }
        for (var x5 = T4 - z4; x5 !== T4 && f4[x5] === 0; ) x5++;
        for (var j5 = h6.repeat(m4); x5 < T4; ++x5) j5 += n3.charAt(f4[x5]);
        return j5;
    }
    function y6(u5) {
        if (typeof u5 != 'string') throw new TypeError('Expected String');
        if (u5.length === 0) return new Uint8Array();
        var m4 = 0;
        if (u5[m4] !== ' ') {
            for (var z4 = 0, I4 = 0; u5[m4] === h6; ) z4++, m4++;
            for (var _6 = ((u5.length - m4) * l4 + 1) >>> 0, T4 = new Uint8Array(_6); u5[m4]; ) {
                var f4 = t3[u5.charCodeAt(m4)];
                if (f4 === 255) return;
                for (var S3 = 0, A5 = _6 - 1; (f4 !== 0 || S3 < I4) && A5 !== -1; A5--, S3++)
                    (f4 += (a5 * T4[A5]) >>> 0), (T4[A5] = f4 % 256 >>> 0), (f4 = (f4 / 256) >>> 0);
                if (f4 !== 0) throw new Error('Non-zero carry');
                (I4 = S3), m4++;
            }
            if (u5[m4] !== ' ') {
                for (var C3 = _6 - I4; C3 !== _6 && T4[C3] === 0; ) C3++;
                for (var x5 = new Uint8Array(z4 + (_6 - C3)), j5 = z4; C3 !== _6; ) x5[j5++] = T4[C3++];
                return x5;
            }
        }
    }
    function M5(u5) {
        var m4 = y6(u5);
        if (m4) return m4;
        throw new Error(`Non-${e3} character`);
    }
    return { encode: p5, decodeUnsafe: y6, decode: M5 };
}
var Ji = Hi;
var Xi = Ji;
var Ne = (n3) => {
    if (n3 instanceof Uint8Array && n3.constructor.name === 'Uint8Array') return n3;
    if (n3 instanceof ArrayBuffer) return new Uint8Array(n3);
    if (ArrayBuffer.isView(n3)) return new Uint8Array(n3.buffer, n3.byteOffset, n3.byteLength);
    throw new Error('Unknown type, must be binary type');
};
var Wi = (n3) => new TextEncoder().encode(n3);
var Qi = (n3) => new TextDecoder().decode(n3);
var Zi = class {
    constructor(e3, t3, i4) {
        (this.name = e3), (this.prefix = t3), (this.baseEncode = i4);
    }
    encode(e3) {
        if (e3 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e3)}`;
        throw Error('Unknown type, must be binary type');
    }
};
var es = class {
    constructor(e3, t3, i4) {
        if (((this.name = e3), (this.prefix = t3), t3.codePointAt(0) === void 0))
            throw new Error('Invalid prefix character');
        (this.prefixCodePoint = t3.codePointAt(0)), (this.baseDecode = i4);
    }
    decode(e3) {
        if (typeof e3 == 'string') {
            if (e3.codePointAt(0) !== this.prefixCodePoint)
                throw Error(
                    `Unable to decode multibase string ${JSON.stringify(e3)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`
                );
            return this.baseDecode(e3.slice(this.prefix.length));
        } else throw Error('Can only multibase decode strings');
    }
    or(e3) {
        return Ue2(this, e3);
    }
};
var ts = class {
    constructor(e3) {
        this.decoders = e3;
    }
    or(e3) {
        return Ue2(this, e3);
    }
    decode(e3) {
        const t3 = e3[0],
            i4 = this.decoders[t3];
        if (i4) return i4.decode(e3);
        throw RangeError(
            `Unable to decode multibase string ${JSON.stringify(e3)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
        );
    }
};
var Ue2 = (n3, e3) => new ts({ ...(n3.decoders || { [n3.prefix]: n3 }), ...(e3.decoders || { [e3.prefix]: e3 }) });
var is = class {
    constructor(e3, t3, i4, s3) {
        (this.name = e3),
            (this.prefix = t3),
            (this.baseEncode = i4),
            (this.baseDecode = s3),
            (this.encoder = new Zi(e3, t3, i4)),
            (this.decoder = new es(e3, t3, s3));
    }
    encode(e3) {
        return this.encoder.encode(e3);
    }
    decode(e3) {
        return this.decoder.decode(e3);
    }
};
var W3 = ({ name: n3, prefix: e3, encode: t3, decode: i4 }) => new is(n3, e3, t3, i4);
var B3 = ({ prefix: n3, name: e3, alphabet: t3 }) => {
    const { encode: i4, decode: s3 } = Xi(t3, e3);
    return W3({ prefix: n3, name: e3, encode: i4, decode: (r3) => Ne(s3(r3)) });
};
var ss = (n3, e3, t3, i4) => {
    const s3 = {};
    for (let d4 = 0; d4 < e3.length; ++d4) s3[e3[d4]] = d4;
    let r3 = n3.length;
    for (; n3[r3 - 1] === '='; ) --r3;
    const o3 = new Uint8Array(((r3 * t3) / 8) | 0);
    let a5 = 0,
        h6 = 0,
        l4 = 0;
    for (let d4 = 0; d4 < r3; ++d4) {
        const p5 = s3[n3[d4]];
        if (p5 === void 0) throw new SyntaxError(`Non-${i4} character`);
        (h6 = (h6 << t3) | p5), (a5 += t3), a5 >= 8 && ((a5 -= 8), (o3[l4++] = 255 & (h6 >> a5)));
    }
    if (a5 >= t3 || 255 & (h6 << (8 - a5))) throw new SyntaxError('Unexpected end of data');
    return o3;
};
var rs = (n3, e3, t3) => {
    const i4 = e3[e3.length - 1] === '=',
        s3 = (1 << t3) - 1;
    let r3 = '',
        o3 = 0,
        a5 = 0;
    for (let h6 = 0; h6 < n3.length; ++h6)
        for (a5 = (a5 << 8) | n3[h6], o3 += 8; o3 > t3; ) (o3 -= t3), (r3 += e3[s3 & (a5 >> o3)]);
    if ((o3 && (r3 += e3[s3 & (a5 << (t3 - o3))]), i4)) for (; (r3.length * t3) & 7; ) r3 += '=';
    return r3;
};
var g5 = ({ name: n3, prefix: e3, bitsPerChar: t3, alphabet: i4 }) =>
    W3({
        prefix: e3,
        name: n3,
        encode(s3) {
            return rs(s3, i4, t3);
        },
        decode(s3) {
            return ss(s3, i4, t3, n3);
        },
    });
var ns = W3({ prefix: '\0', name: 'identity', encode: (n3) => Qi(n3), decode: (n3) => Wi(n3) });
var os = Object.freeze({ __proto__: null, identity: ns });
var as = g5({ prefix: '0', name: 'base2', alphabet: '01', bitsPerChar: 1 });
var hs = Object.freeze({ __proto__: null, base2: as });
var cs = g5({ prefix: '7', name: 'base8', alphabet: '01234567', bitsPerChar: 3 });
var us = Object.freeze({ __proto__: null, base8: cs });
var ls = B3({ prefix: '9', name: 'base10', alphabet: '0123456789' });
var ds = Object.freeze({ __proto__: null, base10: ls });
var gs = g5({ prefix: 'f', name: 'base16', alphabet: '0123456789abcdef', bitsPerChar: 4 });
var ps = g5({ prefix: 'F', name: 'base16upper', alphabet: '0123456789ABCDEF', bitsPerChar: 4 });
var Ds = Object.freeze({ __proto__: null, base16: gs, base16upper: ps });
var ys = g5({ prefix: 'b', name: 'base32', alphabet: 'abcdefghijklmnopqrstuvwxyz234567', bitsPerChar: 5 });
var ms = g5({ prefix: 'B', name: 'base32upper', alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', bitsPerChar: 5 });
var bs = g5({ prefix: 'c', name: 'base32pad', alphabet: 'abcdefghijklmnopqrstuvwxyz234567=', bitsPerChar: 5 });
var fs = g5({ prefix: 'C', name: 'base32padupper', alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=', bitsPerChar: 5 });
var Es = g5({ prefix: 'v', name: 'base32hex', alphabet: '0123456789abcdefghijklmnopqrstuv', bitsPerChar: 5 });
var ws = g5({ prefix: 'V', name: 'base32hexupper', alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV', bitsPerChar: 5 });
var vs = g5({ prefix: 't', name: 'base32hexpad', alphabet: '0123456789abcdefghijklmnopqrstuv=', bitsPerChar: 5 });
var Is = g5({ prefix: 'T', name: 'base32hexpadupper', alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=', bitsPerChar: 5 });
var Cs = g5({ prefix: 'h', name: 'base32z', alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769', bitsPerChar: 5 });
var Rs = Object.freeze({
    __proto__: null,
    base32: ys,
    base32upper: ms,
    base32pad: bs,
    base32padupper: fs,
    base32hex: Es,
    base32hexupper: ws,
    base32hexpad: vs,
    base32hexpadupper: Is,
    base32z: Cs,
});
var _s = B3({ prefix: 'k', name: 'base36', alphabet: '0123456789abcdefghijklmnopqrstuvwxyz' });
var Ts = B3({ prefix: 'K', name: 'base36upper', alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' });
var Ss = Object.freeze({ __proto__: null, base36: _s, base36upper: Ts });
var Ps = B3({ name: 'base58btc', prefix: 'z', alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' });
var xs = B3({
    name: 'base58flickr',
    prefix: 'Z',
    alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
});
var Os = Object.freeze({ __proto__: null, base58btc: Ps, base58flickr: xs });
var As = g5({
    prefix: 'm',
    name: 'base64',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    bitsPerChar: 6,
});
var zs = g5({
    prefix: 'M',
    name: 'base64pad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    bitsPerChar: 6,
});
var Ns = g5({
    prefix: 'u',
    name: 'base64url',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    bitsPerChar: 6,
});
var Us = g5({
    prefix: 'U',
    name: 'base64urlpad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
    bitsPerChar: 6,
});
var Ls = Object.freeze({ __proto__: null, base64: As, base64pad: zs, base64url: Ns, base64urlpad: Us });
var Le = Array.from(
    '🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂'
);
var $s = Le.reduce((n3, e3, t3) => ((n3[t3] = e3), n3), []);
var Fs = Le.reduce((n3, e3, t3) => ((n3[e3.codePointAt(0)] = t3), n3), []);
function Ms(n3) {
    return n3.reduce((e3, t3) => ((e3 += $s[t3]), e3), '');
}
function ks(n3) {
    const e3 = [];
    for (const t3 of n3) {
        const i4 = Fs[t3.codePointAt(0)];
        if (i4 === void 0) throw new Error(`Non-base256emoji character: ${t3}`);
        e3.push(i4);
    }
    return new Uint8Array(e3);
}
var Ks = W3({ prefix: '🚀', name: 'base256emoji', encode: Ms, decode: ks });
var Bs = Object.freeze({ __proto__: null, base256emoji: Ks });
var Vs = Fe;
var $e2 = 128;
var qs = 127;
var js = ~qs;
var Gs = Math.pow(2, 31);
function Fe(n3, e3, t3) {
    (e3 = e3 || []), (t3 = t3 || 0);
    for (var i4 = t3; n3 >= Gs; ) (e3[t3++] = (n3 & 255) | $e2), (n3 /= 128);
    for (; n3 & js; ) (e3[t3++] = (n3 & 255) | $e2), (n3 >>>= 7);
    return (e3[t3] = n3 | 0), (Fe.bytes = t3 - i4 + 1), e3;
}
var Ys = he2;
var Hs = 128;
var Me2 = 127;
function he2(n3, i4) {
    var t3 = 0,
        i4 = i4 || 0,
        s3 = 0,
        r3 = i4,
        o3,
        a5 = n3.length;
    do {
        if (r3 >= a5) throw ((he2.bytes = 0), new RangeError('Could not decode varint'));
        (o3 = n3[r3++]), (t3 += s3 < 28 ? (o3 & Me2) << s3 : (o3 & Me2) * Math.pow(2, s3)), (s3 += 7);
    } while (o3 >= Hs);
    return (he2.bytes = r3 - i4), t3;
}
var Js = Math.pow(2, 7);
var Xs = Math.pow(2, 14);
var Ws = Math.pow(2, 21);
var Qs = Math.pow(2, 28);
var Zs = Math.pow(2, 35);
var er2 = Math.pow(2, 42);
var tr2 = Math.pow(2, 49);
var ir = Math.pow(2, 56);
var sr2 = Math.pow(2, 63);
var rr2 = function (n3) {
    return n3 < Js
        ? 1
        : n3 < Xs
          ? 2
          : n3 < Ws
            ? 3
            : n3 < Qs
              ? 4
              : n3 < Zs
                ? 5
                : n3 < er2
                  ? 6
                  : n3 < tr2
                    ? 7
                    : n3 < ir
                      ? 8
                      : n3 < sr2
                        ? 9
                        : 10;
};
var nr2 = { encode: Vs, decode: Ys, encodingLength: rr2 };
var ke2 = nr2;
var Ke2 = (n3, e3, t3 = 0) => (ke2.encode(n3, e3, t3), e3);
var Be2 = (n3) => ke2.encodingLength(n3);
var ce2 = (n3, e3) => {
    const t3 = e3.byteLength,
        i4 = Be2(n3),
        s3 = i4 + Be2(t3),
        r3 = new Uint8Array(s3 + t3);
    return Ke2(n3, r3, 0), Ke2(t3, r3, i4), r3.set(e3, s3), new or3(n3, t3, e3, r3);
};
var or3 = class {
    constructor(e3, t3, i4, s3) {
        (this.code = e3), (this.size = t3), (this.digest = i4), (this.bytes = s3);
    }
};
var Ve2 = ({ name: n3, code: e3, encode: t3 }) => new ar(n3, e3, t3);
var ar = class {
    constructor(e3, t3, i4) {
        (this.name = e3), (this.code = t3), (this.encode = i4);
    }
    digest(e3) {
        if (e3 instanceof Uint8Array) {
            const t3 = this.encode(e3);
            return t3 instanceof Uint8Array ? ce2(this.code, t3) : t3.then((i4) => ce2(this.code, i4));
        } else throw Error('Unknown type, must be binary type');
    }
};
var qe2 = (n3) => async (e3) => new Uint8Array(await crypto.subtle.digest(n3, e3));
var hr = Ve2({ name: 'sha2-256', code: 18, encode: qe2('SHA-256') });
var cr = Ve2({ name: 'sha2-512', code: 19, encode: qe2('SHA-512') });
var ur = Object.freeze({ __proto__: null, sha256: hr, sha512: cr });
var je = 0;
var lr = 'identity';
var Ge2 = Ne;
var dr = (n3) => ce2(je, Ge2(n3));
var gr = { code: je, name: lr, encode: Ge2, digest: dr };
var pr = Object.freeze({ __proto__: null, identity: gr });
new TextEncoder(), new TextDecoder();
var Ye = { ...os, ...hs, ...us, ...ds, ...Ds, ...Rs, ...Ss, ...Os, ...Ls, ...Bs };
({ ...ur, ...pr });
function He2(n3) {
    return globalThis.Buffer != null ? new Uint8Array(n3.buffer, n3.byteOffset, n3.byteLength) : n3;
}
function Dr(n3 = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
        ? He2(globalThis.Buffer.allocUnsafe(n3))
        : new Uint8Array(n3);
}
function Je(n3, e3, t3, i4) {
    return { name: n3, prefix: e3, encoder: { name: n3, prefix: e3, encode: t3 }, decoder: { decode: i4 } };
}
var Xe2 = Je(
    'utf8',
    'u',
    (n3) => 'u' + new TextDecoder('utf8').decode(n3),
    (n3) => new TextEncoder().encode(n3.substring(1))
);
var ue2 = Je(
    'ascii',
    'a',
    (n3) => {
        let e3 = 'a';
        for (let t3 = 0; t3 < n3.length; t3++) e3 += String.fromCharCode(n3[t3]);
        return e3;
    },
    (n3) => {
        n3 = n3.substring(1);
        const e3 = Dr(n3.length);
        for (let t3 = 0; t3 < n3.length; t3++) e3[t3] = n3.charCodeAt(t3);
        return e3;
    }
);
var yr = { utf8: Xe2, 'utf-8': Xe2, hex: Ye.base16, latin1: ue2, ascii: ue2, binary: ue2, ...Ye };
function mr(n3, e3 = 'utf8') {
    const t3 = yr[e3];
    if (!t3) throw new Error(`Unsupported encoding "${e3}"`);
    return (e3 === 'utf8' || e3 === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null
        ? He2(globalThis.Buffer.from(n3, 'utf-8'))
        : t3.decoder.decode(`${t3.prefix}${n3}`);
}
var le2 = 'wc';
var We2 = 2;
var Q3 = 'core';
var O4 = `${le2}@2:${Q3}:`;
var Qe2 = { name: Q3, logger: 'error' };
var Ze2 = { database: ':memory:' };
var et = 'crypto';
var de2 = 'client_ed25519_seed';
var tt = import_time3.ONE_DAY;
var it = 'keychain';
var st = '0.3';
var rt2 = 'messages';
var nt = '0.3';
var ot2 = import_time3.SIX_HOURS;
var at2 = 'publisher';
var ht2 = 'irn';
var ct = 'error';
var ge2 = 'wss://relay.walletconnect.com';
var pe = 'wss://relay.walletconnect.org';
var ut2 = 'relayer';
var D5 = {
    message: 'relayer_message',
    message_ack: 'relayer_message_ack',
    connect: 'relayer_connect',
    disconnect: 'relayer_disconnect',
    error: 'relayer_error',
    connection_stalled: 'relayer_connection_stalled',
    transport_closed: 'relayer_transport_closed',
    publish: 'relayer_publish',
};
var lt2 = '_subscription';
var P3 = { payload: 'payload', connect: 'connect', disconnect: 'disconnect', error: 'error' };
var dt2 = import_time3.ONE_SECOND;
var gt2 = '2.11.1';
var pt2 = 1e4;
var Dt = '0.3';
var yt2 = 'WALLETCONNECT_CLIENT_ID';
var w7 = {
    created: 'subscription_created',
    deleted: 'subscription_deleted',
    expired: 'subscription_expired',
    disabled: 'subscription_disabled',
    sync: 'subscription_sync',
    resubscribed: 'subscription_resubscribed',
};
var mt2 = 'subscription';
var bt2 = '0.3';
var ft2 = import_time3.FIVE_SECONDS * 1e3;
var Et2 = 'pairing';
var wt2 = '0.3';
var $4 = {
    wc_pairingDelete: {
        req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1e3 },
        res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1001 },
    },
    wc_pairingPing: {
        req: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1002 },
        res: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1003 },
    },
    unregistered_method: {
        req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 },
        res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 },
    },
};
var V3 = { create: 'pairing_create', expire: 'pairing_expire', delete: 'pairing_delete', ping: 'pairing_ping' };
var R3 = { created: 'history_created', updated: 'history_updated', deleted: 'history_deleted', sync: 'history_sync' };
var vt2 = 'history';
var It2 = '0.3';
var Ct = 'expirer';
var v4 = { created: 'expirer_created', deleted: 'expirer_deleted', expired: 'expirer_expired', sync: 'expirer_sync' };
var Rt2 = '0.3';
var Z3 = 'verify-api';
var F4 = 'https://verify.walletconnect.com';
var ee2 = 'https://verify.walletconnect.org';
var _t = [F4, ee2];
var Tt2 = 'echo';
var St2 = 'https://echo.walletconnect.com';
var Pt2 = class {
    constructor(e3, t3) {
        (this.core = e3),
            (this.logger = t3),
            (this.keychain = /* @__PURE__ */ new Map()),
            (this.name = it),
            (this.version = st),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.init = async () => {
                if (!this.initialized) {
                    const i4 = await this.getKeyChain();
                    typeof i4 < 'u' && (this.keychain = i4), (this.initialized = true);
                }
            }),
            (this.has = (i4) => (this.isInitialized(), this.keychain.has(i4))),
            (this.set = async (i4, s3) => {
                this.isInitialized(), this.keychain.set(i4, s3), await this.persist();
            }),
            (this.get = (i4) => {
                this.isInitialized();
                const s3 = this.keychain.get(i4);
                if (typeof s3 > 'u') {
                    const { message: r3 } = N10('NO_MATCHING_KEY', `${this.name}: ${i4}`);
                    throw new Error(r3);
                }
                return s3;
            }),
            (this.del = async (i4) => {
                this.isInitialized(), this.keychain.delete(i4), await this.persist();
            }),
            (this.core = e3),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name));
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + '//' + this.name;
    }
    async setKeyChain(e3) {
        await this.core.storage.setItem(this.storageKey, rt(e3));
    }
    async getKeyChain() {
        const e3 = await this.core.storage.getItem(this.storageKey);
        return typeof e3 < 'u' ? ot(e3) : void 0;
    }
    async persist() {
        await this.setKeyChain(this.keychain);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var xt2 = class {
    constructor(e3, t3, i4) {
        (this.core = e3),
            (this.logger = t3),
            (this.name = et),
            (this.initialized = false),
            (this.init = async () => {
                this.initialized || (await this.keychain.init(), (this.initialized = true));
            }),
            (this.hasKeys = (s3) => (this.isInitialized(), this.keychain.has(s3))),
            (this.getClientId = async () => {
                this.isInitialized();
                const s3 = await this.getClientSeed(),
                    r3 = generateKeyPair(s3);
                return encodeIss(r3.publicKey);
            }),
            (this.generateKeyPair = () => {
                this.isInitialized();
                const s3 = kn();
                return this.setPrivateKey(s3.publicKey, s3.privateKey);
            }),
            (this.signJWT = async (s3) => {
                this.isInitialized();
                const r3 = await this.getClientSeed(),
                    o3 = generateKeyPair(r3),
                    a5 = Vn(),
                    h6 = tt;
                return await signJWT(a5, s3, h6, o3);
            }),
            (this.generateSharedKey = (s3, r3, o3) => {
                this.isInitialized();
                const a5 = this.getPrivateKey(s3),
                    h6 = Mn(a5, r3);
                return this.setSymKey(h6, o3);
            }),
            (this.setSymKey = async (s3, r3) => {
                this.isInitialized();
                const o3 = r3 || Kn(s3);
                return await this.keychain.set(o3, s3), o3;
            }),
            (this.deleteKeyPair = async (s3) => {
                this.isInitialized(), await this.keychain.del(s3);
            }),
            (this.deleteSymKey = async (s3) => {
                this.isInitialized(), await this.keychain.del(s3);
            }),
            (this.encode = async (s3, r3, o3) => {
                this.isInitialized();
                const a5 = Ae(o3),
                    h6 = safeJsonStringify3(r3);
                if (qn(a5)) {
                    const y6 = a5.senderPublicKey,
                        M5 = a5.receiverPublicKey;
                    s3 = await this.generateSharedKey(y6, M5);
                }
                const l4 = this.getSymKey(s3),
                    { type: d4, senderPublicKey: p5 } = a5;
                return xn({ type: d4, symKey: l4, message: h6, senderPublicKey: p5 });
            }),
            (this.decode = async (s3, r3, o3) => {
                this.isInitialized();
                const a5 = Hn(r3, o3);
                if (qn(a5)) {
                    const h6 = a5.receiverPublicKey,
                        l4 = a5.senderPublicKey;
                    s3 = await this.generateSharedKey(h6, l4);
                }
                try {
                    const h6 = this.getSymKey(s3),
                        l4 = Fn({ symKey: h6, encoded: r3 });
                    return safeJsonParse3(l4);
                } catch (h6) {
                    this.logger.error(
                        `Failed to decode message from topic: '${s3}', clientId: '${await this.getClientId()}'`
                    ),
                        this.logger.error(h6);
                }
            }),
            (this.getPayloadType = (s3) => {
                const r3 = ee(s3);
                return j4(r3.type);
            }),
            (this.getPayloadSenderPublicKey = (s3) => {
                const r3 = ee(s3);
                return r3.senderPublicKey ? toString2(r3.senderPublicKey, p4) : void 0;
            }),
            (this.core = e3),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.keychain = i4 || new Pt2(this.core, this.logger));
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    async setPrivateKey(e3, t3) {
        return await this.keychain.set(e3, t3), e3;
    }
    getPrivateKey(e3) {
        return this.keychain.get(e3);
    }
    async getClientSeed() {
        let e3 = '';
        try {
            e3 = this.keychain.get(de2);
        } catch {
            (e3 = Vn()), await this.keychain.set(de2, e3);
        }
        return mr(e3, 'base16');
    }
    getSymKey(e3) {
        return this.keychain.get(e3);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var Ot2 = class extends a3 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.logger = e3),
            (this.core = t3),
            (this.messages = /* @__PURE__ */ new Map()),
            (this.name = rt2),
            (this.version = nt),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.init = async () => {
                if (!this.initialized) {
                    this.logger.trace('Initialized');
                    try {
                        const i4 = await this.getRelayerMessages();
                        typeof i4 < 'u' && (this.messages = i4),
                            this.logger.debug(`Successfully Restored records for ${this.name}`),
                            this.logger.trace({ type: 'method', method: 'restore', size: this.messages.size });
                    } catch (i4) {
                        this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i4);
                    } finally {
                        this.initialized = true;
                    }
                }
            }),
            (this.set = async (i4, s3) => {
                this.isInitialized();
                const r3 = Ln(s3);
                let o3 = this.messages.get(i4);
                return (
                    typeof o3 > 'u' && (o3 = {}),
                    typeof o3[r3] < 'u' || ((o3[r3] = s3), this.messages.set(i4, o3), await this.persist()),
                    r3
                );
            }),
            (this.get = (i4) => {
                this.isInitialized();
                let s3 = this.messages.get(i4);
                return typeof s3 > 'u' && (s3 = {}), s3;
            }),
            (this.has = (i4, s3) => {
                this.isInitialized();
                const r3 = this.get(i4),
                    o3 = Ln(s3);
                return typeof r3[o3] < 'u';
            }),
            (this.del = async (i4) => {
                this.isInitialized(), this.messages.delete(i4), await this.persist();
            }),
            (this.logger = (0, import_logger.generateChildLogger)(e3, this.name)),
            (this.core = t3);
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + '//' + this.name;
    }
    async setRelayerMessages(e3) {
        await this.core.storage.setItem(this.storageKey, rt(e3));
    }
    async getRelayerMessages() {
        const e3 = await this.core.storage.getItem(this.storageKey);
        return typeof e3 < 'u' ? ot(e3) : void 0;
    }
    async persist() {
        await this.setRelayerMessages(this.messages);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var vr = class extends u3 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.relayer = e3),
            (this.logger = t3),
            (this.events = new import_events5.EventEmitter()),
            (this.name = at2),
            (this.queue = /* @__PURE__ */ new Map()),
            (this.publishTimeout = (0, import_time3.toMiliseconds)(import_time3.TEN_SECONDS * 2)),
            (this.needsTransportRestart = false),
            (this.publish = async (i4, s3, r3) => {
                var o3;
                this.logger.debug('Publishing Payload'),
                    this.logger.trace({
                        type: 'method',
                        method: 'publish',
                        params: { topic: i4, message: s3, opts: r3 },
                    });
                try {
                    const a5 = (r3 == null ? void 0 : r3.ttl) || ot2,
                        h6 = vt(r3),
                        l4 = (r3 == null ? void 0 : r3.prompt) || false,
                        d4 = (r3 == null ? void 0 : r3.tag) || 0,
                        p5 = (r3 == null ? void 0 : r3.id) || getBigIntRpcId().toString(),
                        y6 = { topic: i4, message: s3, opts: { ttl: a5, relay: h6, prompt: l4, tag: d4, id: p5 } },
                        M5 = setTimeout(() => this.queue.set(p5, y6), this.publishTimeout);
                    try {
                        await await ut(
                            this.rpcPublish(i4, s3, a5, h6, l4, d4, p5),
                            this.publishTimeout,
                            `Failed to publish payload, please try again. id:${p5} tag:${d4}`
                        ),
                            this.removeRequestFromQueue(p5),
                            this.relayer.events.emit(D5.publish, y6);
                    } catch (u5) {
                        if (
                            (this.logger.debug('Publishing Payload stalled'),
                            (this.needsTransportRestart = true),
                            (o3 = r3 == null ? void 0 : r3.internal) != null && o3.throwOnFailedPublish)
                        )
                            throw (this.removeRequestFromQueue(p5), u5);
                        return;
                    } finally {
                        clearTimeout(M5);
                    }
                    this.logger.debug('Successfully Published Payload'),
                        this.logger.trace({
                            type: 'method',
                            method: 'publish',
                            params: { topic: i4, message: s3, opts: r3 },
                        });
                } catch (a5) {
                    throw (this.logger.debug('Failed to Publish Payload'), this.logger.error(a5), a5);
                }
            }),
            (this.on = (i4, s3) => {
                this.events.on(i4, s3);
            }),
            (this.once = (i4, s3) => {
                this.events.once(i4, s3);
            }),
            (this.off = (i4, s3) => {
                this.events.off(i4, s3);
            }),
            (this.removeListener = (i4, s3) => {
                this.events.removeListener(i4, s3);
            }),
            (this.relayer = e3),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            this.registerEventListeners();
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    rpcPublish(e3, t3, i4, s3, r3, o3, a5) {
        var h6, l4, d4, p5;
        const y6 = {
            method: Et(s3.protocol).publish,
            params: { topic: e3, message: t3, ttl: i4, prompt: r3, tag: o3 },
            id: a5,
        };
        return (
            w5((h6 = y6.params) == null ? void 0 : h6.prompt) && ((l4 = y6.params) == null || delete l4.prompt),
            w5((d4 = y6.params) == null ? void 0 : d4.tag) && ((p5 = y6.params) == null || delete p5.tag),
            this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'message', direction: 'outgoing', request: y6 }),
            this.relayer.request(y6)
        );
    }
    removeRequestFromQueue(e3) {
        this.queue.delete(e3);
    }
    checkQueue() {
        this.queue.forEach(async (e3) => {
            const { topic: t3, message: i4, opts: s3 } = e3;
            await this.publish(t3, i4, s3);
        });
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, () => {
            if (this.needsTransportRestart) {
                (this.needsTransportRestart = false), this.relayer.events.emit(D5.connection_stalled);
                return;
            }
            this.checkQueue();
        }),
            this.relayer.on(D5.message_ack, (e3) => {
                this.removeRequestFromQueue(e3.id.toString());
            });
    }
};
var Ir = class {
    constructor() {
        (this.map = /* @__PURE__ */ new Map()),
            (this.set = (e3, t3) => {
                const i4 = this.get(e3);
                this.exists(e3, t3) || this.map.set(e3, [...i4, t3]);
            }),
            (this.get = (e3) => this.map.get(e3) || []),
            (this.exists = (e3, t3) => this.get(e3).includes(t3)),
            (this.delete = (e3, t3) => {
                if (typeof t3 > 'u') {
                    this.map.delete(e3);
                    return;
                }
                if (!this.map.has(e3)) return;
                const i4 = this.get(e3);
                if (!this.exists(e3, t3)) return;
                const s3 = i4.filter((r3) => r3 !== t3);
                if (!s3.length) {
                    this.map.delete(e3);
                    return;
                }
                this.map.set(e3, s3);
            }),
            (this.clear = () => {
                this.map.clear();
            });
    }
    get topics() {
        return Array.from(this.map.keys());
    }
};
var Cr = Object.defineProperty;
var Rr = Object.defineProperties;
var _r = Object.getOwnPropertyDescriptors;
var At = Object.getOwnPropertySymbols;
var Tr = Object.prototype.hasOwnProperty;
var Sr = Object.prototype.propertyIsEnumerable;
var zt2 = (n3, e3, t3) =>
    e3 in n3 ? Cr(n3, e3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (n3[e3] = t3);
var q3 = (n3, e3) => {
    for (var t3 in e3 || (e3 = {})) Tr.call(e3, t3) && zt2(n3, t3, e3[t3]);
    if (At) for (var t3 of At(e3)) Sr.call(e3, t3) && zt2(n3, t3, e3[t3]);
    return n3;
};
var De2 = (n3, e3) => Rr(n3, _r(e3));
var Nt2 = class extends d3 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.relayer = e3),
            (this.logger = t3),
            (this.subscriptions = /* @__PURE__ */ new Map()),
            (this.topicMap = new Ir()),
            (this.events = new import_events5.EventEmitter()),
            (this.name = mt2),
            (this.version = bt2),
            (this.pending = /* @__PURE__ */ new Map()),
            (this.cached = []),
            (this.initialized = false),
            (this.pendingSubscriptionWatchLabel = 'pending_sub_watch_label'),
            (this.pollingInterval = 20),
            (this.storagePrefix = O4),
            (this.subscribeTimeout = 1e4),
            (this.restartInProgress = false),
            (this.batchSubscribeTopicsLimit = 500),
            (this.init = async () => {
                this.initialized ||
                    (this.logger.trace('Initialized'),
                    this.registerEventListeners(),
                    (this.clientId = await this.relayer.core.crypto.getClientId()));
            }),
            (this.subscribe = async (i4, s3) => {
                await this.restartToComplete(),
                    this.isInitialized(),
                    this.logger.debug('Subscribing Topic'),
                    this.logger.trace({ type: 'method', method: 'subscribe', params: { topic: i4, opts: s3 } });
                try {
                    const r3 = vt(s3),
                        o3 = { topic: i4, relay: r3 };
                    this.pending.set(i4, o3);
                    const a5 = await this.rpcSubscribe(i4, r3);
                    return (
                        this.onSubscribe(a5, o3),
                        this.logger.debug('Successfully Subscribed Topic'),
                        this.logger.trace({ type: 'method', method: 'subscribe', params: { topic: i4, opts: s3 } }),
                        a5
                    );
                } catch (r3) {
                    throw (this.logger.debug('Failed to Subscribe Topic'), this.logger.error(r3), r3);
                }
            }),
            (this.unsubscribe = async (i4, s3) => {
                await this.restartToComplete(),
                    this.isInitialized(),
                    typeof (s3 == null ? void 0 : s3.id) < 'u'
                        ? await this.unsubscribeById(i4, s3.id, s3)
                        : await this.unsubscribeByTopic(i4, s3);
            }),
            (this.isSubscribed = async (i4) => {
                if (this.topics.includes(i4)) return true;
                const s3 = `${this.pendingSubscriptionWatchLabel}_${i4}`;
                return await new Promise((r3, o3) => {
                    const a5 = new import_time3.Watch();
                    a5.start(s3);
                    const h6 = setInterval(() => {
                        !this.pending.has(i4) && this.topics.includes(i4) && (clearInterval(h6), a5.stop(s3), r3(true)),
                            a5.elapsed(s3) >= ft2 &&
                                (clearInterval(h6), a5.stop(s3), o3(new Error('Subscription resolution timeout')));
                    }, this.pollingInterval);
                }).catch(() => false);
            }),
            (this.on = (i4, s3) => {
                this.events.on(i4, s3);
            }),
            (this.once = (i4, s3) => {
                this.events.once(i4, s3);
            }),
            (this.off = (i4, s3) => {
                this.events.off(i4, s3);
            }),
            (this.removeListener = (i4, s3) => {
                this.events.removeListener(i4, s3);
            }),
            (this.restart = async () => {
                (this.restartInProgress = true),
                    await this.restore(),
                    await this.reset(),
                    (this.restartInProgress = false);
            }),
            (this.relayer = e3),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.clientId = '');
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + '//' + this.name;
    }
    get length() {
        return this.subscriptions.size;
    }
    get ids() {
        return Array.from(this.subscriptions.keys());
    }
    get values() {
        return Array.from(this.subscriptions.values());
    }
    get topics() {
        return this.topicMap.topics;
    }
    hasSubscription(e3, t3) {
        let i4 = false;
        try {
            i4 = this.getSubscription(e3).topic === t3;
        } catch {}
        return i4;
    }
    onEnable() {
        (this.cached = []), (this.initialized = true);
    }
    onDisable() {
        (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
    }
    async unsubscribeByTopic(e3, t3) {
        const i4 = this.topicMap.get(e3);
        await Promise.all(i4.map(async (s3) => await this.unsubscribeById(e3, s3, t3)));
    }
    async unsubscribeById(e3, t3, i4) {
        this.logger.debug('Unsubscribing Topic'),
            this.logger.trace({ type: 'method', method: 'unsubscribe', params: { topic: e3, id: t3, opts: i4 } });
        try {
            const s3 = vt(i4);
            await this.rpcUnsubscribe(e3, t3, s3);
            const r3 = U2('USER_DISCONNECTED', `${this.name}, ${e3}`);
            await this.onUnsubscribe(e3, t3, r3),
                this.logger.debug('Successfully Unsubscribed Topic'),
                this.logger.trace({ type: 'method', method: 'unsubscribe', params: { topic: e3, id: t3, opts: i4 } });
        } catch (s3) {
            throw (this.logger.debug('Failed to Unsubscribe Topic'), this.logger.error(s3), s3);
        }
    }
    async rpcSubscribe(e3, t3) {
        const i4 = { method: Et(t3.protocol).subscribe, params: { topic: e3 } };
        this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'outgoing', request: i4 });
        try {
            await await ut(this.relayer.request(i4), this.subscribeTimeout);
        } catch {
            this.logger.debug('Outgoing Relay Subscribe Payload stalled'),
                this.relayer.events.emit(D5.connection_stalled);
        }
        return Ln(e3 + this.clientId);
    }
    async rpcBatchSubscribe(e3) {
        if (!e3.length) return;
        const t3 = e3[0].relay,
            i4 = { method: Et(t3.protocol).batchSubscribe, params: { topics: e3.map((s3) => s3.topic) } };
        this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'outgoing', request: i4 });
        try {
            return await await ut(this.relayer.request(i4), this.subscribeTimeout);
        } catch {
            this.logger.debug('Outgoing Relay Payload stalled'), this.relayer.events.emit(D5.connection_stalled);
        }
    }
    rpcUnsubscribe(e3, t3, i4) {
        const s3 = { method: Et(i4.protocol).unsubscribe, params: { topic: e3, id: t3 } };
        return (
            this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'outgoing', request: s3 }),
            this.relayer.request(s3)
        );
    }
    onSubscribe(e3, t3) {
        this.setSubscription(e3, De2(q3({}, t3), { id: e3 })), this.pending.delete(t3.topic);
    }
    onBatchSubscribe(e3) {
        e3.length &&
            e3.forEach((t3) => {
                this.setSubscription(t3.id, q3({}, t3)), this.pending.delete(t3.topic);
            });
    }
    async onUnsubscribe(e3, t3, i4) {
        this.events.removeAllListeners(t3),
            this.hasSubscription(t3, e3) && this.deleteSubscription(t3, i4),
            await this.relayer.messages.del(e3);
    }
    async setRelayerSubscriptions(e3) {
        await this.relayer.core.storage.setItem(this.storageKey, e3);
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey);
    }
    setSubscription(e3, t3) {
        this.subscriptions.has(e3) ||
            (this.logger.debug('Setting subscription'),
            this.logger.trace({ type: 'method', method: 'setSubscription', id: e3, subscription: t3 }),
            this.addSubscription(e3, t3));
    }
    addSubscription(e3, t3) {
        this.subscriptions.set(e3, q3({}, t3)), this.topicMap.set(t3.topic, e3), this.events.emit(w7.created, t3);
    }
    getSubscription(e3) {
        this.logger.debug('Getting subscription'),
            this.logger.trace({ type: 'method', method: 'getSubscription', id: e3 });
        const t3 = this.subscriptions.get(e3);
        if (!t3) {
            const { message: i4 } = N10('NO_MATCHING_KEY', `${this.name}: ${e3}`);
            throw new Error(i4);
        }
        return t3;
    }
    deleteSubscription(e3, t3) {
        this.logger.debug('Deleting subscription'),
            this.logger.trace({ type: 'method', method: 'deleteSubscription', id: e3, reason: t3 });
        const i4 = this.getSubscription(e3);
        this.subscriptions.delete(e3),
            this.topicMap.delete(i4.topic, e3),
            this.events.emit(w7.deleted, De2(q3({}, i4), { reason: t3 }));
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values), this.events.emit(w7.sync);
    }
    async reset() {
        if (this.cached.length) {
            const e3 = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
            for (let t3 = 0; t3 < e3; t3++) {
                const i4 = this.cached.splice(0, this.batchSubscribeTopicsLimit);
                await this.batchSubscribe(i4);
            }
        }
        this.events.emit(w7.resubscribed);
    }
    async restore() {
        try {
            const e3 = await this.getRelayerSubscriptions();
            if (typeof e3 > 'u' || !e3.length) return;
            if (this.subscriptions.size) {
                const { message: t3 } = N10('RESTORE_WILL_OVERRIDE', this.name);
                throw (
                    (this.logger.error(t3),
                    this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
                    new Error(t3))
                );
            }
            (this.cached = e3),
                this.logger.debug(`Successfully Restored subscriptions for ${this.name}`),
                this.logger.trace({ type: 'method', method: 'restore', subscriptions: this.values });
        } catch (e3) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e3);
        }
    }
    async batchSubscribe(e3) {
        if (!e3.length) return;
        const t3 = await this.rpcBatchSubscribe(e3);
        k4(t3) && this.onBatchSubscribe(t3.map((i4, s3) => De2(q3({}, e3[s3]), { id: i4 })));
    }
    async onConnect() {
        this.restartInProgress || (await this.restart(), this.onEnable());
    }
    onDisconnect() {
        this.onDisable();
    }
    async checkPending() {
        if (!this.initialized || this.relayer.transportExplicitlyClosed) return;
        const e3 = [];
        this.pending.forEach((t3) => {
            e3.push(t3);
        }),
            await this.batchSubscribe(e3);
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, async () => {
            await this.checkPending();
        }),
            this.relayer.on(D5.connect, async () => {
                await this.onConnect();
            }),
            this.relayer.on(D5.disconnect, () => {
                this.onDisconnect();
            }),
            this.events.on(w7.created, async (e3) => {
                const t3 = w7.created;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, data: e3 }),
                    await this.persist();
            }),
            this.events.on(w7.deleted, async (e3) => {
                const t3 = w7.deleted;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, data: e3 }),
                    await this.persist();
            });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
    async restartToComplete() {
        this.restartInProgress &&
            (await new Promise((e3) => {
                const t3 = setInterval(() => {
                    this.restartInProgress || (clearInterval(t3), e3());
                }, this.pollingInterval);
            }));
    }
};
var Pr = Object.defineProperty;
var Ut = Object.getOwnPropertySymbols;
var xr = Object.prototype.hasOwnProperty;
var Or = Object.prototype.propertyIsEnumerable;
var Lt2 = (n3, e3, t3) =>
    e3 in n3 ? Pr(n3, e3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (n3[e3] = t3);
var Ar = (n3, e3) => {
    for (var t3 in e3 || (e3 = {})) xr.call(e3, t3) && Lt2(n3, t3, e3[t3]);
    if (Ut) for (var t3 of Ut(e3)) Or.call(e3, t3) && Lt2(n3, t3, e3[t3]);
    return n3;
};
var $t = class extends g3 {
    constructor(e3) {
        super(e3),
            (this.protocol = 'wc'),
            (this.version = 2),
            (this.events = new import_events5.EventEmitter()),
            (this.name = ut2),
            (this.transportExplicitlyClosed = false),
            (this.initialized = false),
            (this.connectionAttemptInProgress = false),
            (this.connectionStatusPollingInterval = 20),
            (this.staleConnectionErrors = ['socket hang up', 'socket stalled']),
            (this.hasExperiencedNetworkDisruption = false),
            (this.requestsInFlight = /* @__PURE__ */ new Map()),
            (this.request = async (t3) => {
                this.logger.debug('Publishing Request Payload');
                const i4 = t3.id,
                    s3 = this.provider.request(t3);
                this.requestsInFlight.set(i4, { promise: s3, request: t3 });
                try {
                    return await this.toEstablishConnection(), await s3;
                } catch (r3) {
                    throw (this.logger.debug('Failed to Publish Request'), this.logger.error(r3), r3);
                } finally {
                    this.requestsInFlight.delete(i4);
                }
            }),
            (this.onPayloadHandler = (t3) => {
                this.onProviderPayload(t3);
            }),
            (this.onConnectHandler = () => {
                this.events.emit(D5.connect);
            }),
            (this.onDisconnectHandler = () => {
                this.onProviderDisconnect();
            }),
            (this.onProviderErrorHandler = (t3) => {
                this.logger.error(t3),
                    this.events.emit(D5.error, t3),
                    this.logger.info('Fatal socket error received, closing transport'),
                    this.transportClose();
            }),
            (this.registerProviderListeners = () => {
                this.provider.on(P3.payload, this.onPayloadHandler),
                    this.provider.on(P3.connect, this.onConnectHandler),
                    this.provider.on(P3.disconnect, this.onDisconnectHandler),
                    this.provider.on(P3.error, this.onProviderErrorHandler);
            }),
            (this.core = e3.core),
            (this.logger =
                typeof e3.logger < 'u' && typeof e3.logger != 'string'
                    ? (0, import_logger.generateChildLogger)(e3.logger, this.name)
                    : (0, import_logger.pino)((0, import_logger.getDefaultLoggerOptions)({ level: e3.logger || ct }))),
            (this.messages = new Ot2(this.logger, e3.core)),
            (this.subscriber = new Nt2(this, this.logger)),
            (this.publisher = new vr(this, this.logger)),
            (this.relayUrl = (e3 == null ? void 0 : e3.relayUrl) || ge2),
            (this.projectId = e3.projectId),
            (this.bundleId = Jn()),
            (this.provider = {});
    }
    async init() {
        this.logger.trace('Initialized'),
            this.registerEventListeners(),
            await this.createProvider(),
            await Promise.all([this.messages.init(), this.subscriber.init()]);
        try {
            await this.transportOpen();
        } catch {
            this.logger.warn(
                `Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${pe}...`
            ),
                await this.restartTransport(pe);
        }
        (this.initialized = true),
            setTimeout(async () => {
                this.subscriber.topics.length === 0 &&
                    (this.logger.info('No topics subscribed to after init, closing transport'),
                    await this.transportClose(),
                    (this.transportExplicitlyClosed = false));
            }, pt2);
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get connected() {
        return this.provider.connection.connected;
    }
    get connecting() {
        return this.provider.connection.connecting;
    }
    async publish(e3, t3, i4) {
        this.isInitialized(),
            await this.publisher.publish(e3, t3, i4),
            await this.recordMessageEvent({ topic: e3, message: t3, publishedAt: Date.now() });
    }
    async subscribe(e3, t3) {
        var i4;
        this.isInitialized();
        let s3 = ((i4 = this.subscriber.topicMap.get(e3)) == null ? void 0 : i4[0]) || '';
        if (s3) return s3;
        let r3;
        const o3 = (a5) => {
            a5.topic === e3 && (this.subscriber.off(w7.created, o3), r3());
        };
        return (
            await Promise.all([
                new Promise((a5) => {
                    (r3 = a5), this.subscriber.on(w7.created, o3);
                }),
                new Promise(async (a5) => {
                    (s3 = await this.subscriber.subscribe(e3, t3)), a5();
                }),
            ]),
            s3
        );
    }
    async unsubscribe(e3, t3) {
        this.isInitialized(), await this.subscriber.unsubscribe(e3, t3);
    }
    on(e3, t3) {
        this.events.on(e3, t3);
    }
    once(e3, t3) {
        this.events.once(e3, t3);
    }
    off(e3, t3) {
        this.events.off(e3, t3);
    }
    removeListener(e3, t3) {
        this.events.removeListener(e3, t3);
    }
    async transportClose() {
        this.requestsInFlight.size > 0 &&
            (this.logger.debug('Waiting for all in-flight requests to finish before closing transport...'),
            this.requestsInFlight.forEach(async (e3) => {
                await e3.promise;
            })),
            (this.transportExplicitlyClosed = true),
            this.hasExperiencedNetworkDisruption && this.connected
                ? await ut(this.provider.disconnect(), 1e3, 'provider.disconnect()').catch(() =>
                      this.onProviderDisconnect()
                  )
                : this.connected && (await this.provider.disconnect());
    }
    async transportOpen(e3) {
        if (
            ((this.transportExplicitlyClosed = false),
            await this.confirmOnlineStateOrThrow(),
            !this.connectionAttemptInProgress)
        ) {
            e3 &&
                e3 !== this.relayUrl &&
                ((this.relayUrl = e3), await this.transportClose(), await this.createProvider()),
                (this.connectionAttemptInProgress = true);
            try {
                await Promise.all([
                    new Promise((t3) => {
                        if (!this.initialized) return t3();
                        this.subscriber.once(w7.resubscribed, () => {
                            t3();
                        });
                    }),
                    new Promise(async (t3, i4) => {
                        try {
                            await ut(
                                this.provider.connect(),
                                1e4,
                                `Socket stalled when trying to connect to ${this.relayUrl}`
                            );
                        } catch (s3) {
                            i4(s3);
                            return;
                        }
                        t3();
                    }),
                ]);
            } catch (t3) {
                this.logger.error(t3);
                const i4 = t3;
                if (!this.isConnectionStalled(i4.message)) throw t3;
                this.provider.events.emit(P3.disconnect);
            } finally {
                (this.connectionAttemptInProgress = false), (this.hasExperiencedNetworkDisruption = false);
            }
        }
    }
    async restartTransport(e3) {
        await this.confirmOnlineStateOrThrow(),
            !this.connectionAttemptInProgress &&
                ((this.relayUrl = e3 || this.relayUrl),
                await this.transportClose(),
                await this.createProvider(),
                await this.transportOpen());
    }
    async confirmOnlineStateOrThrow() {
        if (!(await rr()))
            throw new Error('No internet connection detected. Please restart your network and try again.');
    }
    isConnectionStalled(e3) {
        return this.staleConnectionErrors.some((t3) => e3.includes(t3));
    }
    async createProvider() {
        this.provider.connection && this.unregisterProviderListeners();
        const e3 = await this.core.crypto.signJWT(this.relayUrl);
        (this.provider = new JsonRpcProvider(
            new f3(
                Xn({
                    sdkVersion: gt2,
                    protocol: this.protocol,
                    version: this.version,
                    relayUrl: this.relayUrl,
                    projectId: this.projectId,
                    auth: e3,
                    useOnCloseEvent: true,
                    bundleId: this.bundleId,
                })
            )
        )),
            this.registerProviderListeners();
    }
    async recordMessageEvent(e3) {
        const { topic: t3, message: i4 } = e3;
        await this.messages.set(t3, i4);
    }
    async shouldIgnoreMessageEvent(e3) {
        const { topic: t3, message: i4 } = e3;
        if (!i4 || i4.length === 0) return this.logger.debug(`Ignoring invalid/empty message: ${i4}`), true;
        if (!(await this.subscriber.isSubscribed(t3)))
            return this.logger.debug(`Ignoring message for non-subscribed topic ${t3}`), true;
        const s3 = this.messages.has(t3, i4);
        return s3 && this.logger.debug(`Ignoring duplicate message: ${i4}`), s3;
    }
    async onProviderPayload(e3) {
        if (
            (this.logger.debug('Incoming Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'incoming', payload: e3 }),
            isJsonRpcRequest(e3))
        ) {
            if (!e3.method.endsWith(lt2)) return;
            const t3 = e3.params,
                { topic: i4, message: s3, publishedAt: r3 } = t3.data,
                o3 = { topic: i4, message: s3, publishedAt: r3 };
            this.logger.debug('Emitting Relayer Payload'),
                this.logger.trace(Ar({ type: 'event', event: t3.id }, o3)),
                this.events.emit(t3.id, o3),
                await this.acknowledgePayload(e3),
                await this.onMessageEvent(o3);
        } else isJsonRpcResponse(e3) && this.events.emit(D5.message_ack, e3);
    }
    async onMessageEvent(e3) {
        (await this.shouldIgnoreMessageEvent(e3)) ||
            (this.events.emit(D5.message, e3), await this.recordMessageEvent(e3));
    }
    async acknowledgePayload(e3) {
        const t3 = formatJsonRpcResult(e3.id, true);
        await this.provider.connection.send(t3);
    }
    unregisterProviderListeners() {
        this.provider.off(P3.payload, this.onPayloadHandler),
            this.provider.off(P3.connect, this.onConnectHandler),
            this.provider.off(P3.disconnect, this.onDisconnectHandler),
            this.provider.off(P3.error, this.onProviderErrorHandler);
    }
    async registerEventListeners() {
        this.events.on(D5.connection_stalled, () => {
            this.restartTransport().catch((t3) => this.logger.error(t3));
        });
        let e3 = await rr();
        or2(async (t3) => {
            this.initialized &&
                e3 !== t3 &&
                ((e3 = t3),
                t3
                    ? await this.restartTransport().catch((i4) => this.logger.error(i4))
                    : ((this.hasExperiencedNetworkDisruption = true),
                      await this.transportClose().catch((i4) => this.logger.error(i4))));
        });
    }
    onProviderDisconnect() {
        this.events.emit(D5.disconnect), this.attemptToReconnect();
    }
    attemptToReconnect() {
        this.transportExplicitlyClosed ||
            (this.logger.info('attemptToReconnect called. Connecting...'),
            setTimeout(
                async () => {
                    await this.restartTransport().catch((e3) => this.logger.error(e3));
                },
                (0, import_time3.toMiliseconds)(dt2)
            ));
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
    async toEstablishConnection() {
        if ((await this.confirmOnlineStateOrThrow(), !this.connected)) {
            if (this.connectionAttemptInProgress)
                return await new Promise((e3) => {
                    const t3 = setInterval(() => {
                        this.connected && (clearInterval(t3), e3());
                    }, this.connectionStatusPollingInterval);
                });
            await this.restartTransport();
        }
    }
};
var zr = Object.defineProperty;
var Ft2 = Object.getOwnPropertySymbols;
var Nr = Object.prototype.hasOwnProperty;
var Ur = Object.prototype.propertyIsEnumerable;
var Mt2 = (n3, e3, t3) =>
    e3 in n3 ? zr(n3, e3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (n3[e3] = t3);
var kt = (n3, e3) => {
    for (var t3 in e3 || (e3 = {})) Nr.call(e3, t3) && Mt2(n3, t3, e3[t3]);
    if (Ft2) for (var t3 of Ft2(e3)) Ur.call(e3, t3) && Mt2(n3, t3, e3[t3]);
    return n3;
};
var Kt2 = class extends p3 {
    constructor(e3, t3, i4, s3 = O4, r3 = void 0) {
        super(e3, t3, i4, s3),
            (this.core = e3),
            (this.logger = t3),
            (this.name = i4),
            (this.map = /* @__PURE__ */ new Map()),
            (this.version = Dt),
            (this.cached = []),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.init = async () => {
                this.initialized ||
                    (this.logger.trace('Initialized'),
                    await this.restore(),
                    this.cached.forEach((o3) => {
                        this.getKey && o3 !== null && !w5(o3)
                            ? this.map.set(this.getKey(o3), o3)
                            : Lt(o3)
                              ? this.map.set(o3.id, o3)
                              : xt(o3) && this.map.set(o3.topic, o3);
                    }),
                    (this.cached = []),
                    (this.initialized = true));
            }),
            (this.set = async (o3, a5) => {
                this.isInitialized(),
                    this.map.has(o3)
                        ? await this.update(o3, a5)
                        : (this.logger.debug('Setting value'),
                          this.logger.trace({ type: 'method', method: 'set', key: o3, value: a5 }),
                          this.map.set(o3, a5),
                          await this.persist());
            }),
            (this.get = (o3) => (
                this.isInitialized(),
                this.logger.debug('Getting value'),
                this.logger.trace({ type: 'method', method: 'get', key: o3 }),
                this.getData(o3)
            )),
            (this.getAll = (o3) => (
                this.isInitialized(),
                o3
                    ? this.values.filter((a5) =>
                          Object.keys(o3).every((h6) => (0, import_lodash.default)(a5[h6], o3[h6]))
                      )
                    : this.values
            )),
            (this.update = async (o3, a5) => {
                this.isInitialized(),
                    this.logger.debug('Updating value'),
                    this.logger.trace({ type: 'method', method: 'update', key: o3, update: a5 });
                const h6 = kt(kt({}, this.getData(o3)), a5);
                this.map.set(o3, h6), await this.persist();
            }),
            (this.delete = async (o3, a5) => {
                this.isInitialized(),
                    this.map.has(o3) &&
                        (this.logger.debug('Deleting value'),
                        this.logger.trace({ type: 'method', method: 'delete', key: o3, reason: a5 }),
                        this.map.delete(o3),
                        await this.persist());
            }),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.storagePrefix = s3),
            (this.getKey = r3);
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + '//' + this.name;
    }
    get length() {
        return this.map.size;
    }
    get keys() {
        return Array.from(this.map.keys());
    }
    get values() {
        return Array.from(this.map.values());
    }
    async setDataStore(e3) {
        await this.core.storage.setItem(this.storageKey, e3);
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getData(e3) {
        const t3 = this.map.get(e3);
        if (!t3) {
            const { message: i4 } = N10('NO_MATCHING_KEY', `${this.name}: ${e3}`);
            throw (this.logger.error(i4), new Error(i4));
        }
        return t3;
    }
    async persist() {
        await this.setDataStore(this.values);
    }
    async restore() {
        try {
            const e3 = await this.getDataStore();
            if (typeof e3 > 'u' || !e3.length) return;
            if (this.map.size) {
                const { message: t3 } = N10('RESTORE_WILL_OVERRIDE', this.name);
                throw (this.logger.error(t3), new Error(t3));
            }
            (this.cached = e3),
                this.logger.debug(`Successfully Restored value for ${this.name}`),
                this.logger.trace({ type: 'method', method: 'restore', value: this.values });
        } catch (e3) {
            this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e3);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var Bt2 = class {
    constructor(e3, t3) {
        (this.core = e3),
            (this.logger = t3),
            (this.name = Et2),
            (this.version = wt2),
            (this.events = new import_events5.default()),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.ignoredPayloadTypes = [_5]),
            (this.registeredMethods = []),
            (this.init = async () => {
                this.initialized ||
                    (await this.pairings.init(),
                    await this.cleanup(),
                    this.registerRelayerEvents(),
                    this.registerExpirerEvents(),
                    (this.initialized = true),
                    this.logger.trace('Initialized'));
            }),
            (this.register = ({ methods: i4 }) => {
                this.isInitialized(),
                    (this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i4])]);
            }),
            (this.create = async () => {
                this.isInitialized();
                const i4 = Vn(),
                    s3 = await this.core.crypto.setSymKey(i4),
                    r3 = pt(import_time3.FIVE_MINUTES),
                    o3 = { protocol: ht2 },
                    a5 = { topic: s3, expiry: r3, relay: o3, active: false },
                    h6 = Rt({
                        protocol: this.core.protocol,
                        version: this.core.version,
                        topic: s3,
                        symKey: i4,
                        relay: o3,
                        expiryTimestamp: r3,
                    });
                return (
                    await this.pairings.set(s3, a5),
                    await this.core.relayer.subscribe(s3),
                    this.core.expirer.set(s3, r3),
                    { topic: s3, uri: h6 }
                );
            }),
            (this.pair = async (i4) => {
                this.isInitialized(), this.isValidPair(i4);
                const { topic: s3, symKey: r3, relay: o3, expiryTimestamp: a5 } = Pt(i4.uri);
                let h6;
                if (this.pairings.keys.includes(s3) && ((h6 = this.pairings.get(s3)), h6.active))
                    throw new Error(`Pairing already exists: ${s3}. Please try again with a new connection URI.`);
                const l4 = a5 || pt(import_time3.FIVE_MINUTES),
                    d4 = { topic: s3, relay: o3, expiry: l4, active: false };
                return (
                    await this.pairings.set(s3, d4),
                    this.core.expirer.set(s3, l4),
                    i4.activatePairing && (await this.activate({ topic: s3 })),
                    this.events.emit(V3.create, d4),
                    this.core.crypto.keychain.has(s3) ||
                        (await this.core.crypto.setSymKey(r3, s3),
                        await this.core.relayer.subscribe(s3, { relay: o3 })),
                    d4
                );
            }),
            (this.activate = async ({ topic: i4 }) => {
                this.isInitialized();
                const s3 = pt(import_time3.THIRTY_DAYS);
                await this.pairings.update(i4, { active: true, expiry: s3 }), this.core.expirer.set(i4, s3);
            }),
            (this.ping = async (i4) => {
                this.isInitialized(), await this.isValidPing(i4);
                const { topic: s3 } = i4;
                if (this.pairings.keys.includes(s3)) {
                    const r3 = await this.sendRequest(s3, 'wc_pairingPing', {}),
                        { done: o3, resolve: a5, reject: h6 } = at();
                    this.events.once(yt('pairing_ping', r3), ({ error: l4 }) => {
                        l4 ? h6(l4) : a5();
                    }),
                        await o3();
                }
            }),
            (this.updateExpiry = async ({ topic: i4, expiry: s3 }) => {
                this.isInitialized(), await this.pairings.update(i4, { expiry: s3 });
            }),
            (this.updateMetadata = async ({ topic: i4, metadata: s3 }) => {
                this.isInitialized(), await this.pairings.update(i4, { peerMetadata: s3 });
            }),
            (this.getPairings = () => (this.isInitialized(), this.pairings.values)),
            (this.disconnect = async (i4) => {
                this.isInitialized(), await this.isValidDisconnect(i4);
                const { topic: s3 } = i4;
                this.pairings.keys.includes(s3) &&
                    (await this.sendRequest(s3, 'wc_pairingDelete', U2('USER_DISCONNECTED')),
                    await this.deletePairing(s3));
            }),
            (this.sendRequest = async (i4, s3, r3) => {
                const o3 = formatJsonRpcRequest(s3, r3),
                    a5 = await this.core.crypto.encode(i4, o3),
                    h6 = $4[s3].req;
                return this.core.history.set(i4, o3), this.core.relayer.publish(i4, a5, h6), o3.id;
            }),
            (this.sendResult = async (i4, s3, r3) => {
                const o3 = formatJsonRpcResult(i4, r3),
                    a5 = await this.core.crypto.encode(s3, o3),
                    h6 = await this.core.history.get(s3, i4),
                    l4 = $4[h6.request.method].res;
                await this.core.relayer.publish(s3, a5, l4), await this.core.history.resolve(o3);
            }),
            (this.sendError = async (i4, s3, r3) => {
                const o3 = formatJsonRpcError(i4, r3),
                    a5 = await this.core.crypto.encode(s3, o3),
                    h6 = await this.core.history.get(s3, i4),
                    l4 = $4[h6.request.method] ? $4[h6.request.method].res : $4.unregistered_method.res;
                await this.core.relayer.publish(s3, a5, l4), await this.core.history.resolve(o3);
            }),
            (this.deletePairing = async (i4, s3) => {
                await this.core.relayer.unsubscribe(i4),
                    await Promise.all([
                        this.pairings.delete(i4, U2('USER_DISCONNECTED')),
                        this.core.crypto.deleteSymKey(i4),
                        s3 ? Promise.resolve() : this.core.expirer.del(i4),
                    ]);
            }),
            (this.cleanup = async () => {
                const i4 = this.pairings.getAll().filter((s3) => mt(s3.expiry));
                await Promise.all(i4.map((s3) => this.deletePairing(s3.topic)));
            }),
            (this.onRelayEventRequest = (i4) => {
                const { topic: s3, payload: r3 } = i4;
                switch (r3.method) {
                    case 'wc_pairingPing':
                        return this.onPairingPingRequest(s3, r3);
                    case 'wc_pairingDelete':
                        return this.onPairingDeleteRequest(s3, r3);
                    default:
                        return this.onUnknownRpcMethodRequest(s3, r3);
                }
            }),
            (this.onRelayEventResponse = async (i4) => {
                const { topic: s3, payload: r3 } = i4,
                    o3 = (await this.core.history.get(s3, r3.id)).request.method;
                switch (o3) {
                    case 'wc_pairingPing':
                        return this.onPairingPingResponse(s3, r3);
                    default:
                        return this.onUnknownRpcMethodResponse(o3);
                }
            }),
            (this.onPairingPingRequest = async (i4, s3) => {
                const { id: r3 } = s3;
                try {
                    this.isValidPing({ topic: i4 }),
                        await this.sendResult(r3, i4, true),
                        this.events.emit(V3.ping, { id: r3, topic: i4 });
                } catch (o3) {
                    await this.sendError(r3, i4, o3), this.logger.error(o3);
                }
            }),
            (this.onPairingPingResponse = (i4, s3) => {
                const { id: r3 } = s3;
                setTimeout(() => {
                    isJsonRpcResult(s3)
                        ? this.events.emit(yt('pairing_ping', r3), {})
                        : isJsonRpcError(s3) && this.events.emit(yt('pairing_ping', r3), { error: s3.error });
                }, 500);
            }),
            (this.onPairingDeleteRequest = async (i4, s3) => {
                const { id: r3 } = s3;
                try {
                    this.isValidDisconnect({ topic: i4 }),
                        await this.deletePairing(i4),
                        this.events.emit(V3.delete, { id: r3, topic: i4 });
                } catch (o3) {
                    await this.sendError(r3, i4, o3), this.logger.error(o3);
                }
            }),
            (this.onUnknownRpcMethodRequest = async (i4, s3) => {
                const { id: r3, method: o3 } = s3;
                try {
                    if (this.registeredMethods.includes(o3)) return;
                    const a5 = U2('WC_METHOD_UNSUPPORTED', o3);
                    await this.sendError(r3, i4, a5), this.logger.error(a5);
                } catch (a5) {
                    await this.sendError(r3, i4, a5), this.logger.error(a5);
                }
            }),
            (this.onUnknownRpcMethodResponse = (i4) => {
                this.registeredMethods.includes(i4) || this.logger.error(U2('WC_METHOD_UNSUPPORTED', i4));
            }),
            (this.isValidPair = (i4) => {
                var s3;
                if (!Gt(i4)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `pair() params: ${i4}`);
                    throw new Error(o3);
                }
                if (!Kt(i4.uri)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `pair() uri: ${i4.uri}`);
                    throw new Error(o3);
                }
                const r3 = Pt(i4.uri);
                if (!((s3 = r3 == null ? void 0 : r3.relay) != null && s3.protocol)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', 'pair() uri#relay-protocol');
                    throw new Error(o3);
                }
                if (!(r3 != null && r3.symKey)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', 'pair() uri#symKey');
                    throw new Error(o3);
                }
                if (
                    r3 != null &&
                    r3.expiryTimestamp &&
                    (0, import_time3.toMiliseconds)(r3 == null ? void 0 : r3.expiryTimestamp) < Date.now()
                ) {
                    const { message: o3 } = N10(
                        'EXPIRED',
                        'pair() URI has expired. Please try again with a new connection URI.'
                    );
                    throw new Error(o3);
                }
            }),
            (this.isValidPing = async (i4) => {
                if (!Gt(i4)) {
                    const { message: r3 } = N10('MISSING_OR_INVALID', `ping() params: ${i4}`);
                    throw new Error(r3);
                }
                const { topic: s3 } = i4;
                await this.isValidPairingTopic(s3);
            }),
            (this.isValidDisconnect = async (i4) => {
                if (!Gt(i4)) {
                    const { message: r3 } = N10('MISSING_OR_INVALID', `disconnect() params: ${i4}`);
                    throw new Error(r3);
                }
                const { topic: s3 } = i4;
                await this.isValidPairingTopic(s3);
            }),
            (this.isValidPairingTopic = async (i4) => {
                if (!g4(i4, false)) {
                    const { message: s3 } = N10('MISSING_OR_INVALID', `pairing topic should be a string: ${i4}`);
                    throw new Error(s3);
                }
                if (!this.pairings.keys.includes(i4)) {
                    const { message: s3 } = N10('NO_MATCHING_KEY', `pairing topic doesn't exist: ${i4}`);
                    throw new Error(s3);
                }
                if (mt(this.pairings.get(i4).expiry)) {
                    await this.deletePairing(i4);
                    const { message: s3 } = N10('EXPIRED', `pairing topic: ${i4}`);
                    throw new Error(s3);
                }
            }),
            (this.core = e3),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.pairings = new Kt2(this.core, this.logger, this.name, this.storagePrefix));
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(D5.message, async (e3) => {
            const { topic: t3, message: i4 } = e3;
            if (
                !this.pairings.keys.includes(t3) ||
                this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i4))
            )
                return;
            const s3 = await this.core.crypto.decode(t3, i4);
            try {
                isJsonRpcRequest(s3)
                    ? (this.core.history.set(t3, s3), this.onRelayEventRequest({ topic: t3, payload: s3 }))
                    : isJsonRpcResponse(s3) &&
                      (await this.core.history.resolve(s3),
                      await this.onRelayEventResponse({ topic: t3, payload: s3 }),
                      this.core.history.delete(t3, s3.id));
            } catch (r3) {
                this.logger.error(r3);
            }
        });
    }
    registerExpirerEvents() {
        this.core.expirer.on(v4.expired, async (e3) => {
            const { topic: t3 } = ft(e3.target);
            t3 &&
                this.pairings.keys.includes(t3) &&
                (await this.deletePairing(t3, true), this.events.emit(V3.expire, { topic: t3 }));
        });
    }
};
var Vt = class extends h4 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.core = e3),
            (this.logger = t3),
            (this.records = /* @__PURE__ */ new Map()),
            (this.events = new import_events5.EventEmitter()),
            (this.name = vt2),
            (this.version = It2),
            (this.cached = []),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.init = async () => {
                this.initialized ||
                    (this.logger.trace('Initialized'),
                    await this.restore(),
                    this.cached.forEach((i4) => this.records.set(i4.id, i4)),
                    (this.cached = []),
                    this.registerEventListeners(),
                    (this.initialized = true));
            }),
            (this.set = (i4, s3, r3) => {
                if (
                    (this.isInitialized(),
                    this.logger.debug('Setting JSON-RPC request history record'),
                    this.logger.trace({ type: 'method', method: 'set', topic: i4, request: s3, chainId: r3 }),
                    this.records.has(s3.id))
                )
                    return;
                const o3 = {
                    id: s3.id,
                    topic: i4,
                    request: { method: s3.method, params: s3.params || null },
                    chainId: r3,
                    expiry: pt(import_time3.THIRTY_DAYS),
                };
                this.records.set(o3.id, o3), this.events.emit(R3.created, o3);
            }),
            (this.resolve = async (i4) => {
                if (
                    (this.isInitialized(),
                    this.logger.debug('Updating JSON-RPC response history record'),
                    this.logger.trace({ type: 'method', method: 'update', response: i4 }),
                    !this.records.has(i4.id))
                )
                    return;
                const s3 = await this.getRecord(i4.id);
                typeof s3.response > 'u' &&
                    ((s3.response = isJsonRpcError(i4) ? { error: i4.error } : { result: i4.result }),
                    this.records.set(s3.id, s3),
                    this.events.emit(R3.updated, s3));
            }),
            (this.get = async (i4, s3) => (
                this.isInitialized(),
                this.logger.debug('Getting record'),
                this.logger.trace({ type: 'method', method: 'get', topic: i4, id: s3 }),
                await this.getRecord(s3)
            )),
            (this.delete = (i4, s3) => {
                this.isInitialized(),
                    this.logger.debug('Deleting record'),
                    this.logger.trace({ type: 'method', method: 'delete', id: s3 }),
                    this.values.forEach((r3) => {
                        if (r3.topic === i4) {
                            if (typeof s3 < 'u' && r3.id !== s3) return;
                            this.records.delete(r3.id), this.events.emit(R3.deleted, r3);
                        }
                    });
            }),
            (this.exists = async (i4, s3) => (
                this.isInitialized(), this.records.has(s3) ? (await this.getRecord(s3)).topic === i4 : false
            )),
            (this.on = (i4, s3) => {
                this.events.on(i4, s3);
            }),
            (this.once = (i4, s3) => {
                this.events.once(i4, s3);
            }),
            (this.off = (i4, s3) => {
                this.events.off(i4, s3);
            }),
            (this.removeListener = (i4, s3) => {
                this.events.removeListener(i4, s3);
            }),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name));
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + '//' + this.name;
    }
    get size() {
        return this.records.size;
    }
    get keys() {
        return Array.from(this.records.keys());
    }
    get values() {
        return Array.from(this.records.values());
    }
    get pending() {
        const e3 = [];
        return (
            this.values.forEach((t3) => {
                if (typeof t3.response < 'u') return;
                const i4 = {
                    topic: t3.topic,
                    request: formatJsonRpcRequest(t3.request.method, t3.request.params, t3.id),
                    chainId: t3.chainId,
                };
                return e3.push(i4);
            }),
            e3
        );
    }
    async setJsonRpcRecords(e3) {
        await this.core.storage.setItem(this.storageKey, e3);
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getRecord(e3) {
        this.isInitialized();
        const t3 = this.records.get(e3);
        if (!t3) {
            const { message: i4 } = N10('NO_MATCHING_KEY', `${this.name}: ${e3}`);
            throw new Error(i4);
        }
        return t3;
    }
    async persist() {
        await this.setJsonRpcRecords(this.values), this.events.emit(R3.sync);
    }
    async restore() {
        try {
            const e3 = await this.getJsonRpcRecords();
            if (typeof e3 > 'u' || !e3.length) return;
            if (this.records.size) {
                const { message: t3 } = N10('RESTORE_WILL_OVERRIDE', this.name);
                throw (this.logger.error(t3), new Error(t3));
            }
            (this.cached = e3),
                this.logger.debug(`Successfully Restored records for ${this.name}`),
                this.logger.trace({ type: 'method', method: 'restore', records: this.values });
        } catch (e3) {
            this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e3);
        }
    }
    registerEventListeners() {
        this.events.on(R3.created, (e3) => {
            const t3 = R3.created;
            this.logger.info(`Emitting ${t3}`),
                this.logger.debug({ type: 'event', event: t3, record: e3 }),
                this.persist();
        }),
            this.events.on(R3.updated, (e3) => {
                const t3 = R3.updated;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, record: e3 }),
                    this.persist();
            }),
            this.events.on(R3.deleted, (e3) => {
                const t3 = R3.deleted;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, record: e3 }),
                    this.persist();
            }),
            this.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, () => {
                this.cleanup();
            });
    }
    cleanup() {
        try {
            this.records.forEach((e3) => {
                (0, import_time3.toMiliseconds)(e3.expiry || 0) - Date.now() <= 0 &&
                    (this.logger.info(`Deleting expired history log: ${e3.id}`), this.delete(e3.topic, e3.id));
            });
        } catch (e3) {
            this.logger.warn(e3);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var qt2 = class extends E5 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.core = e3),
            (this.logger = t3),
            (this.expirations = /* @__PURE__ */ new Map()),
            (this.events = new import_events5.EventEmitter()),
            (this.name = Ct),
            (this.version = Rt2),
            (this.cached = []),
            (this.initialized = false),
            (this.storagePrefix = O4),
            (this.init = async () => {
                this.initialized ||
                    (this.logger.trace('Initialized'),
                    await this.restore(),
                    this.cached.forEach((i4) => this.expirations.set(i4.target, i4)),
                    (this.cached = []),
                    this.registerEventListeners(),
                    (this.initialized = true));
            }),
            (this.has = (i4) => {
                try {
                    const s3 = this.formatTarget(i4);
                    return typeof this.getExpiration(s3) < 'u';
                } catch {
                    return false;
                }
            }),
            (this.set = (i4, s3) => {
                this.isInitialized();
                const r3 = this.formatTarget(i4),
                    o3 = { target: r3, expiry: s3 };
                this.expirations.set(r3, o3),
                    this.checkExpiry(r3, o3),
                    this.events.emit(v4.created, { target: r3, expiration: o3 });
            }),
            (this.get = (i4) => {
                this.isInitialized();
                const s3 = this.formatTarget(i4);
                return this.getExpiration(s3);
            }),
            (this.del = (i4) => {
                if ((this.isInitialized(), this.has(i4))) {
                    const s3 = this.formatTarget(i4),
                        r3 = this.getExpiration(s3);
                    this.expirations.delete(s3), this.events.emit(v4.deleted, { target: s3, expiration: r3 });
                }
            }),
            (this.on = (i4, s3) => {
                this.events.on(i4, s3);
            }),
            (this.once = (i4, s3) => {
                this.events.once(i4, s3);
            }),
            (this.off = (i4, s3) => {
                this.events.off(i4, s3);
            }),
            (this.removeListener = (i4, s3) => {
                this.events.removeListener(i4, s3);
            }),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name));
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + '//' + this.name;
    }
    get length() {
        return this.expirations.size;
    }
    get keys() {
        return Array.from(this.expirations.keys());
    }
    get values() {
        return Array.from(this.expirations.values());
    }
    formatTarget(e3) {
        if (typeof e3 == 'string') return lt(e3);
        if (typeof e3 == 'number') return dt(e3);
        const { message: t3 } = N10('UNKNOWN_TYPE', `Target type: ${typeof e3}`);
        throw new Error(t3);
    }
    async setExpirations(e3) {
        await this.core.storage.setItem(this.storageKey, e3);
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey);
    }
    async persist() {
        await this.setExpirations(this.values), this.events.emit(v4.sync);
    }
    async restore() {
        try {
            const e3 = await this.getExpirations();
            if (typeof e3 > 'u' || !e3.length) return;
            if (this.expirations.size) {
                const { message: t3 } = N10('RESTORE_WILL_OVERRIDE', this.name);
                throw (this.logger.error(t3), new Error(t3));
            }
            (this.cached = e3),
                this.logger.debug(`Successfully Restored expirations for ${this.name}`),
                this.logger.trace({ type: 'method', method: 'restore', expirations: this.values });
        } catch (e3) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e3);
        }
    }
    getExpiration(e3) {
        const t3 = this.expirations.get(e3);
        if (!t3) {
            const { message: i4 } = N10('NO_MATCHING_KEY', `${this.name}: ${e3}`);
            throw (this.logger.error(i4), new Error(i4));
        }
        return t3;
    }
    checkExpiry(e3, t3) {
        const { expiry: i4 } = t3;
        (0, import_time3.toMiliseconds)(i4) - Date.now() <= 0 && this.expire(e3, t3);
    }
    expire(e3, t3) {
        this.expirations.delete(e3), this.events.emit(v4.expired, { target: e3, expiration: t3 });
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((e3, t3) => this.checkExpiry(t3, e3));
    }
    registerEventListeners() {
        this.core.heartbeat.on(import_heartbeat.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()),
            this.events.on(v4.created, (e3) => {
                const t3 = v4.created;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, data: e3 }),
                    this.persist();
            }),
            this.events.on(v4.expired, (e3) => {
                const t3 = v4.expired;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, data: e3 }),
                    this.persist();
            }),
            this.events.on(v4.deleted, (e3) => {
                const t3 = v4.deleted;
                this.logger.info(`Emitting ${t3}`),
                    this.logger.debug({ type: 'event', event: t3, data: e3 }),
                    this.persist();
            });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(e3);
        }
    }
};
var jt = class extends y4 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.projectId = e3),
            (this.logger = t3),
            (this.name = Z3),
            (this.initialized = false),
            (this.queue = []),
            (this.verifyDisabled = false),
            (this.init = async (i4) => {
                if (this.verifyDisabled || $3() || !D4()) return;
                const s3 = this.getVerifyUrl(i4 == null ? void 0 : i4.verifyUrl);
                this.verifyUrl !== s3 && this.removeIframe(), (this.verifyUrl = s3);
                try {
                    await this.createIframe();
                } catch (r3) {
                    this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.info(r3);
                }
                if (!this.initialized) {
                    this.removeIframe(), (this.verifyUrl = ee2);
                    try {
                        await this.createIframe();
                    } catch (r3) {
                        this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`),
                            this.logger.info(r3),
                            (this.verifyDisabled = true);
                    }
                }
            }),
            (this.register = async (i4) => {
                this.initialized
                    ? this.sendPost(i4.attestationId)
                    : (this.addToQueue(i4.attestationId), await this.init());
            }),
            (this.resolve = async (i4) => {
                if (this.isDevEnv) return '';
                const s3 = this.getVerifyUrl(i4 == null ? void 0 : i4.verifyUrl);
                let r3;
                try {
                    r3 = await this.fetchAttestation(i4.attestationId, s3);
                } catch (o3) {
                    this.logger.info(`failed to resolve attestation: ${i4.attestationId} from url: ${s3}`),
                        this.logger.info(o3),
                        (r3 = await this.fetchAttestation(i4.attestationId, ee2));
                }
                return r3;
            }),
            (this.fetchAttestation = async (i4, s3) => {
                this.logger.info(`resolving attestation: ${i4} from url: ${s3}`);
                const r3 = this.startAbortTimer(import_time3.ONE_SECOND * 2),
                    o3 = await fetch(`${s3}/attestation/${i4}`, { signal: this.abortController.signal });
                return clearTimeout(r3), o3.status === 200 ? await o3.json() : void 0;
            }),
            (this.addToQueue = (i4) => {
                this.queue.push(i4);
            }),
            (this.processQueue = () => {
                this.queue.length !== 0 && (this.queue.forEach((i4) => this.sendPost(i4)), (this.queue = []));
            }),
            (this.sendPost = (i4) => {
                var s3;
                try {
                    if (!this.iframe) return;
                    (s3 = this.iframe.contentWindow) == null || s3.postMessage(i4, '*'),
                        this.logger.info(`postMessage sent: ${i4} ${this.verifyUrl}`);
                } catch {}
            }),
            (this.createIframe = async () => {
                let i4;
                const s3 = (r3) => {
                    r3.data === 'verify_ready' &&
                        ((this.initialized = true),
                        this.processQueue(),
                        window.removeEventListener('message', s3),
                        i4());
                };
                await Promise.race([
                    new Promise((r3) => {
                        if (document.getElementById(Z3)) return r3();
                        window.addEventListener('message', s3);
                        const o3 = document.createElement('iframe');
                        (o3.id = Z3),
                            (o3.src = `${this.verifyUrl}/${this.projectId}`),
                            (o3.style.display = 'none'),
                            document.body.append(o3),
                            (this.iframe = o3),
                            (i4 = r3);
                    }),
                    new Promise((r3, o3) =>
                        setTimeout(
                            () => {
                                window.removeEventListener('message', s3), o3('verify iframe load timeout');
                            },
                            (0, import_time3.toMiliseconds)(import_time3.FIVE_SECONDS)
                        )
                    ),
                ]);
            }),
            (this.removeIframe = () => {
                this.iframe && (this.iframe.remove(), (this.iframe = void 0), (this.initialized = false));
            }),
            (this.getVerifyUrl = (i4) => {
                let s3 = i4 || F4;
                return (
                    _t.includes(s3) ||
                        (this.logger.info(`verify url: ${s3}, not included in trusted list, assigning default: ${F4}`),
                        (s3 = F4)),
                    s3
                );
            }),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.verifyUrl = F4),
            (this.abortController = new AbortController()),
            (this.isDevEnv = te() && process.env.IS_VITEST);
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    startAbortTimer(e3) {
        return (
            (this.abortController = new AbortController()),
            setTimeout(() => this.abortController.abort(), (0, import_time3.toMiliseconds)(e3))
        );
    }
};
var Gt2 = class extends v3 {
    constructor(e3, t3) {
        super(e3, t3),
            (this.projectId = e3),
            (this.logger = t3),
            (this.context = Tt2),
            (this.registerDeviceToken = async (i4) => {
                const { clientId: s3, token: r3, notificationType: o3, enableEncrypted: a5 = false } = i4,
                    h6 = `${St2}/${this.projectId}/clients`;
                await (0, import_isomorphic_unfetch.default)(h6, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ client_id: s3, type: o3, token: r3, always_raw: a5 }),
                });
            }),
            (this.logger = (0, import_logger.generateChildLogger)(t3, this.context));
    }
};
var Lr = Object.defineProperty;
var Yt2 = Object.getOwnPropertySymbols;
var $r = Object.prototype.hasOwnProperty;
var Fr = Object.prototype.propertyIsEnumerable;
var Ht2 = (n3, e3, t3) =>
    e3 in n3 ? Lr(n3, e3, { enumerable: true, configurable: true, writable: true, value: t3 }) : (n3[e3] = t3);
var Jt2 = (n3, e3) => {
    for (var t3 in e3 || (e3 = {})) $r.call(e3, t3) && Ht2(n3, t3, e3[t3]);
    if (Yt2) for (var t3 of Yt2(e3)) Fr.call(e3, t3) && Ht2(n3, t3, e3[t3]);
    return n3;
};
var te2 = class _te extends n2 {
    constructor(e3) {
        super(e3),
            (this.protocol = le2),
            (this.version = We2),
            (this.name = Q3),
            (this.events = new import_events5.EventEmitter()),
            (this.initialized = false),
            (this.on = (i4, s3) => this.events.on(i4, s3)),
            (this.once = (i4, s3) => this.events.once(i4, s3)),
            (this.off = (i4, s3) => this.events.off(i4, s3)),
            (this.removeListener = (i4, s3) => this.events.removeListener(i4, s3)),
            (this.projectId = e3 == null ? void 0 : e3.projectId),
            (this.relayUrl = (e3 == null ? void 0 : e3.relayUrl) || ge2),
            (this.customStoragePrefix = e3 != null && e3.customStoragePrefix ? `:${e3.customStoragePrefix}` : '');
        const t3 =
            typeof (e3 == null ? void 0 : e3.logger) < 'u' && typeof (e3 == null ? void 0 : e3.logger) != 'string'
                ? e3.logger
                : (0, import_logger.pino)(
                      (0, import_logger.getDefaultLoggerOptions)({
                          level: (e3 == null ? void 0 : e3.logger) || Qe2.logger,
                      })
                  );
        (this.logger = (0, import_logger.generateChildLogger)(t3, this.name)),
            (this.heartbeat = new import_heartbeat.HeartBeat()),
            (this.crypto = new xt2(this, this.logger, e3 == null ? void 0 : e3.keychain)),
            (this.history = new Vt(this, this.logger)),
            (this.expirer = new qt2(this, this.logger)),
            (this.storage =
                e3 != null && e3.storage
                    ? e3.storage
                    : new h3(Jt2(Jt2({}, Ze2), e3 == null ? void 0 : e3.storageOptions))),
            (this.relayer = new $t({
                core: this,
                logger: this.logger,
                relayUrl: this.relayUrl,
                projectId: this.projectId,
            })),
            (this.pairing = new Bt2(this, this.logger)),
            (this.verify = new jt(this.projectId || '', this.logger)),
            (this.echoClient = new Gt2(this.projectId || '', this.logger));
    }
    static async init(e3) {
        const t3 = new _te(e3);
        await t3.initialize();
        const i4 = await t3.crypto.getClientId();
        return await t3.storage.setItem(yt2, i4), t3;
    }
    get context() {
        return (0, import_logger.getLoggerContext)(this.logger);
    }
    async start() {
        this.initialized || (await this.initialize());
    }
    async initialize() {
        this.logger.trace('Initialized');
        try {
            await this.crypto.init(),
                await this.history.init(),
                await this.expirer.init(),
                await this.relayer.init(),
                await this.heartbeat.init(),
                await this.pairing.init(),
                (this.initialized = true),
                this.logger.info('Core Initialization Success');
        } catch (e3) {
            throw (
                (this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e3),
                this.logger.error(e3.message),
                e3)
            );
        }
    }
};
var Mr = te2;

// node_modules/@walletconnect/sign-client/dist/index.es.js
var import_logger2 = __toESM(require_cjs7());
var import_events6 = __toESM(require_events());
var import_time4 = __toESM(require_cjs5());
var J3 = 'wc';
var F5 = 2;
var X4 = 'client';
var G4 = `${J3}@${F5}:${X4}:`;
var M4 = { name: X4, logger: 'error', controller: false, relayUrl: 'wss://relay.walletconnect.com' };
var H4 = 'WALLETCONNECT_DEEPLINK_CHOICE';
var oe = 'proposal';
var ae2 = 'Proposal expired';
var ce3 = 'session';
var L5 = import_time4.SEVEN_DAYS;
var le3 = 'engine';
var R4 = {
    wc_sessionPropose: {
        req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1100 },
        res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1101 },
    },
    wc_sessionSettle: {
        req: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1102 },
        res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1103 },
    },
    wc_sessionUpdate: {
        req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1104 },
        res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1105 },
    },
    wc_sessionExtend: {
        req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1106 },
        res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1107 },
    },
    wc_sessionRequest: {
        req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1108 },
        res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1109 },
    },
    wc_sessionEvent: {
        req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1110 },
        res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1111 },
    },
    wc_sessionDelete: {
        req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1112 },
        res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1113 },
    },
    wc_sessionPing: {
        req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1114 },
        res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1115 },
    },
};
var U4 = { min: import_time4.FIVE_MINUTES, max: import_time4.SEVEN_DAYS };
var I3 = { idle: 'IDLE', active: 'ACTIVE' };
var pe2 = 'request';
var he3 = ['wc_sessionPropose', 'wc_sessionRequest', 'wc_authRequest'];
var as2 = Object.defineProperty;
var cs2 = Object.defineProperties;
var ls2 = Object.getOwnPropertyDescriptors;
var de3 = Object.getOwnPropertySymbols;
var ps2 = Object.prototype.hasOwnProperty;
var hs2 = Object.prototype.propertyIsEnumerable;
var ue3 = (w8, r3, e3) =>
    r3 in w8 ? as2(w8, r3, { enumerable: true, configurable: true, writable: true, value: e3 }) : (w8[r3] = e3);
var g6 = (w8, r3) => {
    for (var e3 in r3 || (r3 = {})) ps2.call(r3, e3) && ue3(w8, e3, r3[e3]);
    if (de3) for (var e3 of de3(r3)) hs2.call(r3, e3) && ue3(w8, e3, r3[e3]);
    return w8;
};
var D6 = (w8, r3) => cs2(w8, ls2(r3));
var ds2 = class extends w4 {
    constructor(r3) {
        super(r3),
            (this.name = le3),
            (this.events = new import_events6.default()),
            (this.initialized = false),
            (this.ignoredPayloadTypes = [_5]),
            (this.requestQueue = { state: I3.idle, queue: [] }),
            (this.sessionRequestQueue = { state: I3.idle, queue: [] }),
            (this.requestQueueDelay = import_time4.ONE_SECOND),
            (this.init = async () => {
                this.initialized ||
                    (await this.cleanup(),
                    this.registerRelayerEvents(),
                    this.registerExpirerEvents(),
                    this.registerPairingEvents(),
                    this.client.core.pairing.register({ methods: Object.keys(R4) }),
                    (this.initialized = true),
                    setTimeout(
                        () => {
                            (this.sessionRequestQueue.queue = this.getPendingSessionRequests()),
                                this.processSessionRequestQueue();
                        },
                        (0, import_time4.toMiliseconds)(this.requestQueueDelay)
                    ));
            }),
            (this.connect = async (e3) => {
                await this.isInitialized();
                const s3 = D6(g6({}, e3), {
                    requiredNamespaces: e3.requiredNamespaces || {},
                    optionalNamespaces: e3.optionalNamespaces || {},
                });
                await this.isValidConnect(s3);
                const {
                    pairingTopic: t3,
                    requiredNamespaces: i4,
                    optionalNamespaces: n3,
                    sessionProperties: o3,
                    relays: a5,
                } = s3;
                let c5 = t3,
                    p5,
                    d4 = false;
                if ((c5 && (d4 = this.client.core.pairing.pairings.get(c5).active), !c5 || !d4)) {
                    const { topic: T4, uri: _6 } = await this.client.core.pairing.create();
                    (c5 = T4), (p5 = _6);
                }
                const h6 = await this.client.core.crypto.generateKeyPair(),
                    N12 = R4.wc_sessionPropose.req.ttl || import_time4.FIVE_MINUTES,
                    m4 = pt(N12),
                    f4 = g6(
                        {
                            requiredNamespaces: i4,
                            optionalNamespaces: n3,
                            relays: a5 ?? [{ protocol: ht2 }],
                            proposer: { publicKey: h6, metadata: this.client.metadata },
                            expiryTimestamp: m4,
                        },
                        o3 && { sessionProperties: o3 }
                    ),
                    { reject: k5, resolve: O5, done: we } = at(N12, ae2);
                if (
                    (this.events.once(yt('session_connect'), async ({ error: T4, session: _6 }) => {
                        if (T4) k5(T4);
                        else if (_6) {
                            _6.self.publicKey = h6;
                            const B4 = D6(g6({}, _6), {
                                requiredNamespaces: f4.requiredNamespaces,
                                optionalNamespaces: f4.optionalNamespaces,
                            });
                            await this.client.session.set(_6.topic, B4),
                                await this.setExpiry(_6.topic, _6.expiry),
                                c5 &&
                                    (await this.client.core.pairing.updateMetadata({
                                        topic: c5,
                                        metadata: _6.peer.metadata,
                                    })),
                                O5(B4);
                        }
                    }),
                    !c5)
                ) {
                    const { message: T4 } = N10('NO_MATCHING_KEY', `connect() pairing topic: ${c5}`);
                    throw new Error(T4);
                }
                const W4 = await this.sendRequest({
                    topic: c5,
                    method: 'wc_sessionPropose',
                    params: f4,
                    throwOnFailedPublish: true,
                });
                return await this.setProposal(W4, g6({ id: W4 }, f4)), { uri: p5, approval: we };
            }),
            (this.pair = async (e3) => (await this.isInitialized(), await this.client.core.pairing.pair(e3))),
            (this.approve = async (e3) => {
                await this.isInitialized(), await this.isValidApprove(e3);
                const { id: s3, relayProtocol: t3, namespaces: i4, sessionProperties: n3 } = e3,
                    o3 = this.client.proposal.get(s3);
                let { pairingTopic: a5, proposer: c5, requiredNamespaces: p5, optionalNamespaces: d4 } = o3;
                a5 = a5 || '';
                const h6 = await this.client.core.crypto.generateKeyPair(),
                    N12 = c5.publicKey,
                    m4 = await this.client.core.crypto.generateSharedKey(h6, N12);
                a5 &&
                    s3 &&
                    (await this.client.core.pairing.updateMetadata({ topic: a5, metadata: c5.metadata }),
                    await this.sendResult({
                        id: s3,
                        topic: a5,
                        result: { relay: { protocol: t3 ?? 'irn' }, responderPublicKey: h6 },
                    }),
                    await this.client.proposal.delete(s3, U2('USER_DISCONNECTED')),
                    await this.client.core.pairing.activate({ topic: a5 }));
                const f4 = g6(
                    {
                        relay: { protocol: t3 ?? 'irn' },
                        namespaces: i4,
                        pairingTopic: a5,
                        controller: { publicKey: h6, metadata: this.client.metadata },
                        expiry: pt(L5),
                    },
                    n3 && { sessionProperties: n3 }
                );
                await this.client.core.relayer.subscribe(m4);
                const k5 = D6(g6({}, f4), {
                    topic: m4,
                    requiredNamespaces: p5,
                    optionalNamespaces: d4,
                    pairingTopic: a5,
                    acknowledged: false,
                    self: f4.controller,
                    peer: { publicKey: c5.publicKey, metadata: c5.metadata },
                    controller: h6,
                });
                await this.client.session.set(m4, k5);
                try {
                    await this.sendRequest({
                        topic: m4,
                        method: 'wc_sessionSettle',
                        params: f4,
                        throwOnFailedPublish: true,
                    });
                } catch (O5) {
                    throw (
                        (this.client.logger.error(O5),
                        this.client.session.delete(m4, U2('USER_DISCONNECTED')),
                        await this.client.core.relayer.unsubscribe(m4),
                        O5)
                    );
                }
                return (
                    await this.setExpiry(m4, pt(L5)),
                    {
                        topic: m4,
                        acknowledged: () => new Promise((O5) => setTimeout(() => O5(this.client.session.get(m4)), 500)),
                    }
                );
            }),
            (this.reject = async (e3) => {
                await this.isInitialized(), await this.isValidReject(e3);
                const { id: s3, reason: t3 } = e3,
                    { pairingTopic: i4 } = this.client.proposal.get(s3);
                i4 &&
                    (await this.sendError(s3, i4, t3), await this.client.proposal.delete(s3, U2('USER_DISCONNECTED')));
            }),
            (this.update = async (e3) => {
                await this.isInitialized(), await this.isValidUpdate(e3);
                const { topic: s3, namespaces: t3 } = e3,
                    i4 = await this.sendRequest({ topic: s3, method: 'wc_sessionUpdate', params: { namespaces: t3 } }),
                    { done: n3, resolve: o3, reject: a5 } = at();
                return (
                    this.events.once(yt('session_update', i4), ({ error: c5 }) => {
                        c5 ? a5(c5) : o3();
                    }),
                    await this.client.session.update(s3, { namespaces: t3 }),
                    { acknowledged: n3 }
                );
            }),
            (this.extend = async (e3) => {
                await this.isInitialized(), await this.isValidExtend(e3);
                const { topic: s3 } = e3,
                    t3 = await this.sendRequest({ topic: s3, method: 'wc_sessionExtend', params: {} }),
                    { done: i4, resolve: n3, reject: o3 } = at();
                return (
                    this.events.once(yt('session_extend', t3), ({ error: a5 }) => {
                        a5 ? o3(a5) : n3();
                    }),
                    await this.setExpiry(s3, pt(L5)),
                    { acknowledged: i4 }
                );
            }),
            (this.request = async (e3) => {
                await this.isInitialized(), await this.isValidRequest(e3);
                const { chainId: s3, request: t3, topic: i4, expiry: n3 = R4.wc_sessionRequest.req.ttl } = e3,
                    o3 = payloadId(),
                    { done: a5, resolve: c5, reject: p5 } = at(n3, 'Request expired. Please try again.');
                return (
                    this.events.once(yt('session_request', o3), ({ error: d4, result: h6 }) => {
                        d4 ? p5(d4) : c5(h6);
                    }),
                    await Promise.all([
                        new Promise(async (d4) => {
                            await this.sendRequest({
                                clientRpcId: o3,
                                topic: i4,
                                method: 'wc_sessionRequest',
                                params: { request: D6(g6({}, t3), { expiryTimestamp: pt(n3) }), chainId: s3 },
                                expiry: n3,
                                throwOnFailedPublish: true,
                            }).catch((h6) => p5(h6)),
                                this.client.events.emit('session_request_sent', {
                                    topic: i4,
                                    request: t3,
                                    chainId: s3,
                                    id: o3,
                                }),
                                d4();
                        }),
                        new Promise(async (d4) => {
                            const h6 = await ht(this.client.core.storage, H4);
                            gt({ id: o3, topic: i4, wcDeepLink: h6 }), d4();
                        }),
                        a5(),
                    ]).then((d4) => d4[2])
                );
            }),
            (this.respond = async (e3) => {
                await this.isInitialized(), await this.isValidRespond(e3);
                const { topic: s3, response: t3 } = e3,
                    { id: i4 } = t3;
                isJsonRpcResult(t3)
                    ? await this.sendResult({ id: i4, topic: s3, result: t3.result, throwOnFailedPublish: true })
                    : isJsonRpcError(t3) && (await this.sendError(i4, s3, t3.error)),
                    this.cleanupAfterResponse(e3);
            }),
            (this.ping = async (e3) => {
                await this.isInitialized(), await this.isValidPing(e3);
                const { topic: s3 } = e3;
                if (this.client.session.keys.includes(s3)) {
                    const t3 = await this.sendRequest({ topic: s3, method: 'wc_sessionPing', params: {} }),
                        { done: i4, resolve: n3, reject: o3 } = at();
                    this.events.once(yt('session_ping', t3), ({ error: a5 }) => {
                        a5 ? o3(a5) : n3();
                    }),
                        await i4();
                } else
                    this.client.core.pairing.pairings.keys.includes(s3) &&
                        (await this.client.core.pairing.ping({ topic: s3 }));
            }),
            (this.emit = async (e3) => {
                await this.isInitialized(), await this.isValidEmit(e3);
                const { topic: s3, event: t3, chainId: i4 } = e3;
                await this.sendRequest({ topic: s3, method: 'wc_sessionEvent', params: { event: t3, chainId: i4 } });
            }),
            (this.disconnect = async (e3) => {
                await this.isInitialized(), await this.isValidDisconnect(e3);
                const { topic: s3 } = e3;
                if (this.client.session.keys.includes(s3))
                    await this.sendRequest({
                        topic: s3,
                        method: 'wc_sessionDelete',
                        params: U2('USER_DISCONNECTED'),
                        throwOnFailedPublish: true,
                    }),
                        await this.deleteSession({ topic: s3, emitEvent: false });
                else if (this.client.core.pairing.pairings.keys.includes(s3))
                    await this.client.core.pairing.disconnect({ topic: s3 });
                else {
                    const { message: t3 } = N10('MISMATCHED_TOPIC', `Session or pairing topic not found: ${s3}`);
                    throw new Error(t3);
                }
            }),
            (this.find = (e3) => (this.isInitialized(), this.client.session.getAll().filter((s3) => Mt(s3, e3)))),
            (this.getPendingSessionRequests = () => this.client.pendingRequest.getAll()),
            (this.cleanupDuplicatePairings = async (e3) => {
                if (e3.pairingTopic)
                    try {
                        const s3 = this.client.core.pairing.pairings.get(e3.pairingTopic),
                            t3 = this.client.core.pairing.pairings.getAll().filter((i4) => {
                                var n3, o3;
                                return (
                                    ((n3 = i4.peerMetadata) == null ? void 0 : n3.url) &&
                                    ((o3 = i4.peerMetadata) == null ? void 0 : o3.url) === e3.peer.metadata.url &&
                                    i4.topic &&
                                    i4.topic !== s3.topic
                                );
                            });
                        if (t3.length === 0) return;
                        this.client.logger.info(`Cleaning up ${t3.length} duplicate pairing(s)`),
                            await Promise.all(t3.map((i4) => this.client.core.pairing.disconnect({ topic: i4.topic }))),
                            this.client.logger.info('Duplicate pairings clean up finished');
                    } catch (s3) {
                        this.client.logger.error(s3);
                    }
            }),
            (this.deleteSession = async (e3) => {
                const { topic: s3, expirerHasDeleted: t3 = false, emitEvent: i4 = true, id: n3 = 0 } = e3,
                    { self: o3 } = this.client.session.get(s3);
                await this.client.core.relayer.unsubscribe(s3),
                    await this.client.session.delete(s3, U2('USER_DISCONNECTED')),
                    this.client.core.crypto.keychain.has(o3.publicKey) &&
                        (await this.client.core.crypto.deleteKeyPair(o3.publicKey)),
                    this.client.core.crypto.keychain.has(s3) && (await this.client.core.crypto.deleteSymKey(s3)),
                    t3 || this.client.core.expirer.del(s3),
                    this.client.core.storage.removeItem(H4).catch((a5) => this.client.logger.warn(a5)),
                    this.getPendingSessionRequests().forEach((a5) => {
                        a5.topic === s3 && this.deletePendingSessionRequest(a5.id, U2('USER_DISCONNECTED'));
                    }),
                    i4 && this.client.events.emit('session_delete', { id: n3, topic: s3 });
            }),
            (this.deleteProposal = async (e3, s3) => {
                await Promise.all([
                    this.client.proposal.delete(e3, U2('USER_DISCONNECTED')),
                    s3 ? Promise.resolve() : this.client.core.expirer.del(e3),
                ]);
            }),
            (this.deletePendingSessionRequest = async (e3, s3, t3 = false) => {
                await Promise.all([
                    this.client.pendingRequest.delete(e3, s3),
                    t3 ? Promise.resolve() : this.client.core.expirer.del(e3),
                ]),
                    (this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i4) => i4.id !== e3)),
                    t3 &&
                        ((this.sessionRequestQueue.state = I3.idle),
                        this.client.events.emit('session_request_expire', { id: e3 }));
            }),
            (this.setExpiry = async (e3, s3) => {
                this.client.session.keys.includes(e3) && (await this.client.session.update(e3, { expiry: s3 })),
                    this.client.core.expirer.set(e3, s3);
            }),
            (this.setProposal = async (e3, s3) => {
                await this.client.proposal.set(e3, s3),
                    this.client.core.expirer.set(e3, pt(R4.wc_sessionPropose.req.ttl));
            }),
            (this.setPendingSessionRequest = async (e3) => {
                const { id: s3, topic: t3, params: i4, verifyContext: n3 } = e3,
                    o3 = i4.request.expiryTimestamp || pt(R4.wc_sessionRequest.req.ttl);
                await this.client.pendingRequest.set(s3, { id: s3, topic: t3, params: i4, verifyContext: n3 }),
                    o3 && this.client.core.expirer.set(s3, o3);
            }),
            (this.sendRequest = async (e3) => {
                const {
                        topic: s3,
                        method: t3,
                        params: i4,
                        expiry: n3,
                        relayRpcId: o3,
                        clientRpcId: a5,
                        throwOnFailedPublish: c5,
                    } = e3,
                    p5 = formatJsonRpcRequest(t3, i4, a5);
                if (D4() && he3.includes(t3)) {
                    const N12 = Ln(JSON.stringify(p5));
                    this.client.core.verify.register({ attestationId: N12 });
                }
                const d4 = await this.client.core.crypto.encode(s3, p5),
                    h6 = R4[t3].req;
                return (
                    n3 && (h6.ttl = n3),
                    o3 && (h6.id = o3),
                    this.client.core.history.set(s3, p5),
                    c5
                        ? ((h6.internal = D6(g6({}, h6.internal), { throwOnFailedPublish: true })),
                          await this.client.core.relayer.publish(s3, d4, h6))
                        : this.client.core.relayer.publish(s3, d4, h6).catch((N12) => this.client.logger.error(N12)),
                    p5.id
                );
            }),
            (this.sendResult = async (e3) => {
                const { id: s3, topic: t3, result: i4, throwOnFailedPublish: n3 } = e3,
                    o3 = formatJsonRpcResult(s3, i4),
                    a5 = await this.client.core.crypto.encode(t3, o3),
                    c5 = await this.client.core.history.get(t3, s3),
                    p5 = R4[c5.request.method].res;
                n3
                    ? ((p5.internal = D6(g6({}, p5.internal), { throwOnFailedPublish: true })),
                      await this.client.core.relayer.publish(t3, a5, p5))
                    : this.client.core.relayer.publish(t3, a5, p5).catch((d4) => this.client.logger.error(d4)),
                    await this.client.core.history.resolve(o3);
            }),
            (this.sendError = async (e3, s3, t3) => {
                const i4 = formatJsonRpcError(e3, t3),
                    n3 = await this.client.core.crypto.encode(s3, i4),
                    o3 = await this.client.core.history.get(s3, e3),
                    a5 = R4[o3.request.method].res;
                this.client.core.relayer.publish(s3, n3, a5), await this.client.core.history.resolve(i4);
            }),
            (this.cleanup = async () => {
                const e3 = [],
                    s3 = [];
                this.client.session.getAll().forEach((t3) => {
                    let i4 = false;
                    mt(t3.expiry) && (i4 = true),
                        this.client.core.crypto.keychain.has(t3.topic) || (i4 = true),
                        i4 && e3.push(t3.topic);
                }),
                    this.client.proposal.getAll().forEach((t3) => {
                        mt(t3.expiryTimestamp) && s3.push(t3.id);
                    }),
                    await Promise.all([
                        ...e3.map((t3) => this.deleteSession({ topic: t3 })),
                        ...s3.map((t3) => this.deleteProposal(t3)),
                    ]);
            }),
            (this.onRelayEventRequest = async (e3) => {
                this.requestQueue.queue.push(e3), await this.processRequestsQueue();
            }),
            (this.processRequestsQueue = async () => {
                if (this.requestQueue.state === I3.active) {
                    this.client.logger.info('Request queue already active, skipping...');
                    return;
                }
                for (
                    this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`);
                    this.requestQueue.queue.length > 0;

                ) {
                    this.requestQueue.state = I3.active;
                    const e3 = this.requestQueue.queue.shift();
                    if (e3)
                        try {
                            this.processRequest(e3), await new Promise((s3) => setTimeout(s3, 300));
                        } catch (s3) {
                            this.client.logger.warn(s3);
                        }
                }
                this.requestQueue.state = I3.idle;
            }),
            (this.processRequest = (e3) => {
                const { topic: s3, payload: t3 } = e3,
                    i4 = t3.method;
                switch (i4) {
                    case 'wc_sessionPropose':
                        return this.onSessionProposeRequest(s3, t3);
                    case 'wc_sessionSettle':
                        return this.onSessionSettleRequest(s3, t3);
                    case 'wc_sessionUpdate':
                        return this.onSessionUpdateRequest(s3, t3);
                    case 'wc_sessionExtend':
                        return this.onSessionExtendRequest(s3, t3);
                    case 'wc_sessionPing':
                        return this.onSessionPingRequest(s3, t3);
                    case 'wc_sessionDelete':
                        return this.onSessionDeleteRequest(s3, t3);
                    case 'wc_sessionRequest':
                        return this.onSessionRequest(s3, t3);
                    case 'wc_sessionEvent':
                        return this.onSessionEventRequest(s3, t3);
                    default:
                        return this.client.logger.info(`Unsupported request method ${i4}`);
                }
            }),
            (this.onRelayEventResponse = async (e3) => {
                const { topic: s3, payload: t3 } = e3,
                    i4 = (await this.client.core.history.get(s3, t3.id)).request.method;
                switch (i4) {
                    case 'wc_sessionPropose':
                        return this.onSessionProposeResponse(s3, t3);
                    case 'wc_sessionSettle':
                        return this.onSessionSettleResponse(s3, t3);
                    case 'wc_sessionUpdate':
                        return this.onSessionUpdateResponse(s3, t3);
                    case 'wc_sessionExtend':
                        return this.onSessionExtendResponse(s3, t3);
                    case 'wc_sessionPing':
                        return this.onSessionPingResponse(s3, t3);
                    case 'wc_sessionRequest':
                        return this.onSessionRequestResponse(s3, t3);
                    default:
                        return this.client.logger.info(`Unsupported response method ${i4}`);
                }
            }),
            (this.onRelayEventUnknownPayload = (e3) => {
                const { topic: s3 } = e3,
                    { message: t3 } = N10(
                        'MISSING_OR_INVALID',
                        `Decoded payload on topic ${s3} is not identifiable as a JSON-RPC request or a response.`
                    );
                throw new Error(t3);
            }),
            (this.onSessionProposeRequest = async (e3, s3) => {
                const { params: t3, id: i4 } = s3;
                try {
                    this.isValidConnect(g6({}, s3.params));
                    const n3 = t3.expiryTimestamp || pt(R4.wc_sessionPropose.req.ttl),
                        o3 = g6({ id: i4, pairingTopic: e3, expiryTimestamp: n3 }, t3);
                    await this.setProposal(i4, o3);
                    const a5 = Ln(JSON.stringify(s3)),
                        c5 = await this.getVerifyContext(a5, o3.proposer.metadata);
                    this.client.events.emit('session_proposal', { id: i4, params: o3, verifyContext: c5 });
                } catch (n3) {
                    await this.sendError(i4, e3, n3), this.client.logger.error(n3);
                }
            }),
            (this.onSessionProposeResponse = async (e3, s3) => {
                const { id: t3 } = s3;
                if (isJsonRpcResult(s3)) {
                    const { result: i4 } = s3;
                    this.client.logger.trace({ type: 'method', method: 'onSessionProposeResponse', result: i4 });
                    const n3 = this.client.proposal.get(t3);
                    this.client.logger.trace({ type: 'method', method: 'onSessionProposeResponse', proposal: n3 });
                    const o3 = n3.proposer.publicKey;
                    this.client.logger.trace({ type: 'method', method: 'onSessionProposeResponse', selfPublicKey: o3 });
                    const a5 = i4.responderPublicKey;
                    this.client.logger.trace({ type: 'method', method: 'onSessionProposeResponse', peerPublicKey: a5 });
                    const c5 = await this.client.core.crypto.generateSharedKey(o3, a5);
                    this.client.logger.trace({ type: 'method', method: 'onSessionProposeResponse', sessionTopic: c5 });
                    const p5 = await this.client.core.relayer.subscribe(c5);
                    this.client.logger.trace({
                        type: 'method',
                        method: 'onSessionProposeResponse',
                        subscriptionId: p5,
                    }),
                        await this.client.core.pairing.activate({ topic: e3 });
                } else
                    isJsonRpcError(s3) &&
                        (await this.client.proposal.delete(t3, U2('USER_DISCONNECTED')),
                        this.events.emit(yt('session_connect'), { error: s3.error }));
            }),
            (this.onSessionSettleRequest = async (e3, s3) => {
                const { id: t3, params: i4 } = s3;
                try {
                    this.isValidSessionSettleRequest(i4);
                    const {
                            relay: n3,
                            controller: o3,
                            expiry: a5,
                            namespaces: c5,
                            sessionProperties: p5,
                            pairingTopic: d4,
                        } = s3.params,
                        h6 = g6(
                            {
                                topic: e3,
                                relay: n3,
                                expiry: a5,
                                namespaces: c5,
                                acknowledged: true,
                                pairingTopic: d4,
                                requiredNamespaces: {},
                                optionalNamespaces: {},
                                controller: o3.publicKey,
                                self: { publicKey: '', metadata: this.client.metadata },
                                peer: { publicKey: o3.publicKey, metadata: o3.metadata },
                            },
                            p5 && { sessionProperties: p5 }
                        );
                    await this.sendResult({ id: s3.id, topic: e3, result: true }),
                        this.events.emit(yt('session_connect'), { session: h6 }),
                        this.cleanupDuplicatePairings(h6);
                } catch (n3) {
                    await this.sendError(t3, e3, n3), this.client.logger.error(n3);
                }
            }),
            (this.onSessionSettleResponse = async (e3, s3) => {
                const { id: t3 } = s3;
                isJsonRpcResult(s3)
                    ? (await this.client.session.update(e3, { acknowledged: true }),
                      this.events.emit(yt('session_approve', t3), {}))
                    : isJsonRpcError(s3) &&
                      (await this.client.session.delete(e3, U2('USER_DISCONNECTED')),
                      this.events.emit(yt('session_approve', t3), { error: s3.error }));
            }),
            (this.onSessionUpdateRequest = async (e3, s3) => {
                const { params: t3, id: i4 } = s3;
                try {
                    const n3 = `${e3}_session_update`,
                        o3 = sr.get(n3);
                    if (o3 && this.isRequestOutOfSync(o3, i4)) {
                        this.client.logger.info(`Discarding out of sync request - ${i4}`);
                        return;
                    }
                    this.isValidUpdate(g6({ topic: e3 }, t3)),
                        await this.client.session.update(e3, { namespaces: t3.namespaces }),
                        await this.sendResult({ id: i4, topic: e3, result: true }),
                        this.client.events.emit('session_update', { id: i4, topic: e3, params: t3 }),
                        sr.set(n3, i4);
                } catch (n3) {
                    await this.sendError(i4, e3, n3), this.client.logger.error(n3);
                }
            }),
            (this.isRequestOutOfSync = (e3, s3) =>
                parseInt(s3.toString().slice(0, -3)) <= parseInt(e3.toString().slice(0, -3))),
            (this.onSessionUpdateResponse = (e3, s3) => {
                const { id: t3 } = s3;
                isJsonRpcResult(s3)
                    ? this.events.emit(yt('session_update', t3), {})
                    : isJsonRpcError(s3) && this.events.emit(yt('session_update', t3), { error: s3.error });
            }),
            (this.onSessionExtendRequest = async (e3, s3) => {
                const { id: t3 } = s3;
                try {
                    this.isValidExtend({ topic: e3 }),
                        await this.setExpiry(e3, pt(L5)),
                        await this.sendResult({ id: t3, topic: e3, result: true }),
                        this.client.events.emit('session_extend', { id: t3, topic: e3 });
                } catch (i4) {
                    await this.sendError(t3, e3, i4), this.client.logger.error(i4);
                }
            }),
            (this.onSessionExtendResponse = (e3, s3) => {
                const { id: t3 } = s3;
                isJsonRpcResult(s3)
                    ? this.events.emit(yt('session_extend', t3), {})
                    : isJsonRpcError(s3) && this.events.emit(yt('session_extend', t3), { error: s3.error });
            }),
            (this.onSessionPingRequest = async (e3, s3) => {
                const { id: t3 } = s3;
                try {
                    this.isValidPing({ topic: e3 }),
                        await this.sendResult({ id: t3, topic: e3, result: true }),
                        this.client.events.emit('session_ping', { id: t3, topic: e3 });
                } catch (i4) {
                    await this.sendError(t3, e3, i4), this.client.logger.error(i4);
                }
            }),
            (this.onSessionPingResponse = (e3, s3) => {
                const { id: t3 } = s3;
                setTimeout(() => {
                    isJsonRpcResult(s3)
                        ? this.events.emit(yt('session_ping', t3), {})
                        : isJsonRpcError(s3) && this.events.emit(yt('session_ping', t3), { error: s3.error });
                }, 500);
            }),
            (this.onSessionDeleteRequest = async (e3, s3) => {
                const { id: t3 } = s3;
                try {
                    this.isValidDisconnect({ topic: e3, reason: s3.params }),
                        await Promise.all([
                            new Promise((i4) => {
                                this.client.core.relayer.once(D5.publish, async () => {
                                    i4(await this.deleteSession({ topic: e3, id: t3 }));
                                });
                            }),
                            this.sendResult({ id: t3, topic: e3, result: true }),
                            this.cleanupPendingSentRequestsForTopic({ topic: e3, error: U2('USER_DISCONNECTED') }),
                        ]);
                } catch (i4) {
                    this.client.logger.error(i4);
                }
            }),
            (this.onSessionRequest = async (e3, s3) => {
                const { id: t3, params: i4 } = s3;
                try {
                    this.isValidRequest(g6({ topic: e3 }, i4));
                    const n3 = Ln(JSON.stringify(formatJsonRpcRequest('wc_sessionRequest', i4, t3))),
                        o3 = this.client.session.get(e3),
                        a5 = await this.getVerifyContext(n3, o3.peer.metadata),
                        c5 = { id: t3, topic: e3, params: i4, verifyContext: a5 };
                    await this.setPendingSessionRequest(c5),
                        this.addSessionRequestToSessionRequestQueue(c5),
                        this.processSessionRequestQueue();
                } catch (n3) {
                    await this.sendError(t3, e3, n3), this.client.logger.error(n3);
                }
            }),
            (this.onSessionRequestResponse = (e3, s3) => {
                const { id: t3 } = s3;
                isJsonRpcResult(s3)
                    ? this.events.emit(yt('session_request', t3), { result: s3.result })
                    : isJsonRpcError(s3) && this.events.emit(yt('session_request', t3), { error: s3.error });
            }),
            (this.onSessionEventRequest = async (e3, s3) => {
                const { id: t3, params: i4 } = s3;
                try {
                    const n3 = `${e3}_session_event_${i4.event.name}`,
                        o3 = sr.get(n3);
                    if (o3 && this.isRequestOutOfSync(o3, t3)) {
                        this.client.logger.info(`Discarding out of sync request - ${t3}`);
                        return;
                    }
                    this.isValidEmit(g6({ topic: e3 }, i4)),
                        this.client.events.emit('session_event', { id: t3, topic: e3, params: i4 }),
                        sr.set(n3, t3);
                } catch (n3) {
                    await this.sendError(t3, e3, n3), this.client.logger.error(n3);
                }
            }),
            (this.addSessionRequestToSessionRequestQueue = (e3) => {
                this.sessionRequestQueue.queue.push(e3);
            }),
            (this.cleanupAfterResponse = (e3) => {
                this.deletePendingSessionRequest(e3.response.id, { message: 'fulfilled', code: 0 }),
                    setTimeout(
                        () => {
                            (this.sessionRequestQueue.state = I3.idle), this.processSessionRequestQueue();
                        },
                        (0, import_time4.toMiliseconds)(this.requestQueueDelay)
                    );
            }),
            (this.cleanupPendingSentRequestsForTopic = ({ topic: e3, error: s3 }) => {
                const t3 = this.client.core.history.pending;
                t3.length > 0 &&
                    t3
                        .filter((i4) => i4.topic === e3 && i4.request.method === 'wc_sessionRequest')
                        .forEach((i4) => {
                            this.events.emit(yt('session_request', i4.request.id), { error: s3 });
                        });
            }),
            (this.processSessionRequestQueue = () => {
                if (this.sessionRequestQueue.state === I3.active) {
                    this.client.logger.info('session request queue is already active.');
                    return;
                }
                const e3 = this.sessionRequestQueue.queue[0];
                if (!e3) {
                    this.client.logger.info('session request queue is empty.');
                    return;
                }
                try {
                    (this.sessionRequestQueue.state = I3.active), this.client.events.emit('session_request', e3);
                } catch (s3) {
                    this.client.logger.error(s3);
                }
            }),
            (this.onPairingCreated = (e3) => {
                if (e3.active) return;
                const s3 = this.client.proposal.getAll().find((t3) => t3.pairingTopic === e3.topic);
                s3 &&
                    this.onSessionProposeRequest(
                        e3.topic,
                        formatJsonRpcRequest(
                            'wc_sessionPropose',
                            {
                                requiredNamespaces: s3.requiredNamespaces,
                                optionalNamespaces: s3.optionalNamespaces,
                                relays: s3.relays,
                                proposer: s3.proposer,
                                sessionProperties: s3.sessionProperties,
                            },
                            s3.id
                        )
                    );
            }),
            (this.isValidConnect = async (e3) => {
                if (!Gt(e3)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `connect() params: ${JSON.stringify(e3)}`);
                    throw new Error(a5);
                }
                const {
                    pairingTopic: s3,
                    requiredNamespaces: t3,
                    optionalNamespaces: i4,
                    sessionProperties: n3,
                    relays: o3,
                } = e3;
                if ((w5(s3) || (await this.isValidPairingTopic(s3)), !qt(o3, true))) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `connect() relays: ${o3}`);
                    throw new Error(a5);
                }
                !w5(t3) && B2(t3) !== 0 && this.validateNamespaces(t3, 'requiredNamespaces'),
                    !w5(i4) && B2(i4) !== 0 && this.validateNamespaces(i4, 'optionalNamespaces'),
                    w5(n3) || this.validateSessionProps(n3, 'sessionProperties');
            }),
            (this.validateNamespaces = (e3, s3) => {
                const t3 = Ht(e3, 'connect()', s3);
                if (t3) throw new Error(t3.message);
            }),
            (this.isValidApprove = async (e3) => {
                if (!Gt(e3)) throw new Error(N10('MISSING_OR_INVALID', `approve() params: ${e3}`).message);
                const { id: s3, namespaces: t3, relayProtocol: i4, sessionProperties: n3 } = e3;
                await this.isValidProposalId(s3);
                const o3 = this.client.proposal.get(s3),
                    a5 = ln(t3, 'approve()');
                if (a5) throw new Error(a5.message);
                const c5 = fn(o3.requiredNamespaces, t3, 'approve()');
                if (c5) throw new Error(c5.message);
                if (!g4(i4, true)) {
                    const { message: p5 } = N10('MISSING_OR_INVALID', `approve() relayProtocol: ${i4}`);
                    throw new Error(p5);
                }
                w5(n3) || this.validateSessionProps(n3, 'sessionProperties');
            }),
            (this.isValidReject = async (e3) => {
                if (!Gt(e3)) {
                    const { message: i4 } = N10('MISSING_OR_INVALID', `reject() params: ${e3}`);
                    throw new Error(i4);
                }
                const { id: s3, reason: t3 } = e3;
                if ((await this.isValidProposalId(s3), !Wt(t3))) {
                    const { message: i4 } = N10('MISSING_OR_INVALID', `reject() reason: ${JSON.stringify(t3)}`);
                    throw new Error(i4);
                }
            }),
            (this.isValidSessionSettleRequest = (e3) => {
                if (!Gt(e3)) {
                    const { message: c5 } = N10('MISSING_OR_INVALID', `onSessionSettleRequest() params: ${e3}`);
                    throw new Error(c5);
                }
                const { relay: s3, controller: t3, namespaces: i4, expiry: n3 } = e3;
                if (!dn(s3)) {
                    const { message: c5 } = N10(
                        'MISSING_OR_INVALID',
                        'onSessionSettleRequest() relay protocol should be a string'
                    );
                    throw new Error(c5);
                }
                const o3 = Ft(t3, 'onSessionSettleRequest()');
                if (o3) throw new Error(o3.message);
                const a5 = ln(i4, 'onSessionSettleRequest()');
                if (a5) throw new Error(a5.message);
                if (mt(n3)) {
                    const { message: c5 } = N10('EXPIRED', 'onSessionSettleRequest()');
                    throw new Error(c5);
                }
            }),
            (this.isValidUpdate = async (e3) => {
                if (!Gt(e3)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `update() params: ${e3}`);
                    throw new Error(a5);
                }
                const { topic: s3, namespaces: t3 } = e3;
                await this.isValidSessionTopic(s3);
                const i4 = this.client.session.get(s3),
                    n3 = ln(t3, 'update()');
                if (n3) throw new Error(n3.message);
                const o3 = fn(i4.requiredNamespaces, t3, 'update()');
                if (o3) throw new Error(o3.message);
            }),
            (this.isValidExtend = async (e3) => {
                if (!Gt(e3)) {
                    const { message: t3 } = N10('MISSING_OR_INVALID', `extend() params: ${e3}`);
                    throw new Error(t3);
                }
                const { topic: s3 } = e3;
                await this.isValidSessionTopic(s3);
            }),
            (this.isValidRequest = async (e3) => {
                if (!Gt(e3)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `request() params: ${e3}`);
                    throw new Error(a5);
                }
                const { topic: s3, request: t3, chainId: i4, expiry: n3 } = e3;
                await this.isValidSessionTopic(s3);
                const { namespaces: o3 } = this.client.session.get(s3);
                if (!Qt(o3, i4)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `request() chainId: ${i4}`);
                    throw new Error(a5);
                }
                if (!zt(t3)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `request() ${JSON.stringify(t3)}`);
                    throw new Error(a5);
                }
                if (!Zt(o3, i4, t3.method)) {
                    const { message: a5 } = N10('MISSING_OR_INVALID', `request() method: ${t3.method}`);
                    throw new Error(a5);
                }
                if (n3 && !tr(n3, U4)) {
                    const { message: a5 } = N10(
                        'MISSING_OR_INVALID',
                        `request() expiry: ${n3}. Expiry must be a number (in seconds) between ${U4.min} and ${U4.max}`
                    );
                    throw new Error(a5);
                }
            }),
            (this.isValidRespond = async (e3) => {
                var s3;
                if (!Gt(e3)) {
                    const { message: n3 } = N10('MISSING_OR_INVALID', `respond() params: ${e3}`);
                    throw new Error(n3);
                }
                const { topic: t3, response: i4 } = e3;
                try {
                    await this.isValidSessionTopic(t3);
                } catch (n3) {
                    throw (
                        ((s3 = e3 == null ? void 0 : e3.response) != null && s3.id && this.cleanupAfterResponse(e3), n3)
                    );
                }
                if (!Yt(i4)) {
                    const { message: n3 } = N10('MISSING_OR_INVALID', `respond() response: ${JSON.stringify(i4)}`);
                    throw new Error(n3);
                }
            }),
            (this.isValidPing = async (e3) => {
                if (!Gt(e3)) {
                    const { message: t3 } = N10('MISSING_OR_INVALID', `ping() params: ${e3}`);
                    throw new Error(t3);
                }
                const { topic: s3 } = e3;
                await this.isValidSessionOrPairingTopic(s3);
            }),
            (this.isValidEmit = async (e3) => {
                if (!Gt(e3)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `emit() params: ${e3}`);
                    throw new Error(o3);
                }
                const { topic: s3, event: t3, chainId: i4 } = e3;
                await this.isValidSessionTopic(s3);
                const { namespaces: n3 } = this.client.session.get(s3);
                if (!Qt(n3, i4)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `emit() chainId: ${i4}`);
                    throw new Error(o3);
                }
                if (!Jt(t3)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `emit() event: ${JSON.stringify(t3)}`);
                    throw new Error(o3);
                }
                if (!Xt(n3, i4, t3.name)) {
                    const { message: o3 } = N10('MISSING_OR_INVALID', `emit() event: ${JSON.stringify(t3)}`);
                    throw new Error(o3);
                }
            }),
            (this.isValidDisconnect = async (e3) => {
                if (!Gt(e3)) {
                    const { message: t3 } = N10('MISSING_OR_INVALID', `disconnect() params: ${e3}`);
                    throw new Error(t3);
                }
                const { topic: s3 } = e3;
                await this.isValidSessionOrPairingTopic(s3);
            }),
            (this.getVerifyContext = async (e3, s3) => {
                const t3 = { verified: { verifyUrl: s3.verifyUrl || F4, validation: 'UNKNOWN', origin: s3.url || '' } };
                try {
                    const i4 = await this.client.core.verify.resolve({ attestationId: e3, verifyUrl: s3.verifyUrl });
                    i4 &&
                        ((t3.verified.origin = i4.origin),
                        (t3.verified.isScam = i4.isScam),
                        (t3.verified.validation = i4.origin === new URL(s3.url).origin ? 'VALID' : 'INVALID'));
                } catch (i4) {
                    this.client.logger.info(i4);
                }
                return this.client.logger.info(`Verify context: ${JSON.stringify(t3)}`), t3;
            }),
            (this.validateSessionProps = (e3, s3) => {
                Object.values(e3).forEach((t3) => {
                    if (!g4(t3, false)) {
                        const { message: i4 } = N10(
                            'MISSING_OR_INVALID',
                            `${s3} must be in Record<string, string> format. Received: ${JSON.stringify(t3)}`
                        );
                        throw new Error(i4);
                    }
                });
            });
    }
    async isInitialized() {
        if (!this.initialized) {
            const { message: r3 } = N10('NOT_INITIALIZED', this.name);
            throw new Error(r3);
        }
        await this.client.core.relayer.confirmOnlineStateOrThrow();
    }
    registerRelayerEvents() {
        this.client.core.relayer.on(D5.message, async (r3) => {
            const { topic: e3, message: s3 } = r3;
            if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s3))) return;
            const t3 = await this.client.core.crypto.decode(e3, s3);
            try {
                isJsonRpcRequest(t3)
                    ? (this.client.core.history.set(e3, t3), this.onRelayEventRequest({ topic: e3, payload: t3 }))
                    : isJsonRpcResponse(t3)
                      ? (await this.client.core.history.resolve(t3),
                        await this.onRelayEventResponse({ topic: e3, payload: t3 }),
                        this.client.core.history.delete(e3, t3.id))
                      : this.onRelayEventUnknownPayload({ topic: e3, payload: t3 });
            } catch (i4) {
                this.client.logger.error(i4);
            }
        });
    }
    registerExpirerEvents() {
        this.client.core.expirer.on(v4.expired, async (r3) => {
            const { topic: e3, id: s3 } = ft(r3.target);
            if (s3 && this.client.pendingRequest.keys.includes(s3))
                return await this.deletePendingSessionRequest(s3, N10('EXPIRED'), true);
            e3
                ? this.client.session.keys.includes(e3) &&
                  (await this.deleteSession({ topic: e3, expirerHasDeleted: true }),
                  this.client.events.emit('session_expire', { topic: e3 }))
                : s3 && (await this.deleteProposal(s3, true), this.client.events.emit('proposal_expire', { id: s3 }));
        });
    }
    registerPairingEvents() {
        this.client.core.pairing.events.on(V3.create, (r3) => this.onPairingCreated(r3));
    }
    isValidPairingTopic(r3) {
        if (!g4(r3, false)) {
            const { message: e3 } = N10('MISSING_OR_INVALID', `pairing topic should be a string: ${r3}`);
            throw new Error(e3);
        }
        if (!this.client.core.pairing.pairings.keys.includes(r3)) {
            const { message: e3 } = N10('NO_MATCHING_KEY', `pairing topic doesn't exist: ${r3}`);
            throw new Error(e3);
        }
        if (mt(this.client.core.pairing.pairings.get(r3).expiry)) {
            const { message: e3 } = N10('EXPIRED', `pairing topic: ${r3}`);
            throw new Error(e3);
        }
    }
    async isValidSessionTopic(r3) {
        if (!g4(r3, false)) {
            const { message: e3 } = N10('MISSING_OR_INVALID', `session topic should be a string: ${r3}`);
            throw new Error(e3);
        }
        if (!this.client.session.keys.includes(r3)) {
            const { message: e3 } = N10('NO_MATCHING_KEY', `session topic doesn't exist: ${r3}`);
            throw new Error(e3);
        }
        if (mt(this.client.session.get(r3).expiry)) {
            await this.deleteSession({ topic: r3 });
            const { message: e3 } = N10('EXPIRED', `session topic: ${r3}`);
            throw new Error(e3);
        }
        if (!this.client.core.crypto.keychain.has(r3)) {
            const { message: e3 } = N10('MISSING_OR_INVALID', `session topic does not exist in keychain: ${r3}`);
            throw (await this.deleteSession({ topic: r3 }), new Error(e3));
        }
    }
    async isValidSessionOrPairingTopic(r3) {
        if (this.client.session.keys.includes(r3)) await this.isValidSessionTopic(r3);
        else if (this.client.core.pairing.pairings.keys.includes(r3)) this.isValidPairingTopic(r3);
        else if (g4(r3, false)) {
            const { message: e3 } = N10('NO_MATCHING_KEY', `session or pairing topic doesn't exist: ${r3}`);
            throw new Error(e3);
        } else {
            const { message: e3 } = N10('MISSING_OR_INVALID', `session or pairing topic should be a string: ${r3}`);
            throw new Error(e3);
        }
    }
    async isValidProposalId(r3) {
        if (!Bt(r3)) {
            const { message: e3 } = N10('MISSING_OR_INVALID', `proposal id should be a number: ${r3}`);
            throw new Error(e3);
        }
        if (!this.client.proposal.keys.includes(r3)) {
            const { message: e3 } = N10('NO_MATCHING_KEY', `proposal id doesn't exist: ${r3}`);
            throw new Error(e3);
        }
        if (mt(this.client.proposal.get(r3).expiryTimestamp)) {
            await this.deleteProposal(r3);
            const { message: e3 } = N10('EXPIRED', `proposal id: ${r3}`);
            throw new Error(e3);
        }
    }
};
var us2 = class extends Kt2 {
    constructor(r3, e3) {
        super(r3, e3, oe, G4), (this.core = r3), (this.logger = e3);
    }
};
var ge3 = class extends Kt2 {
    constructor(r3, e3) {
        super(r3, e3, ce3, G4), (this.core = r3), (this.logger = e3);
    }
};
var gs2 = class extends Kt2 {
    constructor(r3, e3) {
        super(r3, e3, pe2, G4, (s3) => s3.id), (this.core = r3), (this.logger = e3);
    }
};
var Q4 = class _Q extends b2 {
    constructor(r3) {
        super(r3),
            (this.protocol = J3),
            (this.version = F5),
            (this.name = M4.name),
            (this.events = new import_events6.EventEmitter()),
            (this.on = (s3, t3) => this.events.on(s3, t3)),
            (this.once = (s3, t3) => this.events.once(s3, t3)),
            (this.off = (s3, t3) => this.events.off(s3, t3)),
            (this.removeListener = (s3, t3) => this.events.removeListener(s3, t3)),
            (this.removeAllListeners = (s3) => this.events.removeAllListeners(s3)),
            (this.connect = async (s3) => {
                try {
                    return await this.engine.connect(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.pair = async (s3) => {
                try {
                    return await this.engine.pair(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.approve = async (s3) => {
                try {
                    return await this.engine.approve(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.reject = async (s3) => {
                try {
                    return await this.engine.reject(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.update = async (s3) => {
                try {
                    return await this.engine.update(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.extend = async (s3) => {
                try {
                    return await this.engine.extend(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.request = async (s3) => {
                try {
                    return await this.engine.request(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.respond = async (s3) => {
                try {
                    return await this.engine.respond(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.ping = async (s3) => {
                try {
                    return await this.engine.ping(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.emit = async (s3) => {
                try {
                    return await this.engine.emit(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.disconnect = async (s3) => {
                try {
                    return await this.engine.disconnect(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.find = (s3) => {
                try {
                    return this.engine.find(s3);
                } catch (t3) {
                    throw (this.logger.error(t3.message), t3);
                }
            }),
            (this.getPendingSessionRequests = () => {
                try {
                    return this.engine.getPendingSessionRequests();
                } catch (s3) {
                    throw (this.logger.error(s3.message), s3);
                }
            }),
            (this.name = (r3 == null ? void 0 : r3.name) || M4.name),
            (this.metadata = (r3 == null ? void 0 : r3.metadata) || Qn());
        const e3 =
            typeof (r3 == null ? void 0 : r3.logger) < 'u' && typeof (r3 == null ? void 0 : r3.logger) != 'string'
                ? r3.logger
                : (0, import_logger2.pino)(
                      (0, import_logger2.getDefaultLoggerOptions)({
                          level: (r3 == null ? void 0 : r3.logger) || M4.logger,
                      })
                  );
        (this.core = (r3 == null ? void 0 : r3.core) || new Mr(r3)),
            (this.logger = (0, import_logger2.generateChildLogger)(e3, this.name)),
            (this.session = new ge3(this.core, this.logger)),
            (this.proposal = new us2(this.core, this.logger)),
            (this.pendingRequest = new gs2(this.core, this.logger)),
            (this.engine = new ds2(this));
    }
    static async init(r3) {
        const e3 = new _Q(r3);
        return await e3.initialize(), e3;
    }
    get context() {
        return (0, import_logger2.getLoggerContext)(this.logger);
    }
    get pairing() {
        return this.core.pairing.pairings;
    }
    async initialize() {
        this.logger.trace('Initialized');
        try {
            await this.core.start(),
                await this.session.init(),
                await this.proposal.init(),
                await this.pendingRequest.init(),
                await this.engine.init(),
                this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }),
                this.logger.info('SignClient Initialization Success');
        } catch (r3) {
            throw (this.logger.info('SignClient Initialization Failure'), this.logger.error(r3.message), r3);
        }
    }
};

// node_modules/@concordium/wallet-connectors/dist/error.js
var UnreachableCaseError = class extends Error {
    constructor(type, val) {
        super(`invalid ${type} kind '${val}`);
        this.type = type;
        this.val = val;
    }
};

// node_modules/@concordium/wallet-connectors/dist/WalletConnect.js
var __awaiter2 = function (thisArg, _arguments, P4, generator) {
    function adopt(value) {
        return value instanceof P4
            ? value
            : new P4(function (resolve) {
                  resolve(value);
              });
    }
    return new (P4 || (P4 = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e3) {
                reject(e3);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e3) {
                reject(e3);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var WALLET_CONNECT_SESSION_NAMESPACE = 'ccd';
function connect(client, chainId, cancel) {
    return __awaiter2(this, void 0, void 0, function* () {
        try {
            const { uri, approval } = yield client.connect({
                requiredNamespaces: {
                    ccd: {
                        methods: ['sign_and_send_transaction', 'sign_message'],
                        chains: [chainId],
                        events: ['chain_changed', 'accounts_changed'],
                    },
                },
            });
            if (uri) {
                import_qrcode_modal.default.open(uri, cancel);
            }
            return yield approval();
        } catch (e3) {
            if (e3) {
                console.error(`WalletConnect client error: ${e3}`);
            }
            cancel();
        } finally {
            import_qrcode_modal.default.close();
        }
    });
}
function isSignAndSendTransactionError(obj) {
    return 'code' in obj && 'message' in obj;
}
function accountTransactionPayloadToJson(data) {
    return jsonUnwrapStringify(data, 0, (_key, value) => {
        if ((value === null || value === void 0 ? void 0 : value.type) === 'Buffer') {
            return toBuffer(value.data).toString('hex');
        }
        return value;
    });
}
function serializeInitContractParam(contractName, typedParams) {
    if (!typedParams) {
        return Parameter_exports.empty();
    }
    const { parameters, schema } = typedParams;
    switch (schema.type) {
        case 'ModuleSchema':
            return serializeInitContractParameters(contractName, parameters, schema.value, schema.version);
        case 'TypeSchema':
            return serializeTypeValue(parameters, schema.value);
        default:
            throw new UnreachableCaseError('schema', schema);
    }
}
function serializeUpdateContractMessage(contractName, entrypointName, typedParams) {
    if (!typedParams) {
        return Parameter_exports.empty();
    }
    const { parameters, schema } = typedParams;
    switch (schema.type) {
        case 'ModuleSchema':
            return serializeUpdateContractParameters(
                contractName,
                entrypointName,
                parameters,
                schema.value,
                schema.version
            );
        case 'TypeSchema':
            return serializeTypeValue(parameters, schema.value);
        default:
            throw new UnreachableCaseError('schema', schema);
    }
}
function convertSchemaFormat(schema) {
    if (!schema) {
        return null;
    }
    switch (schema.type) {
        case 'ModuleSchema':
            return {
                type: 'module',
                value: schema.value.toString('base64'),
                version: schema.version,
            };
        case 'TypeSchema':
            return {
                type: 'parameter',
                value: schema.value.toString('base64'),
            };
        default:
            throw new UnreachableCaseError('schema', schema);
    }
}
function serializePayloadParameters(type, payload, typedParams) {
    switch (type) {
        case AccountTransactionType.InitContract: {
            const initContractPayload = payload;
            if (initContractPayload.param) {
                throw new Error(`'param' field of 'InitContract' parameters must be empty`);
            }
            return Object.assign(Object.assign({}, payload), {
                param: serializeInitContractParam(initContractPayload.initName, typedParams),
            });
        }
        case AccountTransactionType.Update: {
            const updateContractPayload = payload;
            if (updateContractPayload.message) {
                throw new Error(`'message' field of 'Update' parameters must be empty`);
            }
            const [contractName, entrypointName] = updateContractPayload.receiveName.value.split('.');
            return Object.assign(Object.assign({}, payload), {
                message: serializeUpdateContractMessage(
                    ContractName_exports.fromString(contractName),
                    EntrypointName_exports.fromString(entrypointName),
                    typedParams
                ),
            });
        }
        default: {
            if (typedParams) {
                throw new Error(`'typedParams' must not be provided for transaction of type '${type}'`);
            }
            return payload;
        }
    }
}
var WalletConnectConnection = class {
    constructor(connector, chainId, session) {
        this.connector = connector;
        this.chainId = chainId;
        this.session = session;
    }
    getConnector() {
        return this.connector;
    }
    ping() {
        return __awaiter2(this, void 0, void 0, function* () {
            const { topic } = this.session;
            yield this.connector.client.ping({ topic });
        });
    }
    /**
     * @return The account that the wallet currently associates with this connection.
     */
    getConnectedAccount() {
        const fullAddress = this.session.namespaces[WALLET_CONNECT_SESSION_NAMESPACE].accounts[0];
        return fullAddress.substring(fullAddress.lastIndexOf(':') + 1);
    }
    signAndSendTransaction(accountAddress, type, payload, typedParams) {
        return __awaiter2(this, void 0, void 0, function* () {
            const params = {
                type: getTransactionKindString(type),
                sender: accountAddress,
                payload: accountTransactionPayloadToJson(serializePayloadParameters(type, payload, typedParams)),
                schema: convertSchemaFormat(
                    typedParams === null || typedParams === void 0 ? void 0 : typedParams.schema
                ),
            };
            try {
                const { hash } = yield this.connector.client.request({
                    topic: this.session.topic,
                    request: {
                        method: 'sign_and_send_transaction',
                        params,
                    },
                    chainId: this.chainId,
                });
                return hash;
            } catch (e3) {
                if (isSignAndSendTransactionError(e3) && e3.code === 500) {
                    throw new Error('transaction rejected in wallet');
                }
                throw e3;
            }
        });
    }
    signMessage(accountAddress, msg) {
        return __awaiter2(this, void 0, void 0, function* () {
            switch (msg.type) {
                case 'StringMessage': {
                    const params = { message: msg.value };
                    const signature = yield this.connector.client.request({
                        topic: this.session.topic,
                        request: {
                            method: 'sign_message',
                            params,
                        },
                        chainId: this.chainId,
                    });
                    return signature;
                }
                case 'BinaryMessage':
                    throw new Error(`signing 'BinaryMessage' is not yet supported by the mobile wallets`);
                default:
                    throw new UnreachableCaseError('message', msg);
            }
        });
    }
    disconnect() {
        return __awaiter2(this, void 0, void 0, function* () {
            yield this.connector.client.disconnect({
                topic: this.session.topic,
                reason: {
                    code: 1,
                    message: 'user disconnecting',
                },
            });
            this.connector.onDisconnect(this);
        });
    }
};
var WalletConnectConnector = class _WalletConnectConnector {
    /**
     * Construct a new instance.
     *
     * Use {@link create} to have the sign client initialized from {@link SignClientTypes.Options}
     * to not have to do it manually.
     *
     * The constructor sets up event handling and appropriate forwarding to the provided delegate.
     *
     * @param client The underlying WalletConnect client.
     * @param delegate The object to receive events emitted by the client.
     * @param network The network/chain that connected accounts must live on.
     */
    constructor(client, delegate, network) {
        this.connections = /* @__PURE__ */ new Map();
        this.client = client;
        this.network = network;
        this.delegate = delegate;
        client.on('session_event', ({ topic, params: { chainId, event }, id }) => {
            console.debug('WalletConnect event: session_event', { topic, id, chainId, event });
            const connection = this.connections.get(topic);
            if (!connection) {
                console.error(`WalletConnect event 'session_event' received for unknown topic '${topic}'.`);
                return;
            }
        });
        client.on('session_update', ({ topic, params }) => {
            console.debug('WalletConnect event: session_update', { topic, params });
            const connection = this.connections.get(topic);
            if (!connection) {
                console.error(`WalletConnect event 'session_update' received for unknown topic '${topic}'.`);
                return;
            }
            const { namespaces } = params;
            connection.session = Object.assign(Object.assign({}, connection.session), { namespaces });
            delegate.onAccountChanged(connection, connection.getConnectedAccount());
        });
        client.on('session_delete', ({ topic }) => {
            console.debug('WalletConnect event: session_delete', { topic });
            const connection = this.connections.get(topic);
            if (!connection) {
                console.error(`WalletConnect event 'session_delete' received for unknown topic '${topic}'.`);
                return;
            }
            this.onDisconnect(connection);
        });
    }
    /**
     * Convenience function for creating a new instance from WalletConnection configuration instead of an already initialized client.
     *
     * @param signClientInitOpts WalletConnect configuration.
     * The constant {@link CONCORDIUM_WALLET_CONNECT_PROJECT_ID} exported by this library may be used as {@link SignClientTypes.Options.projectId projectID}
     * if the dApp doesn't have its own {@link https://cloud.walletconnect.com WalletConnect Cloud} project.
     * @param delegate The object to receive events emitted by the client.
     * @param network The network/chain that connected accounts must live on.
     */
    static create(signClientInitOpts, delegate, network) {
        return __awaiter2(this, void 0, void 0, function* () {
            const client = yield Q4.init(signClientInitOpts);
            return new _WalletConnectConnector(client, delegate, network);
        });
    }
    connect() {
        return __awaiter2(this, void 0, void 0, function* () {
            const { name: name2 } = this.network;
            const chainId = `${WALLET_CONNECT_SESSION_NAMESPACE}:${name2}`;
            const session = yield new Promise((resolve) => {
                connect(this.client, chainId, () => resolve(void 0)).then(resolve);
            });
            if (!session) {
                return void 0;
            }
            const connection = new WalletConnectConnection(this, chainId, session);
            this.connections.set(session.topic, connection);
            this.delegate.onConnected(connection, connection.getConnectedAccount());
            return connection;
        });
    }
    onDisconnect(connection) {
        this.connections.delete(connection.session.topic);
        this.delegate.onDisconnected(connection);
    }
    getConnections() {
        return Array.from(this.connections.values());
    }
    /**
     * Disconnect all connections.
     */
    disconnect() {
        return __awaiter2(this, void 0, void 0, function* () {
            yield Promise.all(this.getConnections().map((c5) => c5.disconnect()));
        });
    }
};

// node_modules/@concordium/browser-wallet-api-helpers/lib/wallet-api-types.js
var EventType;
(function (EventType2) {
    EventType2['AccountChanged'] = 'accountChanged';
    EventType2['AccountDisconnected'] = 'accountDisconnected';
    EventType2['ChainChanged'] = 'chainChanged';
})(EventType || (EventType = {}));
var SchemaType;
(function (SchemaType2) {
    SchemaType2['Module'] = 'module';
    SchemaType2['Parameter'] = 'parameter';
})(SchemaType || (SchemaType = {}));

// node_modules/@concordium/browser-wallet-api-helpers/lib/detector.js
async function detectConcordiumProvider(timeout = 5e3) {
    return new Promise((resolve, reject) => {
        if (window.concordium) {
            resolve(window.concordium);
        } else {
            const t3 = setTimeout(() => {
                if (window.concordium) {
                    resolve(window.concordium);
                } else {
                    reject();
                }
            }, timeout);
            window.addEventListener(
                'concordium#initialized',
                () => {
                    if (window.concordium) {
                        clearTimeout(t3);
                        resolve(window.concordium);
                    }
                },
                { once: true }
            );
        }
    });
}

// node_modules/@concordium/wallet-connectors/dist/BrowserWallet.js
var __awaiter3 = function (thisArg, _arguments, P4, generator) {
    function adopt(value) {
        return value instanceof P4
            ? value
            : new P4(function (resolve) {
                  resolve(value);
              });
    }
    return new (P4 || (P4 = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e3) {
                reject(e3);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e3) {
                reject(e3);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var BROWSER_WALLET_DETECT_TIMEOUT = 2e3;
var BrowserWalletConnector = class _BrowserWalletConnector {
    /**
     * Construct a new instance.
     *
     * Use {@link create} to have the API client initialized automatically.
     *
     * The constructor sets up event handling and appropriate forwarding to the provided delegate.
     *
     * @param client The underlying API client.
     * @param delegate The object to receive events emitted by the client.
     */
    constructor(client, delegate) {
        this.isConnected = false;
        this.client = client;
        this.delegate = delegate;
        this.client.on('chainChanged', (c5) => delegate.onChainChanged(this, c5));
        this.client.on('accountChanged', (a5) => delegate.onAccountChanged(this, a5));
        this.client.on('accountDisconnected', () =>
            this.client
                .getMostRecentlySelectedAccount()
                .then((a5) => delegate.onAccountChanged(this, a5))
                .catch(console.error)
        );
    }
    static create(delegate) {
        return __awaiter3(this, void 0, void 0, function* () {
            try {
                const client = yield detectConcordiumProvider(BROWSER_WALLET_DETECT_TIMEOUT);
                return new _BrowserWalletConnector(client, delegate);
            } catch (e3) {
                throw new Error('Browser Wallet extension not detected');
            }
        });
    }
    connect() {
        return __awaiter3(this, void 0, void 0, function* () {
            const account = yield this.client.connect();
            if (!account) {
                throw new Error('Browser Wallet connection failed');
            }
            this.isConnected = true;
            this.delegate.onConnected(this, account);
            return this;
        });
    }
    getConnections() {
        return this.isConnected ? [this] : [];
    }
    getConnector() {
        return this;
    }
    ping() {
        return __awaiter3(this, void 0, void 0, function* () {
            return void 0;
        });
    }
    /**
     * @return The account that the wallet currently associates with this connection.
     */
    getConnectedAccount() {
        return __awaiter3(this, void 0, void 0, function* () {
            return this.client.getMostRecentlySelectedAccount();
        });
    }
    /**
     * Returns the transport object of the gRPC client that the Browser Wallet uses to perform requests
     * against some Concordium Node connected to network/chain that the connected account lives on.
     * The client implements version 2 of the Node API.
     *
     * This method is included because it's part of the Browser Wallet API.
     * It should be used with care as it's hard to guarantee that it actually connects to the expected network.
     * The recommended alternative is to construct your own client using {@link Network.grpcOpts} which is
     * independent of any connection.
     *
     * @return The Browser Wallet's internal gRPC client.
     * @throws If the installed version of the Browser Wallet doesn't support the method.
     */
    getGrpcTransport() {
        return this.client.grpcTransport;
    }
    /**
     * Deregister event handlers on the API client and notify the delegate.
     * As there's no way to actually disconnect the Browser Wallet, this is all that we can reasonably do.
     * The client object will remain in the browser's global state.
     */
    disconnect() {
        return __awaiter3(this, void 0, void 0, function* () {
            this.isConnected = false;
            this.client.removeAllListeners();
            this.delegate.onDisconnected(this);
        });
    }
    signAndSendTransaction(accountAddress, type, payload, typedParams) {
        return __awaiter3(this, void 0, void 0, function* () {
            if (
                (type === AccountTransactionType.InitContract || type === AccountTransactionType.Update) &&
                typedParams
            ) {
                const { parameters, schema } = typedParams;
                switch (schema.type) {
                    case 'ModuleSchema':
                        return this.client.sendTransaction(
                            accountAddress,
                            type,
                            // wallet API types enforce strict coupling of transaction types and corresponding payloads.
                            payload,
                            // wallet API types enforce strict coupling of transaction types and corresponding payloads.
                            parameters,
                            {
                                type: SchemaType.Module,
                                value: schema.value.toString('base64'),
                            },
                            schema.version
                        );
                    case 'TypeSchema':
                        return this.client.sendTransaction(accountAddress, type, payload, parameters, {
                            type: SchemaType.Parameter,
                            value: schema.value.toString('base64'),
                        });
                    default:
                        throw new UnreachableCaseError('schema', schema);
                }
            }
            if (typedParams) {
                throw new Error(`'typedParams' must not be provided for transaction of type '${type}'`);
            }
            return this.client.sendTransaction(accountAddress, type, payload);
        });
    }
    signMessage(accountAddress, msg) {
        return __awaiter3(this, void 0, void 0, function* () {
            switch (msg.type) {
                case 'StringMessage':
                    return this.client.signMessage(accountAddress, msg.value);
                case 'BinaryMessage':
                    return this.client.signMessage(accountAddress, {
                        schema: msg.schema.value.toString('base64'),
                        data: msg.value.toString('hex'),
                    });
                default:
                    throw new UnreachableCaseError('message', msg);
            }
        });
    }
};

// node_modules/@concordium/wallet-connectors/dist/index.js
var CONCORDIUM_WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
var TESTNET_GENESIS_BLOCK_HASH = '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796';
var MAINNET_GENESIS_BLOCK_HASH = '9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478';
var TESTNET = {
    name: 'testnet',
    genesisHash: TESTNET_GENESIS_BLOCK_HASH,
    grpcOpts: {
        baseUrl: 'https://grpc.testnet.concordium.com:20000',
    },
    ccdScanBaseUrl: 'https://testnet.ccdscan.io',
};
var MAINNET = {
    name: 'mainnet',
    genesisHash: MAINNET_GENESIS_BLOCK_HASH,
    grpcOpts: {
        baseUrl: 'https://grpc.mainnet.concordium.software:20000',
    },
    ccdScanBaseUrl: 'https://ccdscan.io',
};

export {
    moduleSchemaFromBase64,
    moduleSchema,
    typeSchemaFromBase64,
    typeSchema,
    stringMessage,
    binaryMessageFromHex,
    WalletConnectConnection,
    WalletConnectConnector,
    BrowserWalletConnector,
    CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    TESTNET,
    MAINNET,
};
/*! Bundled license information:

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chunk-7F5NCG6F.js.map
