import { defineRule, configure } from 'vee-validate';
import { required, email, min, max, min_value, max_value } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('min_value', min_value);
defineRule('max_value', max_value);

configure({
  generateMessage: context => {
    const params = Array.isArray(context.rule?.params) ? context.rule?.params : [];

    const messages: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      min: `This field must contain at least ${params[0]} symbols`,
      max: `This field must not contain more than ${params[0]} symbols`,
      min_value: `This field must be no less than ${params[0]}`,
      max_value: `This field must be no greater than ${params[0]}`,
    };

    const message = messages[context.rule?.name ?? ''];
    return message || `Field ${context.field} is not valid`;
}});
