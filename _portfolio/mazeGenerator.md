---
title: "Maze Generator"
date: 2024-12-30
excerpt: "A web application that generates and solves mazes.<br/><img src='/images/mazeGenerator.png'>"
collection: portfolio
---

The Maze Generator uses depth-first search algorithms to generate and solve mazes. The maze generator and the maze solver are implemented in JavaScript, and the HTML5 `canvas` element is used to draw the maze. The [source code](https://github.com/jacob-thompson/jacob-thompson.github.io) is available on GitHub.

<script src="{{ base_path }}/assets/js/mazeGenerator.js"></script>

<div container class="app">
    <div style="padding-bottom:10px" class="buttons">
        <button id="generateButton" onclick="generateMaze()" >Generate Maze</button>
    </div>
</div>