import { settings } from '../settings';

function asFormValues(gptAutofillData: Record<string, string>[]) {
  return gptAutofillData.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
}

export function useFormAssistant({
  pageTitle = '',
  formTitle = '',
  formGetValues,
  formSetValues,
  fieldsToFill = null,
  fieldLabels = {},
  fieldChoices = {},
}: {
  formTitle?: string,
  pageTitle?: string,
  formGetValues: () => Record<string, string>,
  formSetValues: (values: Record<string, string>) => unknown,
  fieldsToFill?: string[] | null | '__all__',
  fieldLabels?: Record<string, string[]>,
  fieldChoices?: Record<string, string[]>,
}) {
  async function fillSingleField(field: string) {
    if (!settings.generateFormAutofillFn) {
      throw new Error('Cannot use form assistant without generateFormAutofillFn');
    }

    const formValues = formGetValues();
    const gptAutofillData = await settings.generateFormAutofillFn({
      pageTitle,
      formTitle,
      fieldsToFill: [field],
      fields: formValues,
      fieldLabels,
      fieldChoices
    });
    formSetValues(asFormValues(gptAutofillData));
  }

  async function fillFields() {
    if (!settings.generateFormAutofillFn) {
      throw new Error('Cannot use form assistant without generateFormAutofillFn');
    }

    const formValues = formGetValues();
    if (!fieldsToFill) {
      fieldsToFill = Object.entries(formValues)
      .filter(([_, value]) => !value)
      .map(([field, _]) => field);
    }
    if (fieldsToFill === '__all__') fieldsToFill = Object.keys(formGetValues());

    const gptAutofillData = await settings.generateFormAutofillFn({
      pageTitle,
      formTitle,
      fieldsToFill,
      fields: formValues,
      fieldLabels,
      fieldChoices
    });
    formSetValues(asFormValues(gptAutofillData));
  }

  return { fillSingleField, fillFields };
}
