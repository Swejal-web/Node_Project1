import { createContext } from 'react';

export interface Imsg {
  message: string;
}

export type IErrorContext = {
  showError: (message: Imsg) => void;
};

export const ErrorContext = createContext({
  showError: (_message: Imsg) => {}
} as IErrorContext);

export const ErrorProvider = ErrorContext.Provider;
