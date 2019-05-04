var log = console.log;
//获取第二个页面的数据
var data = JSON.parse(sessionStorage.getItem("key"));
log(data);

// 如何加载身份块：
// 方法一：
// //获取boxs 的dom节点
// var boxs=[];
// for(var i=1;i<19;i++){
//     //错解一 
//     // var boxs=document.getElementById("boxi");//"boxi" 这样写i是不会变的
//     //错解二 
//     // var boxs=document.getElementById("box"+i);//这样写最终的boxs只等于box18
//     //正解：
//     //第一步在for的外面定义空数组boxs
//     boxs.push(document.getElementById("box"+i));//该方法就可以得到一个boxs的数组
// }
// console.log( boxs);//为什么会是 对象？ 而不是数组？ 数据类型里没有数组 ，数组的数据类型就是对象
// //获取divs 的dom节点
// var divs=[];
// for(var p =1;p<7;p++){
//   divs.push(document.getElementById("div-"+p));
// }
// console.log(divs);

// //显示大的div 即类选择器为main-there的div  只是为了减少多余的大的div
// var numl=Math.ceil(data.length/3);
// for(var k=0;k<numl;k++){
//     divs[k].style="display:flex";
// }

// //显示小的div  
// for(var j=0;j<data.length;j++){  //为什么对象也可以用data.length？难道是自动转换为数组了吗？是的
//     boxs[j].style="display:flex";
//     console.log(j);
//     //错解一
//     // boxs[j].getElementsByClassName("nei-one").innerHTML=data[j];  错因：该方法获取不了 boxs[j]的子节点
//     // boxs[j].getElementsByClassName("nei-two").innerHTML=j+1;
//     //错解二  
//     // boxs[j].children[0].innerHTML="data[j]";  错因：不应该加双引号
//     // boxs[j].children[1].innerHTML="j+1";
//     //正解：
//     boxs[j].children[0].innerHTML=data[j]; 
//     boxs[j].children[1].innerHTML=j+1;
// }

//方法二  通过dom节点克隆
// var bgi = document.getElementById("bgi");
// var box = document.getElementsByClassName("main-there"); //为什么不可以用id 来克隆身份块？因为id在一个html中必须是唯一的，不可以在多个标签中写多个一样的id 
// // 之所以之前 也可以打印出不同的身份块 是因为我仅仅只是改变了下一个身份块的内容 实际上还是同一个身份块 因为id一样啊   
// // 通过类选择器来获取DOM节点的话 它会生成多个身份块 并且是实质上都不是一个身份块
// var bos = document.getElementsByClassName("box-nei");
// var bgis = document.getElementsByClassName("nei-one");

//克隆身份块
// for (var i = 0; i < data.length - 1; i++) {
//     // var boxs = box.cloneNode(true);//box.cloneNode is not a function 为什么？
//     var boxs = box[0].cloneNode(true); //每次都克隆第一个box的 身份块
//     bgi.appendChild(boxs);
// }

//给身份块的内容赋值
// for (let i = 0; i < data.length; i++) {
//     box[i].style = "display:inline-block";
//     bos[i].children[0].innerHTML = data[i];
//     bos[i].children[1].innerHTML = i + 1;
// }



// jQuery
// 用jQuery获取dom方法克隆身份块：
for (var i = 0; i < data.length - 1; i++) {
     var boxs = $(".main-there").clone(true);
    //  $("#bgi")[0].appendChild(boxs);//会报错 因为上一行 是使用jquery方法克隆得到的boxs 而这一行却用dom原生的方法 所以会混乱导致报错 
    $("#bgi").append(boxs);
    // $("#bgi").append($(".main-there").clone(true));//这一行等于上面二行

}
//用原生的dom方法克隆身份块：
// for (var i = 0; i < data.length - 1; i++) {
//     var boxs = $(".main-there")[0].cloneNode(true); //每次都克隆第一个box的 身份块
//     $("#bgi")[0].appendChild(boxs);
// }
// 之所以上面加【0】 是因为不加【0】得到的是 jQuery的dom节点 ；加上【0】则会转换为原生的dom节点 
// 因为jQuery无法使用原生的DOM对象的任何方法，同理原生的DOM对象也不能使用jQuery里的方法
// 之所以有些可以不加【0】 是因为jQuery与原生的DOM对象 有共同的方法 与事件
var box = $(".main-there"),
    bgis = $(".nei-one");
//给身份块的内容赋值
for (let i = 0; i < data.length; i++) {
    box.eq(i).css("display", "inline-block");
    // 之前不是有var box = $(".main-there")吗？ 那为什么上一行只能对第一个身份块设置上述css样式，下一行却可以为全部的身份快设置css样式？
    // 因为其它的身份快是通过var boxs = box[0].cloneNode(true); 克隆来的 并且var box = $(".main-there")代码位于前面  所以后面的身份块的dom节点不是box；但是依然可通过.main-there获取；
    // 所以要将var box = $(".main-there")代码位于var boxs = box[0].cloneNode(true);之后
    // 当然此时var boxs = box[0].cloneNode(true);应该换成 var boxs = $(".main-there")[0].cloneNode(true);
    // $(".main-there").eq(i).css("display","inline-block");

    // $(box).eq(i).children[1].text(i + 1);
    // 上行报错的原因：jQuery无法使用DOM对象的任何方法，同理DOM对象也不能使用jQuery里的方法. 乱使用会报错。而children[] 为DOM对象的方法
    box.eq(i).find("span.nei-one").text(data[i]);
    box.eq(i).find("span.nei-two").text(i + 1);
}

//页面跳转
$(function () {
    $("button").click(function () {
        location.href = "../html/startGame.html";
    });
});

// 开始游戏之后 再查看法官日志
// 杀手杀平民的下标：
var killCivilian = JSON.parse(sessionStorage.getItem("killCivilian")) || [];
// 玩家投票的下标
var playersVote = JSON.parse(sessionStorage.getItem("playersVote")) || [];
// 将之前被杀的身份 渲染为红色
if (killCivilian) {
    for (let i = 0; i < killCivilian.length; i++) {
        // bgis[killCivilian[i]].style.backgroundColor = "red";
        bgis.eq(killCivilian[i]).css("background-color", "red");
    }
}
if (playersVote) {
    for (let j = 0; j < playersVote.length; j++) {
        // bgis[playersVote[j]].style.backgroundColor = "red";
        bgis.eq(playersVote[j]).css("background-color", "red");
    }
}