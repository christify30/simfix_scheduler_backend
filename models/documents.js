'use strict'
module.exports = function(sequelize, Datatypes) {
    const documents = sequelize.define('documents', {
        title: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The title field is required'
                }
            }
        },
        uri: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The uri field is required'
                }
            }
        }
    },{
        timestamps: true,
        sequelize,
        paranoid: true,
    });
    documents.associate = function(models) {
        models.documents.hasMany(models.schedules, {
            foreignKey: 'document_id'
        })
    }
    //documents.sync({force:true})
    return documents;
}