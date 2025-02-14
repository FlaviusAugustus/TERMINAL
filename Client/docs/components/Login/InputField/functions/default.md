[**terminal v0.0.0**](../../../../README.md)

***

[terminal](../../../../README.md) / [components/Login/InputField](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

Defined in: [src/components/Login/InputField.tsx:30](https://github.com/FlaviusAugustus/TERMINAL/blob/258124fac8603be0937ac71a9a4235f9a6b6ea30/Client/src/components/Login/InputField.tsx#L30)

Reusable input field component with validation support.

## Parameters

### props

[`InputFieldProps`](../interfaces/InputFieldProps.md)

### deprecatedLegacyContext?

`any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

## Example

```tsx
<InputField
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleEmailChange}
  isValid={isEmailValid}
/>
```
