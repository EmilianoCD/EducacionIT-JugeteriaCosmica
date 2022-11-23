const PERSISTENCE_TYPE = {
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: process.env.PORT || 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB, 
    MONGODB_CONNECTION_STR: 'mongodb+srv://Emi_CazanetzDIck:13071983@e-commercecosmica.ix29rts.mongodb.net/JugueteriaCosmica?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 2000,  
};


export {PERSISTENCE_TYPE, config as default};