var log = console.log;
//  通过dom节点克隆
var bgi = document.getElementById("bgi");
var box = document.getElementsByClassName("main-there"); //为什么不可以用id 来克隆身份块？因为id在一个html中必须是唯一的，不可以在多个标签中写多个一样的id 
// 之所以之前 也可以打印出不同的身份块 是因为我仅仅只是改变了下一个身份块的内容 实际上还是同一个身份块 因为id一样啊   
// 通过类选择器来获取DOM节点的话 它会生成多个身份块 并且是实质上都不是一个身份块
var bos = document.getElementsByClassName("box-nei");
var imgs = document.getElementsByClassName("imgs");
var bgis = document.getElementsByClassName("nei-one");
var votes = document.getElementById("votes");
var tlak = document.getElementsByClassName("tlak");
var touxiang = document.getElementsByClassName("touxiang");

// 数据：
//获取第二个页面的数据
var data = JSON.parse(sessionStorage.getItem("key"));
log(data);
log(Array.isArray(data));
// 但是字符串得转换为 对象 用JSON.parse    为什么呢？
let fall = JSON.parse(sessionStorage.getItem("fall")) || false;
// 杀手杀平民的下标：
var killCivilian = JSON.parse(sessionStorage.getItem("killCivilian")) || [];
// 玩家投票的下标
var playersVote = JSON.parse(sessionStorage.getItem("playersVote")) || [];

// // 定义一个数字1 给第五个页面的li改变背景颜色
var x = sessionStorage.getItem("x") || 0;
var y = sessionStorage.getItem("y") || 0;
// 获取平民个数 初始值为：sessionStorage.getItem("player");  之后随着平民个数的改变 平民数=sessionStorage.getItem("play");
var player = sessionStorage.getItem("play") || sessionStorage.getItem("player");
log(player);
// 杀手个数  初始值为data.length - player;  
var killers = sessionStorage.getItem("killers") || data.length - player;
log(killers);

// 页面渲染：
if (fall) {
    // 玩家投票页面：
    votes.innerHTML = "投票";
    votes.style.left = "calc(50% - 24px)";
    //    tlak.innerHTML="发言讨论结束，大家请投票"; 为什么这二行不行？ 因为通过class获取的dom节点 生成的是一个数组 而一个数组必须加上相应的坐标才可以操作
    //    touxiang.innerHTML="点击得票数最多人的头像";
    tlak[0].innerHTML = "发言讨论结束，大家请投票";
    touxiang[0].innerHTML = "点击得票数最多人的头像";
    log(0);
} else {
    // 杀手杀人页面
    log(1);
    votes.innerHTML = "杀手杀人";
    tlak[0].innerHTML = "杀手请睁眼，杀手请选择要杀的对象";
    touxiang[0].innerHTML = "点击下方玩家头像，对被杀的玩家的进行标记";
}

//克隆身份块
for (var i = 0; i < data.length - 1; i++) {
    // var boxs = box.cloneNode(true);//box.cloneNode is not a function 为什么？因为box是一个数组，不可以用一个数组名去运行方法，只可以用数组对应的一个去运行方法
    var boxs = box[0].cloneNode(true); //每次都克隆第一个box的 身份块
    bgi.appendChild(boxs);
}
//给身份块的内容赋值
for (let i = 0; i < data.length; i++) {
    box[i].style = "display:inline-block";
    bos[i].children[0].innerHTML = data[i];
    bos[i].children[1].innerHTML = i + 1;
}
// 将之前被杀的身份 渲染为红色
if (killCivilian) {
    for (let i = 0; i < killCivilian.length; i++) {
        bgis[killCivilian[i]].style.backgroundColor = "red";
    }
}
if (playersVote) {
    for (let j = 0; j < playersVote.length; j++) {
        bgis[playersVote[j]].style.backgroundColor = "red";
    }
}

// 定义一个变量 来保存身份块i的下标
var killer;
for (let i = 0; i < bos.length; i++) {
    bos[i].onclick = function () { //上面的for是为了得到 所有的btns按钮 下面就是通过相应的按钮就打印那个按钮的下标
        // log(i); //点击那个按钮 就会打印相应按钮的下标
        for (let j = 0; j < bos.length; j++) { //这里加for 是为了将之前点击显示的刀与背景色 还原 注意 还原的二行必须写在前面                       
            imgs[j].style.display = "none";
            imgs[i].style.display = "block";
        }
        killer = i;
        log(killer); //虽然这种方法可以存 被杀的玩家  但是随着杀人的转换（即换了要杀的人时 就会存下多个被杀的下标  但是我们是一次只能杀一个平民）
        // 所以不可以在这里存 这一次杀手杀的平民是哪一个了吗？ 错误 依然可以存 但是我们只读取数组的最后一个
    }
}
// log(killer); //为什么只会打印一次？ 
// 这里之所以数组为空 并不是因为 上面的保存数据没有保存成功  而是因为在这里打印上面的点击事件还没有发生 这里的打印是在页面刷新就会打印的 ，而上面的数组需要点击事件发生之后才会发生的
// 所以我们只需要在点击事件之后访问该数组即可




