// This file should be named layDesign.js and located in the correct directory

import * as stats from"@/repos/stats";
import * as products from"@/repos/products";
const amountTotal=await stats.getTransactionTotalAllTime();
const pCount=await stats.getTransactionsCount();
const tAvg=await stats.getTransactionAvg();
const topProds= await stats.getTopProducts();
const prod1= await products.get(null,topProds[0].productId);
const prod2= await products.get(null,topProds[1].productId);
const prod3=await products.get(null,topProds[2].productId);
const prod4=await products.get(null,topProds[3].productId);
let prod1Ui=<div className="hidden"></div>;
let prod2Ui=<div className="hidden"></div>;
let prod3Ui=<div className="hidden"></div>;
let prod4Ui=<div className="hidden"></div>;

export default async function GeneralStat({  }) {

  return (
    <div className="  text-center flex flex-col justify-center align-middle">
<div className="stats shadow  bg-gray-300 dark:bg-gray-900  ">
  
  <div className="stat">
    <div className="stat-title">Number of transactions</div>
    <div className="stat-value">{pCount._count.id}  </div>
 
  </div>
  <div className="stat">
    <div className="stat-title">Total Amount Paid</div>
    <div className="stat-value">{amountTotal._sum.amountPaid} QAR</div>
  
  </div>
  <div className="stat">
    <div className="stat-title">Average transaction value</div>
    <div className="stat-value">{tAvg._avg.amountPaid.toFixed(2)} QAR</div>
  
  </div>
  
</div>

{/* collapse start */}
<div className="collapse bg-base-200 my-4">
  <input type="checkbox" /> 
  <div className="collapse-title text-xl font-medium">
Most Popular Products
  </div>
  <div className="collapse-content flex flex-row justify-around flex-wrap"> 
  {prod1Ui}
   {prod2Ui}
  {prod3Ui}
  {prod4Ui}
  </div>
</div>
{/* collapse end */}
  </div>
 
 


  );
}
if(prod1&&topProds[0]){
  prod1Ui=<div className="stats shadow flex flex-col-reverse justify-center align-middle m-7 h-96 bg-gray-300 dark:bg-gray-900">
  
  <div className="stat ">
    <div className="stat-figure text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
     
    </div>
    <div className="stat-title">Amount spent on the product</div>
    <div className="stat-value text-primary">{topProds[0]?._sum.amountPaid} QAR</div>

  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>

    </div>
    <div className="stat-title">Amount sold</div>
    <div className="stat-value text-secondary">{topProds[0]?._sum.quantityBought} Units</div>
   
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar  ">
        <div className="w-16 rounded-full  size-20">
          <img src={prod1?.picture}  style={{ objectFit: "contain" }}/>
         </div>
      </div>
    </div>
 
    <div className="stat-value text-secondary text-2xl   pt-4">{ prod1?.name}</div>

  </div>
  
</div>
}
if(prod2&&topProds[1]){
  prod2Ui=<div className="stats shadow flex flex-col-reverse   justify-center m-7 h-96  bg-gray-300 dark:bg-gray-900">
  
  <div className="stat ">
    <div className="stat-figure text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
     
    </div>
    <div className="stat-title">Amount spent on the product</div>
    <div className="stat-value text-primary">{topProds[1]?._sum.amountPaid} QAR</div>

  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>

    </div>
    <div className="stat-title">Amount sold</div>
    <div className="stat-value text-secondary">{topProds[1]?._sum.quantityBought} Units</div>
   
  </div>
  
  <div className="stat ">
    <div className="stat-figure text-secondary">
      <div className="avatar ">
        <div className="w-16 rounded-full size-20">
          <img src={prod2?.picture} style={{ objectFit: "contain" }}/>
        </div>
      </div>
    </div>
 
    <div className="stat-value text-secondary text-2xl   pt-4 ">{ prod2?.name}</div>

  </div>
  
</div>
}
if(prod3&&topProds[2]){
  prod3Ui=<div className="stats shadow flex flex-col-reverse justify-center align-middle m-7 h-96 bg-gray-300 dark:bg-gray-900">
  
  <div className="stat ">
    <div className="stat-figure text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
     
    </div>
    <div className="stat-title">Amount spent on the product</div>
    <div className="stat-value text-primary">{topProds[2]?._sum.amountPaid} QAR</div>

  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>

    </div>
    <div className="stat-title">Amount sold</div>
    <div className="stat-value text-secondary">{topProds[2]?._sum.quantityBought} Units</div>
   
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar ">
        <div className="w-16 rounded-full size-20">
          <img src={prod3?.picture} style={{ objectFit: "contain" }}/>
        </div>
      </div>
    </div>
 
    <div className="stat-value text-secondary text-2xl   pt-4">{ prod3?.name}</div>

  </div>
  
</div>
}
if(prod4&&topProds[3]){
  prod4Ui=<div className="stats shadow flex flex-col-reverse justify-center align-middle m-7 h-96 bg-gray-300 dark:bg-gray-900">
  
  <div className="stat ">
    <div className="stat-figure text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
     
    </div>
    <div className="stat-title">Amount spent on the product</div>
    <div className="stat-value text-primary">{topProds[3]?._sum.amountPaid} QAR</div>

  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>

    </div>
    <div className="stat-title">Amount sold</div>
    <div className="stat-value text-secondary">{topProds[3]?._sum.quantityBought} Units</div>
   
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar  ">
        <div className="w-16 rounded-full  size-20">
          <img src={prod4?.picture}  style={{ objectFit: "contain" }}/>
         </div>
      </div>
    </div>
 
    <div className="stat-value text-secondary text-2xl   pt-4">{ prod4?.name}</div>

  </div>
  
</div>
}

