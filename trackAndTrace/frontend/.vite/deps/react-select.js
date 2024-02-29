import { _extends, _objectWithoutPropertiesLoose, _setPrototypeOf } from './chunk-J2HDAMLS.js';
import { require_react_is } from './chunk-KANKV5NS.js';
import { require_react_dom } from './chunk-62AAIPHI.js';
import { require_react } from './chunk-JZSXOKIY.js';
import { __commonJS, __toESM } from './chunk-ANIWD3T6.js';

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
    'node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js'(exports, module) {
        'use strict';
        var reactIs = require_react_is();
        var REACT_STATICS = {
            childContextTypes: true,
            contextType: true,
            contextTypes: true,
            defaultProps: true,
            displayName: true,
            getDefaultProps: true,
            getDerivedStateFromError: true,
            getDerivedStateFromProps: true,
            mixins: true,
            propTypes: true,
            type: true,
        };
        var KNOWN_STATICS = {
            name: true,
            length: true,
            prototype: true,
            caller: true,
            callee: true,
            arguments: true,
            arity: true,
        };
        var FORWARD_REF_STATICS = {
            $$typeof: true,
            render: true,
            defaultProps: true,
            displayName: true,
            propTypes: true,
        };
        var MEMO_STATICS = {
            $$typeof: true,
            compare: true,
            defaultProps: true,
            displayName: true,
            propTypes: true,
            type: true,
        };
        var TYPE_STATICS = {};
        TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
        TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
        function getStatics(component) {
            if (reactIs.isMemo(component)) {
                return MEMO_STATICS;
            }
            return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
        }
        var defineProperty = Object.defineProperty;
        var getOwnPropertyNames = Object.getOwnPropertyNames;
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var getPrototypeOf = Object.getPrototypeOf;
        var objectPrototype = Object.prototype;
        function hoistNonReactStatics2(targetComponent, sourceComponent, blacklist) {
            if (typeof sourceComponent !== 'string') {
                if (objectPrototype) {
                    var inheritedComponent = getPrototypeOf(sourceComponent);
                    if (inheritedComponent && inheritedComponent !== objectPrototype) {
                        hoistNonReactStatics2(targetComponent, inheritedComponent, blacklist);
                    }
                }
                var keys = getOwnPropertyNames(sourceComponent);
                if (getOwnPropertySymbols) {
                    keys = keys.concat(getOwnPropertySymbols(sourceComponent));
                }
                var targetStatics = getStatics(targetComponent);
                var sourceStatics = getStatics(sourceComponent);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (
                        !KNOWN_STATICS[key] &&
                        !(blacklist && blacklist[key]) &&
                        !(sourceStatics && sourceStatics[key]) &&
                        !(targetStatics && targetStatics[key])
                    ) {
                        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                        try {
                            defineProperty(targetComponent, key, descriptor);
                        } catch (e) {}
                    }
                }
            }
            return targetComponent;
        }
        module.exports = hoistNonReactStatics2;
    },
});

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
    '@babel/helpers - typeof';
    return (
        (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (o2) {
                      return typeof o2;
                  }
                : function (o2) {
                      return o2 && 'function' == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype
                          ? 'symbol'
                          : typeof o2;
                  }),
        _typeof(o)
    );
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
    if ('object' != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || 'default');
        if ('object' != _typeof(i)) return i;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return ('string' === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, 'string');
    return 'symbol' == _typeof(i) ? i : String(i);
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r &&
            (o = o.filter(function (r2) {
                return Object.getOwnPropertyDescriptor(e, r2).enumerable;
            })),
            t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2
            ? ownKeys(Object(t), true).forEach(function (r2) {
                  _defineProperty(e, r2, t[r2]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r2) {
                    Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
                });
    }
    return e;
}

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
    if (null != t) {
        var e,
            n,
            i,
            u,
            a = [],
            f = true,
            o = false;
        try {
            if (((i = (t = t.call(r)).next), 0 === l)) {
                if (Object(t) !== t) return;
                f = false;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true);
        } catch (r2) {
            (o = true), (n = r2);
        } finally {
            try {
                if (!f && null != t['return'] && ((u = t['return']()), Object(u) !== u)) return;
            } finally {
                if (o) throw n;
            }
        }
        return a;
    }
}

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
    throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    );
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

// node_modules/react-select/dist/useStateManager-7e1e8489.esm.js
var import_react = __toESM(require_react());
var _excluded = [
    'defaultInputValue',
    'defaultMenuIsOpen',
    'defaultValue',
    'inputValue',
    'menuIsOpen',
    'onChange',
    'onInputChange',
    'onMenuClose',
    'onMenuOpen',
    'value',
];
function useStateManager(_ref3) {
    var _ref$defaultInputValu = _ref3.defaultInputValue,
        defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
        _ref$defaultMenuIsOpe = _ref3.defaultMenuIsOpen,
        defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
        _ref$defaultValue = _ref3.defaultValue,
        defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
        propsInputValue = _ref3.inputValue,
        propsMenuIsOpen = _ref3.menuIsOpen,
        propsOnChange = _ref3.onChange,
        propsOnInputChange = _ref3.onInputChange,
        propsOnMenuClose = _ref3.onMenuClose,
        propsOnMenuOpen = _ref3.onMenuOpen,
        propsValue = _ref3.value,
        restSelectProps = _objectWithoutProperties(_ref3, _excluded);
    var _useState = (0, import_react.useState)(propsInputValue !== void 0 ? propsInputValue : defaultInputValue),
        _useState2 = _slicedToArray(_useState, 2),
        stateInputValue = _useState2[0],
        setStateInputValue = _useState2[1];
    var _useState3 = (0, import_react.useState)(propsMenuIsOpen !== void 0 ? propsMenuIsOpen : defaultMenuIsOpen),
        _useState4 = _slicedToArray(_useState3, 2),
        stateMenuIsOpen = _useState4[0],
        setStateMenuIsOpen = _useState4[1];
    var _useState5 = (0, import_react.useState)(propsValue !== void 0 ? propsValue : defaultValue),
        _useState6 = _slicedToArray(_useState5, 2),
        stateValue = _useState6[0],
        setStateValue = _useState6[1];
    var onChange2 = (0, import_react.useCallback)(
        function (value2, actionMeta) {
            if (typeof propsOnChange === 'function') {
                propsOnChange(value2, actionMeta);
            }
            setStateValue(value2);
        },
        [propsOnChange]
    );
    var onInputChange = (0, import_react.useCallback)(
        function (value2, actionMeta) {
            var newValue;
            if (typeof propsOnInputChange === 'function') {
                newValue = propsOnInputChange(value2, actionMeta);
            }
            setStateInputValue(newValue !== void 0 ? newValue : value2);
        },
        [propsOnInputChange]
    );
    var onMenuOpen = (0, import_react.useCallback)(
        function () {
            if (typeof propsOnMenuOpen === 'function') {
                propsOnMenuOpen();
            }
            setStateMenuIsOpen(true);
        },
        [propsOnMenuOpen]
    );
    var onMenuClose = (0, import_react.useCallback)(
        function () {
            if (typeof propsOnMenuClose === 'function') {
                propsOnMenuClose();
            }
            setStateMenuIsOpen(false);
        },
        [propsOnMenuClose]
    );
    var inputValue = propsInputValue !== void 0 ? propsInputValue : stateInputValue;
    var menuIsOpen = propsMenuIsOpen !== void 0 ? propsMenuIsOpen : stateMenuIsOpen;
    var value = propsValue !== void 0 ? propsValue : stateValue;
    return _objectSpread2(
        _objectSpread2({}, restSelectProps),
        {},
        {
            inputValue,
            menuIsOpen,
            onChange: onChange2,
            onInputChange,
            onMenuClose,
            onMenuOpen,
            value,
        }
    );
}

// node_modules/react-select/dist/react-select.esm.js
var React5 = __toESM(require_react());
var import_react8 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, 'prototype', {
        writable: false,
    });
    return Constructor;
}

// node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true,
        },
    });
    Object.defineProperty(subClass, 'prototype', {
        writable: false,
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
          };
    return _getPrototypeOf(o);
}

// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t2) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
    })();
}

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError('Derived constructors may only return object or undefined');
    }
    return _assertThisInitialized(self);
}

// node_modules/@babel/runtime/helpers/esm/createSuper.js
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
    if ((typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) || iter['@@iterator'] != null)
        return Array.from(iter);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
    throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

// node_modules/react-select/dist/Select-49a62830.esm.js
var React4 = __toESM(require_react());
var import_react6 = __toESM(require_react());

// node_modules/@emotion/react/dist/emotion-element-c39617d8.browser.esm.js
var React2 = __toESM(require_react());
var import_react2 = __toESM(require_react());

// node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
function sheetForTag(tag) {
    if (tag.sheet) {
        return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
            return document.styleSheets[i];
        }
    }
}
function createStyleElement(options2) {
    var tag = document.createElement('style');
    tag.setAttribute('data-emotion', options2.key);
    if (options2.nonce !== void 0) {
        tag.setAttribute('nonce', options2.nonce);
    }
    tag.appendChild(document.createTextNode(''));
    tag.setAttribute('data-s', '');
    return tag;
}
var StyleSheet = (function () {
    function StyleSheet2(options2) {
        var _this = this;
        this._insertTag = function (tag) {
            var before;
            if (_this.tags.length === 0) {
                if (_this.insertionPoint) {
                    before = _this.insertionPoint.nextSibling;
                } else if (_this.prepend) {
                    before = _this.container.firstChild;
                } else {
                    before = _this.before;
                }
            } else {
                before = _this.tags[_this.tags.length - 1].nextSibling;
            }
            _this.container.insertBefore(tag, before);
            _this.tags.push(tag);
        };
        this.isSpeedy = options2.speedy === void 0 ? false : options2.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options2.nonce;
        this.key = options2.key;
        this.container = options2.container;
        this.prepend = options2.prepend;
        this.insertionPoint = options2.insertionPoint;
        this.before = null;
    }
    var _proto = StyleSheet2.prototype;
    _proto.hydrate = function hydrate(nodes) {
        nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
            this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        if (true) {
            var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
            if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
                console.error(
                    "You're attempting to insert the following rule:\n" +
                        rule +
                        '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
                );
            }
            this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
        }
        if (this.isSpeedy) {
            var sheet = sheetForTag(tag);
            try {
                sheet.insertRule(rule, sheet.cssRules.length);
            } catch (e) {
                if (
                    !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
                        rule
                    )
                ) {
                    console.error('There was a problem inserting the following rule: "' + rule + '"', e);
                }
            }
        } else {
            tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
    };
    _proto.flush = function flush() {
        this.tags.forEach(function (tag) {
            return tag.parentNode && tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        if (true) {
            this._alreadyInsertedOrderInsensitiveRule = false;
        }
    };
    return StyleSheet2;
})();

// node_modules/stylis/src/Enum.js
var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';
var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

// node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
    return charat(value, 0) ^ 45
        ? (((((((length2 << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^
              charat(value, 3)
        : 0;
}
function trim(value) {
    return value.trim();
}
function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
}
function indexof(value, search) {
    return value.indexOf(search);
}
function charat(value, index2) {
    return value.charCodeAt(index2) | 0;
}
function substr(value, begin, end) {
    return value.slice(begin, end);
}
function strlen(value) {
    return value.length;
}
function sizeof(value) {
    return value.length;
}
function append(value, array) {
    return array.push(value), value;
}
function combine(array, callback) {
    return array.map(callback).join('');
}

// node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';
function node(value, root, parent, type, props, children, length2) {
    return { value, root, parent, type, props, children, line, column, length: length2, return: '' };
}
function copy(root, props) {
    return assign(node('', null, null, '', null, null, 0), root, { length: -root.length }, props);
}
function char() {
    return character;
}
function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if ((column--, character === 10)) (column = 1), line--;
    return character;
}
function next() {
    character = position < length ? charat(characters, position++) : 0;
    if ((column++, character === 10)) (column = 1), line++;
    return character;
}
function peek() {
    return charat(characters, position);
}
function caret() {
    return position;
}
function slice(begin, end) {
    return substr(characters, begin, end);
}
function token(type) {
    switch (type) {
        case 0:
        case 9:
        case 10:
        case 13:
        case 32:
            return 5;
        case 33:
        case 43:
        case 44:
        case 47:
        case 62:
        case 64:
        case 126:
        case 59:
        case 123:
        case 125:
            return 4;
        case 58:
            return 3;
        case 34:
        case 39:
        case 40:
        case 91:
            return 2;
        case 41:
        case 93:
            return 1;
    }
    return 0;
}
function alloc(value) {
    return (line = column = 1), (length = strlen((characters = value))), (position = 0), [];
}
function dealloc(value) {
    return (characters = ''), value;
}
function delimit(type) {
    return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
    while ((character = peek()))
        if (character < 33) next();
        else break;
    return token(type) > 2 || token(character) > 3 ? '' : ' ';
}
function escaping(index2, count) {
    while (--count && next())
        if (
            character < 48 ||
            character > 102 ||
            (character > 57 && character < 65) ||
            (character > 70 && character < 97)
        )
            break;
    return slice(index2, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
    while (next())
        switch (character) {
            case type:
                return position;
            case 34:
            case 39:
                if (type !== 34 && type !== 39) delimiter(character);
                break;
            case 40:
                if (type === 41) delimiter(type);
                break;
            case 92:
                next();
                break;
        }
    return position;
}
function commenter(type, index2) {
    while (next())
        if (type + character === 47 + 10) break;
        else if (type + character === 42 + 42 && peek() === 47) break;
    return '/*' + slice(index2, position - 1) + '*' + from(type === 47 ? type : next());
}
function identifier(index2) {
    while (!token(peek())) next();
    return slice(index2, position);
}

// node_modules/stylis/src/Parser.js
function compile(value) {
    return dealloc(parse('', null, null, null, [''], (value = alloc(value)), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index2 = 0;
    var offset2 = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = '';
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning)
        switch (((previous = character2), (character2 = next()))) {
            case 40:
                if (previous != 108 && charat(characters2, length2 - 1) == 58) {
                    if (indexof((characters2 += replace(delimit(character2), '&', '&\f')), '&\f') != -1) ampersand = -1;
                    break;
                }
            case 34:
            case 39:
            case 91:
                characters2 += delimit(character2);
                break;
            case 9:
            case 10:
            case 13:
            case 32:
                characters2 += whitespace(previous);
                break;
            case 92:
                characters2 += escaping(caret() - 1, 7);
                continue;
            case 47:
                switch (peek()) {
                    case 42:
                    case 47:
                        append(comment(commenter(next(), caret()), root, parent), declarations);
                        break;
                    default:
                        characters2 += '/';
                }
                break;
            case 123 * variable:
                points[index2++] = strlen(characters2) * ampersand;
            case 125 * variable:
            case 59:
            case 0:
                switch (character2) {
                    case 0:
                    case 125:
                        scanning = 0;
                    case 59 + offset2:
                        if (ampersand == -1) characters2 = replace(characters2, /\f/g, '');
                        if (property > 0 && strlen(characters2) - length2)
                            append(
                                property > 32
                                    ? declaration(characters2 + ';', rule, parent, length2 - 1)
                                    : declaration(replace(characters2, ' ', '') + ';', rule, parent, length2 - 2),
                                declarations
                            );
                        break;
                    case 59:
                        characters2 += ';';
                    default:
                        append(
                            (reference = ruleset(
                                characters2,
                                root,
                                parent,
                                index2,
                                offset2,
                                rules,
                                points,
                                type,
                                (props = []),
                                (children = []),
                                length2
                            )),
                            rulesets
                        );
                        if (character2 === 123)
                            if (offset2 === 0)
                                parse(
                                    characters2,
                                    root,
                                    reference,
                                    reference,
                                    props,
                                    rulesets,
                                    length2,
                                    points,
                                    children
                                );
                            else
                                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                                    case 100:
                                    case 108:
                                    case 109:
                                    case 115:
                                        parse(
                                            value,
                                            reference,
                                            reference,
                                            rule &&
                                                append(
                                                    ruleset(
                                                        value,
                                                        reference,
                                                        reference,
                                                        0,
                                                        0,
                                                        rules,
                                                        points,
                                                        type,
                                                        rules,
                                                        (props = []),
                                                        length2
                                                    ),
                                                    children
                                                ),
                                            rules,
                                            children,
                                            length2,
                                            points,
                                            rule ? props : children
                                        );
                                        break;
                                    default:
                                        parse(
                                            characters2,
                                            reference,
                                            reference,
                                            reference,
                                            [''],
                                            children,
                                            0,
                                            points,
                                            children
                                        );
                                }
                }
                (index2 = offset2 = property = 0),
                    (variable = ampersand = 1),
                    (type = characters2 = ''),
                    (length2 = pseudo);
                break;
            case 58:
                (length2 = 1 + strlen(characters2)), (property = previous);
            default:
                if (variable < 1) {
                    if (character2 == 123) --variable;
                    else if (character2 == 125 && variable++ == 0 && prev() == 125) continue;
                }
                switch (((characters2 += from(character2)), character2 * variable)) {
                    case 38:
                        ampersand = offset2 > 0 ? 1 : ((characters2 += '\f'), -1);
                        break;
                    case 44:
                        (points[index2++] = (strlen(characters2) - 1) * ampersand), (ampersand = 1);
                        break;
                    case 64:
                        if (peek() === 45) characters2 += delimit(next());
                        (atrule = peek()),
                            (offset2 = length2 = strlen((type = characters2 += identifier(caret())))),
                            character2++;
                        break;
                    case 45:
                        if (previous === 45 && strlen(characters2) == 2) variable = 0;
                }
        }
    return rulesets;
}
function ruleset(value, root, parent, index2, offset2, rules, points, type, props, children, length2) {
    var post = offset2 - 1;
    var rule = offset2 === 0 ? rules : [''];
    var size2 = sizeof(rule);
    for (var i = 0, j = 0, k = 0; i < index2; ++i)
        for (var x = 0, y = substr(value, post + 1, (post = abs((j = points[i])))), z = value; x < size2; ++x)
            if ((z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))) props[k++] = z;
    return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
    return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
    var output = '';
    var length2 = sizeof(children);
    for (var i = 0; i < length2; i++) output += callback(children[i], i, children, callback) || '';
    return output;
}
function stringify(element, index2, children, callback) {
    switch (element.type) {
        case LAYER:
            if (element.children.length) break;
        case IMPORT:
        case DECLARATION:
            return (element.return = element.return || element.value);
        case COMMENT:
            return '';
        case KEYFRAMES:
            return (element.return = element.value + '{' + serialize(element.children, callback) + '}');
        case RULESET:
            element.value = element.props.join(',');
    }
    return strlen((children = serialize(element.children, callback)))
        ? (element.return = element.value + '{' + children + '}')
        : '';
}

// node_modules/stylis/src/Middleware.js
function middleware(collection) {
    var length2 = sizeof(collection);
    return function (element, index2, children, callback) {
        var output = '';
        for (var i = 0; i < length2; i++) output += collection[i](element, index2, children, callback) || '';
        return output;
    };
}

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize = function weakMemoize2(func) {
    var cache = /* @__PURE__ */ new WeakMap();
    return function (arg) {
        if (cache.has(arg)) {
            return cache.get(arg);
        }
        var ret = func(arg);
        cache.set(arg, ret);
        return ret;
    };
};

// node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function (arg) {
        if (cache[arg] === void 0) cache[arg] = fn(arg);
        return cache[arg];
    };
}

// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index2) {
    var previous = 0;
    var character2 = 0;
    while (true) {
        previous = character2;
        character2 = peek();
        if (previous === 38 && character2 === 12) {
            points[index2] = 1;
        }
        if (token(character2)) {
            break;
        }
        next();
    }
    return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
    var index2 = -1;
    var character2 = 44;
    do {
        switch (token(character2)) {
            case 0:
                if (character2 === 38 && peek() === 12) {
                    points[index2] = 1;
                }
                parsed[index2] += identifierWithPointTracking(position - 1, points, index2);
                break;
            case 2:
                parsed[index2] += delimit(character2);
                break;
            case 4:
                if (character2 === 44) {
                    parsed[++index2] = peek() === 58 ? '&\f' : '';
                    points[index2] = parsed[index2].length;
                    break;
                }
            default:
                parsed[index2] += from(character2);
        }
    } while ((character2 = next()));
    return parsed;
};
var getRules = function getRules2(value, points) {
    return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
    if (
        element.type !== 'rule' ||
        !element.parent || // positive .length indicates that this rule contains pseudo
        // negative .length indicates that this rule has been already prefixed
        element.length < 1
    ) {
        return;
    }
    var value = element.value,
        parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== 'rule') {
        parent = parent.parent;
        if (!parent) return;
    }
    if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
    }
    if (isImplicitRule) {
        return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
            element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + ' ' + rules[i];
        }
    }
};
var removeLabel = function removeLabel2(element) {
    if (element.type === 'decl') {
        var value = element.value;
        if (
            // charcode for l
            value.charCodeAt(0) === 108 && // charcode for b
            value.charCodeAt(2) === 98
        ) {
            element['return'] = '';
            element.value = '';
        }
    }
};
var ignoreFlag =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
var isIgnoringComment = function isIgnoringComment2(element) {
    return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
    return function (element, index2, children) {
        if (element.type !== 'rule' || cache.compat) return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses) {
            var isNested = !!element.parent;
            var commentContainer = isNested
                ? element.parent.children
                : // global rule at the root level
                  children;
            for (var i = commentContainer.length - 1; i >= 0; i--) {
                var node2 = commentContainer[i];
                if (node2.line < element.line) {
                    break;
                }
                if (node2.column < element.column) {
                    if (isIgnoringComment(node2)) {
                        return;
                    }
                    break;
                }
            }
            unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                console.error(
                    'The pseudo class "' +
                        unsafePseudoClass +
                        '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                        unsafePseudoClass.split('-child')[0] +
                        '-of-type".'
                );
            });
        }
    };
};
var isImportRule = function isImportRule2(element) {
    return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index2, children) {
    for (var i = index2 - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
            return true;
        }
    }
    return false;
};
var nullifyElement = function nullifyElement2(element) {
    element.type = '';
    element.value = '';
    element['return'] = '';
    element.children = '';
    element.props = '';
};
var incorrectImportAlarm = function incorrectImportAlarm2(element, index2, children) {
    if (!isImportRule(element)) {
        return;
    }
    if (element.parent) {
        console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
        );
        nullifyElement(element);
    } else if (isPrependedWithRegularRules(index2, children)) {
        console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
        );
        nullifyElement(element);
    }
};
function prefix2(value, length2) {
    switch (hash(value, length2)) {
        case 5103:
            return WEBKIT + 'print-' + value + value;
        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
            return WEBKIT + value + value;
        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
            return WEBKIT + value + MOZ + value + MS + value + value;
        case 6828:
        case 4268:
            return WEBKIT + value + MS + value + value;
        case 6165:
            return WEBKIT + value + MS + 'flex-' + value + value;
        case 5187:
            return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
        case 5443:
            return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
        case 4675:
            return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
        case 5548:
            return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
        case 5292:
            return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
        case 6060:
            return (
                WEBKIT +
                'box-' +
                replace(value, '-grow', '') +
                WEBKIT +
                value +
                MS +
                replace(value, 'grow', 'positive') +
                value
            );
        case 4554:
            return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
        case 6187:
            return (
                replace(
                    replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'),
                    value,
                    ''
                ) + value
            );
        case 5495:
        case 3959:
            return replace(value, /(image-set\([^]*)/, WEBKIT + '$1$`$1');
        case 4968:
            return (
                replace(
                    replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'),
                    /s.+-b[^;]+/,
                    'justify'
                ) +
                WEBKIT +
                value +
                value
            );
        case 4095:
        case 3583:
        case 4068:
        case 2532:
            return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
            if (strlen(value) - 1 - length2 > 6)
                switch (charat(value, length2 + 1)) {
                    case 109:
                        if (charat(value, length2 + 4) !== 45) break;
                    case 102:
                        return (
                            replace(
                                value,
                                /(.+:)(.+)-([^]+)/,
                                '$1' + WEBKIT + '$2-$3$1' + MOZ + (charat(value, length2 + 3) == 108 ? '$3' : '$2-$3')
                            ) + value
                        );
                    case 115:
                        return ~indexof(value, 'stretch')
                            ? prefix2(replace(value, 'stretch', 'fill-available'), length2) + value
                            : value;
                }
            break;
        case 4949:
            if (charat(value, length2 + 1) !== 115) break;
        case 6444:
            switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
                case 107:
                    return replace(value, ':', ':' + WEBKIT) + value;
                case 101:
                    return (
                        replace(
                            value,
                            /(.+:)([^;!]+)(;|!.+)?/,
                            '$1' +
                                WEBKIT +
                                (charat(value, 14) === 45 ? 'inline-' : '') +
                                'box$3$1' +
                                WEBKIT +
                                '$2$3$1' +
                                MS +
                                '$2box$3'
                        ) + value
                    );
            }
            break;
        case 5936:
            switch (charat(value, length2 + 11)) {
                case 114:
                    return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
                case 108:
                    return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
                case 45:
                    return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
            }
            return WEBKIT + value + MS + value + value;
    }
    return value;
}
var prefixer = function prefixer2(element, index2, children, callback) {
    if (element.length > -1) {
        if (!element['return'])
            switch (element.type) {
                case DECLARATION:
                    element['return'] = prefix2(element.value, element.length);
                    break;
                case KEYFRAMES:
                    return serialize(
                        [
                            copy(element, {
                                value: replace(element.value, '@', '@' + WEBKIT),
                            }),
                        ],
                        callback
                    );
                case RULESET:
                    if (element.length)
                        return combine(element.props, function (value) {
                            switch (match(value, /(::plac\w+|:read-\w+)/)) {
                                case ':read-only':
                                case ':read-write':
                                    return serialize(
                                        [
                                            copy(element, {
                                                props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')],
                                            }),
                                        ],
                                        callback
                                    );
                                case '::placeholder':
                                    return serialize(
                                        [
                                            copy(element, {
                                                props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')],
                                            }),
                                            copy(element, {
                                                props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')],
                                            }),
                                            copy(element, {
                                                props: [replace(value, /:(plac\w+)/, MS + 'input-$1')],
                                            }),
                                        ],
                                        callback
                                    );
                            }
                            return '';
                        });
            }
    }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options2) {
    var key = options2.key;
    if (!key) {
        throw new Error(
            "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
        );
    }
    if (key === 'css') {
        var ssrStyles = document.querySelectorAll('style[data-emotion]:not([data-s])');
        Array.prototype.forEach.call(ssrStyles, function (node2) {
            var dataEmotionAttribute = node2.getAttribute('data-emotion');
            if (dataEmotionAttribute.indexOf(' ') === -1) {
                return;
            }
            document.head.appendChild(node2);
            node2.setAttribute('data-s', '');
        });
    }
    var stylisPlugins = options2.stylisPlugins || defaultStylisPlugins;
    if (true) {
        if (/[^a-z-]/.test(key)) {
            throw new Error(
                'Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed'
            );
        }
    }
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    {
        container = options2.container || document.head;
        Array.prototype.forEach.call(
            // this means we will ignore elements which don't have a space in them which
            // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
            document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
            function (node2) {
                var attrib = node2.getAttribute('data-emotion').split(' ');
                for (var i = 1; i < attrib.length; i++) {
                    inserted[attrib[i]] = true;
                }
                nodesToHydrate.push(node2);
            }
        );
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    if (true) {
        omnipresentPlugins.push(
            createUnsafeSelectorsAlarm({
                get compat() {
                    return cache.compat;
                },
            }),
            incorrectImportAlarm
        );
    }
    {
        var currentSheet;
        var finalizingPlugins = [
            stringify,
            true
                ? function (element) {
                      if (!element.root) {
                          if (element['return']) {
                              currentSheet.insert(element['return']);
                          } else if (element.value && element.type !== COMMENT) {
                              currentSheet.insert(element.value + '{}');
                          }
                      }
                  }
                : rulesheet(function (rule) {
                      currentSheet.insert(rule);
                  }),
        ];
        var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis = function stylis2(styles) {
            return serialize(compile(styles), serializer);
        };
        _insert = function insert(selector, serialized, sheet, shouldCache) {
            currentSheet = sheet;
            if (serialized.map !== void 0) {
                currentSheet = {
                    insert: function insert2(rule) {
                        sheet.insert(rule + serialized.map);
                    },
                };
            }
            stylis(selector ? selector + '{' + serialized.styles + '}' : serialized.styles);
            if (shouldCache) {
                cache.inserted[serialized.name] = true;
            }
        };
    }
    var cache = {
        key,
        sheet: new StyleSheet({
            key,
            container,
            nonce: options2.nonce,
            speedy: options2.speedy,
            prepend: options2.prepend,
            insertionPoint: options2.insertionPoint,
        }),
        nonce: options2.nonce,
        inserted,
        registered: {},
        insert: _insert,
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
};

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());

// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames2) {
    var rawClassName = '';
    classNames2.split(' ').forEach(function (className) {
        if (registered[className] !== void 0) {
            registeredStyles.push(registered[className] + ';');
        } else {
            rawClassName += className + ' ';
        }
    });
    return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
    var className = cache.key + '-' + serialized.name;
    if (
        // we only need to add the styles to the registered cache if the
        // class name could be used further down
        // the tree but if it's a string tag, we know it won't
        // so we don't have to add it to registered cache.
        // this improves memory usage since we can avoid storing the whole style string
        (isStringTag === false || // we need to always store it if we're in compat mode and
            // in node since emotion-server relies on whether a style is in
            // the registered cache to know whether a style is global or not
            // also, note that this check will be dead code eliminated in the browser
            isBrowser === false) &&
        cache.registered[className] === void 0
    ) {
        cache.registered[className] = serialized.styles;
    }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
    registerStyles(cache, serialized, isStringTag);
    var className = cache.key + '-' + serialized.name;
    if (cache.inserted[serialized.name] === void 0) {
        var current = serialized;
        do {
            cache.insert(serialized === current ? '.' + className : '', current, cache.sheet, true);
            current = current.next;
        } while (current !== void 0);
    }
};

