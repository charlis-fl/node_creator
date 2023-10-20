import styled from 'styled-components';

export const HeaderStyled = styled.div`
  background-color: var(--default-interface-white);
  border-bottom: 1px solid var(--default-interface-gray-300);
  padding: 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .directory{
    color: var(--default-interface-gray-700);
  }
  .current_flow{
    color: var(--default-brand-navy);
  }
  .current_user{
    border-radius: 2px;
    padding: 2px;
    background-color: var(--default-brand-green);
    margin-left: 4px;
    color: var(--default-brand-navy);
  }
  .actions{
    display: flex;
    gap: 24px;
    align-items: center;
    .action-button{
        cursor: pointer;
        &.profile-icon{
            width: 32px;
            height: 32px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
  }
`;

export const CustomNodeStyled = styled.div`
  border: 2px solid var(--default-interface-gray-400);
  background-color: var(--default-interface-white);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 18px;
  color: var(--default-interface-navy-400);
  font-weight: 500;
  width: 300px;
  justify-content: center;
  img {
    width: 30px;
    height: 30px;
  }
`;

export const WorkflowContainerStyled = styled.div`
  width: calc(100vw - 64px); 
  height: calc(100vh - 90px);
  .reactflow-wrapper{
    height: 100%;
    .download-icon{
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const StencilStyled = styled.div`
  position: fixed;
  left: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--default-interface-white);
  border: 1px solid var(--default-interface-gray-300);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
  .stencil-item{
    &:hover{
      cursor: pointer;
    }
    &:active{
      cursor: grab;
    }
  }
`;

export const NodeConfigurationStyled = styled.div`
  position: absolute;
  top: 81px;
  right: 0;
  background: var(--default-interface-white);
  border-left: 1px solid var(--default-interface-gray-300);
  height: calc(100vh - 81px);
  width: 660px;
  z-index: 1;
  .header{
    padding: 12px 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    color: var(--default-interface-navy-400);
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close{
      cursor: pointer;
      background: transparent;
      outline: none;
      border: 0;
    }
  }
  form{
    padding: 24px 86px 24px 24px;
    .form-heading{
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: var(--default-interface-navy-400);
    }
    .form-actions{
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .error-without-saving{
      color: var(--default-interface-apricot-500);
      font-size: 12px;
      margin-top: 12px;
    }
  }
`;

export const InputStyled = styled.label`
  margin-top: 16px;
  display: block;
  .field-label{
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--default-interface-navy-400);
    display: flex;
    align-items: center;
    gap: 4px;
    .info-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  input[type="text"], input[type="url"]{
    margin-top: 8px;
    border: 1px solid var(--default-interface-gray-300);
    width: calc(100% - 28px);
    height: 38px;
    outline: none;
    color: var(--default-interface-navy-400);
    padding-left: 12px;
    padding-right: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 22px;
  }
  .file-upload{
    padding: 6px 16px;
    border-radius: 2px;
    border: 1px solid #D9D9D9;
    width: max-content;
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: var(--default-interface-navy-400);
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .upload-icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  input[type="file"]{
    display: none;
  }
  .field-error{
    color: var(--default-interface-apricot-500);
    font-size: 12px;
    margin-top: 2px;
  }
`;
