import { _extends, _objectWithoutPropertiesLoose, _setPrototypeOf } from './chunk-J2HDAMLS.js';
import { require_prop_types } from './chunk-33DERLYP.js';
import './chunk-KANKV5NS.js';
import { require_react_dom } from './chunk-62AAIPHI.js';
import { require_react } from './chunk-JZSXOKIY.js';
import { __commonJS, __toESM } from './chunk-ANIWD3T6.js';

// node_modules/classnames/index.js
var require_classnames = __commonJS({
    'node_modules/classnames/index.js'(exports, module) {
        (function () {
            'use strict';
            var hasOwn = {}.hasOwnProperty;
            function classNames103() {
                var classes = '';
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    if (arg) {
                        classes = appendClass(classes, parseValue(arg));
                    }
                }
                return classes;
            }
            function parseValue(arg) {
                if (typeof arg === 'string' || typeof arg === 'number') {
                    return arg;
                }
                if (typeof arg !== 'object') {
                    return '';
                }
                if (Array.isArray(arg)) {
                    return classNames103.apply(null, arg);
                }
                if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
                    return arg.toString();
                }
                var classes = '';
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes = appendClass(classes, key);
                    }
                }
                return classes;
            }
            function appendClass(value, newClass) {
                if (!newClass) {
                    return value;
                }
                if (value) {
                    return value + ' ' + newClass;
                }
                return value + newClass;
            }
            if (typeof module !== 'undefined' && module.exports) {
                classNames103.default = classNames103;
                module.exports = classNames103;
            } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
                define('classnames', [], function () {
                    return classNames103;
                });
            } else {
                window.classNames = classNames103;
            }
        })();
    },
});

// node_modules/invariant/browser.js
var require_browser = __commonJS({
    'node_modules/invariant/browser.js'(exports, module) {
        'use strict';
        var invariant5 = function (condition, format, a, b, c, d, e, f) {
            if (true) {
                if (format === void 0) {
                    throw new Error('invariant requires an error message argument');
                }
            }
            if (!condition) {
                var error;
                if (format === void 0) {
                    error = new Error(
                        'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
                    );
                } else {
                    var args = [a, b, c, d, e, f];
                    var argIndex = 0;
                    error = new Error(
                        format.replace(/%s/g, function () {
                            return args[argIndex++];
                        })
                    );
                    error.name = 'Invariant Violation';
                }
                error.framesToPop = 1;
                throw error;
            }
        };
        module.exports = invariant5;
    },
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
    'node_modules/react/cjs/react-jsx-runtime.development.js'(exports) {
        'use strict';
        if (true) {
            (function () {
                'use strict';
                var React149 = require_react();
                var REACT_ELEMENT_TYPE = Symbol.for('react.element');
                var REACT_PORTAL_TYPE = Symbol.for('react.portal');
                var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
                var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
                var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
                var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
                var REACT_CONTEXT_TYPE = Symbol.for('react.context');
                var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
                var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
                var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
                var REACT_MEMO_TYPE = Symbol.for('react.memo');
                var REACT_LAZY_TYPE = Symbol.for('react.lazy');
                var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
                var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
                var FAUX_ITERATOR_SYMBOL = '@@iterator';
                function getIteratorFn(maybeIterable) {
                    if (maybeIterable === null || typeof maybeIterable !== 'object') {
                        return null;
                    }
                    var maybeIterator =
                        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
                        maybeIterable[FAUX_ITERATOR_SYMBOL];
                    if (typeof maybeIterator === 'function') {
                        return maybeIterator;
                    }
                    return null;
                }
                var ReactSharedInternals = React149.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
                function error(format) {
                    {
                        {
                            for (
                                var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;
                                _key2 < _len2;
                                _key2++
                            ) {
                                args[_key2 - 1] = arguments[_key2];
                            }
                            printWarning('error', format, args);
                        }
                    }
                }
                function printWarning(level, format, args) {
                    {
                        var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
                        var stack = ReactDebugCurrentFrame2.getStackAddendum();
                        if (stack !== '') {
                            format += '%s';
                            args = args.concat([stack]);
                        }
                        var argsWithFormat = args.map(function (item) {
                            return String(item);
                        });
                        argsWithFormat.unshift('Warning: ' + format);
                        Function.prototype.apply.call(console[level], console, argsWithFormat);
                    }
                }
                var enableScopeAPI = false;
                var enableCacheElement = false;
                var enableTransitionTracing = false;
                var enableLegacyHidden = false;
                var enableDebugTracing = false;
                var REACT_MODULE_REFERENCE;
                {
                    REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
                }
                function isValidElementType(type) {
                    if (typeof type === 'string' || typeof type === 'function') {
                        return true;
                    }
                    if (
                        type === REACT_FRAGMENT_TYPE ||
                        type === REACT_PROFILER_TYPE ||
                        enableDebugTracing ||
                        type === REACT_STRICT_MODE_TYPE ||
                        type === REACT_SUSPENSE_TYPE ||
                        type === REACT_SUSPENSE_LIST_TYPE ||
                        enableLegacyHidden ||
                        type === REACT_OFFSCREEN_TYPE ||
                        enableScopeAPI ||
                        enableCacheElement ||
                        enableTransitionTracing
                    ) {
                        return true;
                    }
                    if (typeof type === 'object' && type !== null) {
                        if (
                            type.$$typeof === REACT_LAZY_TYPE ||
                            type.$$typeof === REACT_MEMO_TYPE ||
                            type.$$typeof === REACT_PROVIDER_TYPE ||
                            type.$$typeof === REACT_CONTEXT_TYPE ||
                            type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
                            // types supported by any Flight configuration anywhere since
                            // we don't know which Flight build this will end up being used
                            // with.
                            type.$$typeof === REACT_MODULE_REFERENCE ||
                            type.getModuleId !== void 0
                        ) {
                            return true;
                        }
                    }
                    return false;
                }
                function getWrappedName(outerType, innerType, wrapperName) {
                    var displayName = outerType.displayName;
                    if (displayName) {
                        return displayName;
                    }
                    var functionName = innerType.displayName || innerType.name || '';
                    return functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName;
                }
                function getContextName(type) {
                    return type.displayName || 'Context';
                }
                function getComponentNameFromType(type) {
                    if (type == null) {
                        return null;
                    }
                    {
                        if (typeof type.tag === 'number') {
                            error(
                                'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.'
                            );
                        }
                    }
                    if (typeof type === 'function') {
                        return type.displayName || type.name || null;
                    }
                    if (typeof type === 'string') {
                        return type;
                    }
                    switch (type) {
                        case REACT_FRAGMENT_TYPE:
                            return 'Fragment';
                        case REACT_PORTAL_TYPE:
                            return 'Portal';
                        case REACT_PROFILER_TYPE:
                            return 'Profiler';
                        case REACT_STRICT_MODE_TYPE:
                            return 'StrictMode';
                        case REACT_SUSPENSE_TYPE:
                            return 'Suspense';
                        case REACT_SUSPENSE_LIST_TYPE:
                            return 'SuspenseList';
                    }
                    if (typeof type === 'object') {
                        switch (type.$$typeof) {
                            case REACT_CONTEXT_TYPE:
                                var context6 = type;
                                return getContextName(context6) + '.Consumer';
                            case REACT_PROVIDER_TYPE:
                                var provider = type;
                                return getContextName(provider._context) + '.Provider';
                            case REACT_FORWARD_REF_TYPE:
                                return getWrappedName(type, type.render, 'ForwardRef');
                            case REACT_MEMO_TYPE:
                                var outerName = type.displayName || null;
                                if (outerName !== null) {
                                    return outerName;
                                }
                                return getComponentNameFromType(type.type) || 'Memo';
                            case REACT_LAZY_TYPE: {
                                var lazyComponent = type;
                                var payload = lazyComponent._payload;
                                var init = lazyComponent._init;
                                try {
                                    return getComponentNameFromType(init(payload));
                                } catch (x) {
                                    return null;
                                }
                            }
                        }
                    }
                    return null;
                }
                var assign = Object.assign;
                var disabledDepth = 0;
                var prevLog;
                var prevInfo;
                var prevWarn;
                var prevError;
                var prevGroup;
                var prevGroupCollapsed;
                var prevGroupEnd;
                function disabledLog() {}
                disabledLog.__reactDisabledLog = true;
                function disableLogs() {
                    {
                        if (disabledDepth === 0) {
                            prevLog = console.log;
                            prevInfo = console.info;
                            prevWarn = console.warn;
                            prevError = console.error;
                            prevGroup = console.group;
                            prevGroupCollapsed = console.groupCollapsed;
                            prevGroupEnd = console.groupEnd;
                            var props = {
                                configurable: true,
                                enumerable: true,
                                value: disabledLog,
                                writable: true,
                            };
                            Object.defineProperties(console, {
                                info: props,
                                log: props,
                                warn: props,
                                error: props,
                                group: props,
                                groupCollapsed: props,
                                groupEnd: props,
                            });
                        }
                        disabledDepth++;
                    }
                }
                function reenableLogs() {
                    {
                        disabledDepth--;
                        if (disabledDepth === 0) {
                            var props = {
                                configurable: true,
                                enumerable: true,
                                writable: true,
                            };
                            Object.defineProperties(console, {
                                log: assign({}, props, {
                                    value: prevLog,
                                }),
                                info: assign({}, props, {
                                    value: prevInfo,
                                }),
                                warn: assign({}, props, {
                                    value: prevWarn,
                                }),
                                error: assign({}, props, {
                                    value: prevError,
                                }),
                                group: assign({}, props, {
                                    value: prevGroup,
                                }),
                                groupCollapsed: assign({}, props, {
                                    value: prevGroupCollapsed,
                                }),
                                groupEnd: assign({}, props, {
                                    value: prevGroupEnd,
                                }),
                            });
                        }
                        if (disabledDepth < 0) {
                            error('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
                        }
                    }
                }
                var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
                var prefix;
                function describeBuiltInComponentFrame(name, source, ownerFn) {
                    {
                        if (prefix === void 0) {
                            try {
                                throw Error();
                            } catch (x) {
                                var match = x.stack.trim().match(/\n( *(at )?)/);
                                prefix = (match && match[1]) || '';
                            }
                        }
                        return '\n' + prefix + name;
                    }
                }
                var reentry = false;
                var componentFrameCache;
                {
                    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
                    componentFrameCache = new PossiblyWeakMap();
                }
                function describeNativeComponentFrame(fn2, construct) {
                    if (!fn2 || reentry) {
                        return '';
                    }
                    {
                        var frame = componentFrameCache.get(fn2);
                        if (frame !== void 0) {
                            return frame;
                        }
                    }
                    var control;
                    reentry = true;
                    var previousPrepareStackTrace = Error.prepareStackTrace;
                    Error.prepareStackTrace = void 0;
                    var previousDispatcher;
                    {
                        previousDispatcher = ReactCurrentDispatcher.current;
                        ReactCurrentDispatcher.current = null;
                        disableLogs();
                    }
                    try {
                        if (construct) {
                            var Fake = function () {
                                throw Error();
                            };
                            Object.defineProperty(Fake.prototype, 'props', {
                                set: function () {
                                    throw Error();
                                },
                            });
                            if (typeof Reflect === 'object' && Reflect.construct) {
                                try {
                                    Reflect.construct(Fake, []);
                                } catch (x) {
                                    control = x;
                                }
                                Reflect.construct(fn2, [], Fake);
                            } else {
                                try {
                                    Fake.call();
                                } catch (x) {
                                    control = x;
                                }
                                fn2.call(Fake.prototype);
                            }
                        } else {
                            try {
                                throw Error();
                            } catch (x) {
                                control = x;
                            }
                            fn2();
                        }
                    } catch (sample) {
                        if (sample && control && typeof sample.stack === 'string') {
                            var sampleLines = sample.stack.split('\n');
                            var controlLines = control.stack.split('\n');
                            var s = sampleLines.length - 1;
                            var c = controlLines.length - 1;
                            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                                c--;
                            }
                            for (; s >= 1 && c >= 0; s--, c--) {
                                if (sampleLines[s] !== controlLines[c]) {
                                    if (s !== 1 || c !== 1) {
                                        do {
                                            s--;
                                            c--;
                                            if (c < 0 || sampleLines[s] !== controlLines[c]) {
                                                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');
                                                if (fn2.displayName && _frame.includes('<anonymous>')) {
                                                    _frame = _frame.replace('<anonymous>', fn2.displayName);
                                                }
                                                {
                                                    if (typeof fn2 === 'function') {
                                                        componentFrameCache.set(fn2, _frame);
                                                    }
                                                }
                                                return _frame;
                                            }
                                        } while (s >= 1 && c >= 0);
                                    }
                                    break;
                                }
                            }
                        }
                    } finally {
                        reentry = false;
                        {
                            ReactCurrentDispatcher.current = previousDispatcher;
                            reenableLogs();
                        }
                        Error.prepareStackTrace = previousPrepareStackTrace;
                    }
                    var name = fn2 ? fn2.displayName || fn2.name : '';
                    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
                    {
                        if (typeof fn2 === 'function') {
                            componentFrameCache.set(fn2, syntheticFrame);
                        }
                    }
                    return syntheticFrame;
                }
                function describeFunctionComponentFrame(fn2, source, ownerFn) {
                    {
                        return describeNativeComponentFrame(fn2, false);
                    }
                }
                function shouldConstruct(Component2) {
                    var prototype = Component2.prototype;
                    return !!(prototype && prototype.isReactComponent);
                }
                function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
                    if (type == null) {
                        return '';
                    }
                    if (typeof type === 'function') {
                        {
                            return describeNativeComponentFrame(type, shouldConstruct(type));
                        }
                    }
                    if (typeof type === 'string') {
                        return describeBuiltInComponentFrame(type);
                    }
                    switch (type) {
                        case REACT_SUSPENSE_TYPE:
                            return describeBuiltInComponentFrame('Suspense');
                        case REACT_SUSPENSE_LIST_TYPE:
                            return describeBuiltInComponentFrame('SuspenseList');
                    }
                    if (typeof type === 'object') {
                        switch (type.$$typeof) {
                            case REACT_FORWARD_REF_TYPE:
                                return describeFunctionComponentFrame(type.render);
                            case REACT_MEMO_TYPE:
                                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                            case REACT_LAZY_TYPE: {
                                var lazyComponent = type;
                                var payload = lazyComponent._payload;
                                var init = lazyComponent._init;
                                try {
                                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                                } catch (x) {}
                            }
                        }
                    }
                    return '';
                }
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var loggedTypeFailures = {};
                var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
                function setCurrentlyValidatingElement(element) {
                    {
                        if (element) {
                            var owner = element._owner;
                            var stack = describeUnknownElementTypeFrameInDEV(
                                element.type,
                                element._source,
                                owner ? owner.type : null
                            );
                            ReactDebugCurrentFrame.setExtraStackFrame(stack);
                        } else {
                            ReactDebugCurrentFrame.setExtraStackFrame(null);
                        }
                    }
                }
                function checkPropTypes(typeSpecs, values, location, componentName, element) {
                    {
                        var has2 = Function.call.bind(hasOwnProperty);
                        for (var typeSpecName in typeSpecs) {
                            if (has2(typeSpecs, typeSpecName)) {
                                var error$1 = void 0;
                                try {
                                    if (typeof typeSpecs[typeSpecName] !== 'function') {
                                        var err = Error(
                                            (componentName || 'React class') +
                                                ': ' +
                                                location +
                                                ' type `' +
                                                typeSpecName +
                                                '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                                                typeof typeSpecs[typeSpecName] +
                                                '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                                        );
                                        err.name = 'Invariant Violation';
                                        throw err;
                                    }
                                    error$1 = typeSpecs[typeSpecName](
                                        values,
                                        typeSpecName,
                                        componentName,
                                        location,
                                        null,
                                        'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'
                                    );
                                } catch (ex) {
                                    error$1 = ex;
                                }
                                if (error$1 && !(error$1 instanceof Error)) {
                                    setCurrentlyValidatingElement(element);
                                    error(
                                        '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                                        componentName || 'React class',
                                        location,
                                        typeSpecName,
                                        typeof error$1
                                    );
                                    setCurrentlyValidatingElement(null);
                                }
                                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                                    loggedTypeFailures[error$1.message] = true;
                                    setCurrentlyValidatingElement(element);
                                    error('Failed %s type: %s', location, error$1.message);
                                    setCurrentlyValidatingElement(null);
                                }
                            }
                        }
                    }
                }
                var isArrayImpl = Array.isArray;
                function isArray(a) {
                    return isArrayImpl(a);
                }
                function typeName(value) {
                    {
                        var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
                        var type = (hasToStringTag && value[Symbol.toStringTag]) || value.constructor.name || 'Object';
                        return type;
                    }
                }
                function willCoercionThrow(value) {
                    {
                        try {
                            testStringCoercion(value);
                            return false;
                        } catch (e) {
                            return true;
                        }
                    }
                }
                function testStringCoercion(value) {
                    return '' + value;
                }
                function checkKeyStringCoercion(value) {
                    {
                        if (willCoercionThrow(value)) {
                            error(
                                'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                                typeName(value)
                            );
                            return testStringCoercion(value);
                        }
                    }
                }
                var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
                var RESERVED_PROPS = {
                    key: true,
                    ref: true,
                    __self: true,
                    __source: true,
                };
                var specialPropKeyWarningShown;
                var specialPropRefWarningShown;
                var didWarnAboutStringRefs;
                {
                    didWarnAboutStringRefs = {};
                }
                function hasValidRef(config) {
                    {
                        if (hasOwnProperty.call(config, 'ref')) {
                            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
                            if (getter && getter.isReactWarning) {
                                return false;
                            }
                        }
                    }
                    return config.ref !== void 0;
                }
                function hasValidKey(config) {
                    {
                        if (hasOwnProperty.call(config, 'key')) {
                            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
                            if (getter && getter.isReactWarning) {
                                return false;
                            }
                        }
                    }
                    return config.key !== void 0;
                }
                function warnIfStringRefCannotBeAutoConverted(config, self) {
                    {
                        if (
                            typeof config.ref === 'string' &&
                            ReactCurrentOwner.current &&
                            self &&
                            ReactCurrentOwner.current.stateNode !== self
                        ) {
                            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                            if (!didWarnAboutStringRefs[componentName]) {
                                error(
                                    'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                                    getComponentNameFromType(ReactCurrentOwner.current.type),
                                    config.ref
                                );
                                didWarnAboutStringRefs[componentName] = true;
                            }
                        }
                    }
                }
                function defineKeyPropWarningGetter(props, displayName) {
                    {
                        var warnAboutAccessingKey = function () {
                            if (!specialPropKeyWarningShown) {
                                specialPropKeyWarningShown = true;
                                error(
                                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                                    displayName
                                );
                            }
                        };
                        warnAboutAccessingKey.isReactWarning = true;
                        Object.defineProperty(props, 'key', {
                            get: warnAboutAccessingKey,
                            configurable: true,
                        });
                    }
                }
                function defineRefPropWarningGetter(props, displayName) {
                    {
                        var warnAboutAccessingRef = function () {
                            if (!specialPropRefWarningShown) {
                                specialPropRefWarningShown = true;
                                error(
                                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                                    displayName
                                );
                            }
                        };
                        warnAboutAccessingRef.isReactWarning = true;
                        Object.defineProperty(props, 'ref', {
                            get: warnAboutAccessingRef,
                            configurable: true,
                        });
                    }
                }
                var ReactElement = function (type, key, ref, self, source, owner, props) {
                    var element = {
                        // This tag allows us to uniquely identify this as a React Element
                        $$typeof: REACT_ELEMENT_TYPE,
                        // Built-in properties that belong on the element
                        type,
                        key,
                        ref,
                        props,
                        // Record the component responsible for creating this element.
                        _owner: owner,
                    };
                    {
                        element._store = {};
                        Object.defineProperty(element._store, 'validated', {
                            configurable: false,
                            enumerable: false,
                            writable: true,
                            value: false,
                        });
                        Object.defineProperty(element, '_self', {
                            configurable: false,
                            enumerable: false,
                            writable: false,
                            value: self,
                        });
                        Object.defineProperty(element, '_source', {
                            configurable: false,
                            enumerable: false,
                            writable: false,
                            value: source,
                        });
                        if (Object.freeze) {
                            Object.freeze(element.props);
                            Object.freeze(element);
                        }
                    }
                    return element;
                };
                function jsxDEV(type, config, maybeKey, source, self) {
                    {
                        var propName;
                        var props = {};
                        var key = null;
                        var ref = null;
                        if (maybeKey !== void 0) {
                            {
                                checkKeyStringCoercion(maybeKey);
                            }
                            key = '' + maybeKey;
                        }
                        if (hasValidKey(config)) {
                            {
                                checkKeyStringCoercion(config.key);
                            }
                            key = '' + config.key;
                        }
                        if (hasValidRef(config)) {
                            ref = config.ref;
                            warnIfStringRefCannotBeAutoConverted(config, self);
                        }
                        for (propName in config) {
                            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                                props[propName] = config[propName];
                            }
                        }
                        if (type && type.defaultProps) {
                            var defaultProps2 = type.defaultProps;
                            for (propName in defaultProps2) {
                                if (props[propName] === void 0) {
                                    props[propName] = defaultProps2[propName];
                                }
                            }
                        }
                        if (key || ref) {
                            var displayName =
                                typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
                            if (key) {
                                defineKeyPropWarningGetter(props, displayName);
                            }
                            if (ref) {
                                defineRefPropWarningGetter(props, displayName);
                            }
                        }
                        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
                    }
                }
                var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
                var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
                function setCurrentlyValidatingElement$1(element) {
                    {
                        if (element) {
                            var owner = element._owner;
                            var stack = describeUnknownElementTypeFrameInDEV(
                                element.type,
                                element._source,
                                owner ? owner.type : null
                            );
                            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
                        } else {
                            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
                        }
                    }
                }
                var propTypesMisspellWarningShown;
                {
                    propTypesMisspellWarningShown = false;
                }
                function isValidElement3(object) {
                    {
                        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
                    }
                }
                function getDeclarationErrorAddendum() {
                    {
                        if (ReactCurrentOwner$1.current) {
                            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
                            if (name) {
                                return '\n\nCheck the render method of `' + name + '`.';
                            }
                        }
                        return '';
                    }
                }
                function getSourceInfoErrorAddendum(source) {
                    {
                        if (source !== void 0) {
                            var fileName = source.fileName.replace(/^.*[\\\/]/, '');
                            var lineNumber = source.lineNumber;
                            return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
                        }
                        return '';
                    }
                }
                var ownerHasKeyUseWarning = {};
                function getCurrentComponentErrorInfo(parentType) {
                    {
                        var info = getDeclarationErrorAddendum();
                        if (!info) {
                            var parentName =
                                typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
                            if (parentName) {
                                info = '\n\nCheck the top-level render call using <' + parentName + '>.';
                            }
                        }
                        return info;
                    }
                }
                function validateExplicitKey(element, parentType) {
                    {
                        if (!element._store || element._store.validated || element.key != null) {
                            return;
                        }
                        element._store.validated = true;
                        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
                        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                            return;
                        }
                        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
                        var childOwner = '';
                        if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
                            childOwner =
                                ' It was passed a child from ' + getComponentNameFromType(element._owner.type) + '.';
                        }
                        setCurrentlyValidatingElement$1(element);
                        error(
                            'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                            currentComponentErrorInfo,
                            childOwner
                        );
                        setCurrentlyValidatingElement$1(null);
                    }
                }
                function validateChildKeys(node, parentType) {
                    {
                        if (typeof node !== 'object') {
                            return;
                        }
                        if (isArray(node)) {
                            for (var i = 0; i < node.length; i++) {
                                var child = node[i];
                                if (isValidElement3(child)) {
                                    validateExplicitKey(child, parentType);
                                }
                            }
                        } else if (isValidElement3(node)) {
                            if (node._store) {
                                node._store.validated = true;
                            }
                        } else if (node) {
                            var iteratorFn = getIteratorFn(node);
                            if (typeof iteratorFn === 'function') {
                                if (iteratorFn !== node.entries) {
                                    var iterator = iteratorFn.call(node);
                                    var step;
                                    while (!(step = iterator.next()).done) {
                                        if (isValidElement3(step.value)) {
                                            validateExplicitKey(step.value, parentType);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                function validatePropTypes(element) {
                    {
                        var type = element.type;
                        if (type === null || type === void 0 || typeof type === 'string') {
                            return;
                        }
                        var propTypes8;
                        if (typeof type === 'function') {
                            propTypes8 = type.propTypes;
                        } else if (
                            typeof type === 'object' &&
                            (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
                                // Inner props are checked in the reconciler.
                                type.$$typeof === REACT_MEMO_TYPE)
                        ) {
                            propTypes8 = type.propTypes;
                        } else {
                            return;
                        }
                        if (propTypes8) {
                            var name = getComponentNameFromType(type);
                            checkPropTypes(propTypes8, element.props, 'prop', name, element);
                        } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                            propTypesMisspellWarningShown = true;
                            var _name = getComponentNameFromType(type);
                            error(
                                'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                                _name || 'Unknown'
                            );
                        }
                        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
                            error(
                                'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.'
                            );
                        }
                    }
                }
                function validateFragmentProps(fragment) {
                    {
                        var keys = Object.keys(fragment.props);
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            if (key !== 'children' && key !== 'key') {
                                setCurrentlyValidatingElement$1(fragment);
                                error(
                                    'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                                    key
                                );
                                setCurrentlyValidatingElement$1(null);
                                break;
                            }
                        }
                        if (fragment.ref !== null) {
                            setCurrentlyValidatingElement$1(fragment);
                            error('Invalid attribute `ref` supplied to `React.Fragment`.');
                            setCurrentlyValidatingElement$1(null);
                        }
                    }
                }
                function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
                    {
                        var validType = isValidElementType(type);
                        if (!validType) {
                            var info = '';
                            if (
                                type === void 0 ||
                                (typeof type === 'object' && type !== null && Object.keys(type).length === 0)
                            ) {
                                info +=
                                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                            }
                            var sourceInfo = getSourceInfoErrorAddendum(source);
                            if (sourceInfo) {
                                info += sourceInfo;
                            } else {
                                info += getDeclarationErrorAddendum();
                            }
                            var typeString;
                            if (type === null) {
                                typeString = 'null';
                            } else if (isArray(type)) {
                                typeString = 'array';
                            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                                typeString = '<' + (getComponentNameFromType(type.type) || 'Unknown') + ' />';
                                info = ' Did you accidentally export a JSX literal instead of a component?';
                            } else {
                                typeString = typeof type;
                            }
                            error(
                                'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                                typeString,
                                info
                            );
                        }
                        var element = jsxDEV(type, props, key, source, self);
                        if (element == null) {
                            return element;
                        }
                        if (validType) {
                            var children = props.children;
                            if (children !== void 0) {
                                if (isStaticChildren) {
                                    if (isArray(children)) {
                                        for (var i = 0; i < children.length; i++) {
                                            validateChildKeys(children[i], type);
                                        }
                                        if (Object.freeze) {
                                            Object.freeze(children);
                                        }
                                    } else {
                                        error(
                                            'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.'
                                        );
                                    }
                                } else {
                                    validateChildKeys(children, type);
                                }
                            }
                        }
                        if (type === REACT_FRAGMENT_TYPE) {
                            validateFragmentProps(element);
                        } else {
                            validatePropTypes(element);
                        }
                        return element;
                    }
                }
                function jsxWithValidationStatic(type, props, key) {
                    {
                        return jsxWithValidation(type, props, key, true);
                    }
                }
                function jsxWithValidationDynamic(type, props, key) {
                    {
                        return jsxWithValidation(type, props, key, false);
                    }
                }
                var jsx = jsxWithValidationDynamic;
                var jsxs = jsxWithValidationStatic;
                exports.Fragment = REACT_FRAGMENT_TYPE;
                exports.jsx = jsx;
                exports.jsxs = jsxs;
            })();
        }
    },
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
    'node_modules/react/jsx-runtime.js'(exports, module) {
        'use strict';
        if (false) {
            module.exports = null;
        } else {
            module.exports = require_react_jsx_runtime_development();
        }
    },
});

// node_modules/warning/warning.js
var require_warning = __commonJS({
    'node_modules/warning/warning.js'(exports, module) {
        'use strict';
        var __DEV__ = true;
        var warning8 = function () {};
        if (__DEV__) {
            printWarning = function printWarning2(format, args) {
                var len = arguments.length;
                args = new Array(len > 1 ? len - 1 : 0);
                for (var key = 1; key < len; key++) {
                    args[key - 1] = arguments[key];
                }
                var argIndex = 0;
                var message =
                    'Warning: ' +
                    format.replace(/%s/g, function () {
                        return args[argIndex++];
                    });
                if (typeof console !== 'undefined') {
                    console.error(message);
                }
                try {
                    throw new Error(message);
                } catch (x) {}
            };
            warning8 = function (condition, format, args) {
                var len = arguments.length;
                args = new Array(len > 2 ? len - 2 : 0);
                for (var key = 2; key < len; key++) {
                    args[key - 2] = arguments[key];
                }
                if (format === void 0) {
                    throw new Error('`warning(condition, format, ...args)` requires a warning message argument');
                }
                if (!condition) {
                    printWarning.apply(null, [format].concat(args));
                }
            };
        }
        var printWarning;
        module.exports = warning8;
    },
});

// node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js
var require_createChainableTypeChecker = __commonJS({
    'node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js'(exports, module) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
            value: true,
        });
        exports.default = createChainableTypeChecker;
        function createChainableTypeChecker(validate) {
            function checkType(isRequired, props, propName, componentName, location, propFullName) {
                var componentNameSafe = componentName || '<<anonymous>>';
                var propFullNameSafe = propFullName || propName;
                if (props[propName] == null) {
                    if (isRequired) {
                        return new Error(
                            'Required ' +
                                location +
                                ' `' +
                                propFullNameSafe +
                                '` was not specified ' +
                                ('in `' + componentNameSafe + '`.')
                        );
                    }
                    return null;
                }
                for (
                    var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6;
                    _key < _len;
                    _key++
                ) {
                    args[_key - 6] = arguments[_key];
                }
                return validate.apply(
                    void 0,
                    [props, propName, componentNameSafe, location, propFullNameSafe].concat(args)
                );
            }
            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);
            return chainedCheckType;
        }
        module.exports = exports['default'];
    },
});

// node_modules/prop-types-extra/lib/all.js
var require_all = __commonJS({
    'node_modules/prop-types-extra/lib/all.js'(exports, module) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
            value: true,
        });
        exports.default = all2;
        var _createChainableTypeChecker = require_createChainableTypeChecker();
        var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
        }
        function all2() {
            for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
                validators[_key] = arguments[_key];
            }
            function allPropTypes() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                var error = null;
                validators.forEach(function (validator) {
                    if (error != null) {
                        return;
                    }
                    var result = validator.apply(void 0, args);
                    if (result != null) {
                        error = result;
                    }
                });
                return error;
            }
            return (0, _createChainableTypeChecker2.default)(allPropTypes);
        }
        module.exports = exports['default'];
    },
});

// node_modules/react-bootstrap/esm/Accordion.js
var import_classnames7 = __toESM(require_classnames());
var React14 = __toESM(require_react());
var import_react13 = __toESM(require_react());

// node_modules/uncontrollable/lib/esm/hook.js
var import_react = __toESM(require_react());

// node_modules/uncontrollable/lib/esm/utils.js
var import_invariant = __toESM(require_browser());
function defaultKey(key) {
    return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}

// node_modules/uncontrollable/lib/esm/hook.js
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string');
    return typeof key === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
    if (typeof input !== 'object' || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
        var res = prim.call(input, hint || 'default');
        if (typeof res !== 'object') return res;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (hint === 'string' ? String : Number)(input);
}
function useUncontrolledProp(propValue, defaultValue, handler) {
    var wasPropRef = (0, import_react.useRef)(propValue !== void 0);
    var _useState = (0, import_react.useState)(defaultValue),
        stateValue = _useState[0],
        setState = _useState[1];
    var isProp2 = propValue !== void 0;
    var wasProp = wasPropRef.current;
    wasPropRef.current = isProp2;
    if (!isProp2 && wasProp && stateValue !== defaultValue) {
        setState(defaultValue);
    }
    return [
        isProp2 ? propValue : stateValue,
        (0, import_react.useCallback)(
            function (value) {
                for (
                    var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
                    _key < _len;
                    _key++
                ) {
                    args[_key - 1] = arguments[_key];
                }
                if (handler) handler.apply(void 0, [value].concat(args));
                setState(value);
            },
            [handler]
        ),
    ];
}
function useUncontrolled(props, config) {
    return Object.keys(config).reduce(function (result, fieldName) {
        var _extends2;
        var _ref = result,
            defaultValue = _ref[defaultKey(fieldName)],
            propsValue = _ref[fieldName],
            rest = _objectWithoutPropertiesLoose(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));
        var handlerName = config[fieldName];
        var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]),
            value = _useUncontrolledProp[0],
            handler = _useUncontrolledProp[1];
        return _extends(
            {},
            rest,
            ((_extends2 = {}), (_extends2[fieldName] = value), (_extends2[handlerName] = handler), _extends2)
        );
    }, props);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
}

// node_modules/uncontrollable/lib/esm/uncontrollable.js
var import_react2 = __toESM(require_react());

// node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
function componentWillMount() {
    var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
    if (state !== null && state !== void 0) {
        this.setState(state);
    }
}
function componentWillReceiveProps(nextProps) {
    function updater(prevState) {
        var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
        return state !== null && state !== void 0 ? state : null;
    }
    this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
    try {
        var prevProps = this.props;
        var prevState = this.state;
        this.props = nextProps;
        this.state = nextState;
        this.__reactInternalSnapshotFlag = true;
        this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
    } finally {
        this.props = prevProps;
        this.state = prevState;
    }
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

// node_modules/uncontrollable/lib/esm/uncontrollable.js
var import_invariant2 = __toESM(require_browser());

// node_modules/react-bootstrap/esm/ThemeProvider.js
var React2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
var DEFAULT_MIN_BREAKPOINT = 'xs';
var ThemeContext = React2.createContext({
    prefixes: {},
    breakpoints: DEFAULT_BREAKPOINTS,
    minBreakpoint: DEFAULT_MIN_BREAKPOINT,
});
var { Consumer, Provider } = ThemeContext;
function ThemeProvider({
    prefixes = {},
    breakpoints = DEFAULT_BREAKPOINTS,
    minBreakpoint = DEFAULT_MIN_BREAKPOINT,
    dir,
    children,
}) {
    const contextValue = (0, import_react3.useMemo)(
        () => ({
            prefixes: {
                ...prefixes,
            },
            breakpoints,
            minBreakpoint,
            dir,
        }),
        [prefixes, breakpoints, minBreakpoint, dir]
    );
    return (0, import_jsx_runtime.jsx)(Provider, {
        value: contextValue,
        children,
    });
}
function useBootstrapPrefix(prefix, defaultPrefix) {
    const { prefixes } = (0, import_react3.useContext)(ThemeContext);
    return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
    const { breakpoints } = (0, import_react3.useContext)(ThemeContext);
    return breakpoints;
}
function useBootstrapMinBreakpoint() {
    const { minBreakpoint } = (0, import_react3.useContext)(ThemeContext);
    return minBreakpoint;
}
function useIsRTL() {
    const { dir } = (0, import_react3.useContext)(ThemeContext);
    return dir === 'rtl';
}
var ThemeProvider_default = ThemeProvider;

// node_modules/react-bootstrap/esm/AccordionBody.js
var import_classnames3 = __toESM(require_classnames());
var React10 = __toESM(require_react());
var import_react10 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AccordionCollapse.js
var import_classnames2 = __toESM(require_classnames());
var React8 = __toESM(require_react());
var import_react9 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Collapse.js
var import_classnames = __toESM(require_classnames());

// node_modules/dom-helpers/esm/ownerDocument.js
function ownerDocument(node) {
    return (node && node.ownerDocument) || document;
}

// node_modules/dom-helpers/esm/ownerWindow.js
function ownerWindow(node) {
    var doc = ownerDocument(node);
    return (doc && doc.defaultView) || window;
}

// node_modules/dom-helpers/esm/getComputedStyle.js
function getComputedStyle2(node, psuedoElement) {
    return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

// node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
    return string.replace(rUpper, '-$1').toLowerCase();
}

// node_modules/dom-helpers/esm/hyphenateStyle.js
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
}

// node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
    return !!(value && supportedTransforms.test(value));
}

// node_modules/dom-helpers/esm/css.js
function style(node, property) {
    var css = '';
    var transforms = '';
    if (typeof property === 'string') {
        return (
            node.style.getPropertyValue(hyphenateStyleName(property)) ||
            getComputedStyle2(node).getPropertyValue(hyphenateStyleName(property))
        );
    }
    Object.keys(property).forEach(function (key) {
        var value = property[key];
        if (!value && value !== 0) {
            node.style.removeProperty(hyphenateStyleName(key));
        } else if (isTransform(key)) {
            transforms += key + '(' + value + ') ';
        } else {
            css += hyphenateStyleName(key) + ': ' + value + ';';
        }
    });
    if (transforms) {
        css += 'transform: ' + transforms + ';';
    }
    node.style.cssText += ';' + css;
}
var css_default = style;

// node_modules/react-bootstrap/esm/Collapse.js
var import_react8 = __toESM(require_react());

// node_modules/react-transition-group/esm/Transition.js
var import_prop_types2 = __toESM(require_prop_types());
var import_react5 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/react-transition-group/esm/config.js
var config_default = {
    disabled: false,
};

// node_modules/react-transition-group/esm/utils/PropTypes.js
var import_prop_types = __toESM(require_prop_types());
var timeoutsShape = true
    ? import_prop_types.default.oneOfType([
          import_prop_types.default.number,
          import_prop_types.default.shape({
              enter: import_prop_types.default.number,
              exit: import_prop_types.default.number,
              appear: import_prop_types.default.number,
          }).isRequired,
      ])
    : null;
var classNamesShape = true
    ? import_prop_types.default.oneOfType([
          import_prop_types.default.string,
          import_prop_types.default.shape({
              enter: import_prop_types.default.string,
              exit: import_prop_types.default.string,
              active: import_prop_types.default.string,
          }),
          import_prop_types.default.shape({
              enter: import_prop_types.default.string,
              enterDone: import_prop_types.default.string,
              enterActive: import_prop_types.default.string,
              exit: import_prop_types.default.string,
              exitDone: import_prop_types.default.string,
              exitActive: import_prop_types.default.string,
          }),
      ])
    : null;

// node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react4 = __toESM(require_react());
var TransitionGroupContext_default = import_react4.default.createContext(null);

// node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow2(node) {
    return node.scrollTop;
};

