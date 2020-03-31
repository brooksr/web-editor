/**
 * TODO
 * Animation
 * Grid
 * SVG, masking
 * */
const units =  ["px", "%", "em", "vmax", "vmin", "vh", "vw"];
const cssVar = 'var(--[a-z|-])';
const defaults = {
  number: `([0-9|.]+(${units.join("|")})?)`,
  color: `(rgb.*|' + ${cssVar})`,
  border: '(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)',
  size: "(auto|inherit|(min|max)-content)|[0-9|.]+("+units.join("|")+")",
  overflow: ["visible", "hidden", "clip", "scroll", "auto"],
};

export const styles = {
  // Box model
  "display": {
		options: ["block", "none", "inline", "inline-block", "flex", "grid", "table", "table-row" ,"table-cell", "list-item"],
	},
  "box-sizing": {
		options: ["content-box", "border-box"],
	},
  "table-layout": {
		options: ["auto", "fixed"],
	},
  "visibility": {
		options: ["visible", "hidden"],
	},
  "z-index": {
		pattern: "[0-9]+",
	},
  "clear": {
		options: ["none", "inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom"],
	},
  "float": {
		options: ["none", "block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom"],
	},
  "position": {
		options: ["static", "relative", "absolute", "fixed", "inherit"],
	},

  "top": {
		pattern: defaults.size,
	},
  "right": {
		pattern: defaults.size,
	},
  "bottom": {
		pattern: defaults.size,
	},
  "left": {
		pattern: defaults.size,
	},
  "height": {
		pattern: defaults.size,
	},
  "width": {
		pattern: defaults.size,
	},
  "max-height": {
		pattern: defaults.size,
	},
  "max-width": {
		pattern: defaults.size,
	},
  "min-height": {
		pattern: defaults.size,
	},
  "min-width": {
		pattern: defaults.size,
	},
  "padding-bottom": {
		pattern: defaults.size,
	},
  "padding-left": {
		pattern: defaults.size,
	},
  "padding-right": {
		pattern: defaults.size,
	},
  "padding-top": {
		pattern: defaults.size,
	},
  "padding": {
		pattern: `${defaults.size}.*(${defaults.size})?.*(${defaults.size})?.*(${defaults.size})?.*`,
	},
  "margin-bottom": {
		pattern: defaults.size,
	},
  "margin-left": {
		pattern: defaults.size,
	},
  "margin-right": {
		pattern: defaults.size,
	},
  "margin-top": {
		pattern: defaults.size,
	},
  "margin": {
		pattern: `${defaults.size}.*(${defaults.size})?.*(${defaults.size})?.*(${defaults.size})?.*`,
	},
  "border-collapse": {
		options: ["collapse", "separate"],
	},
  "border-color": {
		pattern: defaults.color,
	},
  "border-radius": {
		pattern: defaults.number,
	},
  "border-spacing": {
		pattern: defaults.size,
	},
  "border-style": {
		pattern: defaults.border,
	},
  "border-width": {
		pattern: defaults.number,
	},
  "border": {
		pattern: `none|${defaults.number} ${defaults.border} ${defaults.color}`,
	},
  "outline-color": {
		pattern: defaults.color,
	},
  "outline-style": {
		pattern: defaults.border,
	},
  "outline-width": {
		pattern: defaults.number,
	},
  "outline": {
		pattern: `none|${defaults.number} ${defaults.border} ${defaults.color}`,
	},
  "overflow-x": {
		pattern: defaults.overflow,
	},
  "overflow-y": {
		pattern: defaults.overflow,
	},
  "overflow": {
		pattern: defaults.overflow,
	},

  //Flex
  "align-content": {
		options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch", "start", "end", "baseline"],
	},
  "align-items": {
		options: ["stretch", "flex-start", "flex-end", "center", "baseline", "first baseline", "last baseline", "start", "end", "self-start", "self-end"],
	},
  "alignment-baseline": {
		options: ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
	},
  "flex-basis": {
		pattern: defaults.size,
	},
  "flex-direction": {
		options: ["row",  "row-reverse",  "column",  "column-reverse"],
	},
  "flex-flow": {
    pattern: ".*",//<‘flex-direction’> || <‘flex-wrap’>
  },
  "flex-grow": {
		pattern: defaults.number,
	},
  "flex-shrink": {
		pattern: defaults.number,
	},
  "flex-wrap": {
		options: ["nowrap",  "wrap",  "wrap-reverse"],
	},
  "flex": {
		pattern: `none|${defaults.number}.*(${defaults.number})?.*(${defaults.size})`,
	},
  "justify-content": {
		options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end", "left", "right"],
	},
  "order": {
		pattern: "[0-9]+",
	},

  // Styles
  "background-attachment": {
		options: ["scroll","fixed","local"],
	},
  "background-color": {
		pattern: defaults.color,
	},
  "background-image": {
		pattern: ".*",//https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
	},
  "background-position": {
		pattern: ".*",//https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
	},
  "background-repeat": {
		pattern: ".*",//repeat-x", "repeat-y", "[ repeat", "space", "round", "no-repeat ]{1,2}
	},
  "background-size": {
		pattern: ".*",//[ <length-percentage>", "auto ]{1,2}", "cover", "contain
	},
  "background": {
		pattern: ".*",//https://developer.mozilla.org/en-US/docs/Web/CSS/background
	},
  "box-shadow": {
		pattern: ".*",
	},
  "content": {
		pattern: ".*",//https://developer.mozilla.org/en-US/docs/Web/CSS/content
	},
  "cursor": {
		options: ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "grab", "grabbing"],
	},
  "filter": {
    pattern: ".*", //https://developer.mozilla.org/en-US/docs/Web/CSS/filter
  },
  "list-style-type": {
		options: ["disc", "circle", "square", "decimal", "lower-roman", "upper-roman", "decimal-leading-zero", "upper-alpha", "lower-alpha"],
	},
  "opacity": {
		pattern: "0|1|[0-1].[0-9]+",
	},
  "resize": {
		options: ["none", "both", "horizontal", "vertical"],
	},
  "transform": {
		pattern: ".*", //https://developer.mozilla.org/en-US/docs/Web/CSS/transform
	},
  "transition": {
		pattern: ".*",//https://developer.mozilla.org/en-US/docs/Web/CSS/transition
	},

  // Fonts
  "color": {
		pattern: defaults.color,
	},
  "direction": {
		options: ["ltr", "rtl"],
	},
  "font-family": {
		pattern: ".*",
	},
  "font-size": {
		pattern: defaults.size,
	},
  "font-style": {
		options: ["normal", "italic", "oblique"],
	},
  "font-weight": {
		pattern: "[0-9]{3}|normal|bold|lighter",
	},
  "letter-spacing": {
		pattern: defaults.size,
	},
  "line-height": {
		pattern: defaults.number,
	},
  "text-align": {
		options: ["left", "center", "right", "justify"],
	},
  "text-decoration": {
		pattern: ".*",//<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>
  },
  "text-indent": {
		pattern: defaults.number,
	},
  "text-overflow": {
		options: ["clip", "ellipsis"],
	},
  "text-shadow": {
		pattern: `${defaults.number} ${defaults.number}( ${defaults.number})? ${defaults.color}`,
	},
  "text-size-adjust": {
		pattern: "none|auto|[0-9]+%",
	},
  "text-transform": {
		options: ["capitalize", "lowercase", "uppercase"],
	},
  "white-space": {
		options: ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
	},
  "word-spacing": {
		pattern: defaults.number,
	},
  "word-wrap": {
		options: ["normal", "break-word", "anywhere"],
	},
}
