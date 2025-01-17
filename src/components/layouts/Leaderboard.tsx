import { Leaderboard as LeaderboardType } from "~/types/leaderboard";

const Leaderboard = ({
  leaderboardList,
}: {
  leaderboardList: LeaderboardType[];
}) => {
  return (
    <div className="w-full h-[calc(100vh-80px)] p-2 flex justify-center items-center gap-2">
      <div className="w-full h-full overflow-y-scroll no-scrollbar">
        <div
          className={`w-full min-h-full bg-primary p-2 rounded-md text-white text-md `}
        >
          <table className="w-full text-sm">
            <thead className="w-full">
              <tr className="border-y border-y-white w-full hover:bg-secondary text-md">
                <th className="px-2 py-6 text-center">Peringkat</th>
                <th className="px-2 py-6 text-center">Username</th>
                <th className="px-2 py-6 text-center">Nama Lengkap</th>
                <th className="px-2 py-6 text-center">Akumulasi Nilai*</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {leaderboardList.map((leaderboard, index) => (
                <tr
                  className="border-y border-y-white w-full hover:bg-secondary [&:nth-child(1)]:bg-gold [&:nth-child(2)]:bg-silver [&:nth-child(3)]:bg-bronze"
                  key={index}
                >
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{leaderboard.username}</td>
                  <td className="p-2 text-center">{leaderboard.fullName}</td>
                  <td className="p-2 text-center">
                    {leaderboard.accumulatedMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs font-bold">
            *Keterangan: Akumulasi nilai diperoleh dari nilai kuis dan nilai
            test!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
