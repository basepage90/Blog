import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';

const SwitchWrapper =  styled.div`
    display: flex;
    width: 220px;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`;

interface PrivacySwitchProps {
    chk: boolean;
    handleChange: () => void;
}

const PrivacySwitch = ({chk,handleChange}: PrivacySwitchProps) => {
    return(
    <SwitchWrapper>
        공개
        <Switch className="switch" checked={chk} name="chekcedPrivacy" onChange={handleChange} />
        비공개
    </SwitchWrapper>
    )
};

export default PrivacySwitch;