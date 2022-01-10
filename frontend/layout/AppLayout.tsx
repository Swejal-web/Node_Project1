import { ErrorProvider } from '@/contextProvider/notificationProvider';
import useStore from '@/zustandStore/store';

export default function AppLayout({ children }: any) {
  const addError = useStore((state) => state.addError);

  return (
    <div className="container max-w-3xl mx-auto">
      <div>
        <h1 className="text-red-600 text-5xl font-bold text-center py-6">
          Secret Sharing{' '}
        </h1>
      </div>
      <ErrorProvider
        value={{
          showError: ({ message }) => {
            addError({ message });
          }
        }}
      >
        <div id="AppLayout">
          <div>{children}</div>
        </div>
      </ErrorProvider>
    </div>
  );
}
