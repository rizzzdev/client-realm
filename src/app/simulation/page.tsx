"use client";

import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Button from "~/components/elements/Button";
import Equation from "~/components/elements/Equation";
import Header from "~/components/layouts/Header";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppSelector } from "~/redux/hooks";

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
  isOutputShow: boolean;
}

interface InputListProps {
  htmlFor: string;
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  simulationState: SimulationState;
  value?: number;
}

interface InputProps {
  onSubmit: () => void;
  initialSimulationState: SimulationState;
  simulationState: SimulationState;
  setSimulationState: Dispatch<SetStateAction<SimulationState>>;
}

interface OutputListProps {
  htmlFor: string;
  text: string;
  value: number;
}

interface OutputProps {
  simulationState: SimulationState;
}

interface SimulatorProps {
  initialSimulationState: SimulationState;
  simulationState: SimulationState;
  setSimulationState: Dispatch<SetStateAction<SimulationState>>;
}

// interface InputOutputWrapperProps extends InputProps {

// }

const InputList = (props: InputListProps) => {
  const { htmlFor, onChange, text, simulationState, value } = props;
  return (
    <div className="w-full flex flex-col justify-center items-center text-sm mb-1">
      <label htmlFor={htmlFor} className="w-full">
        <Equation text={text} />
      </label>
      <input
        type="text"
        id={htmlFor}
        className="w-full p-1 outline-none border border-white bg-primary text-white rounded-md"
        onChange={onChange}
        disabled={simulationState.isStarted}
        autoCorrect="off"
        autoComplete="off"
        value={value}
      />
    </div>
  );
};

const Input = (props: InputProps) => {
  const {
    onSubmit,
    initialSimulationState,
    simulationState,
    setSimulationState,
  } = props;

  const handleReset = () => {
    (document.getElementById("input")! as HTMLFormElement).reset();
    // (document.getElementById("mass")! as HTMLInputElement).value = "";
    // (document.getElementById("length")! as HTMLInputElement).value = "";

    clearInterval(simulationState.intervalId as NodeJS.Timeout);
    setSimulationState(initialSimulationState);
  };

  return (
    <form
      className="w-52 bg-white text-primary rounded-md overflow-hidden p-2 absolute top-2 right-2 z-50 hidden md:flex justify-center items-center flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      id="input"
    >
      <InputList
        htmlFor="velocity"
        text="v \; (c)"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            velocity: Number(e.target.value),
          }))
        }
        // value={Number(simulationState.velocity)}
      />
      <InputList
        htmlFor="mass"
        text="m_0 \; (kg)"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            mass: Number(e.target.value),
          }))
        }
      />
      <InputList
        htmlFor="length"
        text="L_0 \; (m)"
        simulationState={simulationState}
        onChange={(e) =>
          setSimulationState((state) => ({
            ...state,
            length: Number(e.target.value),
          }))
        }
        // value={Number(simulationState.length)}
        // value={Number(simulationState.mass)}
      />
      {!simulationState.isStarted && (
        <button
          type="submit"
          className="w-full p-1 bg-primary text-white mt-5 rounded-md"
        >
          Start
        </button>
      )}
      {simulationState.isStarted && (
        <button
          type="submit"
          className="w-full p-1 bg-primary text-white mt-5 rounded-md"
        >
          Stop
        </button>
      )}
      {simulationState.isOutputShow && (
        <button
          onClick={handleReset}
          type="submit"
          className="w-full p-1 bg-primary text-white mt-5 rounded-md"
        >
          Reset
        </button>
      )}
    </form>
  );
};

const OutputList = (props: OutputListProps) => {
  const { htmlFor, value, text } = props;
  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center text-sm mb-1">
      <label htmlFor={htmlFor} className="w-full">
        <Equation text={text} />
      </label>
      <input
        type="text"
        id={htmlFor}
        className="w-full p-1 outline-none border bg-white text-primary rounded-md"
        disabled
        value={value}
      />
    </div>
  );
};

const Output = (props: OutputProps) => {
  const { simulationState } = props;
  return (
    <div className="w-36 border bg-primary text-white rounded-xl overflow-hidden p-2">
      {/* <h3 className="w-full font-bold text-xl mb-5">Output</h3> */}
      <OutputList
        htmlFor="time"
        text="\Delta t_0 \; (s)"
        value={simulationState.time / 1000}
      />
      <OutputList
        htmlFor="mass"
        text="m_0 \; (kg)"
        value={simulationState.mass}
      />
      <OutputList
        htmlFor="length"
        text="L_0 \; (kg)"
        value={simulationState.length}
      />
    </div>
  );
};

const OutputPrime = (props: OutputProps) => {
  const { simulationState } = props;
  return (
    <div className="w-36 border bg-primary text-white rounded-xl overflow-hidden p-2">
      {/* <h3 className="w-full font-bold text-xl mb-5">Output</h3> */}
      <OutputList
        htmlFor="timePrime"
        text="\Delta t \; (s)"
        value={Math.round(simulationState.timePrime) / 1000}
      />
      <OutputList
        htmlFor="massPrime"
        text="m \; (kg)"
        value={Math.round(simulationState.massPrime * 1000) / 1000}
      />
      <OutputList
        htmlFor="length"
        text="L \; (m)"
        value={Math.round(simulationState.lengthPrime * 1000) / 1000}
      />
    </div>
  );
};

// const InputOutputWrapper = (props: InputProps) => {
//   const { onSubmit, simulationState, setSimulationState } = props;
//   return (
//     <div className="w-[30%] h-full flex flex-col justify-start items-center gap-4 z-50">
//       <Input
//         onSubmit={onSubmit}
//         simulationState={simulationState}
//         setSimulationState={setSimulationState}
//       />
//       <Output simulationState={simulationState} />
//     </div>
//   );
// };

