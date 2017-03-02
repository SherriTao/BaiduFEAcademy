window.onload=function(){
	tree = new Tree("node0");

	tree.add("node1", "node0");
	tree.add("node2", "node0");
	tree.add("node3", "node0");
	tree.add("node4", "node2");
	tree.add("node5", "node2");
	tree.add("node6", "node3");
	tree.add("node7", "node3");
	tree.add("node8", "node5");
	tree.add("node9", "node6");

	tree.addToDom();

	addEvent(document.getElementsByName("dfs_pre")[0], "click", traversalPre);
	addEvent(document.getElementsByName("search")[0], "click", search);
	addEvent(document.getElementsByName("delete")[0], "click", deleteNode);
	addEvent(document.getElementsByName("add")[0], "click", addNode);
}

function addEvent(obj, type, handle){
	try{  
		// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
		obj.addEventListener(type, handle, false);
	}catch(e){
		try{  
			// IE8.0及其以下版本
			obj.attachEvent('on' + type, handle);
		}catch(e){  
			// 早期浏览器
			obj['on' + type] = handle;
		}
	}
}

function traversalPre() {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		divs[i].className = divs[i].className.replace("blue", "");
	}
	tree.contains(tree.showNode, tree.traverseDFPre);
}

function search() {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		divs[i].className = divs[i].className.replace("found", "");
		divs[i].className = divs[i].className.replace("blue", "");
	}

	var nodeData = document.getElementsByName("node_data")[0].value;
	tree.find(nodeData);
}

function deleteNode() {
	var nodeSelect = document.getElementsByClassName("select")[0];
	if (nodeSelect) {
		nodeSelect.className = nodeSelect.className.replace("select", "");
		tree.deleteNode(nodeSelect.id);
		tree.update();
	}
	else {
		alert("Select a Node!");
	}
}

function addNode() {
	var nodeSelect = document.getElementsByClassName("select")[0];
	if (nodeSelect) {
		nodeSelect.className = nodeSelect.className.replace("select", "");
		var nodeData = document.getElementsByName("node_data_add")[0].value || "node";
		tree.add(nodeData, nodeSelect.id);
		tree.update();
	}
	else {
		alert("Select a Node!");
	}
}