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
