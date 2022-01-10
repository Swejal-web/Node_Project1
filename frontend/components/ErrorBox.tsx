import { useState } from 'react';
import useStore from '@/zustandStore/store';

export interface IError {
  message: string;
}

interface IProps {
  errors: IError | undefined;
}

interface IProps2 {
  errorData?: IError;
}

export default function ErrorBox({ errors }: IProps) {
  const [errorSign, setErrorSign] = useState(true);

  const { errorData }: IProps2 = useStore((state) => state.error);

  // *************** errors are the client side error whereas errorData are the server side errors ****************** //

  return (
    <div>
      {errors && errorSign ? (
        <div
          className="container max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded "
          role="alert"
        >
          <strong className="font-bold">{errors.message} </strong>

          <button
            type="button"
            className="ml-80"
            onClick={() => setErrorSign(false)}
          >
            <span>X</span>
          </button>
        </div>
      ) : (
        errorData &&
        errorSign && (
          <div
            className="container max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded "
            role="alert"
          >
            <strong className="font-bold">{errorData.message} </strong>

            <button
              type="button"
              className="ml-80"
              onClick={() => setErrorSign(false)}
            >
              <span>X</span>
            </button>
          </div>
        )
      )}
    </div>
  );
}
