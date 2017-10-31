var LIST_NAME = 'test-app_todo-items';

angular
    .module('myApp', [])
    .controller('myCtrl', function($scope) {
        $scope.currentTodo = null;
        $scope.importance = "Обычная";
        readFromLocalStorage();

        $scope.addTodo = function () {
            if ($scope.name) {
                var todoList = $scope.todos;
                todoList.push({
                    id: Date.now(),
                    name: $scope.name,
                    description: $scope.description,
                    importance: $scope.importance,
                    dateDeadline: $scope.dateDeadline,
                    status: "В процессе"
                });
                writeToLocalStorage();
                resetForm();
            }
        };

        $scope.saveTodo = function() {
            if ($scope.currentTodo) {
                var todo = $scope.todos.find(function(item) {
                    return item.id === $scope.currentTodo;
                });
                todo.name = $scope.name;
                todo.description = $scope.description;
                todo.importance = $scope.importance;
                todo.dateDeadline = $scope.dateDeadline;
                $scope.currentTodo = null;
                writeToLocalStorage();
                resetForm();
            }
        };

        $scope.editTodo = function(todo) {
            $scope.currentTodo = todo.id;
            $scope.name = todo.name;
            $scope.description = todo.description;
            $scope.importance = todo.importance;
            $scope.dateDeadline = new Date(todo.dateDeadline);
        };

        $scope.removeTodo = function(todo) {
            var todoNum = $scope.todos.indexOf(todo);
            console.log(todoNum);
            $scope.todos.splice(todoNum, 1);
            writeToLocalStorage();
        };

        $scope.performanceTodo = function(todo) {
            var numTodo = $scope.todos.indexOf(todo);
            if ($scope.todos[numTodo].status === "В процессе") {
                $scope.todos[numTodo].datePerformance = new Date();
                var parsePerformance = Date.parse($scope.todos[numTodo].datePerformance);
                var parseDeadline = Date.parse($scope.todos[numTodo].dateDeadline);
                if (parsePerformance < parseDeadline) {
                    $scope.todos[numTodo].status = "Выполнено";
                } else {
                    $scope.todos[numTodo].status = "Выполнено c опозданием";
                }
            } else if ($scope.todos[numTodo].status !== "В процессе") {
                $scope.todos[numTodo].status = "В процессе";
                $scope.todos[numTodo].datePerformance = '-';
            }
            writeToLocalStorage();
        };

        function readFromLocalStorage() {
            var str = localStorage.getItem(LIST_NAME);
            $scope.todos = JSON.parse(str) || [];
        }

        function writeToLocalStorage() {
            var todoList = $scope.todos;
            localStorage.setItem(LIST_NAME, JSON.stringify(todoList));
        }

        function resetForm() {
            $scope.name = '';
            $scope.description = '';
            $scope.dateDeadline = '';
            $scope.importance = "Обычная";
        }
    });
