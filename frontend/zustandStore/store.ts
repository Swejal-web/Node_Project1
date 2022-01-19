import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { IError } from 'components/ErrorBox';

const store = (set: any) => ({
  error: {},

  addError: (errorData?: IError) => {
    set((state: any) => ({ error: { ...state.error, errorData } }));
  }
});

const useStore = create(devtools(store));

export default useStore;