// node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
var Transition = (function (_React$Component) {
    _inheritsLoose(Transition2, _React$Component);
    function Transition2(props, context6) {
        var _this;
        _this = _React$Component.call(this, props, context6) || this;
        var parentGroup = context6;
        var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
        var initialStatus;
        _this.appearStatus = null;
        if (props.in) {
            if (appear) {
                initialStatus = EXITED;
                _this.appearStatus = ENTERING;
            } else {
                initialStatus = ENTERED;
            }
        } else {
            if (props.unmountOnExit || props.mountOnEnter) {
                initialStatus = UNMOUNTED;
            } else {
                initialStatus = EXITED;
            }
        }
        _this.state = {
            status: initialStatus,
        };
        _this.nextCallback = null;
        return _this;
    }
    Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
        var nextIn = _ref.in;
        if (nextIn && prevState.status === UNMOUNTED) {
            return {
                status: EXITED,
            };
        }
        return null;
    };
    var _proto = Transition2.prototype;
    _proto.componentDidMount = function componentDidMount() {
        this.updateStatus(true, this.appearStatus);
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var nextStatus = null;
        if (prevProps !== this.props) {
            var status = this.state.status;
            if (this.props.in) {
                if (status !== ENTERING && status !== ENTERED) {
                    nextStatus = ENTERING;
                }
            } else {
                if (status === ENTERING || status === ENTERED) {
                    nextStatus = EXITING;
                }
            }
        }
        this.updateStatus(false, nextStatus);
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
        this.cancelNextCallback();
    };
    _proto.getTimeouts = function getTimeouts() {
        var timeout2 = this.props.timeout;
        var exit, enter, appear;
        exit = enter = appear = timeout2;
        if (timeout2 != null && typeof timeout2 !== 'number') {
            exit = timeout2.exit;
            enter = timeout2.enter;
            appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
        }
        return {
            exit,
            enter,
            appear,
        };
    };
    _proto.updateStatus = function updateStatus(mounting, nextStatus) {
        if (mounting === void 0) {
            mounting = false;
        }
        if (nextStatus !== null) {
            this.cancelNextCallback();
            if (nextStatus === ENTERING) {
                if (this.props.unmountOnExit || this.props.mountOnEnter) {
                    var node = this.props.nodeRef
                        ? this.props.nodeRef.current
                        : import_react_dom.default.findDOMNode(this);
                    if (node) forceReflow(node);
                }
                this.performEnter(mounting);
            } else {
                this.performExit();
            }
        } else if (this.props.unmountOnExit && this.state.status === EXITED) {
            this.setState({
                status: UNMOUNTED,
            });
        }
    };
    _proto.performEnter = function performEnter(mounting) {
        var _this2 = this;
        var enter = this.props.enter;
        var appearing = this.context ? this.context.isMounting : mounting;
        var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing],
            maybeNode = _ref2[0],
            maybeAppearing = _ref2[1];
        var timeouts = this.getTimeouts();
        var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
        if ((!mounting && !enter) || config_default.disabled) {
            this.safeSetState(
                {
                    status: ENTERED,
                },
                function () {
                    _this2.props.onEntered(maybeNode);
                }
            );
            return;
        }
        this.props.onEnter(maybeNode, maybeAppearing);
        this.safeSetState(
            {
                status: ENTERING,
            },
            function () {
                _this2.props.onEntering(maybeNode, maybeAppearing);
                _this2.onTransitionEnd(enterTimeout, function () {
                    _this2.safeSetState(
                        {
                            status: ENTERED,
                        },
                        function () {
                            _this2.props.onEntered(maybeNode, maybeAppearing);
                        }
                    );
                });
            }
        );
    };
    _proto.performExit = function performExit() {
        var _this3 = this;
        var exit = this.props.exit;
        var timeouts = this.getTimeouts();
        var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
        if (!exit || config_default.disabled) {
            this.safeSetState(
                {
                    status: EXITED,
                },
                function () {
                    _this3.props.onExited(maybeNode);
                }
            );
            return;
        }
        this.props.onExit(maybeNode);
        this.safeSetState(
            {
                status: EXITING,
            },
            function () {
                _this3.props.onExiting(maybeNode);
                _this3.onTransitionEnd(timeouts.exit, function () {
                    _this3.safeSetState(
                        {
                            status: EXITED,
                        },
                        function () {
                            _this3.props.onExited(maybeNode);
                        }
                    );
                });
            }
        );
    };
    _proto.cancelNextCallback = function cancelNextCallback() {
        if (this.nextCallback !== null) {
            this.nextCallback.cancel();
            this.nextCallback = null;
        }
    };
    _proto.safeSetState = function safeSetState(nextState, callback) {
        callback = this.setNextCallback(callback);
        this.setState(nextState, callback);
    };
    _proto.setNextCallback = function setNextCallback(callback) {
        var _this4 = this;
        var active = true;
        this.nextCallback = function (event) {
            if (active) {
                active = false;
                _this4.nextCallback = null;
                callback(event);
            }
        };
        this.nextCallback.cancel = function () {
            active = false;
        };
        return this.nextCallback;
    };
    _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
        this.setNextCallback(handler);
        var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
        var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
        if (!node || doesNotHaveTimeoutOrListener) {
            setTimeout(this.nextCallback, 0);
            return;
        }
        if (this.props.addEndListener) {
            var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
                maybeNode = _ref3[0],
                maybeNextCallback = _ref3[1];
            this.props.addEndListener(maybeNode, maybeNextCallback);
        }
        if (timeout2 != null) {
            setTimeout(this.nextCallback, timeout2);
        }
    };
    _proto.render = function render() {
        var status = this.state.status;
        if (status === UNMOUNTED) {
            return null;
        }
        var _this$props = this.props,
            children = _this$props.children,
            _in = _this$props.in,
            _mountOnEnter = _this$props.mountOnEnter,
            _unmountOnExit = _this$props.unmountOnExit,
            _appear = _this$props.appear,
            _enter = _this$props.enter,
            _exit = _this$props.exit,
            _timeout = _this$props.timeout,
            _addEndListener = _this$props.addEndListener,
            _onEnter = _this$props.onEnter,
            _onEntering = _this$props.onEntering,
            _onEntered = _this$props.onEntered,
            _onExit = _this$props.onExit,
            _onExiting = _this$props.onExiting,
            _onExited = _this$props.onExited,
            _nodeRef = _this$props.nodeRef,
            childProps = _objectWithoutPropertiesLoose(_this$props, [
                'children',
                'in',
                'mountOnEnter',
                'unmountOnExit',
                'appear',
                'enter',
                'exit',
                'timeout',
                'addEndListener',
                'onEnter',
                'onEntering',
                'onEntered',
                'onExit',
                'onExiting',
                'onExited',
                'nodeRef',
            ]);
        return (
            // allows for nested Transitions
            import_react5.default.createElement(
                TransitionGroupContext_default.Provider,
                {
                    value: null,
                },
                typeof children === 'function'
                    ? children(status, childProps)
                    : import_react5.default.cloneElement(import_react5.default.Children.only(children), childProps)
            )
        );
    };
    return Transition2;
})(import_react5.default.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = true
    ? {
          /**
           * A React reference to DOM element that need to transition:
           * https://stackoverflow.com/a/51127130/4671932
           *
           *   - When `nodeRef` prop is used, `node` is not passed to callback functions
           *      (e.g. `onEnter`) because user already has direct access to the node.
           *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
           *     `nodeRef` need to be provided to `Transition` with changed `key` prop
           *     (see
           *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
           */
          nodeRef: import_prop_types2.default.shape({
              current:
                  typeof Element === 'undefined'
                      ? import_prop_types2.default.any
                      : function (propValue, key, componentName, location, propFullName, secret) {
                            var value = propValue[key];
                            return import_prop_types2.default.instanceOf(
                                value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element
                            )(propValue, key, componentName, location, propFullName, secret);
                        },
          }),
          /**
           * A `function` child can be used instead of a React element. This function is
           * called with the current transition status (`'entering'`, `'entered'`,
           * `'exiting'`, `'exited'`), which can be used to apply context
           * specific props to a component.
           *
           * ```jsx
           * <Transition in={this.state.in} timeout={150}>
           *   {state => (
           *     <MyComponent className={`fade fade-${state}`} />
           *   )}
           * </Transition>
           * ```
           */
          children: import_prop_types2.default.oneOfType([
              import_prop_types2.default.func.isRequired,
              import_prop_types2.default.element.isRequired,
          ]).isRequired,
          /**
           * Show the component; triggers the enter or exit states
           */
          in: import_prop_types2.default.bool,
          /**
           * By default the child component is mounted immediately along with
           * the parent `Transition` component. If you want to "lazy mount" the component on the
           * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
           * mounted, even on "exited", unless you also specify `unmountOnExit`.
           */
          mountOnEnter: import_prop_types2.default.bool,
          /**
           * By default the child component stays mounted after it reaches the `'exited'` state.
           * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
           */
          unmountOnExit: import_prop_types2.default.bool,
          /**
           * By default the child component does not perform the enter transition when
           * it first mounts, regardless of the value of `in`. If you want this
           * behavior, set both `appear` and `in` to `true`.
           *
           * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
           * > only adds an additional enter transition. However, in the
           * > `<CSSTransition>` component that first enter transition does result in
           * > additional `.appear-*` classes, that way you can choose to style it
           * > differently.
           */
          appear: import_prop_types2.default.bool,
          /**
           * Enable or disable enter transitions.
           */
          enter: import_prop_types2.default.bool,
          /**
           * Enable or disable exit transitions.
           */
          exit: import_prop_types2.default.bool,
          /**
           * The duration of the transition, in milliseconds.
           * Required unless `addEndListener` is provided.
           *
           * You may specify a single timeout for all transitions:
           *
           * ```jsx
           * timeout={500}
           * ```
           *
           * or individually:
           *
           * ```jsx
           * timeout={{
           *  appear: 500,
           *  enter: 300,
           *  exit: 500,
           * }}
           * ```
           *
           * - `appear` defaults to the value of `enter`
           * - `enter` defaults to `0`
           * - `exit` defaults to `0`
           *
           * @type {number | { enter?: number, exit?: number, appear?: number }}
           */
          timeout: function timeout(props) {
              var pt = timeoutsShape;
              if (!props.addEndListener) pt = pt.isRequired;
              for (
                  var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
                  _key < _len;
                  _key++
              ) {
                  args[_key - 1] = arguments[_key];
              }
              return pt.apply(void 0, [props].concat(args));
          },
          /**
           * Add a custom transition end trigger. Called with the transitioning
           * DOM node and a `done` callback. Allows for more fine grained transition end
           * logic. Timeouts are still used as a fallback if provided.
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * ```jsx
           * addEndListener={(node, done) => {
           *   // use the css transitionend event to mark the finish of a transition
           *   node.addEventListener('transitionend', done, false);
           * }}
           * ```
           */
          addEndListener: import_prop_types2.default.func,
          /**
           * Callback fired before the "entering" status is applied. An extra parameter
           * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * @type Function(node: HtmlElement, isAppearing: bool) -> void
           */
          onEnter: import_prop_types2.default.func,
          /**
           * Callback fired after the "entering" status is applied. An extra parameter
           * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * @type Function(node: HtmlElement, isAppearing: bool)
           */
          onEntering: import_prop_types2.default.func,
          /**
           * Callback fired after the "entered" status is applied. An extra parameter
           * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * @type Function(node: HtmlElement, isAppearing: bool) -> void
           */
          onEntered: import_prop_types2.default.func,
          /**
           * Callback fired before the "exiting" status is applied.
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * @type Function(node: HtmlElement) -> void
           */
          onExit: import_prop_types2.default.func,
          /**
           * Callback fired after the "exiting" status is applied.
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed.
           *
           * @type Function(node: HtmlElement) -> void
           */
          onExiting: import_prop_types2.default.func,
          /**
           * Callback fired after the "exited" status is applied.
           *
           * **Note**: when `nodeRef` prop is passed, `node` is not passed
           *
           * @type Function(node: HtmlElement) -> void
           */
          onExited: import_prop_types2.default.func,
      }
    : {};
function noop() {}
Transition.defaultProps = {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    enter: true,
    exit: true,
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop,
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// node_modules/dom-helpers/esm/addEventListener.js
var optionsSupported = false;
var onceSupported = false;
try {
    options = {
        get passive() {
            return (optionsSupported = true);
        },
        get once() {
            return (onceSupported = optionsSupported = true);
        },
    };
    if (canUseDOM_default) {
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, true);
    }
} catch (e) {}
var options;
function addEventListener(node, eventName, handler, options) {
    if (options && typeof options !== 'boolean' && !onceSupported) {
        var once = options.once,
            capture = options.capture;
        var wrappedHandler = handler;
        if (!onceSupported && once) {
            wrappedHandler =
                handler.__once ||
                function onceHandler(event) {
                    this.removeEventListener(eventName, onceHandler, capture);
                    handler.call(this, event);
                };
            handler.__once = wrappedHandler;
        }
        node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
    }
    node.addEventListener(eventName, handler, options);
}
var addEventListener_default = addEventListener;

// node_modules/dom-helpers/esm/removeEventListener.js
function removeEventListener(node, eventName, handler, options) {
    var capture = options && typeof options !== 'boolean' ? options.capture : options;
    node.removeEventListener(eventName, handler, capture);
    if (handler.__once) {
        node.removeEventListener(eventName, handler.__once, capture);
    }
}
var removeEventListener_default = removeEventListener;

// node_modules/dom-helpers/esm/listen.js
function listen(node, eventName, handler, options) {
    addEventListener_default(node, eventName, handler, options);
    return function () {
        removeEventListener_default(node, eventName, handler, options);
    };
}
var listen_default = listen;

// node_modules/dom-helpers/esm/triggerEvent.js
function triggerEvent(node, eventName, bubbles, cancelable) {
    if (bubbles === void 0) {
        bubbles = false;
    }
    if (cancelable === void 0) {
        cancelable = true;
    }
    if (node) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, bubbles, cancelable);
        node.dispatchEvent(event);
    }
}

// node_modules/dom-helpers/esm/transitionEnd.js
function parseDuration(node) {
    var str = css_default(node, 'transitionDuration') || '';
    var mult = str.indexOf('ms') === -1 ? 1e3 : 1;
    return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
    if (padding === void 0) {
        padding = 5;
    }
    var called = false;
    var handle = setTimeout(function () {
        if (!called) triggerEvent(element, 'transitionend', true);
    }, duration + padding);
    var remove = listen_default(
        element,
        'transitionend',
        function () {
            called = true;
        },
        {
            once: true,
        }
    );
    return function () {
        clearTimeout(handle);
        remove();
    };
}
function transitionEnd(element, handler, duration, padding) {
    if (duration == null) duration = parseDuration(element) || 0;
    var removeEmulate = emulateTransitionEnd(element, duration, padding);
    var remove = listen_default(element, 'transitionend', handler);
    return function () {
        removeEmulate();
        remove();
    };
}

// node_modules/react-bootstrap/esm/transitionEndListener.js
function parseDuration2(node, property) {
    const str = css_default(node, property) || '';
    const mult = str.indexOf('ms') === -1 ? 1e3 : 1;
    return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
    const duration = parseDuration2(element, 'transitionDuration');
    const delay = parseDuration2(element, 'transitionDelay');
    const remove = transitionEnd(
        element,
        (e) => {
            if (e.target === element) {
                remove();
                handler(e);
            }
        },
        duration + delay
    );
}

// node_modules/react-bootstrap/esm/createChainedFunction.js
function createChainedFunction(...funcs) {
    return funcs
        .filter((f) => f != null)
        .reduce((acc, f) => {
            if (typeof f !== 'function') {
                throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
            }
            if (acc === null) return f;
            return function chainedFunction(...args) {
                acc.apply(this, args);
                f.apply(this, args);
            };
        }, null);
}
var createChainedFunction_default = createChainedFunction;

// node_modules/react-bootstrap/esm/triggerBrowserReflow.js
function triggerBrowserReflow(node) {
    node.offsetHeight;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_react7 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react6 = __toESM(require_react());
var toFnRef = (ref) =>
    !ref || typeof ref === 'function'
        ? ref
        : (value) => {
              ref.current = value;
          };
function mergeRefs(refA, refB) {
    const a = toFnRef(refA);
    const b = toFnRef(refB);
    return (value) => {
        if (a) a(value);
        if (b) b(value);
    };
}
function useMergedRefs(refA, refB) {
    return (0, import_react6.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/react-bootstrap/esm/safeFindDOMNode.js
var import_react_dom2 = __toESM(require_react_dom());
function safeFindDOMNode(componentOrElement) {
    if (componentOrElement && 'setState' in componentOrElement) {
        return import_react_dom2.default.findDOMNode(componentOrElement);
    }
    return componentOrElement != null ? componentOrElement : null;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var TransitionWrapper = import_react7.default.forwardRef(
    (
        { onEnter, onEntering, onEntered, onExit, onExiting, onExited, addEndListener, children, childRef, ...props },
        ref
    ) => {
        const nodeRef = (0, import_react7.useRef)(null);
        const mergedRef = useMergedRefs_default(nodeRef, childRef);
        const attachRef = (r) => {
            mergedRef(safeFindDOMNode(r));
        };
        const normalize = (callback) => (param) => {
            if (callback && nodeRef.current) {
                callback(nodeRef.current, param);
            }
        };
        const handleEnter = (0, import_react7.useCallback)(normalize(onEnter), [onEnter]);
        const handleEntering = (0, import_react7.useCallback)(normalize(onEntering), [onEntering]);
        const handleEntered = (0, import_react7.useCallback)(normalize(onEntered), [onEntered]);
        const handleExit = (0, import_react7.useCallback)(normalize(onExit), [onExit]);
        const handleExiting = (0, import_react7.useCallback)(normalize(onExiting), [onExiting]);
        const handleExited = (0, import_react7.useCallback)(normalize(onExited), [onExited]);
        const handleAddEndListener = (0, import_react7.useCallback)(normalize(addEndListener), [addEndListener]);
        return (0, import_jsx_runtime2.jsx)(Transition_default, {
            ref,
            ...props,
            onEnter: handleEnter,
            onEntered: handleEntered,
            onEntering: handleEntering,
            onExit: handleExit,
            onExited: handleExited,
            onExiting: handleExiting,
            addEndListener: handleAddEndListener,
            nodeRef,
            children:
                typeof children === 'function'
                    ? (status, innerProps) =>
                          // TODO: Types for RTG missing innerProps, so need to cast.
                          children(status, {
                              ...innerProps,
                              ref: attachRef,
                          })
                    : import_react7.default.cloneElement(children, {
                          ref: attachRef,
                      }),
        });
    }
);
var TransitionWrapper_default = TransitionWrapper;

// node_modules/react-bootstrap/esm/Collapse.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var MARGINS = {
    height: ['marginTop', 'marginBottom'],
    width: ['marginLeft', 'marginRight'],
};
function getDefaultDimensionValue(dimension, elem) {
    const offset2 = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
    const value = elem[offset2];
    const margins = MARGINS[dimension];
    return (
        value + // @ts-ignore
        parseInt(css_default(elem, margins[0]), 10) + // @ts-ignore
        parseInt(css_default(elem, margins[1]), 10)
    );
}
var collapseStyles = {
    [EXITED]: 'collapse',
    [EXITING]: 'collapsing',
    [ENTERING]: 'collapsing',
    [ENTERED]: 'collapse show',
};
var Collapse = import_react8.default.forwardRef(
    (
        {
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            className,
            children,
            dimension = 'height',
            in: inProp = false,
            timeout: timeout2 = 300,
            mountOnEnter = false,
            unmountOnExit = false,
            appear = false,
            getDimensionValue = getDefaultDimensionValue,
            ...props
        },
        ref
    ) => {
        const computedDimension = typeof dimension === 'function' ? dimension() : dimension;
        const handleEnter = (0, import_react8.useMemo)(
            () =>
                createChainedFunction_default((elem) => {
                    elem.style[computedDimension] = '0';
                }, onEnter),
            [computedDimension, onEnter]
        );
        const handleEntering = (0, import_react8.useMemo)(
            () =>
                createChainedFunction_default((elem) => {
                    const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
                    elem.style[computedDimension] = `${elem[scroll]}px`;
                }, onEntering),
            [computedDimension, onEntering]
        );
        const handleEntered = (0, import_react8.useMemo)(
            () =>
                createChainedFunction_default((elem) => {
                    elem.style[computedDimension] = null;
                }, onEntered),
            [computedDimension, onEntered]
        );
        const handleExit = (0, import_react8.useMemo)(
            () =>
                createChainedFunction_default((elem) => {
                    elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
                    triggerBrowserReflow(elem);
                }, onExit),
            [onExit, getDimensionValue, computedDimension]
        );
        const handleExiting = (0, import_react8.useMemo)(
            () =>
                createChainedFunction_default((elem) => {
                    elem.style[computedDimension] = null;
                }, onExiting),
            [computedDimension, onExiting]
        );
        return (0, import_jsx_runtime3.jsx)(TransitionWrapper_default, {
            ref,
            addEndListener: transitionEndListener,
            ...props,
            'aria-expanded': props.role ? inProp : null,
            onEnter: handleEnter,
            onEntering: handleEntering,
            onEntered: handleEntered,
            onExit: handleExit,
            onExiting: handleExiting,
            childRef: children.ref,
            in: inProp,
            timeout: timeout2,
            mountOnEnter,
            unmountOnExit,
            appear,
            children: (state, innerProps) =>
                import_react8.default.cloneElement(children, {
                    ...innerProps,
                    className: (0, import_classnames.default)(
                        className,
                        children.props.className,
                        collapseStyles[state],
                        computedDimension === 'width' && 'collapse-horizontal'
                    ),
                }),
        });
    }
);
var Collapse_default = Collapse;

// node_modules/react-bootstrap/esm/AccordionContext.js
var React7 = __toESM(require_react());
function isAccordionItemSelected(activeEventKey, eventKey) {
    return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}
var context = React7.createContext({});
context.displayName = 'AccordionContext';
var AccordionContext_default = context;

// node_modules/react-bootstrap/esm/AccordionCollapse.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var AccordionCollapse = React8.forwardRef(
    ({ as: Component2 = 'div', bsPrefix, className, children, eventKey, ...props }, ref) => {
        const { activeEventKey } = (0, import_react9.useContext)(AccordionContext_default);
        bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-collapse');
        return (0, import_jsx_runtime4.jsx)(Collapse_default, {
            ref,
            in: isAccordionItemSelected(activeEventKey, eventKey),
            ...props,
            className: (0, import_classnames2.default)(className, bsPrefix),
            children: (0, import_jsx_runtime4.jsx)(Component2, {
                children: React8.Children.only(children),
            }),
        });
    }
);
AccordionCollapse.displayName = 'AccordionCollapse';
var AccordionCollapse_default = AccordionCollapse;

// node_modules/react-bootstrap/esm/AccordionItemContext.js
var React9 = __toESM(require_react());
var context2 = React9.createContext({
    eventKey: '',
});
context2.displayName = 'AccordionItemContext';
var AccordionItemContext_default = context2;

// node_modules/react-bootstrap/esm/AccordionBody.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var AccordionBody = React10.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            bsPrefix,
            className,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
        const { eventKey } = (0, import_react10.useContext)(AccordionItemContext_default);
        return (0, import_jsx_runtime5.jsx)(AccordionCollapse_default, {
            eventKey,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            children: (0, import_jsx_runtime5.jsx)(Component2, {
                ref,
                ...props,
                className: (0, import_classnames3.default)(className, bsPrefix),
            }),
        });
    }
);
AccordionBody.displayName = 'AccordionBody';
var AccordionBody_default = AccordionBody;

// node_modules/react-bootstrap/esm/AccordionButton.js
var React11 = __toESM(require_react());
var import_react11 = __toESM(require_react());
var import_classnames4 = __toESM(require_classnames());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function useAccordionButton(eventKey, onClick) {
    const { activeEventKey, onSelect, alwaysOpen } = (0, import_react11.useContext)(AccordionContext_default);
    return (e) => {
        let eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
        if (alwaysOpen) {
            if (Array.isArray(activeEventKey)) {
                if (activeEventKey.includes(eventKey)) {
                    eventKeyPassed = activeEventKey.filter((k) => k !== eventKey);
                } else {
                    eventKeyPassed = [...activeEventKey, eventKey];
                }
            } else {
                eventKeyPassed = [eventKey];
            }
        }
        onSelect == null ? void 0 : onSelect(eventKeyPassed, e);
        onClick == null ? void 0 : onClick(e);
    };
}
var AccordionButton = React11.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'button',
            bsPrefix,
            className,
            onClick,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
        const { eventKey } = (0, import_react11.useContext)(AccordionItemContext_default);
        const accordionOnClick = useAccordionButton(eventKey, onClick);
        const { activeEventKey } = (0, import_react11.useContext)(AccordionContext_default);
        if (Component2 === 'button') {
            props.type = 'button';
        }
        return (0, import_jsx_runtime6.jsx)(Component2, {
            ref,
            onClick: accordionOnClick,
            ...props,
            'aria-expanded': Array.isArray(activeEventKey)
                ? activeEventKey.includes(eventKey)
                : eventKey === activeEventKey,
            className: (0, import_classnames4.default)(
                className,
                bsPrefix,
                !isAccordionItemSelected(activeEventKey, eventKey) && 'collapsed'
            ),
        });
    }
);
AccordionButton.displayName = 'AccordionButton';
var AccordionButton_default = AccordionButton;

// node_modules/react-bootstrap/esm/AccordionHeader.js
var import_classnames5 = __toESM(require_classnames());
var React12 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var AccordionHeader = React12.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'h2',
            bsPrefix,
            className,
            children,
            onClick,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-header');
        return (0, import_jsx_runtime7.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames5.default)(className, bsPrefix),
            children: (0, import_jsx_runtime7.jsx)(AccordionButton_default, {
                onClick,
                children,
            }),
        });
    }
);
AccordionHeader.displayName = 'AccordionHeader';
var AccordionHeader_default = AccordionHeader;

// node_modules/react-bootstrap/esm/AccordionItem.js
var import_classnames6 = __toESM(require_classnames());
var React13 = __toESM(require_react());
var import_react12 = __toESM(require_react());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var AccordionItem = React13.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            bsPrefix,
            className,
            eventKey,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-item');
        const contextValue = (0, import_react12.useMemo)(
            () => ({
                eventKey,
            }),
            [eventKey]
        );
        return (0, import_jsx_runtime8.jsx)(AccordionItemContext_default.Provider, {
            value: contextValue,
            children: (0, import_jsx_runtime8.jsx)(Component2, {
                ref,
                ...props,
                className: (0, import_classnames6.default)(className, bsPrefix),
            }),
        });
    }
);
AccordionItem.displayName = 'AccordionItem';
var AccordionItem_default = AccordionItem;

// node_modules/react-bootstrap/esm/Accordion.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var Accordion = React14.forwardRef((props, ref) => {
    const {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component2 = 'div',
        activeKey,
        bsPrefix,
        className,
        onSelect,
        flush,
        alwaysOpen,
        ...controlledProps
    } = useUncontrolled(props, {
        activeKey: 'onSelect',
    });
    const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
    const contextValue = (0, import_react13.useMemo)(
        () => ({
            activeEventKey: activeKey,
            onSelect,
            alwaysOpen,
        }),
        [activeKey, onSelect, alwaysOpen]
    );
    return (0, import_jsx_runtime9.jsx)(AccordionContext_default.Provider, {
        value: contextValue,
        children: (0, import_jsx_runtime9.jsx)(Component2, {
            ref,
            ...controlledProps,
            className: (0, import_classnames7.default)(className, prefix, flush && `${prefix}-flush`),
        }),
    });
});
Accordion.displayName = 'Accordion';
var Accordion_default = Object.assign(Accordion, {
    Button: AccordionButton_default,
    Collapse: AccordionCollapse_default,
    Item: AccordionItem_default,
    Header: AccordionHeader_default,
    Body: AccordionBody_default,
});

// node_modules/react-bootstrap/esm/Alert.js
var import_classnames13 = __toESM(require_classnames());
var React22 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react15 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react14 = __toESM(require_react());
function useCommittedRef(value) {
    const ref = (0, import_react14.useRef)(value);
    (0, import_react14.useEffect)(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn2) {
    const ref = useCommittedRef_default(fn2);
    return (0, import_react15.useCallback)(
        function (...args) {
            return ref.current && ref.current(...args);
        },
        [ref]
    );
}

// node_modules/react-bootstrap/esm/AlertHeading.js
var React16 = __toESM(require_react());
var import_classnames9 = __toESM(require_classnames());

// node_modules/react-bootstrap/esm/divWithClassName.js
var React15 = __toESM(require_react());
var import_classnames8 = __toESM(require_classnames());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var divWithClassName_default = (className) =>
    React15.forwardRef((p, ref) =>
        (0, import_jsx_runtime10.jsx)('div', {
            ...p,
            ref,
            className: (0, import_classnames8.default)(p.className, className),
        })
    );

// node_modules/react-bootstrap/esm/AlertHeading.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
var AlertHeading = React16.forwardRef(({ className, bsPrefix, as: Component2 = DivStyledAsH4, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-heading');
    return (0, import_jsx_runtime11.jsx)(Component2, {
        ref,
        className: (0, import_classnames9.default)(className, bsPrefix),
        ...props,
    });
});
AlertHeading.displayName = 'AlertHeading';
var AlertHeading_default = AlertHeading;

// node_modules/react-bootstrap/esm/AlertLink.js
var React19 = __toESM(require_react());
var import_classnames10 = __toESM(require_classnames());

// node_modules/@restart/ui/esm/Anchor.js
var React18 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCallbackRef.js
var import_react16 = __toESM(require_react());
function useCallbackRef() {
    return (0, import_react16.useState)(null);
}

// node_modules/@restart/hooks/esm/useEventListener.js
var import_react17 = __toESM(require_react());
function useEventListener(eventTarget, event, listener, capture = false) {
    const handler = useEventCallback(listener);
    (0, import_react17.useEffect)(() => {
        const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
        target.addEventListener(event, handler, capture);
        return () => target.removeEventListener(event, handler, capture);
    }, [eventTarget]);
}

// node_modules/@restart/hooks/esm/useGlobalListener.js
var import_react18 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useInterval.js
var import_react19 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useRafInterval.js
var import_react20 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMergeState.js
var import_react21 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMounted.js
var import_react22 = __toESM(require_react());
function useMounted() {
    const mounted = (0, import_react22.useRef)(true);
    const isMounted = (0, import_react22.useRef)(() => mounted.current);
    (0, import_react22.useEffect)(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return isMounted.current;
}

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react23 = __toESM(require_react());
function usePrevious(value) {
    const ref = (0, import_react23.useRef)(null);
    (0, import_react23.useEffect)(() => {
        ref.current = value;
    });
    return ref.current;
}

// node_modules/@restart/hooks/esm/useImage.js
var import_react24 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useResizeObserver.js
var import_react26 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var import_react25 = __toESM(require_react());
var isReactNative =
    typeof global !== 'undefined' && // @ts-ignore
    global.navigator && // @ts-ignore
    global.navigator.product === 'ReactNative';
var isDOM = typeof document !== 'undefined';
var useIsomorphicEffect_default = isDOM || isReactNative ? import_react25.useLayoutEffect : import_react25.useEffect;

// node_modules/@restart/ui/esm/Button.js
var React17 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var _excluded = ['as', 'disabled'];
function _objectWithoutPropertiesLoose2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function isTrivialHref(href) {
    return !href || href.trim() === '#';
}
function useButtonProps({ tagName, disabled, href, target, rel, role, onClick, tabIndex = 0, type }) {
    if (!tagName) {
        if (href != null || target != null || rel != null) {
            tagName = 'a';
        } else {
            tagName = 'button';
        }
    }
    const meta = {
        tagName,
    };
    if (tagName === 'button') {
        return [
            {
                type: type || 'button',
                disabled,
            },
            meta,
        ];
    }
    const handleClick = (event) => {
        if (disabled || (tagName === 'a' && isTrivialHref(href))) {
            event.preventDefault();
        }
        if (disabled) {
            event.stopPropagation();
            return;
        }
        onClick == null ? void 0 : onClick(event);
    };
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            event.preventDefault();
            handleClick(event);
        }
    };
    if (tagName === 'a') {
        href || (href = '#');
        if (disabled) {
            href = void 0;
        }
    }
    return [
        {
            role: role != null ? role : 'button',
            // explicitly undefined so that it overrides the props disabled in a spread
            // e.g. <Tag {...props} {...hookProps} />
            disabled: void 0,
            tabIndex: disabled ? void 0 : tabIndex,
            href,
            target: tagName === 'a' ? target : void 0,
            'aria-disabled': !disabled ? void 0 : disabled,
            rel: tagName === 'a' ? rel : void 0,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
        },
        meta,
    ];
}
var Button = React17.forwardRef((_ref, ref) => {
    let { as: asProp, disabled } = _ref,
        props = _objectWithoutPropertiesLoose2(_ref, _excluded);
    const [buttonProps, { tagName: Component2 }] = useButtonProps(
        Object.assign(
            {
                tagName: asProp,
                disabled,
            },
            props
        )
    );
    return (0, import_jsx_runtime12.jsx)(
        Component2,
        Object.assign({}, props, buttonProps, {
            ref,
        })
    );
});
Button.displayName = 'Button';
var Button_default = Button;

// node_modules/@restart/ui/esm/Anchor.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _excluded2 = ['onKeyDown'];
function _objectWithoutPropertiesLoose3(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function isTrivialHref2(href) {
    return !href || href.trim() === '#';
}
var Anchor = React18.forwardRef((_ref, ref) => {
    let { onKeyDown } = _ref,
        props = _objectWithoutPropertiesLoose3(_ref, _excluded2);
    const [buttonProps] = useButtonProps(
        Object.assign(
            {
                tagName: 'a',
            },
            props
        )
    );
    const handleKeyDown = useEventCallback((e) => {
        buttonProps.onKeyDown(e);
        onKeyDown == null ? void 0 : onKeyDown(e);
    });
    if (isTrivialHref2(props.href) || props.role === 'button') {
        return (0, import_jsx_runtime13.jsx)(
            'a',
            Object.assign(
                {
                    ref,
                },
                props,
                buttonProps,
                {
                    onKeyDown: handleKeyDown,
                }
            )
        );
    }
    return (0, import_jsx_runtime13.jsx)(
        'a',
        Object.assign(
            {
                ref,
            },
            props,
            {
                onKeyDown,
            }
        )
    );
});
Anchor.displayName = 'Anchor';
var Anchor_default = Anchor;

// node_modules/react-bootstrap/esm/AlertLink.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var AlertLink = React19.forwardRef(({ className, bsPrefix, as: Component2 = Anchor_default, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-link');
    return (0, import_jsx_runtime14.jsx)(Component2, {
        ref,
        className: (0, import_classnames10.default)(className, bsPrefix),
        ...props,
    });
});
AlertLink.displayName = 'AlertLink';
var AlertLink_default = AlertLink;

// node_modules/react-bootstrap/esm/Fade.js
var import_classnames11 = __toESM(require_classnames());
var React20 = __toESM(require_react());
var import_react27 = __toESM(require_react());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var fadeStyles = {
    [ENTERING]: 'show',
    [ENTERED]: 'show',
};
var Fade = React20.forwardRef(({ className, children, transitionClasses = {}, onEnter, ...rest }, ref) => {
    const props = {
        in: false,
        timeout: 300,
        mountOnEnter: false,
        unmountOnExit: false,
        appear: false,
        ...rest,
    };
    const handleEnter = (0, import_react27.useCallback)(
        (node, isAppearing) => {
            triggerBrowserReflow(node);
            onEnter == null ? void 0 : onEnter(node, isAppearing);
        },
        [onEnter]
    );
    return (0, import_jsx_runtime15.jsx)(TransitionWrapper_default, {
        ref,
        addEndListener: transitionEndListener,
        ...props,
        onEnter: handleEnter,
        childRef: children.ref,
        children: (status, innerProps) =>
            React20.cloneElement(children, {
                ...innerProps,
                className: (0, import_classnames11.default)(
                    'fade',
                    className,
                    children.props.className,
                    fadeStyles[status],
                    transitionClasses[status]
                ),
            }),
    });
});
Fade.displayName = 'Fade';
var Fade_default = Fade;

// node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types3 = __toESM(require_prop_types());
var React21 = __toESM(require_react());
var import_classnames12 = __toESM(require_classnames());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var propTypes = {
    /** An accessible label indicating the relevant information about the Close Button. */
    'aria-label': import_prop_types3.default.string,
    /** A callback fired after the Close Button is clicked. */
    onClick: import_prop_types3.default.func,
    /**
     * Render different color variant for the button.
     *
     * Omitting this will render the default dark color.
     */
    variant: import_prop_types3.default.oneOf(['white']),
};
var CloseButton = React21.forwardRef(({ className, variant, 'aria-label': ariaLabel = 'Close', ...props }, ref) =>
    (0, import_jsx_runtime16.jsx)('button', {
        ref,
        type: 'button',
        className: (0, import_classnames12.default)('btn-close', variant && `btn-close-${variant}`, className),
        'aria-label': ariaLabel,
        ...props,
    })
);
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
var CloseButton_default = CloseButton;

// node_modules/react-bootstrap/esm/Alert.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var Alert = React22.forwardRef((uncontrolledProps, ref) => {
    const {
        bsPrefix,
        show = true,
        closeLabel = 'Close alert',
        closeVariant,
        className,
        children,
        variant = 'primary',
        onClose,
        dismissible,
        transition = Fade_default,
        ...props
    } = useUncontrolled(uncontrolledProps, {
        show: 'onClose',
    });
    const prefix = useBootstrapPrefix(bsPrefix, 'alert');
    const handleClose = useEventCallback((e) => {
        if (onClose) {
            onClose(false, e);
        }
    });
    const Transition2 = transition === true ? Fade_default : transition;
    const alert = (0, import_jsx_runtime18.jsxs)('div', {
        role: 'alert',
        ...(!Transition2 ? props : void 0),
        ref,
        className: (0, import_classnames13.default)(
            className,
            prefix,
            variant && `${prefix}-${variant}`,
            dismissible && `${prefix}-dismissible`
        ),
        children: [
            dismissible &&
                (0, import_jsx_runtime17.jsx)(CloseButton_default, {
                    onClick: handleClose,
                    'aria-label': closeLabel,
                    variant: closeVariant,
                }),
            children,
        ],
    });
    if (!Transition2) return show ? alert : null;
    return (0, import_jsx_runtime17.jsx)(Transition2, {
        unmountOnExit: true,
        ...props,
        ref: void 0,
        in: show,
        children: alert,
    });
});
Alert.displayName = 'Alert';
var Alert_default = Object.assign(Alert, {
    Link: AlertLink_default,
    Heading: AlertHeading_default,
});

