const Joi = require('@hapi/joi')


const createuservalidation = (data)=>{
    const schema = Joi.object({
        name : Joi.string().regex(/(?=.*[' '][A-Z][a-z]).{6,}/).required(),
        emailorphone : Joi.string().regex(/([0-9]{9,})$|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/).required(),
        password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
        cpassword: Joi.string().required().valid(Joi.ref('password')),
    });

    return schema.validate(data)
}

const userloginvalidation = (data)=>{

    const schema = Joi.object({
        emailorphone : Joi.string().regex(/([0-9]{9,})$|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/).required(),
        password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
    });

    return schema.validate(data)
}

const userreportdatavalidation = (data)=>{
    const schema = Joi.object({
        subject : Joi.string().required(),
        issue : Joi.string().required(),
        image : Joi.string().allow('').uri(),
        token : Joi.string().required(),
    });

    return schema.validate(data)
}

const createdoctorvalidation = (data)=>{
    const schema = Joi.object({
        name : Joi.string().regex(/(?=.*[' '][A-Z][a-z]).{6,}/).required(),
        email : Joi.string().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/).required(),
        image : Joi.string().allow('').uri(),
        password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
        cpassword: Joi.string().required().valid(Joi.ref('password')),
    });

    return schema.validate(data)
}

const doctorloginvalidation = (data)=>{

    const schema = Joi.object({
        email : Joi.string().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/).required(),
        password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
    });

    return schema.validate(data)
}

const doctorresponsedatavalidation = (data)=>{
    const schema = Joi.object({
        issue_id : Joi.string().required(),
        response : Joi.string().required(),
        token : Joi.string().required(),
    });

    return schema.validate(data)
}

module.exports= {createuservalidation,
                userloginvalidation,
                userreportdatavalidation,
                doctorloginvalidation,
                createdoctorvalidation,
                doctorresponsedatavalidation}
