let pendingList=[];
let completedList=[];

if(pendingList.length==0)
{
    $("#demoPending").html("To do List of Pending Tasks is Empty!!");
}

if(completedList.length==0)
{
    $("#demoCompleted").html("To do List of Completd Tasks is Empty!!");
}

$( "#PList" ).sortable();
$( "#PList" ).disableSelection();
$( "#TDList" ).sortable();
$( "#TDList" ).disableSelection();


let input = document.getElementById("todoText");
input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    addItem();
}
});

function addItem(){
    regenerateList();
    let text = $("#todoText").val();
    if(text!=null && text!="")
    {
        if(pendingList.indexOf(text) ==-1 && completedList.indexOf(text) ==-1)
        {
            pendingList.push(text);
            populatePendingList();
            $("#todoText").val("");
            $("#todoText").focus();
        }
        else
        {
            alert("Can't Repeat the same To-do Again!!");
        }
        
    }
    else
    {
        alert("To-do List Can't be Empty!!");
    }
}

function addtoCompleted(obj)
{
    regenerateList();
    completedList.push(pendingList[obj.id]);
    pendingList.splice(obj.id,1);
    $("#demoCompleted").html("");
    populatePendingList();
    populateCompletedList();
}

function deletePending (obj)
{
    pendingList.splice(obj.id,1);
    populatePendingList();
}

function deleteCompleted (obj)
{
    completedList.splice(obj.id,1);
    populateCompletedList();
}

function editPending(obj)
{
    let value = pendingList[obj.id];
    let text = prompt("Please edit the list name:", value);
    if (text == null || text == "") {
        alert("To-do List Can't be Empty!!");
    } else {
        delete pendingList[obj.id];
        if(pendingList.indexOf(text) ==-1 && completedList.indexOf(text) ==-1 && text.length<=25)
        {
            pendingList[obj.id]=text;
            populatePendingList();
            $("#todoText").val("");
            $("#todoText").focus();
        }
        else
        {
            pendingList[obj.id]=value;
            if(text.length>25)
            {
                alert("Size shouldn't be exceed by 25 characters.")
            }
            else
            {
                alert("Cant Repeat the same To-do Again!!");
            }
        }
    }
}

function regenerateList()
{
    let allToDoListElements = $("li.pendingLI span.listContent");
    let allCompletedListElements = $("li.todoLI span.listContent");
    let allPendingDelBtn = $("li.pendingLI span.cross button.crossButton");
    let allpendingEditBtn = $("li.pendingLI span.cross button.editButton");
    let allToDoDelBtn = $("li.todoLI span.cross button.crossButton");
    let todoCheckBox = $("li.pendingLI span.pendingCheckBox input");

    for(let i=0; i < allToDoListElements.length;i++)
    {
        pendingList[i] = allToDoListElements[i].innerText;
        allToDoListElements[i].id=i+"";
        allPendingDelBtn[i].id=i+"";
        allpendingEditBtn[i].id=i+"";
        todoCheckBox[i].value=i+"";
    }

    for(let i=0; i < allCompletedListElements.length;i++)
    {
        completedList[i] = allCompletedListElements[i].innerText;
        allCompletedListElements[i].id=i+"";
        allToDoDelBtn[i].id=i+"";
    }
}

function deleteMultiple ()
{
    var getCheckedCheckBox = $('li.pendingLI span.pendingCheckBox input:checked');
    if(getCheckedCheckBox.length==0 || getCheckedCheckBox.length==null)
    {
        alert("Select any checkbox!!");
    }
    else
    {
        for (var i=getCheckedCheckBox.length-1;i>=0;i--)
        {
            pendingList.splice(getCheckedCheckBox[i].value,1);
        }
        populatePendingList();
    }
}

function populatePendingList()
{
    $("#PList").html("");
    for(let i=0; i<pendingList.length;i++)
    {
        $("#PList").append(`<li class="pendingLI" onmouseover="regenerateList()">
                <span class="pendingCheckBox"> <input type="checkbox" value=${i} name="pendingRadio"> </span>
                <span class="listContent" onclick="addtoCompleted(this)" id=${i} >${pendingList[i]}</span>
                <span class="cross"><button class="crossButton" id=${i} onclick="editPending(this)">E</button>
                <button class="editButton" id=${i} onclick="deletePending(this)">D</button>
                </span>
                </li>`);
    }
    if(pendingList.length==0)
    {
        $("#demoPending").html("To do List of Pending Tasks is Empty!!");
    }
    else{
        $("#demoPending").html("");
    }
}

function populateCompletedList()
{
    $("#TDList").html("");
    for(let i=0; i<completedList.length;i++)
    {
        $("#TDList").append(`<li class="todoLI" onmouseover="regenerateList()">
                <span class="listContent">${completedList[i]}</span>
                <span class="cross"><button class="crossButton" id=${i} onclick="deleteCompleted(this)">D</button></span>
                </li>`);
    }
    if(completedList.length==0)
    {
        $("#demoCompleted").html("To do List of Completd Tasks is Empty!!");
    }
    else{
        $("#demoCompleted").html("");
    }
}