import Image from "next/image";

export default function LearningCard() {
  return (
    <div className="w-full flex flex-col justify-center items-center border-[2px] border-color5 rounded-md overflow-hidden hover:shadow-md hover:shadow-color5 hover:-translate-y-1">
      <Image src="/einstein.jpg" alt="img" width={400} height={400} className="w-full aspect-video object-cover"/>
      <h3 className="w-full font-bold p-2 m-2 text-color5 text-center">Pendahuluan Relativitas</h3>
      <p className="w-full text-justify text-color5 p-2 m-2 text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa praesentium tempora mollitia inventore perferendis excepturi dicta quos maxime corporis optio natus, vel nesciunt quod! Nihil at nesciunt inventore. Nobis tenetur nostrum id minima enim explicabo perferendis aut neque, consequuntur hic!
      </p>
      <button className="w-[90%] p-2 m-2 bg-color4 text-white rounded-lg hover:bg-color5 font-bold text-sm">
        MULAI BELAJAR
      </button>
    </div>
  )
}