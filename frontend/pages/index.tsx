import SecretForm from 'components/SecretForm';

export default function HomePage() {
  return (
    <>
      <div>
        <h3 className=" text-3xl text-center">
          Paste a password, secret message or private link below.
        </h3>
        <p className="text-gray-500 text-lg text-center">
          Keep sensitive info out of your email and chat logs.
        </p>
      </div>

      <SecretForm />
    </>
  );
}
