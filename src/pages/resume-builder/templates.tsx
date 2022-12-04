import React from "react";

import NotionTemplate from "src/components/NotionTemplate";

function template() {
  return (
    <div>
      <div className="w-[200px] overflow-hidden">
        <div className="h-80 w-[400px] overflow-hidden select-none bg-red-400 text-[9px]">
          <NotionTemplate
            style={{
              transform: "scale(0.5,0.5)",
              transformOrigin: "top left",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default template;
