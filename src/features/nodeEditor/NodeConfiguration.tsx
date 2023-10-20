/* eslint-disable jsx-a11y/label-has-for */
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { setWorkflow } from 'common/store/appSlice';
import { DynamicControl } from 'common/designSystem/dynamicControl';
import Button from 'common/designSystem/button/button';
import closeIcon from 'assets/icons/close.svg';
import infoIcon from 'assets/icons/info-circle.svg';
import { InputStyled, NodeConfigurationStyled } from './Styled';
import { NodeConfigurationComponentType, ConfigurationInputType, NodeType } from './types';
import 'react-tooltip/dist/react-tooltip.css';

const NodeConfiguration = (props : NodeConfigurationComponentType) => {
  const {
    node,
    setCurrentNodeOpened,
  } = props;
  const formMethods = useForm({
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    trigger,
  } = formMethods;
  const [fields, setFields] = useState<Array<ConfigurationInputType> | []>([]);
  const [errorWithoutSaving, setErrorWithoutSaving] = useState(false);
  const [imageData, setImageData] = useState('');
  const workflowState = useAppSelector((state) => state.app.workflow);

  useEffect(() => {
    if (node?.data?.configuration?.inputs?.length) {
      const inputs = node.data.configuration.inputs as Array<ConfigurationInputType>;
      setFields(inputs);
    } else {
      setFields([]);
    }
  }, [node]);
  useEffect(() => {
    fields.forEach((field) => {
      const inputValue = field.value;
      setValue(field.fieldName, inputValue);
    });
  }, [fields]);
  const closeConfig = async () => {
    if (node) {
      const errorCheck = await trigger();
      let dataCheck = true;
      const currentNode = workflowState.nodes.find((n: NodeType) => n.id === node.id);
      const currentFields = currentNode?.data?.configuration?.inputs;
      if (currentFields) {
        currentFields.forEach((f) => {
          if (f.value.length === 0) {
            dataCheck = false;
          }
        });
        if (errorCheck && dataCheck) {
          setCurrentNodeOpened(null);
        }
        if (errorCheck && !dataCheck) {
          setErrorWithoutSaving(true);
        } else {
          setErrorWithoutSaving(false);
        }
      }
    }
  };
  const onSubmit = (data: any) => {
    if (node) {
      const updatedNode = JSON.parse(JSON.stringify(node)) as NodeType;
      updatedNode.data.configuration.inputs = updatedNode.data.configuration.inputs.map((input) => {
        const newInput = { ...input };
        newInput.value = data[input.fieldName];
        if (input.fieldName === 'brand-logo') {
          newInput.value = imageData;
        }
        return newInput;
      });
      const updatedNodes = workflowState.nodes.map((n) => {
        if (n.id === node.id) {
          return updatedNode;
        }
        return n;
      });
      const newWorkflowState = { ...workflowState };
      newWorkflowState.nodes = updatedNodes;
      dispatch(setWorkflow(newWorkflowState));
      setErrorWithoutSaving(false);
    }
  };
  const setFieldError = (field: string, value: string) => {
    setError(field, { type: 'custom', message: value });
  };
  return (
    node ? (
      <NodeConfigurationStyled>
        <div className="header">
          <span>{node.data.label}</span>
          <button type="button" className="close" onClick={closeConfig}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="form-heading">{node.data.configuration.heading}</div>
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
                <DynamicControl setError={setFieldError} {...field} setImageData={setImageData} />
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
          {errorWithoutSaving && Object.keys(errors).length === 0 && <div className="error-without-saving">Please save before closing</div>}
          <div className="form-actions">
            <Button
              type="button"
              label="Cancel"
              usage="secondary"
              onClick={closeConfig}
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
