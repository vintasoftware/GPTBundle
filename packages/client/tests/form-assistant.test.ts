import { act, renderHook } from '@testing-library/react';
import { useFormAssistant } from '../src/hooks/form-assistant';
import { AssistantArgsType, settings } from '../src/settings';

jest.mock('../src/settings', () => ({
  settings: {
    generateFormAutofillFn: jest.fn(),
  },
}));

describe('Form Assistant', () => {
  describe('useFormAssistant', () => {
    let assistantArgs: AssistantArgsType;
    let formGetValues: () => Record<string, string>;
    const formSetValues: (values: Record<string, string>) => unknown = jest.fn();

    beforeEach(() => {
      settings.generateFormAutofillFn = jest.fn();

      assistantArgs = {
        pageTitle: 'Test Page Title',
        formTitle: 'Create Issue',
        fieldsToFill: ['title', 'description', 'category', 'priority'],
        fields: {
          title: 'Fix N+1s in Django codebase',
          description: 'Use prefetch...',
          category: '',
          priority: 'Medium',
        },
        fieldLabels: {
          title: ['Issue title'],
          description: ['Issue description'],
          category: ['Issue category (Bug, Feature, Improvement)'],
          priority: ['Issue priority (High, Medium, Low)'],
        },
        fieldChoices: {
          category: ['Bug', 'Feature', 'Improvement'],
          priority: ['High', 'Medium', 'Low'],
        },
      };
      formGetValues = jest.fn().mockReturnValue(assistantArgs.fields);
    });

    it('should throw an error if generateFormAutofillFn is not defined', async () => {
      settings.generateFormAutofillFn = null;

      const { result } = renderHook(() => useFormAssistant({ ...assistantArgs, formGetValues, formSetValues }));

      await expect(async () => {
        await act(async () => {
          await result.current.fillSingleField('category');
        });
        expect(settings.generateFormAutofillFn).not.toHaveBeenCalled();
      }).rejects.toThrow('Cannot use form assistant without generateFormAutofillFn');

      await expect(async () => {
        await act(async () => {
          await result.current.fillFields();
        });
        expect(settings.generateFormAutofillFn).not.toHaveBeenCalled();
      }).rejects.toThrow('Cannot use form assistant without generateFormAutofillFn');
    });

    it('should handle optional args and call the generator with default values', async () => {
      (settings.generateFormAutofillFn as jest.Mock).mockResolvedValue([
        { name: 'title', value: 'Fix N+1s in Django codebase' },
        { name: 'description', value: 'Use prefetch...' },
        { name: 'category', value: 'Improvement' },
        { name: 'priority', value: 'Medium' },
      ]);

      const { result } = renderHook(() =>
        useFormAssistant({
          formGetValues,
          formSetValues,
          pageTitle: undefined,
          formTitle: undefined,
          fieldsToFill: undefined,
          fieldLabels: undefined,
          fieldChoices: undefined,
        }),
      );

      await act(async () => {
        await result.current.fillSingleField('category');

        expect(formGetValues).toHaveBeenCalled();
        expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({
          ...assistantArgs,
          pageTitle: '',
          formTitle: '',
          fieldsToFill: ['category'],
          fieldLabels: {},
          fieldChoices: {},
        });
        expect(formSetValues).toHaveBeenCalledWith({
          title: 'Fix N+1s in Django codebase',
          description: 'Use prefetch...',
          category: 'Improvement',
          priority: 'Medium',
        });
      });

      await act(async () => {
        await result.current.fillFields();

        expect(formGetValues).toHaveBeenCalled();
        expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({
          ...assistantArgs,
          pageTitle: '',
          formTitle: '',
          fieldsToFill: ['category'],
          fieldLabels: {},
          fieldChoices: {},
        });
        expect(formSetValues).toHaveBeenCalledWith({
          title: 'Fix N+1s in Django codebase',
          description: 'Use prefetch...',
          category: 'Improvement',
          priority: 'Medium',
        });
      });
    });

    it('fillSingleField should call generator with correct parameters', async () => {
      const fieldsToFill = ['category'];

      (settings.generateFormAutofillFn as jest.Mock).mockResolvedValue([
        { name: fieldsToFill[0], value: 'Improvement' },
      ]);

      const { result } = renderHook(() =>
        useFormAssistant({
          ...assistantArgs,
          fieldsToFill,
          formGetValues,
          formSetValues,
        }),
      );

      await act(async () => {
        await result.current.fillSingleField(fieldsToFill[0]);
      });

      expect(formGetValues).toHaveBeenCalled();
      expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({ ...assistantArgs, fieldsToFill });
      expect(formSetValues).toHaveBeenCalledWith({ [fieldsToFill[0]]: 'Improvement' });
    });

    it('fillFields should call generator with correct parameters when fieldsToFill is null', async () => {
      // fieldsToFill == null means only fill empty fields
      const fieldsToFill = ['category'];

      (settings.generateFormAutofillFn as jest.Mock).mockResolvedValue([
        { name: 'title', value: 'Fix N+1s in Django codebase' },
        { name: 'description', value: 'Use prefetch...' },
        { name: 'category', value: 'Improvement' },
        { name: 'priority', value: 'Medium' },
      ]);

      const { result } = renderHook(() =>
        useFormAssistant({
          ...assistantArgs,
          fieldsToFill: null,
          formGetValues,
          formSetValues,
        }),
      );

      await act(async () => {
        await result.current.fillFields();
      });

      expect(formGetValues).toHaveBeenCalled();
      expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({ ...assistantArgs, fieldsToFill });
      expect(formSetValues).toHaveBeenCalledWith({
        title: 'Fix N+1s in Django codebase',
        description: 'Use prefetch...',
        category: 'Improvement',
        priority: 'Medium',
      });
    });

    it("fillFields should call generator with correct parameters when fieldsToFill is '__all__'", async () => {
      // fieldsToFill === '__all__' means fill all fields, even if they have a value
      const fieldsToFill = ['title', 'description', 'category', 'priority'];

      (settings.generateFormAutofillFn as jest.Mock).mockResolvedValue([
        { name: 'title', value: 'Fix N+1s in Django codebase' },
        { name: 'description', value: 'Use prefetch...' },
        { name: 'category', value: 'Improvement' },
        { name: 'priority', value: 'Medium' },
      ]);

      const { result } = renderHook(() =>
        useFormAssistant({
          ...assistantArgs,
          fieldsToFill: '__all__',
          formGetValues,
          formSetValues,
        }),
      );

      await act(async () => {
        await result.current.fillFields();
      });

      expect(formGetValues).toHaveBeenCalled();
      expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({ ...assistantArgs, fieldsToFill });
      expect(formSetValues).toHaveBeenCalledWith({
        title: 'Fix N+1s in Django codebase',
        description: 'Use prefetch...',
        category: 'Improvement',
        priority: 'Medium',
      });
    });

    it('fillFields should call generator with correct parameters when fieldsToFill is an array', async () => {
      // fieldsToFill === ['category', 'priority'] means fill only those specified fields
      const fieldsToFill = ['category', 'priority'];

      (settings.generateFormAutofillFn as jest.Mock).mockResolvedValue([
        { name: 'category', value: 'Improvement' },
        { name: 'priority', value: 'Medium' },
      ]);

      const { result } = renderHook(() =>
        useFormAssistant({
          ...assistantArgs,
          fieldsToFill,
          formGetValues,
          formSetValues,
        }),
      );

      await act(async () => {
        await result.current.fillFields();
      });

      expect(formGetValues).toHaveBeenCalled();
      expect(settings.generateFormAutofillFn).toHaveBeenCalledWith({ ...assistantArgs, fieldsToFill });
      expect(formSetValues).toHaveBeenCalledWith({
        category: 'Improvement',
        priority: 'Medium',
      });
    });
  });
});
