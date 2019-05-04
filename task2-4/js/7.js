var log = console.log;
// dom
var main = document.getElementsByTagName("main");
var wodi = document.getElementsByClassName("wodi");
var kill = document.getElementsByClassName("kill");
var player = document.getElementsByClassName("player");
var day = document.getElementsByClassName("day");
var days = document.getElementsByClassName("days");
var skii = document.getElementsByClassName("skii");
var skiis = document.getElementsByClassName("skiis");
var centre = document.getElementsByClassName("centre");

// 获取数据
var data = JSON.parse(sessionStorage.getItem("key"));
var players = sessionStorage.getItem("play") || sessionStorage.getItem("player");
var killers = sessionStorage.getItem("killers") || data.length - players;
var one = sessionStorage.getItem("one");
var two = sessionStorage.getItem("two");

// 游戏结果： 三种： 平民胜利  杀手胜利  中途退出游戏：游戏结束
if (one == 1) {
    wodi[0].innerHTML = "杀手胜利";
} else {
    if (two == 2) {
        wodi[0].innerHTML = "平民胜利";
    } else {
        wodi[0].innerHTML = "游戏结束";
    }
}

// 剩余玩家：
kill[0].innerHTML = "杀手" + killers;
player[0].innerHTML = "平民" + players;

// 每天的游戏信息：
var date = 1;
//创建天数数组
var daysArray = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
// var d=sessionStorage.getItem("d")+1;  记得要将字符串 转为 数值number 才可以进行运算  否则当sessionStorage.getItem("d")=1时, d=11
var d = +sessionStorage.getItem("d") + 1;
var date = daysArray[d];

// 杀手杀平民的下标：
var killCivilian = JSON.parse(sessionStorage.getItem("killCivilian"));
// 玩家投票的下标
var playersVote = JSON.parse(sessionStorage.getItem("playersVote"));
var plcay = JSON.parse(sessionStorage.getItem("plcay"));
// 第一天：
if (d >= 1) {
    days[0].innerHTML = "第一天";
    skii[0].innerHTML = "晚上：" + (+killCivilian[0] + 1) + "号被杀死，真实身份是平民";
    skiis[0].innerHTML = "白天：" + (+playersVote[0] + 1) + "号被杀死，真实身份是" + plcay[0];
}


//第一天之后：
for (let i = 0; i < d - 1; i++) {
    var dayss = day[i].cloneNode(true);
    main[0].appendChild(dayss);
    let date = daysArray[i + 2];
    days[i + 1].innerHTML = "第" + date + "天";
    if (killCivilian[i + 1] == undefined) {
        skii[i + 1].innerHTML = "晚上："
    } else {
        skii[i + 1].innerHTML = "晚上：" + (+killCivilian[i + 1] + 1) + "号被杀死，真实身份是平民";
    }
    if (playersVote[i + 1] == undefined) {
        skiis[i + 1].innerHTML = "白天："
    } else {
        skiis[i + 1].innerHTML = "白天：" + (+playersVote[i + 1] + 1) + "号被杀死，真实身份是" + plcay[i + 1];
    }

}

// 再来一局：
$(function () {
    $("button:eq(0)").click(function () {
        // 删除数据
        sessionStorage.clear();
        location.href = '../html/allot.html';
    });
});