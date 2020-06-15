document.querySelector(".control-buttons span").onclick=function(){

    document.getElementById('start').play();
   

    let yourName=prompt("What is your name ?");
    if(yourName==null || yourName=="")
    {
        document.querySelector(".name span").innerHTML='Unknown';
    }
    else
    {
        document.querySelector(".name span").innerHTML=yourName;

    }
    document.querySelector(".control-buttons").remove();
};


let duration=1100;
let blockContainer=document.querySelector(".memory-game-blocks");
let blocks=Array.from(blockContainer.children);
let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block , index)=>{
block.style.order = orderRange[index];
block.addEventListener('click', function(){
    flipBlock(block);
})
});


function flipBlock(selectedBlock)
{
 selectedBlock.classList.add('is-flipped');
 let allFlippedBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-flipped'));
 
 if(allFlippedBlocks.length===2)
 {
     noClicking();
     hasMatched(allFlippedBlocks[0],allFlippedBlocks[1]);
 }

}


function noClicking()
{
    blockContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blockContainer.classList.remove('no-clicking');
    },duration);

}


function hasMatched(firstBlock,secondBlock)
{
    let triesElement=document.querySelector(".tries span");

   if(firstBlock.dataset.technology === secondBlock.dataset.technology)
   {
     firstBlock.classList.remove('is-flipped');
     secondBlock.classList.remove('is-flipped');

     firstBlock.classList.add('has-match');
     secondBlock.classList.add('has-match');
     document.getElementById('success').play();

   }
   else
   {
       triesElement.innerHTML=parseInt(triesElement.innerHTML)+1
          setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
          },duration);
          document.getElementById('fail').play();
   }

}


function shuffle(Array)
{
  let current=Array.length;
  let temp;
  let random;
  while(current>0)
  {
      random=Math.floor(Math.random()*current);
      current--;
      temp=Array[current];
      Array[current]=Array[random];
      Array[random]=temp;
  }
  return Array;
}

