import { Leaderboard as LeaderboardType } from "~/types/leaderboard";

const Leaderboard = ({
  leaderboardList,
}: {
  leaderboardList: LeaderboardType[];
}) => {
  return (
    <div
      className={`w-full min-h-screen bg-primary p-2 text-white text-md pt-24 pb-4 px-4`}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Leaderboard</h3>
      <table className="w-full text-sm">
        <thead className="w-full">
          <tr className="border-y border-y-white w-full hover:bg-white hover:text-primary text-md">
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
      <p className="mt-4 text-xs font-bold text-justify">
        *Keterangan: Akumulasi nilai diperoleh dari nilai kuis dan nilai tes.
        Jika terdapat kesamaan akumulasi nilai, maka posisi akan diurutkan
        berdasarkan waktu saat mengirimkan kuis dan tes.
      </p>
    </div>
  );
};

export default Leaderboard;
