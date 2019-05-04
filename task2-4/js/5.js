// 5-7js页面的部分内容我没有用jQuery
var log = console.log;
//获取第二个页面的数据
var data = JSON.parse(sessionStorage.getItem("key"));
//获取杀手杀的平民数据
var killCivilian = JSON.parse(sessionStorage.getItem("killCivilian"));
// 获取玩家投票投死的玩家数据
var playersVote = JSON.parse(sessionStorage.getItem("playersVote"));
// 注意：跨页传输的数据不可以为undefined 因为JSON不可以把空的转换
// dom
var list = document.getElementsByClassName("main-one"),
    kill = document.getElementsByClassName("kill"),
    ghostSpeak = document.getElementsByClassName("ghostSpeak"),
    gamerSpeak = document.getElementsByClassName("gamerSpeak"),
    gamerVote = document.getElementsByClassName("gamerVote"),
    day = document.getElementsByClassName("day"),
    killNew = document.getElementsByClassName("killNew"),
    playNew = document.getElementsByClassName("playNew"),
    atten = document.getElementById("atten"),
    one = document.getElementsByClassName("one"),
    pointer = document.getElementsByClassName("pointer"),
    bgBay = document.getElementsByClassName("bg-day"),
    two = document.getElementsByClassName("two"),
    there = document.getElementsByClassName("there"),
    four = document.getElementsByClassName("four"),
    box = document.getElementsByClassName("div-two");

var date = 1;
//创建天数数组
var daysArray = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

var n = sessionStorage.getItem("n") || 3;
if (date) {
    let dates = daysArray[1];
    day[0].innerHTML = "第" + dates + "天";
}

if (playersVote != null) {
    log(playersVote.length);
    var d = playersVote.length;
    for (let i = 0; i < d; i++) {
        // list[i].style = "display:none";//为什么不可以在这里隐藏？因为在这里隐藏的话 它会先隐藏再克隆 然后克隆的list也会是隐藏的 因为css样式也会被克隆 所以这行应该写在克隆之后
        let datess = daysArray[i + 2];
        var days = bgBay[i].cloneNode(true);
        atten.appendChild(days);
        var lists = list[i].cloneNode(true);
        atten.appendChild(lists);
        day[i + 1].innerHTML = "第" + datess + "天";
        list[i].classList.add("display");
    }
} else {
    d = 0;
}
sessionStorage.setItem("d", d);

//给所有的day加点击隐藏、显示列表  事件：  因为是所有 ，所以加for（即给所有day加点击事件）
for (let i = 0; i <= d; i++) {
    bgBay[i].onclick = function () {
        // 方法一：
        // if (list[i].style.display === 'none') {//注意 这里必须加上至少二个等号  加一个等号if的条件会永远都是true，因为此时list[i].style.display = 'none' 就相当于一个非空的字符串 所以永远为true；
        // // 加上二个以上的等号 list[i].style.display === 'none' 这句话的判断才转为 list[i].style.display是否等于none  ，并且左右两边要求都要是字符串 才为true
        //     list[i].style.display = 'flex'
        // } else {
        //     list[i].style.display = 'none'
        // }
        // 方法二：
        list[i].classList.toggle("display");
    }
}

//将上面的做法 换成 下面的写法
// $("button").click(function(){
//     $("p").toggle();
//   });
// for (let i = 0; i < days; i++) {        //遍历点击事件  显示或影藏
//     daybtn[i].onclick = function () {
//         order[i].classList.toggle("none");
//     }
// }
// 将 保存的状态(sessionStorage.state) 赋值给 state   如果保存的状态(sessionStorage.state)为 false    则将"firstStep"赋值给state

var state = sessionStorage.state || "firstStep"; //得到状态之后赋值给 init: state,

//定义一个有限状态机：
var fsm = new StateMachine({
    // 当前状态
    init: state,
    // 状态转换
    //下面一共有4种状态 : firstStep secondStep thirdStep fourStep
    transitions: [{
            name: 'kill', //只要运行了函数fsm.kill() 有限状态机 就会自动将状态从firstStep 变成 secondStep  下面的name也一样
            from: 'firstStep',
            to: 'secondStep'
        },
        {
            name: 'ghostSpeak',
            from: 'secondStep',
            to: 'thirdStep'
        },
        {
            name: 'gamerSpeak',
            from: 'thirdStep',
            to: 'fourStep'
        },
        {
            name: 'gamerVote',
            from: 'fourStep',
            to: 'firstStep'
        },
    ],
    methods: {
        /* 下面第一个函数是报错处理机制，当不按转换顺序，状态机会报错并停止运行程序； */
        onInvalidTransition: function (transition, from, to) {
            switch (from) {
                case "firstStep":
                    alert("请按游戏顺序进行，杀手先杀人！");
                    break;
                case "secondStep":
                    alert("请按游戏顺序进行，亡灵发言！");
                    break;
                case "thirdStep":
                    alert("请按游戏顺序进行，玩家发言！");
                    break;
                case "fourStep":
                    alert("请按游戏顺序进行，玩家投票！");
                    break;
            }
        },
        //注意 下面on后的首字母要大写
        onKill: function () {
            log(fsm.state);
            sessionStorage.setItem('state', fsm.state); //以得到现在的状态
            location.href = "../html/vote.html";
        },
        onGhostSpeak: function () {
            sessionStorage.setItem('state', fsm.state);
            alert("亡灵发表遗言");
        },
        onGamerSpeak: function () {
            sessionStorage.setItem('state', fsm.state);
            alert("玩家依次发言");
        },
        onGamerVote: function () {
            log(fsm.state);
            sessionStorage.setItem('state', fsm.state);
            location.href = "../html/vote.html";
            // sessionStorage.setItem("anew", JSON.stringify(one));//JSON.stringify() 方法将 JavaScript 对象转换为字符串。而one=1，是number 不是对象 所以不需要加json转换
            // sessionStorage.setItem("anew",one);
        }
    }
})