// node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
    var h = 0;
    var k,
        i = 0,
        len = str.length;
    for (; len >= 4; ++i, len -= 4) {
        k =
            (str.charCodeAt(i) & 255) |
            ((str.charCodeAt(++i) & 255) << 8) |
            ((str.charCodeAt(++i) & 255) << 16) |
            ((str.charCodeAt(++i) & 255) << 24);
        k = /* Math.imul(k, m): */ (k & 65535) * 1540483477 + (((k >>> 16) * 59797) << 16);
        k ^= /* k >>> r: */ k >>> 24;
        h =
            /* Math.imul(k, m): */
            ((k & 65535) * 1540483477 + (((k >>> 16) * 59797) << 16)) /* Math.imul(h, m): */ ^
            ((h & 65535) * 1540483477 + (((h >>> 16) * 59797) << 16));
    }
    switch (len) {
        case 3:
            h ^= (str.charCodeAt(i + 2) & 255) << 16;
        case 2:
            h ^= (str.charCodeAt(i + 1) & 255) << 8;
        case 1:
            h ^= str.charCodeAt(i) & 255;
            h = /* Math.imul(h, m): */ (h & 65535) * 1540483477 + (((h >>> 16) * 59797) << 16);
    }
    h ^= h >>> 13;
    h = /* Math.imul(h, m): */ (h & 65535) * 1540483477 + (((h >>> 16) * 59797) << 16);
    return ((h ^ (h >>> 15)) >>> 0).toString(36);
}

// node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
};

// node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var UNDEFINED_AS_OBJECT_KEY_ERROR =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
    return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
    return value != null && typeof value !== 'boolean';
};
var processStyleName = memoize(function (styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
    switch (key) {
        case 'animation':
        case 'animationName': {
            if (typeof value === 'string') {
                return value.replace(animationRegex, function (match2, p1, p2) {
                    cursor = {
                        name: p1,
                        styles: p2,
                        next: cursor,
                    };
                    return p1;
                });
            }
        }
    }
    if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
        return value + 'px';
    }
    return value;
};
if (true) {
    contentValuePattern =
        /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
    oldProcessStyleValue = processStyleValue;
    msPattern = /^-ms-/;
    hyphenPattern = /-(.)/g;
    hyphenatedCache = {};
    processStyleValue = function processStyleValue3(key, value) {
        if (key === 'content') {
            if (
                typeof value !== 'string' ||
                (contentValues.indexOf(value) === -1 &&
                    !contentValuePattern.test(value) &&
                    (value.charAt(0) !== value.charAt(value.length - 1) ||
                        (value.charAt(0) !== '"' && value.charAt(0) !== "'")))
            ) {
                throw new Error(
                    "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
                        value +
                        '"\'`'
                );
            }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === void 0) {
            hyphenatedCache[key] = true;
            console.error(
                'Using kebab-case for css properties in objects is not supported. Did you mean ' +
                    key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
                        return _char.toUpperCase();
                    }) +
                    '?'
            );
        }
        return processed;
    };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern;
var hyphenPattern;
var hyphenatedCache;
var noComponentSelectorMessage =
    'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
        return '';
    }
    if (interpolation.__emotion_styles !== void 0) {
        if (interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
            throw new Error(noComponentSelectorMessage);
        }
        return interpolation;
    }
    switch (typeof interpolation) {
        case 'boolean': {
            return '';
        }
        case 'object': {
            if (interpolation.anim === 1) {
                cursor = {
                    name: interpolation.name,
                    styles: interpolation.styles,
                    next: cursor,
                };
                return interpolation.name;
            }
            if (interpolation.styles !== void 0) {
                var next2 = interpolation.next;
                if (next2 !== void 0) {
                    while (next2 !== void 0) {
                        cursor = {
                            name: next2.name,
                            styles: next2.styles,
                            next: cursor,
                        };
                        next2 = next2.next;
                    }
                }
                var styles = interpolation.styles + ';';
                if (interpolation.map !== void 0) {
                    styles += interpolation.map;
                }
                return styles;
            }
            return createStringFromObject(mergedProps, registered, interpolation);
        }
        case 'function': {
            if (mergedProps !== void 0) {
                var previousCursor = cursor;
                var result = interpolation(mergedProps);
                cursor = previousCursor;
                return handleInterpolation(mergedProps, registered, result);
            } else if (true) {
                console.error(
                    "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
                );
            }
            break;
        }
        case 'string':
            if (true) {
                var matched = [];
                var replaced = interpolation.replace(animationRegex, function (match2, p1, p2) {
                    var fakeVarName = 'animation' + matched.length;
                    matched.push(
                        'const ' + fakeVarName + ' = keyframes`' + p2.replace(/^@keyframes animation-\w+/, '') + '`'
                    );
                    return '${' + fakeVarName + '}';
                });
                if (matched.length) {
                    console.error(
                        '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
                            [].concat(matched, ['`' + replaced + '`']).join('\n') +
                            '\n\nYou should wrap it with `css` like this:\n\n' +
                            ('css`' + replaced + '`')
                    );
                }
            }
            break;
    }
    if (registered == null) {
        return interpolation;
    }
    var cached = registered[interpolation];
    return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
    var string = '';
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            string += handleInterpolation(mergedProps, registered, obj[i]) + ';';
        }
    } else {
        for (var _key in obj) {
            var value = obj[_key];
            if (typeof value !== 'object') {
                if (registered != null && registered[value] !== void 0) {
                    string += _key + '{' + registered[value] + '}';
                } else if (isProcessableValue(value)) {
                    string += processStyleName(_key) + ':' + processStyleValue(_key, value) + ';';
                }
            } else {
                if (_key === 'NO_COMPONENT_SELECTOR' && true) {
                    throw new Error(noComponentSelectorMessage);
                }
                if (
                    Array.isArray(value) &&
                    typeof value[0] === 'string' &&
                    (registered == null || registered[value[0]] === void 0)
                ) {
                    for (var _i = 0; _i < value.length; _i++) {
                        if (isProcessableValue(value[_i])) {
                            string += processStyleName(_key) + ':' + processStyleValue(_key, value[_i]) + ';';
                        }
                    }
                } else {
                    var interpolated = handleInterpolation(mergedProps, registered, value);
                    switch (_key) {
                        case 'animation':
                        case 'animationName': {
                            string += processStyleName(_key) + ':' + interpolated + ';';
                            break;
                        }
                        default: {
                            if (_key === 'undefined') {
                                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                            }
                            string += _key + '{' + interpolated + '}';
                        }
                    }
                }
            }
        }
    }
    return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
if (true) {
    sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
    }
    var stringMode = true;
    var styles = '';
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles += handleInterpolation(mergedProps, registered, strings);
    } else {
        if (strings[0] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[0];
    }
    for (var i = 1; i < args.length; i++) {
        styles += handleInterpolation(mergedProps, registered, args[i]);
        if (stringMode) {
            if (strings[i] === void 0) {
                console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
            }
            styles += strings[i];
        }
    }
    var sourceMap;
    if (true) {
        styles = styles.replace(sourceMapPattern, function (match3) {
            sourceMap = match3;
            return '';
        });
    }
    labelPattern.lastIndex = 0;
    var identifierName = '';
    var match2;
    while ((match2 = labelPattern.exec(styles)) !== null) {
        identifierName +=
            '-' + // $FlowFixMe we know it's not null
            match2[1];
    }
    var name = murmur2(styles) + identifierName;
    if (true) {
        return {
            name,
            styles,
            map: sourceMap,
            next: cursor,
            toString: function toString() {
                return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
            },
        };
    }
    return {
        name,
        styles,
        next: cursor,
    };
};

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var React = __toESM(require_react());
var syncFallback = function syncFallback2(create) {
    return create();
};
var useInsertionEffect2 = React['useInsertionEffect'] ? React['useInsertionEffect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect2 || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect2 || React.useLayoutEffect;

// node_modules/@emotion/react/dist/emotion-element-c39617d8.browser.esm.js
var isBrowser2 = true;
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = React2.createContext(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement !== 'undefined'
        ? createCache({
              key: 'css',
          })
        : null
);
if (true) {
    EmotionCacheContext.displayName = 'EmotionCacheContext';
}
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
    return (0, import_react2.forwardRef)(function (props, ref) {
        var cache = (0, import_react2.useContext)(EmotionCacheContext);
        return func(props, cache, ref);
    });
};
if (!isBrowser2) {
    withEmotionCache = function withEmotionCache3(func) {
        return function (props) {
            var cache = (0, import_react2.useContext)(EmotionCacheContext);
            if (cache === null) {
                cache = createCache({
                    key: 'css',
                });
                return React2.createElement(
                    EmotionCacheContext.Provider,
                    {
                        value: cache,
                    },
                    func(props, cache)
                );
            } else {
                return func(props, cache);
            }
        };
    };
}
var ThemeContext = React2.createContext({});
if (true) {
    ThemeContext.displayName = 'EmotionThemeContext';
}
var getTheme = function getTheme2(outerTheme, theme) {
    if (typeof theme === 'function') {
        var mergedTheme = theme(outerTheme);
        if (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme)) {
            throw new Error(
                '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
            );
        }
        return mergedTheme;
    }
    if (theme == null || typeof theme !== 'object' || Array.isArray(theme)) {
        throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
    return _extends({}, outerTheme, theme);
};
var createCacheWithTheme = weakMemoize(function (outerTheme) {
    return weakMemoize(function (theme) {
        return getTheme(outerTheme, theme);
    });
});
var getLastPart = function getLastPart2(functionName) {
    var parts = functionName.split('.');
    return parts[parts.length - 1];
};
var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine2(line2) {
    var match2 = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line2);
    if (match2) return getLastPart(match2[1]);
    match2 = /^([A-Za-z0-9$.]+)@/.exec(line2);
    if (match2) return getLastPart(match2[1]);
    return void 0;
};
var internalReactFunctionNames = /* @__PURE__ */ new Set([
    'renderWithHooks',
    'processChild',
    'finishClassComponent',
    'renderToString',
]);
var sanitizeIdentifier = function sanitizeIdentifier2(identifier2) {
    return identifier2.replace(/\$/g, '-');
};
var getLabelFromStackTrace = function getLabelFromStackTrace2(stackTrace) {
    if (!stackTrace) return void 0;
    var lines = stackTrace.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var functionName = getFunctionNameFromStackTraceLine(lines[i]);
        if (!functionName) continue;
        if (internalReactFunctionNames.has(functionName)) break;
        if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
    }
    return void 0;
};
var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps2(type, props) {
    if (
        typeof props.css === 'string' && // check if there is a css declaration
        props.css.indexOf(':') !== -1
    ) {
        throw new Error(
            "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
                props.css +
                '`'
        );
    }
    var newProps = {};
    for (var key in props) {
        if (hasOwnProperty.call(props, key)) {
            newProps[key] = props[key];
        }
    }
    newProps[typePropName] = type;
    if (
        !!props.css &&
        (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)
    ) {
        var label = getLabelFromStackTrace(new Error().stack);
        if (label) newProps[labelPropName] = label;
    }
    return newProps;
};
var Insertion = function Insertion2(_ref3) {
    var cache = _ref3.cache,
        serialized = _ref3.serialized,
        isStringTag = _ref3.isStringTag;
    registerStyles(cache, serialized, isStringTag);
    useInsertionEffectAlwaysWithSyncFallback(function () {
        return insertStyles(cache, serialized, isStringTag);
    });
    return null;
};
var Emotion = withEmotionCache(function (props, cache, ref) {
    var cssProp = props.css;
    if (typeof cssProp === 'string' && cache.registered[cssProp] !== void 0) {
        cssProp = cache.registered[cssProp];
    }
    var WrappedComponent = props[typePropName];
    var registeredStyles = [cssProp];
    var className = '';
    if (typeof props.className === 'string') {
        className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
    } else if (props.className != null) {
        className = props.className + ' ';
    }
    var serialized = serializeStyles(registeredStyles, void 0, React2.useContext(ThemeContext));
    if (serialized.name.indexOf('-') === -1) {
        var labelFromStack = props[labelPropName];
        if (labelFromStack) {
            serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
        }
    }
    className += cache.key + '-' + serialized.name;
    var newProps = {};
    for (var key in props) {
        if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && key !== labelPropName) {
            newProps[key] = props[key];
        }
    }
    newProps.ref = ref;
    newProps.className = className;
    return React2.createElement(
        React2.Fragment,
        null,
        React2.createElement(Insertion, {
            cache,
            serialized,
            isStringTag: typeof WrappedComponent === 'string',
        }),
        React2.createElement(WrappedComponent, newProps)
    );
});
if (true) {
    Emotion.displayName = 'EmotionCssPropInternal';
}
var Emotion$1 = Emotion;

