// 方法一
// var arr = document.getElementsByClassName("box");
// console.log(arr)

// // 该方法用于产生颜色
// function color() {
//     // 下面是用来产生的 r g b  互不相同 
//     while (r == g || r == b || b == g) {
//         var r = Math.floor(Math.random() * 256);
//         var g = Math.floor(Math.random() * 256);
//         var b = Math.floor(Math.random() * 256);
//         // 写下一行是因为让上面的组合成一个量rgb
//         var rgb = "rgb(" + r + "," + g + "," + b + ")";
//         return rgb;
//         console.log(rgb)
//     }
// }

// // 该方法用于产生三个不同的数值 与 三种不同的颜色
// function colors() {
//     // 下面的循环语句用来产生三个0-8之间不同的整数
//     // 下面判断条件：就是只要在abc三个数字中有任意两个相同
//     // 的数（如：3、3、2,1、8、1等）,这个判断式就成立. 则执行方块区的方法  
//     // 一直到不成立为止（即三个数都不一样）   ||是或的意思
//     while (one == two || two == there || one == there) {
//         var one = Math.floor(Math.random() * 9);
//         var two = Math.floor(Math.random() * 9);
//         var there = Math.floor(Math.random() * 9);

//     }
//     console.log(one, two, there);

//     // 下面的循环语句用来产生三个不一样的颜色
//     while (a == b || b == c || a == c) {
//         var a = arr[one].style.backgroundColor = color(); 
//         var b = arr[two].style.backgroundColor = color(); 
//         var c = arr[there].style.backgroundColor = color(); 

//     }
//     console.log(a,b,c);
// }

// var myVar;
//按下按钮开始
//  var time;
//  function start() {
//      time = setInterval(function () {
//          for (var i = 0; i < wrap.length; i++) {
//              wrap[i].style.backgroundColor = "orange"; //每次获取随机颜色后恢复默认颜色
//          }
//          colors() //调用赋值随机背景颜色的随机盒子
//      }, 1000)
//      document.getElementById("start").disabled = true; //禁用开始按钮
//  }
//  //设置重置
//  function end() {
//      for (var i = 0; i < arr.length; i++) {
//          arr[i].style.backgroundColor = "orange"; //恢复默认颜色
//      }
//      clearInterval(time); //去除延时
//      document.getElementById("start").disabled = false; //启用开始按钮
//  }




// 方法二
x = document.getElementsByClassName("box");
var arr = [];
var myVar;
//按下按钮开始
function start() {
    // 注意该设置必须位于该方法的 myVar = setInterval(function () {...} 之前 （因为当
    // 位于它之后 会导致  myVar = setInterval(function ()  一运行 就会被clearInterval(myVar) //关闭自动闪(即清除定时器)  会导致不会变色）
    clearInterval(myVar) //关闭自动闪(即清除定时器)
    // 下面的嵌套要达到的效果： 先变色  然后颜色又重新变成原来的颜色  最后将数组arr【】清零
    myVar = setInterval(function () {
        colors()
        var my = setTimeout(function () {
               //每次获取随机颜色后恢复默认颜色
            for (var i = 0; i < arr.length; i++) {
                x[arr[i]].style.background = "orange";
            }
 
            // 下面这行是用于清空arr数组
            arr = [];
        }, 500);

    }, 1000);

    // clearInterval(myVar) //关闭自动闪
    //禁用开始按钮
    document.getElementById("close").disabled = true;
}

//按下按钮结束
function end() {
    //每次获取随机颜色后恢复默认颜色
    for (var i = 0; i < arr.length; i++) {
        x[arr[i]].style.background = "orange";
    }
    clearInterval(myVar) //关闭自动闪
    //启用开始按钮 ，不启用的话当再次按 开始闪 按钮会失效（因为已经被start（）方法禁用了）
    document.getElementById("close").disabled = false;
}

function colors() {
    // 下面这个for是为了让getx()方法运行3次 即产生3个数
    for (var i = 0; i < 3; i++) {
        console.log(i)
        getx();
    }

    // 下面的循环语句用来产生三个不一样的颜色
    while (a == b || b == c || a == c) {
        var a = x[arr[0]].style.background = color();
        var b = x[arr[1]].style.background = color();
        var c = x[arr[2]].style.background = color();
    }
}

// 该函数用来产生0-8中的3个不一样的随机数 
function getx() {
    // var flag = true;
    // 下面这行为什么for是无限循环？ 因为当它的子代for循环内if中的arr[i]=num时就会跳出它的for 回到下面这行的for重新产生num （所以它的一直循环直到三个不同的数）
    for (var i = 0; i > -1; i++) {
        // 下面这行为什么写在这里而不是写在该for循环之外？ 如果写在外面只要第100行flag=false那么会是永远为false
        var flag = true;

        // 定义一个flag变量来判断产生的数是否与之前产生的数是否一样

        var num = Math.floor(Math.random() * 9);
        console.log(num)
        // 下面这个for in 循环用来判断产生的数是否与之前产生的数是否一样
        for (var j in arr) {
            // 最开始i=0是因为循环过一次后产生的arr[0] 即产生了一个数 ，并不是第14行i的1 （并且不可以访问父级参数的变量）
            console.log(j)
            //当arr[i]==num时，才会执行if语句块内的东西，否则直接执行console.log(flag) 
            if (arr[j] == num) {
                flag = false;
                // break;
            }

            // 下面这样写： 因为开始时arr数组是一个空数组 所以它父级的for循环的判断条件为null 所以第一次它的父级for并不会运行 
            //    因为第一次i=null（只有经过下面的if语句之后 数组才有了第一个数 此时i=0（arr[0]）） 所以必须在该父级的for之外再加一个语句保存数组（即下面的if）
            // 注意并不是经过var num = Math.floor(Math.random()*10)+1;产生数之后，arr数组就会有数了，而是还要经过存入数组arr.push(num);与 return;
            console.log(flag)
            // 为什么不需要下面这行，该for循环内容为空，并不会导致无限循环（因为该for循环的条件为i in var 即i=多少就会循环i+1次） 
            // break;
        }

        // 如果上面的if中的flag为true 则说明产生的数与之前产生的数是不一样的 ，那么就可以
        // 通过下面的if来输出答案
        if (flag == true) {
            // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            arr.push(num);
            console.log(arr)
            // return结束的是整个函数即getx()(即arr存了一个数 就相当于getx()运行了一次)  （哪怕return位于条件或循环语句之内  如果是break则只会结束这个条件或者循环语句）
            return;

        }

    }
}

// 该方法用于产生颜色
function color() {
    // 下面是用来产生的 r g b  互不相同 
    while (r == g || r == b || b == g) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        // 写下一行是因为让上面的组合成一个量rgb
        var rgb = "rgb(" + r + "," + g + "," + b + ")";
        console.log(rgb)
        return rgb;

    }
}