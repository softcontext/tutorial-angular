const { User, Todo } = require('../models');

// Insert Dummy Data for Test
module.exports = async () => {
  try {
    await User.create({ name: 'oliver', age: 20, married: false, comment: 'programmer' });
    await User.create({ name: 'jack', age: 21, married: false, comment: 'designer' });
    await User.create({ name: 'harry', age: 30, married: true, comment: 'programmer' });
    await User.create({ name: 'jacob', age: 25, married: false, comment: 'designer' });
    await User.create({ name: 'charlie', age: 34, married: false, comment: 'programmer' });
    await User.create({ name: 'thomas', age: 33, married: false, comment: 'designer' });
    await User.create({ name: 'george', age: 40, married: true, comment: 'teacher' });
    await User.create({ name: 'oscar', age: 49, married: true, comment: 'salesman' });
    await User.create({ name: 'james', age: 55, married: false, comment: 'salesman' });
    await User.create({ name: 'william', age: 66, married: true, comment: 'none' });
    await User.create({ name: 'jake', age: 18, married: false, comment: 'teacher' });
    console.log('▶ 11 users inserted.');
    
    await Todo.create({ owner: 1, task: 'to learn node 1', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 2', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 3', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 4', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 5', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 6', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 7', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 8', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 9', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 10', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 11', done: false });
    console.log('▶ 11 todos inserted.');
  } catch (err) {
    console.error(err);
    throw err;
  }
}
