function findShortestPath(graph, source, destination) {
    const visited = new Set();
    const distances = {};
    const previous = {};
    const queue = [];

    distances[source] = 0;
    queue.push({ node: source, distance: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { node, distance } = queue.shift();

        if (node === destination) {
            const path = [];
            let current = destination;
            while (current) {
                path.unshift(current);
                current = previous[current];
            }
            return { path, distance: distances[destination] };
        }

        if (!visited.has(node)) {
            visited.add(node);
            for (const neighbor in graph[node]) {
                const alt = distances[node] + graph[node][neighbor];
                if (typeof distances[neighbor] === 'undefined' || alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = node;
                    queue.push({ node: neighbor, distance: alt });
                }
            }
        }
    }

    return { path: [], distance: Infinity }; // No path found
}

export {findShortestPath};