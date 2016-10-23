function setSelectedID(id) {
	sessionStorage.selectedTaskId = id;
	console.log(sessionStorage.selectedTaskId);
	document.getElementById('crw_card_input').value = getCRW(id);
}



function addTask() {
	var taskTitle = $("#cardTitle").val();
	var taskDesc = $("#carddescription").val();
	var taskDuration = $("#cardduration").val();
	var taskDeadline= $("#carddeadline").val();
	var taskOwner= $("#cardowner").val();
	var taskColumn= $("#cardcolumn").val();
	var taskSprint= $("#sprint_select").val();

	addTaskToDB(taskTitle, taskDesc, taskDuration,taskDeadline, taskOwner, taskColumn, taskSprint);

	// Placeholder
	// sessionStorage.currentTasks ++;
	// sessionStorage.currentTaskID ++;

	//var n = sessionStorage.currentTasks;

}

function createKanbanCardHtml(id, date, desc, crw, owner) {//recibe toda la informacion de la tarjeta y la crea

	var htmlClass;
	var html =
	"<div id='item"+id+"' class='card js--item"+id+"' draggable='true'>"+
	"<div class='cardTitle'>"+
	"    <label>ID: #"+id+"</label>"+
	"		<button id='configBtn"+id+"' class='configBtn' data-toggle='modal' data-target='#cardModal' onclick='setSelectedID("+id+")'>"+
	"			<span class='glyphicon glyphicon-time'></span>"+
	"		</button>"+
	"        <button id='blockBtn"+id+"' class='blockBtn' OnClick='blockCard("+id+");' >B</button>"+
	"</div>"+
	"    <div class='card-content'>"+
	"        <p><strong>Deadline:</strong> "+date+"</p>"+
	"        <p><strong>Description:</strong> "+desc+"</p>"+
	"        <p><strong>Duration:</strong> "+crw+"</p>"+
	"    </div>"+
	"    <div class='card-footer'>"+
	"			<p>"+owner+"</p>"+
	"		</div>"+
	"</div>";

	console.log(html);
	return html;
}

function getColumn(state) {
	if (state == "ready")
		htmlClass = ".readyCol";
	else if (state == "inProgress")
		htmlClass = ".inProgressCol"
	else if (state == "finished")
		htmlClass = ".finishedCol";
	else
		htmlClass = ".backlogCol";

	console.log(htmlClass);
	return htmlClass;
}

function makeCardDraggable(id){
			$('#item'+id).bind('dragstart', function(event) {
				event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
			});
			// bind the dragover event on the board sections
			$('#ready, #inprogress, #finished').bind('dragover', function(event) {
				event.preventDefault();
			});
			// bind the drop event on the board sections
		   $('#ready, #inprogress, #finished').bind('drop', function(event) {
					var notecard = event.originalEvent.dataTransfer.getData("text/plain");
					event.target.appendChild(document.getElementById(notecard));
					event.preventDefault();
		});
		}

function appendHtmlAfterHtml (html, prevHtml) {
	$(prevHtml).append(html);
}
