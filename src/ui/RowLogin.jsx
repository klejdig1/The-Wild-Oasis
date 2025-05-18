import styled from "styled-components";


const StyledFormRowLogin=styled.div`



    &:first-child {
        padding-top: 0;
        margin-bottom: 2rem;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    input{
        width: 100%;
        margin-top: 10px;
    }



`;



const LabelSec = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;



function RowLogin({ label, error, children }) {
    return (
        <StyledFormRowLogin>
            {label && <LabelSec htmlFor={children.props.id}>{label}</LabelSec>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRowLogin>
    );
}


export default RowLogin;

