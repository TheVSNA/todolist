//rotate an arrow icon
function rotate(id){
    var i = document.getElementById(id);
    if(i.getAttribute("class")=="fa fa-chevron-right fa-rotate-90 grayicon")
        i.setAttribute("class","fa fa-chevron-right grayicon");
    else
        i.setAttribute("class","fa fa-chevron-right fa-rotate-90 grayicon");
}

//add a button to a parent specifying its class, its text, its icon and the onclick action
function addButton(parent,classname,classicon,text, onclickaction, iconid){
    button = document.createElement("button");   //create button
    button.setAttribute("class",classname);
    if(onclickaction!="")
        button.setAttribute("onclick",onclickaction);

    i = document.createElement("i");   //create icon tag
    i.setAttribute("class", classicon);
    if(iconid!="")
        i.setAttribute("id",iconid);
    
    spanname = document.createElement("span");  //create span for text
    spanname.innerText = text;

    button.appendChild(i);   
    button.appendChild(spanname);

    parent.appendChild(button);
}

//function to show or hide the side menu
function showsidemenu(){
    var sidemenu = document.getElementById("sidemenu");
    children = document.querySelectorAll("#sidemenu button");

    if(children.length>0){
        children.forEach(element => {
            element.remove();
        });
        sidemenu.setAttribute("class","sidemenuhidden");
    }else{
        sidemenu.setAttribute("class","sidemenushow");

        addButton(sidemenu,"btnside","fa fa-inbox blueicon"," Inbox","","");
        
        addButton(sidemenu,"btnside","fa fa-calendar greenicon"," Today","","");

        addButton(sidemenu,"btnside","fa fa-calendar purpleicon"," Upcoming","","");

        addButton(sidemenu,"btnside","fa fa-filter yellowicon"," Filters","","");

        addButton(sidemenu,"btnside","fa fa-chevron-right grayicon"," Favourites","rotate('arrow0')","arrow0");

        div = document.createElement("div")
        div.setAttribute("id","favourites");
        sidemenu.appendChild(div);

        addButton(sidemenu,"btnside","fa fa-chevron-right grayicon"," Projects","rotate('arrow1')","arrow1");

        div = document.createElement("div")
        div.setAttribute("id","projects");
        sidemenu.appendChild(div);
    }
}

function addTodoElements(){
    for(i=0; i<10;i++){
        addTodoElement(false,"test"+i,i,"23/08",'green','test');
    }
}

//function to add a todo element to the main page
function addTodoElement(ischecked, text,id, date, projectcolor, projectname){
    todolist =  document.getElementById("todolist");

    checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("onclick","changeText('text"+id+"')");
    checkbox.checked = ischecked;
    checkbox.setAttribute("class",projectcolor+"check");

    if(ischecked)
        span=document.createElement("del");
    else
        span = document.createElement("span");
    span.innerText=text;
    span.setAttribute("class","todotext");
    span.setAttribute("id","text"+id);

    div = document.createElement("div");
    div.setAttribute("id","div"+id);
    div.setAttribute("class","tododiv");

    table1 = document.createElement("table");
    tr11 = document.createElement("tr");
    td11 = document.createElement("td");
    td11.appendChild(checkbox);
    tr11.appendChild(td11);

    td12 = document.createElement("td");
    
    table2 = document.createElement("table");
    tr21 = document.createElement("tr");
    tr22 = document.createElement("tr");

    td21 = document.createElement("td");
    td21.appendChild(span);
    
    td22 = document.createElement("td");
    spandate = document.createElement("span");
    spandate.innerText = " "+date;
    ical = document.createElement("i");
    ical.setAttribute("class", "fa fa-calendar greenicon");
    td22.appendChild(ical);
    td22.appendChild(spandate);

    tr21.appendChild(td21);
    tr22.appendChild(td22);
    table2.appendChild(tr21);
    table2.appendChild(tr22);
    td12.appendChild(table2);

    tr11.appendChild(td12);


    td13 = document.createElement("td");
    spanproject = document.createElement("span");
    spanproject.innerText = " "+projectname;
    iproj = document.createElement("i");   //create icon tag
    iproj.setAttribute("class", "fa fa-user");
    td13.appendChild(iproj);


    td13.appendChild(spanproject);

    tr11.appendChild(td13);

    table1.appendChild(tr11);

    div.appendChild(table1);

    todolist.appendChild(div);
}

//function used to change a text from deleted to normal when a checkbox is pressed
function changeText(textid){
    span = document.getElementById(textid); //get old text
    parent = span.parentElement;    //get parent node


    if(span instanceof HTMLSpanElement){    //verify if old text is a span element
        newspan = document.createElement("del");    //create a del tag 
    }else{
        newspan = document.createElement("span");   //create span tag
    }

    newspan.setAttribute("id",textid);
    newspan.setAttribute("class","todotext");
    newspan.innerText=span.innerText;        
    span.remove();
    parent.appendChild(newspan);   
}
