// src/App.jsx
import { useState } from "react";
import Scene from "./components/Scene";
import "./index.css"; // Ensure this is the file where Tailwind CSS is imported

function App() {
    const [model, setModel] = useState("ShelfW800D400");
    const [distance, setDistance] = useState(0.8);

    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 h-full bg-gray-200 flex flex-col text-black">
                <div className="p-8 pb-0 text-lg font-bold">RARERAW</div>
                <div className="flex-1">
                    <Scene
                        model={model}
                        setModel={setModel}
                        distance={distance}
                        setDistance={setDistance}
                    />
                </div>
            </div>
            <div className="w-1/2 h-full overflow-y-auto">
                <div className="p-8 text-medium">
                    <button
                        className="m-4 py-2 px-4 border border-black box-border"
                        onClick={() => {
                            setModel("DisplayShelfW400D200");
                            setDistance(0.4);
                        }}
                    >
                        W400
                    </button>
                    <button
                        className="m-4 py-2 px-4 border border-black box-border"
                        onClick={() => {
                            setModel("ShelfW800D400");
                            setDistance(0.8);
                        }}
                    >
                        W800
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
