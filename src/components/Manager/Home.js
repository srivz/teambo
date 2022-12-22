import React, { useState } from "react";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";

export default function Home() {
  const [view, setView] = useState(true);
  function handleChange(newValue) {
    setView(newValue);
  }
  return (
    <div>
      {view ? (
        <HomeList
          viewType={view}
          onChange={handleChange}
        />
      ) : (
        <HomeBlock
          viewType={view}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
