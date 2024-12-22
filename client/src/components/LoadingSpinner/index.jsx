import { MoonLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const LoadingSpinner = ({ loading, color }) => {
  return (
    <MoonLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default LoadingSpinner;
