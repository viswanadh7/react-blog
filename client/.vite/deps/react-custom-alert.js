import {
  require_react
} from "./chunk-E55NSNTN.js";
import {
  __toESM
} from "./chunk-4MBMRILA.js";

// node_modules/react-custom-alert/dist/index.esm.js
var import_react = __toESM(require_react());
var Icon = ({ type }) => {
  switch (type) {
    case "success":
      return import_react.default.createElement(Success, null);
    case "warning":
      return import_react.default.createElement(Warning, null);
    case "error":
      return import_react.default.createElement(Error, null);
    default:
      return import_react.default.createElement(Info, null);
  }
};
var Success = () => import_react.default.createElement(
  "svg",
  { viewBox: "64 64 896 896", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "#52c41a", "aria-hidden": "true" },
  import_react.default.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })
);
var Info = () => import_react.default.createElement(
  "svg",
  { viewBox: "64 64 896 896", focusable: "false", "data-icon": "info-circle", width: "1em", height: "1em", fill: "#1890ff", "aria-hidden": "true" },
  import_react.default.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" })
);
var Warning = () => import_react.default.createElement(
  "svg",
  { viewBox: "64 64 896 896", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "#faad14", "aria-hidden": "true" },
  import_react.default.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" })
);
var Error = () => import_react.default.createElement(
  "svg",
  { viewBox: "64 64 896 896", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "#ff4d4f", "aria-hidden": "true" },
  import_react.default.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })
);
var Toast = (0, import_react.memo)(({ remove, id: id2, message, type, options }) => {
  const [isRemove, setIsRemove] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const timer = setTimeout(() => setIsRemove(true), (options == null ? void 0 : options.floatingTime) || 3e3);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return import_react.default.createElement(
    "div",
    { className: `--react--toast-alert${isRemove ? " --toast-hide" : " --toast-show"}`, onAnimationEnd: isRemove ? () => remove(id2) : void 0, onClick: () => setIsRemove(true), style: options == null ? void 0 : options.toastStyle },
    import_react.default.createElement(Icon, { type }),
    message
  );
});
var ToastContainer = (0, import_react.memo)(({ containerStyle, ...defaultOptions }) => {
  const [toasts, setToasts] = (0, import_react.useState)([]);
  const removeToast = (0, import_react.useCallback)((id2) => {
    setToasts((prevToasts) => prevToasts.filter((toast2) => toast2.id !== id2));
  }, []);
  const handler = (0, import_react.useCallback)(({ detail }) => {
    if (detail.options) {
      setToasts((prevToasts) => [...prevToasts, { ...detail, options: { ...defaultOptions, ...detail.options } }]);
      return;
    }
    setToasts((prevToasts) => [...prevToasts, { ...detail, options: defaultOptions }]);
  }, []);
  (0, import_react.useEffect)(() => {
    window.addEventListener("toastAlert", handler);
    return () => {
      window.removeEventListener("toastAlert", handler);
    };
  }, []);
  return import_react.default.createElement("div", { id: "--react--toast-container", style: containerStyle }, toasts.map((toast2) => import_react.default.createElement(Toast, { key: toast2.id, remove: removeToast, ...toast2 })));
});
var id = 0;
function dispatch(type) {
  return (message, options) => {
    window.dispatchEvent(new CustomEvent("toastAlert", {
      detail: { id: ++id, message, options, type }
    }));
  };
}
var toast = {
  info: dispatch("info"),
  success: dispatch("success"),
  warning: dispatch("warning"),
  error: dispatch("error")
};
export {
  ToastContainer,
  toast
};
//# sourceMappingURL=react-custom-alert.js.map
