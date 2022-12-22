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
        <HomeList
          viewType={viewType}
          onChange={handleChange}
        />
      ) : (
        <HomeBlock
          viewType={viewType}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
