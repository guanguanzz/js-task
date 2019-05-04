var log = console.log;
// var circled = document.getElementById("circle");
// var newsd = document.getElementById("news");
// var nums = document.getElementById("num");
// var bags = document.getElementById("bag");
// var stars = document.getElementById("star");

//获取上个页面的数据
var data = JSON.parse(sessionStorage.getItem("key"));

//错解一
// function fs(){
//     for(var i=1;i<2*data.length;i++){
//         log(i);
//         if(i%2 != 0){
//             document.getElementById("circle").innerHTML= i;
//         }else{
//             document.getElementById("circle").innerHTML= i/2;
//         }

//     }
// }

//正解：
// var i = 0; //在这里设置 每次运行函数fs() 会随着函数的运行次数 增加而增加 因为在函数内并没有将i恢复到0，所以i变量的值会一直保存，并且随着函数的运行次数不断增加 
// var j = 1;
// var p = 0;

// function fs() {
//     // var i = 0;//在这里设置i是不会随着fs()的运行次数 而增加  因为在这里设置 就相当于每次运行函数fs() 都会被重新赋值为0
//     i++;
//     log(i);
//     if (i < 2 * data.length + 1) {
//         if (i % 2 != 0) { //奇数页
//             circled.innerHTML = j;
//             // newsd.innerHTML="隐藏并传递给"+j+1+"号";//不可以这样写 会自动变为字符串 即 11  21 31 41 51 ..
//             var x = j + 1;
//             if (x < data.length + 1) {
//                 newsd.innerHTML = "隐藏并传递给" + x + "号";
//             } else {
//                 newsd.innerHTML = "法官查看";
//             }
//             //传递身份
//             nums.innerHTML = data[p];
//             p++;
//             //隐藏大图
//             bags.style.display = "none";
//             //加载小图
//             stars.style.display = "block";
//         } else { //偶数页        
//             j++;
//             if (j < data.length + 1) {
//                 circled.innerHTML = j;
//                 newsd.innerHTML = "查看" + j + "号身份";
//             } else {
//                 //页面跳转
//                 location.href = "../html/judgeShow.html";
//             }
//             //加载大图
//             bags.style.display = "block";
//             //隐藏小图
//             stars.style.display = "none";
//         }
//     }
// }

// // 返回
// function goBack() {
//     location.href = "../html/allot.html";
//     sessionStorage.clear();
// }

// // 退出
// function quit() {
//     var mymessage = confirm("你确定要退出游戏吗？");
//     if (mymessage == true) {
//         location.href = "../html/homePage.html";
//         sessionStorage.clear();
//     }
// }


// jQuery
var circled = $("#circle"),
    newsd = $("#news"),
    nums = $("#num"),
    bags = $("#bag"),
    stars = $("#star"),
    i = 0, //在这里设置 每次运行函数fs() 会随着函数的运行次数 增加而增加 因为在函数内并没有将i恢复到0，所以i变量的值会一直保存，并且随着函数的运行次数不断增加 
    j = 1,
    p = 0;
$(function () {
    $("#news").click(function () {
        // var i = 0;//在这里设置i是不会随着fs()的运行次数 而增加  因为在这里设置 就相当于每次运行函数fs() 都会被重新赋值为0
        i++;
        log(i);
        if (i < 2 * data.length + 1) {
            if (i % 2 != 0) { //奇数页

                circled.text(j);
                // newsd.innerHTML="隐藏并传递给"+j+1+"号";//不可以这样写 会自动变为字符串 即 11  21 31 41 51 ..
                var x = j + 1;
                if (x < data.length + 1) {                 
                    newsd.text( "隐藏并传递给" + x + "号");
                } else {
                    newsd.text("法官查看");
                }
                //传递身份
                nums.text(data[p]);
                p++;
                //隐藏大图
                bags.css("display","none");
                //加载小图
                stars.css("display", "block");
            } else { //偶数页        
                j++;
                if (j < data.length + 1) {
                    circled.text(j);
                    newsd.text(  "查看" + j + "号身份");
                } else {
                    //页面跳转
                    location.href = "../html/judgeShow.html";
                }
                //加载大图
                bags.css("display","block");
                //隐藏小图
                stars.css("display", "none");
            }
        }
    });
});
// 返回
$(function () {
    $(".return").click(function () {
        location.href = "../html/allot.html";
        sessionStorage.clear();
    });
});
// 退出
$(function () {
    $("h2").click(function () {
        var mymessage = confirm("你确定要退出游戏吗？");
        if (mymessage == true) {
            location.href = "../html/homePage.html";
            sessionStorage.clear();
        }
    });
});