// node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var React3 = __toESM(require_react());
var import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
var pkg = {
    name: '@emotion/react',
    version: '11.11.3',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
        './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js',
    },
    exports: {
        '.': {
            module: {
                worker: './dist/emotion-react.worker.esm.js',
                browser: './dist/emotion-react.browser.esm.js',
                default: './dist/emotion-react.esm.js',
            },
            import: './dist/emotion-react.cjs.mjs',
            default: './dist/emotion-react.cjs.js',
        },
        './jsx-runtime': {
            module: {
                worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
                browser: './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
                default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
            },
            import: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs',
            default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
        },
        './_isolated-hnrs': {
            module: {
                worker: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
                browser: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
                default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
            },
            import: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs',
            default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
        },
        './jsx-dev-runtime': {
            module: {
                worker: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
                browser: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
                default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
            },
            import: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs',
            default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
        },
        './package.json': './package.json',
        './types/css-prop': './types/css-prop.d.ts',
        './macro': {
            types: {
                import: './macro.d.mts',
                default: './macro.d.ts',
            },
            default: './macro.js',
        },
    },
    types: 'types/index.d.ts',
    files: ['src', 'dist', 'jsx-runtime', 'jsx-dev-runtime', '_isolated-hnrs', 'types/*.d.ts', 'macro.*'],
    sideEffects: false,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: {
        'test:typescript': 'dtslint types',
    },
    dependencies: {
        '@babel/runtime': '^7.18.3',
        '@emotion/babel-plugin': '^11.11.0',
        '@emotion/cache': '^11.11.0',
        '@emotion/serialize': '^1.1.3',
        '@emotion/use-insertion-effect-with-fallbacks': '^1.0.1',
        '@emotion/utils': '^1.2.1',
        '@emotion/weak-memoize': '^0.3.1',
        'hoist-non-react-statics': '^3.3.1',
    },
    peerDependencies: {
        react: '>=16.8.0',
    },
    peerDependenciesMeta: {
        '@types/react': {
            optional: true,
        },
    },
    devDependencies: {
        '@definitelytyped/dtslint': '0.0.112',
        '@emotion/css': '11.11.2',
        '@emotion/css-prettifier': '1.1.3',
        '@emotion/server': '11.11.0',
        '@emotion/styled': '11.11.0',
        'html-tag-names': '^1.1.2',
        react: '16.14.0',
        'svg-tag-names': '^1.1.1',
        typescript: '^4.5.5',
    },
    repository: 'https://github.com/emotion-js/emotion/tree/main/packages/react',
    publishConfig: {
        access: 'public',
    },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
        entrypoints: ['./index.js', './jsx-runtime.js', './jsx-dev-runtime.js', './_isolated-hnrs.js'],
        umdName: 'emotionReact',
        exports: {
            envConditions: ['browser', 'worker'],
            extra: {
                './types/css-prop': './types/css-prop.d.ts',
                './macro': {
                    types: {
                        import: './macro.d.mts',
                        default: './macro.d.ts',
                    },
                    default: './macro.js',
                },
            },
        },
    },
};
var jsx = function jsx2(type, props) {
    var args = arguments;
    if (props == null || !hasOwnProperty.call(props, 'css')) {
        return React3.createElement.apply(void 0, args);
    }
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = Emotion$1;
    createElementArgArray[1] = createEmotionProps(type, props);
    for (var i = 2; i < argsLength; i++) {
        createElementArgArray[i] = args[i];
    }
    return React3.createElement.apply(null, createElementArgArray);
};
var warnedAboutCssPropForGlobal = false;
var Global = withEmotionCache(function (props, cache) {
    if (
        !warnedAboutCssPropForGlobal && // check for className as well since the user is
        // probably using the custom createElement which
        // means it will be turned into a className prop
        // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
        (props.className || props.css)
    ) {
        console.error(
            "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
        );
        warnedAboutCssPropForGlobal = true;
    }
    var styles = props.styles;
    var serialized = serializeStyles([styles], void 0, React3.useContext(ThemeContext));
    if (!isBrowser2) {
        var _ref3;
        var serializedNames = serialized.name;
        var serializedStyles = serialized.styles;
        var next2 = serialized.next;
        while (next2 !== void 0) {
            serializedNames += ' ' + next2.name;
            serializedStyles += next2.styles;
            next2 = next2.next;
        }
        var shouldCache = cache.compat === true;
        var rules = cache.insert(
            '',
            {
                name: serializedNames,
                styles: serializedStyles,
            },
            cache.sheet,
            shouldCache
        );
        if (shouldCache) {
            return null;
        }
        return React3.createElement(
            'style',
            ((_ref3 = {}),
            (_ref3['data-emotion'] = cache.key + '-global ' + serializedNames),
            (_ref3.dangerouslySetInnerHTML = {
                __html: rules,
            }),
            (_ref3.nonce = cache.sheet.nonce),
            _ref3)
        );
    }
    var sheetRef = React3.useRef();
    useInsertionEffectWithLayoutFallback(
        function () {
            var key = cache.key + '-global';
            var sheet = new cache.sheet.constructor({
                key,
                nonce: cache.sheet.nonce,
                container: cache.sheet.container,
                speedy: cache.sheet.isSpeedy,
            });
            var rehydrating = false;
            var node2 = document.querySelector('style[data-emotion="' + key + ' ' + serialized.name + '"]');
            if (cache.sheet.tags.length) {
                sheet.before = cache.sheet.tags[0];
            }
            if (node2 !== null) {
                rehydrating = true;
                node2.setAttribute('data-emotion', key);
                sheet.hydrate([node2]);
            }
            sheetRef.current = [sheet, rehydrating];
            return function () {
                sheet.flush();
            };
        },
        [cache]
    );
    useInsertionEffectWithLayoutFallback(
        function () {
            var sheetRefCurrent = sheetRef.current;
            var sheet = sheetRefCurrent[0],
                rehydrating = sheetRefCurrent[1];
            if (rehydrating) {
                sheetRefCurrent[1] = false;
                return;
            }
            if (serialized.next !== void 0) {
                insertStyles(cache, serialized.next, true);
            }
            if (sheet.tags.length) {
                var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
                sheet.before = element;
                sheet.flush();
            }
            cache.insert('', serialized, sheet, false);
        },
        [cache, serialized.name]
    );
    return null;
});
if (true) {
    Global.displayName = 'EmotionGlobal';
}
function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }
    return serializeStyles(args);
}
var keyframes = function keyframes2() {
    var insertable = css.apply(void 0, arguments);
    var name = 'animation-' + insertable.name;
    return {
        name,
        styles: '@keyframes ' + name + '{' + insertable.styles + '}',
        anim: 1,
        toString: function toString() {
            return '_EMO_' + this.name + '_' + this.styles + '_EMO_';
        },
    };
};
var classnames = function classnames2(args) {
    var len = args.length;
    var i = 0;
    var cls = '';
    for (; i < len; i++) {
        var arg = args[i];
        if (arg == null) continue;
        var toAdd = void 0;
        switch (typeof arg) {
            case 'boolean':
                break;
            case 'object': {
                if (Array.isArray(arg)) {
                    toAdd = classnames2(arg);
                } else {
                    if (arg.styles !== void 0 && arg.name !== void 0) {
                        console.error(
                            'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
                        );
                    }
                    toAdd = '';
                    for (var k in arg) {
                        if (arg[k] && k) {
                            toAdd && (toAdd += ' ');
                            toAdd += k;
                        }
                    }
                }
                break;
            }
            default: {
                toAdd = arg;
            }
        }
        if (toAdd) {
            cls && (cls += ' ');
            cls += toAdd;
        }
    }
    return cls;
};
function merge(registered, css5, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
        return className;
    }
    return rawClassName + css5(registeredStyles);
}
var Insertion3 = function Insertion4(_ref3) {
    var cache = _ref3.cache,
        serializedArr = _ref3.serializedArr;
    useInsertionEffectAlwaysWithSyncFallback(function () {
        for (var i = 0; i < serializedArr.length; i++) {
            insertStyles(cache, serializedArr[i], false);
        }
    });
    return null;
};
var ClassNames = withEmotionCache(function (props, cache) {
    var hasRendered = false;
    var serializedArr = [];
    var css5 = function css6() {
        if (hasRendered && true) {
            throw new Error('css can only be used during render');
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, cache.registered);
        serializedArr.push(serialized);
        registerStyles(cache, serialized, false);
        return cache.key + '-' + serialized.name;
    };
    var cx = function cx2() {
        if (hasRendered && true) {
            throw new Error('cx can only be used during render');
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        return merge(cache.registered, css5, classnames(args));
    };
    var content = {
        css: css5,
        cx,
        theme: React3.useContext(ThemeContext),
    };
    var ele = props.children(content);
    hasRendered = true;
    return React3.createElement(
        React3.Fragment,
        null,
        React3.createElement(Insertion3, {
            cache,
            serializedArr,
        }),
        ele
    );
});
if (true) {
    ClassNames.displayName = 'EmotionClassNames';
}
if (true) {
    isBrowser3 = true;
    isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';
    if (isBrowser3 && !isTestEnv) {
        globalContext = typeof globalThis !== 'undefined' ? globalThis : isBrowser3 ? window : global; // $FlowIgnore
        globalKey = '__EMOTION_REACT_' + pkg.version.split('.')[0] + '__';
        if (globalContext[globalKey]) {
            console.warn(
                'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
            );
        }
        globalContext[globalKey] = true;
    }
}
var isBrowser3;
var isTestEnv;
var globalContext;
var globalKey;

// node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(
        Object.defineProperties(strings, {
            raw: {
                value: Object.freeze(raw),
            },
        })
    );
}

// node_modules/react-select/dist/index-a301f526.esm.js
var import_react5 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ['top', 'right', 'bottom', 'left'];
var alignments = ['start', 'end'];
var placements = sides.reduce(
    (acc, side) => acc.concat(side, side + '-' + alignments[0], side + '-' + alignments[1]),
    []
);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
    x: v,
    y: v,
});
function rectToClientRect(rect) {
    return {
        ...rect,
        top: rect.y,
        left: rect.x,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height,
    };
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node2) {
    if (isNode(node2)) {
        return (node2.nodeName || '').toLowerCase();
    }
    return '#document';
}
function getWindow(node2) {
    var _node$ownerDocument;
    return (
        (node2 == null || (_node$ownerDocument = node2.ownerDocument) == null
            ? void 0
            : _node$ownerDocument.defaultView) || window
    );
}
function getDocumentElement(node2) {
    var _ref3;
    return (_ref3 = (isNode(node2) ? node2.ownerDocument : node2.document) || window.document) == null
        ? void 0
        : _ref3.documentElement;
}
function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
    if (typeof ShadowRoot === 'undefined') {
        return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
    const { overflow, overflowX, overflowY, display } = getComputedStyle2(element);
    return (
        /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
        !['inline', 'contents'].includes(display)
    );
}
function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node2) {
    return ['html', 'body', '#document'].includes(getNodeName(node2));
}
function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
}
function getParentNode(node2) {
    if (getNodeName(node2) === 'html') {
        return node2;
    }
    const result =
        // Step into the shadow DOM of the parent of a slotted node.
        node2.assignedSlot || // DOM Element detected.
        node2.parentNode || // ShadowRoot detected.
        (isShadowRoot(node2) && node2.host) || // Fallback.
        getDocumentElement(node2);
    return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node2) {
    const parentNode = getParentNode(node2);
    if (isLastTraversableNode(parentNode)) {
        return node2.ownerDocument ? node2.ownerDocument.body : node2.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
        return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node2, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
        list = [];
    }
    if (traverseIframes === void 0) {
        traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node2);
    const isBody =
        scrollableAncestor ===
        ((_node$ownerDocument2 = node2.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
        return list.concat(
            win,
            win.visualViewport || [],
            isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
            win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []
        );
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
    const css5 = getComputedStyle2(element);
    let width = parseFloat(css5.width) || 0;
    let height = parseFloat(css5.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
        width = offsetWidth;
        height = offsetHeight;
    }
    return {
        width,
        height,
        $: shouldFallback,
    };
}
function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
        return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const { width, height, $ } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
        x = 1;
    }
    if (!y || !Number.isFinite(y)) {
        y = 1;
    }
    return {
        x,
        y,
    };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
        return noOffsets;
    }
    return {
        x: win.visualViewport.offsetLeft,
        y: win.visualViewport.offsetTop,
    };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
        isFixed = false;
    }
    if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== getWindow(element))) {
        return false;
    }
    return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
        includeScale = false;
    }
    if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
        if (offsetParent) {
            if (isElement(offsetParent)) {
                scale = getScale(offsetParent);
            }
        } else {
            scale = getScale(element);
        }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent)
        ? getVisualOffsets(domElement)
        : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
        const win = getWindow(domElement);
        const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
        let currentWin = win;
        let currentIFrame = currentWin.frameElement;
        while (currentIFrame && offsetParent && offsetWin !== currentWin) {
            const iframeScale = getScale(currentIFrame);
            const iframeRect = currentIFrame.getBoundingClientRect();
            const css5 = getComputedStyle2(currentIFrame);
            const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css5.paddingLeft)) * iframeScale.x;
            const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css5.paddingTop)) * iframeScale.y;
            x *= iframeScale.x;
            y *= iframeScale.y;
            width *= iframeScale.x;
            height *= iframeScale.y;
            x += left;
            y += top;
            currentWin = getWindow(currentIFrame);
            currentIFrame = currentWin.frameElement;
        }
    }
    return rectToClientRect({
        width,
        height,
        x,
        y,
    });
}
function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
        var _io;
        clearTimeout(timeoutId);
        (_io = io) == null || _io.disconnect();
        io = null;
    }
    function refresh(skip, threshold) {
        if (skip === void 0) {
            skip = false;
        }
        if (threshold === void 0) {
            threshold = 1;
        }
        cleanup();
        const { left, top, width, height } = element.getBoundingClientRect();
        if (!skip) {
            onMove();
        }
        if (!width || !height) {
            return;
        }
        const insetTop = floor(top);
        const insetRight = floor(root.clientWidth - (left + width));
        const insetBottom = floor(root.clientHeight - (top + height));
        const insetLeft = floor(left);
        const rootMargin = -insetTop + 'px ' + -insetRight + 'px ' + -insetBottom + 'px ' + -insetLeft + 'px';
        const options2 = {
            rootMargin,
            threshold: max(0, min(1, threshold)) || 1,
        };
        let isFirstUpdate = true;
        function handleObserve(entries) {
            const ratio = entries[0].intersectionRatio;
            if (ratio !== threshold) {
                if (!isFirstUpdate) {
                    return refresh();
                }
                if (!ratio) {
                    timeoutId = setTimeout(() => {
                        refresh(false, 1e-7);
                    }, 100);
                } else {
                    refresh(false, ratio);
                }
            }
            isFirstUpdate = false;
        }
        try {
            io = new IntersectionObserver(handleObserve, {
                ...options2,
                // Handle <iframe>s
                root: root.ownerDocument,
            });
        } catch (e) {
            io = new IntersectionObserver(handleObserve, options2);
        }
        io.observe(element);
    }
    refresh(true);
    return cleanup;
}
function autoUpdate(reference, floating, update, options2) {
    if (options2 === void 0) {
        options2 = {};
    }
    const {
        ancestorScroll = true,
        ancestorResize = true,
        elementResize = typeof ResizeObserver === 'function',
        layoutShift = typeof IntersectionObserver === 'function',
        animationFrame = false,
    } = options2;
    const referenceEl = unwrapElement(reference);
    const ancestors =
        ancestorScroll || ancestorResize
            ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)]
            : [];
    ancestors.forEach((ancestor) => {
        ancestorScroll &&
            ancestor.addEventListener('scroll', update, {
                passive: true,
            });
        ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
        resizeObserver = new ResizeObserver((_ref3) => {
            let [firstEntry] = _ref3;
            if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
                resizeObserver.unobserve(floating);
                cancelAnimationFrame(reobserveFrame);
                reobserveFrame = requestAnimationFrame(() => {
                    var _resizeObserver;
                    (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
                });
            }
            update();
        });
        if (referenceEl && !animationFrame) {
            resizeObserver.observe(referenceEl);
        }
        resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
        frameLoop();
    }
    function frameLoop() {
        const nextRefRect = getBoundingClientRect(reference);
        if (
            prevRefRect &&
            (nextRefRect.x !== prevRefRect.x ||
                nextRefRect.y !== prevRefRect.y ||
                nextRefRect.width !== prevRefRect.width ||
                nextRefRect.height !== prevRefRect.height)
        ) {
            update();
        }
        prevRefRect = nextRefRect;
        frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
        var _resizeObserver2;
        ancestors.forEach((ancestor) => {
            ancestorScroll && ancestor.removeEventListener('scroll', update);
            ancestorResize && ancestor.removeEventListener('resize', update);
        });
        cleanupIo == null || cleanupIo();
        (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
        resizeObserver = null;
        if (animationFrame) {
            cancelAnimationFrame(frameId);
        }
    };
}

// node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
var import_react3 = __toESM(require_react());
var index = import_react3.useLayoutEffect;
var use_isomorphic_layout_effect_browser_esm_default = index;

// node_modules/react-select/dist/index-a301f526.esm.js
var _excluded$4 = [
    'className',
    'clearValue',
    'cx',
    'getStyles',
    'getClassNames',
    'getValue',
    'hasValue',
    'isMulti',
    'isRtl',
    'options',
    'selectOption',
    'selectProps',
    'setValue',
    'theme',
];
var noop = function noop2() {};
function applyPrefixToName(prefix3, name) {
    if (!name) {
        return prefix3;
    } else if (name[0] === '-') {
        return prefix3 + name;
    } else {
        return prefix3 + '__' + name;
    }
}
function classNames(prefix3, state) {
    for (
        var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2;
        _key < _len;
        _key++
    ) {
        classNameList[_key - 2] = arguments[_key];
    }
    var arr = [].concat(classNameList);
    if (state && prefix3) {
        for (var key in state) {
            if (state.hasOwnProperty(key) && state[key]) {
                arr.push(''.concat(applyPrefixToName(prefix3, key)));
            }
        }
    }
    return arr
        .filter(function (i) {
            return i;
        })
        .map(function (i) {
            return String(i).trim();
        })
        .join(' ');
}
var cleanValue = function cleanValue2(value) {
    if (isArray(value)) return value.filter(Boolean);
    if (_typeof(value) === 'object' && value !== null) return [value];
    return [];
};
var cleanCommonProps = function cleanCommonProps2(props) {
    props.className;
    props.clearValue;
    props.cx;
    props.getStyles;
    props.getClassNames;
    props.getValue;
    props.hasValue;
    props.isMulti;
    props.isRtl;
    props.options;
    props.selectOption;
    props.selectProps;
    props.setValue;
    props.theme;
    var innerProps = _objectWithoutProperties(props, _excluded$4);
    return _objectSpread2({}, innerProps);
};
var getStyleProps = function getStyleProps2(props, name, classNamesState) {
    var cx = props.cx,
        getStyles = props.getStyles,
        getClassNames = props.getClassNames,
        className = props.className;
    return {
        css: getStyles(name, props),
        className: cx(
            classNamesState !== null && classNamesState !== void 0 ? classNamesState : {},
            getClassNames(name, props),
            className
        ),
    };
};
function isDocumentElement(el) {
    return [document.documentElement, document.body, window].indexOf(el) > -1;
}
function normalizedHeight(el) {
    if (isDocumentElement(el)) {
        return window.innerHeight;
    }
    return el.clientHeight;
}
function getScrollTop(el) {
    if (isDocumentElement(el)) {
        return window.pageYOffset;
    }
    return el.scrollTop;
}
function scrollTo(el, top) {
    if (isDocumentElement(el)) {
        window.scrollTo(0, top);
        return;
    }
    el.scrollTop = top;
}
function getScrollParent(element) {
    var style = getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRx = /(auto|scroll)/;
    if (style.position === 'fixed') return document.documentElement;
    for (var parent = element; (parent = parent.parentElement); ) {
        style = getComputedStyle(parent);
        if (excludeStaticParent && style.position === 'static') {
            continue;
        }
        if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
            return parent;
        }
    }
    return document.documentElement;
}
function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
    var duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200;
    var callback = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : noop;
    var start = getScrollTop(element);
    var change = to - start;
    var increment = 10;
    var currentTime = 0;
    function animateScroll() {
        currentTime += increment;
        var val = easeOutCubic(currentTime, start, change, duration);
        scrollTo(element, val);
        if (currentTime < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            callback(element);
        }
    }
    animateScroll();
}
function scrollIntoView(menuEl, focusedEl) {
    var menuRect = menuEl.getBoundingClientRect();
    var focusedRect = focusedEl.getBoundingClientRect();
    var overScroll = focusedEl.offsetHeight / 3;
    if (focusedRect.bottom + overScroll > menuRect.bottom) {
        scrollTo(
            menuEl,
            Math.min(
                focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll,
                menuEl.scrollHeight
            )
        );
    } else if (focusedRect.top - overScroll < menuRect.top) {
        scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
    }
}
function getBoundingClientObj(element) {
    var rect = element.getBoundingClientRect();
    return {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width,
    };
}
function isTouchCapable() {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
}
function isMobileDevice() {
    try {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e) {
        return false;
    }
}
var passiveOptionAccessed = false;
var options = {
    get passive() {
        return (passiveOptionAccessed = true);
    },
};
var w = typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
    w.addEventListener('p', noop, options);
    w.removeEventListener('p', noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
    return item != null;
}
function isArray(arg) {
    return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
    return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
    return singleValue;
}
function multiValueAsValue(multiValue) {
    return multiValue;
}
var removeProps = function removeProps2(propsObj) {
    for (
        var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;
        _key2 < _len2;
        _key2++
    ) {
        properties[_key2 - 1] = arguments[_key2];
    }
    var propsMap = Object.entries(propsObj).filter(function (_ref3) {
        var _ref23 = _slicedToArray(_ref3, 1),
            key = _ref23[0];
        return !properties.includes(key);
    });
    return propsMap.reduce(function (newProps, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];
        newProps[key] = val;
        return newProps;
    }, {});
};
var _excluded$3 = ['children', 'innerProps'];
var _excluded2$1 = ['children', 'innerProps'];
function getMenuPlacement(_ref3) {
    var preferredMaxHeight = _ref3.maxHeight,
        menuEl = _ref3.menuEl,
        minHeight = _ref3.minHeight,
        preferredPlacement = _ref3.placement,
        shouldScroll = _ref3.shouldScroll,
        isFixedPosition = _ref3.isFixedPosition,
        controlHeight2 = _ref3.controlHeight;
    var scrollParent = getScrollParent(menuEl);
    var defaultState = {
        placement: 'bottom',
        maxHeight: preferredMaxHeight,
    };
    if (!menuEl || !menuEl.offsetParent) return defaultState;
    var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
        scrollHeight = _scrollParent$getBoun.height;
    var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
        menuBottom = _menuEl$getBoundingCl.bottom,
        menuHeight = _menuEl$getBoundingCl.height,
        menuTop = _menuEl$getBoundingCl.top;
    var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
        containerTop = _menuEl$offsetParent$.top;
    var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
    var scrollTop = getScrollTop(scrollParent);
    var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
    var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
    var viewSpaceAbove = containerTop - marginTop;
    var viewSpaceBelow = viewHeight - menuTop;
    var scrollSpaceAbove = viewSpaceAbove + scrollTop;
    var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
    var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
    var scrollUp = scrollTop + menuTop - marginTop;
    var scrollDuration = 160;
    switch (preferredPlacement) {
        case 'auto':
        case 'bottom':
            if (viewSpaceBelow >= menuHeight) {
                return {
                    placement: 'bottom',
                    maxHeight: preferredMaxHeight,
                };
            }
            if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
                if (shouldScroll) {
                    animatedScrollTo(scrollParent, scrollDown, scrollDuration);
                }
                return {
                    placement: 'bottom',
                    maxHeight: preferredMaxHeight,
                };
            }
            if (
                (!isFixedPosition && scrollSpaceBelow >= minHeight) ||
                (isFixedPosition && viewSpaceBelow >= minHeight)
            ) {
                if (shouldScroll) {
                    animatedScrollTo(scrollParent, scrollDown, scrollDuration);
                }
                var constrainedHeight = isFixedPosition
                    ? viewSpaceBelow - marginBottom
                    : scrollSpaceBelow - marginBottom;
                return {
                    placement: 'bottom',
                    maxHeight: constrainedHeight,
                };
            }
            if (preferredPlacement === 'auto' || isFixedPosition) {
                var _constrainedHeight = preferredMaxHeight;
                var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
                if (spaceAbove >= minHeight) {
                    _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight2, preferredMaxHeight);
                }
                return {
                    placement: 'top',
                    maxHeight: _constrainedHeight,
                };
            }
            if (preferredPlacement === 'bottom') {
                if (shouldScroll) {
                    scrollTo(scrollParent, scrollDown);
                }
                return {
                    placement: 'bottom',
                    maxHeight: preferredMaxHeight,
                };
            }
            break;
        case 'top':
            if (viewSpaceAbove >= menuHeight) {
                return {
                    placement: 'top',
                    maxHeight: preferredMaxHeight,
                };
            }
            if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
                if (shouldScroll) {
                    animatedScrollTo(scrollParent, scrollUp, scrollDuration);
                }
                return {
                    placement: 'top',
                    maxHeight: preferredMaxHeight,
                };
            }
            if (
                (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
                (isFixedPosition && viewSpaceAbove >= minHeight)
            ) {
                var _constrainedHeight2 = preferredMaxHeight;
                if (
                    (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
                    (isFixedPosition && viewSpaceAbove >= minHeight)
                ) {
                    _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
                }
                if (shouldScroll) {
                    animatedScrollTo(scrollParent, scrollUp, scrollDuration);
                }
                return {
                    placement: 'top',
                    maxHeight: _constrainedHeight2,
                };
            }
            return {
                placement: 'bottom',
                maxHeight: preferredMaxHeight,
            };
        default:
            throw new Error('Invalid placement provided "'.concat(preferredPlacement, '".'));
    }
    return defaultState;
}
function alignToControl(placement) {
    var placementToCSSProp = {
        bottom: 'top',
        top: 'bottom',
    };
    return placement ? placementToCSSProp[placement] : 'bottom';
}
var coercePlacement = function coercePlacement2(p) {
    return p === 'auto' ? 'bottom' : p;
};
var menuCSS = function menuCSS2(_ref23, unstyled) {
    var _objectSpread22;
    var placement = _ref23.placement,
        _ref2$theme = _ref23.theme,
        borderRadius2 = _ref2$theme.borderRadius,
        spacing2 = _ref2$theme.spacing,
        colors2 = _ref2$theme.colors;
    return _objectSpread2(
        ((_objectSpread22 = {
            label: 'menu',
        }),
        _defineProperty(_objectSpread22, alignToControl(placement), '100%'),
        _defineProperty(_objectSpread22, 'position', 'absolute'),
        _defineProperty(_objectSpread22, 'width', '100%'),
        _defineProperty(_objectSpread22, 'zIndex', 1),
        _objectSpread22),
        unstyled
            ? {}
            : {
                  backgroundColor: colors2.neutral0,
                  borderRadius: borderRadius2,
                  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
                  marginBottom: spacing2.menuGutter,
                  marginTop: spacing2.menuGutter,
              }
    );
};
var PortalPlacementContext = (0, import_react5.createContext)(null);
var MenuPlacer = function MenuPlacer2(props) {
    var children = props.children,
        minMenuHeight = props.minMenuHeight,
        maxMenuHeight = props.maxMenuHeight,
        menuPlacement = props.menuPlacement,
        menuPosition = props.menuPosition,
        menuShouldScrollIntoView = props.menuShouldScrollIntoView,
        theme = props.theme;
    var _ref3 = (0, import_react5.useContext)(PortalPlacementContext) || {},
        setPortalPlacement = _ref3.setPortalPlacement;
    var ref = (0, import_react5.useRef)(null);
    var _useState = (0, import_react5.useState)(maxMenuHeight),
        _useState2 = _slicedToArray(_useState, 2),
        maxHeight = _useState2[0],
        setMaxHeight = _useState2[1];
    var _useState3 = (0, import_react5.useState)(null),
        _useState4 = _slicedToArray(_useState3, 2),
        placement = _useState4[0],
        setPlacement = _useState4[1];
    var controlHeight2 = theme.spacing.controlHeight;
    use_isomorphic_layout_effect_browser_esm_default(
        function () {
            var menuEl = ref.current;
            if (!menuEl) return;
            var isFixedPosition = menuPosition === 'fixed';
            var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
            var state = getMenuPlacement({
                maxHeight: maxMenuHeight,
                menuEl,
                minHeight: minMenuHeight,
                placement: menuPlacement,
                shouldScroll,
                isFixedPosition,
                controlHeight: controlHeight2,
            });
            setMaxHeight(state.maxHeight);
            setPlacement(state.placement);
            setPortalPlacement === null || setPortalPlacement === void 0 ? void 0 : setPortalPlacement(state.placement);
        },
        [
            maxMenuHeight,
            menuPlacement,
            menuPosition,
            menuShouldScrollIntoView,
            minMenuHeight,
            setPortalPlacement,
            controlHeight2,
        ]
    );
    return children({
        ref,
        placerProps: _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                placement: placement || coercePlacement(menuPlacement),
                maxHeight,
            }
        ),
    });
};
var Menu = function Menu2(props) {
    var children = props.children,
        innerRef = props.innerRef,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'menu', {
                menu: true,
            }),
            {
                ref: innerRef,
            },
            innerProps
        ),
        children
    );
};
var Menu$1 = Menu;
var menuListCSS = function menuListCSS2(_ref4, unstyled) {
    var maxHeight = _ref4.maxHeight,
        baseUnit2 = _ref4.theme.spacing.baseUnit;
    return _objectSpread2(
        {
            maxHeight,
            overflowY: 'auto',
            position: 'relative',
            // required for offset[Height, Top] > keyboard scroll
            WebkitOverflowScrolling: 'touch',
        },
        unstyled
            ? {}
            : {
                  paddingBottom: baseUnit2,
                  paddingTop: baseUnit2,
              }
    );
};
var MenuList = function MenuList2(props) {
    var children = props.children,
        innerProps = props.innerProps,
        innerRef = props.innerRef,
        isMulti = props.isMulti;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'menuList', {
                'menu-list': true,
                'menu-list--is-multi': isMulti,
            }),
            {
                ref: innerRef,
            },
            innerProps
        ),
        children
    );
};
var noticeCSS = function noticeCSS2(_ref5, unstyled) {
    var _ref5$theme = _ref5.theme,
        baseUnit2 = _ref5$theme.spacing.baseUnit,
        colors2 = _ref5$theme.colors;
    return _objectSpread2(
        {
            textAlign: 'center',
        },
        unstyled
            ? {}
            : {
                  color: colors2.neutral40,
                  padding: ''.concat(baseUnit2 * 2, 'px ').concat(baseUnit2 * 3, 'px'),
              }
    );
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage2(_ref6) {
    var _ref6$children = _ref6.children,
        children = _ref6$children === void 0 ? 'No options' : _ref6$children,
        innerProps = _ref6.innerProps,
        restProps = _objectWithoutProperties(_ref6, _excluded$3);
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(
                _objectSpread2(
                    _objectSpread2({}, restProps),
                    {},
                    {
                        children,
                        innerProps,
                    }
                ),
                'noOptionsMessage',
                {
                    'menu-notice': true,
                    'menu-notice--no-options': true,
                }
            ),
            innerProps
        ),
        children
    );
};
var LoadingMessage = function LoadingMessage2(_ref7) {
    var _ref7$children = _ref7.children,
        children = _ref7$children === void 0 ? 'Loading...' : _ref7$children,
        innerProps = _ref7.innerProps,
        restProps = _objectWithoutProperties(_ref7, _excluded2$1);
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(
                _objectSpread2(
                    _objectSpread2({}, restProps),
                    {},
                    {
                        children,
                        innerProps,
                    }
                ),
                'loadingMessage',
                {
                    'menu-notice': true,
                    'menu-notice--loading': true,
                }
            ),
            innerProps
        ),
        children
    );
};
var menuPortalCSS = function menuPortalCSS2(_ref8) {
    var rect = _ref8.rect,
        offset2 = _ref8.offset,
        position2 = _ref8.position;
    return {
        left: rect.left,
        position: position2,
        top: offset2,
        width: rect.width,
        zIndex: 1,
    };
};
var MenuPortal = function MenuPortal2(props) {
    var appendTo = props.appendTo,
        children = props.children,
        controlElement = props.controlElement,
        innerProps = props.innerProps,
        menuPlacement = props.menuPlacement,
        menuPosition = props.menuPosition;
    var menuPortalRef = (0, import_react5.useRef)(null);
    var cleanupRef = (0, import_react5.useRef)(null);
    var _useState5 = (0, import_react5.useState)(coercePlacement(menuPlacement)),
        _useState6 = _slicedToArray(_useState5, 2),
        placement = _useState6[0],
        setPortalPlacement = _useState6[1];
    var portalPlacementContext = (0, import_react5.useMemo)(function () {
        return {
            setPortalPlacement,
        };
    }, []);
    var _useState7 = (0, import_react5.useState)(null),
        _useState8 = _slicedToArray(_useState7, 2),
        computedPosition = _useState8[0],
        setComputedPosition = _useState8[1];
    var updateComputedPosition = (0, import_react5.useCallback)(
        function () {
            if (!controlElement) return;
            var rect = getBoundingClientObj(controlElement);
            var scrollDistance = menuPosition === 'fixed' ? 0 : window.pageYOffset;
            var offset2 = rect[placement] + scrollDistance;
            if (
                offset2 !==
                    (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) ||
                rect.left !==
                    (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) ||
                rect.width !==
                    (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)
            ) {
                setComputedPosition({
                    offset: offset2,
                    rect,
                });
            }
        },
        [
            controlElement,
            menuPosition,
            placement,
            computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset,
            computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left,
            computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width,
        ]
    );
    use_isomorphic_layout_effect_browser_esm_default(
        function () {
            updateComputedPosition();
        },
        [updateComputedPosition]
    );
    var runAutoUpdate = (0, import_react5.useCallback)(
        function () {
            if (typeof cleanupRef.current === 'function') {
                cleanupRef.current();
                cleanupRef.current = null;
            }
            if (controlElement && menuPortalRef.current) {
                cleanupRef.current = autoUpdate(controlElement, menuPortalRef.current, updateComputedPosition, {
                    elementResize: 'ResizeObserver' in window,
                });
            }
        },
        [controlElement, updateComputedPosition]
    );
    use_isomorphic_layout_effect_browser_esm_default(
        function () {
            runAutoUpdate();
        },
        [runAutoUpdate]
    );
    var setMenuPortalElement = (0, import_react5.useCallback)(
        function (menuPortalElement) {
            menuPortalRef.current = menuPortalElement;
            runAutoUpdate();
        },
        [runAutoUpdate]
    );
    if ((!appendTo && menuPosition !== 'fixed') || !computedPosition) return null;
    var menuWrapper = jsx(
        'div',
        _extends(
            {
                ref: setMenuPortalElement,
            },
            getStyleProps(
                _objectSpread2(
                    _objectSpread2({}, props),
                    {},
                    {
                        offset: computedPosition.offset,
                        position: menuPosition,
                        rect: computedPosition.rect,
                    }
                ),
                'menuPortal',
                {
                    'menu-portal': true,
                }
            ),
            innerProps
        ),
        children
    );
    return jsx(
        PortalPlacementContext.Provider,
        {
            value: portalPlacementContext,
        },
        appendTo ? (0, import_react_dom.createPortal)(menuWrapper, appendTo) : menuWrapper
    );
};
var containerCSS = function containerCSS2(_ref3) {
    var isDisabled = _ref3.isDisabled,
        isRtl = _ref3.isRtl;
    return {
        label: 'container',
        direction: isRtl ? 'rtl' : void 0,
        pointerEvents: isDisabled ? 'none' : void 0,
        // cancel mouse events when disabled
        position: 'relative',
    };
};
var SelectContainer = function SelectContainer2(props) {
    var children = props.children,
        innerProps = props.innerProps,
        isDisabled = props.isDisabled,
        isRtl = props.isRtl;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'container', {
                '--is-disabled': isDisabled,
                '--is-rtl': isRtl,
            }),
            innerProps
        ),
        children
    );
};
var valueContainerCSS = function valueContainerCSS2(_ref23, unstyled) {
    var spacing2 = _ref23.theme.spacing,
        isMulti = _ref23.isMulti,
        hasValue = _ref23.hasValue,
        controlShouldRenderValue = _ref23.selectProps.controlShouldRenderValue;
    return _objectSpread2(
        {
            alignItems: 'center',
            display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
            flex: 1,
            flexWrap: 'wrap',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            overflow: 'hidden',
        },
        unstyled
            ? {}
            : {
                  padding: ''.concat(spacing2.baseUnit / 2, 'px ').concat(spacing2.baseUnit * 2, 'px'),
              }
    );
};
var ValueContainer = function ValueContainer2(props) {
    var children = props.children,
        innerProps = props.innerProps,
        isMulti = props.isMulti,
        hasValue = props.hasValue;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'valueContainer', {
                'value-container': true,
                'value-container--is-multi': isMulti,
                'value-container--has-value': hasValue,
            }),
            innerProps
        ),
        children
    );
};
var indicatorsContainerCSS = function indicatorsContainerCSS2() {
    return {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        flexShrink: 0,
    };
};
var IndicatorsContainer = function IndicatorsContainer2(props) {
    var children = props.children,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'indicatorsContainer', {
                indicators: true,
            }),
            innerProps
        ),
        children
    );
};
var _templateObject;
var _excluded$2 = ['size'];
var _excluded2 = ['innerProps', 'isRtl', 'size'];
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
    return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref2 = false
    ? {
          name: '8mmkcg',
          styles: 'display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0',
      }
    : {
          name: 'tj5bde-Svg',
          styles: 'display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;',
          map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaW5uZXJQcm9wcyxcbiAgaXNSdGwsXG4gIHNpemUgPSA0LFxuICAuLi5yZXN0UHJvcHNcbn06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPikgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKFxuICAgICAgICB7IC4uLnJlc3RQcm9wcywgaW5uZXJQcm9wcywgaXNSdGwsIHNpemUgfSxcbiAgICAgICAgJ2xvYWRpbmdJbmRpY2F0b3InLFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MH0gb2Zmc2V0PXtpc1J0bH0gLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXsxNjB9IG9mZnNldCAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezMyMH0gb2Zmc2V0PXshaXNSdGx9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */',
          toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };
