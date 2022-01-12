import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import ErrorBox from 'components/ErrorBox';
import { ErrorContext } from '@/contextProvider/notificationProvider';
// import useStore from '@/zustandStore/store';

import * as api from '@/pages/api/secretsApi';

interface secretData {
  secret: string;
  passphrase: string;
  lifetime: string;
}

export interface Isecret {
  body: string;
  expiresAt: string;
  expiresIn: object;
  password: string | null;
  id: string;
}

export default function SecretForm() {
  const router = useRouter();

  const { showError } = useContext(ErrorContext); // Context Api Used for Error Handling

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  // ************ Used React-Query for handling apis ************ //

  const { mutate } = useMutation(api.postSecret, {
    // here, data is the response for the post Api Call
    onSuccess: (data: Isecret) => {
      router.push({
        pathname: `/private/${data.id}`
      });
    },
    // On Promise Reject
    onError: (data: string) => {
      showError({ message: data });
    }
  });

  const formSubmit = async (datas: secretData) => {
    const { secret, passphrase, lifetime } = datas;

    if (isValid) {
      mutate({ body: secret, password: passphrase, expiresIn: lifetime });
    }
  };

  return (
    <>
      <div className="mt-4">
        <ErrorBox />
      </div>
      <form
        className="container mx-auto flex-col"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex justify-center py-6">
          <textarea
            className="container max-w-2xl bg-gray-200 rounded-md h-48 border-2 border-grey-500"
            id="secret"
            placeholder="Secret goes here"
            {...register('secret')}
          />
          {errors.secret && <p>{errors.secret.message}</p>}
        </div>
        <div className="flex flex-col  container max-w-2xl mx-auto rounded-md h-48 border-2 border-grey-500">
          <p className="container px-2 bg-gray-100 w-36 rounded-sm border-2 ">
            Privacy Options
          </p>
          <label htmlFor="passphrase" className="flex justify-center py-5">
            Passphrase:
            <input
              className="container max-w-md bg-gray-100 rounded-md h-8 border-2 mx-2"
              type="text"
              autoComplete="off"
              id="passphrase"
              {...register('passphrase')}
            />
          </label>
          <label htmlFor="lifetime" className="flex justify-center">
            Lifetime:
            <select
              className="container max-w-sm bg-gray-100 rounded-md h-8 border-2  mx-2"
              id="lifetime"
              {...register('lifetime')}
            >
              <optgroup label="Days">
                <option value="3 days">3 days</option>
                <option value="1 day">1 day</option>
              </optgroup>
              <optgroup label="Hours">
                <option value="10 hours">10 hours</option>
                <option value="5 hours">5 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="1 hour">1 hour</option>
              </optgroup>
              <optgroup label="Minutes">
                <option value="5 minutes">30 minutes</option>
                <option value="3 minutes">5 minutes</option>
                <option value="1 minute">1 minute</option>
              </optgroup>
            </select>
          </label>
        </div>
        <div className="flex justify-center py-5">
          <button
            className=" container max-w-2xl py-3 bg-orange-500 rounded-md text-white font-bold text-2xl"
            type="submit"
          >
            Create a Secret Link
          </button>
        </div>
      </form>
    </>
  );
}
