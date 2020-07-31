'use strict'

module.exports = function(sequelize, DataTypes){
    const schedules = sequelize.define('schedules', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The title field is required'
                }
            }
        },
        start_date:{
            type: DataTypes.STRING,
        },
        type:{
            type: DataTypes.ENUM(['one_off', 'recurrent', 'recurrent_stop'])
        },
        end_date:{
            type: DataTypes.STRING
        },
        frequency: {
            type: DataTypes.INTEGER
        },
        recipients: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The recipients field is compulsary'
                }
            }
        },
        status: {
            type: DataTypes.ENUM(['pending', 'running', 'completed', 'cancelled']),
            defaultValue: 'pending'
        },
        document:{
            type: DataTypes.STRING
        },
        time_zone:{
            type: DataTypes.STRING
        }
    });

   // schedules.sync({force:true}) //{force:true}
    return schedules;
}