//rotate an arrow icon
function rotate(id){
    var i = document.getElementById(id);
    if(i.getAttribute("class")=="fa fa-chevron-right fa-rotate-90 grayicon"){
        i.setAttribute("class","fa fa-chevron-right grayicon");
        if(id=="arrow0")
            removeFavourites();
        else
            removeGroups();
    }else{
        i.setAttribute("class","fa fa-chevron-right fa-rotate-90 grayicon");
        if(id=="arrow0")
            showFavourites();
        else
            showGroups();
    }
}

function removeGroups(){
    divproj = document.getElementById("projects");
    var first = divproj.firstElementChild;
    while (first) {
        first.remove();
        first = divproj.firstElementChild;
    }
}

function showGroups(){
    divproj = document.getElementById("projects");
    fetch("/groups",{method:"GET"}).then((resp)=>resp.json()).then(function(data){
       groups = data["projects"];
       
       groups.forEach(group => {
            button = document.createElement("button");
            button.setAttribute("id",group["name"]);
            button.setAttribute("class","btngroup");
            button.setAttribute("onclick","showGroup('"+group["name"]+"')");

            i = document.createElement("i");
            i.setAttribute("class",group["icon"]);
            i.setAttribute("style","color:"+group["color"]);

            span = document.createElement("span");
            span.innerText=group["name"];
            span.setAttribute("style","color:"+group["color"]);

            button.appendChild(i);
            button.appendChild(span);
            divproj.appendChild(button);
       });

       addgroup = document.createElement("button");
       addgroup.setAttribute("class","btngroup");
       addgroup.setAttribute("id","addgroupbutton");
       addgroup.setAttribute("onclick","showAddGroupForm()");

       spanbutton = document.createElement("span");
       spanbutton.innerText="Aggiungi gruppo";
       addgroup.appendChild(spanbutton);

       divproj.appendChild(addgroup);
    });
}

function showAddGroupForm(){
    divproj = document.getElementById("projects");
    document.getElementById("addgroupbutton").remove();

    form = document.createElement("form");
    form.setAttribute("method","POST");
    form.setAttribute("action","/groups");
    
    groupname = document.createElement("input");
    groupname.setAttribute("type","text");
    groupname.setAttribute("id","groupname");
    groupname.setAttribute("class","groupname");
    groupname.required = true;
    groupname.setAttribute("name","groupname");


    color = document.createElement("input");
    color.setAttribute("type","color");
    color.setAttribute("id","color");
    color.setAttribute("class","color");
    color.required = true;
    color.setAttribute("name","color");

    form.appendChild(color);
    
    form.appendChild(groupname);

    submit = document.createElement("input");
    submit.setAttribute("type","submit");
    submit.setAttribute("value","Invia");

    form.appendChild(submit);

    /*todo aggiungi possibilità di sceglire l'icona del gruppo*/
    divproj.appendChild(form);


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
    todolist =  document.getElementById("todos");

    checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("onclick","changeText('"+id+"')");
    checkbox.checked = ischecked;
    checkbox.setAttribute("class",projectcolor+"check");

    if(ischecked)
        span=document.createElement("del");
    else
        span = document.createElement("span");
    span.innerText=text;
    span.setAttribute("class","todotext");
    span.setAttribute("id",+id);

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
    switch(projectcolor){
        case "green":{
            iproj.setAttribute("class", "fa fa-user greenicon");
            break;
        }
        case "yellow":{
            iproj.setAttribute("class", "fa fa-user yellowicon");
            break;
        }
        case "red":{
            iproj.setAttribute("class", "fa fa-user redicon");
            break;
        }
        case "blue":{
            iproj.setAttribute("class", "fa fa-user blueicon");
            break;
        }
        default:{
            iproj.setAttribute("class", "fa fa-user");
        }
    }
    
    td13.appendChild(iproj);


    td13.appendChild(spanproject);

    tr11.appendChild(td13);

    table1.appendChild(tr11);

    div.appendChild(table1);

    div.appendChild(document.createElement("hr"));

    todolist.appendChild(div);
}

//function used to change a text from deleted to normal when a checkbox is pressed
function changeText(textid){
    span = document.getElementById(+textid); //get old text
    parent = span.parentElement;    //get parent node

    ischecked = false;

    if(span instanceof HTMLSpanElement){    //verify if old text is a span element
        newspan = document.createElement("del");    //create a del tag 
        ischecked=true;
    }else{
        newspan = document.createElement("span");   //create span tag
        ischecked=false;
    }

    newspan.setAttribute("id",+textid);
    newspan.setAttribute("class","todotext");
    newspan.innerText=span.innerText;        
    span.remove();
    parent.appendChild(newspan);   


    fetch("/managetodo/"+textid,{method:"PUT", headers: {"Content-Type":"application/json"},body: JSON.stringify({"ischecked":ischecked})});


}

function getToday(){
    fetch("/today",{method:"GET"}).then((resp)=>resp.json()).then(function(data){
        var cont=0;
        data["todos"].forEach(element => {
            addTodoElement(element["ischecked"],element["text"],element["id"],element["date"],element["projectcolor"],element["projectname"]);
        });


        todolist =  document.getElementById("addbutton");

        button = document.createElement("button");
        button.setAttribute("id","btnaddtodo");
        button.setAttribute("class","btnaddtodo");
        button.setAttribute("onclick","openaddform()");

        span = document.createElement("span");
        span.innerText=" Aggiungi un elemento";

        i = document.createElement("i");
        i.setAttribute("class","fa fa-plus");
        button.appendChild(i);

        button.appendChild(span)

        todolist.appendChild(button);
    });
}

//create the form to add a todo element when the button is pressed
function openaddform(){
    divbutton =  document.getElementById("addbutton");
    button = document.getElementById("btnaddtodo");
    button.remove();
    
    form = document.createElement("form");
    form.setAttribute("method","POST");
    form.setAttribute("action","/managetodo");
    form.setAttribute("class","addform");


    text = document.createElement("textarea");
    /*text.setAttribute("type","text");*/
    text.setAttribute("id","text");
    text.setAttribute("class","todotextform");  
    text.setAttribute("rows","2");
    text.setAttribute("name","text");
    text.setAttribute("placeholder","Inserisci il testo");
    text.required = true;



    date = document.createElement("input");
    date.setAttribute("type","date");
    date.setAttribute("id","date");
    date.setAttribute("class","date");
    date.setAttribute("name","date");
    
    group = document.createElement("input");    //todo transform into select
    group.setAttribute("type","text");
    group.setAttribute("id","group");
    group.setAttribute("class","group");
    group.setAttribute("placeholder","Inserisci il gruppo")
    group.setAttribute("name","group");
    group.required = true;


    /*span = document.createElement("span");
    span.setAttribute("class","spansubmit");*/

    submit = document.createElement("input");
    submit.setAttribute("type","submit");
    submit.setAttribute("id","submit");
    submit.setAttribute("class","submit");
    submit.setAttribute("name","invia");

    //span.appendChild(submit);

    form.appendChild(text);
    form.appendChild(document.createElement("br"));
    form.appendChild(date);
    form.appendChild(group);
    form.appendChild(submit);

    divbutton.appendChild(form);

}