import * as stats from"@/repos/stats";
import GeneralStat from "@/app/components/generalStat";
import CatRevenue from "@/app/components/catsRev";
import OtherStat from "@/app/components/others";
const s=await stats.getTransactionStandardDeviation();

const a=await stats.getAvgLastMonth();
export default async function Home() {

  return (<main className="flex flex-col  justify-center  "> <GeneralStat/>
  <div className="stats shadow  m-auto w-1/2  text-center bg-gray-300 dark:bg-gray-900  ">
  
  <div className="stat ">
    <div className="stat-title">Standard deviation of transactions in the last month</div>
    <div className="stat-value text-center">${s.toFixed(2)}  </div>
 
  </div><div className="stat ">
    <div className="stat-title">Average transactions in the last month</div>
    <div className="stat-value text-center">${a.toFixed(2)}  </div>
 
  </div></div><CatRevenue/> <OtherStat/></main>)

}
