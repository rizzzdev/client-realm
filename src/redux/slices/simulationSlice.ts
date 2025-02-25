import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SimulationState {
  position: number;
  velocity: number;
  time: number;
  timePrime: number;
  length: number;
  lengthPrime: number;
  mass: number;
  massPrime: number;
  momentum: number;
  momentumPrime: number;
  energy: number;
  energiPrime: number;
  isStarted: boolean;
  intervalId: number | null | NodeJS.Timeout;
}

const simulationState: SimulationState = {
  position: 0,
  velocity: 0,
  time: 0,
  timePrime: 0,
  length: 0,
  lengthPrime: 0,
  mass: 0,
  massPrime: 0,
  momentum: 0,
  momentumPrime: 0,
  energy: 0,
  energiPrime: 0,
  isStarted: false,
  intervalId: null,
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState: simulationState,
  reducers: {
    setSimulalation: (
      state: SimulationState,
      action: PayloadAction<SimulationState>
    ) => {
      return { ...state, ...action.payload };
    },
    resetSimulation: (state: SimulationState) => {
      return { ...state, ...simulationState };
    },
  },
});

export const { setSimulalation, resetSimulation } = simulationSlice.actions;
export const simulationReducer = simulationSlice.reducer;
