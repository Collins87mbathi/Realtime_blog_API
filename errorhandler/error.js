 class ApiError {
  constructor (status, message) {
  this.status = status;
  this.message = message;
  }
  static BadRequest(message) {
    return new ApiError(400,message);
  }

  static InternalError(message) { 
    return new ApiError(500,message);
  }

  static UnAuthorized(message) {
    return new ApiError(401,message);
  }
  static NotFound(message) { 
    return new ApiError(404, message);
  }
  static Forbidden(message) { 
    return new ApiError(403,message);
  }
 }


 module.exports = ApiError;