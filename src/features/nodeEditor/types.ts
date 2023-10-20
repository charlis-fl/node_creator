import { RegisterOptions } from 'react-hook-form';

export type NodeConfigurationComponentType = {
    node: CustomNodeType | null;
    setCurrentNodeOpened: (value: CustomNodeType | null) => void;
};

export type CustomNodeType = {
    configuration: NodeConfigurationType;
    image: {
        url: string;
        alt: string;
    };
    label: string;
};

export type NodeConfigurationType = {
    heading: string;
    inputs: Array<ConfigurationInputType>;
}

export type ConfigurationInputType = {
    id: string;
    inputLabel: string;
    type: string;
    info: string;
    placeholder: string;
    value: string;
    fieldName: string;
    defaultValue: any;
    setError?: (context: string, value: string) => void;
    config?: RegisterOptions;
};

export type ControlType = 'text' | 'url' | 'file';
