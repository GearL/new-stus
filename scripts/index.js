var fontsize;
var now = 0;
var logoclicktime = 0;
window.onload = function(){
    $(".sidebar").hide();
    setTimeout(function(){
        $(".fixed-logo").css("transform","scale(1)");
    },500);
    var w = document.body.clientWidth;
    resized(w);
    bannerall = $(".b-container a");
    for(var i=0;i<bannerall.length;i++){
        if(i==0){
            $(".selector").append('<a class="round active" href="javascript:void(0)"></a>');
        }
        else{
            $(".selector").append('<a class="round" href="javascript:void(0)"></a>');
        }
    }
    bannerwidth = parseInt($(".b-container a").css("width"))/fontsize;
    rounds = $(".round");
    giveRoundsAndBannerNum();
    bannerRun();
    navcome(nownavid);
    bind();
    if(window.onresize !=null){
        eval("theOldFun="+window.onresize.toString()); 
        window.onresize=function(){
            theOldFun();
            bannerselect(now);
        }; 
    }
};
function giveRoundsAndBannerNum(){
    for(var i=0;i<bannerall.length;i++){
        bannerall.eq(i).attr("id","banner"+i);
        rounds.eq(i).attr("id",i);
    }
}
function resized(windowswidth){
    if(windowswidth<=767){
        fontsize= windowswidth/750*30 ;
    }
    else if(windowswidth>=768&&windowswidth<=1366){
        fontsize = windowswidth/1366*30;
    } 
    else if(windowswidth>1366){
        fontsize = 30;
    }
    $("html").css("font-size",fontsize+"px");
}
function bannertouchstart(event){
    touch = event.originalEvent.targetTouches[0];
    firstPos = {
        x : Number(touch.pageX),
        y : Number(touch.pageY)
    };
    event.preventDefault();
}
function bannertouchend(event){
    touch = event.originalEvent.changedTouches[0];
    lastPos = {
        x : Number(touch.pageX),
        y : Number(touch.pageY)
    };
    if(lastPos["x"]>firstPos["x"]){
        time = 0;
        if(now==0){
            bannerselect(bannerall.length-1);
        }
        else{
            bannerselect(now-1);
        }
    }
    else if(lastPos["x"]<firstPos["x"]){
        time = 0;
        if(now==bannerall.length-1){
            bannerselect(0);
        }
        else{
            bannerselect(now+1);
        }
    }
}
function bind(){
    $('.b-container a')
   .on('touchstart', bannertouchstart)
   .on('touchend',bannertouchend);
    //for(var i=bannerall.length-1;i>=0;i--){
    for(var i=0;i<bannerall.length;i++){
        rounds.eq(i).click(function(){ bannerselect(this.id)});
    }
}

var time = 0;
function bannerRun(){
    setInterval(function(){ time += 1; },1);
    setInterval(function(){
        if(time>=2000){
            rounds.eq(now).removeClass("active");
            now = now + 1;
            if(now>=bannerall.length){
                now = 0;
            }
            rounds.eq(now).addClass("active");
            bannerselect(now);
            time = 0;
        }
    },3);
}
function bannerselect(bannerid){
    bannerall.css("left",-bannerid*bannerwidth+"rem");
    time = 0;
    rounds.eq(now).removeClass("active");
    now = parseInt(bannerid);
    rounds.eq(now).addClass("active");
    return false;
}

function sidebaropen(){
    $(".fixed-logo").css("transform","scale(0)");
    $(".sidebar").show();
    setTimeout(function(){
        $(".sidebar").addClass("sidebarout");
        $(".call-back").show();
    },100);
    return false;
}
function sidebarclose(){
    setTimeout(function(){
        $(".fixed-logo").css("transform","scale(1)");
    },500);
    $(".sidebar").removeClass("sidebarout");
    $(".call-back").hide();
    setTimeout(function(){
        $(".sidebar").hide();
    },500);
    return false;
}

function hiddenthings(){
    logoclicktime += 1;
    if(logoclicktime<=5){
        $('html, body').animate({
            scrollTop: '0px'
        }, 800);
    }
    if(logoclicktime==6){
        $(".fixed-logo").css("transform","scale(4)");
        $(".fixed-logo").css("opacity","0");
        setTimeout(function(){
            window.location.href = "http://stu.szu.edu.cn/manage/index";
        },500);
    }
};