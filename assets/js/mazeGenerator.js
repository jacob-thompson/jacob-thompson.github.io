maze = {};
maze.width = maze.height = 50;
maze.grid = [];

var drawn = false;
var solved = false;
var visualize = true;
var drawing = false;

const canvas = document.createElement("canvas");
const contentWrap = document.getElementsByClassName("page__content")[0];
canvas.id = "mazeCanvas";
canvas.style.border = "1px solid #000000";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resizeCanvas() {
    canvas.width = canvas.height = contentWrap.clientWidth;
}

function drawMaze()
{
    if (!drawn) {
        const body = document.getElementsByClassName("app")[0];
        resizeCanvas();
        body.appendChild(canvas);

        drawn = true;

        window.addEventListener("resize", function() {
            if (drawing) {
                resizeCanvas();
                drawMaze();
                if (solved) {
                    solved = false; // Redraw the solution
                    solveMaze();
                }
            } else {
                const flag = visualize;
                visualize = false;
                resizeCanvas();
                drawMaze();
                if (solved) {
                    solved = false; // Redraw the solution
                    solveMaze();
                }
                visualize = flag;
            }
        });
    }

    if (!drawing) {
        document.getElementById("solveButton").disabled = false;
    } else {
        document.getElementById("solveButton").disabled = true;
    }

    const context = canvas.getContext("2d");
    context.reset();

    var cellWidth = canvas.width / maze.width;
    var cellHeight = canvas.height / maze.height;

    context.lineWidth = 1;

    for (var i = 0; i < maze.width; i++) {
        for (var j = 0; j < maze.height; j++) {
            const node = maze.grid[i][j];
            const x = i * cellWidth;
            const y = j * cellHeight;

            if (node.walls[0]) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + cellWidth, y);
                context.stroke();
            }
            if (node.walls[1]) {
                context.beginPath();
                context.moveTo(x + cellWidth, y);
                context.lineTo(x + cellWidth, y + cellHeight);
                context.stroke();
            }
            if (node.walls[2]) {
                context.beginPath();
                context.moveTo(x + cellWidth, y + cellHeight);
                context.lineTo(x, y + cellHeight);
                context.stroke();
            }
            if (node.walls[3]) {
                context.beginPath();
                context.moveTo(x, y + cellHeight);
                context.lineTo(x, y);
                context.stroke();
            }
        }
    }

    // Draw the start and end points
    context.fillStyle = "red";
    context.fillRect(0, 0, cellWidth - 1, cellHeight - 1);
    context.fillRect(canvas.width - cellWidth, canvas.height - cellHeight, cellWidth - 1, cellHeight - 1);
}

async function generateMaze()
{
    if (drawing)
        return;

    if (visualize)
        drawing = true;

    console.log("Generating maze...");

    solved = false;

    if (document.getElementById("solveButton") != null)
        solveButton.value = "Show Solution";

    for (var i = 0; i < maze.width; i++) {
        maze.grid[i] = [];
        for (var j = 0; j < maze.height; j++) {
            maze.grid[i][j] = {};
            maze.grid[i][j].x = i;
            maze.grid[i][j].y = j;
            maze.grid[i][j].visited = false;
            maze.grid[i][j].walls = [true, true, true, true];
        }
    }

    var currentCell = maze.grid[Math.floor(Math.random() * maze.width)][Math.floor(Math.random() * maze.height)];

    var stack = [];

    currentCell.visited = true;

    var done = false;
    while (!done) {
        var neighbors = [];
        if (currentCell.x > 0 && !maze.grid[currentCell.x - 1][currentCell.y].visited)
            neighbors.push(maze.grid[currentCell.x - 1][currentCell.y]);
        if (currentCell.x < maze.width - 1 && !maze.grid[currentCell.x + 1][currentCell.y].visited)
            neighbors.push(maze.grid[currentCell.x + 1][currentCell.y]);
        if (currentCell.y > 0 && !maze.grid[currentCell.x][currentCell.y - 1].visited)
            neighbors.push(maze.grid[currentCell.x][currentCell.y - 1]);
        if (currentCell.y < maze.height - 1 && !maze.grid[currentCell.x][currentCell.y + 1].visited)
            neighbors.push(maze.grid[currentCell.x][currentCell.y + 1]);

        if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

            if (randomNeighbor.x < currentCell.x) {
                currentCell.walls[3] = false;
                randomNeighbor.walls[1] = false;
            }
            else if (randomNeighbor.x > currentCell.x) {
                currentCell.walls[1] = false;
                randomNeighbor.walls[3] = false;
            }
            else if (randomNeighbor.y < currentCell.y) {
                currentCell.walls[0] = false;
                randomNeighbor.walls[2] = false;
            }
            else if (randomNeighbor.y > currentCell.y) {
                currentCell.walls[2] = false;
                randomNeighbor.walls[0] = false;
            }

            stack.push(currentCell);
            currentCell = randomNeighbor;
            currentCell.visited = true;
        } else if (stack.length > 0) {
            currentCell = stack.pop();
        } else {
            done = true;
        }

        if (visualize) {
            drawMaze();
            await sleep(1);
        }
    }

    drawing = false;
    drawMaze();
    console.log("Maze generated.");
}

