/* Define Node and Tree */
function Node(data) {
	this.data = data;
	this.parent = null;
	this.children = [];
}

function Tree(data) {
	this.root = new Node(data);
	this.compelete = false;
	this.count = 0;
}
/* Define End */

/* util function */
Tree.prototype.contains = function (callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.showNode = function (node) {
	var targetNodes = document.getElementsByClassName("blue");
	for (var i = 0; i < targetNodes.length; i++) {
		targetNodes[i].className = targetNodes[i].className.replace("blue", "");
	}

	var nodeH = document.getElementById(node.data);
	nodeH.className += " blue";
};

Tree.prototype.find = function (searchNode) {
	var tree = this,
		callback = function (node) {
			tree.showNode(node);
			if (node.data == searchNode) {
				var nodeH = document.getElementById(searchNode);
				nodeH.className += " found";
			}
		};
	this.contains(callback, this.traverseDFPre);
}

Tree.prototype.addToDom = function () {

	var callback = function (node) {
		var id = node.data;
		var parent = node.parent;
		// create a div
		var div = document.createElement("div");
		var divattr = document.createAttribute("id");  
		divattr.value = id;
		div.setAttributeNode(divattr);

		divattr = document.createAttribute("class");
		if (parent != null) {
			divattr.value = "child";
		}
		else {
			divattr.value = "root";
		}

		div.setAttributeNode(divattr);
		div.innerHTML = node.data;

		addEvent(div, "click", function(e) {
			if (e && e.stopPropagation) {
				e.stopPropagation();
			}
			else {
				window.event.cancelBubble = true;
				return false;
			}

			selectNodesH = document.getElementsByClassName("select");

			if (selectNodesH.length > 0) {

				for (var j = 0; j < selectNodesH.length; j++) {
					selectNodesH[j].className = selectNodesH[j].className.replace("select", "");
				}
			}
			
			if (e.target.className.indexOf("select") < 0) {
				e.target.className += " select";
			} 
			else {
				e.target.className = e.target.className.replace("select", "");
			}
		});

		var parentDiv;

		if (node.parent) {
			parentDiv = document.getElementById(node.parent.data);
		}
		else {
			parentDiv = document.getElementById("container");
		}
		parentDiv.appendChild(div);   
	}
	this.contains(callback, this.traverseDFPre);
	this.compelete = true;
}

Tree.prototype.update = function () {
	this.compelete = false;
	this.count = 0;
	document.getElementById("container").innerHTML = "";
	this.addToDom();
}
/* util function end */

/* add a Node to the Tree */
Tree.prototype.add = function (data, toData) {
	var child = new Node(data),
		parent = null,
		callback = function (node) {
			if (node.data === toData) {
				parent = node;
			}
		};

	this.compelete = false;
	this.contains(callback, this.traverseDFPre);

	if (parent) {
		parent.children.push(child);
		child.parent = parent;
	}
	else {
		throw new Error('Cannot add node to a non-existent parent.');
	}
}
/* add function end */

Tree.prototype.deleteNode = function (data) {
	this.compelete = false;
	var callback = function (node) {
		if (node.data == data) {
			var current = node,
				parent = node.parent;

			if (parent) {
				parent.children.splice(parent.children.indexOf(node), 1);
				delete current;
			}
		}
	};
	this.contains(callback, this.traverseDFPre);
}
/* delete function end */

/* DFS */
Tree.prototype.traverseDFPre = function (callback) {
	var tree = this;
	tree.count = 0;

	(function recurse(currentNode) {
		if (tree.compelete) {
			if (currentNode != null) {
				setTimeout(function () {
					callback(currentNode);
				}, 1000 * (++tree.count));
				currentNode.children.forEach(function (child) {
					recurse(child);
				});
			}
		}
		else {
			if (currentNode != null) {
				callback(currentNode);
				currentNode.children.forEach(function (child) {
					recurse(child);
				});			
			}
		}
		
	})(this.root);
}
/* DFS end */