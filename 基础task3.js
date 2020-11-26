var aqiData = {};

function addAqiData() 
{
    //trim() 可以删除字符串前后的空格字符,但是中间的空格符却消除不了
    var strCity = document.getElementById("aqi-city-input").value.trim();
    var strAqi = document.getElementById("aqi-value-input").value.trim();
    //match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
    if (!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) 
    {
        alert("城市名必须为中英文字符！");
        return;      
    }
    if (!strAqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
    //定义相应对象的属性值
    aqiData[strCity] = strAqi;
}

function renderAqiList() 
{
    var table = document.getElementById("aqi-table");
    table.innerHTML = "";
    for (var strCity in aqiData)    //循环strCity个
    {
        if (table.children.length === 0)   
        {
            table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }
        //创建一个tr对象
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = strCity;     //城市
        tr.appendChild(td1);           //td1接到tr
        var td2 = document.createElement("td");  
        td2.innerHTML = aqiData[strCity];   //空气质量
        tr.appendChild(td2); 
        var td3 = document.createElement("td");
        td3.innerHTML = "<button class='del-btn'>删除</button>";    //创建删除按钮class应用多个
        tr.appendChild(td3);    
        table.appendChild(tr);   //接到文档里，不再是孤儿
    } 
}

function addBtnHandle() 
{
    addAqiData();
    renderAqiList();
}

function delBtnHandle(target) 
{
    var tr = target.parentElement.parentElement;   //"tr"
    var strCity = tr.children[0].innerHTML;    //获取第一个子元素的值
    delete aqiData[strCity];
    renderAqiList();   //更新表格显示
}

function init() 
{
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;
    var table = document.getElementById("aqi-table");
    
    table.addEventListener("click", function(e)       
    {
        if (e.target && e.target.nodeName === "BUTTON") 
        {
            delBtnHandle(e.target);   //删除目标节点
        }
    })
}
init();