import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-express';
import { createDynamicMiddleware } from './helper';

const errorHandler = (result) => {
  let { message = 'Internal server error' } = result;
  const { error, status = 500 } = result;
  if (status === 401) {
    throw new AuthenticationError('must authenticate');
  }
  if (status === 403) {
    throw new ForbiddenError('server refuse to authorize it');
  }
  if (error) {
    let errorMessage = '';
    if (Array.isArray(error)) {
      error.forEach((obj) => {
        errorMessage = errorMessage === '' ? obj.msg : `${errorMessage} , ${obj.msg}`;
        message = message.concat(`: ${errorMessage}`);
      });
    } else if (typeof error === 'object' && Object.keys(error).length) {
      message = message.concat(`: ${error.message}`);
    } else if (typeof error === 'string') {
      errorMessage = error; // for string
      message = message.concat(`: ${errorMessage}`);
    }
    throw new ApolloError(message);
  } else {
    throw new ApolloError(message);
  }
};

const responseHandler = async (resolve, root, args, context, info) => {
  console.log(info.operation.operation, info.fieldName, 'args:', args);
  const result = await resolve(root, args, context, info);
  const { error } = result;
  //* * Handle Error */
  if (error) {
    console.log('Error:', error);
    errorHandler(result);
  }
  console.log('Output:', JSON.stringify(result));
  return result;
};

export default createDynamicMiddleware(responseHandler);
