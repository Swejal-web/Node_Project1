import { useState, useContext } from 'react';
import { useMutation } from 'react-query';

import MessageBox from 'components/MessageBox';
import ErrorBox from '@/components/ErrorBox';
import PasswordBox from '@/components/PasswordBox';
import ViewBox from '@/components/ViewBox';
import { ErrorContext } from '@/contextProvider/notificationProvider';
import * as api from '@/pages/api/secretsApi';

export interface iPassword {
  passphrase: string;
}

interface IGetSecret {
  secId: string;
  secretBody: string;
  secretPassword: string;
  message: string;
}

interface IProps {
  secretData: IGetSecret;
}

export default function SecretId({ secretData }: IProps) {
  // *************** This is the shared link secret Page **************** //

  console.log(secretData);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { showError } = useContext(ErrorContext);

  if (secretData.message) {
    showError({ message: secretData.message });
  }

  const {
    mutate,
    data: secret,

    isLoading
  } = useMutation(api.shareSecret, {
    onSuccess: () => setIsSubmitted(true),
    onError: (errorData: string) => {
      showError({ message: errorData });
    }
  });

  if (isLoading) {
    return (
      <p className="text-3xl font-bold mt-10 my-5">Your Secret is Loading...</p>
    );
  }

  const { secretPassword, secId } = secretData;

  const formSubmit = async (datas: iPassword) => {
    const { passphrase } = datas;

    mutate({ body: { password: passphrase, secretId: secId } });
  };

  return (
    <div>
      {secretData.message ? (
        <ErrorBox errors={undefined} />
      ) : secretPassword ? (
        isSubmitted ? (
          <MessageBox secret={secret} />
        ) : (
          <PasswordBox formSubmit={formSubmit} />
        )
      ) : isSubmitted ? (
        <MessageBox secret={secret} />
      ) : (
        <ViewBox
          setIsSubmitted={setIsSubmitted}
          mutate={mutate}
          secId={secId}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;

  const secretData = await api.getSecret(id);
  return {
    props: { secretData }
  };
}
