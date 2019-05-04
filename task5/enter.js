var log = console.log;

// 原生：
// var valueOne = document.getElementsByTagName("input")[0];
// var valueTwo = document.getElementsByTagName("input")[1];
// var hs = document.getElementsByTagName("h3")[0];
// var mistake = document.createElement("span");
// var datas = document.getElementById("datas");
// var button = document.getElementsByTagName("button")[0];

// button.onclick = function () {
//     if (valueOne.value != '' && valueTwo.value != '') { //null 与''是不一样的 因为input的value会将null自动转换为空字符串
//         mistake.innerHTML = ""; //虽然后面也有对mistake设置内容 ，但是这一行并不会影响后一行，因为后面的代码会覆盖前面的代码，这一行的目的是 为了将之前mistake的内容清空（注意对内容的清空用''空字符串 而不可以是null）
//         // 创建ajax对象：即xmlhttp 兼容写法：
//         var xmlhttp;
//         if (window.XMLHttpRequest) {
//             // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
//             xmlhttp = new XMLHttpRequest();
//         } else {
//             // IE6, IE5 浏览器执行代码
//             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         //连接服务器   第二个参数表示请求发送的网址，文件在服务器上的位置  a/login表示该接口  最开始的/表示前面还有 域名
//         xmlhttp.open("POST", "/carrots-admin-ajax/a/login", "true");
//         //   如果请求方法为 post的 ，必须要设置请求头
//         xmlhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

//         //  获取input的value  然后对数据进行整合：
//         // 方法一：原生js的方法
//         // var name = valueOne.value;
//         // var pwd = valueTwo.value;
//         // // var data = "name="+name&+"pwd="+pwd;//&要写在引号之内 当&写在外面 相当于成了变量名 而这里无name& 这个变量名
//         // var data = "name=" + name + "&pwd=" + pwd;
//         // 方法二：可以用FormData对象提取当前页面表单的数据  该对象的其他方法可以谷歌
//         var dat = new FormData(datas);
//         var name = dat.get("name");
//         var pwd = dat.get("pwd");
//         var data = "name=" + name + "&pwd=" + pwd;
//         log(data);
//         //   发送数据
//         xmlhttp.send(data);

//         // onreadystatechange 事件   每当 readyState 改变时，就会触发 onreadystatechange 事件
//         // 接收数据
//         xmlhttp.onreadystatechange = function () {
//             log(xmlhttp.readyState);
//             // 通信成功的条件：  readyState ==4  并且 status==200
//             // readyState 属性存有 XMLHttpRequest 的情况信息:有0-4五种      status属性存有 XMLHttpRequest 的状态信息：有200与404二种
//             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                 // responseText属性返回从服务器接收到的字符串
//                 log(xmlhttp.responseText);
//                 // 将字符串转为对象
//                 var returnDate = JSON.parse(xmlhttp.responseText);

//                 // window.location.href= "http://dev.admin.carrots.ptteng.com/a/login?name=admin&pwd=123456;";
//                 // window.location.href= "http://dev.admin.carrots.ptteng.com/a/login;"
//                 // window.location.href= "http://dev.admin.carrots.ptteng.com;"首先该操作是由xmlhttp对象操作的，而不是window；其次该网页的账号与密码不需要自己写；是之前自己输入的 
//                 //location.href= "http://dev.admin.carrots.ptteng.com;"报错  is not a valid URL 不是一个有效的URL  因为后面必须加上/ 之所以需要加上/ 是因为后面还有内容（即data 账号与密码）
//                 //location.href= "http://dev.admin.carrots.ptteng.com/;"  

