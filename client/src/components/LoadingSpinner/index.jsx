import { PulseLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const LoadingSpinner = ({ loading, color }) => {
  return (
    <PulseLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={15}  
    />
  );
};

export default LoadingSpinner;
