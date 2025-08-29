function formatJoiError(err) {
    const msg = err.details ? err.details.map(d => d.message).join(', ') : err.message;
    const e = new Error(msg);
    e.code = "VALIDATION_ERROR";
    return e;
  }
module.exports={
    formatJoiError,
}