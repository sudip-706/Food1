const spanDetector = document.getElementById("span-detector");
const nav = document.getElementById("nav");
const showCase = document.querySelector(".showcase");
const featureSection = document.querySelector(".features");



if(spanDetector){
    
window.addEventListener("load",function(){
    const clients = ["EVERYONE","FITNESS FREAKS","VEGANS","DEVELOPERS"];
    typeWriter(spanDetector,clients);
    
    window.addEventListener("scroll", myfunction);
    
});
}

function typeWriter(spanDetector,clients)
{
    let txt ="";
    let wordIndex = 0;
    let isDeleting = false;
    function typer(){
        let wait=30;
        wordIndex = wordIndex%clients.length;
        const word = clients[wordIndex];
        if (isDeleting==true ){
            txt = word.substring(0,txt.length-1)
        }
        else{
            txt = word.substring(0,txt.length +1)
        }
        spanDetector.textContent=txt;
        const lpause= 2000;
        if(isDeleting==true && txt == ""){
            wordIndex++;
            isDeleting=false;
        }
        // else if(isDeleting==true && txt.length==word.length){
        //     isDeleting=false;
        //     wait = lpause;
        // }
        else if(isDeleting == false && txt.length ==word.length){
            isDeleting=true;
            wait = lpause;
        }
    

    setTimeout(
        
        
        function(){

            console.log("I was printed after a second");
            typer();
        },wait)
    }
    typer();
}

function myfunction() {
    if (window.pageYOffset > featureSection.offsetTop) {
      // console.log("Add Sticky");
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

