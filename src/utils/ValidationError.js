class ValidationError extends Error {
  constructor(issues) {
    super('User data validation failed');
    this.name = 'VALIDATION_ERROR';
    this.issues = issues;
  }
}

export { ValidationError };
