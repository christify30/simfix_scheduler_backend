'use strict'

module.exports = function(sequelize, DataTypes) {
    const schedules = sequelize.define('schedules', {
        type: {
            type: DataTypes.ENUM(['one_off', 'continues', 'with_stop'])
        },
        interval: {
            type: DataTypes.INTEGER
        },
        start_date: {
            type:DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The start date is required'
                }
            }
        },
        end_date: {
            type: DataTypes.DATE
        },
        document_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'The document id is required'
                }
            }
        },
        users: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull:false,
            validate: {
                notNull: {
                    msg: 'you must include users'
                }
            }
        }
    },{
        timestamps: true,
        sequelize,
        paranoid: true,
    });
    schedules.associate = function(models){
        models.schedules.belongsTo(models.documents, {
            foreignKey: 'document_id',
        })
    }
    return schedules;
}