var log = console.log;
// 原生：
// 原生获取dom节点：
// var sum = document.getElementById("and"); 
// var suma = document.getElementById("a");
// var sumb = document.getElementById("b");
// var sliderd = document.getElementById("slider");
// var minusb = document.getElementById("minus");
// var addb = document.getElementById("add");

// sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)'; //'% 为什么要加'  记得连接字符串都要加'

//跳转页面
// function skip() {
//     window.location.href = "../html/homePage.html";
// }

// // 自动赋初始值
// window.onload = function () {
//     sumb.value = Math.floor(sliderd.value / 3);
//     suma.value = sliderd.value - sumb.value;
//     sum.value = sliderd.value;
// }

//输入数字
// function numb() {
//     var su = +sum.value; //可以再前面加一个 +号  作用就是直接转换为数值 
//     if (3 < su && su < 19) { //if语句的条件如果=3 < sum < 19 相当于无条件  因为sum是一个对象（即一个节点） 并不是一个数
//         sliderd.value = su;
//         sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//         console.log(typeof su);
//         sumb.value = Math.floor(su / 3);
//         var sn = +sumb.value; //可以再前面加一个 +号  作用就是直接转换为数值 
//         suma.value = su - sn;
//     }
// }

//滑轮滚动
// pc端
// sliderd.addEventListener("mousemove", function () {
//     log(0);
//     sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     sum.value = sliderd.value;
//     sumb.value = Math.floor(sum.value / 3);
//     suma.value = sum.value - sumb.value;
// });

// 移动端
// sliderd.addEventListener("touchmove", function () {
//     log(1);
//     sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     sum.value = sliderd.value;
//     sumb.value = Math.floor(sum.value / 3);
//     suma.value = sum.value - sumb.value;
// });
// sliderd.addEventListener("touchstart", function () {
//     log(1);
//     sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     sum.value = sliderd.value;
//     sumb.value = Math.floor(sum.value / 3);
//     suma.value = sum.value - sumb.value;
// });
// sliderd.addEventListener("touchend", function () {
//     log(1);
//     sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     sum.value = sliderd.value;
//     sumb.value = Math.floor(sum.value / 3);
//     suma.value = sum.value - sumb.value;
// });

//按减方框
// minusb.addEventListener("click", function () {
//     if (sum.value > 4) {
//         sum.value--;
//         sumb.value = Math.floor(sum.value / 3);
//         suma.value = sum.value - sumb.value;
//         sliderd.value = sum.value;
//         sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     }
// })

//按加方框
// addb.addEventListener("click", function () {
//     if (sum.value < 18) {
//         sum.value++;
//         sumb.value = Math.floor(sum.value / 3);
//         suma.value = sum.value - sumb.value;
//         sliderd.value = sum.value;
//         sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
//     }
// })

//生成一个身份的数组
// var people = [];
// // var peopled = [];//不可以在这里定义 否则数组peopled就会永远都是空数组（除了生成该数组的地方） 因为是全局变量   但是我又得在transmit()函数内获取  shuffle()内的数组peopled 怎么办呢？
// function identity() {
//     for (var i = 0; i < suma.value; i++) {
//         people.push("平民");
//     }
//     for (var j = 0; j < sumb.value; j++) {
//         people.push("杀手");
//     }
//     return people;
// }

// //将上面的身份数组 乱序
// function shuffle() {
//     identity();
//     var peopled = Array(people.length);
//     for (var index = 0; index < people.length; index++) {
//         var rand;
//         rand = ~~(Math.random() * (index + 1));
//         peopled[index] = peopled[rand];
//         peopled[rand] = people[index];
//     }
//     //下面的函数用来 获取上面peopled数组的数据 并传给下一个页面  
//     //为什么这么写呢？因为函数内部的可以读取函数外部的量    
//     function transmit() {
//         sessionStorage.setItem("key", JSON.stringify(peopled));
//         location.href = "./show.html"
//     }
//     return transmit;
// }

// //运行下面的函数 就可以运行函数transmit 看闭包
// function spread() {
//     if ((+sum.value) < 4 || (+sum.value) > 18) {
//         alert("请输入正确的数字");
//     } else {
//         var sds = shuffle();
//         sds();
//         // 保存平民个数
//         var player = suma.value;
//         sessionStorage.setItem("player", player);
//     }
// }



