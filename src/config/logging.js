/* eslint-disable no-shadow */

// TODO: check why logger not working properly
const logging =  {
  requestDidStart(requestContext) {
    // console.log('request started');
    // console.log(requestContext.request.query);
    // console.log(requestContext.request.variables);
    return {
      didEncounterErrors(requestContext) {
        console.log(`an error happened in response to query ${requestContext.request.query}`);
        console.log(requestContext.errors);
      },
    };
  },

  willSendResponse(requestContext) {
    console.log('response sent', requestContext.response);
  },
};

export default logging;
