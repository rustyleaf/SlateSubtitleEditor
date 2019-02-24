import isHotkey from "is-hotkey";

/**
 * A Slate plugin to automatically replace a block when a string of matching
 * text is typed.
 *
 * @param {Object} opts
 * @return {Object}
 */

export default function Hotkeys(hotkey, fn) {
  return {
    onKeyDown(event, editor, next) {
      if (isHotkey(hotkey, event)) {
        editor.command(fn);
      } else {
        return next();
      }
    }
  };
}
