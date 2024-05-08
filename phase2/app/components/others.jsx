
import * as stats from"@/repos/stats";
import * as buyers from"@/repos/buyers";
const topSeller= await stats.getSellerTop();
const topBuyerTransaction=await stats.getBuyerTop();
const topBuyer= await buyers.get(topBuyerTransaction[0].buyerId)

export default async function OtherStat({  }) {
return (
<div className="join join-vertical w-full  ">
  <div className="collapse collapse-arrow join-item border border-base-300">

    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
     Most Popular seller
    </div>
    <div className="collapse-content"> 
    <div className="stats shadow">
  
  <div className="stat ">
    <div className="stat-title">Name:</div>
    <div className="stat-value">{topSeller[0].username}</div>

  </div>
  
</div><div className="stats shadow">
  
  <div className="stat">
    <div className="stat-title">Number of products sold</div>
    <div className="stat-value">{topSeller[0].totalQuantity}  sold</div>
   
  </div>
  <div className="stat">
    <div className="stat-title">Revenue Gained</div>
    <div className="stat-value">{topSeller[0].totalRevenue} QAR</div>
   
  </div>
  
</div>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
   Top Spender
    </div>
    <div className="collapse-content"> 
    <div className="stats shadow">
  
  <div className="stat ">
    <div className="stat-title">Name:</div>
    <div className="stat-value">{topBuyer.username}</div>

  </div>
  
</div><div className="stats shadow">
<div className="stat">
    <div className="stat-title">Money spent</div>
    <div className="stat-value">{topBuyerTransaction[0]._sum.amountPaid} QAR</div>
   
  </div>
  <div className="stat">
    <div className="stat-title">Number of products bought</div>
    <div className="stat-value">{topBuyerTransaction[0]._sum.quantityBought}  </div>
   
  </div>
</div>
    </div>
  </div>
</div>
)
}