var Svg = function Svg2(_ref3) {
    var size2 = _ref3.size,
        props = _objectWithoutProperties(_ref3, _excluded$2);
    return jsx(
        'svg',
        _extends(
            {
                height: size2,
                width: size2,
                viewBox: '0 0 20 20',
                'aria-hidden': 'true',
                focusable: 'false',
                css: _ref2,
            },
            props
        )
    );
};
var CrossIcon = function CrossIcon2(props) {
    return jsx(
        Svg,
        _extends(
            {
                size: 20,
            },
            props
        ),
        jsx('path', {
            d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z',
        })
    );
};
var DownChevron = function DownChevron2(props) {
    return jsx(
        Svg,
        _extends(
            {
                size: 20,
            },
            props
        ),
        jsx('path', {
            d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z',
        })
    );
};
var baseCSS = function baseCSS2(_ref3, unstyled) {
    var isFocused = _ref3.isFocused,
        _ref3$theme = _ref3.theme,
        baseUnit2 = _ref3$theme.spacing.baseUnit,
        colors2 = _ref3$theme.colors;
    return _objectSpread2(
        {
            label: 'indicatorContainer',
            display: 'flex',
            transition: 'color 150ms',
        },
        unstyled
            ? {}
            : {
                  color: isFocused ? colors2.neutral60 : colors2.neutral20,
                  padding: baseUnit2 * 2,
                  ':hover': {
                      color: isFocused ? colors2.neutral80 : colors2.neutral40,
                  },
              }
    );
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator2(props) {
    var children = props.children,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'dropdownIndicator', {
                indicator: true,
                'dropdown-indicator': true,
            }),
            innerProps
        ),
        children || jsx(DownChevron, null)
    );
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator2(props) {
    var children = props.children,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'clearIndicator', {
                indicator: true,
                'clear-indicator': true,
            }),
            innerProps
        ),
        children || jsx(CrossIcon, null)
    );
};
var indicatorSeparatorCSS = function indicatorSeparatorCSS2(_ref4, unstyled) {
    var isDisabled = _ref4.isDisabled,
        _ref4$theme = _ref4.theme,
        baseUnit2 = _ref4$theme.spacing.baseUnit,
        colors2 = _ref4$theme.colors;
    return _objectSpread2(
        {
            label: 'indicatorSeparator',
            alignSelf: 'stretch',
            width: 1,
        },
        unstyled
            ? {}
            : {
                  backgroundColor: isDisabled ? colors2.neutral10 : colors2.neutral20,
                  marginBottom: baseUnit2 * 2,
                  marginTop: baseUnit2 * 2,
              }
    );
};
var IndicatorSeparator = function IndicatorSeparator2(props) {
    var innerProps = props.innerProps;
    return jsx(
        'span',
        _extends(
            {},
            innerProps,
            getStyleProps(props, 'indicatorSeparator', {
                'indicator-separator': true,
            })
        )
    );
};
var loadingDotAnimations = keyframes(
    _templateObject ||
        (_templateObject = _taggedTemplateLiteral(['\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n']))
);
var loadingIndicatorCSS = function loadingIndicatorCSS2(_ref5, unstyled) {
    var isFocused = _ref5.isFocused,
        size2 = _ref5.size,
        _ref5$theme = _ref5.theme,
        colors2 = _ref5$theme.colors,
        baseUnit2 = _ref5$theme.spacing.baseUnit;
    return _objectSpread2(
        {
            label: 'loadingIndicator',
            display: 'flex',
            transition: 'color 150ms',
            alignSelf: 'center',
            fontSize: size2,
            lineHeight: 1,
            marginRight: size2,
            textAlign: 'center',
            verticalAlign: 'middle',
        },
        unstyled
            ? {}
            : {
                  color: isFocused ? colors2.neutral60 : colors2.neutral20,
                  padding: baseUnit2 * 2,
              }
    );
};
var LoadingDot = function LoadingDot2(_ref6) {
    var delay = _ref6.delay,
        offset2 = _ref6.offset;
    return jsx('span', {
        css: css(
            {
                animation: ''.concat(loadingDotAnimations, ' 1s ease-in-out ').concat(delay, 'ms infinite;'),
                backgroundColor: 'currentColor',
                borderRadius: '1em',
                display: 'inline-block',
                marginLeft: offset2 ? '1em' : void 0,
                height: '1em',
                verticalAlign: 'top',
                width: '1em',
            },
            false ? '' : ';label:LoadingDot;',
            false
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaW5uZXJQcm9wcyxcbiAgaXNSdGwsXG4gIHNpemUgPSA0LFxuICAuLi5yZXN0UHJvcHNcbn06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPikgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKFxuICAgICAgICB7IC4uLnJlc3RQcm9wcywgaW5uZXJQcm9wcywgaXNSdGwsIHNpemUgfSxcbiAgICAgICAgJ2xvYWRpbmdJbmRpY2F0b3InLFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MH0gb2Zmc2V0PXtpc1J0bH0gLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXsxNjB9IG9mZnNldCAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezMyMH0gb2Zmc2V0PXshaXNSdGx9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */'
        ),
    });
};
var LoadingIndicator = function LoadingIndicator2(_ref7) {
    var innerProps = _ref7.innerProps,
        isRtl = _ref7.isRtl,
        _ref7$size = _ref7.size,
        size2 = _ref7$size === void 0 ? 4 : _ref7$size,
        restProps = _objectWithoutProperties(_ref7, _excluded2);
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(
                _objectSpread2(
                    _objectSpread2({}, restProps),
                    {},
                    {
                        innerProps,
                        isRtl,
                        size: size2,
                    }
                ),
                'loadingIndicator',
                {
                    indicator: true,
                    'loading-indicator': true,
                }
            ),
            innerProps
        ),
        jsx(LoadingDot, {
            delay: 0,
            offset: isRtl,
        }),
        jsx(LoadingDot, {
            delay: 160,
            offset: true,
        }),
        jsx(LoadingDot, {
            delay: 320,
            offset: !isRtl,
        })
    );
};
var css$1 = function css2(_ref3, unstyled) {
    var isDisabled = _ref3.isDisabled,
        isFocused = _ref3.isFocused,
        _ref$theme = _ref3.theme,
        colors2 = _ref$theme.colors,
        borderRadius2 = _ref$theme.borderRadius,
        spacing2 = _ref$theme.spacing;
    return _objectSpread2(
        {
            label: 'control',
            alignItems: 'center',
            cursor: 'default',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            minHeight: spacing2.controlHeight,
            outline: '0 !important',
            position: 'relative',
            transition: 'all 100ms',
        },
        unstyled
            ? {}
            : {
                  backgroundColor: isDisabled ? colors2.neutral5 : colors2.neutral0,
                  borderColor: isDisabled ? colors2.neutral10 : isFocused ? colors2.primary : colors2.neutral20,
                  borderRadius: borderRadius2,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  boxShadow: isFocused ? '0 0 0 1px '.concat(colors2.primary) : void 0,
                  '&:hover': {
                      borderColor: isFocused ? colors2.primary : colors2.neutral30,
                  },
              }
    );
};
var Control = function Control2(props) {
    var children = props.children,
        isDisabled = props.isDisabled,
        isFocused = props.isFocused,
        innerRef = props.innerRef,
        innerProps = props.innerProps,
        menuIsOpen = props.menuIsOpen;
    return jsx(
        'div',
        _extends(
            {
                ref: innerRef,
            },
            getStyleProps(props, 'control', {
                control: true,
                'control--is-disabled': isDisabled,
                'control--is-focused': isFocused,
                'control--menu-is-open': menuIsOpen,
            }),
            innerProps,
            {
                'aria-disabled': isDisabled || void 0,
            }
        ),
        children
    );
};
var Control$1 = Control;
var _excluded$1 = ['data'];
var groupCSS = function groupCSS2(_ref3, unstyled) {
    var spacing2 = _ref3.theme.spacing;
    return unstyled
        ? {}
        : {
              paddingBottom: spacing2.baseUnit * 2,
              paddingTop: spacing2.baseUnit * 2,
          };
};
var Group = function Group2(props) {
    var children = props.children,
        cx = props.cx,
        getStyles = props.getStyles,
        getClassNames = props.getClassNames,
        Heading = props.Heading,
        headingProps = props.headingProps,
        innerProps = props.innerProps,
        label = props.label,
        theme = props.theme,
        selectProps = props.selectProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'group', {
                group: true,
            }),
            innerProps
        ),
        jsx(
            Heading,
            _extends({}, headingProps, {
                selectProps,
                theme,
                getStyles,
                getClassNames,
                cx,
            }),
            label
        ),
        jsx('div', null, children)
    );
};
var groupHeadingCSS = function groupHeadingCSS2(_ref23, unstyled) {
    var _ref2$theme = _ref23.theme,
        colors2 = _ref2$theme.colors,
        spacing2 = _ref2$theme.spacing;
    return _objectSpread2(
        {
            label: 'group',
            cursor: 'default',
            display: 'block',
        },
        unstyled
            ? {}
            : {
                  color: colors2.neutral40,
                  fontSize: '75%',
                  fontWeight: 500,
                  marginBottom: '0.25em',
                  paddingLeft: spacing2.baseUnit * 3,
                  paddingRight: spacing2.baseUnit * 3,
                  textTransform: 'uppercase',
              }
    );
};
var GroupHeading = function GroupHeading2(props) {
    var _cleanCommonProps = cleanCommonProps(props);
    _cleanCommonProps.data;
    var innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$1);
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'groupHeading', {
                'group-heading': true,
            }),
            innerProps
        )
    );
};
var Group$1 = Group;
var _excluded3 = ['innerRef', 'isDisabled', 'isHidden', 'inputClassName'];
var inputCSS = function inputCSS2(_ref3, unstyled) {
    var isDisabled = _ref3.isDisabled,
        value = _ref3.value,
        _ref$theme = _ref3.theme,
        spacing2 = _ref$theme.spacing,
        colors2 = _ref$theme.colors;
    return _objectSpread2(
        _objectSpread2(
            {
                visibility: isDisabled ? 'hidden' : 'visible',
                // force css to recompute when value change due to @emotion bug.
                // We can remove it whenever the bug is fixed.
                transform: value ? 'translateZ(0)' : '',
            },
            containerStyle
        ),
        unstyled
            ? {}
            : {
                  margin: spacing2.baseUnit / 2,
                  paddingBottom: spacing2.baseUnit / 2,
                  paddingTop: spacing2.baseUnit / 2,
                  color: colors2.neutral80,
              }
    );
};
var spacingStyle = {
    gridArea: '1 / 2',
    font: 'inherit',
    minWidth: '2px',
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0,
};
var containerStyle = {
    flex: '1 1 auto',
    display: 'inline-grid',
    gridArea: '1 / 1 / 2 / 3',
    gridTemplateColumns: '0 min-content',
    '&:after': _objectSpread2(
        {
            content: 'attr(data-value) " "',
            visibility: 'hidden',
            whiteSpace: 'pre',
        },
        spacingStyle
    ),
};
var inputStyle = function inputStyle2(isHidden) {
    return _objectSpread2(
        {
            label: 'input',
            color: 'inherit',
            background: 0,
            opacity: isHidden ? 0 : 1,
            width: '100%',
        },
        spacingStyle
    );
};
var Input = function Input2(props) {
    var cx = props.cx,
        value = props.value;
    var _cleanCommonProps = cleanCommonProps(props),
        innerRef = _cleanCommonProps.innerRef,
        isDisabled = _cleanCommonProps.isDisabled,
        isHidden = _cleanCommonProps.isHidden,
        inputClassName = _cleanCommonProps.inputClassName,
        innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded3);
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'input', {
                'input-container': true,
            }),
            {
                'data-value': value || '',
            }
        ),
        jsx(
            'input',
            _extends(
                {
                    className: cx(
                        {
                            input: true,
                        },
                        inputClassName
                    ),
                    ref: innerRef,
                    style: inputStyle(isHidden),
                    disabled: isDisabled,
                },
                innerProps
            )
        )
    );
};
var Input$1 = Input;
var multiValueCSS = function multiValueCSS2(_ref3, unstyled) {
    var _ref$theme = _ref3.theme,
        spacing2 = _ref$theme.spacing,
        borderRadius2 = _ref$theme.borderRadius,
        colors2 = _ref$theme.colors;
    return _objectSpread2(
        {
            label: 'multiValue',
            display: 'flex',
            minWidth: 0,
        },
        unstyled
            ? {}
            : {
                  backgroundColor: colors2.neutral10,
                  borderRadius: borderRadius2 / 2,
                  margin: spacing2.baseUnit / 2,
              }
    );
};
var multiValueLabelCSS = function multiValueLabelCSS2(_ref23, unstyled) {
    var _ref2$theme = _ref23.theme,
        borderRadius2 = _ref2$theme.borderRadius,
        colors2 = _ref2$theme.colors,
        cropWithEllipsis = _ref23.cropWithEllipsis;
    return _objectSpread2(
        {
            overflow: 'hidden',
            textOverflow: cropWithEllipsis || cropWithEllipsis === void 0 ? 'ellipsis' : void 0,
            whiteSpace: 'nowrap',
        },
        unstyled
            ? {}
            : {
                  borderRadius: borderRadius2 / 2,
                  color: colors2.neutral80,
                  fontSize: '85%',
                  padding: 3,
                  paddingLeft: 6,
              }
    );
};
var multiValueRemoveCSS = function multiValueRemoveCSS2(_ref3, unstyled) {
    var _ref3$theme = _ref3.theme,
        spacing2 = _ref3$theme.spacing,
        borderRadius2 = _ref3$theme.borderRadius,
        colors2 = _ref3$theme.colors,
        isFocused = _ref3.isFocused;
    return _objectSpread2(
        {
            alignItems: 'center',
            display: 'flex',
        },
        unstyled
            ? {}
            : {
                  borderRadius: borderRadius2 / 2,
                  backgroundColor: isFocused ? colors2.dangerLight : void 0,
                  paddingLeft: spacing2.baseUnit,
                  paddingRight: spacing2.baseUnit,
                  ':hover': {
                      backgroundColor: colors2.dangerLight,
                      color: colors2.danger,
                  },
              }
    );
};
var MultiValueGeneric = function MultiValueGeneric2(_ref4) {
    var children = _ref4.children,
        innerProps = _ref4.innerProps;
    return jsx('div', innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
    var children = _ref5.children,
        innerProps = _ref5.innerProps;
    return jsx(
        'div',
        _extends(
            {
                role: 'button',
            },
            innerProps
        ),
        children ||
            jsx(CrossIcon, {
                size: 14,
            })
    );
}
var MultiValue = function MultiValue2(props) {
    var children = props.children,
        components2 = props.components,
        data = props.data,
        innerProps = props.innerProps,
        isDisabled = props.isDisabled,
        removeProps3 = props.removeProps,
        selectProps = props.selectProps;
    var Container = components2.Container,
        Label = components2.Label,
        Remove = components2.Remove;
    return jsx(
        Container,
        {
            data,
            innerProps: _objectSpread2(
                _objectSpread2(
                    {},
                    getStyleProps(props, 'multiValue', {
                        'multi-value': true,
                        'multi-value--is-disabled': isDisabled,
                    })
                ),
                innerProps
            ),
            selectProps,
        },
        jsx(
            Label,
            {
                data,
                innerProps: _objectSpread2(
                    {},
                    getStyleProps(props, 'multiValueLabel', {
                        'multi-value__label': true,
                    })
                ),
                selectProps,
            },
            children
        ),
        jsx(Remove, {
            data,
            innerProps: _objectSpread2(
                _objectSpread2(
                    {},
                    getStyleProps(props, 'multiValueRemove', {
                        'multi-value__remove': true,
                    })
                ),
                {},
                {
                    'aria-label': 'Remove '.concat(children || 'option'),
                },
                removeProps3
            ),
            selectProps,
        })
    );
};
var MultiValue$1 = MultiValue;
var optionCSS = function optionCSS2(_ref3, unstyled) {
    var isDisabled = _ref3.isDisabled,
        isFocused = _ref3.isFocused,
        isSelected = _ref3.isSelected,
        _ref$theme = _ref3.theme,
        spacing2 = _ref$theme.spacing,
        colors2 = _ref$theme.colors;
    return _objectSpread2(
        {
            label: 'option',
            cursor: 'default',
            display: 'block',
            fontSize: 'inherit',
            width: '100%',
            userSelect: 'none',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        },
        unstyled
            ? {}
            : {
                  backgroundColor: isSelected ? colors2.primary : isFocused ? colors2.primary25 : 'transparent',
                  color: isDisabled ? colors2.neutral20 : isSelected ? colors2.neutral0 : 'inherit',
                  padding: ''.concat(spacing2.baseUnit * 2, 'px ').concat(spacing2.baseUnit * 3, 'px'),
                  // provide some affordance on touch devices
                  ':active': {
                      backgroundColor: !isDisabled ? (isSelected ? colors2.primary : colors2.primary50) : void 0,
                  },
              }
    );
};
var Option = function Option2(props) {
    var children = props.children,
        isDisabled = props.isDisabled,
        isFocused = props.isFocused,
        isSelected = props.isSelected,
        innerRef = props.innerRef,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'option', {
                option: true,
                'option--is-disabled': isDisabled,
                'option--is-focused': isFocused,
                'option--is-selected': isSelected,
            }),
            {
                ref: innerRef,
                'aria-disabled': isDisabled,
            },
            innerProps
        ),
        children
    );
};
var Option$1 = Option;
var placeholderCSS = function placeholderCSS2(_ref3, unstyled) {
    var _ref$theme = _ref3.theme,
        spacing2 = _ref$theme.spacing,
        colors2 = _ref$theme.colors;
    return _objectSpread2(
        {
            label: 'placeholder',
            gridArea: '1 / 1 / 2 / 3',
        },
        unstyled
            ? {}
            : {
                  color: colors2.neutral50,
                  marginLeft: spacing2.baseUnit / 2,
                  marginRight: spacing2.baseUnit / 2,
              }
    );
};
var Placeholder = function Placeholder2(props) {
    var children = props.children,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'placeholder', {
                placeholder: true,
            }),
            innerProps
        ),
        children
    );
};
var Placeholder$1 = Placeholder;
var css3 = function css4(_ref3, unstyled) {
    var isDisabled = _ref3.isDisabled,
        _ref$theme = _ref3.theme,
        spacing2 = _ref$theme.spacing,
        colors2 = _ref$theme.colors;
    return _objectSpread2(
        {
            label: 'singleValue',
            gridArea: '1 / 1 / 2 / 3',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        unstyled
            ? {}
            : {
                  color: isDisabled ? colors2.neutral40 : colors2.neutral80,
                  marginLeft: spacing2.baseUnit / 2,
                  marginRight: spacing2.baseUnit / 2,
              }
    );
};
var SingleValue = function SingleValue2(props) {
    var children = props.children,
        isDisabled = props.isDisabled,
        innerProps = props.innerProps;
    return jsx(
        'div',
        _extends(
            {},
            getStyleProps(props, 'singleValue', {
                'single-value': true,
                'single-value--is-disabled': isDisabled,
            }),
            innerProps
        ),
        children
    );
};
var SingleValue$1 = SingleValue;
var components = {
    ClearIndicator,
    Control: Control$1,
    DropdownIndicator,
    DownChevron,
    CrossIcon,
    Group: Group$1,
    GroupHeading,
    IndicatorsContainer,
    IndicatorSeparator,
    Input: Input$1,
    LoadingIndicator,
    Menu: Menu$1,
    MenuList,
    MenuPortal,
    LoadingMessage,
    NoOptionsMessage,
    MultiValue: MultiValue$1,
    MultiValueContainer,
    MultiValueLabel,
    MultiValueRemove,
    Option: Option$1,
    Placeholder: Placeholder$1,
    SelectContainer,
    SingleValue: SingleValue$1,
    ValueContainer,
};
var defaultComponents = function defaultComponents2(props) {
    return _objectSpread2(_objectSpread2({}, components), props.components);
};

// node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN =
    Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}
