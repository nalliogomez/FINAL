module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        nit: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Client;
};
  