// node_modules/react-bootstrap/esm/Anchor.js
var Anchor_default2 = Anchor_default;

// node_modules/react-bootstrap/esm/Badge.js
var import_classnames14 = __toESM(require_classnames());
var React23 = __toESM(require_react());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var Badge = React23.forwardRef(
    ({ bsPrefix, bg = 'primary', pill = false, text, className, as: Component2 = 'span', ...props }, ref) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'badge');
        return (0, import_jsx_runtime19.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames14.default)(
                className,
                prefix,
                pill && `rounded-pill`,
                text && `text-${text}`,
                bg && `bg-${bg}`
            ),
        });
    }
);
Badge.displayName = 'Badge';
var Badge_default = Badge;

// node_modules/react-bootstrap/esm/Breadcrumb.js
var import_classnames16 = __toESM(require_classnames());
var React25 = __toESM(require_react());

// node_modules/react-bootstrap/esm/BreadcrumbItem.js
var import_classnames15 = __toESM(require_classnames());
var React24 = __toESM(require_react());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var BreadcrumbItem = React24.forwardRef(
    (
        {
            bsPrefix,
            active = false,
            children,
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'li',
            linkAs: LinkComponent = Anchor_default,
            linkProps = {},
            href,
            title,
            target,
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');
        return (0, import_jsx_runtime20.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames15.default)(prefix, className, {
                active,
            }),
            'aria-current': active ? 'page' : void 0,
            children: active
                ? children
                : (0, import_jsx_runtime20.jsx)(LinkComponent, {
                      ...linkProps,
                      href,
                      title,
                      target,
                      children,
                  }),
        });
    }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';
var BreadcrumbItem_default = BreadcrumbItem;

// node_modules/react-bootstrap/esm/Breadcrumb.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var Breadcrumb = React25.forwardRef(
    (
        {
            bsPrefix,
            className,
            listProps = {},
            children,
            label = 'breadcrumb',
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'nav',
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');
        return (0, import_jsx_runtime21.jsx)(Component2, {
            'aria-label': label,
            className,
            ref,
            ...props,
            children: (0, import_jsx_runtime21.jsx)('ol', {
                ...listProps,
                className: (0, import_classnames16.default)(prefix, listProps == null ? void 0 : listProps.className),
                children,
            }),
        });
    }
);
Breadcrumb.displayName = 'Breadcrumb';
var Breadcrumb_default = Object.assign(Breadcrumb, {
    Item: BreadcrumbItem_default,
});

// node_modules/react-bootstrap/esm/Button.js
var import_classnames17 = __toESM(require_classnames());
var React26 = __toESM(require_react());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var Button2 = React26.forwardRef(
    (
        { as, bsPrefix, variant = 'primary', size: size2, active = false, disabled = false, className, ...props },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'btn');
        const [buttonProps, { tagName }] = useButtonProps({
            tagName: as,
            disabled,
            ...props,
        });
        const Component2 = tagName;
        return (0, import_jsx_runtime22.jsx)(Component2, {
            ...buttonProps,
            ...props,
            ref,
            disabled,
            className: (0, import_classnames17.default)(
                className,
                prefix,
                active && 'active',
                variant && `${prefix}-${variant}`,
                size2 && `${prefix}-${size2}`,
                props.href && disabled && 'disabled'
            ),
        });
    }
);
Button2.displayName = 'Button';
var Button_default2 = Button2;

// node_modules/react-bootstrap/esm/ButtonGroup.js
var import_classnames18 = __toESM(require_classnames());
var React27 = __toESM(require_react());
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var ButtonGroup = React27.forwardRef(
    (
        {
            bsPrefix,
            size: size2,
            vertical = false,
            className,
            role = 'group',
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...rest
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
        let baseClass = prefix;
        if (vertical) baseClass = `${prefix}-vertical`;
        return (0, import_jsx_runtime23.jsx)(Component2, {
            ...rest,
            ref,
            role,
            className: (0, import_classnames18.default)(className, baseClass, size2 && `${prefix}-${size2}`),
        });
    }
);
ButtonGroup.displayName = 'ButtonGroup';
var ButtonGroup_default = ButtonGroup;

// node_modules/react-bootstrap/esm/ButtonToolbar.js
var import_classnames19 = __toESM(require_classnames());
var React28 = __toESM(require_react());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var ButtonToolbar = React28.forwardRef(({ bsPrefix, className, role = 'toolbar', ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');
    return (0, import_jsx_runtime24.jsx)('div', {
        ...props,
        ref,
        className: (0, import_classnames19.default)(className, prefix),
        role,
    });
});
ButtonToolbar.displayName = 'ButtonToolbar';
var ButtonToolbar_default = ButtonToolbar;

// node_modules/react-bootstrap/esm/Card.js
var import_classnames29 = __toESM(require_classnames());
var React39 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CardBody.js
var React29 = __toESM(require_react());
var import_classnames20 = __toESM(require_classnames());
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var CardBody = React29.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-body');
    return (0, import_jsx_runtime25.jsx)(Component2, {
        ref,
        className: (0, import_classnames20.default)(className, bsPrefix),
        ...props,
    });
});
CardBody.displayName = 'CardBody';
var CardBody_default = CardBody;

// node_modules/react-bootstrap/esm/CardFooter.js
var React30 = __toESM(require_react());
var import_classnames21 = __toESM(require_classnames());
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var CardFooter = React30.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-footer');
    return (0, import_jsx_runtime26.jsx)(Component2, {
        ref,
        className: (0, import_classnames21.default)(className, bsPrefix),
        ...props,
    });
});
CardFooter.displayName = 'CardFooter';
var CardFooter_default = CardFooter;

// node_modules/react-bootstrap/esm/CardHeader.js
var import_classnames22 = __toESM(require_classnames());
var React32 = __toESM(require_react());
var import_react28 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CardHeaderContext.js
var React31 = __toESM(require_react());
var context3 = React31.createContext(null);
context3.displayName = 'CardHeaderContext';
var CardHeaderContext_default = context3;

// node_modules/react-bootstrap/esm/CardHeader.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
var CardHeader = React32.forwardRef(
    (
        {
            bsPrefix,
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'card-header');
        const contextValue = (0, import_react28.useMemo)(
            () => ({
                cardHeaderBsPrefix: prefix,
            }),
            [prefix]
        );
        return (0, import_jsx_runtime27.jsx)(CardHeaderContext_default.Provider, {
            value: contextValue,
            children: (0, import_jsx_runtime27.jsx)(Component2, {
                ref,
                ...props,
                className: (0, import_classnames22.default)(className, prefix),
            }),
        });
    }
);
CardHeader.displayName = 'CardHeader';
var CardHeader_default = CardHeader;

// node_modules/react-bootstrap/esm/CardImg.js
var import_classnames23 = __toESM(require_classnames());
var React33 = __toESM(require_react());
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var CardImg = React33.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    ({ bsPrefix, className, variant, as: Component2 = 'img', ...props }, ref) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'card-img');
        return (0, import_jsx_runtime28.jsx)(Component2, {
            ref,
            className: (0, import_classnames23.default)(variant ? `${prefix}-${variant}` : prefix, className),
            ...props,
        });
    }
);
CardImg.displayName = 'CardImg';
var CardImg_default = CardImg;

// node_modules/react-bootstrap/esm/CardImgOverlay.js
var React34 = __toESM(require_react());
var import_classnames24 = __toESM(require_classnames());
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var CardImgOverlay = React34.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
    return (0, import_jsx_runtime29.jsx)(Component2, {
        ref,
        className: (0, import_classnames24.default)(className, bsPrefix),
        ...props,
    });
});
CardImgOverlay.displayName = 'CardImgOverlay';
var CardImgOverlay_default = CardImgOverlay;

// node_modules/react-bootstrap/esm/CardLink.js
var React35 = __toESM(require_react());
var import_classnames25 = __toESM(require_classnames());
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var CardLink = React35.forwardRef(({ className, bsPrefix, as: Component2 = 'a', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
    return (0, import_jsx_runtime30.jsx)(Component2, {
        ref,
        className: (0, import_classnames25.default)(className, bsPrefix),
        ...props,
    });
});
CardLink.displayName = 'CardLink';
var CardLink_default = CardLink;

// node_modules/react-bootstrap/esm/CardSubtitle.js
var React36 = __toESM(require_react());
var import_classnames26 = __toESM(require_classnames());
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var DivStyledAsH6 = divWithClassName_default('h6');
var CardSubtitle = React36.forwardRef(({ className, bsPrefix, as: Component2 = DivStyledAsH6, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
    return (0, import_jsx_runtime31.jsx)(Component2, {
        ref,
        className: (0, import_classnames26.default)(className, bsPrefix),
        ...props,
    });
});
CardSubtitle.displayName = 'CardSubtitle';
var CardSubtitle_default = CardSubtitle;

// node_modules/react-bootstrap/esm/CardText.js
var React37 = __toESM(require_react());
var import_classnames27 = __toESM(require_classnames());
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var CardText = React37.forwardRef(({ className, bsPrefix, as: Component2 = 'p', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
    return (0, import_jsx_runtime32.jsx)(Component2, {
        ref,
        className: (0, import_classnames27.default)(className, bsPrefix),
        ...props,
    });
});
CardText.displayName = 'CardText';
var CardText_default = CardText;

// node_modules/react-bootstrap/esm/CardTitle.js
var React38 = __toESM(require_react());
var import_classnames28 = __toESM(require_classnames());
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var DivStyledAsH5 = divWithClassName_default('h5');
var CardTitle = React38.forwardRef(({ className, bsPrefix, as: Component2 = DivStyledAsH5, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-title');
    return (0, import_jsx_runtime33.jsx)(Component2, {
        ref,
        className: (0, import_classnames28.default)(className, bsPrefix),
        ...props,
    });
});
CardTitle.displayName = 'CardTitle';
var CardTitle_default = CardTitle;

// node_modules/react-bootstrap/esm/Card.js
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var Card = React39.forwardRef(
    (
        {
            bsPrefix,
            className,
            bg,
            text,
            border,
            body = false,
            children,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'card');
        return (0, import_jsx_runtime34.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames29.default)(
                className,
                prefix,
                bg && `bg-${bg}`,
                text && `text-${text}`,
                border && `border-${border}`
            ),
            children: body
                ? (0, import_jsx_runtime34.jsx)(CardBody_default, {
                      children,
                  })
                : children,
        });
    }
);
Card.displayName = 'Card';
var Card_default = Object.assign(Card, {
    Img: CardImg_default,
    Title: CardTitle_default,
    Subtitle: CardSubtitle_default,
    Body: CardBody_default,
    Link: CardLink_default,
    Text: CardText_default,
    Header: CardHeader_default,
    Footer: CardFooter_default,
    ImgOverlay: CardImgOverlay_default,
});

// node_modules/react-bootstrap/esm/CardGroup.js
var React40 = __toESM(require_react());
var import_classnames30 = __toESM(require_classnames());
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
var CardGroup = React40.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-group');
    return (0, import_jsx_runtime35.jsx)(Component2, {
        ref,
        className: (0, import_classnames30.default)(className, bsPrefix),
        ...props,
    });
});
CardGroup.displayName = 'CardGroup';
var CardGroup_default = CardGroup;

// node_modules/@restart/hooks/esm/useUpdateEffect.js
var import_react29 = __toESM(require_react());
function useUpdateEffect(fn2, deps) {
    const isFirst = (0, import_react29.useRef)(true);
    (0, import_react29.useEffect)(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        return fn2();
    }, deps);
}
var useUpdateEffect_default = useUpdateEffect;

// node_modules/@restart/hooks/esm/useTimeout.js
var import_react32 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react30 = __toESM(require_react());
function useUpdatedRef(value) {
    const valueRef = (0, import_react30.useRef)(value);
    valueRef.current = value;
    return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react31 = __toESM(require_react());
function useWillUnmount(fn2) {
    const onUnmount = useUpdatedRef(fn2);
    (0, import_react31.useEffect)(() => () => onUnmount.current(), []);
}

// node_modules/@restart/hooks/esm/useTimeout.js
var MAX_DELAY_MS = 2 ** 31 - 1;
function setChainedTimeout(handleRef, fn2, timeoutAtMs) {
    const delayMs = timeoutAtMs - Date.now();
    handleRef.current =
        delayMs <= MAX_DELAY_MS
            ? setTimeout(fn2, delayMs)
            : setTimeout(() => setChainedTimeout(handleRef, fn2, timeoutAtMs), MAX_DELAY_MS);
}
function useTimeout() {
    const isMounted = useMounted();
    const handleRef = (0, import_react32.useRef)();
    useWillUnmount(() => clearTimeout(handleRef.current));
    return (0, import_react32.useMemo)(() => {
        const clear = () => clearTimeout(handleRef.current);
        function set(fn2, delayMs = 0) {
            if (!isMounted()) return;
            clear();
            if (delayMs <= MAX_DELAY_MS) {
                handleRef.current = setTimeout(fn2, delayMs);
            } else {
                setChainedTimeout(handleRef, fn2, Date.now() + delayMs);
            }
        }
        return {
            set,
            clear,
            handleRef,
        };
    }, []);
}

// node_modules/react-bootstrap/esm/Carousel.js
var import_classnames33 = __toESM(require_classnames());
var React44 = __toESM(require_react());
var import_react33 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CarouselCaption.js
var React41 = __toESM(require_react());
var import_classnames31 = __toESM(require_classnames());
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var CarouselCaption = React41.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'carousel-caption');
    return (0, import_jsx_runtime36.jsx)(Component2, {
        ref,
        className: (0, import_classnames31.default)(className, bsPrefix),
        ...props,
    });
});
CarouselCaption.displayName = 'CarouselCaption';
var CarouselCaption_default = CarouselCaption;

// node_modules/react-bootstrap/esm/CarouselItem.js
var import_classnames32 = __toESM(require_classnames());
var React42 = __toESM(require_react());
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var CarouselItem = React42.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            bsPrefix,
            className,
            ...props
        },
        ref
    ) => {
        const finalClassName = (0, import_classnames32.default)(
            className,
            useBootstrapPrefix(bsPrefix, 'carousel-item')
        );
        return (0, import_jsx_runtime37.jsx)(Component2, {
            ref,
            ...props,
            className: finalClassName,
        });
    }
);
CarouselItem.displayName = 'CarouselItem';
var CarouselItem_default = CarouselItem;

// node_modules/react-bootstrap/esm/ElementChildren.js
var React43 = __toESM(require_react());
function map(children, func) {
    let index = 0;
    return React43.Children.map(children, (child) => (React43.isValidElement(child) ? func(child, index++) : child));
}
function forEach(children, func) {
    let index = 0;
    React43.Children.forEach(children, (child) => {
        if (React43.isValidElement(child)) func(child, index++);
    });
}
function hasChildOfType(children, type) {
    return React43.Children.toArray(children).some((child) => React43.isValidElement(child) && child.type === type);
}

// node_modules/react-bootstrap/esm/Carousel.js
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var SWIPE_THRESHOLD = 40;
function isVisible(element) {
    if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
        return false;
    }
    const elementStyle = getComputedStyle(element);
    return (
        elementStyle.display !== 'none' &&
        elementStyle.visibility !== 'hidden' &&
        getComputedStyle(element.parentNode).display !== 'none'
    );
}
var Carousel = React44.forwardRef(({ defaultActiveIndex = 0, ...uncontrolledProps }, ref) => {
    const {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component2 = 'div',
        bsPrefix,
        slide = true,
        fade = false,
        controls = true,
        indicators = true,
        indicatorLabels = [],
        activeIndex,
        onSelect,
        onSlide,
        onSlid,
        interval = 5e3,
        keyboard = true,
        onKeyDown,
        pause = 'hover',
        onMouseOver,
        onMouseOut,
        wrap = true,
        touch = true,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        prevIcon = (0, import_jsx_runtime38.jsx)('span', {
            'aria-hidden': 'true',
            className: 'carousel-control-prev-icon',
        }),
        prevLabel = 'Previous',
        nextIcon = (0, import_jsx_runtime38.jsx)('span', {
            'aria-hidden': 'true',
            className: 'carousel-control-next-icon',
        }),
        nextLabel = 'Next',
        variant,
        className,
        children,
        ...props
    } = useUncontrolled(
        {
            defaultActiveIndex,
            ...uncontrolledProps,
        },
        {
            activeIndex: 'onSelect',
        }
    );
    const prefix = useBootstrapPrefix(bsPrefix, 'carousel');
    const isRTL = useIsRTL();
    const nextDirectionRef = (0, import_react33.useRef)(null);
    const [direction, setDirection] = (0, import_react33.useState)('next');
    const [paused, setPaused] = (0, import_react33.useState)(false);
    const [isSliding, setIsSliding] = (0, import_react33.useState)(false);
    const [renderedActiveIndex, setRenderedActiveIndex] = (0, import_react33.useState)(activeIndex || 0);
    (0, import_react33.useEffect)(() => {
        if (!isSliding && activeIndex !== renderedActiveIndex) {
            if (nextDirectionRef.current) {
                setDirection(nextDirectionRef.current);
            } else {
                setDirection((activeIndex || 0) > renderedActiveIndex ? 'next' : 'prev');
            }
            if (slide) {
                setIsSliding(true);
            }
            setRenderedActiveIndex(activeIndex || 0);
        }
    }, [activeIndex, isSliding, renderedActiveIndex, slide]);
    (0, import_react33.useEffect)(() => {
        if (nextDirectionRef.current) {
            nextDirectionRef.current = null;
        }
    });
    let numChildren = 0;
    let activeChildInterval;
    forEach(children, (child, index) => {
        ++numChildren;
        if (index === activeIndex) {
            activeChildInterval = child.props.interval;
        }
    });
    const activeChildIntervalRef = useCommittedRef_default(activeChildInterval);
    const prev = (0, import_react33.useCallback)(
        (event) => {
            if (isSliding) {
                return;
            }
            let nextActiveIndex = renderedActiveIndex - 1;
            if (nextActiveIndex < 0) {
                if (!wrap) {
                    return;
                }
                nextActiveIndex = numChildren - 1;
            }
            nextDirectionRef.current = 'prev';
            onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
        },
        [isSliding, renderedActiveIndex, onSelect, wrap, numChildren]
    );
    const next = useEventCallback((event) => {
        if (isSliding) {
            return;
        }
        let nextActiveIndex = renderedActiveIndex + 1;
        if (nextActiveIndex >= numChildren) {
            if (!wrap) {
                return;
            }
            nextActiveIndex = 0;
        }
        nextDirectionRef.current = 'next';
        onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
    });
    const elementRef = (0, import_react33.useRef)();
    (0, import_react33.useImperativeHandle)(ref, () => ({
        element: elementRef.current,
        prev,
        next,
    }));
    const nextWhenVisible = useEventCallback(() => {
        if (!document.hidden && isVisible(elementRef.current)) {
            if (isRTL) {
                prev();
            } else {
                next();
            }
        }
    });
    const slideDirection = direction === 'next' ? 'start' : 'end';
    useUpdateEffect_default(() => {
        if (slide) {
            return;
        }
        onSlide == null ? void 0 : onSlide(renderedActiveIndex, slideDirection);
        onSlid == null ? void 0 : onSlid(renderedActiveIndex, slideDirection);
    }, [renderedActiveIndex]);
    const orderClassName = `${prefix}-item-${direction}`;
    const directionalClassName = `${prefix}-item-${slideDirection}`;
    const handleEnter = (0, import_react33.useCallback)(
        (node) => {
            triggerBrowserReflow(node);
            onSlide == null ? void 0 : onSlide(renderedActiveIndex, slideDirection);
        },
        [onSlide, renderedActiveIndex, slideDirection]
    );
    const handleEntered = (0, import_react33.useCallback)(() => {
        setIsSliding(false);
        onSlid == null ? void 0 : onSlid(renderedActiveIndex, slideDirection);
    }, [onSlid, renderedActiveIndex, slideDirection]);
    const handleKeyDown = (0, import_react33.useCallback)(
        (event) => {
            if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (isRTL) {
                            next(event);
                        } else {
                            prev(event);
                        }
                        return;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (isRTL) {
                            prev(event);
                        } else {
                            next(event);
                        }
                        return;
                    default:
                }
            }
            onKeyDown == null ? void 0 : onKeyDown(event);
        },
        [keyboard, onKeyDown, prev, next, isRTL]
    );
    const handleMouseOver = (0, import_react33.useCallback)(
        (event) => {
            if (pause === 'hover') {
                setPaused(true);
            }
            onMouseOver == null ? void 0 : onMouseOver(event);
        },
        [pause, onMouseOver]
    );
    const handleMouseOut = (0, import_react33.useCallback)(
        (event) => {
            setPaused(false);
            onMouseOut == null ? void 0 : onMouseOut(event);
        },
        [onMouseOut]
    );
    const touchStartXRef = (0, import_react33.useRef)(0);
    const touchDeltaXRef = (0, import_react33.useRef)(0);
    const touchUnpauseTimeout = useTimeout();
    const handleTouchStart = (0, import_react33.useCallback)(
        (event) => {
            touchStartXRef.current = event.touches[0].clientX;
            touchDeltaXRef.current = 0;
            if (pause === 'hover') {
                setPaused(true);
            }
            onTouchStart == null ? void 0 : onTouchStart(event);
        },
        [pause, onTouchStart]
    );
    const handleTouchMove = (0, import_react33.useCallback)(
        (event) => {
            if (event.touches && event.touches.length > 1) {
                touchDeltaXRef.current = 0;
            } else {
                touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
            }
            onTouchMove == null ? void 0 : onTouchMove(event);
        },
        [onTouchMove]
    );
    const handleTouchEnd = (0, import_react33.useCallback)(
        (event) => {
            if (touch) {
                const touchDeltaX = touchDeltaXRef.current;
                if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
                    if (touchDeltaX > 0) {
                        prev(event);
                    } else {
                        next(event);
                    }
                }
            }
            if (pause === 'hover') {
                touchUnpauseTimeout.set(
                    () => {
                        setPaused(false);
                    },
                    interval || void 0
                );
            }
            onTouchEnd == null ? void 0 : onTouchEnd(event);
        },
        [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd]
    );
    const shouldPlay = interval != null && !paused && !isSliding;
    const intervalHandleRef = (0, import_react33.useRef)();
    (0, import_react33.useEffect)(() => {
        var _ref, _activeChildIntervalR;
        if (!shouldPlay) {
            return void 0;
        }
        const nextFunc = isRTL ? prev : next;
        intervalHandleRef.current = window.setInterval(
            document.visibilityState ? nextWhenVisible : nextFunc,
            (_ref =
                (_activeChildIntervalR = activeChildIntervalRef.current) != null ? _activeChildIntervalR : interval) !=
                null
                ? _ref
                : void 0
        );
        return () => {
            if (intervalHandleRef.current !== null) {
                clearInterval(intervalHandleRef.current);
            }
        };
    }, [shouldPlay, prev, next, activeChildIntervalRef, interval, nextWhenVisible, isRTL]);
    const indicatorOnClicks = (0, import_react33.useMemo)(
        () =>
            indicators &&
            Array.from(
                {
                    length: numChildren,
                },
                (_, index) => (event) => {
                    onSelect == null ? void 0 : onSelect(index, event);
                }
            ),
        [indicators, numChildren, onSelect]
    );
    return (0, import_jsx_runtime39.jsxs)(Component2, {
        ref: elementRef,
        ...props,
        onKeyDown: handleKeyDown,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        className: (0, import_classnames33.default)(
            className,
            prefix,
            slide && 'slide',
            fade && `${prefix}-fade`,
            variant && `${prefix}-${variant}`
        ),
        children: [
            indicators &&
                (0, import_jsx_runtime38.jsx)('div', {
                    className: `${prefix}-indicators`,
                    children: map(children, (_, index) =>
                        (0, import_jsx_runtime38.jsx)(
                            'button',
                            {
                                type: 'button',
                                'data-bs-target': '',
                                'aria-label':
                                    indicatorLabels != null && indicatorLabels.length
                                        ? indicatorLabels[index]
                                        : `Slide ${index + 1}`,
                                className: index === renderedActiveIndex ? 'active' : void 0,
                                onClick: indicatorOnClicks ? indicatorOnClicks[index] : void 0,
                                'aria-current': index === renderedActiveIndex,
                            },
                            index
                        )
                    ),
                }),
            (0, import_jsx_runtime38.jsx)('div', {
                className: `${prefix}-inner`,
                children: map(children, (child, index) => {
                    const isActive = index === renderedActiveIndex;
                    return slide
                        ? (0, import_jsx_runtime38.jsx)(TransitionWrapper_default, {
                              in: isActive,
                              onEnter: isActive ? handleEnter : void 0,
                              onEntered: isActive ? handleEntered : void 0,
                              addEndListener: transitionEndListener,
                              children: (status, innerProps) =>
                                  React44.cloneElement(child, {
                                      ...innerProps,
                                      className: (0, import_classnames33.default)(
                                          child.props.className,
                                          isActive && status !== 'entered' && orderClassName,
                                          (status === 'entered' || status === 'exiting') && 'active',
                                          (status === 'entering' || status === 'exiting') && directionalClassName
                                      ),
                                  }),
                          })
                        : React44.cloneElement(child, {
                              className: (0, import_classnames33.default)(child.props.className, isActive && 'active'),
                          });
                }),
            }),
            controls &&
                (0, import_jsx_runtime39.jsxs)(import_jsx_runtime40.Fragment, {
                    children: [
                        (wrap || activeIndex !== 0) &&
                            (0, import_jsx_runtime39.jsxs)(Anchor_default, {
                                className: `${prefix}-control-prev`,
                                onClick: prev,
                                children: [
                                    prevIcon,
                                    prevLabel &&
                                        (0, import_jsx_runtime38.jsx)('span', {
                                            className: 'visually-hidden',
                                            children: prevLabel,
                                        }),
                                ],
                            }),
                        (wrap || activeIndex !== numChildren - 1) &&
                            (0, import_jsx_runtime39.jsxs)(Anchor_default, {
                                className: `${prefix}-control-next`,
                                onClick: next,
                                children: [
                                    nextIcon,
                                    nextLabel &&
                                        (0, import_jsx_runtime38.jsx)('span', {
                                            className: 'visually-hidden',
                                            children: nextLabel,
                                        }),
                                ],
                            }),
                    ],
                }),
        ],
    });
});
Carousel.displayName = 'Carousel';
var Carousel_default = Object.assign(Carousel, {
    Caption: CarouselCaption_default,
    Item: CarouselItem_default,
});

// node_modules/react-bootstrap/esm/Col.js
var import_classnames34 = __toESM(require_classnames());
var React45 = __toESM(require_react());
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
function useCol({ as, bsPrefix, className, ...props }) {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'col');
    const breakpoints = useBootstrapBreakpoints();
    const minBreakpoint = useBootstrapMinBreakpoint();
    const spans = [];
    const classes = [];
    breakpoints.forEach((brkPoint) => {
        const propValue = props[brkPoint];
        delete props[brkPoint];
        let span;
        let offset2;
        let order2;
        if (typeof propValue === 'object' && propValue != null) {
            ({ span, offset: offset2, order: order2 } = propValue);
        } else {
            span = propValue;
        }
        const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
        if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
        if (order2 != null) classes.push(`order${infix}-${order2}`);
        if (offset2 != null) classes.push(`offset${infix}-${offset2}`);
    });
    return [
        {
            ...props,
            className: (0, import_classnames34.default)(className, ...spans, ...classes),
        },
        {
            as,
            bsPrefix,
            spans,
        },
    ];
}
var Col = React45.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    (props, ref) => {
        const [{ className, ...colProps }, { as: Component2 = 'div', bsPrefix, spans }] = useCol(props);
        return (0, import_jsx_runtime41.jsx)(Component2, {
            ...colProps,
            ref,
            className: (0, import_classnames34.default)(className, !spans.length && bsPrefix),
        });
    }
);
Col.displayName = 'Col';
var Col_default = Col;

// node_modules/react-bootstrap/esm/Container.js
var import_classnames35 = __toESM(require_classnames());
var React46 = __toESM(require_react());
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
var Container = React46.forwardRef(
    (
        {
            bsPrefix,
            fluid = false,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            className,
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'container');
        const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
        return (0, import_jsx_runtime42.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames35.default)(className, fluid ? `${prefix}${suffix}` : prefix),
        });
    }
);
Container.displayName = 'Container';
var Container_default = Container;

// node_modules/react-bootstrap/esm/Dropdown.js
var import_classnames42 = __toESM(require_classnames());
var React63 = __toESM(require_react());
var import_react48 = __toESM(require_react());

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
    return toArray(element.querySelectorAll(selector));
}

// node_modules/@restart/ui/esm/Dropdown.js
var import_react44 = __toESM(require_react());
var React53 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js
var import_react34 = __toESM(require_react());
function useUncontrolledProp2(propValue, defaultValue, handler) {
    const wasPropRef = (0, import_react34.useRef)(propValue !== void 0);
    const [stateValue, setState] = (0, import_react34.useState)(defaultValue);
    const isProp2 = propValue !== void 0;
    const wasProp = wasPropRef.current;
    wasPropRef.current = isProp2;
    if (!isProp2 && wasProp && stateValue !== defaultValue) {
        setState(defaultValue);
    }
    return [
        isProp2 ? propValue : stateValue,
        (0, import_react34.useCallback)(
            (...args) => {
                const [value, ...rest] = args;
                let returnValue = handler == null ? void 0 : handler(value, ...rest);
                setState(value);
                return returnValue;
            },
            [handler]
        ),
    ];
}

// node_modules/@restart/hooks/esm/useForceUpdate.js
var import_react35 = __toESM(require_react());
function useForceUpdate() {
    const [, dispatch] = (0, import_react35.useReducer)((state) => !state, false);
    return dispatch;
}

// node_modules/@restart/ui/esm/DropdownContext.js
var React47 = __toESM(require_react());
var DropdownContext = React47.createContext(null);
var DropdownContext_default = DropdownContext;

// node_modules/@restart/ui/esm/DropdownMenu.js
var import_react39 = __toESM(require_react());
var React48 = __toESM(require_react());

// node_modules/@restart/ui/esm/usePopper.js
var import_react37 = __toESM(require_react());

