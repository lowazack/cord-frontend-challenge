import React from "react";
import {styled, theme} from '../../stitches.config';

export default function Checkbox({id, name, checked, label, onChange}) {
    // TODO: Style the component and checkmark to look like the mockup provided
    return (
        <CheckboxCont>
            <InputCont>
                <CheckboxInput
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                />
                <Box/>
            </InputCont>

            <label htmlFor={id}>{label}</label>
        </CheckboxCont>
    )
}

const CheckboxCont = styled('div', {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    mb: theme.space.xs,
})


const InputCont = styled('span', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    mr: theme.space.sm
})

const CheckboxInput = styled('input', {
    margin: 0,
    display: 'block',
    width: 20,
    height: 20,
    '&:checked': {
        '+ span': {
            backgroundColor: theme.colors.primaryColor,
            '&:before': {
                content: `"\\2713"`
            }
        }
    }
})

const Box = styled('span', {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderRadius: 3,
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
})