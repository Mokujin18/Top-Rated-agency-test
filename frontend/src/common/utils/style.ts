import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function twM(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setStylesToElement = (element: Element, ...styles: string[]) => {
  for (let i = 0; i < styles.length; i++) {
    element.classList.toggle(styles[i]);
  }
};

export const setStylesToElementByClassName = (className: string, ...styles: string[]) => {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    setStylesToElement(elements[i], ...styles);
  }
};
