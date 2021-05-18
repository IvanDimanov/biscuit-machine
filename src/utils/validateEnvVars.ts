import Joi from 'joi'

const envVarSchema = {
  REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN: Joi
    .number()
    .min(0)
    .max(1000),

  REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX: Joi
    .number()
    .min(Joi.ref('REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN'))
    .max(1000),
}


const { error } = Joi.object()
  .keys(envVarSchema)
  .required()
  .validate(process.env, {
    abortEarly: false,
    allowUnknown: true, // We need to allow unknown ENV VARs
                        // since Webpack is using some custom ENV VARs such as `FAST_REFRESH`
  })


if (error) {
  throw new ReferenceError(`Invalid ENV VAR:
${error.details
    .map(({ message, context }) => `  ${message}; currently ${context?.key}=${context?.value}`)
    .join('\n')}
\n`)
}
