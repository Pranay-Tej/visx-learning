import { createContext, useState } from "react";

type BrushChartData = {
  selectedDates: string[] | null;
  setSelectedDates: (dates: string[] | null) => void;
};

export const BrushChartContext = createContext<BrushChartData>(
  {} as BrushChartData
);

export const BrushChartContextProvider = (props: {
  children: React.ReactElement;
}) => {
  const [selectedDates, setSelectedDates] = useState<string[] | null>(null);

  return (
    <BrushChartContext.Provider
      value={{
        selectedDates,
        setSelectedDates,
      }}
    >
      {props.children}
    </BrushChartContext.Provider>
  );
};
