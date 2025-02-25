"use client";

import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Equation from "~/components/elements/Equation";

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

interface InputListProps {
  htmlFor: string;
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  simulationState: SimulationState;
}

interface InputProps {
  onSubmit: () => void;
  simulationState: SimulationState;
  setSimulationState: Dispatch<SetStateAction<SimulationState>>;
}

interface OutputListProps {
  htmlFor: string;
  text: string;
  textPrime: string;
  value: number;
  valuePrime: number;
}

interface OutputProps {
  simulationState: SimulationState;
}

interface SimulatorProps {
  simulationState: SimulationState;
  setSimulationState: Dispatch<SetStateAction<SimulationState>>;
}

// interface InputOutputWrapperProps extends InputProps {

// }

const InputList = (props: InputListProps) => {
  const { htmlFor, onChange, text, simulationState } = props;
  return (
    <div className="w-full flex flex-col justify-center items-center text-sm mb-1">
      <label htmlFor={htmlFor} className="w-full">
        <Equation text={text} />
      </label>
      <input
        type="text"
        id={htmlFor}
        className="w-full p-1 outline-none border border-white bg-black rounded-md"
        onChange={onChange}
        disabled={simulationState.isStarted}
        autoCorrect="off"
        autoComplete="off"
      />
    </div>
  );
};

const Input = (props: InputProps) => {
  const { onSubmit, simulationState, setSimulationState } = props;

  return (
    <form
      className="w-full border border-white text-white rounded-xl overflow-hidden p-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3 className="w-full font-bold text-xl mb-5">Input</h3>
      <InputList
        htmlFor="velocity"
        text="v"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            velocity: Number(e.target.value),
          }))
        }
      />
      <InputList
        htmlFor="length"
        text="L_0"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            length: Number(e.target.value),
          }))
        }
      />
      <InputList
        htmlFor="mass"
        text="m_0"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            mass: Number(e.target.value),
          }))
        }
      />
      {!simulationState.isStarted && (
        <button
          type="submit"
          className="w-full p-1 bg-white text-black mt-5 rounded-md"
        >
          Start
        </button>
      )}
      {simulationState.isStarted && (
        <button
          type="submit"
          className="w-full p-1 bg-white text-black mt-5 rounded-md"
        >
          Stop
        </button>
      )}
    </form>
  );
};

const OutputList = (props: OutputListProps) => {
  const { htmlFor, value, valuePrime, text, textPrime } = props;
  return (
    <div className="w-full flex gap-2">
      <div className="w-full flex flex-1 flex-col justify-center items-center text-sm mb-1">
        <label htmlFor={htmlFor} className="w-full">
          <Equation text={text} />
        </label>
        <input
          type="text"
          id={htmlFor}
          className="w-full p-1 outline-none border border-white bg-black rounded-md"
          disabled
          value={value}
        />
      </div>
      <div className="w-full flex flex-1 flex-col justify-center items-center text-sm mb-1">
        <label htmlFor={htmlFor} className="w-full">
          <Equation text={textPrime} />
        </label>
        <input
          type="text"
          id={htmlFor}
          className="w-full p-1 outline-none border border-white bg-black rounded-md"
          disabled
          value={valuePrime}
        />
      </div>
    </div>
  );
};

const Output = (props: OutputProps) => {
  const { simulationState } = props;
  return (
    <div className="w-full border border-white text-white rounded-xl overflow-hidden p-2">
      <h3 className="w-full font-bold text-xl mb-5">Output</h3>
      <OutputList
        htmlFor="time"
        text="\Delta t_0"
        textPrime="\Delta t"
        value={simulationState.time / 1000}
        valuePrime={Math.round(simulationState.timePrime) / 1000}
      />
      <OutputList
        htmlFor="mass"
        text="m_0"
        textPrime="m"
        value={simulationState.mass}
        valuePrime={Math.round(simulationState.massPrime * 1000) / 1000}
      />
      <OutputList
        htmlFor="length"
        text="L_0"
        textPrime="L"
        value={simulationState.length}
        valuePrime={Math.round(simulationState.lengthPrime * 1000) / 1000}
      />
    </div>
  );
};

const InputOutputWrapper = (props: InputProps) => {
  const { onSubmit, simulationState, setSimulationState } = props;
  return (
    <div className="w-[20%] h-full flex flex-col justify-start items-center gap-4">
      <Input
        onSubmit={onSubmit}
        simulationState={simulationState}
        setSimulationState={setSimulationState}
      />
      <Output simulationState={simulationState} />
    </div>
  );
};

const Simulator = (props: SimulatorProps) => {
  const { simulationState, setSimulationState } = props;

  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    if (simulationState.position > wrapper!.clientWidth) {
      setSimulationState((state) => ({
        ...state,
        position: -40,
      }));
    }
  }, [simulationState, setSimulationState]);

  return (
    <div className="flex-1 h-full rounded-xl overflow-hidden relative p-4">
      <div
        className="w-full h-full  flex flex-col justify-center items-start gap-40"
        id="wrapper"
      >
        <div className="w-full flex justify-between items-center gap-2 z-[2]">
          <div
            className="flex justify-start items-center"
            style={{ transform: `translateX(${simulationState.position}px)` }}
          >
            <Image
              src="/spaceship.png"
              alt="sim-bg"
              width={2000}
              height={2000}
              className="w-40 z-[2]"
            />

            {simulationState.isStarted && simulationState.velocity && (
              <Equation
                text={`\\rightarrow \\vec{v} = ${simulationState.velocity}c`}
                className="text-white font-bold text-xl"
              />
            )}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 z-[2]">
          <Image
            src="/earth.png"
            alt="earth"
            width={2000}
            height={2000}
            className="w-40 z-[2]"
          />
        </div>
      </div>
      <Image
        src="/sim-bg.jpg"
        alt="sim-bg"
        width={2000}
        height={2000}
        className="w-full h-full absolute top-0 left-0 z-[1]"
      />
    </div>
  );
};

const Simulation = () => {
  const initialSimulationState: SimulationState = {
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
  const [simulationState, setSimulationState] = useState<SimulationState>(
    initialSimulationState
  );

  const handleSubmit = () => {
    if (simulationState.isStarted) {
      clearInterval(simulationState.intervalId as NodeJS.Timeout);
      setSimulationState((state) => ({
        ...state,
        intervalId: null,
        isStarted: false,
      }));
      return;
    }

    if (!simulationState.velocity) {
      alert("Please enter velocity");
      return;
    }
    if (!simulationState.mass) {
      alert("Please enter mass");
      return;
    }
    if (!simulationState.length) {
      alert("Please enter length");
      return;
    }

    const interval = setInterval(() => {
      setSimulationState((state) => ({
        ...state,
        position: state.position + state.velocity * 100,
        time: state.time + 100,
      }));

      setSimulationState((state) => ({
        ...state,
        timePrime: state.time / Math.sqrt(1 - state.velocity ** 2),
        massPrime: state.mass / Math.sqrt(1 - state.velocity ** 2),
        lengthPrime: state.length * Math.sqrt(1 - state.velocity ** 2),
      }));
    }, 100);

    setSimulationState((state) => ({
      ...state,
      isStarted: true,
      intervalId: interval,
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  p-4 gap-4 bg-black">
      <Simulator
        simulationState={simulationState}
        setSimulationState={setSimulationState}
      />
      <InputOutputWrapper
        simulationState={simulationState}
        setSimulationState={setSimulationState}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Simulation;
