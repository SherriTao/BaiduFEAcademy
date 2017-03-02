window.onload=function(){
	tree = new Tree("node0");

	tree.add("node1", "node0", "left");
	tree.add("node2", "node0", "right");
	tree.add("node3", "node1", "right");
	tree.add("node4", "node2", "left");
	tree.add("node5", "node2", "right");
	tree.add("node6", "node3", "left");
	tree.add("node7", "node3", "right");
	tree.add("node8", "node5", "left");

	tree.addToDom();

	addEvent(document.getElementById("dfs_in"), "click", traversalIn);
	addEvent(document.getElementById("dfs_post"), "click", traversalPost);
	addEvent(document.getElementById("dfs_pre"), "click", traversalPre);
}

function addEvent(obj, type, handle){
	try{  
		// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
		obj.addEventListener(type,handle,false);
	}catch(e){
		try{  
			// IE8.0及其以下版本
			obj.attachEvent('on' + type,handle);
		}catch(e){  
			// 早期浏览器
			obj['on' + type] = handle;
		}
	}
}

function traversalIn() {
	tree.contains(tree.showNode, tree.traverseDFIn);
}

function traversalPost() {
	tree.contains(tree.showNode, tree.traverseDFPost);
}

function traversalPre() {
	tree.contains(tree.showNode, tree.traverseDFPre);
}