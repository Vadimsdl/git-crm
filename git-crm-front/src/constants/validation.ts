export const VALIDATION = {
  EMAIL: {
    REQUIRED: "Email is required",
    INVALID: "Please enter a valid email address",
    PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  PASSWORD: {
    REQUIRED: "Password is required",
    MIN_LENGTH: "Password must be at least 8 characters",
    MIN_LENGTH_VALUE: 8,
    MAX_LENGTH: "Password must be less than 32 characters",
    MAX_LENGTH_VALUE: 32,
    PATTERN:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    INVALID:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  },
};
