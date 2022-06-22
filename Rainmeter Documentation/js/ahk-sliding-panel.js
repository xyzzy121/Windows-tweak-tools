function ahk_slideout(info){var panel=undefined;var initialPanelStyles={};var width="50%";var slide_time="0.5";var slideOut=false;var z_index="999";var touch_boundary=100
function applyStyles(styles){for(style in styles){panel.style[style]=styles[style];}}
function close(){if(left){panel.style.left="-"+width;}
else{panel.style.right=initialPanelStyles.right;}
slideOut=false;}
function open(){if(left){panel.style.left=0;}
else{panel.style.right=0;}
slideOut=true;}
if(!info||!info.id){console.error("ID of panel not set");}
else{panel=document.getElementById(info.id);}
if(!panel){console.error("Could not get panel using id supplied");}
else{var left=true;if(info.side&&info.side=="right"){left=false;}
if(info.width){width=info.width;}
initialPanelStyles.width=width;if(info.slide_time){slide_time=info.slide_time;}
if(left){initialPanelStyles.transition="left "+slide_time+"s ease";}
else{initialPanelStyles.transition="right "+slide_time+"s ease";}
if(info.z_index){z_index=info.z_index;}
initialPanelStyles.zIndex=z_index;if(left&&window.innerWidth<991){initialPanelStyles.left="-"+width;}
if(left&&window.innerWidth>991){initialPanelStyles.left="0";}
else{initialPanelStyles.right="-"+width;}
if(info.touch_boundary){touch_boundary=(window.innerWidth/100)*info.touch_boundary;}
applyStyles(initialPanelStyles);window.addEventListener("load",function(){window.addEventListener("touchstart",touchStart,false);window.addEventListener("touchmove",touchDrag,false);window.addEventListener("touchend",touchEnd,false);});window.addEventListener("resize",function(){if(left&&window.innerWidth<991){panel.style.left="-"+width;}
if(left&&(slideOut==true)&&window.innerWidth<991){panel.style.left="0";}
if(left&&window.innerWidth>991){panel.style.left="0";}},true);this.toggleMenu=function(){if(slideOut){this.closeMenu();}
else{this.openMenu();}};this.closeMenu=close;this.openMenu=open;}
var dragging=false,dragOffset=undefined,offSetTouch,firstXTouch,firstYTouch,startTime,threshold=50,allowedTime=200,restraint=100
function touchStart(event){var x=event.touches[0].pageX;firstXTouch=x;firstYTouch=event.touches[0].pageY;startTime=new Date().getTime();var within=false;if(!slideOut){if(left&&x<=touch_boundary){within=true;}
else if(!left&&x>=window.innerWidth-touch_boundary){within=true;}}
if(within||slideOut){dragging=true;panel.style.transition="none";dragOffset=x;setPosition(x);}}
function touchDrag(event){if(dragging){setPosition(event.touches[0].pageX);}}
function touchEnd(event){if(dragging){panel.style.transition=initialPanelStyles.transition;var elapsedTime=new Date().getTime()-startTime;var swipeLeft=false;var swipeRight=false;if(elapsedTime<=allowedTime){var lastXTouch=event.changedTouches[0].pageX;var lastYTouch=event.changedTouches[0].pageY;var distX=lastXTouch-firstXTouch;var distY=lastYTouch-firstYTouch;if(Math.abs(distX)>=threshold&&Math.abs(distY)<=restraint){(distX<0)?swipeLeft=true:swipeRight=true;}}
if(left){if(slideOut&&swipeLeft){close()}
else if(!slideOut&&swipeRight){open()}
else if(slideOut&&event.changedTouches[0].pageX>offSetTouch){close();}
else if(offSetTouch>=panel.offsetWidth/2){open();}
else if(offSetTouch<panel.offsetWidth/2){close();}}
else{if(slideOut&&swipeRight){close()}
else if(!slideOut&&swipeLeft){open()}
else if(slideOut&&event.changedTouches[0].pageX<offSetTouch){close();}
else if(window.innerWidth-offSetTouch>=panel.offsetWidth/2){open();}
else if(window.innerWidth-offSetTouch<panel.offsetWidth/2){close();}}
dragging=false;dragOffset=undefined;}}
function setPosition(x){var wWidth=window.innerWidth;if(dragOffset){if(left){if(slideOut){x=panel.offsetWidth-(dragOffset-x);}
else{x=x-dragOffset;}}
else{if(slideOut){x=(wWidth-panel.offsetWidth)+(x-dragOffset);}
else{x=wWidth-(dragOffset-x);}}}
if(left&&x<=panel.offsetWidth){panel.style.left="-"+(panel.offsetWidth-x)+"px";offSetTouch=x;}
else if(!left&&window.innerWidth-x<=panel.offsetWidth){panel.style.right="-"+(panel.offsetWidth-(wWidth-x))+"px";offSetTouch=x;}}}