function drawSolution(path)
{
    const canvas = document.getElementById("mazeCanvas");
    const context = canvas.getContext("2d");

    var cellWidth = canvas.width / maze.width;
    var cellHeight = canvas.height / maze.height;

    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(cellWidth / 2, cellHeight / 2);

    for (var i = 0; i < path.length; i++) {
        const x = path[i].x * cellWidth + cellWidth / 2;
        const y = path[i].y * cellHeight + cellHeight / 2;
        context.lineTo(x, y);
    }

    context.stroke();
}

async function solveMaze()
{
    if (drawing)
        return;

    if (visualize)
        drawing = true

    if (!solved)
        console.log("Solving maze...");

    try {
        for (var i = 0; i < maze.width; i++)
        for (var j = 0; j < maze.height; j++)
        maze.grid[i][j].visited = false;
    } catch (e) {
        const link = "https://github.com/jacob-thompson/jacob-thompson.github.io/issues";
        console.log(e);
        console.log("PLEASE REPORT THIS ISSUE: " + link);
        return;
    }

    var popped = false;
    var path = [];
    var currentCell = maze.grid[0][0];
    currentCell.visited = true;
    path.push(currentCell);

    while (currentCell.x != maze.width - 1 || currentCell.y != maze.height - 1) {
        var neighbors = [];
        if (currentCell.x > 0 && !currentCell.walls[3])
            neighbors.push(maze.grid[currentCell.x - 1][currentCell.y]);
        if (currentCell.x < maze.width - 1 && !currentCell.walls[1])
            neighbors.push(maze.grid[currentCell.x + 1][currentCell.y]);
        if (currentCell.y > 0 && !currentCell.walls[0])
            neighbors.push(maze.grid[currentCell.x][currentCell.y - 1]);
        if (currentCell.y < maze.height - 1 && !currentCell.walls[2])
            neighbors.push(maze.grid[currentCell.x][currentCell.y + 1]);

        var nextCell = null;
        for (var i = 0; i < neighbors.length; i++) {
            if (!neighbors[i].visited) {
                neighbors[i].visited = true;
                nextCell = neighbors[i];
                break;
            }
        }

        if (nextCell == null) {
            currentCell = path.pop();
            popped = true;
        } else {
            if (popped) {
                path.push(currentCell);
                popped = false;
            }
            path.push(nextCell);
            currentCell = nextCell;
        }

        if (visualize && !solved) {
            drawMaze();
            drawSolution(path);
            await sleep(1);
        }
    }

    drawing = false;

    const button = document.getElementById("solveButton");
    if (!solved) {
        solved = true;
        drawMaze();
        drawSolution(path);
        button.value = "Hide Solution";
        console.log("Maze solved.");
    } else {
        solved = false;
        drawMaze();
        button.value = "Show Solution";
        console.log("Maze solution hidden.");
    }
}

function toggleVisualizer()
{
    visualize = !visualize;
    const button = document.getElementById("visualizeButton");
    if (visualize) {
        button.value = "Visualize ☑";
        console.log("Visualizer enabled.");
    } else {
        button.value = "Visualize ☐";
        console.log("Visualizer disabled.");
    }
}
