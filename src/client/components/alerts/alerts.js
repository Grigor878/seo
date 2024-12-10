import toast from "react-hot-toast";

// export function loading(text) {
//   toast.loading(text);
// }

export function success(text) {
  // toast.dismiss(loading());
  toast.success(text, {
    className: "custom-toast",
  });
}

export function error(text) {
  toast.error(text, {
    className: "custom-toast",
  });
}
