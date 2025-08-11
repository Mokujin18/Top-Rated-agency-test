export const isError = (error: any): error is Error => {
	return 'message' in error;
};

const getErrorMessageFromOneError = (error: Error): string => {
	if ('message' in error) {
		return error.message;
	}
	return 'Unknown error';
};

export const getErrorMessage = (
	errors: Error | unknown,
): string => {
	if (!errors) {
		return '';
	}

	if (isError(errors)) {
		return getErrorMessageFromOneError(errors);
	}
	return 'Unknown error';
};
