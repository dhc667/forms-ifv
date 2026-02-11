import type { Input } from '@/lib/form-builder/types/inputs';
import { InlineInput } from '@/components/ui/inline-input';
import { TextAreaInput } from '@/components/ui/textarea-input';

interface InputRendererProps {
  input: Input;
  onRightClick: (input: Input, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function InputRenderer({ input, onRightClick, preview = false }: InputRendererProps) {
  const inlineInputProps = {
    id: input.id,
    required: input.required,
    onContextMenu: preview ? undefined : (e: React.MouseEvent) => onRightClick(input, e),
    disabled: preview, // Disable in preview mode
    className: preview ? 'pointer-events-none' : undefined,
  };

  switch (input.type) {
    case 'text-input':
      return (
        <InlineInput
          {...inlineInputProps}
          type="text"
          placeholder={input.placeholder}
        />
      );

    case 'number-input':
      return (
        <InlineInput
          {...inlineInputProps}
          type="number"
          placeholder={input.placeholder}
          min={input.validation?.min}
          max={input.validation?.max}
          step={input.validation?.step}
        />
      );

    case 'date':
      return (
        <InlineInput
          {...inlineInputProps}
          type="date"
          min={input.validation?.min?.toISOString().split('T')[0]}
          max={input.validation?.max?.toISOString().split('T')[0]}
        />
      );

    case 'textarea-input':
      return (
        <TextAreaInput
          id={input.id}
          required={input.required}
          onContextMenu={preview ? undefined : (e: React.MouseEvent) => onRightClick(input, e)}
          disabled={preview}
          className={preview ? 'pointer-events-none' : undefined}
          placeholder={input.placeholder}
          rows={input.validation?.rows || 4}
        />
      );

    case 'reference-input':
      return (
        <InlineInput
          {...inlineInputProps}
          type="text"
          placeholder="Reference input"
          disabled
        />
      );

    case 'selection-input':
      return (
        <InlineInput
          {...inlineInputProps}
          type="text"
          placeholder="Selection input"
          disabled
        />
      );

    default:
      return (
        <InlineInput
          {...inlineInputProps}
          type="text"
          placeholder="Unknown input type"
          disabled
        />
      );
  }
}