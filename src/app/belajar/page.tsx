import Header from "~/components/layouts/Header";
import LearningCard from "~/components/layouts/LearningCard"



export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header active="belajar"/>
      <div className="w-full  grid grid-cols-4 p-4 gap-2">
        <LearningCard />
        <LearningCard />
        <LearningCard />
        <LearningCard />
        <LearningCard />
        <LearningCard />
        <LearningCard />
        <LearningCard />
      </div>
    </div>
  );
}
