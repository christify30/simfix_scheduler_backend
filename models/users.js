'use strict'

module.exports = function(sequelize, Datatypes) {
    const users = sequelize.define('users', {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The name field is required'
                }
            }
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "The email field is required"
                }
            }
        }
    },{
        timestamps: true,
        sequelize,
        paranoid: true,
    });
    //users.sync()
    return users;
}