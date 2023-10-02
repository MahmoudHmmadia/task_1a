import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { LineChart } from "@mui/x-charts";
// const socket = io("http://localhost:3500/");
const socket = io("https://task-1-server.onrender.com/");

function App() {
  const [years, setYears] = useState<number[]>([]);
  const [salary, setSalary] = useState<number[]>([]);
  socket.on("connect", () => {});
  useEffect(() => {
    socket.on("receive_message", (d) => {
      setYears([...years, d.year]);
      setSalary([...salary, d.salary]);
    });
  }, [socket, years, salary]);

  return (
    <div className="flex min-h-screen justify-center items-center">
      {salary.length > 0 ? (
        <div className="w-[500px]">
          <LineChart
            xAxis={[
              {
                data: [...years],
              },
            ]}
            series={[
              {
                data: [...salary],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      ) : (
        <h1>Add Values</h1>
      )}
    </div>
  );
}

export default App;
