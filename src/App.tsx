import { useState } from "react";
import HandForm from "./components/HandForm/HandForm";
import AbsForm from "./components/AbsForm/AbsForm";
function App() {
  const [page, setPage] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(false);

  const selectCallback = (formSelected: boolean) => {
    setNextEnabled(formSelected);
  };

  return (
    <div className="p-2 flex lg:h-full sm:h-lvh w-auto gap-4 flex-col font-noto justify-center">
      <div className="rounded-xl shadow-lg shadow-gray-500 p-8 flex flex-col items-center justify-center h-max">
        {page === 0 && <HandForm selectCallback={selectCallback} />}
        {page === 1 && <AbsForm />}
      </div>
      <button
        className="rounded-xl text-2xl font-bold border w-full h-16 bg-[#3dc7f6] disabled:bg-gray-200 disabled:text-gray-400"
        disabled={!nextEnabled}
        onClick={() => {
          setPage(page + 1);
          setNextEnabled(false);
        }}
      >
        ต่อไป
      </button>
    </div>
  );
}

export default App;
