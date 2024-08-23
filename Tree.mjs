import Node from "./Node.mjs";

export default function Tree(arr){
    return {        
        buildTree: function(arr){
            arr = [...new Set(arr)].sort((a, b) => a - b);
            
            const build = (arr) => {
                if(arr.length === 0){
                    return null;
                } 
                const mid = Math.floor(arr.length / 2);
                const node = new Node(arr[mid]);
                node.left = build(arr.slice(0, mid));
                node.right = build(arr.slice(mid + 1));
                return node;
            };
          
            return build(arr);
        },
        insert: function(value){            
            const insertNode = (value, node = this.root) => {
                if(node === null){
                    return new Node(value);
                }
            
                if(value < node.data){
                    node.left = insertNode(value, node.left);
                }
                else if(value > node.data){
                    node.right = insertNode(value, node.right);
                }                            
                return node;
            }      
            
            this.root = insertNode(value);
        },
        deleteItem: function(value){
            const findMin = function(node){
                let current = node;
                while(current.left !== null){
                    current = current.left;
                }
                return current.data;
            };
            
            const deleteNode = (value, node = this.root) => {
                if(node === null){
                    return node;
                }
    
                if(value < node.data){
                    node.left = deleteNode(value, node.left);
                }
                else if(value > node.data){
                    node.right = deleteNode(value, node.right);
                }
                else{
                    if(node.left === null){
                        return node.right;
                    }                    
                    if(node.right === null){
                        return node.left;
                    }
    
                    node.data = findMin(node.right);
                    node.right = deleteNode(node.data, node.right);
                }    
                return node;
            };
            
            this.root = deleteNode(value);
        },
        find: function(value){
            const findValue = (value, node = this.root) => {
                if(node === null || node.data === value) return node;
        
                if(value < node.data){
                    return findValue(value, node.left);
                }
                else{
                    return findValue(value, node.right);
                }
            }         
            return findValue(value);   
        },
        levelOrder: function(callback){
            if(!callback) throw new Error("Callback function is missing");
  
            const queue = [this.root];

            while(queue.length > 0){
                const node = queue.shift();
                callback(node);
                
                if(node.left !== null){
                    queue.push(node.left);
                } 
                
                if(node.right !== null){
                    queue.push(node.right);
                }
            }
        },
        inOrder: function(callback) {
            const inOrderFunc = (callback, node = this.root) => {
                if(!callback){
                    throw new Error("Callback function is missing");
                }
            
                if(node !== null){
                    inOrderFunc(callback, node.left);
                    callback(node);
                    inOrderFunc(callback, node.right);
                }
            }
            inOrderFunc(callback);
        },
        preOrder: function(callback) {
            const preOrderFunc = (callback, node = this.root) => {
                if(!callback){
                    throw new Error("Callback function is missing");
                }
            
                if(node !== null){
                    callback(node);
                    preOrderFunc(callback, node.left);                    
                    preOrderFunc(callback, node.right);
                }
            }
            preOrderFunc(callback);
        },
        postOrder: function(callback) {
            const postOrderFunc = (callback, node = this.root) => {
                if(!callback){
                    throw new Error("Callback function is missing");
                }
            
                if(node !== null){
                    postOrderFunc(callback, node.left);                    
                    postOrderFunc(callback, node.right);
                    callback(node);
                }
            }
            postOrderFunc(callback);
        },
        height: function(node){
            if(node === null){
                return -1;
            }
        
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);
        
            return Math.max(leftHeight, rightHeight) + 1;
        },
        depth: function(node){
            const depthFunc = (node, current = this.root, depth = 0) => {
                if(current === null){
                    return -1;
                } 
            
                if(node.data === current.data){
                    return depth;
                }
            
                if(node.data < current.data){
                    return depthFunc(node, current.left, depth + 1);
                }
                else{
                    return depthFunc(node, current.right, depth + 1);
                }
            }
            return depthFunc(node);
        },
        isBalanced: function(){
            const isBalancedFunc = (node = this.root) => {
                if(node === null){
                    return true;
                }
            
                const leftHeight = this.height(node.left);
                const rightHeight = this.height(node.right);
            
                if(Math.abs(leftHeight - rightHeight) > 1){
                    return false;
                } 
            
                return isBalancedFunc(node.left) && isBalancedFunc(node.right);
            }            
            return isBalancedFunc();
        },        
        rebalance: function(){
            const values = [];
            this.inOrder((node) => values.push(node.data));
            this.root = this.buildTree(values);
        },
        prettyPrint: function(node, prefix = "", isLeft = true){
            if(node === null){
                return;
            }
            if(node.right !== null){
                this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            
            if(node.left !== null){
                this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        },
        root: this.buildTree(arr)         
    };
}