// jQuery
// JQuery 获取DOM节点
var sum = $("#and")[0],
    suma = $("#a")[0],
    sumb = $("#b")[0],
    sliderd = $("#slider")[0],
    minusb = $("#minus")[0],
    addb = $("#add")[0];
// 之所以上面加【0】 是因为不加【0】得到的是 jQuery的dom节点 ；加上【0】则会转换为原生的dom节点 
// 因为jQuery无法使用原生的DOM对象的任何方法，同理原生的DOM对象也不能使用jQuery里的方法
// 之所以有些可以不加【0】 是因为jQuery与原生的DOM对象 有共同的方法 与事件
sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)'; //'% 为什么要加'  记得连接字符串都要加'

// 自动赋初始值
window.onload = function () {
    sumb.value = Math.floor(sliderd.value / 3);
    suma.value = sliderd.value - sumb.value;
    sum.value = sliderd.value;
}
// 返回第一个页面
$(function () {
    $("a").click(function () {
        window.location.href = "../html/homePage.html";
    });
});
// 自动赋初始值
window.onload = function () {
    sumb.value = Math.floor(sliderd.value / 3);
    suma.value = sliderd.value - sumb.value;
    sum.value = sliderd.value;
}
// 输入数字
$(function () {
    $("#and").on("input", function () {
        var su = +sum.value; //可以再前面加一个 +号  作用就是直接转换为数值 
        if (3 < su && su < 19) { //if语句的条件如果=3 < sum < 19 相当于无条件  因为sum是一个对象（即一个节点） 并不是一个数
            sliderd.value = su;
            sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
            console.log(typeof su);
            sumb.value = Math.floor(su / 3);
            var sn = +sumb.value; //可以再前面加一个 +号  作用就是直接转换为数值 
            suma.value = su - sn;
        }
    });
});

//滑轮滚动
// pc端 与 移动端
$(function () {
    $("#slider").on("mousemove touchmove touchstart touchend", function () {
        log(0);
        sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
        sum.value = sliderd.value;
        sumb.value = Math.floor(sum.value / 3);
        suma.value = sum.value - sumb.value;
    });
});

//按减方框
$(function () {
    $("#minus").click(function () {
        if (sum.value > 4) {
            sum.value--;
            sumb.value = Math.floor(sum.value / 3);
            suma.value = sum.value - sumb.value;
            sliderd.value = sum.value;
            sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
        }
    });
});

//按加方框
$(function () {
    $("#add").click(function () {
        if (sum.value < 18) {
            sum.value++;
            sumb.value = Math.floor(sum.value / 3);
            suma.value = sum.value - sumb.value;
            sliderd.value = sum.value;
            sliderd.style.background = 'linear-gradient(to right, black, white ' + (sliderd.value - 4) * 100 / 14 + '%, white)';
        }
    });
});

//生成一个身份的数组
var people = [];
// var peopled = [];//不可以在这里定义 否则数组peopled就会永远都是空数组（除了生成该数组的地方） 因为是全局变量   但是我又得在transmit()函数内获取  shuffle()内的数组peopled 怎么办呢？
function identity() {
    for (var i = 0; i < suma.value; i++) {
        people.push("平民");
    }
    for (var j = 0; j < sumb.value; j++) {
        people.push("杀手");
    }
    return people;
}

//将上面的身份数组 乱序
function shuffle() {
    identity();
    var peopled = Array(people.length);
    for (var index = 0; index < people.length; index++) {
        var rand;
        rand = ~~(Math.random() * (index + 1));
        peopled[index] = peopled[rand];
        peopled[rand] = people[index];
    }
    //下面的函数用来 获取上面peopled数组的数据 并传给下一个页面  
    //为什么这么写呢？因为函数内部的可以读取函数外部的量    
    function transmit() {
        sessionStorage.setItem("key", JSON.stringify(peopled));
        // 页面跳转下面有二种方法：
        // location.href = "./show.html"
        $(location).attr("href", "show.html"); //Location 对象是 Window 对象的一个部分,Location 对象包含有关当前 URL 的信息
    }
    return transmit;
}
$(function () {
    $("button").click(function () {
        if ((+sum.value) < 4 || (+sum.value) > 18) {
            alert("请输入正确的数字");
        } else {
            var sds = shuffle();
            sds();
            // 保存平民个数
            var player = suma.value;
            sessionStorage.setItem("player", player);
        }
    });
});