// 投死按钮：
// 该数组用来保存杀手杀的平民的下标
// var killCivilian = []; 为什么要注释掉 因为在这里定义的话 当页面第二次回到该页面时 killCivilian 又会变成空数组  但是第一次加载此页面时 我又必须定义killCivilian为数组 否则不可以进行push方法 那怎么办呢？
// 总结：第一个页面必须定义为空数组 ，但是以后再加载页面不可以再为空数组  如何解决？
// 解决方法： var killCivilian= JSON.parse(sessionStorage.getItem("killCivilian")) || []; 
// 上述解决方法就是： 当第一次加载此页面时JSON.parse(sessionStorage.getItem("killCivilian"))为空 即=false  所以killCivilian=[];
// 之后 加载此页面时 JSON.parse(sessionStorage.getItem("killCivilian")) 就不等于空 即=true  所以killCivilian=JSON.parse(sessionStorage.getItem("killCivilian"));
// 该数组用来保存玩家投票杀的人的下标
// var playersVote = [];
// var datas = JSON.parse(sessionStorage.getItem("datas")) || data;
$(function () {
    $(".tou").click(function () {
        if (!fall) {
            // 杀手杀人
            // 第一个if用来判断 不可以不杀人
            if (killer == undefined) {
                alert("不可以不杀人，请重新选择！");
            } else {
                if (data[killer] == "杀手") {
                    alert("不可以杀自己人，请重新选择！");
                } else {
                    if (killCivilian.indexOf(killer) == -1 && playersVote.indexOf(killer) == -1) {
                        x++;
                        sessionStorage.setItem("x", x);
                        killCivilian.push(killer);
                        // 保存杀手杀的平民的下标,以跨页面访问:
                        sessionStorage.setItem("killCivilian", JSON.stringify(killCivilian));
                        // 点击投死按钮之后取反
                        fall = !fall;
                        sessionStorage.setItem('fall', fall); // sessionStorage会自动将布尔类型转换为字符串 来保存  不跨页面的话保存的数据会自动获取数据
                        player--;
                        sessionStorage.setItem("play", player);
                        sessionStorage.setItem("killers", killers);

                        // 判断游戏是否结束： 如何判断呢？通过下面的方法找出data数组中 平民 与 杀手 的个数 ，
                        // 当杀手人数大于等于平民人数时游戏结束  杀手胜利，或者当杀手人数为0时结束游戏 平民胜利
                        if (killers >= player) {
                            location.href = '../html/gameOver.html';
                            var one = 1;
                            sessionStorage.setItem("one", one);
                        } else {
                            if (killers == 0) {
                                location.href = '../html/gameOver.html';
                                var two = 2;
                                sessionStorage.setItem("two", two);
                            } else {
                                location.href = '../html/startGame.html';
                            }
                        }
                    } else {
                        alert("不可以杀已死的人，请重新选择！");
                    }
                }
            }
        } else {
            // 玩家投票：
            // 第一个if用来判断 不可以不杀人
            if (killer == undefined) {
                alert("不可以不杀人，请重新选择！");
            } else {
                if (killCivilian.indexOf(killer) == -1 && playersVote.indexOf(killer) == -1) {
                    y++;
                    sessionStorage.setItem("y", y);
                    playersVote.push(killer);
                    // 保存杀手杀的平民的下标,以跨页面访问:
                    sessionStorage.setItem("playersVote", JSON.stringify(playersVote));
                    // 点击投死按钮之后取反
                    fall = !fall;
                    sessionStorage.setItem('fall', fall); // sessionStorage会自动将布尔类型转换为字符串 来保存  不跨页面的话保存的数据会自动获取数据
                    // 删除这一次杀手杀死的人 即删除data数组中的相应平民
                    // 建立一个数组来保存玩家投票 投死的身份是：
                    var plcay = JSON.parse(sessionStorage.getItem("plcay")) || [];
                    plcay.push(data[killer]);
                    sessionStorage.setItem("plcay", JSON.stringify(plcay));
                    if (data[killer] == "平民") {
                        player--;
                        sessionStorage.setItem("play", player);
                    } else {
                        killers--;
                        sessionStorage.setItem("killers", killers);
                    }
                    if (killers >= player) {
                        location.href = '../html/gameOver.html';
                        var one = 1;
                        sessionStorage.setItem("one", one);
                    } else {
                        if (killers == 0) {
                            location.href = '../html/gameOver.html';
                            var two = 2;
                            sessionStorage.setItem("two", two);
                        } else {
                            location.href = '../html/startGame.html';
                        }
                    }
                } else {
                    alert("不可以杀已死的人，请重新选择！");
                }
            }
        }
    });
});


// sessionStorage.setItem("x", x); 不可以在这里保存 在这里保存x永远都是初始值0，应该在x变化的下一行就保存 
// 退出
$(function () {
    $("h2:eq(1)").click(function () {
        var mymessage = confirm("你确定要退出游戏吗？");
        if (mymessage == true) {
            location.href = "../html/homePage.html";
            sessionStorage.clear();
        }
    });
});