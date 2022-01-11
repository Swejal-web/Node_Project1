import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { iPassword } from '@/pages/secret/[id]';

import ErrorBox from './ErrorBox';

interface IProps {
  formSubmit: (datas: iPassword) => Promise<void>;
}

export default function PasswordBox({ formSubmit }: IProps) {
  const schema = yup.object().shape({
    passphrase: yup.string().required()
  });

  // ********* yup library used for password validation on the client side ********* //

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  // ************ Used React-hook-form  ******************* //

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-3xl  font-bold mt-10 ">
        This Secret Requires a Passphrase:
      </h1>
      <div className="mt-5">
        <ErrorBox errors={errors.passphrase} />
      </div>
      <form
        className="container mx-auto flex-col"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="py-6">
          <label htmlFor="passphrase">
            <input
              className="container max-w-xs bg-gray-100 rounded-md h-8 border-2 mx-auto"
              type="password"
              id="passphrase"
              placeholder="Enter your passphrase"
              {...register('passphrase')}
            />
          </label>
        </div>
        <div>
          <button
            className=" container max-w-2xl py-3 bg-orange-500 rounded-md text-white font-bold  text-2xl"
            type="submit"
          >
            View Secret
          </button>
        </div>
      </form>
    </div>
  );
}
