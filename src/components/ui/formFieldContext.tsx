"use client"

import * as React from "react"
import { useFormContext, useFormState, type FieldPath, type FieldValues } from "react-hook-form"

// Context for <FormField>
export type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

// Context for <FormItem>
export const FormItemContext = React.createContext<{ id: string }>({} as { id: string })

// Hook for accessing field + item info
export function useFormField() {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState } = useFormContext()
    const formState = useFormState({ name: fieldContext.name })
    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) throw new Error("useFormField should be used within <FormField>")

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}
