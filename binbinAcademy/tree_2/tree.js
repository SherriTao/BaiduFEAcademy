/* Define Node and Tree */
function Node(data) {
	this.data = data;
	this.parent = null;
	this.children = [];
}

function Tree(data) {
	this.root = new Node(data);
	this.preShowNode = null;
	this.compelete = false;
	this.count = 0;
}
/* Define End */

/* util function */
Tree.prototype.contains = function (callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.showNode = function (node) {
	if (this.preShowNode) {
		var preNodeH = document.getElementById(this.preShowNode.data);
		preNodeH.style.backgroundColor = "white";
	}

	var nodeH = document.getElementById(node.data);
	nodeH.style.backgroundColor = "blue";
	this.preShowNode = node;
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