// node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()) {
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while (len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo) {
                tmp = len;
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo) {
                tmp = len[0];
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while (len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while (len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for (ctor in foo) {
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}

// node_modules/@restart/hooks/esm/useSafeState.js
var import_react36 = __toESM(require_react());
function useSafeState(state) {
    const isMounted = useMounted();
    return [
        state[0],
        (0, import_react36.useCallback)(
            (nextState) => {
                if (!isMounted()) return;
                return state[1](nextState);
            },
            [isMounted, state[1]]
        ),
    ];
}
var useSafeState_default = useSafeState;

// node_modules/@popperjs/core/lib/enums.js
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + '-' + start, placement + '-' + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + '-' + start, placement + '-' + end]);
}, []);
var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead';
var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain';
var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
    return placement.split('-')[0];
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
    if (node == null) {
        return window;
    }
    if (node.toString() !== '[object Window]') {
        var ownerDocument2 = node.ownerDocument;
        return ownerDocument2 ? ownerDocument2.defaultView || window : window;
    }
    return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
    if (typeof ShadowRoot === 'undefined') {
        return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands
            .map(function (item) {
                return item.brand + '/' + item.version;
            })
            .join(' ');
    }
    return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
        includeScale = false;
    }
    if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
        width,
        height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x,
        y,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
    }
    return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width,
        height,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
        return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;
        do {
            if (next && parent.isSameNode(next)) {
                return true;
            }
            next = next.parentNode || next.host;
        } while (next);
    }
    return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle3(element) {
    return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
    return (
        (isElement(element)
            ? element.ownerDocument
            : // $FlowFixMe[prop-missing]
              element.document) || window.document
    ).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
    if (getNodeName(element) === 'html') {
        return element;
    }
    return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element)
    );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
    if (
        !isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle3(element).position === 'fixed'
    ) {
        return null;
    }
    return element.offsetParent;
}
function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
        var elementCss = getComputedStyle3(element);
        if (elementCss.position === 'fixed') {
            return null;
        }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle3(currentNode);
        if (
            css.transform !== 'none' ||
            css.perspective !== 'none' ||
            css.contain === 'paint' ||
            ['transform', 'perspective'].indexOf(css.willChange) !== -1 ||
            (isFirefox && css.willChange === 'filter') ||
            (isFirefox && css.filter && css.filter !== 'none')
        ) {
            return currentNode;
        } else {
            currentNode = currentNode.parentNode;
        }
    }
    return null;
}
function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle3(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (
        offsetParent &&
        (getNodeName(offsetParent) === 'html' ||
            (getNodeName(offsetParent) === 'body' && getComputedStyle3(offsetParent).position === 'static'))
    ) {
        return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
    return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
    }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
    padding =
        typeof padding === 'function'
            ? padding(
                  Object.assign({}, state.rects, {
                      placement: state.placement,
                  })
              )
            : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';
    if (!arrowElement || !popperOffsets2) {
        return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff =
        state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent
        ? axis === 'y'
            ? arrowOffsetParent.clientHeight || 0
            : arrowOffsetParent.clientWidth || 0
        : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] =
        ((_state$modifiersData$ = {}),
        (_state$modifiersData$[axisProp] = offset2),
        (_state$modifiersData$.centerOffset = offset2 - center),
        _state$modifiersData$);
}
function effect(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
    if (arrowElement == null) {
        return;
    }
    if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) {
            return;
        }
    }
    if (!contains(state.elements.popper, arrowElement)) {
        return;
    }
    state.elements.arrow = arrowElement;
}
var arrow_default = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow'],
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
    return placement.split('-')[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
};
function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0,
    };
}
function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 =
        typeof roundOffsets === 'function'
            ? roundOffsets({
                  x,
                  y,
              })
            : {
                  x,
                  y,
              };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
        var offsetParent = getOffsetParent(popper2);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';
        if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle3(offsetParent).position !== 'static' && position === 'absolute') {
                heightProp = 'scrollHeight';
                widthProp = 'scrollWidth';
            }
        }
        offsetParent = offsetParent;
        if (placement === top || ((placement === left || placement === right) && variation === end)) {
            sideY = bottom;
            var offsetY =
                isFixed && offsetParent === win && win.visualViewport
                    ? win.visualViewport.height
                    : // $FlowFixMe[prop-missing]
                      offsetParent[heightProp];
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === left || ((placement === top || placement === bottom) && variation === end)) {
            sideX = right;
            var offsetX =
                isFixed && offsetParent === win && win.visualViewport
                    ? win.visualViewport.width
                    : // $FlowFixMe[prop-missing]
                      offsetParent[widthProp];
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
        }
    }
    var commonStyles = Object.assign(
        {
            position,
        },
        adaptive && unsetSides
    );
    var _ref4 =
        roundOffsets === true
            ? roundOffsetsByDPR(
                  {
                      x,
                      y,
                  },
                  getWindow(popper2)
              )
            : {
                  x,
                  y,
              };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign(
            {},
            commonStyles,
            ((_Object$assign = {}),
            (_Object$assign[sideY] = hasY ? '0' : ''),
            (_Object$assign[sideX] = hasX ? '0' : ''),
            (_Object$assign.transform =
                (win.devicePixelRatio || 1) <= 1
                    ? 'translate(' + x + 'px, ' + y + 'px)'
                    : 'translate3d(' + x + 'px, ' + y + 'px, 0)'),
            _Object$assign)
        );
    }
    return Object.assign(
        {},
        commonStyles,
        ((_Object$assign2 = {}),
        (_Object$assign2[sideY] = hasY ? y + 'px' : ''),
        (_Object$assign2[sideX] = hasX ? x + 'px' : ''),
        (_Object$assign2.transform = ''),
        _Object$assign2)
    );
}
function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration,
        isFixed: state.options.strategy === 'fixed',
    };
    if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign(
            {},
            state.styles.popper,
            mapToStyles(
                Object.assign({}, commonStyles, {
                    offsets: state.modifiersData.popperOffsets,
                    position: state.options.strategy,
                    adaptive,
                    roundOffsets,
                })
            )
        );
    }
    if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign(
            {},
            state.styles.arrow,
            mapToStyles(
                Object.assign({}, commonStyles, {
                    offsets: state.modifiersData.arrow,
                    position: 'absolute',
                    adaptive: false,
                    roundOffsets,
                })
            )
        );
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement,
    });
}
var computeStyles_default = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {},
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
    passive: true,
};
function effect2(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
        scrollParents.forEach(function (scrollParent) {
            scrollParent.addEventListener('scroll', instance.update, passive);
        });
    }
    if (resize) {
        window2.addEventListener('resize', instance.update, passive);
    }
    return function () {
        if (scroll) {
            scrollParents.forEach(function (scrollParent) {
                scrollParent.removeEventListener('scroll', instance.update, passive);
            });
        }
        if (resize) {
            window2.removeEventListener('resize', instance.update, passive);
        }
    };
}
var eventListeners_default = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect2,
    data: {},
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom',
};
function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched];
    });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
    start: 'end',
    end: 'start',
};
function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
        return hash2[matched];
    });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
        scrollLeft,
        scrollTop,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();
        if (layoutViewport || (!layoutViewport && strategy === 'fixed')) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width,
        height,
        x: x + getWindowScrollBarX(element),
        y,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle3(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
        width,
        height,
        x,
        y,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle3(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
    }
    return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
        list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody =
        scrollParent ===
        ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody
        ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : [])
        : scrollParent;
    var updatedList = list.concat(target);
    return isBody
        ? updatedList
        : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
          updatedList.concat(listScrollParents(getParentNode(target)));
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
    return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height,
    });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport
        ? rectToClientRect(getViewportRect(element, strategy))
        : isElement(clippingParent)
          ? getInnerBoundingClientRect(clippingParent, strategy)
          : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle3(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
        return [];
    }
    return clippingParents2.filter(function (clippingParent) {
        return (
            isElement(clippingParent) &&
            contains(clippingParent, clipperElement) &&
            getNodeName(clippingParent) !== 'body'
        );
    });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(
        function (accRect, clippingParent) {
            var rect = getClientRectFromMixedType(element, clippingParent, strategy);
            accRect.top = max(rect.top, accRect.top);
            accRect.right = min(rect.right, accRect.right);
            accRect.bottom = min(rect.bottom, accRect.bottom);
            accRect.left = max(rect.left, accRect.left);
            return accRect;
        },
        getClientRectFromMixedType(element, firstClippingParent, strategy)
    );
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
    var reference2 = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
        case top:
            offsets = {
                x: commonX,
                y: reference2.y - element.height,
            };
            break;
        case bottom:
            offsets = {
                x: commonX,
                y: reference2.y + reference2.height,
            };
            break;
        case right:
            offsets = {
                x: reference2.x + reference2.width,
                y: commonY,
            };
            break;
        case left:
            offsets = {
                x: reference2.x - element.width,
                y: commonY,
            };
            break;
        default:
            offsets = {
                x: reference2.x,
                y: reference2.y,
            };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';
        switch (variation) {
            case start:
                offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
                break;
            case end:
                offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
                break;
            default:
        }
    }
    return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
    if (options === void 0) {
        options = {};
    }
    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(
        typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements)
    );
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(
        isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper),
        boundary,
        rootBoundary,
        strategy
    );
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement,
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right,
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
        var offset2 = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
            overflowOffsets[key] += offset2[axis] * multiply;
        });
    }
    return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
    if (options === void 0) {
        options = {};
    }
    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements2 = variation
        ? flipVariations
            ? variationPlacements
            : variationPlacements.filter(function (placement2) {
                  return getVariation(placement2) === variation;
              })
        : basePlacements;
    var allowedPlacements = placements2.filter(function (placement2) {
        return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
        allowedPlacements = placements2;
    }
    var overflows = allowedPlacements.reduce(function (acc, placement2) {
        acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
        })[getBasePlacement(placement2)];
        return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
    });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
        return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [
        getOppositeVariationPlacement(placement),
        oppositePlacement,
        getOppositeVariationPlacement(oppositePlacement),
    ];
}
function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    if (state.modifiersData[name]._skip) {
        return;
    }
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipVariations
            ? [getOppositePlacement(preferredPlacement)]
            : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement2) {
        return acc.concat(
            getBasePlacement(placement2) === auto
                ? computeAutoPlacement(state, {
                      placement: placement2,
                      boundary,
                      rootBoundary,
                      padding,
                      flipVariations,
                      allowedAutoPlacements,
                  })
                : placement2
        );
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
        var placement = placements2[i];
        var _basePlacement = getBasePlacement(placement);
        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding,
        });
        var mainVariationSide = isVertical ? (isStartVariation ? right : left) : isStartVariation ? bottom : top;
        if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
        }
        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];
        if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
        }
        if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }
        if (
            checks.every(function (check) {
                return check;
            })
        ) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
        }
        checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function (placement2) {
                var checks2 = checksMap.get(placement2);
                if (checks2) {
                    return checks2.slice(0, _i2).every(function (check) {
                        return check;
                    });
                }
            });
            if (fittingPlacement) {
                firstFittingPlacement = fittingPlacement;
                return 'break';
            }
        };
        for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === 'break') break;
        }
    }
    if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
    }
}
var flip_default = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
        _skip: false,
    },
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
        preventedOffsets = {
            x: 0,
            y: 0,
        };
    }
    return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x,
    };
}
function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
    });
}
function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference',
    });
    var popperAltOverflow = detectOverflow(state, {
        altBoundary: true,
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
        referenceClippingOffsets,
        popperEscapeOffsets,
        isReferenceHidden,
        hasPopperEscaped,
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped,
    });
}
var hide_default = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide,
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref =
            typeof offset2 === 'function'
                ? offset2(
                      Object.assign({}, rects, {
                          placement,
                      })
                  )
                : offset2,
        skidding = _ref[0],
        distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0
        ? {
              x: distance,
              y: skidding,
          }
        : {
              x: skidding,
              y: distance,
          };
}
function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
        return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
}
var offset_default = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset,
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement,
    });
}
var popperOffsets_default = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {},
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
        boundary,
        rootBoundary,
        padding,
        altBoundary,
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue =
        typeof tetherOffset === 'function'
            ? tetherOffset(
                  Object.assign({}, state.rects, {
                      placement: state.placement,
                  })
              )
            : tetherOffset;
    var normalizedTetherOffsetValue =
        typeof tetherOffsetValue === 'number'
            ? {
                  mainAxis: tetherOffsetValue,
                  altAxis: tetherOffsetValue,
              }
            : Object.assign(
                  {
                      mainAxis: 0,
                      altAxis: 0,
                  },
                  tetherOffsetValue
              );
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
        x: 0,
        y: 0,
    };
    if (!popperOffsets2) {
        return;
    }
    if (checkMainAxis) {
        var _offsetModifierState$;
        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset2 = popperOffsets2[mainAxis];
        var min2 = offset2 + overflow[mainSide];
        var max2 = offset2 - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
        var arrowElement = state.elements.arrow;
        var arrowRect =
            tether && arrowElement
                ? getLayoutRect(arrowElement)
                : {
                      width: 0,
                      height: 0,
                  };
        var arrowPaddingObject = state.modifiersData['arrow#persistent']
            ? state.modifiersData['arrow#persistent'].padding
            : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide];
        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement
            ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis
            : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement
            ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis
            : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent
            ? mainAxis === 'y'
                ? arrowOffsetParent.clientTop || 0
                : arrowOffsetParent.clientLeft || 0
            : 0;
        var offsetModifierValue =
            (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null
                ? _offsetModifierState$
                : 0;
        var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset2 + maxOffset - offsetModifierValue;
        var preventedOffset = within(
            tether ? min(min2, tetherMin) : min2,
            offset2,
            tether ? max(max2, tetherMax) : max2
        );
        popperOffsets2[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
        var _offsetModifierState$2;
        var _mainSide = mainAxis === 'x' ? top : left;
        var _altSide = mainAxis === 'x' ? bottom : right;
        var _offset = popperOffsets2[altAxis];
        var _len = altAxis === 'y' ? 'height' : 'width';
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
        var _offsetModifierValue =
            (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null
                ? _offsetModifierState$2
                : 0;
        var _tetherMin = isOriginSide
            ? _min
            : _offset -
              referenceRect[_len] -
              popperRect[_len] -
              _offsetModifierValue +
              normalizedTetherOffsetValue.altAxis;
        var _tetherMax = isOriginSide
            ? _offset +
              referenceRect[_len] +
              popperRect[_len] -
              _offsetModifierValue -
              normalizedTetherOffsetValue.altAxis
            : _max;
        var _preventedOffset =
            tether && isOriginSide
                ? withinMaxClamp(_tetherMin, _offset, _tetherMax)
                : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
        popperOffsets2[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
}
var preventOverflow_default = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset'],
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
    return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
    };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
    } else {
        return getHTMLElementScroll(node);
    }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
        isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
        scrollLeft: 0,
        scrollTop: 0,
    };
    var offsets = {
        x: 0,
        y: 0,
    };
    if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
        if (
            getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
            isScrollParent(documentElement)
        ) {
            scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
        }
    }
    return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height,
    };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
    var map2 = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
        map2.set(modifier.name, modifier);
    });
    function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
            if (!visited.has(dep)) {
                var depModifier = map2.get(dep);
                if (depModifier) {
                    sort(depModifier);
                }
            }
        });
        result.push(modifier);
    }
    modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
            sort(modifier);
        }
    });
    return result;
}
function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(
            orderedModifiers.filter(function (modifier) {
                return modifier.phase === phase;
            })
        );
    }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
    var pending;
    return function () {
        if (!pending) {
            pending = new Promise(function (resolve) {
                Promise.resolve().then(function () {
                    pending = void 0;
                    resolve(fn2());
                });
            });
        }
        return pending;
    };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged2, current) {
        var existing = merged2[current.name];
        merged2[current.name] = existing
            ? Object.assign({}, existing, current, {
                  options: Object.assign({}, existing.options, current.options),
                  data: Object.assign({}, existing.data, current.data),
              })
            : current;
        return merged2;
    }, {});
    return Object.keys(merged).map(function (key) {
        return merged[key];
    });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
};
function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }
    return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
    });
}
function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
        generatorOptions = {};
    }
    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper3(reference2, popper2, options) {
        if (options === void 0) {
            options = defaultOptions;
        }
        var state = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
                reference: reference2,
                popper: popper2,
            },
            attributes: {},
            styles: {},
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
                var options2 =
                    typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
                cleanupModifierEffects();
                state.options = Object.assign({}, defaultOptions, state.options, options2);
                state.scrollParents = {
                    reference: isElement(reference2)
                        ? listScrollParents(reference2)
                        : reference2.contextElement
                          ? listScrollParents(reference2.contextElement)
                          : [],
                    popper: listScrollParents(popper2),
                };
                var orderedModifiers = orderModifiers(
                    mergeByName([].concat(defaultModifiers, state.options.modifiers))
                );
                state.orderedModifiers = orderedModifiers.filter(function (m) {
                    return m.enabled;
                });
                runModifierEffects();
                return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
                if (isDestroyed) {
                    return;
                }
                var _state$elements = state.elements,
                    reference3 = _state$elements.reference,
                    popper3 = _state$elements.popper;
                if (!areValidElements(reference3, popper3)) {
                    return;
                }
                state.rects = {
                    reference: getCompositeRect(
                        reference3,
                        getOffsetParent(popper3),
                        state.options.strategy === 'fixed'
                    ),
                    popper: getLayoutRect(popper3),
                };
                state.reset = false;
                state.placement = state.options.placement;
                state.orderedModifiers.forEach(function (modifier) {
                    return (state.modifiersData[modifier.name] = Object.assign({}, modifier.data));
                });
                for (var index = 0; index < state.orderedModifiers.length; index++) {
                    if (state.reset === true) {
                        state.reset = false;
                        index = -1;
                        continue;
                    }
                    var _state$orderedModifie = state.orderedModifiers[index],
                        fn2 = _state$orderedModifie.fn,
                        _state$orderedModifie2 = _state$orderedModifie.options,
                        _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                        name = _state$orderedModifie.name;
                    if (typeof fn2 === 'function') {
                        state =
                            fn2({
                                state,
                                options: _options,
                                name,
                                instance,
                            }) || state;
                    }
                }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: debounce(function () {
                return new Promise(function (resolve) {
                    instance.forceUpdate();
                    resolve(state);
                });
            }),
            destroy: function destroy() {
                cleanupModifierEffects();
                isDestroyed = true;
            },
        };
        if (!areValidElements(reference2, popper2)) {
            return instance;
        }
        instance.setOptions(options).then(function (state2) {
            if (!isDestroyed && options.onFirstUpdate) {
                options.onFirstUpdate(state2);
            }
        });
        function runModifierEffects() {
            state.orderedModifiers.forEach(function (_ref) {
                var name = _ref.name,
                    _ref$options = _ref.options,
                    options2 = _ref$options === void 0 ? {} : _ref$options,
                    effect3 = _ref.effect;
                if (typeof effect3 === 'function') {
                    var cleanupFn = effect3({
                        state,
                        name,
                        instance,
                        options: options2,
                    });
                    var noopFn = function noopFn2() {};
                    effectCleanupFns.push(cleanupFn || noopFn);
                }
            });
        }
        function cleanupModifierEffects() {
            effectCleanupFns.forEach(function (fn2) {
                return fn2();
            });
            effectCleanupFns = [];
        }
        return instance;
    };
}
var createPopper = popperGenerator();

// node_modules/@restart/ui/esm/popper.js
var createPopper2 = popperGenerator({
    defaultModifiers: [
        hide_default,
        popperOffsets_default,
        computeStyles_default,
        eventListeners_default,
        offset_default,
        flip_default,
        preventOverflow_default,
        arrow_default,
    ],
});

// node_modules/@restart/ui/esm/usePopper.js
var _excluded3 = ['enabled', 'placement', 'strategy', 'modifiers'];
function _objectWithoutPropertiesLoose4(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var disabledApplyStylesModifier = {
    name: 'applyStyles',
    enabled: false,
    phase: 'afterWrite',
    fn: () => void 0,
};
var ariaDescribedByModifier = {
    name: 'ariaDescribedBy',
    enabled: true,
    phase: 'afterWrite',
    effect:
        ({ state }) =>
        () => {
            const { reference: reference2, popper: popper2 } = state.elements;
            if ('removeAttribute' in reference2) {
                const ids = (reference2.getAttribute('aria-describedby') || '')
                    .split(',')
                    .filter((id) => id.trim() !== popper2.id);
                if (!ids.length) reference2.removeAttribute('aria-describedby');
                else reference2.setAttribute('aria-describedby', ids.join(','));
            }
        },
    fn: ({ state }) => {
        var _popper$getAttribute;
        const { popper: popper2, reference: reference2 } = state.elements;
        const role =
            (_popper$getAttribute = popper2.getAttribute('role')) == null ? void 0 : _popper$getAttribute.toLowerCase();
        if (popper2.id && role === 'tooltip' && 'setAttribute' in reference2) {
            const ids = reference2.getAttribute('aria-describedby');
            if (ids && ids.split(',').indexOf(popper2.id) !== -1) {
                return;
            }
            reference2.setAttribute('aria-describedby', ids ? `${ids},${popper2.id}` : popper2.id);
        }
    },
};
var EMPTY_MODIFIERS = [];
function usePopper(referenceElement, popperElement, _ref = {}) {
    let { enabled = true, placement = 'bottom', strategy = 'absolute', modifiers = EMPTY_MODIFIERS } = _ref,
        config = _objectWithoutPropertiesLoose4(_ref, _excluded3);
    const prevModifiers = (0, import_react37.useRef)(modifiers);
    const popperInstanceRef = (0, import_react37.useRef)();
    const update = (0, import_react37.useCallback)(() => {
        var _popperInstanceRef$cu;
        (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
    }, []);
    const forceUpdate = (0, import_react37.useCallback)(() => {
        var _popperInstanceRef$cu2;
        (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
    }, []);
    const [popperState, setState] = useSafeState_default(
        (0, import_react37.useState)({
            placement,
            update,
            forceUpdate,
            attributes: {},
            styles: {
                popper: {},
                arrow: {},
            },
        })
    );
    const updateModifier = (0, import_react37.useMemo)(
        () => ({
            name: 'updateStateModifier',
            enabled: true,
            phase: 'write',
            requires: ['computeStyles'],
            fn: ({ state }) => {
                const styles = {};
                const attributes = {};
                Object.keys(state.elements).forEach((element) => {
                    styles[element] = state.styles[element];
                    attributes[element] = state.attributes[element];
                });
                setState({
                    state,
                    styles,
                    attributes,
                    update,
                    forceUpdate,
                    placement: state.placement,
                });
            },
        }),
        [update, forceUpdate, setState]
    );
    const nextModifiers = (0, import_react37.useMemo)(() => {
        if (!dequal(prevModifiers.current, modifiers)) {
            prevModifiers.current = modifiers;
        }
        return prevModifiers.current;
    }, [modifiers]);
    (0, import_react37.useEffect)(() => {
        if (!popperInstanceRef.current || !enabled) return;
        popperInstanceRef.current.setOptions({
            placement,
            strategy,
            modifiers: [...nextModifiers, updateModifier, disabledApplyStylesModifier],
        });
    }, [strategy, placement, updateModifier, enabled, nextModifiers]);
    (0, import_react37.useEffect)(() => {
        if (!enabled || referenceElement == null || popperElement == null) {
            return void 0;
        }
        popperInstanceRef.current = createPopper2(
            referenceElement,
            popperElement,
            Object.assign({}, config, {
                placement,
                strategy,
                modifiers: [...nextModifiers, ariaDescribedByModifier, updateModifier],
            })
        );
        return () => {
            if (popperInstanceRef.current != null) {
                popperInstanceRef.current.destroy();
                popperInstanceRef.current = void 0;
                setState((s) =>
                    Object.assign({}, s, {
                        attributes: {},
                        styles: {
                            popper: {},
                        },
                    })
                );
            }
        };
    }, [enabled, referenceElement, popperElement]);
    return popperState;
}
var usePopper_default = usePopper;

// node_modules/dom-helpers/esm/contains.js
function contains2(context6, node) {
    if (context6.contains) return context6.contains(node);
    if (context6.compareDocumentPosition) return context6 === node || !!(context6.compareDocumentPosition(node) & 16);
}

// node_modules/@restart/ui/esm/useClickOutside.js
var import_react38 = __toESM(require_react());
var import_warning = __toESM(require_warning());
var noop2 = () => {};
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = (ref) => ref && ('current' in ref ? ref.current : ref);
var InitialTriggerEvents = {
    click: 'mousedown',
    mouseup: 'mousedown',
    pointerup: 'pointerdown',
};
function useClickOutside(ref, onClickOutside = noop2, { disabled, clickTrigger = 'click' } = {}) {
    const preventMouseClickOutsideRef = (0, import_react38.useRef)(false);
    const waitingForTrigger = (0, import_react38.useRef)(false);
    const handleMouseCapture = (0, import_react38.useCallback)(
        (e) => {
            const currentTarget = getRefTarget(ref);
            (0, import_warning.default)(
                !!currentTarget,
                'ClickOutside captured a close event but does not have a ref to compare it to. useClickOutside(), should be passed a ref that resolves to a DOM node'
            );
            preventMouseClickOutsideRef.current =
                !currentTarget ||
                isModifiedEvent(e) ||
                !isLeftClickEvent(e) ||
                !!contains2(currentTarget, e.target) ||
                waitingForTrigger.current;
            waitingForTrigger.current = false;
        },
        [ref]
    );
    const handleInitialMouse = useEventCallback((e) => {
        const currentTarget = getRefTarget(ref);
        if (currentTarget && contains2(currentTarget, e.target)) {
            waitingForTrigger.current = true;
        }
    });
    const handleMouse = useEventCallback((e) => {
        if (!preventMouseClickOutsideRef.current) {
            onClickOutside(e);
        }
    });
    (0, import_react38.useEffect)(() => {
        var _ownerWindow$event, _ownerWindow$parent;
        if (disabled || ref == null) return void 0;
        const doc = ownerDocument(getRefTarget(ref));
        const ownerWindow2 = doc.defaultView || window;
        let currentEvent =
            (_ownerWindow$event = ownerWindow2.event) != null
                ? _ownerWindow$event
                : (_ownerWindow$parent = ownerWindow2.parent) == null
                  ? void 0
                  : _ownerWindow$parent.event;
        let removeInitialTriggerListener = null;
        if (InitialTriggerEvents[clickTrigger]) {
            removeInitialTriggerListener = listen_default(
                doc,
                InitialTriggerEvents[clickTrigger],
                handleInitialMouse,
                true
            );
        }
        const removeMouseCaptureListener = listen_default(doc, clickTrigger, handleMouseCapture, true);
        const removeMouseListener = listen_default(doc, clickTrigger, (e) => {
            if (e === currentEvent) {
                currentEvent = void 0;
                return;
            }
            handleMouse(e);
        });
        let mobileSafariHackListeners = [];
        if ('ontouchstart' in doc.documentElement) {
            mobileSafariHackListeners = [].slice
                .call(doc.body.children)
                .map((el) => listen_default(el, 'mousemove', noop2));
        }
        return () => {
            removeInitialTriggerListener == null ? void 0 : removeInitialTriggerListener();
            removeMouseCaptureListener();
            removeMouseListener();
            mobileSafariHackListeners.forEach((remove) => remove());
        };
    }, [ref, disabled, clickTrigger, handleMouseCapture, handleInitialMouse, handleMouse]);
}
var useClickOutside_default = useClickOutside;

// node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js
function toModifierMap(modifiers) {
    const result = {};
    if (!Array.isArray(modifiers)) {
        return modifiers || result;
    }
    modifiers == null
        ? void 0
        : modifiers.forEach((m) => {
              result[m.name] = m;
          });
    return result;
}
function toModifierArray(map2 = {}) {
    if (Array.isArray(map2)) return map2;
    return Object.keys(map2).map((k) => {
        map2[k].name = k;
        return map2[k];
    });
}
function mergeOptionsWithPopperConfig({
    enabled,
    enableEvents,
    placement,
    flip: flip2,
    offset: offset2,
    fixed,
    containerPadding,
    arrowElement,
    popperConfig = {},
}) {
    var _modifiers$eventListe, _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
    const modifiers = toModifierMap(popperConfig.modifiers);
    return Object.assign({}, popperConfig, {
        placement,
        enabled,
        strategy: fixed ? 'fixed' : popperConfig.strategy,
        modifiers: toModifierArray(
            Object.assign({}, modifiers, {
                eventListeners: {
                    enabled: enableEvents,
                    options:
                        (_modifiers$eventListe = modifiers.eventListeners) == null
                            ? void 0
                            : _modifiers$eventListe.options,
                },
                preventOverflow: Object.assign({}, modifiers.preventOverflow, {
                    options: containerPadding
                        ? Object.assign(
                              {
                                  padding: containerPadding,
                              },
                              (_modifiers$preventOve = modifiers.preventOverflow) == null
                                  ? void 0
                                  : _modifiers$preventOve.options
                          )
                        : (_modifiers$preventOve2 = modifiers.preventOverflow) == null
                          ? void 0
                          : _modifiers$preventOve2.options,
                }),
                offset: {
                    options: Object.assign(
                        {
                            offset: offset2,
                        },
                        (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options
                    ),
                },
                arrow: Object.assign({}, modifiers.arrow, {
                    enabled: !!arrowElement,
                    options: Object.assign(
                        {},
                        (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options,
                        {
                            element: arrowElement,
                        }
                    ),
                }),
                flip: Object.assign(
                    {
                        enabled: !!flip2,
                    },
                    modifiers.flip
                ),
            })
        ),
    });
}

// node_modules/@restart/ui/esm/DropdownMenu.js
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var import_jsx_runtime44 = __toESM(require_jsx_runtime());
var _excluded4 = ['children'];
function _objectWithoutPropertiesLoose5(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var noop3 = () => {};
function useDropdownMenu(options = {}) {
    const context6 = (0, import_react39.useContext)(DropdownContext_default);
    const [arrowElement, attachArrowRef] = useCallbackRef();
    const hasShownRef = (0, import_react39.useRef)(false);
    const {
        flip: flip2,
        offset: offset2,
        rootCloseEvent,
        fixed = false,
        placement: placementOverride,
        popperConfig = {},
        enableEventListeners = true,
        usePopper: shouldUsePopper = !!context6,
    } = options;
    const show = (context6 == null ? void 0 : context6.show) == null ? !!options.show : context6.show;
    if (show && !hasShownRef.current) {
        hasShownRef.current = true;
    }
    const handleClose = (e) => {
        context6 == null ? void 0 : context6.toggle(false, e);
    };
    const { placement, setMenu, menuElement, toggleElement } = context6 || {};
    const popper2 = usePopper_default(
        toggleElement,
        menuElement,
        mergeOptionsWithPopperConfig({
            placement: placementOverride || placement || 'bottom-start',
            enabled: shouldUsePopper,
            enableEvents: enableEventListeners == null ? show : enableEventListeners,
            offset: offset2,
            flip: flip2,
            fixed,
            arrowElement,
            popperConfig,
        })
    );
    const menuProps = Object.assign(
        {
            ref: setMenu || noop3,
            'aria-labelledby': toggleElement == null ? void 0 : toggleElement.id,
        },
        popper2.attributes.popper,
        {
            style: popper2.styles.popper,
        }
    );
    const metadata = {
        show,
        placement,
        hasShown: hasShownRef.current,
        toggle: context6 == null ? void 0 : context6.toggle,
        popper: shouldUsePopper ? popper2 : null,
        arrowProps: shouldUsePopper
            ? Object.assign(
                  {
                      ref: attachArrowRef,
                  },
                  popper2.attributes.arrow,
                  {
                      style: popper2.styles.arrow,
                  }
              )
            : {},
    };
    useClickOutside_default(menuElement, handleClose, {
        clickTrigger: rootCloseEvent,
        disabled: !show,
    });
    return [menuProps, metadata];
}
var defaultProps = {
    usePopper: true,
};
function DropdownMenu(_ref) {
    let { children } = _ref,
        options = _objectWithoutPropertiesLoose5(_ref, _excluded4);
    const [props, meta] = useDropdownMenu(options);
    return (0, import_jsx_runtime44.jsx)(import_jsx_runtime43.Fragment, {
        children: children(props, meta),
    });
}
DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = defaultProps;
var DropdownMenu_default = DropdownMenu;

// node_modules/@restart/ui/esm/DropdownToggle.js
var import_react41 = __toESM(require_react());
var React49 = __toESM(require_react());

// node_modules/@react-aria/ssr/dist/import.mjs
var import_react40 = __toESM(require_react(), 1);
var $b5e257d569688ac6$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 1e10)),
    current: 0,
};
var $b5e257d569688ac6$var$SSRContext = (0, import_react40.default).createContext($b5e257d569688ac6$var$defaultContext);
var $b5e257d569688ac6$var$IsSSRContext = (0, import_react40.default).createContext(false);
function $b5e257d569688ac6$var$LegacySSRProvider(props) {
    let cur = (0, import_react40.useContext)($b5e257d569688ac6$var$SSRContext);
    let counter = $b5e257d569688ac6$var$useCounter(cur === $b5e257d569688ac6$var$defaultContext);
    let [isSSR, setIsSSR] = (0, import_react40.useState)(true);
    let value = (0, import_react40.useMemo)(
        () => ({
            // If this is the first SSRProvider, start with an empty string prefix, otherwise
            // append and increment the counter.
            prefix: cur === $b5e257d569688ac6$var$defaultContext ? '' : `${cur.prefix}-${counter}`,
            current: 0,
        }),
        [cur, counter]
    );
    if (typeof document !== 'undefined')
        (0, import_react40.useLayoutEffect)(() => {
            setIsSSR(false);
        }, []);
    return (0, import_react40.default).createElement(
        $b5e257d569688ac6$var$SSRContext.Provider,
        {
            value,
        },
        (0, import_react40.default).createElement(
            $b5e257d569688ac6$var$IsSSRContext.Provider,
            {
                value: isSSR,
            },
            props.children
        )
    );
}
var $b5e257d569688ac6$var$warnedAboutSSRProvider = false;
function $b5e257d569688ac6$export$9f8ac96af4b1b2ae(props) {
    if (typeof (0, import_react40.default)['useId'] === 'function') {
        if (!$b5e257d569688ac6$var$warnedAboutSSRProvider) {
            console.warn('In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.');
            $b5e257d569688ac6$var$warnedAboutSSRProvider = true;
        }
        return (0, import_react40.default).createElement((0, import_react40.default).Fragment, null, props.children);
    }
    return (0, import_react40.default).createElement($b5e257d569688ac6$var$LegacySSRProvider, props);
}
var $b5e257d569688ac6$var$canUseDOM = Boolean(
    typeof window !== 'undefined' && window.document && window.document.createElement
);
var $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
    let ctx = (0, import_react40.useContext)($b5e257d569688ac6$var$SSRContext);
    let ref = (0, import_react40.useRef)(null);
    if (ref.current === null && !isDisabled) {
        var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner,
            _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        let currentOwner =
            (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, import_react40.default)
                .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null ||
            _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0
                ? void 0
                : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner =
                        _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null ||
                    _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0
                  ? void 0
                  : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
        if (currentOwner) {
            let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
            if (prevComponentValue == null)
                $b5e257d569688ac6$var$componentIds.set(currentOwner, {
                    id: ctx.current,
                    state: currentOwner.memoizedState,
                });
            else if (currentOwner.memoizedState !== prevComponentValue.state) {
                ctx.current = prevComponentValue.id;
                $b5e257d569688ac6$var$componentIds.delete(currentOwner);
            }
        }
        ref.current = ++ctx.current;
    }
    return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
    let ctx = (0, import_react40.useContext)($b5e257d569688ac6$var$SSRContext);
    if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM)
        console.warn(
            'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.'
        );
    let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
    let prefix = ctx === $b5e257d569688ac6$var$defaultContext && false ? 'react-aria' : `react-aria${ctx.prefix}`;
    return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
    let id = (0, import_react40.default).useId();
    let [didSSR] = (0, import_react40.useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
    let prefix = didSSR || false ? 'react-aria' : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
    return defaultId || `${prefix}-${id}`;
}
var $b5e257d569688ac6$export$619500959fc48b26 =
    typeof (0, import_react40.default)['useId'] === 'function'
        ? $b5e257d569688ac6$var$useModernSSRSafeId
        : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
    return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
    return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
    return () => {};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
    if (typeof (0, import_react40.default)['useSyncExternalStore'] === 'function')
        return (0, import_react40.default)['useSyncExternalStore'](
            $b5e257d569688ac6$var$subscribe,
            $b5e257d569688ac6$var$getSnapshot,
            $b5e257d569688ac6$var$getServerSnapshot
        );
    return (0, import_react40.useContext)($b5e257d569688ac6$var$IsSSRContext);
}

// node_modules/@restart/ui/esm/DropdownToggle.js
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var isRoleMenu = (el) => {
    var _el$getAttribute;
    return ((_el$getAttribute = el.getAttribute('role')) == null ? void 0 : _el$getAttribute.toLowerCase()) === 'menu';
};
var noop4 = () => {};
function useDropdownToggle() {
    const id = $b5e257d569688ac6$export$619500959fc48b26();
    const {
        show = false,
        toggle = noop4,
        setToggle,
        menuElement,
    } = (0, import_react41.useContext)(DropdownContext_default) || {};
    const handleClick = (0, import_react41.useCallback)(
        (e) => {
            toggle(!show, e);
        },
        [show, toggle]
    );
    const props = {
        id,
        ref: setToggle || noop4,
        onClick: handleClick,
        'aria-expanded': !!show,
    };
    if (menuElement && isRoleMenu(menuElement)) {
        props['aria-haspopup'] = true;
    }
    return [
        props,
        {
            show,
            toggle,
        },
    ];
}
function DropdownToggle({ children }) {
    const [props, meta] = useDropdownToggle();
    return (0, import_jsx_runtime46.jsx)(import_jsx_runtime45.Fragment, {
        children: children(props, meta),
    });
}
DropdownToggle.displayName = 'DropdownToggle';
var DropdownToggle_default = DropdownToggle;

// node_modules/@restart/ui/esm/DropdownItem.js
var React52 = __toESM(require_react());
var import_react42 = __toESM(require_react());

// node_modules/@restart/ui/esm/SelectableContext.js
var React50 = __toESM(require_react());
var SelectableContext = React50.createContext(null);
var makeEventKey = (eventKey, href = null) => {
    if (eventKey != null) return String(eventKey);
    return href || null;
};
var SelectableContext_default = SelectableContext;

// node_modules/@restart/ui/esm/NavContext.js
var React51 = __toESM(require_react());
var NavContext = React51.createContext(null);
NavContext.displayName = 'NavContext';
var NavContext_default = NavContext;

// node_modules/@restart/ui/esm/DataKey.js
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
var PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
    return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
    return `${PROPERTY_PREFIX}${property}`;
}

