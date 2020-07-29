const models = require('../models');
const response = require('../scripts/response');
const validate = require('../validator');

class Users {
    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    async addUser() {
        const { errors, isValid } = validate.user(this.req.body);
        if(!isValid) return response.error({ res: this.res, error:errors })
        const { name, email } = this.req.body;
        try {
            const newUser = await models.users.create({
                name,
                email
            })
            return response.success({ res:this.res, message:'User added successfully', data:newUser })
        } catch (error) {
            return response.error({ res: this.res, error:error })
        }
    }

    async viewUsers() {
        try {
            const users = await models.users.findAll();
            return response.success({ res:this.res, code:200, message:'users pulled successfully', data: users });
        } catch (error) {
            return response.error({ res: this.res, error:error })
        }
    }
}
module.exports = Users;