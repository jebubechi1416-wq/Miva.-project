// planner.js — Academic Planner: add, complete, delete, filter tasks (DOM manipulation, events, arrays)

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('task-form');
  var input = document.getElementById('task-input');
  var prioritySelect = document.getElementById('task-priority');
  var list = document.getElementById('task-list');
  var emptyState = document.getElementById('planner-empty');
  var progressFill = document.getElementById('progress-fill');
  var progressLabel = document.getElementById('progress-label');
  var progressTrack = document.getElementById('progress-track');
  var tabAll = document.getElementById('tab-count-all');
  var tabActive = document.getElementById('tab-count-active');
  var tabDone = document.getElementById('tab-count-done');
  var clearDoneBtn = document.getElementById('clear-done-btn');
  var filterTabs = document.querySelectorAll('.filter-tab');

  if (!form) return; // not on planner page

  // In-memory array of task objects (per assignment: arrays + functions)
  var tasks = [
    { id: cryptoId(), title: 'Submit GPG encryption lab report', priority: 'high', done: false },
    { id: cryptoId(), title: 'Review Django models for capstone project', priority: 'medium', done: false },
    { id: cryptoId(), title: 'Prepare music theory lesson plan', priority: 'low', done: true }
  ];

  var currentFilter = 'all';

  function cryptoId() {
    return 't-' + Math.random().toString(36).slice(2, 10);
  }

  function visibleTasks() {
    if (currentFilter === 'active') return tasks.filter(function (t) { return !t.done; });
    if (currentFilter === 'done') return tasks.filter(function (t) { return t.done; });
    return tasks;
  }

  function render() {
    list.innerHTML = '';
    var shown = visibleTasks();

    emptyState.style.display = shown.length === 0 ? 'block' : 'none';
    emptyState.textContent = tasks.length === 0
      ? 'No tasks queued. Add one above to get started.'
      : 'No tasks match this filter.';

    shown.forEach(function (task) {
      var li = document.createElement('li');
      li.className = 'task-item priority-border-' + task.priority + (task.done ? ' done' : '');
      li.setAttribute('data-id', task.id);

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-check';
      checkbox.checked = task.done;
      checkbox.setAttribute('aria-label', 'Mark "' + task.title + '" as completed');
      checkbox.addEventListener('change', function () {
        toggleTask(task.id);
      });

      var title = document.createElement('span');
      title.className = 'task-title';
      title.textContent = task.title;

      var priority = document.createElement('span');
      priority.className = 'task-priority priority-' + task.priority;
      priority.textContent = task.priority;

      var actions = document.createElement('span');
      actions.className = 'task-actions';

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'del-btn';
      delBtn.textContent = 'delete';
      delBtn.setAttribute('aria-label', 'Delete task: ' + task.title);
      delBtn.addEventListener('click', function () {
        deleteTask(task.id);
      });

      actions.appendChild(delBtn);
      li.appendChild(checkbox);
      li.appendChild(title);
      li.appendChild(priority);
      li.appendChild(actions);
      list.appendChild(li);
    });

    updateStats();
  }

  function updateStats() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    var active = total - done;
    var pct = total === 0 ? 0 : Math.round((done / total) * 100);

    tabAll.textContent = total;
    tabActive.textContent = active;
    tabDone.textContent = done;

    progressFill.style.width = pct + '%';
    progressLabel.textContent = pct + '%';
    progressTrack.setAttribute('aria-valuenow', pct);
  }

  function addTask(title, priority) {
    tasks.unshift({ id: cryptoId(), title: title, priority: priority, done: false });
    render();
  }

  function toggleTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (task) task.done = !task.done;
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(function (t) { return !t.done; });
    render();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value) {
      input.focus();
      return;
    }
    addTask(value, prioritySelect.value);
    input.value = '';
    input.focus();
  });

  clearDoneBtn.addEventListener('click', clearCompleted);

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-filter');
      render();
    });
  });

  render();
});