// node_modules/@restart/ui/esm/DropdownItem.js
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var _excluded5 = ['eventKey', 'disabled', 'onClick', 'active', 'as'];
function _objectWithoutPropertiesLoose6(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function useDropdownItem({ key, href, active, disabled, onClick }) {
    const onSelectCtx = (0, import_react42.useContext)(SelectableContext_default);
    const navContext = (0, import_react42.useContext)(NavContext_default);
    const { activeKey } = navContext || {};
    const eventKey = makeEventKey(key, href);
    const isActive = active == null && key != null ? makeEventKey(activeKey) === eventKey : active;
    const handleClick = useEventCallback((event) => {
        if (disabled) return;
        onClick == null ? void 0 : onClick(event);
        if (onSelectCtx && !event.isPropagationStopped()) {
            onSelectCtx(eventKey, event);
        }
    });
    return [
        {
            onClick: handleClick,
            'aria-disabled': disabled || void 0,
            'aria-selected': isActive,
            [dataAttr('dropdown-item')]: '',
        },
        {
            isActive,
        },
    ];
}
var DropdownItem = React52.forwardRef((_ref, ref) => {
    let { eventKey, disabled, onClick, active, as: Component2 = Button_default } = _ref,
        props = _objectWithoutPropertiesLoose6(_ref, _excluded5);
    const [dropdownItemProps] = useDropdownItem({
        key: eventKey,
        href: props.href,
        disabled,
        onClick,
        active,
    });
    return (0, import_jsx_runtime47.jsx)(
        Component2,
        Object.assign(
            {},
            props,
            {
                ref,
            },
            dropdownItemProps
        )
    );
});
DropdownItem.displayName = 'DropdownItem';
var DropdownItem_default = DropdownItem;

// node_modules/@restart/ui/esm/useWindow.js
var import_react43 = __toESM(require_react());
var Context = (0, import_react43.createContext)(canUseDOM_default ? window : void 0);
var WindowProvider = Context.Provider;
function useWindow() {
    return (0, import_react43.useContext)(Context);
}

// node_modules/@restart/ui/esm/Dropdown.js
var import_jsx_runtime48 = __toESM(require_jsx_runtime());
function useRefWithUpdate() {
    const forceUpdate = useForceUpdate();
    const ref = (0, import_react44.useRef)(null);
    const attachRef = (0, import_react44.useCallback)(
        (element) => {
            ref.current = element;
            forceUpdate();
        },
        [forceUpdate]
    );
    return [ref, attachRef];
}
function Dropdown({
    defaultShow,
    show: rawShow,
    onSelect,
    onToggle: rawOnToggle,
    itemSelector = `* [${dataAttr('dropdown-item')}]`,
    focusFirstItemOnShow,
    placement = 'bottom-start',
    children,
}) {
    const window2 = useWindow();
    const [show, onToggle] = useUncontrolledProp2(rawShow, defaultShow, rawOnToggle);
    const [menuRef, setMenu] = useRefWithUpdate();
    const menuElement = menuRef.current;
    const [toggleRef, setToggle] = useRefWithUpdate();
    const toggleElement = toggleRef.current;
    const lastShow = usePrevious(show);
    const lastSourceEvent = (0, import_react44.useRef)(null);
    const focusInDropdown = (0, import_react44.useRef)(false);
    const onSelectCtx = (0, import_react44.useContext)(SelectableContext_default);
    const toggle = (0, import_react44.useCallback)(
        (nextShow, event, source = event == null ? void 0 : event.type) => {
            onToggle(nextShow, {
                originalEvent: event,
                source,
            });
        },
        [onToggle]
    );
    const handleSelect = useEventCallback((key, event) => {
        onSelect == null ? void 0 : onSelect(key, event);
        toggle(false, event, 'select');
        if (!event.isPropagationStopped()) {
            onSelectCtx == null ? void 0 : onSelectCtx(key, event);
        }
    });
    const context6 = (0, import_react44.useMemo)(
        () => ({
            toggle,
            placement,
            show,
            menuElement,
            toggleElement,
            setMenu,
            setToggle,
        }),
        [toggle, placement, show, menuElement, toggleElement, setMenu, setToggle]
    );
    if (menuElement && lastShow && !show) {
        focusInDropdown.current = menuElement.contains(menuElement.ownerDocument.activeElement);
    }
    const focusToggle = useEventCallback(() => {
        if (toggleElement && toggleElement.focus) {
            toggleElement.focus();
        }
    });
    const maybeFocusFirst = useEventCallback(() => {
        const type = lastSourceEvent.current;
        let focusType = focusFirstItemOnShow;
        if (focusType == null) {
            focusType = menuRef.current && isRoleMenu(menuRef.current) ? 'keyboard' : false;
        }
        if (focusType === false || (focusType === 'keyboard' && !/^key.+$/.test(type))) {
            return;
        }
        const first = qsa(menuRef.current, itemSelector)[0];
        if (first && first.focus) first.focus();
    });
    (0, import_react44.useEffect)(() => {
        if (show) maybeFocusFirst();
        else if (focusInDropdown.current) {
            focusInDropdown.current = false;
            focusToggle();
        }
    }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
    (0, import_react44.useEffect)(() => {
        lastSourceEvent.current = null;
    });
    const getNextFocusedChild = (current, offset2) => {
        if (!menuRef.current) return null;
        const items = qsa(menuRef.current, itemSelector);
        let index = items.indexOf(current) + offset2;
        index = Math.max(0, Math.min(index, items.length));
        return items[index];
    };
    useEventListener(
        (0, import_react44.useCallback)(() => window2.document, [window2]),
        'keydown',
        (event) => {
            var _menuRef$current, _toggleRef$current;
            const { key } = event;
            const target = event.target;
            const fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
            const fromToggle =
                (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target);
            const isInput = /input|textarea/i.test(target.tagName);
            if (
                isInput &&
                (key === ' ' || (key !== 'Escape' && fromMenu) || (key === 'Escape' && target.type === 'search'))
            ) {
                return;
            }
            if (!fromMenu && !fromToggle) {
                return;
            }
            if (key === 'Tab' && (!menuRef.current || !show)) {
                return;
            }
            lastSourceEvent.current = event.type;
            const meta = {
                originalEvent: event,
                source: event.type,
            };
            switch (key) {
                case 'ArrowUp': {
                    const next = getNextFocusedChild(target, -1);
                    if (next && next.focus) next.focus();
                    event.preventDefault();
                    return;
                }
                case 'ArrowDown':
                    event.preventDefault();
                    if (!show) {
                        onToggle(true, meta);
                    } else {
                        const next = getNextFocusedChild(target, 1);
                        if (next && next.focus) next.focus();
                    }
                    return;
                case 'Tab':
                    addEventListener_default(
                        target.ownerDocument,
                        'keyup',
                        (e) => {
                            var _menuRef$current2;
                            if (
                                (e.key === 'Tab' && !e.target) ||
                                !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))
                            ) {
                                onToggle(false, meta);
                            }
                        },
                        {
                            once: true,
                        }
                    );
                    break;
                case 'Escape':
                    if (key === 'Escape') {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    onToggle(false, meta);
                    break;
                default:
            }
        }
    );
    return (0, import_jsx_runtime48.jsx)(SelectableContext_default.Provider, {
        value: handleSelect,
        children: (0, import_jsx_runtime48.jsx)(DropdownContext_default.Provider, {
            value: context6,
            children,
        }),
    });
}
Dropdown.displayName = 'Dropdown';
Dropdown.Menu = DropdownMenu_default;
Dropdown.Toggle = DropdownToggle_default;
Dropdown.Item = DropdownItem_default;
var Dropdown_default = Dropdown;

// node_modules/react-bootstrap/esm/DropdownContext.js
var React54 = __toESM(require_react());
var DropdownContext2 = React54.createContext({});
DropdownContext2.displayName = 'DropdownContext';
var DropdownContext_default2 = DropdownContext2;

// node_modules/react-bootstrap/esm/DropdownDivider.js
var React55 = __toESM(require_react());
var import_classnames36 = __toESM(require_classnames());
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var DropdownDivider = React55.forwardRef(
    ({ className, bsPrefix, as: Component2 = 'hr', role = 'separator', ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-divider');
        return (0, import_jsx_runtime49.jsx)(Component2, {
            ref,
            className: (0, import_classnames36.default)(className, bsPrefix),
            role,
            ...props,
        });
    }
);
DropdownDivider.displayName = 'DropdownDivider';
var DropdownDivider_default = DropdownDivider;

// node_modules/react-bootstrap/esm/DropdownHeader.js
var React56 = __toESM(require_react());
var import_classnames37 = __toESM(require_classnames());
var import_jsx_runtime50 = __toESM(require_jsx_runtime());
var DropdownHeader = React56.forwardRef(
    ({ className, bsPrefix, as: Component2 = 'div', role = 'heading', ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-header');
        return (0, import_jsx_runtime50.jsx)(Component2, {
            ref,
            className: (0, import_classnames37.default)(className, bsPrefix),
            role,
            ...props,
        });
    }
);
DropdownHeader.displayName = 'DropdownHeader';
var DropdownHeader_default = DropdownHeader;

// node_modules/react-bootstrap/esm/DropdownItem.js
var import_classnames38 = __toESM(require_classnames());
var React57 = __toESM(require_react());
var import_jsx_runtime51 = __toESM(require_jsx_runtime());
var DropdownItem2 = React57.forwardRef(
    (
        { bsPrefix, className, eventKey, disabled = false, onClick, active, as: Component2 = Anchor_default, ...props },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
        const [dropdownItemProps, meta] = useDropdownItem({
            key: eventKey,
            href: props.href,
            disabled,
            onClick,
            active,
        });
        return (0, import_jsx_runtime51.jsx)(Component2, {
            ...props,
            ...dropdownItemProps,
            ref,
            className: (0, import_classnames38.default)(
                className,
                prefix,
                meta.isActive && 'active',
                disabled && 'disabled'
            ),
        });
    }
);
DropdownItem2.displayName = 'DropdownItem';
var DropdownItem_default2 = DropdownItem2;

// node_modules/react-bootstrap/esm/DropdownItemText.js
var React58 = __toESM(require_react());
var import_classnames39 = __toESM(require_classnames());
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var DropdownItemText = React58.forwardRef(({ className, bsPrefix, as: Component2 = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-item-text');
    return (0, import_jsx_runtime52.jsx)(Component2, {
        ref,
        className: (0, import_classnames39.default)(className, bsPrefix),
        ...props,
    });
});
DropdownItemText.displayName = 'DropdownItemText';
var DropdownItemText_default = DropdownItemText;

// node_modules/react-bootstrap/esm/DropdownMenu.js
var import_classnames40 = __toESM(require_classnames());
var React61 = __toESM(require_react());
var import_react46 = __toESM(require_react());
var import_warning2 = __toESM(require_warning());

// node_modules/react-bootstrap/esm/InputGroupContext.js
var React59 = __toESM(require_react());
var context4 = React59.createContext(null);
context4.displayName = 'InputGroupContext';
var InputGroupContext_default = context4;

// node_modules/react-bootstrap/esm/NavbarContext.js
var React60 = __toESM(require_react());
var context5 = React60.createContext(null);
context5.displayName = 'NavbarContext';
var NavbarContext_default = context5;

// node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js
var import_invariant3 = __toESM(require_browser());
var import_react45 = __toESM(require_react());
function useWrappedRefWithWarning(ref, componentName) {
    if (false) return ref;
    const warningRef = (0, import_react45.useCallback)(
        (refValue) => {
            !(refValue == null || !refValue.isReactComponent)
                ? true
                    ? (0, import_invariant3.default)(
                          false,
                          `${componentName} injected a ref to a provided \`as\` component that resolved to a component instance instead of a DOM element. Use \`React.forwardRef\` to provide the injected ref to the class component as a prop in order to pass it directly to a DOM element`
                      )
                    : (0, import_invariant3.default)(false)
                : void 0;
        },
        [componentName]
    );
    return useMergedRefs_default(warningRef, ref);
}

// node_modules/react-bootstrap/esm/types.js
var import_prop_types4 = __toESM(require_prop_types());
var alignDirection = import_prop_types4.default.oneOf(['start', 'end']);
var alignPropType = import_prop_types4.default.oneOfType([
    alignDirection,
    import_prop_types4.default.shape({
        sm: alignDirection,
    }),
    import_prop_types4.default.shape({
        md: alignDirection,
    }),
    import_prop_types4.default.shape({
        lg: alignDirection,
    }),
    import_prop_types4.default.shape({
        xl: alignDirection,
    }),
    import_prop_types4.default.shape({
        xxl: alignDirection,
    }),
    import_prop_types4.default.object,
]);

// node_modules/react-bootstrap/esm/DropdownMenu.js
var import_jsx_runtime53 = __toESM(require_jsx_runtime());
function getDropdownMenuPlacement(alignEnd, dropDirection, isRTL) {
    const topStart = isRTL ? 'top-end' : 'top-start';
    const topEnd = isRTL ? 'top-start' : 'top-end';
    const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
    const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
    const leftStart = isRTL ? 'right-start' : 'left-start';
    const leftEnd = isRTL ? 'right-end' : 'left-end';
    const rightStart = isRTL ? 'left-start' : 'right-start';
    const rightEnd = isRTL ? 'left-end' : 'right-end';
    let placement = alignEnd ? bottomEnd : bottomStart;
    if (dropDirection === 'up') placement = alignEnd ? topEnd : topStart;
    else if (dropDirection === 'end') placement = alignEnd ? rightEnd : rightStart;
    else if (dropDirection === 'start') placement = alignEnd ? leftEnd : leftStart;
    else if (dropDirection === 'down-centered') placement = 'bottom';
    else if (dropDirection === 'up-centered') placement = 'top';
    return placement;
}
var DropdownMenu2 = React61.forwardRef(
    (
        {
            bsPrefix,
            className,
            align,
            rootCloseEvent,
            flip: flip2 = true,
            show: showProps,
            renderOnMount,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            popperConfig,
            variant,
            ...props
        },
        ref
    ) => {
        let alignEnd = false;
        const isNavbar = (0, import_react46.useContext)(NavbarContext_default);
        const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');
        const { align: contextAlign, drop, isRTL } = (0, import_react46.useContext)(DropdownContext_default2);
        align = align || contextAlign;
        const isInputGroup = (0, import_react46.useContext)(InputGroupContext_default);
        const alignClasses = [];
        if (align) {
            if (typeof align === 'object') {
                const keys = Object.keys(align);
                true
                    ? (0, import_warning2.default)(
                          keys.length === 1,
                          'There should only be 1 breakpoint when passing an object to `align`'
                      )
                    : void 0;
                if (keys.length) {
                    const brkPoint = keys[0];
                    const direction = align[brkPoint];
                    alignEnd = direction === 'start';
                    alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
                }
            } else if (align === 'end') {
                alignEnd = true;
            }
        }
        const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
        const [menuProps, { hasShown, popper: popper2, show, toggle }] = useDropdownMenu({
            flip: flip2,
            rootCloseEvent,
            show: showProps,
            usePopper: !isNavbar && alignClasses.length === 0,
            offset: [0, 2],
            popperConfig,
            placement,
        });
        menuProps.ref = useMergedRefs_default(useWrappedRefWithWarning(ref, 'DropdownMenu'), menuProps.ref);
        useIsomorphicEffect_default(() => {
            if (show) popper2 == null ? void 0 : popper2.update();
        }, [show]);
        if (!hasShown && !renderOnMount && !isInputGroup) return null;
        if (typeof Component2 !== 'string') {
            menuProps.show = show;
            menuProps.close = () => (toggle == null ? void 0 : toggle(false));
            menuProps.align = align;
        }
        let style2 = props.style;
        if (popper2 != null && popper2.placement) {
            style2 = {
                ...props.style,
                ...menuProps.style,
            };
            props['x-placement'] = popper2.placement;
        }
        return (0, import_jsx_runtime53.jsx)(Component2, {
            ...props,
            ...menuProps,
            style: style2,
            ...((alignClasses.length || isNavbar) && {
                'data-bs-popper': 'static',
            }),
            className: (0, import_classnames40.default)(
                className,
                prefix,
                show && 'show',
                alignEnd && `${prefix}-end`,
                variant && `${prefix}-${variant}`,
                ...alignClasses
            ),
        });
    }
);
DropdownMenu2.displayName = 'DropdownMenu';
var DropdownMenu_default2 = DropdownMenu2;

// node_modules/react-bootstrap/esm/DropdownToggle.js
var import_classnames41 = __toESM(require_classnames());
var React62 = __toESM(require_react());
var import_react47 = __toESM(require_react());
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var DropdownToggle2 = React62.forwardRef(
    (
        {
            bsPrefix,
            split,
            className,
            childBsPrefix,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = Button_default2,
            ...props
        },
        ref
    ) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');
        const dropdownContext = (0, import_react47.useContext)(DropdownContext_default);
        if (childBsPrefix !== void 0) {
            props.bsPrefix = childBsPrefix;
        }
        const [toggleProps] = useDropdownToggle();
        toggleProps.ref = useMergedRefs_default(toggleProps.ref, useWrappedRefWithWarning(ref, 'DropdownToggle'));
        return (0, import_jsx_runtime54.jsx)(Component2, {
            className: (0, import_classnames41.default)(
                className,
                prefix,
                split && `${prefix}-split`,
                (dropdownContext == null ? void 0 : dropdownContext.show) && 'show'
            ),
            ...toggleProps,
            ...props,
        });
    }
);
DropdownToggle2.displayName = 'DropdownToggle';
var DropdownToggle_default2 = DropdownToggle2;

// node_modules/react-bootstrap/esm/Dropdown.js
var import_jsx_runtime55 = __toESM(require_jsx_runtime());
var Dropdown2 = React63.forwardRef((pProps, ref) => {
    const {
        bsPrefix,
        drop = 'down',
        show,
        className,
        align = 'start',
        onSelect,
        onToggle,
        focusFirstItemOnShow,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component2 = 'div',
        navbar: _4,
        autoClose = true,
        ...props
    } = useUncontrolled(pProps, {
        show: 'onToggle',
    });
    const isInputGroup = (0, import_react48.useContext)(InputGroupContext_default);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
    const isRTL = useIsRTL();
    const isClosingPermitted = (source) => {
        if (autoClose === false) return source === 'click';
        if (autoClose === 'inside') return source !== 'rootClose';
        if (autoClose === 'outside') return source !== 'select';
        return true;
    };
    const handleToggle = useEventCallback((nextShow, meta) => {
        var _meta$originalEvent, _meta$originalEvent$t;
        const isToggleButton =
            (_meta$originalEvent = meta.originalEvent) == null
                ? void 0
                : (_meta$originalEvent$t = _meta$originalEvent.target) == null
                  ? void 0
                  : _meta$originalEvent$t.classList.contains('dropdown-toggle');
        if (isToggleButton && meta.source === 'mousedown') {
            return;
        }
        if (
            meta.originalEvent.currentTarget === document &&
            (meta.source !== 'keydown' || meta.originalEvent.key === 'Escape')
        )
            meta.source = 'rootClose';
        if (isClosingPermitted(meta.source)) onToggle == null ? void 0 : onToggle(nextShow, meta);
    });
    const alignEnd = align === 'end';
    const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
    const contextValue = (0, import_react48.useMemo)(
        () => ({
            align,
            drop,
            isRTL,
        }),
        [align, drop, isRTL]
    );
    const directionClasses = {
        down: prefix,
        'down-centered': `${prefix}-center`,
        up: 'dropup',
        'up-centered': 'dropup-center dropup',
        end: 'dropend',
        start: 'dropstart',
    };
    return (0, import_jsx_runtime55.jsx)(DropdownContext_default2.Provider, {
        value: contextValue,
        children: (0, import_jsx_runtime55.jsx)(Dropdown_default, {
            placement,
            show,
            onSelect,
            onToggle: handleToggle,
            focusFirstItemOnShow,
            itemSelector: `.${prefix}-item:not(.disabled):not(:disabled)`,
            children: isInputGroup
                ? props.children
                : (0, import_jsx_runtime55.jsx)(Component2, {
                      ...props,
                      ref,
                      className: (0, import_classnames42.default)(className, show && 'show', directionClasses[drop]),
                  }),
        }),
    });
});
Dropdown2.displayName = 'Dropdown';
var Dropdown_default2 = Object.assign(Dropdown2, {
    Toggle: DropdownToggle_default2,
    Menu: DropdownMenu_default2,
    Item: DropdownItem_default2,
    ItemText: DropdownItemText_default,
    Divider: DropdownDivider_default,
    Header: DropdownHeader_default,
});

// node_modules/react-bootstrap/esm/DropdownButton.js
var React64 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
var propTypes2 = {
    /**
     * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
     * @type {string}
     */
    id: import_prop_types5.default.string,
    /** An `href` passed to the Toggle component */
    href: import_prop_types5.default.string,
    /** An `onClick` handler passed to the Toggle component */
    onClick: import_prop_types5.default.func,
    /** The content of the non-toggle Button.  */
    title: import_prop_types5.default.node.isRequired,
    /** Disables both Buttons  */
    disabled: import_prop_types5.default.bool,
    /**
     * Aligns the dropdown menu.
     *
     * _see [DropdownMenu](#dropdown-menu-props) for more details_
     *
     * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
     */
    align: alignPropType,
    /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
    menuRole: import_prop_types5.default.string,
    /** Whether to render the dropdown menu in the DOM before the first time it is shown */
    renderMenuOnMount: import_prop_types5.default.bool,
    /**
     *  Which event when fired outside the component will cause it to be closed.
     *
     * _see [DropdownMenu](#dropdown-menu-props) for more details_
     */
    rootCloseEvent: import_prop_types5.default.string,
    /**
     * Menu color variant.
     *
     * Omitting this will use the default light color.
     */
    menuVariant: import_prop_types5.default.oneOf(['dark']),
    /**
     * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
     * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
     *
     */
    flip: import_prop_types5.default.bool,
    /** @ignore */
    bsPrefix: import_prop_types5.default.string,
    /** @ignore */
    variant: import_prop_types5.default.string,
    /** @ignore */
    size: import_prop_types5.default.string,
};
var DropdownButton = React64.forwardRef(
    (
        {
            title,
            children,
            bsPrefix,
            rootCloseEvent,
            variant,
            size: size2,
            menuRole,
            renderMenuOnMount,
            disabled,
            href,
            id,
            menuVariant,
            flip: flip2,
            ...props
        },
        ref
    ) =>
        (0, import_jsx_runtime57.jsxs)(Dropdown_default2, {
            ref,
            ...props,
            children: [
                (0, import_jsx_runtime56.jsx)(DropdownToggle_default2, {
                    id,
                    href,
                    size: size2,
                    variant,
                    disabled,
                    childBsPrefix: bsPrefix,
                    children: title,
                }),
                (0, import_jsx_runtime56.jsx)(DropdownMenu_default2, {
                    role: menuRole,
                    renderOnMount: renderMenuOnMount,
                    rootCloseEvent,
                    variant: menuVariant,
                    flip: flip2,
                    children,
                }),
            ],
        })
);
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes2;
var DropdownButton_default = DropdownButton;

// node_modules/react-bootstrap/esm/Figure.js
var React68 = __toESM(require_react());
var import_classnames46 = __toESM(require_classnames());

// node_modules/react-bootstrap/esm/FigureImage.js
var import_classnames44 = __toESM(require_classnames());
var React66 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Image.js
var import_classnames43 = __toESM(require_classnames());
var React65 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
var import_jsx_runtime58 = __toESM(require_jsx_runtime());
var propTypes3 = {
    /**
     * @default 'img'
     */
    bsPrefix: import_prop_types6.default.string,
    /**
     * Sets image as fluid image.
     */
    fluid: import_prop_types6.default.bool,
    /**
     * Sets image shape as rounded.
     */
    rounded: import_prop_types6.default.bool,
    /**
     * Sets image shape as circle.
     */
    roundedCircle: import_prop_types6.default.bool,
    /**
     * Sets image shape as thumbnail.
     */
    thumbnail: import_prop_types6.default.bool,
};
var Image2 = React65.forwardRef(
    (
        { bsPrefix, className, fluid = false, rounded = false, roundedCircle = false, thumbnail = false, ...props },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
        return (0, import_jsx_runtime58.jsx)('img', {
            // eslint-disable-line jsx-a11y/alt-text
            ref,
            ...props,
            className: (0, import_classnames43.default)(
                className,
                fluid && `${bsPrefix}-fluid`,
                rounded && `rounded`,
                roundedCircle && `rounded-circle`,
                thumbnail && `${bsPrefix}-thumbnail`
            ),
        });
    }
);
Image2.displayName = 'Image';
var Image_default = Image2;

// node_modules/react-bootstrap/esm/FigureImage.js
var import_jsx_runtime59 = __toESM(require_jsx_runtime());
var FigureImage = React66.forwardRef(({ className, fluid = true, ...props }, ref) =>
    (0, import_jsx_runtime59.jsx)(Image_default, {
        ref,
        ...props,
        fluid,
        className: (0, import_classnames44.default)(className, 'figure-img'),
    })
);
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = propTypes3;
var FigureImage_default = FigureImage;

// node_modules/react-bootstrap/esm/FigureCaption.js
var React67 = __toESM(require_react());
var import_classnames45 = __toESM(require_classnames());
var import_jsx_runtime60 = __toESM(require_jsx_runtime());
var FigureCaption = React67.forwardRef(({ className, bsPrefix, as: Component2 = 'figcaption', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'figure-caption');
    return (0, import_jsx_runtime60.jsx)(Component2, {
        ref,
        className: (0, import_classnames45.default)(className, bsPrefix),
        ...props,
    });
});
FigureCaption.displayName = 'FigureCaption';
var FigureCaption_default = FigureCaption;

// node_modules/react-bootstrap/esm/Figure.js
var import_jsx_runtime61 = __toESM(require_jsx_runtime());
var Figure = React68.forwardRef(({ className, bsPrefix, as: Component2 = 'figure', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'figure');
    return (0, import_jsx_runtime61.jsx)(Component2, {
        ref,
        className: (0, import_classnames46.default)(className, bsPrefix),
        ...props,
    });
});
Figure.displayName = 'Figure';
var Figure_default = Object.assign(Figure, {
    Image: FigureImage_default,
    Caption: FigureCaption_default,
});

// node_modules/react-bootstrap/esm/Form.js
var import_classnames58 = __toESM(require_classnames());
var import_prop_types8 = __toESM(require_prop_types());
var React83 = __toESM(require_react());

// node_modules/react-bootstrap/esm/FormCheck.js
var import_classnames50 = __toESM(require_classnames());
var React73 = __toESM(require_react());
var import_react51 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Feedback.js
var import_classnames47 = __toESM(require_classnames());
var React69 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());
var import_jsx_runtime62 = __toESM(require_jsx_runtime());
var propTypes4 = {
    /**
     * Specify whether the feedback is for valid or invalid fields
     *
     * @type {('valid'|'invalid')}
     */
    type: import_prop_types7.default.string,
    /** Display feedback as a tooltip. */
    tooltip: import_prop_types7.default.bool,
    as: import_prop_types7.default.elementType,
};
var Feedback = React69.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    ({ as: Component2 = 'div', className, type = 'valid', tooltip = false, ...props }, ref) =>
        (0, import_jsx_runtime62.jsx)(Component2, {
            ...props,
            ref,
            className: (0, import_classnames47.default)(className, `${type}-${tooltip ? 'tooltip' : 'feedback'}`),
        })
);
Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes4;
var Feedback_default = Feedback;

// node_modules/react-bootstrap/esm/FormCheckInput.js
var import_classnames48 = __toESM(require_classnames());
var React71 = __toESM(require_react());
var import_react49 = __toESM(require_react());

// node_modules/react-bootstrap/esm/FormContext.js
var React70 = __toESM(require_react());
var FormContext = React70.createContext({});
var FormContext_default = FormContext;

// node_modules/react-bootstrap/esm/FormCheckInput.js
var import_jsx_runtime63 = __toESM(require_jsx_runtime());
var FormCheckInput = React71.forwardRef(
    (
        {
            id,
            bsPrefix,
            className,
            type = 'checkbox',
            isValid = false,
            isInvalid = false,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'input',
            ...props
        },
        ref
    ) => {
        const { controlId } = (0, import_react49.useContext)(FormContext_default);
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-input');
        return (0, import_jsx_runtime63.jsx)(Component2, {
            ...props,
            ref,
            type,
            id: id || controlId,
            className: (0, import_classnames48.default)(
                className,
                bsPrefix,
                isValid && 'is-valid',
                isInvalid && 'is-invalid'
            ),
        });
    }
);
FormCheckInput.displayName = 'FormCheckInput';
var FormCheckInput_default = FormCheckInput;

// node_modules/react-bootstrap/esm/FormCheckLabel.js
var import_classnames49 = __toESM(require_classnames());
var React72 = __toESM(require_react());
var import_react50 = __toESM(require_react());
var import_jsx_runtime64 = __toESM(require_jsx_runtime());
var FormCheckLabel = React72.forwardRef(({ bsPrefix, className, htmlFor, ...props }, ref) => {
    const { controlId } = (0, import_react50.useContext)(FormContext_default);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-label');
    return (0, import_jsx_runtime64.jsx)('label', {
        ...props,
        ref,
        htmlFor: htmlFor || controlId,
        className: (0, import_classnames49.default)(className, bsPrefix),
    });
});
FormCheckLabel.displayName = 'FormCheckLabel';
var FormCheckLabel_default = FormCheckLabel;

// node_modules/react-bootstrap/esm/FormCheck.js
var import_jsx_runtime65 = __toESM(require_jsx_runtime());
var import_jsx_runtime66 = __toESM(require_jsx_runtime());
var import_jsx_runtime67 = __toESM(require_jsx_runtime());
var FormCheck = React73.forwardRef(
    (
        {
            id,
            bsPrefix,
            bsSwitchPrefix,
            inline = false,
            reverse = false,
            disabled = false,
            isValid = false,
            isInvalid = false,
            feedbackTooltip = false,
            feedback,
            feedbackType,
            className,
            style: style2,
            title = '',
            type = 'checkbox',
            label,
            children,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as = 'input',
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check');
        bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, 'form-switch');
        const { controlId } = (0, import_react51.useContext)(FormContext_default);
        const innerFormContext = (0, import_react51.useMemo)(
            () => ({
                controlId: id || controlId,
            }),
            [controlId, id]
        );
        const hasLabel =
            (!children && label != null && label !== false) || hasChildOfType(children, FormCheckLabel_default);
        const input = (0, import_jsx_runtime65.jsx)(FormCheckInput_default, {
            ...props,
            type: type === 'switch' ? 'checkbox' : type,
            ref,
            isValid,
            isInvalid,
            disabled,
            as,
        });
        return (0, import_jsx_runtime65.jsx)(FormContext_default.Provider, {
            value: innerFormContext,
            children: (0, import_jsx_runtime65.jsx)('div', {
                style: style2,
                className: (0, import_classnames50.default)(
                    className,
                    hasLabel && bsPrefix,
                    inline && `${bsPrefix}-inline`,
                    reverse && `${bsPrefix}-reverse`,
                    type === 'switch' && bsSwitchPrefix
                ),
                children:
                    children ||
                    (0, import_jsx_runtime67.jsxs)(import_jsx_runtime66.Fragment, {
                        children: [
                            input,
                            hasLabel &&
                                (0, import_jsx_runtime65.jsx)(FormCheckLabel_default, {
                                    title,
                                    children: label,
                                }),
                            feedback &&
                                (0, import_jsx_runtime65.jsx)(Feedback_default, {
                                    type: feedbackType,
                                    tooltip: feedbackTooltip,
                                    children: feedback,
                                }),
                        ],
                    }),
            }),
        });
    }
);
FormCheck.displayName = 'FormCheck';
var FormCheck_default = Object.assign(FormCheck, {
    Input: FormCheckInput_default,
    Label: FormCheckLabel_default,
});

// node_modules/react-bootstrap/esm/FormControl.js
var import_classnames51 = __toESM(require_classnames());
var React74 = __toESM(require_react());
var import_react52 = __toESM(require_react());
var import_warning3 = __toESM(require_warning());
var import_jsx_runtime68 = __toESM(require_jsx_runtime());
var FormControl = React74.forwardRef(
    (
        {
            bsPrefix,
            type,
            size: size2,
            htmlSize,
            id,
            className,
            isValid = false,
            isInvalid = false,
            plaintext,
            readOnly,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'input',
            ...props
        },
        ref
    ) => {
        const { controlId } = (0, import_react52.useContext)(FormContext_default);
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-control');
        true
            ? (0, import_warning3.default)(
                  controlId == null || !id,
                  '`controlId` is ignored on `<FormControl>` when `id` is specified.'
              )
            : void 0;
        return (0, import_jsx_runtime68.jsx)(Component2, {
            ...props,
            type,
            size: htmlSize,
            ref,
            readOnly,
            id: id || controlId,
            className: (0, import_classnames51.default)(
                className,
                plaintext ? `${bsPrefix}-plaintext` : bsPrefix,
                size2 && `${bsPrefix}-${size2}`,
                type === 'color' && `${bsPrefix}-color`,
                isValid && 'is-valid',
                isInvalid && 'is-invalid'
            ),
        });
    }
);
FormControl.displayName = 'FormControl';
var FormControl_default = Object.assign(FormControl, {
    Feedback: Feedback_default,
});

// node_modules/react-bootstrap/esm/FormFloating.js
var React75 = __toESM(require_react());
var import_classnames52 = __toESM(require_classnames());
var import_jsx_runtime69 = __toESM(require_jsx_runtime());
var FormFloating = React75.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
    return (0, import_jsx_runtime69.jsx)(Component2, {
        ref,
        className: (0, import_classnames52.default)(className, bsPrefix),
        ...props,
    });
});
FormFloating.displayName = 'FormFloating';
var FormFloating_default = FormFloating;

