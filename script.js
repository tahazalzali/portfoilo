//create function to change the class of a child
function changeClass(obj,newClass){
    obj.className=newClass;
}
//create a function for andriod user
function android(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
} 
//create a function for windows user
function windows(){ 
    if(/IEMobile/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
}
//create a function for ios user
function ios(){
    if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
}
//create http request function
function httpRequest(url,callback){
    var xmlHttp=new XMLHttpRequest();
    xmlHttp.onreadystatechange=function(){
        if(xmlHttp.readyState==4){
            if(xmlHttp.status==200){
                callback(xmlHttp.responseText);
            }else{
                alert("error");
            }
        }
    };
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}
//create a function for get the current time
function getTime(){
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var day=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    var time=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    return time;
}
console.log(getTime());
//create function to get all inputs     
function getInputs(){
    var inputs=[];
    var inputs_length=document.getElementsByTagName("input");
    for(var i=0;i<inputs_length;i++){
        inputs.push(inputs_length[i]);
    }
    return inputs;
}   

