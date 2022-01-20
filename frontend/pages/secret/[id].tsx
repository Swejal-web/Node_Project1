import { useContext } from 'react';
import { useMutation } from 'react-query';

import ErrorBox from 'components/ErrorBox';
import PasswordBox from 'components/PasswordBox';
import ViewBox from 'components/ViewBox';
import { ErrorContext } from 'contextProvider/notificationProvider';
import * as api from 'pages/api/secretsApi';

export interface iPassword {
  passphrase: string;
}

interface IGetSecret {
  secId: string;
  secretBody: string;
  secretProtected: boolean;
  message: string;
}

interface IProps {
  secretData: IGetSecret;
}

export default function SecretId({ secretData }: IProps) {
  // *************** This is the shared link secret Page **************** //

  const { showError } = useContext(ErrorContext);

  // secretData.message contains the error if the id is expired

  if (secretData.message) {
    showError({ message: secretData.message });
  }

  const {
    mutate,
    data: secret,

    isLoading
  } = useMutation(api.shareSecret, {
    onError: (errorData: string) => {
      showError({ message: errorData });
    }
  });

  if (isLoading) {
    return (
      <p className="text-3xl font-bold mt-10 my-5">Your Secret is Loading...</p>
    );
  }

  const { secretProtected, secId } = secretData;

  const formSubmit = async (datas: iPassword) => {
    const { passphrase } = datas;

    mutate({ body: { password: passphrase, secretId: secId } });
  };

  // if the id is expired just show ErrorBox else show (PasswordBox || ViewBox)

  return (
    <>
      {secretData.message ? (
        <ErrorBox />
      ) : secretProtected ? (
        <PasswordBox formSubmit={formSubmit} secret={secret} />
      ) : (
        <ViewBox mutate={mutate} secId={secId} secret={secret} />
      )}
    </>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;

  const secretData = await api.getSecret(id);
  return {
    props: { secretData }
  };
}