function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
        isEqual2 = areInputsEqual;
    }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

// node_modules/react-select/dist/Select-49a62830.esm.js
function _EMOTION_STRINGIFIED_CSS_ERROR__$2() {
    return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = false
    ? {
          name: '7pg0cj-a11yText',
          styles: 'label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap',
      }
    : {
          name: '1f43avz-a11yText-A11yText',
          styles: 'label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;',
          map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */',
          toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2,
      };
var A11yText = function A11yText2(props) {
    return jsx(
        'span',
        _extends(
            {
                css: _ref,
            },
            props
        )
    );
};
var A11yText$1 = A11yText;
var defaultAriaLiveMessages = {
    guidance: function guidance(props) {
        var isSearchable = props.isSearchable,
            isMulti = props.isMulti,
            tabSelectsValue = props.tabSelectsValue,
            context = props.context,
            isInitialFocus = props.isInitialFocus;
        switch (context) {
            case 'menu':
                return 'Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu'.concat(
                    tabSelectsValue ? ', press Tab to select the option and exit the menu' : '',
                    '.'
                );
            case 'input':
                return isInitialFocus
                    ? ''
                          .concat(props['aria-label'] || 'Select', ' is focused ')
                          .concat(isSearchable ? ',type to refine list' : '', ', press Down to open the menu, ')
                          .concat(isMulti ? ' press left to focus selected values' : '')
                    : '';
            case 'value':
                return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
            default:
                return '';
        }
    },
    onChange: function onChange(props) {
        var action = props.action,
            _props$label = props.label,
            label = _props$label === void 0 ? '' : _props$label,
            labels = props.labels,
            isDisabled = props.isDisabled;
        switch (action) {
            case 'deselect-option':
            case 'pop-value':
            case 'remove-value':
                return 'option '.concat(label, ', deselected.');
            case 'clear':
                return 'All selected options have been cleared.';
            case 'initial-input-focus':
                return 'option'.concat(labels.length > 1 ? 's' : '', ' ').concat(labels.join(','), ', selected.');
            case 'select-option':
                return isDisabled
                    ? 'option '.concat(label, ' is disabled. Select another option.')
                    : 'option '.concat(label, ', selected.');
            default:
                return '';
        }
    },
    onFocus: function onFocus(props) {
        var context = props.context,
            focused = props.focused,
            options2 = props.options,
            _props$label2 = props.label,
            label = _props$label2 === void 0 ? '' : _props$label2,
            selectValue = props.selectValue,
            isDisabled = props.isDisabled,
            isSelected = props.isSelected,
            isAppleDevice2 = props.isAppleDevice;
        var getArrayIndex = function getArrayIndex2(arr, item) {
            return arr && arr.length ? ''.concat(arr.indexOf(item) + 1, ' of ').concat(arr.length) : '';
        };
        if (context === 'value' && selectValue) {
            return 'value '.concat(label, ' focused, ').concat(getArrayIndex(selectValue, focused), '.');
        }
        if (context === 'menu' && isAppleDevice2) {
            var disabled = isDisabled ? ' disabled' : '';
            var status = ''.concat(isSelected ? ' selected' : '').concat(disabled);
            return ''.concat(label).concat(status, ', ').concat(getArrayIndex(options2, focused), '.');
        }
        return '';
    },
    onFilter: function onFilter(props) {
        var inputValue = props.inputValue,
            resultsMessage = props.resultsMessage;
        return ''.concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', '.');
    },
};
var LiveRegion = function LiveRegion2(props) {
    var ariaSelection = props.ariaSelection,
        focusedOption = props.focusedOption,
        focusedValue = props.focusedValue,
        focusableOptions = props.focusableOptions,
        isFocused = props.isFocused,
        selectValue = props.selectValue,
        selectProps = props.selectProps,
        id = props.id,
        isAppleDevice2 = props.isAppleDevice;
    var ariaLiveMessages = selectProps.ariaLiveMessages,
        getOptionLabel4 = selectProps.getOptionLabel,
        inputValue = selectProps.inputValue,
        isMulti = selectProps.isMulti,
        isOptionDisabled3 = selectProps.isOptionDisabled,
        isSearchable = selectProps.isSearchable,
        menuIsOpen = selectProps.menuIsOpen,
        options2 = selectProps.options,
        screenReaderStatus2 = selectProps.screenReaderStatus,
        tabSelectsValue = selectProps.tabSelectsValue,
        isLoading = selectProps.isLoading;
    var ariaLabel = selectProps['aria-label'];
    var ariaLive = selectProps['aria-live'];
    var messages = (0, import_react6.useMemo)(
        function () {
            return _objectSpread2(_objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
        },
        [ariaLiveMessages]
    );
    var ariaSelected = (0, import_react6.useMemo)(
        function () {
            var message = '';
            if (ariaSelection && messages.onChange) {
                var option = ariaSelection.option,
                    selectedOptions = ariaSelection.options,
                    removedValue = ariaSelection.removedValue,
                    removedValues = ariaSelection.removedValues,
                    value = ariaSelection.value;
                var asOption = function asOption2(val) {
                    return !Array.isArray(val) ? val : null;
                };
                var selected = removedValue || option || asOption(value);
                var label = selected ? getOptionLabel4(selected) : '';
                var multiSelected = selectedOptions || removedValues || void 0;
                var labels = multiSelected ? multiSelected.map(getOptionLabel4) : [];
                var onChangeProps = _objectSpread2(
                    {
                        // multiSelected items are usually items that have already been selected
                        // or set by the user as a default value so we assume they are not disabled
                        isDisabled: selected && isOptionDisabled3(selected, selectValue),
                        label,
                        labels,
                    },
                    ariaSelection
                );
                message = messages.onChange(onChangeProps);
            }
            return message;
        },
        [ariaSelection, messages, isOptionDisabled3, selectValue, getOptionLabel4]
    );
    var ariaFocused = (0, import_react6.useMemo)(
        function () {
            var focusMsg = '';
            var focused = focusedOption || focusedValue;
            var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
            if (focused && messages.onFocus) {
                var onFocusProps = {
                    focused,
                    label: getOptionLabel4(focused),
                    isDisabled: isOptionDisabled3(focused, selectValue),
                    isSelected,
                    options: focusableOptions,
                    context: focused === focusedOption ? 'menu' : 'value',
                    selectValue,
                    isAppleDevice: isAppleDevice2,
                };
                focusMsg = messages.onFocus(onFocusProps);
            }
            return focusMsg;
        },
        [
            focusedOption,
            focusedValue,
            getOptionLabel4,
            isOptionDisabled3,
            messages,
            focusableOptions,
            selectValue,
            isAppleDevice2,
        ]
    );
    var ariaResults = (0, import_react6.useMemo)(
        function () {
            var resultsMsg = '';
            if (menuIsOpen && options2.length && !isLoading && messages.onFilter) {
                var resultsMessage = screenReaderStatus2({
                    count: focusableOptions.length,
                });
                resultsMsg = messages.onFilter({
                    inputValue,
                    resultsMessage,
                });
            }
            return resultsMsg;
        },
        [focusableOptions, inputValue, menuIsOpen, messages, options2, screenReaderStatus2, isLoading]
    );
    var isInitialFocus =
        (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
    var ariaGuidance = (0, import_react6.useMemo)(
        function () {
            var guidanceMsg = '';
            if (messages.guidance) {
                var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
                guidanceMsg = messages.guidance({
                    'aria-label': ariaLabel,
                    context,
                    isDisabled: focusedOption && isOptionDisabled3(focusedOption, selectValue),
                    isMulti,
                    isSearchable,
                    tabSelectsValue,
                    isInitialFocus,
                });
            }
            return guidanceMsg;
        },
        [
            ariaLabel,
            focusedOption,
            focusedValue,
            isMulti,
            isOptionDisabled3,
            isSearchable,
            menuIsOpen,
            messages,
            selectValue,
            tabSelectsValue,
            isInitialFocus,
        ]
    );
    var ScreenReaderText = jsx(
        import_react6.Fragment,
        null,
        jsx(
            'span',
            {
                id: 'aria-selection',
            },
            ariaSelected
        ),
        jsx(
            'span',
            {
                id: 'aria-focused',
            },
            ariaFocused
        ),
        jsx(
            'span',
            {
                id: 'aria-results',
            },
            ariaResults
        ),
        jsx(
            'span',
            {
                id: 'aria-guidance',
            },
            ariaGuidance
        )
    );
    return jsx(
        import_react6.Fragment,
        null,
        jsx(
            A11yText$1,
            {
                id,
            },
            isInitialFocus && ScreenReaderText
        ),
        jsx(
            A11yText$1,
            {
                'aria-live': ariaLive,
                'aria-atomic': 'false',
                'aria-relevant': 'additions text',
                role: 'log',
            },
            isFocused && !isInitialFocus && ScreenReaderText
        )
    );
};
var LiveRegion$1 = LiveRegion;
var diacritics = [
    {
        base: 'A',
        letters: 'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ',
    },
    {
        base: 'AA',
        letters: 'Ꜳ',
    },
    {
        base: 'AE',
        letters: 'ÆǼǢ',
    },
    {
        base: 'AO',
        letters: 'Ꜵ',
    },
    {
        base: 'AU',
        letters: 'Ꜷ',
    },
    {
        base: 'AV',
        letters: 'ꜸꜺ',
    },
    {
        base: 'AY',
        letters: 'Ꜽ',
    },
    {
        base: 'B',
        letters: 'BⒷＢḂḄḆɃƂƁ',
    },
    {
        base: 'C',
        letters: 'CⒸＣĆĈĊČÇḈƇȻꜾ',
    },
    {
        base: 'D',
        letters: 'DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ',
    },
    {
        base: 'DZ',
        letters: 'ǱǄ',
    },
    {
        base: 'Dz',
        letters: 'ǲǅ',
    },
    {
        base: 'E',
        letters: 'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ',
    },
    {
        base: 'F',
        letters: 'FⒻＦḞƑꝻ',
    },
    {
        base: 'G',
        letters: 'GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ',
    },
    {
        base: 'H',
        letters: 'HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ',
    },
    {
        base: 'I',
        letters: 'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ',
    },
    {
        base: 'J',
        letters: 'JⒿＪĴɈ',
    },
    {
        base: 'K',
        letters: 'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ',
    },
    {
        base: 'L',
        letters: 'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ',
    },
    {
        base: 'LJ',
        letters: 'Ǉ',
    },
    {
        base: 'Lj',
        letters: 'ǈ',
    },
    {
        base: 'M',
        letters: 'MⓂＭḾṀṂⱮƜ',
    },
    {
        base: 'N',
        letters: 'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ',
    },
    {
        base: 'NJ',
        letters: 'Ǌ',
    },
    {
        base: 'Nj',
        letters: 'ǋ',
    },
    {
        base: 'O',
        letters: 'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ',
    },
    {
        base: 'OI',
        letters: 'Ƣ',
    },
    {
        base: 'OO',
        letters: 'Ꝏ',
    },
    {
        base: 'OU',
        letters: 'Ȣ',
    },
    {
        base: 'P',
        letters: 'PⓅＰṔṖƤⱣꝐꝒꝔ',
    },
    {
        base: 'Q',
        letters: 'QⓆＱꝖꝘɊ',
    },
    {
        base: 'R',
        letters: 'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ',
    },
    {
        base: 'S',
        letters: 'SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ',
    },
    {
        base: 'T',
        letters: 'TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ',
    },
    {
        base: 'TZ',
        letters: 'Ꜩ',
    },
    {
        base: 'U',
        letters: 'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ',
    },
    {
        base: 'V',
        letters: 'VⓋＶṼṾƲꝞɅ',
    },
    {
        base: 'VY',
        letters: 'Ꝡ',
    },
    {
        base: 'W',
        letters: 'WⓌＷẀẂŴẆẄẈⱲ',
    },
    {
        base: 'X',
        letters: 'XⓍＸẊẌ',
    },
    {
        base: 'Y',
        letters: 'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ',
    },
    {
        base: 'Z',
        letters: 'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ',
    },
    {
        base: 'a',
        letters: 'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ',
    },
    {
        base: 'aa',
        letters: 'ꜳ',
    },
    {
        base: 'ae',
        letters: 'æǽǣ',
    },
    {
        base: 'ao',
        letters: 'ꜵ',
    },
    {
        base: 'au',
        letters: 'ꜷ',
    },
    {
        base: 'av',
        letters: 'ꜹꜻ',
    },
    {
        base: 'ay',
        letters: 'ꜽ',
    },
    {
        base: 'b',
        letters: 'bⓑｂḃḅḇƀƃɓ',
    },
    {
        base: 'c',
        letters: 'cⓒｃćĉċčçḉƈȼꜿↄ',
    },
    {
        base: 'd',
        letters: 'dⓓｄḋďḍḑḓḏđƌɖɗꝺ',
    },
    {
        base: 'dz',
        letters: 'ǳǆ',
    },
    {
        base: 'e',
        letters: 'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ',
    },
    {
        base: 'f',
        letters: 'fⓕｆḟƒꝼ',
    },
    {
        base: 'g',
        letters: 'gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ',
    },
    {
        base: 'h',
        letters: 'hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ',
    },
    {
        base: 'hv',
        letters: 'ƕ',
    },
    {
        base: 'i',
        letters: 'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı',
    },
    {
        base: 'j',
        letters: 'jⓙｊĵǰɉ',
    },
    {
        base: 'k',
        letters: 'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ',
    },
    {
        base: 'l',
        letters: 'lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ',
    },
    {
        base: 'lj',
        letters: 'ǉ',
    },
    {
        base: 'm',
        letters: 'mⓜｍḿṁṃɱɯ',
    },
    {
        base: 'n',
        letters: 'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ',
    },
    {
        base: 'nj',
        letters: 'ǌ',
    },
    {
        base: 'o',
        letters: 'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ',
    },
    {
        base: 'oi',
        letters: 'ƣ',
    },
    {
        base: 'ou',
        letters: 'ȣ',
    },
    {
        base: 'oo',
        letters: 'ꝏ',
    },
    {
        base: 'p',
        letters: 'pⓟｐṕṗƥᵽꝑꝓꝕ',
    },
    {
        base: 'q',
        letters: 'qⓠｑɋꝗꝙ',
    },
    {
        base: 'r',
        letters: 'rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ',
    },
    {
        base: 's',
        letters: 'sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ',
    },
    {
        base: 't',
        letters: 'tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ',
    },
    {
        base: 'tz',
        letters: 'ꜩ',
    },
    {
        base: 'u',
        letters: 'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ',
    },
    {
        base: 'v',
        letters: 'vⓥｖṽṿʋꝟʌ',
    },
    {
        base: 'vy',
        letters: 'ꝡ',
    },
    {
        base: 'w',
        letters: 'wⓦｗẁẃŵẇẅẘẉⱳ',
    },
    {
        base: 'x',
        letters: 'xⓧｘẋẍ',
    },
    {
        base: 'y',
        letters: 'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ',
    },
    {
        base: 'z',
        letters: 'zⓩｚźẑżžẓẕƶȥɀⱬꝣ',
    },
];
var anyDiacritic = new RegExp(
    '[' +
        diacritics
            .map(function (d) {
                return d.letters;
            })
            .join('') +
        ']',
    'g'
);
var diacriticToBase = {};
for (i = 0; i < diacritics.length; i++) {
    diacritic = diacritics[i];
    for (j = 0; j < diacritic.letters.length; j++) {
        diacriticToBase[diacritic.letters[j]] = diacritic.base;
    }
}
var diacritic;
var j;
var i;
var stripDiacritics = function stripDiacritics2(str) {
    return str.replace(anyDiacritic, function (match2) {
        return diacriticToBase[match2];
    });
};
var memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);
var trimString = function trimString2(str) {
    return str.replace(/^\s+|\s+$/g, '');
};
var defaultStringify = function defaultStringify2(option) {
    return ''.concat(option.label, ' ').concat(option.value);
};
var createFilter = function createFilter2(config) {
    return function (option, rawInput) {
        if (option.data.__isNew__) return true;
        var _ignoreCase$ignoreAcc = _objectSpread2(
                {
                    ignoreCase: true,
                    ignoreAccents: true,
                    stringify: defaultStringify,
                    trim: true,
                    matchFrom: 'any',
                },
                config
            ),
            ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
            ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
            stringify2 = _ignoreCase$ignoreAcc.stringify,
            trim2 = _ignoreCase$ignoreAcc.trim,
            matchFrom = _ignoreCase$ignoreAcc.matchFrom;
        var input = trim2 ? trimString(rawInput) : rawInput;
        var candidate = trim2 ? trimString(stringify2(option)) : stringify2(option);
        if (ignoreCase) {
            input = input.toLowerCase();
            candidate = candidate.toLowerCase();
        }
        if (ignoreAccents) {
            input = memoizedStripDiacriticsForInput(input);
            candidate = stripDiacritics(candidate);
        }
        return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
    };
};
var _excluded4 = ['innerRef'];
function DummyInput(_ref3) {
    var innerRef = _ref3.innerRef,
        props = _objectWithoutProperties(_ref3, _excluded4);
    var filteredProps = removeProps(props, 'onExited', 'in', 'enter', 'exit', 'appear');
    return jsx(
        'input',
        _extends(
            {
                ref: innerRef,
            },
            filteredProps,
            {
                css: css(
                    {
                        label: 'dummyInput',
                        // get rid of any default styles
                        background: 0,
                        border: 0,
                        // important! this hides the flashing cursor
                        caretColor: 'transparent',
                        fontSize: 'inherit',
                        gridArea: '1 / 1 / 2 / 3',
                        outline: 0,
                        padding: 0,
                        // important! without `width` browsers won't allow focus
                        width: 1,
                        // remove cursor on desktop
                        color: 'transparent',
                        // remove cursor on mobile whilst maintaining "scroll into view" behaviour
                        left: -100,
                        opacity: 0,
                        position: 'relative',
                        transform: 'scale(.01)',
                    },
                    false ? '' : ';label:DummyInput;',
                    false
                        ? ''
                        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */'
                ),
            }
        )
    );
}
var cancelScroll = function cancelScroll2(event) {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
};
function useScrollCapture(_ref3) {
    var isEnabled = _ref3.isEnabled,
        onBottomArrive = _ref3.onBottomArrive,
        onBottomLeave = _ref3.onBottomLeave,
        onTopArrive = _ref3.onTopArrive,
        onTopLeave = _ref3.onTopLeave;
    var isBottom = (0, import_react6.useRef)(false);
    var isTop = (0, import_react6.useRef)(false);
    var touchStart = (0, import_react6.useRef)(0);
    var scrollTarget = (0, import_react6.useRef)(null);
    var handleEventDelta = (0, import_react6.useCallback)(
        function (event, delta) {
            if (scrollTarget.current === null) return;
            var _scrollTarget$current = scrollTarget.current,
                scrollTop = _scrollTarget$current.scrollTop,
                scrollHeight = _scrollTarget$current.scrollHeight,
                clientHeight = _scrollTarget$current.clientHeight;
            var target = scrollTarget.current;
            var isDeltaPositive = delta > 0;
            var availableScroll = scrollHeight - clientHeight - scrollTop;
            var shouldCancelScroll = false;
            if (availableScroll > delta && isBottom.current) {
                if (onBottomLeave) onBottomLeave(event);
                isBottom.current = false;
            }
            if (isDeltaPositive && isTop.current) {
                if (onTopLeave) onTopLeave(event);
                isTop.current = false;
            }
            if (isDeltaPositive && delta > availableScroll) {
                if (onBottomArrive && !isBottom.current) {
                    onBottomArrive(event);
                }
                target.scrollTop = scrollHeight;
                shouldCancelScroll = true;
                isBottom.current = true;
            } else if (!isDeltaPositive && -delta > scrollTop) {
                if (onTopArrive && !isTop.current) {
                    onTopArrive(event);
                }
                target.scrollTop = 0;
                shouldCancelScroll = true;
                isTop.current = true;
            }
            if (shouldCancelScroll) {
                cancelScroll(event);
            }
        },
        [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]
    );
    var onWheel = (0, import_react6.useCallback)(
        function (event) {
            handleEventDelta(event, event.deltaY);
        },
        [handleEventDelta]
    );
    var onTouchStart = (0, import_react6.useCallback)(function (event) {
        touchStart.current = event.changedTouches[0].clientY;
    }, []);
    var onTouchMove = (0, import_react6.useCallback)(
        function (event) {
            var deltaY = touchStart.current - event.changedTouches[0].clientY;
            handleEventDelta(event, deltaY);
        },
        [handleEventDelta]
    );
    var startListening = (0, import_react6.useCallback)(
        function (el) {
            if (!el) return;
            var notPassive = supportsPassiveEvents
                ? {
                      passive: false,
                  }
                : false;
            el.addEventListener('wheel', onWheel, notPassive);
            el.addEventListener('touchstart', onTouchStart, notPassive);
            el.addEventListener('touchmove', onTouchMove, notPassive);
        },
        [onTouchMove, onTouchStart, onWheel]
    );
    var stopListening = (0, import_react6.useCallback)(
        function (el) {
            if (!el) return;
            el.removeEventListener('wheel', onWheel, false);
            el.removeEventListener('touchstart', onTouchStart, false);
            el.removeEventListener('touchmove', onTouchMove, false);
        },
        [onTouchMove, onTouchStart, onWheel]
    );
    (0, import_react6.useEffect)(
        function () {
            if (!isEnabled) return;
            var element = scrollTarget.current;
            startListening(element);
            return function () {
                stopListening(element);
            };
        },
        [isEnabled, startListening, stopListening]
    );
    return function (element) {
        scrollTarget.current = element;
    };
}
var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
    boxSizing: 'border-box',
    // account for possible declaration `width: 100%;` on body
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
};
function preventTouchMove(e) {
    e.preventDefault();
}
function allowTouchMove(e) {
    e.stopPropagation();
}
function preventInertiaScroll() {
    var top = this.scrollTop;
    var totalScroll = this.scrollHeight;
    var currentScroll = top + this.offsetHeight;
    if (top === 0) {
        this.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
        this.scrollTop = top - 1;
    }
}
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
    capture: false,
    passive: false,
};
function useScrollLock(_ref3) {
    var isEnabled = _ref3.isEnabled,
        _ref$accountForScroll = _ref3.accountForScrollbars,
        accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
    var originalStyles = (0, import_react6.useRef)({});
    var scrollTarget = (0, import_react6.useRef)(null);
    var addScrollLock = (0, import_react6.useCallback)(
        function (touchScrollTarget) {
            if (!canUseDOM) return;
            var target = document.body;
            var targetStyle = target && target.style;
            if (accountForScrollbars) {
                STYLE_KEYS.forEach(function (key) {
                    var val = targetStyle && targetStyle[key];
                    originalStyles.current[key] = val;
                });
            }
            if (accountForScrollbars && activeScrollLocks < 1) {
                var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
                var clientWidth = document.body ? document.body.clientWidth : 0;
                var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
                Object.keys(LOCK_STYLES).forEach(function (key) {
                    var val = LOCK_STYLES[key];
                    if (targetStyle) {
                        targetStyle[key] = val;
                    }
                });
                if (targetStyle) {
                    targetStyle.paddingRight = ''.concat(adjustedPadding, 'px');
                }
            }
            if (target && isTouchDevice()) {
                target.addEventListener('touchmove', preventTouchMove, listenerOptions);
                if (touchScrollTarget) {
                    touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
                    touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
                }
            }
            activeScrollLocks += 1;
        },
        [accountForScrollbars]
    );
    var removeScrollLock = (0, import_react6.useCallback)(
        function (touchScrollTarget) {
            if (!canUseDOM) return;
            var target = document.body;
            var targetStyle = target && target.style;
            activeScrollLocks = Math.max(activeScrollLocks - 1, 0);
            if (accountForScrollbars && activeScrollLocks < 1) {
                STYLE_KEYS.forEach(function (key) {
                    var val = originalStyles.current[key];
                    if (targetStyle) {
                        targetStyle[key] = val;
                    }
                });
            }
            if (target && isTouchDevice()) {
                target.removeEventListener('touchmove', preventTouchMove, listenerOptions);
                if (touchScrollTarget) {
                    touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
                    touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
                }
            }
        },
        [accountForScrollbars]
    );
    (0, import_react6.useEffect)(
        function () {
            if (!isEnabled) return;
            var element = scrollTarget.current;
            addScrollLock(element);
            return function () {
                removeScrollLock(element);
            };
        },
        [isEnabled, addScrollLock, removeScrollLock]
    );
    return function (element) {
        scrollTarget.current = element;
    };
}
function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
    return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var blurSelectInput = function blurSelectInput2(event) {
    var element = event.target;
    return element.ownerDocument.activeElement && element.ownerDocument.activeElement.blur();
};
var _ref2$1 = false
    ? {
          name: '1kfdb0e',
          styles: 'position:fixed;left:0;bottom:0;right:0;top:0',
      }
    : {
          name: 'bp8cua-ScrollManager',
          styles: 'position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;',
          map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9EVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2ssIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9IChldmVudDogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgIChlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3JvbGxNYW5hZ2VyKHtcbiAgY2hpbGRyZW4sXG4gIGxvY2tFbmFibGVkLFxuICBjYXB0dXJlRW5hYmxlZCA9IHRydWUsXG4gIG9uQm90dG9tQXJyaXZlLFxuICBvbkJvdHRvbUxlYXZlLFxuICBvblRvcEFycml2ZSxcbiAgb25Ub3BMZWF2ZSxcbn06IFByb3BzKSB7XG4gIGNvbnN0IHNldFNjcm9sbENhcHR1cmVUYXJnZXQgPSB1c2VTY3JvbGxDYXB0dXJlKHtcbiAgICBpc0VuYWJsZWQ6IGNhcHR1cmVFbmFibGVkLFxuICAgIG9uQm90dG9tQXJyaXZlLFxuICAgIG9uQm90dG9tTGVhdmUsXG4gICAgb25Ub3BBcnJpdmUsXG4gICAgb25Ub3BMZWF2ZSxcbiAgfSk7XG4gIGNvbnN0IHNldFNjcm9sbExvY2tUYXJnZXQgPSB1c2VTY3JvbGxMb2NrKHsgaXNFbmFibGVkOiBsb2NrRW5hYmxlZCB9KTtcblxuICBjb25zdCB0YXJnZXRSZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PiA9IChlbGVtZW50KSA9PiB7XG4gICAgc2V0U2Nyb2xsQ2FwdHVyZVRhcmdldChlbGVtZW50KTtcbiAgICBzZXRTY3JvbGxMb2NrVGFyZ2V0KGVsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2xvY2tFbmFibGVkICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e2JsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtjaGlsZHJlbih0YXJnZXRSZWYpfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXX0= */',
          toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1,
      };
