import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#ea2f5e"
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
}
