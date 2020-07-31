const Scheduler = require('./scheduler');
const response = require('../scripts/response');
const models = require('../models');
const validation = require('../validator');

class Task {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

   async startTask() {
     const newTask = await this.saveTask();
     if(!newTask) return response.error({ res:this.res,  error: 'Failed to save task please try again' });
     const scheduler = new Scheduler(newTask);
     scheduler.startAt();
     return response.success({ res: this.res, message:'Task started successfully', data: this.req.body });
   }

   async stopTask() {
       const { id } = this.req.body;
       console.log(id);
       
       try {
           const task = await models.schedules.findOne({
               where:{
                   id:id
               }
           });
           if(!task) return response.error({res:this.res, error:'This task does not exist'});
           if(task.status == 'completed' || task.status == 'cancelled'){
            return response.error({res:this.res, error:`This task has been marked as ${task.status}`});
           }else{
             const scheduler = new Scheduler(task);
             if(scheduler.stop()) return response.success({ res: this.res, message:'Task stoped successfully', data:id });
             else response.error({ res:this.res,  error: 'Task not running' });
           }
       } catch (error) {
           //log error
           console.log(error);
           
           return response.error({res:this.res, error:'This task does not exist'});
       }
   }

   async saveTask(){
       try {
        const saveTask = await models.schedules.create({
            ...this.req.body,
            recipients: this.req.body.recipients.split(','),
            document: `https://solabstore.nyc3.digitaloceanspaces.com/${this.req.file.key}`,
        })
        return saveTask;
       } catch (error) {
           console.log(error);
           return false;
       }
   }

   async getTasks() {
       try {
           const tasks = await models.schedules.findAll({order: [['createdAt', 'DESC']]});
           return response.success({ res: this.res, message:'Task fetched successfully', data:tasks });
       } catch (error) {
           console.log(error);
           return response.error({ res:this.res,  error: 'Error fetching tasks' });
       }
   }

}

module.exports = Task;