/* eslint-disable jsx-a11y/label-has-for */
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { DynamicControl } from 'common/designSystem/dynamicControl';
import Button from 'common/designSystem/button/button';
import closeIcon from 'assets/icons/close.svg';
import infoIcon from 'assets/icons/info-circle.svg';
import { InputStyled, NodeConfigurationStyled } from './Styled';
import { NodeConfigurationComponentType, ConfigurationInputType } from './types';
import 'react-tooltip/dist/react-tooltip.css';

const NodeConfiguration = (props : NodeConfigurationComponentType) => {
  const {
    node,
    setCurrentNodeOpened,
  } = props;
  const formMethods = useForm({
    mode: 'onBlur',
  });
  const { handleSubmit, setError, formState: { errors } } = formMethods;
  const [fields, setFields] = useState<Array<ConfigurationInputType> | []>([]);
  useEffect(() => {
    if (node?.configuration?.inputs?.length) {
      const inputs = node.configuration.inputs as Array<ConfigurationInputType>;
      setFields(inputs);
    } else {
      setFields([]);
    }
  }, [node]);
  const closeConfig = () => {
    setCurrentNodeOpened(null);
  };
  const onSubmit = (data: any) => {
    // console.log(data);
  };
  const setFieldError = (field: string, value: string) => {
    setError(field, { type: 'custom', message: value });
  };
  return (
    node ? (
      <NodeConfigurationStyled>
        <div className="header">
          <span>{node.label}</span>
          <button type="button" className="close" onClick={() => closeConfig()}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="form-heading">{node.configuration.heading}</div>
          <Tooltip id="field-info" />
          <FormProvider {...formMethods}>
            {fields.map((field) => (
              <InputStyled key={field.id} htmlFor={field.fieldName}>
                <div className="field-label">
                  <span>{field.inputLabel}</span>
                  <span className="info-icon" data-tooltip-id="field-info" data-tooltip-content={field.info}>
                    <img src={infoIcon} alt="info" />
                  </span>
                </div>
                <DynamicControl setError={setFieldError} {...field} />
                <>
                  {Object.keys(errors).map((errKey: any) => {
                    if (field.fieldName === errKey) {
                      return (
                        <div className="field-error" key="field-error">{errors[errKey]?.message?.toString()}</div>
                      );
                    }
                    return null;
                  })}
                </>
              </InputStyled>
            ))}
          </FormProvider>
          <div className="form-actions">
            <Button
              type="button"
              label="Cancel"
              usage="secondary"
            />
            <Button
              type="submit"
              label="Save"
              usage="primary"
            />
          </div>
        </form>
      </NodeConfigurationStyled>
    ) : null
  );
};

export default NodeConfiguration;
