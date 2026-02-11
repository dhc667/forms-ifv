import { generateUUID } from '@/lib/uuid';
import { createLiteralText } from '@/lib/form-builder/types/literal-text';
import type { FormSchema } from '@/lib/form-builder/types/form';
import type { Question } from '@/lib/form-builder/types/question';
import type { TextElement } from '@/lib/form-builder/types/text';
import type { TextAreaInput } from '@/lib/form-builder/types/inputs';
import type { TextInput, DateInput, NumberInput } from '@/lib/form-builder/types/inputs';
import type { SingleSelection, MultipleSelection } from '@/lib/form-builder/types/selection';
import type { TableElement } from '@/lib/form-builder/types/table';
import type { ImageElement } from '@/lib/form-builder/types/image';

export const exampleFormSchema: FormSchema = {
  id: 'formulario-completo-ejemplo',
  title: 'Formulario de Registro Completo',
  questions: [
    // Mixed Text Elements with Inputs
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'text',
          components: [
            createLiteralText('Por favor ingrese su '),
            {
              id: generateUUID(),
              type: 'text-input',
              placeholder: 'Nombre completo',
              required: true
            } as TextInput,
            createLiteralText(' y su fecha de nacimiento '),
            {
              id: generateUUID(),
              type: 'date',
              required: true
            } as DateInput
          ]
        } as TextElement
      ]
    },

    // Number Input with Text
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'text',
          components: [
            createLiteralText('Su edad es '),
            {
              id: generateUUID(),
              type: 'number-input',
              placeholder: 'Edad',
              validation: { min: 18, max: 120 }
            } as NumberInput,
            createLiteralText(' años.')
          ]
        } as TextElement
      ]
    },

    // Selection Element - Single Choice
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'single-selection',
          title: "Sexo",
          options: [
            { id: generateUUID(), title: 'Masculino' },
            { id: generateUUID(), title: 'Femenino' },
            { id: generateUUID(), title: 'Otro' }
          ]
        } as SingleSelection
      ]
    },

    // Selection Element - Multiple Choice
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'multiple-selection',
          title: "Idiomas que habla",
          options: [
            { id: generateUUID(), title: 'Español' },
            { id: generateUUID(), title: 'Inglés' },
            { id: generateUUID(), title: 'Francés' },
            { id: generateUUID(), title: 'Alemán' }
          ]
        } as MultipleSelection
      ]
    },

    // Table Element
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'table',
          title: 'Información de Contacto',
          rows: [
            [
              createLiteralText('Tipo'),
              createLiteralText('Valor'),
            ],
            [
              createLiteralText('Teléfono'),
              {
                id: generateUUID(),
                type: 'text-input',
                placeholder: 'Número'
              } as TextInput
            ],
            [
              createLiteralText('Email'),
              {
                id: generateUUID(),
                type: 'text-input',
                placeholder: 'correo@ejemplo.com'
              } as TextInput
            ],
            [
              createLiteralText('Número'),
              {
                id: generateUUID(),
                type: 'number-input',
                placeholder: '0'
              } as NumberInput
            ],
            [
              createLiteralText('Fecha'),
              {
                id: generateUUID(),
                type: 'date'
              } as DateInput
            ],
            [
              createLiteralText('Área de Texto'),
              {
                id: generateUUID(),
                type: 'textarea-input',
                placeholder: 'Ingrese texto más largo aquí...'
              } as TextAreaInput
            ]
          ]
        } as TableElement
      ]
    },

    // Image Element
    {
      id: generateUUID(),
      components: [
        {
          id: generateUUID(),
          type: 'image',
          title: 'Inserte una imagen'
        } as ImageElement
      ]
    }
  ]
};
