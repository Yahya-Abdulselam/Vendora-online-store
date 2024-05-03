// This file should be named layDesign.js and located in the correct directory

import * as stats from"@/repos/stats";
const totalTech= await stats.getTransactionTotalByCategory("tech");
const totalClothing= await stats.getTransactionTotalByCategory("clothing");
const totalBook= await stats.getTransactionTotalByCategory("book");
const totalFurniture= await stats.getTransactionTotalByCategory("furniture");

export default function CatRevenue({  }) {

  return (
    <div className="stats shadow overflow-scroll flex justify-center m-8  bg-gray-300 dark:bg-gray-900 ">
  
    <div className="stat">
      <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current" width="24" height="24"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
      </div>
      <div className="stat-title text-center text-fuchsia-700 dark:text-fuchsia-300">Tech and  Electronics</div>
      <div className="stat-value text-center">{totalTech._sum.amountPaid??0} QAR </div>
    
    </div>
    
    <div className="stat">
      <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current" width="24" height="24"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
      </div>
      <div className="stat-title text-center  text-fuchsia-700 dark:text-fuchsia-300">Clothing and Fashion</div>
      <div className="stat-value text-center">{totalClothing._sum.amountPaid??0} QAR</div>
  
    </div>
    <div className="stat">
      <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
      
        
      </div>
      <div className="stat-title text-center  text-fuchsia-700 dark:text-fuchsia-300">Furniture and home appliances</div>
      <div className="stat-value text-center ">{totalFurniture._sum.amountPaid??0} QAR</div>
  
    </div>
    <div className="stat">
      <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      </div>
      <div className="stat-title text-center  text-fuchsia-700 dark:text-fuchsia-300">Books</div>
      <div className="stat-value">{totalBook._sum.amountPaid??0} QAR</div>
  
    </div></div>
     
  );
}
