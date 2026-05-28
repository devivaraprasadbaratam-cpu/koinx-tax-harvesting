interface Gains {
  profits: number;
  losses: number;
}

interface Props {
  title: string;
  stcg: Gains;
  ltcg: Gains;
  background: string;
  savings?: number;
}

export default function HarvestingCard({
  title,
  stcg,
  ltcg,
  background,
  savings,
}: Props) {

  const netSTCG =
    stcg.profits - stcg.losses;

  const netLTCG =
    ltcg.profits - ltcg.losses;

  const realisedCapitalGains =
    netSTCG + netLTCG;

  return (

    <div className={`${background} p-6 rounded-3xl`}>

    <h2 className="text-2xl md:text-4xl font-bold mb-8">
        {title}
      </h2>

      <div className="space-y-8">

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Short-Term
          </h3>

          <div className="space-y-2 text-lg">

            <div className="flex justify-between">
              <span>Profits</span>

              <span className="text-green-400">
                ₹{stcg.profits.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Losses</span>

              <span className="text-red-400">
                ₹{stcg.losses.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between font-bold text-xl mt-4">
              <span>Net Gains</span>

              <span>
                ₹{netSTCG.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Long-Term
          </h3>

          <div className="space-y-2 text-lg">

            <div className="flex justify-between">
              <span>Profits</span>

              <span className="text-green-400">
                ₹{ltcg.profits.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Losses</span>

              <span className="text-red-400">
                ₹{ltcg.losses.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between font-bold text-xl mt-4">
              <span>Net Gains</span>

              <span>
                ₹{netLTCG.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-white/20 mt-8 pt-6">

        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between md:items-center text-xl md:text-2xl font-bold">

          <span>
            Realised Capital Gains
          </span>

          <span>
            ₹{realisedCapitalGains.toFixed(2)}
          </span>

        </div>

      </div>

      {savings && savings > 0 && (

        <div className="mt-6 bg-green-500/20 border border-green-400 text-green-300 p-4 rounded-xl">

          🎉 You're going to save ₹
          {savings.toFixed(2)}

        </div>

      )}

    </div>
  );
}