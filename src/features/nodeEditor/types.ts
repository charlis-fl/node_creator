import { RegisterOptions } from 'react-hook-form';

export type EdgeType = {
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
}
export type NodeType = {
    id: string;
    position: {
      x: number;
      y: number;
    };
    type: string;
    data: CustomNodeType;
}
export type NodeConfigurationComponentType = {
    node: NodeType | null;
    setCurrentNodeOpened: (value: NodeType | null) => void;
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
    value: string;
    placeholder: string;
    fieldName: string;
    setError?: (context: string, value: string) => void;
    config?: RegisterOptions;
};

export type ControlType = 'text' | 'url' | 'file';
