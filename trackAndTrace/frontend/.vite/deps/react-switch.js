import { require_prop_types } from './chunk-33DERLYP.js';
import './chunk-KANKV5NS.js';
import { require_react } from './chunk-JZSXOKIY.js';
import { __toESM } from './chunk-ANIWD3T6.js';

// node_modules/react-switch/dist/index.dev.mjs
var import_react = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
function _extends() {
    _extends = Object.assign
        ? Object.assign.bind()
        : function (target) {
              for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];
                  for (var key in source) {
                      if (Object.prototype.hasOwnProperty.call(source, key)) {
                          target[key] = source[key];
                      }
                  }
              }
              return target;
          };
    return _extends.apply(this, arguments);
}
var uncheckedIcon = import_react.default.createElement(
    'svg',
    {
        viewBox: '-2 -5 14 20',
        height: '100%',
        width: '100%',
        style: {
            position: 'absolute',
            top: 0,
        },
    },
    import_react.default.createElement('path', {
        d: 'M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12',
        fill: '#fff',
        fillRule: 'evenodd',
    })
);
var checkedIcon = import_react.default.createElement(
    'svg',
    {
        height: '100%',
        width: '100%',
        viewBox: '-2 -5 17 21',
        style: {
            position: 'absolute',
            top: 0,
        },
    },
    import_react.default.createElement('path', {
        d: 'M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0',
        fill: '#fff',
        fillRule: 'evenodd',
    })
);
function createBackgroundColor(pos, checkedPos, uncheckedPos, offColor, onColor) {
    var relativePos = (pos - uncheckedPos) / (checkedPos - uncheckedPos);
    if (relativePos === 0) {
        return offColor;
    }
    if (relativePos === 1) {
        return onColor;
    }
    var newColor = '#';
    for (var i = 1; i < 6; i += 2) {
        var offComponent = parseInt(offColor.substr(i, 2), 16);
        var onComponent = parseInt(onColor.substr(i, 2), 16);
        var weightedValue = Math.round((1 - relativePos) * offComponent + relativePos * onComponent);
        var newComponent = weightedValue.toString(16);
        if (newComponent.length === 1) {
            newComponent = '0' + newComponent;
        }
        newColor += newComponent;
    }
    return newColor;
}
function convertShorthandColor(color) {
    if (color.length === 7) {
        return color;
    }
    var sixDigitColor = '#';
    for (var i = 1; i < 4; i += 1) {
        sixDigitColor += color[i] + color[i];
    }
    return sixDigitColor;
}
function getBackgroundColor(pos, checkedPos, uncheckedPos, offColor, onColor) {
    var sixDigitOffColor = convertShorthandColor(offColor);
    var sixDigitOnColor = convertShorthandColor(onColor);
    return createBackgroundColor(pos, checkedPos, uncheckedPos, sixDigitOffColor, sixDigitOnColor);
}
var hexColorPropType = function (props, propName, componentName) {
    var prop = props[propName];
    if (typeof prop !== 'string' || prop[0] !== '#' || (prop.length !== 4 && prop.length !== 7)) {
        return new Error(
            "Invalid prop '" +
                propName +
                "' supplied to '" +
                componentName +
                "'. '" +
                propName +
                "' has to be either a 3-digit or 6-digit hex-color string. Valid examples: '#abc', '#123456'"
        );
    }
    return null;
};
function objectWithoutProperties(obj, exclude) {
    var target = {};
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];
    return target;
}
var ReactSwitch = (function (Component2) {
    function ReactSwitch2(props) {
        Component2.call(this, props);
        var height = props.height;
        var width = props.width;
        var handleDiameter = props.handleDiameter;
        var checked = props.checked;
        this.$handleDiameter = handleDiameter || height - 2;
        this.$checkedPos = Math.max(width - height, width - (height + this.$handleDiameter) / 2);
        this.$uncheckedPos = Math.max(0, (height - this.$handleDiameter) / 2);
        this.state = {
            $pos: checked ? this.$checkedPos : this.$uncheckedPos,
        };
        this.$lastDragAt = 0;
        this.$lastKeyUpAt = 0;
        this.$onMouseDown = this.$onMouseDown.bind(this);
        this.$onMouseMove = this.$onMouseMove.bind(this);
        this.$onMouseUp = this.$onMouseUp.bind(this);
        this.$onTouchStart = this.$onTouchStart.bind(this);
        this.$onTouchMove = this.$onTouchMove.bind(this);
        this.$onTouchEnd = this.$onTouchEnd.bind(this);
        this.$onClick = this.$onClick.bind(this);
        this.$onInputChange = this.$onInputChange.bind(this);
        this.$onKeyUp = this.$onKeyUp.bind(this);
        this.$setHasOutline = this.$setHasOutline.bind(this);
        this.$unsetHasOutline = this.$unsetHasOutline.bind(this);
        this.$getInputRef = this.$getInputRef.bind(this);
    }
    if (Component2) ReactSwitch2.__proto__ = Component2;
    ReactSwitch2.prototype = Object.create(Component2 && Component2.prototype);
    ReactSwitch2.prototype.constructor = ReactSwitch2;
    ReactSwitch2.prototype.componentDidMount = function componentDidMount() {
        this.$isMounted = true;
    };
    ReactSwitch2.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.checked === this.props.checked) {
            return;
        }
        var $pos = this.props.checked ? this.$checkedPos : this.$uncheckedPos;
        this.setState({
            $pos,
        });
    };
    ReactSwitch2.prototype.componentWillUnmount = function componentWillUnmount() {
        this.$isMounted = false;
    };
    ReactSwitch2.prototype.$onDragStart = function $onDragStart(clientX) {
        this.$inputRef.focus();
        this.setState({
            $startX: clientX,
            $hasOutline: true,
            $dragStartingTime: Date.now(),
        });
    };
    ReactSwitch2.prototype.$onDrag = function $onDrag(clientX) {
        var ref = this.state;
        var $startX = ref.$startX;
        var $isDragging = ref.$isDragging;
        var $pos = ref.$pos;
        var ref$1 = this.props;
        var checked = ref$1.checked;
        var startPos = checked ? this.$checkedPos : this.$uncheckedPos;
        var mousePos = startPos + clientX - $startX;
        if (!$isDragging && clientX !== $startX) {
            this.setState({
                $isDragging: true,
            });
        }
        var newPos = Math.min(this.$checkedPos, Math.max(this.$uncheckedPos, mousePos));
        if (newPos !== $pos) {
            this.setState({
                $pos: newPos,
            });
        }
    };
    ReactSwitch2.prototype.$onDragStop = function $onDragStop(event) {
        var ref = this.state;
        var $pos = ref.$pos;
        var $isDragging = ref.$isDragging;
        var $dragStartingTime = ref.$dragStartingTime;
        var ref$1 = this.props;
        var checked = ref$1.checked;
        var halfwayCheckpoint = (this.$checkedPos + this.$uncheckedPos) / 2;
        var prevPos = this.props.checked ? this.$checkedPos : this.$uncheckedPos;
        this.setState({
            $pos: prevPos,
        });
        var timeSinceStart = Date.now() - $dragStartingTime;
        var isSimulatedClick = !$isDragging || timeSinceStart < 250;
        var isDraggedHalfway = (checked && $pos <= halfwayCheckpoint) || (!checked && $pos >= halfwayCheckpoint);
        if (isSimulatedClick || isDraggedHalfway) {
            this.$onChange(event);
        }
        if (this.$isMounted) {
            this.setState({
                $isDragging: false,
                $hasOutline: false,
            });
        }
        this.$lastDragAt = Date.now();
    };
    ReactSwitch2.prototype.$onMouseDown = function $onMouseDown(event) {
        event.preventDefault();
        if (typeof event.button === 'number' && event.button !== 0) {
            return;
        }
        this.$onDragStart(event.clientX);
        window.addEventListener('mousemove', this.$onMouseMove);
        window.addEventListener('mouseup', this.$onMouseUp);
    };
    ReactSwitch2.prototype.$onMouseMove = function $onMouseMove(event) {
        event.preventDefault();
        this.$onDrag(event.clientX);
    };
    ReactSwitch2.prototype.$onMouseUp = function $onMouseUp(event) {
        this.$onDragStop(event);
        window.removeEventListener('mousemove', this.$onMouseMove);
        window.removeEventListener('mouseup', this.$onMouseUp);
    };
    ReactSwitch2.prototype.$onTouchStart = function $onTouchStart(event) {
        this.$checkedStateFromDragging = null;
        this.$onDragStart(event.touches[0].clientX);
    };
    ReactSwitch2.prototype.$onTouchMove = function $onTouchMove(event) {
        this.$onDrag(event.touches[0].clientX);
    };
    ReactSwitch2.prototype.$onTouchEnd = function $onTouchEnd(event) {
        event.preventDefault();
        this.$onDragStop(event);
    };
    ReactSwitch2.prototype.$onInputChange = function $onInputChange(event) {
        if (Date.now() - this.$lastDragAt > 50) {
            this.$onChange(event);
            if (Date.now() - this.$lastKeyUpAt > 50) {
                if (this.$isMounted) {
                    this.setState({
                        $hasOutline: false,
                    });
                }
            }
        }
    };
    ReactSwitch2.prototype.$onKeyUp = function $onKeyUp() {
        this.$lastKeyUpAt = Date.now();
    };
    ReactSwitch2.prototype.$setHasOutline = function $setHasOutline() {
        this.setState({
            $hasOutline: true,
        });
    };
    ReactSwitch2.prototype.$unsetHasOutline = function $unsetHasOutline() {
        this.setState({
            $hasOutline: false,
        });
    };
    ReactSwitch2.prototype.$getInputRef = function $getInputRef(el) {
        this.$inputRef = el;
    };
    ReactSwitch2.prototype.$onClick = function $onClick(event) {
        event.preventDefault();
        this.$inputRef.focus();
        this.$onChange(event);
        if (this.$isMounted) {
            this.setState({
                $hasOutline: false,
            });
        }
    };
    ReactSwitch2.prototype.$onChange = function $onChange(event) {
        var ref = this.props;
        var checked = ref.checked;
        var onChange = ref.onChange;
        var id = ref.id;
        onChange(!checked, event, id);
    };
    ReactSwitch2.prototype.render = function render() {
        var ref = this.props;
        var checked = ref.checked;
        var disabled = ref.disabled;
        var className = ref.className;
        var offColor = ref.offColor;
        var onColor = ref.onColor;
        var offHandleColor = ref.offHandleColor;
        var onHandleColor = ref.onHandleColor;
        var checkedIcon2 = ref.checkedIcon;
        var uncheckedIcon2 = ref.uncheckedIcon;
        var checkedHandleIcon = ref.checkedHandleIcon;
        var uncheckedHandleIcon = ref.uncheckedHandleIcon;
        var boxShadow = ref.boxShadow;
        var activeBoxShadow = ref.activeBoxShadow;
        var height = ref.height;
        var width = ref.width;
        var borderRadius = ref.borderRadius;
        ref.handleDiameter;
        var rest$1 = objectWithoutProperties(ref, [
            'checked',
            'disabled',
            'className',
            'offColor',
            'onColor',
            'offHandleColor',
            'onHandleColor',
            'checkedIcon',
            'uncheckedIcon',
            'checkedHandleIcon',
            'uncheckedHandleIcon',
            'boxShadow',
            'activeBoxShadow',
            'height',
            'width',
            'borderRadius',
            'handleDiameter',
        ]);
        var rest = rest$1;
        var ref$1 = this.state;
        var $pos = ref$1.$pos;
        var $isDragging = ref$1.$isDragging;
        var $hasOutline = ref$1.$hasOutline;
        var rootStyle = {
            position: 'relative',
            display: 'inline-block',
            textAlign: 'left',
            opacity: disabled ? 0.5 : 1,
            direction: 'ltr',
            borderRadius: height / 2,
            WebkitTransition: 'opacity 0.25s',
            MozTransition: 'opacity 0.25s',
            transition: 'opacity 0.25s',
            touchAction: 'none',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
        };
        var backgroundStyle = {
            height,
            width,
            margin: Math.max(0, (this.$handleDiameter - height) / 2),
            position: 'relative',
            background: getBackgroundColor($pos, this.$checkedPos, this.$uncheckedPos, offColor, onColor),
            borderRadius: typeof borderRadius === 'number' ? borderRadius : height / 2,
            cursor: disabled ? 'default' : 'pointer',
            WebkitTransition: $isDragging ? null : 'background 0.25s',
            MozTransition: $isDragging ? null : 'background 0.25s',
            transition: $isDragging ? null : 'background 0.25s',
        };
        var checkedIconStyle = {
            height,
            width: Math.min(height * 1.5, width - (this.$handleDiameter + height) / 2 + 1),
            position: 'relative',
            opacity: ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos),
            pointerEvents: 'none',
            WebkitTransition: $isDragging ? null : 'opacity 0.25s',
            MozTransition: $isDragging ? null : 'opacity 0.25s',
            transition: $isDragging ? null : 'opacity 0.25s',
        };
        var uncheckedIconStyle = {
            height,
            width: Math.min(height * 1.5, width - (this.$handleDiameter + height) / 2 + 1),
            position: 'absolute',
            opacity: 1 - ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos),
            right: 0,
            top: 0,
            pointerEvents: 'none',
            WebkitTransition: $isDragging ? null : 'opacity 0.25s',
            MozTransition: $isDragging ? null : 'opacity 0.25s',
            transition: $isDragging ? null : 'opacity 0.25s',
        };
        var handleStyle = {
            height: this.$handleDiameter,
            width: this.$handleDiameter,
            background: getBackgroundColor($pos, this.$checkedPos, this.$uncheckedPos, offHandleColor, onHandleColor),
            display: 'inline-block',
            cursor: disabled ? 'default' : 'pointer',
            borderRadius: typeof borderRadius === 'number' ? borderRadius - 1 : '50%',
            position: 'absolute',
            transform: 'translateX(' + $pos + 'px)',
            top: Math.max(0, (height - this.$handleDiameter) / 2),
            outline: 0,
            boxShadow: $hasOutline ? activeBoxShadow : boxShadow,
            border: 0,
            WebkitTransition: $isDragging ? null : 'background-color 0.25s, transform 0.25s, box-shadow 0.15s',
            MozTransition: $isDragging ? null : 'background-color 0.25s, transform 0.25s, box-shadow 0.15s',
            transition: $isDragging ? null : 'background-color 0.25s, transform 0.25s, box-shadow 0.15s',
        };
        var uncheckedHandleIconStyle = {
            height: this.$handleDiameter,
            width: this.$handleDiameter,
            opacity: Math.max((1 - ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos) - 0.5) * 2, 0),
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            WebkitTransition: $isDragging ? null : 'opacity 0.25s',
            MozTransition: $isDragging ? null : 'opacity 0.25s',
            transition: $isDragging ? null : 'opacity 0.25s',
        };
        var checkedHandleIconStyle = {
            height: this.$handleDiameter,
            width: this.$handleDiameter,
            opacity: Math.max((($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos) - 0.5) * 2, 0),
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            WebkitTransition: $isDragging ? null : 'opacity 0.25s',
            MozTransition: $isDragging ? null : 'opacity 0.25s',
            transition: $isDragging ? null : 'opacity 0.25s',
        };
        var inputStyle = {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            width: 1,
        };
        return import_react.default.createElement(
            'div',
            {
                className,
                style: rootStyle,
            },
            import_react.default.createElement(
                'div',
                {
                    className: 'react-switch-bg',
                    style: backgroundStyle,
                    onClick: disabled ? null : this.$onClick,
                    onMouseDown: function (e) {
                        return e.preventDefault();
                    },
                },
                checkedIcon2 &&
                    import_react.default.createElement(
                        'div',
                        {
                            style: checkedIconStyle,
                        },
                        checkedIcon2
                    ),
                uncheckedIcon2 &&
                    import_react.default.createElement(
                        'div',
                        {
                            style: uncheckedIconStyle,
                        },
                        uncheckedIcon2
                    )
            ),
            import_react.default.createElement(
                'div',
                {
                    className: 'react-switch-handle',
                    style: handleStyle,
                    onClick: function (e) {
                        return e.preventDefault();
                    },
                    onMouseDown: disabled ? null : this.$onMouseDown,
                    onTouchStart: disabled ? null : this.$onTouchStart,
                    onTouchMove: disabled ? null : this.$onTouchMove,
                    onTouchEnd: disabled ? null : this.$onTouchEnd,
                    onTouchCancel: disabled ? null : this.$unsetHasOutline,
                },
                uncheckedHandleIcon &&
                    import_react.default.createElement(
                        'div',
                        {
                            style: uncheckedHandleIconStyle,
                        },
                        uncheckedHandleIcon
                    ),
                checkedHandleIcon &&
                    import_react.default.createElement(
                        'div',
                        {
                            style: checkedHandleIconStyle,
                        },
                        checkedHandleIcon
                    )
            ),
            import_react.default.createElement(
                'input',
                _extends(
                    {},
                    {
                        type: 'checkbox',
                        role: 'switch',
                        'aria-checked': checked,
                        checked,
                        disabled,
                        style: inputStyle,
                    },
                    rest,
                    {
                        ref: this.$getInputRef,
                        onFocus: this.$setHasOutline,
                        onBlur: this.$unsetHasOutline,
                        onKeyUp: this.$onKeyUp,
                        onChange: this.$onInputChange,
                    }
                )
            )
        );
    };
    return ReactSwitch2;
})(import_react.Component);
ReactSwitch.propTypes = {
    checked: import_prop_types.default.bool.isRequired,
    onChange: import_prop_types.default.func.isRequired,
    disabled: import_prop_types.default.bool,
    offColor: hexColorPropType,
    onColor: hexColorPropType,
    offHandleColor: hexColorPropType,
    onHandleColor: hexColorPropType,
    handleDiameter: import_prop_types.default.number,
    uncheckedIcon: import_prop_types.default.oneOfType([
        import_prop_types.default.bool,
        import_prop_types.default.element,
    ]),
    checkedIcon: import_prop_types.default.oneOfType([
        import_prop_types.default.bool,
        import_prop_types.default.element,
    ]),
    boxShadow: import_prop_types.default.string,
    borderRadius: import_prop_types.default.number,
    activeBoxShadow: import_prop_types.default.string,
    uncheckedHandleIcon: import_prop_types.default.element,
    checkedHandleIcon: import_prop_types.default.element,
    height: import_prop_types.default.number,
    width: import_prop_types.default.number,
    id: import_prop_types.default.string,
    className: import_prop_types.default.string,
};
ReactSwitch.defaultProps = {
    disabled: false,
    offColor: '#888',
    onColor: '#080',
    offHandleColor: '#fff',
    onHandleColor: '#fff',
    uncheckedIcon,
    checkedIcon,
    boxShadow: null,
    activeBoxShadow: '0 0 2px 3px #3bf',
    height: 28,
    width: 56,
};
export { ReactSwitch as default };
//# sourceMappingURL=react-switch.js.map
