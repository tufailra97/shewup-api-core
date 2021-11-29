export const RECORD_NOT_FOUND = {
  code: 'P2001',
  description: 'Record not found'
};

export const UNIQUE_CONSTRAINT_FAILED = {
  code: 'P2002',
  description: 'Unique constraint failed on the {constraint}'
};

export const FOREIGN_CONSTRAINT_FAILED = {
  code: 'P2003',
  description: 'Foreign key constraint failed on the field: {field_name}'
};

export const DATABASE_ERROR = {
  code: 'P2004',
  description: 'A constraint failed on the database: {database_error}'
};

export const INVALID_FIELD_VALUE = {
  code: 'P2005',
  description: 'Invalid value for the field: {field_name}'
};

export const NULL_CONSTRAINT_FAILED = {
  code: 'P2011',
  description: 'Null constraint failed on the field: {field_name}'
};

export const REQUIRED_FIELD_MISSING = {
  code: 'P2013',
  description: 'Required field missing: {field_name}'
};

export const RECORD_TO_DELETE_NOT_FOUND = {
  code: 'P2025',
  description: 'Record to delete does not exist.'
};
