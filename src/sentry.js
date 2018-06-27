export const logErrorToMyService = (error, info) => {
  console.warn('This will be reported to sentry: ', error, info)
}
