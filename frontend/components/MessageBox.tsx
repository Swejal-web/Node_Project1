interface IProps {
  secret: string;
}

export default function MessageBox({ secret }: IProps) {
  // *********  This is the secret viewing component ************* //

  return (
    <>
      <h1 className="text-3xl font-bold mt-10 mb-5">
        This Secret Message Is For You:
      </h1>
      <textarea
        className="container max-w-3xl bg-gray-100 rounded-md h-32 border-4 border-grey-600 text-lg"
        defaultValue={secret}
      />
    </>
  );
}