// node_modules/react-bootstrap/esm/FormGroup.js
var React76 = __toESM(require_react());
var import_react53 = __toESM(require_react());
var import_jsx_runtime70 = __toESM(require_jsx_runtime());
var FormGroup = React76.forwardRef(
    (
        {
            controlId,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        const context6 = (0, import_react53.useMemo)(
            () => ({
                controlId,
            }),
            [controlId]
        );
        return (0, import_jsx_runtime70.jsx)(FormContext_default.Provider, {
            value: context6,
            children: (0, import_jsx_runtime70.jsx)(Component2, {
                ...props,
                ref,
            }),
        });
    }
);
FormGroup.displayName = 'FormGroup';
var FormGroup_default = FormGroup;

// node_modules/react-bootstrap/esm/FormLabel.js
var import_classnames53 = __toESM(require_classnames());
var React77 = __toESM(require_react());
var import_react54 = __toESM(require_react());
var import_warning4 = __toESM(require_warning());
var import_jsx_runtime71 = __toESM(require_jsx_runtime());
var FormLabel = React77.forwardRef(
    (
        {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'label',
            bsPrefix,
            column = false,
            visuallyHidden = false,
            className,
            htmlFor,
            ...props
        },
        ref
    ) => {
        const { controlId } = (0, import_react54.useContext)(FormContext_default);
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');
        let columnClass = 'col-form-label';
        if (typeof column === 'string') columnClass = `${columnClass} ${columnClass}-${column}`;
        const classes = (0, import_classnames53.default)(
            className,
            bsPrefix,
            visuallyHidden && 'visually-hidden',
            column && columnClass
        );
        true
            ? (0, import_warning4.default)(
                  controlId == null || !htmlFor,
                  '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.'
              )
            : void 0;
        htmlFor = htmlFor || controlId;
        if (column)
            return (0, import_jsx_runtime71.jsx)(Col_default, {
                ref,
                as: 'label',
                className: classes,
                htmlFor,
                ...props,
            });
        return (
            // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
            (0, import_jsx_runtime71.jsx)(Component2, {
                ref,
                className: classes,
                htmlFor,
                ...props,
            })
        );
    }
);
FormLabel.displayName = 'FormLabel';
var FormLabel_default = FormLabel;

// node_modules/react-bootstrap/esm/FormRange.js
var import_classnames54 = __toESM(require_classnames());
var React78 = __toESM(require_react());
var import_react55 = __toESM(require_react());
var import_jsx_runtime72 = __toESM(require_jsx_runtime());
var FormRange = React78.forwardRef(({ bsPrefix, className, id, ...props }, ref) => {
    const { controlId } = (0, import_react55.useContext)(FormContext_default);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');
    return (0, import_jsx_runtime72.jsx)('input', {
        ...props,
        type: 'range',
        ref,
        className: (0, import_classnames54.default)(className, bsPrefix),
        id: id || controlId,
    });
});
FormRange.displayName = 'FormRange';
var FormRange_default = FormRange;

// node_modules/react-bootstrap/esm/FormSelect.js
var import_classnames55 = __toESM(require_classnames());
var React79 = __toESM(require_react());
var import_react56 = __toESM(require_react());
var import_jsx_runtime73 = __toESM(require_jsx_runtime());
var FormSelect = React79.forwardRef(
    ({ bsPrefix, size: size2, htmlSize, className, isValid = false, isInvalid = false, id, ...props }, ref) => {
        const { controlId } = (0, import_react56.useContext)(FormContext_default);
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-select');
        return (0, import_jsx_runtime73.jsx)('select', {
            ...props,
            size: htmlSize,
            ref,
            className: (0, import_classnames55.default)(
                className,
                bsPrefix,
                size2 && `${bsPrefix}-${size2}`,
                isValid && `is-valid`,
                isInvalid && `is-invalid`
            ),
            id: id || controlId,
        });
    }
);
FormSelect.displayName = 'FormSelect';
var FormSelect_default = FormSelect;

// node_modules/react-bootstrap/esm/FormText.js
var import_classnames56 = __toESM(require_classnames());
var React80 = __toESM(require_react());
var import_jsx_runtime74 = __toESM(require_jsx_runtime());
var FormText = React80.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    ({ bsPrefix, className, as: Component2 = 'small', muted, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
        return (0, import_jsx_runtime74.jsx)(Component2, {
            ...props,
            ref,
            className: (0, import_classnames56.default)(className, bsPrefix, muted && 'text-muted'),
        });
    }
);
FormText.displayName = 'FormText';
var FormText_default = FormText;

// node_modules/react-bootstrap/esm/Switch.js
var React81 = __toESM(require_react());
var import_jsx_runtime75 = __toESM(require_jsx_runtime());
var Switch = React81.forwardRef((props, ref) =>
    (0, import_jsx_runtime75.jsx)(FormCheck_default, {
        ...props,
        ref,
        type: 'switch',
    })
);
Switch.displayName = 'Switch';
var Switch_default = Object.assign(Switch, {
    Input: FormCheck_default.Input,
    Label: FormCheck_default.Label,
});

// node_modules/react-bootstrap/esm/FloatingLabel.js
var import_classnames57 = __toESM(require_classnames());
var React82 = __toESM(require_react());
var import_jsx_runtime76 = __toESM(require_jsx_runtime());
var import_jsx_runtime77 = __toESM(require_jsx_runtime());
var FloatingLabel = React82.forwardRef(({ bsPrefix, className, children, controlId, label, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
    return (0, import_jsx_runtime77.jsxs)(FormGroup_default, {
        ref,
        className: (0, import_classnames57.default)(className, bsPrefix),
        controlId,
        ...props,
        children: [
            children,
            (0, import_jsx_runtime76.jsx)('label', {
                htmlFor: controlId,
                children: label,
            }),
        ],
    });
});
FloatingLabel.displayName = 'FloatingLabel';
var FloatingLabel_default = FloatingLabel;

// node_modules/react-bootstrap/esm/Form.js
var import_jsx_runtime78 = __toESM(require_jsx_runtime());
var propTypes5 = {
    /**
     * The Form `ref` will be forwarded to the underlying element,
     * which means, unless it's rendered `as` a composite component,
     * it will be a DOM node, when resolved.
     *
     * @type {ReactRef}
     * @alias ref
     */
    _ref: import_prop_types8.default.any,
    /**
     * Mark a form as having been validated. Setting it to `true` will
     * toggle any validation styles on the forms elements.
     */
    validated: import_prop_types8.default.bool,
    as: import_prop_types8.default.elementType,
};
var Form = React83.forwardRef(
    (
        {
            className,
            validated,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'form',
            ...props
        },
        ref
    ) =>
        (0, import_jsx_runtime78.jsx)(Component2, {
            ...props,
            ref,
            className: (0, import_classnames58.default)(className, validated && 'was-validated'),
        })
);
Form.displayName = 'Form';
Form.propTypes = propTypes5;
var Form_default = Object.assign(Form, {
    Group: FormGroup_default,
    Control: FormControl_default,
    Floating: FormFloating_default,
    Check: FormCheck_default,
    Switch: Switch_default,
    Label: FormLabel_default,
    Text: FormText_default,
    Range: FormRange_default,
    Select: FormSelect_default,
    FloatingLabel: FloatingLabel_default,
});

// node_modules/react-bootstrap/esm/InputGroup.js
var import_classnames60 = __toESM(require_classnames());
var React85 = __toESM(require_react());
var import_react57 = __toESM(require_react());

// node_modules/react-bootstrap/esm/InputGroupText.js
var React84 = __toESM(require_react());
var import_classnames59 = __toESM(require_classnames());
var import_jsx_runtime79 = __toESM(require_jsx_runtime());
var InputGroupText = React84.forwardRef(({ className, bsPrefix, as: Component2 = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group-text');
    return (0, import_jsx_runtime79.jsx)(Component2, {
        ref,
        className: (0, import_classnames59.default)(className, bsPrefix),
        ...props,
    });
});
InputGroupText.displayName = 'InputGroupText';
var InputGroupText_default = InputGroupText;

// node_modules/react-bootstrap/esm/InputGroup.js
var import_jsx_runtime80 = __toESM(require_jsx_runtime());
var InputGroupCheckbox = (props) =>
    (0, import_jsx_runtime80.jsx)(InputGroupText_default, {
        children: (0, import_jsx_runtime80.jsx)(FormCheckInput_default, {
            type: 'checkbox',
            ...props,
        }),
    });
var InputGroupRadio = (props) =>
    (0, import_jsx_runtime80.jsx)(InputGroupText_default, {
        children: (0, import_jsx_runtime80.jsx)(FormCheckInput_default, {
            type: 'radio',
            ...props,
        }),
    });
var InputGroup = React85.forwardRef(
    (
        {
            bsPrefix,
            size: size2,
            hasValidation,
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group');
        const contextValue = (0, import_react57.useMemo)(() => ({}), []);
        return (0, import_jsx_runtime80.jsx)(InputGroupContext_default.Provider, {
            value: contextValue,
            children: (0, import_jsx_runtime80.jsx)(Component2, {
                ref,
                ...props,
                className: (0, import_classnames60.default)(
                    className,
                    bsPrefix,
                    size2 && `${bsPrefix}-${size2}`,
                    hasValidation && 'has-validation'
                ),
            }),
        });
    }
);
InputGroup.displayName = 'InputGroup';
var InputGroup_default = Object.assign(InputGroup, {
    Text: InputGroupText_default,
    Radio: InputGroupRadio,
    Checkbox: InputGroupCheckbox,
});

// node_modules/react-bootstrap/esm/ListGroup.js
var import_classnames62 = __toESM(require_classnames());
var React90 = __toESM(require_react());
var import_warning6 = __toESM(require_warning());

// node_modules/@restart/ui/esm/Nav.js
var React88 = __toESM(require_react());
var import_react59 = __toESM(require_react());

// node_modules/@restart/ui/esm/TabContext.js
var React86 = __toESM(require_react());
var TabContext = React86.createContext(null);
var TabContext_default = TabContext;

// node_modules/@restart/ui/esm/NavItem.js
var React87 = __toESM(require_react());
var import_react58 = __toESM(require_react());
var import_jsx_runtime81 = __toESM(require_jsx_runtime());
var _excluded6 = ['as', 'active', 'eventKey'];
function _objectWithoutPropertiesLoose7(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function useNavItem({ key, onClick, active, id, role, disabled }) {
    const parentOnSelect = (0, import_react58.useContext)(SelectableContext_default);
    const navContext = (0, import_react58.useContext)(NavContext_default);
    const tabContext = (0, import_react58.useContext)(TabContext_default);
    let isActive = active;
    const props = {
        role,
    };
    if (navContext) {
        if (!role && navContext.role === 'tablist') props.role = 'tab';
        const contextControllerId = navContext.getControllerId(key != null ? key : null);
        const contextControlledId = navContext.getControlledId(key != null ? key : null);
        props[dataAttr('event-key')] = key;
        props.id = contextControllerId || id;
        isActive = active == null && key != null ? navContext.activeKey === key : active;
        if (
            isActive ||
            (!(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter))
        )
            props['aria-controls'] = contextControlledId;
    }
    if (props.role === 'tab') {
        props['aria-selected'] = isActive;
        if (!isActive) {
            props.tabIndex = -1;
        }
        if (disabled) {
            props.tabIndex = -1;
            props['aria-disabled'] = true;
        }
    }
    props.onClick = useEventCallback((e) => {
        if (disabled) return;
        onClick == null ? void 0 : onClick(e);
        if (key == null) {
            return;
        }
        if (parentOnSelect && !e.isPropagationStopped()) {
            parentOnSelect(key, e);
        }
    });
    return [
        props,
        {
            isActive,
        },
    ];
}
var NavItem = React87.forwardRef((_ref, ref) => {
    let { as: Component2 = Button_default, active, eventKey } = _ref,
        options = _objectWithoutPropertiesLoose7(_ref, _excluded6);
    const [props, meta] = useNavItem(
        Object.assign(
            {
                key: makeEventKey(eventKey, options.href),
                active,
            },
            options
        )
    );
    props[dataAttr('active')] = meta.isActive;
    return (0, import_jsx_runtime81.jsx)(
        Component2,
        Object.assign({}, options, props, {
            ref,
        })
    );
});
NavItem.displayName = 'NavItem';
var NavItem_default = NavItem;

// node_modules/@restart/ui/esm/Nav.js
var import_jsx_runtime82 = __toESM(require_jsx_runtime());
var _excluded7 = ['as', 'onSelect', 'activeKey', 'role', 'onKeyDown'];
function _objectWithoutPropertiesLoose8(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var noop5 = () => {};
var EVENT_KEY_ATTR = dataAttr('event-key');
var Nav = React88.forwardRef((_ref, ref) => {
    let {
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            onSelect,
            activeKey,
            role,
            onKeyDown,
        } = _ref,
        props = _objectWithoutPropertiesLoose8(_ref, _excluded7);
    const forceUpdate = useForceUpdate();
    const needsRefocusRef = (0, import_react59.useRef)(false);
    const parentOnSelect = (0, import_react59.useContext)(SelectableContext_default);
    const tabContext = (0, import_react59.useContext)(TabContext_default);
    let getControlledId, getControllerId;
    if (tabContext) {
        role = role || 'tablist';
        activeKey = tabContext.activeKey;
        getControlledId = tabContext.getControlledId;
        getControllerId = tabContext.getControllerId;
    }
    const listNode = (0, import_react59.useRef)(null);
    const getNextActiveTab = (offset2) => {
        const currentListNode = listNode.current;
        if (!currentListNode) return null;
        const items = qsa(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
        const activeChild = currentListNode.querySelector('[aria-selected=true]');
        if (!activeChild || activeChild !== document.activeElement) return null;
        const index = items.indexOf(activeChild);
        if (index === -1) return null;
        let nextIndex = index + offset2;
        if (nextIndex >= items.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = items.length - 1;
        return items[nextIndex];
    };
    const handleSelect = (key, event) => {
        if (key == null) return;
        onSelect == null ? void 0 : onSelect(key, event);
        parentOnSelect == null ? void 0 : parentOnSelect(key, event);
    };
    const handleKeyDown = (event) => {
        onKeyDown == null ? void 0 : onKeyDown(event);
        if (!tabContext) {
            return;
        }
        let nextActiveChild;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                nextActiveChild = getNextActiveTab(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                nextActiveChild = getNextActiveTab(1);
                break;
            default:
                return;
        }
        if (!nextActiveChild) return;
        event.preventDefault();
        handleSelect(nextActiveChild.dataset[dataProp('EventKey')] || null, event);
        needsRefocusRef.current = true;
        forceUpdate();
    };
    (0, import_react59.useEffect)(() => {
        if (listNode.current && needsRefocusRef.current) {
            const activeChild = listNode.current.querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
            activeChild == null ? void 0 : activeChild.focus();
        }
        needsRefocusRef.current = false;
    });
    const mergedRef = useMergedRefs_default(ref, listNode);
    return (0, import_jsx_runtime82.jsx)(SelectableContext_default.Provider, {
        value: handleSelect,
        children: (0, import_jsx_runtime82.jsx)(NavContext_default.Provider, {
            value: {
                role,
                // used by NavLink to determine it's role
                activeKey: makeEventKey(activeKey),
                getControlledId: getControlledId || noop5,
                getControllerId: getControllerId || noop5,
            },
            children: (0, import_jsx_runtime82.jsx)(
                Component2,
                Object.assign({}, props, {
                    onKeyDown: handleKeyDown,
                    ref: mergedRef,
                    role,
                })
            ),
        }),
    });
});
Nav.displayName = 'Nav';
var Nav_default = Object.assign(Nav, {
    Item: NavItem_default,
});

// node_modules/react-bootstrap/esm/ListGroupItem.js
var import_classnames61 = __toESM(require_classnames());
var React89 = __toESM(require_react());
var import_warning5 = __toESM(require_warning());
var import_jsx_runtime83 = __toESM(require_jsx_runtime());
var ListGroupItem = React89.forwardRef(
    ({ bsPrefix, active, disabled, eventKey, className, variant, action, as, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
        const [navItemProps, meta] = useNavItem({
            key: makeEventKey(eventKey, props.href),
            active,
            ...props,
        });
        const handleClick = useEventCallback((event) => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            navItemProps.onClick(event);
        });
        if (disabled && props.tabIndex === void 0) {
            props.tabIndex = -1;
            props['aria-disabled'] = true;
        }
        const Component2 = as || (action ? (props.href ? 'a' : 'button') : 'div');
        true
            ? (0, import_warning5.default)(
                  as || !(!action && props.href),
                  '`action=false` and `href` should not be used together.'
              )
            : void 0;
        return (0, import_jsx_runtime83.jsx)(Component2, {
            ref,
            ...props,
            ...navItemProps,
            onClick: handleClick,
            className: (0, import_classnames61.default)(
                className,
                bsPrefix,
                meta.isActive && 'active',
                disabled && 'disabled',
                variant && `${bsPrefix}-${variant}`,
                action && `${bsPrefix}-action`
            ),
        });
    }
);
ListGroupItem.displayName = 'ListGroupItem';
var ListGroupItem_default = ListGroupItem;

// node_modules/react-bootstrap/esm/ListGroup.js
var import_jsx_runtime84 = __toESM(require_jsx_runtime());
var ListGroup = React90.forwardRef((props, ref) => {
    const {
        className,
        bsPrefix: initialBsPrefix,
        variant,
        horizontal,
        numbered,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as = 'div',
        ...controlledProps
    } = useUncontrolled(props, {
        activeKey: 'onSelect',
    });
    const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'list-group');
    let horizontalVariant;
    if (horizontal) {
        horizontalVariant = horizontal === true ? 'horizontal' : `horizontal-${horizontal}`;
    }
    true
        ? (0, import_warning6.default)(
              !(horizontal && variant === 'flush'),
              '`variant="flush"` and `horizontal` should not be used together.'
          )
        : void 0;
    return (0, import_jsx_runtime84.jsx)(Nav_default, {
        ref,
        ...controlledProps,
        as,
        className: (0, import_classnames62.default)(
            className,
            bsPrefix,
            variant && `${bsPrefix}-${variant}`,
            horizontalVariant && `${bsPrefix}-${horizontalVariant}`,
            numbered && `${bsPrefix}-numbered`
        ),
    });
});
ListGroup.displayName = 'ListGroup';
var ListGroup_default = Object.assign(ListGroup, {
    Item: ListGroupItem_default,
});

// node_modules/react-bootstrap/esm/Modal.js
var import_classnames68 = __toESM(require_classnames());

// node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
    if ((!size && size !== 0) || recalc) {
        if (canUseDOM_default) {
            var scrollDiv = document.createElement('div');
            scrollDiv.style.position = 'absolute';
            scrollDiv.style.top = '-9999px';
            scrollDiv.style.width = '50px';
            scrollDiv.style.height = '50px';
            scrollDiv.style.overflow = 'scroll';
            document.body.appendChild(scrollDiv);
            size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
    }
    return size;
}

// node_modules/react-bootstrap/esm/Modal.js
var React100 = __toESM(require_react());
var import_react65 = __toESM(require_react());

// node_modules/dom-helpers/esm/activeElement.js
function activeElement(doc) {
    if (doc === void 0) {
        doc = ownerDocument();
    }
    try {
        var active = doc.activeElement;
        if (!active || !active.nodeName) return null;
        return active;
    } catch (e) {
        return doc.body;
    }
}

// node_modules/@restart/ui/esm/Modal.js
var import_react63 = __toESM(require_react());
var React92 = __toESM(require_react());
var import_react_dom3 = __toESM(require_react_dom());

// node_modules/@restart/ui/esm/getScrollbarWidth.js
function getBodyScrollbarWidth(ownerDocument2 = document) {
    const window2 = ownerDocument2.defaultView;
    return Math.abs(window2.innerWidth - ownerDocument2.documentElement.clientWidth);
}

// node_modules/@restart/ui/esm/ModalManager.js
var OPEN_DATA_ATTRIBUTE = dataAttr('modal-open');
var ModalManager = class {
    constructor({ ownerDocument: ownerDocument2, handleContainerOverflow = true, isRTL = false } = {}) {
        this.handleContainerOverflow = handleContainerOverflow;
        this.isRTL = isRTL;
        this.modals = [];
        this.ownerDocument = ownerDocument2;
    }
    getScrollbarWidth() {
        return getBodyScrollbarWidth(this.ownerDocument);
    }
    getElement() {
        return (this.ownerDocument || document).body;
    }
    setModalAttributes(_modal) {}
    removeModalAttributes(_modal) {}
    setContainerStyle(containerState) {
        const style2 = {
            overflow: 'hidden',
        };
        const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
        const container = this.getElement();
        containerState.style = {
            overflow: container.style.overflow,
            [paddingProp]: container.style[paddingProp],
        };
        if (containerState.scrollBarWidth) {
            style2[paddingProp] =
                `${parseInt(css_default(container, paddingProp) || '0', 10) + containerState.scrollBarWidth}px`;
        }
        container.setAttribute(OPEN_DATA_ATTRIBUTE, '');
        css_default(container, style2);
    }
    reset() {
        [...this.modals].forEach((m) => this.remove(m));
    }
    removeContainerStyle(containerState) {
        const container = this.getElement();
        container.removeAttribute(OPEN_DATA_ATTRIBUTE);
        Object.assign(container.style, containerState.style);
    }
    add(modal) {
        let modalIdx = this.modals.indexOf(modal);
        if (modalIdx !== -1) {
            return modalIdx;
        }
        modalIdx = this.modals.length;
        this.modals.push(modal);
        this.setModalAttributes(modal);
        if (modalIdx !== 0) {
            return modalIdx;
        }
        this.state = {
            scrollBarWidth: this.getScrollbarWidth(),
            style: {},
        };
        if (this.handleContainerOverflow) {
            this.setContainerStyle(this.state);
        }
        return modalIdx;
    }
    remove(modal) {
        const modalIdx = this.modals.indexOf(modal);
        if (modalIdx === -1) {
            return;
        }
        this.modals.splice(modalIdx, 1);
        if (!this.modals.length && this.handleContainerOverflow) {
            this.removeContainerStyle(this.state);
        }
        this.removeModalAttributes(modal);
    }
    isTopModal(modal) {
        return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
    }
};
var ModalManager_default = ModalManager;

// node_modules/@restart/ui/esm/useWaitForDOMRef.js
var import_react60 = __toESM(require_react());
var resolveContainerRef = (ref, document2) => {
    if (!canUseDOM_default) return null;
    if (ref == null) return (document2 || ownerDocument()).body;
    if (typeof ref === 'function') ref = ref();
    if (ref && 'current' in ref) ref = ref.current;
    if (ref && ('nodeType' in ref || ref.getBoundingClientRect)) return ref;
    return null;
};
function useWaitForDOMRef(ref, onResolved) {
    const window2 = useWindow();
    const [resolvedRef, setRef] = (0, import_react60.useState)(() =>
        resolveContainerRef(ref, window2 == null ? void 0 : window2.document)
    );
    if (!resolvedRef) {
        const earlyRef = resolveContainerRef(ref);
        if (earlyRef) setRef(earlyRef);
    }
    (0, import_react60.useEffect)(() => {
        if (onResolved && resolvedRef) {
            onResolved(resolvedRef);
        }
    }, [onResolved, resolvedRef]);
    (0, import_react60.useEffect)(() => {
        const nextRef = resolveContainerRef(ref);
        if (nextRef !== resolvedRef) {
            setRef(nextRef);
        }
    }, [ref, resolvedRef]);
    return resolvedRef;
}

// node_modules/@restart/ui/esm/ImperativeTransition.js
var import_react62 = __toESM(require_react());

// node_modules/@restart/ui/esm/NoopTransition.js
var import_react61 = __toESM(require_react());
function NoopTransition({ children, in: inProp, onExited, mountOnEnter, unmountOnExit }) {
    const ref = (0, import_react61.useRef)(null);
    const hasEnteredRef = (0, import_react61.useRef)(inProp);
    const handleExited = useEventCallback(onExited);
    (0, import_react61.useEffect)(() => {
        if (inProp) hasEnteredRef.current = true;
        else {
            handleExited(ref.current);
        }
    }, [inProp, handleExited]);
    const combinedRef = useMergedRefs_default(ref, children.ref);
    const child = (0, import_react61.cloneElement)(children, {
        ref: combinedRef,
    });
    if (inProp) return child;
    if (unmountOnExit) {
        return null;
    }
    if (!hasEnteredRef.current && mountOnEnter) {
        return null;
    }
    return child;
}
var NoopTransition_default = NoopTransition;

// node_modules/@restart/ui/esm/ImperativeTransition.js
var import_jsx_runtime85 = __toESM(require_jsx_runtime());
function useTransition({ in: inProp, onTransition }) {
    const ref = (0, import_react62.useRef)(null);
    const isInitialRef = (0, import_react62.useRef)(true);
    const handleTransition = useEventCallback(onTransition);
    useIsomorphicEffect_default(() => {
        if (!ref.current) {
            return void 0;
        }
        let stale = false;
        handleTransition({
            in: inProp,
            element: ref.current,
            initial: isInitialRef.current,
            isStale: () => stale,
        });
        return () => {
            stale = true;
        };
    }, [inProp, handleTransition]);
    useIsomorphicEffect_default(() => {
        isInitialRef.current = false;
        return () => {
            isInitialRef.current = true;
        };
    }, []);
    return ref;
}
function ImperativeTransition({ children, in: inProp, onExited, onEntered, transition }) {
    const [exited, setExited] = (0, import_react62.useState)(!inProp);
    if (inProp && exited) {
        setExited(false);
    }
    const ref = useTransition({
        in: !!inProp,
        onTransition: (options) => {
            const onFinish = () => {
                if (options.isStale()) return;
                if (options.in) {
                    onEntered == null ? void 0 : onEntered(options.element, options.initial);
                } else {
                    setExited(true);
                    onExited == null ? void 0 : onExited(options.element);
                }
            };
            Promise.resolve(transition(options)).then(onFinish, (error) => {
                if (!options.in) setExited(true);
                throw error;
            });
        },
    });
    const combinedRef = useMergedRefs_default(ref, children.ref);
    return exited && !inProp
        ? null
        : (0, import_react62.cloneElement)(children, {
              ref: combinedRef,
          });
}
function renderTransition(Component2, runTransition, props) {
    if (Component2) {
        return (0, import_jsx_runtime85.jsx)(Component2, Object.assign({}, props));
    }
    if (runTransition) {
        return (0, import_jsx_runtime85.jsx)(
            ImperativeTransition,
            Object.assign({}, props, {
                transition: runTransition,
            })
        );
    }
    return (0, import_jsx_runtime85.jsx)(NoopTransition_default, Object.assign({}, props));
}

// node_modules/@restart/ui/esm/utils.js
function isEscKey(e) {
    return e.code === 'Escape' || e.keyCode === 27;
}

// node_modules/@restart/ui/esm/Modal.js
var import_jsx_runtime86 = __toESM(require_jsx_runtime());
var import_jsx_runtime87 = __toESM(require_jsx_runtime());
var import_jsx_runtime88 = __toESM(require_jsx_runtime());
var _excluded8 = [
    'show',
    'role',
    'className',
    'style',
    'children',
    'backdrop',
    'keyboard',
    'onBackdropClick',
    'onEscapeKeyDown',
    'transition',
    'runTransition',
    'backdropTransition',
    'runBackdropTransition',
    'autoFocus',
    'enforceFocus',
    'restoreFocus',
    'restoreFocusOptions',
    'renderDialog',
    'renderBackdrop',
    'manager',
    'container',
    'onShow',
    'onHide',
    'onExit',
    'onExited',
    'onExiting',
    'onEnter',
    'onEntering',
    'onEntered',
];
function _objectWithoutPropertiesLoose9(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var manager;
function getManager(window2) {
    if (!manager)
        manager = new ModalManager_default({
            ownerDocument: window2 == null ? void 0 : window2.document,
        });
    return manager;
}
function useModalManager(provided) {
    const window2 = useWindow();
    const modalManager = provided || getManager(window2);
    const modal = (0, import_react63.useRef)({
        dialog: null,
        backdrop: null,
    });
    return Object.assign(modal.current, {
        add: () => modalManager.add(modal.current),
        remove: () => modalManager.remove(modal.current),
        isTopModal: () => modalManager.isTopModal(modal.current),
        setDialogRef: (0, import_react63.useCallback)((ref) => {
            modal.current.dialog = ref;
        }, []),
        setBackdropRef: (0, import_react63.useCallback)((ref) => {
            modal.current.backdrop = ref;
        }, []),
    });
}
var Modal = (0, import_react63.forwardRef)((_ref, ref) => {
    let {
            show = false,
            role = 'dialog',
            className,
            style: style2,
            children,
            backdrop = true,
            keyboard = true,
            onBackdropClick,
            onEscapeKeyDown,
            transition,
            runTransition,
            backdropTransition,
            runBackdropTransition,
            autoFocus = true,
            enforceFocus = true,
            restoreFocus = true,
            restoreFocusOptions,
            renderDialog,
            renderBackdrop = (props) => (0, import_jsx_runtime86.jsx)('div', Object.assign({}, props)),
            manager: providedManager,
            container: containerRef,
            onShow,
            onHide = () => {},
            onExit,
            onExited,
            onExiting,
            onEnter,
            onEntering,
            onEntered,
        } = _ref,
        rest = _objectWithoutPropertiesLoose9(_ref, _excluded8);
    const ownerWindow2 = useWindow();
    const container = useWaitForDOMRef(containerRef);
    const modal = useModalManager(providedManager);
    const isMounted = useMounted();
    const prevShow = usePrevious(show);
    const [exited, setExited] = (0, import_react63.useState)(!show);
    const lastFocusRef = (0, import_react63.useRef)(null);
    (0, import_react63.useImperativeHandle)(ref, () => modal, [modal]);
    if (canUseDOM_default && !prevShow && show) {
        lastFocusRef.current = activeElement(ownerWindow2 == null ? void 0 : ownerWindow2.document);
    }
    if (show && exited) {
        setExited(false);
    }
    const handleShow = useEventCallback(() => {
        modal.add();
        removeKeydownListenerRef.current = listen_default(document, 'keydown', handleDocumentKeyDown);
        removeFocusListenerRef.current = listen_default(
            document,
            'focus',
            // the timeout is necessary b/c this will run before the new modal is mounted
            // and so steals focus from it
            () => setTimeout(handleEnforceFocus),
            true
        );
        if (onShow) {
            onShow();
        }
        if (autoFocus) {
            var _modal$dialog$ownerDo, _modal$dialog;
            const currentActiveElement = activeElement(
                (_modal$dialog$ownerDo =
                    (_modal$dialog = modal.dialog) == null ? void 0 : _modal$dialog.ownerDocument) != null
                    ? _modal$dialog$ownerDo
                    : ownerWindow2 == null
                      ? void 0
                      : ownerWindow2.document
            );
            if (modal.dialog && currentActiveElement && !contains2(modal.dialog, currentActiveElement)) {
                lastFocusRef.current = currentActiveElement;
                modal.dialog.focus();
            }
        }
    });
    const handleHide = useEventCallback(() => {
        modal.remove();
        removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
        removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
        if (restoreFocus) {
            var _lastFocusRef$current;
            (_lastFocusRef$current = lastFocusRef.current) == null
                ? void 0
                : _lastFocusRef$current.focus == null
                  ? void 0
                  : _lastFocusRef$current.focus(restoreFocusOptions);
            lastFocusRef.current = null;
        }
    });
    (0, import_react63.useEffect)(() => {
        if (!show || !container) return;
        handleShow();
    }, [
        show,
        container,
        /* should never change: */
        handleShow,
    ]);
    (0, import_react63.useEffect)(() => {
        if (!exited) return;
        handleHide();
    }, [exited, handleHide]);
    useWillUnmount(() => {
        handleHide();
    });
    const handleEnforceFocus = useEventCallback(() => {
        if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
            return;
        }
        const currentActiveElement = activeElement(ownerWindow2 == null ? void 0 : ownerWindow2.document);
        if (modal.dialog && currentActiveElement && !contains2(modal.dialog, currentActiveElement)) {
            modal.dialog.focus();
        }
    });
    const handleBackdropClick = useEventCallback((e) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        onBackdropClick == null ? void 0 : onBackdropClick(e);
        if (backdrop === true) {
            onHide();
        }
    });
    const handleDocumentKeyDown = useEventCallback((e) => {
        if (keyboard && isEscKey(e) && modal.isTopModal()) {
            onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
            if (!e.defaultPrevented) {
                onHide();
            }
        }
    });
    const removeFocusListenerRef = (0, import_react63.useRef)();
    const removeKeydownListenerRef = (0, import_react63.useRef)();
    const handleHidden = (...args) => {
        setExited(true);
        onExited == null ? void 0 : onExited(...args);
    };
    if (!container) {
        return null;
    }
    const dialogProps = Object.assign(
        {
            role,
            ref: modal.setDialogRef,
            // apparently only works on the dialog role element
            'aria-modal': role === 'dialog' ? true : void 0,
        },
        rest,
        {
            style: style2,
            className,
            tabIndex: -1,
        }
    );
    let dialog = renderDialog
        ? renderDialog(dialogProps)
        : (0, import_jsx_runtime86.jsx)(
              'div',
              Object.assign({}, dialogProps, {
                  children: React92.cloneElement(children, {
                      role: 'document',
                  }),
              })
          );
    dialog = renderTransition(transition, runTransition, {
        unmountOnExit: true,
        mountOnEnter: true,
        appear: true,
        in: !!show,
        onExit,
        onExiting,
        onExited: handleHidden,
        onEnter,
        onEntering,
        onEntered,
        children: dialog,
    });
    let backdropElement = null;
    if (backdrop) {
        backdropElement = renderBackdrop({
            ref: modal.setBackdropRef,
            onClick: handleBackdropClick,
        });
        backdropElement = renderTransition(backdropTransition, runBackdropTransition, {
            in: !!show,
            appear: true,
            mountOnEnter: true,
            unmountOnExit: true,
            children: backdropElement,
        });
    }
    return (0, import_jsx_runtime86.jsx)(import_jsx_runtime87.Fragment, {
        children: import_react_dom3.default.createPortal(
            (0, import_jsx_runtime88.jsxs)(import_jsx_runtime87.Fragment, {
                children: [backdropElement, dialog],
            }),
            container
        ),
    });
});
Modal.displayName = 'Modal';
var Modal_default = Object.assign(Modal, {
    Manager: ModalManager_default,
});

// node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
    if (element.classList) return !!className && element.classList.contains(className);
    return (' ' + (element.className.baseVal || element.className) + ' ').indexOf(' ' + className + ' ') !== -1;
}

// node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else if (!hasClass(element, className))
        if (typeof element.className === 'string') element.className = element.className + ' ' + className;
        else element.setAttribute('class', ((element.className && element.className.baseVal) || '') + ' ' + className);
}

// node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
    return origClass
        .replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1')
        .replace(/\s+/g, ' ')
        .replace(/^\s*|\s*$/g, '');
}
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    } else if (typeof element.className === 'string') {
        element.className = replaceClassName(element.className, className);
    } else {
        element.setAttribute(
            'class',
            replaceClassName((element.className && element.className.baseVal) || '', className)
        );
    }
}

// node_modules/react-bootstrap/esm/BootstrapModalManager.js
var Selector = {
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler',
};
var BootstrapModalManager = class extends ModalManager_default {
    adjustAndStore(prop, element, adjust) {
        const actual = element.style[prop];
        element.dataset[prop] = actual;
        css_default(element, {
            [prop]: `${parseFloat(css_default(element, prop)) + adjust}px`,
        });
    }
    restore(prop, element) {
        const value = element.dataset[prop];
        if (value !== void 0) {
            delete element.dataset[prop];
            css_default(element, {
                [prop]: value,
            });
        }
    }
    setContainerStyle(containerState) {
        super.setContainerStyle(containerState);
        const container = this.getElement();
        addClass(container, 'modal-open');
        if (!containerState.scrollBarWidth) return;
        const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
        const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
        qsa(container, Selector.FIXED_CONTENT).forEach((el) =>
            this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth)
        );
        qsa(container, Selector.STICKY_CONTENT).forEach((el) =>
            this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth)
        );
        qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) =>
            this.adjustAndStore(marginProp, el, containerState.scrollBarWidth)
        );
    }
    removeContainerStyle(containerState) {
        super.removeContainerStyle(containerState);
        const container = this.getElement();
        removeClass(container, 'modal-open');
        const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
        const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
        qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
        qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
        qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
    }
};
var sharedManager;
function getSharedManager(options) {
    if (!sharedManager) sharedManager = new BootstrapModalManager(options);
    return sharedManager;
}
var BootstrapModalManager_default = BootstrapModalManager;

// node_modules/react-bootstrap/esm/ModalBody.js
var React93 = __toESM(require_react());
var import_classnames63 = __toESM(require_classnames());
var import_jsx_runtime89 = __toESM(require_jsx_runtime());
var ModalBody = React93.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-body');
    return (0, import_jsx_runtime89.jsx)(Component2, {
        ref,
        className: (0, import_classnames63.default)(className, bsPrefix),
        ...props,
    });
});
ModalBody.displayName = 'ModalBody';
var ModalBody_default = ModalBody;

// node_modules/react-bootstrap/esm/ModalContext.js
var React94 = __toESM(require_react());
var ModalContext = React94.createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onHide() {},
});
var ModalContext_default = ModalContext;

// node_modules/react-bootstrap/esm/ModalDialog.js
var import_classnames64 = __toESM(require_classnames());
var React95 = __toESM(require_react());
var import_jsx_runtime90 = __toESM(require_jsx_runtime());
var ModalDialog = React95.forwardRef(
    (
        { bsPrefix, className, contentClassName, centered, size: size2, fullscreen, children, scrollable, ...props },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
        const dialogClass = `${bsPrefix}-dialog`;
        const fullScreenClass =
            typeof fullscreen === 'string' ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
        return (0, import_jsx_runtime90.jsx)('div', {
            ...props,
            ref,
            className: (0, import_classnames64.default)(
                dialogClass,
                className,
                size2 && `${bsPrefix}-${size2}`,
                centered && `${dialogClass}-centered`,
                scrollable && `${dialogClass}-scrollable`,
                fullscreen && fullScreenClass
            ),
            children: (0, import_jsx_runtime90.jsx)('div', {
                className: (0, import_classnames64.default)(`${bsPrefix}-content`, contentClassName),
                children,
            }),
        });
    }
);
ModalDialog.displayName = 'ModalDialog';
var ModalDialog_default = ModalDialog;

// node_modules/react-bootstrap/esm/ModalFooter.js
var React96 = __toESM(require_react());
var import_classnames65 = __toESM(require_classnames());
var import_jsx_runtime91 = __toESM(require_jsx_runtime());
var ModalFooter = React96.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-footer');
    return (0, import_jsx_runtime91.jsx)(Component2, {
        ref,
        className: (0, import_classnames65.default)(className, bsPrefix),
        ...props,
    });
});
ModalFooter.displayName = 'ModalFooter';
var ModalFooter_default = ModalFooter;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_classnames66 = __toESM(require_classnames());
var React98 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AbstractModalHeader.js
var React97 = __toESM(require_react());
var import_react64 = __toESM(require_react());
var import_jsx_runtime92 = __toESM(require_jsx_runtime());
var import_jsx_runtime93 = __toESM(require_jsx_runtime());
var AbstractModalHeader = React97.forwardRef(
    ({ closeLabel = 'Close', closeVariant, closeButton = false, onHide, children, ...props }, ref) => {
        const context6 = (0, import_react64.useContext)(ModalContext_default);
        const handleClick = useEventCallback(() => {
            context6 == null ? void 0 : context6.onHide();
            onHide == null ? void 0 : onHide();
        });
        return (0, import_jsx_runtime93.jsxs)('div', {
            ref,
            ...props,
            children: [
                children,
                closeButton &&
                    (0, import_jsx_runtime92.jsx)(CloseButton_default, {
                        'aria-label': closeLabel,
                        variant: closeVariant,
                        onClick: handleClick,
                    }),
            ],
        });
    }
);
var AbstractModalHeader_default = AbstractModalHeader;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_jsx_runtime94 = __toESM(require_jsx_runtime());
var ModalHeader = React98.forwardRef(
    ({ bsPrefix, className, closeLabel = 'Close', closeButton = false, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
        return (0, import_jsx_runtime94.jsx)(AbstractModalHeader_default, {
            ref,
            ...props,
            className: (0, import_classnames66.default)(className, bsPrefix),
            closeLabel,
            closeButton,
        });
    }
);
ModalHeader.displayName = 'ModalHeader';
var ModalHeader_default = ModalHeader;

// node_modules/react-bootstrap/esm/ModalTitle.js
var React99 = __toESM(require_react());
var import_classnames67 = __toESM(require_classnames());
var import_jsx_runtime95 = __toESM(require_jsx_runtime());
var DivStyledAsH42 = divWithClassName_default('h4');
var ModalTitle = React99.forwardRef(({ className, bsPrefix, as: Component2 = DivStyledAsH42, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-title');
    return (0, import_jsx_runtime95.jsx)(Component2, {
        ref,
        className: (0, import_classnames67.default)(className, bsPrefix),
        ...props,
    });
});
ModalTitle.displayName = 'ModalTitle';
var ModalTitle_default = ModalTitle;

// node_modules/react-bootstrap/esm/Modal.js
var import_jsx_runtime96 = __toESM(require_jsx_runtime());
function DialogTransition(props) {
    return (0, import_jsx_runtime96.jsx)(Fade_default, {
        ...props,
        timeout: null,
    });
}
function BackdropTransition(props) {
    return (0, import_jsx_runtime96.jsx)(Fade_default, {
        ...props,
        timeout: null,
    });
}
var Modal2 = React100.forwardRef(
    (
        {
            bsPrefix,
            className,
            style: style2,
            dialogClassName,
            contentClassName,
            children,
            dialogAs: Dialog = ModalDialog_default,
            'data-bs-theme': dataBsTheme,
            'aria-labelledby': ariaLabelledby,
            'aria-describedby': ariaDescribedby,
            'aria-label': ariaLabel,
            /* BaseModal props */
            show = false,
            animation = true,
            backdrop = true,
            keyboard = true,
            onEscapeKeyDown,
            onShow,
            onHide,
            container,
            autoFocus = true,
            enforceFocus = true,
            restoreFocus = true,
            restoreFocusOptions,
            onEntered,
            onExit,
            onExiting,
            onEnter,
            onEntering,
            onExited,
            backdropClassName,
            manager: propsManager,
            ...props
        },
        ref
    ) => {
        const [modalStyle, setStyle] = (0, import_react65.useState)({});
        const [animateStaticModal, setAnimateStaticModal] = (0, import_react65.useState)(false);
        const waitingForMouseUpRef = (0, import_react65.useRef)(false);
        const ignoreBackdropClickRef = (0, import_react65.useRef)(false);
        const removeStaticModalAnimationRef = (0, import_react65.useRef)(null);
        const [modal, setModalRef] = useCallbackRef();
        const mergedRef = useMergedRefs_default(ref, setModalRef);
        const handleHide = useEventCallback(onHide);
        const isRTL = useIsRTL();
        bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
        const modalContext = (0, import_react65.useMemo)(
            () => ({
                onHide: handleHide,
            }),
            [handleHide]
        );
        function getModalManager() {
            if (propsManager) return propsManager;
            return getSharedManager({
                isRTL,
            });
        }
        function updateDialogStyle(node) {
            if (!canUseDOM_default) return;
            const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
            const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
            setStyle({
                paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
                paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0,
            });
        }
        const handleWindowResize = useEventCallback(() => {
            if (modal) {
                updateDialogStyle(modal.dialog);
            }
        });
        useWillUnmount(() => {
            removeEventListener_default(window, 'resize', handleWindowResize);
            removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
        });
        const handleDialogMouseDown = () => {
            waitingForMouseUpRef.current = true;
        };
        const handleMouseUp = (e) => {
            if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
                ignoreBackdropClickRef.current = true;
            }
            waitingForMouseUpRef.current = false;
        };
        const handleStaticModalAnimation = () => {
            setAnimateStaticModal(true);
            removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
                setAnimateStaticModal(false);
            });
        };
        const handleStaticBackdropClick = (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            handleStaticModalAnimation();
        };
        const handleClick = (e) => {
            if (backdrop === 'static') {
                handleStaticBackdropClick(e);
                return;
            }
            if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
                ignoreBackdropClickRef.current = false;
                return;
            }
            onHide == null ? void 0 : onHide();
        };
        const handleEscapeKeyDown = (e) => {
            if (keyboard) {
                onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
            } else {
                e.preventDefault();
                if (backdrop === 'static') {
                    handleStaticModalAnimation();
                }
            }
        };
        const handleEnter = (node, isAppearing) => {
            if (node) {
                updateDialogStyle(node);
            }
            onEnter == null ? void 0 : onEnter(node, isAppearing);
        };
        const handleExit = (node) => {
            removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
            onExit == null ? void 0 : onExit(node);
        };
        const handleEntering = (node, isAppearing) => {
            onEntering == null ? void 0 : onEntering(node, isAppearing);
            addEventListener_default(window, 'resize', handleWindowResize);
        };
        const handleExited = (node) => {
            if (node) node.style.display = '';
            onExited == null ? void 0 : onExited(node);
            removeEventListener_default(window, 'resize', handleWindowResize);
        };
        const renderBackdrop = (0, import_react65.useCallback)(
            (backdropProps) =>
                (0, import_jsx_runtime96.jsx)('div', {
                    ...backdropProps,
                    className: (0, import_classnames68.default)(
                        `${bsPrefix}-backdrop`,
                        backdropClassName,
                        !animation && 'show'
                    ),
                }),
            [animation, backdropClassName, bsPrefix]
        );
        const baseModalStyle = {
            ...style2,
            ...modalStyle,
        };
        baseModalStyle.display = 'block';
        const renderDialog = (dialogProps) =>
            (0, import_jsx_runtime96.jsx)('div', {
                role: 'dialog',
                ...dialogProps,
                style: baseModalStyle,
                className: (0, import_classnames68.default)(
                    className,
                    bsPrefix,
                    animateStaticModal && `${bsPrefix}-static`,
                    !animation && 'show'
                ),
                onClick: backdrop ? handleClick : void 0,
                onMouseUp: handleMouseUp,
                'data-bs-theme': dataBsTheme,
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledby,
                'aria-describedby': ariaDescribedby,
                children: (0, import_jsx_runtime96.jsx)(Dialog, {
                    ...props,
                    onMouseDown: handleDialogMouseDown,
                    className: dialogClassName,
                    contentClassName,
                    children,
                }),
            });
        return (0, import_jsx_runtime96.jsx)(ModalContext_default.Provider, {
            value: modalContext,
            children: (0, import_jsx_runtime96.jsx)(Modal_default, {
                show,
                ref: mergedRef,
                backdrop,
                container,
                keyboard: true,
                autoFocus,
                enforceFocus,
                restoreFocus,
                restoreFocusOptions,
                onEscapeKeyDown: handleEscapeKeyDown,
                onShow,
                onHide,
                onEnter: handleEnter,
                onEntering: handleEntering,
                onEntered,
                onExit: handleExit,
                onExiting,
                onExited: handleExited,
                manager: getModalManager(),
                transition: animation ? DialogTransition : void 0,
                backdropTransition: animation ? BackdropTransition : void 0,
                renderBackdrop,
                renderDialog,
            }),
        });
    }
);
Modal2.displayName = 'Modal';
var Modal_default2 = Object.assign(Modal2, {
    Body: ModalBody_default,
    Header: ModalHeader_default,
    Title: ModalTitle_default,
    Footer: ModalFooter_default,
    Dialog: ModalDialog_default,
    TRANSITION_DURATION: 300,
    BACKDROP_TRANSITION_DURATION: 150,
});

// node_modules/react-bootstrap/esm/Nav.js
var import_classnames71 = __toESM(require_classnames());
var import_all = __toESM(require_all());
var React103 = __toESM(require_react());
var import_react66 = __toESM(require_react());

// node_modules/react-bootstrap/esm/NavItem.js
var React101 = __toESM(require_react());
var import_classnames69 = __toESM(require_classnames());
var import_jsx_runtime97 = __toESM(require_jsx_runtime());
var NavItem2 = React101.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
    return (0, import_jsx_runtime97.jsx)(Component2, {
        ref,
        className: (0, import_classnames69.default)(className, bsPrefix),
        ...props,
    });
});
NavItem2.displayName = 'NavItem';
var NavItem_default2 = NavItem2;

