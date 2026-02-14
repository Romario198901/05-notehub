import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import { useId } from 'react';
import type { newNote } from '../../types/note';
import * as Yup from 'yup';
interface NoteFormProps {
  onSubmit: (values: newNote) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}
const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Title is required'),
  content: Yup.string().max(500, 'Too Long!').required('Content is required'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});
export default function NoteForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: NoteFormProps) {
  const fieldId = useId();
  const initialFormValues: newNote = {
    title: '',
    content: '',
    tag: 'Todo',
  };
  const handleSubmit = async (
    values: newNote,
    actions: FormikHelpers<newNote>
  ) => {
    await onSubmit(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}
    >
      {({ isSubmitting: formikSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || formikSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
