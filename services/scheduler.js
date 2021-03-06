const CronJob = require('cron').CronJob;
const job = require('../scripts/job');
const mailer = require('./mailer');
const {template} = require('../scripts/emailTemplate');
const models = require('../models');

class Scheduler {
    constructor(task){
        this.id = task.id;
        this.recipients = task.recipients;
        this.date = {
            start_date: task.start_date,
            end_date: task.end_date
        };
        this.document = task.document;
        this.type = task.type;
        this.frequency = task.frequency
    }

    startAt() {
       // console.log('Before job instantiation');
        const date = new Date(this.date.start_date),
        end_date = new Date((this.date.end_date || 0)),
        continueUntil = this.continueUntil, continues = this.continues, oneOff = this.oneOff,
        id = this.id,
        document = this.document,
        recipients = this.recipients,
        frequency = this.frequency,
        updateTask =this.updateTask,
        getPattern = this.getPattern,
        type = this.type;
        job[id] = new CronJob(date, function() {
            const d = new Date();
           // console.log('Specific date:', date, ', onTick at:', d);
            switch(type){
                case 'one_off':
                    oneOff(recipients, document)
                    updateTask(id,'completed')
                break;
                case 'recurrent':
                    continues(recipients, document, frequency, id, updateTask, getPattern)
                break;
                case 'recurrent_stop':
                    continueUntil(recipients, document, frequency, id, end_date, updateTask, getPattern)
                break;
                default :
                break
            }
        });
        //console.log('After job instantiation');
        job[id].start();
    }

    continueUntil(recipients, document, frequency, id, end_date, updateTask, getPattern){
           // console.log('Before job instantiation');
            updateTask(id,'running')
            const cron_pattern = getPattern(frequency);
            mailer(template.sendDucomentTemplate(recipients, document))
            job[id] = new CronJob(cron_pattern, function() {
            mailer(template.sendDucomentTemplate(recipients, document))
            const d = new Date();
            //console.log('At every  Minutes: sending mails', d);
        });
        job[id].start();
        job[id]['1'] = new CronJob(end_date, function() {
            const d = new Date();
            //console.log('Specific date:', date2, ',stop sending mails... onTick at:', d);
            try{
                job[id].stop();
                job[id]['1'].stop();
                updateTask(id,'completed')
            }catch(error){
                //log error
            }    
        });
        job[id]['1'].start();
    }

    continues(recipients, document, frequency, id, updateTask, getPattern){
        //console.log('Before job instantiation');
        updateTask(id,'running')
       // console.log("cron_pattern");
        const cron_pattern = getPattern(frequency);
       // console.log(cron_pattern);
        
        mailer(template.sendDucomentTemplate(recipients, document)) 
        job[id] = new CronJob(cron_pattern, function() {
        //const d = new Date();
        mailer(template.sendDucomentTemplate(recipients, document)) 
       // console.log('At Ten Minutes:', d);
       });
       //console.log('After job instantiation');
       job[id].start();
    }

    oneOff(recipients, document){
       // console.log("sent once");
        mailer(template.sendDucomentTemplate(recipients, document))
    }

    async updateTask(id,status){
        try {
          const task = await models.schedules.update({
                status: status
            },{
                where: {
                    id:id
                }
            });
            return task
            //log task status
        }catch(error){
            //log error
            return false;
        }
    }
    stop(){
        try {
            if(this.type != 'recurrent_stop'){
                job[this.id].stop();
            }else{
                job[this.id].stop();
                job[this.id]['1'].stop();
            }
            this.updateTask(this.id,'cancelled')
            return true
        } catch (error) {
            //console.log(error);
            this.updateTask(this.id,'cancelled')
            return false;
        }
    }

    getPattern(frequency){
        const Frequency = Number(frequency);
        let cron_pattern = '* * * * * *'
        if(Frequency<60){
            cron_pattern = `0 */${frequency} * * * *`
        }else if(Frequency >= 60 && Frequency < 1440 ) {
            cron_pattern = `0 0 */${(Number(frequency)/Number(60))} * * *`
        }else if(Frequency >= 1440) {
            cron_pattern = `0 0 0 */${(Number(frequency)/Number(1440))} * *`
        }  
    
        return cron_pattern
     
    }
}



module.exports = Scheduler;
 