// node_modules/react-bootstrap/esm/NavLink.js
var import_classnames70 = __toESM(require_classnames());
var React102 = __toESM(require_react());
var import_jsx_runtime98 = __toESM(require_jsx_runtime());
var NavLink = React102.forwardRef(
    ({ bsPrefix, className, as: Component2 = Anchor_default, active, eventKey, disabled = false, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
        const [navItemProps, meta] = useNavItem({
            key: makeEventKey(eventKey, props.href),
            active,
            disabled,
            ...props,
        });
        return (0, import_jsx_runtime98.jsx)(Component2, {
            ...props,
            ...navItemProps,
            ref,
            disabled,
            className: (0, import_classnames70.default)(
                className,
                bsPrefix,
                disabled && 'disabled',
                meta.isActive && 'active'
            ),
        });
    }
);
NavLink.displayName = 'NavLink';
var NavLink_default = NavLink;

// node_modules/react-bootstrap/esm/Nav.js
var import_jsx_runtime99 = __toESM(require_jsx_runtime());
var Nav2 = React103.forwardRef((uncontrolledProps, ref) => {
    const {
        as = 'div',
        bsPrefix: initialBsPrefix,
        variant,
        fill = false,
        justify = false,
        navbar,
        navbarScroll,
        className,
        activeKey,
        ...props
    } = useUncontrolled(uncontrolledProps, {
        activeKey: 'onSelect',
    });
    const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');
    let navbarBsPrefix;
    let cardHeaderBsPrefix;
    let isNavbar = false;
    const navbarContext = (0, import_react66.useContext)(NavbarContext_default);
    const cardHeaderContext = (0, import_react66.useContext)(CardHeaderContext_default);
    if (navbarContext) {
        navbarBsPrefix = navbarContext.bsPrefix;
        isNavbar = navbar == null ? true : navbar;
    } else if (cardHeaderContext) {
        ({ cardHeaderBsPrefix } = cardHeaderContext);
    }
    return (0, import_jsx_runtime99.jsx)(Nav_default, {
        as,
        ref,
        activeKey,
        className: (0, import_classnames71.default)(className, {
            [bsPrefix]: !isNavbar,
            [`${navbarBsPrefix}-nav`]: isNavbar,
            [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
            [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
            [`${bsPrefix}-${variant}`]: !!variant,
            [`${bsPrefix}-fill`]: fill,
            [`${bsPrefix}-justified`]: justify,
        }),
        ...props,
    });
});
Nav2.displayName = 'Nav';
var Nav_default2 = Object.assign(Nav2, {
    Item: NavItem_default2,
    Link: NavLink_default,
});

// node_modules/react-bootstrap/esm/Navbar.js
var import_classnames80 = __toESM(require_classnames());
var React114 = __toESM(require_react());
var import_react73 = __toESM(require_react());

// node_modules/react-bootstrap/esm/NavbarBrand.js
var import_classnames72 = __toESM(require_classnames());
var React104 = __toESM(require_react());
var import_jsx_runtime100 = __toESM(require_jsx_runtime());
var NavbarBrand = React104.forwardRef(({ bsPrefix, className, as, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');
    const Component2 = as || (props.href ? 'a' : 'span');
    return (0, import_jsx_runtime100.jsx)(Component2, {
        ...props,
        ref,
        className: (0, import_classnames72.default)(className, bsPrefix),
    });
});
NavbarBrand.displayName = 'NavbarBrand';
var NavbarBrand_default = NavbarBrand;

// node_modules/react-bootstrap/esm/NavbarCollapse.js
var React105 = __toESM(require_react());
var import_react67 = __toESM(require_react());
var import_jsx_runtime101 = __toESM(require_jsx_runtime());
var NavbarCollapse = React105.forwardRef(({ children, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    const context6 = (0, import_react67.useContext)(NavbarContext_default);
    return (0, import_jsx_runtime101.jsx)(Collapse_default, {
        in: !!(context6 && context6.expanded),
        ...props,
        children: (0, import_jsx_runtime101.jsx)('div', {
            ref,
            className: bsPrefix,
            children,
        }),
    });
});
NavbarCollapse.displayName = 'NavbarCollapse';
var NavbarCollapse_default = NavbarCollapse;

// node_modules/react-bootstrap/esm/NavbarToggle.js
var import_classnames73 = __toESM(require_classnames());
var React106 = __toESM(require_react());
var import_react68 = __toESM(require_react());
var import_jsx_runtime102 = __toESM(require_jsx_runtime());
var NavbarToggle = React106.forwardRef(
    (
        {
            bsPrefix,
            className,
            children,
            label = 'Toggle navigation',
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'button',
            onClick,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-toggler');
        const { onToggle, expanded } = (0, import_react68.useContext)(NavbarContext_default) || {};
        const handleClick = useEventCallback((e) => {
            if (onClick) onClick(e);
            if (onToggle) onToggle();
        });
        if (Component2 === 'button') {
            props.type = 'button';
        }
        return (0, import_jsx_runtime102.jsx)(Component2, {
            ...props,
            ref,
            onClick: handleClick,
            'aria-label': label,
            className: (0, import_classnames73.default)(className, bsPrefix, !expanded && 'collapsed'),
            children:
                children ||
                (0, import_jsx_runtime102.jsx)('span', {
                    className: `${bsPrefix}-icon`,
                }),
        });
    }
);
NavbarToggle.displayName = 'NavbarToggle';
var NavbarToggle_default = NavbarToggle;

// node_modules/react-bootstrap/esm/NavbarOffcanvas.js
var React112 = __toESM(require_react());
var import_react72 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Offcanvas.js
var import_classnames78 = __toESM(require_classnames());

// node_modules/@restart/hooks/esm/useMediaQuery.js
var import_react69 = __toESM(require_react());
var matchersByWindow = /* @__PURE__ */ new WeakMap();
var getMatcher = (query, targetWindow) => {
    if (!query || !targetWindow) return void 0;
    const matchers = matchersByWindow.get(targetWindow) || /* @__PURE__ */ new Map();
    matchersByWindow.set(targetWindow, matchers);
    let mql = matchers.get(query);
    if (!mql) {
        mql = targetWindow.matchMedia(query);
        mql.refCount = 0;
        matchers.set(mql.media, mql);
    }
    return mql;
};
function useMediaQuery(query, targetWindow = typeof window === 'undefined' ? void 0 : window) {
    const mql = getMatcher(query, targetWindow);
    const [matches, setMatches] = (0, import_react69.useState)(() => (mql ? mql.matches : false));
    useIsomorphicEffect_default(() => {
        let mql2 = getMatcher(query, targetWindow);
        if (!mql2) {
            return setMatches(false);
        }
        let matchers = matchersByWindow.get(targetWindow);
        const handleChange = () => {
            setMatches(mql2.matches);
        };
        mql2.refCount++;
        mql2.addListener(handleChange);
        handleChange();
        return () => {
            mql2.removeListener(handleChange);
            mql2.refCount--;
            if (mql2.refCount <= 0) {
                matchers == null ? void 0 : matchers.delete(mql2.media);
            }
            mql2 = void 0;
        };
    }, [query]);
    return matches;
}

// node_modules/@restart/hooks/esm/useBreakpoint.js
var import_react70 = __toESM(require_react());
function createBreakpointHook(breakpointValues) {
    const names = Object.keys(breakpointValues);
    function and(query, next) {
        if (query === next) {
            return next;
        }
        return query ? `${query} and ${next}` : next;
    }
    function getNext(breakpoint) {
        return names[Math.min(names.indexOf(breakpoint) + 1, names.length - 1)];
    }
    function getMaxQuery(breakpoint) {
        const next = getNext(breakpoint);
        let value = breakpointValues[next];
        if (typeof value === 'number') value = `${value - 0.2}px`;
        else value = `calc(${value} - 0.2px)`;
        return `(max-width: ${value})`;
    }
    function getMinQuery(breakpoint) {
        let value = breakpointValues[breakpoint];
        if (typeof value === 'number') {
            value = `${value}px`;
        }
        return `(min-width: ${value})`;
    }
    function useBreakpoint2(breakpointOrMap, direction, window2) {
        let breakpointMap;
        if (typeof breakpointOrMap === 'object') {
            breakpointMap = breakpointOrMap;
            window2 = direction;
            direction = true;
        } else {
            direction = direction || true;
            breakpointMap = {
                [breakpointOrMap]: direction,
            };
        }
        let query = (0, import_react70.useMemo)(
            () =>
                Object.entries(breakpointMap).reduce((query2, [key, direction2]) => {
                    if (direction2 === 'up' || direction2 === true) {
                        query2 = and(query2, getMinQuery(key));
                    }
                    if (direction2 === 'down' || direction2 === true) {
                        query2 = and(query2, getMaxQuery(key));
                    }
                    return query2;
                }, ''),
            [JSON.stringify(breakpointMap)]
        );
        return useMediaQuery(query, window2);
    }
    return useBreakpoint2;
}
var useBreakpoint = createBreakpointHook({
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
});
var useBreakpoint_default = useBreakpoint;

// node_modules/react-bootstrap/esm/Offcanvas.js
var React111 = __toESM(require_react());
var import_react71 = __toESM(require_react());

// node_modules/react-bootstrap/esm/OffcanvasBody.js
var React107 = __toESM(require_react());
var import_classnames74 = __toESM(require_classnames());
var import_jsx_runtime103 = __toESM(require_jsx_runtime());
var OffcanvasBody = React107.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-body');
    return (0, import_jsx_runtime103.jsx)(Component2, {
        ref,
        className: (0, import_classnames74.default)(className, bsPrefix),
        ...props,
    });
});
OffcanvasBody.displayName = 'OffcanvasBody';
var OffcanvasBody_default = OffcanvasBody;

// node_modules/react-bootstrap/esm/OffcanvasToggling.js
var import_classnames75 = __toESM(require_classnames());
var React108 = __toESM(require_react());
var import_jsx_runtime104 = __toESM(require_jsx_runtime());
var transitionStyles = {
    [ENTERING]: 'show',
    [ENTERED]: 'show',
};
var OffcanvasToggling = React108.forwardRef(
    (
        {
            bsPrefix,
            className,
            children,
            in: inProp = false,
            mountOnEnter = false,
            unmountOnExit = false,
            appear = false,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
        return (0, import_jsx_runtime104.jsx)(TransitionWrapper_default, {
            ref,
            addEndListener: transitionEndListener,
            in: inProp,
            mountOnEnter,
            unmountOnExit,
            appear,
            ...props,
            childRef: children.ref,
            children: (status, innerProps) =>
                React108.cloneElement(children, {
                    ...innerProps,
                    className: (0, import_classnames75.default)(
                        className,
                        children.props.className,
                        (status === ENTERING || status === EXITING) && `${bsPrefix}-toggling`,
                        transitionStyles[status]
                    ),
                }),
        });
    }
);
OffcanvasToggling.displayName = 'OffcanvasToggling';
var OffcanvasToggling_default = OffcanvasToggling;

// node_modules/react-bootstrap/esm/OffcanvasHeader.js
var import_classnames76 = __toESM(require_classnames());
var React109 = __toESM(require_react());
var import_jsx_runtime105 = __toESM(require_jsx_runtime());
var OffcanvasHeader = React109.forwardRef(
    ({ bsPrefix, className, closeLabel = 'Close', closeButton = false, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-header');
        return (0, import_jsx_runtime105.jsx)(AbstractModalHeader_default, {
            ref,
            ...props,
            className: (0, import_classnames76.default)(className, bsPrefix),
            closeLabel,
            closeButton,
        });
    }
);
OffcanvasHeader.displayName = 'OffcanvasHeader';
var OffcanvasHeader_default = OffcanvasHeader;

// node_modules/react-bootstrap/esm/OffcanvasTitle.js
var React110 = __toESM(require_react());
var import_classnames77 = __toESM(require_classnames());
var import_jsx_runtime106 = __toESM(require_jsx_runtime());
var DivStyledAsH52 = divWithClassName_default('h5');
var OffcanvasTitle = React110.forwardRef(({ className, bsPrefix, as: Component2 = DivStyledAsH52, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-title');
    return (0, import_jsx_runtime106.jsx)(Component2, {
        ref,
        className: (0, import_classnames77.default)(className, bsPrefix),
        ...props,
    });
});
OffcanvasTitle.displayName = 'OffcanvasTitle';
var OffcanvasTitle_default = OffcanvasTitle;

// node_modules/react-bootstrap/esm/Offcanvas.js
var import_jsx_runtime107 = __toESM(require_jsx_runtime());
var import_jsx_runtime108 = __toESM(require_jsx_runtime());
var import_jsx_runtime109 = __toESM(require_jsx_runtime());
function DialogTransition2(props) {
    return (0, import_jsx_runtime107.jsx)(OffcanvasToggling_default, {
        ...props,
    });
}
function BackdropTransition2(props) {
    return (0, import_jsx_runtime107.jsx)(Fade_default, {
        ...props,
    });
}
var Offcanvas = React111.forwardRef(
    (
        {
            bsPrefix,
            className,
            children,
            'aria-labelledby': ariaLabelledby,
            placement = 'start',
            responsive,
            /* BaseModal props */
            show = false,
            backdrop = true,
            keyboard = true,
            scroll = false,
            onEscapeKeyDown,
            onShow,
            onHide,
            container,
            autoFocus = true,
            enforceFocus = true,
            restoreFocus = true,
            restoreFocusOptions,
            onEntered,
            onExit,
            onExiting,
            onEnter,
            onEntering,
            onExited,
            backdropClassName,
            manager: propsManager,
            renderStaticNode = false,
            ...props
        },
        ref
    ) => {
        const modalManager = (0, import_react71.useRef)();
        bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
        const { onToggle } = (0, import_react71.useContext)(NavbarContext_default) || {};
        const [showOffcanvas, setShowOffcanvas] = (0, import_react71.useState)(false);
        const hideResponsiveOffcanvas = useBreakpoint_default(responsive || 'xs', 'up');
        (0, import_react71.useEffect)(() => {
            setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
        }, [show, responsive, hideResponsiveOffcanvas]);
        const handleHide = useEventCallback(() => {
            onToggle == null ? void 0 : onToggle();
            onHide == null ? void 0 : onHide();
        });
        const modalContext = (0, import_react71.useMemo)(
            () => ({
                onHide: handleHide,
            }),
            [handleHide]
        );
        function getModalManager() {
            if (propsManager) return propsManager;
            if (scroll) {
                if (!modalManager.current)
                    modalManager.current = new BootstrapModalManager_default({
                        handleContainerOverflow: false,
                    });
                return modalManager.current;
            }
            return getSharedManager();
        }
        const handleEnter = (node, ...args) => {
            if (node) node.style.visibility = 'visible';
            onEnter == null ? void 0 : onEnter(node, ...args);
        };
        const handleExited = (node, ...args) => {
            if (node) node.style.visibility = '';
            onExited == null ? void 0 : onExited(...args);
        };
        const renderBackdrop = (0, import_react71.useCallback)(
            (backdropProps) =>
                (0, import_jsx_runtime107.jsx)('div', {
                    ...backdropProps,
                    className: (0, import_classnames78.default)(`${bsPrefix}-backdrop`, backdropClassName),
                }),
            [backdropClassName, bsPrefix]
        );
        const renderDialog = (dialogProps) =>
            (0, import_jsx_runtime107.jsx)('div', {
                ...dialogProps,
                ...props,
                className: (0, import_classnames78.default)(
                    className,
                    responsive ? `${bsPrefix}-${responsive}` : bsPrefix,
                    `${bsPrefix}-${placement}`
                ),
                'aria-labelledby': ariaLabelledby,
                children,
            });
        return (0, import_jsx_runtime109.jsxs)(import_jsx_runtime108.Fragment, {
            children: [
                !showOffcanvas && (responsive || renderStaticNode) && renderDialog({}),
                (0, import_jsx_runtime107.jsx)(ModalContext_default.Provider, {
                    value: modalContext,
                    children: (0, import_jsx_runtime107.jsx)(Modal_default, {
                        show: showOffcanvas,
                        ref,
                        backdrop,
                        container,
                        keyboard,
                        autoFocus,
                        enforceFocus: enforceFocus && !scroll,
                        restoreFocus,
                        restoreFocusOptions,
                        onEscapeKeyDown,
                        onShow,
                        onHide: handleHide,
                        onEnter: handleEnter,
                        onEntering,
                        onEntered,
                        onExit,
                        onExiting,
                        onExited: handleExited,
                        manager: getModalManager(),
                        transition: DialogTransition2,
                        backdropTransition: BackdropTransition2,
                        renderBackdrop,
                        renderDialog,
                    }),
                }),
            ],
        });
    }
);
Offcanvas.displayName = 'Offcanvas';
var Offcanvas_default = Object.assign(Offcanvas, {
    Body: OffcanvasBody_default,
    Header: OffcanvasHeader_default,
    Title: OffcanvasTitle_default,
});

// node_modules/react-bootstrap/esm/NavbarOffcanvas.js
var import_jsx_runtime110 = __toESM(require_jsx_runtime());
var NavbarOffcanvas = React112.forwardRef((props, ref) => {
    const context6 = (0, import_react72.useContext)(NavbarContext_default);
    return (0, import_jsx_runtime110.jsx)(Offcanvas_default, {
        ref,
        show: !!(context6 != null && context6.expanded),
        ...props,
        renderStaticNode: true,
    });
});
NavbarOffcanvas.displayName = 'NavbarOffcanvas';
var NavbarOffcanvas_default = NavbarOffcanvas;

// node_modules/react-bootstrap/esm/NavbarText.js
var React113 = __toESM(require_react());
var import_classnames79 = __toESM(require_classnames());
var import_jsx_runtime111 = __toESM(require_jsx_runtime());
var NavbarText = React113.forwardRef(({ className, bsPrefix, as: Component2 = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-text');
    return (0, import_jsx_runtime111.jsx)(Component2, {
        ref,
        className: (0, import_classnames79.default)(className, bsPrefix),
        ...props,
    });
});
NavbarText.displayName = 'NavbarText';
var NavbarText_default = NavbarText;

// node_modules/react-bootstrap/esm/Navbar.js
var import_jsx_runtime112 = __toESM(require_jsx_runtime());
var Navbar = React114.forwardRef((props, ref) => {
    const {
        bsPrefix: initialBsPrefix,
        expand = true,
        variant = 'light',
        bg,
        fixed,
        sticky,
        className,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component2 = 'nav',
        expanded,
        onToggle,
        onSelect,
        collapseOnSelect = false,
        ...controlledProps
    } = useUncontrolled(props, {
        expanded: 'onToggle',
    });
    const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'navbar');
    const handleCollapse = (0, import_react73.useCallback)(
        (...args) => {
            onSelect == null ? void 0 : onSelect(...args);
            if (collapseOnSelect && expanded) {
                onToggle == null ? void 0 : onToggle(false);
            }
        },
        [onSelect, collapseOnSelect, expanded, onToggle]
    );
    if (controlledProps.role === void 0 && Component2 !== 'nav') {
        controlledProps.role = 'navigation';
    }
    let expandClass = `${bsPrefix}-expand`;
    if (typeof expand === 'string') expandClass = `${expandClass}-${expand}`;
    const navbarContext = (0, import_react73.useMemo)(
        () => ({
            onToggle: () => (onToggle == null ? void 0 : onToggle(!expanded)),
            bsPrefix,
            expanded: !!expanded,
            expand,
        }),
        [bsPrefix, expanded, expand, onToggle]
    );
    return (0, import_jsx_runtime112.jsx)(NavbarContext_default.Provider, {
        value: navbarContext,
        children: (0, import_jsx_runtime112.jsx)(SelectableContext_default.Provider, {
            value: handleCollapse,
            children: (0, import_jsx_runtime112.jsx)(Component2, {
                ref,
                ...controlledProps,
                className: (0, import_classnames80.default)(
                    className,
                    bsPrefix,
                    expand && expandClass,
                    variant && `${bsPrefix}-${variant}`,
                    bg && `bg-${bg}`,
                    sticky && `sticky-${sticky}`,
                    fixed && `fixed-${fixed}`
                ),
            }),
        }),
    });
});
Navbar.displayName = 'Navbar';
var Navbar_default = Object.assign(Navbar, {
    Brand: NavbarBrand_default,
    Collapse: NavbarCollapse_default,
    Offcanvas: NavbarOffcanvas_default,
    Text: NavbarText_default,
    Toggle: NavbarToggle_default,
});

// node_modules/react-bootstrap/esm/NavDropdown.js
var import_classnames81 = __toESM(require_classnames());
var React115 = __toESM(require_react());
var import_jsx_runtime113 = __toESM(require_jsx_runtime());
var import_jsx_runtime114 = __toESM(require_jsx_runtime());
var NavDropdown = React115.forwardRef(
    (
        {
            id,
            title,
            children,
            bsPrefix,
            className,
            rootCloseEvent,
            menuRole,
            disabled,
            active,
            renderMenuOnMount,
            menuVariant,
            ...props
        },
        ref
    ) => {
        const navItemPrefix = useBootstrapPrefix(void 0, 'nav-item');
        return (0, import_jsx_runtime114.jsxs)(Dropdown_default2, {
            ref,
            ...props,
            className: (0, import_classnames81.default)(className, navItemPrefix),
            children: [
                (0, import_jsx_runtime113.jsx)(Dropdown_default2.Toggle, {
                    id,
                    eventKey: null,
                    active,
                    disabled,
                    childBsPrefix: bsPrefix,
                    as: NavLink_default,
                    children: title,
                }),
                (0, import_jsx_runtime113.jsx)(Dropdown_default2.Menu, {
                    role: menuRole,
                    renderOnMount: renderMenuOnMount,
                    rootCloseEvent,
                    variant: menuVariant,
                    children,
                }),
            ],
        });
    }
);
NavDropdown.displayName = 'NavDropdown';
var NavDropdown_default = Object.assign(NavDropdown, {
    Item: Dropdown_default2.Item,
    ItemText: Dropdown_default2.ItemText,
    Divider: Dropdown_default2.Divider,
    Header: Dropdown_default2.Header,
});

// node_modules/react-bootstrap/esm/Overlay.js
var React122 = __toESM(require_react());
var import_react77 = __toESM(require_react());
var import_classnames86 = __toESM(require_classnames());

// node_modules/@restart/ui/esm/Overlay.js
var React116 = __toESM(require_react());
var import_react_dom4 = __toESM(require_react_dom());
var import_react75 = __toESM(require_react());

// node_modules/@restart/ui/esm/useRootClose.js
var import_react74 = __toESM(require_react());
var noop6 = () => {};
function useRootClose(ref, onRootClose, { disabled, clickTrigger } = {}) {
    const onClose = onRootClose || noop6;
    useClickOutside_default(ref, onClose, {
        disabled,
        clickTrigger,
    });
    const handleKeyUp = useEventCallback((e) => {
        if (isEscKey(e)) {
            onClose(e);
        }
    });
    (0, import_react74.useEffect)(() => {
        if (disabled || ref == null) return void 0;
        const doc = ownerDocument(getRefTarget(ref));
        let currentEvent = (doc.defaultView || window).event;
        const removeKeyupListener = listen_default(doc, 'keyup', (e) => {
            if (e === currentEvent) {
                currentEvent = void 0;
                return;
            }
            handleKeyUp(e);
        });
        return () => {
            removeKeyupListener();
        };
    }, [ref, disabled, handleKeyUp]);
}
var useRootClose_default = useRootClose;

// node_modules/@restart/ui/esm/Overlay.js
var Overlay = React116.forwardRef((props, outerRef) => {
    const {
        flip: flip2,
        offset: offset2,
        placement,
        containerPadding,
        popperConfig = {},
        transition: Transition2,
        runTransition,
    } = props;
    const [rootElement, attachRef] = useCallbackRef();
    const [arrowElement, attachArrowRef] = useCallbackRef();
    const mergedRef = useMergedRefs_default(attachRef, outerRef);
    const container = useWaitForDOMRef(props.container);
    const target = useWaitForDOMRef(props.target);
    const [exited, setExited] = (0, import_react75.useState)(!props.show);
    const popper2 = usePopper_default(
        target,
        rootElement,
        mergeOptionsWithPopperConfig({
            placement,
            enableEvents: !!props.show,
            containerPadding: containerPadding || 5,
            flip: flip2,
            offset: offset2,
            arrowElement,
            popperConfig,
        })
    );
    if (props.show && exited) {
        setExited(false);
    }
    const handleHidden = (...args) => {
        setExited(true);
        if (props.onExited) {
            props.onExited(...args);
        }
    };
    const mountOverlay = props.show || !exited;
    useRootClose_default(rootElement, props.onHide, {
        disabled: !props.rootClose || props.rootCloseDisabled,
        clickTrigger: props.rootCloseEvent,
    });
    if (!mountOverlay) {
        return null;
    }
    const { onExit, onExiting, onEnter, onEntering, onEntered } = props;
    let child = props.children(
        Object.assign({}, popper2.attributes.popper, {
            style: popper2.styles.popper,
            ref: mergedRef,
        }),
        {
            popper: popper2,
            placement,
            show: !!props.show,
            arrowProps: Object.assign({}, popper2.attributes.arrow, {
                style: popper2.styles.arrow,
                ref: attachArrowRef,
            }),
        }
    );
    child = renderTransition(Transition2, runTransition, {
        in: !!props.show,
        appear: true,
        mountOnEnter: true,
        unmountOnExit: true,
        children: child,
        onExit,
        onExiting,
        onExited: handleHidden,
        onEnter,
        onEntering,
        onEntered,
    });
    return container ? import_react_dom4.default.createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
var Overlay_default = Overlay;

// node_modules/react-bootstrap/esm/useOverlayOffset.js
var import_react76 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Popover.js
var import_classnames84 = __toESM(require_classnames());
var React120 = __toESM(require_react());

// node_modules/react-bootstrap/esm/PopoverHeader.js
var React117 = __toESM(require_react());
var import_classnames82 = __toESM(require_classnames());
var import_jsx_runtime115 = __toESM(require_jsx_runtime());
var PopoverHeader = React117.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
    return (0, import_jsx_runtime115.jsx)(Component2, {
        ref,
        className: (0, import_classnames82.default)(className, bsPrefix),
        ...props,
    });
});
PopoverHeader.displayName = 'PopoverHeader';
var PopoverHeader_default = PopoverHeader;

// node_modules/react-bootstrap/esm/PopoverBody.js
var React118 = __toESM(require_react());
var import_classnames83 = __toESM(require_classnames());
var import_jsx_runtime116 = __toESM(require_jsx_runtime());
var PopoverBody = React118.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');
    return (0, import_jsx_runtime116.jsx)(Component2, {
        ref,
        className: (0, import_classnames83.default)(className, bsPrefix),
        ...props,
    });
});
PopoverBody.displayName = 'PopoverBody';
var PopoverBody_default = PopoverBody;

// node_modules/react-bootstrap/esm/helpers.js
var React119 = __toESM(require_react());
function getOverlayDirection(placement, isRTL) {
    let bsDirection = placement;
    if (placement === 'left') {
        bsDirection = isRTL ? 'end' : 'start';
    } else if (placement === 'right') {
        bsDirection = isRTL ? 'start' : 'end';
    }
    return bsDirection;
}

// node_modules/react-bootstrap/esm/getInitialPopperStyles.js
function getInitialPopperStyles(position = 'absolute') {
    return {
        position,
        top: '0',
        left: '0',
        opacity: '0',
        pointerEvents: 'none',
    };
}

// node_modules/react-bootstrap/esm/Popover.js
var import_jsx_runtime117 = __toESM(require_jsx_runtime());
var import_jsx_runtime118 = __toESM(require_jsx_runtime());
var Popover = React120.forwardRef(
    (
        {
            bsPrefix,
            placement = 'right',
            className,
            style: style2,
            children,
            body,
            arrowProps,
            hasDoneInitialMeasure,
            popper: popper2,
            show,
            ...props
        },
        ref
    ) => {
        const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
        const isRTL = useIsRTL();
        const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
        const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
        let computedStyle = style2;
        if (show && !hasDoneInitialMeasure) {
            computedStyle = {
                ...style2,
                ...getInitialPopperStyles(popper2 == null ? void 0 : popper2.strategy),
            };
        }
        return (0, import_jsx_runtime118.jsxs)('div', {
            ref,
            role: 'tooltip',
            style: computedStyle,
            'x-placement': primaryPlacement,
            className: (0, import_classnames84.default)(
                className,
                decoratedBsPrefix,
                primaryPlacement && `bs-popover-${bsDirection}`
            ),
            ...props,
            children: [
                (0, import_jsx_runtime117.jsx)('div', {
                    className: 'popover-arrow',
                    ...arrowProps,
                }),
                body
                    ? (0, import_jsx_runtime117.jsx)(PopoverBody_default, {
                          children,
                      })
                    : children,
            ],
        });
    }
);
var Popover_default = Object.assign(Popover, {
    Header: PopoverHeader_default,
    Body: PopoverBody_default,
    // Default popover offset.
    // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
    POPPER_OFFSET: [0, 8],
});

// node_modules/react-bootstrap/esm/Tooltip.js
var import_classnames85 = __toESM(require_classnames());
var React121 = __toESM(require_react());
var import_jsx_runtime119 = __toESM(require_jsx_runtime());
var import_jsx_runtime120 = __toESM(require_jsx_runtime());
var Tooltip = React121.forwardRef(
    (
        {
            bsPrefix,
            placement = 'right',
            className,
            style: style2,
            children,
            arrowProps,
            hasDoneInitialMeasure,
            popper: popper2,
            show,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
        const isRTL = useIsRTL();
        const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
        const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
        let computedStyle = style2;
        if (show && !hasDoneInitialMeasure) {
            computedStyle = {
                ...style2,
                ...getInitialPopperStyles(popper2 == null ? void 0 : popper2.strategy),
            };
        }
        return (0, import_jsx_runtime120.jsxs)('div', {
            ref,
            style: computedStyle,
            role: 'tooltip',
            'x-placement': primaryPlacement,
            className: (0, import_classnames85.default)(className, bsPrefix, `bs-tooltip-${bsDirection}`),
            ...props,
            children: [
                (0, import_jsx_runtime119.jsx)('div', {
                    className: 'tooltip-arrow',
                    ...arrowProps,
                }),
                (0, import_jsx_runtime119.jsx)('div', {
                    className: `${bsPrefix}-inner`,
                    children,
                }),
            ],
        });
    }
);
Tooltip.displayName = 'Tooltip';
var Tooltip_default = Object.assign(Tooltip, {
    // Default tooltip offset.
    // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
    TOOLTIP_OFFSET: [0, 6],
});

// node_modules/react-bootstrap/esm/useOverlayOffset.js
function useOverlayOffset(customOffset) {
    const overlayRef = (0, import_react76.useRef)(null);
    const popoverClass = useBootstrapPrefix(void 0, 'popover');
    const tooltipClass = useBootstrapPrefix(void 0, 'tooltip');
    const offset2 = (0, import_react76.useMemo)(
        () => ({
            name: 'offset',
            options: {
                offset: () => {
                    if (customOffset) {
                        return customOffset;
                    }
                    if (overlayRef.current) {
                        if (hasClass(overlayRef.current, popoverClass)) {
                            return Popover_default.POPPER_OFFSET;
                        }
                        if (hasClass(overlayRef.current, tooltipClass)) {
                            return Tooltip_default.TOOLTIP_OFFSET;
                        }
                    }
                    return [0, 0];
                },
            },
        }),
        [customOffset, popoverClass, tooltipClass]
    );
    return [overlayRef, [offset2]];
}

// node_modules/react-bootstrap/esm/Overlay.js
var import_jsx_runtime121 = __toESM(require_jsx_runtime());
function wrapRefs(props, arrowProps) {
    const { ref } = props;
    const { ref: aRef } = arrowProps;
    props.ref = ref.__wrapped || (ref.__wrapped = (r) => ref(safeFindDOMNode(r)));
    arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = (r) => aRef(safeFindDOMNode(r)));
}
var Overlay2 = React122.forwardRef(
    (
        {
            children: overlay,
            transition = Fade_default,
            popperConfig = {},
            rootClose = false,
            placement = 'top',
            show: outerShow = false,
            ...outerProps
        },
        outerRef
    ) => {
        const popperRef = (0, import_react77.useRef)({});
        const [firstRenderedState, setFirstRenderedState] = (0, import_react77.useState)(null);
        const [ref, modifiers] = useOverlayOffset(outerProps.offset);
        const mergedRef = useMergedRefs_default(outerRef, ref);
        const actualTransition = transition === true ? Fade_default : transition || void 0;
        const handleFirstUpdate = useEventCallback((state) => {
            setFirstRenderedState(state);
            popperConfig == null
                ? void 0
                : popperConfig.onFirstUpdate == null
                  ? void 0
                  : popperConfig.onFirstUpdate(state);
        });
        useIsomorphicEffect_default(() => {
            if (firstRenderedState && outerProps.target) {
                popperRef.current.scheduleUpdate == null ? void 0 : popperRef.current.scheduleUpdate();
            }
        }, [firstRenderedState, outerProps.target]);
        (0, import_react77.useEffect)(() => {
            if (!outerShow) {
                setFirstRenderedState(null);
            }
        }, [outerShow]);
        return (0, import_jsx_runtime121.jsx)(Overlay_default, {
            ...outerProps,
            ref: mergedRef,
            popperConfig: {
                ...popperConfig,
                modifiers: modifiers.concat(popperConfig.modifiers || []),
                onFirstUpdate: handleFirstUpdate,
            },
            transition: actualTransition,
            rootClose,
            placement,
            show: outerShow,
            children: (overlayProps, { arrowProps, popper: popperObj, show }) => {
                var _popperObj$state, _popperObj$state$modi;
                wrapRefs(overlayProps, arrowProps);
                const updatedPlacement = popperObj == null ? void 0 : popperObj.placement;
                const popper2 = Object.assign(popperRef.current, {
                    state: popperObj == null ? void 0 : popperObj.state,
                    scheduleUpdate: popperObj == null ? void 0 : popperObj.update,
                    placement: updatedPlacement,
                    outOfBoundaries:
                        (popperObj == null
                            ? void 0
                            : (_popperObj$state = popperObj.state) == null
                              ? void 0
                              : (_popperObj$state$modi = _popperObj$state.modifiersData.hide) == null
                                ? void 0
                                : _popperObj$state$modi.isReferenceHidden) || false,
                    strategy: popperConfig.strategy,
                });
                const hasDoneInitialMeasure = !!firstRenderedState;
                if (typeof overlay === 'function')
                    return overlay({
                        ...overlayProps,
                        placement: updatedPlacement,
                        show,
                        ...(!transition &&
                            show && {
                                className: 'show',
                            }),
                        popper: popper2,
                        arrowProps,
                        hasDoneInitialMeasure,
                    });
                return React122.cloneElement(overlay, {
                    ...overlayProps,
                    placement: updatedPlacement,
                    arrowProps,
                    popper: popper2,
                    hasDoneInitialMeasure,
                    className: (0, import_classnames86.default)(overlay.props.className, !transition && show && 'show'),
                    style: {
                        ...overlay.props.style,
                        ...overlayProps.style,
                    },
                });
            },
        });
    }
);
Overlay2.displayName = 'Overlay';
var Overlay_default2 = Overlay2;

// node_modules/react-bootstrap/esm/OverlayTrigger.js
var import_prop_types9 = __toESM(require_prop_types());
var React123 = __toESM(require_react());
var import_react78 = __toESM(require_react());
var import_warning7 = __toESM(require_warning());
var import_jsx_runtime122 = __toESM(require_jsx_runtime());
var import_jsx_runtime123 = __toESM(require_jsx_runtime());
var import_jsx_runtime124 = __toESM(require_jsx_runtime());
function normalizeDelay(delay) {
    return delay && typeof delay === 'object'
        ? delay
        : {
              show: delay,
              hide: delay,
          };
}
function handleMouseOverOut(handler, args, relatedNative) {
    const [e] = args;
    const target = e.currentTarget;
    const related = e.relatedTarget || e.nativeEvent[relatedNative];
    if ((!related || related !== target) && !contains2(target, related)) {
        handler(...args);
    }
}
var triggerType = import_prop_types9.default.oneOf(['click', 'hover', 'focus']);
var OverlayTrigger = ({
    trigger = ['hover', 'focus'],
    overlay,
    children,
    popperConfig = {},
    show: propsShow,
    defaultShow = false,
    onToggle,
    delay: propsDelay,
    placement,
    flip: flip2 = placement && placement.indexOf('auto') !== -1,
    ...props
}) => {
    const triggerNodeRef = (0, import_react78.useRef)(null);
    const mergedRef = useMergedRefs_default(triggerNodeRef, children.ref);
    const timeout2 = useTimeout();
    const hoverStateRef = (0, import_react78.useRef)('');
    const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle);
    const delay = normalizeDelay(propsDelay);
    const { onFocus, onBlur, onClick } = typeof children !== 'function' ? React123.Children.only(children).props : {};
    const attachRef = (r) => {
        mergedRef(safeFindDOMNode(r));
    };
    const handleShow = (0, import_react78.useCallback)(() => {
        timeout2.clear();
        hoverStateRef.current = 'show';
        if (!delay.show) {
            setShow(true);
            return;
        }
        timeout2.set(() => {
            if (hoverStateRef.current === 'show') setShow(true);
        }, delay.show);
    }, [delay.show, setShow, timeout2]);
    const handleHide = (0, import_react78.useCallback)(() => {
        timeout2.clear();
        hoverStateRef.current = 'hide';
        if (!delay.hide) {
            setShow(false);
            return;
        }
        timeout2.set(() => {
            if (hoverStateRef.current === 'hide') setShow(false);
        }, delay.hide);
    }, [delay.hide, setShow, timeout2]);
    const handleFocus = (0, import_react78.useCallback)(
        (...args) => {
            handleShow();
            onFocus == null ? void 0 : onFocus(...args);
        },
        [handleShow, onFocus]
    );
    const handleBlur = (0, import_react78.useCallback)(
        (...args) => {
            handleHide();
            onBlur == null ? void 0 : onBlur(...args);
        },
        [handleHide, onBlur]
    );
    const handleClick = (0, import_react78.useCallback)(
        (...args) => {
            setShow(!show);
            onClick == null ? void 0 : onClick(...args);
        },
        [onClick, setShow, show]
    );
    const handleMouseOver = (0, import_react78.useCallback)(
        (...args) => {
            handleMouseOverOut(handleShow, args, 'fromElement');
        },
        [handleShow]
    );
    const handleMouseOut = (0, import_react78.useCallback)(
        (...args) => {
            handleMouseOverOut(handleHide, args, 'toElement');
        },
        [handleHide]
    );
    const triggers = trigger == null ? [] : [].concat(trigger);
    const triggerProps = {
        ref: attachRef,
    };
    if (triggers.indexOf('click') !== -1) {
        triggerProps.onClick = handleClick;
    }
    if (triggers.indexOf('focus') !== -1) {
        triggerProps.onFocus = handleFocus;
        triggerProps.onBlur = handleBlur;
    }
    if (triggers.indexOf('hover') !== -1) {
        true
            ? (0, import_warning7.default)(
                  triggers.length > 1,
                  '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.'
              )
            : void 0;
        triggerProps.onMouseOver = handleMouseOver;
        triggerProps.onMouseOut = handleMouseOut;
    }
    return (0, import_jsx_runtime124.jsxs)(import_jsx_runtime123.Fragment, {
        children: [
            typeof children === 'function'
                ? children(triggerProps)
                : (0, import_react78.cloneElement)(children, triggerProps),
            (0, import_jsx_runtime122.jsx)(Overlay_default2, {
                ...props,
                show,
                onHide: handleHide,
                flip: flip2,
                placement,
                popperConfig,
                target: triggerNodeRef.current,
                children: overlay,
            }),
        ],
    });
};
var OverlayTrigger_default = OverlayTrigger;

// node_modules/react-bootstrap/esm/PageItem.js
var import_classnames87 = __toESM(require_classnames());
var React124 = __toESM(require_react());
var import_jsx_runtime125 = __toESM(require_jsx_runtime());
var import_jsx_runtime126 = __toESM(require_jsx_runtime());
var PageItem = React124.forwardRef(
    (
        {
            active = false,
            disabled = false,
            className,
            style: style2,
            activeLabel = '(current)',
            children,
            linkStyle,
            linkClassName,
            as = Anchor_default,
            ...props
        },
        ref
    ) => {
        const Component2 = active || disabled ? 'span' : as;
        return (0, import_jsx_runtime125.jsx)('li', {
            ref,
            style: style2,
            className: (0, import_classnames87.default)(className, 'page-item', {
                active,
                disabled,
            }),
            children: (0, import_jsx_runtime126.jsxs)(Component2, {
                className: (0, import_classnames87.default)('page-link', linkClassName),
                style: linkStyle,
                ...props,
                children: [
                    children,
                    active &&
                        activeLabel &&
                        (0, import_jsx_runtime125.jsx)('span', {
                            className: 'visually-hidden',
                            children: activeLabel,
                        }),
                ],
            }),
        });
    }
);
PageItem.displayName = 'PageItem';
var PageItem_default = PageItem;
function createButton(name, defaultValue, label = name) {
    const Button3 = React124.forwardRef(({ children, ...props }, ref) =>
        (0, import_jsx_runtime126.jsxs)(PageItem, {
            ...props,
            ref,
            children: [
                (0, import_jsx_runtime125.jsx)('span', {
                    'aria-hidden': 'true',
                    children: children || defaultValue,
                }),
                (0, import_jsx_runtime125.jsx)('span', {
                    className: 'visually-hidden',
                    children: label,
                }),
            ],
        })
    );
    Button3.displayName = name;
    return Button3;
}
var First = createButton('First', '«');
var Prev = createButton('Prev', '‹', 'Previous');
var Ellipsis = createButton('Ellipsis', '…', 'More');
var Next = createButton('Next', '›');
var Last = createButton('Last', '»');

// node_modules/react-bootstrap/esm/Pagination.js
var import_classnames88 = __toESM(require_classnames());
var React125 = __toESM(require_react());
var import_jsx_runtime127 = __toESM(require_jsx_runtime());
var Pagination = React125.forwardRef(({ bsPrefix, className, size: size2, ...props }, ref) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
    return (0, import_jsx_runtime127.jsx)('ul', {
        ref,
        ...props,
        className: (0, import_classnames88.default)(
            className,
            decoratedBsPrefix,
            size2 && `${decoratedBsPrefix}-${size2}`
        ),
    });
});
Pagination.displayName = 'Pagination';
var Pagination_default = Object.assign(Pagination, {
    First,
    Prev,
    Ellipsis,
    Item: PageItem_default,
    Next,
    Last,
});

// node_modules/react-bootstrap/esm/Placeholder.js
var React127 = __toESM(require_react());

// node_modules/react-bootstrap/esm/usePlaceholder.js
var import_classnames89 = __toESM(require_classnames());
function usePlaceholder({ animation, bg, bsPrefix, size: size2, ...props }) {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'placeholder');
    const [{ className, ...colProps }] = useCol(props);
    return {
        ...colProps,
        className: (0, import_classnames89.default)(
            className,
            animation ? `${bsPrefix}-${animation}` : bsPrefix,
            size2 && `${bsPrefix}-${size2}`,
            bg && `bg-${bg}`
        ),
    };
}

// node_modules/react-bootstrap/esm/PlaceholderButton.js
var React126 = __toESM(require_react());
var import_jsx_runtime128 = __toESM(require_jsx_runtime());
var PlaceholderButton = React126.forwardRef((props, ref) => {
    const placeholderProps = usePlaceholder(props);
    return (0, import_jsx_runtime128.jsx)(Button_default2, {
        ...placeholderProps,
        ref,
        disabled: true,
        tabIndex: -1,
    });
});
PlaceholderButton.displayName = 'PlaceholderButton';
var PlaceholderButton_default = PlaceholderButton;

// node_modules/react-bootstrap/esm/Placeholder.js
var import_jsx_runtime129 = __toESM(require_jsx_runtime());
var Placeholder = React127.forwardRef(({ as: Component2 = 'span', ...props }, ref) => {
    const placeholderProps = usePlaceholder(props);
    return (0, import_jsx_runtime129.jsx)(Component2, {
        ...placeholderProps,
        ref,
    });
});
Placeholder.displayName = 'Placeholder';
var Placeholder_default = Object.assign(Placeholder, {
    Button: PlaceholderButton_default,
});

// node_modules/react-bootstrap/esm/ProgressBar.js
var import_classnames90 = __toESM(require_classnames());
var React128 = __toESM(require_react());
var import_react79 = __toESM(require_react());
var import_jsx_runtime130 = __toESM(require_jsx_runtime());
var ROUND_PRECISION = 1e3;
function getPercentage(now, min2, max2) {
    const percentage = ((now - min2) / (max2 - min2)) * 100;
    return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar(
    {
        min: min2,
        now,
        max: max2,
        label,
        visuallyHidden,
        striped,
        animated,
        className,
        style: style2,
        variant,
        bsPrefix,
        ...props
    },
    ref
) {
    return (0, import_jsx_runtime130.jsx)('div', {
        ref,
        ...props,
        role: 'progressbar',
        className: (0, import_classnames90.default)(className, `${bsPrefix}-bar`, {
            [`bg-${variant}`]: variant,
            [`${bsPrefix}-bar-animated`]: animated,
            [`${bsPrefix}-bar-striped`]: animated || striped,
        }),
        style: {
            width: `${getPercentage(now, min2, max2)}%`,
            ...style2,
        },
        'aria-valuenow': now,
        'aria-valuemin': min2,
        'aria-valuemax': max2,
        children: visuallyHidden
            ? (0, import_jsx_runtime130.jsx)('span', {
                  className: 'visually-hidden',
                  children: label,
              })
            : label,
    });
}
var ProgressBar = React128.forwardRef(({ isChild = false, ...rest }, ref) => {
    const props = {
        min: 0,
        max: 100,
        animated: false,
        visuallyHidden: false,
        striped: false,
        ...rest,
    };
    props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress');
    if (isChild) {
        return renderProgressBar(props, ref);
    }
    const {
        min: min2,
        now,
        max: max2,
        label,
        visuallyHidden,
        striped,
        animated,
        bsPrefix,
        variant,
        className,
        children,
        ...wrapperProps
    } = props;
    return (0, import_jsx_runtime130.jsx)('div', {
        ref,
        ...wrapperProps,
        className: (0, import_classnames90.default)(className, bsPrefix),
        children: children
            ? map(children, (child) =>
                  (0, import_react79.cloneElement)(child, {
                      isChild: true,
                  })
              )
            : renderProgressBar(
                  {
                      min: min2,
                      now,
                      max: max2,
                      label,
                      visuallyHidden,
                      striped,
                      animated,
                      bsPrefix,
                      variant,
                  },
                  ref
              ),
    });
});
ProgressBar.displayName = 'ProgressBar';
var ProgressBar_default = ProgressBar;

// node_modules/react-bootstrap/esm/Ratio.js
var import_classnames91 = __toESM(require_classnames());
var React129 = __toESM(require_react());
var import_jsx_runtime131 = __toESM(require_jsx_runtime());
function toPercent(num) {
    if (num <= 0) return '100%';
    if (num < 1) return `${num * 100}%`;
    return `${num}%`;
}
var Ratio = React129.forwardRef(
    ({ bsPrefix, className, children, aspectRatio = '1x1', style: style2, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'ratio');
        const isCustomRatio = typeof aspectRatio === 'number';
        return (0, import_jsx_runtime131.jsx)('div', {
            ref,
            ...props,
            style: {
                ...style2,
                ...(isCustomRatio && {
                    '--bs-aspect-ratio': toPercent(aspectRatio),
                }),
            },
            className: (0, import_classnames91.default)(
                bsPrefix,
                className,
                !isCustomRatio && `${bsPrefix}-${aspectRatio}`
            ),
            children: React129.Children.only(children),
        });
    }
);
var Ratio_default = Ratio;

// node_modules/react-bootstrap/esm/Row.js
var import_classnames92 = __toESM(require_classnames());
var React130 = __toESM(require_react());
var import_jsx_runtime132 = __toESM(require_jsx_runtime());
var Row = React130.forwardRef(
    (
        {
            bsPrefix,
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
        const breakpoints = useBootstrapBreakpoints();
        const minBreakpoint = useBootstrapMinBreakpoint();
        const sizePrefix = `${decoratedBsPrefix}-cols`;
        const classes = [];
        breakpoints.forEach((brkPoint) => {
            const propValue = props[brkPoint];
            delete props[brkPoint];
            let cols;
            if (propValue != null && typeof propValue === 'object') {
                ({ cols } = propValue);
            } else {
                cols = propValue;
            }
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
            if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
        });
        return (0, import_jsx_runtime132.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames92.default)(className, decoratedBsPrefix, ...classes),
        });
    }
);
Row.displayName = 'Row';
var Row_default = Row;

// node_modules/react-bootstrap/esm/Spinner.js
var import_classnames93 = __toESM(require_classnames());
var React131 = __toESM(require_react());
var import_jsx_runtime133 = __toESM(require_jsx_runtime());
var Spinner = React131.forwardRef(
    (
        {
            bsPrefix,
            variant,
            animation = 'border',
            size: size2,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            className,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
        const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
        return (0, import_jsx_runtime133.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames93.default)(
                className,
                bsSpinnerPrefix,
                size2 && `${bsSpinnerPrefix}-${size2}`,
                variant && `text-${variant}`
            ),
        });
    }
);
Spinner.displayName = 'Spinner';
var Spinner_default = Spinner;

// node_modules/react-bootstrap/esm/SplitButton.js
var React132 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());
var import_jsx_runtime134 = __toESM(require_jsx_runtime());
var import_jsx_runtime135 = __toESM(require_jsx_runtime());
var propTypes6 = {
    /**
     * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
     * @type {string}
     * @required
     */
    id: import_prop_types10.default.string,
    /**
     * Accessible label for the toggle; the value of `title` if not specified.
     */
    toggleLabel: import_prop_types10.default.string,
    /** An `href` passed to the non-toggle Button */
    href: import_prop_types10.default.string,
    /** An anchor `target` passed to the non-toggle Button */
    target: import_prop_types10.default.string,
    /** An `onClick` handler passed to the non-toggle Button */
    onClick: import_prop_types10.default.func,
    /** The content of the non-toggle Button.  */
    title: import_prop_types10.default.node.isRequired,
    /** A `type` passed to the non-toggle Button */
    type: import_prop_types10.default.string,
    /** Disables both Buttons  */
    disabled: import_prop_types10.default.bool,
    /**
     * Aligns the dropdown menu.
     *
     * _see [DropdownMenu](#dropdown-menu-props) for more details_
     *
     * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
     */
    align: alignPropType,
    /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
    menuRole: import_prop_types10.default.string,
    /** Whether to render the dropdown menu in the DOM before the first time it is shown */
    renderMenuOnMount: import_prop_types10.default.bool,
    /**
     *  Which event when fired outside the component will cause it to be closed.
     *
     * _see [DropdownMenu](#dropdown-menu-props) for more details_
     */
    rootCloseEvent: import_prop_types10.default.string,
    /**
     * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
     * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
     *
     */
    flip: import_prop_types10.default.bool,
    /** @ignore */
    bsPrefix: import_prop_types10.default.string,
    /** @ignore */
    variant: import_prop_types10.default.string,
    /** @ignore */
    size: import_prop_types10.default.string,
};
var SplitButton = React132.forwardRef(
    (
        {
            id,
            bsPrefix,
            size: size2,
            variant,
            title,
            type = 'button',
            toggleLabel = 'Toggle dropdown',
            children,
            onClick,
            href,
            target,
            menuRole,
            renderMenuOnMount,
            rootCloseEvent,
            flip: flip2,
            ...props
        },
        ref
    ) =>
        (0, import_jsx_runtime135.jsxs)(Dropdown_default2, {
            ref,
            ...props,
            as: ButtonGroup_default,
            children: [
                (0, import_jsx_runtime134.jsx)(Button_default2, {
                    size: size2,
                    variant,
                    disabled: props.disabled,
                    bsPrefix,
                    href,
                    target,
                    onClick,
                    type,
                    children: title,
                }),
                (0, import_jsx_runtime134.jsx)(Dropdown_default2.Toggle, {
                    split: true,
                    id,
                    size: size2,
                    variant,
                    disabled: props.disabled,
                    childBsPrefix: bsPrefix,
                    children: (0, import_jsx_runtime134.jsx)('span', {
                        className: 'visually-hidden',
                        children: toggleLabel,
                    }),
                }),
                (0, import_jsx_runtime134.jsx)(Dropdown_default2.Menu, {
                    role: menuRole,
                    renderOnMount: renderMenuOnMount,
                    rootCloseEvent,
                    flip: flip2,
                    children,
                }),
            ],
        })
);
SplitButton.propTypes = propTypes6;
SplitButton.displayName = 'SplitButton';
var SplitButton_default = SplitButton;

