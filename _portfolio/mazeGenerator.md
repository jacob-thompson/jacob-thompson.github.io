---
title: "Maze Generator"
date: 2024-12-30
excerpt: "A web application that generates and solves mazes.<br/><img src='/images/mazeGenerator.png'>"
collection: portfolio
redirect_from:
  - /mazeGenerator/
  - /mazeGenerator.html
  - /maze-generator/
  - /maze-generator.html
  - /maze/
  - /maze.html
---

The Maze Generator uses depth-first search algorithms to generate & solve mazes, and allows users to visualize these processes. The generator, solver, and visualizer are built [in JavaScript](/assets/js/mazeGenerator.js), and the HTML5 `canvas` element is used to draw the maze. All [source code](https://github.com/jacob-thompson/jacob-thompson.github.io) is available on GitHub.

<div container class="app">
    <div style="padding-bottom:10px" class="buttons">
        <input type="button" id="generateButton" value="Generate Maze">
        <input type="button" id="solveButton" value="Show Solution" disabled>
        <input type="button" id="visualizeButton" value="Visualize ☑">
    </div>
</div>

<script>
document.getElementById("generateButton").addEventListener("click", function() {
    generateMaze();
});
document.getElementById("solveButton").addEventListener("click", function() {
    solveMaze();
});
document.getElementById("visualizeButton").addEventListener("click", function() {
    toggleVisualizer();
});
</script>

<script src="{{ base_path }}/assets/js/mazeGenerator.js"></script>
