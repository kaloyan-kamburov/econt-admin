import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";

import Icon from "@mui/icons-material/CalendarMonth";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FieldWrapper } from "../../layout/layout.components";

import composeValidators from "../composeValidators";

type Fn = (value: string | number) => boolean | undefined;

interface Props {
  name: string;
  label: string;
  required?: boolean;
  validate?: Fn[] | any;
  disabled?: boolean;
}

const InputTimePicker: React.FC<Props> = ({
  name,
  label,
  required = false,
  validate = [],
  disabled = false,
}) => {
  const [initialDisabled, setInitialDisabled] = useState(disabled);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setInitialDisabled(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FieldWrapper>
      <Field name={name} validate={composeValidators(...(validate || []))}>
        {(props: any) => (
          <>
            <MobileDatePicker
              label={label}
              value={props.input.value}
              onChange={(value) => props.input.onChange(value)}
              disableOpenPicker
              showToolbar={false}
              disabled={disabled}
              onAccept={() => {
                props.input.onBlur(props.input.value);
              }}
              onClose={() => {
                props.input.onBlur(props.input.value);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  size="small"
                  required={required}
                  error={
                    (props.meta.touched && props.meta.invalid) ||
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
                  InputProps={{
                    endAdornment: (
                      <Icon
                        color={
                          !!(
                            (props.meta.touched && props.meta.error) ||
                            (initialDisabled && props.meta.error && !disabled)
                          )
                            ? "error"
                            : "inherit"
                        }
                      />
                    ),
                    onClick: () => setOpen(true),
                  }}
                />
              )}
            />
          </>
        )}
      </Field>
    </FieldWrapper>
  );
};

export default InputTimePicker;
