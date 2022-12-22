import React, { useState } from "react";
import HomeBlock from "./HomeBlock";
import HomeList from "./HomeList";

export default function Home() {
  const [viewType, setViewType] = useState();
  function handleChange(newValue) {
    setViewType(newValue);
  }
  return (
    <div>
      {viewType ? (
        <HomeBlock
          viewType={viewType}
          onChange={handleChange}
        />
      ) : (
        <HomeList
          viewType={viewType}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