// 加相应步骤的点击事件：
for (let i = 0; i <= d; i++) {
    kill[i].onclick = function () {
        // 加一个判断以防止例如： 第二天的第一步， 却可以在第一天的第一步完成 （即防止类似于 第二天的第一步 可以在第一天的第一步进行的bug）
        if (i == d) {
            fsm.kill();
        }
    }
}

// 从第六个页面 投死按钮回来之后 改变第一个li的背景颜色
var x = sessionStorage.getItem("x");
for (let i = 0; i < x; i++) {
    // kill[i].style.backgroundColor = " darkgray";
    // $(".kill:eq(i)").css("background-color","darkgray");//这样写是无效的  因为i位于引号内
    $(".kill").eq(i).css("background-color","darkgray");
    killNew[i].innerHTML = +killCivilian[i] + 1 + "号被杀死，真实身份是" + data[killCivilian[i]];
    killNews = killCivilian[i] + 1;
    // one[i].style.borderRight = "10px solid darkgray";
    $(".one").eq(i).css("border-right","10px solid darkgray");
}
for (let i = 0; i <= d; i++) {
    ghostSpeak[i].onclick = function () {
        if (i == d) {
            fsm.ghostSpeak();
            log(fsm.state);
            if (fsm.state == "thirdStep") {
                ghostSpeak[i].style.backgroundColor = " darkgray";
                two[i].style.borderRight = "10px solid darkgray";
                
            } else {
                if (i != 0) {
                    ghostSpeak[i - 1].style.backgroundColor = " darkgray";
                    two[i - 1].style.borderRight = "10px solid darkgray";
                   
                }
            }
        }
    }
}

for (let i = 0; i <= d; i++) {
    gamerSpeak[i].onclick = function () {
        if (i == d) {
            fsm.gamerSpeak();
            log(fsm.state);
            if (fsm.state == "fourStep") {
                gamerSpeak[i].style.backgroundColor = " darkgray";
                there[i].style.borderRight = "10px solid darkgray";
            } else {
                if (i != 0) {
                    gamerSpeak[i - 1].style.backgroundColor = " darkgray";
                    there[i - 1].style.borderRight = "10px solid darkgray";
                }
            }
        }
    }
}

for (let i = 0; i <= d; i++) {
    gamerVote[i].onclick = function () {
        if (i == d) {
            fsm.gamerVote();
        }
    }
}

//事件委托(事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素)   
for (let i = 0; i < d; i++) {
    box[i].onclick = function (ev) { //为什么要加上 事件的对象 作为参数？因为我们要知道是哪个对象 在运行次函数
        var ev = ev || window.event;
        log(ev);
        var target = event.target;
        log(target);
        if (target.nodeName == "LI") {
            alert("请按顺序进行！")
        }
    }
}
// 建立一个对象用来保存每天杀手杀的平民是：
var playNews = JSON.parse(sessionStorage.getItem("playNews")) || {};
var y = sessionStorage.getItem("y");
for (let i = 0; i < y; i++) {
    gamerVote[i].style.backgroundColor = "darkgray";
    gamerSpeak[i].style.backgroundColor = "darkgray";
    ghostSpeak[i].style.backgroundColor = "darkgray";
    two[i].style.borderRight = "10px solid darkgray";
    there[i].style.borderRight = "10px solid darkgray";
    four[i].style.borderRight = "10px solid darkgray";
    playNew[i].innerHTML = +playersVote[i] + 1 + "号被投死，真实身份是" + data[playersVote[i]];
}

// 游戏结束
$(function () {
    $("button:eq(0)").click(function () {
        var mymessage = confirm("你确定要退出游戏吗？");
        if (mymessage == true) {
            location.href = "../html/gameOver.html";
        }
    });
});
// 法官日志
$(function () {
    $("button:eq(1)").click(function () {
        location.href = "../html/judgeShow.html";
    });
});
// 返回
$(function () {
    $("span:eq(0)").click(function () {
        location.href = "../html/judgeShow.html";
    });
});
// 退出
$(function () {
    $("span:eq(1)").click(function () {
        var mymessage = confirm("你确定要退出游戏吗？");
        if (mymessage == true) {
            location.href = "../html/homePage.html";
            sessionStorage.clear();
        }
    });
});