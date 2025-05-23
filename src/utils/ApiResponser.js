module.exports = {
    success(data = {}, message = null, code = 200) {
      return {
          code: code,
          status: 'success',
          message: message,
          data: data
      };
    },
  
    error(data = {}, message = null, code = 400) {
      return {
          code: code,
          status: 'error',
          message: message,
          data: data
      };
    },
  
    withPagination(pagination, resource, alias = 'items') {
      const data = {
        [alias]: resource, // sudah dalam bentuk array of objects
        pagination: {
          total: pagination.total,
          perPage: pagination.perPage,
          currentPage: pagination.currentPage,
          lastPage: pagination.lastPage
        }
      };
  
      return this.success(data);
    },
  
    validationError(data) {
      return this.error(data, 'Validation error', 422);
    }
  };
  