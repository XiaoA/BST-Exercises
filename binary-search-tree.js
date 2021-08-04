class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(value): insert a new node into the BST with value value.
   * Returns the tree. Uses iteration. */

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = new Node(value);
          return this;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = new Node(value);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(value): insert a new node into the BST with value value.
   * Returns the tree. Uses recursion. */

  insertRecursively(value, current = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return this;
    }

    if (value < current.value) {
      if (current.left === null) {
        current.left = new Node(value);
        return this;
      }
      return this.insertRecursively(value, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(value);
        return this;
      }
      return this.insertRecursively(value, current.right);
    }
  }

  /** find(value): search the tree for a node with value value.
   * return the node, if found; else undefined. Uses iteration. */

  find(value) {
    let currentNode = this.root;
    let found = false;

    if (value === currentNode.value) return currentNode;

    while (currentNode && !found) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }

    if (!found) return undefined;
    return currentNode;
  }

  /** findRecursively(value): search the tree for a node with value value.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(value, current = this.root) {
    if (this.root === null) return undefined;

    if (value < current.value) {
      if (current.left === null) return undefined;
      return this.findRecursively(value, current.left);
    } else if (value > current.value) {
      if (current.right === null) return undefined;
      return this.findRecursively(value, current.right);
    }
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.value);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      data.push(node.value);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      data.push(node.value);
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /** Further Study!
   * remove(value): Removes a node in the BST with the value value.
   * Returns the removed node. */

  remove(value) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.value !== value) {
      parent = nodeToRemove;
      if (value < nodeToRemove.value) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.value = right.value;
          } else {
            parent.right.value = right.value;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }
}


