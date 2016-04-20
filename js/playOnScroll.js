function inViewPort (elem) {
  //First get the scroll y position (how far the user scrolled down)
  //var scrollY = document.body.scrollTop;
  var scrollY = (document.documentElement.scrollTop) || (document.body.scrollTop);
  //Now get the height of the viewport
  var screenH=document.body.clientHeight;
  //Also get the y position of the element
  var yPos=elem.offsetTop;
  //And now calculate the maximal y position for elem when it is still visible
  var maxY=scrollY+screenH;

  /*if (yPos>scrollY && yPos<maxY) {
    //It is in the users viewport
    return true;
  } else {
    //It isn't in the users viewport
    return false;
  }*/

  if(scrollY+200 >= yPos){
    if(scrollY>yPos+250){
      return false;
    }
    return true;
  } else {
    return false;
  }
}
 
function checkStart (videoName) {
  var elem = document.getElementById(videoName);
  if (inViewPort(elem)) {
    //elem.load();
    elem.play();
    setTimeout("checkStart('"+videoName+"');", 100);
  } else if (!elem.ended) {
    elem.pause();
    setTimeout("checkStart('"+videoName+"');", 100);
  }
}