import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <PulseLoader color="#000" loading={loading} css="" size={25} />
      </div>
    </div>
  );
}

export default Loader;