import React from "react";
import { useSelector } from "react-redux";

function PlatformList() {
  const platforms = useSelector((state) => state.platforms.platforms);

  return (
    <div>
      <h2>Available Platforms</h2>

      <ul>
        {platforms.map((platform, index) => (
          <li key={index}>{platform}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformList;