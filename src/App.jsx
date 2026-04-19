import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 My React App</h1>
      <p>Welcome Varun 👋</p>

      <h2>Counter: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment ➕
      </button>

      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
        Decrement ➖
      </button>
    </div>
  );
}

export default App;