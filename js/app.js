// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

(function () {
    // Get HTML elements
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    // Update number of incomplete tasks
    function updateCounter() {
        const activeItems = todoList.querySelectorAll(
            'li:not(.completed)'
        );

        counter.textContent = activeItems.length + ' items left';
    }

    // Show tasks based on selected filter
    function applyFilter() {
        const items = todoList.querySelectorAll('li');

        items.forEach(function (item) {
            const completed = item.classList.contains('completed');

            if (currentFilter === 'all') {
                item.style.display = '';
            } else if (currentFilter === 'active') {
                item.style.display = completed ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = completed ? '' : 'none';
            }
        });
    }

    // Add a new task
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskText = input.value.trim();

        // Check for empty input
        if (taskText === '') {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');

        // Create list item
        const li = document.createElement('li');

        // Create task text
        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = taskText;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        input.value = '';

        applyFilter();
        updateCounter();
    });

    // Event delegation for completing and deleting tasks
    todoList.addEventListener('click', function (event) {
        const target = event.target;

        // Delete task
        if (target.classList.contains('delete-btn')) {
            target.closest('li').remove();
        }

        // Toggle completed task
        else if (target.classList.contains('item-text')) {
            target.closest('li').classList.toggle('completed');
        }

        applyFilter();
        updateCounter();
    });

    // Filter: All tasks
    filterAll.addEventListener('click', function () {
        currentFilter = 'all';
        applyFilter();
    });

    // Filter: Active tasks
    filterActive.addEventListener('click', function () {
        currentFilter = 'active';
        applyFilter();
    });

    // Filter: Completed tasks
    filterDone.addEventListener('click', function () {
        currentFilter = 'done';
        applyFilter();
    });

    // Initialize counter
    updateCounter();

})();
