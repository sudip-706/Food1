if(d!=document){
    d= document
}
const stripe = Stripe('pk_test_e138aY3XuZNf0WNRNVfMv5P200iswwNOoE');
const paymentBtn = d.querySelectorAll(".payment");


async function payementHelper(planId) {
    const response = await axios.post("/api/bookings/createSession", { planId });
    if (response.data.status) {
      const { session } = response.data;
      const id = session.id;
      stripe.redirectToCheckout({
        sessionId: id
      }).then(function (result) {
        alert(result.error.message);
      });
  
    } else {
      alert("Payment failed");
    }
  }

// if(paymentBtn){
//     console.log(paymentBtn)
//     paymentBtn.addEventListener("click",function(e){
//         e.preventDefault();
//         const planId = paymentBtn.getAttribute("plan-id"); //from imhungry memory
//         payementHelper(planId);
//     })
// }

     
    // if(paymentBtn){
    
    // for(i=0;i<paymentBtn.length;i++){
    //     var paymentBtnA = paymentBtn[i]
    //     paymentBtn[i].addEventListener("click",function(e){
    //     console.log(paymentBtn[i])
    //     e.preventDefault();
    //     const planId = paymentBtnA.getAttribute("plan-id"); //from imhungry memory
    //     payementHelper(planId);}
    // )}
    //     }
    if(paymentBtn){
    
        for(i=0;i<paymentBtn.length;i++){
            // var paymentBtnA = paymentBtn[i]
            paymentBtn[i].addEventListener("click",function(e){
            
            console.log(paymentBtn)
            e.preventDefault();
            const planId = this.getAttribute("plan-id"); //from imhungry memory
            payementHelper(planId);}
        )}
            }