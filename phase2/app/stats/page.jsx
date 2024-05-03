import * as stats from"@/repos/stats";
import GeneralStat from "@/app/components/generalStat";
import CatRevenue from "@/app/components/catsRev";
import OtherStat from "@/app/components/others";

export default async function Home() {

  return (<main> <GeneralStat/><CatRevenue/> <OtherStat/></main>)

}
