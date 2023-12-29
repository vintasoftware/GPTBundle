import { ActionIcon, Button, TextInput } from '@mantine/core';
import { ChangeEvent, FocusEvent } from 'react';
import {
  BaseInputTemplateProps,
  RJSFSchema,
  FormContextType,
  IconButtonProps,
  getSubmitButtonOptions,
  SubmitButtonProps,
  StrictRJSFSchema,
} from '@rjsf/utils';

import './styles.css';
import {
  IconArrowBarDown,
  IconArrowBarUp,
  IconCopy,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

export function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    id,
    options,
    value,
    type,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    rawErrors,
    hideError,
  } = props;
  const onTextChange = ({ target: { value: val } }: ChangeEvent<HTMLInputElement>) => {
    // Use the options.emptyValue if it is specified and newVal is also an empty string
    onChange(val === '' ? options.emptyValue || '' : val);
  };
  const onTextBlur = ({ target: { value: val } }: FocusEvent<HTMLInputElement>) => onBlur(id, val);
  const onTextFocus = ({ target: { value: val } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, val);

  const hasError = rawErrors?.length && rawErrors.length > 0 && !hideError;

  return (
    <TextInput
      type={type}
      id={id}
      name={id}
      value={value || value === 0 ? value : ''}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      error={hasError ? rawErrors?.join('; ') : undefined}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
      required={required}
    />
  );
}

export function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ uiSchema }: SubmitButtonProps<T, S, F>) {
  const {
    submitText,
    norender,
    props: submitButtonProps = {},
  } = getSubmitButtonOptions<T, S, F>(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <div>
      <Button type="submit" {...submitButtonProps} className={submitButtonProps.className || ''}>
        {submitText}
      </Button>
    </div>
  );
}

export function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ className, onClick, disabled }: IconButtonProps<T, S, F>) {
  return (
    <ActionIcon
      variant="default"
      aria-label="Add"
      className={className || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ className, onClick, disabled }: IconButtonProps<T, S, F>) {
  return (
    <ActionIcon
      variant="default"
      aria-label="Copy"
      className={className || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <IconCopy style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ className, onClick, disabled }: IconButtonProps<T, S, F>) {
  return (
    <ActionIcon
      variant="default"
      aria-label="Move down"
      className={className || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <IconArrowBarDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ className, onClick, disabled }: IconButtonProps<T, S, F>) {
  return (
    <ActionIcon
      variant="default"
      aria-label="Move up"
      className={className || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <IconArrowBarUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ className, onClick, disabled }: IconButtonProps<T, S, F>) {
  return (
    <ActionIcon
      variant="default"
      aria-label="Remove"
      className={className || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
