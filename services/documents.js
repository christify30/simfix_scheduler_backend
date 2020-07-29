const models = require('../models');
const multer = require('multer');
const response = require('../scripts/response');

class Documents {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async uploadDocument(err){
        const {file} = this.req;
        const { title  } = this.req.body
        if (err instanceof multer.MulterError) {
           // console.log(err);
            return response.error({ res: this.res,  error:err })
         } else if (err) {
            //console.log(err);
            return response.error({ res: this.res,  error:err })
          }
        try {
            const newDocument = await models.documents.create({
                title,
                uri: `https://solabstore.nyc3.digitaloceanspaces.com/${file.key.trim()}`
            });
            return response.success({ res:this.res, message:'Document uploaded successfully', data:newDocument })
        } catch (error) {
            return response.error({ res: this.res,  error:error })
        }
    }

    async viewDocuments() {
        try {
            const documents = await models.documents.findAll();
            return response.success({ res:this.res, message:'Documents pulled successfully', data: documents });
        } catch (error) {
            return response.error({ res: this.res, error:error })
        }
    }
}

module.exports = Documents;