import { memo, useRef } from "react";

function PerformanceMonitor() {
  const renderCount = useRef(0);

  renderCount.current += 1;

  return (
    <div className="performance-monitor">
      <strong>Calendar Render Count:</strong>{" "}
      {renderCount.current}
    </div>
  );
}

export default memo(PerformanceMonitor);