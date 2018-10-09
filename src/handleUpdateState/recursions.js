export function updateState(oldNodes, data, id) {
    let newNodes = oldNodes.map((node) => {
        if (node.id === id) return updateTreeState(node, data);
        if(node.children && node.children.length > 0) {
            let children = updateState(node.children, data, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    return newNodes;
}

function updateTreeState(node, data) {
    node.children = data;
    node.count_child = data.length;
    return node;
}