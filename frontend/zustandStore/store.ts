import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Isecret } from 'components/SecretForm';
import { IError } from 'components/ErrorBox';

const store = (set: any) => ({
  secret: {},
  error: {},
  addSecret: (secretData?: Isecret) => {
    set((state: any) => ({ secret: { ...state.secret, secretData } }));
  },
  addError: (errorData?: IError) => {
    set((state: any) => ({ error: { ...state.error, errorData } }));
  }
});

const useStore = create(devtools(store));

export default useStore;
