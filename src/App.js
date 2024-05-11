import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [val, setVal] = useState([]);
  const [otherVal, setOtherVal] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const colorDetails = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "black",
    "brown",
  ];

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    const resp = await axios.get(
      "https://8fd85044d6f4480a8a44b0838cc19de9.api.mockbin.io"
    );
    setVal(resp.data);
    setOtherVal(resp.data.slice(0, 10));
  };

  const changeLimit = async () => {
    setLimit(limit + 10);
    setPage(page + 10);
    setOtherVal(val.slice(page, limit));
  };

  return (
    <main className="container">
      <button onClick={changeLimit}>change limit</button>
      <div className="list">
        {otherVal?.map((e, index) => (
          <p
            key={index}
            style={{
              background: colorDetails[Math.floor((index + page) / 7)],
              color: "white",
            }}
          >
            {e.name}
          </p>
        ))}
      </div>
    </main>
  );
}
