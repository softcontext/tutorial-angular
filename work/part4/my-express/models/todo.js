module.exports = (sequelize, DataTypes) => {
  return sequelize.define('todo', {
    task: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
}
