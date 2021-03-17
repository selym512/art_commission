const sql = require('./db');

const CommissionModule = function(commissionModule){                        //  | Type              | Null  | Default           | Key
    this.module_id          = commissionModule.module_id;                   //  | varchar(255)      | NO    |                   | PRIMARY KEY
    this.user_id            = commissionModule.user_id;                     //  | varchar(255)      | NO    |                   | FOREIGN KEY
    this.commission_name    = commissionModule.commission_name;             //  | varchar(120)      | NO    |                   | 
    this.description        = commissionModule.description;                 //  | text              | NO    |                   | 
    this.tags               = commissionModule.tags;                        //  | text              | YES   | NULL              | 
    this.slots              = commissionModule.slots;                       //  | integer           | NO    |                   | 
    this.image_attachment   = commissionModule.image_attachment;            //  | varchar(255)      | YES   | NULL              | 
    this.nsfw               = commissionModule.nsfw;                        //  | boolean           | YES   | FALSE             | 
    this.active             = commissionModule.active;                      //  | boolean           | YES   | TRUE              | 
    this.date_created       = commissionModule.date_created;                //  | datetime          | NO    | CURRENT_TIMESTAMP | 
    this.date_modified      = commissionModule.date_modified;               //  | datetime          | NO    | NULL              | 
    this.deleted            = commissionModule.deleted;                     //  | boolean           | NO    | FALSE             | 
    this.date_deleted       = commissionModule.date_deleted;                //  | datetime          | NO    | NULL              | 
}

module.exports = CommissionModule