import toast from 'react-hot-toast';

export default function Error() {
  return (
    <>
      <p>{toast.error('Sorry! Something went wrong')}</p>
    </>
  );
}
