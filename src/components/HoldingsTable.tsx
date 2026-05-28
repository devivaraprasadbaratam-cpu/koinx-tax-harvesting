interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;

  stcg: {
    balance: number;
    gain: number;
  };

  ltcg: {
    balance: number;
    gain: number;
  };
}

interface Props {
  holdings: Holding[];
  selectedCoins: string[];
  toggleCoin: (coin: string) => void;
  toggleAllCoins: () => void;
}

export default function HoldingsTable({
  holdings,
  selectedCoins,
  toggleCoin,
  toggleAllCoins,
}: Props) {

  return (

    <div className="overflow-x-auto mt-8 rounded-2xl border border-gray-800">

      <table className="w-full text-left border-collapse">

        <thead className="bg-[#1A1F2E] text-white">

          <tr>

            <th className="p-4">

  <input
    type="checkbox"
    checked={
      selectedCoins.length === holdings.length
    }
    onChange={toggleAllCoins}
    className="w-4 h-4 cursor-pointer accent-blue-500"
  />

</th>

            <th className="p-4">
              Asset
            </th>

            <th className="p-4">
              Holdings
            </th>

            <th className="p-4">
              Current Price
            </th>

            <th className="p-4">
              Short-Term Gain
            </th>

            <th className="p-4">
              Long-Term Gain
            </th>

            <th className="p-4">
              Amount to Sell
            </th>

          </tr>

        </thead>

        <tbody>

          {holdings.length === 0 ? (

  <tr>

    <td
      colSpan={7}
      className="text-center p-10 text-gray-400"
    >
      No holdings found
    </td>

  </tr>

) : (

  holdings.map((holding, index) => {

    const selected =
      selectedCoins.includes(holding.coin);

    return (

      <tr
        key={holding.coin + index}
        className={`border-t border-gray-800 transition-all duration-300 hover:bg-[#1D2745] ${
          selected
            ? "bg-[#1D2745]"
            : "bg-[#0B1220]"
        }`}
      >

        <td className="p-4">

          <input
            type="checkbox"
            checked={selected}
            onChange={() =>
              toggleCoin(holding.coin)
            }
            className="w-4 h-4 cursor-pointer accent-blue-500"
          />

        </td>

        <td className="p-4">

          <div className="flex items-center gap-3">

            <img
              src={holding.logo}
              alt={holding.coin}
              className="w-10 h-10 rounded-full"
            />

            <div>

              <div className="font-semibold">
                {holding.coin}
              </div>

              <div className="text-gray-400 text-sm">
                {holding.coinName}
              </div>

            </div>

          </div>

        </td>

        <td className="p-4">

          <div>
            {holding.totalHolding.toFixed(4)}
          </div>

          <div className="text-gray-400 text-sm">
            Avg: ₹
            {holding.averageBuyPrice.toFixed(2)}
          </div>

        </td>

        <td className="p-4">
          ₹
          {holding.currentPrice.toFixed(2)}
        </td>

        <td className="p-4">

          <div className="text-green-400">
            ₹
            {holding.stcg.gain.toFixed(2)}
          </div>

          <div className="text-gray-400 text-sm">
            Balance:{" "}
            {holding.stcg.balance.toFixed(4)}
          </div>

        </td>

        <td className="p-4">

          <div className="text-green-400">
            ₹
            {holding.ltcg.gain.toFixed(2)}
          </div>

          <div className="text-gray-400 text-sm">
            Balance:{" "}
            {holding.ltcg.balance.toFixed(4)}
          </div>

        </td>

        <td className="p-4">

          {selected
            ? holding.totalHolding.toFixed(4)
            : "-"}

        </td>

      </tr>

    );

  })

)}
        </tbody>

      </table>

    </div>
  );
}