/* Define Node and Tree */
function Node(data) {
	this.data = data;
	this.parent = null;
	this.left = null;
	this.right = null;
	this.pos = "left";
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
	//find node in DOM
	if (this.preShowNode) {
		var preNodeH = document.getElementById(this.preShowNode.data);
		preNodeH.style.backgroundColor = "white";
	}

	var nodeH = document.getElementById(node.data);
	nodeH.style.backgroundColor = "blue";
	this.preShowNode = node;
};

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
			divattr.value = "child " + node.pos;
		}
		else {
			divattr.value = "root";
		}

		div.setAttributeNode(divattr);


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
Tree.prototype.add = function (data, toData, dire) {
	var child = new Node(data),
		parent = null,
		callback = function (node) {
			if (node.data === toData) {
				parent = node;
			}
		};

	this.contains(callback, this.traverseDFPost);

	if (parent) {
		child.pos = dire;
		parent[dire] = child;
		child.parent = parent;
	}
	else {
		throw new Error('Cannot add node to a non-existent parent.');
	}
}
/* add function end */

/* DFS */
Tree.prototype.traverseDFIn = function (callback) {
	var tree = this;
	tree.count = 0;

	(function recurse(currentNode) {
		if (tree.compelete) {
			if (currentNode != null) {
				recurse(currentNode.left);

				setTimeout(function () {
					callback(currentNode);
				}, 1000 * (++tree.count));

				recurse(currentNode.right);
			};
		}
		else {
			if (currentNode != null) {
				recurse(currentNode.left);
				callback(currentNode);
				recurse(currentNode.right);
			}
		}
		
	})(this.root);
}

Tree.prototype.traverseDFPost = function (callback) {
	var tree = this;
	tree.count = 0;

	(function recurse(currentNode) {
		if (tree.compelete) {
			if (currentNode != null) {
				recurse(currentNode.left);
				recurse(currentNode.right);
				setTimeout(function () {
					callback(currentNode);
				}, 1000 * (++tree.count));
			};
		}
		else {
			if (currentNode != null) {
				recurse(currentNode.left);
				recurse(currentNode.right);
				callback(currentNode);
			}
		}
		
	})(this.root);
}

Tree.prototype.traverseDFPre = function (callback) {
	var tree = this;
	tree.count = 0;

	(function recurse(currentNode) {
		if (tree.compelete) {
			if (currentNode != null) {
				setTimeout(function () {
					callback(currentNode);
				}, 1000 * (++tree.count));
				recurse(currentNode.left);
				recurse(currentNode.right);
			};
		}
		else {
			if (currentNode != null) {
				callback(currentNode);
				recurse(currentNode.left);
				recurse(currentNode.right);
			}
		}
		
	})(this.root);
}
/* DFS end */