//                 var i = returnDate.message;
//                 switch (i) {
//                     case "success":
//                         location.href = "http://dev.admin.carrots.ptteng.com/;"
//                         break;
//                     case "密码错误":
//                         // 错误方法：
//                         // var mistake = document.createElement("span").innerHTML="密码错误";
//                         // hs.appendChild(mistake);  这样写错误的原因是上一行的mistake不是一个node节点而是内容 ；所以它不可以写在appendChild内
//                         // 而正确的做法是先创建一个标签节点；然后在创建一个文本节点 ，然后将文本节点放入标签节点中 ；最后将标签节点放在其他标签节点中
//                         // 正确的方法：
//                         // var mistake = document.createElement("span");//必须写在全局下 因为下面的pwds方法先要用到该变量
//                         var mistakes = document.createTextNode("密码错误");
//                         mistake.appendChild(mistakes);
//                         hs.appendChild(mistake);
//                         valueTwo.value = null;
//                         log(valueTwo.value);
//                         // if (valueTwo.value != '') { //这时的valueTwo.value的确为null  因为valueTwo.value == null 但是因为这是input的value 所以会自动转为空字符串'' 所以应该写’‘而不是null
//                         break;
//                     case "用户不存在":
//                         var inexistence = document.createTextNode("用户不存在");
//                         mistake.appendChild(inexistence);
//                         hs.appendChild(mistake);
//                         valueOne.value = null;
//                         valueTwo.value = null;
//                         break;
//                 }
//             }
//         }
//     } else {
//         mistake.innerHTML = ""; //虽然后面也有对mistake设置内容 ，但是这一行并不会影响后一行，因为后面的代码会覆盖前面的代码，这一行的目的是 为了将之前mistake的内容清空（注意对内容的清空用''空字符串 而不可以是null）
//         var inexistence = document.createTextNode("请输入账号与密码");
//         mistake.appendChild(inexistence);
//         hs.appendChild(mistake);
//     }
// }

// valueOne.oninput = function () {
//     log(mistake.innerHTML);
//     if (mistake.innerHTML == "密码错误" || mistake.innerHTML == "用户不存在" || mistake.innerHTML == "请输入账号与密码") {
//         mistake.innerHTML = "";
//         log(mistake.innerHTML);
//     }
// }
// valueTwo.oninput = function () {
//     log(mistake.innerHTML);
//     if (mistake.innerHTML == "密码错误" || mistake.innerHTML == "用户不存在" || mistake.innerHTML == "请输入账号与密码") {
//         mistake.innerHTML = "";
//         log(mistake.innerHTML);
//     }
// }


// // jQuery:
// var valueOne = $("input").eq(0).val(); 不可以在一开始就获取input的值 因为最开始input值为空 如果一开始就获取 那么获取的值即空 所以应该在点击按钮之后获取
var valueOne = $("input").eq(0);
var valueTwo = $("input").eq(1);
var hs = $("h3");
$("button").click(function () {
    $.post("/carrots-admin-ajax/a/login",
        // 方法一：
        // {
        //     name: valueOne.val(),
        //     pwd: valueTwo.val()
        // }
        //   jquery 是不可以通过value来获取input的值 必须通过jQuery的val（）方法 切记啊（原生的方法与jQuery的方法是不可以混乱用的）
        //  错误方法：  "name=" + $("input").eq(0).value + "&pwd=" + $("input").eq(1).value
        // 方法二
        // "name=" + $("input").eq(0).val() + "&pwd=" + $("input").eq(1).val()
        // 方法三：
        $("form").serialize()
        // serialize() 方法通过序列化表单值创建 URL 编码文本字符串 上述方法的结果即："name=" + $("input").eq(0).val() + "&pwd=" + $("input").eq(1).val()
        ,
        function (responseText, statusText, xhr) {
            hs.text("");
            log(responseText);
            log(statusText);
            log(xhr);
            if (valueOne.val() != '' && valueTwo.val() != '') {
                // 将字符串转为对象
                var returnDate = JSON.parse(responseText);
                log(returnDate.message);
                var i = returnDate.message;
                switch (i) {
                    case "success":
                        location.href = "http://dev.admin.carrots.ptteng.com/;"
                        break;
                    case "密码错误":
                        hs.text("密码错误");
                        // 错误方法一： valueTwo.val() = null;
                        //错误方法二：  valueTwo.val()="";
                        // 正解：
                        valueTwo.val("");
                        log(valueTwo.val());
                        break;
                    case "用户不存在":
                        hs.text("用户不存在");
                        valueOne.val("");
                        valueTwo.val("");
                        break;
                }

            } else {
                hs.text("");
                hs.text("请输入账号与密码");
            }
        })
});
//  错误写法：$("input").input(function(){})
$("input").on("input", function () {
    log(1);
    log(hs.text());
    if (hs.text() == "密码错误" || hs.text() == "用户不存在" || hs.text() == "请输入账号与密码") {
        hs.text("");
        log(hs.text());
    }
});