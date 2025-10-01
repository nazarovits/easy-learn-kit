import styles from "./animation.module.css";
export const shakeIt = (el: HTMLElement) => {
  el.classList.add(styles.shakable);
  setTimeout(() => {
    el.classList.remove(styles.shakable);
  }, 500);
};
