import Form from '@rjsf/core';
import { StrictRJSFSchema, RJSFSchema, FormContextType, Registry } from '@rjsf/utils';

import {
  AddButton,
  BaseInputTemplate,
  SubmitButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from './templates';

import './styles.css';

export default class SchemaForm<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> extends Form<T, S, F> {
  getRegistry(): Registry<T, S, F> {
    const registry = super.getRegistry();
    return {
      ...registry,
      templates: {
        ...registry.templates,
        BaseInputTemplate: this.props.templates?.BaseInputTemplate ?? BaseInputTemplate,
        ButtonTemplates: {
          SubmitButton: this.props.templates?.ButtonTemplates?.SubmitButton ?? SubmitButton,
          AddButton: this.props.templates?.ButtonTemplates?.AddButton ?? AddButton,
          CopyButton: this.props.templates?.ButtonTemplates?.CopyButton ?? CopyButton,
          MoveDownButton: this.props.templates?.ButtonTemplates?.MoveDownButton ?? MoveDownButton,
          MoveUpButton: this.props.templates?.ButtonTemplates?.MoveUpButton ?? MoveUpButton,
          RemoveButton: this.props.templates?.ButtonTemplates?.RemoveButton ?? RemoveButton,
        },
      },
    };
  }
}
