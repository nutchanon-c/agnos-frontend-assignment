import { useEffect, useState } from "react";
import HandForm from "./components/HandForm/HandForm";
function App() {
  const [page, setPage] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(false);

  const selectCallback = (formSelected: boolean) => {
    setNextEnabled(formSelected);
  };

  return (
    <div className="p-16 flex gap-4 flex-col">
      <div className="border border-gray-500 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
        <p className="text-xl">จุดไหนที่คุณปวดนิ้วมากที่สุด</p>
        {page === 0 && <HandForm selectCallback={selectCallback} />}
      </div>
      <button
        className="rounded-xl text-2xl font-bold border w-full h-16 bg-[#3dc7f6] disabled:bg-gray-200 disabled:text-gray-400"
        disabled={!nextEnabled}
      >
        ต่อไป
      </button>
    </div>
  );
}

export default App;
