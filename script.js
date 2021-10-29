var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkStatus = function checkStatus(response) {
    if (response.ok) {
        // .ok returns true if response status is 200-299
        return response;
    }
    throw new Error('Request was either a 404 or 500');
};
var json = function json(response) {
    return response.json();
};

var Task = function (_React$Component) {
    _inherits(Task, _React$Component);

    function Task() {
        _classCallCheck(this, Task);

        return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
    }

    _createClass(Task, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                task = _props.task,
                onDelete = _props.onDelete,
                onComplete = _props.onComplete;
            var id = task.id,
                content = task.content,
                completed = task.completed;


            return React.createElement(
                "div",
                { className: "row mb-1" },
                React.createElement(
                    "p",
                    { className: "col" },
                    content
                ),
                React.createElement(
                    "button",
                    {
                        onClick: function onClick() {
                            return onDelete(id);
                        }
                    },
                    "Delete"
                ),
                React.createElement("input", {
                    className: "d-inline-block mt-2",
                    type: "checkbox",
                    onChange: function onChange() {
                        return onComplete(id, completed);
                    },
                    checked: completed
                })
            );
        }
    }]);

    return Task;
}(React.Component);

var ToDoList = function (_React$Component2) {
    _inherits(ToDoList, _React$Component2);

    function ToDoList(props) {
        _classCallCheck(this, ToDoList);

        var _this2 = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

        _this2.state = {
            new_task: '',
            tasks: []
        };
        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        _this2.fetchTasks = _this2.fetchTasks.bind(_this2);
        return _this2;
    }

    _createClass(ToDoList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchTask();
        }
    }, {
        key: "fetchTasks",
        value: function fetchTasks() {
            var _this3 = this;

            fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=157").then(checkStatus).then(json).then(function (response) {
                console.log(response);
                _this3.setState({ tasks: response.tasks });
            }).catch(function (error) {
                console.log(error.message);
            });
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ new_task: event.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            var new_task = this.state.new_task;

            new_task = new_task.trim();
            if (!new_task) {
                return;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                new_task = _state.new_task,
                tasks = _state.tasks;

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-12" },
                        React.createElement(
                            "h2",
                            { className: "mb-3" },
                            "To Do List"
                        ),
                        tasks.length > 0 ? tasks.map(function (task) {
                            return React.createElement(Task, { key: task.id, task: task });
                        }) : React.createElement(
                            "p",
                            null,
                            "no tasks here"
                        ),
                        React.createElement(
                            "form",
                            { onSubmit: this.handleSubmit, className: "form-inline my-4" },
                            React.createElement("input", {
                                type: "text",
                                className: "form-control mr-sm-2 mb-2",
                                placeholder: "new task",
                                value: new_task,
                                onChange: this.handleChange
                            }),
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary mb-2" },
                                "Submit"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ToDoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root'));