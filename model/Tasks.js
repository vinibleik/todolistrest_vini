const tasks = [];

const newTask = (() => {
  let id = 0;
  return function (name, priority) {
    return {
      id: ++id,
      name,
      priority,
    };
  };
})();

module.exports = {
  /**
   * Return a new Task create using the name parameter.
   * @param {string} name Task name.
   * @param {string} priority Task priority
   * @returns {object}
   */
  new(name, priority) {
    let task = newTask(name, priority);
    tasks.push(task);
    return task;
  },

  /**
   * Update the task name with the given id and returns it, if the task doesn't exist return null.
   * @param {number} id Task id.
   * @param {string} name New task name.
   * @param {string} priority New task priority
   * @returns {object | null}
   */
  update(id, name, priority) {
    let task = this.getElementById(id);
    if (task) {
      task.name = name;
      task.priority = priority;
      return task;
    }
    return null;
  },

  /**
   * Returns the array containing all the tasks.
   * @returns {Array}
   */
  list() {
    return tasks;
  },
  /**
   * Returns the task given the id, undefined otherwise.
   * @param {number} id Task id
   * @returns {object | undefined}
   */
  getElementById(id) {
    return tasks.find((task) => task.id == id);
  },
  /**
   * Returns the position of the task with given id, -1 if not found.
   * @param {number} id Task id.
   * @returns {number}
   */
  getPositionById(id) {
    return tasks.findIndex((task) => task.id === id);
  },
  /**
   * Delete the task with the given id, returns true if success, false otherwise.
   * @param {number} id Task id.
   * @returns {boolean}
   */
  delete(id) {
    const i = this.getPositionById(id);
    if (i >= 0) {
      tasks.splice(i, 1);
      return true;
    }
    return false;
  },
};