function ScrollManager(_ref3) {
    var children = _ref3.children,
        lockEnabled = _ref3.lockEnabled,
        _ref$captureEnabled = _ref3.captureEnabled,
        captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
        onBottomArrive = _ref3.onBottomArrive,
        onBottomLeave = _ref3.onBottomLeave,
        onTopArrive = _ref3.onTopArrive,
        onTopLeave = _ref3.onTopLeave;
    var setScrollCaptureTarget = useScrollCapture({
        isEnabled: captureEnabled,
        onBottomArrive,
        onBottomLeave,
        onTopArrive,
        onTopLeave,
    });
    var setScrollLockTarget = useScrollLock({
        isEnabled: lockEnabled,
    });
    var targetRef = function targetRef2(element) {
        setScrollCaptureTarget(element);
        setScrollLockTarget(element);
    };
    return jsx(
        import_react6.Fragment,
        null,
        lockEnabled &&
            jsx('div', {
                onClick: blurSelectInput,
                css: _ref2$1,
            }),
        children(targetRef)
    );
}
function _EMOTION_STRINGIFIED_CSS_ERROR__2() {
    return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref22 = false
    ? {
          name: '1a0ro4n-requiredInput',
          styles: 'label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%',
      }
    : {
          name: '5kkxb2-requiredInput-RequiredInput',
          styles: 'label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;',
          map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */',
          toString: _EMOTION_STRINGIFIED_CSS_ERROR__2,
      };
var RequiredInput = function RequiredInput2(_ref3) {
    var name = _ref3.name,
        onFocus2 = _ref3.onFocus;
    return jsx('input', {
        required: true,
        name,
        tabIndex: -1,
        'aria-hidden': 'true',
        onFocus: onFocus2,
        css: _ref22,
        value: '',
        onChange: function onChange2() {},
    });
};
var RequiredInput$1 = RequiredInput;
function testPlatform(re) {
    var _window$navigator$use;
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(
              ((_window$navigator$use = window.navigator['userAgentData']) === null || _window$navigator$use === void 0
                  ? void 0
                  : _window$navigator$use.platform) || window.navigator.platform
          )
        : false;
}
function isIPhone() {
    return testPlatform(/^iPhone/i);
}
function isMac() {
    return testPlatform(/^Mac/i);
}
function isIPad() {
    return (
        testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1)
    );
}
function isIOS() {
    return isIPhone() || isIPad();
}
function isAppleDevice() {
    return isMac() || isIOS();
}
var formatGroupLabel = function formatGroupLabel2(group) {
    return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
    return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
    return option.value;
};
var isOptionDisabled = function isOptionDisabled2(option) {
    return !!option.isDisabled;
};
var defaultStyles = {
    clearIndicator: clearIndicatorCSS,
    container: containerCSS,
    control: css$1,
    dropdownIndicator: dropdownIndicatorCSS,
    group: groupCSS,
    groupHeading: groupHeadingCSS,
    indicatorsContainer: indicatorsContainerCSS,
    indicatorSeparator: indicatorSeparatorCSS,
    input: inputCSS,
    loadingIndicator: loadingIndicatorCSS,
    loadingMessage: loadingMessageCSS,
    menu: menuCSS,
    menuList: menuListCSS,
    menuPortal: menuPortalCSS,
    multiValue: multiValueCSS,
    multiValueLabel: multiValueLabelCSS,
    multiValueRemove: multiValueRemoveCSS,
    noOptionsMessage: noOptionsMessageCSS,
    option: optionCSS,
    placeholder: placeholderCSS,
    singleValue: css3,
    valueContainer: valueContainerCSS,
};
function mergeStyles(source) {
    var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var styles = _objectSpread2({}, source);
    Object.keys(target).forEach(function (keyAsString) {
        var key = keyAsString;
        if (source[key]) {
            styles[key] = function (rsCss, props) {
                return target[key](source[key](rsCss, props), props);
            };
        } else {
            styles[key] = target[key];
        }
    });
    return styles;
}
var colors = {
    primary: '#2684FF',
    primary75: '#4C9AFF',
    primary50: '#B2D4FF',
    primary25: '#DEEBFF',
    danger: '#DE350B',
    dangerLight: '#FFBDAD',
    neutral0: 'hsl(0, 0%, 100%)',
    neutral5: 'hsl(0, 0%, 95%)',
    neutral10: 'hsl(0, 0%, 90%)',
    neutral20: 'hsl(0, 0%, 80%)',
    neutral30: 'hsl(0, 0%, 70%)',
    neutral40: 'hsl(0, 0%, 60%)',
    neutral50: 'hsl(0, 0%, 50%)',
    neutral60: 'hsl(0, 0%, 40%)',
    neutral70: 'hsl(0, 0%, 30%)',
    neutral80: 'hsl(0, 0%, 20%)',
    neutral90: 'hsl(0, 0%, 10%)',
};
var borderRadius = 4;
var baseUnit = 4;
var controlHeight = 38;
var menuGutter = baseUnit * 2;
var spacing = {
    baseUnit,
    controlHeight,
    menuGutter,
};
var defaultTheme = {
    borderRadius,
    colors,
    spacing,
};
var defaultProps = {
    'aria-live': 'polite',
    backspaceRemovesValue: true,
    blurInputOnSelect: isTouchCapable(),
    captureMenuScroll: !isTouchCapable(),
    classNames: {},
    closeMenuOnSelect: true,
    closeMenuOnScroll: false,
    components: {},
    controlShouldRenderValue: true,
    escapeClearsValue: false,
    filterOption: createFilter(),
    formatGroupLabel,
    getOptionLabel: getOptionLabel$1,
    getOptionValue: getOptionValue$1,
    isDisabled: false,
    isLoading: false,
    isMulti: false,
    isRtl: false,
    isSearchable: true,
    isOptionDisabled,
    loadingMessage: function loadingMessage() {
        return 'Loading...';
    },
    maxMenuHeight: 300,
    minMenuHeight: 140,
    menuIsOpen: false,
    menuPlacement: 'bottom',
    menuPosition: 'absolute',
    menuShouldBlockScroll: false,
    menuShouldScrollIntoView: !isMobileDevice(),
    noOptionsMessage: function noOptionsMessage() {
        return 'No options';
    },
    openMenuOnFocus: false,
    openMenuOnClick: true,
    options: [],
    pageSize: 5,
    placeholder: 'Select...',
    screenReaderStatus: function screenReaderStatus(_ref3) {
        var count = _ref3.count;
        return ''.concat(count, ' result').concat(count !== 1 ? 's' : '', ' available');
    },
    styles: {},
    tabIndex: 0,
    tabSelectsValue: true,
    unstyled: false,
};
function toCategorizedOption(props, option, selectValue, index2) {
    var isDisabled = _isOptionDisabled(props, option, selectValue);
    var isSelected = _isOptionSelected(props, option, selectValue);
    var label = getOptionLabel2(props, option);
    var value = getOptionValue2(props, option);
    return {
        type: 'option',
        data: option,
        isDisabled,
        isSelected,
        label,
        value,
        index: index2,
    };
}
function buildCategorizedOptions(props, selectValue) {
    return props.options
        .map(function (groupOrOption, groupOrOptionIndex) {
            if ('options' in groupOrOption) {
                var categorizedOptions = groupOrOption.options
                    .map(function (option, optionIndex) {
                        return toCategorizedOption(props, option, selectValue, optionIndex);
                    })
                    .filter(function (categorizedOption2) {
                        return isFocusable(props, categorizedOption2);
                    });
                return categorizedOptions.length > 0
                    ? {
                          type: 'group',
                          data: groupOrOption,
                          options: categorizedOptions,
                          index: groupOrOptionIndex,
                      }
                    : void 0;
            }
            var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
            return isFocusable(props, categorizedOption) ? categorizedOption : void 0;
        })
        .filter(notNullish);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
    return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
        if (categorizedOption.type === 'group') {
            optionsAccumulator.push.apply(
                optionsAccumulator,
                _toConsumableArray(
                    categorizedOption.options.map(function (option) {
                        return option.data;
                    })
                )
            );
        } else {
            optionsAccumulator.push(categorizedOption.data);
        }
        return optionsAccumulator;
    }, []);
}
function buildFocusableOptionsWithIds(categorizedOptions, optionId) {
    return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
        if (categorizedOption.type === 'group') {
            optionsAccumulator.push.apply(
                optionsAccumulator,
                _toConsumableArray(
                    categorizedOption.options.map(function (option) {
                        return {
                            data: option.data,
                            id: ''.concat(optionId, '-').concat(categorizedOption.index, '-').concat(option.index),
                        };
                    })
                )
            );
        } else {
            optionsAccumulator.push({
                data: categorizedOption.data,
                id: ''.concat(optionId, '-').concat(categorizedOption.index),
            });
        }
        return optionsAccumulator;
    }, []);
}
function buildFocusableOptions(props, selectValue) {
    return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
    var _props$inputValue = props.inputValue,
        inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
    var data = categorizedOption.data,
        isSelected = categorizedOption.isSelected,
        label = categorizedOption.label,
        value = categorizedOption.value;
    return (
        (!shouldHideSelectedOptions(props) || !isSelected) &&
        _filterOption(
            props,
            {
                label,
                value,
                data,
            },
            inputValue
        )
    );
}
function getNextFocusedValue(state, nextSelectValue) {
    var focusedValue = state.focusedValue,
        lastSelectValue = state.selectValue;
    var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
    if (lastFocusedIndex > -1) {
        var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
        if (nextFocusedIndex > -1) {
            return focusedValue;
        } else if (lastFocusedIndex < nextSelectValue.length) {
            return nextSelectValue[lastFocusedIndex];
        }
    }
    return null;
}
function getNextFocusedOption(state, options2) {
    var lastFocusedOption = state.focusedOption;
    return lastFocusedOption && options2.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options2[0];
}
var getFocusedOptionId = function getFocusedOptionId2(focusableOptionsWithIds, focusedOption) {
    var _focusableOptionsWith;
    var focusedOptionId =
        (_focusableOptionsWith = focusableOptionsWithIds.find(function (option) {
            return option.data === focusedOption;
        })) === null || _focusableOptionsWith === void 0
            ? void 0
            : _focusableOptionsWith.id;
    return focusedOptionId || null;
};
var getOptionLabel2 = function getOptionLabel3(props, data) {
    return props.getOptionLabel(data);
};
var getOptionValue2 = function getOptionValue3(props, data) {
    return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
    return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
    if (selectValue.indexOf(option) > -1) return true;
    if (typeof props.isOptionSelected === 'function') {
        return props.isOptionSelected(option, selectValue);
    }
    var candidate = getOptionValue2(props, option);
    return selectValue.some(function (i) {
        return getOptionValue2(props, i) === candidate;
    });
}
function _filterOption(props, option, inputValue) {
    return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions2(props) {
    var hideSelectedOptions = props.hideSelectedOptions,
        isMulti = props.isMulti;
    if (hideSelectedOptions === void 0) return isMulti;
    return hideSelectedOptions;
};
var instanceId = 1;
var Select = (function (_Component) {
    _inherits(Select2, _Component);
    var _super = _createSuper(Select2);
    function Select2(_props) {
        var _this;
        _classCallCheck(this, Select2);
        _this = _super.call(this, _props);
        _this.state = {
            ariaSelection: null,
            focusedOption: null,
            focusedOptionId: null,
            focusableOptionsWithIds: [],
            focusedValue: null,
            inputIsHidden: false,
            isFocused: false,
            selectValue: [],
            clearFocusValueOnUpdate: false,
            prevWasFocused: false,
            inputIsHiddenAfterUpdate: void 0,
            prevProps: void 0,
            instancePrefix: '',
        };
        _this.blockOptionHover = false;
        _this.isComposing = false;
        _this.commonProps = void 0;
        _this.initialTouchX = 0;
        _this.initialTouchY = 0;
        _this.openAfterFocus = false;
        _this.scrollToFocusedOptionOnUpdate = false;
        _this.userIsDragging = void 0;
        _this.isAppleDevice = isAppleDevice();
        _this.controlRef = null;
        _this.getControlRef = function (ref) {
            _this.controlRef = ref;
        };
        _this.focusedOptionRef = null;
        _this.getFocusedOptionRef = function (ref) {
            _this.focusedOptionRef = ref;
        };
        _this.menuListRef = null;
        _this.getMenuListRef = function (ref) {
            _this.menuListRef = ref;
        };
        _this.inputRef = null;
        _this.getInputRef = function (ref) {
            _this.inputRef = ref;
        };
        _this.focus = _this.focusInput;
        _this.blur = _this.blurInput;
        _this.onChange = function (newValue, actionMeta) {
            var _this$props = _this.props,
                onChange2 = _this$props.onChange,
                name = _this$props.name;
            actionMeta.name = name;
            _this.ariaOnChange(newValue, actionMeta);
            onChange2(newValue, actionMeta);
        };
        _this.setValue = function (newValue, action, option) {
            var _this$props2 = _this.props,
                closeMenuOnSelect = _this$props2.closeMenuOnSelect,
                isMulti = _this$props2.isMulti,
                inputValue = _this$props2.inputValue;
            _this.onInputChange('', {
                action: 'set-value',
                prevInputValue: inputValue,
            });
            if (closeMenuOnSelect) {
                _this.setState({
                    inputIsHiddenAfterUpdate: !isMulti,
                });
                _this.onMenuClose();
            }
            _this.setState({
                clearFocusValueOnUpdate: true,
            });
            _this.onChange(newValue, {
                action,
                option,
            });
        };
        _this.selectOption = function (newValue) {
            var _this$props3 = _this.props,
                blurInputOnSelect = _this$props3.blurInputOnSelect,
                isMulti = _this$props3.isMulti,
                name = _this$props3.name;
            var selectValue = _this.state.selectValue;
            var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
            var isDisabled = _this.isOptionDisabled(newValue, selectValue);
            if (deselected) {
                var candidate = _this.getOptionValue(newValue);
                _this.setValue(
                    multiValueAsValue(
                        selectValue.filter(function (i) {
                            return _this.getOptionValue(i) !== candidate;
                        })
                    ),
                    'deselect-option',
                    newValue
                );
            } else if (!isDisabled) {
                if (isMulti) {
                    _this.setValue(
                        multiValueAsValue([].concat(_toConsumableArray(selectValue), [newValue])),
                        'select-option',
                        newValue
                    );
                } else {
                    _this.setValue(singleValueAsValue(newValue), 'select-option');
                }
            } else {
                _this.ariaOnChange(singleValueAsValue(newValue), {
                    action: 'select-option',
                    option: newValue,
                    name,
                });
                return;
            }
            if (blurInputOnSelect) {
                _this.blurInput();
            }
        };
        _this.removeValue = function (removedValue) {
            var isMulti = _this.props.isMulti;
            var selectValue = _this.state.selectValue;
            var candidate = _this.getOptionValue(removedValue);
            var newValueArray = selectValue.filter(function (i) {
                return _this.getOptionValue(i) !== candidate;
            });
            var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
            _this.onChange(newValue, {
                action: 'remove-value',
                removedValue,
            });
            _this.focusInput();
        };
        _this.clearValue = function () {
            var selectValue = _this.state.selectValue;
            _this.onChange(valueTernary(_this.props.isMulti, [], null), {
                action: 'clear',
                removedValues: selectValue,
            });
        };
        _this.popValue = function () {
            var isMulti = _this.props.isMulti;
            var selectValue = _this.state.selectValue;
            var lastSelectedValue = selectValue[selectValue.length - 1];
            var newValueArray = selectValue.slice(0, selectValue.length - 1);
            var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
            _this.onChange(newValue, {
                action: 'pop-value',
                removedValue: lastSelectedValue,
            });
        };
        _this.getFocusedOptionId = function (focusedOption) {
            return getFocusedOptionId(_this.state.focusableOptionsWithIds, focusedOption);
        };
        _this.getFocusableOptionsWithIds = function () {
            return buildFocusableOptionsWithIds(
                buildCategorizedOptions(_this.props, _this.state.selectValue),
                _this.getElementId('option')
            );
        };
        _this.getValue = function () {
            return _this.state.selectValue;
        };
        _this.cx = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return classNames.apply(void 0, [_this.props.classNamePrefix].concat(args));
        };
        _this.getOptionLabel = function (data) {
            return getOptionLabel2(_this.props, data);
        };
        _this.getOptionValue = function (data) {
            return getOptionValue2(_this.props, data);
        };
        _this.getStyles = function (key, props) {
            var unstyled = _this.props.unstyled;
            var base = defaultStyles[key](props, unstyled);
            base.boxSizing = 'border-box';
            var custom = _this.props.styles[key];
            return custom ? custom(base, props) : base;
        };
        _this.getClassNames = function (key, props) {
            var _this$props$className, _this$props$className2;
            return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null ||
                _this$props$className === void 0
                ? void 0
                : _this$props$className.call(_this$props$className2, props);
        };
        _this.getElementId = function (element) {
            return ''.concat(_this.state.instancePrefix, '-').concat(element);
        };
        _this.getComponents = function () {
            return defaultComponents(_this.props);
        };
        _this.buildCategorizedOptions = function () {
            return buildCategorizedOptions(_this.props, _this.state.selectValue);
        };
        _this.getCategorizedOptions = function () {
            return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
        };
        _this.buildFocusableOptions = function () {
            return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
        };
        _this.getFocusableOptions = function () {
            return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
        };
        _this.ariaOnChange = function (value, actionMeta) {
            _this.setState({
                ariaSelection: _objectSpread2(
                    {
                        value,
                    },
                    actionMeta
                ),
            });
        };
        _this.onMenuMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            _this.focusInput();
        };
        _this.onMenuMouseMove = function (event) {
            _this.blockOptionHover = false;
        };
        _this.onControlMouseDown = function (event) {
            if (event.defaultPrevented) {
                return;
            }
            var openMenuOnClick = _this.props.openMenuOnClick;
            if (!_this.state.isFocused) {
                if (openMenuOnClick) {
                    _this.openAfterFocus = true;
                }
                _this.focusInput();
            } else if (!_this.props.menuIsOpen) {
                if (openMenuOnClick) {
                    _this.openMenu('first');
                }
            } else {
                if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                    _this.onMenuClose();
                }
            }
            if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
            }
        };
        _this.onDropdownIndicatorMouseDown = function (event) {
            if (event && event.type === 'mousedown' && event.button !== 0) {
                return;
            }
            if (_this.props.isDisabled) return;
            var _this$props4 = _this.props,
                isMulti = _this$props4.isMulti,
                menuIsOpen = _this$props4.menuIsOpen;
            _this.focusInput();
            if (menuIsOpen) {
                _this.setState({
                    inputIsHiddenAfterUpdate: !isMulti,
                });
                _this.onMenuClose();
            } else {
                _this.openMenu('first');
            }
            event.preventDefault();
        };
        _this.onClearIndicatorMouseDown = function (event) {
            if (event && event.type === 'mousedown' && event.button !== 0) {
                return;
            }
            _this.clearValue();
            event.preventDefault();
            _this.openAfterFocus = false;
            if (event.type === 'touchend') {
                _this.focusInput();
            } else {
                setTimeout(function () {
                    return _this.focusInput();
                });
            }
        };
        _this.onScroll = function (event) {
            if (typeof _this.props.closeMenuOnScroll === 'boolean') {
                if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
                    _this.props.onMenuClose();
                }
            } else if (typeof _this.props.closeMenuOnScroll === 'function') {
                if (_this.props.closeMenuOnScroll(event)) {
                    _this.props.onMenuClose();
                }
            }
        };
        _this.onCompositionStart = function () {
            _this.isComposing = true;
        };
        _this.onCompositionEnd = function () {
            _this.isComposing = false;
        };
        _this.onTouchStart = function (_ref23) {
            var touches = _ref23.touches;
            var touch = touches && touches.item(0);
            if (!touch) {
                return;
            }
            _this.initialTouchX = touch.clientX;
            _this.initialTouchY = touch.clientY;
            _this.userIsDragging = false;
        };
        _this.onTouchMove = function (_ref3) {
            var touches = _ref3.touches;
            var touch = touches && touches.item(0);
            if (!touch) {
                return;
            }
            var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
            var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
            var moveThreshold = 5;
            _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
        };
        _this.onTouchEnd = function (event) {
            if (_this.userIsDragging) return;
            if (
                _this.controlRef &&
                !_this.controlRef.contains(event.target) &&
                _this.menuListRef &&
                !_this.menuListRef.contains(event.target)
            ) {
                _this.blurInput();
            }
            _this.initialTouchX = 0;
            _this.initialTouchY = 0;
        };
        _this.onControlTouchEnd = function (event) {
            if (_this.userIsDragging) return;
            _this.onControlMouseDown(event);
        };
        _this.onClearIndicatorTouchEnd = function (event) {
            if (_this.userIsDragging) return;
            _this.onClearIndicatorMouseDown(event);
        };
        _this.onDropdownIndicatorTouchEnd = function (event) {
            if (_this.userIsDragging) return;
            _this.onDropdownIndicatorMouseDown(event);
        };
        _this.handleInputChange = function (event) {
            var prevInputValue = _this.props.inputValue;
            var inputValue = event.currentTarget.value;
            _this.setState({
                inputIsHiddenAfterUpdate: false,
            });
            _this.onInputChange(inputValue, {
                action: 'input-change',
                prevInputValue,
            });
            if (!_this.props.menuIsOpen) {
                _this.onMenuOpen();
            }
        };
        _this.onInputFocus = function (event) {
            if (_this.props.onFocus) {
                _this.props.onFocus(event);
            }
            _this.setState({
                inputIsHiddenAfterUpdate: false,
                isFocused: true,
            });
            if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
                _this.openMenu('first');
            }
            _this.openAfterFocus = false;
        };
        _this.onInputBlur = function (event) {
            var prevInputValue = _this.props.inputValue;
            if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
                _this.inputRef.focus();
                return;
            }
            if (_this.props.onBlur) {
                _this.props.onBlur(event);
            }
            _this.onInputChange('', {
                action: 'input-blur',
                prevInputValue,
            });
            _this.onMenuClose();
            _this.setState({
                focusedValue: null,
                isFocused: false,
            });
        };
        _this.onOptionHover = function (focusedOption) {
            if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
                return;
            }
            var options2 = _this.getFocusableOptions();
            var focusedOptionIndex = options2.indexOf(focusedOption);
            _this.setState({
                focusedOption,
                focusedOptionId: focusedOptionIndex > -1 ? _this.getFocusedOptionId(focusedOption) : null,
            });
        };
        _this.shouldHideSelectedOptions = function () {
            return shouldHideSelectedOptions(_this.props);
        };
        _this.onValueInputFocus = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.focus();
        };
        _this.onKeyDown = function (event) {
            var _this$props5 = _this.props,
                isMulti = _this$props5.isMulti,
                backspaceRemovesValue = _this$props5.backspaceRemovesValue,
                escapeClearsValue = _this$props5.escapeClearsValue,
                inputValue = _this$props5.inputValue,
                isClearable = _this$props5.isClearable,
                isDisabled = _this$props5.isDisabled,
                menuIsOpen = _this$props5.menuIsOpen,
                onKeyDown = _this$props5.onKeyDown,
                tabSelectsValue = _this$props5.tabSelectsValue,
                openMenuOnFocus = _this$props5.openMenuOnFocus;
            var _this$state = _this.state,
                focusedOption = _this$state.focusedOption,
                focusedValue = _this$state.focusedValue,
                selectValue = _this$state.selectValue;
            if (isDisabled) return;
            if (typeof onKeyDown === 'function') {
                onKeyDown(event);
                if (event.defaultPrevented) {
                    return;
                }
            }
            _this.blockOptionHover = true;
            switch (event.key) {
                case 'ArrowLeft':
                    if (!isMulti || inputValue) return;
                    _this.focusValue('previous');
                    break;
                case 'ArrowRight':
                    if (!isMulti || inputValue) return;
                    _this.focusValue('next');
                    break;
                case 'Delete':
                case 'Backspace':
                    if (inputValue) return;
                    if (focusedValue) {
                        _this.removeValue(focusedValue);
                    } else {
                        if (!backspaceRemovesValue) return;
                        if (isMulti) {
                            _this.popValue();
                        } else if (isClearable) {
                            _this.clearValue();
                        }
                    }
                    break;
                case 'Tab':
                    if (_this.isComposing) return;
                    if (
                        event.shiftKey ||
                        !menuIsOpen ||
                        !tabSelectsValue ||
                        !focusedOption || // don't capture the event if the menu opens on focus and the focused
                        // option is already selected; it breaks the flow of navigation
                        (openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue))
                    ) {
                        return;
                    }
                    _this.selectOption(focusedOption);
                    break;
                case 'Enter':
                    if (event.keyCode === 229) {
                        break;
                    }
                    if (menuIsOpen) {
                        if (!focusedOption) return;
                        if (_this.isComposing) return;
                        _this.selectOption(focusedOption);
                        break;
                    }
                    return;
                case 'Escape':
                    if (menuIsOpen) {
                        _this.setState({
                            inputIsHiddenAfterUpdate: false,
                        });
                        _this.onInputChange('', {
                            action: 'menu-close',
                            prevInputValue: inputValue,
                        });
                        _this.onMenuClose();
                    } else if (isClearable && escapeClearsValue) {
                        _this.clearValue();
                    }
                    break;
                case ' ':
                    if (inputValue) {
                        return;
                    }
                    if (!menuIsOpen) {
                        _this.openMenu('first');
                        break;
                    }
                    if (!focusedOption) return;
                    _this.selectOption(focusedOption);
                    break;
                case 'ArrowUp':
                    if (menuIsOpen) {
                        _this.focusOption('up');
                    } else {
                        _this.openMenu('last');
                    }
                    break;
                case 'ArrowDown':
                    if (menuIsOpen) {
                        _this.focusOption('down');
                    } else {
                        _this.openMenu('first');
                    }
                    break;
                case 'PageUp':
                    if (!menuIsOpen) return;
                    _this.focusOption('pageup');
                    break;
                case 'PageDown':
                    if (!menuIsOpen) return;
                    _this.focusOption('pagedown');
                    break;
                case 'Home':
                    if (!menuIsOpen) return;
                    _this.focusOption('first');
                    break;
                case 'End':
                    if (!menuIsOpen) return;
                    _this.focusOption('last');
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
        _this.state.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
        _this.state.selectValue = cleanValue(_props.value);
        if (_props.menuIsOpen && _this.state.selectValue.length) {
            var focusableOptionsWithIds = _this.getFocusableOptionsWithIds();
            var focusableOptions = _this.buildFocusableOptions();
            var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
            _this.state.focusableOptionsWithIds = focusableOptionsWithIds;
            _this.state.focusedOption = focusableOptions[optionIndex];
            _this.state.focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusableOptions[optionIndex]);
        }
        return _this;
    }
    _createClass(
        Select2,
        [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.startListeningComposition();
                    this.startListeningToTouch();
                    if (this.props.closeMenuOnScroll && document && document.addEventListener) {
                        document.addEventListener('scroll', this.onScroll, true);
                    }
                    if (this.props.autoFocus) {
                        this.focusInput();
                    }
                    if (
                        this.props.menuIsOpen &&
                        this.state.focusedOption &&
                        this.menuListRef &&
                        this.focusedOptionRef
                    ) {
                        scrollIntoView(this.menuListRef, this.focusedOptionRef);
                    }
                },
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate(prevProps) {
                    var _this$props6 = this.props,
                        isDisabled = _this$props6.isDisabled,
                        menuIsOpen = _this$props6.menuIsOpen;
                    var isFocused = this.state.isFocused;
                    if (
                        // ensure focus is restored correctly when the control becomes enabled
                        (isFocused && !isDisabled && prevProps.isDisabled) || // ensure focus is on the Input when the menu opens
                        (isFocused && menuIsOpen && !prevProps.menuIsOpen)
                    ) {
                        this.focusInput();
                    }
                    if (isFocused && isDisabled && !prevProps.isDisabled) {
                        this.setState(
                            {
                                isFocused: false,
                            },
                            this.onMenuClose
                        );
                    } else if (
                        !isFocused &&
                        !isDisabled &&
                        prevProps.isDisabled &&
                        this.inputRef === document.activeElement
                    ) {
                        this.setState({
                            isFocused: true,
                        });
                    }
                    if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
                        scrollIntoView(this.menuListRef, this.focusedOptionRef);
                        this.scrollToFocusedOptionOnUpdate = false;
                    }
                },
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.stopListeningComposition();
                    this.stopListeningToTouch();
                    document.removeEventListener('scroll', this.onScroll, true);
                },
                // ==============================
                // Consumer Handlers
                // ==============================
            },
            {
                key: 'onMenuOpen',
                value: function onMenuOpen() {
                    this.props.onMenuOpen();
                },
            },
            {
                key: 'onMenuClose',
                value: function onMenuClose() {
                    this.onInputChange('', {
                        action: 'menu-close',
                        prevInputValue: this.props.inputValue,
                    });
                    this.props.onMenuClose();
                },
            },
            {
                key: 'onInputChange',
                value: function onInputChange(newValue, actionMeta) {
                    this.props.onInputChange(newValue, actionMeta);
                },
                // ==============================
                // Methods
                // ==============================
            },
            {
                key: 'focusInput',
                value: function focusInput() {
                    if (!this.inputRef) return;
                    this.inputRef.focus();
                },
            },
            {
                key: 'blurInput',
                value: function blurInput() {
                    if (!this.inputRef) return;
                    this.inputRef.blur();
                },
                // aliased for consumers
            },
            {
                key: 'openMenu',
                value: function openMenu(focusOption) {
                    var _this2 = this;
                    var _this$state2 = this.state,
                        selectValue = _this$state2.selectValue,
                        isFocused = _this$state2.isFocused;
                    var focusableOptions = this.buildFocusableOptions();
                    var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;
                    if (!this.props.isMulti) {
                        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
                        if (selectedIndex > -1) {
                            openAtIndex = selectedIndex;
                        }
                    }
                    this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
                    this.setState(
                        {
                            inputIsHiddenAfterUpdate: false,
                            focusedValue: null,
                            focusedOption: focusableOptions[openAtIndex],
                            focusedOptionId: this.getFocusedOptionId(focusableOptions[openAtIndex]),
                        },
                        function () {
                            return _this2.onMenuOpen();
                        }
                    );
                },
            },
            {
                key: 'focusValue',
                value: function focusValue(direction) {
                    var _this$state3 = this.state,
                        selectValue = _this$state3.selectValue,
                        focusedValue = _this$state3.focusedValue;
                    if (!this.props.isMulti) return;
                    this.setState({
                        focusedOption: null,
                    });
                    var focusedIndex = selectValue.indexOf(focusedValue);
                    if (!focusedValue) {
                        focusedIndex = -1;
                    }
                    var lastIndex = selectValue.length - 1;
                    var nextFocus = -1;
                    if (!selectValue.length) return;
                    switch (direction) {
                        case 'previous':
                            if (focusedIndex === 0) {
                                nextFocus = 0;
                            } else if (focusedIndex === -1) {
                                nextFocus = lastIndex;
                            } else {
                                nextFocus = focusedIndex - 1;
                            }
                            break;
                        case 'next':
                            if (focusedIndex > -1 && focusedIndex < lastIndex) {
                                nextFocus = focusedIndex + 1;
                            }
                            break;
                    }
                    this.setState({
                        inputIsHidden: nextFocus !== -1,
                        focusedValue: selectValue[nextFocus],
                    });
                },
            },
            {
                key: 'focusOption',
                value: function focusOption() {
                    var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'first';
                    var pageSize = this.props.pageSize;
                    var focusedOption = this.state.focusedOption;
                    var options2 = this.getFocusableOptions();
                    if (!options2.length) return;
                    var nextFocus = 0;
                    var focusedIndex = options2.indexOf(focusedOption);
                    if (!focusedOption) {
                        focusedIndex = -1;
                    }
                    if (direction === 'up') {
                        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options2.length - 1;
                    } else if (direction === 'down') {
                        nextFocus = (focusedIndex + 1) % options2.length;
                    } else if (direction === 'pageup') {
                        nextFocus = focusedIndex - pageSize;
                        if (nextFocus < 0) nextFocus = 0;
                    } else if (direction === 'pagedown') {
                        nextFocus = focusedIndex + pageSize;
                        if (nextFocus > options2.length - 1) nextFocus = options2.length - 1;
                    } else if (direction === 'last') {
                        nextFocus = options2.length - 1;
                    }
                    this.scrollToFocusedOptionOnUpdate = true;
                    this.setState({
                        focusedOption: options2[nextFocus],
                        focusedValue: null,
                        focusedOptionId: this.getFocusedOptionId(options2[nextFocus]),
                    });
                },
            },
            {
                key: 'getTheme',
                value:
                    // ==============================
                    // Getters
                    // ==============================
                    function getTheme3() {
                        if (!this.props.theme) {
                            return defaultTheme;
                        }
                        if (typeof this.props.theme === 'function') {
                            return this.props.theme(defaultTheme);
                        }
                        return _objectSpread2(_objectSpread2({}, defaultTheme), this.props.theme);
                    },
            },
            {
                key: 'getCommonProps',
                value: function getCommonProps() {
                    var clearValue = this.clearValue,
                        cx = this.cx,
                        getStyles = this.getStyles,
                        getClassNames = this.getClassNames,
                        getValue = this.getValue,
                        selectOption = this.selectOption,
                        setValue = this.setValue,
                        props = this.props;
                    var isMulti = props.isMulti,
                        isRtl = props.isRtl,
                        options2 = props.options;
                    var hasValue = this.hasValue();
                    return {
                        clearValue,
                        cx,
                        getStyles,
                        getClassNames,
                        getValue,
                        hasValue,
                        isMulti,
                        isRtl,
                        options: options2,
                        selectOption,
                        selectProps: props,
                        setValue,
                        theme: this.getTheme(),
                    };
                },
            },
            {
                key: 'hasValue',
                value: function hasValue() {
                    var selectValue = this.state.selectValue;
                    return selectValue.length > 0;
                },
            },
            {
                key: 'hasOptions',
                value: function hasOptions() {
                    return !!this.getFocusableOptions().length;
                },
            },
            {
                key: 'isClearable',
                value: function isClearable() {
                    var _this$props7 = this.props,
                        isClearable2 = _this$props7.isClearable,
                        isMulti = _this$props7.isMulti;
                    if (isClearable2 === void 0) return isMulti;
                    return isClearable2;
                },
            },
            {
                key: 'isOptionDisabled',
                value: function isOptionDisabled3(option, selectValue) {
                    return _isOptionDisabled(this.props, option, selectValue);
                },
            },
            {
                key: 'isOptionSelected',
                value: function isOptionSelected(option, selectValue) {
                    return _isOptionSelected(this.props, option, selectValue);
                },
            },
            {
                key: 'filterOption',
                value: function filterOption(option, inputValue) {
                    return _filterOption(this.props, option, inputValue);
                },
            },
            {
                key: 'formatOptionLabel',
                value: function formatOptionLabel(data, context) {
                    if (typeof this.props.formatOptionLabel === 'function') {
                        var _inputValue = this.props.inputValue;
                        var _selectValue = this.state.selectValue;
                        return this.props.formatOptionLabel(data, {
                            context,
                            inputValue: _inputValue,
                            selectValue: _selectValue,
                        });
                    } else {
                        return this.getOptionLabel(data);
                    }
                },
            },
            {
                key: 'formatGroupLabel',
                value: function formatGroupLabel3(data) {
                    return this.props.formatGroupLabel(data);
                },
                // ==============================
                // Mouse Handlers
                // ==============================
            },
            {
                key: 'startListeningComposition',
                value:
                    // ==============================
                    // Composition Handlers
                    // ==============================
                    function startListeningComposition() {
                        if (document && document.addEventListener) {
                            document.addEventListener('compositionstart', this.onCompositionStart, false);
                            document.addEventListener('compositionend', this.onCompositionEnd, false);
                        }
                    },
            },
            {
                key: 'stopListeningComposition',
                value: function stopListeningComposition() {
                    if (document && document.removeEventListener) {
                        document.removeEventListener('compositionstart', this.onCompositionStart);
                        document.removeEventListener('compositionend', this.onCompositionEnd);
                    }
                },
            },
            {
                key: 'startListeningToTouch',
                value:
                    // ==============================
                    // Touch Handlers
                    // ==============================
                    function startListeningToTouch() {
                        if (document && document.addEventListener) {
                            document.addEventListener('touchstart', this.onTouchStart, false);
                            document.addEventListener('touchmove', this.onTouchMove, false);
                            document.addEventListener('touchend', this.onTouchEnd, false);
                        }
                    },
            },
            {
                key: 'stopListeningToTouch',
                value: function stopListeningToTouch() {
                    if (document && document.removeEventListener) {
                        document.removeEventListener('touchstart', this.onTouchStart);
                        document.removeEventListener('touchmove', this.onTouchMove);
                        document.removeEventListener('touchend', this.onTouchEnd);
                    }
                },
            },
            {
                key: 'renderInput',
                value:
                    // ==============================
                    // Renderers
                    // ==============================
                    function renderInput() {
                        var _this$props8 = this.props,
                            isDisabled = _this$props8.isDisabled,
                            isSearchable = _this$props8.isSearchable,
                            inputId = _this$props8.inputId,
                            inputValue = _this$props8.inputValue,
                            tabIndex = _this$props8.tabIndex,
                            form = _this$props8.form,
                            menuIsOpen = _this$props8.menuIsOpen,
                            required = _this$props8.required;
                        var _this$getComponents = this.getComponents(),
                            Input3 = _this$getComponents.Input;
                        var _this$state4 = this.state,
                            inputIsHidden = _this$state4.inputIsHidden,
                            ariaSelection = _this$state4.ariaSelection;
                        var commonProps = this.commonProps;
                        var id = inputId || this.getElementId('input');
                        var ariaAttributes = _objectSpread2(
                            _objectSpread2(
                                _objectSpread2(
                                    {
                                        'aria-autocomplete': 'list',
                                        'aria-expanded': menuIsOpen,
                                        'aria-haspopup': true,
                                        'aria-errormessage': this.props['aria-errormessage'],
                                        'aria-invalid': this.props['aria-invalid'],
                                        'aria-label': this.props['aria-label'],
                                        'aria-labelledby': this.props['aria-labelledby'],
                                        'aria-required': required,
                                        role: 'combobox',
                                        'aria-activedescendant': this.isAppleDevice
                                            ? void 0
                                            : this.state.focusedOptionId || '',
                                    },
                                    menuIsOpen && {
                                        'aria-controls': this.getElementId('listbox'),
                                    }
                                ),
                                !isSearchable && {
                                    'aria-readonly': true,
                                }
                            ),
                            this.hasValue()
                                ? (ariaSelection === null || ariaSelection === void 0
                                      ? void 0
                                      : ariaSelection.action) === 'initial-input-focus' && {
                                      'aria-describedby': this.getElementId('live-region'),
                                  }
                                : {
                                      'aria-describedby': this.getElementId('placeholder'),
                                  }
                        );
                        if (!isSearchable) {
                            return React4.createElement(
                                DummyInput,
                                _extends(
                                    {
                                        id,
                                        innerRef: this.getInputRef,
                                        onBlur: this.onInputBlur,
                                        onChange: noop,
                                        onFocus: this.onInputFocus,
                                        disabled: isDisabled,
                                        tabIndex,
                                        inputMode: 'none',
                                        form,
                                        value: '',
                                    },
                                    ariaAttributes
                                )
                            );
                        }
                        return React4.createElement(
                            Input3,
                            _extends(
                                {},
                                commonProps,
                                {
                                    autoCapitalize: 'none',
                                    autoComplete: 'off',
                                    autoCorrect: 'off',
                                    id,
                                    innerRef: this.getInputRef,
                                    isDisabled,
                                    isHidden: inputIsHidden,
                                    onBlur: this.onInputBlur,
                                    onChange: this.handleInputChange,
                                    onFocus: this.onInputFocus,
                                    spellCheck: 'false',
                                    tabIndex,
                                    form,
                                    type: 'text',
                                    value: inputValue,
                                },
                                ariaAttributes
                            )
                        );
                    },
            },
            {
                key: 'renderPlaceholderOrValue',
                value: function renderPlaceholderOrValue() {
                    var _this3 = this;
                    var _this$getComponents2 = this.getComponents(),
                        MultiValue3 = _this$getComponents2.MultiValue,
                        MultiValueContainer2 = _this$getComponents2.MultiValueContainer,
                        MultiValueLabel2 = _this$getComponents2.MultiValueLabel,
                        MultiValueRemove2 = _this$getComponents2.MultiValueRemove,
                        SingleValue3 = _this$getComponents2.SingleValue,
                        Placeholder3 = _this$getComponents2.Placeholder;
                    var commonProps = this.commonProps;
                    var _this$props9 = this.props,
                        controlShouldRenderValue = _this$props9.controlShouldRenderValue,
                        isDisabled = _this$props9.isDisabled,
                        isMulti = _this$props9.isMulti,
                        inputValue = _this$props9.inputValue,
                        placeholder = _this$props9.placeholder;
                    var _this$state5 = this.state,
                        selectValue = _this$state5.selectValue,
                        focusedValue = _this$state5.focusedValue,
                        isFocused = _this$state5.isFocused;
                    if (!this.hasValue() || !controlShouldRenderValue) {
                        return inputValue
                            ? null
                            : React4.createElement(
                                  Placeholder3,
                                  _extends({}, commonProps, {
                                      key: 'placeholder',
                                      isDisabled,
                                      isFocused,
                                      innerProps: {
                                          id: this.getElementId('placeholder'),
                                      },
                                  }),
                                  placeholder
                              );
                    }
                    if (isMulti) {
                        return selectValue.map(function (opt, index2) {
                            var isOptionFocused = opt === focusedValue;
                            var key = ''.concat(_this3.getOptionLabel(opt), '-').concat(_this3.getOptionValue(opt));
                            return React4.createElement(
                                MultiValue3,
                                _extends({}, commonProps, {
                                    components: {
                                        Container: MultiValueContainer2,
                                        Label: MultiValueLabel2,
                                        Remove: MultiValueRemove2,
                                    },
                                    isFocused: isOptionFocused,
                                    isDisabled,
                                    key,
                                    index: index2,
                                    removeProps: {
                                        onClick: function onClick() {
                                            return _this3.removeValue(opt);
                                        },
                                        onTouchEnd: function onTouchEnd() {
                                            return _this3.removeValue(opt);
                                        },
                                        onMouseDown: function onMouseDown(e) {
                                            e.preventDefault();
                                        },
                                    },
                                    data: opt,
                                }),
                                _this3.formatOptionLabel(opt, 'value')
                            );
                        });
                    }
                    if (inputValue) {
                        return null;
                    }
                    var singleValue = selectValue[0];
                    return React4.createElement(
                        SingleValue3,
                        _extends({}, commonProps, {
                            data: singleValue,
                            isDisabled,
                        }),
                        this.formatOptionLabel(singleValue, 'value')
                    );
                },
            },
            {
                key: 'renderClearIndicator',
                value: function renderClearIndicator() {
                    var _this$getComponents3 = this.getComponents(),
                        ClearIndicator3 = _this$getComponents3.ClearIndicator;
                    var commonProps = this.commonProps;
                    var _this$props10 = this.props,
                        isDisabled = _this$props10.isDisabled,
                        isLoading = _this$props10.isLoading;
                    var isFocused = this.state.isFocused;
                    if (!this.isClearable() || !ClearIndicator3 || isDisabled || !this.hasValue() || isLoading) {
                        return null;
                    }
                    var innerProps = {
                        onMouseDown: this.onClearIndicatorMouseDown,
                        onTouchEnd: this.onClearIndicatorTouchEnd,
                        'aria-hidden': 'true',
                    };
                    return React4.createElement(
                        ClearIndicator3,
                        _extends({}, commonProps, {
                            innerProps,
                            isFocused,
                        })
                    );
                },
            },
            {
                key: 'renderLoadingIndicator',
                value: function renderLoadingIndicator() {
                    var _this$getComponents4 = this.getComponents(),
                        LoadingIndicator3 = _this$getComponents4.LoadingIndicator;
                    var commonProps = this.commonProps;
                    var _this$props11 = this.props,
                        isDisabled = _this$props11.isDisabled,
                        isLoading = _this$props11.isLoading;
                    var isFocused = this.state.isFocused;
                    if (!LoadingIndicator3 || !isLoading) return null;
                    var innerProps = {
                        'aria-hidden': 'true',
                    };
                    return React4.createElement(
                        LoadingIndicator3,
                        _extends({}, commonProps, {
                            innerProps,
                            isDisabled,
                            isFocused,
                        })
                    );
                },
            },
            {
                key: 'renderIndicatorSeparator',
                value: function renderIndicatorSeparator() {
                    var _this$getComponents5 = this.getComponents(),
                        DropdownIndicator3 = _this$getComponents5.DropdownIndicator,
                        IndicatorSeparator3 = _this$getComponents5.IndicatorSeparator;
                    if (!DropdownIndicator3 || !IndicatorSeparator3) return null;
                    var commonProps = this.commonProps;
                    var isDisabled = this.props.isDisabled;
                    var isFocused = this.state.isFocused;
                    return React4.createElement(
                        IndicatorSeparator3,
                        _extends({}, commonProps, {
                            isDisabled,
                            isFocused,
                        })
                    );
                },
            },
            {
                key: 'renderDropdownIndicator',
                value: function renderDropdownIndicator() {
                    var _this$getComponents6 = this.getComponents(),
                        DropdownIndicator3 = _this$getComponents6.DropdownIndicator;
                    if (!DropdownIndicator3) return null;
                    var commonProps = this.commonProps;
                    var isDisabled = this.props.isDisabled;
                    var isFocused = this.state.isFocused;
                    var innerProps = {
                        onMouseDown: this.onDropdownIndicatorMouseDown,
                        onTouchEnd: this.onDropdownIndicatorTouchEnd,
                        'aria-hidden': 'true',
                    };
                    return React4.createElement(
                        DropdownIndicator3,
                        _extends({}, commonProps, {
                            innerProps,
                            isDisabled,
                            isFocused,
                        })
                    );
                },
            },
            {
                key: 'renderMenu',
                value: function renderMenu() {
                    var _this4 = this;
                    var _this$getComponents7 = this.getComponents(),
                        Group3 = _this$getComponents7.Group,
                        GroupHeading3 = _this$getComponents7.GroupHeading,
                        Menu3 = _this$getComponents7.Menu,
                        MenuList3 = _this$getComponents7.MenuList,
                        MenuPortal3 = _this$getComponents7.MenuPortal,
                        LoadingMessage3 = _this$getComponents7.LoadingMessage,
                        NoOptionsMessage3 = _this$getComponents7.NoOptionsMessage,
                        Option3 = _this$getComponents7.Option;
                    var commonProps = this.commonProps;
                    var focusedOption = this.state.focusedOption;
                    var _this$props12 = this.props,
                        captureMenuScroll = _this$props12.captureMenuScroll,
                        inputValue = _this$props12.inputValue,
                        isLoading = _this$props12.isLoading,
                        loadingMessage2 = _this$props12.loadingMessage,
                        minMenuHeight = _this$props12.minMenuHeight,
                        maxMenuHeight = _this$props12.maxMenuHeight,
                        menuIsOpen = _this$props12.menuIsOpen,
                        menuPlacement = _this$props12.menuPlacement,
                        menuPosition = _this$props12.menuPosition,
                        menuPortalTarget = _this$props12.menuPortalTarget,
                        menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
                        menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
                        noOptionsMessage2 = _this$props12.noOptionsMessage,
                        onMenuScrollToTop = _this$props12.onMenuScrollToTop,
                        onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
                    if (!menuIsOpen) return null;
                    var render = function render2(props, id) {
                        var type = props.type,
                            data = props.data,
                            isDisabled = props.isDisabled,
                            isSelected = props.isSelected,
                            label = props.label,
                            value = props.value;
                        var isFocused = focusedOption === data;
                        var onHover = isDisabled
                            ? void 0
                            : function () {
                                  return _this4.onOptionHover(data);
                              };
                        var onSelect = isDisabled
                            ? void 0
                            : function () {
                                  return _this4.selectOption(data);
                              };
                        var optionId = ''.concat(_this4.getElementId('option'), '-').concat(id);
                        var innerProps = {
                            id: optionId,
                            onClick: onSelect,
                            onMouseMove: onHover,
                            onMouseOver: onHover,
                            tabIndex: -1,
                            role: 'option',
                            'aria-selected': _this4.isAppleDevice ? void 0 : isSelected,
                            // is not supported on Apple devices
                        };
                        return React4.createElement(
                            Option3,
                            _extends({}, commonProps, {
                                innerProps,
                                data,
                                isDisabled,
                                isSelected,
                                key: optionId,
                                label,
                                type,
                                value,
                                isFocused,
                                innerRef: isFocused ? _this4.getFocusedOptionRef : void 0,
                            }),
                            _this4.formatOptionLabel(props.data, 'menu')
                        );
                    };
                    var menuUI;
                    if (this.hasOptions()) {
                        menuUI = this.getCategorizedOptions().map(function (item) {
                            if (item.type === 'group') {
                                var _data = item.data,
                                    options2 = item.options,
                                    groupIndex = item.index;
                                var groupId = ''.concat(_this4.getElementId('group'), '-').concat(groupIndex);
                                var headingId = ''.concat(groupId, '-heading');
                                return React4.createElement(
                                    Group3,
                                    _extends({}, commonProps, {
                                        key: groupId,
                                        data: _data,
                                        options: options2,
                                        Heading: GroupHeading3,
                                        headingProps: {
                                            id: headingId,
                                            data: item.data,
                                        },
                                        label: _this4.formatGroupLabel(item.data),
                                    }),
                                    item.options.map(function (option) {
                                        return render(option, ''.concat(groupIndex, '-').concat(option.index));
                                    })
                                );
                            } else if (item.type === 'option') {
                                return render(item, ''.concat(item.index));
                            }
                        });
                    } else if (isLoading) {
                        var message = loadingMessage2({
                            inputValue,
                        });
                        if (message === null) return null;
                        menuUI = React4.createElement(LoadingMessage3, commonProps, message);
                    } else {
                        var _message = noOptionsMessage2({
                            inputValue,
                        });
                        if (_message === null) return null;
                        menuUI = React4.createElement(NoOptionsMessage3, commonProps, _message);
                    }
                    var menuPlacementProps = {
                        minMenuHeight,
                        maxMenuHeight,
                        menuPlacement,
                        menuPosition,
                        menuShouldScrollIntoView,
                    };
                    var menuElement = React4.createElement(
                        MenuPlacer,
                        _extends({}, commonProps, menuPlacementProps),
                        function (_ref4) {
                            var ref = _ref4.ref,
                                _ref4$placerProps = _ref4.placerProps,
                                placement = _ref4$placerProps.placement,
                                maxHeight = _ref4$placerProps.maxHeight;
                            return React4.createElement(
                                Menu3,
                                _extends({}, commonProps, menuPlacementProps, {
                                    innerRef: ref,
                                    innerProps: {
                                        onMouseDown: _this4.onMenuMouseDown,
                                        onMouseMove: _this4.onMenuMouseMove,
                                    },
                                    isLoading,
                                    placement,
                                }),
                                React4.createElement(
                                    ScrollManager,
                                    {
                                        captureEnabled: captureMenuScroll,
                                        onTopArrive: onMenuScrollToTop,
                                        onBottomArrive: onMenuScrollToBottom,
                                        lockEnabled: menuShouldBlockScroll,
                                    },
                                    function (scrollTargetRef) {
                                        return React4.createElement(
                                            MenuList3,
                                            _extends({}, commonProps, {
                                                innerRef: function innerRef(instance) {
                                                    _this4.getMenuListRef(instance);
                                                    scrollTargetRef(instance);
                                                },
                                                innerProps: {
                                                    role: 'listbox',
                                                    'aria-multiselectable': commonProps.isMulti,
                                                    id: _this4.getElementId('listbox'),
                                                },
                                                isLoading,
                                                maxHeight,
                                                focusedOption,
                                            }),
                                            menuUI
                                        );
                                    }
                                )
                            );
                        }
                    );
                    return menuPortalTarget || menuPosition === 'fixed'
                        ? React4.createElement(
                              MenuPortal3,
                              _extends({}, commonProps, {
                                  appendTo: menuPortalTarget,
                                  controlElement: this.controlRef,
                                  menuPlacement,
                                  menuPosition,
                              }),
                              menuElement
                          )
                        : menuElement;
                },
            },
            {
                key: 'renderFormField',
                value: function renderFormField() {
                    var _this5 = this;
                    var _this$props13 = this.props,
                        delimiter2 = _this$props13.delimiter,
                        isDisabled = _this$props13.isDisabled,
                        isMulti = _this$props13.isMulti,
                        name = _this$props13.name,
                        required = _this$props13.required;
                    var selectValue = this.state.selectValue;
                    if (required && !this.hasValue() && !isDisabled) {
                        return React4.createElement(RequiredInput$1, {
                            name,
                            onFocus: this.onValueInputFocus,
                        });
                    }
                    if (!name || isDisabled) return;
                    if (isMulti) {
                        if (delimiter2) {
                            var value = selectValue
                                .map(function (opt) {
                                    return _this5.getOptionValue(opt);
                                })
                                .join(delimiter2);
                            return React4.createElement('input', {
                                name,
                                type: 'hidden',
                                value,
                            });
                        } else {
                            var input =
                                selectValue.length > 0
                                    ? selectValue.map(function (opt, i) {
                                          return React4.createElement('input', {
                                              key: 'i-'.concat(i),
                                              name,
                                              type: 'hidden',
                                              value: _this5.getOptionValue(opt),
                                          });
                                      })
                                    : React4.createElement('input', {
                                          name,
                                          type: 'hidden',
                                          value: '',
                                      });
                            return React4.createElement('div', null, input);
                        }
                    } else {
                        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
                        return React4.createElement('input', {
                            name,
                            type: 'hidden',
                            value: _value,
                        });
                    }
                },
            },
            {
                key: 'renderLiveRegion',
                value: function renderLiveRegion() {
                    var commonProps = this.commonProps;
                    var _this$state6 = this.state,
                        ariaSelection = _this$state6.ariaSelection,
                        focusedOption = _this$state6.focusedOption,
                        focusedValue = _this$state6.focusedValue,
                        isFocused = _this$state6.isFocused,
                        selectValue = _this$state6.selectValue;
                    var focusableOptions = this.getFocusableOptions();
                    return React4.createElement(
                        LiveRegion$1,
                        _extends({}, commonProps, {
                            id: this.getElementId('live-region'),
                            ariaSelection,
                            focusedOption,
                            focusedValue,
                            isFocused,
                            selectValue,
                            focusableOptions,
                            isAppleDevice: this.isAppleDevice,
                        })
                    );
                },
            },
            {
                key: 'render',
                value: function render() {
                    var _this$getComponents8 = this.getComponents(),
                        Control3 = _this$getComponents8.Control,
                        IndicatorsContainer3 = _this$getComponents8.IndicatorsContainer,
                        SelectContainer3 = _this$getComponents8.SelectContainer,
                        ValueContainer3 = _this$getComponents8.ValueContainer;
                    var _this$props14 = this.props,
                        className = _this$props14.className,
                        id = _this$props14.id,
                        isDisabled = _this$props14.isDisabled,
                        menuIsOpen = _this$props14.menuIsOpen;
                    var isFocused = this.state.isFocused;
                    var commonProps = (this.commonProps = this.getCommonProps());
                    return React4.createElement(
                        SelectContainer3,
                        _extends({}, commonProps, {
                            className,
                            innerProps: {
                                id,
                                onKeyDown: this.onKeyDown,
                            },
                            isDisabled,
                            isFocused,
                        }),
                        this.renderLiveRegion(),
                        React4.createElement(
                            Control3,
                            _extends({}, commonProps, {
                                innerRef: this.getControlRef,
                                innerProps: {
                                    onMouseDown: this.onControlMouseDown,
                                    onTouchEnd: this.onControlTouchEnd,
                                },
                                isDisabled,
                                isFocused,
                                menuIsOpen,
                            }),
                            React4.createElement(
                                ValueContainer3,
                                _extends({}, commonProps, {
                                    isDisabled,
                                }),
                                this.renderPlaceholderOrValue(),
                                this.renderInput()
                            ),
                            React4.createElement(
                                IndicatorsContainer3,
                                _extends({}, commonProps, {
                                    isDisabled,
                                }),
                                this.renderClearIndicator(),
                                this.renderLoadingIndicator(),
                                this.renderIndicatorSeparator(),
                                this.renderDropdownIndicator()
                            )
                        ),
                        this.renderMenu(),
                        this.renderFormField()
                    );
                },
            },
        ],
        [
            {
                key: 'getDerivedStateFromProps',
                value: function getDerivedStateFromProps(props, state) {
                    var prevProps = state.prevProps,
                        clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
                        inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
                        ariaSelection = state.ariaSelection,
                        isFocused = state.isFocused,
                        prevWasFocused = state.prevWasFocused,
                        instancePrefix = state.instancePrefix;
                    var options2 = props.options,
                        value = props.value,
                        menuIsOpen = props.menuIsOpen,
                        inputValue = props.inputValue,
                        isMulti = props.isMulti;
                    var selectValue = cleanValue(value);
                    var newMenuOptionsState = {};
                    if (
                        prevProps &&
                        (value !== prevProps.value ||
                            options2 !== prevProps.options ||
                            menuIsOpen !== prevProps.menuIsOpen ||
                            inputValue !== prevProps.inputValue)
                    ) {
                        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
                        var focusableOptionsWithIds = menuIsOpen
                            ? buildFocusableOptionsWithIds(
                                  buildCategorizedOptions(props, selectValue),
                                  ''.concat(instancePrefix, '-option')
                              )
                            : [];
                        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
                        var focusedOption = getNextFocusedOption(state, focusableOptions);
                        var focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusedOption);
                        newMenuOptionsState = {
                            selectValue,
                            focusedOption,
                            focusedOptionId,
                            focusableOptionsWithIds,
                            focusedValue,
                            clearFocusValueOnUpdate: false,
                        };
                    }
                    var newInputIsHiddenState =
                        inputIsHiddenAfterUpdate != null && props !== prevProps
                            ? {
                                  inputIsHidden: inputIsHiddenAfterUpdate,
                                  inputIsHiddenAfterUpdate: void 0,
                              }
                            : {};
                    var newAriaSelection = ariaSelection;
                    var hasKeptFocus = isFocused && prevWasFocused;
                    if (isFocused && !hasKeptFocus) {
                        newAriaSelection = {
                            value: valueTernary(isMulti, selectValue, selectValue[0] || null),
                            options: selectValue,
                            action: 'initial-input-focus',
                        };
                        hasKeptFocus = !prevWasFocused;
                    }
                    if (
                        (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) ===
                        'initial-input-focus'
                    ) {
                        newAriaSelection = null;
                    }
                    return _objectSpread2(
                        _objectSpread2(_objectSpread2({}, newMenuOptionsState), newInputIsHiddenState),
                        {},
                        {
                            prevProps: props,
                            ariaSelection: newAriaSelection,
                            prevWasFocused: hasKeptFocus,
                        }
                    );
                },
            },
        ]
    );
    return Select2;
})(import_react6.Component);
Select.defaultProps = defaultProps;

// node_modules/react-select/dist/react-select.esm.js
var import_react_dom2 = __toESM(require_react_dom());
var StateManagedSelect = (0, import_react8.forwardRef)(function (props, ref) {
    var baseSelectProps = useStateManager(props);
    return React5.createElement(
        Select,
        _extends(
            {
                ref,
            },
            baseSelectProps
        )
    );
});
var StateManagedSelect$1 = StateManagedSelect;
var NonceProvider = function (_ref3) {
    var nonce = _ref3.nonce,
        children = _ref3.children,
        cacheKey = _ref3.cacheKey;
    var emotionCache = (0, import_react8.useMemo)(
        function () {
            return createCache({
                key: cacheKey,
                nonce,
            });
        },
        [cacheKey, nonce]
    );
    return React5.createElement(
        CacheProvider,
        {
            value: emotionCache,
        },
        children
    );
};
export {
    NonceProvider,
    components,
    createFilter,
    StateManagedSelect$1 as default,
    defaultTheme,
    mergeStyles,
    useStateManager,
};
//# sourceMappingURL=react-select.js.map
