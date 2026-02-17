import { useParams, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { ElementRenderer } from '@/components/form-renderers/ElementRenderer';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useFormData } from '@/lib/providers/form-data-context';
import type { FilledForm, FormSchema, FormComponentValue } from '@/lib/form-builder/types/form';

export default function ViewFormPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('view-form');
  const formData = useFormData();

  const [form, setForm] = useState<FilledForm | null>(null);
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, FormComponentValue>>({});

  // Read mode from URL query params (view or edit)
  const mode = searchParams.get('mode') || 'view';
  const readOnly = mode !== 'edit';

  useEffect(() => {
    async function loadForm() {
      if (!id) return;

      setLoading(true);
      try {
        const loadedForm = await formData.getForm(id);
        if (loadedForm) {
          setForm(loadedForm);
          setFormValues(loadedForm.values);
          const loadedSchema = await formData.getSchema(loadedForm.schemaId);
          setSchema(loadedSchema);
        }
      } catch (error) {
        console.error('Failed to load form:', error);
      } finally {
        setLoading(false);
      }
    }

    loadForm();
  }, [id, formData]);

  const handleValueChange = (id: string, value: FormComponentValue) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (!form) return;

    setSaving(true);
    try {
      const updatedForm: FilledForm = {
        ...form,
        values: formValues,
      };
      await formData.saveForm(updatedForm);
      toast.success(t('saveSuccess'));
    } catch (error) {
      console.error('Failed to save form:', error);
      toast.error(t('saveError'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="bg-primary min-h-screen p-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!form || !schema) {
    return (
      <div>
        <Header />
        <div className="bg-primary min-h-screen p-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-muted-foreground">{t('notFound')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-background min-h-screen p-8">
        <div className="mx-auto max-w-4xl">
          {/* Floating Save Button */}
          {!readOnly && (
            <Button
              onClick={handleSave}
              disabled={saving}
              className="fixed top-20 right-8 z-50 shadow-lg"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? t('saving') : t('actions.save')}
            </Button>
          )}

          {/* Back Button */}
          <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('back')}
            </Button>
          </div>

          {/* Form Header */}
          <div className="border-primary-light bg-background mb-6 rounded-lg border-2 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-2xl font-bold">{form.title}</h1>
                <p className="text-muted-foreground text-sm">
                  {t('formId')}: {form.id}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t('estado')}: {t(`estados.${form.estado}`)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Show current mode indicator */}
                <div className="bg-muted flex items-center gap-2 rounded-md px-3 py-1.5">
                  {readOnly ? (
                    <>
                      <Eye className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground text-sm">{t('mode.view')}</span>
                    </>
                  ) : (
                    <>
                      <Pencil className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground text-sm">{t('mode.edit')}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Questions */}
          <div className="space-y-6">
            {schema.questions.map((question, index) => (
              <div
                key={question.id}
                className="border-primary-light bg-background rounded-lg border-2 p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium">{index + 1}.</span>
                </div>
                <div className="space-y-4">
                  {question.components.map((component) => (
                    <ElementRenderer
                      key={component.id}
                      element={component}
                      readOnly={readOnly}
                      onRightClick={() => {}} // Disabled in view mode
                      values={formValues}
                      onValueChange={handleValueChange}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions Footer */}
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => window.history.back()}>
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
