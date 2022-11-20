import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Field, useField } from "react-final-form";

import { FieldWrapper } from "../../layout/layout.components";

import composeValidators from "../composeValidators";

type Fn = (value: string | number) => boolean | undefined;

export type Option = {
  label: string;
  value: string | number;
  name?: string;
};

interface Props {
  name: string;
  label: string;
  required?: boolean;
  validate?: Fn[];
  type?: string;
  disabled?: boolean;
  options: Option[];
  onChange?: (value: Option | string) => void;
  autoFocus?: boolean;
  multiple?: boolean;
  isCreatable?: boolean;
}

const SelectComponent: React.FC<Props> = ({
  name,
  label,
  required = false,
  validate = [],
  disabled = false,
  options = [],
  onChange = (value: Option | string) => {},
  autoFocus = false,
  multiple = false,
  isCreatable = false,
}) => {
  const [initialDisabled, setInitialDisabled] = useState(disabled);
  const { input } = useField(name);
  const [fieldOptions, setFieldOptions] = useState<any>([]);
  useEffect(() => {
    setInitialDisabled(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOptions = (currValue: any) =>
    currValue.find
      ? options.filter((opt) => !currValue.find((o: any) => o === opt.value))
      : options;

  return (
    <FieldWrapper>
      <Field
        name={name}
        validate={composeValidators(...(validate || []))}
      >
        {(props: any) => {
          return (
            <FormControl sx={{ width: "100%" }}>
              {multiple ? (
                <>
                  <Autocomplete
                    multiple
                    options={isCreatable ? options : getOptions(props.input.value)}
                    // options={getOptions(props.input.value)}
                    disableCloseOnSelect
                    getOptionLabel={(option: any) =>
                      (() => {
                        const foundedOption = options.find((opt) => opt.value === option);
                        return foundedOption
                          ? foundedOption.label || ""
                          : option
                          ? option.label || ""
                          : "";
                      })()
                    }
                    filterSelectedOptions
                    // size="small"
                    getOptionDisabled={(opt: any) =>
                      Array.isArray(props.input.value)
                        ? !!props.input.value.find((option: any) => option?.value === opt?.value)
                        : false
                    }
                    renderOption={(propsValues, option: any, state) => (
                      <li {...propsValues}>
                        {/* <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={
                            Array.isArray(input?.value)
                              ? input?.value?.find(
                                  (el: any) => el.value === option.value
                                )
                              : false
                          }
                        /> */}
                        {option?.label || ""}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        required={required}
                        {...params}
                        label={label}
                        placeholder={label}
                        error={props.meta.touched && props.meta.invalid}
                      />
                    )}
                    {...props.input}
                    onChange={(event, option: any) => {
                      props.input?.onChange(option);
                    }}
                    value={props.input?.value || []}
                  />
                </>
              ) : (
                <Autocomplete
                  disablePortal
                  id={`${label}-id`}
                  options={options}
                  {...props.input}
                  onChange={(event: SelectChangeEvent, value: Option) => {
                    props.input.onChange(value ? value.value : null);
                    onChange(value);
                  }}
                  disabled={disabled}
                  getOptionLabel={(option: any) => {
                    const foundedOption = options.find((opt) => opt.value === option);
                    return foundedOption ? foundedOption.label : option ? option.label : "";
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
                      required={required}
                      error={props.meta.touched && props.meta.invalid}
                      autoFocus={autoFocus}
                      // placeholder="Клиент"
                      fullWidth
                      // size="small"
                    />
                  )}
                />
              )}

              {((props.meta.touched && props.meta.invalid) ||
                (initialDisabled && props.meta.error && props.meta.touched && !disabled)) && (
                <FormHelperText
                  error={
                    (props.meta.touched && props.meta.invalid) ||
                    (initialDisabled && props.meta.error && props.meta.touched && !disabled)
                  }
                >
                  {props.meta.error}
                </FormHelperText>
              )}
              {/* <pre>{JSON.stringify(props.meta, null, 4)}</pre> */}
            </FormControl>
          );
        }}
      </Field>
    </FieldWrapper>
  );
};

export default SelectComponent;
