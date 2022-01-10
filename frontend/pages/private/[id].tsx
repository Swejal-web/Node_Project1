import { useQuery } from 'react-query';

import * as api from '@/pages/api/secretsApi';

interface IProps {
  id: string;
}

export default function PrivateId({ id }: IProps) {
  // ******************* This page contains the secret Link to be shared **************** //

  const { data: secret, isLoading } = useQuery(['secret', id], () =>
    api.getSecret(id)
  );

  if (isLoading) {
    return <p className="text-3xl font-bold mt-10 my-5">Loading....</p>;
  }
  console.log(secret);
  return (
    <>
      <h1 className="text-black text-2xl font-medium">Share This Link:</h1>
      <h2 className="container max-w-3xl bg-gray-100 rounded-md h-8 border-2 ">
        http://localhost:3001/secret/{secret.secId}
      </h2>
      {secret.secretPassword && (
        <h2 className="text-gray-500 text-lg ">
          This Secret requires Password
        </h2>
      )}
      <h1 className="text-black text-xl  font-medium mt-4">Secret: </h1>
      <textarea
        className="container max-w-3xl bg-gray-100 rounded-md h-32 border-2 text-lg"
        defaultValue={secret.secretBody}
      />
    </>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;

  return {
    props: { id }
  };
}
