import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";

import IconButton from "@mui/material/IconButton";
import IconVisibilityOn from "@mui/icons-material/VisibilityOutlined";
import IconVisibilityOff from "@mui/icons-material/VisibilityOffOutlined";

import { FieldWrapper } from "../../layout/layout.components";

import composeValidators from "../composeValidators";

type Fn = (value: string | number) => boolean | undefined;

interface Props {
  name: string;
  label: string;
  required?: boolean;
  validate?: Fn[] | any;
  type?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  autoFocus?: boolean;
  startAdornment?: string | null;
  endAdornment?: any;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  placeholder?: string | undefined;
}

const Input: React.FC<Props> = ({
  name,
  label,
  required = false,
  validate = [],
  type = "text",
  disabled = false,
  min = 0,
  max,
  autoFocus = false,
  startAdornment,
  endAdornment = null,
  multiline = false,
  rows = 1,
  maxRows = 1,
  placeholder = undefined,
}) => {
  const [initialDisabled, setInitialDisabled] = useState<boolean>(disabled);
  const [textVisible, setTextVisible] = useState<boolean>(false);
  useEffect(() => {
    setInitialDisabled(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FieldWrapper style={multiline ? { minHeight: 64 + rows * 17 } : {}}>
      <Field name={name} validate={composeValidators(...(validate || []))}>
        {(props: any) => (
          <TextField
            label={label}
            name={props.input.name}
            value={props.input.value}
            placeholder={placeholder}
            onChange={(e) => {
              if (type === "number") {
                if (e.target.value) {
                  props.input.onChange(parseFloat(e.target.value));
                } else {
                  props.input.onChange(null);
                }
              } else {
                props.input.onChange(e.target.value);
              }
            }}
            style={{
              fontSize: "14px",
            }}
            size="small"
            error={
              (props.meta.touched && props.meta.error) ||
              (initialDisabled &&
                props.meta.error &&
                props.meta.touched &&
                !disabled)
            }
            helperText={
              ((props.meta.touched && props.meta.error) ||
                (initialDisabled &&
                  props.meta.error &&
                  props.meta.touched &&
                  !disabled)) &&
              props.meta.error
            }
            onBlur={(value) => {
              props.input.onBlur(value);
              if (type === "number" && !required && props.input.value === 0) {
                props.input.onChange(null);
              }
            }}
            autoFocus={autoFocus}
            fullWidth
            required={required}
            type={
              type === "password" ? (textVisible ? "text" : "password") : type
            }
            autoComplete=" "
            disabled={disabled}
            InputProps={{
              inputProps: {
                min,
                max,
              },
              startAdornment,
              endAdornment:
                type === "password" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setTextVisible(!textVisible)}
                    edge="end"
                    disabled={disabled}
                  >
                    {textVisible ? <IconVisibilityOff /> : <IconVisibilityOn />}
                  </IconButton>
                ) : null,
            }}
            multiline={multiline}
            rows={rows}
            maxRows={maxRows}
          />
        )}
      </Field>
    </FieldWrapper>
  );
};

export default Input;
