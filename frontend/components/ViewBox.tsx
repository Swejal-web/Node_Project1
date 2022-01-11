import { Dispatch, SetStateAction } from 'react';
import { UseMutateFunction } from 'react-query';
import { Ipass } from '@/pages/api/secretsApi';
import ErrorBox from './ErrorBox';

interface IProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  secId: string;
  mutate: UseMutateFunction<any, unknown, Ipass, unknown>;
}

export default function ViewBox({ setIsSubmitted, mutate, secId }: IProps) {
  // ************** This is the component for secret with no password ***************** /
  // ********** PasswordBox.ts contains the components to be rendered for secrets with password ********* //

  return (
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mt-10 my-5">Click To Continue</h2>
      <ErrorBox errors={undefined} />
      <button
        className="container max-w-2xl py-3 bg-orange-500 rounded-md text-white font-bold text-2xl my-6"
        type="submit"
        onClick={() => {
          setIsSubmitted(true);
          mutate({ body: { password: '', secretId: secId } });
        }}
      >
        View Secret
      </button>
    </div>
  );
}
