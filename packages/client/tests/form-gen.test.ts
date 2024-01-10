import { act, renderHook } from '@testing-library/react';
import { useGeneratedFormSchema } from '../src/hooks/form-gen';
import { settings } from '../src/settings';

jest.mock('../src/settings', () => ({
  settings: {
    generateFormSchemaFn: jest.fn(),
  },
}));

describe('Form Generation', () => {
  describe('useGeneratedFormSchema', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
      settings.generateFormSchemaFn = jest.fn().mockResolvedValue({
        json_schema: 'mockJsonSchema',
        ui_schema: 'mockUiSchema',
      });
    });

    it('should initialize correctly', async () => {
      const { result } = renderHook(() => useGeneratedFormSchema());

      expect(result.current).toMatchObject({
        formSchema: null,
        generateFormSchema: expect.any(Function),
        uiSchema: undefined,
      });
    });

    it('should throw an error if generateFormSchemaFn is not defined', async () => {
      settings.generateFormSchemaFn = null;

      const { result } = renderHook(() => useGeneratedFormSchema());

      await expect(async () => {
        await act(async () => {
          await result.current.generateFormSchema('Test content', 'Test prompt');
        });
      }).rejects.toThrow('Cannot use form generator without generateFormSchemaFn');
    });

    it('should not call generateFormSchemaFn when content and prompt are empty', async () => {
      const testEmptyArgs = async (content: string, prompt: string) => {
        const { result } = renderHook(() => useGeneratedFormSchema());

        await act(async () => {
          await result.current.generateFormSchema(content, prompt);
        });

        expect(settings.generateFormSchemaFn).not.toHaveBeenCalled();
      };

      await testEmptyArgs('', '');
      await testEmptyArgs('Test content', '');
      await testEmptyArgs('', 'Test prompt');
    });

    it('should call setFormSchema and setUiSchema with correct parameters', async () => {
      const { result } = renderHook(() => useGeneratedFormSchema());

      await act(async () => {
        await result.current.generateFormSchema('Test content', 'Test prompt');
      });

      expect(result.current.formSchema).toEqual('mockJsonSchema');
      expect(result.current.uiSchema).toEqual('mockUiSchema');
      expect(result.current).toMatchObject({
        formSchema: 'mockJsonSchema',
        generateFormSchema: expect.any(Function),
        uiSchema: 'mockUiSchema',
      });
    });
  });
});
