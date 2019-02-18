const users = [
  { userid: 'aa@gmail.com', password: '1111', admin: true, snsId: '', provider: '' },
  { userid: 'bb@gmail.com', password: '1111', admin: false, snsId: '', provider: '' },
  { userid: 'cc@gmail.com', password: '1111', admin: false, snsId: '', provider: '' }
];

const findAll = () => users;

const findOne = userid => users.find(item => item.userid === userid);

const findBySnsId = snsId => users.find(item => item.snsId === snsId);

const addOne = user => {
  users.push(user);
  return user;
};

const updateOne = user => {
  const idx = users.findIndex(item => item.userid === user.userid);
  users.splice(idx, 1, user);
  return user;
};

const deleteOne = userid => {
  const idx = users.findIndex(item => item.userid === userid);
  users.splice(idx, 1);
  return true;
};

module.exports = {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
  findBySnsId
};