const Simulator = (props: SimulatorProps) => {
  const { initialSimulationState, simulationState, setSimulationState } = props;

  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    if (simulationState.position > wrapper!.clientWidth) {
      setSimulationState((state) => ({
        ...state,
        position: -40,
      }));
    }
  }, [simulationState, setSimulationState]);

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
      alert("Please enter velocity!");
      return;
    }

    if (
      Number(simulationState.velocity <= 0) ||
      Number(simulationState.velocity >= 1)
    ) {
      alert("Please enter velocity between 0c and 1c!");
    }

    if (!simulationState.mass) {
      alert("Please enter mass!");
      return;
    }
    if (!simulationState.length) {
      alert("Please enter length!");
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
      isOutputShow: true,
    }));
  };

  return (
    <div className="flex-1 h-full overflow-hidden relative p-8 flex justify-center items-center bg-primary md:bg-simBg">
      <div
        className="w-full h-full hidden md:flex flex-col justify-center items-start gap-40"
        id="wrapper"
      >
        {/* <div className="w-full flex justify-between items-center gap-2 z-[2]"> */}
        <div
          className="w-full flex justify-start items-center z-[2] gap-3"
          style={{ transform: `translateX(${simulationState.position}px)` }}
        >
          <Image
            src="/spaceship.png"
            alt="sim-bg"
            width={2000}
            height={2000}
            className="w-24 z-[2]"
          />

          {simulationState.isOutputShow && (
            <Output simulationState={simulationState} />
          )}

          {simulationState.isStarted && simulationState.velocity && (
            <p className="flex">
              <Equation
                text={`\\rightarrow \\vec{v} = ${simulationState.velocity}c`}
                className="text-white font-bold text-xl"
              />
            </p>
          )}
        </div>
        {/* </div> */}
        <div className="w-full flex justify-start items-center gap-2 z-[2]">
          <Image
            src="/earth.png"
            alt="earth"
            width={2000}
            height={2000}
            className="w-24 z-[2]"
          />
          {simulationState.isOutputShow && (
            <OutputPrime simulationState={simulationState} />
          )}
        </div>
      </div>
      {/* <Image
        src="/sim-bg.jpg"
        alt="sim-bg"
        width={2000}
        height={2000}
        className="w-full h-full absolute top-0 left-0 z-[1] hidden md:block"
      /> */}
      <p className="w-full text-center text-white font-bold md:hidden">
        Untuk pengalaman pengguna yang lebih baik, fitur ini hanya bisa diakses
        melalui perangkat komputer atau laptop.
      </p>
      <Input
        setSimulationState={setSimulationState}
        simulationState={simulationState}
        onSubmit={handleSubmit}
        initialSimulationState={initialSimulationState}
      />
      {/* <InputOutputWrapper
        simulationState={simulationState}
        setSimulationState={setSimulationState}
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
};

const Context = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="w-full md:flex flex-col justify-center items-center gap-2 text-white p-16 hidden absolute z-[60] bg-primary h-full">
      <h3 className="text-3xl font-bold mb-4">Konteks Simulasi</h3>
      <p className="w-full text-justify text-md">
        Pada simulasi berikut ini, terdapat sebuah roket yang bergerak dengan
        kecepatan <Equation text="v" /> dengan <Equation text="v" /> merupakan
        fraksi dari kecepatan cahaya (<Equation text="c" />
        ). Roket tersebut juga memiliki massa sebesar <Equation text="m_0" />{" "}
        dan panjang sebesar <Equation text="L_0" />. Terdapat dua orang
        pengamat, satu pengamat berada di dalam roket dan pengamat lainnya
        berada di permukaan Bumi. Simulasi ini akan menunjukan adanya perbedaan
        pengukuran beberapa besaran seperti waktu, panjang, energi, dan
        sebagainya antara dua orang pengamat yang berada di dua kerangka acuan
        (dalam hal ini, kerangka acuannya adalah roket dan Bumi) yang saling
        bergerak relatif dengan kecepatan konstan. Perbedaan hasil pengukuran
        tersebut merupakan konsekuensi dari teori relativitas khusus yang
        dikembangkan oleh Albert Einstein.{" "}
        <span className="font-bold">
          Simulasi ini merupakan simulasi untuk materi dilatasi waktu, kontraksi
          panjang, dan massa relativistik.
        </span>
      </p>
      <Button
        text="Mulai Simulasi"
        className="bg-white text-primary w-full text-lg font-bold mt-4"
        onClick={onClick}
      />
    </div>
  );
};

const Simulation = () => {
  const [isContextActive, setIsContextActive] = useState(true);
  const userState = useAppSelector((state) => state.user);
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
    isOutputShow: false,
  };
  const [simulationState, setSimulationState] = useState<SimulationState>(
    initialSimulationState
  );

  useInitialize(async () => {
    if (userState.id) {
      await axiosIns.post(
        "/activities",
        {
          activityType: "SIMULATION",
          userId: userState.id,
          message: `Mulai melakukan simulasi.`,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "access-token"
            )}`,
          },
        }
      );
    }
  });

  return (
    <div className="w-full h-screen flex justify-center items-center gap-4 bg-primary pt-20">
      <Header />
      {isContextActive && <Context onClick={() => setIsContextActive(false)} />}
      <Simulator
        initialSimulationState={initialSimulationState}
        simulationState={simulationState}
        setSimulationState={setSimulationState}
      />
    </div>
  );
};

export default Simulation;