// node_modules/react-bootstrap/esm/SSRProvider.js
var SSRProvider_default = $b5e257d569688ac6$export$9f8ac96af4b1b2ae;

// node_modules/react-bootstrap/esm/Stack.js
var import_classnames94 = __toESM(require_classnames());
var React133 = __toESM(require_react());

// node_modules/react-bootstrap/esm/createUtilityClasses.js
var import_prop_types11 = __toESM(require_prop_types());
function createUtilityClassName(
    utilityValues,
    breakpoints = DEFAULT_BREAKPOINTS,
    minBreakpoint = DEFAULT_MIN_BREAKPOINT
) {
    const classes = [];
    Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
        if (utilValue != null) {
            if (typeof utilValue === 'object') {
                breakpoints.forEach((brkPoint) => {
                    const bpValue = utilValue[brkPoint];
                    if (bpValue != null) {
                        const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
                        classes.push(`${utilName}${infix}-${bpValue}`);
                    }
                });
            } else {
                classes.push(`${utilName}-${utilValue}`);
            }
        }
    });
    return classes;
}

// node_modules/react-bootstrap/esm/Stack.js
var import_jsx_runtime136 = __toESM(require_jsx_runtime());
var Stack = React133.forwardRef(({ as: Component2 = 'div', bsPrefix, className, direction, gap, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, direction === 'horizontal' ? 'hstack' : 'vstack');
    const breakpoints = useBootstrapBreakpoints();
    const minBreakpoint = useBootstrapMinBreakpoint();
    return (0, import_jsx_runtime136.jsx)(Component2, {
        ...props,
        ref,
        className: (0, import_classnames94.default)(
            className,
            bsPrefix,
            ...createUtilityClassName(
                {
                    gap,
                },
                breakpoints,
                minBreakpoint
            )
        ),
    });
});
Stack.displayName = 'Stack';
var Stack_default = Stack;

// node_modules/react-bootstrap/esm/Tab.js
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/react-bootstrap/esm/TabContainer.js
var React136 = __toESM(require_react());

// node_modules/@restart/ui/esm/Tabs.js
var React135 = __toESM(require_react());
var import_react81 = __toESM(require_react());

// node_modules/@restart/ui/esm/TabPanel.js
var React134 = __toESM(require_react());
var import_react80 = __toESM(require_react());
var import_jsx_runtime137 = __toESM(require_jsx_runtime());
var _excluded9 = [
    'active',
    'eventKey',
    'mountOnEnter',
    'transition',
    'unmountOnExit',
    'role',
    'onEnter',
    'onEntering',
    'onEntered',
    'onExit',
    'onExiting',
    'onExited',
];
var _excluded22 = ['activeKey', 'getControlledId', 'getControllerId'];
var _excluded32 = ['as'];
function _objectWithoutPropertiesLoose10(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function useTabPanel(_ref) {
    let {
            active,
            eventKey,
            mountOnEnter,
            transition,
            unmountOnExit,
            role = 'tabpanel',
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
        } = _ref,
        props = _objectWithoutPropertiesLoose10(_ref, _excluded9);
    const context6 = (0, import_react80.useContext)(TabContext_default);
    if (!context6)
        return [
            Object.assign({}, props, {
                role,
            }),
            {
                eventKey,
                isActive: active,
                mountOnEnter,
                transition,
                unmountOnExit,
                onEnter,
                onEntering,
                onEntered,
                onExit,
                onExiting,
                onExited,
            },
        ];
    const { activeKey, getControlledId, getControllerId } = context6,
        rest = _objectWithoutPropertiesLoose10(context6, _excluded22);
    const key = makeEventKey(eventKey);
    return [
        Object.assign({}, props, {
            role,
            id: getControlledId(eventKey),
            'aria-labelledby': getControllerId(eventKey),
        }),
        {
            eventKey,
            isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
            transition: transition || rest.transition,
            mountOnEnter: mountOnEnter != null ? mountOnEnter : rest.mountOnEnter,
            unmountOnExit: unmountOnExit != null ? unmountOnExit : rest.unmountOnExit,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
        },
    ];
}
var TabPanel = React134.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    (_ref2, ref) => {
        let { as: Component2 = 'div' } = _ref2,
            props = _objectWithoutPropertiesLoose10(_ref2, _excluded32);
        const [
            tabPanelProps,
            {
                isActive,
                onEnter,
                onEntering,
                onEntered,
                onExit,
                onExiting,
                onExited,
                mountOnEnter,
                unmountOnExit,
                transition: Transition2 = NoopTransition_default,
            },
        ] = useTabPanel(props);
        return (0, import_jsx_runtime137.jsx)(TabContext_default.Provider, {
            value: null,
            children: (0, import_jsx_runtime137.jsx)(SelectableContext_default.Provider, {
                value: null,
                children: (0, import_jsx_runtime137.jsx)(Transition2, {
                    in: isActive,
                    onEnter,
                    onEntering,
                    onEntered,
                    onExit,
                    onExiting,
                    onExited,
                    mountOnEnter,
                    unmountOnExit,
                    children: (0, import_jsx_runtime137.jsx)(
                        Component2,
                        Object.assign({}, tabPanelProps, {
                            ref,
                            hidden: !isActive,
                            'aria-hidden': !isActive,
                        })
                    ),
                }),
            }),
        });
    }
);
TabPanel.displayName = 'TabPanel';
var TabPanel_default = TabPanel;

// node_modules/@restart/ui/esm/Tabs.js
var import_jsx_runtime138 = __toESM(require_jsx_runtime());
var Tabs = (props) => {
    const {
        id: userId,
        generateChildId: generateCustomChildId,
        onSelect: propsOnSelect,
        activeKey: propsActiveKey,
        defaultActiveKey,
        transition,
        mountOnEnter,
        unmountOnExit,
        children,
    } = props;
    const [activeKey, onSelect] = useUncontrolledProp2(propsActiveKey, defaultActiveKey, propsOnSelect);
    const id = $b5e257d569688ac6$export$619500959fc48b26(userId);
    const generateChildId = (0, import_react81.useMemo)(
        () => generateCustomChildId || ((key, type) => (id ? `${id}-${type}-${key}` : null)),
        [id, generateCustomChildId]
    );
    const tabContext = (0, import_react81.useMemo)(
        () => ({
            onSelect,
            activeKey,
            transition,
            mountOnEnter: mountOnEnter || false,
            unmountOnExit: unmountOnExit || false,
            getControlledId: (key) => generateChildId(key, 'tabpane'),
            getControllerId: (key) => generateChildId(key, 'tab'),
        }),
        [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]
    );
    return (0, import_jsx_runtime138.jsx)(TabContext_default.Provider, {
        value: tabContext,
        children: (0, import_jsx_runtime138.jsx)(SelectableContext_default.Provider, {
            value: onSelect || null,
            children,
        }),
    });
};
Tabs.Panel = TabPanel_default;
var Tabs_default = Tabs;

// node_modules/react-bootstrap/esm/getTabTransitionComponent.js
function getTabTransitionComponent(transition) {
    if (typeof transition === 'boolean') {
        return transition ? Fade_default : NoopTransition_default;
    }
    return transition;
}

// node_modules/react-bootstrap/esm/TabContainer.js
var import_jsx_runtime139 = __toESM(require_jsx_runtime());
var TabContainer = ({ transition, ...props }) =>
    (0, import_jsx_runtime139.jsx)(Tabs_default, {
        ...props,
        transition: getTabTransitionComponent(transition),
    });
TabContainer.displayName = 'TabContainer';
var TabContainer_default = TabContainer;

// node_modules/react-bootstrap/esm/TabContent.js
var React137 = __toESM(require_react());
var import_classnames95 = __toESM(require_classnames());
var import_jsx_runtime140 = __toESM(require_jsx_runtime());
var TabContent = React137.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
    return (0, import_jsx_runtime140.jsx)(Component2, {
        ref,
        className: (0, import_classnames95.default)(className, bsPrefix),
        ...props,
    });
});
TabContent.displayName = 'TabContent';
var TabContent_default = TabContent;

// node_modules/react-bootstrap/esm/TabPane.js
var import_classnames96 = __toESM(require_classnames());
var React138 = __toESM(require_react());
var import_jsx_runtime141 = __toESM(require_jsx_runtime());
var TabPane = React138.forwardRef(({ bsPrefix, transition, ...props }, ref) => {
    const [
        {
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...rest
        },
        {
            isActive,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            mountOnEnter,
            unmountOnExit,
            transition: Transition2 = Fade_default,
        },
    ] = useTabPanel({
        ...props,
        transition: getTabTransitionComponent(transition),
    });
    const prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');
    return (0, import_jsx_runtime141.jsx)(TabContext_default.Provider, {
        value: null,
        children: (0, import_jsx_runtime141.jsx)(SelectableContext_default.Provider, {
            value: null,
            children: (0, import_jsx_runtime141.jsx)(Transition2, {
                in: isActive,
                onEnter,
                onEntering,
                onEntered,
                onExit,
                onExiting,
                onExited,
                mountOnEnter,
                unmountOnExit,
                children: (0, import_jsx_runtime141.jsx)(Component2, {
                    ...rest,
                    ref,
                    className: (0, import_classnames96.default)(className, prefix, isActive && 'active'),
                }),
            }),
        }),
    });
});
TabPane.displayName = 'TabPane';
var TabPane_default = TabPane;

// node_modules/react-bootstrap/esm/Tab.js
var propTypes7 = {
    eventKey: import_prop_types12.default.oneOfType([
        import_prop_types12.default.string,
        import_prop_types12.default.number,
    ]),
    /**
     * Content for the tab title.
     */
    title: import_prop_types12.default.node.isRequired,
    /**
     * The disabled state of the tab.
     */
    disabled: import_prop_types12.default.bool,
    /**
     * Class to pass to the underlying nav link.
     */
    tabClassName: import_prop_types12.default.string,
    /**
     * Object containing attributes to pass to underlying nav link.
     */
    tabAttrs: import_prop_types12.default.object,
};
var Tab = () => {
    throw new Error(
        "ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly"
    );
};
Tab.propTypes = propTypes7;
var Tab_default = Object.assign(Tab, {
    Container: TabContainer_default,
    Content: TabContent_default,
    Pane: TabPane_default,
});

// node_modules/react-bootstrap/esm/Table.js
var import_classnames97 = __toESM(require_classnames());
var React139 = __toESM(require_react());
var import_jsx_runtime142 = __toESM(require_jsx_runtime());
var Table = React139.forwardRef(
    (
        { bsPrefix, className, striped, bordered, borderless, hover, size: size2, variant, responsive, ...props },
        ref
    ) => {
        const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'table');
        const classes = (0, import_classnames97.default)(
            className,
            decoratedBsPrefix,
            variant && `${decoratedBsPrefix}-${variant}`,
            size2 && `${decoratedBsPrefix}-${size2}`,
            striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`,
            bordered && `${decoratedBsPrefix}-bordered`,
            borderless && `${decoratedBsPrefix}-borderless`,
            hover && `${decoratedBsPrefix}-hover`
        );
        const table = (0, import_jsx_runtime142.jsx)('table', {
            ...props,
            className: classes,
            ref,
        });
        if (responsive) {
            let responsiveClass = `${decoratedBsPrefix}-responsive`;
            if (typeof responsive === 'string') {
                responsiveClass = `${responsiveClass}-${responsive}`;
            }
            return (0, import_jsx_runtime142.jsx)('div', {
                className: responsiveClass,
                children: table,
            });
        }
        return table;
    }
);
var Table_default = Table;

// node_modules/react-bootstrap/esm/Tabs.js
var React140 = __toESM(require_react());
var import_jsx_runtime143 = __toESM(require_jsx_runtime());
var import_jsx_runtime144 = __toESM(require_jsx_runtime());
function getDefaultActiveKey(children) {
    let defaultActiveKey;
    forEach(children, (child) => {
        if (defaultActiveKey == null) {
            defaultActiveKey = child.props.eventKey;
        }
    });
    return defaultActiveKey;
}
function renderTab(child) {
    const { title, eventKey, disabled, tabClassName, tabAttrs, id } = child.props;
    if (title == null) {
        return null;
    }
    return (0, import_jsx_runtime143.jsx)(NavItem_default2, {
        as: 'li',
        role: 'presentation',
        children: (0, import_jsx_runtime143.jsx)(NavLink_default, {
            as: 'button',
            type: 'button',
            eventKey,
            disabled,
            id,
            className: tabClassName,
            ...tabAttrs,
            children: title,
        }),
    });
}
var Tabs2 = (props) => {
    const {
        id,
        onSelect,
        transition,
        mountOnEnter = false,
        unmountOnExit = false,
        variant = 'tabs',
        children,
        activeKey = getDefaultActiveKey(children),
        ...controlledProps
    } = useUncontrolled(props, {
        activeKey: 'onSelect',
    });
    return (0, import_jsx_runtime144.jsxs)(Tabs_default, {
        id,
        activeKey,
        onSelect,
        transition: getTabTransitionComponent(transition),
        mountOnEnter,
        unmountOnExit,
        children: [
            (0, import_jsx_runtime143.jsx)(Nav_default2, {
                ...controlledProps,
                role: 'tablist',
                as: 'ul',
                variant,
                children: map(children, renderTab),
            }),
            (0, import_jsx_runtime143.jsx)(TabContent_default, {
                children: map(children, (child) => {
                    const childProps = {
                        ...child.props,
                    };
                    delete childProps.title;
                    delete childProps.disabled;
                    delete childProps.tabClassName;
                    delete childProps.tabAttrs;
                    return (0, import_jsx_runtime143.jsx)(TabPane_default, {
                        ...childProps,
                    });
                }),
            }),
        ],
    });
};
Tabs2.displayName = 'Tabs';
var Tabs_default2 = Tabs2;

// node_modules/react-bootstrap/esm/Toast.js
var React145 = __toESM(require_react());
var import_react83 = __toESM(require_react());
var import_classnames100 = __toESM(require_classnames());

// node_modules/react-bootstrap/esm/ToastFade.js
var React141 = __toESM(require_react());
var import_jsx_runtime145 = __toESM(require_jsx_runtime());
var fadeStyles2 = {
    [ENTERING]: 'showing',
    [EXITING]: 'showing show',
};
var ToastFade = React141.forwardRef((props, ref) =>
    (0, import_jsx_runtime145.jsx)(Fade_default, {
        ...props,
        ref,
        transitionClasses: fadeStyles2,
    })
);
ToastFade.displayName = 'ToastFade';
var ToastFade_default = ToastFade;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_classnames98 = __toESM(require_classnames());
var React143 = __toESM(require_react());
var import_react82 = __toESM(require_react());

// node_modules/react-bootstrap/esm/ToastContext.js
var React142 = __toESM(require_react());
var ToastContext = React142.createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose() {},
});
var ToastContext_default = ToastContext;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_jsx_runtime146 = __toESM(require_jsx_runtime());
var import_jsx_runtime147 = __toESM(require_jsx_runtime());
var ToastHeader = React143.forwardRef(
    ({ bsPrefix, closeLabel = 'Close', closeVariant, closeButton = true, className, children, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');
        const context6 = (0, import_react82.useContext)(ToastContext_default);
        const handleClick = useEventCallback((e) => {
            context6 == null ? void 0 : context6.onClose == null ? void 0 : context6.onClose(e);
        });
        return (0, import_jsx_runtime147.jsxs)('div', {
            ref,
            ...props,
            className: (0, import_classnames98.default)(bsPrefix, className),
            children: [
                children,
                closeButton &&
                    (0, import_jsx_runtime146.jsx)(CloseButton_default, {
                        'aria-label': closeLabel,
                        variant: closeVariant,
                        onClick: handleClick,
                        'data-dismiss': 'toast',
                    }),
            ],
        });
    }
);
ToastHeader.displayName = 'ToastHeader';
var ToastHeader_default = ToastHeader;

// node_modules/react-bootstrap/esm/ToastBody.js
var React144 = __toESM(require_react());
var import_classnames99 = __toESM(require_classnames());
var import_jsx_runtime148 = __toESM(require_jsx_runtime());
var ToastBody = React144.forwardRef(({ className, bsPrefix, as: Component2 = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-body');
    return (0, import_jsx_runtime148.jsx)(Component2, {
        ref,
        className: (0, import_classnames99.default)(className, bsPrefix),
        ...props,
    });
});
ToastBody.displayName = 'ToastBody';
var ToastBody_default = ToastBody;

// node_modules/react-bootstrap/esm/Toast.js
var import_jsx_runtime149 = __toESM(require_jsx_runtime());
var Toast = React145.forwardRef(
    (
        {
            bsPrefix,
            className,
            transition: Transition2 = ToastFade_default,
            show = true,
            animation = true,
            delay = 5e3,
            autohide = false,
            onClose,
            onEntered,
            onExit,
            onExiting,
            onEnter,
            onEntering,
            onExited,
            bg,
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');
        const delayRef = (0, import_react83.useRef)(delay);
        const onCloseRef = (0, import_react83.useRef)(onClose);
        (0, import_react83.useEffect)(() => {
            delayRef.current = delay;
            onCloseRef.current = onClose;
        }, [delay, onClose]);
        const autohideTimeout = useTimeout();
        const autohideToast = !!(autohide && show);
        const autohideFunc = (0, import_react83.useCallback)(() => {
            if (autohideToast) {
                onCloseRef.current == null ? void 0 : onCloseRef.current();
            }
        }, [autohideToast]);
        (0, import_react83.useEffect)(() => {
            autohideTimeout.set(autohideFunc, delayRef.current);
        }, [autohideTimeout, autohideFunc]);
        const toastContext = (0, import_react83.useMemo)(
            () => ({
                onClose,
            }),
            [onClose]
        );
        const hasAnimation = !!(Transition2 && animation);
        const toast = (0, import_jsx_runtime149.jsx)('div', {
            ...props,
            ref,
            className: (0, import_classnames100.default)(
                bsPrefix,
                className,
                bg && `bg-${bg}`,
                !hasAnimation && (show ? 'show' : 'hide')
            ),
            role: 'alert',
            'aria-live': 'assertive',
            'aria-atomic': 'true',
        });
        return (0, import_jsx_runtime149.jsx)(ToastContext_default.Provider, {
            value: toastContext,
            children:
                hasAnimation && Transition2
                    ? (0, import_jsx_runtime149.jsx)(Transition2, {
                          in: show,
                          onEnter,
                          onEntering,
                          onEntered,
                          onExit,
                          onExiting,
                          onExited,
                          unmountOnExit: true,
                          children: toast,
                      })
                    : toast,
        });
    }
);
Toast.displayName = 'Toast';
var Toast_default = Object.assign(Toast, {
    Body: ToastBody_default,
    Header: ToastHeader_default,
});

// node_modules/react-bootstrap/esm/ToastContainer.js
var import_classnames101 = __toESM(require_classnames());
var React146 = __toESM(require_react());
var import_jsx_runtime150 = __toESM(require_jsx_runtime());
var positionClasses = {
    'top-start': 'top-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'top-end': 'top-0 end-0',
    'middle-start': 'top-50 start-0 translate-middle-y',
    'middle-center': 'top-50 start-50 translate-middle',
    'middle-end': 'top-50 end-0 translate-middle-y',
    'bottom-start': 'bottom-0 start-0',
    'bottom-center': 'bottom-0 start-50 translate-middle-x',
    'bottom-end': 'bottom-0 end-0',
};
var ToastContainer = React146.forwardRef(
    (
        {
            bsPrefix,
            position,
            containerPosition,
            className,
            // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
            as: Component2 = 'div',
            ...props
        },
        ref
    ) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-container');
        return (0, import_jsx_runtime150.jsx)(Component2, {
            ref,
            ...props,
            className: (0, import_classnames101.default)(
                bsPrefix,
                position && positionClasses[position],
                containerPosition && `position-${containerPosition}`,
                className
            ),
        });
    }
);
ToastContainer.displayName = 'ToastContainer';
var ToastContainer_default = ToastContainer;

// node_modules/react-bootstrap/esm/ToggleButton.js
var import_classnames102 = __toESM(require_classnames());
var React147 = __toESM(require_react());
var import_jsx_runtime151 = __toESM(require_jsx_runtime());
var import_jsx_runtime152 = __toESM(require_jsx_runtime());
var import_jsx_runtime153 = __toESM(require_jsx_runtime());
var noop7 = () => void 0;
var ToggleButton = React147.forwardRef(
    ({ bsPrefix, name, className, checked, type, onChange, value, disabled, id, inputRef, ...props }, ref) => {
        bsPrefix = useBootstrapPrefix(bsPrefix, 'btn-check');
        return (0, import_jsx_runtime153.jsxs)(import_jsx_runtime152.Fragment, {
            children: [
                (0, import_jsx_runtime151.jsx)('input', {
                    className: bsPrefix,
                    name,
                    type,
                    value,
                    ref: inputRef,
                    autoComplete: 'off',
                    checked: !!checked,
                    disabled: !!disabled,
                    onChange: onChange || noop7,
                    id,
                }),
                (0, import_jsx_runtime151.jsx)(Button_default2, {
                    ...props,
                    ref,
                    className: (0, import_classnames102.default)(className, disabled && 'disabled'),
                    type: void 0,
                    role: void 0,
                    as: 'label',
                    htmlFor: id,
                }),
            ],
        });
    }
);
ToggleButton.displayName = 'ToggleButton';
var ToggleButton_default = ToggleButton;

// node_modules/react-bootstrap/esm/ToggleButtonGroup.js
var React148 = __toESM(require_react());
var import_invariant4 = __toESM(require_browser());
var import_jsx_runtime154 = __toESM(require_jsx_runtime());
var ToggleButtonGroup = React148.forwardRef((props, ref) => {
    const {
        children,
        type = 'radio',
        name,
        value,
        onChange,
        vertical = false,
        ...controlledProps
    } = useUncontrolled(props, {
        value: 'onChange',
    });
    const getValues = () => (value == null ? [] : [].concat(value));
    const handleToggle = (inputVal, event) => {
        if (!onChange) {
            return;
        }
        const values = getValues();
        const isActive = values.indexOf(inputVal) !== -1;
        if (type === 'radio') {
            if (!isActive) onChange(inputVal, event);
            return;
        }
        if (isActive) {
            onChange(
                values.filter((n) => n !== inputVal),
                event
            );
        } else {
            onChange([...values, inputVal], event);
        }
    };
    !(type !== 'radio' || !!name)
        ? true
            ? (0, import_invariant4.default)(
                  false,
                  'A `name` is required to group the toggle buttons when the `type` is set to "radio"'
              )
            : (0, import_invariant4.default)(false)
        : void 0;
    return (0, import_jsx_runtime154.jsx)(ButtonGroup_default, {
        ...controlledProps,
        ref,
        vertical,
        children: map(children, (child) => {
            const values = getValues();
            const { value: childVal, onChange: childOnChange } = child.props;
            const handler = (e) => handleToggle(childVal, e);
            return React148.cloneElement(child, {
                type,
                name: child.name || name,
                checked: values.indexOf(childVal) !== -1,
                onChange: createChainedFunction_default(childOnChange, handler),
            });
        }),
    });
});
var ToggleButtonGroup_default = Object.assign(ToggleButtonGroup, {
    Button: ToggleButton_default,
});
export {
    Accordion_default as Accordion,
    AccordionBody_default as AccordionBody,
    AccordionButton_default as AccordionButton,
    AccordionCollapse_default as AccordionCollapse,
    AccordionContext_default as AccordionContext,
    AccordionHeader_default as AccordionHeader,
    AccordionItem_default as AccordionItem,
    Alert_default as Alert,
    AlertHeading_default as AlertHeading,
    AlertLink_default as AlertLink,
    Anchor_default2 as Anchor,
    Badge_default as Badge,
    Breadcrumb_default as Breadcrumb,
    BreadcrumbItem_default as BreadcrumbItem,
    Button_default2 as Button,
    ButtonGroup_default as ButtonGroup,
    ButtonToolbar_default as ButtonToolbar,
    Card_default as Card,
    CardBody_default as CardBody,
    CardFooter_default as CardFooter,
    CardGroup_default as CardGroup,
    CardHeader_default as CardHeader,
    CardImg_default as CardImg,
    CardImgOverlay_default as CardImgOverlay,
    CardLink_default as CardLink,
    CardSubtitle_default as CardSubtitle,
    CardText_default as CardText,
    CardTitle_default as CardTitle,
    Carousel_default as Carousel,
    CarouselCaption_default as CarouselCaption,
    CarouselItem_default as CarouselItem,
    CloseButton_default as CloseButton,
    Col_default as Col,
    Collapse_default as Collapse,
    Container_default as Container,
    Dropdown_default2 as Dropdown,
    DropdownButton_default as DropdownButton,
    DropdownDivider_default as DropdownDivider,
    DropdownHeader_default as DropdownHeader,
    DropdownItem_default2 as DropdownItem,
    DropdownItemText_default as DropdownItemText,
    DropdownMenu_default2 as DropdownMenu,
    DropdownToggle_default2 as DropdownToggle,
    Fade_default as Fade,
    Figure_default as Figure,
    FigureCaption_default as FigureCaption,
    FigureImage_default as FigureImage,
    FloatingLabel_default as FloatingLabel,
    Form_default as Form,
    FormCheck_default as FormCheck,
    FormControl_default as FormControl,
    FormFloating_default as FormFloating,
    FormGroup_default as FormGroup,
    FormLabel_default as FormLabel,
    FormSelect_default as FormSelect,
    FormText_default as FormText,
    Image_default as Image,
    InputGroup_default as InputGroup,
    ListGroup_default as ListGroup,
    ListGroupItem_default as ListGroupItem,
    Modal_default2 as Modal,
    ModalBody_default as ModalBody,
    ModalDialog_default as ModalDialog,
    ModalFooter_default as ModalFooter,
    ModalHeader_default as ModalHeader,
    ModalTitle_default as ModalTitle,
    Nav_default2 as Nav,
    NavDropdown_default as NavDropdown,
    NavItem_default2 as NavItem,
    NavLink_default as NavLink,
    Navbar_default as Navbar,
    NavbarBrand_default as NavbarBrand,
    NavbarCollapse_default as NavbarCollapse,
    NavbarOffcanvas_default as NavbarOffcanvas,
    NavbarText_default as NavbarText,
    NavbarToggle_default as NavbarToggle,
    Offcanvas_default as Offcanvas,
    OffcanvasBody_default as OffcanvasBody,
    OffcanvasHeader_default as OffcanvasHeader,
    OffcanvasTitle_default as OffcanvasTitle,
    OffcanvasToggling_default as OffcanvasToggling,
    Overlay_default2 as Overlay,
    OverlayTrigger_default as OverlayTrigger,
    PageItem_default as PageItem,
    Pagination_default as Pagination,
    Placeholder_default as Placeholder,
    PlaceholderButton_default as PlaceholderButton,
    Popover_default as Popover,
    PopoverBody_default as PopoverBody,
    PopoverHeader_default as PopoverHeader,
    ProgressBar_default as ProgressBar,
    Ratio_default as Ratio,
    Row_default as Row,
    SSRProvider_default as SSRProvider,
    Spinner_default as Spinner,
    SplitButton_default as SplitButton,
    Stack_default as Stack,
    Tab_default as Tab,
    TabContainer_default as TabContainer,
    TabContent_default as TabContent,
    TabPane_default as TabPane,
    Table_default as Table,
    Tabs_default2 as Tabs,
    ThemeProvider_default as ThemeProvider,
    Toast_default as Toast,
    ToastBody_default as ToastBody,
    ToastContainer_default as ToastContainer,
    ToastHeader_default as ToastHeader,
    ToggleButton_default as ToggleButton,
    ToggleButtonGroup_default as ToggleButtonGroup,
    Tooltip_default as Tooltip,
    useAccordionButton,
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-bootstrap.js.map
